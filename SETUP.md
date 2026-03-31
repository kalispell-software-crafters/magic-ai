# Quick Setup Guide

Welcome to the MTG AI Chat project! This guide will get you up and running in minutes.

## Prerequisites

- Node.js 18 or higher
- OpenAI API key

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

> **Get an API key:** Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Open the App

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

Click "Start Chatting" or go directly to [http://localhost:3000/chat](http://localhost:3000/chat)

## Project Structure

```
/app
  /chat              # Chat UI page
  /api/chat          # API endpoint (keeps key server-side)
  page.tsx           # Landing page

/components
  /ui                # shadcn components (Button, Input, etc.)
  /chat              # Custom chat components
    chat-interface.tsx  # Main chat UI
    message.tsx         # Message bubble component

/lib
  store.ts           # Zustand state store
  types.ts           # TypeScript definitions
  utils.ts           # Utility functions
```

## Key Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Vercel AI SDK** - AI streaming
- **Zustand** - State management
- **OpenAI GPT-4** - Language model

## Adding More Components

To add shadcn components:

```bash
npx shadcn@latest add [component-name]
```

Examples:
- `npx shadcn@latest add dialog`
- `npx shadcn@latest add tabs`
- `npx shadcn@latest add badge`

## Common Tasks

### Build for Production

```bash
npm run build
npm run start
```

### Run Linting

```bash
npm run lint
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Don't forget to add your `OPENAI_API_KEY` in the Vercel project settings!

## Troubleshooting

**Module not found errors:**
- Run `npm install` again
- Delete `node_modules` and `.next`, then reinstall

**API key not working:**
- Ensure `.env.local` exists in project root
- Check the key starts with `sk-`
- Restart the dev server after adding the key

**TypeScript errors:**
- Run `npm run build` to see all errors
- Check that all dependencies are installed

## Next Steps

- Integrate Scryfall API for actual MTG card data
- Add card image previews
- Implement deck building features
- Add user authentication
- Deploy to production

## Need Help?

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel AI SDK Docs](https://ai-sdk.dev)
- [shadc/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
