import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Bell,
  Lock,
  Trash,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar } from '../common/Avatar';

interface ChatInfoProps {
  chat: {
    id: string;
    name: string;
    avatar?: string;
    status?: 'online' | 'offline';
    isGroup?: boolean;
    participants?: {
      id: string;
      name: string;
      avatar?: string;
      status?: 'online' | 'offline';
    }[];
  };
  onClose: () => void;
  onDeleteChat: () => void;
}

export const ChatInfo: React.FC<ChatInfoProps> = ({
  chat,
  onClose,
  onDeleteChat,
}) => {
  const [showSecurity, setShowSecurity] = useState(true);
  const [showParticipants, setShowParticipants] = useState(true);
  const [showMedia, setShowMedia] = useState(false);

  return (
    <motion.div
      className="h-full flex flex-col bg-white border-l shadow-lg w-80"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-lg text-gray-800">Chat Info</h3>
        <button
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
          onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Contact/Group Info */}
        <div className="p-6 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white">
          <Avatar
            name={chat.name}
            image={chat.avatar}
            size="xl"
            status={chat.status}
            isGroup={chat.isGroup}
          />

          <h2 className="text-xl font-bold mt-3 text-gray-900">{chat.name}</h2>

          {!chat.isGroup && chat.status && (
            <div className="flex items-center space-x-1 mt-1 text-sm text-gray-600">
              <div
                className={`w-2 h-2 rounded-full ${
                  chat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              <span>{chat.status === 'online' ? 'Online' : 'Offline'}</span>
            </div>
          )}

          {chat.isGroup && chat.participants && (
            <div className="text-sm text-gray-600 mt-1">
              {chat.participants.length} participants
            </div>
          )}
        </div>

        {/* Security Info - Collapsible */}
        <div className="p-4 border-b border-gray-100">
          <button
            className="flex items-center justify-between w-full py-2 px-1"
            onClick={() => setShowSecurity(!showSecurity)}>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Security</h4>
            </div>
            {showSecurity ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          <AnimatePresence>
            {showSecurity && (
              <motion.div
                className="mt-2 pl-11 space-y-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Verified</div>
                    <div className="text-sm text-gray-600">
                      All messages are verified
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Lock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      End-to-End Encrypted
                    </div>
                    <div className="text-sm text-gray-600">
                      Messages are secure
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Group Participants - Collapsible */}
        {chat.isGroup && chat.participants && (
          <div className="p-4 border-b border-gray-100">
            <button
              className="flex items-center justify-between w-full py-2 px-1"
              onClick={() => setShowParticipants(!showParticipants)}>
              <h4 className="font-semibold text-gray-800">
                Participants ({chat.participants.length})
              </h4>
              {showParticipants ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            <AnimatePresence>
              {showParticipants && (
                <motion.div
                  className="mt-2 space-y-2"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  {chat.participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                      <Avatar
                        name={participant.name}
                        image={participant.avatar}
                        size="sm"
                        status={participant.status}
                      />
                      <div className="ml-3 font-medium text-gray-800">
                        {participant.name}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Media and Files - Collapsible */}
        <div className="p-4 border-b border-gray-100">
          <button
            className="flex items-center justify-between w-full py-2 px-1"
            onClick={() => setShowMedia(!showMedia)}>
            <h4 className="font-semibold text-gray-800">Shared Media</h4>
            {showMedia ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          <AnimatePresence>
            {showMedia && (
              <motion.div
                className="mt-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <div className="flex items-center justify-center h-24 bg-gray-50 rounded-lg border border-gray-200 text-gray-500 text-sm">
                  No media shared yet
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t bg-gray-50">
        <div className="space-y-2">
          <button className="flex items-center space-x-3 w-full p-2 text-left hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800">Mute Notifications</span>
          </button>

          <button
            className="flex items-center space-x-3 w-full p-2 text-left text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            onClick={onDeleteChat}>
            <Trash className="w-5 h-5" />
            <span>Delete Chat</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
