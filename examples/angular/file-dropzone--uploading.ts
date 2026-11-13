import { Component, DestroyRef, inject, signal } from "@angular/core";
import { FileDropzone } from "../../components/file-dropzone/file-dropzone.component";

/** Simulated upload: +9% every 150ms. A real app reports progress from its upload request. */
const STEP = 9;
const TICK_MS = 150;

@Component({
  selector: "markas-example",
  imports: [FileDropzone],
  template: `
    <markas-file-dropzone
      multiple
      hint="Add a file to watch it upload"
      [files]="uploads"
      [progress]="progress()"
      (filesChange)="simulate($event)"
    />
  `,
})
export default class FileDropzoneUploadingExample {
  protected readonly uploads = [
    {
      name: "keynote-deck.pdf",
      size: 5872025,
      type: "application/pdf",
      progress: 100,
    },
    {
      name: "product-demo.mp4",
      size: 41943040,
      type: "video/mp4",
      progress: 72,
    },
    { name: "voiceover.wav", size: 9437184, type: "audio/wav", progress: 35 },
  ];
  protected readonly progress = signal<Record<string, number>>({});
  private readonly started = new Set<string>();
  private readonly timers: number[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.timers.forEach(clearInterval));
  }

  protected simulate(files: File[]) {
    for (const { name } of files) {
      if (this.started.has(name)) continue;
      this.started.add(name);
      let value = 0;
      this.progress.update((current) => ({ ...current, [name]: value }));
      const timer = window.setInterval(() => {
        value = Math.min(100, value + STEP);
        this.progress.update((current) => ({ ...current, [name]: value }));
        if (value === 100) clearInterval(timer);
      }, TICK_MS);
      this.timers.push(timer);
    }
  }
}
