<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import Avatar from "../../../components/avatar/Avatar.svelte";
  import Badge from "../../../components/badge/Badge.svelte";
  import Button from "../../../components/button/Button.svelte";
  import Card from "../../../components/card/Card.svelte";
  import Checkbox from "../../../components/checkbox/Checkbox.svelte";
  import Drawer from "../../../components/drawer/Drawer.svelte";
  import DropdownMenu from "../../../components/dropdown-menu/DropdownMenu.svelte";
  import Input from "../../../components/input/Input.svelte";
  import Modal from "../../../components/modal/Modal.svelte";
  import Progress from "../../../components/progress/Progress.svelte";
  import Select from "../../../components/select/Select.svelte";
  import Switch from "../../../components/switch/Switch.svelte";
  import Tabs from "../../../components/tabs/Tabs.svelte";
  import Toaster, { toast } from "../../../components/toast/Toast.svelte";
  import ToggleGroup from "../../../components/toggle-group/ToggleGroup.svelte";

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
  const funnelSteps = [
    "Visitors",
    "Sign-ups",
    "Leads",
    "Qualified",
    "Customers",
  ];
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
  const reps = [
    "Budi Santoso",
    "Dewi Lestari",
    "Agus Pratama",
    "Fajar Nugroho",
  ];

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

  let page = $state<PageId>(DEFAULT_PAGE);
  const go = (id: PageId) => window.location.assign(`#${id}`);
  const current = (id: PageId) => (page === id ? "page" : undefined);

  /* Home */
  const percent = percentOf(TARGET.value, TARGET.goal);
  let done = $state([...DONE_TASKS]);

  /* Customers */
  let customers = $state(customerList.map((item) => ({ ...item })));
  let selectedId = $state("c1");
  let draft = $state({ ...customerList[0]! });
  let sort = $state("newest");
  let selectedDeal = $state("d1");
  const customer = $derived(customers.find((item) => item.id === selectedId)!);
  const fullName = $derived(`${customer.firstName} ${customer.lastName}`);
  const sortedHistory = $derived([...history].sort(sorters[sort]));

  function handleDrawerClose(
    event: Event & { currentTarget: HTMLDialogElement },
  ) {
    const dialog = event.currentTarget;
    if (dialog.returnValue === "save") {
      const saved = $state.snapshot(draft);
      customers = customers.map((item) =>
        item.id === saved.id ? saved : item,
      );
      toast({
        title: "Customer details saved",
        description: `${saved.firstName} ${saved.lastName}`,
        variant: "success",
      });
    }
    dialog.returnValue = "";
  }

  /* Deals */
  let deals = $state(pipeline.map((item) => ({ ...item })));
  let dealId = $state("k1");
  const deal = $derived(deals.find((item) => item.id === dealId)!);

  function moveTo(stage: string) {
    if (stage === deal.stage)
      return toast({ title: `Already in ${stage}`, description: deal.title });
    deals = deals.map((item) =>
      item.id === dealId ? { ...item, stage } : item,
    );
    toast({
      title: `Moved to ${stage}`,
      description: deal.title,
      variant: "success",
    });
  }

  /* Finance */
  let invoiceSort = $state<{ key: InvoiceKey; dir: number }>({
    key: "due",
    dir: 1,
  });
  const overdue = invoices.filter((invoice) => invoice.status === "Overdue");
  const invoiceRows = $derived(
    [...invoices].sort((a, b) => {
      const [x, y] = [a[invoiceSort.key], b[invoiceSort.key]];
      return (x < y ? -1 : x > y ? 1 : 0) * invoiceSort.dir;
    }),
  );
  const sortBy = (key: InvoiceKey) =>
    (invoiceSort = {
      key,
      dir: invoiceSort.key === key ? -invoiceSort.dir : 1,
    });
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

  /* Projects */
  let filter = $state("all");
  let projectId = $state("p1");
  const project = $derived(projects.find((item) => item.id === projectId)!);
  const visibleProjects = $derived(
    projects.filter((item) => filter === "all" || item.status === filter),
  );

  /* Calendar */
  let events = $state(structuredClone(initialEvents));
  let view = $state({ year: 2026, month: 10 });
  let selectedDay = $state(TODAY);
  let eventDraft = $state({
    title: "",
    date: TODAY,
    time: "09:00",
    kind: "Meeting",
  });
  const agenda = $derived(events[selectedDay] ?? []);

  function shiftMonth(step: number) {
    const next = new Date(view.year, view.month + step, 1);
    view = { year: next.getFullYear(), month: next.getMonth() };
  }

  function handleEventClose(
    event: Event & { currentTarget: HTMLDialogElement },
  ) {
    const dialog = event.currentTarget;
    if (dialog.returnValue === "save") {
      const title = eventDraft.title.trim() || "New event";
      const date = eventDraft.date || selectedDay;
      const [year = 2026, month = 1] = date.split("-").map(Number);
      const added = { time: eventDraft.time, title, kind: eventDraft.kind };
      events = {
        ...events,
        [date]: [...(events[date] ?? []), added].sort((a, b) =>
          a.time.localeCompare(b.time),
        ),
      };
      selectedDay = date;
      view = { year, month: month - 1 };
      toast({
        title: "Event added",
        description: `${title}, ${longDate(date)}`,
        variant: "success",
      });
    }
    dialog.returnValue = "";
  }

  /* Reports */
  let periodId = $state("month");
  const period = $derived(
    reportPeriods.find((item) => item.value === periodId)!,
  );
  const repPeak = $derived(Math.max(...period.reps));

  /* Files */
  let fileQuery = $state("");
  let fileView = $state<"grid" | "list">("grid");
  const visibleFiles = $derived(
    files.filter((file) =>
      file.name.toLowerCase().includes(fileQuery.trim().toLowerCase()),
    ),
  );

  /* Settings */
  let profile = $state({ ...initialProfile });
  let prefs = $state([...DEFAULT_PREFS]);

  function saveSettings(event: SubmitEvent) {
    event.preventDefault();
    toast({
      title: "Settings saved",
      description: `${profile.firstName} ${profile.lastName}, ${prefs.length} notifications on`,
      variant: "success",
    });
  }

  function resetSettings() {
    profile = { ...initialProfile };
    prefs = [...DEFAULT_PREFS];
  }

  /** Pindah halaman: state halaman direset, sama seperti React yang me-mount ulang. */
  function openPage(id: PageId) {
    page = id;
    done = [...DONE_TASKS];
    customers = customerList.map((item) => ({ ...item }));
    selectedId = "c1";
    draft = { ...customerList[0]! };
    sort = "newest";
    selectedDeal = "d1";
    deals = pipeline.map((item) => ({ ...item }));
    dealId = "k1";
    invoiceSort = { key: "due", dir: 1 };
    filter = "all";
    projectId = "p1";
    events = structuredClone(initialEvents);
    view = { year: 2026, month: 10 };
    selectedDay = TODAY;
    eventDraft = { title: "", date: TODAY, time: "09:00", kind: "Meeting" };
    periodId = "month";
    fileQuery = "";
    fileView = "grid";
    profile = { ...initialProfile };
    prefs = [...DEFAULT_PREFS];
  }

  // Browser API hanya disentuh setelah mount (onMount tidak berjalan saat SSR).
  onMount(() => {
    const onHashChange = () => {
      openPage(readHash());
      document.getElementById(TITLE_ID)?.focus();
    };
    openPage(readHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  });
</script>

{#snippet icon(name: IconName, className = "size-5")}
  <svg
    class={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d={icons[name]} />
  </svg>
{/snippet}

{#snippet panel(
  id: string,
  title: string,
  sub: string,
  body: Snippet,
  className?: string,
  action?: Snippet,
)}
  <Card aria-labelledby={id} class={className}>
    <div class="grid gap-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 {id} class="text-base font-semibold">{title}</h2>
          <p class="text-sm text-muted">{sub}</p>
        </div>
        {@render action?.()}
      </div>
      {@render body()}
    </div>
  </Card>
{/snippet}

{#snippet statTiles(items: Stat[], className: string)}
  <dl class={cx("grid gap-3", className)}>
    {#each items as stat (stat.label)}
      <div class={tile}>
        <dt class="text-xs text-muted">{stat.label}</dt>
        <dd class="mt-1 flex flex-wrap items-center gap-2">
          <span class="text-lg font-semibold tracking-tight tabular-nums"
            >{stat.value}</span
          >
          {#if stat.badge}
            <Badge variant={stat.variant ?? "success"}>{stat.badge}</Badge>
          {/if}
        </dd>
        {#if stat.note}<dd class="text-xs text-muted">{stat.note}</dd>{/if}
      </div>
    {/each}
  </dl>
{/snippet}

{#snippet details(rows: Row[])}
  <dl class="divide-y divide-line">
    {#each rows as [label, value] (label)}
      <div class="flex items-center justify-between gap-4 py-3">
        <dt class="shrink-0 text-muted">{label}</dt>
        <dd class="min-w-0 truncate text-right font-medium">{value}</dd>
      </div>
    {/each}
  </dl>
{/snippet}

{#snippet barChart(bars: Bar[], label: string)}
  {@const peak = Math.max(...bars.map((bar) => bar.value))}
  <div
    role="img"
    aria-label={`${label}: ${bars.map((bar) => `${bar.label} Rp ${bar.value} million`).join(", ")}`}
    class="flex h-56 items-stretch gap-2 sm:gap-3"
  >
    {#each bars as bar, index (bar.label)}
      <div data-bar class="flex min-w-0 flex-1 flex-col gap-2">
        <div class="relative flex-1">
          <span
            class="absolute inset-x-0 hidden text-center text-xs font-medium tabular-nums sm:block"
            style:bottom={`calc(${percentOf(bar.value, peak)}% + 4px)`}
            >{bar.value}</span
          >
          <div
            class={cx(
              "absolute inset-x-0 bottom-0 rounded-md",
              index === bars.length - 1 ? "bg-primary" : "bg-primary/30",
            )}
            style:height={`${percentOf(bar.value, peak)}%`}
          ></div>
        </div>
        <span class="truncate text-center text-xs text-muted">{bar.label}</span>
      </div>
    {/each}
  </div>
{/snippet}

{#snippet menuButton(id: PageId, iconName?: IconName)}
  <button
    type="submit"
    aria-current={current(id)}
    class={cx(menuItemBase, page === id ? navActive : menuItemIdle)}
    onclick={() => go(id)}
  >
    {#if iconName}{@render icon(iconName)}{/if}
    {pages[id].label}
  </button>
{/snippet}

{#snippet funnelMode(mode: (typeof funnel)[number])}
  <div class="grid gap-4">
    <div>
      <p class="text-2xl font-semibold tracking-tight tabular-nums">
        {mode.total}
      </p>
      <p class="text-xs text-muted">{mode.caption}</p>
    </div>
    <ol class="grid gap-3" aria-label={`${mode.caption} by stage`}>
      {#each mode.steps as step, index (step.label)}
        <li class="grid gap-1.5">
          <div class="flex items-baseline justify-between gap-3">
            <span class="font-medium"
              >{step.label}<span class="ml-2 text-xs font-normal text-muted"
                >{step.deals} deals</span
              ></span
            >
            <span class="font-semibold tabular-nums">{step.value}</span>
          </div>
          <div class="h-6 rounded-md bg-subtle">
            <div
              class={cx("mx-auto h-6 rounded-md", barTones[index])}
              style:width={`${step.width}%`}
            ></div>
          </div>
        </li>
      {/each}
    </ol>
  </div>
{/snippet}
{#snippet weightedFunnel()}{@render funnelMode(funnel[0]!)}{/snippet}
{#snippet totalFunnel()}{@render funnelMode(funnel[1]!)}{/snippet}

{#snippet growthPeriod(period: (typeof growthPeriods)[number])}
  {#snippet funnelBody()}
    <ol class="grid gap-3">
      {#each period.funnel as count, index (funnelSteps[index])}
        <li class="grid gap-1.5">
          <div class="flex items-baseline justify-between gap-3">
            <span class="font-medium">{funnelSteps[index]}</span>
            <span class="tabular-nums"
              ><span class="font-semibold">{formatNumber(count)}</span
              >{#if index > 0}<span class="ml-2 text-xs text-muted"
                  >{percentOf(count, period.funnel[index - 1]!)}%</span
                >{/if}</span
            >
          </div>
          <div class="h-3 rounded-full bg-subtle">
            <div
              class="h-3 rounded-full bg-primary"
              style:width={`${Math.round(Math.sqrt(count / period.funnel[0]!) * 100)}%`}
            ></div>
          </div>
        </li>
      {/each}
    </ol>
  {/snippet}
  {#snippet sourcesBody()}
    <div
      role="img"
      aria-label={`Lead sources: ${period.sources.map((share, index) => `${leadSources[index]} ${share}%`).join(", ")}`}
      class="flex h-3 gap-1 overflow-hidden rounded-full"
    >
      {#each period.sources as share, index (leadSources[index])}
        <div class={sourceTones[index]} style:width={`${share}%`}></div>
      {/each}
    </div>
    <ul class="grid gap-3">
      {#each period.sources as share, index (leadSources[index])}
        <li class="flex items-center gap-3">
          <span
            class={cx("size-2.5 rounded-full", sourceTones[index])}
            aria-hidden="true"
          ></span>
          <span class="flex-1">{leadSources[index]}</span>
          <span class="font-semibold tabular-nums">{share}%</span>
        </li>
      {/each}
    </ul>
  {/snippet}
  <div class="grid gap-6">
    {@render statTiles(period.metrics, "sm:grid-cols-2 xl:grid-cols-4")}
    <div class="grid gap-6 lg:grid-cols-2">
      {@render panel(
        `crm-funnel-${period.value}`,
        "Acquisition funnel",
        `Last ${period.label}`,
        funnelBody,
      )}
      {@render panel(
        `crm-sources-${period.value}`,
        "Lead sources",
        "Share of new leads",
        sourcesBody,
      )}
    </div>
  </div>
{/snippet}
{#snippet growth7()}{@render growthPeriod(growthPeriods[0]!)}{/snippet}
{#snippet growth30()}{@render growthPeriod(growthPeriods[1]!)}{/snippet}
{#snippet growth90()}{@render growthPeriod(growthPeriods[2]!)}{/snippet}

{#snippet gridIcon()}{@render icon("grid")}{/snippet}
{#snippet listIcon()}{@render icon("list")}{/snippet}

<div class="min-h-dvh bg-canvas text-ink">
  <header
    class="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 lg:px-6"
  >
    <Drawer title="Menu" side="left">
      {#snippet trigger()}
        <button
          type="button"
          aria-label="Open menu"
          class={cx(iconButton, "lg:hidden")}>{@render icon("menu")}</button
        >
      {/snippet}
      <form method="dialog" class="grid gap-6">
        <div class="grid gap-1">
          <p class="px-3 text-xs font-medium text-muted">Pages</p>
          {#each topNav as id (id)}{@render menuButton(id)}{/each}
        </div>
        <div class="grid gap-1">
          <p class="px-3 text-xs font-medium text-muted">Workspace</p>
          {#each railNav as item (item.id)}{@render menuButton(
              item.id,
              item.icon,
            )}{/each}
        </div>
      </form>
    </Drawer>
    <div class="flex min-w-0 items-center gap-3">
      <span
        class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-on-primary"
        aria-hidden="true">L</span
      >
      <div class="min-w-0 leading-tight">
        <p
          class="flex items-center gap-1.5 text-base font-semibold tracking-tight"
        >
          Lumen
          <span class="size-1.5 rounded-full bg-success" aria-hidden="true"
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
      {#each topNav as id (id)}
        <button
          type="button"
          aria-current={current(id)}
          class={cx(pillBase, page === id ? navActive : pillIdle)}
          onclick={() => go(id)}>{pages[id].label}</button
        >
      {/each}
    </nav>
    <div class="ml-auto flex items-center gap-2 lg:ml-0">
      <button
        type="button"
        aria-label="Messages"
        class={iconButton}
        onclick={() =>
          toast({
            title: "No new messages",
            description: "Inbox is up to date",
          })}>{@render icon("message")}</button
      >
      <button
        type="button"
        aria-label="Notifications, 3 unread"
        class={iconButton}
        onclick={() =>
          toast({
            title: "3 unread notifications",
            description: "Rina Kusuma replied to your proposal",
          })}
      >
        {@render icon("bell")}
        <span
          class="absolute top-2 right-2.5 size-2 rounded-full bg-danger ring-2 ring-surface"
          aria-hidden="true"
        ></span>
      </button>
      <Avatar name="Andi Wijaya" size="md" class="ml-1" />
    </div>
  </header>

  <div class="flex">
    <div class="hidden w-18 shrink-0 border-r border-line bg-surface lg:block">
      <nav
        aria-label="Workspace"
        class="sticky top-16 z-10 flex h-[calc(100dvh-4rem)] flex-col items-center gap-2 py-4"
      >
        {#each railNav as item (item.id)}
          <span
            class={cx(
              "group relative inline-flex",
              item.id === "settings" && "mt-auto",
            )}
          >
            <button
              type="button"
              aria-label={pages[item.id].label}
              aria-current={current(item.id)}
              class={cx(railBase, page === item.id ? navActive : railIdle)}
              onclick={() => go(item.id)}>{@render icon(item.icon)}</button
            >
            <span aria-hidden="true" class={railTip}
              >{pages[item.id].label}</span
            >
          </span>
        {/each}
      </nav>
    </div>

    <main class="min-w-0 flex-1 p-4 lg:p-6">
      <div class="mb-6">
        <p class="text-sm text-muted">Lumen / {pages[page].label}</p>
        <h1
          id={TITLE_ID}
          tabindex="-1"
          class="text-2xl font-semibold tracking-tight focus:outline-none"
        >
          {pages[page].title}
        </h1>
      </div>

      {#if page === "home"}
        {#snippet targetBody()}
          <div
            class="grid items-center gap-6 sm:grid-cols-[160px_minmax(0,1fr)]"
          >
            <div
              role="img"
              aria-label={`${percent}% of the monthly revenue target reached`}
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
                  stroke-dasharray={`${percent} 100`}
                  class="stroke-primary"
                />
              </svg>
              <div
                class="absolute inset-0 grid place-content-center text-center"
              >
                <span class="text-3xl font-semibold tracking-tight tabular-nums"
                  >{percent}%</span
                >
                <span class="text-xs text-muted">of target</span>
              </div>
            </div>
            <div class="grid gap-4">
              <div>
                <p class="text-2xl font-semibold tracking-tight tabular-nums">
                  {rupiah(TARGET.value)}
                </p>
                <p class="text-sm text-muted">
                  of {rupiah(TARGET.goal)}, {rupiah(TARGET.goal - TARGET.value)} to
                  go
                </p>
              </div>
              {#each goals as goal (goal.label)}
                <Progress
                  label={goal.label}
                  value={goal.value}
                  max={goal.max}
                />
              {/each}
            </div>
          </div>
        {/snippet}
        {#snippet activityBody()}
          <ol class="grid gap-4">
            {#each activity as item (item.when)}
              <li class="flex items-start gap-3">
                <Avatar name={item.who} size="sm" />
                <div class="min-w-0 flex-1">
                  <p>
                    <span class="font-medium">{item.who}</span>
                    {item.what}
                  </p>
                  <p class="text-xs text-muted">{item.when}</p>
                </div>
              </li>
            {/each}
          </ol>
        {/snippet}
        {#snippet tasksBody()}
          <Progress
            value={done.length}
            max={todayTasks.length}
            aria-label="Tasks completed"
          />
          <ul class="grid gap-3">
            {#each todayTasks as task (task.id)}
              <li class="rounded-xl border border-line p-3">
                <Checkbox
                  label={task.title}
                  description={task.time}
                  checked={done.includes(task.id)}
                  onchange={() => (done = toggleIn(done, task.id))}
                />
              </li>
            {/each}
          </ul>
        {/snippet}
        <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div class="grid content-start gap-6">
            {@render panel(
              "crm-target-title",
              "Monthly target",
              "November 2026",
              targetBody,
            )}
            {@render panel(
              "crm-activity-title",
              "Recent activity",
              "Latest updates from your team",
              activityBody,
            )}
          </div>
          {@render panel(
            "crm-today-title",
            "Today's tasks",
            `${done.length} of ${todayTasks.length} done`,
            tasksBody,
            "content-start",
          )}
        </div>
      {:else if page === "customers"}
        {#snippet listBody()}
          <ul class="-mx-3 grid gap-1">
            {#each customers as item (item.id)}
              {@const selected = item.id === selectedId}
              <li
                class={cx(
                  listRow,
                  selected ? "bg-primary-soft" : "hover:bg-subtle",
                )}
              >
                <Avatar name={`${item.firstName} ${item.lastName}`} size="sm" />
                <div class="min-w-0 flex-1">
                  <button
                    type="button"
                    aria-pressed={selected}
                    class={cx(selectable, "block truncate text-sm font-medium")}
                    onclick={() => (selectedId = item.id)}
                    >{item.firstName} {item.lastName}</button
                  >
                  <p class="truncate text-xs text-muted">{item.company}</p>
                </div>
              </li>
            {/each}
          </ul>
        {/snippet}
        {#snippet sortMenu()}
          <DropdownMenu
            items={sortOptions}
            onselect={(value) => (sort = value)}
          >
            {#snippet trigger()}
              <span class="text-muted">Sort:</span>
              <span
                >{sortOptions.find((option) => option.value === sort)
                  ?.label}</span
              >
            {/snippet}
          </DropdownMenu>
        {/snippet}
        {#snippet historyBody()}
          <ul role="list" class="grid gap-4 sm:grid-cols-2">
            {#each sortedHistory as item (item.id)}
              {@const selected = selectedDeal === item.id}
              {@const muted = selected ? "text-on-primary" : "text-muted"}
              <li
                data-deal={item.id}
                class={cx(dealBase, selected ? dealSelected : dealIdle)}
              >
                <time
                  datetime={item.date}
                  class={cx("text-xs font-medium", muted)}
                  >{shortDate(item.date)}</time
                >
                <h3 class="text-sm leading-snug font-semibold">
                  <button
                    type="button"
                    aria-pressed={selected}
                    class={selectable}
                    onclick={() => (selectedDeal = item.id)}
                    >{item.title}</button
                  >
                </h3>
                <p
                  class="mt-auto text-xl font-semibold tracking-tight tabular-nums"
                >
                  {rupiah(item.value)}
                </p>
                <div class="flex items-center justify-between gap-2">
                  <div class="flex -space-x-1">
                    {#each item.team as member (member)}
                      <Avatar
                        name={member}
                        size="sm"
                        class="ring-2 ring-surface"
                      />
                    {/each}
                  </div>
                  <span class={cx("text-xs font-medium", muted)}
                    >{item.stage}</span
                  >
                </div>
              </li>
            {/each}
          </ul>
        {/snippet}
        {#snippet funnelBody()}
          <Tabs
            defaultValue="weighted"
            items={[
              {
                value: funnel[0]!.value,
                label: funnel[0]!.label,
                content: weightedFunnel,
              },
              {
                value: funnel[1]!.value,
                label: funnel[1]!.label,
                content: totalFunnel,
              },
            ]}
          />
        {/snippet}
        {#snippet editDrawer()}
          <Drawer title="Edit customer details" onclose={handleDrawerClose}>
            {#snippet trigger()}
              <Button
                variant="secondary"
                size="sm"
                onclick={() => (draft = { ...customer })}
              >
                {@render icon("pencil", "size-4")}
                Edit
              </Button>
            {/snippet}
            <div class="grid gap-4">
              {#each formFields as field (field.key)}
                <Input
                  label={field.label}
                  type={field.type}
                  name={field.key}
                  bind:value={draft[field.key]}
                />
              {/each}
            </div>
            {#snippet footer()}
              <Button variant="secondary" type="submit" value="cancel"
                >Cancel</Button
              >
              <Button type="submit" value="save">Save changes</Button>
            {/snippet}
          </Drawer>
        {/snippet}
        {#snippet detailsBody()}
          {@render details(
            infoRows.map((row): Row => [row.label, customer[row.key]]),
          )}
        {/snippet}
        <div class="grid gap-6">
          {@render statTiles(stats, "sm:grid-cols-3")}
          <div
            class="grid items-start gap-6 xl:grid-cols-[260px_minmax(0,1fr)_360px]"
          >
            {@render panel(
              "crm-list-title",
              "Customers",
              `${customers.length} accounts`,
              listBody,
              "content-start",
            )}

            <div class="grid gap-6">
              {@render panel(
                "crm-history-title",
                "Interaction history",
                `${history.length} deals with ${customer.firstName} this quarter`,
                historyBody,
                "content-start",
                sortMenu,
              )}
              {@render panel(
                "crm-funnel-title",
                "Stage funnel",
                "Open pipeline by stage",
                funnelBody,
              )}
            </div>

            <div class="grid content-start gap-6">
              <Card aria-labelledby="crm-profile-name">
                <div class="grid justify-items-center gap-4 text-center">
                  <Avatar name={fullName} size="lg" class="size-16! text-xl!" />
                  <div class="grid gap-1">
                    <h2 id="crm-profile-name" class="text-lg font-semibold">
                      {fullName}
                    </h2>
                    <p class="text-sm text-muted">{customer.role}</p>
                    <p
                      class="flex flex-wrap items-center justify-center gap-2 text-sm font-medium"
                    >
                      {customer.company}
                      <Badge variant={tierVariant[customer.tier]}
                        >{customer.tier}</Badge
                      >
                    </p>
                  </div>
                  <div class="flex justify-center gap-3">
                    {#each profileActions as action (action.label)}
                      <button
                        type="button"
                        aria-label={action.label}
                        class={iconButton}
                        onclick={() =>
                          toast({
                            title: action.label,
                            description: `${fullName}, ${customer.company}`,
                          })}>{@render icon(action.icon)}</button
                      >
                    {/each}
                  </div>
                </div>
              </Card>

              {@render panel(
                "crm-details-title",
                "Detailed information",
                `Updated ${customer.lastContacted}`,
                detailsBody,
                undefined,
                editDrawer,
              )}
            </div>
          </div>
        </div>
      {:else if page === "deals"}
        {#snippet dealBody()}
          <div class="grid gap-1">
            <p class="font-semibold">{deal.title}</p>
            <p class="text-2xl font-semibold tracking-tight tabular-nums">
              {rupiah(deal.value)}
            </p>
          </div>
          {@render details([
            ["Stage", deal.stage],
            ["Owner", deal.owner],
            ["Expected close", deal.due],
          ])}
          <DropdownMenu
            items={stageItems}
            onselect={moveTo}
            label="Move to stage"
            class="[&>button]:w-full"
          />
        {/snippet}
        <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div class="grid content-start gap-4 md:grid-cols-2 lg:grid-cols-4">
            {#each stages as stage (stage)}
              {@const column = deals.filter((item) => item.stage === stage)}
              <section
                aria-labelledby={`crm-stage-${stage}`}
                data-stage={stage}
                class="grid content-start gap-3 rounded-2xl bg-subtle p-3"
              >
                <div class="px-1">
                  <h2
                    id={`crm-stage-${stage}`}
                    class="flex items-center justify-between gap-2 text-sm font-semibold"
                  >
                    {stage}
                    <span
                      class="rounded-full bg-surface px-2 text-xs font-medium tabular-nums"
                      >{column.length}</span
                    >
                  </h2>
                  <p data-total class="text-xs text-muted tabular-nums">
                    {rupiah(column.reduce((sum, item) => sum + item.value, 0))}
                  </p>
                </div>
                {#each column as item (item.id)}
                  <article
                    class={cx(
                      kanbanCard,
                      item.id === dealId
                        ? "border-primary ring-1 ring-primary"
                        : "border-line hover:border-primary-line",
                    )}
                  >
                    <h3 class="text-sm leading-snug font-semibold">
                      <button
                        type="button"
                        aria-pressed={item.id === dealId}
                        class={selectable}
                        onclick={() => (dealId = item.id)}>{item.title}</button
                      >
                    </h3>
                    <p class="-mt-2 truncate text-xs text-muted">
                      {item.company}
                    </p>
                    <div class="flex items-center justify-between gap-2">
                      <span class="text-sm font-semibold tabular-nums"
                        >{rupiah(item.value)}</span
                      >
                      <Avatar
                        name={item.owner}
                        size="sm"
                        class="size-6! text-[10px]!"
                      />
                    </div>
                  </article>
                {/each}
                {#if column.length === 0}
                  <p
                    class="rounded-xl border border-dashed border-line p-3 text-center text-xs text-muted"
                  >
                    No deals
                  </p>
                {/if}
              </section>
            {/each}
          </div>
          {@render panel(
            "crm-deal-title",
            "Deal details",
            deal.company,
            dealBody,
            "content-start",
          )}
        </div>
      {:else if page === "finance"}
        {#snippet remindAction()}
          <Button size="sm" onclick={remindOverdue}>
            {@render icon("send", "size-4")}
            Send reminders
          </Button>
        {/snippet}
        {#snippet invoicesBody()}
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <div
            tabindex="0"
            role="region"
            aria-label="Invoices"
            class={tableWrap}
          >
            <table class="w-full border-collapse text-sm">
              <thead>
                <tr class="bg-subtle text-left text-muted">
                  <th scope="col" class={th}>Invoice</th>
                  {#each invoiceColumns as column (column.key)}
                    {@const active = invoiceSort.key === column.key}
                    <th
                      scope="col"
                      aria-sort={active
                        ? invoiceSort.dir === 1
                          ? "ascending"
                          : "descending"
                        : undefined}
                      class={cx(th, column.align)}
                    >
                      <button
                        type="button"
                        class={thButton}
                        onclick={() => sortBy(column.key)}
                      >
                        {column.label}
                        {@render icon(
                          active ? "up" : "sort",
                          cx(
                            "size-3.5",
                            active && invoiceSort.dir === -1 && "rotate-180",
                          ),
                        )}
                      </button>
                    </th>
                  {/each}
                  <th scope="col" class={th}>Status</th>
                  <th scope="col" class={th}
                    ><span class="sr-only">Actions</span></th
                  >
                </tr>
              </thead>
              <tbody>
                {#each invoiceRows as invoice (invoice.id)}
                  <tr
                    data-row={invoice.id}
                    class="h-14 border-t border-line hover:bg-subtle/50"
                  >
                    <td class={cx(td, "font-medium")}>{invoice.id}</td>
                    <td class={td}>{invoice.customer}</td>
                    <td class={cx(td, "text-muted")}
                      >{shortDate(invoice.due)}</td
                    >
                    <td class={cx(td, "text-right font-medium tabular-nums")}
                      >{rupiah(invoice.amount)}</td
                    >
                    <td class={td}>
                      <Badge variant={statusVariant[invoice.status]}
                        >{invoice.status}</Badge
                      >
                    </td>
                    <td class={cx(td, "text-right")}>
                      {#if invoice.status !== "Paid"}
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label={`Remind ${invoice.id}`}
                          onclick={() => remind(invoice)}>Remind</Button
                        >
                      {/if}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/snippet}
        {#snippet revenueBody()}
          {@render barChart(revenue, "Monthly revenue")}
          <p class="text-sm text-muted">
            November is <span class="font-semibold text-ink">12.4%</span> above October.
          </p>
        {/snippet}
        <div class="grid gap-6">
          {@render statTiles(financeStats, "sm:grid-cols-2 xl:grid-cols-4")}
          <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            {@render panel(
              "crm-invoices-title",
              "Invoices",
              "Sort by customer, due date, or amount",
              invoicesBody,
              undefined,
              remindAction,
            )}
            {@render panel(
              "crm-revenue-title",
              "Revenue",
              "Last 6 months, in million Rupiah",
              revenueBody,
              "content-start",
            )}
          </div>
        </div>
      {:else if page === "growth"}
        <Tabs
          defaultValue="30d"
          items={[
            {
              value: growthPeriods[0]!.value,
              label: growthPeriods[0]!.label,
              content: growth7,
            },
            {
              value: growthPeriods[1]!.value,
              label: growthPeriods[1]!.label,
              content: growth30,
            },
            {
              value: growthPeriods[2]!.value,
              label: growthPeriods[2]!.label,
              content: growth90,
            },
          ]}
        />
      {:else if page === "projects"}
        {#snippet filterAction()}
          <ToggleGroup
            label="Filter by status"
            items={projectFilters}
            bind:value={
              () => filter, (value) => (filter = String(value || filter))
            }
          />
        {/snippet}
        {#snippet projectsBody()}
          <Drawer title="Project details">
            {#snippet trigger()}
              <ul class="-mx-3 grid gap-1">
                {#each visibleProjects as item (item.id)}
                  <li data-project={item.id}>
                    <button
                      type="button"
                      class={projectRow}
                      onclick={() => (projectId = item.id)}
                    >
                      <span class="min-w-0">
                        <span class="block truncate font-medium"
                          >{item.name}</span
                        >
                        <span class="block truncate text-xs text-muted"
                          >{item.client}</span
                        >
                      </span>
                      <span>
                        <Badge variant={projectStatus[item.status]!.variant}
                          >{projectStatus[item.status]!.label}</Badge
                        >
                      </span>
                      <span
                        class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"
                      >
                        <Progress
                          value={item.progress}
                          aria-label={`${item.name} progress`}
                        />
                        <span
                          class="w-10 shrink-0 text-right text-xs text-muted tabular-nums"
                          >{item.progress}%</span
                        >
                      </span>
                      <span class="text-xs text-muted md:text-right"
                        >Due {item.due}</span
                      >
                    </button>
                  </li>
                {/each}
              </ul>
            {/snippet}
            <div class="grid gap-5 text-ink">
              <div>
                <h3 class="text-base font-semibold">{project.name}</h3>
                <p class="text-sm text-muted">{project.client}</p>
              </div>
              <div class="grid gap-1.5">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">Progress</span>
                  <span class="text-muted tabular-nums"
                    >{project.progress}%</span
                  >
                </div>
                <Progress
                  value={project.progress}
                  aria-label="Project progress"
                />
              </div>
              {@render details([
                ["Status", projectStatus[project.status]!.label],
                ["Lead", project.lead],
                ["Due date", project.due],
                ["Budget", rupiah(project.budget)],
                ["Tasks", project.tasks],
              ])}
            </div>
            {#snippet footer()}
              <Button variant="secondary" type="submit">Close</Button>
            {/snippet}
          </Drawer>
        {/snippet}
        <div class="grid gap-6">
          {@render statTiles(projectStats, "sm:grid-cols-3")}
          {@render panel(
            "crm-projects-title",
            "All projects",
            plural(visibleProjects.length, "project"),
            projectsBody,
            undefined,
            filterAction,
          )}
        </div>
      {:else if page === "calendar"}
        {#snippet monthAction()}
          <div class="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous month"
              class={cx(iconButton, "size-8")}
              onclick={() => shiftMonth(-1)}
              >{@render icon("prev", "size-4")}</button
            >
            <button
              type="button"
              aria-label="Next month"
              class={cx(iconButton, "size-8")}
              onclick={() => shiftMonth(1)}
              >{@render icon("next", "size-4")}</button
            >
            <Modal title="New event" onclose={handleEventClose}>
              {#snippet trigger()}
                <Button
                  size="sm"
                  onclick={() =>
                    (eventDraft = {
                      ...eventDraft,
                      title: "",
                      date: selectedDay,
                    })}
                >
                  {@render icon("plus", "size-4")}
                  New event
                </Button>
              {/snippet}
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <Input
                    label="Title"
                    name="title"
                    bind:value={eventDraft.title}
                  />
                </div>
                <Input
                  label="Date"
                  type="date"
                  name="date"
                  bind:value={eventDraft.date}
                />
                <Input
                  label="Time"
                  type="time"
                  name="time"
                  bind:value={eventDraft.time}
                />
                <Select label="Type" name="kind" bind:value={eventDraft.kind}>
                  {#each eventKinds as kind (kind)}<option>{kind}</option
                    >{/each}
                </Select>
              </div>
              {#snippet footer()}
                <Button variant="secondary" type="submit" value="cancel"
                  >Cancel</Button
                >
                <Button type="submit" value="save">Add event</Button>
              {/snippet}
            </Modal>
          </div>
        {/snippet}
        {#snippet monthBody()}
          <div
            class="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-line bg-line"
          >
            {#each weekdays as weekday (weekday)}
              <span
                aria-hidden="true"
                class="bg-subtle py-2 text-center text-xs font-medium text-muted"
                >{weekday}</span
              >
            {/each}
            {#each monthCells(view.year, view.month) as day, index (`${view.year}-${view.month}-${index}`)}
              {#if day === null}
                <span class="bg-canvas"></span>
              {:else}
                {@const iso = isoDate(view.year, view.month, day)}
                {@const list = events[iso] ?? []}
                <button
                  type="button"
                  aria-pressed={iso === selectedDay}
                  class={cx(
                    dayCell,
                    iso === selectedDay ? "bg-primary-soft" : "bg-surface",
                  )}
                  onclick={() => (selectedDay = iso)}
                >
                  <span class="sr-only"
                    >{`${monthNames[view.month]} ${day}, ${plural(list.length, "event")}`}</span
                  >
                  <span
                    aria-hidden="true"
                    class={cx(
                      dayNumber,
                      iso === TODAY && "bg-primary text-on-primary",
                    )}>{day}</span
                  >
                  {#if list.length > 0}
                    <span
                      class="size-1.5 rounded-full bg-primary sm:hidden"
                      aria-hidden="true"
                    ></span>
                  {/if}
                  {#each list.slice(0, 2) as item (item.time + item.title)}
                    <span
                      class={cx(
                        chip,
                        "hidden w-full sm:block",
                        kindTones[item.kind],
                      )}>{item.title}</span
                    >
                  {/each}
                  {#if list.length > 2}
                    <span class="hidden text-xs text-muted sm:block"
                      >+{list.length - 2} more</span
                    >
                  {/if}
                </button>
              {/if}
            {/each}
          </div>
        {/snippet}
        {#snippet agendaBody()}
          {#if agenda.length > 0}
            <ul role="list" class="grid gap-2">
              {#each agenda as item (item.time + item.title)}
                <li class="flex gap-3 rounded-xl border border-line p-3">
                  <span
                    class="w-12 shrink-0 text-xs font-medium text-muted tabular-nums"
                    >{item.time}</span
                  >
                  <span class="grid min-w-0 flex-1 gap-1">
                    <span class="text-sm font-medium">{item.title}</span>
                    <span class={cx(chip, "w-fit", kindTones[item.kind])}
                      >{item.kind}</span
                    >
                  </span>
                </li>
              {/each}
            </ul>
          {:else}
            <p
              class="rounded-xl border border-dashed border-line p-4 text-sm text-muted"
            >
              No events on this day.
            </p>
          {/if}
        {/snippet}
        <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {@render panel(
            "crm-month-title",
            `${monthNames[view.month]} ${view.year}`,
            "Meetings, calls, and visits",
            monthBody,
            undefined,
            monthAction,
          )}
          {@render panel(
            "crm-agenda-title",
            longDate(selectedDay),
            plural(agenda.length, "event"),
            agendaBody,
            "content-start",
          )}
        </div>
      {:else if page === "reports"}
        {#snippet chartBody()}
          {@render barChart(period.bars, `Revenue ${period.label}`)}
        {/snippet}
        {#snippet repsBody()}
          <ol class="grid gap-4">
            {#each reps as rep, index (rep)}
              <li
                class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5"
              >
                <Avatar name={rep} size="sm" class="row-span-2" />
                <span class="truncate font-medium">{rep}</span>
                <span class="font-semibold tabular-nums"
                  >{formatNumber(period.reps[index]!)}</span
                >
                <div class="col-span-2 h-1.5 rounded-full bg-subtle">
                  <div
                    class="h-1.5 rounded-full bg-primary"
                    style:width={`${percentOf(period.reps[index]!, repPeak)}%`}
                  ></div>
                </div>
              </li>
            {/each}
          </ol>
        {/snippet}
        <div class="grid gap-6">
          <div class="flex flex-wrap items-end justify-between gap-3">
            <div class="w-full sm:w-56">
              <Select label="Period" bind:value={periodId}>
                {#each reportPeriods as item (item.value)}
                  <option value={item.value}>{item.label}</option>
                {/each}
              </Select>
            </div>
            <Button
              variant="secondary"
              onclick={() =>
                toast({
                  title: "Report exported",
                  description: `${period.label} sales report (PDF)`,
                  variant: "success",
                })}
            >
              {@render icon("download", "size-4")}
              Export PDF
            </Button>
          </div>
          {@render statTiles(period.kpis, "sm:grid-cols-3")}
          <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            {@render panel(
              "crm-report-chart",
              "Revenue",
              `${period.label}, in million Rupiah`,
              chartBody,
            )}
            {@render panel(
              "crm-report-reps",
              "Top sales reps",
              "Revenue in million Rupiah",
              repsBody,
              "content-start",
            )}
          </div>
        </div>
      {:else if page === "files"}
        {#snippet uploadAction()}
          <Button
            size="sm"
            onclick={() =>
              toast({
                title: "Upload started",
                description: "Choose a file to add to Shared files",
              })}
          >
            {@render icon("upload", "size-4")}
            Upload
          </Button>
        {/snippet}
        {#snippet filesBody()}
          <div class="flex flex-wrap items-center gap-3">
            <div class="relative min-w-0 flex-1 sm:max-w-sm">
              {@render icon(
                "search",
                "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted",
              )}
              <Input
                type="search"
                aria-label="Search files"
                placeholder="Search files"
                class="pl-9"
                bind:value={fileQuery}
              />
            </div>
            <ToggleGroup
              label="View"
              items={viewOptions.map((item) => ({
                ...item,
                label: item.value === "grid" ? gridIcon : listIcon,
              }))}
              bind:value={
                () => fileView,
                (value) =>
                  (fileView =
                    value === "list" || value === "grid" ? value : fileView)
              }
            />
          </div>
          {#if visibleFiles.length > 0}
            <ul
              role="list"
              data-view={fileView}
              class={fileViews[fileView].list}
            >
              {#each visibleFiles as file (file.name)}
                <li class={fileViews[fileView].item}>
                  <span class={cx(fileKind, kindColors[file.kind])}
                    >{file.kind}</span
                  >
                  <span class="min-w-0 flex-1">
                    <span class="block truncate font-medium">{file.name}</span>
                    <span class="block truncate text-xs text-muted"
                      >{file.owner}</span
                    >
                  </span>
                  <span class="text-xs text-muted tabular-nums"
                    >{file.size}, {file.updated}</span
                  >
                </li>
              {/each}
            </ul>
          {:else}
            <p
              class="rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted"
            >
              No files match your search.
            </p>
          {/if}
        {/snippet}
        {@render panel(
          "crm-files-title",
          "Shared files",
          `${visibleFiles.length} of ${files.length} files`,
          filesBody,
          undefined,
          uploadAction,
        )}
      {:else}
        {#snippet profileBody()}
          <div class="grid gap-4 sm:grid-cols-2">
            {#each profileFields as field (field.key)}
              <Input
                label={field.label}
                type={field.type}
                name={field.key}
                bind:value={profile[field.key]}
              />
            {/each}
            <Select label="Role" name="role" bind:value={profile.role}>
              {#each roles as role (role)}<option>{role}</option>{/each}
            </Select>
          </div>
        {/snippet}
        {#snippet notifyBody()}
          <ul class="divide-y divide-line">
            {#each notificationOptions as option (option.key)}
              <li class="flex items-center justify-between gap-4 py-3">
                <div>
                  <p class="font-medium">{option.label}</p>
                  <p class="text-xs text-muted">{option.description}</p>
                </div>
                <Switch
                  aria-label={option.label}
                  name={option.key}
                  checked={prefs.includes(option.key)}
                  onchange={() => (prefs = toggleIn(prefs, option.key))}
                />
              </li>
            {/each}
          </ul>
          <div class="flex justify-end gap-2">
            <Button variant="secondary" type="button" onclick={resetSettings}
              >Reset</Button
            >
            <Button type="submit">Save changes</Button>
          </div>
        {/snippet}
        <form
          class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]"
          onsubmit={saveSettings}
        >
          {@render panel(
            "crm-profile-title",
            "Profile",
            "How teammates and customers see you",
            profileBody,
            "content-start",
          )}
          {@render panel(
            "crm-notify-title",
            "Notifications",
            "Choose what reaches your inbox",
            notifyBody,
            "content-start",
          )}
        </form>
      {/if}
    </main>
  </div>
  <Toaster />
</div>
