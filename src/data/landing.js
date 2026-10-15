import defaultPhoto from '../assets/imgs/default-photo.jpg';
import textFound from '../assets/imgs/default-photo-text-found.jpg';
import searching from '../assets/imgs/buscando-texto.jpg';
import result from '../assets/imgs/resultado-encontrado.jpg';

export const NAV_SECTIONS = [
  { id: 'solucao', label: 'A Solução' },
  { id: 'publico-alvo', label: 'Público-Alvo' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'equipe', label: 'Nossa Equipe' },
  { id: 'contato', label: 'Contato' },
];

/** Bento grid on "A Solução". `size` maps to grid spans on desktop. */
export const FEATURES = [
  {
    icon: 'ScanText',
    title: 'OCR de verdade, no navegador',
    text: 'Reconhecimento de texto em português e inglês com Tesseract.js — livros, lousa, slides e anotações.',
    size: 'large',
    tone: 'volt',
  },
  {
    icon: 'Sparkles',
    title: 'Nota de estudo automática',
    text: 'O texto vira um resumo com fontes da Wikipédia, Google Books e Open Library.',
    size: 'tall',
    tone: 'iris',
  },
  { icon: 'Search', title: 'Pesquisa em 1 toque', text: 'Abre o Google já com o texto detectado.', size: 'small' },
  { icon: 'Languages', title: 'Tradução instantânea', text: 'Envia o trecho direto para o tradutor.', size: 'small' },
  { icon: 'Camera', title: 'Câmera ao vivo', text: 'Capture pela webcam ou pela câmera do celular, sem sair do app.', size: 'small' },
  { icon: 'FolderTree', title: 'Histórico por temas', text: 'Tudo o que você escaneia fica organizado por matéria.', size: 'wide' },
];

export const STEPS = [
  { title: 'Aponte ou envie', text: 'Use a câmera ao vivo ou envie uma foto do material.' },
  { title: 'OCR em segundos', text: 'O SeekVision destaca e transcreve o texto encontrado.' },
  { title: 'Escolha a ação', text: 'Pesquise, traduza, copie ou gere uma nota com IA.' },
  { title: 'Revise depois', text: 'Suas notas ficam no histórico, organizadas por tema.' },
];

export const PERSONA = {
  name: 'Estudante full-time',
  quote: 'Eu tiro foto da lousa, mas depois nunca acho nada no meio da galeria.',
  traits: ['Estuda e trabalha', 'Celular é a principal ferramenta', 'Pouco tempo entre aulas', 'Aprende em vídeo e imagem'],
  pains: [
    'Usa a câmera só no modo automático',
    'Copia textos à mão para pesquisar',
    'Fotos de aula se perdem na galeria',
  ],
};

export const USE_CASES = [
  'Lousa do professor',
  'Slides de aula',
  'Páginas de livros',
  'Anotações manuscritas',
  'Artigos científicos',
  'Textos em inglês',
  'Documentos impressos',
  'Cartazes do campus',
];

export const GALLERY = [
  { src: defaultPhoto, alt: 'Capa de livro enquadrada pelo scanner do SeekVision', caption: 'Enquadre o material', step: '01', device: 'square' },
  { src: textFound, alt: 'Texto da capa destacado pelo OCR', caption: 'Texto detectado pelo OCR', step: '02', device: 'square' },
  { src: searching, alt: 'Tela do celular pesquisando o texto detectado', caption: 'Pesquisa automática', step: '03', device: 'phone' },
  { src: result, alt: 'Tela do celular com o resultado da pesquisa sobre o livro', caption: 'Resultado encontrado', step: '04', device: 'phone' },
];

export const TEAM = [
  { name: 'Artur Fabi Brandi', rm: 'RM570258' },
  { name: 'Felipe Santos Ribas', rm: 'RM569121' },
  { name: 'Luiz Gonzaga', rm: 'RM572446' },
  { name: 'Orion Cavalcante França', rm: 'RM573677' },
  { name: 'Victor Lula Heineken Rodrigues', rm: 'RM570782' },
];

export const CONTACT = {
  email: 'contato@seekvision.com',
  location: 'FIAP Paulista — Challenge JOVI 2026',
  github: 'https://github.com/VAFLO-Challenge-Jovi',
};
