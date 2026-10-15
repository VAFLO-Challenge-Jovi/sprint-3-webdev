import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Reveals `text` progressively. Long texts reveal several characters per tick
 * (Math.ceil) so the animation always takes ~1.5s at most.
 */
export function useTypewriter({ speed = 22, maxTicks = 70 } = {}) {
  const [output, setOutput] = useState('');
  const timerRef = useRef(null);

  const stop = useCallback(() => clearInterval(timerRef.current), []);

  const type = useCallback(
    (text, onDone) => {
      stop();
      const step = Math.max(1, Math.ceil(text.length / maxTicks));
      let index = 0;
      setOutput('');
      timerRef.current = setInterval(() => {
        index = Math.min(text.length, index + step);
        setOutput(text.slice(0, index));
        if (index >= text.length) {
          stop();
          onDone?.();
        }
      }, speed);
    },
    [speed, maxTicks, stop],
  );

  useEffect(() => stop, [stop]);

  return { output, setOutput, type, stop };
}
