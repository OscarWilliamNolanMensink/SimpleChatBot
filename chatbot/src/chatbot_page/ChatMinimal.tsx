import { useState } from "react";
import { sendChat, type ChatMessage, type ReplyFromat } from "../chatbotapi/chat";
import { ChatHistory } from "./chatHistory";

export function ChatMinimal() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: 'You are a helpful assistant.' }
  ]);
  const [localHistoryMessages, seLocalHistorytMessages] = useState<ChatMessage[]>([]);
  const [messageCount, setmessageCount] = useState(1)
  const [input, setInput] = useState('');
  const [reply, setReply] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setError(null);
    setLoading(true);
    const next:ChatMessage[] = [...messages, { role: 'user', content: input.trim() }];
    const nextHistory: ChatMessage[] = [...localHistoryMessages, { role: 'user', content: input.trim() ,count:messageCount}]
    setmessageCount(messageCount+1)
    setMessages(next);
    seLocalHistorytMessages(nextHistory)
    setInput('');

    try {
      const content: ReplyFromat = await sendChat(next);
      
      console.log(content)
      seLocalHistorytMessages((localHistoryMessages)=>[...localHistoryMessages, { role:'assistant' , content:content.reply, count: messageCount }])
      setReply(content.reply);
      setMessages(next => [...next, { role:'assistant' , content:content.reply }]);
      
      setmessageCount(messageCount => messageCount+1)
    } catch (err: any) {
      setError(err?.message ?? 'Request failed');
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <section>
      <form onSubmit={onSend} style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending…' : 'Send'}
        </button>
      </form>

      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}

      {reply && (
        <div style={{ marginTop: 12, padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
          <strong>Most recent response:</strong>
          <div>{reply}</div>
        </div>
      )}
      <ChatHistory messages={localHistoryMessages}/>
    </section>
  );
}