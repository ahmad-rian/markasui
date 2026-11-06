<script setup lang="ts">
import PromptInput from "../../components/prompt-input/PromptInput.vue";

const card = "grid gap-3 rounded-xl border border-line bg-surface p-4";
const head = "flex items-center gap-3";
const avatar =
  "grid size-9 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-ink";
const name = "text-sm font-semibold text-ink";
const meta = "text-xs text-muted";
const quote = "rounded-lg bg-subtle px-3 py-2 text-sm text-ink";
</script>

<template>
  <div :class="card">
    <div :class="head">
      <span aria-hidden="true" :class="avatar">RS</span>
      <div>
        <p :class="name">Rina Santoso</p>
        <p :class="meta">Asked about order #INV-2041</p>
      </div>
    </div>
    <p :class="quote">Can I pay the balance by bank transfer?</p>
    <PromptInput
      :attachments="false"
      :max-height="120"
      placeholder-label="Reply to Rina"
      input-label="Reply"
    />
  </div>
</template>
