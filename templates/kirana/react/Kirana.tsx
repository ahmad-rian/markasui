"use client";

import {
  useState,
  useSyncExternalStore,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { Avatar } from "../../../components/avatar/Avatar";
import { Badge } from "../../../components/badge/Badge";
import { Button } from "../../../components/button/Button";
import { Checkbox } from "../../../components/checkbox/Checkbox";
import { Drawer } from "../../../components/drawer/Drawer";
import {
  DropdownMenu,
  type DropdownMenuItem,
} from "../../../components/dropdown-menu/DropdownMenu";
import { Input } from "../../../components/input/Input";
import { Progress } from "../../../components/progress/Progress";
import { Tabs } from "../../../components/tabs/Tabs";
import { Toaster, toast } from "../../../components/toast/Toast";

// prettier-ignore
const icons = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  share: "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6M8.6 13.5l6.8 4M15.4 6.5l-6.8 4",
  star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z",
  plus: "M12 5v14M5 12h14",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2",
  chart: "M3 3v18h18M8 17v-5M13 17V8M18 17v-3",
  send: "m22 2-7 20-4-9-9-4zM22 2 11 13",
  alert: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M22 6l-10 7L2 6",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  external: "M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
  back: "M19 12H5M12 19l-7-7 7-7",
  dots: "M5 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M11 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M17 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0",
  expand: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7",
  arrow: "M7 17 17 7M7 7h10v10",
  forward: "m13 17 5-5-5-5M6 17l5-5-5-5",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92",
  chat: "M7.9 20A9 9 0 1 0 4 16.1L2 22z",
  user: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  clock: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20",
  pencil: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z",
  prev: "m15 18-6-6 6-6",
  next: "m9 18 6-6-6-6",
  wallet: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
  check: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M8.5 12l2.5 2.5 4.5-5",
  menu: "M4 6h16M4 12h16M4 18h16",
  sort: "m7 15 5 5 5-5M7 9l5-5 5 5",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20",
  camera: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  briefcase: "M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
};
type IconName = keyof typeof icons;
type Tone = "blue" | "teal" | "night" | "sun" | "plain" | "rose";

// prettier-ignore
const pages = {
  home: { label: "Home", title: "Welcome back, Dimas" },
  summaries: { label: "Book Summaries", title: "Book Summaries" },
  founders: { label: "Founders", title: "Founders Network" },
  finance: { label: "Finance", title: "Finance Overview" },
  contacts: { label: "Contacts", title: "Customer Information" },
  growth: { label: "Growth", title: "Growth Metrics" },
  projects: { label: "Projects", title: "Active Projects" },
};
type PageId = keyof typeof pages;
const DEFAULT_PAGE: PageId = "contacts";
const TITLE_ID = "kirana-page-title";
const DEAL_DRAWER = "kirana-deal-drawer";
const topNav: PageId[] = [
  "summaries",
  "founders",
  "finance",
  "contacts",
  "growth",
  "projects",
];
// prettier-ignore
const rail: { id?: PageId; label: string; icon: IconName }[] = [
  { id: "home", label: "Home", icon: "home" }, { id: "contacts", label: "Contacts", icon: "users" },
  { id: "founders", label: "Founders", icon: "share" }, { id: "summaries", label: "Book Summaries", icon: "star" },
  { label: "New contact", icon: "plus" }, { id: "finance", label: "Finance", icon: "file" },
  { id: "projects", label: "Projects", icon: "calendar" }, { id: "growth", label: "Growth", icon: "chart" },
  { label: "Send update", icon: "send" }, { label: "Alerts", icon: "alert" },
];

type Stat = {
  icon: IconName;
  value: string;
  badge: string;
  tone: "mint" | "sky";
  label: string;
};
// prettier-ignore
const headerStats: Record<PageId, Stat[]> = {
  home: [
    { icon: "wallet", value: "Rp 482.500.000", badge: "↑ 12%", tone: "mint", label: "Revenue booked this month" },
    { icon: "check", value: "18", badge: "5 due", tone: "sky", label: "Open tasks for this week" },
    { icon: "calendar", value: "7", badge: "+2 today", tone: "mint", label: "Meetings on your calendar" },
  ],
  summaries: [
    { icon: "star", value: "24", badge: "+3 new", tone: "sky", label: "Summaries in the library" },
    { icon: "check", value: "9", badge: "↑ 2", tone: "mint", label: "Finished by the team this month" },
    { icon: "clock", value: "13 min", badge: "avg", tone: "sky", label: "Average reading time" },
  ],
  founders: [
    { icon: "users", value: "36", badge: "+4 new", tone: "sky", label: "Founders in your network" },
    { icon: "wallet", value: "Rp 86 M", badge: "↑ 9%", tone: "mint", label: "Raised by portfolio this year" },
    { icon: "chat", value: "12", badge: "3 today", tone: "sky", label: "Intro requests waiting" },
  ],
  finance: [
    { icon: "wallet", value: "Rp 297.050.000", badge: "↑ 8%", tone: "mint", label: "Invoiced this month" },
    { icon: "file", value: "4", badge: "2 overdue", tone: "sky", label: "Open invoices to collect" },
    { icon: "clock", value: "18 days", badge: "↓ 3 days", tone: "mint", label: "Average time to get paid" },
  ],
  contacts: [
    { icon: "wallet", value: "Rp 198.013.000", badge: "↑ 11%", tone: "mint", label: "Won from 76 deals this month" },
    { icon: "users", value: "+89", badge: "112 new", tone: "sky", label: "New customers for the week" },
    { icon: "check", value: "+31", badge: "+6 today", tone: "mint", label: "New tasks for the week" },
  ],
  growth: [
    { icon: "chart", value: "1.284", badge: "↑ 9%", tone: "mint", label: "New leads in 30 days" },
    { icon: "users", value: "3,1%", badge: "+0,2 pt", tone: "sky", label: "Visitor to lead conversion" },
    { icon: "wallet", value: "Rp 91.500", badge: "↓ 2%", tone: "mint", label: "Average cost per lead" },
  ],
  projects: [
    { icon: "calendar", value: "6", badge: "2 at risk", tone: "sky", label: "Projects in delivery" },
    { icon: "check", value: "142", badge: "+18", tone: "mint", label: "Tasks closed this month" },
    { icon: "clock", value: "92%", badge: "on time", tone: "mint", label: "Milestones hit on schedule" },
  ],
};

/* Contacts */
// prettier-ignore
const dealList = [
  { id: "d1", day: 4, title: "Premium Support Opportunity", value: 11250000, tone: "blue", stage: "Proposal", team: ["Budi Santoso", "Sari Wulandari", "Agus Pratama"] },
  { id: "d2", day: 16, title: "Enterprise Plan Most Useful", value: 21300000, tone: "teal", stage: "Negotiation", team: ["Dewi Lestari", "Fajar Nugroho", "Rina Hartati", "Yoga Prasetyo"] },
  { id: "d3", day: 12, title: "Strategic Partnership Success Deal", value: 2100000, tone: "night", stage: "Won", team: ["Agus Pratama", "Dewi Lestari", "Budi Santoso"] },
  { id: "d4", day: 11, title: "Customer Upgrade Opportunity", value: 4160000, tone: "sun", stage: "Qualified", team: ["Sari Wulandari", "Yoga Prasetyo", "Fajar Nugroho"] },
  { id: "d5", day: 2, title: "Onboarding Implementation", value: 3140000, tone: "plain", stage: "Won", team: ["Rina Hartati", "Budi Santoso", "Dewi Lestari", "Agus Pratama"] },
  { id: "d6", day: 2, title: "Renewal Deal Annual Service", value: 12350000, tone: "plain", stage: "Proposal", team: ["Fajar Nugroho", "Sari Wulandari", "Rina Hartati"] },
];
type Deal = (typeof dealList)[number];
// prettier-ignore
const historyMenu: DropdownMenuItem[] = [
  { label: "Default order", value: "default" }, { label: "Highest value", value: "high" },
  { label: "Newest first", value: "newest" }, { separator: true }, { label: "Export history", value: "export" },
];
const sorters: Record<string, (a: Deal, b: Deal) => number> = {
  default: () => 0,
  high: (a, b) => b.value - a.value,
  newest: (a, b) => b.day - a.day,
};
// prettier-ignore
const scheduleMenu: DropdownMenuItem[] = [{ label: "Jump to today", value: "today" }, { label: "Add task", value: "add" }];
// prettier-ignore
const funnelMenu: DropdownMenuItem[] = [{ label: "Show weighted", value: "weighted" }, { label: "Show total", value: "total" }, { separator: true }, { label: "Export funnel", value: "export" }];
// prettier-ignore
const profileMenu: DropdownMenuItem[] = [{ label: "Copy profile link", value: "Profile link copied" }, { label: "Archive contact", value: "Contact archived" }];
// prettier-ignore
const marks: Record<string, { tone: Tone; who: string; task: string }> = {
  "2026-10-03": { tone: "blue", who: "Budi Santoso", task: "Discovery call" },
  "2026-10-08": { tone: "blue", who: "Sari Wulandari", task: "Product demo" },
  "2026-10-10": { tone: "sun", who: "Agus Pratama", task: "Proposal review" },
  "2026-10-11": { tone: "sun", who: "Dewi Lestari", task: "Contract draft" },
  "2026-10-14": { tone: "teal", who: "Fajar Nugroho", task: "Renewal sign-off" },
};
const TODAY = "2026-10-14";
// prettier-ignore
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
// prettier-ignore
const funnel = {
  weighted: { total: "Rp 350.500.000", steps: [["Qualification", "Rp 192.350.000"], ["Proposal Sent", "Rp 107.120.000"], ["Negotiation", "Rp 51.030.000"]] },
  total: { total: "Rp 612.800.000", steps: [["Qualification", "Rp 336.400.000"], ["Proposal Sent", "Rp 186.900.000"], ["Negotiation", "Rp 89.500.000"]] },
};
type FunnelMode = keyof typeof funnel;
const funnelModes: FunnelMode[] = ["weighted", "total"];
const funnelWidths = ["w-full", "w-[90%]", "w-[80%]"];
// prettier-ignore
const initialContact = { firstName: "Ratna", lastName: "Kusuma", email: "ratna.kusuma@nusantaradigital.id", phone: "+62 812 4410 2231" };
type Contact = typeof initialContact;
// prettier-ignore
const contactFields: { key: keyof Contact; label: string; type: string; icon: IconName; add?: string }[] = [
  { key: "firstName", label: "First Name", type: "text", icon: "user" },
  { key: "lastName", label: "Last Name", type: "text", icon: "user" },
  { key: "email", label: "Email", type: "email", icon: "mail", add: "Add email" },
  { key: "phone", label: "Phone Number", type: "tel", icon: "phone", add: "Add phone number" },
];
// prettier-ignore
const sources: { label: string; icon: IconName; tone: string }[] = [
  { label: "Website", icon: "globe", tone: "bg-(--tpl-blue)" }, { label: "Messenger", icon: "chat", tone: "bg-(--tpl-teal)" },
  { label: "Photo network", icon: "camera", tone: "bg-(--tpl-berry)" }, { label: "Business network", icon: "briefcase", tone: "bg-(--tpl-night)" },
];
// prettier-ignore
const profileActions: { label: string; icon: IconName }[] = [
  { label: "Send email", icon: "mail" }, { label: "Call", icon: "phone" }, { label: "Start chat", icon: "chat" },
  { label: "Add note", icon: "plus" }, { label: "Schedule meeting", icon: "calendar" }, { label: "Share file", icon: "file" },
];

/* Home */
// prettier-ignore
const todayTasks = [
  { id: "t1", time: "09:00", title: "Call Ratna about the enterprise plan" },
  { id: "t2", time: "10:30", title: "Send the renewal quote to PT Sinar Abadi" },
  { id: "t3", time: "13:00", title: "Review the onboarding checklist" },
  { id: "t4", time: "15:00", title: "Pipeline review with Budi" },
  { id: "t5", time: "16:30", title: "Follow up three new leads" },
];
const DONE_TASKS = ["t1", "t2"];
// prettier-ignore
const activity = [
  { who: "Ratna Kusuma", what: "opened the enterprise plan proposal", when: "12 min ago" },
  { who: "Budi Santoso", what: "logged a call with PT Sinar Abadi", when: "40 min ago" },
  { who: "Dewi Lestari", what: "moved Enterprise Plan to Negotiation", when: "2 hours ago" },
  { who: "Agus Pratama", what: "closed Strategic Partnership as won", when: "Yesterday" },
];

/* Book Summaries */
// prettier-ignore
const books = [
  { id: "b1", title: "The Trusted Advisor", author: "David Maister", topic: "Sales", minutes: 12, tone: "blue" },
  { id: "b2", title: "Good Strategy Bad Strategy", author: "Richard Rumelt", topic: "Leadership", minutes: 15, tone: "teal" },
  { id: "b3", title: "The Mom Test", author: "Rob Fitzpatrick", topic: "Sales", minutes: 9, tone: "sun" },
  { id: "b4", title: "Radical Candor", author: "Kim Scott", topic: "Leadership", minutes: 14, tone: "night" },
  { id: "b5", title: "The Psychology of Money", author: "Morgan Housel", topic: "Finance", minutes: 11, tone: "rose" },
  { id: "b6", title: "Measure What Matters", author: "John Doerr", topic: "Leadership", minutes: 13, tone: "blue" },
];
const topics = ["All", "Sales", "Leadership", "Finance"];
const READ_BOOKS = ["b2"];

/* Founders */
// prettier-ignore
const founders = [
  { name: "Andini Saraswati", company: "Panen Kita", sector: "Agritech", raised: 12500000000 },
  { name: "Bagas Wicaksono", company: "Kirim Cepat", sector: "Logistics", raised: 31000000000 },
  { name: "Citra Maharani", company: "Sehatku", sector: "Health", raised: 8200000000 },
  { name: "Hendra Setiawan", company: "Dompet Usaha", sector: "Fintech", raised: 27400000000 },
  { name: "Laras Anindita", company: "Belajar Bareng", sector: "Education", raised: 4600000000 },
  { name: "Reza Mahendra", company: "Atap Hijau", sector: "Climate", raised: 2300000000 },
];

/* Finance */
// prettier-ignore
const invoices = [
  { id: "INV-2041", customer: "PT Nusantara Digital", due: "2026-10-08", amount: 21300000, status: "Overdue" },
  { id: "INV-2043", customer: "PT Sinar Abadi", due: "2026-10-12", amount: 12350000, status: "Overdue" },
  { id: "INV-2044", customer: "CV Maju Bersama", due: "2026-10-18", amount: 4160000, status: "Paid" },
  { id: "INV-2046", customer: "PT Lintas Jawa", due: "2026-10-24", amount: 11250000, status: "Pending" },
  { id: "INV-2047", customer: "Toko Sentosa Group", due: "2026-10-29", amount: 3140000, status: "Pending" },
  { id: "INV-2049", customer: "PT Bumi Persada", due: "2026-11-03", amount: 2100000, status: "Paid" },
];
type Invoice = (typeof invoices)[number];
type SortKey = "due" | "amount";
// prettier-ignore
const invoiceColumns: { key: SortKey; label: string; align: string }[] = [
  { key: "due", label: "Due date", align: "text-left" }, { key: "amount", label: "Amount", align: "text-right" },
];
const statusVariant: Record<string, "success" | "warning" | "danger"> = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
};
// prettier-ignore
const cashflow = [["May", 212], ["Jun", 248], ["Jul", 231], ["Aug", 276], ["Sep", 264], ["Oct", 297]] as const;

/* Growth */
// prettier-ignore
const growthPeriods = [
  { value: "7d", label: "7 days", bars: [38, 52, 47, 61, 58, 72, 66], metrics: [["Visitors", "18.420"], ["New leads", "312"], ["Conversion", "3,4%"]] },
  { value: "30d", label: "30 days", bars: [210, 248, 236, 281, 302, 296, 331], metrics: [["Visitors", "76.900"], ["New leads", "1.284"], ["Conversion", "3,1%"]] },
  { value: "90d", label: "90 days", bars: [640, 702, 688, 744, 801, 836, 902], metrics: [["Visitors", "214.300"], ["New leads", "3.702"], ["Conversion", "2,9%"]] },
];
const barLabels = ["W1", "W2", "W3", "W4", "W5", "W6", "W7"];

/* Projects */
// prettier-ignore
const projects = [
  { id: "p1", name: "Enterprise onboarding", client: "PT Nusantara Digital", status: "Active", progress: 68, due: "Nov 12" },
  { id: "p2", name: "Support portal rollout", client: "PT Sinar Abadi", status: "At risk", progress: 34, due: "Oct 30" },
  { id: "p3", name: "Partner integration", client: "PT Lintas Jawa", status: "Active", progress: 52, due: "Nov 26" },
  { id: "p4", name: "Annual renewal audit", client: "CV Maju Bersama", status: "Done", progress: 100, due: "Oct 10" },
  { id: "p5", name: "Data migration", client: "PT Bumi Persada", status: "At risk", progress: 21, due: "Nov 4" },
  { id: "p6", name: "Training program", client: "Toko Sentosa Group", status: "Done", progress: 100, due: "Oct 6" },
];
const projectFilters = ["All", "Active", "At risk", "Done"];
const projectVariant: Record<string, "primary" | "warning" | "success"> = {
  Active: "primary",
  "At risk": "warning",
  Done: "success",
};

/* Gaya */
// Palet lokal referensi, nilai terang dan gelap. Hex hanya di sini.
const palette =
  "[--tpl-bg-a:#d9e7f7] [--tpl-bg-b:#edf5f1] [--tpl-bg-c:#f6f7f9] [--tpl-blue:#2563eb] [--tpl-teal:#0f766e] [--tpl-sun:#facc15] [--tpl-night:#131416] [--tpl-on:#ffffff] [--tpl-on-sun:#1c1a10] [--tpl-berry:#be185d] [--tpl-rose:#fbd0da] [--tpl-rose-2:#fdf2f4] [--tpl-mint:#d3f3e0] [--tpl-mint-ink:#14532d] [--tpl-sky:#dbe6fe] [--tpl-sky-ink:#1e3a8a] [--tpl-glass:#ffffffc7] [--tpl-glass-line:#ffffffd9] [--tpl-rail-idle:#a1a1aa] [--tpl-shadow:0_12px_32px_-16px_#0f172a2e] [--tpl-av1:#c7dafd] [--tpl-av2:#fbd0da] [--tpl-av3:#fde68a] [--tpl-av4:#bfecd6] [--tpl-av5:#ddd3fb] [--tpl-av-ink:#1f2937] dark:[--tpl-bg-a:#0c1522] dark:[--tpl-bg-b:#0d1714] dark:[--tpl-bg-c:#0e110e] dark:[--tpl-sun:#eab308] dark:[--tpl-night:#050607] dark:[--tpl-berry:#be185d] dark:[--tpl-rose:#3a1d28] dark:[--tpl-rose-2:#1c1619] dark:[--tpl-mint:#123626] dark:[--tpl-mint-ink:#a7f3d0] dark:[--tpl-sky:#172a4d] dark:[--tpl-sky-ink:#c7dafd] dark:[--tpl-glass:#151915c7] dark:[--tpl-glass-line:#ffffff17] dark:[--tpl-shadow:0_12px_32px_-16px_#00000080]";
const shell = `${palette} min-h-dvh bg-linear-135 from-(--tpl-bg-a) via-(--tpl-bg-b) to-(--tpl-bg-c) text-ink`;
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const glass =
  "border border-(--tpl-glass-line) bg-(--tpl-glass) shadow-(--tpl-shadow) backdrop-blur-xl";
const panel = `grid grid-cols-1 content-start gap-4 rounded-3xl p-5 ${glass}`;
const roundButton = `relative inline-flex size-10 shrink-0 items-center justify-center rounded-full ${glass} text-ink transition-colors duration-150 hover:bg-surface ${focusRing}`;
const smallButton = `inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const menuTrigger =
  "[&>button]:size-9 [&>button]:rounded-full [&>button]:px-0 [&>button>svg:last-child]:hidden";
const pillBase = `inline-flex h-9 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${focusRing}`;
const pillActive = "bg-primary text-on-primary";
const pillIdle = "text-muted hover:bg-surface hover:text-ink";
const railBase = `inline-flex size-11 items-center justify-center rounded-2xl transition-colors duration-150 ${focusRing}`;
const railActive = "bg-(--tpl-blue) text-(--tpl-on)";
const railIdle = "text-(--tpl-rail-idle) hover:text-(--tpl-on)";
// Label rail muncul saat hover atau fokus keyboard, cukup dengan CSS.
const railTip =
  "pointer-events-none absolute top-1/2 left-full z-30 ml-3 -translate-y-1/2 rounded-md bg-ink px-2 py-1 text-xs font-medium whitespace-nowrap text-canvas opacity-0 shadow-overlay transition-opacity duration-150 group-hover:opacity-100 group-has-focus-visible:opacity-100";
const menuItem = `flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium transition-colors duration-150 ${focusRing}`;
const menuIdle = "text-ink hover:bg-subtle";
const face =
  "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-(--tpl-av-ink) select-none";
const faceTones = [
  "bg-(--tpl-av1)",
  "bg-(--tpl-av2)",
  "bg-(--tpl-av3)",
  "bg-(--tpl-av4)",
  "bg-(--tpl-av5)",
];
const statBadges = {
  mint: "bg-(--tpl-mint) text-(--tpl-mint-ink)",
  sky: "bg-(--tpl-sky) text-(--tpl-sky-ink)",
};
const pill =
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap";
// prettier-ignore
const tones: Record<Tone, string> = {
  blue: "bg-(--tpl-blue) text-(--tpl-on) [--card:var(--tpl-blue)]",
  teal: "bg-(--tpl-teal) text-(--tpl-on) [--card:var(--tpl-teal)]",
  night: "bg-(--tpl-night) text-(--tpl-on) [--card:var(--tpl-night)] dark:border dark:border-line",
  sun: "bg-(--tpl-sun) text-(--tpl-on-sun) [--card:var(--tpl-sun)]",
  plain: "border border-line bg-surface text-ink [--card:var(--color-surface)]",
  rose: "bg-(--tpl-rose) text-ink [--card:var(--tpl-rose)]",
};
const dealBase =
  "relative flex min-h-44 flex-col rounded-3xl p-4 transition-shadow duration-150";
const dealSelected = "ring-2 ring-primary ring-offset-2 ring-offset-canvas";
const cardButton = (tone: Tone) =>
  `relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-150 ${focusRing} ${
    tone === "night"
      ? "bg-(--tpl-on) text-(--tpl-night)"
      : tone === "plain"
        ? "bg-subtle text-ink hover:bg-line"
        : "bg-(--tpl-on)/25 hover:bg-(--tpl-on)/40"
  }`;
const selectable =
  "text-left after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary";
const dayBase = `relative flex h-10 items-center justify-center gap-1 sm:justify-between rounded-xl px-2 text-xs font-semibold tabular-nums transition-colors duration-150 ${focusRing}`;
// prettier-ignore
const dayTones: Record<string, string> = {
  none: "bg-subtle/70 text-ink hover:bg-subtle", blue: tones.blue, sun: tones.sun, teal: tones.teal,
};
const daySelected = "ring-2 ring-primary ring-offset-2 ring-offset-surface";
const segment = `inline-flex h-8 items-center rounded-full px-4 text-xs font-semibold transition-colors duration-150 ${focusRing}`;
const segmentOn = "bg-surface text-ink shadow-(--tpl-shadow)";
const segmentOff = "text-muted hover:text-ink";
const chip = `inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-150 ${focusRing}`;
const chipOn = "border-primary bg-primary text-on-primary";
const chipOff = "border-line bg-surface text-ink hover:bg-subtle";
const tile = "rounded-2xl border border-line bg-surface p-4";
const tableWrap = `relative overflow-x-auto rounded-2xl border border-line bg-surface contain-inline-size ${focusRing}`;
const th = "px-4 py-3 font-medium whitespace-nowrap";
const td = "px-4 py-3 whitespace-nowrap";
const thButton = `inline-flex items-center gap-1 rounded-md font-medium hover:text-ink ${focusRing}`;

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const rupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
const pad = (value: number) => String(value).padStart(2, "0");
const isoDate = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;
const toggleIn = (list: string[], id: string) =>
  list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
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
const shortDay = (iso: string) => {
  const [, month = 1, day = 1] = iso.split("-").map(Number);
  return `${monthNames[month - 1]?.slice(0, 3)} ${day}`;
};
const notify = (title: string, description = "") =>
  toast({ title, description });

/** Sel kalender bulan, minggu dimulai Senin. null untuk sel kosong. */
function monthCells(year: number, month: number) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: days }, (_, index) => index + 1),
  ];
  return [...cells, ...Array<null>((7 - (cells.length % 7)) % 7).fill(null)];
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

function openDialog(id: string) {
  const dialog = document.getElementById(id);
  if (!(dialog instanceof HTMLDialogElement)) return;
  dialog.returnValue = "";
  dialog.showModal();
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
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[name]} />
    </svg>
  );
}

function Face({ name, className }: { name: string; className: string }) {
  return (
    <span aria-hidden="true" className={cx(face, faceTone(name), className)}>
      {initials(name)}
    </span>
  );
}

function Team({ names, ring }: { names: string[]; ring: string }) {
  return (
    <div
      role="img"
      aria-label={`Team: ${names.join(", ")}`}
      className="flex -space-x-1"
    >
      {names.map((name) => (
        <Face
          key={name}
          name={name}
          className={cx("size-7 text-[10px] ring-2", ring)}
        />
      ))}
    </div>
  );
}

function PanelMenu({
  label,
  items,
  onSelect,
}: {
  label: string;
  items: DropdownMenuItem[];
  onSelect: (value: string) => void;
}) {
  return (
    <DropdownMenu
      items={items}
      className={menuTrigger}
      onSelect={onSelect}
      trigger={
        <>
          <Icon name="dots" className="size-4" />
          <span className="sr-only">{label} options</span>
        </>
      }
    />
  );
}

function ExpandButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={`Expand ${label}`}
      className={smallButton}
      onClick={() => notify(`${label} expanded`, "Opened in full view")}
    >
      <Icon name="expand" className="size-4" />
    </button>
  );
}

function Panel({
  id,
  title,
  sub,
  actions,
  className,
  children,
}: {
  id: string;
  title: string;
  sub?: ReactNode;
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={cx(panel, className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 id={id} className="text-lg font-semibold tracking-tight">
            {title}
          </h2>
          {sub && <p className="text-sm text-muted">{sub}</p>}
        </div>
        {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className={cx("flex items-center gap-3 rounded-3xl p-3", glass)}>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-subtle">
        <Icon name={stat.icon} />
      </span>
      <div className="grid min-w-0 gap-1">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-lg font-bold tracking-tight whitespace-nowrap tabular-nums">
            {stat.value}
          </span>
          <span className={cx(pill, statBadges[stat.tone])}>{stat.badge}</span>
        </p>
        <p className="max-w-40 text-xs leading-snug text-muted">{stat.label}</p>
      </div>
    </div>
  );
}

function BarChart({ bars, label }: { bars: number[]; label: string }) {
  const peak = Math.max(...bars);
  return (
    <div
      role="img"
      aria-label={`${label}: ${bars.map((value, index) => `${barLabels[index]} ${value}`).join(", ")}`}
      className="flex h-48 items-end gap-3"
    >
      {bars.map((value, index) => (
        <div
          key={index}
          data-bar
          className="flex h-full min-w-0 flex-1 flex-col justify-end gap-2"
        >
          <div
            className={cx(
              "rounded-xl",
              index === bars.length - 1 ? "bg-(--tpl-blue)" : "bg-(--tpl-sky)",
            )}
            style={{ height: `${Math.round((value / peak) * 100)}%` }}
          />
          <span className="text-center text-xs text-muted">
            {barLabels[index]}
          </span>
        </div>
      ))}
    </div>
  );
}

function Calendar() {
  const [view, setView] = useState({ year: 2026, month: 9 });
  const [selected, setSelected] = useState(TODAY);
  const shift = (step: number) => {
    const next = new Date(view.year, view.month + step, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  };
  const mark = marks[selected];
  const monthName = monthNames[view.month]!;

  return (
    <Panel
      id="kirana-schedule-title"
      title="Tasks Schedule"
      actions={
        <>
          <PanelMenu
            label="Tasks Schedule"
            items={scheduleMenu}
            onSelect={(value) => {
              if (value === "add")
                return notify("Task added", `${shortDay(selected)}, 09:00`);
              setView({ year: 2026, month: 9 });
              setSelected(TODAY);
            }}
          />
          <ExpandButton label="Tasks Schedule" />
        </>
      }
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-baseline gap-2 text-base font-semibold">
          {monthName}
          <span className="text-sm font-normal text-muted">{view.year}</span>
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous month"
            className={smallButton}
            onClick={() => shift(-1)}
          >
            <Icon name="prev" className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            className={smallButton}
            onClick={() => shift(1)}
          >
            <Icon name="next" className="size-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {weekdays.map((day, index) => (
          <span
            key={index}
            aria-hidden="true"
            className="text-center text-xs font-medium text-muted"
          >
            {day}
          </span>
        ))}
        {monthCells(view.year, view.month).map((day, index) => {
          if (day === null) return <span key={index} aria-hidden="true" />;
          const iso = isoDate(view.year, view.month, day);
          const item = marks[iso];
          return (
            <button
              key={index}
              type="button"
              aria-pressed={selected === iso}
              className={cx(
                dayBase,
                dayTones[item?.tone ?? "none"],
                selected === iso && daySelected,
              )}
              onClick={() => setSelected(iso)}
            >
              <span aria-hidden="true">{day}</span>
              <span className="sr-only">
                {`${monthName} ${day}${item ? `, ${item.task}` : ""}`}
              </span>
              {item && (
                <Face
                  name={item.who}
                  className="size-5 text-[8px] ring-1 ring-(--tpl-on) max-sm:hidden"
                />
              )}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" data-agenda className="text-sm text-muted">
        <span className="font-semibold text-ink">{shortDay(selected)}</span>
        {mark ? `: ${mark.task} with ${mark.who}` : ": no tasks scheduled"}
      </p>
    </Panel>
  );
}

function Funnel() {
  const [mode, setMode] = useState<FunnelMode>("weighted");
  const data = funnel[mode];
  return (
    <Panel
      id="kirana-funnel-title"
      title="Stage Funnel"
      actions={
        <>
          <PanelMenu
            label="Stage Funnel"
            items={funnelMenu}
            onSelect={(value) =>
              value === "export"
                ? notify("Funnel exported", "stage-funnel.csv")
                : setMode(value as FunnelMode)
            }
          />
          <ExpandButton label="Stage Funnel" />
        </>
      }
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p
            data-funnel-total
            className="text-2xl font-bold tracking-tight tabular-nums"
          >
            {data.total}
          </p>
          <p className="text-xs text-muted">Total in Pipeline</p>
        </div>
        <div
          role="group"
          aria-label="Pipeline value"
          className="inline-flex rounded-full bg-subtle p-1"
        >
          {funnelModes.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              className={cx(segment, mode === value ? segmentOn : segmentOff)}
              onClick={() => setMode(value)}
            >
              {value === "weighted" ? "Weighted" : "Total"}
            </button>
          ))}
        </div>
      </div>
      <ol className="grid gap-2.5" aria-label="Pipeline by stage">
        {data.steps.map(([label, value], index) => (
          <li
            key={label}
            className={cx(
              "mx-auto flex h-14 items-center justify-between gap-3 rounded-full bg-subtle pr-2 pl-5",
              funnelWidths[index],
            )}
          >
            <span className="grid leading-tight">
              <span className="text-xs text-muted">{label}</span>
              <span className="text-sm font-bold tabular-nums">{value}</span>
            </span>
            {index === 0 ? (
              <button
                type="button"
                aria-label={`Open ${label}`}
                className={cx(smallButton, "size-10")}
                onClick={() => notify(label!, `${value} in this stage`)}
              >
                <Icon name="arrow" className="size-4" />
              </button>
            ) : (
              <span className="size-10" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </Panel>
  );
}

function ContactsPage() {
  const [deals, setDeals] = useState(dealList);
  const [sort, setSort] = useState("default");
  const [selectedId, setSelectedId] = useState("");
  const [contact, setContact] = useState(initialContact);
  const [draft, setDraft] = useState(initialContact);
  const deal = deals.find((item) => item.id === selectedId) ?? deals[0]!;
  const fullName = `${contact.firstName} ${contact.lastName}`;

  const openDeal = (id: string) => {
    setSelectedId(id);
    openDialog(DEAL_DRAWER);
  };
  const onDealClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    if (event.currentTarget.returnValue !== "won") return;
    setDeals(
      deals.map((item) =>
        item.id === deal.id ? { ...item, stage: "Won" } : item,
      ),
    );
    toast({
      title: "Deal marked as won",
      description: deal.title,
      variant: "success",
    });
  };
  const onEditClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    if (event.currentTarget.returnValue !== "save") return;
    setContact(draft);
    toast({
      title: "Contact details saved",
      description: `${draft.firstName} ${draft.lastName}`,
      variant: "success",
    });
  };

  return (
    <div className="contents">
      <div className="grid min-w-0 content-start gap-4">
        <Panel
          id="kirana-history-title"
          title="Interaction History"
          actions={
            <>
              <PanelMenu
                label="Interaction History"
                items={historyMenu}
                onSelect={(value) =>
                  value === "export"
                    ? notify(
                        "History exported",
                        "6 deals, interaction-history.csv",
                      )
                    : setSort(value)
                }
              />
              <ExpandButton label="Interaction History" />
            </>
          }
        >
          <ul role="list" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...deals].sort(sorters[sort]).map((item) => {
              const tone = item.tone as Tone;
              const selected = item.id === selectedId;
              return (
                <li
                  key={item.id}
                  data-deal={item.id}
                  className={cx(
                    dealBase,
                    tones[tone],
                    selected && dealSelected,
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="pt-1 text-xs font-medium">Oct {item.day}</p>
                    <button
                      type="button"
                      aria-label={`Open ${item.title}`}
                      className={cardButton(tone)}
                      onClick={() => openDeal(item.id)}
                    >
                      <Icon
                        name={tone === "night" ? "arrow" : "dots"}
                        className="size-4"
                      />
                    </button>
                  </div>
                  <h3 className="mt-1 max-w-56 text-lg leading-snug font-semibold">
                    <button
                      type="button"
                      aria-pressed={selected}
                      className={selectable}
                      onClick={() => openDeal(item.id)}
                    >
                      {item.title}
                    </button>
                  </h3>
                  <div className="mt-auto flex items-end justify-between gap-2 pt-4">
                    <p className="text-lg font-bold tracking-tight tabular-nums">
                      {rupiah(item.value)}
                    </p>
                    <Team names={item.team} ring="ring-(--card)" />
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
        <div className="grid gap-4 lg:grid-cols-2">
          <Calendar />
          <Funnel />
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 content-start gap-4 xl:col-start-2 xl:row-span-2 xl:row-start-1">
        <section
          aria-labelledby="kirana-profile-name"
          className="grid gap-4 rounded-3xl border border-(--tpl-glass-line) bg-linear-to-b from-(--tpl-rose) to-(--tpl-rose-2) p-4 shadow-(--tpl-shadow)"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Forward contact"
                className={smallButton}
                onClick={() => notify("Contact forwarded", fullName)}
              >
                <Icon name="forward" className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Share profile"
                className={smallButton}
                onClick={() => notify("Share link ready", fullName)}
              >
                <Icon name="share" className="size-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <PanelMenu
                label="Profile"
                items={profileMenu}
                onSelect={(value) => notify(value, fullName)}
              />
              <ExpandButton label="Profile" />
            </div>
          </div>
          <div className="grid justify-items-center gap-1 pb-1 text-center">
            <Face
              name={fullName}
              className="mb-2 size-24 text-2xl ring-4 ring-surface"
            />
            <h2
              id="kirana-profile-name"
              className="text-xl font-bold tracking-tight"
            >
              {fullName}
            </h2>
            <p className="text-sm text-muted">Chief Growth Officer</p>
            <p className="text-sm font-medium">PT Nusantara Digital</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {profileActions.map((action) => (
              <button
                key={action.label}
                type="button"
                aria-label={action.label}
                className={cx(smallButton, "size-10 border-transparent")}
                onClick={() => notify(action.label, fullName)}
              >
                <Icon name={action.icon} className="size-4" />
              </button>
            ))}
          </div>
        </section>

        <Panel
          id="kirana-details-title"
          title="Detailed Information"
          actions={
            <>
              <Drawer
                title="Edit contact details"
                onClose={onEditClose}
                trigger={
                  <button
                    type="button"
                    aria-label="Edit details"
                    className={smallButton}
                    onClick={() => setDraft(contact)}
                  >
                    <Icon name="pencil" className="size-4" />
                  </button>
                }
                footer={
                  <>
                    <Button variant="secondary" type="submit" value="cancel">
                      Cancel
                    </Button>
                    <Button type="submit" value="save">
                      Save changes
                    </Button>
                  </>
                }
              >
                <div className="grid gap-4">
                  {contactFields.map((field) => (
                    <Input
                      key={field.key}
                      label={field.label}
                      type={field.type}
                      name={field.key}
                      value={draft[field.key]}
                      onChange={(event) =>
                        setDraft({ ...draft, [field.key]: event.target.value })
                      }
                    />
                  ))}
                </div>
              </Drawer>
              <ExpandButton label="Detailed Information" />
            </>
          }
        >
          <ul className="grid grid-cols-1">
            {contactFields.map((field) => (
              <li key={field.key} className="flex items-center gap-3 py-2.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-subtle">
                  <Icon name={field.icon} className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted">{field.label}</p>
                  <p className="truncate text-sm font-semibold">
                    {contact[field.key]}
                  </p>
                </div>
                {field.add && (
                  <button
                    type="button"
                    aria-label={field.add}
                    className={cx(smallButton, "size-8")}
                    onClick={() => notify(field.add!, fullName)}
                  >
                    <Icon name="plus" className="size-4" />
                  </button>
                )}
              </li>
            ))}
            <li className="flex items-center gap-3 py-2.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-subtle">
                <Icon name="share" className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted">Sources</p>
                <div className="mt-1 flex gap-1.5">
                  {sources.map((source) => (
                    <span
                      key={source.label}
                      role="img"
                      aria-label={source.label}
                      className={cx(
                        "flex size-7 items-center justify-center rounded-full text-(--tpl-on)",
                        source.tone,
                      )}
                    >
                      <Icon name={source.icon} className="size-3.5" />
                    </span>
                  ))}
                </div>
              </div>
            </li>
            <li className="flex items-center gap-3 py-2.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-subtle">
                <Icon name="clock" className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted">Last Contacted</p>
                <p className="text-sm font-semibold">Oct 14, 2026, 10:20</p>
              </div>
              <button
                type="button"
                aria-label="Log contact"
                className={cx(smallButton, "size-8")}
                onClick={() => notify("Contact logged", fullName)}
              >
                <Icon name="plus" className="size-4" />
              </button>
            </li>
          </ul>
        </Panel>
      </div>

      <Drawer
        id={DEAL_DRAWER}
        title="Deal details"
        onClose={onDealClose}
        footer={
          <>
            <Button variant="secondary" type="submit" value="cancel">
              Close
            </Button>
            <Button type="submit" value="won">
              Mark as won
            </Button>
          </>
        }
      >
        <div className="grid gap-4 text-ink">
          <div className={cx("rounded-3xl p-4", tones[deal.tone as Tone])}>
            <p className="text-xs font-medium">Oct {deal.day}, 2026</p>
            <p className="mt-1 text-lg leading-snug font-semibold">
              {deal.title}
            </p>
            <p className="mt-3 text-2xl font-bold tabular-nums">
              {rupiah(deal.value)}
            </p>
          </div>
          <dl className="grid gap-3">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Stage</dt>
              <dd data-stage className="font-semibold">
                {deal.stage}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Customer</dt>
              <dd className="font-semibold">{fullName}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">Team</dt>
              <dd>
                <Team names={deal.team} ring="ring-surface" />
              </dd>
            </div>
          </dl>
        </div>
      </Drawer>
    </div>
  );
}

function HomePage() {
  const [done, setDone] = useState(DONE_TASKS);
  return (
    <div className="grid content-start gap-4 lg:grid-cols-2 xl:col-span-2">
      <Panel
        id="kirana-today-title"
        title="Today's tasks"
        sub={`${done.length} of ${todayTasks.length} done`}
      >
        <Progress
          value={done.length}
          max={todayTasks.length}
          aria-label="Tasks completed"
        />
        <ul className="grid gap-2">
          {todayTasks.map((task) => (
            <li key={task.id} className="rounded-2xl bg-surface p-3">
              <Checkbox
                label={task.title}
                description={task.time}
                checked={done.includes(task.id)}
                onChange={() => setDone(toggleIn(done, task.id))}
              />
            </li>
          ))}
        </ul>
      </Panel>
      <Panel
        id="kirana-activity-title"
        title="Recent activity"
        sub="Latest updates from your team"
      >
        <ol className="grid gap-4">
          {activity.map((item) => (
            <li key={item.when} className="flex items-start gap-3">
              <Face name={item.who} className="size-9 text-xs" />
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{item.who}</span> {item.what}
                </p>
                <p className="text-xs text-muted">{item.when}</p>
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}

function SummariesPage() {
  const [topic, setTopic] = useState("All");
  const [read, setRead] = useState(READ_BOOKS);
  const visible = books.filter(
    (book) => topic === "All" || book.topic === topic,
  );
  return (
    <Panel
      id="kirana-books-title"
      title="Library"
      sub={`${read.length} of ${books.length} read`}
      className="xl:col-span-2"
    >
      <div
        role="group"
        aria-label="Filter by topic"
        className="flex flex-wrap gap-2"
      >
        {topics.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={topic === item}
            className={cx(chip, topic === item ? chipOn : chipOff)}
            onClick={() => setTopic(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((book, index) => (
          <li
            key={book.id}
            data-book={book.id}
            className="grid gap-3 rounded-3xl border border-line bg-surface p-3"
          >
            <div
              aria-hidden="true"
              className={cx(
                "relative h-32 overflow-hidden rounded-2xl",
                tones[book.tone as Tone],
              )}
            >
              <span className="absolute -top-6 -right-4 size-24 rounded-full bg-(--tpl-on)/20" />
              <span
                className="absolute bottom-3 left-4 h-2 rounded-full bg-(--tpl-on)/40"
                style={{ width: `${30 + ((index * 17) % 40)}%` }}
              />
              <span className="absolute bottom-7 left-4 h-2 w-1/4 rounded-full bg-(--tpl-on)/25" />
            </div>
            <div className="flex items-start justify-between gap-3 px-1">
              <div className="min-w-0">
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-muted">
                  {book.author}, {book.minutes} min
                </p>
              </div>
              <span className={cx(pill, statBadges.sky)}>{book.topic}</span>
            </div>
            <button
              type="button"
              aria-pressed={read.includes(book.id)}
              className={cx(
                chip,
                "relative justify-center",
                read.includes(book.id) ? chipOn : chipOff,
              )}
              onClick={() => setRead(toggleIn(read, book.id))}
            >
              <span aria-hidden="true">
                {read.includes(book.id) ? "Read" : "Mark as read"}
              </span>
              <span className="sr-only">
                {`${read.includes(book.id) ? "Read" : "Mark as read"}: ${book.title}`}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function FoundersPage() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = founders.filter((item) =>
    `${item.name} ${item.company} ${item.sector}`
      .toLowerCase()
      .includes(needle),
  );
  return (
    <Panel
      id="kirana-founders-title"
      title="People to know"
      sub={plural(visible.length, "founder")}
      className="xl:col-span-2"
    >
      <Input
        label="Search founders"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="max-w-sm"
      />
      {visible.length === 0 && (
        <p className="text-sm text-muted">No founders match your search.</p>
      )}
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-3 rounded-3xl border border-line bg-surface p-4"
          >
            <Face name={item.name} className="size-12 text-sm" />
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold">{item.name}</h3>
              <p className="truncate text-sm text-muted">
                {item.company}, {item.sector}
              </p>
              <p className="text-xs font-semibold tabular-nums">
                {rupiah(item.raised)} raised
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              aria-label={`Connect with ${item.name}`}
              onClick={() => notify("Intro requested", item.name)}
            >
              Connect
            </Button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function FinancePage() {
  const [sort, setSort] = useState<{ key: SortKey; dir: number }>({
    key: "due",
    dir: 1,
  });
  const rows = [...invoices].sort(
    (a: Invoice, b: Invoice) =>
      (a[sort.key] < b[sort.key] ? -1 : a[sort.key] > b[sort.key] ? 1 : 0) *
      sort.dir,
  );
  const sortBy = (key: SortKey) =>
    setSort({ key, dir: sort.key === key ? -sort.dir : 1 });
  const peak = Math.max(...cashflow.map(([, value]) => value));

  return (
    <div className="grid content-start gap-4 xl:col-span-2 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Panel id="kirana-invoices-title" title="Invoices" sub="October 2026">
        <div
          tabIndex={0}
          role="region"
          aria-label="Invoice table"
          className={tableWrap}
        >
          <table className="w-full text-sm">
            <thead className="bg-subtle text-muted">
              <tr>
                <th scope="col" className={cx(th, "text-left")}>
                  Invoice
                </th>
                {invoiceColumns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={
                      sort.key === column.key
                        ? sort.dir === 1
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                    className={cx(th, column.align)}
                  >
                    <button
                      type="button"
                      className={thButton}
                      onClick={() => sortBy(column.key)}
                    >
                      {column.label}
                      <Icon name="sort" className="size-3.5" />
                    </button>
                  </th>
                ))}
                <th scope="col" className={cx(th, "text-left")}>
                  Status
                </th>
                <th scope="col" className={cx(th, "text-right")}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((invoice) => (
                <tr
                  key={invoice.id}
                  data-row={invoice.id}
                  className="border-t border-line"
                >
                  <td className={td}>
                    <span className="font-semibold">{invoice.id}</span>
                    <span className="block text-xs text-muted">
                      {invoice.customer}
                    </span>
                  </td>
                  <td className={td}>{shortDay(invoice.due)}</td>
                  <td
                    className={cx(td, "text-right font-semibold tabular-nums")}
                  >
                    {rupiah(invoice.amount)}
                  </td>
                  <td className={td}>
                    <Badge variant={statusVariant[invoice.status]}>
                      {invoice.status}
                    </Badge>
                  </td>
                  <td className={cx(td, "text-right")}>
                    {invoice.status !== "Paid" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Remind ${invoice.id}`}
                        onClick={() =>
                          notify(
                            "Reminder sent",
                            `${invoice.id} to ${invoice.customer}`,
                          )
                        }
                      >
                        Remind
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Panel
        id="kirana-cash-title"
        title="Cash flow"
        sub="Rp million per month"
      >
        <div
          role="img"
          aria-label={`Cash flow: ${cashflow.map(([month, value]) => `${month} Rp ${value} million`).join(", ")}`}
          className="flex h-56 items-end gap-3"
        >
          {cashflow.map(([month, value], index) => (
            <div
              key={month}
              className="flex h-full min-w-0 flex-1 flex-col justify-end gap-2"
            >
              <span className="text-center text-xs font-semibold tabular-nums">
                {value}
              </span>
              <div
                className={cx(
                  "rounded-xl",
                  index === cashflow.length - 1
                    ? "bg-(--tpl-teal)"
                    : "bg-(--tpl-mint)",
                )}
                style={{ height: `${Math.round((value / peak) * 80)}%` }}
              />
              <span className="text-center text-xs text-muted">{month}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function GrowthPage() {
  return (
    <Panel
      id="kirana-growth-title"
      title="Lead generation"
      sub="New leads per week"
      className="xl:col-span-2"
    >
      <Tabs
        defaultValue="30d"
        items={growthPeriods.map((period) => ({
          value: period.value,
          label: period.label,
          content: (
            <div className="grid gap-4">
              <dl className="grid gap-3 sm:grid-cols-3">
                {period.metrics.map(([label, value]) => (
                  <div key={label} className={tile}>
                    <dt className="text-xs text-muted">{label}</dt>
                    <dd className="text-xl font-bold tracking-tight tabular-nums">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <BarChart
                bars={period.bars}
                label={`New leads, ${period.label}`}
              />
            </div>
          ),
        }))}
      />
    </Panel>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const visible = projects.filter(
    (item) => filter === "All" || item.status === filter,
  );
  return (
    <Panel
      id="kirana-projects-title"
      title="Delivery board"
      sub={plural(visible.length, "project")}
      className="xl:col-span-2"
    >
      <div
        role="group"
        aria-label="Filter by status"
        className="flex flex-wrap gap-2"
      >
        {projectFilters.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            className={cx(chip, filter === item ? chipOn : chipOff)}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {visible.map((item) => (
          <li
            key={item.id}
            data-project={item.id}
            className="grid gap-3 rounded-3xl border border-line bg-surface p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted">
                  {item.client}, due {item.due}
                </p>
              </div>
              <Badge variant={projectVariant[item.status]}>{item.status}</Badge>
            </div>
            <div className="grid gap-1.5">
              <p className="flex justify-between gap-4 text-sm">
                <span className="font-medium">Progress</span>
                <span className="text-muted tabular-nums">
                  {item.progress}%
                </span>
              </p>
              <Progress
                value={item.progress}
                max={100}
                aria-label={`${item.name} progress`}
              />
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

const pageViews: Record<PageId, () => ReactNode> = {
  home: HomePage,
  summaries: SummariesPage,
  founders: FoundersPage,
  finance: FinancePage,
  contacts: ContactsPage,
  growth: GrowthPage,
  projects: ProjectsPage,
};

export default function Kirana() {
  const page = useSyncExternalStore(
    subscribeHash,
    readHash,
    () => DEFAULT_PAGE,
  );
  const PageView = pageViews[page];
  const go = (id: PageId) => window.location.assign(`#${id}`);
  const current = (id?: PageId) => (page === id ? "page" : undefined);
  const railClick = (item: (typeof rail)[number]) =>
    item.id ? go(item.id) : notify(item.label, "Coming up in your workspace");

  return (
    <div className={shell}>
      <header className="flex h-20 items-center gap-3 px-4 lg:px-6">
        <Drawer
          title="Menu"
          side="left"
          trigger={
            <button
              type="button"
              aria-label="Open menu"
              className={cx(roundButton, "xl:hidden")}
            >
              <Icon name="menu" />
            </button>
          }
        >
          <form method="dialog" className="grid gap-1">
            {rail.map((item) => (
              <button
                key={item.label}
                type="submit"
                aria-current={current(item.id)}
                className={cx(
                  menuItem,
                  page === item.id ? pillActive : menuIdle,
                )}
                onClick={() => railClick(item)}
              >
                <Icon name={item.icon} />
                {item.label}
              </button>
            ))}
          </form>
        </Drawer>
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-linear-135 from-(--tpl-blue) to-(--tpl-teal) text-(--tpl-on)"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-lg font-bold tracking-tight">Kirana</p>
            <p className="truncate text-xs text-muted max-[390px]:hidden">
              Grow. Connect. Succeed.
            </p>
          </div>
        </div>
        <nav
          aria-label="Main"
          className={cx(
            "mx-auto hidden items-center gap-1 rounded-full p-1 xl:flex",
            glass,
          )}
        >
          {topNav.map((id) => (
            <button
              key={id}
              type="button"
              aria-current={current(id)}
              className={cx(pillBase, page === id ? pillActive : pillIdle)}
              onClick={() => go(id)}
            >
              {pages[id].label}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <button
            type="button"
            aria-label="Messages, 2 unread"
            className={cx(roundButton, "max-sm:hidden")}
            onClick={() => notify("2 unread messages", "Ratna Kusuma replied")}
          >
            <Icon name="mail" />
            <span
              aria-hidden="true"
              className="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"
            />
          </button>
          <button
            type="button"
            aria-label="Notifications, 3 unread"
            className={roundButton}
            onClick={() =>
              notify("3 unread notifications", "Enterprise Plan moved stage")
            }
          >
            <Icon name="bell" />
            <span
              aria-hidden="true"
              className="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"
            />
          </button>
          <button
            type="button"
            aria-label="Open public site"
            className={cx(roundButton, "max-sm:hidden")}
            onClick={() =>
              notify("Public site", "kirana.id opened in a new tab")
            }
          >
            <Icon name="external" />
          </button>
          <Avatar
            name="Dimas Pratama"
            size="md"
            className="ring-2 ring-surface"
          />
        </div>
      </header>

      <div className="px-4 pb-8 lg:grid lg:grid-cols-[64px_minmax(0,1fr)] lg:gap-5 lg:pr-6 lg:pl-5">
        <div className="hidden lg:block">
          <nav
            aria-label="Workspace"
            className="sticky top-6 flex flex-col items-center gap-1.5 rounded-full bg-(--tpl-night) px-2.5 py-3 shadow-(--tpl-shadow) dark:border dark:border-line"
          >
            {rail.map((item) => (
              <span key={item.label} className="group relative inline-flex">
                <button
                  type="button"
                  aria-label={item.label}
                  aria-current={current(item.id)}
                  className={cx(
                    railBase,
                    page === item.id ? railActive : railIdle,
                  )}
                  onClick={() => railClick(item)}
                >
                  <Icon name={item.icon} />
                </button>
                <span aria-hidden="true" className={railTip}>
                  {item.label}
                </span>
              </span>
            ))}
          </nav>
        </div>

        <main className="grid min-w-0 content-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div
            className={cx(
              "flex flex-wrap items-center gap-4 xl:flex-nowrap",
              page !== "contacts" && "xl:col-span-2",
            )}
          >
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Back to Home"
                className={roundButton}
                onClick={() => go("home")}
              >
                <Icon name="back" />
              </button>
              <div className="w-48">
                <p className="text-xs text-muted">
                  Kirana / {pages[page].label}
                </p>
                <h1
                  id={TITLE_ID}
                  tabIndex={-1}
                  className="text-[28px] leading-tight font-bold tracking-tight focus:outline-none"
                >
                  {pages[page].title}
                </h1>
              </div>
            </div>
            <div className="grid w-full min-w-0 gap-3 sm:grid-cols-3 xl:flex-1">
              {headerStats[page].map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </div>
          <PageView />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
