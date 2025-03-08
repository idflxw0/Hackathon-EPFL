import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  name: string;
  image?: string;
  size?: AvatarSize;
  status?: 'online' | 'offline' | undefined;
  isGroup?: boolean;
  colorSeed?: number; // Used to generate consistent colors
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  image,
  size = 'md',
  status,
  isGroup = false,
  colorSeed,
}) => {
  // Get proper initials from name
  const getInitials = (name: string): string => {
    const nameParts = name.trim().split(/\s+/);

    // For single word names
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }

    // Get first letter of first name and first letter of last name
    const firstInitial = nameParts[0].substring(0, 1);
    const lastInitial = nameParts[nameParts.length - 1].substring(0, 1);

    return (firstInitial + lastInitial).toUpperCase();
  };

  // Generate a background color based on name
  const getBackgroundColor = (name: string, seed = 0): string => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-pink-400 to-pink-600',
      'from-green-400 to-green-600',
      'from-yellow-400 to-yellow-600',
      'from-red-400 to-red-600',
      'from-indigo-400 to-indigo-600',
      'from-teal-400 to-teal-600',
    ];

    const hash = name.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, seed);

    return colors[hash % colors.length];
  };

  const getSizeClass = (size: AvatarSize): string => {
    switch (size) {
      case 'xs':
        return 'w-6 h-6 text-xs';
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'md':
        return 'w-10 h-10 text-base';
      case 'lg':
        return 'w-12 h-12 text-lg';
      case 'xl':
        return 'w-16 h-16 text-xl';
      default:
        return 'w-10 h-10 text-base';
    }
  };

  const getStatusSize = (size: AvatarSize): string => {
    switch (size) {
      case 'xs':
        return 'w-1.5 h-1.5';
      case 'sm':
        return 'w-2 h-2';
      case 'md':
        return 'w-2.5 h-2.5';
      case 'lg':
        return 'w-3 h-3';
      case 'xl':
        return 'w-4 h-4';
      default:
        return 'w-2.5 h-2.5';
    }
  };

  const sizeClass = getSizeClass(size);
  const statusSizeClass = getStatusSize(size);
  const backgroundClass = getBackgroundColor(name, colorSeed);

  return (
    <div className="relative inline-block">
      {/* Avatar */}
      <motion.div
        className={`${sizeClass} rounded-full flex items-center justify-center font-bold text-white overflow-hidden shadow-md bg-gradient-to-br ${backgroundClass}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}>
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </motion.div>

      {/* Status indicator */}
      {status && (
        <div
          className={`absolute -bottom-0.5 -right-0.5 ${statusSizeClass} rounded-full border-2 border-white ${
            status === 'online' ? 'bg-green-500' : 'bg-gray-400'
          }`}></div>
      )}

      {/* Group indicator */}
      {isGroup && (
        <div
          className={`absolute -bottom-1 -right-1 flex items-center justify-center bg-blue-500 rounded-full text-white shadow-sm ${
            size === 'xs'
              ? 'w-3 h-3 p-0.5'
              : size === 'sm'
              ? 'w-4 h-4 p-0.5'
              : size === 'md'
              ? 'w-5 h-5 p-1'
              : size === 'lg'
              ? 'w-6 h-6 p-1'
              : 'w-7 h-7 p-1.5'
          }`}>
          <Users className="w-full h-full" />
        </div>
      )}
    </div>
  );
};
