# MTG AI Project

This is a learning project focused on creating an AI chatbot for the Magic: The Gathering card game. Users can ask questions to search for cards. Like, "show me all the blue cards that include trees in the artwork." It will have an initial focus on the Commander format.

This project is unofficial Fan Content permitted under the [Fan Content Policy](https://company.wizards.com/en/legal/fancontentpolicy). Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.

## Tech Stack

This project uses a modern, production-ready stack optimized for AI chat applications:

- **Next.js 15** (App Router) - React framework with SSR/SSG
- **TypeScript** - Type safety across the codebase
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality, customizable component library
- **Vercel AI SDK** - Streaming AI responses with `useChat` hook
- **Zustand** - Lightweight state management
- **OpenAI GPT-4** - LLM for conversational AI

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-key-here
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open the app:**

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /chat              # Chat interface route
  /api/chat          # AI chat API endpoint (server-side)
  page.tsx           # Landing page
  layout.tsx         # Root layout
  globals.css        # Global styles

/components
  /ui                # shadcn/ui components
  /chat              # Custom chat components
    chat-interface.tsx
    message.tsx

/lib
  store.ts           # Zustand state management
  types.ts           # TypeScript type definitions
  utils.ts           # Utility functions
```

## Features

- ✅ Real-time streaming AI responses
- ✅ Persistent chat history (localStorage)
- ✅ MTG-focused system prompt
- ✅ Responsive, accessible UI
- ✅ Type-safe throughout
- ✅ Server-side API key handling

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding Components

Add new shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

## Next Steps

Potential enhancements:

- [ ] Integrate Scryfall API for real MTG card data
- [ ] Add card image previews
- [ ] Implement deck building features
- [ ] Add authentication for user accounts
- [ ] Deploy to Vercel
- [ ] Add cost estimation and usage tracking

## License

This project is for learning purposes. All Magic: The Gathering content is property of Wizards of the Coast LLC.
