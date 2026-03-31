/**
 * Main chat interface component
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import type { UIMessage } from 'ai';
import { ChatMessage } from './message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useChatStore } from '@/lib/store';
import { Send } from 'lucide-react';

export function ChatInterface() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { currentSession, addMessage, createSession } = useChatStore();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create initial session if none exists
  useEffect(() => {
    if (!currentSession) {
      createSession();
    }
  }, [currentSession, createSession]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage: UIMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      parts: [{ type: 'text', text: input }],
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    
    // Save to store
    addMessage({
      role: 'user',
      content: input,
    });

    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({
            role: m.role,
            content: m.parts.map(p => p.type === 'text' ? p.text : '').join(''),
          })).concat([{
            role: 'user',
            content: currentInput,
          }]),
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          aiResponse += chunk;
        }
      }

      // Parse the stream response
      const lines = aiResponse.split('\n').filter(line => line.trim());
      let fullText = '';
      
      for (const line of lines) {
        if (line.startsWith('0:')) {
          const data = line.substring(2);
          try {
            const parsed = JSON.parse(data);
            if (typeof parsed === 'string') {
              fullText += parsed;
            }
          } catch {
            fullText += data.replace(/^"|"$/g, '');
          }
        }
      }

      const assistantMessage: UIMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        parts: [{ type: 'text', text: fullText }],
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Save to store
      addMessage({
        role: 'assistant',
        content: fullText,
      });
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">MTG AI Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Ask me anything about Magic: The Gathering!
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Start a conversation about Magic: The Gathering!</p>
          </div>
        ) : (
          <div>
            {messages.map((message: UIMessage) => (
              <ChatMessage
                key={message.id}
                message={{
                  id: message.id,
                  role: message.role,
                  content: message.parts.map(p => p.type === 'text' ? p.text : '').join(''),
                  timestamp: new Date(),
                }}
              />
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3 mb-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-16 w-[60%]" />
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about MTG cards, rules, or strategies..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
