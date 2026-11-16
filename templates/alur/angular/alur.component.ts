import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core";
import { AlertDialog } from "../../../components/alert-dialog/alert-dialog.component";
import { Badge } from "../../../components/badge/badge.component";
import { Button } from "../../../components/button/button.component";
import { Drawer } from "../../../components/drawer/drawer.component";
import { DropdownMenu } from "../../../components/dropdown-menu/dropdown-menu.component";
import { Input } from "../../../components/input/input.component";
import { Kbd } from "../../../components/kbd/kbd.component";
import { Modal } from "../../../components/modal/modal.component";
import { Select } from "../../../components/select/select.component";
import { Switch } from "../../../components/switch/switch.component";
import { Toaster, toast } from "../../../components/toast/toast.component";
import { ToggleGroup } from "../../../components/toggle-group/toggle-group.component";

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
const toggleIn = <T>(list: T[], item: T) =>
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

/** Template Angular tidak punya komponen fungsi seperti Icon di React: ikon jadi atribut pada svg. */
@Component({
  selector: "svg[alurIcon]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.5",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true",
  },
  template: `<svg:path [attr.d]="path()" />`,
})
class Icon {
  readonly alurIcon = input.required<IconName>();
  protected readonly path = computed(() => icons[this.alurIcon()]);
}

@Component({
  selector: "div[alurAvatars]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "flex -space-x-1" },
  template: `
    @for (name of alurAvatars(); track name) {
      <span
        role="img"
        [attr.aria-label]="name"
        [class]="cx(avatarBase, avatarTone(name), ring())"
        [textContent]="initials(name)"
      ></span>
    }
  `,
})
class Avatars {
  readonly alurAvatars = input.required<string[]>();
  readonly ring = input.required<string>();
  protected readonly avatarBase = avatarBase;
  protected readonly cx = cx;
  protected readonly avatarTone = avatarTone;
  protected readonly initials = initials;
}

@Component({
  selector: "div[alurApps]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  host: {
    role: "img",
    class: "flex -space-x-1",
    "[attr.aria-label]": "'Integrations: ' + appNames(alurApps())",
  },
  template: `
    @for (id of alurApps(); track id) {
      <span [class]="cx(appBase, apps[id].tone)">
        <svg [alurIcon]="id" class="size-3.5"></svg>
      </span>
    }
  `,
})
class AppIcons {
  readonly alurApps = input.required<AppId[]>();
  protected readonly appBase = appBase;
  protected readonly apps = apps;
  protected readonly cx = cx;
  protected readonly appNames = appNames;
}

/** Item filter siap pakai: DropdownMenu butuh array biasa, bukan tuple readonly. */
const filterMenus = filterDefs.map((def) => ({
  key: def.key,
  label: def.label,
  items: [...def.items],
}));

@Component({
  selector: "template-alur",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  imports: [
    NgTemplateOutlet,
    AlertDialog,
    Badge,
    Button,
    Drawer,
    DropdownMenu,
    Input,
    Kbd,
    Modal,
    Select,
    Switch,
    Toaster,
    ToggleGroup,
    Icon,
    Avatars,
    AppIcons,
  ],
  template: `
    <!-- Isi sidebar dipakai di aside desktop dan Drawer menu mobile; form dialog menutup Drawer saat item dipilih. -->
    <ng-template #sideNavTpl>
      <form method="dialog" class="grid gap-6">
        <nav aria-label="Main" class="grid gap-0.5">
          @for (id of mainNav; track id) {
            <ng-container
              [ngTemplateOutlet]="navButtonTpl"
              [ngTemplateOutletContext]="{ $implicit: id }"
            />
          }
          <details class="group/more">
            <summary
              [class]="
                cx(
                  navItem,
                  navIdle,
                  'cursor-pointer list-none [&::-webkit-details-marker]:hidden'
                )
              "
            >
              <svg alurIcon="more" class="size-4.5 shrink-0"></svg>
              More
              <svg
                alurIcon="chevron"
                class="ml-auto size-4 transition-transform duration-150 group-open/more:rotate-180"
              ></svg>
            </summary>
            <div class="mt-0.5 grid gap-0.5 pl-4">
              @for (id of moreNav; track id) {
                <ng-container
                  [ngTemplateOutlet]="navButtonTpl"
                  [ngTemplateOutletContext]="{ $implicit: id }"
                />
              }
            </div>
          </details>
          <hr class="my-2 border-line" />
          <ng-container
            [ngTemplateOutlet]="navButtonTpl"
            [ngTemplateOutletContext]="{ $implicit: 'notifications' }"
          />
        </nav>
        <div class="grid gap-1">
          <h2 class="px-3 text-xs font-medium text-muted">Favourites</h2>
          @if (favouriteList().length === 0) {
            <p class="px-3 text-xs text-muted">Star a workflow to pin it.</p>
          }
          @for (item of favouriteList(); track item.id) {
            <button
              type="submit"
              [class]="cx(navItem, 'text-ink hover:bg-subtle')"
              (click)="openDetail(item.id)"
            >
              <span
                aria-hidden="true"
                [class]="cx('size-4.5 shrink-0 rounded-md', covers[item.cover])"
              ></span>
              <span class="truncate">{{ item.name }}</span>
              <svg
                alurIcon="star"
                [class]="cx('ml-auto size-3.5', starOn)"
              ></svg>
            </button>
          }
        </div>
      </form>
    </ng-template>

    <ng-template #navButtonTpl let-id>
      <button
        type="submit"
        [attr.aria-current]="page() === id ? 'page' : null"
        [class]="cx(navItem, page() === id ? navActive : navIdle)"
        (click)="go(id)"
      >
        <svg
          [alurIcon]="pages[asPage(id)].icon"
          class="size-4.5 shrink-0"
        ></svg>
        <span class="truncate">{{ pages[asPage(id)].label }}</span>
        @if (id === "notifications" && unread() > 0) {
          <span [class]="navBadge"
            >{{ unread() }}<span class="sr-only"> unread</span></span
          >
        }
      </button>
    </ng-template>

    <div [class]="cx(palette, 'flex min-h-dvh bg-surface text-ink')">
      <aside
        [class]="
          cx(
            'hidden w-60 shrink-0 border-r border-line bg-surface',
            sidebarOpen() && 'lg:block'
          )
        "
      >
        <div
          class="sticky top-0 flex h-dvh flex-col gap-4 overflow-y-auto px-3 pb-6"
        >
          <div class="flex h-16 items-center justify-between px-3">
            <p class="text-lg font-bold tracking-tight">
              <span class="mr-1 font-mono text-muted" aria-hidden="true">#</span
              >Alur
            </p>
            <button
              type="button"
              aria-label="Hide sidebar"
              [class]="iconButton"
              (click)="sidebarOpen.set(false)"
            >
              <svg alurIcon="panel" class="size-4.5"></svg>
            </button>
          </div>
          <ng-container [ngTemplateOutlet]="sideNavTpl" />
        </div>
      </aside>

      <div class="min-w-0 flex-1">
        <header
          class="sticky top-0 z-20 flex h-16 items-center gap-3 bg-surface px-4 lg:px-8"
        >
          <markas-drawer title="Menu" side="left">
            <button
              trigger
              type="button"
              aria-label="Open menu"
              [class]="cx(iconButton, 'size-10 lg:hidden')"
            >
              <svg alurIcon="menu" class="size-5"></svg>
            </button>
            <ng-container [ngTemplateOutlet]="sideNavTpl" />
          </markas-drawer>
          @if (!sidebarOpen()) {
            <button
              type="button"
              aria-label="Show sidebar"
              [class]="cx(iconButton, 'hidden lg:inline-flex')"
              (click)="sidebarOpen.set(true)"
            >
              <svg alurIcon="panel" class="size-4.5"></svg>
            </button>
          }
          <div role="search" class="relative min-w-0 flex-1 lg:max-w-xl">
            <svg
              alurIcon="search"
              class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
            ></svg>
            <markas-input
              id="alur-search"
              type="search"
              aria-label="Search folders and workflows"
              placeholder="Search..."
              class="rounded-full! pr-16 pl-10"
              [value]="query()"
              (valueChange)="search($event)"
            />
            <kbd
              markas-kbd
              size="sm"
              class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
              >⌘ F</kbd
            >
          </div>
          <p class="ml-auto hidden shrink-0 text-sm text-muted sm:block">
            Credits available
            <span
              class="font-semibold text-ink tabular-nums"
              [textContent]="formatNumber(credits())"
            ></span>
          </p>
        </header>

        <main class="px-4 pt-4 pb-12 lg:px-8">
          <div class="mb-8 flex flex-wrap items-center gap-3">
            <h1
              [id]="TITLE_ID"
              tabindex="-1"
              class="mr-auto text-[28px] leading-tight font-bold tracking-tight focus:outline-none"
              [textContent]="pages[page()].title"
            ></h1>
            @if (page() === "workflows") {
              <div
                class="order-last -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 lg:order-none lg:mx-0 lg:w-auto lg:px-0"
              >
                @for (def of filterMenus; track def.key) {
                  <markas-dropdown-menu
                    [class]="pill"
                    [items]="def.items"
                    (selected)="setFilter(def.key, $event)"
                  >
                    <ng-container trigger>
                      <span class="text-muted">{{ def.label }}:</span>
                      <span>{{ filterLabel(def.key) }}</span>
                    </ng-container>
                  </markas-dropdown-menu>
                }
              </div>
              <markas-modal
                #createModal
                title="New workflow"
                (closed)="onCreateClose()"
              >
                <button
                  markas-button
                  trigger
                  size="sm"
                  class="rounded-full"
                  (click)="resetDraft()"
                >
                  <svg alurIcon="plus" class="size-4"></svg>
                  New workflow
                </button>
                <div class="grid gap-4 sm:grid-cols-2">
                  <div class="sm:col-span-2">
                    <markas-input
                      label="Name"
                      name="name"
                      placeholder="Untitled workflow"
                      [value]="draft().name"
                      (valueChange)="patchDraft('name', $event)"
                    />
                  </div>
                  <markas-select
                    label="Folder"
                    name="folder"
                    [value]="draft().folder"
                    (valueChange)="patchDraft('folder', $event)"
                  >
                    @for (folder of folders(); track folder.id) {
                      <option [value]="folder.id">{{ folder.name }}</option>
                    }
                  </markas-select>
                  <markas-select
                    label="Tag"
                    name="tag"
                    [value]="draft().tag"
                    (valueChange)="patchDraft('tag', $event)"
                  >
                    @for (tag of tags; track tag) {
                      <option>{{ tag }}</option>
                    }
                  </markas-select>
                  <markas-select
                    label="Status"
                    name="status"
                    [value]="draft().status"
                    (valueChange)="patchDraft('status', $event)"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                  </markas-select>
                </div>
                <ng-container footer>
                  <button
                    markas-button
                    variant="secondary"
                    type="submit"
                    value="cancel"
                  >
                    Cancel
                  </button>
                  <button markas-button type="submit" value="create">
                    Create workflow
                  </button>
                </ng-container>
              </markas-modal>
            }
          </div>

          @switch (page()) {
            @case ("home") {
              <div class="grid gap-8">
                <dl class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  @for (entry of homeTiles(); track entry[0]) {
                    <div [class]="tile">
                      <dt class="text-xs text-muted">{{ entry[0] }}</dt>
                      <dd
                        class="mt-1 text-xl font-semibold tracking-tight tabular-nums"
                      >
                        {{ entry[1] }}
                      </dd>
                    </div>
                  }
                </dl>
                <div
                  class="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_400px]"
                >
                  <section
                    aria-labelledby="alur-recent-title"
                    class="grid gap-4"
                  >
                    <h2 id="alur-recent-title" class="text-base font-semibold">
                      Recently edited
                    </h2>
                    <ul
                      role="list"
                      class="grid gap-3 sm:grid-cols-3 xl:grid-cols-3"
                    >
                      @for (item of recent(); track item.id) {
                        <li [class]="card">
                          <div
                            aria-hidden="true"
                            [class]="cx('h-24 rounded-xl', covers[item.cover])"
                          ></div>
                          <div class="grid gap-0.5 px-2 pt-2.5 pb-1.5">
                            <h3 [class]="cx(mono, 'truncate')">
                              <button
                                type="button"
                                [class]="selectable"
                                (click)="openDetail(item.id)"
                              >
                                {{ item.name }}
                              </button>
                            </h3>
                            <p class="text-xs text-muted">{{ metaOf(item) }}</p>
                          </div>
                        </li>
                      }
                    </ul>
                  </section>
                  <section aria-labelledby="alur-runs-title" [class]="panel">
                    <div
                      class="mb-4 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div>
                        <h2
                          id="alur-runs-title"
                          class="text-base font-semibold"
                        >
                          Recent runs
                        </h2>
                        <p class="text-sm text-muted">
                          {{ plural(visibleRuns().length, "run") }}
                        </p>
                      </div>
                      <markas-toggle-group
                        #runGroup
                        label="Filter runs"
                        [items]="runFilters"
                        [value]="runFilter()"
                        (valueChange)="pick(runFilter, runGroup, $event)"
                      />
                    </div>
                    <ul class="divide-y divide-line">
                      @for (run of visibleRuns(); track run.id) {
                        <li
                          [attr.data-run]="run.id"
                          class="flex items-center gap-3 py-3"
                        >
                          <div class="min-w-0 flex-1">
                            <p class="truncate text-sm font-medium">
                              {{ run.workflow }}
                            </p>
                            <p class="text-xs text-muted">
                              {{ run.time }}, {{ run.duration }}
                            </p>
                          </div>
                          <span
                            markas-badge
                            [variant]="run.ok ? 'success' : 'danger'"
                            >{{ run.ok ? "Succeeded" : "Failed" }}</span
                          >
                        </li>
                      }
                    </ul>
                  </section>
                </div>
              </div>
            }
            @case ("workflows") {
              <div class="grid gap-10">
                <section
                  aria-labelledby="alur-folders-title"
                  class="grid gap-4"
                >
                  <h2
                    id="alur-folders-title"
                    class="flex items-center gap-2 text-base font-semibold"
                  >
                    Folders
                    <span [class]="countBadge">{{
                      visibleFolders().length
                    }}</span>
                  </h2>
                  @if (visibleFolders().length > 0) {
                    <ul role="list" [class]="gridCols">
                      @for (folder of visibleFolders(); track folder.id) {
                        <li [attr.data-folder]="folder.id">
                          <div
                            aria-hidden="true"
                            [class]="
                              cx(
                                'h-4 w-32 rounded-t-xl [clip-path:polygon(0_0,82%_0,100%_100%,0_100%)]',
                                folderTones[folder.tone]!.bg
                              )
                            "
                          ></div>
                          <div
                            [class]="
                              cx(
                                'flex h-40 flex-col justify-between rounded-2xl rounded-tl-none p-4',
                                folderTones[folder.tone]!.bg
                              )
                            "
                          >
                            <div class="flex items-start justify-between gap-2">
                              <h3 [class]="cx(mono, 'pt-1')">
                                {{ folder.name }}
                              </h3>
                              <markas-dropdown-menu
                                [class]="kebab"
                                [items]="folderMenu"
                                (selected)="onMenu('folder', folder.id, $event)"
                              >
                                <ng-container trigger>
                                  <svg alurIcon="dots" class="size-4.5"></svg>
                                  <span class="sr-only"
                                    >Options for {{ folder.name }}</span
                                  >
                                </ng-container>
                              </markas-dropdown-menu>
                            </div>
                            <div class="flex items-end justify-between gap-2">
                              <div
                                [alurAvatars]="folder.team"
                                [ring]="folderTones[folder.tone]!.ring"
                              ></div>
                              <p class="text-sm text-muted">
                                {{ folder.items }} Items
                              </p>
                            </div>
                          </div>
                        </li>
                      }
                    </ul>
                  } @else {
                    <p [class]="empty">No folders match your search.</p>
                  }
                </section>
                <section
                  aria-labelledby="alur-workflows-title"
                  class="grid gap-4"
                >
                  <h2
                    id="alur-workflows-title"
                    class="flex items-center gap-2 text-base font-semibold"
                  >
                    Workflows
                    <span [class]="countBadge">{{ visible().length }}</span>
                  </h2>
                  @if (visible().length > 0) {
                    <ul role="list" [class]="gridCols">
                      @for (item of visible(); track item.id) {
                        <li [attr.data-workflow]="item.id" [class]="card">
                          <div
                            aria-hidden="true"
                            [class]="cx('h-40 rounded-xl', covers[item.cover])"
                          ></div>
                          <span
                            class="absolute top-3.5 right-3.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-surface px-1.5 text-xs font-semibold text-ink tabular-nums"
                            >{{ item.runs
                            }}<span class="sr-only"> runs today</span></span
                          >
                          <div class="grid gap-4 px-2.5 pt-3 pb-2">
                            <div class="flex items-start justify-between gap-2">
                              <div class="min-w-0">
                                <p
                                  class="text-xs text-muted"
                                  [textContent]="metaOf(item)"
                                ></p>
                                <h3 [class]="cx(mono, 'mt-1 truncate')">
                                  <button
                                    type="button"
                                    [class]="selectable"
                                    (click)="openDetail(item.id)"
                                  >
                                    {{ item.name }}
                                  </button>
                                </h3>
                              </div>
                              <div
                                class="relative z-10 -mt-1 -mr-1 flex items-center"
                              >
                                <button
                                  type="button"
                                  [attr.aria-pressed]="isFavourite(item.id)"
                                  [attr.aria-label]="'Favourite ' + item.name"
                                  [class]="cx(iconButton, 'rounded-full')"
                                  (click)="toggleFavourite(item.id)"
                                >
                                  <svg
                                    alurIcon="star"
                                    [class]="
                                      cx(
                                        'size-4',
                                        isFavourite(item.id) && starOn
                                      )
                                    "
                                  ></svg>
                                </button>
                                <markas-dropdown-menu
                                  [class]="kebab"
                                  [items]="workflowMenu"
                                  (selected)="
                                    onMenu('workflow', item.id, $event)
                                  "
                                >
                                  <ng-container trigger>
                                    <svg alurIcon="dots" class="size-4.5"></svg>
                                    <span class="sr-only"
                                      >Options for {{ item.name }}</span
                                    >
                                  </ng-container>
                                </markas-dropdown-menu>
                              </div>
                            </div>
                            <div
                              class="flex items-center justify-between gap-2"
                            >
                              <div
                                [alurAvatars]="item.team"
                                ring="ring-surface"
                              ></div>
                              <div [alurApps]="item.apps"></div>
                            </div>
                          </div>
                        </li>
                      }
                    </ul>
                  } @else {
                    <div [class]="cx(empty, 'grid justify-items-center gap-3')">
                      <p>No workflows match your search or filters.</p>
                      <button
                        markas-button
                        size="sm"
                        variant="secondary"
                        (click)="resetFilters()"
                      >
                        Clear filters
                      </button>
                    </div>
                  }
                </section>
              </div>
            }
            @case ("templates") {
              <div class="grid gap-6">
                <div
                  class="flex min-w-0 flex-wrap items-center justify-between gap-3"
                >
                  <p class="text-sm text-muted">
                    {{ plural(visibleTemplates().length, "template") }}
                  </p>
                  <markas-toggle-group
                    #templateGroup
                    label="Filter templates"
                    class="max-w-full overflow-x-auto"
                    [items]="templateFilters"
                    [value]="templateFilter()"
                    (valueChange)="pick(templateFilter, templateGroup, $event)"
                  />
                </div>
                <ul role="list" [class]="gridCols">
                  @for (item of visibleTemplates(); track item.id) {
                    <li [attr.data-template]="item.id" [class]="card">
                      <div
                        aria-hidden="true"
                        [class]="cx('h-28 rounded-xl', covers[item.cover])"
                      ></div>
                      <div class="grid flex-1 gap-3 px-2.5 pt-3 pb-2">
                        <div class="grid gap-1">
                          <p class="text-xs text-muted">{{ item.tag }}</p>
                          <h2 [class]="mono">{{ item.name }}</h2>
                          <p class="text-sm text-muted">{{ item.text }}</p>
                        </div>
                        <div
                          class="mt-auto flex items-center justify-between gap-2"
                        >
                          <div [alurApps]="item.apps"></div>
                          <button
                            markas-button
                            size="sm"
                            variant="secondary"
                            (click)="applyTemplate(item.id)"
                          >
                            Use template<span class="sr-only">{{
                              item.name
                            }}</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  }
                </ul>
              </div>
            }
            @case ("tools") {
              <section aria-labelledby="alur-tools-title" [class]="panel">
                <h2 id="alur-tools-title" class="text-base font-semibold">
                  Connected tools
                </h2>
                <p class="text-sm text-muted">
                  {{ connected().length }} of {{ tools.length }} connected
                </p>
                <ul class="mt-2 divide-y divide-line">
                  @for (tool of tools; track tool.id) {
                    <li class="flex items-center gap-4 py-4">
                      <span
                        [class]="
                          cx(appBase, 'size-10 ring-0', apps[tool.id].tone)
                        "
                      >
                        <svg [alurIcon]="tool.id" class="size-5"></svg>
                      </span>
                      <div class="min-w-0 flex-1">
                        <p class="font-medium">{{ apps[tool.id].label }}</p>
                        <p class="text-sm text-muted">{{ tool.text }}</p>
                      </div>
                      <markas-switch
                        [aria-label]="apps[tool.id].label"
                        [checked]="connected().includes(tool.id)"
                        (checkedChange)="toggleTool(tool.id)"
                      />
                    </li>
                  }
                </ul>
              </section>
            }
            @case ("knowledge") {
              <div class="grid gap-6">
                <div class="flex flex-wrap items-center gap-3">
                  <div class="w-full sm:w-80">
                    <markas-input
                      type="search"
                      aria-label="Search articles"
                      placeholder="Search articles"
                      [(value)]="articleQuery"
                    />
                  </div>
                  <p class="text-sm text-muted">
                    {{ visibleArticles().length }} of
                    {{ articles.length }} articles
                  </p>
                </div>
                @if (visibleArticles().length > 0) {
                  <ul role="list" [class]="gridCols">
                    @for (item of visibleArticles(); track item.title) {
                      <li [class]="cx(panel, 'grid gap-2')">
                        <p class="text-xs text-muted">{{ item.category }}</p>
                        <h2 class="font-semibold">{{ item.title }}</h2>
                        <p class="text-sm text-muted">
                          {{ item.minutes }} min read
                        </p>
                      </li>
                    }
                  </ul>
                } @else {
                  <p [class]="empty">No articles match your search.</p>
                }
              </div>
            }
            @case ("marketplace") {
              <div class="grid gap-6">
                <p class="text-sm text-muted">
                  {{ installed().length }} installed
                </p>
                <ul role="list" [class]="gridCols">
                  @for (item of addons; track item.id) {
                    <li [class]="cx(card, 'flex-row gap-3 p-3')">
                      <div
                        aria-hidden="true"
                        [class]="
                          cx('size-14 shrink-0 rounded-xl', covers[item.cover])
                        "
                      ></div>
                      <div class="min-w-0 flex-1">
                        <h2 [class]="cx(mono, 'truncate')">{{ item.name }}</h2>
                        <p class="truncate text-xs text-muted">
                          {{ item.maker }}
                        </p>
                        <p class="mt-1 text-sm font-medium tabular-nums">
                          {{
                            item.price ? rupiah(item.price) + "/month" : "Free"
                          }}
                        </p>
                      </div>
                      <button
                        markas-button
                        size="sm"
                        [variant]="
                          installed().includes(item.id)
                            ? 'secondary'
                            : 'primary'
                        "
                        class="self-center"
                        (click)="toggleAddon(item.id, item.name)"
                      >
                        {{
                          installed().includes(item.id)
                            ? "Installed"
                            : "Install"
                        }}<span class="sr-only">{{ item.name }}</span>
                      </button>
                    </li>
                  }
                </ul>
              </div>
            }
            @case ("notifications") {
              <section aria-labelledby="alur-inbox-title" [class]="panel">
                <div
                  class="flex min-w-0 flex-wrap items-center justify-between gap-3"
                >
                  <div>
                    <h2 id="alur-inbox-title" class="text-base font-semibold">
                      Inbox
                    </h2>
                    <p class="text-sm text-muted">{{ unread() }} unread</p>
                  </div>
                  <button
                    markas-button
                    size="sm"
                    variant="secondary"
                    [disabled]="unread() === 0"
                    (click)="markAllRead()"
                  >
                    Mark all as read
                  </button>
                </div>
                <ul class="mt-2 divide-y divide-line">
                  @for (item of notifications; track item.id) {
                    <li
                      [attr.data-unread]="!read().includes(item.id)"
                      class="flex items-center gap-3 py-3"
                    >
                      <span
                        aria-hidden="true"
                        [class]="
                          cx(
                            'size-2 shrink-0 rounded-full',
                            read().includes(item.id) ? 'bg-line' : 'bg-danger'
                          )
                        "
                      ></span>
                      <div class="min-w-0 flex-1">
                        <p
                          [class]="
                            cx(
                              'text-sm',
                              !read().includes(item.id) && 'font-medium'
                            )
                          "
                        >
                          {{ item.text }}
                        </p>
                        <p class="text-xs text-muted">{{ item.time }}</p>
                      </div>
                      @if (!read().includes(item.id)) {
                        <button
                          markas-button
                          size="sm"
                          variant="ghost"
                          (click)="markRead(item.id)"
                        >
                          Mark read<span class="sr-only"
                            >: {{ item.text }}</span
                          >
                        </button>
                      }
                    </li>
                  }
                </ul>
              </section>
            }
            @case ("trash") {
              <section aria-labelledby="alur-trash-title" [class]="panel">
                <h2 id="alur-trash-title" class="text-base font-semibold">
                  Deleted workflows
                </h2>
                <p class="text-sm text-muted">
                  {{ plural(trash().length, "item") }}
                </p>
                @if (trash().length > 0) {
                  <ul class="mt-2 divide-y divide-line">
                    @for (item of trash(); track item.id) {
                      <li
                        [attr.data-trash]="item.id"
                        class="flex items-center gap-3 py-3"
                      >
                        <span
                          aria-hidden="true"
                          [class]="
                            cx('size-9 shrink-0 rounded-lg', covers[item.cover])
                          "
                        ></span>
                        <p [class]="cx(mono, 'min-w-0 flex-1 truncate')">
                          {{ item.name }}
                        </p>
                        <button
                          markas-button
                          size="sm"
                          variant="secondary"
                          (click)="restore(item.id)"
                        >
                          Restore<span class="sr-only">{{ item.name }}</span>
                        </button>
                      </li>
                    }
                  </ul>
                } @else {
                  <p [class]="cx(empty, 'mt-4')">Trash is empty.</p>
                }
              </section>
            }
            @default {
              <form
                [class]="cx(panel, 'grid max-w-2xl gap-5')"
                (submit)="saveSettings($event)"
              >
                <markas-input
                  label="Workspace name"
                  name="workspace"
                  [(value)]="workspace"
                />
                <ul class="divide-y divide-line">
                  @for (item of prefOptions; track item.key) {
                    <li class="flex items-center justify-between gap-4 py-3">
                      <div>
                        <p class="text-sm font-medium">{{ item.label }}</p>
                        <p class="text-xs text-muted">{{ item.text }}</p>
                      </div>
                      <markas-switch
                        [aria-label]="item.label"
                        [checked]="prefs().includes(item.key)"
                        (checkedChange)="togglePref(item.key)"
                      />
                    </li>
                  }
                </ul>
                <div class="flex justify-end">
                  <button markas-button type="submit">Save changes</button>
                </div>
              </form>
            }
          }
        </main>
      </div>

      <markas-drawer [id]="DETAIL_ID" title="Workflow details">
        @if (detail(); as item) {
          <div class="grid gap-5 text-ink">
            <div
              aria-hidden="true"
              [class]="cx('h-32 rounded-xl', covers[item.cover])"
            ></div>
            <div>
              <h3 [class]="cx(mono, 'text-lg')">{{ item.name }}</h3>
              <p class="text-sm text-muted">{{ metaOf(item) }}</p>
            </div>
            <div
              class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-3"
            >
              <markas-switch
                label="Active"
                [checked]="item.status === 'active'"
                (checkedChange)="setActive($event)"
              />
              <div class="flex gap-2">
                <button
                  markas-button
                  size="sm"
                  variant="secondary"
                  [attr.aria-pressed]="isFavourite(item.id)"
                  (click)="toggleFavourite(item.id)"
                >
                  <svg
                    alurIcon="star"
                    [class]="cx('size-4', isFavourite(item.id) && starOn)"
                  ></svg>
                  Favourite
                </button>
                <button markas-button size="sm" (click)="runNow()">
                  <svg alurIcon="play" class="size-4"></svg>
                  Run now
                </button>
              </div>
            </div>
            <dl class="divide-y divide-line text-sm">
              @for (row of detailRows(); track row[0]) {
                <div class="flex items-center justify-between gap-4 py-2.5">
                  <dt class="shrink-0 text-muted">{{ row[0] }}</dt>
                  <dd class="min-w-0 truncate text-right font-medium">
                    {{ row[1] }}
                  </dd>
                </div>
              }
            </dl>
          </div>
        }
        <ng-container footer>
          <button markas-button variant="secondary" type="submit">Close</button>
        </ng-container>
      </markas-drawer>

      <markas-modal [id]="RENAME_ID" title="Rename" (closed)="onRenameClose()">
        <markas-input label="Name" name="rename" [(value)]="draftName" />
        <ng-container footer>
          <button
            markas-button
            variant="secondary"
            type="submit"
            value="cancel"
          >
            Cancel
          </button>
          <button markas-button type="submit" value="save">Save</button>
        </ng-container>
      </markas-modal>

      <markas-alert-dialog
        [id]="DELETE_ID"
        title="Delete this item?"
        variant="danger"
        actionLabel="Delete"
        (action)="onDelete()"
        >{{ deleteText() }}</markas-alert-dialog
      >
      <markas-toaster />
    </div>
  `,
})
export default class Alur {
  protected readonly palette = palette;
  protected readonly covers = covers;
  protected readonly folderTones = folderTones;
  protected readonly apps = apps;
  protected readonly pages = pages;
  protected readonly mainNav = mainNav;
  protected readonly moreNav = moreNav;
  protected readonly TITLE_ID = TITLE_ID;
  protected readonly DETAIL_ID = DETAIL_ID;
  protected readonly RENAME_ID = RENAME_ID;
  protected readonly DELETE_ID = DELETE_ID;
  protected readonly tags = tags;
  protected readonly filterMenus = filterMenus;
  protected readonly workflowMenu = workflowMenu;
  protected readonly folderMenu = folderMenu;
  protected readonly runFilters = runFilters;
  protected readonly templateFilters = templateFilters;
  protected readonly tools = tools;
  protected readonly articles = articles;
  protected readonly addons = addons;
  protected readonly notifications = notifications;
  protected readonly prefOptions = prefOptions;
  protected readonly navItem = navItem;
  protected readonly navActive = navActive;
  protected readonly navIdle = navIdle;
  protected readonly iconButton = iconButton;
  protected readonly navBadge = navBadge;
  protected readonly countBadge = countBadge;
  protected readonly mono = mono;
  protected readonly pill = pill;
  protected readonly kebab = kebab;
  protected readonly selectable = selectable;
  protected readonly card = card;
  protected readonly panel = panel;
  protected readonly tile = tile;
  protected readonly gridCols = gridCols;
  protected readonly appBase = appBase;
  protected readonly empty = empty;
  protected readonly starOn = starOn;
  protected readonly cx = cx;
  protected readonly formatNumber = formatNumber;
  protected readonly rupiah = rupiah;
  protected readonly plural = plural;
  protected readonly metaOf = metaOf;

  /* Status bersama */
  protected readonly page = signal<PageId>(DEFAULT_PAGE);
  private readonly workflows = signal(initialWorkflows);
  protected readonly folders = signal(initialFolders);
  protected readonly trash = signal(initialTrash);
  private readonly favourites = signal(INITIAL_FAVOURITES);
  protected readonly read = signal(INITIAL_READ);
  protected readonly credits = signal(2450);
  private readonly nextId = signal(9);
  protected readonly sidebarOpen = signal(true);
  protected readonly query = signal("");
  private readonly filters = signal(DEFAULT_FILTERS);
  private readonly selectedId = signal("w1");
  private readonly target = signal({ kind: "workflow", id: "w1" });
  protected readonly draftName = signal("");
  protected readonly draft = signal({
    name: "",
    folder: "f1",
    tag: "Productivity",
    status: "draft",
  });
  private readonly createModal = viewChild<string, ElementRef<HTMLElement>>(
    "createModal",
    { read: ElementRef },
  );

  /* Status per halaman: direset saat pindah halaman, sama seperti React yang me-mount ulang view. */
  protected readonly runFilter = signal("all");
  protected readonly templateFilter = signal("all");
  protected readonly connected = signal(DEFAULT_TOOLS);
  protected readonly articleQuery = signal("");
  protected readonly installed = signal(["m1"]);
  protected readonly workspace = signal(DEFAULT_WORKSPACE);
  protected readonly prefs = signal(DEFAULT_PREFS);

  protected readonly unread = computed(
    () => notifications.length - this.read().length,
  );
  private readonly matches = (name: string) =>
    name.toLowerCase().includes(this.query().trim().toLowerCase());
  protected readonly visibleFolders = computed(() =>
    this.folders().filter((item) => this.matches(item.name)),
  );
  protected readonly visible = computed(() => {
    const filters = this.filters();
    return this.workflows().filter(
      (item) =>
        this.matches(item.name) &&
        (filters.status === "all" || item.status === filters.status) &&
        (filters.app === "any" || item.apps.includes(filters.app as AppId)) &&
        (filters.date === "any" || item.days <= Number(filters.date)) &&
        (filters.tag === "all" || item.tags.includes(filters.tag)),
    );
  });
  protected readonly detail = computed(() =>
    this.workflows().find((item) => item.id === this.selectedId()),
  );
  private readonly deleting = computed(() => {
    const { kind, id } = this.target();
    return kind === "folder"
      ? this.folders().find((item) => item.id === id)?.name
      : this.workflows().find((item) => item.id === id)?.name;
  });
  protected readonly deleteText = computed(() =>
    this.target().kind === "folder"
      ? `${this.deleting() ?? "This folder"} will be removed. Its workflows stay in My Workflows.`
      : `${this.deleting() ?? "This workflow"} moves to Trash. You can restore it later.`,
  );
  protected readonly favouriteList = computed(() =>
    this.favourites()
      .map((id) => this.workflows().find((item) => item.id === id))
      .filter((item) => item !== undefined),
  );
  protected readonly detailRows = computed(() => {
    const detail = this.detail();
    if (!detail) return [];
    return [
      ["Status", statusLabels[detail.status]],
      ["Runs today", String(detail.runs)],
      [
        "Folder",
        this.folders().find((f) => f.id === detail.folder)?.name ?? "None",
      ],
      ["Tags", detail.tags.join(", ") || "None"],
      ["Integrations", appNames(detail.apps) || "None"],
      ["Owner", detail.team[0] ?? "Andi Wijaya"],
    ];
  });

  /* Home */
  protected readonly recent = computed(() =>
    [...this.workflows()].sort((a, b) => a.days - b.days).slice(0, 3),
  );
  protected readonly visibleRuns = computed(() =>
    runs.filter(
      (run) =>
        this.runFilter() === "all" || run.ok === (this.runFilter() === "ok"),
    ),
  );
  protected readonly homeTiles = computed((): [string, string | number][] => [
    [
      "Active workflows",
      this.workflows().filter((item) => item.status === "active").length,
    ],
    ["Runs today", this.workflows().reduce((sum, item) => sum + item.runs, 0)],
    ["Credits available", formatNumber(this.credits())],
    ["Unread notifications", this.unread()],
  ]);

  /* Templates */
  protected readonly visibleTemplates = computed(() =>
    templates.filter(
      (item) =>
        this.templateFilter() === "all" || item.tag === this.templateFilter(),
    ),
  );

  /* Knowledge Base */
  protected readonly visibleArticles = computed(() => {
    const needle = this.articleQuery().trim().toLowerCase();
    return articles.filter((item) =>
      `${item.title} ${item.category}`.toLowerCase().includes(needle),
    );
  });

  constructor() {
    const onHashChange = () => {
      this.openPage(readHash());
      document.getElementById(TITLE_ID)?.focus();
    };
    const onKeydown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "f")
        return;
      event.preventDefault();
      document.getElementById("alur-search")?.focus();
    };
    this.openPage(readHash());
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("keydown", onKeydown);
    inject(DestroyRef).onDestroy(() => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("keydown", onKeydown);
    });
  }

  private openPage(id: PageId) {
    this.page.set(id);
    this.runFilter.set("all");
    this.templateFilter.set("all");
    this.connected.set(DEFAULT_TOOLS);
    this.articleQuery.set("");
    this.installed.set(["m1"]);
    this.workspace.set(DEFAULT_WORKSPACE);
    this.prefs.set(DEFAULT_PREFS);
  }

  protected asPage(id: string) {
    return id as PageId;
  }

  // Halaman yang sama tidak memicu hashchange, jadi fokus judul langsung.
  protected go(id: PageId) {
    if (id === this.page()) document.getElementById(TITLE_ID)?.focus();
    else window.location.assign(`#${id}`);
  }

  protected search(value: string) {
    this.query.set(value);
    if (this.page() !== "workflows") this.go("workflows");
  }

  protected filterLabel(key: FilterKey) {
    return filterDefs
      .find((def) => def.key === key)
      ?.items.find((item) => item.value === this.filters()[key])?.label;
  }

  protected setFilter(key: FilterKey, value: string) {
    this.filters.update((filters) => ({ ...filters, [key]: value }));
  }

  /** ToggleGroup tidak boleh kosong: klik item aktif mengembalikan pilihan sebelumnya, seperti React. */
  protected pick(
    filter: ReturnType<typeof signal<string>>,
    group: ToggleGroup,
    value: string | string[] | undefined,
  ) {
    if (typeof value === "string" && value) filter.set(value);
    else group.value.set(filter());
  }

  protected isFavourite(id: string) {
    return this.favourites().includes(id);
  }

  protected openDetail(id: string) {
    this.selectedId.set(id);
    openDialog(DETAIL_ID);
  }

  protected toggleFavourite(id: string) {
    this.favourites.update((list) => toggleIn(list, id));
  }

  private createWorkflow(fields: Partial<Workflow>) {
    const nextId = this.nextId();
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
    this.nextId.set(nextId + 1);
    return created;
  }

  protected onMenu(kind: string, id: string, action: string) {
    const workflows = this.workflows();
    const source = workflows.find((item) => item.id === id);
    this.target.set({ kind, id });
    if (action === "rename") {
      const list = kind === "folder" ? this.folders() : workflows;
      this.draftName.set(list.find((item) => item.id === id)?.name ?? "");
      return openDialog(RENAME_ID);
    }
    if (action === "delete") return openDialog(DELETE_ID);
    if (!source) return;
    const copy = this.createWorkflow({
      ...source,
      name: `${source.name} copy`,
      status: "draft",
      days: 0,
      runs: 0,
    });
    const index = workflows.indexOf(source);
    this.workflows.set([
      ...workflows.slice(0, index + 1),
      copy,
      ...workflows.slice(index + 1),
    ]);
    toast({ title: "Workflow duplicated", description: copy.name });
  }

  /** Modal hanya memancarkan closed; returnValue dibaca dari dialog-nya. */
  protected onRenameClose() {
    const dialog = document.getElementById(RENAME_ID);
    if (!(dialog instanceof HTMLDialogElement)) return;
    const name = this.draftName().trim();
    if (dialog.returnValue === "save" && name) {
      const { kind, id } = this.target();
      const rename = <T extends { id: string; name: string }>(list: T[]) =>
        list.map((item) => (item.id === id ? { ...item, name } : item));
      if (kind === "folder") this.folders.update(rename);
      else this.workflows.update(rename);
      toast({ title: "Renamed", description: name, variant: "success" });
    }
    dialog.returnValue = "";
  }

  protected onDelete() {
    const { kind, id } = this.target();
    if (kind === "folder") {
      const name = this.deleting();
      this.folders.update((list) => list.filter((item) => item.id !== id));
      return toast({ title: "Folder deleted", description: name });
    }
    const removed = this.workflows().find((item) => item.id === id);
    if (!removed) return;
    this.workflows.update((list) => list.filter((item) => item.id !== id));
    this.favourites.update((list) => list.filter((entry) => entry !== id));
    this.trash.update((list) => [removed, ...list]);
    toast({ title: "Moved to Trash", description: removed.name });
  }

  protected resetDraft() {
    this.draft.update((draft) => ({ ...draft, name: "", status: "draft" }));
  }

  protected patchDraft(key: "name" | "folder" | "tag" | "status", value = "") {
    this.draft.update((draft) => ({ ...draft, [key]: value }));
  }

  protected onCreateClose() {
    const dialog = this.createModal()?.nativeElement.querySelector("dialog");
    if (!dialog) return;
    if (dialog.returnValue === "create") {
      const draft = this.draft();
      const created = this.createWorkflow({
        name: draft.name.trim() || "Untitled workflow",
        status: draft.status as Status,
        folder: draft.folder,
        tags: [draft.tag],
      });
      this.workflows.update((list) => [created, ...list]);
      toast({
        title: "Workflow created",
        description: created.name,
        variant: "success",
      });
    }
    dialog.returnValue = "";
  }

  protected applyTemplate(id: string) {
    const source = templates.find((item) => item.id === id)!;
    const created = this.createWorkflow({
      name: source.name,
      cover: source.cover,
      tags: [source.tag],
      apps: source.apps,
    });
    this.workflows.update((list) => [created, ...list]);
    toast({
      title: "Template added",
      description: `${source.name} is in My Workflows`,
      variant: "success",
    });
  }

  protected restore(id: string) {
    const item = this.trash().find((entry) => entry.id === id)!;
    this.trash.update((list) => list.filter((entry) => entry.id !== id));
    this.workflows.update((list) => [...list, item]);
    toast({ title: "Restored", description: item.name, variant: "success" });
  }

  protected setActive(on: boolean) {
    const detail = this.detail();
    if (!detail) return;
    this.workflows.update((list) =>
      list.map((item) =>
        item.id === detail.id
          ? { ...item, status: on ? "active" : "paused" }
          : item,
      ),
    );
    toast({
      title: on ? "Workflow activated" : "Workflow paused",
      description: detail.name,
    });
  }

  protected runNow() {
    const detail = this.detail();
    if (!detail) return;
    this.workflows.update((list) =>
      list.map((item) =>
        item.id === detail.id ? { ...item, runs: item.runs + 1 } : item,
      ),
    );
    this.credits.update((credits) => credits - RUN_COST);
    toast({
      title: "Run started",
      description: `${detail.name}, ${RUN_COST} credits`,
    });
  }

  protected resetFilters() {
    this.filters.set(DEFAULT_FILTERS);
    this.query.set("");
  }

  protected toggleTool(id: AppId) {
    this.connected.update((list) => toggleIn(list, id));
  }

  protected toggleAddon(id: string, name: string) {
    const adding = !this.installed().includes(id);
    this.installed.update((list) => toggleIn(list, id));
    toast({
      title: adding ? "Add-on installed" : "Add-on removed",
      description: name,
      variant: adding ? "success" : "default",
    });
  }

  protected markRead(id: string) {
    this.read.update((list) => [...list, id]);
  }

  protected markAllRead() {
    this.read.set(notifications.map((item) => item.id));
  }

  protected togglePref(key: string) {
    this.prefs.update((list) => toggleIn(list, key));
  }

  protected saveSettings(event: Event) {
    event.preventDefault();
    toast({
      title: "Settings saved",
      description: `${this.workspace()}, ${plural(this.prefs().length, "alert")} on`,
      variant: "success",
    });
  }
}
