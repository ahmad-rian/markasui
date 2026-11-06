<script setup lang="ts">
import FileDropzone from "../../components/file-dropzone/FileDropzone.vue";

const section = "grid gap-3";
const title = "text-sm font-medium text-ink";
const text = "text-sm text-muted";

const current = [
  {
    name: "rania-portrait.png",
    size: 482304,
    type: "image/png",
    progress: 100,
  },
];
</script>

<template>
  <div :class="section">
    <div>
      <p :class="title">Profile photo</p>
      <p :class="text">Shown on your profile and next to your comments.</p>
    </div>
    <FileDropzone
      name="avatar"
      accept="image/png,image/jpeg"
      :max-size="2097152"
      hint="Square PNG or JPG, up to 2 MB"
      drop-label="Drop a photo here or"
      browse-label="choose one"
      :files="current"
    />
  </div>
</template>
