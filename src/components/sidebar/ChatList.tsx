import React from 'react';
import { ChatItem } from './ChatItem';
import { useChat } from '../../context/ChatContext';
import { motion } from 'framer-motion';

interface ChatListProps {
  searchQuery: string;
}

export const ChatList: React.FC<ChatListProps> = ({ searchQuery }) => {
  const { chats } = useChat();

  // Filter chats based on search query
  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort chats by timestamp (newest first)
  const sortedChats = [...filteredChats].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {sortedChats.length > 0 ? (
        <motion.div
          className="divide-y divide-gray-200"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          {sortedChats.map((chat, index) => (
            <ChatItem key={chat.id} chat={chat} index={index} />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <p className="text-gray-500 mb-1">
            {searchQuery ? 'No chats found.' : 'No chats yet.'}
          </p>
          <p className="text-sm text-gray-400">
            {searchQuery
              ? 'Try a different search.'
              : 'Start a new conversation!'}
          </p>
        </div>
      )}
    </div>
  );
};
