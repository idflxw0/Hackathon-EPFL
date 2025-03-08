// Modern color palette
export const colors = {
  // Primary brand colors
  primary: {
    light: '#60A5FA', // blue-400
    main: '#3B82F6', // blue-500
    dark: '#2563EB', // blue-600
    gradient: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
  },

  // Secondary/accent colors
  secondary: {
    light: '#A78BFA', // violet-400
    main: '#8B5CF6', // violet-500
    dark: '#7C3AED', // violet-600
    gradient: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
  },

  // Success/verification colors
  success: {
    light: '#34D399', // emerald-400
    main: '#10B981', // emerald-500
    dark: '#059669', // emerald-600
    gradient: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
  },

  // Background colors
  background: {
    light: '#F9FAFB', // gray-50
    main: '#F3F4F6', // gray-100
    dark: '#E5E7EB', // gray-200
    paper: '#FFFFFF', // white
  },

  // Text colors
  text: {
    primary: '#1F2937', // gray-800
    secondary: '#4B5563', // gray-600
    disabled: '#9CA3AF', // gray-400
    hint: '#6B7280', // gray-500
  },

  // Message colors
  message: {
    sent: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    sentText: '#FFFFFF',
    received: '#FFFFFF',
    receivedText: '#1F2937',
  },

  // Status indicators
  status: {
    online: '#10B981', // emerald-500
    offline: '#9CA3AF', // gray-400
    typing: '#60A5FA', // blue-400
    error: '#EF4444', // red-500
  },

  // Verification levels
  verification: {
    verified: '#10B981', // emerald-500
    unverified: '#F59E0B', // amber-500
    warning: '#EF4444', // red-500
  },
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  message: '0 2px 5px 0 rgba(0, 0, 0, 0.08)',
  messageHover: '0 4px 8px 0 rgba(0, 0, 0, 0.12)',
};

// Rounded corners
export const borderRadius = {
  sm: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '1rem', // 16px
  full: '9999px', // Full rounded (for circles, pills)
};

// Z-index
export const zIndex = {
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  tooltip: 1400,
  toast: 1500,
};

// Avatar styles
export const avatar = {
  sizes: {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '48px',
    xl: '56px',
  },
  font: {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '20px',
  },
};

// Transitions
export const transitions = {
  fast: '0.15s',
  medium: '0.3s',
  slow: '0.5s',
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

// Spacing
export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  xxl: '3rem', // 48px
};
