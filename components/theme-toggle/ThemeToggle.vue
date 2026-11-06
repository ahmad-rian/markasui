<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
  useId,
  useTemplateRef,
  watch,
  watchEffect,
} from "vue";

const variants = {
  ghost: "text-ink hover:bg-subtle",
  outline: "border border-line bg-surface text-ink hover:bg-subtle",
  solid: "bg-primary text-on-primary hover:bg-primary-strong",
};
/** Per size: icon-only button, button with text, icon. */
const sizes = {
  sm: ["size-8 rounded-md", "h-8 rounded-md px-3 text-sm", "size-4"],
  md: ["size-10 rounded-lg", "h-10 rounded-lg px-4 text-sm", "size-5"],
  lg: ["size-12 rounded-lg", "h-12 rounded-lg px-6 text-base", "size-6"],
};
/** Parts scale and rotate around the icon center. */
const icon = "**:origin-[12px_12px]";
/** Moon and stars start hidden (the light look); the keyframes show them. */
const hidden = "opacity-0";
const moonPath = "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z";
const starPaths = ["M18 2v4m-2-2h4", "M21.5 9h0", "M14.5 1.5h0"];
const srOnly = "sr-only";

/**
 * Keyframes from light to dark; dark to light plays them in reverse. Every part that
 * differs between the themes is animated, and the last frame stays (fill both).
 * Each entry: "selector inside the button|property:value,value;property:...|stagger ms".
 */
const turn = "perspective(60px) rotateY(";
const moves = {
  rotate: [
    "g|rotate:0deg,1turn;scale:1,1.15,0;opacity:1,1,0",
    "g>path|scale:1,1.6,1.6,0",
    "svg>:nth-child(3)|rotate:-1turn,-1turn,0deg;scale:0,0,1;opacity:0,0,1",
  ],
  morph: [
    "g>circle|scale:1,1.6",
    "mask>circle|translate:24px -12px,15.5px -3.5px",
    "g>path|scale:1,0;opacity:1,0|50",
  ],
  flip: [
    `svg|transform:${turn}0),${turn}90deg),${turn}-90deg),${turn}0);translate:0,0 -6px,0 -6px,0;offset:0,.5,.5,1`,
    "g|opacity:1,1,0,0;offset:0,.5,.5,1",
    "svg>:nth-child(3)|opacity:0,0,1,1;offset:0,.5,.5,1",
  ],
  slide: [
    "g|translate:0,0 24px",
    "svg>:nth-child(3)|translate:0 -24px,0 -24px,0,0 4px,0;opacity:1,1",
  ],
  eclipse: [
    "mask>circle|translate:-6px 0,13.5px -1.5px",
    "g>path|scale:1,1.7,.75;opacity:1,.3,.4",
  ],
  spring: [
    "svg|scale:1,.6,1.15,.95,1",
    "g|opacity:1,1,0,0",
    "svg>:nth-child(3)|opacity:0,0,1,1",
    "svg>path~path|scale:0,1.5,.7,1;opacity:0,1,.3,1|120",
  ],
};
const DURATION = 650;
/** Indexed by toDark + 2 for a demo, which plays there and back. */
const directions = [
  "reverse",
  "normal",
  "alternate-reverse",
  "alternate",
] as const;
const SET = 0;
const SWITCH = 1;
const DEMO = 2;

type Theme = "light" | "dark";

const props = withDefaults(
  defineProps<{
    animation?: keyof typeof moves;
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    /** Controlled theme. Leave empty to read localStorage and the system setting. */
    theme?: Theme;
    storageKey?: string;
    /** Show the label as visible text next to the icon. */
    showText?: boolean;
    lightLabel?: string;
    darkLabel?: string;
  }>(),
  {
    animation: "rotate",
    variant: "ghost",
    size: "md",
    theme: undefined,
    storageKey: "markas-theme",
    showText: false,
    lightLabel: "Switch to light theme",
    darkLabel: "Switch to dark theme",
  },
);
const emit = defineEmits<{ change: [theme: Theme] }>();

const base =
  "group inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50";

const maskId = `mask${useId()}`;
const buttonRef = useTemplateRef<HTMLButtonElement>("buttonRef");
const state = ref<Theme>();
/** The theme a click asked for: reaching it animates, any other change jumps. */
let requested: Theme | undefined;
let observer: MutationObserver | undefined;

const html = () => document.documentElement;
const pageTheme = (): Theme =>
  html().classList.contains("dark") ? "dark" : "light";
const setDark = (theme: Theme) =>
  html().classList.toggle("dark", theme === "dark");

/** SET jumps to the theme's look, SWITCH animates to it, DEMO plays there and back. */
function play(
  button: HTMLElement,
  animation: keyof typeof moves,
  toDark: boolean,
  mode: number,
) {
  const still =
    mode === SET ||
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  for (const move of moves[animation]) {
    const [selector = "", frames = "", stagger = 0] = move.split("|");
    const keyframes = Object.fromEntries(
      frames.split(";").map((frame) => {
        const [property, values = ""] = frame.split(":");
        return [property, values.split(",")];
      }),
    ) as Parameters<HTMLElement["animate"]>[0];
    button.querySelectorAll(selector).forEach((part, i) =>
      part.animate(keyframes, {
        duration: still ? 0 : +stagger ? DURATION / 2 : DURATION,
        delay: still ? 0 : i * +stagger,
        fill: "both",
        iterations: mode === DEMO ? 2 : 1,
        direction: directions[+toDark + (mode === DEMO ? 2 : 0)],
      }),
    );
  }
}

// "Play all" demos: document.dispatchEvent(new Event("markas-theme-demo")).
const demo = () =>
  buttonRef.value &&
  play(buttonRef.value, props.animation, pageTheme() !== "dark", DEMO);

onMounted(() => {
  // Now and on controlled changes: put the page on the wanted theme. The parent saves a controlled theme.
  // Saved choice first, then a dark class the page already set, then the system setting.
  watchEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(props.storageKey);
    } catch {
      // Storage blocked: fall back to the page and the system setting.
    }
    const target: Theme =
      props.theme ??
      (saved === "light" || saved === "dark"
        ? saved
        : pageTheme() === "dark" ||
            window.matchMedia?.("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
    if (target !== pageTheme()) setDark(target);
    state.value = pageTheme();
  });
  // Follow the html class, so every toggle on the page and outside changes stay in sync.
  observer = new MutationObserver(() => (state.value = pageTheme()));
  observer.observe(html(), { attributeFilter: ["class"] });
  document.addEventListener("markas-theme-demo", demo);
});
onBeforeUnmount(() => {
  observer?.disconnect();
  document.removeEventListener("markas-theme-demo", demo);
});

// Show the theme on the icon: animated after a click, a jump on load or a change made elsewhere.
watch(state, (theme) => {
  if (!theme || !buttonRef.value) return;
  const mode = theme === requested ? SWITCH : SET;
  requested = undefined;
  play(buttonRef.value, props.animation, theme === "dark", mode);
});

function toggle() {
  const next = pageTheme() === "dark" ? "light" : "dark";
  requested = next;
  if (props.theme === undefined) {
    setDark(next);
    try {
      localStorage.setItem(props.storageKey, next);
    } catch {
      // Storage blocked: the theme still applies until the page closes.
    }
    document.dispatchEvent(
      new CustomEvent("markas-theme-change", { detail: next }),
    );
  }
  emit("change", next);
}
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    :data-state="state"
    :class="[base, variants[props.variant], sizes[props.size][+props.showText]]"
    @click="toggle"
  >
    <svg
      :class="[sizes[props.size][2], icon]"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <mask :id="maskId">
        <rect width="24" height="24" fill="white" />
        <circle cy="12" r="5" fill="black" />
      </mask>
      <g>
        <circle
          cx="12"
          cy="12"
          r="4.5"
          stroke="none"
          :mask="`url(#${maskId})`"
        />
        <path
          v-for="ray in 8"
          :key="ray"
          :style="{ rotate: `${ray * 45}deg` }"
          d="M12 2v2"
        />
      </g>
      <path :class="hidden" :d="moonPath" />
      <path v-for="d in starPaths" :key="d" :class="hidden" :d="d" />
    </svg>
    <span :class="props.showText ? undefined : srOnly">{{
      state === "dark" ? props.lightLabel : props.darkLabel
    }}</span>
  </button>
</template>
