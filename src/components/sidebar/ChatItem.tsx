import React, { useState } from 'react';
import { ShieldCheck, Trash } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { motion } from 'framer-motion';
import { Avatar } from '../common/Avatar';
import { DeleteChatModal } from '../modals/DeleteChatModal';

interface ChatItemProps {
  chat: {
    id: string;
    name: string;
    avatar?: string;
    lastMessage: string;
    timestamp: Date;
    unreadCount: number;
    verified: boolean;
    isGroup: boolean;
  };
  index: number;
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat, index }) => {
  const { selectedChatId, setSelectedChatId } = useChat();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isSelected = selectedChatId === chat.id;

  // Format the timestamp
  const formatTime = (date: Date) => {
    const now = new Date();
    const isToday = now.toDateString() === date.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = yesterday.toDateString() === date.toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (isYesterday) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.03,
      },
    },
  };

  return (
    <>
      <motion.div
        className={`flex p-3 cursor-pointer relative group ${
          isSelected
            ? 'bg-blue-50 border-l-4 border-blue-500'
            : 'hover:bg-gray-100 border-l-4 border-transparent'
        } transition-all duration-200`}
        onClick={() => setSelectedChatId(chat.id)}
        variants={itemVariants}
        layout>
        {/* Avatar */}
        <Avatar
          name={chat.name}
          image={chat.avatar}
          size="lg"
          isGroup={chat.isGroup}
          colorSeed={chat.id.charCodeAt(0)}
        />

        {/* Content */}
        <div className="flex-1 ml-3 overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="font-medium truncate text-gray-900">
              {chat.name}
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap ml-1 mt-0.5">
              {formatTime(chat.timestamp)}
            </div>
          </div>

          <div className="flex justify-between items-center mt-1">
            <div
              className={`text-sm truncate pr-2 ${
                isSelected ? 'text-blue-600' : 'text-gray-600'
              }`}>
              {chat.lastMessage}
            </div>

            <div className="flex items-center space-x-1">
              {chat.verified && (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              )}

              {chat.unreadCount > 0 && (
                <motion.div
                  className="bg-blue-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                  style={{ width: '20px', height: '20px', minWidth: '20px' }}>
                  {chat.unreadCount}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Delete button - visible on hover */}
        <motion.div
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}>
          <motion.button
            className="p-1.5 bg-white rounded-full hover:bg-red-100 hover:text-red-500 shadow-md"
            onClick={handleDelete}
            whileHover={{
              backgroundColor: 'rgba(254, 226, 226, 1)',
              color: 'rgba(239, 68, 68, 1)',
            }}
            whileTap={{ scale: 0.9 }}>
            <Trash className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteChatModal
          chatId={chat.id}
          chatName={chat.name}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};
