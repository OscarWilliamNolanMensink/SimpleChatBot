// src/api/chat.ts
export type ChatRole = 'system' | 'user' | 'assistant';
export type ChatMessage = { role: ChatRole; content: string, count?: number };
export type ReplyFromat = { reply: string; }

export async function sendChat(
  messages: ChatMessage[],
  opts?: { temperature?: number }
) {
  const res = await fetch('http://localhost:8000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'zephyr',          // or whatever your server expects
      messages,
      temperature: opts?.temperature ?? 0.7,
      stream: false
    })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Chat error: ${res.status} ${text}`);
  }

  const data = await res.json();

  const reply =
    (typeof data === 'string' && data) ||
    (typeof data?.reply === 'string' && data.reply) ||                // your local server
    data?.choices?.[0]?.message?.content;                             // OpenAI-style

  if (!reply) {
    console.error('Unexpected response shape:', data);
    throw new Error('Could not extract reply from response');
  }

  return { reply };
}
