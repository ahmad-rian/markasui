<script setup lang="ts">
import { ref, useId } from "vue";

export type DropzoneFile = {
  name: string;
  /** Size in bytes. */
  size: number;
  type?: string;
  /** Upload progress 0 to 100. Leave out to hide the bar. */
  progress?: number;
  error?: string;
};
type Item = DropzoneFile & { key: number; file?: File };

const props = withDefaults(
  defineProps<{
    name?: string;
    accept?: string;
    multiple?: boolean;
    /** Largest file in bytes. */
    maxSize?: number;
    /** Most files kept when multiple is on. */
    maxFiles?: number;
    disabled?: boolean;
    required?: boolean;
    id?: string;
    /** Files already in the list, such as earlier uploads. They are shown, not submitted. */
    files?: DropzoneFile[];
    /** Live upload progress by file name, 0 to 100. */
    progress?: Record<string, number>;
    hint?: string;
    dropLabel?: string;
    browseLabel?: string;
    removeLabel?: string;
    tooLargeLabel?: string;
    typeLabel?: string;
    tooManyLabel?: string;
  }>(),
  {
    files: () => [],
    progress: () => ({}),
    dropLabel: "Drop files here or",
    browseLabel: "browse",
    removeLabel: "Remove {name}",
    tooLargeLabel: "Larger than {size}",
    typeLabel: "File type not allowed",
    tooManyLabel: "Only {max} files allowed",
  },
);
const emit = defineEmits<{ change: [files: File[]] }>();

const root = "grid gap-3";
const zone =
  "group/zone grid cursor-pointer justify-items-center gap-2 rounded-xl border-2 border-dashed border-line bg-surface px-6 py-8 text-center transition duration-200 ease-out hover:border-primary-line hover:bg-subtle has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary has-[:disabled]:opacity-50 data-[state=over]:border-primary data-[state=over]:bg-primary-soft data-[state=over]:ring-4 data-[state=over]:ring-primary/10 motion-reduce:transition-none";
const badge =
  "size-11 rounded-full bg-subtle p-3 text-ink transition duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[state=over]/zone:-translate-y-1.5 group-data-[state=over]/zone:scale-110 group-data-[state=over]/zone:bg-surface motion-reduce:transition-none";
const titleClass = "text-sm text-ink";
const browseClass = "font-medium underline underline-offset-4";
const hintClass = "text-xs text-muted";
const srOnly = "sr-only";
const list = "grid gap-2";
const item =
  "group/item flex items-center gap-3 rounded-lg border border-line bg-surface p-3 data-[state=error]:border-danger/40 data-[state=error]:bg-danger/5";
const fileIcon =
  "size-9 shrink-0 rounded-md bg-subtle p-2 text-ink group-data-[state=error]/item:bg-danger/10 group-data-[state=error]/item:text-danger";
const body = "grid min-w-0 flex-1 gap-1.5";
const row = "flex items-baseline justify-between gap-3 text-sm";
const nameClass = "truncate font-medium text-ink";
const sizeClass = "shrink-0 text-xs text-muted tabular-nums";
const errorClass = "text-xs text-danger";
const track = "h-1.5 overflow-hidden rounded-full bg-subtle";
const bar =
  "h-full rounded-full transition-[width] duration-300 ease-out motion-reduce:transition-none";
const bars = { busy: "bg-primary", done: "bg-success" };
const remove =
  "size-8 shrink-0 rounded-md p-2 text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const smallIcon = "size-4";
const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
} as const;

/** 24px stroked icons: the drop prompt, remove, and one per file kind. */
const UPLOAD = "M12 16V4M7 9l5-5 5 5M4 16v4h16v-4";
const REMOVE = "M6 6l12 12M18 6 6 18";
const FILE = "M14 3H5v18h14V8zM14 3v5h5M9 13h6M9 17h4";
const KINDS: Record<string, string> = {
  image: "M4 4h16v16H4zM4 16l5-5 4 4 3-3 4 4M15 8h.01",
  video: "M3 6h13v12H3zM16 10l5-3v10l-5-3",
  audio:
    "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
};

const fill = (template: string, value: string | number) =>
  template.replace(/\{\w+\}/, () => String(value));

/** 1536 -> "2 KB", 2400000 -> "2.3 MB". */
function formatSize(bytes: number) {
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < 3) {
    value /= 1024;
    unit++;
  }
  return `${unit < 2 ? Math.round(value) : Number(value.toFixed(1))} ${["B", "KB", "MB", "GB"][unit]}`;
}

/** Same rules as the accept attribute: .ext, type/*, or an exact MIME type. */
function accepts(file: { name: string; type?: string }, accept = "") {
  const type = (file.type ?? "").toLowerCase();
  return (
    !accept ||
    accept.split(",").some((raw) => {
      const rule = raw.trim().toLowerCase();
      if (rule.startsWith(".")) return file.name.toLowerCase().endsWith(rule);
      if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1));
      return type === rule;
    })
  );
}

const iconOf = ({ type = "" }: DropzoneFile) =>
  KINDS[type.split("/")[0]!] ?? FILE;

const generatedId = useId();
const input = ref<HTMLInputElement>();
let seq = props.files.length;
const items = ref<Item[]>(props.files.map((file, key) => ({ ...file, key })));
const over = ref(false);

const percentOf = (file: Item) => props.progress[file.name] ?? file.progress;

/** Keep the native input's files equal to the valid picked files, so a form posts them. */
function update(next: Item[]) {
  items.value = next;
  const picked = next.flatMap((i) => (i.file && !i.error ? [i.file] : []));
  if (input.value) {
    const transfer = new DataTransfer();
    picked.forEach((file) => transfer.items.add(file));
    input.value.files = transfer.files;
  }
  emit("change", picked);
}

function add(incoming: File[]) {
  const limit = props.multiple ? (props.maxFiles ?? Infinity) : 1;
  const kept = props.multiple ? items.value : [];
  let count = kept.filter((i) => !i.error).length;
  const added = incoming.map((file) => {
    const error = !accepts(file, props.accept)
      ? props.typeLabel
      : props.maxSize !== undefined && file.size > props.maxSize
        ? fill(props.tooLargeLabel, formatSize(props.maxSize))
        : count >= limit
          ? fill(props.tooManyLabel, limit)
          : undefined;
    if (!error) count++;
    const { name, size, type } = file;
    return { key: seq++, name, size, type, file, error };
  });
  update([...kept, ...added]);
}

function leave(event: DragEvent) {
  const zoneEl = event.currentTarget as HTMLElement;
  if (!zoneEl.contains(event.relatedTarget as Node | null)) over.value = false;
}
function drop(event: DragEvent) {
  over.value = false;
  if (!props.disabled) add([...(event.dataTransfer?.files ?? [])]);
}
</script>

<template>
  <div :class="root">
    <label
      :data-state="over ? 'over' : 'idle'"
      :class="zone"
      @dragenter.prevent="over = !props.disabled"
      @dragover.prevent="over = !props.disabled"
      @dragleave="leave"
      @drop.prevent="drop"
    >
      <input
        :id="props.id ?? generatedId"
        ref="input"
        type="file"
        :name="props.name"
        :accept="props.accept"
        :multiple="props.multiple"
        :disabled="props.disabled"
        :required="props.required"
        :class="srOnly"
        @change="add([...(($event.target as HTMLInputElement).files ?? [])])"
      />
      <svg :class="badge" v-bind="svg">
        <path :d="UPLOAD" />
      </svg>
      <span :class="titleClass"
        >{{ props.dropLabel }}
        <span :class="browseClass">{{ props.browseLabel }}</span></span
      >
      <span v-if="props.hint" :class="hintClass">{{ props.hint }}</span>
    </label>
    <ul v-if="items.length > 0" :class="list">
      <li
        v-for="file in items"
        :key="file.key"
        :data-state="file.error ? 'error' : 'ok'"
        :class="item"
      >
        <svg :class="fileIcon" v-bind="svg">
          <path :d="iconOf(file)" />
        </svg>
        <div :class="body">
          <div :class="row">
            <span :class="nameClass">{{ file.name }}</span>
            <span :class="sizeClass">{{ formatSize(file.size) }}</span>
          </div>
          <p v-if="file.error" role="alert" :class="errorClass">
            {{ file.error }}
          </p>
          <div
            v-else-if="percentOf(file) !== undefined"
            role="progressbar"
            :aria-valuenow="percentOf(file)"
            :aria-label="file.name"
            :class="track"
          >
            <div
              :class="[bar, bars[percentOf(file)! < 100 ? 'busy' : 'done']]"
              :style="{ width: `${percentOf(file)}%` }"
            ></div>
          </div>
        </div>
        <button
          type="button"
          :aria-label="fill(props.removeLabel, file.name)"
          :class="remove"
          @click="update(items.filter((i) => i !== file))"
        >
          <svg :class="smallIcon" v-bind="svg">
            <path :d="REMOVE" />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>
