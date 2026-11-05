<script setup lang="ts">
import { computed, ref, useId, useTemplateRef } from "vue";

defineOptions({ inheritAttrs: false });

type Variant = "default" | "danger";

const props = withDefaults(
  defineProps<{
    title: string;
    variant?: Variant;
    id?: string;
    cancelLabel?: string;
    actionLabel?: string;
  }>(),
  {
    variant: "default",
    id: undefined,
    cancelLabel: "Cancel",
    actionLabel: "Continue",
  },
);
const emit = defineEmits<{ action: []; cancel: [] }>();

const dialogClass =
  "m-auto w-full max-w-md rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
const panel = "grid gap-4 p-6";
const titleClass = "text-lg font-semibold text-ink";
const body = "text-sm text-muted";
const footerClass = "flex flex-wrap justify-end gap-2";
const button =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const cancelClass = "border border-line bg-surface text-ink hover:bg-subtle";
const actionTones: Record<Variant, string> = {
  default: "bg-primary text-on-primary hover:bg-primary-strong",
  danger: "bg-danger text-on-primary hover:bg-danger/90",
};

const ACTION = "action";
const CANCEL = "cancel";

const generatedId = useId();
const dialogId = computed(() => props.id ?? generatedId);
const dialog = useTemplateRef<HTMLDialogElement>("dialog");
const cancelButton = useTemplateRef<HTMLButtonElement>("cancelButton");
const open = ref(false);
const actionClass = computed(
  () => actionTones[props.variant] ?? actionTones.default,
);

function show() {
  if (!dialog.value) return;
  dialog.value.returnValue = "";
  dialog.value.showModal();
  open.value = true;
  cancelButton.value?.focus();
}

// Selain tombol aksi (tombol batal, Escape, close() dari kode) dihitung batal.
function onClose() {
  open.value = false;
  if (!dialog.value) return;
  if (dialog.value.returnValue === ACTION) return emit("action");
  dialog.value.returnValue = CANCEL;
  emit("cancel");
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
      role="alertdialog"
      :aria-labelledby="`${dialogId}-title`"
      :aria-describedby="`${dialogId}-description`"
      :data-state="open ? 'open' : 'closed'"
      :class="dialogClass"
      v-bind="$attrs"
      @close="onClose"
    >
      <div :class="panel">
        <h2 :id="`${dialogId}-title`" :class="titleClass">
          {{ props.title }}
        </h2>
        <div :id="`${dialogId}-description`" :class="body"><slot /></div>
        <form method="dialog" :class="footerClass">
          <button
            ref="cancelButton"
            type="submit"
            :value="CANCEL"
            :class="[button, cancelClass]"
          >
            {{ props.cancelLabel }}
          </button>
          <button type="submit" :value="ACTION" :class="[button, actionClass]">
            {{ props.actionLabel }}
          </button>
        </form>
      </div>
    </dialog>
  </div>
</template>
