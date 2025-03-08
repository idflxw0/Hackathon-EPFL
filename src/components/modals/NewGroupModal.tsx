import React, { useState } from 'react';
import { X, Search, Check } from 'lucide-react';
import { useChat, Contact } from '../../context/ChatContext';

interface NewGroupModalProps {
  onClose: () => void;
}

export const NewGroupModal: React.FC<NewGroupModalProps> = ({ onClose }) => {
  const { contacts, createGroup } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [groupName, setGroupName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [step, setStep] = useState<'select' | 'name'>('select');

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleContact = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleNext = () => {
    if (selectedContacts.length > 0) {
      setStep('name');
    }
  };

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedContacts.length > 0) {
      createGroup(groupName, selectedContacts);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium text-lg">
            {step === 'select' ? 'Select Group Members' : 'New Group'}
          </h3>
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={onClose}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {step === 'select' ? (
          <>
            {/* Search */}
            <div className="p-3 border-b">
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

            {/* Selected count */}
            {selectedContacts.length > 0 && (
              <div className="p-2 bg-blue-50 text-blue-600 text-sm font-medium">
                {selectedContacts.length} contact
                {selectedContacts.length !== 1 ? 's' : ''} selected
              </div>
            )}

            {/* Contact list */}
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.length > 0 ? (
                <div className="divide-y">
                  {filteredContacts.map((contact) => (
                    <ContactSelectItem
                      key={contact.id}
                      contact={contact}
                      isSelected={selectedContacts.includes(contact.id)}
                      onToggle={handleToggleContact}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No contacts found.
                </div>
              )}
            </div>

            {/* Next button */}
            <div className="p-3 border-t">
              <button
                className={`w-full py-2 rounded-lg text-sm font-medium ${
                  selectedContacts.length > 0
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                onClick={handleNext}
                disabled={selectedContacts.length === 0}>
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Group name input */}
            <div className="p-4">
              <div className="mb-2 text-sm font-medium text-gray-700">
                Group Name
              </div>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>

            {/* Selected contacts */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="mb-2 text-sm font-medium text-gray-700">
                {selectedContacts.length} Participants
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedContacts.map((contactId) => {
                  const contact = contacts.find((c) => c.id === contactId);
                  if (!contact) return null;

                  return (
                    <div
                      key={contact.id}
                      className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                      <div className="w-6 h-6 bg-gray-300 rounded-full mr-1 overflow-hidden">
                        {contact.avatar ? (
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium">
                            {contact.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium">
                        {contact.name}
                      </span>
                      <button
                        className="ml-1 p-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleToggleContact(contact.id)}>
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Create button */}
            <div className="p-3 border-t">
              <button
                className={`w-full py-2 rounded-lg text-sm font-medium ${
                  groupName.trim()
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                onClick={handleCreateGroup}
                disabled={!groupName.trim()}>
                Create Group
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface ContactSelectItemProps {
  contact: Contact;
  isSelected: boolean;
  onToggle: (contactId: string) => void;
}

const ContactSelectItem: React.FC<ContactSelectItemProps> = ({
  contact,
  isSelected,
  onToggle,
}) => {
  return (
    <div
      className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
      onClick={() => onToggle(contact.id)}>
      {/* Selection circle */}
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
          isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
        }`}>
        {isSelected && <Check className="w-3 h-3 text-white" />}
      </div>

      {/* Avatar */}
      <div className="relative flex-shrink-0 ml-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium overflow-hidden">
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
      </div>

      {/* Name */}
      <div className="ml-3 flex-1">
        <div className="font-medium">{contact.name}</div>
        <div className="text-xs text-gray-500">
          {contact.status === 'online' ? 'Online' : 'Offline'}
        </div>
      </div>
    </div>
  );
};
