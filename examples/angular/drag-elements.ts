import { Component } from "@angular/core";
import { DragElements } from "../../components/drag-elements/drag-elements.component";

@Component({
  selector: "markas-example",
  imports: [DragElements],
  template: `
    <markas-drag-elements
      [seed]="4"
      [class]="board"
      role="group"
      aria-label="Moodboard"
    >
      <div [class]="note">
        <p [class]="noteTitle">Brand refresh</p>
        <p [class]="noteText">Warm, calm, a little playful</p>
      </div>
      <span [class]="sticker">Kopi susu</span>
      <span [class]="round">New</span>
      <span [class]="tag">Batik pattern</span>
      <div [class]="swatches" aria-label="Palette" role="img">
        <span [class]="swatchPrimary"></span>
        <span [class]="swatchSuccess"></span>
        <span [class]="swatchWarning"></span>
      </div>
    </markas-drag-elements>
  `,
})
export default class DragElementsExample {
  protected readonly board = "h-80 rounded-xl border border-line bg-subtle";
  protected readonly note = "w-44 rounded-lg bg-surface p-4 shadow-overlay";
  protected readonly noteTitle = "text-sm font-semibold text-ink";
  protected readonly noteText = "mt-1 text-sm text-muted";
  protected readonly sticker =
    "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary";
  protected readonly round =
    "grid size-16 place-items-center rounded-full border-2 border-dashed border-success bg-surface text-sm font-semibold text-ink";
  protected readonly swatches =
    "flex gap-1.5 rounded-lg bg-surface p-2 shadow-overlay";
  protected readonly swatchPrimary = "size-8 rounded-md bg-primary";
  protected readonly swatchSuccess = "size-8 rounded-md bg-success";
  protected readonly swatchWarning = "size-8 rounded-md bg-warning";
  protected readonly tag =
    "rounded-md border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink";
}
