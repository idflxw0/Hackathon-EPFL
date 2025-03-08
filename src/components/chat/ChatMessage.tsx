import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  CheckCheck,
  MoreVertical,
  Reply,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar } from '../common/Avatar';

export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  verified: boolean;
  isMine: boolean;
  replyTo?: {
    id: string;
    content: string;
    sender: string;
  };
}

interface ChatMessageProps {
  message: Message;
  prevMessage?: Message;
  onReply: (messageId: string) => void;
  index: number;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  prevMessage,
  onReply,
  index,
}) => {
  const [showActions, setShowActions] = useState(false);

  // Determine if this is part of a sequence from the same sender
  const isSequential =
    prevMessage &&
    prevMessage.sender.id === message.sender.id &&
    message.timestamp.getTime() - prevMessage.timestamp.getTime() < 60000; // 1 minute

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Status icon
  const StatusIcon = () => {
    if (!message.isMine) return null;

    switch (message.status) {
      case 'sent':
        return <Check className="w-3.5 h-3.5" />;
      case 'delivered':
        return <CheckCheck className="w-3.5 h-3.5 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3.5 h-3.5 text-blue-500" />;
      default:
        return null;
    }
  };

  // Animation variants
  const messageVariants = {
    hidden: {
      opacity: 0,
      x: message.isMine ? 20 : -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        delay: index * 0.05, // Staggered appearance
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-col ${
        message.isMine ? 'items-end' : 'items-start'
      } ${isSequential ? 'mt-1' : 'mt-4'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      initial="hidden"
      animate="visible"
      variants={messageVariants}>
      {/* Reply Reference */}
      {message.replyTo && (
        <div
          className={`flex items-center max-w-[75%] rounded-lg px-3 py-1.5 text-xs mb-1 shadow-sm ${
            message.isMine ? 'bg-blue-50 mr-2' : 'bg-gray-50 ml-2'
          }`}>
          <div
            className={`w-1 h-8 mr-2 rounded-full ${
              message.isMine ? 'bg-blue-400' : 'bg-gray-400'
            }`}></div>
          <div className="flex-1">
            <div
              className={`font-medium ${
                message.isMine ? 'text-blue-600' : 'text-gray-700'
              }`}>
              {message.replyTo.sender}
            </div>
            <div className="truncate text-gray-600">
              {message.replyTo.content}
            </div>
          </div>
        </div>
      )}

      {/* Message Container */}
      <div className="group relative flex max-w-[75%]">
        {/* Sender Avatar (only for first message in sequence) */}
        {!message.isMine && !isSequential && (
          <div className="mr-2">
            <Avatar
              name={message.sender.name}
              image={message.sender.avatar}
              size="sm"
              colorSeed={message.sender.id.charCodeAt(0)}
            />
          </div>
        )}

        {/* Message Space for alignment */}
        {!message.isMine && isSequential && <div className="w-8 mr-2"></div>}

        {/* Message Content */}
        <div
          className={`relative rounded-2xl px-3.5 py-2.5 shadow-md ${
            message.isMine
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none'
              : 'bg-white border border-gray-200 rounded-tl-none'
          }`}>
          {/* Sender name (for group chats, non-sequential messages) */}
          {!message.isMine && !isSequential && (
            <div className="text-xs font-semibold text-blue-600 mb-1">
              {message.sender.name}
            </div>
          )}

          {/* Message Text */}
          <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </p>

          {/* Message Footer */}
          <div
            className={`flex items-center space-x-1 text-xs mt-1.5 ${
              message.isMine ? 'text-blue-100' : 'text-gray-500'
            }`}>
            <span>{formatTime(message.timestamp)}</span>
            {message.verified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}>
                <ShieldCheck
                  className={`w-3.5 h-3.5 ${
                    message.isMine ? 'text-blue-200' : 'text-emerald-500'
                  }`}
                />
              </motion.div>
            )}
            <StatusIcon />
          </div>
        </div>

        {/* Message Actions - visible on hover */}
        {showActions && (
          <motion.div
            className={`absolute top-0 ${
              message.isMine
                ? 'left-0 -translate-x-full'
                : 'right-0 translate-x-full'
            } flex bg-white rounded-full shadow-md p-1`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}>
            <motion.button
              className="p-1.5 rounded-full hover:bg-gray-100"
              onClick={() => onReply(message.id)}
              whileHover={{ backgroundColor: 'rgba(243, 244, 246, 1)' }}
              whileTap={{ scale: 0.9 }}>
              <Reply className="w-4 h-4 text-blue-500" />
            </motion.button>
            <motion.button
              className="p-1.5 rounded-full hover:bg-gray-100"
              whileHover={{ backgroundColor: 'rgba(243, 244, 246, 1)' }}
              whileTap={{ scale: 0.9 }}>
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
