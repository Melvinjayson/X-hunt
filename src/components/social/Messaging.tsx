'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  PaperAirplaneIcon,
  PhotoIcon,
  FaceSmileIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  LockClosedIcon,
  CalendarIcon,
  UserGroupIcon,
  PhoneIcon,
  VideoCameraIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface Message {
  id: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'event' | 'system';
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
  isRead: boolean;
  isDelivered: boolean;
  metadata?: {
    fileName?: string;
    fileSize?: number;
    imageUrl?: string;
    eventTitle?: string;
    eventDate?: string;
    eventLocation?: string;
  };
}

interface Conversation {
  id: string;
  type: 'direct' | 'group';
  name: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen?: string;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  isEncrypted: boolean;
  avatar?: string;
  createdAt: string;
}

interface MessagingProps {
  userId: string;
}

export function Messaging({ userId }: MessagingProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNewChat, setShowNewChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data for development
  const mockConversations: Conversation[] = [
    {
      id: '1',
      type: 'direct',
      name: 'Sarah Johnson',
      participants: [
        {
          id: '2',
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
          isOnline: true,
        },
      ],
      lastMessage: {
        id: 'msg1',
        content: 'Hey! Are you joining the hiking challenge this weekend?',
        type: 'text',
        senderId: '2',
        senderName: 'Sarah Johnson',
        timestamp: '2024-01-15T10:30:00Z',
        isRead: false,
        isDelivered: true,
      },
      unreadCount: 2,
      isEncrypted: true,
      createdAt: '2024-01-10T00:00:00Z',
    },
    {
      id: '2',
      type: 'group',
      name: 'SF Foodies Group',
      participants: [
        {
          id: '3',
          name: 'Mike Chen',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          isOnline: false,
          lastSeen: '2 hours ago',
        },
        {
          id: '4',
          name: 'Emma Wilson',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
          isOnline: true,
        },
        {
          id: '5',
          name: 'Alex Rodriguez',
          isOnline: false,
          lastSeen: '1 day ago',
        },
      ],
      lastMessage: {
        id: 'msg2',
        content: 'The new restaurant downtown is amazing! Who wants to check it out?',
        type: 'text',
        senderId: '3',
        senderName: 'Mike Chen',
        timestamp: '2024-01-15T09:15:00Z',
        isRead: true,
        isDelivered: true,
      },
      unreadCount: 0,
      isEncrypted: false,
      avatar: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100',
      createdAt: '2024-01-08T00:00:00Z',
    },
    {
      id: '3',
      type: 'direct',
      name: 'Adventure Guide Tom',
      participants: [
        {
          id: '6',
          name: 'Adventure Guide Tom',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
          isOnline: false,
          lastSeen: '30 minutes ago',
        },
      ],
      lastMessage: {
        id: 'msg3',
        content: 'Thanks for booking the mountain hiking experience! See you Saturday at 8 AM.',
        type: 'text',
        senderId: '6',
        senderName: 'Adventure Guide Tom',
        timestamp: '2024-01-14T16:45:00Z',
        isRead: true,
        isDelivered: true,
      },
      unreadCount: 0,
      isEncrypted: false,
      createdAt: '2024-01-14T00:00:00Z',
    },
  ];

  const mockMessages: Message[] = [
    {
      id: 'msg1',
      content: 'Hey! How are you doing?',
      type: 'text',
      senderId: '2',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      timestamp: '2024-01-15T10:00:00Z',
      isRead: true,
      isDelivered: true,
    },
    {
      id: 'msg2',
      content: 'I\'m great! Just finished an amazing cooking class experience.',
      type: 'text',
      senderId: userId,
      senderName: 'You',
      timestamp: '2024-01-15T10:05:00Z',
      isRead: true,
      isDelivered: true,
    },
    {
      id: 'msg3',
      content: 'Check out this photo from the class!',
      type: 'image',
      senderId: userId,
      senderName: 'You',
      timestamp: '2024-01-15T10:06:00Z',
      isRead: true,
      isDelivered: true,
      metadata: {
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      },
    },
    {
      id: 'msg4',
      content: 'Wow, that looks delicious! Are you joining the hiking challenge this weekend?',
      type: 'text',
      senderId: '2',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      isDelivered: true,
    },
    {
      id: 'msg5',
      content: 'Weekend Hiking Challenge',
      type: 'event',
      senderId: '2',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      timestamp: '2024-01-15T10:31:00Z',
      isRead: false,
      isDelivered: true,
      metadata: {
        eventTitle: 'Weekend Hiking Challenge',
        eventDate: '2024-01-20T08:00:00Z',
        eventLocation: 'Golden Gate Park',
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setConversations(mockConversations);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      setMessages(mockMessages);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      content: newMessage,
      type: 'text',
      senderId: userId,
      senderName: 'You',
      timestamp: new Date().toISOString(),
      isRead: false,
      isDelivered: true,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Update conversation's last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: message }
        : conv
    ));
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatLastSeen = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const renderMessage = (message: Message) => {
    const isOwnMessage = message.senderId === userId;
    
    return (
      <div key={message.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
        {!isOwnMessage && (
          <Image
            src={message.senderAvatar || '/images/default-avatar.png'}
            alt={message.senderName}
            width={32}
            height={32}
            className="rounded-full mr-2 mt-1"
          />
        )}
        
        <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-1' : 'order-2'}`}>
          {message.type === 'text' && (
            <div className={`px-4 py-2 rounded-lg ${
              isOwnMessage 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}>
              <p>{message.content}</p>
            </div>
          )}
          
          {message.type === 'image' && (
            <div className="space-y-2">
              {message.content && (
                <div className={`px-4 py-2 rounded-lg ${
                  isOwnMessage 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p>{message.content}</p>
                </div>
              )}
              {message.metadata?.imageUrl && (
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={message.metadata.imageUrl}
                    alt="Shared image"
                    width={300}
                    height={200}
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          )}
          
          {message.type === 'event' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500 rounded-full p-2">
                  <CalendarIcon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900">{message.metadata?.eventTitle}</h4>
                  {message.metadata?.eventDate && (
                    <p className="text-sm text-blue-700">
                      {new Date(message.metadata.eventDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  )}
                  {message.metadata?.eventLocation && (
                    <p className="text-sm text-blue-600">{message.metadata.eventLocation}</p>
                  )}
                  <div className="flex space-x-2 mt-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                      Join
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300">
                      Maybe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className={`flex items-center space-x-1 mt-1 text-xs ${
            isOwnMessage ? 'justify-end text-gray-400' : 'text-gray-500'
          }`}>
            <span>{formatTime(message.timestamp)}</span>
            {isOwnMessage && (
              <div className="flex items-center space-x-1">
                {message.isDelivered && (
                  <CheckIcon className="h-3 w-3" />
                )}
                {message.isRead && (
                  <CheckCircleIcon className="h-3 w-3" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-96 bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* Sidebar Skeleton */}
        <div className="w-1/3 border-r border-gray-200 p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 animate-pulse">
              <div className="w-12 h-12 bg-gray-300 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-300 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Main Content Skeleton */}
        <div className="flex-1 p-4">
          <div className="h-full bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-96 bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            <button 
              onClick={() => setShowNewChat(true)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedConversation?.id === conversation.id ? 'bg-primary-50 border-primary-200' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="relative">
                  {conversation.type === 'group' ? (
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <UserGroupIcon className="h-6 w-6 text-gray-600" />
                    </div>
                  ) : (
                    <Image
                      src={conversation.participants[0]?.avatar || '/images/default-avatar.png'}
                      alt={conversation.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  )}
                  
                  {/* Online Status */}
                  {conversation.type === 'direct' && conversation.participants[0]?.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                  
                  {/* Encryption Badge */}
                  {conversation.isEncrypted && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <LockClosedIcon className="h-2 w-2 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                    {conversation.lastMessage && (
                      <span className="text-xs text-gray-500">
                        {formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage?.content || 'No messages yet'}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    {selectedConversation.type === 'group' ? (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <UserGroupIcon className="h-5 w-5 text-gray-600" />
                      </div>
                    ) : (
                      <Image
                        src={selectedConversation.participants[0]?.avatar || '/images/default-avatar.png'}
                        alt={selectedConversation.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    )}
                    
                    {selectedConversation.type === 'direct' && selectedConversation.participants[0]?.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
                    <p className="text-sm text-gray-600">
                      {selectedConversation.type === 'group' 
                        ? `${selectedConversation.participants.length} members`
                        : selectedConversation.participants[0]?.isOnline 
                          ? 'Online' 
                          : `Last seen ${selectedConversation.participants[0]?.lastSeen || 'recently'}`
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <PhoneIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <VideoCameraIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(renderMessage)}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                  <PhotoIcon className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                  <CalendarIcon className="h-5 w-5" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-gray-900">
                    <FaceSmileIcon className="h-5 w-5" />
                  </button>
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <ChatBubbleLeftEllipsisIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p>Choose a conversation from the sidebar to start messaging.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
