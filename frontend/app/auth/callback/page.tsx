'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [message, setMessage] = useState('Completing authentication...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Add a small delay to ensure cookies are set properly
    const timer = setTimeout(async () => {
      try {
        // Get the current session
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (data?.session) {
          setMessage('Authentication successful! Redirecting...');

          // Get the current user ID
          const userId = data.session.user.id;
          console.log('User authenticated:', userId);

          try {
            // Check if the current user has a restaurant
            const { data: restaurants, error: restaurantError } = await supabase
              .from('restaurants')
              .select('id')
              .eq('user_id', userId)
              .limit(1);

            if (restaurantError) throw restaurantError;

            console.log('Restaurants for user:', restaurants);

            // Redirect based on whether restaurant exists for this user
            if (restaurants && restaurants.length > 0) {
              router.push('/dashboard');
            } else {
              // First login, redirect to restaurant setup
              router.push('/restaurant-setup');
            }
          } catch (queryError) {
            console.error('Error checking restaurants:', queryError);
            // If there's an error checking restaurants, default to setup
            router.push('/restaurant-setup');
          }
        } else {
          throw new Error('No session found');
        }
      } catch (err) {
        console.error('Error during auth callback:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Authentication failed. Please try again.'
        );
        setTimeout(() => {
          router.push('/signin');
        }, 3000);
      }
    }, 1000); // 1-second delay

    return () => clearTimeout(timer);
  }, [supabase, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="text-center max-w-md mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        {error ? (
          <div className="space-y-4">
            <div className="text-red-500 dark:text-red-400 font-semibold text-lg">
              {error}
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Redirecting you to the login page...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <Loader2
              size={48}
              className="text-blue-600 dark:text-blue-400 animate-spin mx-auto"
            />
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
              {message}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Please wait while we complete your authentication.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
