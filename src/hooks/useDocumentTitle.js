import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · SeekVision` : 'SeekVision — OCR Inteligente para Estudantes';
  }, [title]);
}
