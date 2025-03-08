import React, { useRef, useEffect } from 'react';
import { ChatMessage, Message } from './ChatMessage';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessageListProps {
  messages: Message[];
  onReply: (messageId: string) => void;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  onReply,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { date: string; messages: Message[] }[] = [];

    messages.forEach((message) => {
      const messageDate = message.timestamp.toDateString();
      const existingGroup = groups.find((group) => group.date === messageDate);

      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        groups.push({
          date: messageDate,
          messages: [message],
        });
      }
    });

    return groups;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
      <AnimatePresence>
        {messageGroups.map((group) => (
          <div key={group.date} className="space-y-1">
            {/* Date separator */}
            <motion.div
              className="flex justify-center my-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}>
              <div className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 font-medium shadow-sm">
                {formatDate(group.date)}
              </div>
            </motion.div>

            {/* Messages */}
            {group.messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                prevMessage={index > 0 ? group.messages[index - 1] : undefined}
                onReply={onReply}
                index={index}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>

      {/* Typing indicator would go here */}
      {messages.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <motion.div
            className="text-gray-400 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            <p className="mb-2">No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </motion.div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
