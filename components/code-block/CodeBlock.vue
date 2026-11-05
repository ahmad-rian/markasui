<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

const props = withDefaults(
  defineProps<{
    code: string;
    title?: string;
    showLineNumbers?: boolean;
    copyLabel?: string;
    copiedLabel?: string;
  }>(),
  {
    title: undefined,
    showLineNumbers: false,
    copyLabel: "Copy code",
    copiedLabel: "Copied",
  },
);

const root = "overflow-hidden rounded-xl border border-line bg-subtle";
const header =
  "flex items-center gap-2 border-b border-line py-1.5 pr-1.5 pl-4";
const titleClass = "min-w-0 truncate text-xs font-medium text-muted";
const copyButton =
  "ml-auto inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted transition-colors duration-150 ease-out hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const icon = "size-4";
const pre =
  "overflow-x-auto p-4 font-mono text-sm leading-6 text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary";
const lineClass = "block min-h-6 whitespace-pre";
const lineNumber =
  "mr-4 inline-block min-w-6 text-right text-muted select-none";

const COPIED_DURATION = 2000;

const lines = computed(() => props.code.replace(/\r?\n$/, "").split(/\r?\n/));
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code);
  } catch {
    copied.value = false;
    return;
  }
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), COPIED_DURATION);
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <div :class="root">
    <div :class="header">
      <span v-if="props.title" :class="titleClass">{{ props.title }}</span>
      <button
        type="button"
        :data-state="copied ? 'copied' : 'idle'"
        :class="copyButton"
        @click="copy"
      >
        <svg
          v-if="copied"
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="icon"
        >
          <path d="m5 12 5 5L20 7" />
        </svg>
        <svg
          v-else
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="icon"
        >
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
        <span aria-live="polite">{{
          copied ? props.copiedLabel : props.copyLabel
        }}</span>
      </button>
    </div>
    <pre
      tabindex="0"
      :class="pre"
    ><code><span v-for="(line, index) in lines" :key="index" :class="lineClass"><span v-if="props.showLineNumbers" aria-hidden="true" :class="lineNumber">{{ index + 1 }}</span>{{ line }}</span></code></pre>
  </div>
</template>
