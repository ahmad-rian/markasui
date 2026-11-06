<script setup lang="ts">
import { ref } from "vue";
import DynamicIsland, {
  type DynamicIslandState,
} from "../../components/dynamic-island/DynamicIsland.vue";

const panel = "grid gap-4";
const stage = "h-[190px] rounded-[2rem] border border-line bg-surface pt-3";
const controls = "flex justify-center gap-1.5";
const demoButton =
  "h-8 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary motion-reduce:transition-none";
const check = "size-4 text-success";
const amount = "text-success tabular-nums";
const card = "grid h-full content-between";
const label = "flex items-center gap-1.5 text-xs text-success";
const big = "pt-1 text-2xl leading-tight font-semibold tabular-nums";
const from = "text-xs text-muted";
const view =
  "h-9 w-full rounded-full bg-subtle text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

const CHECK = "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12l3 3 5-6";
const states: { value: DynamicIslandState; label: string }[] = [
  { value: "idle", label: "Idle" },
  { value: "compact", label: "Compact" },
  { value: "expanded", label: "Expanded" },
];

const state = ref<DynamicIslandState>("compact");
</script>

<template>
  <div :class="panel">
    <div :class="stage">
      <DynamicIsland
        :state="state"
        :announcements="{
          compact: 'Payment received, Rp 2.500.000',
          expanded:
            'Payment received, Rp 2.500.000 from PT Sinar Jaya for invoice INV-2041',
        }"
      >
        <template #leading>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="check"
          >
            <path :d="CHECK" />
          </svg>
        </template>
        <template #trailing>
          <span :class="amount">+Rp2,5jt</span>
        </template>
        <template #expanded>
          <div :class="card">
            <div>
              <p :class="label">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :class="check"
                >
                  <path :d="CHECK" /></svg
                >Payment received
              </p>
              <p :class="big">Rp 2.500.000</p>
              <p :class="from">PT Sinar Jaya, invoice INV-2041</p>
            </div>
            <button type="button" :class="view">View invoice</button>
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
