import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { useChat, Contact } from '../../context/ChatContext';
import { ModalTransition } from '../animations/Transitions';
import { motion } from 'framer-motion';

interface NewChatModalProps {
  onClose: () => void;
}

export const NewChatModal: React.FC<NewChatModalProps> = ({ onClose }) => {
  const { contacts, createChat } = useChat();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectContact = (contactId: string) => {
    createChat(contactId);
    onClose();
  };

  return (
    <ModalTransition isVisible={true}>
      <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium text-lg">New Chat</h3>
          <motion.button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={onClose}
            whileTap={{ scale: 0.95 }}>
            <X className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>

        {/* Search */}
        <div className="p-3 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-8 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-2 top-3" />
          </div>
        </div>

        {/* Contact list */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length > 0 ? (
            <motion.div
              className="divide-y"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}>
              {filteredContacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  onSelect={handleSelectContact}
                />
              ))}
            </motion.div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No contacts found.
            </div>
          )}
        </div>
      </div>
    </ModalTransition>
  );
};

interface ContactItemProps {
  contact: Contact;
  onSelect: (contactId: string) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onSelect }) => {
  return (
    <motion.div
      className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
      onClick={() => onSelect(contact.id)}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ backgroundColor: 'rgba(243, 244, 246, 1)' }}
      whileTap={{ scale: 0.98 }}>
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium overflow-hidden shadow-sm">
          {contact.avatar ? (
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-full h-full object-cover"
            />
          ) : (
            contact.name.charAt(0)
          )}
        </div>
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
            contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
          }`}></div>
      </div>

      {/* Name */}
      <div className="ml-3 flex-1">
        <div className="font-medium">{contact.name}</div>
        <div className="text-xs text-gray-500">
          {contact.status === 'online' ? 'Online' : 'Offline'}
        </div>
      </div>
    </motion.div>
  );
};
