import { useCallback, useEffect, useRef, useState } from 'react';

const ERRORS = {
  NotAllowedError: 'Permissão da câmera negada. Libere o acesso nas configurações do navegador.',
  NotFoundError: 'Nenhuma câmera encontrada neste dispositivo.',
  NotReadableError: 'A câmera está sendo usada por outro aplicativo.',
};

/**
 * Live camera preview (getUserMedia) + frame capture to a JPEG data URL.
 * Prefers the back camera on phones. Stops the stream on unmount.
 */
export function useCameraStream() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [active, setActive] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState(null);

  const supported = typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setActive(false);
  }, []);

  const start = useCallback(async () => {
    if (!supported) {
      setError('Seu navegador não permite acesso à câmera (é preciso HTTPS).');
      return false;
    }
    setStarting(true);
    setError(null);
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      setActive(true);
      return true;
    } catch (err) {
      setError(ERRORS[err.name] || 'Não foi possível abrir a câmera.');
      return false;
    } finally {
      setStarting(false);
    }
  }, [supported]);

  // Attach the stream once the <video> is rendered.
  useEffect(() => {
    if (active && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [active]);

  useEffect(() => stop, [stop]);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return null;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.92);
  }, []);

  return { videoRef, supported, active, starting, error, start, stop, capture };
}
