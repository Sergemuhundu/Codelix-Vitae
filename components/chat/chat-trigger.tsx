'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';
import { useChat } from '@/lib/chat-context';
import { cn } from '@/lib/utils';

interface ChatTriggerProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  showBadge?: boolean;
  children?: React.ReactNode;
}

export function ChatTrigger({ 
  variant = 'default', 
  size = 'default', 
  className,
  showBadge = true,
  children 
}: ChatTriggerProps) {
  const { openChat, agentStatus } = useChat();

  const getStatusColor = () => {
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

  return (
    <div className="relative inline-block">
      <Button
        variant={variant}
        size={size}
        onClick={openChat}
        className={cn("flex items-center gap-2", className)}
      >
        <MessageSquare className="h-4 w-4" />
        {children || 'Chat with us'}
      </Button>
      
      {showBadge && (
        <Badge 
          className={cn(
            "absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs",
            getStatusColor()
          )}
        >
          <div className={cn("h-2 w-2 rounded-full", getStatusColor())} />
        </Badge>
      )}
    </div>
  );
} 