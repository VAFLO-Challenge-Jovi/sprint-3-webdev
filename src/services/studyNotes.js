import { normalize, truncate } from '../utils/format.js';

export const CATEGORIES = ['Livros', 'Programação', 'Estudos', 'Idiomas', 'Documentos', 'Outros'];

const KEYWORDS = {
  Programação: ['python', 'javascript', 'java', 'codigo', 'html', 'css', 'react', 'algoritmo', 'software', 'programacao', 'sql', 'api'],
  Estudos: ['teorema', 'equacao', 'historia', 'biologia', 'quimica', 'fisica', 'matematica', 'geografia', 'celula', 'funcao', 'revolucao'],
  Documentos: ['contrato', 'formulario', 'cpf', 'rg', 'declaracao', 'boleto', 'certificado', 'edital'],
};

const STOPWORDS = new Set(
  'the and for with from that this your are was of to in on at by an a o os as um uma de da do das dos e em no na nos nas para por com que se ao'.split(' '),
);

/** Meaningful words of a text (lowercase, no accents, no stopwords). */
export function keywords(text) {
  return normalize(text)
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
}

/** Search query from OCR text: first line(s), up to 8 keywords. */
export function toSearchQuery(text) {
  return keywords(text).slice(0, 8).join(' ');
}

/** Share of the query keywords that appear in `candidate` (0–100, rounded). */
export function wordOverlap(query, candidate) {
  const words = keywords(query);
  if (!words.length) return 0;
  const target = normalize(candidate);
  const hits = words.filter((w) => target.includes(w)).length;
  return Math.round((hits / words.length) * 100);
}

/** Subject keywords win; otherwise a text that is only a book title goes to "Livros". */
export function inferCategory(text, isBookTitle) {
  const plain = normalize(text);
  const found = Object.entries(KEYWORDS).find(([, words]) => words.some((w) => plain.includes(w)));
  if (found) return found[0];
  return isBookTitle ? 'Livros' : 'Estudos';
}

function stripHtml(text) {
  return String(text || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Turns OCR text + Wikipedia + book search results into a study note.
 */
export function buildStudyNote({ text, wiki: wikiResult, books: bookResults = [] }) {
  const query = text.split('\n')[0].trim();
  const searchQuery = toSearchQuery(text);
  // Search APIs always return *something* — keep only results that share the scanned keywords.
  const wiki = wikiResult && wordOverlap(searchQuery, `${wikiResult.title} ${wikiResult.extract}`) >= 50 ? wikiResult : null;
  const books = bookResults.filter((book) => wordOverlap(searchQuery, `${book.title} ${book.subtitle}`) >= 50);
  const matchedBook = books.find((book) => wordOverlap(searchQuery, `${book.title} ${book.subtitle}`) >= 75) || null;

  // A relevant Wikipedia article means the text is a concept; otherwise it may be a book title.
  const isBookTitle = Boolean(matchedBook) && !wiki;
  const title = wiki?.title || matchedBook?.title || truncate(query, 60);
  const summary =
    (wiki && truncate(wiki.extract, 420)) ||
    (matchedBook && stripHtml(matchedBook.description) && truncate(stripHtml(matchedBook.description), 420)) ||
    (matchedBook &&
      `“${matchedBook.title}” é um livro${matchedBook.authors.length ? ` de ${matchedBook.authors.join(', ')}` : ''}${
        matchedBook.year ? `, publicado em ${matchedBook.year}` : ''
      }. Identificado pela capa e confirmado no ${matchedBook.source} — abra a fonte para ver sinopse, edições e onde encontrar.`) ||
    'Não encontramos uma fonte confiável para esse texto. Tente enquadrar melhor o trecho ou pesquisar no Google.';

  const keyPoints = [`Texto reconhecido: “${truncate(query, 70)}”`];
  if (matchedBook) {
    const by = matchedBook.authors.length ? ` — ${matchedBook.authors.join(', ')}` : '';
    keyPoints.push(`${isBookTitle ? 'Livro identificado' : 'Livro sobre o tema'}: ${matchedBook.title}${by}${matchedBook.year ? ` (${matchedBook.year})` : ''}`);
  }
  if (wiki) keyPoints.push(`Tema relacionado na Wikipédia: ${wiki.title}`);
  if (books.length) keyPoints.push(`${books.length} livro${books.length > 1 ? 's' : ''} relacionado${books.length > 1 ? 's' : ''} encontrado${books.length > 1 ? 's' : ''} (${books[0].source})`);

  const sources = [
    ...(wiki ? [{ title: `Wikipédia — ${wiki.title}`, url: wiki.url }] : []),
    ...books.slice(0, 3).map((book) => ({ title: `${book.source} — ${book.title}`, url: book.url })),
  ];

  return {
    kind: 'analysis',
    text,
    title,
    category: inferCategory(text, isBookTitle),
    summary,
    keyPoints,
    sources,
    books: books.slice(0, 3).map(({ id, source, title: bookTitle, authors, year, thumbnail, url }) => ({
      id,
      source,
      title: bookTitle,
      authors,
      year,
      thumbnail,
      url,
    })),
    createdAt: new Date().toISOString(),
  };
}
