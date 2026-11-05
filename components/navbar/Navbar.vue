<script setup lang="ts">
import { computed, ref, useId, useTemplateRef } from "vue";

export type NavbarLink = { label: string; href: string; active?: boolean };

const props = withDefaults(
  defineProps<{
    links?: NavbarLink[];
    id?: string;
    menuLabel?: string;
    navLabel?: string;
    mobileNavLabel?: string;
  }>(),
  {
    links: () => [],
    id: undefined,
    menuLabel: "Menu",
    navLabel: "Main",
    mobileNavLabel: "Main mobile",
  },
);

const root = "@container w-full border-b border-line bg-surface";
const bar = "flex h-14 items-center gap-4 px-4";
const brandClass =
  "flex shrink-0 items-center gap-2 text-sm font-semibold text-ink";
const desktopNav = "hidden items-center gap-1 @2xl:flex";
const link =
  "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=active]:text-ink motion-reduce:transition-none";
const actionsClass = "ml-auto flex items-center gap-2";
const toggle =
  "group inline-flex size-9 shrink-0 items-center justify-center rounded-md text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none @2xl:hidden";
const openIcon = "size-5 group-data-[state=open]:hidden";
const closeIcon = "hidden size-5 group-data-[state=open]:block";
const panel = "border-t border-line px-4 py-2 @2xl:hidden";
const panelList = "grid gap-1";

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?|mailto|tel):/i;

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". */
const safeHref = (href: string) => {
  const cleaned = href.replace(/[\t\n\r]/g, "");
  const start = [...cleaned].findIndex((char) => char > " ");
  const value = cleaned.slice(Math.max(start, 0));
  return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
};

const generatedId = useId();
const navbarId = computed(() => props.id ?? generatedId);
const menuId = computed(() => `${navbarId.value}-menu`);
const open = ref(false);
const toggleButton = useTemplateRef<HTMLButtonElement>("toggleButton");

function onEscape() {
  if (!open.value) return;
  open.value = false;
  toggleButton.value?.focus();
}
</script>

<template>
  <header :id="navbarId" :class="root" @keydown.escape="onEscape">
    <div :class="bar">
      <div v-if="$slots.brand" :class="brandClass"><slot name="brand" /></div>
      <nav :aria-label="props.navLabel" :class="desktopNav">
        <a
          v-for="(item, index) in props.links"
          :key="index"
          :href="safeHref(item.href)"
          :aria-current="item.active ? 'page' : undefined"
          :data-state="item.active ? 'active' : 'inactive'"
          :class="link"
          >{{ item.label }}</a
        >
      </nav>
      <div :class="actionsClass">
        <slot name="actions" />
        <button
          ref="toggleButton"
          type="button"
          :aria-label="props.menuLabel"
          :aria-expanded="open ? 'true' : 'false'"
          :aria-controls="menuId"
          :data-state="open ? 'open' : 'closed'"
          :class="toggle"
          @click="open = !open"
        >
          <svg
            :class="openIcon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            :class="closeIcon"
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
      </div>
    </div>
    <div
      :id="menuId"
      :data-state="open ? 'open' : 'closed'"
      :hidden="!open"
      :class="panel"
    >
      <nav :aria-label="props.mobileNavLabel" :class="panelList">
        <a
          v-for="(item, index) in props.links"
          :key="index"
          :href="safeHref(item.href)"
          :aria-current="item.active ? 'page' : undefined"
          :data-state="item.active ? 'active' : 'inactive'"
          :class="link"
          >{{ item.label }}</a
        >
      </nav>
    </div>
  </header>
</template>
