import { useCallback, useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Carousel state: index, autoplay (paused on hover/focus), swipe and arrow keys.
 * Returns `bind` props to spread on the carousel root.
 */
export function useCarousel({ count, interval = 5000, autoplay = true }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const goTo = useCallback((next) => setIndex(((next % count) + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (!autoplay || paused || count < 2 || prefersReducedMotion()) return undefined;
    const timer = setTimeout(next, interval);
    return () => clearTimeout(timer);
  }, [autoplay, paused, count, interval, index, next]);

  const bind = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
    onTouchStart: (e) => {
      touchStartX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
      touchStartX.current = null;
    },
    onKeyDown: (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    },
  };

  return { index, goTo, next, prev, paused, bind };
}
