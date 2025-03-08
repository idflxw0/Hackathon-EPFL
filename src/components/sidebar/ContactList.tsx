import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ContactItem } from './ContactItem';
import { useChat } from '../../context/ChatContext';

export const ContactList: React.FC = () => {
  const { contacts } = useChat();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group contacts alphabetically
  const groupedContacts = filteredContacts.reduce((groups, contact) => {
    const firstLetter = contact.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(contact);
    return groups;
  }, {} as Record<string, typeof contacts>);

  // Sort letters alphabetically
  const sortedLetters = Object.keys(groupedContacts).sort();

  return (
    <div>
      {/* Search bar */}
      <div className="p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-8 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-gray-500 absolute left-2 top-3" />
        </div>
      </div>

      {/* Contact list */}
      {filteredContacts.length > 0 ? (
        sortedLetters.map((letter) => (
          <div key={letter}>
            <div className="sticky top-0 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
              {letter}
            </div>
            <div className="divide-y">
              {groupedContacts[letter].map((contact) => (
                <ContactItem key={contact.id} contact={contact} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">No contacts found.</div>
      )}
    </div>
  );
};
