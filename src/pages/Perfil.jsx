import { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Database, FileText, LogOut, Sparkles, Type } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import StatTile from '../components/profile/StatTile.jsx';
import WeekActivity from '../components/profile/WeekActivity.jsx';
import CategoryBreakdown from '../components/profile/CategoryBreakdown.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useScans } from '../hooks/useScans.js';
import { useScanStats } from '../hooks/useScanStats.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { API_MODE } from '../services/api/index.js';
import { initials } from '../utils/format.js';

export default function Perfil() {
  useDocumentTitle('Perfil');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { scans, loading } = useScans();
  const stats = useScanStats(scans);

  const tiles = [
    { label: 'Itens salvos', value: stats.total, icon: FileText, hint: `${stats.texts} texto${stats.texts === 1 ? '' : 's'} · ${stats.notes} nota${stats.notes === 1 ? '' : 's'}` },
    { label: 'Notas com IA', value: stats.notes, icon: Sparkles },
    { label: 'Últimos 7 dias', value: stats.lastWeek, icon: CalendarDays },
    { label: 'Média por texto', value: stats.avgChars, icon: Type, hint: 'caracteres' },
  ];

  return (
    <>
      <PageHeader eyebrow="Perfil" title="Sua conta" />

      <section className="mb-6 flex flex-col gap-5 rounded-4xl border border-white/8 bg-gradient-to-r from-iris-500/20 to-ink-850 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-4">
          <span className="grid size-16 shrink-0 place-items-center rounded-3xl bg-iris-500 font-display text-xl font-bold text-white">{initials(user.name)}</span>
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-bold">{user.name}</h2>
            <p className="truncate text-fg-muted">{user.email}</p>
            <Badge tone="neutral" icon={Database} className="mt-2">
              {API_MODE === 'mockapi' ? 'Dados no MockAPI' : 'Dados locais (modo offline)'}
            </Badge>
          </div>
        </div>
        <Button
          variant="secondary"
          icon={LogOut}
          onClick={() => {
            startTransition(() => {
              navigate('/', { replace: true });
              logout();
            });
          }}
        >
          Sair da conta
        </Button>
      </section>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4" aria-busy={loading}>
        {tiles.map((tile) => (
          <StatTile key={tile.label} {...tile} value={loading ? '–' : tile.value} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <WeekActivity week={stats.week} max={stats.weekMax} />
        </div>
        <div className="lg:col-span-5">
          <CategoryBreakdown categories={stats.categories} />
        </div>
      </div>
    </>
  );
}
