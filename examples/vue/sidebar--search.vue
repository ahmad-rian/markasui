<script setup lang="ts">
import Command from "../../components/command/Command.vue";
import Sidebar from "../../components/sidebar/Sidebar.vue";

const mark = [
  { points: "354,578 1256,138 1171,430 268,868", className: "fill-ink/15" },
  { points: "553,443 1455,3 1370,295 467,733", className: "fill-ink/55" },
  {
    points: "421,762 1325,318 1240,611 336,1050",
    className: "fill-success/35",
  },
  { points: "265,1073 1169,629 1084,922 180,1362", className: "fill-ink/25" },
  { points: "93,965 997,521 912,814 8,1253", className: "fill-ink/75" },
  {
    points: "347,1135 1251,691 1166,984 262,1424",
    className: "fill-success",
  },
];

const commands = [
  { group: "Projects", label: "Website relaunch", value: "website" },
  { group: "Projects", label: "Design system", value: "design-system" },
  { group: "Reports", label: "Weekly summary", value: "weekly" },
  { group: "Actions", label: "Create project", value: "create-project" },
  { group: "Actions", label: "Invite teammate", value: "invite" },
];

const sections = [
  {
    items: [
      {
        label: "Home",
        href: "/",
        icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
      },
      {
        label: "Inbox",
        href: "/inbox",
        icon: "M3 13h5l1.5 3h5l1.5-3h5M5 5h14l2 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z",
        badge: 8,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        label: "Projects",
        icon: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        children: [
          {
            label: "Website relaunch",
            href: "/projects/website",
            active: true,
          },
          { label: "Design system", href: "/projects/design-system" },
          { label: "Mobile app", href: "/projects/mobile" },
        ],
      },
      {
        label: "Reports",
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
        children: [
          { label: "Weekly summary", href: "/reports/weekly" },
          { label: "Revenue", href: "/reports/revenue" },
          { label: "Retention", href: "/reports/retention" },
        ],
      },
      {
        label: "Team",
        icon: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6m13 9v-1a4 4 0 0 0-3-3.9M16 4.1a3 3 0 0 1 0 5.8",
        children: [
          { label: "Members", href: "/team/members" },
          { label: "Invitations", href: "/team/invitations" },
        ],
      },
    ],
  },
  {
    title: "Favorites",
    items: [
      {
        label: "Q4 roadmap",
        href: "/docs/roadmap",
        icon: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z",
      },
    ],
  },
];
</script>

<template>
  <Sidebar
    :sections="sections"
    breakpoint="sm"
    class="h-[560px] rounded-xl border border-line"
  >
    <template #header>
      <svg class="size-7 shrink-0" viewBox="0 0 1464 1430" aria-hidden="true">
        <polygon
          v-for="shape in mark"
          :key="shape.points"
          :points="shape.points"
          :class="shape.className"
        />
      </svg>
      <span class="font-semibold text-ink">MarkasUI</span>
      <Command
        :items="commands"
        placeholder-label="Search projects and actions..."
      >
        <template #trigger>
          <button
            type="button"
            class="ms-auto me-2 flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-line bg-canvas px-2 text-xs text-muted transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
          >
            <svg
              class="size-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span class="sr-only">Search</span>
            <kbd class="font-sans">⌘K</kbd>
          </button>
        </template>
      </Command>
    </template>
    <template #footer>
      <span
        class="grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-ink"
      >
        PK
      </span>
      <span class="grid min-w-0 leading-tight">
        <span class="truncate font-medium text-ink">Putri Kirana</span>
        <span class="truncate text-xs text-muted">Admin</span>
      </span>
    </template>
    <!-- Ctrl+K or Cmd+K opens the same palette from anywhere on the page. -->
    <Command
      hotkey
      :items="commands"
      placeholder-label="Search projects and actions..."
    />
    <div
      class="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center"
    >
      <div class="flex gap-1">
        <kbd
          class="grid size-8 place-items-center rounded-lg border border-line bg-surface font-sans text-sm text-ink"
        >
          ⌘
        </kbd>
        <kbd
          class="grid size-8 place-items-center rounded-lg border border-line bg-surface font-sans text-sm text-ink"
        >
          K
        </kbd>
      </div>
      <p class="text-sm font-medium text-ink">Jump to anything</p>
      <p class="max-w-48 text-xs leading-relaxed text-muted">
        Search projects, reports, and actions without leaving the keyboard.
      </p>
    </div>
  </Sidebar>
</template>
