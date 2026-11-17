<script setup lang="ts">
import {
  computed,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  type FunctionalComponent,
} from "vue";
import Avatar from "../../../components/avatar/Avatar.vue";
import Button from "../../../components/button/Button.vue";
import Drawer from "../../../components/drawer/Drawer.vue";
import DropdownMenu from "../../../components/dropdown-menu/DropdownMenu.vue";
import Input from "../../../components/input/Input.vue";
import Toaster, { toast } from "../../../components/toast/Toast.vue";

type DropdownMenuItem =
  { separator: true } | { separator?: false; label: string; value?: string };

// prettier-ignore
const icons = {
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  board: "M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v13h-4z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2",
  chat: "M7.9 20A9 9 0 1 0 4 16.1L2 22z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  plus: "M12 5v14M5 12h14",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3",
  filter: "M3 6h18M7 12h10M10 18h4",
  flame: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.2.3 1.6 1.3 2.7 2.5 2.7",
  arrow: "M7 17 17 7M7 7h10v10",
  video: "M15 10l5-3v10l-5-3M4 6h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2",
  mic: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3M19 10v2a7 7 0 0 1-14 0v-2M12 19v3",
  speaker: "M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14",
  end: "M10.7 13.3a16 16 0 0 0 3.4 2.6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 4.2 2 2 0 0 1 5.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.4 2.1L9.1 9.9M22 2 2 22",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M22 6l-10 7L2 6",
  check: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M8.5 12l2.5 2.5 4.5-5",
  clock: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20",
  menu: "M4 6h16M4 12h16M4 18h16",
  send: "m22 2-7 20-4-9-9-4zM22 2 11 13",
  next: "m9 18 6-6-6-6",
};
type IconName = keyof typeof icons;

// prettier-ignore
const pages = {
  workspace: { label: "Workspace", title: "Workspace", icon: "grid" },
  leads: { label: "Leads", title: "Leads", icon: "users" },
  pipeline: { label: "Pipeline", title: "Pipeline", icon: "board" },
  calendar: { label: "Calendar", title: "Calendar", icon: "calendar" },
  messages: { label: "Messages", title: "Messages", icon: "chat" },
} as const;
type PageId = keyof typeof pages;
const pageIds = Object.keys(pages) as PageId[];
const DEFAULT_PAGE: PageId = "workspace";
const TITLE_ID = "pipeline-page-title";
const LEAD_DRAWER = "pipeline-lead-drawer";
const LEAD_PREVIEW = 3;

// prettier-ignore
const stats = [
  { value: "34", unit: "Deals", badge: "+6", tone: "lime" },
  { value: "20", unit: "won", badge: "59%", tone: "lime" },
  { value: "3", unit: "lost", badge: "-2", tone: "rose" },
];

/* Jadwal hari ini: jendela 12:00 sampai 18:00. */
const DAY_START = 12;
const DAY_HOURS = 6;
const hourMarks = ["12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm"];
const NOW = 13 + 20 / 60;
// prettier-ignore
const meetings = [
  { id: "m1", start: 12, title: "Discovery Call", time: "12:00 pm", who: "Rina Wijaya" },
  { id: "m2", start: 14, title: "Video Call", time: "2:00 pm", who: "Bagus Hartono" },
  { id: "m3", start: 15, title: "Contract Review", time: "3:00 pm", who: "Sinta Maharani" },
  { id: "m4", start: 16, title: "Payment Terms", time: "4:00 pm", who: "Yudi Pranoto" },
  { id: "m5", start: 17, title: "Demo Recap", time: "5:00 pm", who: "Wulan Sari" },
];
const MEETING_SPAN = 0.75;
const at = (hour: number) => `${((hour - DAY_START) / DAY_HOURS) * 100}%`;

/* Leads */
// prettier-ignore
const interests = {
  hot: { label: "Hot Client", dot: "bg-(--tpl-hot)" },
  great: { label: "Great interest", dot: "bg-(--tpl-great)" },
  medium: { label: "Medium", dot: "bg-(--tpl-medium)" },
  low: { label: "Low", dot: "bg-(--tpl-low)" },
  none: { label: "Non interest", dot: "bg-(--tpl-none)" },
};
type Interest = keyof typeof interests;
const interestIds = Object.keys(interests) as Interest[];
// prettier-ignore
const leads: { id: string; name: string; role: string; company: string; source: string; interest: Interest; value: number; email: string; phone: string }[] = [
  { id: "l1", name: "Bagus Hartono", role: "Head of Sales", company: "Sinar Retail", source: "Website", interest: "hot", value: 85000000, email: "bagus@sinarretail.id", phone: "+62 812 3301 4410" },
  { id: "l2", name: "Rina Wijaya", role: "Operations Lead", company: "Kopi Lereng", source: "Referral", interest: "great", value: 45000000, email: "rina@kopilereng.id", phone: "+62 813 2290 1175" },
  { id: "l3", name: "Dodi Saputra", role: "Founder", company: "Rumah Tenun", source: "Event", interest: "medium", value: 18500000, email: "dodi@rumahtenun.id", phone: "+62 811 4502 8830" },
  { id: "l4", name: "Sinta Maharani", role: "Marketing Manager", company: "Arunika Travel", source: "Social", interest: "hot", value: 120000000, email: "sinta@arunika.id", phone: "+62 812 7781 0042" },
  { id: "l5", name: "Yudi Pranoto", role: "Finance Director", company: "Baja Mulia", source: "Cold email", interest: "low", value: 32000000, email: "yudi@bajamulia.id", phone: "+62 815 6610 2297" },
  { id: "l6", name: "Wulan Sari", role: "Product Owner", company: "Lumbung Data", source: "Website", interest: "great", value: 64000000, email: "wulan@lumbungdata.id", phone: "+62 817 1203 5546" },
  { id: "l7", name: "Hendra Gunawan", role: "Procurement", company: "Kertas Nusa", source: "Referral", interest: "none", value: 12000000, email: "hendra@kertasnusa.id", phone: "+62 819 8830 1204" },
  { id: "l8", name: "Maya Puspita", role: "Chief Executive", company: "Studio Rupa", source: "Event", interest: "medium", value: 27500000, email: "maya@studiorupa.id", phone: "+62 812 0045 7718" },
];
type Lead = (typeof leads)[number];
const leadFilters = ["all", ...interestIds] as const;
type LeadFilter = (typeof leadFilters)[number];
const filterLabel = (id: LeadFilter) =>
  id === "all" ? "All" : interests[id].label;

/* Tugas hari ini */
// prettier-ignore
const tasks = [
  { id: "t1", lead: "l1", meeting: "m2", title: "Video Call", app: "video", date: "Mon, 9 Nov", time: "2:00 pm - 2:45 pm", amount: 0, status: "Call scheduled", tags: ["hot", "today"] },
  { id: "t2", lead: "l2", meeting: "m1", title: "Send Proposal", app: "file", date: "Mon, 9 Nov", time: "Before 5:00 pm", amount: 45000000, status: "Waiting Proposal", tags: ["today"] },
  { id: "t3", lead: "l4", meeting: "m3", title: "Contract Review", app: "file", date: "Tue, 10 Nov", time: "10:00 am", amount: 120000000, status: "In progress", tags: ["hot"] },
  { id: "t4", lead: "l5", meeting: "m4", title: "Follow-up Email", app: "mail", date: "Fri, 6 Nov", time: "9:00 am", amount: 0, status: "Not started", tags: ["overdue"] },
  { id: "t5", lead: "l6", meeting: "m5", title: "Demo Recap", app: "check", date: "Mon, 9 Nov", time: "11:00 am", amount: 0, status: "Done", tags: [] as string[] },
] satisfies { app: IconName; [key: string]: unknown }[];
type Task = (typeof tasks)[number];
// prettier-ignore
const taskFilters = [
  { id: "all", label: "All" }, { id: "hot", label: "Hot" }, { id: "today", label: "Due Today" },
  { id: "overdue", label: "Overdue" }, { id: "done", label: "Completed" },
];
const statuses = [
  "Call scheduled",
  "Waiting Proposal",
  "In progress",
  "Not started",
  "Done",
];
const statusMenu: DropdownMenuItem[] = statuses.map((label) => ({
  label,
  value: label,
}));

// prettier-ignore
const summary = [
  { time: "00:00", text: "Intro and the tools Sinar Retail uses today" },
  { time: "06:40", text: "Follow-ups are slow across their three branches" },
  { time: "14:15", text: "Pricing for 40 seats on the annual plan" },
];
// prettier-ignore
const documents = [{ name: "Proposal.pdf", size: "2,4 MB" }, { name: "Pricing.xlsx", size: "860 KB" }];

/* Pipeline board */
const stages = ["Qualified", "Proposal", "Negotiation", "Won"];
// prettier-ignore
const dealList = [
  { id: "d1", company: "Sinar Retail", who: "Bagus Hartono", value: 85000000, stage: "Negotiation" },
  { id: "d2", company: "Kopi Lereng", who: "Rina Wijaya", value: 45000000, stage: "Proposal" },
  { id: "d3", company: "Arunika Travel", who: "Sinta Maharani", value: 120000000, stage: "Negotiation" },
  { id: "d4", company: "Rumah Tenun", who: "Dodi Saputra", value: 18500000, stage: "Qualified" },
  { id: "d5", company: "Lumbung Data", who: "Wulan Sari", value: 64000000, stage: "Won" },
  { id: "d6", company: "Studio Rupa", who: "Maya Puspita", value: 27500000, stage: "Qualified" },
];
type Deal = (typeof dealList)[number];

/* Calendar */
// prettier-ignore
const week = [
  { day: "9", label: "Mon", items: meetings.map(({ time, title, who }) => ({ time, title, who })) },
  { day: "10", label: "Tue", items: [{ time: "10:00 am", title: "Contract Review", who: "Sinta Maharani" }, { time: "1:30 pm", title: "Pipeline Sync", who: "Dodi Saputra" }] },
  { day: "11", label: "Wed", items: [] as { time: string; title: string; who: string }[] },
  { day: "12", label: "Thu", items: [{ time: "9:30 am", title: "Onboarding Kickoff", who: "Wulan Sari" }] },
  { day: "13", label: "Fri", items: [{ time: "3:00 pm", title: "Quarterly Review", who: "Maya Puspita" }] },
];

/* Messages */
// prettier-ignore
const threadList = [
  { id: "c1", who: "Bagus Hartono", messages: [
    { mine: false, text: "Can we move the call to 2 pm? Our branch heads want to join.", time: "9:12 am" },
    { mine: true, text: "Sure, 2 pm works. I will send the new invite.", time: "9:20 am" },
  ] },
  { id: "c2", who: "Rina Wijaya", messages: [
    { mine: false, text: "Looking forward to the proposal. Please include the training cost.", time: "Yesterday" },
  ] },
  { id: "c3", who: "Sinta Maharani", messages: [
    { mine: true, text: "The contract draft is ready for your legal team.", time: "Fri" },
    { mine: false, text: "Thanks, we will review it on Tuesday.", time: "Fri" },
  ] },
];
type Thread = (typeof threadList)[number];

/* Gaya */
// Palet lokal referensi, nilai terang dan gelap. Hex hanya di sini.
const palette =
  "[--tpl-bg:#eceef0] [--tpl-night:#121412] [--tpl-on-night:#f4f5f2] [--tpl-night-muted:#a8aea8] [--tpl-night-line:#2d322d] [--tpl-night-soft:#1f231f] [--tpl-lime:#d7f36c] [--tpl-lime-ink:#1b2208] [--tpl-lime-muted:#3d4a14] [--tpl-white:#ffffff] [--tpl-rose:#fde2e2] [--tpl-rose-ink:#8a1c1c] [--tpl-hot:#ef4444] [--tpl-great:#16a34a] [--tpl-medium:#f59e0b] [--tpl-low:#3b82f6] [--tpl-none:#a1a1aa] [--tpl-portrait-a:#d9e4ff] [--tpl-portrait-b:#f6dccb] [--tpl-av1:#c7dafd] [--tpl-av2:#fbd0da] [--tpl-av3:#fde68a] [--tpl-av4:#bfecd6] [--tpl-av5:#ddd3fb] [--tpl-av-ink:#1f2937] [--tpl-shadow:0_16px_40px_-24px_#0f172a40] dark:[--tpl-bg:#0b0d0b] dark:[--tpl-night:#000000] dark:[--tpl-night-line:#2a2f2a] dark:[--tpl-night-soft:#171a17] dark:[--tpl-lime:#c9e862] dark:[--tpl-rose:#3b1717] dark:[--tpl-rose-ink:#fecaca] dark:[--tpl-portrait-a:#28344f] dark:[--tpl-portrait-b:#4a3426] dark:[--tpl-shadow:0_16px_40px_-24px_#00000099]";
const shell = `${palette} min-h-dvh bg-(--tpl-bg) text-ink`;
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const roundButton = `relative inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-surface text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const railBase = `inline-flex size-12 items-center justify-center rounded-full transition-colors duration-150 ${focusRing}`;
const railActive = "bg-primary text-on-primary";
const railIdle = "bg-surface text-muted hover:text-ink";
const menuItem = `flex h-11 w-full items-center gap-3 rounded-full px-4 text-left text-sm font-medium transition-colors duration-150 ${focusRing}`;
const menuIdle = "text-ink hover:bg-subtle";
const chip = `inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${focusRing}`;
const chipOn = "bg-surface text-ink shadow-(--tpl-shadow)";
const chipOff = "text-muted ring-1 ring-line ring-inset hover:text-ink";
const face =
  "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-(--tpl-av-ink) select-none";
const faceTones = [
  "bg-(--tpl-av1)",
  "bg-(--tpl-av2)",
  "bg-(--tpl-av3)",
  "bg-(--tpl-av4)",
  "bg-(--tpl-av5)",
];
const statBadges: Record<string, string> = {
  lime: "bg-(--tpl-lime) text-(--tpl-lime-ink)",
  rose: "bg-(--tpl-rose) text-(--tpl-rose-ink)",
};
const card = "relative flex flex-col rounded-[28px] p-5";
// Potongan sudut kanan atas: soket berwarna latar dengan dua lengkung cekung, tombol ↗ duduk di dalamnya.
const socket =
  "absolute top-0 right-0 z-10 flex size-[58px] items-start justify-end rounded-bl-[26px] bg-(--tpl-bg) before:absolute before:top-0 before:right-full before:size-6 before:bg-[radial-gradient(circle_at_0_100%,transparent_24px,var(--tpl-bg)_24.5px)] after:absolute after:top-full after:right-0 after:size-6 after:bg-[radial-gradient(circle_at_0_100%,transparent_24px,var(--tpl-bg)_24.5px)]";
const cornerButton = `inline-flex size-12 items-center justify-center rounded-full bg-surface text-ink shadow-(--tpl-shadow) transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const selectable =
  "block max-w-full truncate text-left after:absolute after:inset-0 after:rounded-[28px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary";
const sourceChip =
  "inline-flex h-7 items-center rounded-full bg-subtle px-3 text-xs font-medium";
const darkButton = `inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-(--tpl-night) text-(--tpl-on-night) transition-opacity duration-150 hover:opacity-85 ${focusRing}`;
const callControl = `inline-flex size-11 items-center justify-center rounded-full transition-colors duration-150 ${focusRing}`;
const controlOn = "bg-subtle text-ink hover:bg-line";
const controlOff = "bg-(--tpl-night) text-(--tpl-on-night)";
const statusTrigger =
  "[&>button]:h-9 [&>button]:rounded-full [&>button]:border-0 [&>button]:px-3.5";
// prettier-ignore
const taskTones = {
  lime: { card: "bg-(--tpl-lime) text-(--tpl-lime-ink)", sub: "text-(--tpl-lime-muted)", soft: "bg-(--tpl-white) text-(--tpl-lime-ink)", menu: "[&>button]:bg-(--tpl-white) [&>button]:text-(--tpl-lime-ink)" },
  plain: { card: "bg-surface text-ink", sub: "text-muted", soft: "bg-subtle text-ink", menu: "[&>button]:bg-subtle [&>button]:text-ink" },
};
const panel = "rounded-[28px] bg-surface p-5";
const pillButton = `inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const slotBase = `absolute top-0 flex h-8 items-center gap-1.5 rounded-full bg-(--tpl-lime) pr-2.5 pl-1 text-[11px] font-semibold whitespace-nowrap text-(--tpl-lime-ink) transition-shadow duration-150 ${focusRing}`;
const slotOn =
  "ring-2 ring-(--tpl-on-night) ring-offset-2 ring-offset-(--tpl-night)";
const h2 = "text-2xl font-semibold tracking-tight";

const rupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;
/** Huruf pertama kata pertama dan terakhir, sama dengan Avatar. */
const initials = (name: string) =>
  name
    .split(" ")
    .filter((_, index, words) => index === 0 || index === words.length - 1)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
/** Warna avatar inisial yang selalu sama untuk nama yang sama. */
const faceTone = (name: string) =>
  faceTones[
    [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
      faceTones.length
  ];
const leadById = (id: string) => leads.find((item) => item.id === id)!;
const meetingById = (id: string) => meetings.find((item) => item.id === id)!;
const matchesLead = (lead: Lead, filter: LeadFilter) =>
  filter === "all" || lead.interest === filter;
const matchesTask = (task: Task, status: string, filter: string) =>
  filter === "all" ||
  (filter === "done" ? status === "Done" : task.tags.includes(filter));
const notify = (title: string, description = "") =>
  toast({ title, description });

/** Halaman aktif disimpan di hash URL supaya bisa dibagikan dan tombol Back bekerja. */
function readHash(): PageId {
  const id = window.location.hash.slice(1);
  return id in pages ? (id as PageId) : DEFAULT_PAGE;
}

function openDialog(id: string) {
  const dialog = document.getElementById(id);
  if (dialog instanceof HTMLDialogElement) dialog.showModal();
}

const Icon: FunctionalComponent<{ name: IconName }> = (props) =>
  h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.75",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true",
    },
    [h("path", { d: icons[props.name] })],
  );
Icon.props = ["name"];

const Face: FunctionalComponent<{ name: string }> = (props) =>
  h(
    "span",
    { "aria-hidden": "true", class: [face, faceTone(props.name)] },
    initials(props.name),
  );
Face.props = ["name"];

const Corner: FunctionalComponent<{ label: string }, { open: () => void }> = (
  props,
  { emit },
) =>
  h("span", { class: socket }, [
    h(
      "button",
      {
        type: "button",
        "aria-label": props.label,
        class: cornerButton,
        onClick: () => emit("open"),
      },
      [h(Icon, { name: "arrow", class: "size-5" })],
    ),
  ]);
Corner.props = ["label"];
Corner.emits = ["open"];

const Chips: FunctionalComponent<
  { label: string; items: { id: string; label: string }[]; value: string },
  { change: (id: string) => void }
> = (props, { emit }) =>
  h(
    "div",
    { role: "group", "aria-label": props.label, class: "flex flex-wrap gap-2" },
    props.items.map((item) =>
      h(
        "button",
        {
          key: item.id,
          type: "button",
          "aria-pressed": props.value === item.id ? "true" : "false",
          class: [chip, props.value === item.id ? chipOn : chipOff],
          onClick: () => emit("change", item.id),
        },
        [
          item.id === "hot"
            ? h(Icon, { name: "flame", class: "size-4 text-(--tpl-hot)" })
            : null,
          item.label,
        ],
      ),
    ),
  );
Chips.props = ["label", "items", "value"];
Chips.emits = ["change"];

const LeadCard: FunctionalComponent<{ lead: Lead }, { open: () => void }> = (
  { lead },
  { emit },
) =>
  h("li", { "data-lead": lead.id, class: [card, "min-h-48 bg-surface"] }, [
    h("div", { class: "flex items-center gap-3 pr-14" }, [
      h(Face, { name: lead.name, class: "size-12 text-sm" }),
      h("div", { class: "min-w-0" }, [
        h("h3", { class: "truncate text-xl font-semibold tracking-tight" }, [
          h(
            "button",
            { type: "button", class: selectable, onClick: () => emit("open") },
            lead.name,
          ),
        ]),
        h(
          "p",
          { class: "text-sm text-muted" },
          `${lead.role} @ ${lead.company}`,
        ),
      ]),
    ]),
    h(Corner, { label: `Open ${lead.name}`, onOpen: () => emit("open") }),
    h("dl", { class: "mt-auto grid grid-cols-2 gap-3 pt-6" }, [
      h("div", [
        h("dt", { class: "text-xs text-muted" }, "Source"),
        h("dd", { class: "mt-1.5" }, [
          h("span", { class: sourceChip }, lead.source),
        ]),
      ]),
      h("div", [
        h("dt", { class: "text-xs text-muted" }, "Interest"),
        h(
          "dd",
          { class: "mt-1.5 flex h-7 items-center gap-2 text-sm font-medium" },
          [
            h("span", {
              "aria-hidden": "true",
              class: ["size-2 rounded-full", interests[lead.interest].dot],
            }),
            interests[lead.interest].label,
          ],
        ),
      ]),
    ]),
  ]);
LeadCard.props = ["lead"];
LeadCard.emits = ["open"];

const LeadGrid: FunctionalComponent<
  { items: Lead[] },
  { open: (id: string) => void }
> = ({ items }, { emit }) =>
  items.length === 0
    ? h("p", { class: "text-sm text-muted" }, "No leads match this filter.")
    : h(
        "ul",
        { class: "grid gap-4 md:grid-cols-2 2xl:grid-cols-3" },
        items.map((lead) =>
          h(LeadCard, {
            key: lead.id,
            lead,
            onOpen: () => emit("open", lead.id),
          }),
        ),
      );
LeadGrid.props = ["items"];
LeadGrid.emits = ["open"];

const leadChips = leadFilters.map((id) => ({ id, label: filterLabel(id) }));
const callControls: {
  key: "camera" | "mic" | "speaker";
  label: string;
  icon: IconName;
}[] = [
  { key: "camera", label: "Camera", icon: "video" },
  { key: "mic", label: "Microphone", icon: "mic" },
  { key: "speaker", label: "Speaker", icon: "speaker" },
];

/* Navigasi dan state bersama */
const page = ref<PageId>(DEFAULT_PAGE);
const leadId = ref("l1");
const meetingId = ref("m2");
const callOpen = ref(true);
const lead = computed(() => leadById(leadId.value));
const meeting = computed(() => meetingById(meetingId.value));
const go = (id: PageId) => window.location.assign(`#${id}`);
const current = (id: PageId) => (page.value === id ? "page" : undefined);
function openLead(id: string) {
  leadId.value = id;
  openDialog(LEAD_DRAWER);
}
function pickMeeting(id: string) {
  meetingId.value = id;
  callOpen.value = true;
}
function onHashChange() {
  page.value = readHash();
  document.getElementById(TITLE_ID)?.focus();
}
onMounted(() => {
  page.value = readHash();
  window.addEventListener("hashchange", onHashChange);
});
onBeforeUnmount(() => window.removeEventListener("hashchange", onHashChange));
function newTask() {
  toast({
    title: "Task created",
    description: "Follow up with Maya Puspita, tomorrow 10:00 am",
    variant: "success",
  });
}
function scheduleCall() {
  toast({
    title: "Call scheduled",
    description: `${lead.value.name}, tomorrow 10:00 am`,
    variant: "success",
  });
}

/* Workspace */
const leadFilter = ref<LeadFilter>("all");
const taskFilter = ref("all");
const searching = ref(false);
const query = ref("");
const byInterest = ref(false);
const status = ref<Record<string, string>>(
  Object.fromEntries(tasks.map((task) => [task.id, task.status])),
);
const controls = ref({ camera: true, mic: true, speaker: true });
const shownLeads = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return leads
    .filter(
      (item) =>
        matchesLead(item, leadFilter.value) &&
        item.name.toLowerCase().includes(needle),
    )
    .sort((a, b) =>
      byInterest.value
        ? interestIds.indexOf(a.interest) - interestIds.indexOf(b.interest)
        : 0,
    )
    .slice(0, LEAD_PREVIEW);
});
const shownTasks = computed(() =>
  tasks.filter((task) =>
    matchesTask(task, status.value[task.id]!, taskFilter.value),
  ),
);
const calling = (task: Task) =>
  callOpen.value && meetingId.value === task.meeting;
function changeStatus(task: Task, value: string) {
  status.value = { ...status.value, [task.id]: value };
  toast({
    title: "Status updated",
    description: `${task.title}: ${value}`,
    variant: "success",
  });
}
function toggleCall(task: Task) {
  const same = calling(task);
  meetingId.value = task.meeting;
  callOpen.value = !same;
}
function endCall() {
  callOpen.value = false;
  controls.value = { camera: true, mic: true, speaker: true };
  notify("Call ended", `${meeting.value.title} with ${meeting.value.who}`);
}

/* Leads */
const allFilter = ref<LeadFilter>("all");
const allQuery = ref("");
const allLeads = computed(() => {
  const needle = allQuery.value.trim().toLowerCase();
  return leads.filter(
    (item) =>
      matchesLead(item, allFilter.value) &&
      `${item.name} ${item.company}`.toLowerCase().includes(needle),
  );
});

/* Pipeline */
const deals = ref<Deal[]>(dealList);
const nextStage = (stage: string) => stages[stages.indexOf(stage) + 1]!;
const stageDeals = (stage: string) =>
  deals.value.filter((deal) => deal.stage === stage);
const stageTotal = (stage: string) =>
  stageDeals(stage).reduce((sum, deal) => sum + deal.value, 0);
function move(deal: Deal) {
  const next = nextStage(deal.stage);
  deals.value = deals.value.map((item) =>
    item.id === deal.id ? { ...item, stage: next } : item,
  );
  toast({
    title: `Moved to ${next}`,
    description: deal.company,
    variant: "success",
  });
}

/* Calendar */
const day = ref("9");
const currentDay = computed(() => week.find((item) => item.day === day.value)!);

/* Messages */
const threads = ref<Thread[]>(threadList);
const activeId = ref("c1");
const draft = ref("");
const activeThread = computed(() =>
  threads.value.find((item) => item.id === activeId.value)!,
);
function send() {
  const text = draft.value.trim();
  if (!text) return;
  threads.value = threads.value.map((item) =>
    item.id === activeId.value
      ? {
          ...item,
          messages: [...item.messages, { mine: true, text, time: "Now" }],
        }
      : item,
  );
  draft.value = "";
  notify("Message sent", activeThread.value.who);
}
</script>

<template>
  <div :class="shell">
    <header class="flex h-20 items-center gap-4 px-4 lg:px-6">
      <Drawer title="Menu" side="left">
        <template #trigger>
          <button
            type="button"
            aria-label="Open menu"
            :class="[roundButton, 'lg:hidden']"
          >
            <Icon name="menu" class="size-5" />
          </button>
        </template>
        <form method="dialog" class="grid gap-1">
          <button
            v-for="id in pageIds"
            :key="id"
            type="submit"
            :aria-current="current(id)"
            :class="[menuItem, page === id ? railActive : menuIdle]"
            @click="go(id)"
          >
            <Icon :name="pages[id].icon" class="size-5" />
            {{ pages[id].label }}
          </button>
        </form>
      </Drawer>
      <div class="flex shrink-0 items-center gap-2.5">
        <span
          aria-hidden="true"
          class="flex size-11 items-center justify-center rounded-full bg-(--tpl-night) text-(--tpl-lime) dark:ring-1 dark:ring-line"
        >
          <svg
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M5 17V7M12 17V4M19 17v-6" />
          </svg>
        </span>
        <p class="text-lg font-bold tracking-tight">Pipeline</p>
      </div>
      <section
        aria-labelledby="pipeline-schedule-title"
        class="mx-auto hidden h-16 max-w-[880px] min-w-0 flex-1 items-center gap-5 rounded-full bg-(--tpl-night) pr-4 pl-6 text-(--tpl-on-night) xl:flex dark:ring-1 dark:ring-line"
      >
        <div class="shrink-0 leading-tight">
          <h2 id="pipeline-schedule-title" class="text-sm font-semibold">
            Your Schedule
          </h2>
          <p class="text-xs text-(--tpl-night-muted)">Mon, 9 Nov 2026</p>
        </div>
        <div class="relative h-12 min-w-0 flex-1">
          <div
            aria-hidden="true"
            class="absolute inset-x-0 top-0 flex text-[10px] text-(--tpl-night-muted)"
          >
            <span
              v-for="mark in hourMarks"
              :key="mark"
              class="flex-1 border-l border-(--tpl-night-line) pl-1.5"
              >{{ mark }}</span
            >
          </div>
          <ul
            aria-label="Meetings today"
            class="absolute inset-x-0 bottom-0 h-8"
          >
            <li v-for="item in meetings" :key="item.id">
              <button
                type="button"
                :aria-pressed="meetingId === item.id ? 'true' : 'false'"
                :class="[slotBase, meetingId === item.id && slotOn]"
                :style="{
                  left: at(item.start),
                  width: `calc(${(MEETING_SPAN / DAY_HOURS) * 100}% - 4px)`,
                }"
                @click="pickMeeting(item.id)"
              >
                <Face :name="item.who" class="size-6 text-[9px]" />
                {{ item.time }}
                <span class="sr-only">{{
                  `, ${item.title} with ${item.who}`
                }}</span>
              </button>
            </li>
          </ul>
          <span
            aria-hidden="true"
            class="absolute -top-1 bottom-0 w-0.5 rounded-full bg-(--tpl-lime) before:absolute before:-top-1 before:-left-[3px] before:size-2 before:rounded-full before:bg-(--tpl-lime)"
            :style="{ left: at(NOW) }"
          />
          <span class="sr-only">Now 1:20 pm</span>
        </div>
      </section>
      <div class="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">
        <button
          type="button"
          aria-label="Notifications, 3 unread"
          :class="roundButton"
          @click="
            notify('3 unread notifications', 'Sinta Maharani signed the NDA')
          "
        >
          <Icon name="bell" class="size-5" />
          <span
            aria-hidden="true"
            class="absolute top-2.5 right-2.5 size-2 rounded-full bg-danger ring-2 ring-surface"
          />
        </button>
        <Avatar name="Ahmad Fauzi" size="md" class="ring-2 ring-surface" />
      </div>
    </header>

    <div
      class="px-4 pb-10 lg:grid lg:grid-cols-[48px_minmax(0,1fr)] lg:gap-6 lg:px-6"
    >
      <div class="hidden lg:block">
        <nav
          aria-label="Workspace"
          class="sticky top-6 flex flex-col items-center gap-2"
        >
          <button
            v-for="id in pageIds"
            :key="id"
            type="button"
            :aria-label="pages[id].label"
            :aria-current="current(id)"
            :class="[railBase, page === id ? railActive : railIdle]"
            @click="go(id)"
          >
            <Icon :name="pages[id].icon" class="size-5" />
          </button>
          <span aria-hidden="true" class="my-1 h-px w-6 bg-line" />
          <button
            type="button"
            aria-label="Settings"
            :class="[railBase, railIdle]"
            @click="notify('Settings', 'Workspace settings are up to date')"
          >
            <Icon name="settings" class="size-5" />
          </button>
        </nav>
      </div>

      <main class="grid min-w-0 content-start gap-8">
        <div
          class="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 pt-2"
        >
          <div class="flex flex-wrap items-end gap-4">
            <div>
              <p class="text-sm text-muted">
                {{ `Pipeline / ${pages[page].label}` }}
              </p>
              <h1
                :id="TITLE_ID"
                tabindex="-1"
                class="mt-1 text-[34px] leading-none font-extrabold tracking-[0.14em] uppercase focus:outline-none sm:text-[56px]"
              >
                {{ pages[page].title }}
              </h1>
            </div>
            <button
              type="button"
              :class="[pillButton, 'mb-1']"
              @click="newTask"
            >
              <Icon name="plus" class="size-4" />
              New Task
            </button>
          </div>
          <dl class="flex flex-wrap gap-x-8 gap-y-3">
            <div
              v-for="stat in stats"
              :key="stat.unit"
              class="flex items-start gap-2"
            >
              <dt class="sr-only">{{ stat.unit }}</dt>
              <dd class="flex items-baseline gap-1.5">
                <span
                  class="text-[44px] leading-none font-semibold tracking-tight tabular-nums"
                  >{{ stat.value }}</span
                >
                <span class="text-base text-muted">{{ stat.unit }}</span>
              </dd>
              <dd
                :class="[
                  'rounded-full px-2 py-0.5 text-xs font-semibold',
                  statBadges[stat.tone],
                ]"
              >
                {{ stat.badge }}
              </dd>
            </div>
          </dl>
        </div>

        <div
          v-if="page === 'workspace'"
          class="grid min-w-0 content-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]"
        >
          <div class="grid min-w-0 content-start gap-8">
            <section aria-labelledby="pipeline-leads-title" class="grid gap-4">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <h2 id="pipeline-leads-title" :class="h2">
                  New Leads
                  <span
                    class="ml-1 text-muted underline decoration-2 underline-offset-[6px]"
                    >{{ leads.length }}</span
                  >
                </h2>
                <div class="flex gap-2">
                  <button
                    type="button"
                    aria-label="Search leads"
                    :aria-expanded="searching ? 'true' : 'false'"
                    :class="roundButton"
                    @click="searching = !searching"
                  >
                    <Icon name="search" class="size-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Sort by interest"
                    :aria-pressed="byInterest ? 'true' : 'false'"
                    :class="[
                      roundButton,
                      byInterest &&
                        'bg-primary text-on-primary hover:bg-primary',
                    ]"
                    @click="byInterest = !byInterest"
                  >
                    <Icon name="filter" class="size-5" />
                  </button>
                </div>
              </div>
              <Input
                v-if="searching"
                v-model="query"
                label="Search by name"
                type="search"
                class="max-w-sm"
              />
              <Chips
                label="Filter leads by interest"
                :items="leadChips"
                :value="leadFilter"
                @change="leadFilter = $event as LeadFilter"
              />
              <LeadGrid :items="shownLeads" @open="openLead" />
            </section>

            <section aria-labelledby="pipeline-tasks-title" class="grid gap-4">
              <h2 id="pipeline-tasks-title" :class="h2">
                Your Days Tasks
                <span
                  class="ml-1 text-muted underline decoration-2 underline-offset-[6px]"
                  >{{ tasks.length }}</span
                >
              </h2>
              <Chips
                label="Filter tasks"
                :items="taskFilters"
                :value="taskFilter"
                @change="taskFilter = $event"
              />
              <p v-if="shownTasks.length === 0" class="text-sm text-muted">
                No tasks in this view.
              </p>
              <ul v-else class="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                <li
                  v-for="(task, index) in shownTasks"
                  :key="task.id"
                  :data-task="task.id"
                  :class="[
                    card,
                    'min-h-64',
                    taskTones[index === 0 ? 'lime' : 'plain'].card,
                  ]"
                >
                  <div class="flex items-center gap-3 pr-24">
                    <Face
                      :name="leadById(task.lead).name"
                      class="size-11 text-sm"
                    />
                    <div class="min-w-0">
                      <p class="truncate font-semibold">
                        {{ leadById(task.lead).name }}
                      </p>
                      <p
                        :class="[
                          'truncate text-xs',
                          taskTones[index === 0 ? 'lime' : 'plain'].sub,
                        ]"
                      >
                        {{ leadById(task.lead).role }}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    :aria-label="`Remind me about ${task.title}`"
                    :class="[
                      'absolute top-1 right-[66px] inline-flex size-10 items-center justify-center rounded-full',
                      taskTones[index === 0 ? 'lime' : 'plain'].soft,
                      focusRing,
                    ]"
                    @click="
                      notify('Reminder set', `${task.title}, ${task.time}`)
                    "
                  >
                    <Icon name="bell" class="size-4" />
                  </button>
                  <Corner
                    :label="`Open ${task.title}`"
                    @open="openLead(task.lead)"
                  />
                  <span
                    aria-hidden="true"
                    :class="[
                      'mt-5 inline-flex size-11 items-center justify-center rounded-2xl',
                      taskTones[index === 0 ? 'lime' : 'plain'].soft,
                    ]"
                  >
                    <Icon :name="task.app" class="size-5" />
                  </span>
                  <h3 class="mt-3 text-2xl font-semibold tracking-tight">
                    {{ task.title }}
                  </h3>
                  <p
                    :class="[
                      'mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm',
                      taskTones[index === 0 ? 'lime' : 'plain'].sub,
                    ]"
                  >
                    <span class="inline-flex items-center gap-1.5">
                      <Icon name="calendar" class="size-4" />
                      {{ task.date }}
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                      <Icon name="clock" class="size-4" />
                      {{ task.time }}
                    </span>
                  </p>
                  <p
                    v-if="task.amount > 0"
                    class="mt-2 text-lg font-semibold tabular-nums"
                  >
                    {{ rupiah(task.amount) }}
                  </p>
                  <div
                    class="mt-auto flex items-center justify-between gap-2 pt-5"
                  >
                    <DropdownMenu
                      :items="statusMenu"
                      :class="[
                        statusTrigger,
                        taskTones[index === 0 ? 'lime' : 'plain'].menu,
                      ]"
                      @select="changeStatus(task, $event)"
                    >
                      <template #trigger>
                        <span class="sr-only">{{
                          `${task.title} status: `
                        }}</span>
                        <span data-status>{{ status[task.id] }}</span>
                      </template>
                    </DropdownMenu>
                    <div class="flex gap-2">
                      <button
                        type="button"
                        :aria-label="`Message ${leadById(task.lead).name}`"
                        :class="darkButton"
                        @click="go('messages')"
                      >
                        <Icon name="chat" class="size-4" />
                      </button>
                      <button
                        type="button"
                        :aria-label="`Video call with ${leadById(task.lead).name}`"
                        :aria-pressed="calling(task) ? 'true' : 'false'"
                        :class="darkButton"
                        @click="toggleCall(task)"
                      >
                        <Icon name="video" class="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          </div>

          <aside
            aria-label="Call and summary"
            class="grid content-start gap-4 xl:sticky xl:top-6"
          >
            <section
              v-if="callOpen"
              aria-labelledby="pipeline-call-title"
              data-call
              class="rounded-[28px] bg-surface p-3 shadow-(--tpl-shadow)"
            >
              <div
                class="relative aspect-[4/3] overflow-hidden rounded-3xl bg-linear-160 from-(--tpl-portrait-a) to-(--tpl-portrait-b)"
              >
                <span
                  aria-hidden="true"
                  class="absolute bottom-0 left-1/2 h-[34%] w-[62%] -translate-x-1/2 rounded-t-full bg-(--tpl-white)/45"
                />
                <Face
                  :name="meeting.who"
                  class="absolute top-[22%] left-1/2 size-24 -translate-x-1/2 text-2xl ring-4 ring-(--tpl-white)/60"
                />
                <span
                  class="absolute top-3 left-3 inline-flex h-7 items-center gap-1.5 rounded-full bg-(--tpl-night) px-2.5 text-xs font-medium text-(--tpl-on-night) tabular-nums"
                >
                  <span
                    aria-hidden="true"
                    class="size-2 rounded-full bg-danger"
                  />
                  12:48
                </span>
                <span
                  class="absolute top-3 right-3 inline-flex size-14 items-center justify-center rounded-2xl bg-(--tpl-night)"
                >
                  <Face name="Ahmad Fauzi" class="size-8 text-[11px]" />
                </span>
                <span
                  class="absolute bottom-3 left-3 inline-flex h-7 items-center rounded-full bg-surface px-3 text-xs font-semibold"
                  >{{ meeting.who }}</span
                >
              </div>
              <div class="px-2 pt-3">
                <h2 id="pipeline-call-title" class="font-semibold">
                  {{ meeting.title }}
                </h2>
                <p class="text-xs text-muted">
                  {{ `${meeting.time} with ${meeting.who}` }}
                </p>
              </div>
              <div class="flex items-center justify-center gap-2 pt-3 pb-1">
                <button
                  v-for="item in callControls"
                  :key="item.key"
                  type="button"
                  :aria-label="item.label"
                  :aria-pressed="controls[item.key] ? 'true' : 'false'"
                  :class="[
                    callControl,
                    controls[item.key] ? controlOn : controlOff,
                  ]"
                  @click="
                    controls = { ...controls, [item.key]: !controls[item.key] }
                  "
                >
                  <Icon :name="item.icon" class="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="End call"
                  :class="`inline-flex h-11 w-16 items-center justify-center rounded-full bg-danger text-(--tpl-white) transition-opacity duration-150 hover:opacity-90 ${focusRing}`"
                  @click="endCall"
                >
                  <Icon name="end" class="size-5" />
                </button>
              </div>
            </section>
            <section
              v-else
              aria-labelledby="pipeline-call-title"
              data-call-closed
              :class="panel"
            >
              <h2 id="pipeline-call-title" class="font-semibold">
                No active call
              </h2>
              <p class="mt-1 text-sm text-muted">
                Pick a meeting from your schedule or start a video call from a
                task.
              </p>
              <button
                type="button"
                :class="[pillButton, 'mt-4']"
                @click="callOpen = true"
              >
                <Icon name="video" class="size-4" />
                {{ `Join ${meeting.title}` }}
              </button>
            </section>
            <section
              aria-labelledby="pipeline-summary-title"
              class="rounded-[28px] bg-(--tpl-night) p-5 text-(--tpl-on-night) dark:ring-1 dark:ring-line"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h2 id="pipeline-summary-title" class="text-lg font-semibold">
                    Summary
                  </h2>
                  <p class="text-xs text-(--tpl-night-muted)">
                    Last call with Bagus Hartono
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Open summary"
                  :class="`inline-flex size-9 items-center justify-center rounded-full bg-(--tpl-night-soft) ${focusRing}`"
                  @click="notify('Summary opened', 'Call notes, 3 highlights')"
                >
                  <Icon name="arrow" class="size-4" />
                </button>
              </div>
              <ol class="mt-4 grid gap-3">
                <li
                  v-for="item in summary"
                  :key="item.time"
                  class="grid grid-cols-[44px_1fr] gap-3"
                >
                  <span
                    class="pt-0.5 text-xs text-(--tpl-night-muted) tabular-nums"
                    >{{ item.time }}</span
                  >
                  <p class="border-l border-(--tpl-night-line) pl-3 text-sm">
                    {{ item.text }}
                  </p>
                </li>
              </ol>
              <h3 class="mt-5 text-sm font-semibold">Documents</h3>
              <ul class="mt-2 grid grid-cols-2 gap-3">
                <li
                  v-for="doc in documents"
                  :key="doc.name"
                  class="rounded-2xl bg-(--tpl-night-soft) p-3"
                >
                  <span
                    aria-hidden="true"
                    class="grid h-16 content-start gap-1.5 rounded-xl bg-(--tpl-night-line) p-2.5"
                  >
                    <span
                      class="h-1.5 w-3/4 rounded-full bg-(--tpl-night-muted)"
                    />
                    <span
                      class="h-1.5 w-full rounded-full bg-(--tpl-night-soft)"
                    />
                    <span
                      class="h-1.5 w-2/3 rounded-full bg-(--tpl-night-soft)"
                    />
                  </span>
                  <p class="mt-2 truncate text-xs font-medium">
                    {{ doc.name }}
                  </p>
                  <p class="text-xs text-(--tpl-night-muted)">{{ doc.size }}</p>
                </li>
              </ul>
              <h3 class="mt-5 text-sm font-semibold">Goal</h3>
              <p class="mt-1 text-sm text-(--tpl-night-muted)">
                Close the 40 seat annual plan before 30 Nov, starting with a
                pilot in the Bandung branch.
              </p>
            </section>
          </aside>
        </div>

        <section
          v-else-if="page === 'leads'"
          aria-labelledby="pipeline-all-leads"
          class="grid gap-4"
        >
          <div class="flex flex-wrap items-end justify-between gap-3">
            <h2 id="pipeline-all-leads" :class="h2">
              {{ plural(allLeads.length, "lead") }}
            </h2>
            <div class="w-full max-w-xs">
              <Input v-model="allQuery" label="Search leads" type="search" />
            </div>
          </div>
          <Chips
            label="Filter leads by interest"
            :items="leadChips"
            :value="allFilter"
            @change="allFilter = $event as LeadFilter"
          />
          <LeadGrid :items="allLeads" @open="openLead" />
        </section>

        <div
          v-else-if="page === 'pipeline'"
          class="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          <section
            v-for="stage in stages"
            :key="stage"
            :aria-label="stage"
            :data-stage="stage"
            class="grid content-start gap-3 rounded-[28px] p-3 ring-1 ring-line ring-inset"
          >
            <div class="flex items-baseline justify-between gap-2 px-2 pt-1">
              <h2 class="font-semibold">{{ stage }}</h2>
              <p class="text-xs text-muted tabular-nums">
                {{
                  `${stageDeals(stage).length} · ${rupiah(stageTotal(stage))}`
                }}
              </p>
            </div>
            <article
              v-for="deal in stageDeals(stage)"
              :key="deal.id"
              :data-deal="deal.id"
              class="grid gap-3 rounded-3xl bg-surface p-4"
            >
              <div class="flex items-center gap-3">
                <Face :name="deal.who" class="size-9 text-xs" />
                <div class="min-w-0">
                  <h3 class="truncate font-semibold">{{ deal.company }}</h3>
                  <p class="truncate text-xs text-muted">{{ deal.who }}</p>
                </div>
              </div>
              <div class="flex items-center justify-between gap-2">
                <p class="font-semibold tabular-nums">
                  {{ rupiah(deal.value) }}
                </p>
                <button
                  v-if="stage !== 'Won'"
                  type="button"
                  :aria-label="`Move ${deal.company} to ${nextStage(stage)}`"
                  :class="darkButton"
                  @click="move(deal)"
                >
                  <Icon name="next" class="size-4" />
                </button>
              </div>
            </article>
          </section>
        </div>

        <section
          v-else-if="page === 'calendar'"
          aria-labelledby="pipeline-agenda-title"
          :class="[panel, 'grid gap-5']"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 id="pipeline-agenda-title" :class="h2">
              {{ `November ${day}` }}
            </h2>
            <button
              type="button"
              :class="pillButton"
              @click="
                notify(
                  'Meeting added',
                  `${currentDay.label}, ${day} Nov at 4:00 pm`,
                )
              "
            >
              <Icon name="plus" class="size-4" />
              Add meeting
            </button>
          </div>
          <div
            role="group"
            aria-label="Pick a day"
            class="grid grid-cols-5 gap-2"
          >
            <button
              v-for="item in week"
              :key="item.day"
              type="button"
              :aria-pressed="day === item.day ? 'true' : 'false'"
              :class="[
                'grid h-16 place-content-center rounded-2xl text-center transition-colors duration-150',
                focusRing,
                day === item.day
                  ? railActive
                  : 'bg-subtle text-ink hover:bg-line',
              ]"
              @click="day = item.day"
            >
              <span class="text-xs">{{ item.label }}</span>
              <span class="text-lg font-semibold tabular-nums">{{
                item.day
              }}</span>
            </button>
          </div>
          <p
            v-if="currentDay.items.length === 0"
            data-agenda
            class="text-sm text-muted"
          >
            No meetings on this day.
          </p>
          <ul v-else data-agenda class="grid gap-2">
            <li
              v-for="item in currentDay.items"
              :key="item.time"
              class="flex items-center gap-3 rounded-2xl bg-subtle p-3"
            >
              <span class="w-20 shrink-0 text-sm font-semibold tabular-nums">{{
                item.time
              }}</span>
              <Face :name="item.who" class="size-8 text-[11px]" />
              <div class="min-w-0">
                <p class="truncate text-sm font-medium">{{ item.title }}</p>
                <p class="truncate text-xs text-muted">{{ item.who }}</p>
              </div>
            </li>
          </ul>
        </section>

        <div v-else class="grid gap-4 md:grid-cols-[280px_minmax(0,1fr)]">
          <ul
            aria-label="Conversations"
            :class="[panel, 'grid grid-cols-1 content-start gap-1 p-2']"
          >
            <li v-for="item in threads" :key="item.id">
              <button
                type="button"
                :aria-pressed="activeId === item.id ? 'true' : 'false'"
                :class="[
                  'flex w-full items-center gap-3 rounded-3xl p-3 text-left transition-colors duration-150',
                  focusRing,
                  activeId === item.id ? 'bg-subtle' : 'hover:bg-subtle',
                ]"
                @click="activeId = item.id"
              >
                <Face :name="item.who" class="size-10 text-xs" />
                <span class="min-w-0">
                  <span class="block truncate text-sm font-semibold">{{
                    item.who
                  }}</span>
                  <span class="block truncate text-xs text-muted">{{
                    item.messages[item.messages.length - 1]!.text
                  }}</span>
                </span>
              </button>
            </li>
          </ul>
          <section
            aria-labelledby="pipeline-thread-title"
            :class="[panel, 'grid content-start gap-4']"
          >
            <h2 id="pipeline-thread-title" class="text-lg font-semibold">
              {{ activeThread.who }}
            </h2>
            <ol data-thread class="grid gap-2">
              <li
                v-for="(message, index) in activeThread.messages"
                :key="index"
                :class="[
                  'max-w-[80%] rounded-3xl px-4 py-2.5 text-sm',
                  message.mine
                    ? 'justify-self-end bg-(--tpl-night) text-(--tpl-on-night)'
                    : 'justify-self-start bg-subtle',
                ]"
              >
                <p>{{ message.text }}</p>
                <p
                  :class="[
                    'mt-1 text-xs',
                    message.mine ? 'text-(--tpl-night-muted)' : 'text-muted',
                  ]"
                >
                  {{ message.time }}
                </p>
              </li>
            </ol>
            <form class="flex items-end gap-2" @submit.prevent="send">
              <div class="min-w-0 flex-1">
                <Input v-model="draft" label="Message" />
              </div>
              <button type="submit" :class="pillButton">
                <Icon name="send" class="size-4" />
                Send
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>

    <Drawer :id="LEAD_DRAWER" title="Lead details">
      <div class="grid gap-5 text-ink">
        <div class="flex items-center gap-3">
          <Face :name="lead.name" class="size-14 text-base" />
          <div class="min-w-0">
            <p class="text-lg font-semibold">{{ lead.name }}</p>
            <p class="text-sm text-muted">
              {{ `${lead.role} @ ${lead.company}` }}
            </p>
          </div>
        </div>
        <dl class="grid grid-cols-2 gap-3">
          <div
            v-for="[label, value] in [
              ['Interest', interests[lead.interest].label],
              ['Source', lead.source],
              ['Deal value', rupiah(lead.value)],
              ['Phone', lead.phone],
            ]"
            :key="label"
            class="rounded-2xl bg-subtle p-3"
          >
            <dt class="text-xs text-muted">{{ label }}</dt>
            <dd :data-field="label" class="mt-1 text-sm font-medium">
              {{ value }}
            </dd>
          </div>
        </dl>
        <p class="text-sm text-muted">{{ `Email ${lead.email}` }}</p>
      </div>
      <template #footer>
        <Button variant="secondary" type="submit" value="close">Close</Button>
        <Button type="submit" value="schedule" @click="scheduleCall">
          Schedule call
        </Button>
      </template>
    </Drawer>
    <Toaster />
  </div>
</template>
