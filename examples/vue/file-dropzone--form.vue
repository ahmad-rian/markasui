<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import FileDropzone from "../../components/file-dropzone/FileDropzone.vue";
import Input from "../../components/input/Input.vue";

const form = "grid gap-4";
const field = "grid gap-1.5";
const label = "text-sm font-medium text-ink";
const footer = "flex justify-end";

const attached = [
  {
    name: "campaign-brief.docx",
    size: 88064,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
];
</script>

<template>
  <form action="#" :class="form">
    <Input name="project" label="Project name" placeholder="Spring launch" />
    <div :class="field">
      <p :class="label">Attachments</p>
      <FileDropzone
        name="attachments[]"
        accept=".pdf,.docx,.zip"
        multiple
        :max-files="5"
        :max-size="10485760"
        hint="PDF, DOCX, or ZIP, up to 10 MB each"
        :files="attached"
      />
    </div>
    <div :class="footer">
      <Button type="submit">Send request</Button>
    </div>
  </form>
</template>
