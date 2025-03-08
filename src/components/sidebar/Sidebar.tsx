import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { SidebarHeader } from './SidebarHeader';
import { ChatList } from './ChatList';
import { ContactList } from './ContactList';
import { NewChatModal } from '../modals/NewChatModal';
import { NewGroupModal } from '../modals/NewGroupModal';

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts'>('chats');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewChat = () => {
    setShowNewChatModal(true);
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-md border-r border-gray-200 w-80">
      <SidebarHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNewChat={handleNewChat}
      />

      {/* Tabs */}
      <div className="flex border-b bg-white">
        <button
          className={`flex-1 py-3 font-medium text-sm transition-all ${
            activeTab === 'chats'
              ? 'text-blue-600 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('chats')}>
          Chats
        </button>
        <button
          className={`flex-1 py-3 font-medium text-sm transition-all ${
            activeTab === 'contacts'
              ? 'text-blue-600 border-b-2 border-blue-500'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('contacts')}>
          Contacts
        </button>
      </div>

      {/* List content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'chats' ? (
          <ChatList searchQuery={searchQuery} />
        ) : (
          <ContactList />
        )}
      </div>

      {/* Actions - Only show on Chats tab */}
      {activeTab === 'chats' && (
        <div className="p-3 border-t bg-gray-50">
          <button
            className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
            onClick={() => setShowNewGroupModal(true)}>
            <Users className="w-5 h-5" />
            <span>New Group</span>
          </button>
        </div>
      )}

      {/* Modals */}
      {showNewChatModal && (
        <NewChatModal onClose={() => setShowNewChatModal(false)} />
      )}

      {showNewGroupModal && (
        <NewGroupModal onClose={() => setShowNewGroupModal(false)} />
      )}
    </div>
  );
};
