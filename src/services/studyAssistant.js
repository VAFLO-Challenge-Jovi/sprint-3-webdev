import { normalize } from '../utils/format.js';

/**
 * Rule-based study assistant for the "Conversar com IA" drawer.
 * Answers are built from the selected note (title, category, summary, key points).
 */
export function answerQuestion(question, context) {
  const q = normalize(question);
  const { title, category, summary, keyPoints = [] } = context;

  if (q.includes('exerc') || q.includes('pratic') || q.includes('pergunta')) {
    const questions = [
      `O que é ${title} e por que ele importa em ${category}?`,
      `Explique com suas palavras: ${keyPoints[0] || summary.slice(0, 80)}`,
      `Dê um exemplo prático relacionado a ${title}.`,
    ];
    return `Perguntas para praticar:\n${questions.map((item, i) => `${i + 1}. ${item}`).join('\n')}`;
  }
  if (q.includes('prova') || q.includes('revis')) {
    return `Plano de revisão para ${title}:\n1. Leia o resumo (2 min)\n2. Cubra a tela e liste os pontos-chave de memória\n3. Explique o tema em voz alta em até 2 minutos\n4. Revise de novo amanhã — repetição espaçada fixa o conteúdo.`;
  }
  if (q.includes('fonte') || q.includes('link') || q.includes('referen')) {
    return 'As fontes listadas na nota vêm da Wikipédia e de bases de livros (Google Books / Open Library). Use-as para confirmar definições e buscar exemplos — sempre cite a fonte original em trabalhos.';
  }
  if (q.includes('resum') || q.includes('explica')) {
    return `Em resumo: ${summary}${keyPoints.length ? `\n\nPontos-chave:\n• ${keyPoints.join('\n• ')}` : ''}`;
  }
  return `${title} está em ${category}. ${summary}\n\nPosso gerar perguntas de prática, um plano de revisão ou explicar as fontes — é só pedir.`;
}
