/**
 * Individual chat message component
 */

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MessageProps {
  message: Message;
}

export function ChatMessage({ message }: MessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  // Don't render system messages
  if (isSystem) return null;

  return (
    <div
      className={cn(
        'flex gap-3 mb-4',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={isUser ? 'bg-blue-500' : 'bg-purple-500'}>
          {isUser ? 'U' : 'AI'}
        </AvatarFallback>
      </Avatar>
      
      <Card
        className={cn(
          'px-4 py-2 max-w-[80%]',
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-muted'
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <span className="text-xs opacity-70 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </Card>
    </div>
  );
}
