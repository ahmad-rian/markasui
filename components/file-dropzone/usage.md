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

## Notes

- The drop area is a label around a native file input, so a click, Enter, or Space opens the picker. Only valid files stay on the input, so a regular form post sends them.
- Files that fail `accept`, `maxSize`, or `maxFiles` stay in the list with an error until removed.
- `files` shows earlier uploads (name, size, type, progress, error). They are shown, not posted.
- Progress: React and Vue take `progress` by file name. In Blade dispatch `file-progress` with `{ name, progress }` on the component.
- Attributes and `class` go to the outer element; `name`, `accept`, `disabled`, `required`, and `id` go to the input.
