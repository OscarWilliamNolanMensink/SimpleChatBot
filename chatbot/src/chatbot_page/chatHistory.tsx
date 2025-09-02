// adjust the import path to wherever your file lives
import type { ChatMessage } from '../chatbotapi/chat';

type ChatHistoryProps = { messages: ChatMessage[] };

export function ChatHistory({ messages }: ChatHistoryProps) {
  // Stable ordering: use `count` when present, otherwise original index
  const sorted = messages
    .map((m, i) => ({ ...m, __i: i }))
    .sort((a, b) => (a.count ?? a.__i) - (b.count ?? b.__i));

  return (
   <div className="chat">
  {sorted.map((msg, idx) => {
    if (msg.role === 'system') {
      return (
        <div key={`system-${msg.count ?? idx}`} className="system-row">
          <div className="system-message">{msg.content}</div>
        </div>
      );
    }

    const isAssistant = msg.role === 'assistant';
    const rowClass = `message-row ${isAssistant ? 'assistant' : 'user'}`;
    const bubbleClass = `bubble ${isAssistant ? 'assistant' : 'user'}`;

    return (
      <div key={msg.count ?? idx} className={rowClass}>
        <div className={bubbleClass}>{msg.content}</div>
      </div>
    );
  })}
</div>

  );
}
