import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from "@angular/core";
import { Avatar } from "../../../components/avatar/avatar.component";
import { Button } from "../../../components/button/button.component";
import { Drawer } from "../../../components/drawer/drawer.component";
import {
  DropdownMenu,
  type DropdownMenuItem,
} from "../../../components/dropdown-menu/dropdown-menu.component";
import { Input } from "../../../components/input/input.component";
import { Toaster, toast } from "../../../components/toast/toast.component";

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

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
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

const callControls: {
  key: "camera" | "mic" | "speaker";
  label: string;
  icon: IconName;
}[] = [
  { key: "camera", label: "Camera", icon: "video" },
  { key: "mic", label: "Microphone", icon: "mic" },
  { key: "speaker", label: "Speaker", icon: "speaker" },
];
const freshControls = () => ({ camera: true, mic: true, speaker: true });
const freshStatus = () =>
  Object.fromEntries(tasks.map((task) => [task.id, task.status])) as Record<
    string,
    string
  >;
const leadChips = leadFilters.map((id) => ({ id, label: filterLabel(id) }));
const endButton = `inline-flex h-11 w-16 items-center justify-center rounded-full bg-danger text-(--tpl-white) transition-opacity duration-150 hover:opacity-90 ${focusRing}`;
const summaryButton = `inline-flex size-9 items-center justify-center rounded-full bg-(--tpl-night-soft) ${focusRing}`;

/** Ikon garis 24px; svg-nya sendiri jadi host karena template Angular tidak punya komponen fungsi. */
@Component({
  selector: "svg[pipelineIcon]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.75",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true",
  },
  template: `<svg:path [attr.d]="path()" />`,
})
class Icon {
  readonly pipelineIcon = input.required<IconName>();
  protected readonly path = computed(() => icons[this.pipelineIcon()]);
}

@Component({
  selector: "template-pipeline",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  imports: [
    NgTemplateOutlet,
    Avatar,
    Button,
    Drawer,
    DropdownMenu,
    Input,
    Toaster,
    Icon,
  ],
  template: `
    <ng-template #faceTpl let-name let-size="size">
      <span aria-hidden="true" [class]="cx(face, faceTone(name), size)">{{
        initials(name)
      }}</span>
    </ng-template>
    <ng-template #cornerTpl let-label let-leadId="leadId">
      <span [class]="socket">
        <button
          type="button"
          [attr.aria-label]="label"
          [class]="cornerButton"
          (click)="openLead(leadId)"
        >
          <svg pipelineIcon="arrow" class="size-5"></svg>
        </button>
      </span>
    </ng-template>
    <ng-template
      #chipsTpl
      let-label
      let-items="items"
      let-value="value"
      let-choose="choose"
    >
      <div role="group" [attr.aria-label]="label" class="flex flex-wrap gap-2">
        @for (item of items; track item.id) {
          <button
            type="button"
            [attr.aria-pressed]="value === item.id"
            [class]="cx(chip, value === item.id ? chipOn : chipOff)"
            (click)="choose(item.id)"
          >
            @if (item.id === "hot") {
              <svg pipelineIcon="flame" class="size-4 text-(--tpl-hot)"></svg>
            }
            {{ item.label }}
          </button>
        }
      </div>
    </ng-template>
    <ng-template #leadGridTpl let-items>
      @if (items.length === 0) {
        <p class="text-sm text-muted">No leads match this filter.</p>
      } @else {
        <ul class="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          @for (item of items; track item.id) {
            <li
              [attr.data-lead]="item.id"
              [class]="cx(card, 'min-h-48 bg-surface')"
            >
              <div class="flex items-center gap-3 pr-14">
                <ng-container
                  [ngTemplateOutlet]="faceTpl"
                  [ngTemplateOutletContext]="{
                    $implicit: item.name,
                    size: 'size-12 text-sm',
                  }"
                />
                <div class="min-w-0">
                  <h3 class="truncate text-xl font-semibold tracking-tight">
                    <button
                      type="button"
                      [class]="selectable"
                      (click)="openLead(item.id)"
                    >
                      {{ item.name }}
                    </button>
                  </h3>
                  <p
                    class="text-sm text-muted"
                    [textContent]="item.role + ' @ ' + item.company"
                  ></p>
                </div>
              </div>
              <ng-container
                [ngTemplateOutlet]="cornerTpl"
                [ngTemplateOutletContext]="{
                  $implicit: 'Open ' + item.name,
                  leadId: item.id,
                }"
              />
              <dl class="mt-auto grid grid-cols-2 gap-3 pt-6">
                <div>
                  <dt class="text-xs text-muted">Source</dt>
                  <dd class="mt-1.5">
                    <span [class]="sourceChip">{{ item.source }}</span>
                  </dd>
                </div>
                <div>
                  <dt class="text-xs text-muted">Interest</dt>
                  <dd
                    class="mt-1.5 flex h-7 items-center gap-2 text-sm font-medium"
                  >
                    <span
                      aria-hidden="true"
                      [class]="cx('size-2 rounded-full', interestOf(item).dot)"
                    ></span>
                    {{ interestOf(item).label }}
                  </dd>
                </div>
              </dl>
            </li>
          }
        </ul>
      }
    </ng-template>

    <div [class]="shell">
      <header class="flex h-20 items-center gap-4 px-4 lg:px-6">
        <markas-drawer title="Menu" side="left">
          <button
            trigger
            type="button"
            aria-label="Open menu"
            [class]="cx(roundButton, 'lg:hidden')"
          >
            <svg pipelineIcon="menu" class="size-5"></svg>
          </button>
          <form method="dialog" class="grid gap-1">
            @for (id of pageIds; track id) {
              <button
                type="submit"
                [attr.aria-current]="page() === id ? 'page' : null"
                [class]="cx(menuItem, page() === id ? railActive : menuIdle)"
                (click)="go(id)"
              >
                <svg [pipelineIcon]="pages[id].icon" class="size-5"></svg>
                {{ pages[id].label }}
              </button>
            }
          </form>
        </markas-drawer>
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
              @for (mark of hourMarks; track mark) {
                <span
                  class="flex-1 border-l border-(--tpl-night-line) pl-1.5"
                  >{{ mark }}</span
                >
              }
            </div>
            <ul
              aria-label="Meetings today"
              class="absolute inset-x-0 bottom-0 h-8"
            >
              @for (item of meetings; track item.id) {
                <li>
                  <button
                    type="button"
                    [attr.aria-pressed]="meetingId() === item.id"
                    [class]="cx(slotBase, meetingId() === item.id && slotOn)"
                    [style.left]="at(item.start)"
                    [style.width]="slotWidth"
                    (click)="pickMeeting(item.id)"
                  >
                    <ng-container
                      [ngTemplateOutlet]="faceTpl"
                      [ngTemplateOutletContext]="{
                        $implicit: item.who,
                        size: 'size-6 text-[9px]',
                      }"
                    />{{ item.time
                    }}<span
                      class="sr-only"
                      [textContent]="', ' + item.title + ' with ' + item.who"
                    ></span>
                  </button>
                </li>
              }
            </ul>
            <span
              aria-hidden="true"
              class="absolute -top-1 bottom-0 w-0.5 rounded-full bg-(--tpl-lime) before:absolute before:-top-1 before:-left-[3px] before:size-2 before:rounded-full before:bg-(--tpl-lime)"
              [style.left]="at(NOW)"
            ></span>
            <span class="sr-only">Now 1:20 pm</span>
          </div>
        </section>
        <div class="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">
          <button
            type="button"
            aria-label="Notifications, 3 unread"
            [class]="roundButton"
            (click)="
              notify('3 unread notifications', 'Sinta Maharani signed the NDA')
            "
          >
            <svg pipelineIcon="bell" class="size-5"></svg>
            <span
              aria-hidden="true"
              class="absolute top-2.5 right-2.5 size-2 rounded-full bg-danger ring-2 ring-surface"
            ></span>
          </button>
          <markas-avatar
            name="Ahmad Fauzi"
            size="md"
            class="ring-2 ring-surface"
          />
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
            @for (id of pageIds; track id) {
              <button
                type="button"
                [attr.aria-label]="pages[id].label"
                [attr.aria-current]="page() === id ? 'page' : null"
                [class]="cx(railBase, page() === id ? railActive : railIdle)"
                (click)="go(id)"
              >
                <svg [pipelineIcon]="pages[id].icon" class="size-5"></svg>
              </button>
            }
            <span aria-hidden="true" class="my-1 h-px w-6 bg-line"></span>
            <button
              type="button"
              aria-label="Settings"
              [class]="cx(railBase, railIdle)"
              (click)="notify('Settings', 'Workspace settings are up to date')"
            >
              <svg pipelineIcon="settings" class="size-5"></svg>
            </button>
          </nav>
        </div>

        <main class="grid min-w-0 content-start gap-8">
          <div
            class="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 pt-2"
          >
            <div class="flex flex-wrap items-end gap-4">
              <div>
                <p
                  class="text-sm text-muted"
                  [textContent]="'Pipeline / ' + pages[page()].label"
                ></p>
                <h1
                  [id]="TITLE_ID"
                  tabindex="-1"
                  class="mt-1 text-[34px] leading-none font-extrabold tracking-[0.14em] uppercase focus:outline-none sm:text-[56px]"
                  [textContent]="pages[page()].title"
                ></h1>
              </div>
              <button
                type="button"
                [class]="cx(pillButton, 'mb-1')"
                (click)="newTask()"
              >
                <svg pipelineIcon="plus" class="size-4"></svg>
                New Task
              </button>
            </div>
            <dl class="flex flex-wrap gap-x-8 gap-y-3">
              @for (stat of stats; track stat.unit) {
                <div class="flex items-start gap-2">
                  <dt class="sr-only">{{ stat.unit }}</dt>
                  <dd class="flex items-baseline gap-1.5">
                    <span
                      class="text-[44px] leading-none font-semibold tracking-tight tabular-nums"
                      >{{ stat.value }}</span
                    >
                    <span class="text-base text-muted">{{ stat.unit }}</span>
                  </dd>
                  <dd
                    [class]="
                      cx(
                        'rounded-full px-2 py-0.5 text-xs font-semibold',
                        statBadges[stat.tone]
                      )
                    "
                  >
                    {{ stat.badge }}
                  </dd>
                </div>
              }
            </dl>
          </div>

          @switch (page()) {
            @case ("workspace") {
              <div
                class="grid min-w-0 content-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]"
              >
                <div class="grid min-w-0 content-start gap-8">
                  <section
                    aria-labelledby="pipeline-leads-title"
                    class="grid gap-4"
                  >
                    <div
                      class="flex flex-wrap items-center justify-between gap-3"
                    >
                      <h2 id="pipeline-leads-title" [class]="h2">
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
                          [attr.aria-expanded]="searching()"
                          [class]="roundButton"
                          (click)="searching.set(!searching())"
                        >
                          <svg pipelineIcon="search" class="size-5"></svg>
                        </button>
                        <button
                          type="button"
                          aria-label="Sort by interest"
                          [attr.aria-pressed]="byInterest()"
                          [class]="
                            cx(
                              roundButton,
                              byInterest() &&
                                'bg-primary text-on-primary hover:bg-primary'
                            )
                          "
                          (click)="byInterest.set(!byInterest())"
                        >
                          <svg pipelineIcon="filter" class="size-5"></svg>
                        </button>
                      </div>
                    </div>
                    @if (searching()) {
                      <markas-input
                        [(value)]="query"
                        label="Search by name"
                        type="search"
                        class="max-w-sm"
                      />
                    }
                    <ng-container
                      [ngTemplateOutlet]="chipsTpl"
                      [ngTemplateOutletContext]="{
                        $implicit: 'Filter leads by interest',
                        items: leadChips,
                        value: leadFilter(),
                        choose: chooseLeadFilter,
                      }"
                    />
                    <ng-container
                      [ngTemplateOutlet]="leadGridTpl"
                      [ngTemplateOutletContext]="{ $implicit: shownLeads() }"
                    />
                  </section>

                  <section
                    aria-labelledby="pipeline-tasks-title"
                    class="grid gap-4"
                  >
                    <h2 id="pipeline-tasks-title" [class]="h2">
                      Your Days Tasks
                      <span
                        class="ml-1 text-muted underline decoration-2 underline-offset-[6px]"
                        >{{ tasks.length }}</span
                      >
                    </h2>
                    <ng-container
                      [ngTemplateOutlet]="chipsTpl"
                      [ngTemplateOutletContext]="{
                        $implicit: 'Filter tasks',
                        items: taskFilters,
                        value: taskFilter(),
                        choose: chooseTaskFilter,
                      }"
                    />
                    @if (shownTasks().length === 0) {
                      <p class="text-sm text-muted">No tasks in this view.</p>
                    } @else {
                      <ul class="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                        @for (
                          task of shownTasks();
                          track task.id;
                          let index = $index
                        ) {
                          @let owner = leadById(task.lead);
                          @let style =
                            taskTones[index === 0 ? "lime" : "plain"];
                          <li
                            [attr.data-task]="task.id"
                            [class]="cx(card, 'min-h-64', style.card)"
                          >
                            <div class="flex items-center gap-3 pr-24">
                              <ng-container
                                [ngTemplateOutlet]="faceTpl"
                                [ngTemplateOutletContext]="{
                                  $implicit: owner.name,
                                  size: 'size-11 text-sm',
                                }"
                              />
                              <div class="min-w-0">
                                <p class="truncate font-semibold">
                                  {{ owner.name }}
                                </p>
                                <p [class]="cx('truncate text-xs', style.sub)">
                                  {{ owner.role }}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              [attr.aria-label]="
                                'Remind me about ' + task.title
                              "
                              [class]="
                                cx(
                                  'absolute top-1 right-[66px] inline-flex size-10 items-center justify-center rounded-full',
                                  style.soft,
                                  focusRing
                                )
                              "
                              (click)="
                                notify(
                                  'Reminder set',
                                  task.title + ', ' + task.time
                                )
                              "
                            >
                              <svg pipelineIcon="bell" class="size-4"></svg>
                            </button>
                            <ng-container
                              [ngTemplateOutlet]="cornerTpl"
                              [ngTemplateOutletContext]="{
                                $implicit: 'Open ' + task.title,
                                leadId: task.lead,
                              }"
                            />
                            <span
                              aria-hidden="true"
                              [class]="
                                cx(
                                  'mt-5 inline-flex size-11 items-center justify-center rounded-2xl',
                                  style.soft
                                )
                              "
                            >
                              <svg
                                [pipelineIcon]="task.app"
                                class="size-5"
                              ></svg>
                            </span>
                            <h3
                              class="mt-3 text-2xl font-semibold tracking-tight"
                            >
                              {{ task.title }}
                            </h3>
                            <p
                              [class]="
                                cx(
                                  'mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm',
                                  style.sub
                                )
                              "
                            >
                              <span class="inline-flex items-center gap-1.5">
                                <svg
                                  pipelineIcon="calendar"
                                  class="size-4"
                                ></svg>
                                {{ task.date }}
                              </span>
                              <span class="inline-flex items-center gap-1.5">
                                <svg pipelineIcon="clock" class="size-4"></svg>
                                {{ task.time }}
                              </span>
                            </p>
                            @if (task.amount > 0) {
                              <p
                                class="mt-2 text-lg font-semibold tabular-nums"
                              >
                                {{ rupiah(task.amount) }}
                              </p>
                            }
                            <div
                              class="mt-auto flex items-center justify-between gap-2 pt-5"
                            >
                              <markas-dropdown-menu
                                [items]="statusMenu"
                                [class]="cx(statusTrigger, style.menu)"
                                (selected)="changeStatus(task, $event)"
                              >
                                <ng-container trigger>
                                  <span
                                    class="sr-only"
                                    [textContent]="task.title + ' status: '"
                                  ></span>
                                  <span
                                    data-status
                                    [textContent]="status()[task.id]"
                                  ></span>
                                </ng-container>
                              </markas-dropdown-menu>
                              <div class="flex gap-2">
                                <button
                                  type="button"
                                  [attr.aria-label]="'Message ' + owner.name"
                                  [class]="darkButton"
                                  (click)="go('messages')"
                                >
                                  <svg pipelineIcon="chat" class="size-4"></svg>
                                </button>
                                <button
                                  type="button"
                                  [attr.aria-label]="
                                    'Video call with ' + owner.name
                                  "
                                  [attr.aria-pressed]="
                                    callOpen() && meetingId() === task.meeting
                                  "
                                  [class]="darkButton"
                                  (click)="toggleCall(task)"
                                >
                                  <svg
                                    pipelineIcon="video"
                                    class="size-4"
                                  ></svg>
                                </button>
                              </div>
                            </div>
                          </li>
                        }
                      </ul>
                    }
                  </section>
                </div>

                <aside
                  aria-label="Call and summary"
                  class="grid content-start gap-4 xl:sticky xl:top-6"
                >
                  @if (callOpen()) {
                    <section
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
                        ></span>
                        <ng-container
                          [ngTemplateOutlet]="faceTpl"
                          [ngTemplateOutletContext]="{
                            $implicit: meeting().who,
                            size: 'absolute top-[22%] left-1/2 size-24 -translate-x-1/2 text-2xl ring-4 ring-(--tpl-white)/60',
                          }"
                        />
                        <span
                          class="absolute top-3 left-3 inline-flex h-7 items-center gap-1.5 rounded-full bg-(--tpl-night) px-2.5 text-xs font-medium text-(--tpl-on-night) tabular-nums"
                        >
                          <span
                            aria-hidden="true"
                            class="size-2 rounded-full bg-danger"
                          ></span>
                          12:48
                        </span>
                        <span
                          class="absolute top-3 right-3 inline-flex size-14 items-center justify-center rounded-2xl bg-(--tpl-night)"
                        >
                          <ng-container
                            [ngTemplateOutlet]="faceTpl"
                            [ngTemplateOutletContext]="{
                              $implicit: 'Ahmad Fauzi',
                              size: 'size-8 text-[11px]',
                            }"
                          />
                        </span>
                        <span
                          class="absolute bottom-3 left-3 inline-flex h-7 items-center rounded-full bg-surface px-3 text-xs font-semibold"
                          >{{ meeting().who }}</span
                        >
                      </div>
                      <div class="px-2 pt-3">
                        <h2 id="pipeline-call-title" class="font-semibold">
                          {{ meeting().title }}
                        </h2>
                        <p
                          class="text-xs text-muted"
                          [textContent]="
                            meeting().time + ' with ' + meeting().who
                          "
                        ></p>
                      </div>
                      <div
                        class="flex items-center justify-center gap-2 pt-3 pb-1"
                      >
                        @for (item of callControls; track item.key) {
                          <button
                            type="button"
                            [attr.aria-label]="item.label"
                            [attr.aria-pressed]="controls()[item.key]"
                            [class]="
                              cx(
                                callControl,
                                controls()[item.key] ? controlOn : controlOff
                              )
                            "
                            (click)="toggleControl(item.key)"
                          >
                            <svg
                              [pipelineIcon]="item.icon"
                              class="size-5"
                            ></svg>
                          </button>
                        }
                        <button
                          type="button"
                          aria-label="End call"
                          [class]="endButton"
                          (click)="endCall()"
                        >
                          <svg pipelineIcon="end" class="size-5"></svg>
                        </button>
                      </div>
                    </section>
                  } @else {
                    <section
                      aria-labelledby="pipeline-call-title"
                      data-call-closed
                      [class]="panel"
                    >
                      <h2 id="pipeline-call-title" class="font-semibold">
                        No active call
                      </h2>
                      <p class="mt-1 text-sm text-muted">
                        Pick a meeting from your schedule or start a video call
                        from a task.
                      </p>
                      <button
                        type="button"
                        [class]="cx(pillButton, 'mt-4')"
                        (click)="setCallOpen(true)"
                      >
                        <svg pipelineIcon="video" class="size-4"></svg>
                        <span
                          class="contents"
                          [textContent]="'Join ' + meeting().title"
                        ></span>
                      </button>
                    </section>
                  }
                  <section
                    aria-labelledby="pipeline-summary-title"
                    class="rounded-[28px] bg-(--tpl-night) p-5 text-(--tpl-on-night) dark:ring-1 dark:ring-line"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <h2
                          id="pipeline-summary-title"
                          class="text-lg font-semibold"
                        >
                          Summary
                        </h2>
                        <p class="text-xs text-(--tpl-night-muted)">
                          Last call with Bagus Hartono
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Open summary"
                        [class]="summaryButton"
                        (click)="
                          notify('Summary opened', 'Call notes, 3 highlights')
                        "
                      >
                        <svg pipelineIcon="arrow" class="size-4"></svg>
                      </button>
                    </div>
                    <ol class="mt-4 grid gap-3">
                      @for (item of summary; track item.time) {
                        <li class="grid grid-cols-[44px_1fr] gap-3">
                          <span
                            class="pt-0.5 text-xs text-(--tpl-night-muted) tabular-nums"
                            >{{ item.time }}</span
                          >
                          <p
                            class="border-l border-(--tpl-night-line) pl-3 text-sm"
                          >
                            {{ item.text }}
                          </p>
                        </li>
                      }
                    </ol>
                    <h3 class="mt-5 text-sm font-semibold">Documents</h3>
                    <ul class="mt-2 grid grid-cols-2 gap-3">
                      @for (doc of documents; track doc.name) {
                        <li class="rounded-2xl bg-(--tpl-night-soft) p-3">
                          <span
                            aria-hidden="true"
                            class="grid h-16 content-start gap-1.5 rounded-xl bg-(--tpl-night-line) p-2.5"
                          >
                            <span
                              class="h-1.5 w-3/4 rounded-full bg-(--tpl-night-muted)"
                            ></span>
                            <span
                              class="h-1.5 w-full rounded-full bg-(--tpl-night-soft)"
                            ></span>
                            <span
                              class="h-1.5 w-2/3 rounded-full bg-(--tpl-night-soft)"
                            ></span>
                          </span>
                          <p class="mt-2 truncate text-xs font-medium">
                            {{ doc.name }}
                          </p>
                          <p class="text-xs text-(--tpl-night-muted)">
                            {{ doc.size }}
                          </p>
                        </li>
                      }
                    </ul>
                    <h3 class="mt-5 text-sm font-semibold">Goal</h3>
                    <p class="mt-1 text-sm text-(--tpl-night-muted)">
                      Close the 40 seat annual plan before 30 Nov, starting with
                      a pilot in the Bandung branch.
                    </p>
                  </section>
                </aside>
              </div>
            }
            @case ("leads") {
              <section aria-labelledby="pipeline-all-leads" class="grid gap-4">
                <div class="flex flex-wrap items-end justify-between gap-3">
                  <h2
                    id="pipeline-all-leads"
                    [class]="h2"
                    [textContent]="plural(allLeads().length, 'lead')"
                  ></h2>
                  <div class="w-full max-w-xs">
                    <markas-input
                      [(value)]="allQuery"
                      label="Search leads"
                      type="search"
                    />
                  </div>
                </div>
                <ng-container
                  [ngTemplateOutlet]="chipsTpl"
                  [ngTemplateOutletContext]="{
                    $implicit: 'Filter leads by interest',
                    items: leadChips,
                    value: allFilter(),
                    choose: chooseAllFilter,
                  }"
                />
                <ng-container
                  [ngTemplateOutlet]="leadGridTpl"
                  [ngTemplateOutletContext]="{ $implicit: allLeads() }"
                />
              </section>
            }
            @case ("pipeline") {
              <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                @for (stage of stages; track stage) {
                  @let items = dealsIn(stage);
                  <section
                    [attr.aria-label]="stage"
                    [attr.data-stage]="stage"
                    class="grid content-start gap-3 rounded-[28px] p-3 ring-1 ring-line ring-inset"
                  >
                    <div
                      class="flex items-baseline justify-between gap-2 px-2 pt-1"
                    >
                      <h2 class="font-semibold">{{ stage }}</h2>
                      <p
                        class="text-xs text-muted tabular-nums"
                        [textContent]="
                          items.length + ' · ' + rupiah(totalOf(items))
                        "
                      ></p>
                    </div>
                    @for (deal of items; track deal.id) {
                      <article
                        [attr.data-deal]="deal.id"
                        class="grid gap-3 rounded-3xl bg-surface p-4"
                      >
                        <div class="flex items-center gap-3">
                          <ng-container
                            [ngTemplateOutlet]="faceTpl"
                            [ngTemplateOutletContext]="{
                              $implicit: deal.who,
                              size: 'size-9 text-xs',
                            }"
                          />
                          <div class="min-w-0">
                            <h3 class="truncate font-semibold">
                              {{ deal.company }}
                            </h3>
                            <p class="truncate text-xs text-muted">
                              {{ deal.who }}
                            </p>
                          </div>
                        </div>
                        <div class="flex items-center justify-between gap-2">
                          <p class="font-semibold tabular-nums">
                            {{ rupiah(deal.value) }}
                          </p>
                          @if (stage !== "Won") {
                            <button
                              type="button"
                              [attr.aria-label]="
                                'Move ' +
                                deal.company +
                                ' to ' +
                                nextStage(stage)
                              "
                              [class]="darkButton"
                              (click)="move(deal)"
                            >
                              <svg pipelineIcon="next" class="size-4"></svg>
                            </button>
                          }
                        </div>
                      </article>
                    }
                  </section>
                }
              </div>
            }
            @case ("calendar") {
              <section
                aria-labelledby="pipeline-agenda-title"
                [class]="cx(panel, 'grid gap-5')"
              >
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <h2
                    id="pipeline-agenda-title"
                    [class]="h2"
                    [textContent]="'November ' + day()"
                  ></h2>
                  <button
                    type="button"
                    [class]="pillButton"
                    (click)="addMeeting()"
                  >
                    <svg pipelineIcon="plus" class="size-4"></svg>
                    Add meeting
                  </button>
                </div>
                <div
                  role="group"
                  aria-label="Pick a day"
                  class="grid grid-cols-5 gap-2"
                >
                  @for (item of week; track item.day) {
                    <button
                      type="button"
                      [attr.aria-pressed]="day() === item.day"
                      [class]="
                        cx(
                          'grid h-16 place-content-center rounded-2xl text-center transition-colors duration-150',
                          focusRing,
                          day() === item.day
                            ? railActive
                            : 'bg-subtle text-ink hover:bg-line'
                        )
                      "
                      (click)="day.set(item.day)"
                    >
                      <span class="text-xs">{{ item.label }}</span>
                      <span class="text-lg font-semibold tabular-nums">{{
                        item.day
                      }}</span>
                    </button>
                  }
                </div>
                @if (currentDay().items.length === 0) {
                  <p data-agenda class="text-sm text-muted">
                    No meetings on this day.
                  </p>
                } @else {
                  <ul data-agenda class="grid gap-2">
                    @for (item of currentDay().items; track item.time) {
                      <li
                        class="flex items-center gap-3 rounded-2xl bg-subtle p-3"
                      >
                        <span
                          class="w-20 shrink-0 text-sm font-semibold tabular-nums"
                          >{{ item.time }}</span
                        >
                        <ng-container
                          [ngTemplateOutlet]="faceTpl"
                          [ngTemplateOutletContext]="{
                            $implicit: item.who,
                            size: 'size-8 text-[11px]',
                          }"
                        />
                        <div class="min-w-0">
                          <p class="truncate text-sm font-medium">
                            {{ item.title }}
                          </p>
                          <p class="truncate text-xs text-muted">
                            {{ item.who }}
                          </p>
                        </div>
                      </li>
                    }
                  </ul>
                }
              </section>
            }
            @default {
              <div class="grid gap-4 md:grid-cols-[280px_minmax(0,1fr)]">
                <ul
                  aria-label="Conversations"
                  [class]="
                    cx(panel, 'grid grid-cols-1 content-start gap-1 p-2')
                  "
                >
                  @for (item of threads(); track item.id) {
                    <li>
                      <button
                        type="button"
                        [attr.aria-pressed]="activeId() === item.id"
                        [class]="
                          cx(
                            'flex w-full items-center gap-3 rounded-3xl p-3 text-left transition-colors duration-150',
                            focusRing,
                            activeId() === item.id
                              ? 'bg-subtle'
                              : 'hover:bg-subtle'
                          )
                        "
                        (click)="activeId.set(item.id)"
                      >
                        <ng-container
                          [ngTemplateOutlet]="faceTpl"
                          [ngTemplateOutletContext]="{
                            $implicit: item.who,
                            size: 'size-10 text-xs',
                          }"
                        />
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
                  }
                </ul>
                <section
                  aria-labelledby="pipeline-thread-title"
                  [class]="cx(panel, 'grid content-start gap-4')"
                >
                  <h2 id="pipeline-thread-title" class="text-lg font-semibold">
                    {{ active().who }}
                  </h2>
                  <ol data-thread class="grid gap-2">
                    @for (message of active().messages; track $index) {
                      <li
                        [class]="
                          cx(
                            'max-w-[80%] rounded-3xl px-4 py-2.5 text-sm',
                            message.mine
                              ? 'justify-self-end bg-(--tpl-night) text-(--tpl-on-night)'
                              : 'justify-self-start bg-subtle'
                          )
                        "
                      >
                        <p>{{ message.text }}</p>
                        <p
                          [class]="
                            cx(
                              'mt-1 text-xs',
                              message.mine
                                ? 'text-(--tpl-night-muted)'
                                : 'text-muted'
                            )
                          "
                        >
                          {{ message.time }}
                        </p>
                      </li>
                    }
                  </ol>
                  <form class="flex items-end gap-2" (submit)="send($event)">
                    <div class="min-w-0 flex-1">
                      <markas-input [(value)]="draft" label="Message" />
                    </div>
                    <button type="submit" [class]="pillButton">
                      <svg pipelineIcon="send" class="size-4"></svg>
                      Send
                    </button>
                  </form>
                </section>
              </div>
            }
          }
        </main>
      </div>

      <markas-drawer [id]="LEAD_DRAWER" title="Lead details">
        <div class="grid gap-5 text-ink">
          <div class="flex items-center gap-3">
            <ng-container
              [ngTemplateOutlet]="faceTpl"
              [ngTemplateOutletContext]="{
                $implicit: lead().name,
                size: 'size-14 text-base',
              }"
            />
            <div class="min-w-0">
              <p class="text-lg font-semibold">{{ lead().name }}</p>
              <p
                class="text-sm text-muted"
                [textContent]="lead().role + ' @ ' + lead().company"
              ></p>
            </div>
          </div>
          <dl class="grid grid-cols-2 gap-3">
            @for (field of leadFields(); track field[0]) {
              <div class="rounded-2xl bg-subtle p-3">
                <dt class="text-xs text-muted">{{ field[0] }}</dt>
                <dd
                  [attr.data-field]="field[0]"
                  class="mt-1 text-sm font-medium"
                  [textContent]="field[1]"
                ></dd>
              </div>
            }
          </dl>
          <p
            class="text-sm text-muted"
            [textContent]="'Email ' + lead().email"
          ></p>
        </div>
        <ng-container footer>
          <button markas-button variant="secondary" type="submit" value="close">
            Close
          </button>
          <button
            markas-button
            type="submit"
            value="schedule"
            (click)="scheduleCall()"
          >
            Schedule call
          </button>
        </ng-container>
      </markas-drawer>
      <markas-toaster />
    </div>
  `,
})
export default class Pipeline {
  protected readonly pages = pages;
  protected readonly pageIds = pageIds;
  protected readonly TITLE_ID = TITLE_ID;
  protected readonly LEAD_DRAWER = LEAD_DRAWER;
  protected readonly stats = stats;
  protected readonly hourMarks = hourMarks;
  protected readonly meetings = meetings;
  protected readonly NOW = NOW;
  protected readonly slotWidth = `calc(${(MEETING_SPAN / DAY_HOURS) * 100}% - 4px)`;
  protected readonly interests = interests;
  protected readonly leads = leads;
  protected readonly leadChips = leadChips;
  protected readonly tasks = tasks;
  protected readonly taskFilters = taskFilters;
  protected readonly statusMenu = statusMenu;
  protected readonly summary = summary;
  protected readonly documents = documents;
  protected readonly stages = stages;
  protected readonly week = week;
  protected readonly callControls = callControls;
  protected readonly shell = shell;
  protected readonly focusRing = focusRing;
  protected readonly roundButton = roundButton;
  protected readonly railBase = railBase;
  protected readonly railActive = railActive;
  protected readonly railIdle = railIdle;
  protected readonly menuItem = menuItem;
  protected readonly menuIdle = menuIdle;
  protected readonly chip = chip;
  protected readonly chipOn = chipOn;
  protected readonly chipOff = chipOff;
  protected readonly face = face;
  protected readonly statBadges = statBadges;
  protected readonly card = card;
  protected readonly socket = socket;
  protected readonly cornerButton = cornerButton;
  protected readonly selectable = selectable;
  protected readonly sourceChip = sourceChip;
  protected readonly darkButton = darkButton;
  protected readonly callControl = callControl;
  protected readonly controlOn = controlOn;
  protected readonly controlOff = controlOff;
  protected readonly statusTrigger = statusTrigger;
  protected readonly taskTones = taskTones;
  protected readonly panel = panel;
  protected readonly pillButton = pillButton;
  protected readonly slotBase = slotBase;
  protected readonly slotOn = slotOn;
  protected readonly h2 = h2;
  protected readonly endButton = endButton;
  protected readonly summaryButton = summaryButton;
  protected readonly cx = cx;
  protected readonly rupiah = rupiah;
  protected readonly plural = plural;
  protected readonly initials = initials;
  protected readonly faceTone = faceTone;
  protected readonly leadById = leadById;
  protected readonly notify = notify;
  protected readonly at = at;

  /* State bersama */
  protected readonly page = signal<PageId>(readHash());
  protected readonly leadId = signal("l1");
  protected readonly meetingId = signal("m2");
  protected readonly callOpen = signal(true);
  protected readonly controls = signal(freshControls());
  protected readonly lead = computed(() => leadById(this.leadId()));
  protected readonly meeting = computed(() => meetingById(this.meetingId()));
  protected readonly leadFields = computed(() => {
    const lead = this.lead();
    return [
      ["Interest", interests[lead.interest].label],
      ["Source", lead.source],
      ["Deal value", rupiah(lead.value)],
      ["Phone", lead.phone],
    ];
  });

  /* Workspace */
  protected readonly leadFilter = signal<LeadFilter>("all");
  protected readonly taskFilter = signal("all");
  protected readonly searching = signal(false);
  protected readonly query = signal("");
  protected readonly byInterest = signal(false);
  protected readonly status = signal(freshStatus());
  protected readonly shownLeads = computed(() => {
    const needle = this.query().trim().toLowerCase();
    const filter = this.leadFilter();
    const byInterest = this.byInterest();
    return leads
      .filter(
        (item) =>
          matchesLead(item, filter) && item.name.toLowerCase().includes(needle),
      )
      .sort((a, b) =>
        byInterest
          ? interestIds.indexOf(a.interest) - interestIds.indexOf(b.interest)
          : 0,
      )
      .slice(0, LEAD_PREVIEW);
  });
  protected readonly shownTasks = computed(() => {
    const status = this.status();
    const filter = this.taskFilter();
    return tasks.filter((task) => matchesTask(task, status[task.id]!, filter));
  });
  protected readonly chooseLeadFilter = (id: string) =>
    this.leadFilter.set(id as LeadFilter);
  protected readonly chooseTaskFilter = (id: string) => this.taskFilter.set(id);

  /* Leads */
  protected readonly allFilter = signal<LeadFilter>("all");
  protected readonly allQuery = signal("");
  protected readonly allLeads = computed(() => {
    const needle = this.allQuery().trim().toLowerCase();
    const filter = this.allFilter();
    return leads.filter(
      (item) =>
        matchesLead(item, filter) &&
        `${item.name} ${item.company}`.toLowerCase().includes(needle),
    );
  });
  protected readonly chooseAllFilter = (id: string) =>
    this.allFilter.set(id as LeadFilter);

  /* Pipeline */
  protected readonly deals = signal(dealList);

  /* Calendar */
  protected readonly day = signal("9");
  protected readonly currentDay = computed(() =>
    week.find((item) => item.day === this.day())!,
  );

  /* Messages */
  protected readonly threads = signal<Thread[]>(threadList);
  protected readonly activeId = signal("c1");
  protected readonly draft = signal("");
  protected readonly active = computed(() =>
    this.threads().find((item) => item.id === this.activeId())!,
  );

  constructor() {
    const onHashChange = () => {
      this.openPage(readHash());
      // Judul selalu ada di DOM, jadi fokus bisa langsung dipindah.
      document.getElementById(TITLE_ID)?.focus();
    };
    window.addEventListener("hashchange", onHashChange);
    inject(DestroyRef).onDestroy(() =>
      window.removeEventListener("hashchange", onHashChange),
    );
  }

  /** Pindah halaman: state halaman direset, sama seperti React yang me-mount ulang. */
  private openPage(id: PageId) {
    this.page.set(id);
    this.leadFilter.set("all");
    this.taskFilter.set("all");
    this.searching.set(false);
    this.query.set("");
    this.byInterest.set(false);
    this.status.set(freshStatus());
    this.controls.set(freshControls());
    this.allFilter.set("all");
    this.allQuery.set("");
    this.deals.set(dealList);
    this.day.set("9");
    this.threads.set(threadList);
    this.activeId.set("c1");
    this.draft.set("");
  }

  /** Konteks ng-template tidak bertipe, jadi tingkat minat dibaca lewat lead yang diketik. */
  protected interestOf(lead: Lead) {
    return interests[lead.interest];
  }

  protected go(id: PageId) {
    window.location.assign(`#${id}`);
  }

  protected openLead(id: string) {
    this.leadId.set(id);
    openDialog(LEAD_DRAWER);
  }

  /** Panel call yang baru dibuka mulai dengan kamera, mikrofon, dan speaker menyala. */
  protected setCallOpen(open: boolean) {
    if (open && !this.callOpen()) this.controls.set(freshControls());
    this.callOpen.set(open);
  }

  protected pickMeeting(id: string) {
    this.meetingId.set(id);
    this.setCallOpen(true);
  }

  protected toggleControl(key: keyof ReturnType<typeof freshControls>) {
    this.controls.update((all) => ({ ...all, [key]: !all[key] }));
  }

  protected changeStatus(task: Task, value: string) {
    this.status.update((all) => ({ ...all, [task.id]: value }));
    toast({
      title: "Status updated",
      description: `${task.title}: ${value}`,
      variant: "success",
    });
  }

  protected toggleCall(task: Task) {
    const same = this.callOpen() && this.meetingId() === task.meeting;
    this.meetingId.set(task.meeting);
    this.setCallOpen(!same);
  }

  protected endCall() {
    const meeting = this.meeting();
    this.setCallOpen(false);
    notify("Call ended", `${meeting.title} with ${meeting.who}`);
  }

  protected newTask() {
    toast({
      title: "Task created",
      description: "Follow up with Maya Puspita, tomorrow 10:00 am",
      variant: "success",
    });
  }

  protected dealsIn(stage: string) {
    return this.deals().filter((deal) => deal.stage === stage);
  }

  protected totalOf(items: Deal[]) {
    return items.reduce((sum, deal) => sum + deal.value, 0);
  }

  protected nextStage(stage: string) {
    return stages[stages.indexOf(stage) + 1];
  }

  protected move(deal: Deal) {
    const next = stages[stages.indexOf(deal.stage) + 1]!;
    this.deals.update((all) =>
      all.map((item) =>
        item.id === deal.id ? { ...item, stage: next } : item,
      ),
    );
    toast({
      title: `Moved to ${next}`,
      description: deal.company,
      variant: "success",
    });
  }

  protected addMeeting() {
    notify(
      "Meeting added",
      `${this.currentDay().label}, ${this.day()} Nov at 4:00 pm`,
    );
  }

  protected send(event: Event) {
    event.preventDefault();
    const text = this.draft().trim();
    if (!text) return;
    const activeId = this.activeId();
    this.threads.update((all) =>
      all.map((item) =>
        item.id === activeId
          ? {
              ...item,
              messages: [...item.messages, { mine: true, text, time: "Now" }],
            }
          : item,
      ),
    );
    this.draft.set("");
    notify("Message sent", this.active().who);
  }

  protected scheduleCall() {
    toast({
      title: "Call scheduled",
      description: `${this.lead().name}, tomorrow 10:00 am`,
      variant: "success",
    });
  }
}
