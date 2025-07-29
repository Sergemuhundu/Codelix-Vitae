'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  X, 
  Minimize2, 
  Send, 
  Bot,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useChat } from '@/lib/chat-context';
import { cn } from '@/lib/utils';

interface LiveChatProps {
  className?: string;
}

export function LiveChat({ className }: LiveChatProps) {
  const { user } = useAuth();
  const { 
    messages, 
    isOpen, 
    isMinimized, 
    isTyping, 
    agentStatus,
    openChat, 
    closeChat, 
    minimizeChat, 
    sendMessage 
  } = useChat();
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = (status: 'sending' | 'sent' | 'delivered' | 'read') => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      case 'sent':
        return <CheckCircle className="h-3 w-3 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'read':
        return <CheckCircle className="h-3 w-3 text-green-600" />;
      default:
        return null;
    }
  };

  const getAgentStatusColor = () => {
    switch (agentStatus) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!isOpen) {
    return (
      <div className={cn("fixed bottom-4 right-4 z-50", className)}>
        <Button
          onClick={openChat}
          className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
        <Badge 
          className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-green-500"
        >
          Live
        </Badge>
      </div>
    );
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50 w-80", className)}>
      <Card className="shadow-xl border-0">
        <CardHeader className="pb-3 bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary-foreground text-primary text-sm">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-primary",
                  getAgentStatusColor()
                )} />
              </div>
              <div>
                <CardTitle className="text-sm">CodelixVitae Support</CardTitle>
                <div className="flex items-center gap-1 text-xs opacity-90">
                  <div className={cn("h-2 w-2 rounded-full", getAgentStatusColor())} />
                  {agentStatus === 'online' ? 'Online' : agentStatus === 'away' ? 'Away' : 'Offline'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={minimizeChat}
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={closeChat}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0">
            {/* Messages Area */}
            <div className="h-80 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-2",
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {message.sender === 'agent' && (
                        <Avatar className="h-6 w-6 flex-shrink-0">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            <Bot className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}>
                        <div className="break-words">{message.text}</div>
                        <div className={cn(
                          "flex items-center gap-1 mt-1 text-xs opacity-70",
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        )}>
                          <span>{formatTime(message.timestamp)}</span>
                          {message.sender === 'user' && getStatusIcon(message.status)}
                        </div>
                      </div>

                      {message.sender === 'user' && (
                        <Avatar className="h-6 w-6 flex-shrink-0">
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                            {user?.user_metadata?.full_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-2 justify-start">
                      <Avatar className="h-6 w-6 flex-shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg px-3 py-2">
                        <div className="flex items-center gap-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">Agent is typing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-3">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 text-sm"
                    disabled={agentStatus === 'offline'}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    disabled={!newMessage.trim() || agentStatus === 'offline'}
                    className="px-3"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {agentStatus === 'offline' && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Support is currently offline. We'll respond when we're back.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
} 