import React from 'react';
import { ShieldCheck, MoreVertical, Info } from 'lucide-react';

interface ChatHeaderProps {
  chat: {
    id: string;
    name: string;
    avatar?: string;
    status?: 'online' | 'offline';
    isGroup?: boolean;
    participants?: { id: string; name: string }[];
  };
  onInfoToggle: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  chat,
  onInfoToggle,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      {/* Contact/Group Info */}
      <div className="flex items-center">
        <div className="relative">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium overflow-hidden">
            {chat.avatar ? (
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-full h-full object-cover"
              />
            ) : (
              chat.name.charAt(0)
            )}
          </div>
          {chat.status && (
            <div
              className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                chat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`}></div>
          )}
        </div>

        <div className="ml-3">
          <div className="flex items-center space-x-1">
            <h2 className="font-semibold">{chat.name}</h2>
            <ShieldCheck className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-xs text-gray-500">
            {chat.isGroup
              ? `${chat.participants?.length} participants`
              : chat.status === 'online'
              ? 'Online'
              : 'Offline'}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <button
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
          onClick={onInfoToggle}>
          <Info className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
