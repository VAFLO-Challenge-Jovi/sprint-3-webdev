import { useState } from 'react';
import { Aperture, Camera, ImagePlus, X } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { buttonClasses } from '../ui/buttonStyles.js';
import ScanFrame from '../ui/ScanFrame.jsx';

/**
 * Image/camera preview with scan animation, drag-and-drop upload,
 * live camera mode and OCR progress bar.
 */
export default function Viewfinder({
  imageSrc,
  running,
  progress,
  detected,
  videoRef,
  cameraActive,
  cameraStarting,
  cameraError,
  onFile,
  onOpenCamera,
  onCloseCamera,
  onCapture,
}) {
  const [dragOver, setDragOver] = useState(false);

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files[0]);
  }

  return (
    <section aria-label="Visor do scanner" className="flex flex-col gap-4">
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-4xl border bg-ink-900 transition ${
          dragOver ? 'border-volt-400' : 'border-white/8'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {cameraActive ? (
          <video ref={videoRef} className="size-full object-cover" playsInline muted aria-label="Pré-visualização da câmera" />
        ) : (
          <img src={imageSrc} alt="Imagem enviada para o scanner" className="size-full object-contain" />
        )}

        <ScanFrame className="inset-5" />
        {running && <div className="absolute inset-x-6 h-0.5 animate-scan bg-volt-400 shadow-[0_0_24px_4px_var(--color-volt-400)]" aria-hidden="true" />}
        {detected && !cameraActive && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full bg-volt-400 px-3 py-1 text-xs font-bold whitespace-nowrap text-ink-950">Texto detectado</div>
        )}
        {dragOver && (
          <div className="absolute inset-0 grid place-items-center bg-ink-950/70 text-lg font-semibold text-volt-300">Solte a imagem aqui</div>
        )}

        {cameraActive && (
          <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-4">
            <Button variant="secondary" size="icon" onClick={onCloseCamera} aria-label="Fechar câmera" className="bg-ink-950/70 backdrop-blur">
              <X className="size-5" aria-hidden="true" />
            </Button>
            <button
              type="button"
              onClick={onCapture}
              aria-label="Capturar foto"
              className="grid size-18 place-items-center rounded-full border-4 border-white/90 bg-volt-400/90 text-ink-950 transition active:scale-95"
            >
              <Aperture className="size-7" aria-hidden="true" />
            </button>
            <span className="size-10" aria-hidden="true" />
          </div>
        )}

        {progress !== null && (
          <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-ink-950/80 p-3 backdrop-blur" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso do OCR">
            <div className="mb-2 flex justify-between text-xs font-semibold">
              <span>Reconhecendo texto</span>
              <span className="text-volt-300">{progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-volt-400 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {cameraError && (
        <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300" role="alert">
          {cameraError}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <label className={buttonClasses({ size: 'lg', block: true, className: running ? 'pointer-events-none opacity-45' : '' })}>
          <ImagePlus className="size-5" aria-hidden="true" />
          Enviar imagem
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={running}
            onChange={(e) => {
              onFile(e.target.files[0]);
              e.target.value = '';
            }}
          />
        </label>
        <Button variant="iris" size="lg" block icon={Camera} loading={cameraStarting} disabled={running || cameraActive} onClick={onOpenCamera}>
          Usar câmera
        </Button>
      </div>
    </section>
  );
}
