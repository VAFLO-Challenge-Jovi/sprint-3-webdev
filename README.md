# SeekVision — Câmera inteligente para estudantes

Projeto da **Challenge JOVI 2026 (FIAP)**. Entrega conjunta da **Sprint 4** para as disciplinas
**Front-End Design** e **Web Development**.

O SeekVision transforma a câmera do celular em ferramenta de estudo: reconhece o texto de uma
lousa, livro ou slide (OCR) e entrega, em um toque, pesquisa, tradução e uma **nota de estudo com
fontes** (Wikipédia, Google Books e Open Library), tudo salvo e organizado por tema.

> A Sprint 4 é a **evolução dos dois projetos da Sprint 3**: a landing page de Front-End Design
> (HTML + CSS Grid) e o app React de Web Development. Os dois foram unificados neste repositório, migrados
> para **React + Tailwind CSS** e **redesenhados do zero**, a partir do feedback do professor e de
> referências do Dribbble.

---

## ⚡ Como avaliar em 1 minuto

| | |
|---|---|
| **Deploy (Vercel)** | https://sprint-3-webdev-tan.vercel.app/ |
| **Repositório** | https://github.com/VAFLO-Challenge-Jovi/sprint-3-webdev |
| **Usuário de teste** | `aluno@seekvision.com` |
| **Senha** | `seek1234` |

1. Abra o deploy → landing page pública (A Solução, Público-Alvo, Galeria, Nossa Equipe, Contato).
2. Clique em **Testar agora**. Como a rota é privada, você será levado ao login.
3. Clique em **Usar conta de teste** → **Entrar**.
4. No **Scanner**, clique em **Gerar nota com IA** (consulta a Wikipédia e as bases de livros em tempo
   real) ou **Enviar imagem** para testar o OCR real com qualquer foto de texto.
5. Veja **Histórico** (busca e conversa com o assistente) e **Perfil** (estatísticas de uso).

---

## Integrantes

| Nome | RM |
|---|---|
| Artur Fabi Brandi | RM570258 |
| Felipe Santos Ribas | RM569121 |
| Luiz Gonzaga | RM572446 |
| Orion Cavalcante França | RM573677 |
| Victor Lula Heineken Rodrigues | RM570782 |

---

## Funcionalidades

**Área pública**
- **Landing page** com menu: A Solução (bento grid de funcionalidades), Como funciona,
  Público-Alvo (persona), Galeria (carrossel com swipe, setas do teclado e autoplay), Nossa Equipe e
  Contato (formulário validado que envia para a API).
- **Login e cadastro** com validação, medidor de força de senha e atalho para a conta de teste.

**Área privada (exige login)**
- **Scanner OCR**
  - OCR **real** no navegador com Tesseract.js (português + inglês), com barra de progresso.
  - Envio de imagem (botão ou arrastar e soltar) ou **câmera ao vivo** (webcam/celular), com captura.
  - Ações rápidas: pesquisar no Google, traduzir, copiar e salvar no histórico.
  - **Gerar nota com IA**: busca o texto na Wikipédia, Google Books e Open Library, filtra só os
    resultados relevantes e monta uma nota de estudo (resumo, pontos-chave, fontes e livros
    relacionados). Tem modo offline se as APIs estiverem fora do ar.
- **Histórico**: notas e textos agrupados por tema, busca geral e assistente de estudo
  ("Conversar com IA": resumo, perguntas de prática e plano de revisão).
- **Perfil**: dados da conta, estatísticas (itens salvos, notas, últimos 7 dias, média de
  caracteres), gráfico de atividade semanal e distribuição por categoria.

---

## Tecnologias utilizadas

- **React 19** (componentes funcionais, props, hooks nativos e hooks customizados)
- **Vite 8** (build e servidor de desenvolvimento)
- **React Router 7** (rotas públicas e privadas)
- **Tailwind CSS 4** (via `@tailwindcss/vite`, com tokens de design em `@theme`)
- **Tesseract.js 7** (OCR no navegador, carregado sob demanda)
- **lucide-react** (ícones) e **Fontsource** (fontes Inter e Bricolage Grotesque, sem CDN)
- **APIs consumidas**:
  - [MockAPI.io](https://mockapi.io): API mockada com os recursos `users`, `scans` e `messages`
  - [Wikipedia REST API](https://pt.wikipedia.org/api/rest_v1/): API pública de terceiros
  - [Google Books API](https://developers.google.com/books): API pública de terceiros
  - [Open Library Search API](https://openlibrary.org/dev/docs/api/search): API pública de terceiros, usada quando o Google Books falha
- **Vercel** (deploy) e **oxlint** (lint)

---

## Como instalar as dependências

Pré-requisito: **Node.js 20+** (testado com Node 22).

```bash
npm install
```

## Como executar o projeto

```bash
cp .env.example .env   # opcional (veja "Back-end / API" abaixo)
npm run dev
```

Acesse a URL exibida no terminal (padrão `http://localhost:5173`).

Outros comandos:

```bash
npm run build     # build de produção em dist/
npm run preview   # serve a build localmente
npm run lint      # oxlint
npm run seed      # cria o usuário de teste e scans de exemplo no MockAPI
```

> A câmera ao vivo exige **HTTPS ou localhost**: funciona no `npm run dev` e no deploy da Vercel.

---

## Back-end / API (como executar os servidores)

**Não há servidor próprio para rodar.** O back-end é uma **API mockada no MockAPI.io**, acessada
pela URL em `VITE_MOCKAPI_URL`.

- **Sem configurar nada**, o app funciona do mesmo jeito: um adaptador local
  (`src/services/api/localAdapter.js`) implementa a mesma interface REST sobre o `localStorage`, com
  latência simulada. O usuário de teste já vem criado.
- **Para usar o MockAPI:**
  1. Crie um projeto em https://mockapi.io com os recursos `users`, `scans` e, opcionalmente,
     `messages` (se o plano gratuito não permitir o terceiro recurso, o formulário de contato salva
     localmente).
  2. Copie a URL base (ex.: `https://xxxxxx.mockapi.io/api/v1`) para `VITE_MOCKAPI_URL` no `.env`.
  3. Rode `npm run seed` para criar o usuário de teste e scans de exemplo.
  4. Na Vercel, cadastre a mesma variável em *Settings → Environment Variables*.

| Variável | Obrigatória | Descrição |
|---|---|---|
| `VITE_MOCKAPI_URL` | Não | URL base do MockAPI. Sem ela, o app usa o adaptador local. |
| `VITE_GOOGLE_BOOKS_API_KEY` | Não | Chave gratuita da Google Books API. Sem ela, a cota anônima costuma estar esgotada e o app usa a Open Library automaticamente. |

**Recursos da API**

| Recurso | Campos | Uso |
|---|---|---|
| `users` | `name`, `email`, `passwordHash`, `createdAt` | cadastro e login |
| `scans` | `userId`, `kind` (`ocr`/`analysis`), `text`, `title`, `category`, `summary`, `keyPoints`, `sources`, `books`, `createdAt` | histórico do usuário |
| `messages` | `name`, `email`, `subject`, `message`, `createdAt` | formulário de contato |

> As senhas são salvas como hash SHA-256, nunca em texto puro. Como é um projeto acadêmico sem
> back-end próprio, a verificação acontece no navegador; um produto real usaria um servidor com
> autenticação via token.

---

## Usuários e senhas para teste

| E-mail | Senha |
|---|---|
| `aluno@seekvision.com` | `seek1234` |

Também é possível criar uma conta nova na aba **Criar conta**.

---

## Rotas

| Rota | Acesso | Página |
|---|---|---|
| `/` | Pública | Landing page (`#solucao`, `#publico-alvo`, `#galeria`, `#equipe`, `#contato`) |
| `/login` | Pública (só para quem não está logado) | Login / Criar conta (`?tab=cadastro`) |
| `/app/scanner` | **Privada** | Scanner OCR |
| `/app/historico` | **Privada** | Histórico por temas |
| `/app/perfil` | **Privada** | Perfil e estatísticas |
| `/camera`, `/history` | — | Redirecionam para as novas rotas (URLs da Sprint 3) |
| `*` | Pública | Página 404 |

Quem tenta acessar uma rota privada sem login é levado para `/login?redirect=…` e, depois de
entrar, volta para a página que queria (`src/routes/PrivateRoute.jsx` e `PublicOnlyRoute.jsx`).

---

## Organização do projeto

```
├── index.html
├── vercel.json                  # rewrite SPA (refresh em /app/... não dá 404)
├── .env.example
├── scripts/seed-mockapi.mjs     # popula o MockAPI
└── src/
    ├── main.jsx                 # BrowserRouter + AuthProvider + ToastProvider
    ├── App.jsx                  # tabela de rotas (públicas e privadas)
    ├── index.css                # Tailwind + tokens de design (@theme)
    ├── routes/                  # PrivateRoute, PublicOnlyRoute
    ├── context/                 # AuthContext, ToastContext
    ├── hooks/                   # 👉 toda a lógica (ver tabela abaixo)
    ├── services/
    │   ├── api/                 # MockAPI (httpAdapter) | localStorage (localAdapter) | seed
    │   ├── booksApi.js          # Google Books → Open Library
    │   ├── wikipediaApi.js      # Wikipedia search + summary
    │   ├── ocr.js               # Tesseract.js
    │   ├── studyNotes.js        # monta a nota (relevância, categoria, fontes)
    │   ├── studyAssistant.js    # respostas do assistente de estudo
    │   └── mockKnowledgeAI.js   # modo offline
    ├── data/                    # conteúdo estático (landing, equipe, base de estudos)
    ├── components/
    │   ├── ui/                  # Button, Badge, Card, TextField, Modal, Drawer, ScanFrame…
    │   ├── layout/              # SiteHeader, SiteFooter, PublicLayout, AppLayout
    │   ├── landing/             # Hero, Solucao, ComoFunciona, PublicoAlvo, Galeria, Equipe, Contato…
    │   ├── auth/                # LoginForm, RegisterForm, PasswordStrength
    │   ├── scanner/             # Viewfinder, ResultPanel, RecentScans, AiDrawer, TipsCard
    │   ├── knowledge/           # TopicList, NodeList, DetailPanel, NoteCard, ChatDrawer
    │   └── profile/             # StatTile, WeekActivity, CategoryBreakdown
    └── pages/                   # Landing, Login, Scanner, Historico, Perfil, NotFound
```

### Hooks customizados (lógica separada da interface)

As páginas e os componentes só fazem a renderização e chamam hooks; requisições, `localStorage`,
timers e regras ficam em `src/hooks/` e `src/services/`.

| Hook | Responsabilidade |
|---|---|
| `useAuth` | sessão, login, cadastro e logout (via `AuthContext`) |
| `useAsync` | carregamento assíncrono com `loading` / `error` / `reload` |
| `useScans` | CRUD dos scans do usuário na API, com atualização otimista |
| `useOcrScan` | fluxo do scanner: imagem → OCR → efeito de digitação → texto |
| `useCameraStream` | câmera ao vivo (`getUserMedia`) e captura de frame |
| `useAiAnalysis` | etapas da análise (Wikipédia + livros), nota gerada e salvamento |
| `useKnowledgeTree` | árvore de temas, navegação e busca do histórico |
| `useTopicChat` | conversa com o assistente de estudo |
| `useScanStats` | estatísticas do perfil (`useMemo`, `Math.round`) |
| `useForm` / `useContactForm` | formulários com validação; envio do contato para a API |
| `useCarousel` | carrossel: índice, autoplay, swipe e teclado |
| `useScrollSpy` / `useHashScroll` | menu ativo e rolagem até a âncora na landing |
| `useTypewriter`, `useClipboard`, `useLockBodyScroll`, `useDocumentTitle`, `useLocalStorage`, `useToast` | utilitários |

Hooks nativos usados: `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, `useContext`,
`useId` e `startTransition`.

---

## Design (Sprint 4)

O professor avaliou que o visual da Sprint 3 estava fraco, então a interface foi **redesenhada**. As
referências vieram do Dribbble: landing pages escuras com *bento grid*, o app de estudos *ESTUDEE*
(dark mode), UIs de scanner com IA e landings voltadas à Geração Z.

- **Paleta**: base escura "ink" (`#07080F`), **volt** `#C6F432` para as ações de scan e as
  principais, **iris** `#7C5CFF` para IA e destaques.
- **Tipografia**: *Bricolage Grotesque* (títulos) e *Inter* (texto).
- **Assinatura visual**: cantos de enquadramento de câmera (`ScanFrame`) e linha de varredura animada.
- **Layout**: **CSS Grid** com utilitários do Tailwind (`grid-cols-*`, `col-span-*`, `row-span-*`,
  `grid-flow-dense`) e HTML semântico (`header`, `nav`, `main`, `section`, `article`, `figure`,
  `footer`).
- **Responsivo**: mobile-first, com breakpoints `sm` (640px), `md` (768px, tablet) e `lg`
  (1024px, desktop). No celular, o app usa uma barra de abas inferior. Testado em 390px, 820px e
  1440px sem rolagem horizontal.
- **Acessibilidade**: foco visível, `aria-*` nos componentes interativos, link "pular para o
  conteúdo" e suporte a `prefers-reduced-motion`.

---

## Requisitos atendidos

**Front-End Design + Web Development (comuns)**
- [x] Integração do projeto da Sprint 3 ao **React**: a landing de Front-End e o app de WebDev agora são um único app
- [x] **Tailwind CSS** em toda a estilização (o CSS antigo, de 1.900+ linhas, foi removido)
- [x] **Responsividade** para Desktop, Tablet e Mobile
- [x] **Deploy** com Git + Vercel (`vercel.json` com rewrite para as rotas do React)
- [x] README com tecnologias, instalação, execução, servidores, usuário de teste e link do deploy
- [x] `INTEGRANTES.TXT` na raiz

**Web Development**
- [x] Componentização com **props** (pai → filho), por exemplo `Solucao → FeatureCard` e `Equipe → TeamCard`
- [x] **Rotas públicas e privadas** (`PrivateRoute`, `PublicOnlyRoute`)
- [x] **Hooks nativos** e **hooks customizados** separando a lógica da interface (`src/hooks/`)
- [x] **Consumo de API**: mockada (MockAPI) e públicas de terceiros (Wikipedia, Google Books, Open Library)
- [x] Parágrafo sobre o uso de IA (abaixo)

---

## Onde e como a IA foi utilizada no projeto

A equipe usou o **Claude Code** (assistente de programação da Anthropic) como apoio na Sprint 4.
A IA leu os requisitos do Challenge e os dois projetos da Sprint 3, e ajudou a montar o plano de
unificação (`SPRINT-4-PLAN.md`). Também implementou boa parte da migração: a configuração do
Tailwind e dos tokens do redesign, a reorganização da lógica em hooks customizados, as rotas
privadas, a integração com MockAPI, Wikipédia, Google Books e Open Library, o OCR com Tesseract.js
(a partir do teste que a equipe já tinha feito em uma branch) e o rascunho deste README. A IA também
rodou testes de ponta a ponta no navegador e corrigiu os problemas encontrados (overflow no
celular, logout, relevância das fontes). A equipe definiu a direção do design com base no feedback
do professor e nas referências do Dribbble, revisou o código gerado e validou o funcionamento.

Importante: a "IA" **dentro do produto** não é um modelo de linguagem. A nota de estudo é montada a
partir de dados reais da Wikipédia e das bases de livros, por regras de relevância
(`src/services/studyNotes.js`), e o assistente de estudo usa respostas baseadas em regras
(`src/services/studyAssistant.js`).

---

## Entrega

```bash
git archive --format=zip -o SeekVision-Sprint4.zip HEAD
```

O ZIP inclui código-fonte, `README.md`, `INTEGRANTES.TXT` e os demais arquivos necessários
(sem `node_modules` e `dist`). Para conferir, descompacte em uma pasta limpa e rode `npm install && npm run dev`.
