import { useMemo, useState } from 'react';

const DAY = 86400000;

/** Usage numbers for the profile page, derived from the user's scans. */
export function useScanStats(scans) {
  // Reference time fixed when the page opens, so stats are stable across re-renders.
  const [now] = useState(() => Date.now());

  return useMemo(() => {
    const total = scans.length;
    const notes = scans.filter((scan) => scan.kind === 'analysis').length;
    const lastWeek = scans.filter((scan) => now - new Date(scan.createdAt).getTime() < 7 * DAY).length;
    const avgChars = total ? Math.round(scans.reduce((sum, scan) => sum + (scan.text?.length || 0), 0) / total) : 0;

    const byCategory = scans.reduce((acc, scan) => {
      const key = scan.kind === 'analysis' ? scan.category || 'Outros' : 'Textos escaneados';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    const categories = Object.entries(byCategory)
      .map(([name, count]) => ({ name, count, percent: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count);

    // Last 7 days activity (oldest → today)
    const week = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(now - (6 - i) * DAY);
      const key = day.toDateString();
      return {
        label: day.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
        count: scans.filter((scan) => new Date(scan.createdAt).toDateString() === key).length,
      };
    });
    const weekMax = Math.max(1, ...week.map((day) => day.count));

    return { total, notes, texts: total - notes, lastWeek, avgChars, categories, week, weekMax };
  }, [scans, now]);
}
