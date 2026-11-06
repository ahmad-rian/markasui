<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

export type ChatMessageFeedback = "like" | "dislike" | null;

const props = withDefaults(
  defineProps<{
    from?: "user" | "assistant";
    text?: string;
    /** Assistant messages: plain text or a soft bubble. */
    variant?: "plain" | "bubble";
    time?: string;
    /** Image URL for the assistant avatar. Defaults to a spark icon. */
    avatar?: string;
    /** Shows three dots instead of the text. */
    typing?: boolean;
    /** Reveals the text token by token with a caret. Off with reduced motion. */
    stream?: boolean;
    /** Pause between streamed tokens, in ms. */
    streamSpeed?: number;
    /** Shows copy, and for the assistant like, dislike, and regenerate. */
    actions?: boolean;
    userLabel?: string;
    assistantLabel?: string;
    typingLabel?: string;
    actionsLabel?: string;
    copyLabel?: string;
    copiedLabel?: string;
    likeLabel?: string;
    dislikeLabel?: string;
    regenerateLabel?: string;
  }>(),
  {
    from: "assistant",
    text: "",
    variant: "plain",
    time: undefined,
    avatar: undefined,
    typing: false,
    stream: false,
    streamSpeed: 40,
    actions: true,
    userLabel: "You",
    assistantLabel: "Assistant",
    typingLabel: "Typing",
    actionsLabel: "Message actions",
    copyLabel: "Copy",
    copiedLabel: "Copied",
    likeLabel: "Good response",
    dislikeLabel: "Bad response",
    regenerateLabel: "Regenerate",
  },
);
const emit = defineEmits<{
  feedback: [value: ChatMessageFeedback];
  regenerate: [];
}>();

const roots = {
  user: "group/message flex flex-col items-end gap-1",
  assistant: "group/message flex items-start gap-3",
};
const avatarClass =
  "grid size-8 shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-surface text-ink";
const avatarImage = "size-full object-cover";
const avatarIcon = "size-4";
const bodies = {
  user: "flex w-full flex-col items-end gap-1",
  assistant: "grid min-w-0 flex-1 justify-items-start gap-1",
};
const header = "flex items-baseline gap-2 text-sm font-medium text-ink";
const contents = {
  user: "max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm leading-6 break-words whitespace-pre-line text-on-primary",
  plain: "text-sm leading-6 break-words whitespace-pre-line text-ink",
  bubble:
    "rounded-2xl rounded-tl-md bg-subtle px-4 py-2.5 text-sm leading-6 break-words whitespace-pre-line text-ink",
};
const timeClass = "text-xs font-normal text-muted";
const footer = "flex min-h-7 items-center gap-1";
const actionsClass =
  "flex items-center gap-0.5 opacity-0 transition-opacity duration-150 ease-out group-focus-within/message:opacity-100 group-hover/message:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100";
const action =
  "group/action grid size-7 place-items-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:text-ink motion-reduce:transition-none";
const actionIcon = "col-start-1 row-start-1 size-4";
const pressIcon = "size-4 group-aria-pressed/action:fill-current/20";
const copyIcon =
  "col-start-1 row-start-1 size-4 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]/action:scale-50 group-data-[state=copied]/action:opacity-0 motion-reduce:transition-none";
const checkIcon =
  "col-start-1 row-start-1 size-4 scale-50 opacity-0 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]/action:scale-100 group-data-[state=copied]/action:opacity-100 motion-reduce:transition-none";
const dots = "inline-flex h-6 items-center gap-1";
const dot = [
  "size-1.5 animate-pulse rounded-full bg-muted motion-reduce:animate-none",
  "size-1.5 animate-pulse rounded-full bg-muted [animation-delay:150ms] motion-reduce:animate-none",
  "size-1.5 animate-pulse rounded-full bg-muted [animation-delay:300ms] motion-reduce:animate-none",
];
const caret =
  "ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse rounded-xs bg-current motion-reduce:animate-none";
const srOnly = "sr-only";

const PATHS = {
  spark:
    "M12 3c.4 4.6 2.4 6.6 7 7-4.6.4-6.6 2.4-7 7-.4-4.6-2.4-6.6-7-7 4.6-.4 6.6-2.4 7-7zM19 16c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5z",
  copy: "M9 9h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1",
  check: "m4 12 5 5L20 6",
  like: "M7 10v11M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 8a2 2 0 0 1-1.9 1.4H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.8a2 2 0 0 0 1.8-1.1L12 2a3.1 3.1 0 0 1 3 3.9z",
  dislike:
    "M17 14V3M9 18.1 10 14H4.2a2 2 0 0 1-1.9-2.6l2.3-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.8a2 2 0 0 0-1.8 1.1L12 22a3.1 3.1 0 0 1-3-3.9z",
  regenerate:
    "M3 12a9 9 0 0 1 15.7-6L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.7 6L3 16M8 16H3v5",
};

/** How long the check mark stays after copying. */
const COPIED_MS = 2000;

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Words and the spaces between them, so streaming reveals one token at a time. */
const tokens = computed(() => props.text.split(/(\s+)/).filter(Boolean));
const shown = ref(Infinity);
const copied = ref(false);
const feedback = ref<ChatMessageFeedback>(null);
const assistant = computed(() => props.from === "assistant");
const streaming = computed(
  () => props.stream && shown.value < tokens.value.length,
);
let timer: ReturnType<typeof setTimeout> | undefined;
let tick: ReturnType<typeof setTimeout> | undefined;

onMounted(() => {
  if (props.stream && !reducedMotion()) shown.value = 0;
});
watch(
  [streaming, shown],
  () => {
    clearTimeout(tick);
    if (streaming.value)
      tick = setTimeout(() => shown.value++, props.streamSpeed);
  },
  { flush: "post" },
);
onBeforeUnmount(() => {
  clearTimeout(timer);
  clearTimeout(tick);
});

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text);
  } catch {
    // Clipboard blocked or unavailable: no check mark.
    return;
  }
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), COPIED_MS);
}
function rate(value: "like" | "dislike") {
  feedback.value = feedback.value === value ? null : value;
  emit("feedback", feedback.value);
}
</script>

<template>
  <article
    :data-from="props.from"
    :aria-label="assistant ? props.assistantLabel : props.userLabel"
    :class="roots[props.from]"
  >
    <span v-if="assistant" aria-hidden="true" :class="avatarClass">
      <img
        v-if="props.avatar"
        :src="props.avatar"
        alt=""
        :class="avatarImage"
      />
      <svg
        v-else
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="avatarIcon"
      >
        <path :d="PATHS.spark" />
      </svg>
    </span>
    <div :class="bodies[props.from]">
      <p v-if="assistant" :class="header">
        {{ props.assistantLabel
        }}<time v-if="props.time" :class="timeClass">{{ props.time }}</time>
      </p>
      <div :class="contents[assistant ? props.variant : 'user']">
        <span v-if="props.typing" role="status" :class="dots"
          ><span :class="srOnly">{{ props.typingLabel }}</span
          ><span v-for="c in dot" :key="c" aria-hidden="true" :class="c"
        /></span>
        <template v-else-if="props.stream"
          ><span :class="srOnly">{{ props.text }}</span
          ><span aria-hidden="true">{{ tokens.slice(0, shown).join("") }}</span
          ><span v-if="streaming" aria-hidden="true" :class="caret"
        /></template>
        <template v-else>{{ props.text }}</template>
      </div>
      <div :class="footer">
        <div
          v-if="props.actions && !props.typing && !streaming"
          role="group"
          :aria-label="props.actionsLabel"
          :class="actionsClass"
        >
          <button
            type="button"
            :aria-label="props.copyLabel"
            :data-state="copied ? 'copied' : 'idle'"
            :class="action"
            @click="copy"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="copyIcon"
            >
              <path :d="PATHS.copy" />
            </svg>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="checkIcon"
            >
              <path :d="PATHS.check" />
            </svg>
          </button>
          <template v-if="assistant">
            <button
              v-for="value in ['like', 'dislike'] as const"
              :key="value"
              type="button"
              :aria-label="
                value === 'like' ? props.likeLabel : props.dislikeLabel
              "
              :aria-pressed="feedback === value"
              :class="action"
              @click="rate(value)"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                :class="pressIcon"
              >
                <path :d="PATHS[value]" />
              </svg>
            </button>
            <button
              type="button"
              :aria-label="props.regenerateLabel"
              :class="action"
              @click="emit('regenerate')"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                :class="actionIcon"
              >
                <path :d="PATHS.regenerate" />
              </svg>
            </button>
          </template>
          <span role="status" :class="srOnly">{{
            copied ? props.copiedLabel : ""
          }}</span>
        </div>
        <time v-if="!assistant && props.time" :class="timeClass">{{
          props.time
        }}</time>
      </div>
    </div>
  </article>
</template>
