<script setup lang="ts">
import { computed, ref } from "vue";
import Avatar from "../../../components/avatar/Avatar.vue";
import Badge from "../../../components/badge/Badge.vue";
import Button from "../../../components/button/Button.vue";
import Card from "../../../components/card/Card.vue";
import Drawer from "../../../components/drawer/Drawer.vue";
import DropdownMenu from "../../../components/dropdown-menu/DropdownMenu.vue";
import Input from "../../../components/input/Input.vue";
import Progress from "../../../components/progress/Progress.vue";
import Select from "../../../components/select/Select.vue";
import Toaster, { toast } from "../../../components/toast/Toast.vue";

type Period = "weekly" | "monthly" | "yearly";
type StatKey = "profit" | "orders" | "organic" | "margin";
type SortKey = "name" | "product" | "change" | "total";
type SortDir = "asc" | "desc";
type Stat = { value: string; change: string; up: boolean; previous: string };
type Bar = { label: string; value: string; short: string; height: number };
type Segment = { label: string; count: string; share: number };
type Seller = {
  name: string;
  product: string;
  category: string;
  change: number;
  changeLabel: string;
  total: number;
  totalLabel: string;
};
type PeriodData = {
  label: string;
  subtitle: string;
  compare: string;
  stats: Record<StatKey, Stat>;
  spark: { line: string; area: string; summary: string };
  chart: { caption: string; summary: string; bars: Bar[] };
  activity: {
    caption: string;
    total: string;
    summary: string;
    segments: Segment[];
  };
  regions: {
    caption: string;
    total: string;
    items: { name: string; share: number }[];
  };
};

const icons = {
  overview: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  analytics: "M3 20h18M7 16v-5M12 16V7M17 16v-8",
  customers:
    "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM21 19v-1a4 4 0 0 0-3-3.9M16 5.1a3 3 0 0 1 0 5.8",
  integrations: "m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5",
  messages: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z",
  reviews:
    "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z",
  help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01",
  logout: "M9 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3M16 16l4-4-4-4M20 12H10",
  search: "m21 21-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",
  menu: "M4 6h16M4 12h16M4 18h16",
  download: "M12 4v12M7 11l5 5 5-5M5 20h14",
  filter: "M4 6h16M7 12h10M10 18h4",
  calendar:
    "M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  wallet:
    "M19 7V5a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v3h-3a2 2 0 0 0 0 4h3v3a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6",
  bag: "M6 7h12l1 13H5L6 7ZM9 7V6a3 3 0 0 1 6 0v1",
  trend: "m3 17 6-6 4 4 8-8M15 7h6v6",
  percent:
    "M19 5 5 19M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM16.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  sort: "m8 9 4-4 4 4M16 15l-4 4-4-4",
  asc: "m8 14 4-4 4 4",
  desc: "m8 10 4 4 4-4",
};

const navGroups = [
  {
    label: "Main menu",
    items: [
      { value: "overview", label: "Business overview", icon: icons.overview },
      { value: "analytics", label: "Analytics", icon: icons.analytics },
      { value: "customers", label: "Customers", icon: icons.customers },
      {
        value: "integrations",
        label: "Integrations",
        icon: icons.integrations,
      },
    ],
  },
  {
    label: "Settings",
    items: [
      { value: "messages", label: "Messages", icon: icons.messages },
      { value: "reviews", label: "Reviews", icon: icons.reviews },
    ],
  },
];

const periodItems = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const statCards: {
  key: StatKey;
  label: string;
  icon: string;
  highlight: boolean;
}[] = [
  { key: "profit", label: "Total profit", icon: icons.wallet, highlight: true },
  { key: "orders", label: "Total orders", icon: icons.bag, highlight: false },
  {
    key: "organic",
    label: "Organic sales",
    icon: icons.trend,
    highlight: false,
  },
  {
    key: "margin",
    label: "Gross margin",
    icon: icons.percent,
    highlight: false,
  },
];

const data: Record<Period, PeriodData> = {
  weekly: {
    label: "Weekly",
    subtitle: "Here is how your store performed this week.",
    compare: "last week",
    stats: {
      profit: {
        value: "Rp 62.4M",
        change: "+8.1%",
        up: true,
        previous: "Rp 57.7M",
      },
      orders: { value: "1,284", change: "+5.1%", up: true, previous: "1,222" },
      organic: {
        value: "Rp 18.9M",
        change: "-2.6%",
        up: false,
        previous: "Rp 19.4M",
      },
      margin: { value: "41.2%", change: "+1.3%", up: true, previous: "39.9%" },
    },
    spark: {
      line: "M0 32L20 23.4L40 26.6L60 14.8L80 8.3L100 11.5L120 4",
      area: "M0 32L20 23.4L40 26.6L60 14.8L80 8.3L100 11.5L120 4L120 40L0 40Z",
      summary: "Gross margin trend this week, from 38.6% to 41.2%",
    },
    chart: {
      caption: "Daily profit this week",
      summary:
        "Daily profit this week, lowest Rp 7.4M on Wed and highest Rp 13.1M on Fri",
      bars: [
        { label: "Mon", value: "Rp 8.2M", short: "8.2M", height: 63 },
        { label: "Tue", value: "Rp 9.6M", short: "9.6M", height: 73 },
        { label: "Wed", value: "Rp 7.4M", short: "7.4M", height: 56 },
        { label: "Thu", value: "Rp 11.8M", short: "11.8M", height: 90 },
        { label: "Fri", value: "Rp 13.1M", short: "13.1M", height: 100 },
        { label: "Sat", value: "Rp 12.3M", short: "12.3M", height: 94 },
      ],
    },
    activity: {
      caption: "Order status this week",
      total: "1,284",
      summary:
        "1,284 orders this week: 318 on process, 74 canceled, 892 delivered",
      segments: [
        { label: "On process", count: "318", share: 25 },
        { label: "Canceled", count: "74", share: 6 },
        { label: "Delivered", count: "892", share: 69 },
      ],
    },
    regions: {
      caption: "Top provinces this week",
      total: "1,284",
      items: [
        { name: "DKI Jakarta", share: 31 },
        { name: "Jawa Barat", share: 24 },
        { name: "Jawa Timur", share: 18 },
        { name: "Bali", share: 12 },
        { name: "Sumatera Utara", share: 9 },
      ],
    },
  },
  monthly: {
    label: "Monthly",
    subtitle: "Here is how your store performed this month.",
    compare: "last month",
    stats: {
      profit: {
        value: "Rp 248.6M",
        change: "+12.4%",
        up: true,
        previous: "Rp 221.2M",
      },
      orders: { value: "5,312", change: "+9.8%", up: true, previous: "4,838" },
      organic: {
        value: "Rp 76.3M",
        change: "+4.7%",
        up: true,
        previous: "Rp 72.9M",
      },
      margin: { value: "42.8%", change: "-0.9%", up: false, previous: "43.7%" },
    },
    spark: {
      line: "M0 4L20 7.7L40 20.8L60 11.5L80 24.5L100 32L120 28.3",
      area: "M0 4L20 7.7L40 20.8L60 11.5L80 24.5L100 32L120 28.3L120 40L0 40Z",
      summary: "Gross margin trend this month, from 44.1% to 42.8%",
    },
    chart: {
      caption: "Monthly profit over the last 6 months",
      summary:
        "Monthly profit over the last 6 months, rising from Rp 142.8M in Jun to Rp 248.6M in Nov",
      bars: [
        { label: "Jun", value: "Rp 142.8M", short: "142.8M", height: 57 },
        { label: "Jul", value: "Rp 176.5M", short: "176.5M", height: 71 },
        { label: "Aug", value: "Rp 158.2M", short: "158.2M", height: 64 },
        { label: "Sep", value: "Rp 194.7M", short: "194.7M", height: 78 },
        { label: "Oct", value: "Rp 221.2M", short: "221.2M", height: 89 },
        { label: "Nov", value: "Rp 248.6M", short: "248.6M", height: 100 },
      ],
    },
    activity: {
      caption: "Order status this month",
      total: "5,312",
      summary:
        "5,312 orders this month: 1,186 on process, 302 canceled, 3,824 delivered",
      segments: [
        { label: "On process", count: "1,186", share: 22 },
        { label: "Canceled", count: "302", share: 6 },
        { label: "Delivered", count: "3,824", share: 72 },
      ],
    },
    regions: {
      caption: "Top provinces this month",
      total: "5,312",
      items: [
        { name: "DKI Jakarta", share: 32 },
        { name: "Jawa Barat", share: 23 },
        { name: "Jawa Timur", share: 19 },
        { name: "Bali", share: 11 },
        { name: "Sumatera Utara", share: 9 },
      ],
    },
  },
  yearly: {
    label: "Yearly",
    subtitle: "Here is how your store performed this year.",
    compare: "last year",
    stats: {
      profit: {
        value: "Rp 2.86B",
        change: "+18.7%",
        up: true,
        previous: "Rp 2.41B",
      },
      orders: {
        value: "61,940",
        change: "+14.2%",
        up: true,
        previous: "54,238",
      },
      organic: {
        value: "Rp 884.1M",
        change: "+21.3%",
        up: true,
        previous: "Rp 728.9M",
      },
      margin: { value: "41.9%", change: "+2.1%", up: true, previous: "39.8%" },
    },
    spark: {
      line: "M0 32L20 27.6L40 21.2L60 23.6L80 14.3L100 10.4L120 4",
      area: "M0 32L20 27.6L40 21.2L60 23.6L80 14.3L100 10.4L120 4L120 40L0 40Z",
      summary: "Gross margin trend this year, from 36.2% to 41.9%",
    },
    chart: {
      caption: "Yearly profit since 2021",
      summary:
        "Yearly profit since 2021, rising from Rp 1.38B in 2021 to Rp 2.86B in 2026",
      bars: [
        { label: "2021", value: "Rp 1.38B", short: "1.38B", height: 48 },
        { label: "2022", value: "Rp 1.62B", short: "1.62B", height: 57 },
        { label: "2023", value: "Rp 1.94B", short: "1.94B", height: 68 },
        { label: "2024", value: "Rp 2.18B", short: "2.18B", height: 76 },
        { label: "2025", value: "Rp 2.41B", short: "2.41B", height: 84 },
        { label: "2026", value: "Rp 2.86B", short: "2.86B", height: 100 },
      ],
    },
    activity: {
      caption: "Order status this year",
      total: "61,940",
      summary:
        "61,940 orders this year: 12,388 on process, 3,097 canceled, 46,455 delivered",
      segments: [
        { label: "On process", count: "12,388", share: 20 },
        { label: "Canceled", count: "3,097", share: 5 },
        { label: "Delivered", count: "46,455", share: 75 },
      ],
    },
    regions: {
      caption: "Top provinces this year",
      total: "61,940",
      items: [
        { name: "DKI Jakarta", share: 30 },
        { name: "Jawa Barat", share: 25 },
        { name: "Jawa Timur", share: 18 },
        { name: "Bali", share: 12 },
        { name: "Sumatera Utara", share: 10 },
      ],
    },
  },
};

const sellers: Seller[] = [
  {
    name: "Dewi Lestari",
    product: "Wireless Earbuds Pro",
    category: "electronics",
    change: 12.4,
    changeLabel: "+12.4%",
    total: 48.2,
    totalLabel: "Rp 48.2M",
  },
  {
    name: "Budi Santoso",
    product: "Batik Shirt Premium",
    category: "fashion",
    change: 8.1,
    changeLabel: "+8.1%",
    total: 36.7,
    totalLabel: "Rp 36.7M",
  },
  {
    name: "Siti Rahmawati",
    product: "Ceramic Dinner Set",
    category: "home",
    change: -3.2,
    changeLabel: "-3.2%",
    total: 29.4,
    totalLabel: "Rp 29.4M",
  },
  {
    name: "Agus Wijaya",
    product: "Smartwatch Series 5",
    category: "electronics",
    change: 15.6,
    changeLabel: "+15.6%",
    total: 27.9,
    totalLabel: "Rp 27.9M",
  },
  {
    name: "Putri Anggraini",
    product: "Vitamin C Serum",
    category: "beauty",
    change: 6.3,
    changeLabel: "+6.3%",
    total: 21.5,
    totalLabel: "Rp 21.5M",
  },
  {
    name: "Rizky Hidayat",
    product: "Linen Throw Pillow",
    category: "home",
    change: -1.8,
    changeLabel: "-1.8%",
    total: 14.6,
    totalLabel: "Rp 14.6M",
  },
];

const columns: { key: SortKey; label: string; numeric: boolean }[] = [
  { key: "name", label: "Seller", numeric: false },
  { key: "product", label: "Product", numeric: false },
  { key: "change", label: "Change", numeric: true },
  { key: "total", label: "Total", numeric: true },
];

const ranges = [
  { value: "last-7", label: "Last 7 days" },
  { value: "last-30", label: "Last 30 days" },
  { value: "last-90", label: "Last 90 days" },
  { value: "ytd", label: "Year to date" },
];

const categories = [
  { value: "all", label: "All categories" },
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home", label: "Home and living" },
  { value: "beauty", label: "Beauty" },
];

const segmentClasses = ["stroke-primary/40", "stroke-danger", "stroke-primary"];
const dotClasses = ["bg-primary/40", "bg-danger", "bg-primary"];
const GAUGE_ARC = "M20 100A80 80 0 0 1 180 100";
const GAUGE_GAP = 1;
const BAR_MAX_PX = 184;
const DEFAULT_BAR = 5;

const navItem =
  "flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const navActive = "bg-primary-soft text-ink";
const navIdle = "text-muted hover:bg-subtle hover:text-ink";
const iconButton =
  "relative inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const sectionTitle = "text-base font-semibold text-ink";
const sectionCaption = "text-sm text-muted";
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const labelOf = (list: { value: string; label: string }[], value: string) =>
  list.find((entry) => entry.value === value)?.label ?? "";

/** Panjang dan posisi tiap segmen gauge pada busur dengan pathLength 100. */
const dashFor = (segments: Segment[], index: number) => {
  const start = segments.slice(0, index).reduce((sum, s) => sum + s.share, 0);
  const segment = segments[index];
  const length = Math.max((segment?.share ?? 0) - GAUGE_GAP, 0);
  return { dasharray: `${length} 100`, dashoffset: `${-start}` };
};

function compareSellers(a: Seller, b: Seller, key: SortKey, dir: SortDir) {
  const x = a[key];
  const y = b[key];
  const order =
    typeof x === "number" && typeof y === "number"
      ? x - y
      : String(x).localeCompare(String(y));
  return dir === "asc" ? order : -order;
}

const active = ref("overview");
const period = ref<Period>("monthly");
const selectedBar = ref(DEFAULT_BAR);
const query = ref("");
const sortKey = ref<SortKey>("total");
const sortDir = ref<SortDir>("desc");
const draftRange = ref("last-30");
const draftCategory = ref("all");
const appliedRange = ref("last-30");
const appliedCategory = ref("all");

const current = computed(() => data[period.value]);
const bar = computed(() => {
  const bars = current.value.chart.bars;
  return bars[selectedBar.value] ?? bars[bars.length - 1];
});
const visibleSellers = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return sellers
    .filter(
      (s) =>
        appliedCategory.value === "all" || s.category === appliedCategory.value,
    )
    .filter(
      (s) =>
        needle === "" ||
        s.name.toLowerCase().includes(needle) ||
        s.product.toLowerCase().includes(needle),
    )
    .sort((a, b) => compareSellers(a, b, sortKey.value, sortDir.value));
});

function changePeriod(value: string) {
  if (!(value in data)) return;
  period.value = value as Period;
  selectedBar.value = DEFAULT_BAR;
}
function sortBy(key: SortKey, numeric: boolean) {
  if (key === sortKey.value) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
    return;
  }
  sortKey.value = key;
  sortDir.value = numeric ? "desc" : "asc";
}
const ariaSort = (key: SortKey) =>
  key === sortKey.value
    ? sortDir.value === "asc"
      ? "ascending"
      : "descending"
    : undefined;
const sortIcon = (key: SortKey) =>
  key === sortKey.value
    ? sortDir.value === "asc"
      ? icons.asc
      : icons.desc
    : icons.sort;

function openFilters() {
  draftRange.value = appliedRange.value;
  draftCategory.value = appliedCategory.value;
}
function applyFilters() {
  appliedRange.value = draftRange.value;
  appliedCategory.value = draftCategory.value;
  toast({
    title: "Filters applied",
    description: `${labelOf(ranges, draftRange.value)}, ${labelOf(categories, draftCategory.value)}`,
  });
}
function resetFilters() {
  draftRange.value = "last-30";
  draftCategory.value = "all";
  appliedRange.value = "last-30";
  appliedCategory.value = "all";
  toast({ title: "Filters reset" });
}
const exportReport = () =>
  toast({
    title: "Report exported",
    description: `${current.value.label} sales report saved as CSV.`,
    variant: "success",
  });
const showNotifications = () =>
  toast({
    title: "3 new notifications",
    description: "Dewi Lestari reached Rp 48.2M in sales.",
  });
const showHelp = () =>
  toast({
    title: "Help center",
    description:
      "Email support@larisa.id or chat with us from 08.00 to 20.00 WIB.",
  });
const signOut = () =>
  toast({
    title: "Signed out",
    description: "This is a demo, your session is still active.",
  });
</script>

<template>
  <div
    class="min-h-dvh bg-canvas text-ink lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]"
  >
    <aside
      class="sticky top-0 hidden h-dvh flex-col gap-8 border-r border-line bg-surface px-4 py-6 lg:flex"
    >
      <div class="flex items-center gap-2.5 px-3">
        <span
          class="grid size-8 place-items-center rounded-lg bg-primary text-sm font-semibold text-on-primary"
          aria-hidden="true"
          >L</span
        >
        <span class="text-lg font-semibold tracking-tight">Larisa</span>
      </div>
      <nav aria-label="Main navigation" class="grid flex-1 content-start gap-6">
        <div v-for="group in navGroups" :key="group.label" class="grid gap-2">
          <p class="px-3 text-xs font-medium text-faint">{{ group.label }}</p>
          <ul class="grid gap-1">
            <li v-for="item in group.items" :key="item.value">
              <button
                type="button"
                :aria-current="active === item.value ? 'page' : undefined"
                :class="[navItem, active === item.value ? navActive : navIdle]"
                @click="active = item.value"
              >
                <svg
                  class="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path :d="item.icon" />
                </svg>
                {{ item.label }}
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div class="grid gap-1 border-t border-line pt-4">
        <button type="button" :class="[navItem, navIdle]" @click="showHelp">
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path :d="icons.help" />
          </svg>
          Help center
        </button>
        <button type="button" :class="[navItem, navIdle]" @click="signOut">
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path :d="icons.logout" />
          </svg>
          Log out
        </button>
      </div>
    </aside>

    <div class="flex min-w-0 flex-col">
      <header
        class="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 sm:px-6 lg:px-8"
      >
        <Drawer title="Menu" side="left">
          <template #trigger>
            <button
              type="button"
              :class="[iconButton, 'lg:hidden']"
              aria-label="Open menu"
            >
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path :d="icons.menu" />
              </svg>
            </button>
          </template>
          <form method="dialog" class="grid gap-6">
            <nav aria-label="Mobile navigation" class="grid gap-6">
              <div
                v-for="group in navGroups"
                :key="group.label"
                class="grid gap-2"
              >
                <p class="px-3 text-xs font-medium text-faint">
                  {{ group.label }}
                </p>
                <ul class="grid gap-1">
                  <li v-for="item in group.items" :key="item.value">
                    <button
                      type="submit"
                      :aria-current="active === item.value ? 'page' : undefined"
                      :class="[
                        navItem,
                        active === item.value ? navActive : navIdle,
                      ]"
                      @click="active = item.value"
                    >
                      <svg
                        class="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path :d="item.icon" />
                      </svg>
                      {{ item.label }}
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          </form>
        </Drawer>
        <div class="relative min-w-0 flex-1 sm:max-w-sm">
          <Input
            v-model="query"
            type="search"
            aria-label="Search sellers"
            placeholder="Search sellers or products"
            class="pl-9!"
          />
          <svg
            class="pointer-events-none absolute bottom-3 left-3 size-4 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path :d="icons.search" />
          </svg>
        </div>
        <div class="ml-auto flex items-center gap-3">
          <button
            type="button"
            :class="iconButton"
            aria-label="Notifications, 3 unread"
            @click="showNotifications"
          >
            <svg
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path :d="icons.bell" />
            </svg>
            <span
              class="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full border-2 border-surface bg-danger text-[10px] font-semibold text-on-primary"
              aria-hidden="true"
              >3</span
            >
          </button>
          <span class="hidden h-8 w-px bg-line sm:block" aria-hidden="true" />
          <div class="flex items-center gap-3">
            <Avatar name="Rizky Pratama" />
            <div class="hidden leading-tight md:grid">
              <span class="text-sm font-medium text-ink">Rizky Pratama</span>
              <span class="text-xs text-muted">rizky@larisa.id</span>
            </div>
          </div>
        </div>
      </header>

      <main class="grid min-w-0 gap-6 p-4 sm:p-6 lg:p-8">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="grid gap-1">
            <h1 class="text-2xl font-semibold tracking-tight text-ink">
              Dashboard
            </h1>
            <p class="text-sm text-muted">{{ current.subtitle }}</p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <DropdownMenu :items="periodItems" @select="changePeriod">
              <template #trigger>
                <svg
                  class="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path :d="icons.calendar" />
                </svg>
                <span class="sr-only">Period: </span>
                <span>{{ current.label }}</span>
              </template>
            </DropdownMenu>
            <Drawer title="Filter report">
              <template #trigger>
                <Button variant="secondary" @click="openFilters">
                  <svg
                    class="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path :d="icons.filter" />
                  </svg>
                  Filter
                </Button>
              </template>
              <div class="grid gap-5">
                <p>
                  Narrow down the best sellers table by date range and product
                  category.
                </p>
                <Select v-model="draftRange" label="Date range">
                  <option
                    v-for="range in ranges"
                    :key="range.value"
                    :value="range.value"
                  >
                    {{ range.label }}
                  </option>
                </Select>
                <Select v-model="draftCategory" label="Category">
                  <option
                    v-for="category in categories"
                    :key="category.value"
                    :value="category.value"
                  >
                    {{ category.label }}
                  </option>
                </Select>
              </div>
              <template #footer>
                <Button
                  variant="secondary"
                  type="submit"
                  value="reset"
                  @click="resetFilters"
                  >Reset</Button
                >
                <Button type="submit" value="apply" @click="applyFilters"
                  >Apply filters</Button
                >
              </template>
            </Drawer>
            <Button @click="exportReport">
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path :d="icons.download" />
              </svg>
              Export
            </Button>
          </div>
        </div>

        <section aria-labelledby="metrics-title">
          <h2 id="metrics-title" class="sr-only">Key metrics</h2>
          <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article
              v-for="card in statCards"
              :key="card.key"
              :class="[
                'grid gap-4 rounded-xl border p-5',
                card.highlight
                  ? 'border-primary bg-primary text-on-primary'
                  : 'border-line bg-surface text-ink',
              ]"
            >
              <div class="flex items-center justify-between gap-3">
                <h3
                  :class="[
                    'text-sm font-medium',
                    card.highlight ? 'text-on-primary/75' : 'text-muted',
                  ]"
                >
                  {{ card.label }}
                </h3>
                <span
                  :class="[
                    'grid size-9 place-items-center rounded-lg',
                    card.highlight ? 'bg-on-primary/10' : 'bg-subtle',
                  ]"
                >
                  <svg
                    class="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path :d="card.icon" />
                  </svg>
                </span>
              </div>
              <div class="flex items-end justify-between gap-3">
                <p class="text-2xl font-semibold tracking-tight tabular-nums">
                  {{ current.stats[card.key].value }}
                </p>
                <svg
                  v-if="card.key === 'margin'"
                  class="h-10 w-24 shrink-0 text-primary"
                  viewBox="0 0 120 40"
                  preserveAspectRatio="none"
                  role="img"
                  :aria-label="current.spark.summary"
                >
                  <path :d="current.spark.area" class="fill-primary/10" />
                  <path
                    :d="current.spark.line"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    vector-effect="non-scaling-stroke"
                  />
                </svg>
              </div>
              <div class="flex flex-wrap items-center gap-2 text-xs">
                <span class="inline-flex rounded-full bg-surface">
                  <Badge
                    :variant="current.stats[card.key].up ? 'success' : 'danger'"
                    :dot="false"
                    ><span>{{ current.stats[card.key].change }}</span></Badge
                  >
                </span>
                <span
                  :class="card.highlight ? 'text-on-primary/75' : 'text-muted'"
                  >vs {{ current.stats[card.key].previous }}
                  {{ current.compare }}</span
                >
              </div>
            </article>
          </div>
        </section>

        <div class="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          <Card aria-labelledby="report-title">
            <div class="grid gap-6">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="grid gap-1">
                  <h2 id="report-title" :class="sectionTitle">Sales report</h2>
                  <p :class="sectionCaption">{{ current.chart.caption }}</p>
                </div>
                <div
                  class="grid justify-items-end gap-0.5 text-right"
                  aria-live="polite"
                >
                  <p class="text-xs text-muted">{{ bar?.label }}</p>
                  <p class="text-lg font-semibold tabular-nums">
                    {{ bar?.value }}
                  </p>
                </div>
              </div>
              <div class="relative">
                <div
                  class="pointer-events-none absolute inset-x-0 top-12 bottom-6 flex flex-col justify-between"
                  aria-hidden="true"
                >
                  <span class="border-t border-dashed border-line" />
                  <span class="border-t border-dashed border-line" />
                  <span class="border-t border-dashed border-line" />
                  <span class="border-t border-line" />
                </div>
                <div
                  role="group"
                  :aria-label="current.chart.summary"
                  class="relative grid grid-cols-6 gap-3 sm:gap-5"
                >
                  <button
                    v-for="(entry, index) in current.chart.bars"
                    :key="entry.label"
                    type="button"
                    :aria-pressed="index === selectedBar ? 'true' : 'false'"
                    :class="[
                      'group flex h-64 min-w-0 flex-col items-center justify-end gap-2 rounded-md',
                      focusRing,
                    ]"
                    @click="selectedBar = index"
                  >
                    <span
                      :class="[
                        'text-xs tabular-nums',
                        index === selectedBar
                          ? 'font-semibold text-ink'
                          : 'hidden text-muted sm:block',
                      ]"
                      >{{ entry.short }}</span
                    >
                    <span
                      :class="[
                        'w-full max-w-14 rounded-t-md transition-colors duration-150 ease-out motion-reduce:transition-none',
                        index === selectedBar
                          ? 'bg-primary'
                          : 'bg-primary/15 group-hover:bg-primary/25',
                      ]"
                      :style="{
                        height: `${(entry.height * BAR_MAX_PX) / 100}px`,
                      }"
                    />
                    <span
                      :class="[
                        'text-xs',
                        index === selectedBar
                          ? 'font-medium text-ink'
                          : 'text-muted',
                      ]"
                      >{{ entry.label }}</span
                    >
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card aria-labelledby="activity-title">
            <div class="grid gap-6">
              <div class="grid gap-1">
                <h2 id="activity-title" :class="sectionTitle">
                  Sales activity
                </h2>
                <p :class="sectionCaption">{{ current.activity.caption }}</p>
              </div>
              <div class="relative mx-auto w-full max-w-72">
                <svg
                  viewBox="0 0 200 110"
                  class="w-full"
                  role="img"
                  :aria-label="current.activity.summary"
                >
                  <path
                    :d="GAUGE_ARC"
                    pathLength="100"
                    fill="none"
                    stroke-width="20"
                    class="stroke-subtle"
                  />
                  <path
                    v-for="(segment, index) in current.activity.segments"
                    :key="segment.label"
                    :d="GAUGE_ARC"
                    pathLength="100"
                    fill="none"
                    stroke-width="20"
                    :stroke-dasharray="
                      dashFor(current.activity.segments, index).dasharray
                    "
                    :stroke-dashoffset="
                      dashFor(current.activity.segments, index).dashoffset
                    "
                    :class="segmentClasses[index]"
                  />
                </svg>
                <div
                  class="absolute inset-x-0 bottom-0 grid justify-items-center gap-0.5"
                >
                  <p class="text-2xl font-semibold tracking-tight tabular-nums">
                    {{ current.activity.total }}
                  </p>
                  <p class="text-xs text-muted">Total orders</p>
                </div>
              </div>
              <ul class="grid gap-3">
                <li
                  v-for="(segment, index) in current.activity.segments"
                  :key="segment.label"
                  class="flex items-center justify-between gap-3"
                >
                  <span class="flex items-center gap-2">
                    <span
                      :class="['size-2.5 rounded-full', dotClasses[index]]"
                      aria-hidden="true"
                    />
                    {{ segment.label }}
                  </span>
                  <span class="flex items-center gap-2 tabular-nums">
                    <span class="font-medium text-ink">{{
                      segment.count
                    }}</span>
                    <span class="w-10 text-right text-muted"
                      >{{ segment.share }}%</span
                    >
                  </span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        <div class="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          <Card aria-labelledby="sellers-title" class="min-w-0">
            <div class="grid gap-5">
              <div class="grid gap-1">
                <h2 id="sellers-title" :class="sectionTitle">Best sellers</h2>
                <p :class="sectionCaption">
                  {{ labelOf(ranges, appliedRange) }},
                  {{ labelOf(categories, appliedCategory) }}
                </p>
              </div>
              <div
                role="region"
                aria-label="Best sellers"
                tabindex="0"
                :class="[
                  'overflow-x-auto rounded-lg border border-line',
                  focusRing,
                ]"
              >
                <table class="w-full border-collapse text-sm">
                  <thead>
                    <tr class="bg-subtle text-left text-muted">
                      <th
                        v-for="column in columns"
                        :key="column.key"
                        scope="col"
                        :aria-sort="ariaSort(column.key)"
                        :class="[
                          'px-4 py-2.5 font-medium whitespace-nowrap',
                          column.numeric ? 'text-right' : 'text-left',
                        ]"
                      >
                        <button
                          type="button"
                          :class="[
                            'inline-flex items-center gap-1 rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none',
                            column.key === sortKey && 'text-ink',
                            focusRing,
                          ]"
                          @click="sortBy(column.key, column.numeric)"
                        >
                          {{ column.label }}
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
                            <path :d="sortIcon(column.key)" />
                          </svg>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="seller in visibleSellers"
                      :key="seller.name"
                      class="border-t border-line transition-colors duration-150 ease-out hover:bg-subtle/50 motion-reduce:transition-none"
                    >
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-3">
                          <Avatar :name="seller.name" size="sm" />
                          <span
                            class="font-medium whitespace-nowrap text-ink"
                            >{{ seller.name }}</span
                          >
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <div class="grid">
                          <span class="whitespace-nowrap text-ink">{{
                            seller.product
                          }}</span>
                          <span class="text-xs text-muted">{{
                            labelOf(categories, seller.category)
                          }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-right">
                        <Badge
                          :variant="seller.change >= 0 ? 'success' : 'danger'"
                          :dot="false"
                          ><span>{{ seller.changeLabel }}</span></Badge
                        >
                      </td>
                      <td
                        class="px-4 py-3 text-right font-medium whitespace-nowrap text-ink tabular-nums"
                      >
                        {{ seller.totalLabel }}
                      </td>
                    </tr>
                    <tr
                      v-if="visibleSellers.length === 0"
                      class="border-t border-line"
                    >
                      <td colspan="4" class="px-4 py-8 text-center text-muted">
                        No sellers match your filters.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <Card aria-labelledby="regions-title">
            <div class="grid gap-5">
              <div class="grid gap-1">
                <h2 id="regions-title" :class="sectionTitle">
                  Orders by region
                </h2>
                <p :class="sectionCaption">{{ current.regions.caption }}</p>
              </div>
              <div class="flex items-baseline gap-2">
                <p class="text-3xl font-semibold tracking-tight tabular-nums">
                  {{ current.regions.total }}
                </p>
                <p class="text-sm text-muted">orders from 34 provinces</p>
              </div>
              <ul class="grid gap-4">
                <li
                  v-for="region in current.regions.items"
                  :key="region.name"
                  class="grid gap-2"
                >
                  <div class="flex items-center justify-between gap-3">
                    <span class="font-medium text-ink">{{ region.name }}</span>
                    <span class="text-muted tabular-nums"
                      >{{ region.share }}%</span
                    >
                  </div>
                  <Progress
                    :value="region.share"
                    :aria-label="`${region.name} share of orders`"
                    class="h-1.5!"
                  />
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </main>
    </div>
    <Toaster />
  </div>
</template>
