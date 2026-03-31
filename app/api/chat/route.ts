/**
 * API route for AI chat - keeps API keys server-side
 */

import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // System prompt for MTG context
    const systemPrompt = `You are a helpful AI assistant specialized in Magic: The Gathering (MTG), with a focus on the Commander format. 
You help players find cards, build decks, understand rules, and explore card interactions.
When describing cards, be specific about colors, mana costs, and abilities.
If users ask about artwork or visual elements, acknowledge that you understand their request.`;

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Error processing chat request', { status: 500 });
  }
}
