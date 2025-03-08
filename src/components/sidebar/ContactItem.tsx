import React from 'react';
import { ShieldCheck, MessageSquare } from 'lucide-react';
import { useChat, Contact } from '../../context/ChatContext';
import { Avatar } from '../common/Avatar';

interface ContactItemProps {
  contact: Contact;
}

export const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  const { createChat } = useChat();

  const handleStartChat = () => {
    createChat(contact.id);
  };

  return (
    <div className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
      {/* Avatar */}
      <Avatar
        name={contact.name}
        image={contact.avatar}
        size="md"
        status={contact.status}
      />

      {/* Content */}
      <div className="ml-3 flex-1">
        <div className="flex items-center">
          <div className="font-medium">{contact.name}</div>
          {contact.verified && (
            <ShieldCheck className="w-4 h-4 ml-1 text-emerald-500" />
          )}
        </div>
        <div className="text-xs text-gray-500">
          {contact.status === 'online' ? 'Online' : 'Offline'}
        </div>
      </div>

      {/* Action */}
      <button
        className="p-2 rounded-full hover:bg-gray-200"
        onClick={handleStartChat}>
        <MessageSquare className="w-5 h-5 text-blue-500" />
      </button>
    </div>
  );
};
