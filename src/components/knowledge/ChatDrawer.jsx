import { Send } from 'lucide-react';
import Drawer from '../ui/Drawer.jsx';
import Button from '../ui/Button.jsx';

const SUGGESTIONS = ['Resuma o tema', 'Perguntas para praticar', 'Plano de revisão para a prova'];

export default function ChatDrawer({ chat }) {
  return (
    <Drawer
      open={chat.open}
      onClose={chat.close}
      eyebrow="Assistente de estudo"
      title={chat.context?.title || 'Conversa'}
      footer={
        <form
          onSubmit={(e) => {
            e.preventDefault();
            chat.send();
          }}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => chat.send(suggestion)}
                disabled={chat.thinking}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-fg-muted hover:border-volt-400/50 hover:text-fg disabled:opacity-40"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <label htmlFor="chat-input" className="sr-only">
              Pergunte sobre o tema
            </label>
            <input
              id="chat-input"
              value={chat.input}
              onChange={(e) => chat.setInput(e.target.value)}
              placeholder="Pergunte algo sobre o tema..."
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-ink-850 px-4 text-sm outline-none focus:border-volt-400/70"
            />
            <Button type="submit" size="icon" aria-label="Enviar pergunta" disabled={!chat.input.trim() || chat.thinking}>
              <Send className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </form>
      }
    >
      <ol className="flex flex-col gap-3" aria-live="polite">
        {chat.messages.map((message) => (
          <li
            key={message.id}
            className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm whitespace-pre-line ${
              message.role === 'user' ? 'self-end rounded-br-md bg-volt-400 text-ink-950' : 'self-start rounded-bl-md bg-ink-800 text-fg'
            }`}
          >
            {message.text}
          </li>
        ))}
        {chat.thinking && (
          <li className="flex gap-1 self-start rounded-3xl rounded-bl-md bg-ink-800 px-4 py-4" aria-label="Digitando">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2 animate-bounce rounded-full bg-fg-subtle" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </li>
        )}
      </ol>
    </Drawer>
  );
}
