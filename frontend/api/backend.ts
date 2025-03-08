// Updated Supabase client configuration with improved user registration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ========================
// Authentication Examples
// ========================

// Enhanced sign up function with better error handling and direct user profile update
async function signUpUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  try {
    // Step 1: Register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (authError) {
      console.error('Auth error during signup:', authError.message);
      throw authError;
    }

    if (!authData.user) {
      console.error('No user returned from auth signup');
      throw new Error('User creation failed');
    }

    // Step 2: Ensure user profile is created/updated properly
    // This step helps in case the database trigger didn't work properly
    const { error: profileError } = await supabase.from('users').upsert({
      id: authData.user.id,
      email: email,
      first_name: firstName,
      last_name: lastName,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (profileError) {
      console.error('Profile creation error:', profileError.message);
      // Don't throw here, as the auth part succeeded
    }

    return authData;
  } catch (error: unknown) {
    console.error(
      'Error signing up:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    throw error;
  }
}

// Sign in a user
async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error('Error signing in:', error.message);
    throw error;
  }

  return data;
}

// Sign out a user
async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error.message);
    return false;
  }

  return true;
}

// ========================
// User Profile Examples
// ========================

// Get current user profile
async function getUserProfile() {
  // First get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Then get their profile details
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error getting user profile:', error.message);
    return null;
  }

  return data;
}

// Update user profile
async function updateUserProfile(firstName: string, lastName: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('users')
    .update({
      first_name: firstName,
      last_name: lastName,
      updated_at: new Date(),
    })
    .eq('id', user.id);

  if (error) {
    console.error('Error updating profile:', error.message);
    return null;
  }

  return data;
}

// ========================
// Restaurant Examples
// ========================

// Get all restaurants
async function getAllRestaurants() {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching restaurants:', error.message);
    return [];
  }

  return data;
}

// Get a specific restaurant with its reviews
async function getRestaurantWithReviews(restaurantId: string) {
  const { data, error } = await supabase
    .from('restaurants')
    .select(
      `
      *,
      reviews (
        id,
        rating,
        review_text,
        created_at,
        user_id,
        users (first_name, last_name)
      )
    `
    )
    .eq('id', restaurantId)
    .single();

  if (error) {
    console.error('Error fetching restaurant details:', error.message);
    return null;
  }

  return data;
}

// ========================
// Review Examples
// ========================

// Add a new review
async function addReview(
  restaurantId: string,
  rating: number,
  reviewText: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error('User must be logged in to leave a review');
    return null;
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      restaurant_id: restaurantId,
      user_id: user.id,
      rating: rating,
      review_text: reviewText,
    })
    .select();

  if (error) {
    console.error('Error adding review:', error.message);
    return null;
  }

  return data;
}

// Update an existing review
async function updateReview(
  reviewId: string,
  rating: number,
  reviewText: string
) {
  const { data, error } = await supabase
    .from('reviews')
    .update({
      rating: rating,
      review_text: reviewText,
      updated_at: new Date(),
    })
    .eq('id', reviewId)
    .select();

  if (error) {
    console.error('Error updating review:', error.message);
    return null;
  }

  return data;
}

// Delete a review
async function deleteReview(reviewId: string) {
  const { error } = await supabase.from('reviews').delete().eq('id', reviewId);

  if (error) {
    console.error('Error deleting review:', error.message);
    return false;
  }

  return true;
}

// Get all reviews by current user
async function getUserReviews() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('reviews')
    .select(
      `
      *,
      restaurants (id, name)
    `
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user reviews:', error.message);
    return [];
  }

  return data;
}

export {
  supabase,
  signUpUser,
  signInUser,
  signOutUser,
  getUserProfile,
  updateUserProfile,
  getAllRestaurants,
  getRestaurantWithReviews,
  addReview,
  updateReview,
  deleteReview,
  getUserReviews,
};
