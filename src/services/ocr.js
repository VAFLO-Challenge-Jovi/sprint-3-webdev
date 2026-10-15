/**
 * Real OCR in the browser with Tesseract.js (Portuguese + English).
 * The worker is created lazily and reused between scans; the library itself
 * is loaded on demand so it doesn't weigh on the landing page bundle.
 */
const MIN_LINE_CONFIDENCE = 60;

let workerPromise = null;
let progressListener = null;

async function getWorker() {
  if (!workerPromise) {
    workerPromise = import('tesseract.js')
      .then(({ createWorker }) =>
        createWorker(['por', 'eng'], 1, {
          logger: (message) => progressListener?.(message),
        }),
      )
      .catch((error) => {
        workerPromise = null;
        throw error;
      });
  }
  return workerPromise;
}

export async function recognizeText(image, onProgress) {
  progressListener = onProgress;
  try {
    const worker = await getWorker();
    const { data } = await worker.recognize(image, {}, { text: true, blocks: true });
    // Keep only lines Tesseract is reasonably sure about (drops noise from photos/backgrounds).
    const lines = (data.blocks || [])
      .flatMap((block) => block.paragraphs)
      .flatMap((paragraph) => paragraph.lines)
      .filter((line) => line.confidence >= MIN_LINE_CONFIDENCE)
      .map((line) => line.text);
    return cleanOcrText(lines.length ? lines.join('\n') : data.text);
  } finally {
    progressListener = null;
  }
}

export function cleanOcrText(text) {
  return String(text || '')
    .split('\n')
    .map((line) =>
      line
        .replace(/\s+/g, ' ')
        // stray symbols OCR reads from borders/shadows at the edges of a line
        .replace(/^[^\p{L}\p{N}"“(]+|[^\p{L}\p{N}.!?)"”%]+$/gu, '')
        .trim(),
    )
    .filter((line) => line.length > 1 && /[\p{L}\p{N}]/u.test(line))
    .join('\n')
    .trim();
}
