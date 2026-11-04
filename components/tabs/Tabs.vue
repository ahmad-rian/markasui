<script setup lang="ts">
import { computed, nextTick, useId } from "vue";

export type TabItem = { value: string; label: string };

const props = defineProps<{
  items: TabItem[];
  defaultValue?: string;
  id?: string;
}>();
const model = defineModel<string>();

const root = "w-full";
const list = "inline-flex items-center gap-1 rounded-lg bg-subtle p-1";
const tab =
  "inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=active]:bg-surface data-[state=active]:text-ink motion-reduce:transition-none";
const panel =
  "mt-4 rounded-md text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const generatedId = useId();
const tabsId = computed(() => props.id ?? generatedId);
const active = computed(
  () => model.value ?? props.defaultValue ?? props.items[0]?.value,
);

async function focusTab(value: string) {
  model.value = value;
  await nextTick();
  document.getElementById(`${tabsId.value}-tab-${value}`)?.focus();
}

function onKeydown(event: KeyboardEvent) {
  const keys = props.items.map((item) => item.value);
  const index = keys.indexOf(active.value ?? "");
  const targets: Record<string, string | undefined> = {
    ArrowRight: keys[(index + 1) % keys.length],
    ArrowLeft: keys[(index - 1 + keys.length) % keys.length],
    Home: keys[0],
    End: keys[keys.length - 1],
  };
  const target = targets[event.key];
  if (target === undefined) return;
  event.preventDefault();
  focusTab(target);
}
</script>

<template>
  <div :id="tabsId" :class="root">
    <div
      role="tablist"
      aria-orientation="horizontal"
      :class="list"
      @keydown="onKeydown"
    >
      <button
        v-for="item in props.items"
        :id="`${tabsId}-tab-${item.value}`"
        :key="item.value"
        type="button"
        role="tab"
        :aria-controls="`${tabsId}-panel-${item.value}`"
        :aria-selected="item.value === active ? 'true' : 'false'"
        :tabindex="item.value === active ? 0 : -1"
        :data-state="item.value === active ? 'active' : 'inactive'"
        :class="tab"
        @click="model = item.value"
      >
        {{ item.label }}
      </button>
    </div>
    <div
      v-for="item in props.items"
      :id="`${tabsId}-panel-${item.value}`"
      :key="item.value"
      role="tabpanel"
      :aria-labelledby="`${tabsId}-tab-${item.value}`"
      tabindex="0"
      :data-state="item.value === active ? 'active' : 'inactive'"
      :hidden="item.value !== active"
      :class="panel"
    >
      <slot :name="item.value" />
    </div>
  </div>
</template>
