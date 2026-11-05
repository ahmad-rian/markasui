<script setup lang="ts">
import { computed, h, ref, type FunctionalComponent } from "vue";
import Avatar from "../../../components/avatar/Avatar.vue";
import Badge from "../../../components/badge/Badge.vue";
import Button from "../../../components/button/Button.vue";
import Card from "../../../components/card/Card.vue";
import Drawer from "../../../components/drawer/Drawer.vue";
import DropdownMenu from "../../../components/dropdown-menu/DropdownMenu.vue";
import Input from "../../../components/input/Input.vue";
import Tabs from "../../../components/tabs/Tabs.vue";
import Toaster, { toast } from "../../../components/toast/Toast.vue";
import Tooltip from "../../../components/tooltip/Tooltip.vue";

const icons = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  calendar:
    "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2",
  chart: "M3 3v18h18M8 17v-5M13 17V8M18 17v-3",
  folder:
    "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z",
  sliders:
    "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M22 6l-10 7L2 6",
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92",
  chat: "M7.9 20A9 9 0 1 0 4 16.1L2 22z",
  clock: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20",
  back: "M19 12H5M12 19l-7-7 7-7",
  prev: "m15 18-6-6 6-6",
  next: "m9 18 6-6-6-6",
  dots: "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
  pencil: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z",
  menu: "M4 6h16M4 12h16M4 18h16",
  plus: "M12 5v14M5 12h14",
};
type IconName = keyof typeof icons;

const Icon: FunctionalComponent<{ name: IconName }> = (props) =>
  h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true",
    },
    [h("path", { d: icons[props.name] })],
  );
Icon.props = ["name"];

const topNav = [
  { id: "deals", label: "Deals" },
  { id: "customers", label: "Customers" },
  { id: "finance", label: "Finance" },
  { id: "growth", label: "Growth" },
  { id: "projects", label: "Projects" },
];

const railNav: { id: string; label: string; icon: IconName }[] = [
  { id: "overview", label: "Overview", icon: "home" },
  { id: "contacts", label: "Contacts", icon: "users" },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "reports", label: "Reports", icon: "chart" },
  { id: "documents", label: "Documents", icon: "folder" },
  { id: "settings", label: "Settings", icon: "sliders" },
];

const stats = [
  {
    label: "Deals value this month",
    value: "Rp 482.500.000",
    badge: "+12.4%",
    variant: "success",
  },
  {
    label: "New customers this week",
    value: "38",
    badge: "+6",
    variant: "success",
  },
  { label: "New tasks", value: "14", badge: "5 due today", variant: "warning" },
] as const;

const deals = [
  {
    id: "d1",
    date: "2026-10-28",
    title: "Cloud migration package",
    value: 185000000,
    stage: "Negotiation",
    team: ["Budi Santoso", "Sari Wulandari", "Agus Pratama"],
    highlight: true,
  },
  {
    id: "d2",
    date: "2026-10-21",
    title: "Annual support renewal",
    value: 96400000,
    stage: "Won",
    team: ["Dewi Lestari", "Budi Santoso"],
    highlight: false,
  },
  {
    id: "d3",
    date: "2026-10-14",
    title: "Data warehouse audit",
    value: 42750000,
    stage: "Proposal",
    team: ["Agus Pratama", "Fajar Nugroho", "Sari Wulandari"],
    highlight: false,
  },
  {
    id: "d4",
    date: "2026-10-02",
    title: "POS terminal rollout",
    value: 128900000,
    stage: "Won",
    team: ["Fajar Nugroho", "Dewi Lestari"],
    highlight: false,
  },
  {
    id: "d5",
    date: "2026-09-23",
    title: "Security awareness training",
    value: 18500000,
    stage: "Lost",
    team: ["Sari Wulandari"],
    highlight: false,
  },
  {
    id: "d6",
    date: "2026-09-11",
    title: "Fleet tracking pilot",
    value: 64200000,
    stage: "Won",
    team: ["Budi Santoso", "Agus Pratama", "Dewi Lestari"],
    highlight: false,
  },
];
type Deal = (typeof deals)[number];

const sortOptions = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "Highest value", value: "high" },
  { label: "Lowest value", value: "low" },
];
const sorters: Record<string, (a: Deal, b: Deal) => number> = {
  newest: (a, b) => b.date.localeCompare(a.date),
  oldest: (a, b) => a.date.localeCompare(b.date),
  high: (a, b) => b.value - a.value,
  low: (a, b) => a.value - b.value,
};

const dealMenu = [
  { label: "View details", value: "view" },
  { label: "Duplicate deal", value: "duplicate" },
  { separator: true as const },
  { label: "Archive", value: "archive", danger: true },
];
const dealMenuToasts: Record<string, string> = {
  view: "Opening deal details",
  duplicate: "Deal duplicated",
  archive: "Deal archived",
};

const profileActions: { id: string; label: string; icon: IconName }[] = [
  { id: "email", label: "Send email", icon: "mail" },
  { id: "call", label: "Call customer", icon: "phone" },
  { id: "chat", label: "Start chat", icon: "chat" },
  { id: "schedule", label: "Schedule meeting", icon: "clock" },
];

const initialInfo = {
  firstName: "Rina",
  lastName: "Kusuma",
  email: "rina.kusuma@nusalog.co.id",
  phone: "+62 812 3456 7890",
  source: "Referral",
  lastContacted: "Nov 3, 2026",
};
type CustomerInfo = typeof initialInfo;
type EditableField = Exclude<keyof CustomerInfo, "lastContacted">;

const infoRows: { key: keyof CustomerInfo; label: string }[] = [
  { key: "firstName", label: "First name" },
  { key: "lastName", label: "Last name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "source", label: "Source" },
  { key: "lastContacted", label: "Last contacted" },
];
const formFields: { key: EditableField; label: string; type: string }[] = [
  { key: "firstName", label: "First name", type: "text" },
  { key: "lastName", label: "Last name", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "source", label: "Source", type: "text" },
];

type Task = { time: string; title: string; kind: string };
const tasks: Record<string, Task[]> = {
  "2026-10-28": [{ time: "10:00", title: "Kickoff meeting", kind: "Meeting" }],
  "2026-11-03": [
    { time: "09:30", title: "Discovery call recap", kind: "Call" },
  ],
  "2026-11-05": [
    { time: "10:00", title: "Send revised proposal", kind: "Email" },
    { time: "14:30", title: "Pricing review with finance", kind: "Meeting" },
  ],
  "2026-11-09": [
    { time: "11:00", title: "Contract draft review", kind: "Meeting" },
  ],
  "2026-11-12": [
    { time: "15:00", title: "Quarterly business review", kind: "Meeting" },
  ],
  "2026-11-18": [
    { time: "09:00", title: "Onsite demo in Surabaya", kind: "Visit" },
  ],
  "2026-11-26": [{ time: "13:00", title: "Renewal sign-off", kind: "Call" }],
  "2026-12-02": [
    { time: "10:00", title: "Implementation planning", kind: "Meeting" },
  ],
};
const TODAY = "2026-11-05";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const funnel = [
  {
    value: "weighted",
    label: "Weighted",
    total: "Rp 592.900.000",
    caption: "Weighted pipeline value",
    steps: [
      {
        label: "Qualification",
        value: "Rp 312.400.000",
        deals: 12,
        width: 100,
      },
      { label: "Proposal sent", value: "Rp 186.000.000", deals: 7, width: 60 },
      { label: "Negotiation", value: "Rp 94.500.000", deals: 4, width: 30 },
    ],
  },
  {
    value: "total",
    label: "Total",
    total: "Rp 1.069.800.000",
    caption: "Total pipeline value",
    steps: [
      {
        label: "Qualification",
        value: "Rp 624.800.000",
        deals: 12,
        width: 100,
      },
      { label: "Proposal sent", value: "Rp 310.000.000", deals: 7, width: 50 },
      { label: "Negotiation", value: "Rp 135.000.000", deals: 4, width: 22 },
    ],
  },
];
const funnelTabs = funnel.map(({ value, label }) => ({ value, label }));
const barTones = ["bg-primary", "bg-primary/70", "bg-primary/40"];

const iconButton =
  "relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const pillBase =
  "inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const pillActive = "bg-primary text-on-primary";
const pillIdle = "text-muted hover:bg-surface hover:text-ink";
const railBase =
  "inline-flex size-10 items-center justify-center rounded-xl transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const railActive = "bg-primary text-on-primary";
const railIdle = "text-muted hover:bg-subtle hover:text-ink";
const menuItemBase =
  "flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const menuItemActive = "bg-primary text-on-primary";
const menuItemIdle = "text-ink hover:bg-subtle";
const dealBase =
  "relative flex min-h-48 flex-col gap-3 rounded-2xl border p-4 transition-shadow duration-150";
const dealHighlight = "border-ink bg-ink text-canvas";
const dealNormal = "border-line bg-surface text-ink hover:border-primary-line";
const dealSelected = "ring-2 ring-primary ring-offset-2 ring-offset-surface";
const dealMenuClass =
  "relative z-10 -mt-1 -mr-1 [&>button]:size-8 [&>button]:rounded-full [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-0 [&>button]:text-current [&>button]:hover:bg-current/10 [&>button>svg:last-child]:hidden";
const dayBase =
  "relative inline-flex size-10 items-center justify-center rounded-full text-sm tabular-nums transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const daySelected = "bg-primary font-semibold text-on-primary";
const dayToday =
  "font-semibold text-ink ring-1 ring-primary-line hover:bg-subtle";
const dayIdle = "text-ink hover:bg-subtle";

const rupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
const pad = (value: number) => String(value).padStart(2, "0");
const isoDate = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${monthNames[(month ?? 1) - 1]?.slice(0, 3)} ${day}, ${year}`;
}

function longDate(iso: string) {
  const [year = 0, month = 1, day = 1] = iso.split("-").map(Number);
  const weekday = weekdayNames[new Date(year, month - 1, day).getDay()];
  return `${weekday}, ${monthNames[month - 1]} ${day}`;
}

/** Sel kalender bulan, minggu dimulai Senin. null untuk sel kosong sebelum tanggal 1. */
function monthCells(year: number, month: number) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  return [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: days }, (_, index) => index + 1),
  ];
}

const activeTop = ref("customers");
const activeRail = ref("contacts");
const sort = ref("newest");
const selectedDeal = ref("d1");
const info = ref({ ...initialInfo });
const draft = ref({ ...initialInfo });
const view = ref({ year: 2026, month: 10 });
const selectedDate = ref(TODAY);

const sortedDeals = computed(() => [...deals].sort(sorters[sort.value]));
const sortLabel = computed(
  () => sortOptions.find((option) => option.value === sort.value)?.label,
);
const cells = computed(() => monthCells(view.value.year, view.value.month));
const selectedTasks = computed(() => tasks[selectedDate.value] ?? []);
const customerName = computed(
  () => `${info.value.firstName} ${info.value.lastName}`,
);

function shiftMonth(step: number) {
  const next = new Date(view.value.year, view.value.month + step, 1);
  view.value = { year: next.getFullYear(), month: next.getMonth() };
}

function dayIso(day: number) {
  return isoDate(view.value.year, view.value.month, day);
}

function dayLabel(day: number) {
  const count = tasks[dayIso(day)]?.length ?? 0;
  return `${monthNames[view.value.month]} ${day}, ${count} ${count === 1 ? "task" : "tasks"}`;
}

function dayClass(day: number) {
  const iso = dayIso(day);
  if (iso === selectedDate.value) return daySelected;
  return iso === TODAY ? dayToday : dayIdle;
}

function onDealMenu(value: string, deal: Deal) {
  toast({ title: dealMenuToasts[value] ?? value, description: deal.title });
}

function handleDrawerClose(event: Event) {
  const dialog = event.currentTarget as HTMLDialogElement;
  if (dialog.returnValue === "save") {
    info.value = { ...draft.value };
    toast({
      title: "Customer details saved",
      description: `${draft.value.firstName} ${draft.value.lastName}`,
      variant: "success",
    });
  }
  dialog.returnValue = "";
}
</script>

<template>
  <div class="min-h-dvh bg-canvas text-ink">
    <header
      class="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 lg:px-6"
    >
      <Drawer title="Menu" side="left">
        <template #trigger>
          <button
            type="button"
            aria-label="Open menu"
            :class="[iconButton, 'lg:hidden']"
          >
            <Icon name="menu" class="size-5" />
          </button>
        </template>
        <form method="dialog" class="grid gap-6">
          <div class="grid gap-1">
            <p class="px-3 text-xs font-medium text-muted">Pages</p>
            <button
              v-for="item in topNav"
              :key="item.id"
              type="submit"
              :aria-current="activeTop === item.id ? 'page' : undefined"
              :class="[
                menuItemBase,
                activeTop === item.id ? menuItemActive : menuItemIdle,
              ]"
              @click="activeTop = item.id"
            >
              {{ item.label }}
            </button>
          </div>
          <div class="grid gap-1">
            <p class="px-3 text-xs font-medium text-muted">Workspace</p>
            <button
              v-for="item in railNav"
              :key="item.id"
              type="submit"
              :aria-current="activeRail === item.id ? 'page' : undefined"
              :class="[
                menuItemBase,
                activeRail === item.id ? menuItemActive : menuItemIdle,
              ]"
              @click="activeRail = item.id"
            >
              <Icon :name="item.icon" class="size-5" />
              {{ item.label }}
            </button>
          </div>
        </form>
      </Drawer>
      <div class="flex min-w-0 items-center gap-3">
        <span
          class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-on-primary"
          aria-hidden="true"
        >
          L
        </span>
        <div class="min-w-0 leading-tight">
          <p
            class="flex items-center gap-1.5 text-base font-semibold tracking-tight"
          >
            Lumen
            <span class="size-1.5 rounded-full bg-success" aria-hidden="true" />
          </p>
          <p class="truncate text-xs text-muted">Sales workspace</p>
        </div>
      </div>
      <nav
        aria-label="Main"
        class="mx-auto hidden items-center gap-1 rounded-full border border-line bg-canvas p-1 lg:flex"
      >
        <button
          v-for="item in topNav"
          :key="item.id"
          type="button"
          :aria-current="activeTop === item.id ? 'page' : undefined"
          :class="[pillBase, activeTop === item.id ? pillActive : pillIdle]"
          @click="activeTop = item.id"
        >
          {{ item.label }}
        </button>
      </nav>
      <div class="ml-auto flex items-center gap-2 lg:ml-0">
        <Tooltip content="Messages" side="bottom">
          <button
            type="button"
            aria-label="Messages"
            :class="iconButton"
            @click="
              toast({
                title: 'No new messages',
                description: 'Inbox is up to date',
              })
            "
          >
            <Icon name="message" class="size-5" />
          </button>
        </Tooltip>
        <Tooltip content="Notifications" side="bottom">
          <button
            type="button"
            aria-label="Notifications, 3 unread"
            :class="iconButton"
            @click="
              toast({
                title: '3 unread notifications',
                description: 'Rina Kusuma replied to your proposal',
              })
            "
          >
            <Icon name="bell" class="size-5" />
            <span
              class="absolute top-2 right-2.5 size-2 rounded-full bg-danger ring-2 ring-surface"
              aria-hidden="true"
            />
          </button>
        </Tooltip>
        <Avatar name="Andi Wijaya" size="md" class="ml-1" />
      </div>
    </header>

    <div class="flex">
      <div
        class="hidden w-18 shrink-0 border-r border-line bg-surface lg:block"
      >
        <nav
          aria-label="Workspace"
          class="sticky top-16 flex h-[calc(100dvh-4rem)] flex-col items-center gap-2 py-4"
        >
          <Tooltip
            v-for="item in railNav"
            :key="item.id"
            :content="item.label"
            :class="item.id === 'settings' ? 'mt-auto' : undefined"
          >
            <button
              type="button"
              :aria-label="item.label"
              :aria-current="activeRail === item.id ? 'page' : undefined"
              :class="[
                railBase,
                activeRail === item.id ? railActive : railIdle,
              ]"
              @click="activeRail = item.id"
            >
              <Icon :name="item.icon" class="size-5" />
            </button>
          </Tooltip>
        </nav>
      </div>

      <main class="min-w-0 flex-1 p-4 lg:p-6">
        <div
          class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between"
        >
          <div class="flex items-center gap-3">
            <Tooltip content="Back to customers">
              <button
                type="button"
                aria-label="Back to customers"
                :class="iconButton"
                @click="toast({ title: 'Back to customer list' })"
              >
                <Icon name="back" class="size-5" />
              </button>
            </Tooltip>
            <div class="min-w-0">
              <h1 class="text-2xl font-semibold tracking-tight">
                Customer information
              </h1>
              <p class="text-sm text-muted">Customers / {{ customerName }}</p>
            </div>
          </div>
          <dl class="grid gap-3 sm:grid-cols-3">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="rounded-xl border border-line bg-surface px-4 py-3"
            >
              <dt class="text-xs text-muted">{{ stat.label }}</dt>
              <dd class="mt-1 flex flex-wrap items-center gap-2">
                <span class="text-lg font-semibold tracking-tight tabular-nums">
                  {{ stat.value }}
                </span>
                <Badge :variant="stat.variant">{{ stat.badge }}</Badge>
              </dd>
            </div>
          </dl>
        </div>

        <div class="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div class="flex min-w-0 flex-col gap-6">
            <Card aria-labelledby="crm-history-title">
              <div class="grid gap-4">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 id="crm-history-title" class="text-base font-semibold">
                      Interaction history
                    </h2>
                    <p class="text-sm text-muted">
                      6 deals with {{ info.firstName }} this quarter
                    </p>
                  </div>
                  <DropdownMenu :items="sortOptions" @select="sort = $event">
                    <template #trigger>
                      <span class="text-muted">Sort:</span>
                      <span>{{ sortLabel }}</span>
                    </template>
                  </DropdownMenu>
                </div>
                <ul
                  role="list"
                  class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                >
                  <li
                    v-for="deal in sortedDeals"
                    :key="deal.id"
                    :data-deal="deal.id"
                    :class="[
                      dealBase,
                      deal.highlight ? dealHighlight : dealNormal,
                      selectedDeal === deal.id && dealSelected,
                    ]"
                  >
                    <div class="flex items-start justify-between gap-2">
                      <time
                        :datetime="deal.date"
                        :class="[
                          'text-xs font-medium',
                          deal.highlight ? 'text-canvas/75' : 'text-muted',
                        ]"
                      >
                        {{ formatDate(deal.date) }}
                      </time>
                      <DropdownMenu
                        :class="dealMenuClass"
                        :items="dealMenu"
                        @select="onDealMenu($event, deal)"
                      >
                        <template #trigger>
                          <Icon name="dots" class="size-5" />
                          <span class="sr-only">
                            Actions for {{ deal.title }}
                          </span>
                        </template>
                      </DropdownMenu>
                    </div>
                    <h3 class="text-sm leading-snug font-semibold">
                      <button
                        type="button"
                        :aria-pressed="selectedDeal === deal.id"
                        class="text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary"
                        @click="selectedDeal = deal.id"
                      >
                        {{ deal.title }}
                      </button>
                    </h3>
                    <p
                      class="mt-auto text-xl font-semibold tracking-tight tabular-nums"
                    >
                      {{ rupiah(deal.value) }}
                    </p>
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex -space-x-1">
                        <Avatar
                          v-for="member in deal.team"
                          :key="member"
                          :name="member"
                          size="sm"
                          :class="[
                            'ring-2',
                            deal.highlight ? 'ring-ink' : 'ring-surface',
                          ]"
                        />
                      </div>
                      <span
                        :class="[
                          'text-xs font-medium',
                          deal.highlight ? 'text-canvas/75' : 'text-muted',
                        ]"
                      >
                        {{ deal.stage }}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </Card>

            <Card
              aria-labelledby="crm-tasks-title"
              class="flex-1 content-start"
            >
              <div class="grid gap-4">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 id="crm-tasks-title" class="text-base font-semibold">
                      Tasks schedule
                    </h2>
                    <p class="text-sm text-muted">
                      Follow-ups planned with {{ info.firstName }}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    @click="
                      toast({
                        title: 'Task added',
                        description: longDate(selectedDate),
                        variant: 'success',
                      })
                    "
                  >
                    <Icon name="plus" class="size-4" />
                    New task
                  </Button>
                </div>
                <div class="grid gap-6 md:grid-cols-[minmax(0,1fr)_280px]">
                  <div class="grid content-start gap-3">
                    <div class="flex items-center justify-between gap-2">
                      <h3 class="text-sm font-semibold" aria-live="polite">
                        {{ monthNames[view.month] }} {{ view.year }}
                      </h3>
                      <div class="flex gap-1">
                        <button
                          type="button"
                          aria-label="Previous month"
                          :class="[iconButton, 'size-8']"
                          @click="shiftMonth(-1)"
                        >
                          <Icon name="prev" class="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="Next month"
                          :class="[iconButton, 'size-8']"
                          @click="shiftMonth(1)"
                        >
                          <Icon name="next" class="size-4" />
                        </button>
                      </div>
                    </div>
                    <div class="grid grid-cols-7 gap-y-1 text-center">
                      <span
                        v-for="weekday in weekdays"
                        :key="weekday"
                        aria-hidden="true"
                        class="py-1 text-xs font-medium text-muted"
                      >
                        {{ weekday }}
                      </span>
                      <template v-for="(day, index) in cells" :key="index">
                        <span v-if="day === null" />
                        <span v-else class="flex justify-center">
                          <button
                            type="button"
                            :aria-pressed="dayIso(day) === selectedDate"
                            :aria-label="dayLabel(day)"
                            :class="[dayBase, dayClass(day)]"
                            @click="selectedDate = dayIso(day)"
                          >
                            <span>{{ day }}</span>
                            <span
                              v-if="tasks[dayIso(day)]"
                              aria-hidden="true"
                              :class="[
                                'absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full',
                                dayIso(day) === selectedDate
                                  ? 'bg-on-primary'
                                  : 'bg-success',
                              ]"
                            />
                          </button>
                        </span>
                      </template>
                    </div>
                  </div>
                  <div
                    class="grid content-start gap-3 border-line md:border-l md:pl-6"
                  >
                    <h3 class="text-sm font-semibold">
                      {{ longDate(selectedDate) }}
                    </h3>
                    <ul
                      v-if="selectedTasks.length > 0"
                      role="list"
                      class="grid gap-2"
                    >
                      <li
                        v-for="task in selectedTasks"
                        :key="task.time + task.title"
                        class="flex gap-3 rounded-xl border border-line p-3"
                      >
                        <span
                          class="w-12 shrink-0 text-xs font-medium text-muted tabular-nums"
                        >
                          {{ task.time }}
                        </span>
                        <span class="grid gap-0.5">
                          <span class="text-sm font-medium">{{
                            task.title
                          }}</span>
                          <span class="text-xs text-muted">{{
                            task.kind
                          }}</span>
                        </span>
                      </li>
                    </ul>
                    <p
                      v-else
                      class="rounded-xl border border-dashed border-line p-4 text-sm text-muted"
                    >
                      No tasks on this day.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div class="flex min-w-0 flex-col gap-6">
            <Card aria-labelledby="crm-profile-name">
              <div class="grid justify-items-center gap-4 text-center">
                <Avatar
                  name="Rina Kusuma"
                  size="lg"
                  class="size-16! text-xl!"
                />
                <div class="grid gap-1">
                  <h2 id="crm-profile-name" class="text-lg font-semibold">
                    {{ customerName }}
                  </h2>
                  <p class="text-sm text-muted">Head of Procurement</p>
                  <p
                    class="flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    PT Nusantara Logistik
                    <Badge variant="success">Key account</Badge>
                  </p>
                </div>
                <div class="flex justify-center gap-3">
                  <Tooltip
                    v-for="action in profileActions"
                    :key="action.id"
                    :content="action.label"
                  >
                    <button
                      type="button"
                      :aria-label="action.label"
                      :class="iconButton"
                      @click="
                        toast({
                          title: action.label,
                          description: `${customerName}, PT Nusantara Logistik`,
                        })
                      "
                    >
                      <Icon :name="action.icon" class="size-5" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </Card>

            <Card aria-labelledby="crm-details-title">
              <div class="grid gap-2">
                <div class="flex items-center justify-between gap-3">
                  <h2 id="crm-details-title" class="text-base font-semibold">
                    Detailed information
                  </h2>
                  <Drawer
                    title="Edit customer details"
                    @close="handleDrawerClose"
                  >
                    <template #trigger>
                      <Button
                        variant="secondary"
                        size="sm"
                        @click="draft = { ...info }"
                      >
                        <Icon name="pencil" class="size-4" />
                        Edit
                      </Button>
                    </template>
                    <div class="grid gap-4">
                      <Input
                        v-for="field in formFields"
                        :key="field.key"
                        v-model="draft[field.key]"
                        :label="field.label"
                        :type="field.type"
                        :name="field.key"
                      />
                    </div>
                    <template #footer>
                      <Button variant="secondary" type="submit" value="cancel">
                        Cancel
                      </Button>
                      <Button type="submit" value="save">Save changes</Button>
                    </template>
                  </Drawer>
                </div>
                <dl class="divide-y divide-line">
                  <div
                    v-for="row in infoRows"
                    :key="row.key"
                    class="flex items-center justify-between gap-4 py-3"
                  >
                    <dt class="shrink-0 text-muted">{{ row.label }}</dt>
                    <dd
                      :data-field="row.key"
                      class="min-w-0 truncate text-right font-medium"
                    >
                      {{ info[row.key] }}
                    </dd>
                  </div>
                </dl>
              </div>
            </Card>

            <Card aria-labelledby="crm-funnel-title">
              <div class="grid gap-4">
                <div>
                  <h2 id="crm-funnel-title" class="text-base font-semibold">
                    Stage funnel
                  </h2>
                  <p class="text-sm text-muted">Open pipeline by stage</p>
                </div>
                <Tabs default-value="weighted" :items="funnelTabs">
                  <template
                    v-for="mode in funnel"
                    :key="mode.value"
                    #[mode.value]
                  >
                    <div class="grid gap-4">
                      <div>
                        <p
                          class="text-2xl font-semibold tracking-tight tabular-nums"
                        >
                          {{ mode.total }}
                        </p>
                        <p class="text-xs text-muted">{{ mode.caption }}</p>
                      </div>
                      <ol
                        class="grid gap-3"
                        :aria-label="`${mode.caption} by stage`"
                      >
                        <li
                          v-for="(step, index) in mode.steps"
                          :key="step.label"
                          class="grid gap-1.5"
                        >
                          <div
                            class="flex items-baseline justify-between gap-3"
                          >
                            <span class="font-medium"
                              >{{ step.label
                              }}<span
                                class="ml-2 text-xs font-normal text-muted"
                                >{{ step.deals }} deals</span
                              ></span
                            >
                            <span class="font-semibold tabular-nums">
                              {{ step.value }}
                            </span>
                          </div>
                          <div class="h-6 rounded-md bg-subtle">
                            <div
                              :class="[
                                'mx-auto h-6 rounded-md',
                                barTones[index],
                              ]"
                              :style="{ width: `${step.width}%` }"
                            />
                          </div>
                        </li>
                      </ol>
                    </div>
                  </template>
                </Tabs>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
    <Toaster />
  </div>
</template>
