<script setup lang="ts">
import { computed, ref, useId, useTemplateRef } from "vue";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  title: string;
  id?: string;
}>();

const dialogClass =
  "m-auto w-full max-w-lg rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
const panel = "grid gap-4 p-6";
const header = "flex items-start justify-between gap-4";
const titleClass = "text-lg font-semibold text-ink";
const body = "text-sm text-muted";
const footerClass = "flex flex-wrap justify-end gap-2";
const close =
  "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

const generatedId = useId();
const dialogId = computed(() => props.id ?? generatedId);
const dialog = useTemplateRef<HTMLDialogElement>("dialog");
const open = ref(false);

function show() {
  dialog.value?.showModal();
  open.value = true;
}
</script>

<template>
  <div class="contents">
    <div v-if="$slots.trigger" class="contents" @click="show">
      <slot name="trigger" />
    </div>
    <dialog
      :id="dialogId"
      ref="dialog"
      :aria-labelledby="`${dialogId}-title`"
      :data-state="open ? 'open' : 'closed'"
      :class="dialogClass"
      v-bind="$attrs"
      @close="open = false"
      @click.self="dialog?.close()"
    >
      <div :class="panel">
        <div :class="header">
          <h2 :id="`${dialogId}-title`" :class="titleClass">
            {{ props.title }}
          </h2>
          <form method="dialog">
            <button type="submit" :class="close" aria-label="Tutup">
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </form>
        </div>
        <div :class="body"><slot /></div>
        <form v-if="$slots.footer" method="dialog" :class="footerClass">
          <slot name="footer" />
        </form>
      </div>
    </dialog>
  </div>
</template>
