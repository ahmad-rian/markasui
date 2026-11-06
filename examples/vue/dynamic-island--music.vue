<script setup lang="ts">
import { ref } from "vue";
import DynamicIsland, {
  type DynamicIslandState,
} from "../../components/dynamic-island/DynamicIsland.vue";

const panel = "grid gap-4";
const stage = "h-[220px] rounded-[2rem] border border-line bg-surface pt-3";
const island = "[--island-expanded-height:11rem]";
const controls = "flex justify-center gap-1.5";
const demoButton =
  "h-8 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary motion-reduce:transition-none";
const art = "size-6 rounded-md bg-linear-to-br from-success to-warning";
const bigArt =
  "size-12 shrink-0 rounded-lg bg-linear-to-br from-success to-warning";
const bars = "flex h-4 items-end gap-0.5";
const bar = [
  "h-2 w-0.5 animate-pulse rounded-full bg-success motion-reduce:animate-none",
  "h-4 w-0.5 animate-pulse rounded-full bg-success [animation-delay:200ms] motion-reduce:animate-none",
  "h-3 w-0.5 animate-pulse rounded-full bg-success [animation-delay:400ms] motion-reduce:animate-none",
  "h-2.5 w-0.5 animate-pulse rounded-full bg-success [animation-delay:600ms] motion-reduce:animate-none",
];
const card = "grid h-full content-between";
const head = "flex items-center gap-3";
const song = "min-w-0 flex-1";
const title = "truncate text-sm font-semibold";
const artist = "truncate text-xs text-muted";
const track = "h-1 overflow-hidden rounded-full bg-line";
const fill = "h-full w-2/5 rounded-full bg-ink";
const times = "flex justify-between pt-1 text-[11px] text-muted tabular-nums";
const buttons = "flex items-center justify-center gap-6";
const iconButton =
  "grid size-9 place-items-center rounded-full transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const icon = "size-5";

const media = [
  { label: "Previous", d: "M18 6v12l-9-6zM6 6v12" },
  { label: "Pause", d: "M8 5v14M16 5v14" },
  { label: "Next", d: "M6 6v12l9-6zM18 6v12" },
];
const states: { value: DynamicIslandState; label: string }[] = [
  { value: "idle", label: "Idle" },
  { value: "compact", label: "Compact" },
  { value: "expanded", label: "Expanded" },
];

const state = ref<DynamicIslandState>("expanded");
</script>

<template>
  <div :class="panel">
    <div :class="stage">
      <DynamicIsland :state="state" :class="island" island-label="Now playing">
        <template #leading>
          <span aria-hidden="true" :class="art" />
        </template>
        <template #trailing>
          <span aria-hidden="true" :class="bars">
            <span v-for="c in bar" :key="c" :class="c" />
          </span>
        </template>
        <template #expanded>
          <div :class="card">
            <div :class="head">
              <span aria-hidden="true" :class="bigArt" />
              <div :class="song">
                <p :class="title">Hujan di Kota</p>
                <p :class="artist">Nadia Sukma</p>
              </div>
            </div>
            <div>
              <div :class="track"><div :class="fill" /></div>
              <p :class="times"><span>1:24</span><span>3:34</span></p>
            </div>
            <div :class="buttons">
              <button
                v-for="item in media"
                :key="item.label"
                type="button"
                :aria-label="item.label"
                :class="iconButton"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :class="icon"
                >
                  <path :d="item.d" />
                </svg>
              </button>
            </div>
          </div>
        </template>
      </DynamicIsland>
    </div>
    <div role="group" aria-label="Island state" :class="controls">
      <button
        v-for="item in states"
        :key="item.value"
        type="button"
        :aria-pressed="state === item.value"
        :class="demoButton"
        @click="state = item.value"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>
