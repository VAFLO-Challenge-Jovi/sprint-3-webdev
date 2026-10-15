import { useMemo, useState } from 'react';
import { DEMO_TREE } from '../data/knowledgeTree.js';
import { normalize, truncate } from '../utils/format.js';

function scanToNode(scan) {
  if (scan.kind === 'analysis') {
    return {
      id: `scan-${scan.id}`,
      title: scan.title,
      summary: truncate(scan.summary, 90),
      own: true,
      details: { ...scan },
    };
  }
  return {
    id: `scan-${scan.id}`,
    title: truncate(scan.text.split('\n')[0], 48),
    summary: truncate(scan.text, 90),
    own: true,
    details: {
      title: truncate(scan.text.split('\n')[0], 80),
      category: 'Textos escaneados',
      summary: scan.text,
      keyPoints: [],
      sources: [{ title: 'Pesquisar no Google', url: `https://www.google.com/search?q=${encodeURIComponent(scan.text.slice(0, 200))}` }],
      createdAt: scan.createdAt,
    },
  };
}

/** Demo topics + the user's saved notes (grouped by category) + scanned texts. */
export function buildTree(scans) {
  const tree = structuredClone(DEMO_TREE);

  scans
    .filter((scan) => scan.kind === 'analysis')
    .forEach((scan) => {
      const category = scan.category || 'Outros';
      let topic = tree.find((item) => normalize(item.title) === normalize(category));
      if (!topic) {
        topic = { id: `topic-${normalize(category)}`, title: category, summary: 'Notas criadas por você.', children: [] };
        tree.push(topic);
      }
      topic.children.unshift(scanToNode(scan));
    });

  const texts = scans.filter((scan) => scan.kind !== 'analysis');
  if (texts.length) {
    tree.push({
      id: 'topic-scans',
      title: 'Textos escaneados',
      summary: 'Tudo o que você salvou direto do scanner.',
      children: texts.map(scanToNode),
    });
  }

  return tree;
}

/**
 * Navigation state for the 3-column knowledge browser:
 * topic → (optional branch) → item detail.
 */
export function useKnowledgeTree(scans) {
  const tree = useMemo(() => buildTree(scans), [scans]);
  const [topicId, setTopicId] = useState(null);
  const [branchId, setBranchId] = useState(null);
  const [nodeId, setNodeId] = useState(null);
  const [query, setQuery] = useState('');

  // Global search over every leaf item (title + summary).
  const results = useMemo(() => {
    const term = normalize(query);
    if (!term) return null;
    const leaves = [];
    const walk = (items) =>
      items.forEach((item) => (item.children ? walk(item.children) : leaves.push(item)));
    tree.forEach((topicItem) => walk(topicItem.children));
    return leaves.filter((item) => normalize(`${item.title} ${item.summary} ${item.details?.summary || ''}`).includes(term));
  }, [tree, query]);

  const topic = tree.find((item) => item.id === topicId) || tree[0] || null;
  const branch = topic?.children.find((node) => node.id === branchId && node.children) || null;
  const nodes = results || (branch ? branch.children : topic?.children || []);
  const node = nodes.find((item) => item.id === nodeId) || (branch?.id === nodeId ? branch : null);

  const view = node && !node.children ? { kind: 'detail', node } : branch ? { kind: 'branch', node: branch } : topic ? { kind: 'topic', node: topic } : { kind: 'empty' };

  return {
    tree,
    topic,
    branch,
    nodes,
    selectedNodeId: node?.id || null,
    view,
    breadcrumb: results ? [`${results.length} resultado${results.length === 1 ? '' : 's'} para “${query}”`] : [topic?.title, branch?.title].filter(Boolean),
    query,
    setQuery,
    searching: Boolean(results),
    selectTopic(id) {
      setQuery('');
      setTopicId(id);
      setBranchId(null);
      setNodeId(null);
    },
    selectNode(item) {
      if (item.children) setBranchId(item.id);
      setNodeId(item.id);
    },
    back() {
      setBranchId(null);
      setNodeId(null);
    },
  };
}
