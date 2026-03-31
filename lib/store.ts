/**
 * Zustand store for global application state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message, ChatSession, AppSettings } from './types';

interface ChatStore {
  // Current session
  currentSession: ChatSession | null;
  sessions: ChatSession[];
  
  // App settings
  settings: AppSettings;
  
  // Actions
  createSession: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  deleteSession: (sessionId: string) => void;
  loadSession: (sessionId: string) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  clearCurrentSession: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      currentSession: null,
      sessions: [],
      settings: {
        theme: 'system',
        model: 'gpt-4o-mini',
        temperature: 0.7,
      },

      createSession: () => {
        const newSession: ChatSession = {
          id: crypto.randomUUID(),
          title: 'New Chat',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          currentSession: newSession,
          sessions: [newSession, ...state.sessions],
        }));
      },

      addMessage: (message) => {
        const { currentSession } = get();
        if (!currentSession) return;

        const newMessage: Message = {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        };

        const updatedSession: ChatSession = {
          ...currentSession,
          messages: [...currentSession.messages, newMessage],
          updatedAt: new Date(),
          // Auto-generate title from first user message
          title: currentSession.messages.length === 0 && message.role === 'user'
            ? message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '')
            : currentSession.title,
        };

        set((state) => ({
          currentSession: updatedSession,
          sessions: state.sessions.map((s) =>
            s.id === updatedSession.id ? updatedSession : s
          ),
        }));
      },

      deleteSession: (sessionId) => {
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== sessionId),
          currentSession:
            state.currentSession?.id === sessionId ? null : state.currentSession,
        }));
      },

      loadSession: (sessionId) => {
        const session = get().sessions.find((s) => s.id === sessionId);
        if (session) {
          set({ currentSession: session });
        }
      },

      clearCurrentSession: () => {
        set({ currentSession: null });
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },
    }),
    {
      name: 'mtg-ai-chat-storage',
    }
  )
);
