import { Component } from "@angular/core";
import { DragElements } from "../../components/drag-elements/drag-elements.component";

@Component({
  selector: "markas-example",
  imports: [DragElements],
  template: `
    <div [class]="box">
      <p [class]="title">Stack we love</p>
      <p [class]="hint">Pull a tag, it springs back</p>
      <markas-drag-elements
        release="return"
        [rotate]="12"
        [seed]="4"
        [class]="board"
        role="group"
        aria-label="Skills"
      >
        <span [class]="chip">Laravel</span>
        <span [class]="chip">Vue</span>
        <span [class]="chip">React</span>
        <span [class]="chip">Tailwind CSS</span>
        <span [class]="chip">Alpine.js</span>
        <span [class]="chip">Figma</span>
      </markas-drag-elements>
    </div>
  `,
})
export default class DragElementsReturnExample {
  protected readonly box = "rounded-xl border border-line bg-surface p-5";
  protected readonly title = "text-sm font-semibold text-ink";
  protected readonly hint = "text-sm text-muted";
  protected readonly board = "mt-4 h-44 rounded-lg bg-subtle";
  protected readonly chip =
    "rounded-full border border-primary-line bg-primary-soft px-3 py-1.5 text-sm font-medium text-ink";
}
