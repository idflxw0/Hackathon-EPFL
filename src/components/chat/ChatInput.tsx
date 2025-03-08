import React, { useState } from 'react';
import { Send, Smile, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  replyTo?: {
    id: string;
    content: string;
    sender: string;
  };
  onCancelReply: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  replyTo,
  onCancelReply,
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      {/* Reply indicator */}
      <AnimatePresence>
        {replyTo && (
          <motion.div
            className="flex items-center justify-between bg-blue-50 p-2 rounded-lg mb-2 border border-blue-100"
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.2 }}>
            <div className="flex items-start space-x-2">
              <div className="w-1 self-stretch bg-blue-500 rounded"></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-blue-500">
                  Replying to {replyTo.sender}
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {replyTo.content}
                </div>
              </div>
            </div>
            <motion.button
              className="p-1 rounded-full hover:bg-blue-100"
              onClick={onCancelReply}
              whileTap={{ scale: 0.9 }}>
              <X className="w-4 h-4 text-blue-500" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message input */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <motion.button
          type="button"
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
          whileHover={{ backgroundColor: 'rgba(243, 244, 246, 1)' }}
          whileTap={{ scale: 0.9 }}>
          <Smile className="w-6 h-6" />
        </motion.button>

        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              // Send message on Enter without shift key
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (message.trim()) {
                  onSendMessage(message);
                  setMessage('');
                }
              }
            }}
            placeholder={replyTo ? 'Type a reply...' : 'Type a message...'}
            className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-32"
            rows={1}
          />
        </div>

        <motion.button
          type="submit"
          disabled={!message.trim()}
          className={`p-3 rounded-full ${
            message.trim()
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-400'
          }`}
          whileHover={
            message.trim() ? { backgroundColor: 'rgba(37, 99, 235, 1)' } : {}
          }
          whileTap={message.trim() ? { scale: 0.95 } : {}}>
          <Send className="w-5 h-5" />
        </motion.button>
      </form>
    </div>
  );
};
