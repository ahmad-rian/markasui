## Blade

```blade
<x-markas.file-dropzone
    name="attachments[]"
    accept="image/*,.pdf"
    multiple
    :max-size="5 * 1024 * 1024"
    :max-files="4"
    hint="Gambar atau PDF, maksimal 5 MB per file"
    drop-label="Letakkan file di sini atau"
    browse-label="pilih file"
    remove-label="Hapus {name}"
    too-large-label="Lebih dari {size}"
    type-label="Jenis file tidak diizinkan"
    too-many-label="Maksimal {max} file"
/>
```

Butuh Alpine.js. Di dalam form dengan `enctype="multipart/form-data"` file yang valid terkirim sebagai `attachments[]`.

## React

```tsx
import { FileDropzone } from "@/components/markas/FileDropzone";

<FileDropzone
  accept="image/*,.pdf"
  multiple
  maxSize={5 * 1024 * 1024}
  maxFiles={4}
  hint="Gambar atau PDF, maksimal 5 MB per file"
  dropLabel="Letakkan file di sini atau"
  browseLabel="pilih file"
  removeLabel="Hapus {name}"
  tooLargeLabel="Lebih dari {size}"
  typeLabel="Jenis file tidak diizinkan"
  tooManyLabel="Maksimal {max} file"
  progress={progress}
  onFilesChange={unggah}
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
    hint="Gambar atau PDF, maksimal 5 MB per file"
    drop-label="Letakkan file di sini atau"
    browse-label="pilih file"
    remove-label="Hapus {name}"
    too-large-label="Lebih dari {size}"
    type-label="Jenis file tidak diizinkan"
    too-many-label="Maksimal {max} file"
    :progress="progress"
    @change="unggah"
  />
</template>
```

## Catatan

- Area jatuh adalah label yang membungkus input file native, jadi klik, Enter, atau Space membuka pemilih. Hanya file valid yang tetap di input, sehingga form biasa mengirimnya.
- File yang gagal `accept`, `maxSize`, atau `maxFiles` tetap di daftar dengan error sampai dihapus.
- `files` menampilkan unggahan sebelumnya (name, size, type, progress, error). Ditampilkan, tidak dikirim.
- Progress: React dan Vue menerima `progress` per nama file. Di Blade kirim event `file-progress` dengan `{ name, progress }` ke komponen.
- Atribut dan `class` jatuh ke elemen luar; `name`, `accept`, `disabled`, `required`, dan `id` ke input.
