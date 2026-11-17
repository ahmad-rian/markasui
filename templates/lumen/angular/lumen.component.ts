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
import { Card } from "../../../components/card/card.component";
import { Checkbox } from "../../../components/checkbox/checkbox.component";
import { Drawer } from "../../../components/drawer/drawer.component";
import { DropdownMenu } from "../../../components/dropdown-menu/dropdown-menu.component";
import { Input } from "../../../components/input/input.component";
import { Modal } from "../../../components/modal/modal.component";
import { Progress } from "../../../components/progress/progress.component";
import { Select } from "../../../components/select/select.component";
import { Switch } from "../../../components/switch/switch.component";
import { TabPanel, Tabs } from "../../../components/tabs/tabs.component";
import { Toaster, toast } from "../../../components/toast/toast.component";
import {
  ToggleGroup,
  ToggleGroupItemTemplate,
} from "../../../components/toggle-group/toggle-group.component";

// prettier-ignore
const icons = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2",
  chart: "M3 3v18h18M8 17v-5M13 17V8M18 17v-3",
  folder: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z",
  sliders: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M22 6l-10 7L2 6",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92",
  chat: "M7.9 20A9 9 0 1 0 4 16.1L2 22z",
  clock: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20",
  prev: "m15 18-6-6 6-6",
  next: "m9 18 6-6-6-6",
  up: "m18 15-6-6-6 6",
  sort: "m7 15 5 5 5-5M7 9l5-5 5 5",
  pencil: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z",
  menu: "M4 6h16M4 12h16M4 18h16",
  plus: "M12 5v14M5 12h14",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  search: "m21 21-4.3-4.3M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  send: "m22 2-7 20-4-9-9-4zM22 2 11 13",
};
type IconName = keyof typeof icons;
type Variant = "neutral" | "primary" | "success" | "warning" | "danger";

// prettier-ignore
const pages = {
  home: { label: "Home", title: "Good morning, Andi" },
  customers: { label: "Customers", title: "Customer information" },
  deals: { label: "Deals", title: "Deals pipeline" },
  finance: { label: "Finance", title: "Finance overview" },
  growth: { label: "Growth", title: "Growth and acquisition" },
  projects: { label: "Projects", title: "Projects" },
  calendar: { label: "Calendar", title: "Calendar" },
  reports: { label: "Reports", title: "Sales reports" },
  files: { label: "Files", title: "Files" },
  settings: { label: "Settings", title: "Settings" },
};
type PageId = keyof typeof pages;
const DEFAULT_PAGE: PageId = "customers";
const TITLE_ID = "crm-page-title";
const topNav: PageId[] = [
  "deals",
  "customers",
  "finance",
  "growth",
  "projects",
];
// prettier-ignore
const railNav: { id: PageId; icon: IconName }[] = [
  { id: "home", icon: "home" }, { id: "customers", icon: "users" }, { id: "calendar", icon: "calendar" },
  { id: "reports", icon: "chart" }, { id: "files", icon: "folder" }, { id: "settings", icon: "sliders" },
];

/* Home */
const TARGET = { value: 482500000, goal: 650000000 };
// prettier-ignore
const goals = [
  { label: "New customers", value: 38, max: 50 },
  { label: "Meetings held", value: 21, max: 30 },
  { label: "Deals closed", value: 9, max: 12 },
];
// prettier-ignore
const activity = [
  { who: "Rina Kusuma", what: "accepted the revised proposal", when: "12 min ago" },
  { who: "Budi Santoso", what: "logged a call with PT Sinar Abadi", when: "48 min ago" },
  { who: "Dewi Lestari", what: "sent invoice INV-2041", when: "2 hours ago" },
  { who: "Agus Pratama", what: "moved Fleet tracking pilot to Negotiation", when: "3 hours ago" },
  { who: "Sari Wulandari", what: "added 4 leads from Expo Jakarta", when: "Yesterday" },
];
// prettier-ignore
const todayTasks = [
  { id: "t1", time: "09:00", title: "Call Hendra about the renewal" },
  { id: "t2", time: "10:00", title: "Send revised proposal to Rina" },
  { id: "t3", time: "13:30", title: "Prepare the QBR deck" },
  { id: "t4", time: "14:30", title: "Pricing review with finance" },
  { id: "t5", time: "16:00", title: "Follow up Expo Jakarta leads" },
];
const DONE_TASKS = ["t1", "t2"];

/* Customers */
type Stat = {
  label: string;
  value: string;
  badge?: string;
  variant?: Variant;
  note?: string;
};
// prettier-ignore
const stats: Stat[] = [
  { label: "Deals value this month", value: "Rp 482.500.000", badge: "+12.4%", variant: "success" },
  { label: "New customers this week", value: "38", badge: "+6", variant: "success" },
  { label: "New tasks", value: "14", badge: "5 due today", variant: "warning" },
];
// prettier-ignore
const customerList = [
  { id: "c1", firstName: "Rina", lastName: "Kusuma", role: "Head of Procurement", company: "PT Nusantara Logistik", email: "rina.kusuma@nusalog.co.id", phone: "+62 812 3456 7890", source: "Referral", lastContacted: "Nov 3, 2026", tier: "Key account" },
  { id: "c2", firstName: "Hendra", lastName: "Gunawan", role: "IT Director", company: "PT Sinar Abadi", email: "hendra@sinarabadi.co.id", phone: "+62 811 2233 4455", source: "Website", lastContacted: "Oct 30, 2026", tier: "Active" },
  { id: "c3", firstName: "Maya", lastName: "Putri", role: "Operations Manager", company: "CV Maju Bersama", email: "maya.putri@majubersama.id", phone: "+62 813 9876 5432", source: "Event", lastContacted: "Oct 28, 2026", tier: "Active" },
  { id: "c4", firstName: "Yusuf", lastName: "Hidayat", role: "Finance Lead", company: "Toko Sentosa Group", email: "yusuf@sentosagroup.id", phone: "+62 857 1122 3344", source: "Cold outreach", lastContacted: "Oct 21, 2026", tier: "Lead" },
  { id: "c5", firstName: "Lestari", lastName: "Wibowo", role: "Chief Executive", company: "PT Lintas Jawa", email: "lestari@lintasjawa.co.id", phone: "+62 821 5566 7788", source: "Partner", lastContacted: "Oct 15, 2026", tier: "Key account" },
  { id: "c6", firstName: "Rudi", lastName: "Hartono", role: "Procurement Officer", company: "PT Bumi Persada", email: "rudi.h@bumipersada.com", phone: "+62 878 3344 5566", source: "Referral", lastContacted: "Oct 9, 2026", tier: "Lead" },
];
type Customer = (typeof customerList)[number];
const tierVariant: Record<string, Variant> = {
  "Key account": "success",
  Active: "primary",
  Lead: "neutral",
};
// prettier-ignore
const infoRows: { key: keyof Customer; label: string }[] = [
  { key: "firstName", label: "First name" }, { key: "lastName", label: "Last name" }, { key: "email", label: "Email" },
  { key: "phone", label: "Phone" }, { key: "source", label: "Source" }, { key: "lastContacted", label: "Last contacted" },
];
// prettier-ignore
const formFields: { key: keyof Customer; label: string; type: string }[] = [
  { key: "firstName", label: "First name", type: "text" }, { key: "lastName", label: "Last name", type: "text" },
  { key: "email", label: "Email", type: "email" }, { key: "phone", label: "Phone", type: "tel" },
  { key: "source", label: "Source", type: "text" },
];
// prettier-ignore
const history = [
  { id: "d1", date: "2026-10-28", title: "Cloud migration package", value: 185000000, stage: "Negotiation", team: ["Budi Santoso", "Sari Wulandari", "Agus Pratama"] },
  { id: "d2", date: "2026-10-21", title: "Annual support renewal", value: 96400000, stage: "Won", team: ["Dewi Lestari", "Budi Santoso"] },
  { id: "d3", date: "2026-10-14", title: "Data warehouse audit", value: 42750000, stage: "Proposal", team: ["Agus Pratama", "Fajar Nugroho"] },
  { id: "d4", date: "2026-10-02", title: "POS terminal rollout", value: 128900000, stage: "Won", team: ["Fajar Nugroho", "Dewi Lestari"] },
];
type HistoryDeal = (typeof history)[number];
// prettier-ignore
const sortOptions = [
  { label: "Newest first", value: "newest" }, { label: "Oldest first", value: "oldest" },
  { label: "Highest value", value: "high" }, { label: "Lowest value", value: "low" },
];
const sorters: Record<string, (a: HistoryDeal, b: HistoryDeal) => number> = {
  newest: (a, b) => b.date.localeCompare(a.date),
  oldest: (a, b) => a.date.localeCompare(b.date),
  high: (a, b) => b.value - a.value,
  low: (a, b) => a.value - b.value,
};
// prettier-ignore
const profileActions: { label: string; icon: IconName }[] = [
  { label: "Send email", icon: "mail" }, { label: "Call customer", icon: "phone" },
  { label: "Start chat", icon: "chat" }, { label: "Schedule meeting", icon: "clock" },
];
// prettier-ignore
const funnel = [
  { value: "weighted", label: "Weighted", total: "Rp 592.900.000", caption: "Weighted pipeline value", steps: [
    { label: "Qualification", value: "Rp 312.400.000", deals: 12, width: 100 },
    { label: "Proposal sent", value: "Rp 186.000.000", deals: 7, width: 60 },
    { label: "Negotiation", value: "Rp 94.500.000", deals: 4, width: 30 },
  ] },
  { value: "total", label: "Total", total: "Rp 1.069.800.000", caption: "Total pipeline value", steps: [
    { label: "Qualification", value: "Rp 624.800.000", deals: 12, width: 100 },
    { label: "Proposal sent", value: "Rp 310.000.000", deals: 7, width: 50 },
    { label: "Negotiation", value: "Rp 135.000.000", deals: 4, width: 22 },
  ] },
];
const barTones = ["bg-primary", "bg-primary/70", "bg-primary/40"];

/* Deals */
const stages = ["Qualified", "Proposal", "Negotiation", "Won"];
const stageItems = stages.map((stage) => ({ label: stage, value: stage }));
// prettier-ignore
const pipeline = [
  { id: "k1", title: "Cloud migration package", company: "PT Nusantara Logistik", value: 185000000, owner: "Budi Santoso", stage: "Negotiation", due: "Nov 20" },
  { id: "k2", title: "POS terminal rollout", company: "Toko Sentosa Group", value: 128900000, owner: "Fajar Nugroho", stage: "Qualified", due: "Dec 2" },
  { id: "k3", title: "Data warehouse audit", company: "CV Maju Bersama", value: 42750000, owner: "Agus Pratama", stage: "Proposal", due: "Nov 14" },
  { id: "k4", title: "Fleet tracking pilot", company: "PT Lintas Jawa", value: 64200000, owner: "Sari Wulandari", stage: "Negotiation", due: "Nov 28" },
  { id: "k5", title: "HR system integration", company: "PT Bumi Persada", value: 73500000, owner: "Budi Santoso", stage: "Qualified", due: "Dec 9" },
  { id: "k6", title: "Warehouse sensor network", company: "PT Samudra Pangan", value: 51800000, owner: "Agus Pratama", stage: "Proposal", due: "Nov 30" },
  { id: "k7", title: "Annual support renewal", company: "PT Sinar Abadi", value: 96400000, owner: "Dewi Lestari", stage: "Won", due: "Oct 21" },
  { id: "k8", title: "Security awareness training", company: "Bank Daerah Lestari", value: 18500000, owner: "Dewi Lestari", stage: "Won", due: "Oct 30" },
];

/* Finance */
// prettier-ignore
const financeStats: Stat[] = [
  { label: "Revenue this month", value: "Rp 482.500.000", note: "+12.4% vs October" },
  { label: "Outstanding", value: "Rp 397.150.000", note: "5 open invoices" },
  { label: "Overdue", value: "Rp 61.250.000", note: "2 invoices" },
  { label: "Average days to pay", value: "18 days", note: "3 days faster" },
];
// prettier-ignore
const invoices = [
  { id: "INV-2032", customer: "PT Lintas Jawa", due: "2026-10-24", amount: 42750000, status: "Overdue" },
  { id: "INV-2035", customer: "PT Bumi Persada", due: "2026-10-31", amount: 18500000, status: "Overdue" },
  { id: "INV-2036", customer: "PT Sinar Abadi", due: "2026-11-02", amount: 96400000, status: "Paid" },
  { id: "INV-2038", customer: "CV Maju Bersama", due: "2026-11-12", amount: 64200000, status: "Pending" },
  { id: "INV-2039", customer: "Toko Sentosa Group", due: "2026-11-18", amount: 86300000, status: "Pending" },
  { id: "INV-2040", customer: "PT Samudra Pangan", due: "2026-11-21", amount: 51800000, status: "Paid" },
  { id: "INV-2041", customer: "PT Nusantara Logistik", due: "2026-11-27", amount: 185000000, status: "Pending" },
];
type Invoice = (typeof invoices)[number];
type InvoiceKey = "customer" | "due" | "amount";
// prettier-ignore
const invoiceColumns: { key: InvoiceKey; label: string; align: string }[] = [
  { key: "customer", label: "Customer", align: "text-left" },
  { key: "due", label: "Due date", align: "text-left" },
  { key: "amount", label: "Amount", align: "text-right" },
];
const statusVariant: Record<string, Variant> = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
};
// prettier-ignore
const revenue = [
  { label: "Jun", value: 312 }, { label: "Jul", value: 356 }, { label: "Aug", value: 341 },
  { label: "Sep", value: 398 }, { label: "Oct", value: 429 }, { label: "Nov", value: 482 },
];

/* Growth */
// prettier-ignore
const growthPeriods = [
  { value: "7d", label: "7 days", funnel: [18420, 4860, 2140, 960, 312], sources: [34, 27, 18, 13, 8], metrics: [
    { label: "Visitors", value: "18.420", badge: "+8.2%" }, { label: "New leads", value: "312", badge: "+5.1%" },
    { label: "Lead conversion", value: "3.4%", badge: "+0.3 pt" }, { label: "Cost per lead", value: "Rp 84.000", badge: "-4.0%" },
  ] },
  { value: "30d", label: "30 days", funnel: [76900, 19800, 8650, 3720, 1284], sources: [31, 29, 21, 11, 8], metrics: [
    { label: "Visitors", value: "76.900", badge: "+11.6%" }, { label: "New leads", value: "1.284", badge: "+9.4%" },
    { label: "Lead conversion", value: "3.1%", badge: "+0.2 pt" }, { label: "Cost per lead", value: "Rp 91.500", badge: "-2.2%" },
  ] },
  { value: "90d", label: "90 days", funnel: [214300, 52400, 23900, 10100, 3702], sources: [29, 30, 22, 12, 7], metrics: [
    { label: "Visitors", value: "214.300", badge: "+18.9%" }, { label: "New leads", value: "3.702", badge: "+14.3%" },
    { label: "Lead conversion", value: "2.9%", badge: "+0.4 pt" }, { label: "Cost per lead", value: "Rp 96.200", badge: "-1.5%" },
  ] },
];
const funnelSteps = ["Visitors", "Sign-ups", "Leads", "Qualified", "Customers"];
const leadSources = [
  "Referral",
  "Organic search",
  "Paid ads",
  "Events",
  "Partners",
];
const sourceTones = [
  "bg-primary",
  "bg-primary/75",
  "bg-primary/55",
  "bg-primary/35",
  "bg-primary/20",
];

/* Projects */
// prettier-ignore
const projects = [
  { id: "p1", name: "Cloud migration", client: "PT Nusantara Logistik", status: "active", progress: 68, due: "Dec 12, 2026", lead: "Budi Santoso", budget: 185000000, tasks: "17 of 25 tasks" },
  { id: "p2", name: "POS terminal rollout", client: "Toko Sentosa Group", status: "risk", progress: 42, due: "Nov 20, 2026", lead: "Fajar Nugroho", budget: 128900000, tasks: "11 of 26 tasks" },
  { id: "p3", name: "Data warehouse audit", client: "CV Maju Bersama", status: "active", progress: 55, due: "Dec 4, 2026", lead: "Agus Pratama", budget: 42750000, tasks: "12 of 22 tasks" },
  { id: "p4", name: "Fleet tracking pilot", client: "PT Lintas Jawa", status: "done", progress: 100, due: "Oct 30, 2026", lead: "Sari Wulandari", budget: 64200000, tasks: "18 of 18 tasks" },
  { id: "p5", name: "HR system integration", client: "PT Bumi Persada", status: "risk", progress: 23, due: "Nov 28, 2026", lead: "Dewi Lestari", budget: 73500000, tasks: "6 of 26 tasks" },
  { id: "p6", name: "Annual support renewal", client: "PT Sinar Abadi", status: "done", progress: 100, due: "Oct 21, 2026", lead: "Dewi Lestari", budget: 96400000, tasks: "9 of 9 tasks" },
];
// prettier-ignore
const projectStatus: Record<string, { label: string; variant: Variant }> = {
  active: { label: "Active", variant: "primary" }, risk: { label: "At risk", variant: "warning" }, done: { label: "Completed", variant: "success" },
};
// prettier-ignore
const projectStats: Stat[] = [
  { label: "Active projects", value: "2", badge: "On track", variant: "primary" },
  { label: "At risk", value: "2", badge: "Needs attention", variant: "warning" },
  { label: "Completed this quarter", value: "2", badge: "+1 vs Q3", variant: "success" },
];
// prettier-ignore
const projectFilters = [
  { value: "all", label: "All" }, { value: "active", label: "Active" },
  { value: "risk", label: "At risk" }, { value: "done", label: "Completed" },
];

/* Calendar */
type CalEvent = { time: string; title: string; kind: string };
// prettier-ignore
const initialEvents: Record<string, CalEvent[]> = {
  "2026-10-28": [{ time: "10:00", title: "Kickoff meeting", kind: "Meeting" }],
  "2026-11-03": [{ time: "09:30", title: "Discovery call recap", kind: "Call" }],
  "2026-11-05": [{ time: "10:00", title: "Send revised proposal", kind: "Email" }, { time: "14:30", title: "Pricing review with finance", kind: "Meeting" }],
  "2026-11-09": [{ time: "11:00", title: "Contract draft review", kind: "Meeting" }],
  "2026-11-12": [{ time: "15:00", title: "Quarterly business review", kind: "Meeting" }],
  "2026-11-16": [{ time: "10:30", title: "Expo Jakarta debrief", kind: "Meeting" }],
  "2026-11-18": [{ time: "09:00", title: "Onsite demo in Surabaya", kind: "Visit" }],
  "2026-11-20": [{ time: "13:00", title: "POS rollout checkpoint", kind: "Call" }],
  "2026-11-26": [{ time: "13:00", title: "Renewal sign-off", kind: "Call" }],
  "2026-12-02": [{ time: "10:00", title: "Implementation planning", kind: "Meeting" }],
};
const eventKinds = ["Meeting", "Call", "Email", "Visit"];
// prettier-ignore
const kindTones: Record<string, string> = {
  Meeting: "bg-primary-soft text-primary", Call: "bg-success/15 text-ink", Email: "bg-subtle text-ink", Visit: "bg-warning/20 text-ink",
};
const TODAY = "2026-11-05";
// prettier-ignore
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// prettier-ignore
const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/* Reports */
// prettier-ignore
const reportPeriods = [
  { value: "month", label: "This month", reps: [168, 132, 104, 78], kpis: [
    { label: "Revenue", value: "Rp 482.500.000", badge: "+12.4%" }, { label: "Deals won", value: "9", badge: "+2" },
    { label: "Average deal size", value: "Rp 53.600.000", badge: "+4.1%" },
  ], bars: [{ label: "Week 1", value: 96 }, { label: "Week 2", value: 128 }, { label: "Week 3", value: 142 }, { label: "Week 4", value: 117 }] },
  { value: "quarter", label: "This quarter", reps: [452, 371, 288, 198], kpis: [
    { label: "Revenue", value: "Rp 1.309.000.000", badge: "+9.8%" }, { label: "Deals won", value: "26", badge: "+5" },
    { label: "Average deal size", value: "Rp 50.300.000", badge: "+1.9%" },
  ], bars: [{ label: "Sep", value: 398 }, { label: "Oct", value: 429 }, { label: "Nov", value: 482 }] },
  { value: "year", label: "This year", reps: [1380, 1105, 862, 621], kpis: [
    { label: "Revenue", value: "Rp 3.968.000.000", badge: "+21.3%" }, { label: "Deals won", value: "84", badge: "+17" },
    { label: "Average deal size", value: "Rp 47.200.000", badge: "+3.6%" },
  ], bars: [
    { label: "Jan", value: 248 }, { label: "Feb", value: 263 }, { label: "Mar", value: 301 }, { label: "Apr", value: 287 },
    { label: "May", value: 334 }, { label: "Jun", value: 312 }, { label: "Jul", value: 356 }, { label: "Aug", value: 341 },
    { label: "Sep", value: 398 }, { label: "Oct", value: 429 }, { label: "Nov", value: 482 },
  ] },
];
const reps = ["Budi Santoso", "Dewi Lestari", "Agus Pratama", "Fajar Nugroho"];

/* Files */
// prettier-ignore
const files = [
  { name: "Cloud migration proposal.pdf", kind: "PDF", size: "2.4 MB", updated: "Nov 4", owner: "Budi Santoso" },
  { name: "Q4 pipeline forecast.xlsx", kind: "XLSX", size: "860 KB", updated: "Nov 3", owner: "Dewi Lestari" },
  { name: "Master service agreement.docx", kind: "DOCX", size: "1.1 MB", updated: "Nov 1", owner: "Agus Pratama" },
  { name: "Expo Jakarta leads.csv", kind: "CSV", size: "148 KB", updated: "Oct 30", owner: "Sari Wulandari" },
  { name: "Brand guidelines.pdf", kind: "PDF", size: "6.8 MB", updated: "Oct 27", owner: "Andi Wijaya" },
  { name: "Onsite demo photos.zip", kind: "ZIP", size: "24.5 MB", updated: "Oct 24", owner: "Fajar Nugroho" },
  { name: "Pricing sheet 2027.xlsx", kind: "XLSX", size: "312 KB", updated: "Oct 22", owner: "Dewi Lestari" },
  { name: "QBR presentation.pptx", kind: "PPTX", size: "9.2 MB", updated: "Oct 20", owner: "Budi Santoso" },
];
// prettier-ignore
const kindColors: Record<string, string> = {
  PDF: "bg-danger/15", XLSX: "bg-success/15", CSV: "bg-success/15", DOCX: "bg-primary-soft", PPTX: "bg-warning/20", ZIP: "bg-subtle",
};
// prettier-ignore
const viewOptions: { value: "grid" | "list"; ariaLabel: string }[] = [
  { value: "grid", ariaLabel: "Grid view" }, { value: "list", ariaLabel: "List view" },
];

/* Settings */
// prettier-ignore
const initialProfile = { firstName: "Andi", lastName: "Wijaya", email: "andi.wijaya@lumen.co.id", phone: "+62 812 7788 9900", role: "Sales manager" };
type Profile = typeof initialProfile;
// prettier-ignore
const profileFields: { key: keyof Profile; label: string; type: string }[] = [
  { key: "firstName", label: "First name", type: "text" }, { key: "lastName", label: "Last name", type: "text" },
  { key: "email", label: "Email", type: "email" }, { key: "phone", label: "Phone", type: "tel" },
];
const roles = ["Account executive", "Sales manager", "Head of sales"];
// prettier-ignore
const notificationOptions = [
  { key: "deals", label: "Deal stage changes", description: "When a deal moves to another stage" },
  { key: "invoices", label: "Invoice reminders", description: "Overdue and upcoming invoices" },
  { key: "mentions", label: "Mentions", description: "When a teammate mentions you" },
  { key: "weekly", label: "Weekly report", description: "Summary every Monday at 08:00" },
];
const DEFAULT_PREFS = ["deals", "invoices", "mentions"];

const iconButton =
  "relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const pillBase =
  "inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const navActive = "bg-primary text-on-primary";
const pillIdle = "text-muted hover:bg-surface hover:text-ink";
const railBase =
  "inline-flex size-10 items-center justify-center rounded-xl transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const railIdle = "text-muted hover:bg-subtle hover:text-ink";
// Label rail muncul saat hover atau fokus keyboard, cukup dengan CSS.
const railTip =
  "pointer-events-none absolute top-1/2 left-full z-30 ml-3 -translate-y-1/2 rounded-md bg-ink px-2 py-1 text-xs font-medium whitespace-nowrap text-canvas opacity-0 shadow-overlay transition-opacity duration-150 group-hover:opacity-100 group-has-focus-visible:opacity-100";
const menuItemBase =
  "flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const menuItemIdle = "text-ink hover:bg-subtle";
const tile = "rounded-xl border border-line bg-surface px-4 py-3";
const selectable =
  "text-left after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary";
const listRow =
  "relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150";
const dealBase =
  "relative flex min-h-44 flex-col gap-3 rounded-2xl border p-4 transition-colors duration-150";
const dealIdle = "border-line bg-surface hover:border-primary-line";
const dealSelected =
  "border-primary bg-primary text-on-primary [&_[role=img]]:ring-primary";
const kanbanCard =
  "relative grid gap-3 rounded-xl border bg-surface p-3 transition-colors duration-150";
const projectRow =
  "grid w-full gap-3 rounded-xl px-3 py-4 text-left transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:grid-cols-[minmax(0,1fr)_120px_minmax(0,260px)_140px] md:items-center";
const dayCell =
  "flex min-h-14 flex-col items-start gap-1 p-1.5 text-left transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary sm:min-h-24 sm:p-2";
const dayNumber =
  "inline-flex size-6 items-center justify-center rounded-full text-xs font-medium tabular-nums";
const chip = "truncate rounded-md px-1.5 py-0.5 text-xs font-medium";
const tableWrap =
  "relative overflow-x-auto rounded-xl contain-inline-size border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const th = "px-4 py-3 font-medium whitespace-nowrap";
const td = "px-4 py-2 whitespace-nowrap";
const thButton =
  "inline-flex items-center gap-1 rounded-md font-medium hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const fileKind =
  "inline-flex h-10 w-12 shrink-0 items-center justify-center rounded-lg text-xs font-semibold";
// prettier-ignore
const fileViews = {
  grid: { list: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4", item: "grid gap-3 rounded-xl border border-line bg-surface p-4" },
  list: { list: "grid gap-2", item: "flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3" },
};

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const rupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
const formatNumber = (value: number) => value.toLocaleString("id-ID");
const percentOf = (value: number, max: number) =>
  Math.round((value / max) * 100);
const pad = (value: number) => String(value).padStart(2, "0");
const isoDate = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;
const toggleIn = (list: string[], id: string) =>
  list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;

function shortDate(iso: string) {
  const [year = 0, month = 1, day = 1] = iso.split("-").map(Number);
  return `${monthNames[month - 1]?.slice(0, 3)} ${day}, ${year}`;
}

function longDate(iso: string) {
  const [year = 0, month = 1, day = 1] = iso.split("-").map(Number);
  const weekday = weekdayNames[new Date(year, month - 1, day).getDay()];
  return `${weekday}, ${monthNames[month - 1]} ${day}`;
}

/** Sel kalender bulan, minggu dimulai Senin. null untuk sel kosong di awal dan akhir bulan. */
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

type Row = [string, string];
type Bar = { label: string; value: number };
type CustomerKey = keyof Customer;
type ProfileKey = keyof Profile;

const funnelTabs = funnel.map(({ value, label }) => ({ value, label }));
const growthTabs = growthPeriods.map(({ value, label }) => ({ value, label }));
const viewItems = viewOptions.map((item) => ({ ...item, label: "" }));
const stageMenuClass = "[&>button]:w-full";

/** Ikon garis: `<svg [lumenIcon]="'pencil'" class="size-4"></svg>`. */
@Component({
  selector: "svg[lumenIcon]",
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
  template: `<svg:path [attr.d]="icons[lumenIcon()]" />`,
})
class LumenIcon {
  readonly lumenIcon = input.required<IconName>();
  protected readonly icons = icons;
}

/** Kartu berjudul dengan aksi opsional (elemen ber-atribut `action`). */
@Component({
  selector: "lumen-panel",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card],
  host: { class: "contents" },
  template: `
    <article
      markas-card
      [attr.aria-labelledby]="labelId()"
      [class]="cardClass()"
    >
      <div class="grid gap-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 [id]="labelId()" class="text-base font-semibold">
              {{ heading() }}
            </h2>
            <p class="text-sm text-muted">{{ sub() }}</p>
          </div>
          <ng-content select="[action]" />
        </div>
        <ng-content />
      </div>
    </article>
  `,
})
class Panel {
  readonly labelId = input.required<string>();
  readonly heading = input.required<string>();
  readonly sub = input.required<string>();
  readonly cardClass = input("");
}

@Component({
  selector: "lumen-stats",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Badge],
  host: { class: "contents" },
  template: `
    <dl [class]="cx('grid gap-3', gridClass())">
      @for (stat of items(); track stat.label) {
        <div [class]="tile">
          <dt class="text-xs text-muted">{{ stat.label }}</dt>
          <dd class="mt-1 flex flex-wrap items-center gap-2">
            <span class="text-lg font-semibold tracking-tight tabular-nums">{{
              stat.value
            }}</span>
            @if (stat.badge) {
              <span markas-badge [variant]="stat.variant ?? 'success'">{{
                stat.badge
              }}</span>
            }
          </dd>
          @if (stat.note) {
            <dd class="text-xs text-muted">{{ stat.note }}</dd>
          }
        </div>
      }
    </dl>
  `,
})
class StatTiles {
  readonly items = input.required<Stat[]>();
  readonly gridClass = input.required<string>();
  protected readonly tile = tile;
  protected readonly cx = cx;
}

@Component({
  selector: "lumen-details",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  template: `
    <dl class="divide-y divide-line">
      @for (row of rows(); track row[0]) {
        <div class="flex items-center justify-between gap-4 py-3">
          <dt class="shrink-0 text-muted">{{ row[0] }}</dt>
          <dd class="min-w-0 truncate text-right font-medium">{{ row[1] }}</dd>
        </div>
      }
    </dl>
  `,
})
class Details {
  readonly rows = input.required<Row[]>();
}

@Component({
  selector: "lumen-bars",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  template: `
    <div
      role="img"
      [attr.aria-label]="ariaLabel()"
      class="flex h-56 items-stretch gap-2 sm:gap-3"
    >
      @for (bar of bars(); track bar.label; let last = $last) {
        <div data-bar class="flex min-w-0 flex-1 flex-col gap-2">
          <div class="relative flex-1">
            <span
              class="absolute inset-x-0 hidden text-center text-xs font-medium tabular-nums sm:block"
              [style.bottom]="'calc(' + height(bar.value) + '% + 4px)'"
              >{{ bar.value }}</span
            >
            <div
              [class]="
                cx(
                  'absolute inset-x-0 bottom-0 rounded-md',
                  last ? 'bg-primary' : 'bg-primary/30'
                )
              "
              [style.height.%]="height(bar.value)"
            ></div>
          </div>
          <span class="truncate text-center text-xs text-muted">{{
            bar.label
          }}</span>
        </div>
      }
    </div>
  `,
})
class BarChart {
  readonly bars = input.required<Bar[]>();
  readonly label = input.required<string>();
  protected readonly cx = cx;
  private readonly peak = computed(() =>
    Math.max(...this.bars().map((bar) => bar.value)),
  );
  protected readonly ariaLabel = computed(
    () =>
      `${this.label()}: ${this.bars()
        .map((bar) => `${bar.label} Rp ${bar.value} million`)
        .join(", ")}`,
  );

  protected height(value: number) {
    return percentOf(value, this.peak());
  }
}

@Component({
  selector: "template-lumen",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  imports: [
    Avatar,
    Badge,
    Button,
    Card,
    Checkbox,
    Drawer,
    DropdownMenu,
    Input,
    Modal,
    Progress,
    Select,
    Switch,
    TabPanel,
    Tabs,
    Toaster,
    ToggleGroup,
    ToggleGroupItemTemplate,
    LumenIcon,
    Panel,
    StatTiles,
    Details,
    BarChart,
  ],
  template: `
    <div class="min-h-dvh bg-canvas text-ink">
      <header
        class="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 lg:px-6"
      >
        <markas-drawer title="Menu" side="left">
          <button
            trigger
            type="button"
            aria-label="Open menu"
            [class]="cx(iconButton, 'lg:hidden')"
          >
            <svg [lumenIcon]="'menu'" class="size-5"></svg>
          </button>
          <form method="dialog" class="grid gap-6">
            <div class="grid gap-1">
              <p class="px-3 text-xs font-medium text-muted">Pages</p>
              @for (id of topNav; track id) {
                <button
                  type="submit"
                  [attr.aria-current]="current(id)"
                  [class]="
                    cx(menuItemBase, page() === id ? navActive : menuItemIdle)
                  "
                  (click)="go(id)"
                >
                  {{ pages[id].label }}
                </button>
              }
            </div>
            <div class="grid gap-1">
              <p class="px-3 text-xs font-medium text-muted">Workspace</p>
              @for (item of railNav; track item.id) {
                <button
                  type="submit"
                  [attr.aria-current]="current(item.id)"
                  [class]="
                    cx(
                      menuItemBase,
                      page() === item.id ? navActive : menuItemIdle
                    )
                  "
                  (click)="go(item.id)"
                >
                  <svg [lumenIcon]="item.icon" class="size-5"></svg>
                  {{ pages[item.id].label }}
                </button>
              }
            </div>
          </form>
        </markas-drawer>
        <div class="flex min-w-0 items-center gap-3">
          <span
            class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-on-primary"
            aria-hidden="true"
            >L</span
          >
          <div class="min-w-0 leading-tight">
            <p
              class="flex items-center gap-1.5 text-base font-semibold tracking-tight"
            >
              Lumen
              <span
                class="size-1.5 rounded-full bg-success"
                aria-hidden="true"
              ></span>
            </p>
            <p class="truncate text-xs text-muted max-[390px]:hidden">
              Sales workspace
            </p>
          </div>
        </div>
        <nav
          aria-label="Main"
          class="mx-auto hidden items-center gap-1 rounded-full border border-line bg-canvas p-1 lg:flex"
        >
          @for (id of topNav; track id) {
            <button
              type="button"
              [attr.aria-current]="current(id)"
              [class]="cx(pillBase, page() === id ? navActive : pillIdle)"
              (click)="go(id)"
            >
              {{ pages[id].label }}
            </button>
          }
        </nav>
        <div class="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            type="button"
            aria-label="Messages"
            [class]="iconButton"
            (click)="notify('No new messages', 'Inbox is up to date')"
          >
            <svg [lumenIcon]="'message'" class="size-5"></svg>
          </button>
          <button
            type="button"
            aria-label="Notifications, 3 unread"
            [class]="iconButton"
            (click)="
              notify(
                '3 unread notifications',
                'Rina Kusuma replied to your proposal'
              )
            "
          >
            <svg [lumenIcon]="'bell'" class="size-5"></svg>
            <span
              class="absolute top-2 right-2.5 size-2 rounded-full bg-danger ring-2 ring-surface"
              aria-hidden="true"
            ></span>
          </button>
          <markas-avatar name="Andi Wijaya" size="md" class="ml-1" />
        </div>
      </header>

      <div class="flex">
        <div
          class="hidden w-18 shrink-0 border-r border-line bg-surface lg:block"
        >
          <nav
            aria-label="Workspace"
            class="sticky top-16 z-10 flex h-[calc(100dvh-4rem)] flex-col items-center gap-2 py-4"
          >
            @for (item of railNav; track item.id) {
              <span
                [class]="
                  cx(
                    'group relative inline-flex',
                    item.id === 'settings' && 'mt-auto'
                  )
                "
              >
                <button
                  type="button"
                  [attr.aria-label]="pages[item.id].label"
                  [attr.aria-current]="current(item.id)"
                  [class]="
                    cx(railBase, page() === item.id ? navActive : railIdle)
                  "
                  (click)="go(item.id)"
                >
                  <svg [lumenIcon]="item.icon" class="size-5"></svg>
                </button>
                <span aria-hidden="true" [class]="railTip">{{
                  pages[item.id].label
                }}</span>
              </span>
            }
          </nav>
        </div>

        <main class="min-w-0 flex-1 p-4 lg:p-6">
          <div class="mb-6">
            <p class="text-sm text-muted">Lumen / {{ pages[page()].label }}</p>
            <h1
              [id]="TITLE_ID"
              tabindex="-1"
              class="text-2xl font-semibold tracking-tight focus:outline-none"
            >
              {{ pages[page()].title }}
            </h1>
          </div>

          @switch (page()) {
            @case ("home") {
              <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
                <div class="grid content-start gap-6">
                  <lumen-panel
                    labelId="crm-target-title"
                    heading="Monthly target"
                    sub="November 2026"
                  >
                    <div
                      class="grid items-center gap-6 sm:grid-cols-[160px_minmax(0,1fr)]"
                    >
                      <div
                        role="img"
                        [attr.aria-label]="
                          percent + '% of the monthly revenue target reached'
                        "
                        class="relative mx-auto size-40"
                      >
                        <svg
                          viewBox="0 0 120 120"
                          class="size-40 -rotate-90"
                          aria-hidden="true"
                        >
                          <circle
                            cx="60"
                            cy="60"
                            r="52"
                            fill="none"
                            stroke-width="12"
                            class="stroke-subtle"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="52"
                            fill="none"
                            stroke-width="12"
                            stroke-linecap="round"
                            pathLength="100"
                            [attr.stroke-dasharray]="percent + ' 100'"
                            class="stroke-primary"
                          />
                        </svg>
                        <div
                          class="absolute inset-0 grid place-content-center text-center"
                        >
                          <span
                            class="text-3xl font-semibold tracking-tight tabular-nums"
                            >{{ percent }}%</span
                          >
                          <span class="text-xs text-muted">of target</span>
                        </div>
                      </div>
                      <div class="grid gap-4">
                        <div>
                          <p
                            class="text-2xl font-semibold tracking-tight tabular-nums"
                          >
                            {{ rupiah(TARGET.value) }}
                          </p>
                          <p class="text-sm text-muted">
                            of {{ rupiah(TARGET.goal) }},
                            {{ rupiah(TARGET.goal - TARGET.value) }} to go
                          </p>
                        </div>
                        @for (goal of goals; track goal.label) {
                          <markas-progress
                            [label]="goal.label"
                            [value]="goal.value"
                            [max]="goal.max"
                          />
                        }
                      </div>
                    </div>
                  </lumen-panel>
                  <lumen-panel
                    labelId="crm-activity-title"
                    heading="Recent activity"
                    sub="Latest updates from your team"
                  >
                    <ol class="grid gap-4">
                      @for (item of activity; track item.when) {
                        <li class="flex items-start gap-3">
                          <markas-avatar [name]="item.who" size="sm" />
                          <div class="min-w-0 flex-1">
                            <p>
                              <span class="font-medium">{{ item.who }}</span>
                              {{ item.what }}
                            </p>
                            <p class="text-xs text-muted">{{ item.when }}</p>
                          </div>
                        </li>
                      }
                    </ol>
                  </lumen-panel>
                </div>
                <lumen-panel
                  labelId="crm-today-title"
                  heading="Today's tasks"
                  [sub]="done().length + ' of ' + todayTasks.length + ' done'"
                  cardClass="content-start"
                >
                  <markas-progress
                    [value]="done().length"
                    [max]="todayTasks.length"
                    aria-label="Tasks completed"
                  />
                  <ul class="grid gap-3">
                    @for (task of todayTasks; track task.id) {
                      <li class="rounded-xl border border-line p-3">
                        <markas-checkbox
                          [label]="task.title"
                          [description]="task.time"
                          [checked]="done().includes(task.id)"
                          (checkedChange)="toggleTask(task.id)"
                        />
                      </li>
                    }
                  </ul>
                </lumen-panel>
              </div>
            }
            @case ("customers") {
              <div class="grid gap-6">
                <lumen-stats [items]="stats" gridClass="sm:grid-cols-3" />
                <div
                  class="grid items-start gap-6 xl:grid-cols-[260px_minmax(0,1fr)_360px]"
                >
                  <lumen-panel
                    labelId="crm-list-title"
                    heading="Customers"
                    [sub]="customers().length + ' accounts'"
                    cardClass="content-start"
                  >
                    <ul class="-mx-3 grid gap-1">
                      @for (item of customers(); track item.id) {
                        <li
                          [class]="
                            cx(
                              listRow,
                              item.id === selectedId()
                                ? 'bg-primary-soft'
                                : 'hover:bg-subtle'
                            )
                          "
                        >
                          <markas-avatar
                            [name]="item.firstName + ' ' + item.lastName"
                            size="sm"
                          />
                          <div class="min-w-0 flex-1">
                            <button
                              type="button"
                              [attr.aria-pressed]="item.id === selectedId()"
                              [class]="
                                cx(
                                  selectable,
                                  'block truncate text-sm font-medium'
                                )
                              "
                              (click)="selectedId.set(item.id)"
                            >
                              {{ item.firstName }} {{ item.lastName }}
                            </button>
                            <p class="truncate text-xs text-muted">
                              {{ item.company }}
                            </p>
                          </div>
                        </li>
                      }
                    </ul>
                  </lumen-panel>

                  <div class="grid gap-6">
                    <lumen-panel
                      labelId="crm-history-title"
                      heading="Interaction history"
                      [sub]="
                        history.length +
                        ' deals with ' +
                        customer().firstName +
                        ' this quarter'
                      "
                      cardClass="content-start"
                    >
                      <markas-dropdown-menu
                        action
                        [items]="sortOptions"
                        (selected)="sort.set($event)"
                      >
                        <ng-container trigger>
                          <span class="text-muted">Sort:</span>
                          <span>{{ sortLabel() }}</span>
                        </ng-container>
                      </markas-dropdown-menu>
                      <ul role="list" class="grid gap-4 sm:grid-cols-2">
                        @for (deal of sortedHistory(); track deal.id) {
                          @let selected = selectedDeal() === deal.id;
                          @let muted =
                            selected ? "text-on-primary/80" : "text-muted";
                          <li
                            [attr.data-deal]="deal.id"
                            [class]="
                              cx(dealBase, selected ? dealSelected : dealIdle)
                            "
                          >
                            <time
                              [attr.datetime]="deal.date"
                              [class]="cx('text-xs font-medium', muted)"
                              >{{ shortDate(deal.date) }}</time
                            >
                            <h3 class="text-sm leading-snug font-semibold">
                              <button
                                type="button"
                                [attr.aria-pressed]="selected"
                                [class]="selectable"
                                (click)="selectedDeal.set(deal.id)"
                              >
                                {{ deal.title }}
                              </button>
                            </h3>
                            <p
                              class="mt-auto text-xl font-semibold tracking-tight tabular-nums"
                            >
                              {{ rupiah(deal.value) }}
                            </p>
                            <div
                              class="flex items-center justify-between gap-2"
                            >
                              <div class="flex -space-x-1">
                                @for (member of deal.team; track member) {
                                  <markas-avatar
                                    [name]="member"
                                    size="sm"
                                    class="ring-2 ring-surface"
                                  />
                                }
                              </div>
                              <span
                                [class]="cx('text-xs font-medium', muted)"
                                >{{ deal.stage }}</span
                              >
                            </div>
                          </li>
                        }
                      </ul>
                    </lumen-panel>
                    <lumen-panel
                      labelId="crm-funnel-title"
                      heading="Stage funnel"
                      sub="Open pipeline by stage"
                    >
                      <markas-tabs [items]="funnelTabs" defaultValue="weighted">
                        @for (mode of funnel; track mode.value) {
                          <ng-template [markasTabPanel]="mode.value">
                            <div class="grid gap-4">
                              <div>
                                <p
                                  class="text-2xl font-semibold tracking-tight tabular-nums"
                                >
                                  {{ mode.total }}
                                </p>
                                <p class="text-xs text-muted">
                                  {{ mode.caption }}
                                </p>
                              </div>
                              <ol
                                class="grid gap-3"
                                [attr.aria-label]="mode.caption + ' by stage'"
                              >
                                @for (
                                  step of mode.steps;
                                  track step.label;
                                  let index = $index
                                ) {
                                  <li class="grid gap-1.5">
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
                                      <span
                                        class="font-semibold tabular-nums"
                                        >{{ step.value }}</span
                                      >
                                    </div>
                                    <div class="h-6 rounded-md bg-subtle">
                                      <div
                                        [class]="
                                          cx(
                                            'mx-auto h-6 rounded-md',
                                            barTones[index]
                                          )
                                        "
                                        [style.width.%]="step.width"
                                      ></div>
                                    </div>
                                  </li>
                                }
                              </ol>
                            </div>
                          </ng-template>
                        }
                      </markas-tabs>
                    </lumen-panel>
                  </div>

                  <div class="grid content-start gap-6">
                    <article markas-card aria-labelledby="crm-profile-name">
                      <div class="grid justify-items-center gap-4 text-center">
                        <markas-avatar
                          [name]="fullName()"
                          size="lg"
                          class="size-16! text-xl!"
                        />
                        <div class="grid gap-1">
                          <h2
                            id="crm-profile-name"
                            class="text-lg font-semibold"
                          >
                            {{ fullName() }}
                          </h2>
                          <p class="text-sm text-muted">
                            {{ customer().role }}
                          </p>
                          <p
                            class="flex flex-wrap items-center justify-center gap-2 text-sm font-medium"
                          >
                            {{ customer().company }}
                            <span
                              markas-badge
                              [variant]="tierVariant[customer().tier]!"
                              >{{ customer().tier }}</span
                            >
                          </p>
                        </div>
                        <div class="flex justify-center gap-3">
                          @for (action of profileActions; track action.label) {
                            <button
                              type="button"
                              [attr.aria-label]="action.label"
                              [class]="iconButton"
                              (click)="
                                notify(
                                  action.label,
                                  fullName() + ', ' + customer().company
                                )
                              "
                            >
                              <svg
                                [lumenIcon]="action.icon"
                                class="size-5"
                              ></svg>
                            </button>
                          }
                        </div>
                      </div>
                    </article>

                    <lumen-panel
                      labelId="crm-details-title"
                      heading="Detailed information"
                      [sub]="'Updated ' + customer().lastContacted"
                    >
                      <markas-drawer
                        action
                        #editDrawer
                        title="Edit customer details"
                        (closed)="onEditClose()"
                      >
                        <button
                          markas-button
                          trigger
                          variant="secondary"
                          size="sm"
                          (click)="draft.set(customer())"
                        >
                          <svg [lumenIcon]="'pencil'" class="size-4"></svg>
                          Edit
                        </button>
                        <div class="grid gap-4">
                          @for (field of formFields; track field.key) {
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
                      <lumen-details [rows]="customerRows()" />
                    </lumen-panel>
                  </div>
                </div>
              </div>
            }
            @case ("deals") {
              <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
                <div
                  class="grid content-start gap-4 md:grid-cols-2 lg:grid-cols-4"
                >
                  @for (stage of stages; track stage) {
                    @let column = columnOf(stage);
                    <section
                      [attr.aria-labelledby]="'crm-stage-' + stage"
                      [attr.data-stage]="stage"
                      class="grid content-start gap-3 rounded-2xl bg-subtle p-3"
                    >
                      <div class="px-1">
                        <h2
                          [id]="'crm-stage-' + stage"
                          class="flex items-center justify-between gap-2 text-sm font-semibold"
                        >
                          {{ stage }}
                          <span
                            class="rounded-full bg-surface px-2 text-xs font-medium tabular-nums"
                            >{{ column.length }}</span
                          >
                        </h2>
                        <p
                          data-total
                          class="text-xs text-muted tabular-nums"
                          [textContent]="rupiah(totalOf(column))"
                        ></p>
                      </div>
                      @for (item of column; track item.id) {
                        <article
                          [class]="
                            cx(
                              kanbanCard,
                              item.id === dealId()
                                ? 'border-primary ring-1 ring-primary'
                                : 'border-line hover:border-primary-line'
                            )
                          "
                        >
                          <h3 class="text-sm leading-snug font-semibold">
                            <button
                              type="button"
                              [attr.aria-pressed]="item.id === dealId()"
                              [class]="selectable"
                              (click)="dealId.set(item.id)"
                            >
                              {{ item.title }}
                            </button>
                          </h3>
                          <p class="-mt-2 truncate text-xs text-muted">
                            {{ item.company }}
                          </p>
                          <div class="flex items-center justify-between gap-2">
                            <span class="text-sm font-semibold tabular-nums">{{
                              rupiah(item.value)
                            }}</span>
                            <markas-avatar
                              [name]="item.owner"
                              size="sm"
                              class="size-6! text-[10px]!"
                            />
                          </div>
                        </article>
                      }
                      @if (column.length === 0) {
                        <p
                          class="rounded-xl border border-dashed border-line p-3 text-center text-xs text-muted"
                        >
                          No deals
                        </p>
                      }
                    </section>
                  }
                </div>
                <lumen-panel
                  labelId="crm-deal-title"
                  heading="Deal details"
                  [sub]="deal().company"
                  cardClass="content-start"
                >
                  <div class="grid gap-1">
                    <p class="font-semibold">{{ deal().title }}</p>
                    <p
                      class="text-2xl font-semibold tracking-tight tabular-nums"
                    >
                      {{ rupiah(deal().value) }}
                    </p>
                  </div>
                  <lumen-details [rows]="dealRows()" />
                  <markas-dropdown-menu
                    [items]="stageItems"
                    label="Move to stage"
                    [class]="stageMenuClass"
                    (selected)="moveTo($event)"
                  />
                </lumen-panel>
              </div>
            }
            @case ("finance") {
              <div class="grid gap-6">
                <lumen-stats
                  [items]="financeStats"
                  gridClass="sm:grid-cols-2 xl:grid-cols-4"
                />
                <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                  <lumen-panel
                    labelId="crm-invoices-title"
                    heading="Invoices"
                    sub="Sort by customer, due date, or amount"
                  >
                    <button
                      markas-button
                      action
                      size="sm"
                      (click)="remindOverdue()"
                    >
                      <svg [lumenIcon]="'send'" class="size-4"></svg>
                      Send reminders
                    </button>
                    <div
                      tabindex="0"
                      role="region"
                      aria-label="Invoices"
                      [class]="tableWrap"
                    >
                      <table class="w-full border-collapse text-sm">
                        <thead>
                          <tr class="bg-subtle text-left text-muted">
                            <th scope="col" [class]="th">Invoice</th>
                            @for (column of invoiceColumns; track column.key) {
                              @let active = invoiceSort().key === column.key;
                              <th
                                scope="col"
                                [attr.aria-sort]="
                                  active
                                    ? invoiceSort().dir === 1
                                      ? 'ascending'
                                      : 'descending'
                                    : null
                                "
                                [class]="cx(th, column.align)"
                              >
                                <button
                                  type="button"
                                  [class]="thButton"
                                  (click)="sortBy(column.key)"
                                >
                                  {{ column.label }}
                                  <svg
                                    [lumenIcon]="active ? 'up' : 'sort'"
                                    [class]="
                                      cx(
                                        'size-3.5',
                                        active &&
                                          invoiceSort().dir === -1 &&
                                          'rotate-180'
                                      )
                                    "
                                  ></svg>
                                </button>
                              </th>
                            }
                            <th scope="col" [class]="th">Status</th>
                            <th scope="col" [class]="th">
                              <span class="sr-only">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (invoice of invoiceRows(); track invoice.id) {
                            <tr
                              [attr.data-row]="invoice.id"
                              class="h-14 border-t border-line hover:bg-subtle/50"
                            >
                              <td [class]="cx(td, 'font-medium')">
                                {{ invoice.id }}
                              </td>
                              <td [class]="td">{{ invoice.customer }}</td>
                              <td [class]="cx(td, 'text-muted')">
                                {{ shortDate(invoice.due) }}
                              </td>
                              <td
                                [class]="
                                  cx(td, 'text-right font-medium tabular-nums')
                                "
                              >
                                {{ rupiah(invoice.amount) }}
                              </td>
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
                                    (click)="remind(invoice)"
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
                  </lumen-panel>
                  <lumen-panel
                    labelId="crm-revenue-title"
                    heading="Revenue"
                    sub="Last 6 months, in million Rupiah"
                    cardClass="content-start"
                  >
                    <lumen-bars [bars]="revenue" label="Monthly revenue" />
                    <p class="text-sm text-muted">
                      November is
                      <span class="font-semibold text-ink">12.4%</span> above
                      October.
                    </p>
                  </lumen-panel>
                </div>
              </div>
            }
            @case ("growth") {
              <markas-tabs [items]="growthTabs" defaultValue="30d">
                @for (period of growthPeriods; track period.value) {
                  <ng-template [markasTabPanel]="period.value">
                    <div class="grid gap-6">
                      <lumen-stats
                        [items]="period.metrics"
                        gridClass="sm:grid-cols-2 xl:grid-cols-4"
                      />
                      <div class="grid gap-6 lg:grid-cols-2">
                        <lumen-panel
                          [labelId]="'crm-funnel-' + period.value"
                          heading="Acquisition funnel"
                          [sub]="'Last ' + period.label"
                        >
                          <ol class="grid gap-3">
                            @for (
                              count of period.funnel;
                              track $index;
                              let index = $index
                            ) {
                              <li class="grid gap-1.5">
                                <div
                                  class="flex items-baseline justify-between gap-3"
                                >
                                  <span class="font-medium">{{
                                    funnelSteps[index]
                                  }}</span>
                                  <span class="tabular-nums"
                                    ><span class="font-semibold">{{
                                      formatNumber(count)
                                    }}</span>
                                    @if (index > 0) {
                                      <span class="ml-2 text-xs text-muted"
                                        >{{
                                          percentOf(
                                            count,
                                            period.funnel[index - 1]!
                                          )
                                        }}%</span
                                      >
                                    }
                                  </span>
                                </div>
                                <div class="h-3 rounded-full bg-subtle">
                                  <div
                                    class="h-3 rounded-full bg-primary"
                                    [style.width.%]="
                                      funnelWidth(count, period.funnel[0]!)
                                    "
                                  ></div>
                                </div>
                              </li>
                            }
                          </ol>
                        </lumen-panel>
                        <lumen-panel
                          [labelId]="'crm-sources-' + period.value"
                          heading="Lead sources"
                          sub="Share of new leads"
                        >
                          <div
                            role="img"
                            [attr.aria-label]="sourcesLabel(period.sources)"
                            class="flex h-3 gap-1 overflow-hidden rounded-full"
                          >
                            @for (
                              share of period.sources;
                              track $index;
                              let index = $index
                            ) {
                              <div
                                [class]="sourceTones[index]"
                                [style.width.%]="share"
                              ></div>
                            }
                          </div>
                          <ul class="grid gap-3">
                            @for (
                              share of period.sources;
                              track $index;
                              let index = $index
                            ) {
                              <li class="flex items-center gap-3">
                                <span
                                  [class]="
                                    cx(
                                      'size-2.5 rounded-full',
                                      sourceTones[index]
                                    )
                                  "
                                  aria-hidden="true"
                                ></span>
                                <span class="flex-1">{{
                                  leadSources[index]
                                }}</span>
                                <span class="font-semibold tabular-nums"
                                  >{{ share }}%</span
                                >
                              </li>
                            }
                          </ul>
                        </lumen-panel>
                      </div>
                    </div>
                  </ng-template>
                }
              </markas-tabs>
            }
            @case ("projects") {
              <div class="grid gap-6">
                <lumen-stats
                  [items]="projectStats"
                  gridClass="sm:grid-cols-3"
                />
                <lumen-panel
                  labelId="crm-projects-title"
                  heading="All projects"
                  [sub]="plural(visibleProjects().length, 'project')"
                >
                  <markas-toggle-group
                    action
                    label="Filter by status"
                    [items]="projectFilters"
                    [value]="filter()"
                    (valueChange)="setFilter($event)"
                  />
                  <markas-drawer title="Project details">
                    <ul trigger class="-mx-3 grid gap-1">
                      @for (item of visibleProjects(); track item.id) {
                        <li [attr.data-project]="item.id">
                          <button
                            type="button"
                            [class]="projectRow"
                            (click)="projectId.set(item.id)"
                          >
                            <span class="min-w-0">
                              <span class="block truncate font-medium">{{
                                item.name
                              }}</span>
                              <span class="block truncate text-xs text-muted">{{
                                item.client
                              }}</span>
                            </span>
                            <span>
                              <span
                                markas-badge
                                [variant]="projectStatus[item.status]!.variant"
                                >{{ projectStatus[item.status]!.label }}</span
                              >
                            </span>
                            <span
                              class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"
                            >
                              <markas-progress
                                [value]="item.progress"
                                [aria-label]="item.name + ' progress'"
                              />
                              <span
                                class="w-10 shrink-0 text-right text-xs text-muted tabular-nums"
                                >{{ item.progress }}%</span
                              >
                            </span>
                            <span class="text-xs text-muted md:text-right"
                              >Due {{ item.due }}</span
                            >
                          </button>
                        </li>
                      }
                    </ul>
                    <div class="grid gap-5 text-ink">
                      <div>
                        <h3 class="text-base font-semibold">
                          {{ project().name }}
                        </h3>
                        <p class="text-sm text-muted">{{ project().client }}</p>
                      </div>
                      <div class="grid gap-1.5">
                        <div class="flex justify-between text-sm">
                          <span class="font-medium">Progress</span>
                          <span class="text-muted tabular-nums"
                            >{{ project().progress }}%</span
                          >
                        </div>
                        <markas-progress
                          [value]="project().progress"
                          aria-label="Project progress"
                        />
                      </div>
                      <lumen-details [rows]="projectRows()" />
                    </div>
                    <ng-container footer>
                      <button markas-button variant="secondary" type="submit">
                        Close
                      </button>
                    </ng-container>
                  </markas-drawer>
                </lumen-panel>
              </div>
            }
            @case ("calendar") {
              <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                <lumen-panel
                  labelId="crm-month-title"
                  [heading]="monthNames[view().month] + ' ' + view().year"
                  sub="Meetings, calls, and visits"
                >
                  <div action class="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous month"
                      [class]="cx(iconButton, 'size-8')"
                      (click)="shiftMonth(-1)"
                    >
                      <svg [lumenIcon]="'prev'" class="size-4"></svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Next month"
                      [class]="cx(iconButton, 'size-8')"
                      (click)="shiftMonth(1)"
                    >
                      <svg [lumenIcon]="'next'" class="size-4"></svg>
                    </button>
                    <markas-modal
                      #eventModal
                      title="New event"
                      (closed)="onEventClose()"
                    >
                      <button
                        markas-button
                        trigger
                        size="sm"
                        (click)="startEvent()"
                      >
                        <svg [lumenIcon]="'plus'" class="size-4"></svg>
                        New event
                      </button>
                      <div class="grid gap-4 sm:grid-cols-2">
                        <div class="sm:col-span-2">
                          <markas-input
                            label="Title"
                            name="title"
                            [value]="eventDraft().title"
                            (valueChange)="setEventDraft('title', $event)"
                          />
                        </div>
                        <markas-input
                          label="Date"
                          type="date"
                          name="date"
                          [value]="eventDraft().date"
                          (valueChange)="setEventDraft('date', $event)"
                        />
                        <markas-input
                          label="Time"
                          type="time"
                          name="time"
                          [value]="eventDraft().time"
                          (valueChange)="setEventDraft('time', $event)"
                        />
                        <markas-select
                          label="Type"
                          name="kind"
                          [value]="eventDraft().kind"
                          (valueChange)="setEventDraft('kind', $event ?? '')"
                        >
                          @for (kind of eventKinds; track kind) {
                            <option>{{ kind }}</option>
                          }
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
                        <button markas-button type="submit" value="save">
                          Add event
                        </button>
                      </ng-container>
                    </markas-modal>
                  </div>
                  <div
                    class="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-line bg-line"
                  >
                    @for (weekday of weekdays; track weekday) {
                      <span
                        aria-hidden="true"
                        class="bg-subtle py-2 text-center text-xs font-medium text-muted"
                        >{{ weekday }}</span
                      >
                    }
                    @for (day of cells(); track $index) {
                      @if (day === null) {
                        <span class="bg-canvas"></span>
                      } @else {
                        @let iso = isoDate(view().year, view().month, day);
                        @let list = events()[iso] ?? [];
                        <button
                          type="button"
                          [attr.aria-pressed]="iso === selectedDay()"
                          [class]="
                            cx(
                              dayCell,
                              iso === selectedDay()
                                ? 'bg-primary-soft'
                                : 'bg-surface'
                            )
                          "
                          (click)="selectedDay.set(iso)"
                        >
                          <span
                            class="sr-only"
                            [textContent]="dayLabel(day, list.length)"
                          ></span>
                          <span
                            aria-hidden="true"
                            [class]="
                              cx(
                                dayNumber,
                                iso === TODAY && 'bg-primary text-on-primary'
                              )
                            "
                            >{{ day }}</span
                          >
                          @if (list.length > 0) {
                            <span
                              class="size-1.5 rounded-full bg-primary sm:hidden"
                              aria-hidden="true"
                            ></span>
                          }
                          @for (
                            item of list.slice(0, 2);
                            track item.time + item.title
                          ) {
                            <span
                              [class]="
                                cx(
                                  chip,
                                  'hidden w-full sm:block',
                                  kindTones[item.kind]
                                )
                              "
                              >{{ item.title }}</span
                            >
                          }
                          @if (list.length > 2) {
                            <span class="hidden text-xs text-muted sm:block"
                              >+{{ list.length - 2 }} more</span
                            >
                          }
                        </button>
                      }
                    }
                  </div>
                </lumen-panel>
                <lumen-panel
                  labelId="crm-agenda-title"
                  [heading]="longDate(selectedDay())"
                  [sub]="plural(agenda().length, 'event')"
                  cardClass="content-start"
                >
                  @if (agenda().length > 0) {
                    <ul role="list" class="grid gap-2">
                      @for (item of agenda(); track item.time + item.title) {
                        <li
                          class="flex gap-3 rounded-xl border border-line p-3"
                        >
                          <span
                            class="w-12 shrink-0 text-xs font-medium text-muted tabular-nums"
                            >{{ item.time }}</span
                          >
                          <span class="grid min-w-0 flex-1 gap-1">
                            <span class="text-sm font-medium">{{
                              item.title
                            }}</span>
                            <span
                              [class]="cx(chip, 'w-fit', kindTones[item.kind])"
                              >{{ item.kind }}</span
                            >
                          </span>
                        </li>
                      }
                    </ul>
                  } @else {
                    <p
                      class="rounded-xl border border-dashed border-line p-4 text-sm text-muted"
                    >
                      No events on this day.
                    </p>
                  }
                </lumen-panel>
              </div>
            }
            @case ("reports") {
              <div class="grid gap-6">
                <div class="flex flex-wrap items-end justify-between gap-3">
                  <div class="w-full sm:w-56">
                    <markas-select
                      label="Period"
                      [value]="periodId()"
                      (valueChange)="periodId.set($event ?? 'month')"
                    >
                      @for (item of reportPeriods; track item.value) {
                        <option [value]="item.value">{{ item.label }}</option>
                      }
                    </markas-select>
                  </div>
                  <button
                    markas-button
                    variant="secondary"
                    (click)="exportReport()"
                  >
                    <svg [lumenIcon]="'download'" class="size-4"></svg>
                    Export PDF
                  </button>
                </div>
                <lumen-stats
                  [items]="period().kpis"
                  gridClass="sm:grid-cols-3"
                />
                <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                  <lumen-panel
                    labelId="crm-report-chart"
                    heading="Revenue"
                    [sub]="period().label + ', in million Rupiah'"
                  >
                    <lumen-bars
                      [bars]="period().bars"
                      [label]="'Revenue ' + period().label"
                    />
                  </lumen-panel>
                  <lumen-panel
                    labelId="crm-report-reps"
                    heading="Top sales reps"
                    sub="Revenue in million Rupiah"
                    cardClass="content-start"
                  >
                    <ol class="grid gap-4">
                      @for (rep of reps; track rep; let index = $index) {
                        <li
                          class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5"
                        >
                          <markas-avatar
                            [name]="rep"
                            size="sm"
                            class="row-span-2"
                          />
                          <span class="truncate font-medium">{{ rep }}</span>
                          <span class="font-semibold tabular-nums">{{
                            formatNumber(period().reps[index]!)
                          }}</span>
                          <div class="col-span-2 h-1.5 rounded-full bg-subtle">
                            <div
                              class="h-1.5 rounded-full bg-primary"
                              [style.width.%]="
                                percentOf(period().reps[index]!, repPeak())
                              "
                            ></div>
                          </div>
                        </li>
                      }
                    </ol>
                  </lumen-panel>
                </div>
              </div>
            }
            @case ("files") {
              <lumen-panel
                labelId="crm-files-title"
                heading="Shared files"
                [sub]="visibleFiles().length + ' of ' + files.length + ' files'"
              >
                <button
                  markas-button
                  action
                  size="sm"
                  (click)="
                    notify(
                      'Upload started',
                      'Choose a file to add to Shared files'
                    )
                  "
                >
                  <svg [lumenIcon]="'upload'" class="size-4"></svg>
                  Upload
                </button>
                <div class="flex flex-wrap items-center gap-3">
                  <div class="relative min-w-0 flex-1 sm:max-w-sm">
                    <svg
                      [lumenIcon]="'search'"
                      class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
                    ></svg>
                    <markas-input
                      type="search"
                      aria-label="Search files"
                      placeholder="Search files"
                      class="pl-9"
                      [(value)]="fileQuery"
                    />
                  </div>
                  <markas-toggle-group
                    label="View"
                    [items]="viewItems"
                    [value]="fileView()"
                    (valueChange)="setFileView($event)"
                  >
                    <ng-template markasToggleGroupItem="grid">
                      <svg [lumenIcon]="'grid'" class="size-5"></svg>
                    </ng-template>
                    <ng-template markasToggleGroupItem="list">
                      <svg [lumenIcon]="'list'" class="size-5"></svg>
                    </ng-template>
                  </markas-toggle-group>
                </div>
                @if (visibleFiles().length > 0) {
                  <ul
                    role="list"
                    [attr.data-view]="fileView()"
                    [class]="fileViews[fileView()].list"
                  >
                    @for (file of visibleFiles(); track file.name) {
                      <li [class]="fileViews[fileView()].item">
                        <span [class]="cx(fileKind, kindColors[file.kind])">{{
                          file.kind
                        }}</span>
                        <span class="min-w-0 flex-1">
                          <span class="block truncate font-medium">{{
                            file.name
                          }}</span>
                          <span class="block truncate text-xs text-muted">{{
                            file.owner
                          }}</span>
                        </span>
                        <span class="text-xs text-muted tabular-nums"
                          >{{ file.size }}, {{ file.updated }}</span
                        >
                      </li>
                    }
                  </ul>
                } @else {
                  <p
                    class="rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted"
                  >
                    No files match your search.
                  </p>
                }
              </lumen-panel>
            }
            @default {
              <form
                class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]"
                (submit)="saveSettings($event)"
              >
                <lumen-panel
                  labelId="crm-profile-title"
                  heading="Profile"
                  sub="How teammates and customers see you"
                  cardClass="content-start"
                >
                  <div class="grid gap-4 sm:grid-cols-2">
                    @for (field of profileFields; track field.key) {
                      <markas-input
                        [label]="field.label"
                        [type]="field.type"
                        [name]="field.key"
                        [value]="profile()[field.key]"
                        (valueChange)="setProfile(field.key, $event)"
                      />
                    }
                    <markas-select
                      label="Role"
                      name="role"
                      [value]="profile().role"
                      (valueChange)="setProfile('role', $event ?? '')"
                    >
                      @for (role of roles; track role) {
                        <option>{{ role }}</option>
                      }
                    </markas-select>
                  </div>
                </lumen-panel>
                <lumen-panel
                  labelId="crm-notify-title"
                  heading="Notifications"
                  sub="Choose what reaches your inbox"
                  cardClass="content-start"
                >
                  <ul class="divide-y divide-line">
                    @for (option of notificationOptions; track option.key) {
                      <li class="flex items-center justify-between gap-4 py-3">
                        <div>
                          <p class="font-medium">{{ option.label }}</p>
                          <p class="text-xs text-muted">
                            {{ option.description }}
                          </p>
                        </div>
                        <markas-switch
                          [aria-label]="option.label"
                          [name]="option.key"
                          [checked]="prefs().includes(option.key)"
                          (checkedChange)="togglePref(option.key)"
                        />
                      </li>
                    }
                  </ul>
                  <div class="flex justify-end gap-2">
                    <button
                      markas-button
                      variant="secondary"
                      type="button"
                      (click)="resetSettings()"
                    >
                      Reset
                    </button>
                    <button markas-button type="submit">Save changes</button>
                  </div>
                </lumen-panel>
              </form>
            }
          }
        </main>
      </div>
      <markas-toaster />
    </div>
  `,
})
export default class Lumen {
  protected readonly pages = pages;
  protected readonly topNav = topNav;
  protected readonly railNav = railNav;
  protected readonly TITLE_ID = TITLE_ID;
  protected readonly TARGET = TARGET;
  protected readonly goals = goals;
  protected readonly activity = activity;
  protected readonly todayTasks = todayTasks;
  protected readonly stats = stats;
  protected readonly tierVariant = tierVariant;
  protected readonly formFields = formFields;
  protected readonly history = history;
  protected readonly sortOptions = sortOptions;
  protected readonly profileActions = profileActions;
  protected readonly funnel = funnel;
  protected readonly funnelTabs = funnelTabs;
  protected readonly barTones = barTones;
  protected readonly stages = stages;
  protected readonly stageItems = stageItems;
  protected readonly stageMenuClass = stageMenuClass;
  protected readonly financeStats = financeStats;
  protected readonly invoiceColumns = invoiceColumns;
  protected readonly statusVariant = statusVariant;
  protected readonly revenue = revenue;
  protected readonly growthPeriods = growthPeriods;
  protected readonly growthTabs = growthTabs;
  protected readonly funnelSteps = funnelSteps;
  protected readonly leadSources = leadSources;
  protected readonly sourceTones = sourceTones;
  protected readonly projectStatus = projectStatus;
  protected readonly projectStats = projectStats;
  protected readonly projectFilters = projectFilters;
  protected readonly eventKinds = eventKinds;
  protected readonly kindTones = kindTones;
  protected readonly TODAY = TODAY;
  protected readonly monthNames = monthNames;
  protected readonly weekdays = weekdays;
  protected readonly reportPeriods = reportPeriods;
  protected readonly reps = reps;
  protected readonly files = files;
  protected readonly kindColors = kindColors;
  protected readonly viewItems = viewItems;
  protected readonly profileFields = profileFields;
  protected readonly roles = roles;
  protected readonly notificationOptions = notificationOptions;
  protected readonly iconButton = iconButton;
  protected readonly pillBase = pillBase;
  protected readonly navActive = navActive;
  protected readonly pillIdle = pillIdle;
  protected readonly railBase = railBase;
  protected readonly railIdle = railIdle;
  protected readonly railTip = railTip;
  protected readonly menuItemBase = menuItemBase;
  protected readonly menuItemIdle = menuItemIdle;
  protected readonly selectable = selectable;
  protected readonly listRow = listRow;
  protected readonly dealBase = dealBase;
  protected readonly dealIdle = dealIdle;
  protected readonly dealSelected = dealSelected;
  protected readonly kanbanCard = kanbanCard;
  protected readonly projectRow = projectRow;
  protected readonly dayCell = dayCell;
  protected readonly dayNumber = dayNumber;
  protected readonly chip = chip;
  protected readonly tableWrap = tableWrap;
  protected readonly th = th;
  protected readonly td = td;
  protected readonly thButton = thButton;
  protected readonly fileKind = fileKind;
  protected readonly fileViews = fileViews;
  protected readonly cx = cx;
  protected readonly rupiah = rupiah;
  protected readonly formatNumber = formatNumber;
  protected readonly percentOf = percentOf;
  protected readonly isoDate = isoDate;
  protected readonly plural = plural;
  protected readonly shortDate = shortDate;
  protected readonly longDate = longDate;

  protected readonly page = signal<PageId>(DEFAULT_PAGE);

  /* Home */
  protected readonly percent = percentOf(TARGET.value, TARGET.goal);
  protected readonly done = signal([...DONE_TASKS]);

  /* Customers */
  protected readonly customers = signal<Customer[]>(customerList);
  protected readonly selectedId = signal("c1");
  protected readonly draft = signal<Customer>(customerList[0]!);
  protected readonly sort = signal("newest");
  protected readonly selectedDeal = signal("d1");
  protected readonly customer = computed(() =>
    this.customers().find((item) => item.id === this.selectedId())!,
  );
  protected readonly fullName = computed(
    () => `${this.customer().firstName} ${this.customer().lastName}`,
  );
  protected readonly sortLabel = computed(
    () => sortOptions.find((option) => option.value === this.sort())?.label,
  );
  protected readonly sortedHistory = computed(() =>
    [...history].sort(sorters[this.sort()]),
  );
  protected readonly customerRows = computed(() =>
    infoRows.map((row): Row => [row.label, this.customer()[row.key]]),
  );
  private readonly editDrawer = viewChild<string, ElementRef<HTMLElement>>(
    "editDrawer",
    { read: ElementRef },
  );

  /* Deals */
  protected readonly deals = signal(pipeline);
  protected readonly dealId = signal("k1");
  protected readonly deal = computed(() =>
    this.deals().find((item) => item.id === this.dealId())!,
  );
  protected readonly dealRows = computed((): Row[] => [
    ["Stage", this.deal().stage],
    ["Owner", this.deal().owner],
    ["Expected close", this.deal().due],
  ]);

  /* Finance */
  protected readonly invoiceSort = signal<{ key: InvoiceKey; dir: number }>({
    key: "due",
    dir: 1,
  });
  protected readonly invoiceRows = computed(() => {
    const { key, dir } = this.invoiceSort();
    return [...invoices].sort((a, b) => {
      const [x, y] = [a[key], b[key]];
      return (x < y ? -1 : x > y ? 1 : 0) * dir;
    });
  });

  /* Projects */
  protected readonly filter = signal("all");
  protected readonly projectId = signal("p1");
  protected readonly project = computed(() =>
    projects.find((item) => item.id === this.projectId())!,
  );
  protected readonly visibleProjects = computed(() =>
    projects.filter(
      (item) => this.filter() === "all" || item.status === this.filter(),
    ),
  );
  protected readonly projectRows = computed((): Row[] => {
    const project = this.project();
    return [
      ["Status", projectStatus[project.status]!.label],
      ["Lead", project.lead],
      ["Due date", project.due],
      ["Budget", rupiah(project.budget)],
      ["Tasks", project.tasks],
    ];
  });
  private readonly toggleGroup = viewChild(ToggleGroup);

  /* Calendar */
  protected readonly events = signal(initialEvents);
  protected readonly view = signal({ year: 2026, month: 10 });
  protected readonly selectedDay = signal(TODAY);
  protected readonly eventDraft = signal({
    title: "",
    date: TODAY,
    time: "09:00",
    kind: "Meeting",
  });
  protected readonly cells = computed(() =>
    monthCells(this.view().year, this.view().month),
  );
  protected readonly agenda = computed(
    () => this.events()[this.selectedDay()] ?? [],
  );
  private readonly eventModal = viewChild<string, ElementRef<HTMLElement>>(
    "eventModal",
    { read: ElementRef },
  );

  /* Reports */
  protected readonly periodId = signal("month");
  protected readonly period = computed(() =>
    reportPeriods.find((item) => item.value === this.periodId())!,
  );
  protected readonly repPeak = computed(() => Math.max(...this.period().reps));

  /* Files */
  protected readonly fileQuery = signal("");
  protected readonly fileView = signal<"grid" | "list">("grid");
  protected readonly visibleFiles = computed(() =>
    files.filter((file) =>
      file.name.toLowerCase().includes(this.fileQuery().trim().toLowerCase()),
    ),
  );

  /* Settings */
  protected readonly profile = signal(initialProfile);
  protected readonly prefs = signal(DEFAULT_PREFS);

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

  /** Pindah halaman: state halaman direset, sama seperti React yang me-mount ulang. */
  private openPage(id: PageId) {
    this.page.set(id);
    this.done.set([...DONE_TASKS]);
    this.customers.set(customerList);
    this.selectedId.set("c1");
    this.draft.set(customerList[0]!);
    this.sort.set("newest");
    this.selectedDeal.set("d1");
    this.deals.set(pipeline);
    this.dealId.set("k1");
    this.invoiceSort.set({ key: "due", dir: 1 });
    this.filter.set("all");
    this.projectId.set("p1");
    this.events.set(initialEvents);
    this.view.set({ year: 2026, month: 10 });
    this.selectedDay.set(TODAY);
    this.eventDraft.set({
      title: "",
      date: TODAY,
      time: "09:00",
      kind: "Meeting",
    });
    this.periodId.set("month");
    this.fileQuery.set("");
    this.fileView.set("grid");
    this.profile.set(initialProfile);
    this.prefs.set(DEFAULT_PREFS);
  }

  protected go(id: PageId) {
    window.location.assign(`#${id}`);
  }

  protected current(id: PageId) {
    return this.page() === id ? "page" : null;
  }

  protected notify(title: string, description: string) {
    toast({ title, description });
  }

  protected toggleTask(id: string) {
    this.done.update((list) => toggleIn(list, id));
  }

  protected setDraft(key: CustomerKey, value: string) {
    this.draft.update((draft) => ({ ...draft, [key]: value }));
  }

  /** Drawer hanya memancarkan closed; returnValue dibaca dari dialog di dalamnya. */
  protected onEditClose() {
    const dialog = this.editDrawer()?.nativeElement.querySelector("dialog");
    if (!dialog) return;
    if (dialog.returnValue === "save") {
      const draft = this.draft();
      this.customers.update((list) =>
        list.map((item) => (item.id === draft.id ? draft : item)),
      );
      toast({
        title: "Customer details saved",
        description: `${draft.firstName} ${draft.lastName}`,
        variant: "success",
      });
    }
    dialog.returnValue = "";
  }

  protected columnOf(stage: string) {
    return this.deals().filter((item) => item.stage === stage);
  }

  protected totalOf(column: { value: number }[]) {
    return column.reduce((sum, item) => sum + item.value, 0);
  }

  protected moveTo(stage: string) {
    const deal = this.deal();
    if (stage === deal.stage) {
      toast({ title: `Already in ${stage}`, description: deal.title });
      return;
    }
    this.deals.update((list) =>
      list.map((item) => (item.id === deal.id ? { ...item, stage } : item)),
    );
    toast({
      title: `Moved to ${stage}`,
      description: deal.title,
      variant: "success",
    });
  }

  protected sortBy(key: InvoiceKey) {
    this.invoiceSort.update((sort) => ({
      key,
      dir: sort.key === key ? -sort.dir : 1,
    }));
  }

  protected remind(invoice: Invoice) {
    toast({
      title: "Reminder sent",
      description: `${invoice.id} to ${invoice.customer}`,
    });
  }

  protected remindOverdue() {
    const overdue = invoices.filter((invoice) => invoice.status === "Overdue");
    toast({
      title: "Reminders sent",
      description: `${overdue.length} overdue invoices, ${rupiah(overdue.reduce((sum, item) => sum + item.amount, 0))}`,
      variant: "success",
    });
  }

  protected funnelWidth(count: number, top: number) {
    return Math.round(Math.sqrt(count / top) * 100);
  }

  protected sourcesLabel(sources: number[]) {
    return `Lead sources: ${sources.map((share, index) => `${leadSources[index]} ${share}%`).join(", ")}`;
  }

  /** Grup toggle tunggal mengirim "" saat item aktif diklik lagi; filter tetap seperti React. */
  protected setFilter(value: string | string[] | undefined) {
    if (typeof value === "string" && value) this.filter.set(value);
    else this.toggleGroup()?.value.set(this.filter());
  }

  protected setFileView(value: string | string[] | undefined) {
    if (value === "list" || value === "grid") this.fileView.set(value);
    else this.toggleGroup()?.value.set(this.fileView());
  }

  protected shiftMonth(step: number) {
    const { year, month } = this.view();
    const next = new Date(year, month + step, 1);
    this.view.set({ year: next.getFullYear(), month: next.getMonth() });
  }

  protected dayLabel(day: number, count: number) {
    return `${monthNames[this.view().month]} ${day}, ${plural(count, "event")}`;
  }

  protected startEvent() {
    this.eventDraft.update((draft) => ({
      ...draft,
      title: "",
      date: this.selectedDay(),
    }));
  }

  protected setEventDraft(
    key: "title" | "date" | "time" | "kind",
    value: string,
  ) {
    this.eventDraft.update((draft) => ({ ...draft, [key]: value }));
  }

  protected onEventClose() {
    const dialog = this.eventModal()?.nativeElement.querySelector("dialog");
    if (!dialog) return;
    if (dialog.returnValue === "save") {
      const draft = this.eventDraft();
      const title = draft.title.trim() || "New event";
      const date = draft.date || this.selectedDay();
      const [year = 2026, month = 1] = date.split("-").map(Number);
      const added = { time: draft.time, title, kind: draft.kind };
      this.events.update((events) => ({
        ...events,
        [date]: [...(events[date] ?? []), added].sort((a, b) =>
          a.time.localeCompare(b.time),
        ),
      }));
      this.selectedDay.set(date);
      this.view.set({ year, month: month - 1 });
      toast({
        title: "Event added",
        description: `${title}, ${longDate(date)}`,
        variant: "success",
      });
    }
    dialog.returnValue = "";
  }

  protected exportReport() {
    toast({
      title: "Report exported",
      description: `${this.period().label} sales report (PDF)`,
      variant: "success",
    });
  }

  protected setProfile(key: ProfileKey, value: string) {
    this.profile.update((profile) => ({ ...profile, [key]: value }));
  }

  protected togglePref(key: string) {
    this.prefs.update((list) => toggleIn(list, key));
  }

  protected saveSettings(event: Event) {
    event.preventDefault();
    const profile = this.profile();
    toast({
      title: "Settings saved",
      description: `${profile.firstName} ${profile.lastName}, ${this.prefs().length} notifications on`,
      variant: "success",
    });
  }

  protected resetSettings() {
    this.profile.set(initialProfile);
    this.prefs.set(DEFAULT_PREFS);
  }
}
