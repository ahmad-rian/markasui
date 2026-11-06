"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { AlertDialog } from "../../../components/alert-dialog/AlertDialog";
import { Badge } from "../../../components/badge/Badge";
import { Button } from "../../../components/button/Button";
import { Drawer } from "../../../components/drawer/Drawer";
import { DropdownMenu } from "../../../components/dropdown-menu/DropdownMenu";
import { Input } from "../../../components/input/Input";
import { Kbd } from "../../../components/kbd/Kbd";
import { Modal } from "../../../components/modal/Modal";
import { Select } from "../../../components/select/Select";
import { Switch } from "../../../components/switch/Switch";
import { Toaster, toast } from "../../../components/toast/Toast";
import { ToggleGroup } from "../../../components/toggle-group/ToggleGroup";

// prettier-ignore
const icons = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
  flow: "M3 4h6v6H3zM15 14h6v6h-6zM6 10v4a3 3 0 0 0 3 3h6",
  layout: "M4 3h16a1 1 0 0 1 1 1v5H3V4a1 1 0 0 1 1-1M3 13h8v8H4a1 1 0 0 1-1-1zM15 13h6v7a1 1 0 0 1-1 1h-5z",
  tool: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",
  store: "M3 9l1.5-5h15L21 9M3 9h18M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12v8h14v-8",
  more: "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
  dots: "M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  panel: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2M9 3v18",
  search: "m21 21-4.3-4.3M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16",
  plus: "M12 5v14M5 12h14",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
  trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  sliders: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
  chevron: "m6 9 6 6 6-6",
  menu: "M4 6h16M4 12h16M4 18h16",
  play: "M7 4v16l13-8z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M22 6l-10 7L2 6",
  chat: "M7.9 20A9 9 0 1 0 4 16.1L2 22z",
  sheets: "M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1M3 9h18M3 15h18M9 3v18",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2",
  notes: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5",
};
type IconName = keyof typeof icons;

/** Palet lokal untuk kartu, sampul, avatar, dan ikon integrasi. Hex hanya boleh di sini. */
// prettier-ignore
const palette = [
  "[--tpl-violet:#ece6fd] [--tpl-blue:#e0ebfb] [--tpl-peach:#fde6d6] [--tpl-sun:#e9a100]",
  "[--tpl-sky:#d6e4f0] [--tpl-sea:#7fa6c9] [--tpl-deep:#355f86] [--tpl-fog:#eef1f3] [--tpl-lilac:#d4c6f4] [--tpl-plum:#7b5fc9]",
  "[--tpl-dusk:#f3c0cf] [--tpl-stone:#9aa1a8] [--tpl-mint:#d3efdf] [--tpl-moss:#4d9873] [--tpl-amber:#f8d892] [--tpl-rust:#d8774b]",
  "[--tpl-a1:#cfdcf6] [--tpl-a2:#f7d3c0] [--tpl-a3:#d0eadb] [--tpl-a4:#e2d6f8] [--tpl-a5:#f4e3ad]",
  "[--tpl-red:#e5484d] [--tpl-indigo:#5b5bd6] [--tpl-green:#2f9e6a] [--tpl-orange:#ee7a2b] [--tpl-teal:#1a9a9a] [--tpl-glyph:#ffffff]",
  "dark:[--tpl-violet:#2a2440] dark:[--tpl-blue:#1d2a3c] dark:[--tpl-peach:#3a2a21] dark:[--tpl-sun:#f5c542]",
  "dark:[--tpl-sky:#2a4258] dark:[--tpl-sea:#2c5677] dark:[--tpl-deep:#132b42] dark:[--tpl-fog:#30363b] dark:[--tpl-lilac:#3f3468] dark:[--tpl-plum:#56409a]",
  "dark:[--tpl-dusk:#5b3448] dark:[--tpl-stone:#596066] dark:[--tpl-mint:#1f3d2f] dark:[--tpl-moss:#2f6e50] dark:[--tpl-amber:#5d4a1f] dark:[--tpl-rust:#8a4628]",
  "dark:[--tpl-a1:#2c3f5c] dark:[--tpl-a2:#5a3a2a] dark:[--tpl-a3:#284a37] dark:[--tpl-a4:#41345f] dark:[--tpl-a5:#53461f]",
  "dark:[--tpl-red:#d93f45] dark:[--tpl-indigo:#6e6ade] dark:[--tpl-green:#2a8f60] dark:[--tpl-orange:#e06e22] dark:[--tpl-teal:#178c8c] dark:[--tpl-glyph:#ffffff]",
].join(" ");

/** Sampul abstrak deterministik: gradien berlapis dari palet lokal. */
// prettier-ignore
const covers = [
  "bg-[image:radial-gradient(80%_60%_at_15%_100%,var(--tpl-deep),transparent_70%),radial-gradient(60%_50%_at_85%_15%,var(--tpl-fog),transparent_70%),linear-gradient(180deg,var(--tpl-sky),var(--tpl-sea))]",
  "bg-[image:radial-gradient(70%_70%_at_80%_20%,var(--tpl-dusk),transparent_65%),radial-gradient(90%_60%_at_10%_100%,var(--tpl-plum),transparent_70%),linear-gradient(160deg,var(--tpl-lilac),var(--tpl-plum))]",
  "bg-[image:radial-gradient(60%_60%_at_30%_30%,var(--tpl-fog),transparent_70%),radial-gradient(80%_70%_at_90%_100%,var(--tpl-stone),transparent_70%),linear-gradient(135deg,var(--tpl-fog),var(--tpl-stone))]",
  "bg-[image:radial-gradient(120%_60%_at_20%_110%,var(--tpl-moss),transparent_60%),radial-gradient(100%_50%_at_90%_100%,var(--tpl-mint),transparent_70%),linear-gradient(180deg,var(--tpl-fog),var(--tpl-mint))]",
  "bg-[image:radial-gradient(40%_45%_at_70%_40%,var(--tpl-amber),transparent_70%),linear-gradient(180deg,var(--tpl-peach),var(--tpl-rust))]",
  "bg-[image:radial-gradient(70%_60%_at_20%_20%,var(--tpl-dusk),transparent_70%),linear-gradient(200deg,var(--tpl-lilac),var(--tpl-sea))]",
  "bg-[image:radial-gradient(90%_50%_at_50%_100%,var(--tpl-sea),transparent_70%),linear-gradient(180deg,var(--tpl-fog),var(--tpl-sky))]",
];
// prettier-ignore
const folderTones = [
  { bg: "bg-(--tpl-violet)", ring: "ring-(--tpl-violet)" },
  { bg: "bg-(--tpl-blue)", ring: "ring-(--tpl-blue)" },
  { bg: "bg-(--tpl-peach)", ring: "ring-(--tpl-peach)" },
];
// prettier-ignore
const avatarTones = ["bg-(--tpl-a1)", "bg-(--tpl-a2)", "bg-(--tpl-a3)", "bg-(--tpl-a4)", "bg-(--tpl-a5)"];
// prettier-ignore
const apps = {
  mail: { label: "Mail", tone: "bg-(--tpl-red)" }, chat: { label: "Chat", tone: "bg-(--tpl-indigo)" },
  sheets: { label: "Sheets", tone: "bg-(--tpl-green)" }, calendar: { label: "Calendar", tone: "bg-(--tpl-orange)" },
  notes: { label: "Notes", tone: "bg-(--tpl-teal)" },
};
type AppId = keyof typeof apps;
const appIds = Object.keys(apps) as AppId[];

// prettier-ignore
const pages = {
  home: { label: "Home", title: "Good morning, Andi", icon: "home" },
  workflows: { label: "My Workflows", title: "My Workflows", icon: "flow" },
  templates: { label: "Templates", title: "Templates", icon: "layout" },
  tools: { label: "Tools", title: "Tools", icon: "tool" },
  knowledge: { label: "Knowledge Base", title: "Knowledge Base", icon: "book" },
  marketplace: { label: "Marketplace", title: "Marketplace", icon: "store" },
  notifications: { label: "Notifications", title: "Notifications", icon: "bell" },
  trash: { label: "Trash", title: "Trash", icon: "trash" },
  settings: { label: "Settings", title: "Settings", icon: "sliders" },
} satisfies Record<string, { label: string; title: string; icon: IconName }>;
type PageId = keyof typeof pages;
const DEFAULT_PAGE: PageId = "workflows";
const TITLE_ID = "alur-page-title";
// prettier-ignore
const mainNav: PageId[] = ["home", "workflows", "templates", "tools", "knowledge", "marketplace"];
const moreNav: PageId[] = ["trash", "settings"];
const DETAIL_ID = "alur-detail";
const RENAME_ID = "alur-rename";
const DELETE_ID = "alur-delete";
const RUN_COST = 5;

type Status = "active" | "paused" | "draft";
type Workflow = {
  id: string;
  name: string;
  status: Status;
  days: number;
  runs: number;
  cover: number;
  folder: string;
  tags: string[];
  apps: AppId[];
  team: string[];
};
type Folder = {
  id: string;
  name: string;
  items: number;
  tone: number;
  team: string[];
};
// prettier-ignore
const initialWorkflows: Workflow[] = [
  { id: "w1", name: "Email Responder", status: "active", days: 1, runs: 12, cover: 0, folder: "f1", tags: ["Productivity", "Clients"], apps: ["mail", "chat", "notes"], team: ["Andi Wijaya", "Rina Kusuma", "Budi Santoso"] },
  { id: "w2", name: "Mental Health Tracker", status: "active", days: 2, runs: 4, cover: 1, folder: "f2", tags: ["Personal"], apps: ["notes", "calendar"], team: ["Sari Wulandari", "Dewi Lestari"] },
  { id: "w3", name: "Budgeting", status: "paused", days: 3, runs: 8, cover: 2, folder: "f3", tags: ["Finance", "Personal"], apps: ["sheets", "mail"], team: ["Agus Pratama", "Dewi Lestari", "Fajar Nugroho"] },
  { id: "w4", name: "Habit Tracker", status: "draft", days: 6, runs: 2, cover: 3, folder: "f2", tags: ["Personal", "Productivity"], apps: ["calendar"], team: ["Maya Putri"] },
  { id: "w5", name: "Idea Vault", status: "active", days: 12, runs: 6, cover: 4, folder: "f2", tags: ["Productivity"], apps: ["notes", "chat"], team: ["Rina Kusuma", "Hendra Gunawan"] },
  { id: "w6", name: "Package Tracker", status: "paused", days: 20, runs: 3, cover: 5, folder: "f1", tags: ["Personal"], apps: ["mail", "sheets"], team: ["Budi Santoso"] },
  { id: "w7", name: "Client Onboarding", status: "active", days: 45, runs: 9, cover: 6, folder: "f3", tags: ["Clients", "Finance"], apps: ["mail", "calendar", "sheets", "chat"], team: ["Andi Wijaya", "Maya Putri", "Yusuf Hidayat"] },
];
// prettier-ignore
const initialTrash: Workflow[] = [
  { id: "w8", name: "Newsletter Digest", status: "paused", days: 60, runs: 0, cover: 2, folder: "f2", tags: ["Productivity"], apps: ["mail"], team: ["Andi Wijaya"] },
];
// prettier-ignore
const initialFolders: Folder[] = [
  { id: "f1", name: "Task Automation", items: 5, tone: 0, team: ["Andi Wijaya", "Rina Kusuma", "Budi Santoso"] },
  { id: "f2", name: "Notes & Highlights", items: 17, tone: 1, team: ["Sari Wulandari", "Maya Putri"] },
  { id: "f3", name: "Billing & Invoicing", items: 9, tone: 2, team: ["Dewi Lestari", "Agus Pratama", "Fajar Nugroho"] },
];
const INITIAL_FAVOURITES = ["w1", "w3", "w2", "w7"];
const statusLabels: Record<Status, string> = {
  active: "Active",
  paused: "Paused",
  draft: "Draft",
};
const tags = ["Productivity", "Finance", "Personal", "Clients"];
const option = (label: string, value = label) => ({ label, value });
// prettier-ignore
const filterDefs = [
  { key: "status", label: "Status", items: [option("All", "all"), option("Active", "active"), option("Paused", "paused"), option("Draft", "draft")] },
  { key: "app", label: "Integrations", items: [option("Any", "any"), ...appIds.map((id) => option(apps[id].label, id))] },
  { key: "date", label: "Date", items: [option("Any", "any"), option("Last 3 days", "3"), option("Last 7 days", "7"), option("Last 30 days", "30")] },
  { key: "tag", label: "Tags", items: [option("All", "all"), ...tags.map((tag) => option(tag))] },
] as const;
type FilterKey = (typeof filterDefs)[number]["key"];
type Filters = Record<FilterKey, string>;
const DEFAULT_FILTERS: Filters = {
  status: "all",
  app: "any",
  date: "any",
  tag: "all",
};
// prettier-ignore
const workflowMenu = [option("Rename", "rename"), option("Duplicate", "duplicate"), { separator: true as const }, { label: "Delete", value: "delete", danger: true }];
// prettier-ignore
const folderMenu = [option("Rename", "rename"), { separator: true as const }, { label: "Delete", value: "delete", danger: true }];

/* Home */
// prettier-ignore
const runs = [
  { id: "r1", workflow: "Email Responder", time: "09:12", duration: "14 s", ok: true },
  { id: "r2", workflow: "Budgeting", time: "08:40", duration: "6 s", ok: false },
  { id: "r3", workflow: "Idea Vault", time: "08:05", duration: "9 s", ok: true },
  { id: "r4", workflow: "Client Onboarding", time: "Yesterday", duration: "32 s", ok: true },
  { id: "r5", workflow: "Package Tracker", time: "Yesterday", duration: "11 s", ok: false },
  { id: "r6", workflow: "Mental Health Tracker", time: "Nov 3", duration: "5 s", ok: true },
];
// prettier-ignore
const runFilters = [option("All runs", "all"), option("Succeeded", "ok"), option("Failed", "failed")];

/* Templates */
// prettier-ignore
const templates = [
  { id: "t1", name: "Invoice Chaser", tag: "Finance", cover: 4, apps: ["mail", "sheets"] as AppId[], text: "Reminds clients about unpaid invoices every Monday." },
  { id: "t2", name: "Meeting Notes", tag: "Productivity", cover: 6, apps: ["calendar", "notes"] as AppId[], text: "Turns every calendar meeting into a shared note." },
  { id: "t3", name: "Weekly Review", tag: "Personal", cover: 1, apps: ["notes"] as AppId[], text: "Collects your highlights into one Friday summary." },
  { id: "t4", name: "Lead Router", tag: "Clients", cover: 0, apps: ["mail", "chat"] as AppId[], text: "Sends new leads to the right teammate in chat." },
  { id: "t5", name: "Expense Splitter", tag: "Finance", cover: 2, apps: ["sheets", "chat"] as AppId[], text: "Splits shared bills and posts who owes what." },
  { id: "t6", name: "Reading List", tag: "Personal", cover: 3, apps: ["notes", "mail"] as AppId[], text: "Saves links from your inbox to a reading list." },
];
const templateFilters = [
  option("All", "all"),
  ...tags.map((tag) => option(tag)),
];

/* Tools */
// prettier-ignore
const tools: { id: AppId; text: string }[] = [
  { id: "mail", text: "Send and read email from any inbox" }, { id: "chat", text: "Post messages to team channels" },
  { id: "sheets", text: "Read and write spreadsheet rows" }, { id: "calendar", text: "Create events and reminders" },
  { id: "notes", text: "Save highlights and meeting notes" },
];
const DEFAULT_TOOLS: AppId[] = ["mail", "chat", "sheets", "notes"];

/* Knowledge Base */
// prettier-ignore
const articles = [
  { title: "Build your first workflow", category: "Getting started", minutes: 4 },
  { title: "Trigger a workflow from email", category: "Mail", minutes: 6 },
  { title: "Use variables between steps", category: "Advanced", minutes: 8 },
  { title: "Schedule runs with Calendar", category: "Calendar", minutes: 5 },
  { title: "Share folders with your team", category: "Collaboration", minutes: 3 },
  { title: "Understand credit usage", category: "Billing", minutes: 4 },
];

/* Marketplace */
// prettier-ignore
const addons = [
  { id: "m1", name: "Smart Summaries", maker: "Alur Labs", price: 0, cover: 1 },
  { id: "m2", name: "Invoice Parser", maker: "Kas Kecil", price: 49000, cover: 4 },
  { id: "m3", name: "Sentiment Check", maker: "Rasa Data", price: 29000, cover: 5 },
  { id: "m4", name: "Daily Digest", maker: "Alur Labs", price: 0, cover: 6 },
  { id: "m5", name: "Receipt Scanner", maker: "Struk Pintar", price: 59000, cover: 2 },
  { id: "m6", name: "Lead Enricher", maker: "Prospek", price: 99000, cover: 0 },
];

/* Notifications */
// prettier-ignore
const notifications = [
  { id: "n1", text: "Email Responder finished 12 runs this morning", time: "09:12" },
  { id: "n2", text: "Rina Kusuma commented on Client Onboarding", time: "08:51" },
  { id: "n3", text: "Budgeting paused after a Sheets error", time: "08:40" },
  { id: "n4", text: "Your credits renew on December 1", time: "Yesterday" },
  { id: "n5", text: "Budi Santoso shared Notes & Highlights with you", time: "Nov 3" },
  { id: "n6", text: "Idea Vault saved 6 new notes", time: "Nov 2" },
];
const INITIAL_READ = ["n5", "n6"];

/* Settings */
// prettier-ignore
const prefOptions = [
  { key: "summary", label: "Email summaries", text: "A short report after every run" },
  { key: "failures", label: "Run failure alerts", text: "Tell me when a workflow fails" },
  { key: "digest", label: "Weekly digest", text: "Usage and credits every Monday" },
];
const DEFAULT_PREFS = ["summary", "failures"];
const DEFAULT_WORKSPACE = "Alur Studio";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const navItem = `flex h-9 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors duration-150 ${focusRing}`;
const navActive = "bg-primary-soft text-ink";
const navIdle = "text-muted hover:bg-subtle hover:text-ink";
const iconButton = `inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink ${focusRing}`;
const navBadge =
  "ml-auto rounded-full bg-danger px-1.5 text-[11px] leading-5 font-semibold text-surface tabular-nums";
const countBadge =
  "rounded-full bg-subtle px-2 py-0.5 text-xs font-medium text-muted tabular-nums";
const mono = "font-mono text-[15px] font-semibold tracking-tight";
const pill =
  "shrink-0 [&>button]:h-8 [&>button]:gap-1 [&>button]:rounded-full [&>button]:px-3 [&>button]:text-[13px] [&>button>svg:last-child]:size-3.5";
const kebab =
  "relative z-10 [&>button]:size-8 [&>button]:rounded-full [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-0 [&>button]:text-muted [&>button]:hover:bg-ink/5 [&>button]:hover:text-ink [&>button>svg:last-child]:hidden";
const selectable = `text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary`;
const card =
  "group relative flex flex-col rounded-2xl border border-line bg-surface p-1.5 transition-shadow duration-150 hover:shadow-overlay";
const panel = "rounded-2xl border border-line bg-surface p-5";
const tile = "rounded-2xl border border-line bg-surface px-4 py-3";
const gridCols = "grid gap-4 sm:grid-cols-2 xl:grid-cols-3";
const avatarBase =
  "inline-flex size-7 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold tracking-tighter text-ink ring-2";
const appBase =
  "inline-flex size-6 items-center justify-center rounded-full text-(--tpl-glyph) ring-2 ring-surface";
const empty =
  "rounded-2xl border border-dashed border-line p-6 text-center text-sm text-muted";
const starOn = "fill-(--tpl-sun) stroke-(--tpl-sun)";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const formatNumber = (value: number) => value.toLocaleString("id-ID");
const rupiah = (value: number) => `Rp ${formatNumber(value)}`;
const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;
const toggleIn = <T,>(list: T[], item: T) =>
  list.includes(item)
    ? list.filter((entry) => entry !== item)
    : [...list, item];
const ago = (days: number) =>
  days === 0 ? "Just now" : days === 1 ? "1 day ago" : `${days} days ago`;
const metaOf = (workflow: Workflow) =>
  `${ago(workflow.days)} · ${statusLabels[workflow.status]}`;
/** Huruf pertama kata pertama dan terakhir. */
function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const picked = words.length > 1 ? [words[0]!, words.at(-1)!] : words;
  return picked
    .map((word) => Array.from(word)[0] ?? "")
    .join("")
    .toUpperCase();
}
/** Warna avatar tetap untuk nama yang sama. */
const avatarTone = (name: string) =>
  avatarTones[
    Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0) %
      avatarTones.length
  ];
const appNames = (list: AppId[]) => list.map((id) => apps[id].label).join(", ");

/** Buka dialog native setelah menu pemicu selesai menutup. */
function openDialog(id: string) {
  requestAnimationFrame(() => {
    const dialog = document.getElementById(id);
    if (!(dialog instanceof HTMLDialogElement) || dialog.open) return;
    dialog.returnValue = "";
    dialog.showModal();
  });
}

/** Halaman aktif disimpan di hash URL supaya bisa dibagikan dan tombol Back bekerja. */
function readHash(): PageId {
  const id = window.location.hash.slice(1);
  return id in pages ? (id as PageId) : DEFAULT_PAGE;
}

function subscribeHash(onChange: () => void) {
  const handle = () => {
    onChange();
    document.getElementById(TITLE_ID)?.focus();
  };
  window.addEventListener("hashchange", handle);
  return () => window.removeEventListener("hashchange", handle);
}

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[name]} />
    </svg>
  );
}

function Avatars({ team, ring }: { team: string[]; ring: string }) {
  return (
    <div className="flex -space-x-1">
      {team.map((name) => (
        <span
          key={name}
          role="img"
          aria-label={name}
          className={cx(avatarBase, avatarTone(name), ring)}
        >
          {initials(name)}
        </span>
      ))}
    </div>
  );
}

function AppIcons({ list }: { list: AppId[] }) {
  return (
    <div
      role="img"
      aria-label={`Integrations: ${appNames(list)}`}
      className="flex -space-x-1"
    >
      {list.map((id) => (
        <span key={id} className={cx(appBase, apps[id].tone)}>
          <Icon name={id} className="size-3.5" />
        </span>
      ))}
    </div>
  );
}

function SectionTitle({
  id,
  title,
  count,
}: {
  id: string;
  title: string;
  count: number;
}) {
  return (
    <h2 id={id} className="flex items-center gap-2 text-base font-semibold">
      {title}
      <span className={countBadge}>{count}</span>
    </h2>
  );
}

function Tiles({ items }: { items: [string, ReactNode][] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(([label, value]) => (
        <div key={label} className={tile}>
          <dt className="text-xs text-muted">{label}</dt>
          <dd className="mt-1 text-xl font-semibold tracking-tight tabular-nums">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

type HomeProps = {
  workflows: Workflow[];
  credits: number;
  unread: number;
  onOpen: (id: string) => void;
};

function HomePage({ workflows, credits, unread, onOpen }: HomeProps) {
  const [filter, setFilter] = useState("all");
  const recent = [...workflows].sort((a, b) => a.days - b.days).slice(0, 3);
  const visibleRuns = runs.filter(
    (run) => filter === "all" || run.ok === (filter === "ok"),
  );
  return (
    <div className="grid gap-8">
      <Tiles
        items={[
          [
            "Active workflows",
            workflows.filter((item) => item.status === "active").length,
          ],
          ["Runs today", workflows.reduce((sum, item) => sum + item.runs, 0)],
          ["Credits available", formatNumber(credits)],
          ["Unread notifications", unread],
        ]}
      />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        <section aria-labelledby="alur-recent-title" className="grid gap-4">
          <h2 id="alur-recent-title" className="text-base font-semibold">
            Recently edited
          </h2>
          <ul role="list" className="grid gap-3 sm:grid-cols-3 xl:grid-cols-3">
            {recent.map((item) => (
              <li key={item.id} className={card}>
                <div
                  aria-hidden="true"
                  className={cx("h-24 rounded-xl", covers[item.cover])}
                />
                <div className="grid gap-0.5 px-2 pt-2.5 pb-1.5">
                  <h3 className={cx(mono, "truncate")}>
                    <button
                      type="button"
                      className={selectable}
                      onClick={() => onOpen(item.id)}
                    >
                      {item.name}
                    </button>
                  </h3>
                  <p className="text-xs text-muted">{metaOf(item)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="alur-runs-title" className={panel}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 id="alur-runs-title" className="text-base font-semibold">
                Recent runs
              </h2>
              <p className="text-sm text-muted">
                {plural(visibleRuns.length, "run")}
              </p>
            </div>
            <ToggleGroup
              label="Filter runs"
              items={runFilters}
              value={filter}
              onValueChange={(value: string) => setFilter(value || filter)}
            />
          </div>
          <ul className="divide-y divide-line">
            {visibleRuns.map((run) => (
              <li
                key={run.id}
                data-run={run.id}
                className="flex items-center gap-3 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{run.workflow}</p>
                  <p className="text-xs text-muted">
                    {run.time}, {run.duration}
                  </p>
                </div>
                <Badge variant={run.ok ? "success" : "danger"}>
                  {run.ok ? "Succeeded" : "Failed"}
                </Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function TemplatesPage({ onUse }: { onUse: (id: string) => void }) {
  const [filter, setFilter] = useState("all");
  const visible = templates.filter(
    (item) => filter === "all" || item.tag === filter,
  );
  return (
    <div className="grid gap-6">
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {plural(visible.length, "template")}
        </p>
        <ToggleGroup
          label="Filter templates"
          className="max-w-full overflow-x-auto"
          items={templateFilters}
          value={filter}
          onValueChange={(value: string) => setFilter(value || filter)}
        />
      </div>
      <ul role="list" className={gridCols}>
        {visible.map((item) => (
          <li key={item.id} data-template={item.id} className={card}>
            <div
              aria-hidden="true"
              className={cx("h-28 rounded-xl", covers[item.cover])}
            />
            <div className="grid flex-1 gap-3 px-2.5 pt-3 pb-2">
              <div className="grid gap-1">
                <p className="text-xs text-muted">{item.tag}</p>
                <h2 className={mono}>{item.name}</h2>
                <p className="text-sm text-muted">{item.text}</p>
              </div>
              <div className="mt-auto flex items-center justify-between gap-2">
                <AppIcons list={item.apps} />
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onUse(item.id)}
                >
                  Use template
                  <span className="sr-only">{item.name}</span>
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ToolsPage() {
  const [connected, setConnected] = useState(DEFAULT_TOOLS);
  return (
    <section aria-labelledby="alur-tools-title" className={panel}>
      <h2 id="alur-tools-title" className="text-base font-semibold">
        Connected tools
      </h2>
      <p className="text-sm text-muted">
        {connected.length} of {tools.length} connected
      </p>
      <ul className="mt-2 divide-y divide-line">
        {tools.map((tool) => (
          <li key={tool.id} className="flex items-center gap-4 py-4">
            <span className={cx(appBase, "size-10 ring-0", apps[tool.id].tone)}>
              <Icon name={tool.id} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{apps[tool.id].label}</p>
              <p className="text-sm text-muted">{tool.text}</p>
            </div>
            <Switch
              aria-label={apps[tool.id].label}
              checked={connected.includes(tool.id)}
              onCheckedChange={() => setConnected(toggleIn(connected, tool.id))}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function KnowledgePage() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = articles.filter((item) =>
    `${item.title} ${item.category}`.toLowerCase().includes(needle),
  );
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-full sm:w-80">
          <Input
            type="search"
            aria-label="Search articles"
            placeholder="Search articles"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <p className="text-sm text-muted">
          {visible.length} of {articles.length} articles
        </p>
      </div>
      {visible.length > 0 ? (
        <ul role="list" className={gridCols}>
          {visible.map((item) => (
            <li key={item.title} className={cx(panel, "grid gap-2")}>
              <p className="text-xs text-muted">{item.category}</p>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-muted">{item.minutes} min read</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={empty}>No articles match your search.</p>
      )}
    </div>
  );
}

function MarketplacePage() {
  const [installed, setInstalled] = useState(["m1"]);
  const toggle = (id: string, name: string) => {
    const adding = !installed.includes(id);
    setInstalled(toggleIn(installed, id));
    toast({
      title: adding ? "Add-on installed" : "Add-on removed",
      description: name,
      variant: adding ? "success" : "default",
    });
  };
  return (
    <div className="grid gap-6">
      <p className="text-sm text-muted">{installed.length} installed</p>
      <ul role="list" className={gridCols}>
        {addons.map((item) => {
          const on = installed.includes(item.id);
          return (
            <li key={item.id} className={cx(card, "flex-row gap-3 p-3")}>
              <div
                aria-hidden="true"
                className={cx(
                  "size-14 shrink-0 rounded-xl",
                  covers[item.cover],
                )}
              />
              <div className="min-w-0 flex-1">
                <h2 className={cx(mono, "truncate")}>{item.name}</h2>
                <p className="truncate text-xs text-muted">{item.maker}</p>
                <p className="mt-1 text-sm font-medium tabular-nums">
                  {item.price ? `${rupiah(item.price)}/month` : "Free"}
                </p>
              </div>
              <Button
                size="sm"
                variant={on ? "secondary" : "primary"}
                className="self-center"
                onClick={() => toggle(item.id, item.name)}
              >
                {on ? "Installed" : "Install"}
                <span className="sr-only">{item.name}</span>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type NotificationsProps = { read: string[]; setRead: (ids: string[]) => void };

function NotificationsPage({ read, setRead }: NotificationsProps) {
  const unread = notifications.length - read.length;
  return (
    <section aria-labelledby="alur-inbox-title" className={panel}>
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="alur-inbox-title" className="text-base font-semibold">
            Inbox
          </h2>
          <p className="text-sm text-muted">{unread} unread</p>
        </div>
        <Button
          size="sm"
          variant="secondary"
          disabled={unread === 0}
          onClick={() => setRead(notifications.map((item) => item.id))}
        >
          Mark all as read
        </Button>
      </div>
      <ul className="mt-2 divide-y divide-line">
        {notifications.map((item) => {
          const isRead = read.includes(item.id);
          return (
            <li
              key={item.id}
              data-unread={!isRead}
              className="flex items-center gap-3 py-3"
            >
              <span
                aria-hidden="true"
                className={cx(
                  "size-2 shrink-0 rounded-full",
                  isRead ? "bg-line" : "bg-danger",
                )}
              />
              <div className="min-w-0 flex-1">
                <p className={cx("text-sm", !isRead && "font-medium")}>
                  {item.text}
                </p>
                <p className="text-xs text-muted">{item.time}</p>
              </div>
              {!isRead && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setRead([...read, item.id])}
                >
                  Mark read
                  <span className="sr-only">: {item.text}</span>
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function TrashPage({
  trash,
  onRestore,
}: {
  trash: Workflow[];
  onRestore: (id: string) => void;
}) {
  return (
    <section aria-labelledby="alur-trash-title" className={panel}>
      <h2 id="alur-trash-title" className="text-base font-semibold">
        Deleted workflows
      </h2>
      <p className="text-sm text-muted">{plural(trash.length, "item")}</p>
      {trash.length > 0 ? (
        <ul className="mt-2 divide-y divide-line">
          {trash.map((item) => (
            <li
              key={item.id}
              data-trash={item.id}
              className="flex items-center gap-3 py-3"
            >
              <span
                aria-hidden="true"
                className={cx("size-9 shrink-0 rounded-lg", covers[item.cover])}
              />
              <p className={cx(mono, "min-w-0 flex-1 truncate")}>{item.name}</p>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onRestore(item.id)}
              >
                Restore
                <span className="sr-only">{item.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={cx(empty, "mt-4")}>Trash is empty.</p>
      )}
    </section>
  );
}

function SettingsPage() {
  const [workspace, setWorkspace] = useState(DEFAULT_WORKSPACE);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  return (
    <form
      className={cx(panel, "grid max-w-2xl gap-5")}
      onSubmit={(event) => {
        event.preventDefault();
        toast({
          title: "Settings saved",
          description: `${workspace}, ${plural(prefs.length, "alert")} on`,
          variant: "success",
        });
      }}
    >
      <Input
        label="Workspace name"
        name="workspace"
        value={workspace}
        onChange={(event) => setWorkspace(event.target.value)}
      />
      <ul className="divide-y divide-line">
        {prefOptions.map((item) => (
          <li
            key={item.key}
            className="flex items-center justify-between gap-4 py-3"
          >
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted">{item.text}</p>
            </div>
            <Switch
              aria-label={item.label}
              checked={prefs.includes(item.key)}
              onCheckedChange={() => setPrefs(toggleIn(prefs, item.key))}
            />
          </li>
        ))}
      </ul>
      <div className="flex justify-end">
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}

export default function Alur() {
  const page = useSyncExternalStore(
    subscribeHash,
    readHash,
    () => DEFAULT_PAGE,
  );
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const [folders, setFolders] = useState(initialFolders);
  const [trash, setTrash] = useState(initialTrash);
  const [favourites, setFavourites] = useState(INITIAL_FAVOURITES);
  const [read, setRead] = useState(INITIAL_READ);
  const [credits, setCredits] = useState(2450);
  const [nextId, setNextId] = useState(9);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedId, setSelectedId] = useState("w1");
  const [target, setTarget] = useState({ kind: "workflow", id: "w1" });
  const [draftName, setDraftName] = useState("");
  const [draft, setDraft] = useState({
    name: "",
    folder: "f1",
    tag: "Productivity",
    status: "draft",
  });

  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "f")
        return;
      event.preventDefault();
      document.getElementById("alur-search")?.focus();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  // Halaman yang sama tidak memicu hashchange, jadi fokus judul langsung.
  const go = (id: PageId) =>
    id === page
      ? document.getElementById(TITLE_ID)?.focus()
      : window.location.assign(`#${id}`);
  const unread = notifications.length - read.length;
  const needle = query.trim().toLowerCase();
  const matches = (name: string) => name.toLowerCase().includes(needle);
  const visibleFolders = folders.filter((item) => matches(item.name));
  const visible = workflows.filter(
    (item) =>
      matches(item.name) &&
      (filters.status === "all" || item.status === filters.status) &&
      (filters.app === "any" || item.apps.includes(filters.app as AppId)) &&
      (filters.date === "any" || item.days <= Number(filters.date)) &&
      (filters.tag === "all" || item.tags.includes(filters.tag)),
  );
  const detail = workflows.find((item) => item.id === selectedId);
  const deleting =
    target.kind === "folder"
      ? folders.find((item) => item.id === target.id)?.name
      : workflows.find((item) => item.id === target.id)?.name;
  const favouriteList = favourites
    .map((id) => workflows.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  const openDetail = (id: string) => {
    setSelectedId(id);
    openDialog(DETAIL_ID);
  };
  const toggleFavourite = (id: string) =>
    setFavourites(toggleIn(favourites, id));
  const createWorkflow = (fields: Partial<Workflow>) => {
    const created: Workflow = {
      name: "Untitled workflow",
      status: "draft",
      days: 0,
      runs: 0,
      cover: nextId % covers.length,
      folder: "f1",
      tags: [],
      apps: ["mail"],
      team: ["Andi Wijaya"],
      ...fields,
      id: `w${nextId}`,
    };
    setNextId(nextId + 1);
    return created;
  };
  const onMenu = (kind: string, id: string, action: string) => {
    const source = workflows.find((item) => item.id === id);
    setTarget({ kind, id });
    if (action === "rename") {
      const list = kind === "folder" ? folders : workflows;
      setDraftName(list.find((item) => item.id === id)?.name ?? "");
      return openDialog(RENAME_ID);
    }
    if (action === "delete") return openDialog(DELETE_ID);
    if (!source) return;
    const copy = createWorkflow({
      ...source,
      name: `${source.name} copy`,
      status: "draft",
      days: 0,
      runs: 0,
    });
    const index = workflows.indexOf(source);
    setWorkflows([
      ...workflows.slice(0, index + 1),
      copy,
      ...workflows.slice(index + 1),
    ]);
    toast({ title: "Workflow duplicated", description: copy.name });
  };
  const onRenameClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    const dialog = event.currentTarget;
    const name = draftName.trim();
    if (dialog.returnValue === "save" && name) {
      const rename = <T extends { id: string; name: string }>(list: T[]) =>
        list.map((item) => (item.id === target.id ? { ...item, name } : item));
      if (target.kind === "folder") setFolders(rename(folders));
      else setWorkflows(rename(workflows));
      toast({ title: "Renamed", description: name, variant: "success" });
    }
    dialog.returnValue = "";
  };
  const onDelete = () => {
    if (target.kind === "folder") {
      setFolders(folders.filter((item) => item.id !== target.id));
      return toast({ title: "Folder deleted", description: deleting });
    }
    const removed = workflows.find((item) => item.id === target.id);
    if (!removed) return;
    setWorkflows(workflows.filter((item) => item.id !== target.id));
    setFavourites(favourites.filter((id) => id !== target.id));
    setTrash([removed, ...trash]);
    toast({ title: "Moved to Trash", description: removed.name });
  };
  const onCreateClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    const dialog = event.currentTarget;
    if (dialog.returnValue === "create") {
      const created = createWorkflow({
        name: draft.name.trim() || "Untitled workflow",
        status: draft.status as Status,
        folder: draft.folder,
        tags: [draft.tag],
      });
      setWorkflows([created, ...workflows]);
      toast({
        title: "Workflow created",
        description: created.name,
        variant: "success",
      });
    }
    dialog.returnValue = "";
  };
  const applyTemplate = (id: string) => {
    const source = templates.find((item) => item.id === id)!;
    const created = createWorkflow({
      name: source.name,
      cover: source.cover,
      tags: [source.tag],
      apps: source.apps,
    });
    setWorkflows([created, ...workflows]);
    toast({
      title: "Template added",
      description: `${source.name} is in My Workflows`,
      variant: "success",
    });
  };
  const restore = (id: string) => {
    const item = trash.find((entry) => entry.id === id)!;
    setTrash(trash.filter((entry) => entry.id !== id));
    setWorkflows([...workflows, item]);
    toast({ title: "Restored", description: item.name, variant: "success" });
  };
  const setActive = (on: boolean) => {
    if (!detail) return;
    setWorkflows(
      workflows.map((item) =>
        item.id === detail.id
          ? { ...item, status: on ? "active" : "paused" }
          : item,
      ),
    );
    toast({
      title: on ? "Workflow activated" : "Workflow paused",
      description: detail.name,
    });
  };
  const runNow = () => {
    if (!detail) return;
    setWorkflows(
      workflows.map((item) =>
        item.id === detail.id ? { ...item, runs: item.runs + 1 } : item,
      ),
    );
    setCredits(credits - RUN_COST);
    toast({
      title: "Run started",
      description: `${detail.name}, ${RUN_COST} credits`,
    });
  };
  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setQuery("");
  };

  const navButton = (id: PageId, extra?: ReactNode) => (
    <button
      key={id}
      type="submit"
      aria-current={page === id ? "page" : undefined}
      className={cx(navItem, page === id ? navActive : navIdle)}
      onClick={() => go(id)}
    >
      <Icon name={pages[id].icon} className="size-4.5 shrink-0" />
      <span className="truncate">{pages[id].label}</span>
      {extra}
    </button>
  );
  // Isi sidebar dipakai di aside desktop dan Drawer menu mobile; form dialog menutup Drawer saat item dipilih.
  const sideNav = (
    <form method="dialog" className="grid gap-6">
      <nav aria-label="Main" className="grid gap-0.5">
        {mainNav.map((id) => navButton(id))}
        <details className="group/more">
          <summary
            className={cx(
              navItem,
              navIdle,
              "cursor-pointer list-none [&::-webkit-details-marker]:hidden",
            )}
          >
            <Icon name="more" className="size-4.5 shrink-0" />
            More
            <Icon
              name="chevron"
              className="ml-auto size-4 transition-transform duration-150 group-open/more:rotate-180"
            />
          </summary>
          <div className="mt-0.5 grid gap-0.5 pl-4">
            {moreNav.map((id) => navButton(id))}
          </div>
        </details>
        <hr className="my-2 border-line" />
        {navButton(
          "notifications",
          unread > 0 && (
            <span className={navBadge}>
              {unread}
              <span className="sr-only"> unread</span>
            </span>
          ),
        )}
      </nav>
      <div className="grid gap-1">
        <h2 className="px-3 text-xs font-medium text-muted">Favourites</h2>
        {favouriteList.length === 0 && (
          <p className="px-3 text-xs text-muted">Star a workflow to pin it.</p>
        )}
        {favouriteList.map((item) => (
          <button
            key={item.id}
            type="submit"
            className={cx(navItem, "text-ink hover:bg-subtle")}
            onClick={() => openDetail(item.id)}
          >
            <span
              aria-hidden="true"
              className={cx("size-4.5 shrink-0 rounded-md", covers[item.cover])}
            />
            <span className="truncate">{item.name}</span>
            <Icon name="star" className={cx("ml-auto size-3.5", starOn)} />
          </button>
        ))}
      </div>
    </form>
  );

  const workflowsPage = (
    <div className="grid gap-10">
      <section aria-labelledby="alur-folders-title" className="grid gap-4">
        <SectionTitle
          id="alur-folders-title"
          title="Folders"
          count={visibleFolders.length}
        />
        {visibleFolders.length > 0 ? (
          <ul role="list" className={gridCols}>
            {visibleFolders.map((folder) => {
              const tone = folderTones[folder.tone]!;
              return (
                <li key={folder.id} data-folder={folder.id}>
                  <div
                    aria-hidden="true"
                    className={cx(
                      "h-4 w-32 rounded-t-xl [clip-path:polygon(0_0,82%_0,100%_100%,0_100%)]",
                      tone.bg,
                    )}
                  />
                  <div
                    className={cx(
                      "flex h-40 flex-col justify-between rounded-2xl rounded-tl-none p-4",
                      tone.bg,
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={cx(mono, "pt-1")}>{folder.name}</h3>
                      <DropdownMenu
                        className={kebab}
                        items={folderMenu}
                        onSelect={(value) => onMenu("folder", folder.id, value)}
                        trigger={
                          <>
                            <Icon name="dots" className="size-4.5" />
                            <span className="sr-only">
                              Options for {folder.name}
                            </span>
                          </>
                        }
                      />
                    </div>
                    <div className="flex items-end justify-between gap-2">
                      <Avatars team={folder.team} ring={tone.ring} />
                      <p className="text-sm text-muted">{folder.items} Items</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={empty}>No folders match your search.</p>
        )}
      </section>
      <section aria-labelledby="alur-workflows-title" className="grid gap-4">
        <SectionTitle
          id="alur-workflows-title"
          title="Workflows"
          count={visible.length}
        />
        {visible.length > 0 ? (
          <ul role="list" className={gridCols}>
            {visible.map((item) => {
              const starred = favourites.includes(item.id);
              return (
                <li key={item.id} data-workflow={item.id} className={card}>
                  <div
                    aria-hidden="true"
                    className={cx("h-40 rounded-xl", covers[item.cover])}
                  />
                  <span className="absolute top-3.5 right-3.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-surface px-1.5 text-xs font-semibold text-ink tabular-nums">
                    {item.runs}
                    <span className="sr-only"> runs today</span>
                  </span>
                  <div className="grid gap-4 px-2.5 pt-3 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-muted">{metaOf(item)}</p>
                        <h3 className={cx(mono, "mt-1 truncate")}>
                          <button
                            type="button"
                            className={selectable}
                            onClick={() => openDetail(item.id)}
                          >
                            {item.name}
                          </button>
                        </h3>
                      </div>
                      <div className="relative z-10 -mt-1 -mr-1 flex items-center">
                        <button
                          type="button"
                          aria-pressed={starred}
                          aria-label={`Favourite ${item.name}`}
                          className={cx(iconButton, "rounded-full")}
                          onClick={() => toggleFavourite(item.id)}
                        >
                          <Icon
                            name="star"
                            className={cx("size-4", starred && starOn)}
                          />
                        </button>
                        <DropdownMenu
                          className={kebab}
                          items={workflowMenu}
                          onSelect={(value) =>
                            onMenu("workflow", item.id, value)
                          }
                          trigger={
                            <>
                              <Icon name="dots" className="size-4.5" />
                              <span className="sr-only">
                                Options for {item.name}
                              </span>
                            </>
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <Avatars team={item.team} ring="ring-surface" />
                      <AppIcons list={item.apps} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={cx(empty, "grid justify-items-center gap-3")}>
            <p>No workflows match your search or filters.</p>
            <Button size="sm" variant="secondary" onClick={resetFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );

  const views: Record<PageId, () => ReactNode> = {
    home: () => (
      <HomePage
        workflows={workflows}
        credits={credits}
        unread={unread}
        onOpen={openDetail}
      />
    ),
    workflows: () => workflowsPage,
    templates: () => <TemplatesPage onUse={applyTemplate} />,
    tools: () => <ToolsPage />,
    knowledge: () => <KnowledgePage />,
    marketplace: () => <MarketplacePage />,
    notifications: () => <NotificationsPage read={read} setRead={setRead} />,
    trash: () => <TrashPage trash={trash} onRestore={restore} />,
    settings: () => <SettingsPage />,
  };

  return (
    <div className={cx(palette, "flex min-h-dvh bg-surface text-ink")}>
      <aside
        className={cx(
          "hidden w-60 shrink-0 border-r border-line bg-surface",
          sidebarOpen && "lg:block",
        )}
      >
        <div className="sticky top-0 flex h-dvh flex-col gap-4 overflow-y-auto px-3 pb-6">
          <div className="flex h-16 items-center justify-between px-3">
            <p className="text-lg font-bold tracking-tight">
              <span className="mr-1 font-mono text-muted" aria-hidden="true">
                #
              </span>
              Alur
            </p>
            <button
              type="button"
              aria-label="Hide sidebar"
              className={iconButton}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon name="panel" className="size-4.5" />
            </button>
          </div>
          {sideNav}
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 bg-surface px-4 lg:px-8">
          <Drawer
            title="Menu"
            side="left"
            trigger={
              <button
                type="button"
                aria-label="Open menu"
                className={cx(iconButton, "size-10 lg:hidden")}
              >
                <Icon name="menu" />
              </button>
            }
          >
            {sideNav}
          </Drawer>
          {!sidebarOpen && (
            <button
              type="button"
              aria-label="Show sidebar"
              className={cx(iconButton, "hidden lg:inline-flex")}
              onClick={() => setSidebarOpen(true)}
            >
              <Icon name="panel" className="size-4.5" />
            </button>
          )}
          <div role="search" className="relative min-w-0 flex-1 lg:max-w-xl">
            <Icon
              name="search"
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
            />
            <Input
              id="alur-search"
              type="search"
              aria-label="Search folders and workflows"
              placeholder="Search..."
              className="rounded-full! pr-16 pl-10"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (page !== "workflows") go("workflows");
              }}
            />
            <Kbd
              size="sm"
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
            >
              ⌘ F
            </Kbd>
          </div>
          <p className="ml-auto hidden shrink-0 text-sm text-muted sm:block">
            Credits available{" "}
            <span className="font-semibold text-ink tabular-nums">
              {formatNumber(credits)}
            </span>
          </p>
        </header>

        <main className="px-4 pt-4 pb-12 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <h1
              id={TITLE_ID}
              tabIndex={-1}
              className="mr-auto text-[28px] leading-tight font-bold tracking-tight focus:outline-none"
            >
              {pages[page].title}
            </h1>
            {page === "workflows" && (
              <>
                <div className="order-last -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 lg:order-none lg:mx-0 lg:w-auto lg:px-0">
                  {filterDefs.map((def) => (
                    <DropdownMenu
                      key={def.key}
                      className={pill}
                      items={[...def.items]}
                      onSelect={(value) =>
                        setFilters({ ...filters, [def.key]: value })
                      }
                      trigger={
                        <>
                          <span className="text-muted">{def.label}:</span>
                          <span>
                            {
                              def.items.find(
                                (item) => item.value === filters[def.key],
                              )?.label
                            }
                          </span>
                        </>
                      }
                    />
                  ))}
                </div>
                <Modal
                  title="New workflow"
                  onClose={onCreateClose}
                  trigger={
                    <Button
                      size="sm"
                      className="rounded-full"
                      onClick={() =>
                        setDraft({ ...draft, name: "", status: "draft" })
                      }
                    >
                      <Icon name="plus" className="size-4" />
                      New workflow
                    </Button>
                  }
                  footer={
                    <>
                      <Button variant="secondary" type="submit" value="cancel">
                        Cancel
                      </Button>
                      <Button type="submit" value="create">
                        Create workflow
                      </Button>
                    </>
                  }
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Input
                        label="Name"
                        name="name"
                        placeholder="Untitled workflow"
                        value={draft.name}
                        onChange={(event) =>
                          setDraft({ ...draft, name: event.target.value })
                        }
                      />
                    </div>
                    <Select
                      label="Folder"
                      name="folder"
                      value={draft.folder}
                      onChange={(event) =>
                        setDraft({ ...draft, folder: event.target.value })
                      }
                    >
                      {folders.map((folder) => (
                        <option key={folder.id} value={folder.id}>
                          {folder.name}
                        </option>
                      ))}
                    </Select>
                    <Select
                      label="Tag"
                      name="tag"
                      value={draft.tag}
                      onChange={(event) =>
                        setDraft({ ...draft, tag: event.target.value })
                      }
                    >
                      {tags.map((tag) => (
                        <option key={tag}>{tag}</option>
                      ))}
                    </Select>
                    <Select
                      label="Status"
                      name="status"
                      value={draft.status}
                      onChange={(event) =>
                        setDraft({ ...draft, status: event.target.value })
                      }
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                    </Select>
                  </div>
                </Modal>
              </>
            )}
          </div>
          {views[page]()}
        </main>
      </div>

      <Drawer
        id={DETAIL_ID}
        title="Workflow details"
        footer={
          <Button variant="secondary" type="submit">
            Close
          </Button>
        }
      >
        {detail && (
          <div className="grid gap-5 text-ink">
            <div
              aria-hidden="true"
              className={cx("h-32 rounded-xl", covers[detail.cover])}
            />
            <div>
              <h3 className={cx(mono, "text-lg")}>{detail.name}</h3>
              <p className="text-sm text-muted">{metaOf(detail)}</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-3">
              <Switch
                label="Active"
                checked={detail.status === "active"}
                onCheckedChange={setActive}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  aria-pressed={favourites.includes(detail.id)}
                  onClick={() => toggleFavourite(detail.id)}
                >
                  <Icon
                    name="star"
                    className={cx(
                      "size-4",
                      favourites.includes(detail.id) && starOn,
                    )}
                  />
                  Favourite
                </Button>
                <Button size="sm" onClick={runNow}>
                  <Icon name="play" className="size-4" />
                  Run now
                </Button>
              </div>
            </div>
            <dl className="divide-y divide-line text-sm">
              {[
                ["Status", statusLabels[detail.status]],
                ["Runs today", String(detail.runs)],
                [
                  "Folder",
                  folders.find((f) => f.id === detail.folder)?.name ?? "None",
                ],
                ["Tags", detail.tags.join(", ") || "None"],
                ["Integrations", appNames(detail.apps) || "None"],
                ["Owner", detail.team[0] ?? "Andi Wijaya"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 py-2.5"
                >
                  <dt className="shrink-0 text-muted">{label}</dt>
                  <dd className="min-w-0 truncate text-right font-medium">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </Drawer>

      <Modal
        id={RENAME_ID}
        title="Rename"
        onClose={onRenameClose}
        footer={
          <>
            <Button variant="secondary" type="submit" value="cancel">
              Cancel
            </Button>
            <Button type="submit" value="save">
              Save
            </Button>
          </>
        }
      >
        <Input
          label="Name"
          name="rename"
          value={draftName}
          onChange={(event) => setDraftName(event.target.value)}
        />
      </Modal>

      <AlertDialog
        id={DELETE_ID}
        title="Delete this item?"
        variant="danger"
        actionLabel="Delete"
        onAction={onDelete}
      >
        {target.kind === "folder"
          ? `${deleting ?? "This folder"} will be removed. Its workflows stay in My Workflows.`
          : `${deleting ?? "This workflow"} moves to Trash. You can restore it later.`}
      </AlertDialog>
      <Toaster />
    </div>
  );
}
