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
import { Avatar } from "../../../components/avatar/avatar.component";
import { Badge } from "../../../components/badge/badge.component";
import { Button } from "../../../components/button/button.component";
import { Checkbox } from "../../../components/checkbox/checkbox.component";
import { Drawer } from "../../../components/drawer/drawer.component";
import {
  DropdownMenu,
  type DropdownMenuItem,
} from "../../../components/dropdown-menu/dropdown-menu.component";
import { Input } from "../../../components/input/input.component";
import { Progress } from "../../../components/progress/progress.component";
import { TabPanel, Tabs } from "../../../components/tabs/tabs.component";
import { Toaster, toast } from "../../../components/toast/toast.component";

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

function openDialog(id: string) {
  const dialog = document.getElementById(id);
  if (!(dialog instanceof HTMLDialogElement)) return;
  dialog.returnValue = "";
  dialog.showModal();
}

/** Ikon garis 24px; atribut svg tetap di host supaya class dari pemakai langsung berlaku. */
@Component({
  selector: "svg[kiranaIcon]",
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
  readonly kiranaIcon = input.required<IconName>();
  protected readonly path = computed(() => icons[this.kiranaIcon()]);
}

@Component({
  selector: "template-kirana",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  imports: [
    Avatar,
    Badge,
    Button,
    Checkbox,
    Drawer,
    DropdownMenu,
    Input,
    Progress,
    Tabs,
    TabPanel,
    Toaster,
    Icon,
  ],
  template: `
    <div [class]="shell">
      <header class="flex h-20 items-center gap-3 px-4 lg:px-6">
        <markas-drawer title="Menu" side="left">
          <button
            trigger
            type="button"
            aria-label="Open menu"
            [class]="cx(roundButton, 'xl:hidden')"
          >
            <svg kiranaIcon="menu" class="size-5"></svg>
          </button>
          <form method="dialog" class="grid gap-1">
            @for (item of rail; track item.label) {
              <button
                type="submit"
                [attr.aria-current]="current(item.id)"
                [class]="
                  cx(menuItem, pageId() === item.id ? pillActive : menuIdle)
                "
                (click)="railClick(item)"
              >
                <svg [kiranaIcon]="item.icon" class="size-5"></svg>
                {{ item.label }}
              </button>
            }
          </form>
        </markas-drawer>
        <div class="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-linear-135 from-(--tpl-blue) to-(--tpl-teal) text-(--tpl-on)"
          >
            <svg
              class="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </span>
          <div class="min-w-0 leading-tight">
            <p class="text-lg font-bold tracking-tight">Kirana</p>
            <p class="truncate text-xs text-muted max-[390px]:hidden">
              Grow. Connect. Succeed.
            </p>
          </div>
        </div>
        <nav
          aria-label="Main"
          [class]="
            cx(
              'mx-auto hidden items-center gap-1 rounded-full p-1 xl:flex',
              glass
            )
          "
        >
          @for (id of topNav; track id) {
            <button
              type="button"
              [attr.aria-current]="current(id)"
              [class]="cx(pillBase, pageId() === id ? pillActive : pillIdle)"
              (click)="go(id)"
              [textContent]="pages[id].label"
            ></button>
          }
        </nav>
        <div class="ml-auto flex items-center gap-2 xl:ml-0">
          <button
            type="button"
            aria-label="Messages, 2 unread"
            [class]="cx(roundButton, 'max-sm:hidden')"
            (click)="notify('2 unread messages', 'Ratna Kusuma replied')"
          >
            <svg kiranaIcon="mail" class="size-5"></svg>
            <span
              aria-hidden="true"
              class="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"
            ></span>
          </button>
          <button
            type="button"
            aria-label="Notifications, 3 unread"
            [class]="roundButton"
            (click)="
              notify('3 unread notifications', 'Enterprise Plan moved stage')
            "
          >
            <svg kiranaIcon="bell" class="size-5"></svg>
            <span
              aria-hidden="true"
              class="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"
            ></span>
          </button>
          <button
            type="button"
            aria-label="Open public site"
            [class]="cx(roundButton, 'max-sm:hidden')"
            (click)="notify('Public site', 'kirana.id opened in a new tab')"
          >
            <svg kiranaIcon="external" class="size-5"></svg>
          </button>
          <markas-avatar
            name="Dimas Pratama"
            size="md"
            class="ring-2 ring-surface"
          />
        </div>
      </header>

      <div
        class="px-4 pb-8 lg:grid lg:grid-cols-[64px_minmax(0,1fr)] lg:gap-5 lg:pr-6 lg:pl-5"
      >
        <div class="hidden lg:block">
          <nav
            aria-label="Workspace"
            class="sticky top-6 flex flex-col items-center gap-1.5 rounded-full bg-(--tpl-night) px-2.5 py-3 shadow-(--tpl-shadow) dark:border dark:border-line"
          >
            @for (item of rail; track item.label) {
              <span class="group relative inline-flex">
                <button
                  type="button"
                  [attr.aria-label]="item.label"
                  [attr.aria-current]="current(item.id)"
                  [class]="
                    cx(railBase, pageId() === item.id ? railActive : railIdle)
                  "
                  (click)="railClick(item)"
                >
                  <svg [kiranaIcon]="item.icon" class="size-5"></svg>
                </button>
                <span aria-hidden="true" [class]="railTip">{{
                  item.label
                }}</span>
              </span>
            }
          </nav>
        </div>

        <main
          class="grid min-w-0 content-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]"
        >
          <div
            [class]="
              cx(
                'flex flex-wrap items-center gap-4 xl:flex-nowrap',
                pageId() !== 'contacts' && 'xl:col-span-2'
              )
            "
          >
            <div class="flex items-center gap-4">
              <button
                type="button"
                aria-label="Back to Home"
                [class]="roundButton"
                (click)="go('home')"
              >
                <svg kiranaIcon="back" class="size-5"></svg>
              </button>
              <div class="w-48">
                <p
                  class="text-xs text-muted"
                  [textContent]="'Kirana / ' + pages[pageId()].label"
                ></p>
                <h1
                  [id]="TITLE_ID"
                  tabindex="-1"
                  class="text-[28px] leading-tight font-bold tracking-tight focus:outline-none"
                  [textContent]="pages[pageId()].title"
                ></h1>
              </div>
            </div>
            <div class="grid w-full min-w-0 gap-3 sm:grid-cols-3 xl:flex-1">
              @for (stat of headerStats[pageId()]; track stat.label) {
                <div
                  [class]="cx('flex items-center gap-3 rounded-3xl p-3', glass)"
                >
                  <span
                    class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-subtle"
                  >
                    <svg [kiranaIcon]="stat.icon" class="size-5"></svg>
                  </span>
                  <div class="grid min-w-0 gap-1">
                    <p class="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span
                        class="text-lg font-bold tracking-tight whitespace-nowrap tabular-nums"
                        [textContent]="stat.value"
                      ></span>
                      <span
                        [class]="cx(pill, statBadges[stat.tone])"
                        [textContent]="stat.badge"
                      ></span>
                    </p>
                    <p
                      class="max-w-40 text-xs leading-snug text-muted"
                      [textContent]="stat.label"
                    ></p>
                  </div>
                </div>
              }
            </div>
          </div>

          @switch (pageId()) {
            @case ("contacts") {
              <div class="contents">
                <div class="grid min-w-0 content-start gap-4">
                  <section
                    aria-labelledby="kirana-history-title"
                    [class]="panel"
                  >
                    <div class="flex items-center justify-between gap-3">
                      <div class="min-w-0">
                        <h2
                          id="kirana-history-title"
                          class="text-lg font-semibold tracking-tight"
                        >
                          Interaction History
                        </h2>
                      </div>
                      <div class="flex shrink-0 gap-2">
                        <markas-dropdown-menu
                          [items]="historyMenu"
                          [class]="menuTrigger"
                          (selected)="onHistorySelect($event)"
                          ><ng-container trigger
                            ><svg kiranaIcon="dots" class="size-4"></svg
                            ><span class="sr-only"
                              >Interaction History options</span
                            ></ng-container
                          ></markas-dropdown-menu
                        >
                        <button
                          type="button"
                          aria-label="Expand Interaction History"
                          [class]="smallButton"
                          (click)="expand('Interaction History')"
                        >
                          <svg kiranaIcon="expand" class="size-4"></svg>
                        </button>
                      </div>
                    </div>
                    <ul
                      role="list"
                      class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      @for (item of sortedDeals(); track item.id) {
                        <li
                          [attr.data-deal]="item.id"
                          [class]="
                            cx(
                              dealBase,
                              tones[item.tone],
                              item.id === selectedId() && dealSelected
                            )
                          "
                        >
                          <div class="flex items-start justify-between gap-3">
                            <p
                              class="pt-1 text-xs font-medium"
                              [textContent]="'Oct ' + item.day"
                            ></p>
                            <button
                              type="button"
                              [attr.aria-label]="'Open ' + item.title"
                              [class]="cardButton($any(item.tone))"
                              (click)="openDeal(item.id)"
                            >
                              <svg
                                [kiranaIcon]="
                                  item.tone === 'night' ? 'arrow' : 'dots'
                                "
                                class="size-4"
                              ></svg>
                            </button>
                          </div>
                          <h3
                            class="mt-1 max-w-56 text-lg leading-snug font-semibold"
                          >
                            <button
                              type="button"
                              [attr.aria-pressed]="item.id === selectedId()"
                              [class]="selectable"
                              (click)="openDeal(item.id)"
                              [textContent]="item.title"
                            ></button>
                          </h3>
                          <div
                            class="mt-auto flex items-end justify-between gap-2 pt-4"
                          >
                            <p
                              class="text-lg font-bold tracking-tight tabular-nums"
                              [textContent]="rupiah(item.value)"
                            ></p>
                            <div
                              role="img"
                              [attr.aria-label]="
                                'Team: ' + item.team.join(', ')
                              "
                              class="flex -space-x-1"
                            >
                              @for (name of item.team; track name) {
                                <span
                                  aria-hidden="true"
                                  [class]="
                                    cx(
                                      face,
                                      faceTone(name),
                                      'size-7 text-[10px] ring-2 ring-(--card)'
                                    )
                                  "
                                  [textContent]="initials(name)"
                                ></span>
                              }
                            </div>
                          </div>
                        </li>
                      }
                    </ul>
                  </section>
                  <div class="grid gap-4 lg:grid-cols-2">
                    <section
                      aria-labelledby="kirana-schedule-title"
                      [class]="panel"
                    >
                      <div class="flex items-center justify-between gap-3">
                        <div class="min-w-0">
                          <h2
                            id="kirana-schedule-title"
                            class="text-lg font-semibold tracking-tight"
                          >
                            Tasks Schedule
                          </h2>
                        </div>
                        <div class="flex shrink-0 gap-2">
                          <markas-dropdown-menu
                            [items]="scheduleMenu"
                            [class]="menuTrigger"
                            (selected)="onScheduleSelect($event)"
                            ><ng-container trigger
                              ><svg kiranaIcon="dots" class="size-4"></svg
                              ><span class="sr-only"
                                >Tasks Schedule options</span
                              ></ng-container
                            ></markas-dropdown-menu
                          >
                          <button
                            type="button"
                            aria-label="Expand Tasks Schedule"
                            [class]="smallButton"
                            (click)="expand('Tasks Schedule')"
                          >
                            <svg kiranaIcon="expand" class="size-4"></svg>
                          </button>
                        </div>
                      </div>
                      <div class="flex items-center justify-between gap-3">
                        <h3
                          class="flex items-baseline gap-2 text-base font-semibold"
                        >
                          {{ monthName() }}
                          <span
                            class="text-sm font-normal text-muted"
                            [textContent]="view().year"
                          ></span>
                        </h3>
                        <div class="flex gap-2">
                          <button
                            type="button"
                            aria-label="Previous month"
                            [class]="smallButton"
                            (click)="shift(-1)"
                          >
                            <svg kiranaIcon="prev" class="size-4"></svg>
                          </button>
                          <button
                            type="button"
                            aria-label="Next month"
                            [class]="smallButton"
                            (click)="shift(1)"
                          >
                            <svg kiranaIcon="next" class="size-4"></svg>
                          </button>
                        </div>
                      </div>
                      <div class="grid grid-cols-7 gap-1.5">
                        @for (day of weekdays; track $index) {
                          <span
                            aria-hidden="true"
                            class="text-center text-xs font-medium text-muted"
                            [textContent]="day"
                          ></span>
                        }
                        @for (day of cells(); track $index) {
                          @if (day === null) {
                            <span aria-hidden="true"></span>
                          } @else {
                            @let iso = isoDate(view().year, view().month, day);
                            @let item = marks[iso];
                            <button
                              type="button"
                              [attr.aria-pressed]="selected() === iso"
                              [class]="
                                cx(
                                  dayBase,
                                  dayTones[item?.tone ?? 'none'],
                                  selected() === iso && daySelected
                                )
                              "
                              (click)="selected.set(iso)"
                            >
                              <span
                                aria-hidden="true"
                                [textContent]="day"
                              ></span>
                              <span
                                class="sr-only"
                                [textContent]="
                                  monthName() +
                                  ' ' +
                                  day +
                                  (item ? ', ' + item.task : '')
                                "
                              ></span>
                              @if (item) {
                                <span
                                  aria-hidden="true"
                                  [class]="
                                    cx(
                                      face,
                                      faceTone(item.who),
                                      'size-5 text-[8px] ring-1 ring-(--tpl-on) max-sm:hidden'
                                    )
                                  "
                                  [textContent]="initials(item.who)"
                                ></span>
                              }
                            </button>
                          }
                        }
                      </div>
                      <p
                        aria-live="polite"
                        data-agenda
                        class="text-sm text-muted"
                      >
                        <span
                          class="font-semibold text-ink"
                          [textContent]="shortDay(selected())"
                        ></span
                        >{{ agenda() }}
                      </p>
                    </section>
                    <section
                      aria-labelledby="kirana-funnel-title"
                      [class]="panel"
                    >
                      <div class="flex items-center justify-between gap-3">
                        <div class="min-w-0">
                          <h2
                            id="kirana-funnel-title"
                            class="text-lg font-semibold tracking-tight"
                          >
                            Stage Funnel
                          </h2>
                        </div>
                        <div class="flex shrink-0 gap-2">
                          <markas-dropdown-menu
                            [items]="funnelMenu"
                            [class]="menuTrigger"
                            (selected)="onFunnelSelect($event)"
                            ><ng-container trigger
                              ><svg kiranaIcon="dots" class="size-4"></svg
                              ><span class="sr-only"
                                >Stage Funnel options</span
                              ></ng-container
                            ></markas-dropdown-menu
                          >
                          <button
                            type="button"
                            aria-label="Expand Stage Funnel"
                            [class]="smallButton"
                            (click)="expand('Stage Funnel')"
                          >
                            <svg kiranaIcon="expand" class="size-4"></svg>
                          </button>
                        </div>
                      </div>
                      <div
                        class="flex flex-wrap items-end justify-between gap-3"
                      >
                        <div>
                          <p
                            data-funnel-total
                            class="text-2xl font-bold tracking-tight tabular-nums"
                            [textContent]="funnelData().total"
                          ></p>
                          <p class="text-xs text-muted">Total in Pipeline</p>
                        </div>
                        <div
                          role="group"
                          aria-label="Pipeline value"
                          class="inline-flex rounded-full bg-subtle p-1"
                        >
                          @for (value of funnelModes; track value) {
                            <button
                              type="button"
                              [attr.aria-pressed]="mode() === value"
                              [class]="
                                cx(
                                  segment,
                                  mode() === value ? segmentOn : segmentOff
                                )
                              "
                              (click)="mode.set(value)"
                              [textContent]="
                                value === 'weighted' ? 'Weighted' : 'Total'
                              "
                            ></button>
                          }
                        </div>
                      </div>
                      <ol class="grid gap-2.5" aria-label="Pipeline by stage">
                        @for (
                          step of funnelData().steps;
                          track step[0];
                          let index = $index
                        ) {
                          <li
                            [class]="
                              cx(
                                'mx-auto flex h-14 items-center justify-between gap-3 rounded-full bg-subtle pr-2 pl-5',
                                funnelWidths[index]
                              )
                            "
                          >
                            <span class="grid leading-tight">
                              <span
                                class="text-xs text-muted"
                                [textContent]="step[0]"
                              ></span>
                              <span
                                class="text-sm font-bold tabular-nums"
                                [textContent]="step[1]"
                              ></span>
                            </span>
                            @if (index === 0) {
                              <button
                                type="button"
                                [attr.aria-label]="'Open ' + step[0]"
                                [class]="cx(smallButton, 'size-10')"
                                (click)="
                                  notify(step[0]!, step[1] + ' in this stage')
                                "
                              >
                                <svg kiranaIcon="arrow" class="size-4"></svg>
                              </button>
                            } @else {
                              <span class="size-10" aria-hidden="true"></span>
                            }
                          </li>
                        }
                      </ol>
                    </section>
                  </div>
                </div>

                <div
                  class="grid min-w-0 grid-cols-1 content-start gap-4 xl:col-start-2 xl:row-span-2 xl:row-start-1"
                >
                  <section
                    aria-labelledby="kirana-profile-name"
                    class="grid gap-4 rounded-3xl border border-(--tpl-glass-line) bg-linear-to-b from-(--tpl-rose) to-(--tpl-rose-2) p-4 shadow-(--tpl-shadow)"
                  >
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex gap-2">
                        <button
                          type="button"
                          aria-label="Forward contact"
                          [class]="smallButton"
                          (click)="notify('Contact forwarded', fullName())"
                        >
                          <svg kiranaIcon="forward" class="size-4"></svg>
                        </button>
                        <button
                          type="button"
                          aria-label="Share profile"
                          [class]="smallButton"
                          (click)="notify('Share link ready', fullName())"
                        >
                          <svg kiranaIcon="share" class="size-4"></svg>
                        </button>
                      </div>
                      <div class="flex gap-2">
                        <markas-dropdown-menu
                          [items]="profileMenu"
                          [class]="menuTrigger"
                          (selected)="notify($event, fullName())"
                          ><ng-container trigger
                            ><svg kiranaIcon="dots" class="size-4"></svg
                            ><span class="sr-only"
                              >Profile options</span
                            ></ng-container
                          ></markas-dropdown-menu
                        >
                        <button
                          type="button"
                          aria-label="Expand Profile"
                          [class]="smallButton"
                          (click)="expand('Profile')"
                        >
                          <svg kiranaIcon="expand" class="size-4"></svg>
                        </button>
                      </div>
                    </div>
                    <div
                      class="grid justify-items-center gap-1 pb-1 text-center"
                    >
                      <span
                        aria-hidden="true"
                        [class]="
                          cx(
                            face,
                            faceTone(fullName()),
                            'mb-2 size-24 text-2xl ring-4 ring-surface'
                          )
                        "
                        [textContent]="initials(fullName())"
                      ></span>
                      <h2
                        id="kirana-profile-name"
                        class="text-xl font-bold tracking-tight"
                        [textContent]="fullName()"
                      ></h2>
                      <p class="text-sm text-muted">Chief Growth Officer</p>
                      <p class="text-sm font-medium">PT Nusantara Digital</p>
                    </div>
                    <div class="flex flex-wrap justify-center gap-2">
                      @for (action of profileActions; track action.label) {
                        <button
                          type="button"
                          [attr.aria-label]="action.label"
                          [class]="
                            cx(smallButton, 'size-10 border-transparent')
                          "
                          (click)="notify(action.label, fullName())"
                        >
                          <svg [kiranaIcon]="action.icon" class="size-4"></svg>
                        </button>
                      }
                    </div>
                  </section>

                  <section
                    aria-labelledby="kirana-details-title"
                    [class]="panel"
                  >
                    <div class="flex items-center justify-between gap-3">
                      <div class="min-w-0">
                        <h2
                          id="kirana-details-title"
                          class="text-lg font-semibold tracking-tight"
                        >
                          Detailed Information
                        </h2>
                      </div>
                      <div class="flex shrink-0 gap-2">
                        <markas-drawer
                          #editDrawer
                          title="Edit contact details"
                          (closed)="onEditClose()"
                        >
                          <button
                            trigger
                            type="button"
                            aria-label="Edit details"
                            [class]="smallButton"
                            (click)="draft.set(contact())"
                          >
                            <svg kiranaIcon="pencil" class="size-4"></svg>
                          </button>
                          <div class="grid gap-4">
                            @for (field of contactFields; track field.key) {
                              <markas-input
                                [label]="field.label"
                                [type]="field.type"
                                [name]="field.key"
                                [value]="draft()[field.key]"
                                (valueChange)="setDraft(field.key, $event)"
                              />
                            }
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
                            <button markas-button type="submit" value="save">
                              Save changes
                            </button>
                          </ng-container>
                        </markas-drawer>
                        <button
                          type="button"
                          aria-label="Expand Detailed Information"
                          [class]="smallButton"
                          (click)="expand('Detailed Information')"
                        >
                          <svg kiranaIcon="expand" class="size-4"></svg>
                        </button>
                      </div>
                    </div>
                    <ul class="grid grid-cols-1">
                      @for (field of contactFields; track field.key) {
                        <li class="flex items-center gap-3 py-2.5">
                          <span
                            class="flex size-10 shrink-0 items-center justify-center rounded-full bg-subtle"
                          >
                            <svg [kiranaIcon]="field.icon" class="size-4"></svg>
                          </span>
                          <div class="min-w-0 flex-1">
                            <p
                              class="text-xs text-muted"
                              [textContent]="field.label"
                            ></p>
                            <p
                              class="truncate text-sm font-semibold"
                              [textContent]="contact()[field.key]"
                            ></p>
                          </div>
                          @if (field.add) {
                            <button
                              type="button"
                              [attr.aria-label]="field.add"
                              [class]="cx(smallButton, 'size-8')"
                              (click)="notify(field.add, fullName())"
                            >
                              <svg kiranaIcon="plus" class="size-4"></svg>
                            </button>
                          }
                        </li>
                      }
                      <li class="flex items-center gap-3 py-2.5">
                        <span
                          class="flex size-10 shrink-0 items-center justify-center rounded-full bg-subtle"
                        >
                          <svg kiranaIcon="share" class="size-4"></svg>
                        </span>
                        <div class="min-w-0 flex-1">
                          <p class="text-xs text-muted">Sources</p>
                          <div class="mt-1 flex gap-1.5">
                            @for (source of sources; track source.label) {
                              <span
                                role="img"
                                [attr.aria-label]="source.label"
                                [class]="
                                  cx(
                                    'flex size-7 items-center justify-center rounded-full text-(--tpl-on)',
                                    source.tone
                                  )
                                "
                              >
                                <svg
                                  [kiranaIcon]="source.icon"
                                  class="size-3.5"
                                ></svg>
                              </span>
                            }
                          </div>
                        </div>
                      </li>
                      <li class="flex items-center gap-3 py-2.5">
                        <span
                          class="flex size-10 shrink-0 items-center justify-center rounded-full bg-subtle"
                        >
                          <svg kiranaIcon="clock" class="size-4"></svg>
                        </span>
                        <div class="min-w-0 flex-1">
                          <p class="text-xs text-muted">Last Contacted</p>
                          <p class="text-sm font-semibold">
                            Oct 14, 2026, 10:20
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label="Log contact"
                          [class]="cx(smallButton, 'size-8')"
                          (click)="notify('Contact logged', fullName())"
                        >
                          <svg kiranaIcon="plus" class="size-4"></svg>
                        </button>
                      </li>
                    </ul>
                  </section>
                </div>

                <markas-drawer
                  [id]="DEAL_DRAWER"
                  title="Deal details"
                  (closed)="onDealClose()"
                >
                  <div class="grid gap-4 text-ink">
                    <div [class]="cx('rounded-3xl p-4', tones[deal().tone])">
                      <p
                        class="text-xs font-medium"
                        [textContent]="'Oct ' + deal().day + ', 2026'"
                      ></p>
                      <p
                        class="mt-1 text-lg leading-snug font-semibold"
                        [textContent]="deal().title"
                      ></p>
                      <p
                        class="mt-3 text-2xl font-bold tabular-nums"
                        [textContent]="rupiah(deal().value)"
                      ></p>
                    </div>
                    <dl class="grid gap-3">
                      <div class="flex justify-between gap-3">
                        <dt class="text-muted">Stage</dt>
                        <dd
                          data-stage
                          class="font-semibold"
                          [textContent]="deal().stage"
                        ></dd>
                      </div>
                      <div class="flex justify-between gap-3">
                        <dt class="text-muted">Customer</dt>
                        <dd
                          class="font-semibold"
                          [textContent]="fullName()"
                        ></dd>
                      </div>
                      <div class="flex items-center justify-between gap-3">
                        <dt class="text-muted">Team</dt>
                        <dd>
                          <div
                            role="img"
                            [attr.aria-label]="
                              'Team: ' + deal().team.join(', ')
                            "
                            class="flex -space-x-1"
                          >
                            @for (name of deal().team; track name) {
                              <span
                                aria-hidden="true"
                                [class]="
                                  cx(
                                    face,
                                    faceTone(name),
                                    'size-7 text-[10px] ring-2 ring-surface'
                                  )
                                "
                                [textContent]="initials(name)"
                              ></span>
                            }
                          </div>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <ng-container footer>
                    <button
                      markas-button
                      variant="secondary"
                      type="submit"
                      value="cancel"
                    >
                      Close
                    </button>
                    <button markas-button type="submit" value="won">
                      Mark as won
                    </button>
                  </ng-container>
                </markas-drawer>
              </div>
            }
            @case ("home") {
              <div
                class="grid content-start gap-4 lg:grid-cols-2 xl:col-span-2"
              >
                <section aria-labelledby="kirana-today-title" [class]="panel">
                  <div class="flex items-center justify-between gap-3">
                    <div class="min-w-0">
                      <h2
                        id="kirana-today-title"
                        class="text-lg font-semibold tracking-tight"
                      >
                        Today's tasks
                      </h2>
                      <p
                        class="text-sm text-muted"
                        [textContent]="
                          done().length + ' of ' + todayTasks.length + ' done'
                        "
                      ></p>
                    </div>
                  </div>
                  <markas-progress
                    [value]="done().length"
                    [max]="todayTasks.length"
                    aria-label="Tasks completed"
                  />
                  <ul class="grid gap-2">
                    @for (task of todayTasks; track task.id) {
                      <li class="rounded-2xl bg-surface p-3">
                        <markas-checkbox
                          [label]="task.title"
                          [description]="task.time"
                          [checked]="done().includes(task.id)"
                          (checkedChange)="toggleDone(task.id)"
                        />
                      </li>
                    }
                  </ul>
                </section>
                <section
                  aria-labelledby="kirana-activity-title"
                  [class]="panel"
                >
                  <div class="flex items-center justify-between gap-3">
                    <div class="min-w-0">
                      <h2
                        id="kirana-activity-title"
                        class="text-lg font-semibold tracking-tight"
                      >
                        Recent activity
                      </h2>
                      <p class="text-sm text-muted">
                        Latest updates from your team
                      </p>
                    </div>
                  </div>
                  <ol class="grid gap-4">
                    @for (item of activity; track item.when) {
                      <li class="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          [class]="
                            cx(face, faceTone(item.who), 'size-9 text-xs')
                          "
                          [textContent]="initials(item.who)"
                        ></span>
                        <div class="min-w-0 flex-1">
                          <p class="text-sm">
                            <span
                              class="font-semibold"
                              [textContent]="item.who"
                            ></span
                            >{{ " " + item.what }}
                          </p>
                          <p
                            class="text-xs text-muted"
                            [textContent]="item.when"
                          ></p>
                        </div>
                      </li>
                    }
                  </ol>
                </section>
              </div>
            }
            @case ("summaries") {
              <section
                aria-labelledby="kirana-books-title"
                [class]="cx(panel, 'xl:col-span-2')"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="min-w-0">
                    <h2
                      id="kirana-books-title"
                      class="text-lg font-semibold tracking-tight"
                    >
                      Library
                    </h2>
                    <p
                      class="text-sm text-muted"
                      [textContent]="
                        read().length + ' of ' + books.length + ' read'
                      "
                    ></p>
                  </div>
                </div>
                <div
                  role="group"
                  aria-label="Filter by topic"
                  class="flex flex-wrap gap-2"
                >
                  @for (item of topics; track item) {
                    <button
                      type="button"
                      [attr.aria-pressed]="topic() === item"
                      [class]="cx(chip, topic() === item ? chipOn : chipOff)"
                      (click)="topic.set(item)"
                      [textContent]="item"
                    ></button>
                  }
                </div>
                <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  @for (
                    book of visibleBooks();
                    track book.id;
                    let index = $index
                  ) {
                    @let isRead = read().includes(book.id);
                    <li
                      [attr.data-book]="book.id"
                      class="grid gap-3 rounded-3xl border border-line bg-surface p-3"
                    >
                      <div
                        aria-hidden="true"
                        [class]="
                          cx(
                            'relative h-32 overflow-hidden rounded-2xl',
                            tones[book.tone]
                          )
                        "
                      >
                        <span
                          class="absolute -top-6 -right-4 size-24 rounded-full bg-(--tpl-on)/20"
                        ></span>
                        <span
                          class="absolute bottom-3 left-4 h-2 rounded-full bg-(--tpl-on)/40"
                          [style.width.%]="30 + ((index * 17) % 40)"
                        ></span>
                        <span
                          class="absolute bottom-7 left-4 h-2 w-1/4 rounded-full bg-(--tpl-on)/25"
                        ></span>
                      </div>
                      <div class="flex items-start justify-between gap-3 px-1">
                        <div class="min-w-0">
                          <h3
                            class="font-semibold"
                            [textContent]="book.title"
                          ></h3>
                          <p
                            class="text-sm text-muted"
                            [textContent]="
                              book.author + ', ' + book.minutes + ' min'
                            "
                          ></p>
                        </div>
                        <span
                          [class]="cx(pill, statBadges.sky)"
                          [textContent]="book.topic"
                        ></span>
                      </div>
                      <button
                        type="button"
                        [attr.aria-pressed]="isRead"
                        [class]="
                          cx(
                            chip,
                            'relative justify-center',
                            isRead ? chipOn : chipOff
                          )
                        "
                        (click)="toggleRead(book.id)"
                      >
                        <span
                          aria-hidden="true"
                          [textContent]="isRead ? 'Read' : 'Mark as read'"
                        ></span>
                        <span
                          class="sr-only"
                          [textContent]="
                            (isRead ? 'Read' : 'Mark as read') +
                            ': ' +
                            book.title
                          "
                        ></span>
                      </button>
                    </li>
                  }
                </ul>
              </section>
            }
            @case ("founders") {
              <section
                aria-labelledby="kirana-founders-title"
                [class]="cx(panel, 'xl:col-span-2')"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="min-w-0">
                    <h2
                      id="kirana-founders-title"
                      class="text-lg font-semibold tracking-tight"
                    >
                      People to know
                    </h2>
                    <p
                      class="text-sm text-muted"
                      [textContent]="
                        plural(visibleFounders().length, 'founder')
                      "
                    ></p>
                  </div>
                </div>
                <markas-input
                  [(value)]="query"
                  label="Search founders"
                  type="search"
                  class="max-w-sm"
                />
                @if (visibleFounders().length === 0) {
                  <p class="text-sm text-muted">
                    No founders match your search.
                  </p>
                }
                <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  @for (item of visibleFounders(); track item.name) {
                    <li
                      class="flex items-center gap-3 rounded-3xl border border-line bg-surface p-4"
                    >
                      <span
                        aria-hidden="true"
                        [class]="
                          cx(face, faceTone(item.name), 'size-12 text-sm')
                        "
                        [textContent]="initials(item.name)"
                      ></span>
                      <div class="min-w-0 flex-1">
                        <h3
                          class="truncate font-semibold"
                          [textContent]="item.name"
                        ></h3>
                        <p
                          class="truncate text-sm text-muted"
                          [textContent]="item.company + ', ' + item.sector"
                        ></p>
                        <p
                          class="text-xs font-semibold tabular-nums"
                          [textContent]="rupiah(item.raised) + ' raised'"
                        ></p>
                      </div>
                      <button
                        markas-button
                        variant="secondary"
                        size="sm"
                        [attr.aria-label]="'Connect with ' + item.name"
                        (click)="notify('Intro requested', item.name)"
                      >
                        Connect
                      </button>
                    </li>
                  }
                </ul>
              </section>
            }
            @case ("finance") {
              <div
                class="grid content-start gap-4 xl:col-span-2 xl:grid-cols-[minmax(0,1fr)_360px]"
              >
                <section
                  aria-labelledby="kirana-invoices-title"
                  [class]="panel"
                >
                  <div class="flex items-center justify-between gap-3">
                    <div class="min-w-0">
                      <h2
                        id="kirana-invoices-title"
                        class="text-lg font-semibold tracking-tight"
                      >
                        Invoices
                      </h2>
                      <p class="text-sm text-muted">October 2026</p>
                    </div>
                  </div>
                  <div
                    tabindex="0"
                    role="region"
                    aria-label="Invoice table"
                    [class]="tableWrap"
                  >
                    <table class="w-full text-sm">
                      <thead class="bg-subtle text-muted">
                        <tr>
                          <th scope="col" [class]="cx(th, 'text-left')">
                            Invoice
                          </th>
                          @for (column of invoiceColumns; track column.key) {
                            <th
                              scope="col"
                              [attr.aria-sort]="ariaSort(column.key)"
                              [class]="cx(th, column.align)"
                            >
                              <button
                                type="button"
                                [class]="thButton"
                                (click)="sortBy(column.key)"
                              >
                                {{ column.label }}
                                <svg kiranaIcon="sort" class="size-3.5"></svg>
                              </button>
                            </th>
                          }
                          <th scope="col" [class]="cx(th, 'text-left')">
                            Status
                          </th>
                          <th scope="col" [class]="cx(th, 'text-right')">
                            <span class="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        @for (invoice of rows(); track invoice.id) {
                          <tr
                            [attr.data-row]="invoice.id"
                            class="border-t border-line"
                          >
                            <td [class]="td">
                              <span
                                class="font-semibold"
                                [textContent]="invoice.id"
                              ></span
                              ><span
                                class="block text-xs text-muted"
                                [textContent]="invoice.customer"
                              ></span>
                            </td>
                            <td
                              [class]="td"
                              [textContent]="shortDay(invoice.due)"
                            ></td>
                            <td
                              [class]="
                                cx(td, 'text-right font-semibold tabular-nums')
                              "
                              [textContent]="rupiah(invoice.amount)"
                            ></td>
                            <td [class]="td">
                              <span
                                markas-badge
                                [variant]="statusVariant[invoice.status]!"
                                >{{ invoice.status }}</span
                              >
                            </td>
                            <td [class]="cx(td, 'text-right')">
                              @if (invoice.status !== "Paid") {
                                <button
                                  markas-button
                                  variant="ghost"
                                  size="sm"
                                  [attr.aria-label]="'Remind ' + invoice.id"
                                  (click)="
                                    notify(
                                      'Reminder sent',
                                      invoice.id + ' to ' + invoice.customer
                                    )
                                  "
                                >
                                  Remind
                                </button>
                              }
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </section>
                <section aria-labelledby="kirana-cash-title" [class]="panel">
                  <div class="flex items-center justify-between gap-3">
                    <div class="min-w-0">
                      <h2
                        id="kirana-cash-title"
                        class="text-lg font-semibold tracking-tight"
                      >
                        Cash flow
                      </h2>
                      <p class="text-sm text-muted">Rp million per month</p>
                    </div>
                  </div>
                  <div
                    role="img"
                    [attr.aria-label]="cashLabel"
                    class="flex h-56 items-end gap-3"
                  >
                    @for (
                      entry of cashflow;
                      track entry[0];
                      let index = $index
                    ) {
                      <div
                        class="flex h-full min-w-0 flex-1 flex-col justify-end gap-2"
                      >
                        <span
                          class="text-center text-xs font-semibold tabular-nums"
                          [textContent]="entry[1]"
                        ></span>
                        <div
                          [class]="
                            cx(
                              'rounded-xl',
                              index === cashflow.length - 1
                                ? 'bg-(--tpl-teal)'
                                : 'bg-(--tpl-mint)'
                            )
                          "
                          [style.height.%]="cashHeight(entry[1])"
                        ></div>
                        <span
                          class="text-center text-xs text-muted"
                          [textContent]="entry[0]"
                        ></span>
                      </div>
                    }
                  </div>
                </section>
              </div>
            }
            @case ("growth") {
              <section
                aria-labelledby="kirana-growth-title"
                [class]="cx(panel, 'xl:col-span-2')"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="min-w-0">
                    <h2
                      id="kirana-growth-title"
                      class="text-lg font-semibold tracking-tight"
                    >
                      Lead generation
                    </h2>
                    <p class="text-sm text-muted">New leads per week</p>
                  </div>
                </div>
                <markas-tabs defaultValue="30d" [items]="growthTabs">
                  @for (period of growthPeriods; track period.value) {
                    <ng-template [markasTabPanel]="period.value">
                      <div class="grid gap-4">
                        <dl class="grid gap-3 sm:grid-cols-3">
                          @for (metric of period.metrics; track metric[0]) {
                            <div [class]="tile">
                              <dt
                                class="text-xs text-muted"
                                [textContent]="metric[0]"
                              ></dt>
                              <dd
                                class="text-xl font-bold tracking-tight tabular-nums"
                                [textContent]="metric[1]"
                              ></dd>
                            </div>
                          }
                        </dl>
                        <div
                          role="img"
                          [attr.aria-label]="barLabel(period)"
                          class="flex h-48 items-end gap-3"
                        >
                          @for (
                            value of period.bars;
                            track $index;
                            let index = $index
                          ) {
                            <div
                              data-bar
                              class="flex h-full min-w-0 flex-1 flex-col justify-end gap-2"
                            >
                              <div
                                [class]="
                                  cx(
                                    'rounded-xl',
                                    index === period.bars.length - 1
                                      ? 'bg-(--tpl-blue)'
                                      : 'bg-(--tpl-sky)'
                                  )
                                "
                                [style.height.%]="barHeight(period.bars, value)"
                              ></div>
                              <span
                                class="text-center text-xs text-muted"
                                [textContent]="barLabels[index]"
                              ></span>
                            </div>
                          }
                        </div>
                      </div>
                    </ng-template>
                  }
                </markas-tabs>
              </section>
            }
            @default {
              <section
                aria-labelledby="kirana-projects-title"
                [class]="cx(panel, 'xl:col-span-2')"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="min-w-0">
                    <h2
                      id="kirana-projects-title"
                      class="text-lg font-semibold tracking-tight"
                    >
                      Delivery board
                    </h2>
                    <p
                      class="text-sm text-muted"
                      [textContent]="
                        plural(visibleProjects().length, 'project')
                      "
                    ></p>
                  </div>
                </div>
                <div
                  role="group"
                  aria-label="Filter by status"
                  class="flex flex-wrap gap-2"
                >
                  @for (item of projectFilters; track item) {
                    <button
                      type="button"
                      [attr.aria-pressed]="filter() === item"
                      [class]="cx(chip, filter() === item ? chipOn : chipOff)"
                      (click)="filter.set(item)"
                      [textContent]="item"
                    ></button>
                  }
                </div>
                <ul class="grid gap-3 md:grid-cols-2">
                  @for (item of visibleProjects(); track item.id) {
                    <li
                      [attr.data-project]="item.id"
                      class="grid gap-3 rounded-3xl border border-line bg-surface p-4"
                    >
                      <div class="flex items-start justify-between gap-3">
                        <div class="min-w-0">
                          <h3
                            class="font-semibold"
                            [textContent]="item.name"
                          ></h3>
                          <p
                            class="text-sm text-muted"
                            [textContent]="item.client + ', due ' + item.due"
                          ></p>
                        </div>
                        <span
                          markas-badge
                          [variant]="projectVariant[item.status]!"
                          >{{ item.status }}</span
                        >
                      </div>
                      <div class="grid gap-1.5">
                        <p class="flex justify-between gap-4 text-sm">
                          <span class="font-medium">Progress</span>
                          <span
                            class="text-muted tabular-nums"
                            [textContent]="item.progress + '%'"
                          ></span>
                        </p>
                        <markas-progress
                          [value]="item.progress"
                          [max]="100"
                          [aria-label]="item.name + ' progress'"
                        />
                      </div>
                    </li>
                  }
                </ul>
              </section>
            }
          }
        </main>
      </div>
      <markas-toaster />
    </div>
  `,
})
export default class Kirana {
  protected readonly shell = shell;
  protected readonly glass = glass;
  protected readonly menuTrigger = menuTrigger;
  protected readonly panel = panel;
  protected readonly roundButton = roundButton;
  protected readonly smallButton = smallButton;
  protected readonly pillBase = pillBase;
  protected readonly pillActive = pillActive;
  protected readonly pillIdle = pillIdle;
  protected readonly railBase = railBase;
  protected readonly railActive = railActive;
  protected readonly railIdle = railIdle;
  protected readonly railTip = railTip;
  protected readonly menuItem = menuItem;
  protected readonly menuIdle = menuIdle;
  protected readonly face = face;
  protected readonly statBadges = statBadges;
  protected readonly pill = pill;
  protected readonly tones = tones as Record<string, string>;
  protected readonly dealBase = dealBase;
  protected readonly dealSelected = dealSelected;
  protected readonly selectable = selectable;
  protected readonly dayBase = dayBase;
  protected readonly dayTones = dayTones;
  protected readonly daySelected = daySelected;
  protected readonly segment = segment;
  protected readonly segmentOn = segmentOn;
  protected readonly segmentOff = segmentOff;
  protected readonly chip = chip;
  protected readonly chipOn = chipOn;
  protected readonly chipOff = chipOff;
  protected readonly tile = tile;
  protected readonly tableWrap = tableWrap;
  protected readonly th = th;
  protected readonly td = td;
  protected readonly thButton = thButton;
  protected readonly pages = pages;
  protected readonly topNav = topNav;
  protected readonly rail = rail;
  protected readonly headerStats = headerStats;
  protected readonly historyMenu = historyMenu;
  protected readonly scheduleMenu = scheduleMenu;
  protected readonly funnelMenu = funnelMenu;
  protected readonly profileMenu = profileMenu;
  protected readonly marks = marks;
  protected readonly weekdays = weekdays;
  protected readonly funnelModes = funnelModes;
  protected readonly funnelWidths = funnelWidths;
  protected readonly contactFields = contactFields;
  protected readonly sources = sources;
  protected readonly profileActions = profileActions;
  protected readonly todayTasks = todayTasks;
  protected readonly activity = activity;
  protected readonly books = books;
  protected readonly topics = topics;
  protected readonly invoiceColumns = invoiceColumns;
  protected readonly statusVariant = statusVariant;
  protected readonly cashflow = cashflow;
  protected readonly growthPeriods = growthPeriods;
  protected readonly barLabels = barLabels;
  protected readonly projectFilters = projectFilters;
  protected readonly projectVariant = projectVariant;
  protected readonly TITLE_ID = TITLE_ID;
  protected readonly DEAL_DRAWER = DEAL_DRAWER;
  protected readonly cx = cx;
  protected readonly rupiah = rupiah;
  protected readonly shortDay = shortDay;
  protected readonly initials = initials;
  protected readonly faceTone = faceTone;
  protected readonly cardButton = cardButton;
  protected readonly plural = plural;
  protected readonly isoDate = isoDate;
  protected readonly notify = notify;
  protected readonly growthTabs = growthPeriods.map(({ value, label }) => ({
    value,
    label,
  }));
  protected readonly cashLabel = `Cash flow: ${cashflow.map(([month, value]) => `${month} Rp ${value} million`).join(", ")}`;

  /* Navigasi */
  protected readonly pageId = signal<PageId>(DEFAULT_PAGE);

  /* Contacts */
  protected readonly deals = signal<Deal[]>(dealList);
  private readonly sort = signal("default");
  protected readonly selectedId = signal("");
  protected readonly contact = signal<Contact>(initialContact);
  protected readonly draft = signal<Contact>(initialContact);
  protected readonly deal = computed(
    () =>
      this.deals().find((item) => item.id === this.selectedId()) ??
      this.deals()[0]!,
  );
  protected readonly fullName = computed(
    () => `${this.contact().firstName} ${this.contact().lastName}`,
  );
  protected readonly sortedDeals = computed(() =>
    [...this.deals()].sort(sorters[this.sort()]),
  );
  private readonly editDrawer = viewChild("editDrawer", { read: ElementRef });

  /* Contacts: kalender */
  protected readonly view = signal({ year: 2026, month: 9 });
  protected readonly selected = signal(TODAY);
  protected readonly monthName = computed(() => monthNames[this.view().month]!);
  protected readonly cells = computed(() =>
    monthCells(this.view().year, this.view().month),
  );
  protected readonly agenda = computed(() => {
    const mark = marks[this.selected()];
    return mark ? `: ${mark.task} with ${mark.who}` : ": no tasks scheduled";
  });

  /* Contacts: funnel */
  protected readonly mode = signal<FunnelMode>("weighted");
  protected readonly funnelData = computed(() => funnel[this.mode()]);

  /* Home */
  protected readonly done = signal(DONE_TASKS);

  /* Book Summaries */
  protected readonly topic = signal("All");
  protected readonly read = signal(READ_BOOKS);
  protected readonly visibleBooks = computed(() =>
    books.filter(
      (book) => this.topic() === "All" || book.topic === this.topic(),
    ),
  );

  /* Founders */
  protected readonly query = signal("");
  protected readonly visibleFounders = computed(() => {
    const needle = this.query().trim().toLowerCase();
    return founders.filter((item) =>
      `${item.name} ${item.company} ${item.sector}`
        .toLowerCase()
        .includes(needle),
    );
  });

  /* Finance */
  private readonly invoiceSort = signal<{ key: SortKey; dir: number }>({
    key: "due",
    dir: 1,
  });
  protected readonly rows = computed(() => {
    const { key, dir } = this.invoiceSort();
    return [...invoices].sort(
      (a: Invoice, b: Invoice) =>
        (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0) * dir,
    );
  });
  private readonly cashPeak = Math.max(...cashflow.map(([, value]) => value));

  /* Projects */
  protected readonly filter = signal("All");
  protected readonly visibleProjects = computed(() =>
    projects.filter(
      (item) => this.filter() === "All" || item.status === this.filter(),
    ),
  );

  constructor() {
    const onHashChange = () => {
      this.openPage(readHash());
      document.getElementById(TITLE_ID)?.focus();
    };
    this.openPage(readHash());
    window.addEventListener("hashchange", onHashChange);
    inject(DestroyRef).onDestroy(() =>
      window.removeEventListener("hashchange", onHashChange),
    );
  }

  /** Pindah halaman: state halaman direset, sama seperti React yang me-mount ulang view. */
  private openPage(id: PageId) {
    this.pageId.set(id);
    this.deals.set(dealList);
    this.sort.set("default");
    this.selectedId.set("");
    this.contact.set(initialContact);
    this.draft.set(initialContact);
    this.view.set({ year: 2026, month: 9 });
    this.selected.set(TODAY);
    this.mode.set("weighted");
    this.done.set(DONE_TASKS);
    this.topic.set("All");
    this.read.set(READ_BOOKS);
    this.query.set("");
    this.invoiceSort.set({ key: "due", dir: 1 });
    this.filter.set("All");
  }

  protected go(id: PageId) {
    window.location.assign(`#${id}`);
  }

  protected current(id?: PageId) {
    return this.pageId() === id ? "page" : undefined;
  }

  protected railClick(item: (typeof rail)[number]) {
    if (item.id) this.go(item.id);
    else notify(item.label, "Coming up in your workspace");
  }

  protected expand(label: string) {
    notify(`${label} expanded`, "Opened in full view");
  }

  /* Contacts */
  protected onHistorySelect(value: string) {
    if (value === "export")
      notify("History exported", "6 deals, interaction-history.csv");
    else this.sort.set(value);
  }

  protected openDeal(id: string) {
    this.selectedId.set(id);
    openDialog(DEAL_DRAWER);
  }

  protected onDealClose() {
    const dialog = document.getElementById(DEAL_DRAWER);
    if (!(dialog instanceof HTMLDialogElement) || dialog.returnValue !== "won")
      return;
    const deal = this.deal();
    this.deals.set(
      this.deals().map((item) =>
        item.id === deal.id ? { ...item, stage: "Won" } : item,
      ),
    );
    toast({
      title: "Deal marked as won",
      description: deal.title,
      variant: "success",
    });
  }

  protected setDraft(key: keyof Contact, value: string) {
    this.draft.set({ ...this.draft(), [key]: value });
  }

  /** Drawer hanya memancarkan closed; returnValue dibaca dari dialog di dalamnya. */
  protected onEditClose() {
    const dialog = this.editDrawer()?.nativeElement.querySelector("dialog");
    if (!dialog || dialog.returnValue !== "save") return;
    const draft = this.draft();
    this.contact.set(draft);
    toast({
      title: "Contact details saved",
      description: `${draft.firstName} ${draft.lastName}`,
      variant: "success",
    });
  }

  protected shift(step: number) {
    const next = new Date(this.view().year, this.view().month + step, 1);
    this.view.set({ year: next.getFullYear(), month: next.getMonth() });
  }

  protected onScheduleSelect(value: string) {
    if (value === "add") {
      notify("Task added", `${shortDay(this.selected())}, 09:00`);
      return;
    }
    this.view.set({ year: 2026, month: 9 });
    this.selected.set(TODAY);
  }

  protected onFunnelSelect(value: string) {
    if (value === "export") notify("Funnel exported", "stage-funnel.csv");
    else this.mode.set(value as FunnelMode);
  }

  /* Home, Book Summaries */
  protected toggleDone(id: string) {
    this.done.set(toggleIn(this.done(), id));
  }

  protected toggleRead(id: string) {
    this.read.set(toggleIn(this.read(), id));
  }

  /* Finance */
  protected sortBy(key: SortKey) {
    const sort = this.invoiceSort();
    this.invoiceSort.set({ key, dir: sort.key === key ? -sort.dir : 1 });
  }

  protected ariaSort(key: SortKey) {
    const sort = this.invoiceSort();
    if (sort.key !== key) return undefined;
    return sort.dir === 1 ? "ascending" : "descending";
  }

  protected cashHeight(value: number) {
    return Math.round((value / this.cashPeak) * 80);
  }

  /* Growth */
  protected barLabel(period: (typeof growthPeriods)[number]) {
    return `New leads, ${period.label}: ${period.bars.map((value, index) => `${barLabels[index]} ${value}`).join(", ")}`;
  }

  protected barHeight(bars: number[], value: number) {
    return Math.round((value / Math.max(...bars)) * 100);
  }
}
