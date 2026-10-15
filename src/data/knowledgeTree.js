/**
 * Demo knowledge base shown in "Histórico" for every user (study topics).
 * The user's own saved scans/analyses are merged on top of it by useKnowledgeTree.
 */
export const DEMO_TREE = [
  {
    id: 'demo-estudos',
    title: 'Estudos',
    summary: 'Conteúdos acadêmicos organizados por disciplina.',
    children: [
      {
        id: 'demo-matematica',
        title: 'Matemática',
        summary: 'Funções, gráficos e estratégias para resolver problemas.',
        details: {
          title: 'Matemática',
          category: 'Estudos',
          summary:
            'Anotações de matemática para o ensino superior: reconhecer padrões, organizar fórmulas úteis e transformar exercícios em passos objetivos.',
          keyPoints: [
            'Funções de primeiro e segundo grau com exemplos resolvidos',
            'Interpretação de gráficos e relações entre variáveis',
            'Estratégias para revisar antes de provas',
          ],
          sources: [{ title: 'Wikipédia — Função (matemática)', url: 'https://pt.wikipedia.org/wiki/Fun%C3%A7%C3%A3o_(matem%C3%A1tica)' }],
          createdAt: '2026-09-01T10:00:00.000Z',
        },
      },
      {
        id: 'demo-historia',
        title: 'História',
        summary: 'Linha do tempo, contexto social e causas e consequências.',
        details: {
          title: 'História',
          category: 'Estudos',
          summary:
            'Períodos históricos organizados em causas, consequências e personagens centrais — ideal para transformar fotos de livros ou slides em revisão estruturada.',
          keyPoints: [
            'Eventos agrupados por período histórico',
            'Relação entre política, economia e cultura',
            'Perguntas-guia para estudar causas e consequências',
          ],
          sources: [{ title: 'Wikipédia — História do Brasil', url: 'https://pt.wikipedia.org/wiki/Hist%C3%B3ria_do_Brasil' }],
          createdAt: '2026-09-02T14:30:00.000Z',
        },
      },
    ],
  },
  {
    id: 'demo-programacao',
    title: 'Programação',
    summary: 'Guias técnicos separados por linguagem e área.',
    children: [
      {
        id: 'demo-python',
        title: 'Python',
        summary: 'Sintaxe, listas, dicionários e pequenos scripts.',
        details: {
          title: 'Python',
          category: 'Programação',
          summary: 'Conceitos de variáveis, listas, dicionários, funções e leitura de arquivos com exemplos próximos de exercícios acadêmicos.',
          keyPoints: [
            'Estruturas de dados: listas, dicionários e tuplas',
            'Funções para reduzir repetição de código',
            'Leitura e escrita de arquivos JSON',
          ],
          sources: [{ title: 'Documentação oficial do Python', url: 'https://docs.python.org/pt-br/3/tutorial/' }],
          createdAt: '2026-09-03T09:15:00.000Z',
        },
      },
      {
        id: 'demo-frontend',
        title: 'Front-end',
        summary: 'HTML semântico, CSS e React.',
        children: [
          {
            id: 'demo-html',
            title: 'HTML',
            summary: 'Estrutura semântica e acessibilidade.',
            details: {
              title: 'HTML semântico',
              category: 'Programação',
              summary: 'Como organizar header, nav, main, section e footer para tornar páginas claras para usuários e tecnologias assistivas.',
              keyPoints: [
                'Uso correto de header, nav, main, section e footer',
                'Atributos aria apenas quando ajudam a experiência',
                'Hierarquia de títulos como mapa do conteúdo',
              ],
              sources: [{ title: 'MDN — HTML', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML' }],
              createdAt: '2026-09-05T11:45:00.000Z',
            },
          },
          {
            id: 'demo-react',
            title: 'React',
            summary: 'Componentes, props e hooks.',
            details: {
              title: 'React',
              category: 'Programação',
              summary: 'Interfaces construídas com componentes funcionais, comunicação via props e lógica isolada em hooks customizados.',
              keyPoints: [
                'Componentes pai → filho com props',
                'useState, useEffect, useMemo e useContext',
                'Hooks customizados separam lógica da interface',
              ],
              sources: [{ title: 'react.dev — Aprenda React', url: 'https://pt-br.react.dev/learn' }],
              createdAt: '2026-09-06T13:10:00.000Z',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'demo-livros',
    title: 'Livros',
    summary: 'Leituras identificadas pela câmera.',
    children: [
      {
        id: 'demo-photography',
        title: 'The Photography Storytelling Workshop',
        summary: 'Narrativa visual, composição e ensaios fotográficos.',
        details: {
          title: 'The Photography Storytelling Workshop',
          category: 'Livros',
          summary:
            'Livro de Finn Beales sobre transformar fotografias isoladas em histórias visuais coerentes: sequência, intenção narrativa, luz e edição.',
          keyPoints: [
            'Narrativa visual como sequência de escolhas',
            'Tema, ritmo e edição fotográfica',
            'Exercícios para criar ensaios com começo, meio e fim',
          ],
          sources: [{ title: 'Google Books', url: 'https://books.google.com/books?q=The+Photography+Storytelling+Workshop' }],
          createdAt: '2026-09-07T18:00:00.000Z',
        },
      },
    ],
  },
];
