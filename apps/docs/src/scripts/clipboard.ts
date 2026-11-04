const FEEDBACK_MS = 1500;

/** Salin teks lalu tandai elemen dengan data-copied sebentar sebagai umpan balik. */
export async function copyText(
  text: string,
  feedbackTarget?: HTMLElement,
): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    return false;
  }
  if (feedbackTarget) {
    feedbackTarget.dataset.copied = "";
    setTimeout(() => delete feedbackTarget.dataset.copied, FEEDBACK_MS);
  }
  return true;
}
