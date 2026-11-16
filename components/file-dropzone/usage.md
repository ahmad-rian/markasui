## Blade

```blade
<x-markas.file-dropzone
    name="attachments[]"
    accept="image/*,.pdf"
    multiple
    :max-size="5 * 1024 * 1024"
    :max-files="4"
    hint="Images or PDF, up to 5 MB each"
/>
```

Needs Alpine.js. Inside a form with `enctype="multipart/form-data"` the valid files post as `attachments[]`.

### Livewire

```blade
<x-markas.file-dropzone multiple accept="image/*" :max-size="5242880" wire:model="photos" />
```

Add `use WithFileUploads;` to the component. Only files that pass `accept`, `maxSize`, and `maxFiles` are uploaded, through a hidden file input that carries `wire:model`. Upload progress fills the bars, and removing every file sets the property back to `null` (or `[]` with `multiple`). Validate again on the server.

## React

```tsx
import { FileDropzone } from "@/components/markas/FileDropzone";

<FileDropzone
  accept="image/*,.pdf"
  multiple
  maxSize={5 * 1024 * 1024}
  maxFiles={4}
  hint="Images or PDF, up to 5 MB each"
  progress={progress}
  onFilesChange={upload}
/>;
```

## Vue

```vue
<template>
  <FileDropzone
    accept="image/*,.pdf"
    multiple
    :max-size="5 * 1024 * 1024"
    :max-files="4"
    hint="Images or PDF, up to 5 MB each"
    :progress="progress"
    @change="upload"
  />
</template>
```

## Svelte

```svelte
<script lang="ts">
  import FileDropzone from "$lib/components/markas/FileDropzone.svelte";
</script>

<FileDropzone
  accept="image/*,.pdf"
  multiple
  maxSize={5 * 1024 * 1024}
  maxFiles={4}
  hint="Images or PDF, up to 5 MB each"
  {progress}
  onFilesChange={upload}
/>
```

## Astro

```astro
---
import FileDropzone from "@/components/markas/FileDropzone.astro";
---

<FileDropzone
  name="attachments[]"
  accept="image/*,.pdf"
  multiple
  maxSize={5 * 1024 * 1024}
  maxFiles={4}
  hint="Images or PDF, up to 5 MB each"
/>
```

A small custom element validates picks, keeps them on the native input, and dispatches a bubbling `markas-change` event with the valid files as detail. Show upload progress with `dropzone.setProgress(name, percent)`.

## Angular

```ts
import { Component, signal } from "@angular/core";
import { FileDropzone } from "./markas/file-dropzone.component";

@Component({
  selector: "app-attachments",
  imports: [FileDropzone],
  template: `
    <markas-file-dropzone
      name="attachments[]"
      accept="image/*,.pdf"
      multiple
      [maxSize]="5242880"
      [maxFiles]="4"
      hint="Images or PDF, up to 5 MB each"
      [progress]="progress()"
      (filesChange)="upload($event)"
    />
  `,
})
export class Attachments {
  progress = signal<Record<string, number>>({});
  upload(files: File[]) {}
}
```

## Notes

- The drop area is a label around a native file input, so a click, Enter, or Space opens the picker. Only valid files stay on the input, so a regular form post sends them.
- Files that fail `accept`, `maxSize`, or `maxFiles` stay in the list with an error until removed.
- `files` shows earlier uploads (name, size, type, progress, error). They are shown, not posted.
- Progress: React and Vue take `progress` by file name. In Blade dispatch `file-progress` with `{ name, progress }` on the component.
- Attributes and `class` go to the outer element; `name`, `accept`, `disabled`, `required`, and `id` go to the input.
