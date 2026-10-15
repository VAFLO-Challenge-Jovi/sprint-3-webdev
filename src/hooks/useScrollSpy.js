import { useEffect, useState } from 'react';

/** Returns the id of the section currently in the middle of the viewport. */
export function useScrollSpy(ids, { enabled = true } = {}) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ids.join(',')]);

  return enabled ? activeId : null;
}
