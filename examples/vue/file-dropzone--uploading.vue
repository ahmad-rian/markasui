<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import FileDropzone from "../../components/file-dropzone/FileDropzone.vue";

/** Simulated upload: +9% every 150ms. A real app reports progress from its upload request. */
const STEP = 9;
const TICK_MS = 150;

const uploads = [
  {
    name: "keynote-deck.pdf",
    size: 5872025,
    type: "application/pdf",
    progress: 100,
  },
  { name: "product-demo.mp4", size: 41943040, type: "video/mp4", progress: 72 },
  { name: "voiceover.wav", size: 9437184, type: "audio/wav", progress: 35 },
];

const progress = ref<Record<string, number>>({});
const started = new Set<string>();
const timers: number[] = [];
onBeforeUnmount(() => timers.forEach(clearInterval));

function simulate(files: File[]) {
  for (const { name } of files) {
    if (started.has(name)) continue;
    started.add(name);
    let value = 0;
    progress.value = { ...progress.value, [name]: value };
    const timer = window.setInterval(() => {
      value = Math.min(100, value + STEP);
      progress.value = { ...progress.value, [name]: value };
      if (value === 100) clearInterval(timer);
    }, TICK_MS);
    timers.push(timer);
  }
}
</script>

<template>
  <FileDropzone
    multiple
    hint="Add a file to watch it upload"
    :files="uploads"
    :progress="progress"
    @change="simulate"
  />
</template>
