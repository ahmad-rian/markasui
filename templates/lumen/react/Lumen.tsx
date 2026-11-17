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
import { Card } from "../../../components/card/Card";
import { Checkbox } from "../../../components/checkbox/Checkbox";
import { Drawer } from "../../../components/drawer/Drawer";
import { DropdownMenu } from "../../../components/dropdown-menu/DropdownMenu";
import { Input } from "../../../components/input/Input";
import { Modal } from "../../../components/modal/Modal";
import { Progress } from "../../../components/progress/Progress";
import { Select } from "../../../components/select/Select";
import { Switch } from "../../../components/switch/Switch";
import { Tabs } from "../../../components/tabs/Tabs";
import { Toaster, toast } from "../../../components/toast/Toast";
import { ToggleGroup } from "../../../components/toggle-group/ToggleGroup";

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

function Panel({
  id,
  title,
  sub,
  action,
  className,
  children,
}: {
  id: string;
  title: ReactNode;
  sub: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Card aria-labelledby={id} className={className}>
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id={id} className="text-base font-semibold">
              {title}
            </h2>
            <p className="text-sm text-muted">{sub}</p>
          </div>
          {action}
        </div>
        {children}
      </div>
    </Card>
  );
}

function StatTiles({ items, className }: { items: Stat[]; className: string }) {
  return (
    <dl className={cx("grid gap-3", className)}>
      {items.map((stat) => (
        <div key={stat.label} className={tile}>
          <dt className="text-xs text-muted">{stat.label}</dt>
          <dd className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-lg font-semibold tracking-tight tabular-nums">
              {stat.value}
            </span>
            {stat.badge && (
              <Badge variant={stat.variant ?? "success"}>{stat.badge}</Badge>
            )}
          </dd>
          {stat.note && <dd className="text-xs text-muted">{stat.note}</dd>}
        </div>
      ))}
    </dl>
  );
}

function Details({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="divide-y divide-line">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex items-center justify-between gap-4 py-3"
        >
          <dt className="shrink-0 text-muted">{label}</dt>
          <dd className="min-w-0 truncate text-right font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function BarChart({
  bars,
  label,
}: {
  bars: { label: string; value: number }[];
  label: string;
}) {
  const peak = Math.max(...bars.map((bar) => bar.value));
  return (
    <div
      role="img"
      aria-label={`${label}: ${bars.map((bar) => `${bar.label} Rp ${bar.value} million`).join(", ")}`}
      className="flex h-56 items-stretch gap-2 sm:gap-3"
    >
      {bars.map((bar, index) => (
        <div
          key={bar.label}
          data-bar
          className="flex min-w-0 flex-1 flex-col gap-2"
        >
          <div className="relative flex-1">
            <span
              className="absolute inset-x-0 hidden text-center text-xs font-medium tabular-nums sm:block"
              style={{ bottom: `calc(${percentOf(bar.value, peak)}% + 4px)` }}
            >
              {bar.value}
            </span>
            <div
              className={cx(
                "absolute inset-x-0 bottom-0 rounded-md",
                index === bars.length - 1 ? "bg-primary" : "bg-primary/30",
              )}
              style={{ height: `${percentOf(bar.value, peak)}%` }}
            />
          </div>
          <span className="truncate text-center text-xs text-muted">
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function HomePage() {
  const [done, setDone] = useState(DONE_TASKS);
  const percent = percentOf(TARGET.value, TARGET.goal);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="grid content-start gap-6">
        <Panel id="crm-target-title" title="Monthly target" sub="November 2026">
          <div className="grid items-center gap-6 sm:grid-cols-[160px_minmax(0,1fr)]">
            <div
              role="img"
              aria-label={`${percent}% of the monthly revenue target reached`}
              className="relative mx-auto size-40"
            >
              <svg
                viewBox="0 0 120 120"
                className="size-40 -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  strokeWidth="12"
                  className="stroke-subtle"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  strokeWidth="12"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray={`${percent} 100`}
                  className="stroke-primary"
                />
              </svg>
              <div className="absolute inset-0 grid place-content-center text-center">
                <span className="text-3xl font-semibold tracking-tight tabular-nums">
                  {percent}%
                </span>
                <span className="text-xs text-muted">of target</span>
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <p className="text-2xl font-semibold tracking-tight tabular-nums">
                  {rupiah(TARGET.value)}
                </p>
                <p className="text-sm text-muted">
                  of {rupiah(TARGET.goal)}, {rupiah(TARGET.goal - TARGET.value)}{" "}
                  to go
                </p>
              </div>
              {goals.map((goal) => (
                <Progress
                  key={goal.label}
                  label={goal.label}
                  value={goal.value}
                  max={goal.max}
                />
              ))}
            </div>
          </div>
        </Panel>
        <Panel
          id="crm-activity-title"
          title="Recent activity"
          sub="Latest updates from your team"
        >
          <ol className="grid gap-4">
            {activity.map((item) => (
              <li key={item.when} className="flex items-start gap-3">
                <Avatar name={item.who} size="sm" />
                <div className="min-w-0 flex-1">
                  <p>
                    <span className="font-medium">{item.who}</span> {item.what}
                  </p>
                  <p className="text-xs text-muted">{item.when}</p>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
      <Panel
        id="crm-today-title"
        title="Today's tasks"
        sub={`${done.length} of ${todayTasks.length} done`}
        className="content-start"
      >
        <Progress
          value={done.length}
          max={todayTasks.length}
          aria-label="Tasks completed"
        />
        <ul className="grid gap-3">
          {todayTasks.map((task) => (
            <li key={task.id} className="rounded-xl border border-line p-3">
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
    </div>
  );
}

function CustomersPage() {
  const [customers, setCustomers] = useState(customerList);
  const [selectedId, setSelectedId] = useState("c1");
  const [draft, setDraft] = useState(customerList[0]!);
  const [sort, setSort] = useState("newest");
  const [selectedDeal, setSelectedDeal] = useState("d1");
  const customer = customers.find((item) => item.id === selectedId)!;
  const fullName = `${customer.firstName} ${customer.lastName}`;

  const handleDrawerClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    const dialog = event.currentTarget;
    if (dialog.returnValue === "save") {
      setCustomers(
        customers.map((item) => (item.id === draft.id ? draft : item)),
      );
      toast({
        title: "Customer details saved",
        description: `${draft.firstName} ${draft.lastName}`,
        variant: "success",
      });
    }
    dialog.returnValue = "";
  };

  return (
    <div className="grid gap-6">
      <StatTiles items={stats} className="sm:grid-cols-3" />
      <div className="grid items-start gap-6 xl:grid-cols-[260px_minmax(0,1fr)_360px]">
        <Panel
          id="crm-list-title"
          title="Customers"
          sub={`${customers.length} accounts`}
          className="content-start"
        >
          <ul className="-mx-3 grid gap-1">
            {customers.map((item) => {
              const selected = item.id === selectedId;
              return (
                <li
                  key={item.id}
                  className={cx(
                    listRow,
                    selected ? "bg-primary-soft" : "hover:bg-subtle",
                  )}
                >
                  <Avatar
                    name={`${item.firstName} ${item.lastName}`}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      aria-pressed={selected}
                      className={cx(
                        selectable,
                        "block truncate text-sm font-medium",
                      )}
                      onClick={() => setSelectedId(item.id)}
                    >
                      {item.firstName} {item.lastName}
                    </button>
                    <p className="truncate text-xs text-muted">
                      {item.company}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>

        <div className="grid gap-6">
          <Panel
            id="crm-history-title"
            title="Interaction history"
            sub={`${history.length} deals with ${customer.firstName} this quarter`}
            className="content-start"
            action={
              <DropdownMenu
                items={sortOptions}
                onSelect={setSort}
                trigger={
                  <>
                    <span className="text-muted">Sort:</span>
                    <span>
                      {
                        sortOptions.find((option) => option.value === sort)
                          ?.label
                      }
                    </span>
                  </>
                }
              />
            }
          >
            <ul role="list" className="grid gap-4 sm:grid-cols-2">
              {[...history].sort(sorters[sort]).map((deal) => {
                const selected = selectedDeal === deal.id;
                const muted = selected ? "text-on-primary/80" : "text-muted";
                return (
                  <li
                    key={deal.id}
                    data-deal={deal.id}
                    className={cx(dealBase, selected ? dealSelected : dealIdle)}
                  >
                    <time
                      dateTime={deal.date}
                      className={cx("text-xs font-medium", muted)}
                    >
                      {shortDate(deal.date)}
                    </time>
                    <h3 className="text-sm leading-snug font-semibold">
                      <button
                        type="button"
                        aria-pressed={selected}
                        className={selectable}
                        onClick={() => setSelectedDeal(deal.id)}
                      >
                        {deal.title}
                      </button>
                    </h3>
                    <p className="mt-auto text-xl font-semibold tracking-tight tabular-nums">
                      {rupiah(deal.value)}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex -space-x-1">
                        {deal.team.map((member) => (
                          <Avatar
                            key={member}
                            name={member}
                            size="sm"
                            className="ring-2 ring-surface"
                          />
                        ))}
                      </div>
                      <span className={cx("text-xs font-medium", muted)}>
                        {deal.stage}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>
          <Panel
            id="crm-funnel-title"
            title="Stage funnel"
            sub="Open pipeline by stage"
          >
            <Tabs
              defaultValue="weighted"
              items={funnel.map((mode) => ({
                value: mode.value,
                label: mode.label,
                content: (
                  <div className="grid gap-4">
                    <div>
                      <p className="text-2xl font-semibold tracking-tight tabular-nums">
                        {mode.total}
                      </p>
                      <p className="text-xs text-muted">{mode.caption}</p>
                    </div>
                    <ol
                      className="grid gap-3"
                      aria-label={`${mode.caption} by stage`}
                    >
                      {mode.steps.map((step, index) => (
                        <li key={step.label} className="grid gap-1.5">
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="font-medium">
                              {step.label}
                              <span className="ml-2 text-xs font-normal text-muted">
                                {step.deals} deals
                              </span>
                            </span>
                            <span className="font-semibold tabular-nums">
                              {step.value}
                            </span>
                          </div>
                          <div className="h-6 rounded-md bg-subtle">
                            <div
                              className={cx(
                                "mx-auto h-6 rounded-md",
                                barTones[index],
                              )}
                              style={{ width: `${step.width}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                ),
              }))}
            />
          </Panel>
        </div>

        <div className="grid content-start gap-6">
          <Card aria-labelledby="crm-profile-name">
            <div className="grid justify-items-center gap-4 text-center">
              <Avatar name={fullName} size="lg" className="size-16! text-xl!" />
              <div className="grid gap-1">
                <h2 id="crm-profile-name" className="text-lg font-semibold">
                  {fullName}
                </h2>
                <p className="text-sm text-muted">{customer.role}</p>
                <p className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium">
                  {customer.company}
                  <Badge variant={tierVariant[customer.tier]}>
                    {customer.tier}
                  </Badge>
                </p>
              </div>
              <div className="flex justify-center gap-3">
                {profileActions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    aria-label={action.label}
                    className={iconButton}
                    onClick={() =>
                      toast({
                        title: action.label,
                        description: `${fullName}, ${customer.company}`,
                      })
                    }
                  >
                    <Icon name={action.icon} />
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Panel
            id="crm-details-title"
            title="Detailed information"
            sub={`Updated ${customer.lastContacted}`}
            action={
              <Drawer
                title="Edit customer details"
                onClose={handleDrawerClose}
                trigger={
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setDraft(customer)}
                  >
                    <Icon name="pencil" className="size-4" />
                    Edit
                  </Button>
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
                  {formFields.map((field) => (
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
            }
          >
            <Details
              rows={infoRows.map((row) => [row.label, customer[row.key]])}
            />
          </Panel>
        </div>
      </div>
    </div>
  );
}

function DealsPage() {
  const [deals, setDeals] = useState(pipeline);
  const [selectedId, setSelectedId] = useState("k1");
  const deal = deals.find((item) => item.id === selectedId)!;

  const moveTo = (stage: string) => {
    if (stage === deal.stage)
      return toast({ title: `Already in ${stage}`, description: deal.title });
    setDeals(
      deals.map((item) => (item.id === selectedId ? { ...item, stage } : item)),
    );
    toast({
      title: `Moved to ${stage}`,
      description: deal.title,
      variant: "success",
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="grid content-start gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage) => {
          const column = deals.filter((item) => item.stage === stage);
          return (
            <section
              key={stage}
              aria-labelledby={`crm-stage-${stage}`}
              data-stage={stage}
              className="grid content-start gap-3 rounded-2xl bg-subtle p-3"
            >
              <div className="px-1">
                <h2
                  id={`crm-stage-${stage}`}
                  className="flex items-center justify-between gap-2 text-sm font-semibold"
                >
                  {stage}
                  <span className="rounded-full bg-surface px-2 text-xs font-medium tabular-nums">
                    {column.length}
                  </span>
                </h2>
                <p data-total className="text-xs text-muted tabular-nums">
                  {rupiah(column.reduce((sum, item) => sum + item.value, 0))}
                </p>
              </div>
              {column.map((item) => (
                <article
                  key={item.id}
                  className={cx(
                    kanbanCard,
                    item.id === selectedId
                      ? "border-primary ring-1 ring-primary"
                      : "border-line hover:border-primary-line",
                  )}
                >
                  <h3 className="text-sm leading-snug font-semibold">
                    <button
                      type="button"
                      aria-pressed={item.id === selectedId}
                      className={selectable}
                      onClick={() => setSelectedId(item.id)}
                    >
                      {item.title}
                    </button>
                  </h3>
                  <p className="-mt-2 truncate text-xs text-muted">
                    {item.company}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold tabular-nums">
                      {rupiah(item.value)}
                    </span>
                    <Avatar
                      name={item.owner}
                      size="sm"
                      className="size-6! text-[10px]!"
                    />
                  </div>
                </article>
              ))}
              {column.length === 0 && (
                <p className="rounded-xl border border-dashed border-line p-3 text-center text-xs text-muted">
                  No deals
                </p>
              )}
            </section>
          );
        })}
      </div>
      <Panel
        id="crm-deal-title"
        title="Deal details"
        sub={deal.company}
        className="content-start"
      >
        <div className="grid gap-1">
          <p className="font-semibold">{deal.title}</p>
          <p className="text-2xl font-semibold tracking-tight tabular-nums">
            {rupiah(deal.value)}
          </p>
        </div>
        <Details
          rows={[
            ["Stage", deal.stage],
            ["Owner", deal.owner],
            ["Expected close", deal.due],
          ]}
        />
        <DropdownMenu
          items={stageItems}
          onSelect={moveTo}
          label="Move to stage"
          className="[&>button]:w-full"
        />
      </Panel>
    </div>
  );
}

function FinancePage() {
  const [sort, setSort] = useState<{ key: InvoiceKey; dir: number }>({
    key: "due",
    dir: 1,
  });
  const overdue = invoices.filter((invoice) => invoice.status === "Overdue");
  const rows = [...invoices].sort((a, b) => {
    const [x, y] = [a[sort.key], b[sort.key]];
    return (x < y ? -1 : x > y ? 1 : 0) * sort.dir;
  });

  const sortBy = (key: InvoiceKey) =>
    setSort({ key, dir: sort.key === key ? -sort.dir : 1 });
  const remind = (invoice: Invoice) =>
    toast({
      title: "Reminder sent",
      description: `${invoice.id} to ${invoice.customer}`,
    });
  const remindOverdue = () =>
    toast({
      title: "Reminders sent",
      description: `${overdue.length} overdue invoices, ${rupiah(overdue.reduce((sum, item) => sum + item.amount, 0))}`,
      variant: "success",
    });

  return (
    <div className="grid gap-6">
      <StatTiles
        items={financeStats}
        className="sm:grid-cols-2 xl:grid-cols-4"
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Panel
          id="crm-invoices-title"
          title="Invoices"
          sub="Sort by customer, due date, or amount"
          action={
            <Button size="sm" onClick={remindOverdue}>
              <Icon name="send" className="size-4" />
              Send reminders
            </Button>
          }
        >
          <div
            tabIndex={0}
            role="region"
            aria-label="Invoices"
            className={tableWrap}
          >
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-subtle text-left text-muted">
                  <th scope="col" className={th}>
                    Invoice
                  </th>
                  {invoiceColumns.map((column) => {
                    const active = sort.key === column.key;
                    return (
                      <th
                        key={column.key}
                        scope="col"
                        aria-sort={
                          active
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
                          <Icon
                            name={active ? "up" : "sort"}
                            className={cx(
                              "size-3.5",
                              active && sort.dir === -1 && "rotate-180",
                            )}
                          />
                        </button>
                      </th>
                    );
                  })}
                  <th scope="col" className={th}>
                    Status
                  </th>
                  <th scope="col" className={th}>
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((invoice) => (
                  <tr
                    key={invoice.id}
                    data-row={invoice.id}
                    className="h-14 border-t border-line hover:bg-subtle/50"
                  >
                    <td className={cx(td, "font-medium")}>{invoice.id}</td>
                    <td className={td}>{invoice.customer}</td>
                    <td className={cx(td, "text-muted")}>
                      {shortDate(invoice.due)}
                    </td>
                    <td
                      className={cx(td, "text-right font-medium tabular-nums")}
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
                          onClick={() => remind(invoice)}
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
          id="crm-revenue-title"
          title="Revenue"
          sub="Last 6 months, in million Rupiah"
          className="content-start"
        >
          <BarChart bars={revenue} label="Monthly revenue" />
          <p className="text-sm text-muted">
            November is <span className="font-semibold text-ink">12.4%</span>{" "}
            above October.
          </p>
        </Panel>
      </div>
    </div>
  );
}

function GrowthPage() {
  return (
    <Tabs
      defaultValue="30d"
      items={growthPeriods.map((period) => ({
        value: period.value,
        label: period.label,
        content: (
          <div className="grid gap-6">
            <StatTiles
              items={period.metrics}
              className="sm:grid-cols-2 xl:grid-cols-4"
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <Panel
                id={`crm-funnel-${period.value}`}
                title="Acquisition funnel"
                sub={`Last ${period.label}`}
              >
                <ol className="grid gap-3">
                  {period.funnel.map((count, index) => (
                    <li key={funnelSteps[index]} className="grid gap-1.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-medium">
                          {funnelSteps[index]}
                        </span>
                        <span className="tabular-nums">
                          <span className="font-semibold">
                            {formatNumber(count)}
                          </span>
                          {index > 0 && (
                            <span className="ml-2 text-xs text-muted">
                              {percentOf(count, period.funnel[index - 1]!)}%
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-subtle">
                        <div
                          className="h-3 rounded-full bg-primary"
                          style={{
                            width: `${Math.round(Math.sqrt(count / period.funnel[0]!) * 100)}%`,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ol>
              </Panel>
              <Panel
                id={`crm-sources-${period.value}`}
                title="Lead sources"
                sub="Share of new leads"
              >
                <div
                  role="img"
                  aria-label={`Lead sources: ${period.sources.map((share, index) => `${leadSources[index]} ${share}%`).join(", ")}`}
                  className="flex h-3 gap-1 overflow-hidden rounded-full"
                >
                  {period.sources.map((share, index) => (
                    <div
                      key={leadSources[index]}
                      className={sourceTones[index]}
                      style={{ width: `${share}%` }}
                    />
                  ))}
                </div>
                <ul className="grid gap-3">
                  {period.sources.map((share, index) => (
                    <li
                      key={leadSources[index]}
                      className="flex items-center gap-3"
                    >
                      <span
                        className={cx(
                          "size-2.5 rounded-full",
                          sourceTones[index],
                        )}
                        aria-hidden="true"
                      />
                      <span className="flex-1">{leadSources[index]}</span>
                      <span className="font-semibold tabular-nums">
                        {share}%
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          </div>
        ),
      }))}
    />
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState("p1");
  const project = projects.find((item) => item.id === selectedId)!;
  const visible = projects.filter(
    (item) => filter === "all" || item.status === filter,
  );

  return (
    <div className="grid gap-6">
      <StatTiles items={projectStats} className="sm:grid-cols-3" />
      <Panel
        id="crm-projects-title"
        title="All projects"
        sub={plural(visible.length, "project")}
        action={
          <ToggleGroup
            label="Filter by status"
            items={projectFilters}
            value={filter}
            onValueChange={(value: string) => setFilter(value || filter)}
          />
        }
      >
        <Drawer
          title="Project details"
          footer={
            <Button variant="secondary" type="submit">
              Close
            </Button>
          }
          trigger={
            <ul className="-mx-3 grid gap-1">
              {visible.map((item) => (
                <li key={item.id} data-project={item.id}>
                  <button
                    type="button"
                    className={projectRow}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        {item.name}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {item.client}
                      </span>
                    </span>
                    <span>
                      <Badge variant={projectStatus[item.status]!.variant}>
                        {projectStatus[item.status]!.label}
                      </Badge>
                    </span>
                    <span className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                      <Progress
                        value={item.progress}
                        aria-label={`${item.name} progress`}
                      />
                      <span className="w-10 shrink-0 text-right text-xs text-muted tabular-nums">
                        {item.progress}%
                      </span>
                    </span>
                    <span className="text-xs text-muted md:text-right">
                      Due {item.due}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          }
        >
          <div className="grid gap-5 text-ink">
            <div>
              <h3 className="text-base font-semibold">{project.name}</h3>
              <p className="text-sm text-muted">{project.client}</p>
            </div>
            <div className="grid gap-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Progress</span>
                <span className="text-muted tabular-nums">
                  {project.progress}%
                </span>
              </div>
              <Progress
                value={project.progress}
                aria-label="Project progress"
              />
            </div>
            <Details
              rows={[
                ["Status", projectStatus[project.status]!.label],
                ["Lead", project.lead],
                ["Due date", project.due],
                ["Budget", rupiah(project.budget)],
                ["Tasks", project.tasks],
              ]}
            />
          </div>
        </Drawer>
      </Panel>
    </div>
  );
}

function CalendarPage() {
  const [events, setEvents] = useState(initialEvents);
  const [view, setView] = useState({ year: 2026, month: 10 });
  const [selected, setSelected] = useState(TODAY);
  const [draft, setDraft] = useState({
    title: "",
    date: TODAY,
    time: "09:00",
    kind: "Meeting",
  });
  const agenda = events[selected] ?? [];

  const shiftMonth = (step: number) => {
    const next = new Date(view.year, view.month + step, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  };
  const handleClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    const dialog = event.currentTarget;
    if (dialog.returnValue === "save") {
      const title = draft.title.trim() || "New event";
      const date = draft.date || selected;
      const [year = 2026, month = 1] = date.split("-").map(Number);
      const added = { time: draft.time, title, kind: draft.kind };
      setEvents({
        ...events,
        [date]: [...(events[date] ?? []), added].sort((a, b) =>
          a.time.localeCompare(b.time),
        ),
      });
      setSelected(date);
      setView({ year, month: month - 1 });
      toast({
        title: "Event added",
        description: `${title}, ${longDate(date)}`,
        variant: "success",
      });
    }
    dialog.returnValue = "";
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <Panel
        id="crm-month-title"
        title={`${monthNames[view.month]} ${view.year}`}
        sub="Meetings, calls, and visits"
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous month"
              className={cx(iconButton, "size-8")}
              onClick={() => shiftMonth(-1)}
            >
              <Icon name="prev" className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next month"
              className={cx(iconButton, "size-8")}
              onClick={() => shiftMonth(1)}
            >
              <Icon name="next" className="size-4" />
            </button>
            <Modal
              title="New event"
              onClose={handleClose}
              trigger={
                <Button
                  size="sm"
                  onClick={() =>
                    setDraft({ ...draft, title: "", date: selected })
                  }
                >
                  <Icon name="plus" className="size-4" />
                  New event
                </Button>
              }
              footer={
                <>
                  <Button variant="secondary" type="submit" value="cancel">
                    Cancel
                  </Button>
                  <Button type="submit" value="save">
                    Add event
                  </Button>
                </>
              }
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input
                    label="Title"
                    name="title"
                    value={draft.title}
                    onChange={(event) =>
                      setDraft({ ...draft, title: event.target.value })
                    }
                  />
                </div>
                <Input
                  label="Date"
                  type="date"
                  name="date"
                  value={draft.date}
                  onChange={(event) =>
                    setDraft({ ...draft, date: event.target.value })
                  }
                />
                <Input
                  label="Time"
                  type="time"
                  name="time"
                  value={draft.time}
                  onChange={(event) =>
                    setDraft({ ...draft, time: event.target.value })
                  }
                />
                <Select
                  label="Type"
                  name="kind"
                  value={draft.kind}
                  onChange={(event) =>
                    setDraft({ ...draft, kind: event.target.value })
                  }
                >
                  {eventKinds.map((kind) => (
                    <option key={kind}>{kind}</option>
                  ))}
                </Select>
              </div>
            </Modal>
          </div>
        }
      >
        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-line bg-line">
          {weekdays.map((weekday) => (
            <span
              key={weekday}
              aria-hidden="true"
              className="bg-subtle py-2 text-center text-xs font-medium text-muted"
            >
              {weekday}
            </span>
          ))}
          {monthCells(view.year, view.month).map((day, index) => {
            if (day === null)
              return <span key={`empty-${index}`} className="bg-canvas" />;
            const iso = isoDate(view.year, view.month, day);
            const list = events[iso] ?? [];
            return (
              <button
                key={iso}
                type="button"
                aria-pressed={iso === selected}
                className={cx(
                  dayCell,
                  iso === selected ? "bg-primary-soft" : "bg-surface",
                )}
                onClick={() => setSelected(iso)}
              >
                <span className="sr-only">
                  {`${monthNames[view.month]} ${day}, ${plural(list.length, "event")}`}
                </span>
                <span
                  aria-hidden="true"
                  className={cx(
                    dayNumber,
                    iso === TODAY && "bg-primary text-on-primary",
                  )}
                >
                  {day}
                </span>
                {list.length > 0 && (
                  <span
                    className="size-1.5 rounded-full bg-primary sm:hidden"
                    aria-hidden="true"
                  />
                )}
                {list.slice(0, 2).map((item) => (
                  <span
                    key={item.time + item.title}
                    className={cx(
                      chip,
                      "hidden w-full sm:block",
                      kindTones[item.kind],
                    )}
                  >
                    {item.title}
                  </span>
                ))}
                {list.length > 2 && (
                  <span className="hidden text-xs text-muted sm:block">
                    +{list.length - 2} more
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Panel>
      <Panel
        id="crm-agenda-title"
        title={longDate(selected)}
        sub={plural(agenda.length, "event")}
        className="content-start"
      >
        {agenda.length > 0 ? (
          <ul role="list" className="grid gap-2">
            {agenda.map((item) => (
              <li
                key={item.time + item.title}
                className="flex gap-3 rounded-xl border border-line p-3"
              >
                <span className="w-12 shrink-0 text-xs font-medium text-muted tabular-nums">
                  {item.time}
                </span>
                <span className="grid min-w-0 flex-1 gap-1">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className={cx(chip, "w-fit", kindTones[item.kind])}>
                    {item.kind}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-dashed border-line p-4 text-sm text-muted">
            No events on this day.
          </p>
        )}
      </Panel>
    </div>
  );
}

function ReportsPage() {
  const [periodId, setPeriodId] = useState("month");
  const period = reportPeriods.find((item) => item.value === periodId)!;
  const repPeak = Math.max(...period.reps);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="w-full sm:w-56">
          <Select
            label="Period"
            value={periodId}
            onChange={(event) => setPeriodId(event.target.value)}
          >
            {reportPeriods.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </div>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: "Report exported",
              description: `${period.label} sales report (PDF)`,
              variant: "success",
            })
          }
        >
          <Icon name="download" className="size-4" />
          Export PDF
        </Button>
      </div>
      <StatTiles items={period.kpis} className="sm:grid-cols-3" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Panel
          id="crm-report-chart"
          title="Revenue"
          sub={`${period.label}, in million Rupiah`}
        >
          <BarChart bars={period.bars} label={`Revenue ${period.label}`} />
        </Panel>
        <Panel
          id="crm-report-reps"
          title="Top sales reps"
          sub="Revenue in million Rupiah"
          className="content-start"
        >
          <ol className="grid gap-4">
            {reps.map((rep, index) => (
              <li
                key={rep}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5"
              >
                <Avatar name={rep} size="sm" className="row-span-2" />
                <span className="truncate font-medium">{rep}</span>
                <span className="font-semibold tabular-nums">
                  {formatNumber(period.reps[index]!)}
                </span>
                <div className="col-span-2 h-1.5 rounded-full bg-subtle">
                  <div
                    className="h-1.5 rounded-full bg-primary"
                    style={{
                      width: `${percentOf(period.reps[index]!, repPeak)}%`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </div>
  );
}

function FilesPage() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const visible = files.filter((file) =>
    file.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <Panel
      id="crm-files-title"
      title="Shared files"
      sub={`${visible.length} of ${files.length} files`}
      action={
        <Button
          size="sm"
          onClick={() =>
            toast({
              title: "Upload started",
              description: "Choose a file to add to Shared files",
            })
          }
        >
          <Icon name="upload" className="size-4" />
          Upload
        </Button>
      }
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <Icon
            name="search"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
          />
          <Input
            type="search"
            aria-label="Search files"
            placeholder="Search files"
            className="pl-9"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <ToggleGroup
          label="View"
          items={viewOptions.map((item) => ({
            ...item,
            label: <Icon name={item.value} />,
          }))}
          value={view}
          onValueChange={(value: string) =>
            setView(value === "list" || value === "grid" ? value : view)
          }
        />
      </div>
      {visible.length > 0 ? (
        <ul role="list" data-view={view} className={fileViews[view].list}>
          {visible.map((file) => (
            <li key={file.name} className={fileViews[view].item}>
              <span className={cx(fileKind, kindColors[file.kind])}>
                {file.kind}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{file.name}</span>
                <span className="block truncate text-xs text-muted">
                  {file.owner}
                </span>
              </span>
              <span className="text-xs text-muted tabular-nums">
                {file.size}, {file.updated}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted">
          No files match your search.
        </p>
      )}
    </Panel>
  );
}

function SettingsPage() {
  const [profile, setProfile] = useState(initialProfile);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);

  return (
    <form
      className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]"
      onSubmit={(event) => {
        event.preventDefault();
        toast({
          title: "Settings saved",
          description: `${profile.firstName} ${profile.lastName}, ${prefs.length} notifications on`,
          variant: "success",
        });
      }}
    >
      <Panel
        id="crm-profile-title"
        title="Profile"
        sub="How teammates and customers see you"
        className="content-start"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {profileFields.map((field) => (
            <Input
              key={field.key}
              label={field.label}
              type={field.type}
              name={field.key}
              value={profile[field.key]}
              onChange={(event) =>
                setProfile({ ...profile, [field.key]: event.target.value })
              }
            />
          ))}
          <Select
            label="Role"
            name="role"
            value={profile.role}
            onChange={(event) =>
              setProfile({ ...profile, role: event.target.value })
            }
          >
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </Select>
        </div>
      </Panel>
      <Panel
        id="crm-notify-title"
        title="Notifications"
        sub="Choose what reaches your inbox"
        className="content-start"
      >
        <ul className="divide-y divide-line">
          {notificationOptions.map((option) => (
            <li
              key={option.key}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div>
                <p className="font-medium">{option.label}</p>
                <p className="text-xs text-muted">{option.description}</p>
              </div>
              <Switch
                aria-label={option.label}
                name={option.key}
                checked={prefs.includes(option.key)}
                onCheckedChange={() => setPrefs(toggleIn(prefs, option.key))}
              />
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              setProfile(initialProfile);
              setPrefs(DEFAULT_PREFS);
            }}
          >
            Reset
          </Button>
          <Button type="submit">Save changes</Button>
        </div>
      </Panel>
    </form>
  );
}

const pageViews: Record<PageId, () => ReactNode> = {
  home: HomePage,
  customers: CustomersPage,
  deals: DealsPage,
  finance: FinancePage,
  growth: GrowthPage,
  projects: ProjectsPage,
  calendar: CalendarPage,
  reports: ReportsPage,
  files: FilesPage,
  settings: SettingsPage,
};

export default function Lumen() {
  const page = useSyncExternalStore(
    subscribeHash,
    readHash,
    () => DEFAULT_PAGE,
  );
  const PageView = pageViews[page];
  const go = (id: PageId) => window.location.assign(`#${id}`);
  const current = (id: PageId) => (page === id ? "page" : undefined);

  const menuButton = (id: PageId, icon?: IconName) => (
    <button
      key={id}
      type="submit"
      aria-current={current(id)}
      className={cx(menuItemBase, page === id ? navActive : menuItemIdle)}
      onClick={() => go(id)}
    >
      {icon && <Icon name={icon} />}
      {pages[id].label}
    </button>
  );

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 lg:px-6">
        <Drawer
          title="Menu"
          side="left"
          trigger={
            <button
              type="button"
              aria-label="Open menu"
              className={cx(iconButton, "lg:hidden")}
            >
              <Icon name="menu" />
            </button>
          }
        >
          <form method="dialog" className="grid gap-6">
            <div className="grid gap-1">
              <p className="px-3 text-xs font-medium text-muted">Pages</p>
              {topNav.map((id) => menuButton(id))}
            </div>
            <div className="grid gap-1">
              <p className="px-3 text-xs font-medium text-muted">Workspace</p>
              {railNav.map((item) => menuButton(item.id, item.icon))}
            </div>
          </form>
        </Drawer>
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-on-primary"
            aria-hidden="true"
          >
            L
          </span>
          <div className="min-w-0 leading-tight">
            <p className="flex items-center gap-1.5 text-base font-semibold tracking-tight">
              Lumen
              <span
                className="size-1.5 rounded-full bg-success"
                aria-hidden="true"
              />
            </p>
            <p className="truncate text-xs text-muted max-[390px]:hidden">
              Sales workspace
            </p>
          </div>
        </div>
        <nav
          aria-label="Main"
          className="mx-auto hidden items-center gap-1 rounded-full border border-line bg-canvas p-1 lg:flex"
        >
          {topNav.map((id) => (
            <button
              key={id}
              type="button"
              aria-current={current(id)}
              className={cx(pillBase, page === id ? navActive : pillIdle)}
              onClick={() => go(id)}
            >
              {pages[id].label}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            type="button"
            aria-label="Messages"
            className={iconButton}
            onClick={() =>
              toast({
                title: "No new messages",
                description: "Inbox is up to date",
              })
            }
          >
            <Icon name="message" />
          </button>
          <button
            type="button"
            aria-label="Notifications, 3 unread"
            className={iconButton}
            onClick={() =>
              toast({
                title: "3 unread notifications",
                description: "Rina Kusuma replied to your proposal",
              })
            }
          >
            <Icon name="bell" />
            <span
              className="absolute top-2 right-2.5 size-2 rounded-full bg-danger ring-2 ring-surface"
              aria-hidden="true"
            />
          </button>
          <Avatar name="Andi Wijaya" size="md" className="ml-1" />
        </div>
      </header>

      <div className="flex">
        <div className="hidden w-18 shrink-0 border-r border-line bg-surface lg:block">
          <nav
            aria-label="Workspace"
            className="sticky top-16 z-10 flex h-[calc(100dvh-4rem)] flex-col items-center gap-2 py-4"
          >
            {railNav.map((item) => (
              <span
                key={item.id}
                className={cx(
                  "group relative inline-flex",
                  item.id === "settings" && "mt-auto",
                )}
              >
                <button
                  type="button"
                  aria-label={pages[item.id].label}
                  aria-current={current(item.id)}
                  className={cx(
                    railBase,
                    page === item.id ? navActive : railIdle,
                  )}
                  onClick={() => go(item.id)}
                >
                  <Icon name={item.icon} />
                </button>
                <span aria-hidden="true" className={railTip}>
                  {pages[item.id].label}
                </span>
              </span>
            ))}
          </nav>
        </div>

        <main className="min-w-0 flex-1 p-4 lg:p-6">
          <div className="mb-6">
            <p className="text-sm text-muted">Lumen / {pages[page].label}</p>
            <h1
              id={TITLE_ID}
              tabIndex={-1}
              className="text-2xl font-semibold tracking-tight focus:outline-none"
            >
              {pages[page].title}
            </h1>
          </div>
          <PageView />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
