import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/ui/PageHeader.jsx';
import ConfirmDialog from '../components/ui/ConfirmDialog.jsx';
import Viewfinder from '../components/scanner/Viewfinder.jsx';
import ResultPanel from '../components/scanner/ResultPanel.jsx';
import RecentScans from '../components/scanner/RecentScans.jsx';
import TipsCard from '../components/scanner/TipsCard.jsx';
import AiDrawer from '../components/scanner/AiDrawer.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useScans } from '../hooks/useScans.js';
import { useOcrScan } from '../hooks/useOcrScan.js';
import { useCameraStream } from '../hooks/useCameraStream.js';
import { useAiAnalysis } from '../hooks/useAiAnalysis.js';
import { useClipboard } from '../hooks/useClipboard.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useToast } from '../hooks/useToast.js';
import defaultPhoto from '../assets/imgs/default-photo.jpg';

export default function Scanner() {
  useDocumentTitle('Scanner');
  const { user } = useAuth();
  const showToast = useToast();
  const copy = useClipboard();
  const { scans, loading, error, addScan, removeScan, clearScans } = useScans();
  const camera = useCameraStream();
  const ocr = useOcrScan({
    initialImage: defaultPhoto,
    onDetected: () => showToast('Texto detectado!', 'success'),
    onError: (message) => showToast(message, 'error'),
  });
  const ai = useAiAnalysis({
    onSave: async (note) => {
      try {
        await addScan(note);
        showToast('Nota salva no histórico.', 'success');
      } catch {
        showToast('Não foi possível salvar a nota.', 'error');
        throw new Error('save failed');
      }
    },
  });
  const [confirmClear, setConfirmClear] = useState(false);
  const [clearing, setClearing] = useState(false);

  // Demo scan of the bundled book cover on first load (as in Sprint 3).
  useEffect(() => {
    ocr.scanDemo(defaultPhoto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const alreadySaved = useMemo(
    () => scans.some((scan) => scan.kind === 'ocr' && scan.text === ocr.detectedText),
    [scans, ocr.detectedText],
  );

  function handleFile(file) {
    ai.reset();
    ocr.loadFile(file);
  }

  function handleCapture() {
    const frame = camera.capture();
    camera.stop();
    if (!frame) return showToast('Não foi possível capturar a imagem.', 'error');
    ai.reset();
    ocr.scanImage(frame);
  }

  async function handleAction(action) {
    const text = ocr.detectedText;
    if (action === 'search') {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(text.slice(0, 300))}`, '_blank', 'noopener,noreferrer');
    } else if (action === 'translate') {
      window.open(`https://translate.google.com/?sl=auto&tl=pt&op=translate&text=${encodeURIComponent(text.slice(0, 500))}`, '_blank', 'noopener,noreferrer');
    } else if (action === 'copy') {
      const copied = await copy(text);
      showToast(copied ? 'Texto copiado!' : 'Não foi possível copiar.', copied ? 'success' : 'error');
    }
  }

  async function handleSave() {
    try {
      await addScan({ kind: 'ocr', text: ocr.detectedText });
      showToast('Texto salvo no histórico.', 'success');
    } catch {
      showToast('Não foi possível salvar. Tente novamente.', 'error');
    }
  }

  async function handleDelete(scan) {
    try {
      await removeScan(scan.id);
      showToast('Item removido.', 'info');
    } catch {
      showToast('Não foi possível remover o item.', 'error');
    }
  }

  async function handleClearAll() {
    setClearing(true);
    try {
      await clearScans();
      showToast('Histórico limpo.', 'info');
    } catch {
      showToast('Não foi possível limpar tudo.', 'error');
    } finally {
      setClearing(false);
      setConfirmClear(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow={`Olá, ${user.name.split(' ')[0]}`}
        title="Scanner OCR"
        description="Envie uma foto ou use a câmera. O texto reconhecido vira pesquisa, tradução ou nota de estudo."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
          <Viewfinder
            imageSrc={ocr.imageSrc}
            running={ocr.running}
            progress={ocr.progress}
            detected={ocr.status.state === 'done'}
            videoRef={camera.videoRef}
            cameraActive={camera.active}
            cameraStarting={camera.starting}
            cameraError={camera.error}
            onFile={handleFile}
            onOpenCamera={camera.start}
            onCloseCamera={camera.stop}
            onCapture={handleCapture}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
          <ResultPanel
            status={ocr.status}
            output={ocr.output}
            running={ocr.running}
            hasText={Boolean(ocr.detectedText)}
            saved={alreadySaved}
            analyzing={ai.running}
            onAction={handleAction}
            onSave={handleSave}
            onAnalyze={() => ai.analyze(ocr.detectedText)}
          />
          <RecentScans
            scans={scans}
            loading={loading}
            error={error}
            onSelect={(scan) => {
              ai.reset();
              ocr.restore(scan.text);
            }}
            onDelete={handleDelete}
            onClearAll={() => setConfirmClear(true)}
          />
          <TipsCard />
        </div>
      </div>

      <AiDrawer ai={ai} />

      <ConfirmDialog
        open={confirmClear}
        title="Limpar histórico?"
        description="Todos os textos e notas salvos serão removidos permanentemente."
        confirmLabel="Limpar tudo"
        loading={clearing}
        onConfirm={handleClearAll}
        onCancel={() => setConfirmClear(false)}
      />
    </>
  );
}
