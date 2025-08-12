'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './auth';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

interface ChatContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isMinimized: boolean;
  isTyping: boolean;
  agentStatus: 'online' | 'away' | 'offline';
  openChat: () => void;
  closeChat: () => void;
  minimizeChat: () => void;
  sendMessage: (text: string) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! Welcome to CVAdapter support. How can I help you today?',
      sender: 'agent',
      timestamp: new Date(),
      status: 'read'
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [agentStatus, setAgentStatus] = useState<'online' | 'away' | 'offline'>('online');

  // Simulate agent status changes based on time
  useEffect(() => {
    const updateAgentStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      
      if (hour >= 9 && hour < 18) {
        setAgentStatus('online');
      } else if (hour >= 18 && hour < 22) {
        setAgentStatus('away');
      } else {
        setAgentStatus('offline');
      }
    };

    updateAgentStatus();
    const interval = setInterval(updateAgentStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Simulate agent responses
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user' && agentStatus !== 'offline') {
      setIsTyping(true);
      
      const responses = [
        "I understand your concern. Let me help you with that.",
        "That's a great question! Here's what you need to know...",
        "I can definitely help you with that. Let me provide you with the information.",
        "Thanks for reaching out! I'll assist you with this issue.",
        "I see what you're experiencing. Here's how we can resolve this...",
        "Let me check that for you and get back to you with the details.",
        "I appreciate you bringing this to our attention. Here's what we can do...",
        "That's a common question. Let me explain the process...",
        "I'll help you resolve this issue. Here's the step-by-step solution...",
        "Great question! Let me provide you with the most up-to-date information."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const delay = 2000 + Math.random() * 3000; // 2-5 seconds

      const timer = setTimeout(() => {
        setIsTyping(false);
        
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: randomResponse,
          sender: 'agent',
          timestamp: new Date(),
          status: 'read'
        }]);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [messages, agentStatus]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const minimizeChat = useCallback(() => {
    setIsMinimized(!isMinimized);
  }, [isMinimized]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' as const }
            : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'delivered' as const }
            : msg
        )
      );
    }, 1000);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([{
      id: '1',
      text: 'Hello! Welcome to CodelixVitae support. How can I help you today?',
      sender: 'agent',
      timestamp: new Date(),
      status: 'read'
    }]);
  }, []);

  const value = {
    messages,
    isOpen,
    isMinimized,
    isTyping,
    agentStatus,
    openChat,
    closeChat,
    minimizeChat,
    sendMessage,
    clearMessages,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 