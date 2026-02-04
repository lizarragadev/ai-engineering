import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('OPENAI_API_KEY is not set');
  process.exit(1);
}

try {
  const openai = await import('openai');
  const client = new openai.OpenAI({ apiKey });

  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Di un nombre de un perro' }],
    max_tokens: 10
  });

  const answer = response.choices[0]?.message?.content ?? 'No response';
  console.log(answer);
  process.exit(0);
} catch (error) {
  console.error('OpenAI API key validation failed:', error instanceof Error ? error.message : error);
  process.exit(1);
}

export {};
