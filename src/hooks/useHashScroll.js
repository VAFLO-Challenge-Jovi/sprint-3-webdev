import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the element in the URL hash on every navigation (React Router doesn't). */
export function useHashScroll() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash, key]);
}
