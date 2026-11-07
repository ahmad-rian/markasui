import { DragElements } from "../../components/drag-elements/DragElements";

const board = "h-80 rounded-xl border border-line bg-subtle";
const note = "w-44 rounded-lg bg-surface p-4 shadow-overlay";
const noteTitle = "text-sm font-semibold text-ink";
const noteText = "mt-1 text-sm text-muted";
const sticker =
  "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary";
const round =
  "grid size-16 place-items-center rounded-full border-2 border-dashed border-success bg-surface text-sm font-semibold text-ink";
const swatches = "flex gap-1.5 rounded-lg bg-surface p-2 shadow-overlay";
const swatchPrimary = "size-8 rounded-md bg-primary";
const swatchSuccess = "size-8 rounded-md bg-success";
const swatchWarning = "size-8 rounded-md bg-warning";
const tag =
  "rounded-md border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink";

export default function DragElementsExample() {
  return (
    <DragElements
      seed={4}
      className={board}
      role="group"
      aria-label="Moodboard"
    >
      <div className={note}>
        <p className={noteTitle}>Brand refresh</p>
        <p className={noteText}>Warm, calm, a little playful</p>
      </div>
      <span className={sticker}>Kopi susu</span>
      <span className={round}>New</span>
      <span className={tag}>Batik pattern</span>
      <div className={swatches} aria-label="Palette" role="img">
        <span className={swatchPrimary}></span>
        <span className={swatchSuccess}></span>
        <span className={swatchWarning}></span>
      </div>
    </DragElements>
  );
}
