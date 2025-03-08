import React, { useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import { ChatInfo } from '../info/ChatInfo';
import { DeleteChatModal } from '../modals/DeleteChatModal';
import { useChat } from '../../context/ChatContext';
import { AnimatePresence } from 'framer-motion';

export const ChatWindow: React.FC = () => {
  const { chats, selectedChatId, sendMessage } = useChat();
  const [showInfo, setShowInfo] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [replyTo, setReplyTo] = useState<
    | {
        id: string;
        content: string;
        sender: string;
      }
    | undefined
  >(undefined);

  // Get the currently selected chat
  const selectedChat = selectedChatId
    ? chats.find((chat) => chat.id === selectedChatId)
    : null;

  const handleSendMessage = (content: string) => {
    if (selectedChatId) {
      sendMessage(selectedChatId, content, replyTo?.id);
      setReplyTo(undefined);
    }
  };

  const handleReply = (messageId: string) => {
    if (!selectedChat) return;

    const messageToReply = selectedChat.messages.find(
      (msg) => msg.id === messageId
    );
    if (messageToReply) {
      setReplyTo({
        id: messageId,
        content: messageToReply.content,
        sender: messageToReply.sender.name,
      });
    }
  };

  // If no chat is selected, show a placeholder
  if (!selectedChat) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50">
        <div className="mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.5 20 9.18 19.612 8 18.92L3 20L4.5 17C3.5 15.918 3 14.522 3 13C3 8.582 7.03 5 12 5C16.97 5 21 8.582 21 12Z"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="text-lg font-medium text-gray-700 mb-2">
          Select a chat or start a new conversation
        </div>
        <p className="text-gray-500 text-center max-w-md">
          Choose a contact from the sidebar to start messaging, or create a new
          chat by clicking the "New Chat" button.
        </p>
      </div>
    );
  }

  // Create a chat data object for the header and info panel
  const chatData = {
    id: selectedChat.id,
    name: selectedChat.name,
    avatar: selectedChat.avatar,
    status: selectedChat.isGroup
      ? undefined
      : selectedChat.participants?.find((p) => p.id !== 'me')?.status ||
        'offline',
    isGroup: selectedChat.isGroup,
    participants: selectedChat.participants,
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main chat area */}
      <div className="flex flex-col flex-1 bg-gray-50">
        <ChatHeader
          chat={chatData}
          onInfoToggle={() => setShowInfo(!showInfo)}
        />

        <ChatMessageList
          messages={selectedChat.messages}
          onReply={handleReply}
        />

        <ChatInput
          onSendMessage={handleSendMessage}
          replyTo={replyTo}
          onCancelReply={() => setReplyTo(undefined)}
        />
      </div>

      {/* Info panel - conditionally shown */}
      <AnimatePresence>
        {showInfo && (
          <ChatInfo
            chat={chatData}
            onClose={() => setShowInfo(false)}
            onDeleteChat={() => setShowDeleteModal(true)}
          />
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteChatModal
          chatId={selectedChat.id}
          chatName={selectedChat.name}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};
