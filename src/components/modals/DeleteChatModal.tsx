import React from 'react';
import { Trash2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChat } from '../../context/ChatContext';
import { useToast } from '../common/Toast';

interface DeleteChatModalProps {
  chatId: string;
  chatName: string;
  onClose: () => void;
}

export const DeleteChatModal: React.FC<DeleteChatModalProps> = ({
  chatId,
  chatName,
  onClose,
}) => {
  const { deleteChat } = useChat();
  const { showToast } = useToast();

  const handleDelete = () => {
    deleteChat(chatId);
    showToast(`Chat with ${chatName} has been deleted`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white rounded-xl w-full max-w-md p-5 shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}>
        <div className="flex items-start mb-4">
          <div className="bg-red-100 p-2 rounded-full mr-3">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Delete Chat</h3>
            <p className="text-gray-600 mt-1">
              Are you sure you want to delete this chat with{' '}
              <span className="font-medium">{chatName}</span>? This action
              cannot be undone.
            </p>
          </div>
          <button
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex space-x-3 justify-end mt-6">
          <motion.button
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium"
            onClick={onClose}
            whileHover={{ backgroundColor: 'rgba(243, 244, 246, 1)' }}
            whileTap={{ scale: 0.98 }}>
            Cancel
          </motion.button>
          <motion.button
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow-sm"
            onClick={handleDelete}
            whileHover={{ backgroundColor: 'rgba(220, 38, 38, 1)' }}
            whileTap={{ scale: 0.98 }}>
            Delete
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
