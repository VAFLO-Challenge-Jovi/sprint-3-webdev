import { useCallback, useRef, useState } from 'react';
import { answerQuestion } from '../services/studyAssistant.js';

/** Chat drawer state for "Conversar com IA" in the knowledge history. */
export function useTopicChat() {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState(null);
  const [messages, setMessages] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState('');
  const idRef = useRef(0);

  const push = (role, text) => setMessages((prev) => [...prev, { id: ++idRef.current, role, text }]);

  const start = useCallback((nextContext) => {
    idRef.current = 0;
    setContext(nextContext);
    setInput('');
    setOpen(true);
    setMessages([
      { id: ++idRef.current, role: 'assistant', text: `Vamos estudar ${nextContext.title}! ${nextContext.summary}` },
      { id: ++idRef.current, role: 'assistant', text: 'Peça um resumo, perguntas de prática ou um plano de revisão.' },
    ]);
  }, []);

  const send = useCallback(
    (text) => {
      const question = String(text ?? input).trim();
      if (!question || !context || thinking) return;
      push('user', question);
      setInput('');
      setThinking(true);
      setTimeout(() => {
        push('assistant', answerQuestion(question, context));
        setThinking(false);
      }, 500 + Math.round(Math.random() * 500));
    },
    [input, context, thinking],
  );

  return { open, context, messages, thinking, input, setInput, start, send, close: () => setOpen(false) };
}
