/**
 * Core types for the MTG AI Chat application
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  cardData?: MTGCard[]; // Optional: for MTG card results
}

export interface MTGCard {
  id: string;
  name: string;
  manaCost?: string;
  type: string;
  text?: string;
  power?: string;
  toughness?: string;
  imageUrl?: string;
  colors?: string[];
  rarity?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  model: string;
  temperature: number;
}
