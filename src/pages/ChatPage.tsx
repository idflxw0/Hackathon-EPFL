import React from 'react';
import { Shield } from 'lucide-react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { ChatWindow } from '../components/chat/ChatWindow';
import { ChatProvider } from '../context/ChatContext';
import { ToastProvider } from '../components/common/Toast';

const ChatPage: React.FC = () => {
  return (
    <ToastProvider>
      <ChatProvider>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-8 h-8 text-blue-500" />
                  <h1 className="text-2xl font-bold text-gray-900">
                    Secure Chat Verifier
                  </h1>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Connected to Hedera</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Mina Proof Ready</span>
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="flex h-[calc(100vh-4.5rem)] bg-white">
            {/* Left panel: Sidebar with chats/contacts */}
            <Sidebar />

            {/* Center and right panels: ChatWindow (contains chat and info panel) */}
            <div className="flex-1">
              <ChatWindow />
            </div>
          </div>
        </div>
      </ChatProvider>
    </ToastProvider>
  );
};

export default ChatPage;
