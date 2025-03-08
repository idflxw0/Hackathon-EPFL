import React from 'react';
import { Search, Settings, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarHeaderProps {
  onNewChat: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  onNewChat,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="p-3 border-b bg-white">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
        <div className="flex space-x-2">
          <motion.button
            className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 flex items-center justify-center"
            onClick={onNewChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}>
            <Plus className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search chats and contacts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 pl-9 pr-4 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
        />
        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
        {searchQuery && (
          <motion.button
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            onClick={() => setSearchQuery('')}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileTap={{ scale: 0.9 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>
        )}
      </div>
    </div>
  );
};
