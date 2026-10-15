import { Search } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import TopicList from '../components/knowledge/TopicList.jsx';
import NodeList from '../components/knowledge/NodeList.jsx';
import DetailPanel from '../components/knowledge/DetailPanel.jsx';
import ChatDrawer from '../components/knowledge/ChatDrawer.jsx';
import { useScans } from '../hooks/useScans.js';
import { useKnowledgeTree } from '../hooks/useKnowledgeTree.js';
import { useTopicChat } from '../hooks/useTopicChat.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function Historico() {
  useDocumentTitle('Histórico');
  const { scans, loading } = useScans();
  const knowledge = useKnowledgeTree(scans);
  const chat = useTopicChat();

  return (
    <>
      <PageHeader
        eyebrow="Histórico"
        title="Seu conhecimento, organizado"
        description="Notas e textos salvos pelo scanner, agrupados por tema — junto com uma base de estudos de exemplo."
        actions={<Button to="/app/scanner" variant="secondary">Novo scan</Button>}
      />

      <div className="relative mb-6">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-fg-subtle" aria-hidden="true" />
        <label htmlFor="knowledge-search" className="sr-only">
          Buscar no histórico
        </label>
        <input
          id="knowledge-search"
          type="search"
          value={knowledge.query}
          onChange={(e) => knowledge.setQuery(e.target.value)}
          placeholder={loading ? 'Carregando suas notas...' : 'Buscar em todas as notas e textos...'}
          className="h-13 w-full rounded-full border border-white/10 bg-ink-850 pr-5 pl-12 text-sm outline-none focus:border-volt-400/70 focus:ring-4 focus:ring-volt-400/10"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-3">
          <TopicList topics={knowledge.tree} selectedId={knowledge.searching ? null : knowledge.topic?.id} onSelect={knowledge.selectTopic} />
        </div>
        <div className="min-w-0 lg:col-span-4">
          <NodeList
            breadcrumb={knowledge.breadcrumb}
            nodes={knowledge.nodes}
            selectedId={knowledge.selectedNodeId}
            canGoBack={Boolean(knowledge.branch) && !knowledge.searching}
            onBack={knowledge.back}
            onSelect={knowledge.selectNode}
          />
        </div>
        <div className="min-w-0 lg:col-span-5">
          <DetailPanel view={knowledge.view} onChat={chat.start} />
        </div>
      </div>

      <ChatDrawer chat={chat} />
    </>
  );
}
