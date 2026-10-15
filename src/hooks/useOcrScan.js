import { useCallback, useEffect, useRef, useState } from 'react';
import { recognizeText } from '../services/ocr.js';
import { useTypewriter } from './useTypewriter.js';

export const DEMO_TEXT = 'The Photography Storytelling Workshop';
const MAX_FILE_MB = 8;

const READY = { state: 'ready', text: 'Aguardando imagem...' };

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Erro ao ler o arquivo.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Scanner state machine: image → OCR (real Tesseract.js or the simulated demo)
 * → typewriter reveal → detected text.
 * `onDetected(text)` / `onError(message)` let the page show toasts.
 */
export function useOcrScan({ initialImage, onDetected, onError } = {}) {
  const [imageSrc, setImageSrc] = useState(initialImage);
  const [status, setStatus] = useState(READY);
  const [progress, setProgress] = useState(null);
  const [detectedText, setDetectedText] = useState('');
  const [running, setRunning] = useState(false);
  const { output, setOutput, type, stop } = useTypewriter();

  const tokenRef = useRef(0);
  const callbacksRef = useRef({ onDetected, onError });
  useEffect(() => {
    callbacksRef.current = { onDetected, onError };
  });

  const begin = useCallback(
    (src, text) => {
      const token = ++tokenRef.current;
      stop();
      setImageSrc(src);
      setRunning(true);
      setDetectedText('');
      setOutput('');
      setProgress(null);
      setStatus({ state: 'scanning', text });
      return token;
    },
    [stop, setOutput],
  );

  const reveal = useCallback(
    (token, text, label) => {
      type(text, () => {
        if (token !== tokenRef.current) return;
        setDetectedText(text);
        setRunning(false);
        setProgress(null);
        setStatus({ state: 'done', text: label });
        callbacksRef.current.onDetected?.(text);
      });
    },
    [type],
  );

  const fail = useCallback((token, message) => {
    if (token !== tokenRef.current) return;
    setRunning(false);
    setProgress(null);
    setStatus({ state: 'error', text: message });
    callbacksRef.current.onError?.(message);
  }, []);

  /** Simulated scan for the bundled demo image (no 15 MB model download on first visit). */
  const scanDemo = useCallback(
    (src) => {
      const token = begin(src, 'Procurando texto na imagem...');
      const duration = 1400 + Math.random() * 800;
      setTimeout(() => {
        if (token === tokenRef.current) reveal(token, DEMO_TEXT, 'Texto detectado (imagem de demonstração)');
      }, duration);
    },
    [begin, reveal],
  );

  /** Real OCR with Tesseract.js. */
  const scanImage = useCallback(
    async (src) => {
      const token = begin(src, 'Preparando o OCR...');
      try {
        const text = await recognizeText(src, (message) => {
          if (token !== tokenRef.current) return;
          if (message.status === 'recognizing text') {
            setProgress(Math.round(message.progress * 100));
            setStatus({ state: 'scanning', text: 'Reconhecendo texto...' });
          } else if (message.status.includes('traineddata')) {
            setStatus({ state: 'scanning', text: 'Baixando idiomas (PT + EN) — só na 1ª vez...' });
          }
        });
        if (token !== tokenRef.current) return;
        if (!text) {
          fail(token, 'Nenhum texto encontrado. Tente uma imagem mais nítida e bem iluminada.');
          return;
        }
        reveal(token, text, 'Texto detectado');
      } catch {
        fail(token, 'Não foi possível executar o OCR. Verifique sua conexão e tente novamente.');
      }
    },
    [begin, reveal, fail],
  );

  const loadFile = useCallback(
    async (file) => {
      if (!file || !file.type.startsWith('image/')) {
        callbacksRef.current.onError?.('Selecione um arquivo de imagem (JPG, PNG ou WebP).');
        return;
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        callbacksRef.current.onError?.(`A imagem deve ter no máximo ${MAX_FILE_MB} MB.`);
        return;
      }
      try {
        scanImage(await readFileAsDataUrl(file));
      } catch (error) {
        callbacksRef.current.onError?.(error.message);
      }
    },
    [scanImage],
  );

  /** Restores a text from history without re-running OCR. */
  const restore = useCallback(
    (text) => {
      tokenRef.current++;
      stop();
      setRunning(false);
      setProgress(null);
      setOutput(text);
      setDetectedText(text);
      setStatus({ state: 'done', text: 'Texto restaurado do histórico' });
    },
    [stop, setOutput],
  );

  return { imageSrc, status, progress, output, detectedText, running, scanDemo, scanImage, loadFile, restore };
}
