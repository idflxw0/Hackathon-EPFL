import React, { createContext, useContext, useState } from 'react';
import { Message } from '../components/chat/ChatMessage';

// Define types
export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline';
  verified: boolean;
}

export interface ChatData {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  verified: boolean;
  isGroup: boolean;
  participants?: Contact[];
  messages: Message[];
}

interface ChatContextType {
  chats: ChatData[];
  contacts: Contact[];
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
  createChat: (contactId: string) => void;
  createGroup: (name: string, participantIds: string[]) => void;
  deleteChat: (chatId: string) => void;
  sendMessage: (chatId: string, content: string, replyToId?: string) => void;
  setChats: React.Dispatch<React.SetStateAction<ChatData[]>>;
}

// Create context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Mock data for contacts
const mockContacts: Contact[] = [
  {
    id: 'alice',
    name: 'Alice Smith',
    avatar: '/avatars/alice.png',
    status: 'online',
    verified: true,
  },
  {
    id: 'bob',
    name: 'Bob Johnson',
    avatar: '/avatars/bob.png',
    status: 'offline',
    verified: true,
  },
  {
    id: 'charlie',
    name: 'Charlie Davis',
    avatar: '/avatars/charlie.png',
    status: 'online',
    verified: false,
  },
  {
    id: 'david',
    name: 'David Wilson',
    avatar: '/avatars/david.png',
    status: 'offline',
    verified: true,
  },
  {
    id: 'eva',
    name: 'Eva Martinez',
    avatar: '/avatars/eva.png',
    status: 'online',
    verified: true,
  },
  {
    id: 'frank',
    name: 'Frank Thomas',
    avatar: '/avatars/frank.png',
    status: 'offline',
    verified: false,
  },
];

// Mock messages for Alice
const aliceMessages: Message[] = [
  {
    id: '1',
    sender: { id: 'alice', name: 'Alice', avatar: '/avatars/alice.png' },
    content: 'Hey there! How are you doing?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'read',
    verified: true,
    isMine: false,
  },
  {
    id: '2',
    sender: { id: 'me', name: 'Me' },
    content:
      "I'm doing great! Just working on this new chat app design. How about you?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
    status: 'read',
    verified: true,
    isMine: true,
  },
  {
    id: '3',
    sender: { id: 'alice', name: 'Alice', avatar: '/avatars/alice.png' },
    content:
      'That sounds interesting! Can you tell me more about the security features?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
    status: 'read',
    verified: true,
    isMine: false,
  },
  {
    id: '4',
    sender: { id: 'me', name: 'Me' },
    content:
      "Sure! We're implementing end-to-end encryption and blockchain verification for all messages.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22 + 1000 * 60 * 5), // 21 hours and 55 minutes ago
    status: 'read',
    verified: true,
    isMine: true,
  },
  {
    id: '5',
    sender: { id: 'me', name: 'Me' },
    content:
      'This ensures that messages cannot be tampered with and provides a cryptographic proof of authenticity.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22 + 1000 * 60 * 7), // 21 hours and 53 minutes ago
    status: 'read',
    verified: true,
    isMine: true,
  },
  {
    id: '6',
    sender: { id: 'alice', name: 'Alice', avatar: '/avatars/alice.png' },
    content: 'That sounds really secure! Is it difficult to implement?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: 'read',
    verified: true,
    isMine: false,
  },
  {
    id: '7',
    sender: { id: 'me', name: 'Me' },
    content:
      "It has its challenges, but the libraries we're using make it much easier.",
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    status: 'read',
    verified: true,
    isMine: true,
  },
  {
    id: '8',
    sender: { id: 'alice', name: 'Alice', avatar: '/avatars/alice.png' },
    content: 'When do you think it will be ready for testing?',
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    status: 'read',
    verified: true,
    isMine: false,
    replyTo: {
      id: '7',
      content:
        "It has its challenges, but the libraries we're using make it much easier.",
      sender: 'You',
    },
  },
  {
    id: '9',
    sender: { id: 'me', name: 'Me' },
    content:
      "We're aiming to have a prototype ready by the end of next week. I'll let you know when you can try it out!",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    status: 'delivered',
    verified: true,
    isMine: true,
  },
];

// Mock data for initial chats
const initialChats: ChatData[] = [
  {
    id: 'chat-alice',
    name: 'Alice Smith',
    avatar: '/avatars/alice.png',
    lastMessage: 'When do you think it will be ready for testing?',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    unreadCount: 0,
    verified: true,
    isGroup: false,
    messages: aliceMessages,
  },
  {
    id: 'chat-bob',
    name: 'Bob Johnson',
    avatar: '/avatars/bob.png',
    lastMessage: 'The meeting is scheduled for tomorrow.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 0,
    verified: true,
    isGroup: false,
    messages: [
      {
        id: 'b1',
        sender: { id: 'bob', name: 'Bob', avatar: '/avatars/bob.png' },
        content: 'Hi there, do you have time for a meeting tomorrow?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        status: 'read',
        verified: true,
        isMine: false,
      },
      {
        id: 'b2',
        sender: { id: 'me', name: 'Me' },
        content: 'Sure, what time were you thinking?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        status: 'read',
        verified: true,
        isMine: true,
      },
      {
        id: 'b3',
        sender: { id: 'bob', name: 'Bob', avatar: '/avatars/bob.png' },
        content: 'How about 10 AM?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        status: 'read',
        verified: true,
        isMine: false,
      },
      {
        id: 'b4',
        sender: { id: 'me', name: 'Me' },
        content: 'Works for me.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
        status: 'read',
        verified: true,
        isMine: true,
      },
      {
        id: 'b5',
        sender: { id: 'bob', name: 'Bob', avatar: '/avatars/bob.png' },
        content: 'The meeting is scheduled for tomorrow.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: 'read',
        verified: true,
        isMine: false,
      },
    ],
  },
  {
    id: 'chat-project-team',
    name: 'Project Team',
    avatar: '/avatars/group.png',
    lastMessage: "Charlie: I've updated the documentation.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 5,
    verified: false,
    isGroup: true,
    participants: [
      mockContacts[0], // Alice
      mockContacts[1], // Bob
      mockContacts[2], // Charlie
      { id: 'me', name: 'Me', status: 'online', verified: true },
    ],
    messages: [
      {
        id: 'pt1',
        sender: { id: 'alice', name: 'Alice', avatar: '/avatars/alice.png' },
        content: 'Has everyone reviewed the latest design?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        status: 'read',
        verified: true,
        isMine: false,
      },
      {
        id: 'pt2',
        sender: { id: 'bob', name: 'Bob', avatar: '/avatars/bob.png' },
        content: 'Yes, I think it looks good!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        status: 'read',
        verified: true,
        isMine: false,
      },
      {
        id: 'pt3',
        sender: { id: 'me', name: 'Me' },
        content: 'I have some suggestions for the security section.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        status: 'read',
        verified: true,
        isMine: true,
      },
      {
        id: 'pt4',
        sender: {
          id: 'charlie',
          name: 'Charlie',
          avatar: '/avatars/charlie.png',
        },
        content: "I've updated the documentation.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        status: 'read',
        verified: false,
        isMine: false,
      },
    ],
  },
  {
    id: 'chat-david',
    name: 'David Wilson',
    avatar: '/avatars/david.png',
    lastMessage: 'Can you send me the files?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0,
    verified: true,
    isGroup: false,
    messages: [
      {
        id: 'd1',
        sender: { id: 'david', name: 'David', avatar: '/avatars/david.png' },
        content: 'Hey, do you have those security implementation files?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
        status: 'read',
        verified: true,
        isMine: false,
      },
      {
        id: 'd2',
        sender: { id: 'me', name: 'Me' },
        content: "Yes, I'll gather them for you.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5),
        status: 'read',
        verified: true,
        isMine: true,
      },
      {
        id: 'd3',
        sender: { id: 'david', name: 'David', avatar: '/avatars/david.png' },
        content: 'Can you send me the files?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        status: 'read',
        verified: true,
        isMine: false,
      },
    ],
  },
];

// Provider component
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chats, setChats] = useState<ChatData[]>(initialChats);
  const [contacts] = useState<Contact[]>(mockContacts);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(
    initialChats[0].id
  );

  // Create a new chat with a contact
  const createChat = (contactId: string) => {
    const contact = contacts.find((c) => c.id === contactId);

    if (!contact) return;

    // Check if chat already exists
    const existingChat = chats.find(
      (chat) =>
        !chat.isGroup && chat.participants?.some((p) => p.id === contactId)
    );

    if (existingChat) {
      setSelectedChatId(existingChat.id);
      return;
    }

    // Create new chat
    const newChat: ChatData = {
      id: `chat-${Date.now()}`,
      name: contact.name,
      avatar: contact.avatar,
      lastMessage: 'Start a conversation',
      timestamp: new Date(),
      unreadCount: 0,
      verified: contact.verified,
      isGroup: false,
      participants: [
        contact,
        { id: 'me', name: 'Me', status: 'online', verified: true },
      ],
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setSelectedChatId(newChat.id);
  };

  // Create a new group chat
  const createGroup = (name: string, participantIds: string[]) => {
    const participants = contacts
      .filter((contact) => participantIds.includes(contact.id))
      .concat({ id: 'me', name: 'Me', status: 'online', verified: true });

    if (participants.length <= 1) return; // Need at least 1 contact + me

    const newGroup: ChatData = {
      id: `group-${Date.now()}`,
      name,
      avatar: '/avatars/group.png',
      lastMessage: 'Group created',
      timestamp: new Date(),
      unreadCount: 0,
      verified: true,
      isGroup: true,
      participants,
      messages: [],
    };

    setChats((prev) => [newGroup, ...prev]);
    setSelectedChatId(newGroup.id);
  };

  // Delete a chat
  const deleteChat = (chatId: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));

    if (selectedChatId === chatId) {
      setSelectedChatId(chats.length > 1 ? chats[0].id : null);
    }
  };

  // Send a message to a chat
  const sendMessage = (chatId: string, content: string, replyToId?: string) => {
    setChats((prev) => {
      return prev.map((chat) => {
        if (chat.id !== chatId) return chat;

        // Get the message being replied to if applicable
        let replyTo = undefined;
        if (replyToId) {
          const replyMessage = chat.messages.find((m) => m.id === replyToId);
          if (replyMessage) {
            replyTo = {
              id: replyToId,
              content: replyMessage.content,
              sender: replyMessage.sender.name,
            };
          }
        }

        // Create new message
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          sender: { id: 'me', name: 'Me' },
          content,
          timestamp: new Date(),
          status: 'sent',
          verified: true,
          isMine: true,
          replyTo,
        };

        // Update the chat with the new message
        return {
          ...chat,
          lastMessage: `You: ${content}`,
          timestamp: new Date(),
          messages: [...chat.messages, newMessage],
        };
      });
    });

    // Simulate message status changes to "delivered"
    setTimeout(() => {
      setChats((prev) => {
        return prev.map((chat) => {
          if (chat.id !== chatId) return chat;

          return {
            ...chat,
            messages: chat.messages.map((msg) => {
              if (
                msg.id === `msg-${Date.now() - 1000}` &&
                msg.status === 'sent'
              ) {
                return { ...msg, status: 'delivered' };
              }
              return msg;
            }),
          };
        });
      });
    }, 1000);

    // Simulate message status changes to "read"
    setTimeout(() => {
      setChats((prev) => {
        return prev.map((chat) => {
          if (chat.id !== chatId) return chat;

          return {
            ...chat,
            messages: chat.messages.map((msg) => {
              if (msg.sender.id === 'me' && msg.status === 'delivered') {
                return { ...msg, status: 'read' };
              }
              return msg;
            }),
          };
        });
      });
    }, 2000);
  };

  // Context value
  const value = {
    chats,
    setChats,
    contacts,
    selectedChatId,
    setSelectedChatId,
    createChat,
    createGroup,
    deleteChat,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Custom hook for using the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
