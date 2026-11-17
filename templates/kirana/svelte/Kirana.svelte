<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import Avatar from "../../../components/avatar/Avatar.svelte";
  import Badge from "../../../components/badge/Badge.svelte";
  import Button from "../../../components/button/Button.svelte";
  import Checkbox from "../../../components/checkbox/Checkbox.svelte";
  import Drawer from "../../../components/drawer/Drawer.svelte";
  import DropdownMenu, {
    type DropdownMenuItem,
  } from "../../../components/dropdown-menu/DropdownMenu.svelte";
  import Input from "../../../components/input/Input.svelte";
  import Progress from "../../../components/progress/Progress.svelte";
  import Tabs from "../../../components/tabs/Tabs.svelte";
  import Toaster, { toast } from "../../../components/toast/Toast.svelte";

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

  type DialogEvent = Event & { currentTarget: HTMLDialogElement };

  /* Navigasi */
  let pageId = $state<PageId>(DEFAULT_PAGE);
  const go = (id: PageId) => window.location.assign(`#${id}`);
  const current = (id?: PageId) => (pageId === id ? "page" : undefined);
  const railClick = (item: (typeof rail)[number]) =>
    item.id ? go(item.id) : notify(item.label, "Coming up in your workspace");

  /* Contacts */
  let deals = $state(dealList.map((item) => ({ ...item })));
  let sort = $state("default");
  let selectedId = $state("");
  let contact = $state({ ...initialContact });
  let draft = $state({ ...initialContact });
  const deal = $derived(
    deals.find((item) => item.id === selectedId) ?? deals[0]!,
  );
  const fullName = $derived(`${contact.firstName} ${contact.lastName}`);
  const sortedDeals = $derived([...deals].sort(sorters[sort]));

  function openDeal(id: string) {
    selectedId = id;
    openDialog(DEAL_DRAWER);
  }
  function onDealClose(event: DialogEvent) {
    if (event.currentTarget.returnValue !== "won") return;
    const won = deal;
    deals = deals.map((item) =>
      item.id === won.id ? { ...item, stage: "Won" } : item,
    );
    toast({
      title: "Deal marked as won",
      description: won.title,
      variant: "success",
    });
  }
  function onEditClose(event: DialogEvent) {
    if (event.currentTarget.returnValue !== "save") return;
    contact = { ...draft };
    toast({
      title: "Contact details saved",
      description: `${draft.firstName} ${draft.lastName}`,
      variant: "success",
    });
  }

  /* Contacts: kalender */
  let view = $state({ year: 2026, month: 9 });
  let selected = $state(TODAY);
  const mark = $derived(marks[selected]);
  const monthName = $derived(monthNames[view.month]!);
  const cells = $derived(monthCells(view.year, view.month));
  function shift(step: number) {
    const next = new Date(view.year, view.month + step, 1);
    view = { year: next.getFullYear(), month: next.getMonth() };
  }
  function onScheduleSelect(value: string) {
    if (value === "add")
      return notify("Task added", `${shortDay(selected)}, 09:00`);
    view = { year: 2026, month: 9 };
    selected = TODAY;
  }

  /* Contacts: funnel */
  let mode = $state<FunnelMode>("weighted");
  const funnelData = $derived(funnel[mode]);

  /* Home */
  let done = $state([...DONE_TASKS]);

  /* Book Summaries */
  let topic = $state("All");
  let read = $state([...READ_BOOKS]);
  const visibleBooks = $derived(
    books.filter((book) => topic === "All" || book.topic === topic),
  );

  /* Founders */
  let query = $state("");
  const visibleFounders = $derived(
    founders.filter((item) =>
      `${item.name} ${item.company} ${item.sector}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    ),
  );

  /* Finance */
  let invoiceSort = $state<{ key: SortKey; dir: number }>({
    key: "due",
    dir: 1,
  });
  const rows = $derived(
    [...invoices].sort(
      (a: Invoice, b: Invoice) =>
        (a[invoiceSort.key] < b[invoiceSort.key]
          ? -1
          : a[invoiceSort.key] > b[invoiceSort.key]
            ? 1
            : 0) * invoiceSort.dir,
    ),
  );
  const sortBy = (key: SortKey) =>
    (invoiceSort = {
      key,
      dir: invoiceSort.key === key ? -invoiceSort.dir : 1,
    });
  const cashPeak = Math.max(...cashflow.map(([, value]) => value));
  const ariaSort = (key: SortKey) =>
    invoiceSort.key === key
      ? invoiceSort.dir === 1
        ? "ascending"
        : "descending"
      : undefined;

  /* Projects */
  let filter = $state("All");
  const visibleProjects = $derived(
    projects.filter((item) => filter === "All" || item.status === filter),
  );

  /** Pindah halaman: state halaman direset, sama seperti React yang me-mount ulang view. */
  function openPage(id: PageId) {
    pageId = id;
    deals = dealList.map((item) => ({ ...item }));
    sort = "default";
    selectedId = "";
    contact = { ...initialContact };
    draft = { ...initialContact };
    view = { year: 2026, month: 9 };
    selected = TODAY;
    mode = "weighted";
    done = [...DONE_TASKS];
    topic = "All";
    read = [...READ_BOOKS];
    query = "";
    invoiceSort = { key: "due", dir: 1 };
    filter = "All";
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
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d={icons[name]} />
  </svg>
{/snippet}

{#snippet faceEl(name: string, className: string)}
  <span aria-hidden="true" class={cx(face, faceTone(name), className)}
    >{initials(name)}</span
  >
{/snippet}

{#snippet team(names: string[], ring: string)}
  <div
    role="img"
    aria-label={`Team: ${names.join(", ")}`}
    class="flex -space-x-1"
  >
    {#each names as name (name)}
      {@render faceEl(name, cx("size-7 text-[10px] ring-2", ring))}
    {/each}
  </div>
{/snippet}

{#snippet panelMenu(
  label: string,
  items: DropdownMenuItem[],
  onselect: (value: string) => void,
)}
  <DropdownMenu {items} class={menuTrigger} {onselect}>
    {#snippet trigger()}
      {@render icon("dots", "size-4")}<span class="sr-only"
        >{label} options</span
      >
    {/snippet}
  </DropdownMenu>
{/snippet}

{#snippet expandButton(label: string)}
  <button
    type="button"
    aria-label={`Expand ${label}`}
    class={smallButton}
    onclick={() => notify(`${label} expanded`, "Opened in full view")}
  >
    {@render icon("expand", "size-4")}
  </button>
{/snippet}

{#snippet panelHead(id: string, title: string, sub?: string, actions?: Snippet)}
  <div class="flex items-center justify-between gap-3">
    <div class="min-w-0">
      <h2 {id} class="text-lg font-semibold tracking-tight">{title}</h2>
      {#if sub}<p class="text-sm text-muted">{sub}</p>{/if}
    </div>
    {#if actions}<div class="flex shrink-0 gap-2">{@render actions()}</div>{/if}
  </div>
{/snippet}

{#snippet statCard(stat: Stat)}
  <div class={cx("flex items-center gap-3 rounded-3xl p-3", glass)}>
    <span
      class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-subtle"
    >
      {@render icon(stat.icon)}
    </span>
    <div class="grid min-w-0 gap-1">
      <p class="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span
          class="text-lg font-bold tracking-tight whitespace-nowrap tabular-nums"
          >{stat.value}</span
        >
        <span class={cx(pill, statBadges[stat.tone])}>{stat.badge}</span>
      </p>
      <p class="max-w-40 text-xs leading-snug text-muted">{stat.label}</p>
    </div>
  </div>
{/snippet}

{#snippet barChart(bars: readonly number[], label: string)}
  {@const peak = Math.max(...bars)}
  <div
    role="img"
    aria-label={`${label}: ${bars.map((value, index) => `${barLabels[index]} ${value}`).join(", ")}`}
    class="flex h-48 items-end gap-3"
  >
    {#each bars as value, index (index)}
      <div
        data-bar
        class="flex h-full min-w-0 flex-1 flex-col justify-end gap-2"
      >
        <div
          class={cx(
            "rounded-xl",
            index === bars.length - 1 ? "bg-(--tpl-blue)" : "bg-(--tpl-sky)",
          )}
          style:height={`${Math.round((value / peak) * 100)}%`}
        ></div>
        <span class="text-center text-xs text-muted">{barLabels[index]}</span>
      </div>
    {/each}
  </div>
{/snippet}

{#snippet period(item: (typeof growthPeriods)[number])}
  <div class="grid gap-4">
    <dl class="grid gap-3 sm:grid-cols-3">
      {#each item.metrics as [label, value] (label)}
        <div class={tile}>
          <dt class="text-xs text-muted">{label}</dt>
          <dd class="text-xl font-bold tracking-tight tabular-nums">{value}</dd>
        </div>
      {/each}
    </dl>
    {@render barChart(item.bars, `New leads, ${item.label}`)}
  </div>
{/snippet}
{#snippet period7()}{@render period(growthPeriods[0]!)}{/snippet}
{#snippet period30()}{@render period(growthPeriods[1]!)}{/snippet}
{#snippet period90()}{@render period(growthPeriods[2]!)}{/snippet}

<div class={shell}>
  <header class="flex h-20 items-center gap-3 px-4 lg:px-6">
    <Drawer title="Menu" side="left">
      {#snippet trigger()}
        <button
          type="button"
          aria-label="Open menu"
          class={cx(roundButton, "xl:hidden")}
        >
          {@render icon("menu")}
        </button>
      {/snippet}
      <form method="dialog" class="grid gap-1">
        {#each rail as item (item.label)}
          <button
            type="submit"
            aria-current={current(item.id)}
            class={cx(menuItem, pageId === item.id ? pillActive : menuIdle)}
            onclick={() => railClick(item)}
          >
            {@render icon(item.icon)}
            {item.label}
          </button>
        {/each}
      </form>
    </Drawer>
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
      class={cx(
        "mx-auto hidden items-center gap-1 rounded-full p-1 xl:flex",
        glass,
      )}
    >
      {#each topNav as id (id)}
        <button
          type="button"
          aria-current={current(id)}
          class={cx(pillBase, pageId === id ? pillActive : pillIdle)}
          onclick={() => go(id)}>{pages[id].label}</button
        >
      {/each}
    </nav>
    <div class="ml-auto flex items-center gap-2 xl:ml-0">
      <button
        type="button"
        aria-label="Messages, 2 unread"
        class={cx(roundButton, "max-sm:hidden")}
        onclick={() => notify("2 unread messages", "Ratna Kusuma replied")}
      >
        {@render icon("mail")}
        <span
          aria-hidden="true"
          class="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"
        ></span>
      </button>
      <button
        type="button"
        aria-label="Notifications, 3 unread"
        class={roundButton}
        onclick={() =>
          notify("3 unread notifications", "Enterprise Plan moved stage")}
      >
        {@render icon("bell")}
        <span
          aria-hidden="true"
          class="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"
        ></span>
      </button>
      <button
        type="button"
        aria-label="Open public site"
        class={cx(roundButton, "max-sm:hidden")}
        onclick={() => notify("Public site", "kirana.id opened in a new tab")}
      >
        {@render icon("external")}
      </button>
      <Avatar name="Dimas Pratama" size="md" class="ring-2 ring-surface" />
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
        {#each rail as item (item.label)}
          <span class="group relative inline-flex">
            <button
              type="button"
              aria-label={item.label}
              aria-current={current(item.id)}
              class={cx(railBase, pageId === item.id ? railActive : railIdle)}
              onclick={() => railClick(item)}
            >
              {@render icon(item.icon)}
            </button>
            <span aria-hidden="true" class={railTip}>{item.label}</span>
          </span>
        {/each}
      </nav>
    </div>

    <main
      class="grid min-w-0 content-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]"
    >
      <div
        class={cx(
          "flex flex-wrap items-center gap-4 xl:flex-nowrap",
          pageId !== "contacts" && "xl:col-span-2",
        )}
      >
        <div class="flex items-center gap-4">
          <button
            type="button"
            aria-label="Back to Home"
            class={roundButton}
            onclick={() => go("home")}
          >
            {@render icon("back")}
          </button>
          <div class="w-48">
            <p class="text-xs text-muted">Kirana / {pages[pageId].label}</p>
            <h1
              id={TITLE_ID}
              tabindex="-1"
              class="text-[28px] leading-tight font-bold tracking-tight focus:outline-none"
            >
              {pages[pageId].title}
            </h1>
          </div>
        </div>
        <div class="grid w-full min-w-0 gap-3 sm:grid-cols-3 xl:flex-1">
          {#each headerStats[pageId] as stat (stat.label)}
            {@render statCard(stat)}
          {/each}
        </div>
      </div>

      {#if pageId === "contacts"}
        <div class="contents">
          <div class="grid min-w-0 content-start gap-4">
            <section aria-labelledby="kirana-history-title" class={panel}>
              {#snippet historyActions()}
                {@render panelMenu(
                  "Interaction History",
                  historyMenu,
                  (value) =>
                    value === "export"
                      ? notify(
                          "History exported",
                          "6 deals, interaction-history.csv",
                        )
                      : (sort = value),
                )}
                {@render expandButton("Interaction History")}
              {/snippet}
              {@render panelHead(
                "kirana-history-title",
                "Interaction History",
                undefined,
                historyActions,
              )}
              <ul role="list" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {#each sortedDeals as item (item.id)}
                  {@const tone = item.tone as Tone}
                  {@const isSelected = item.id === selectedId}
                  <li
                    data-deal={item.id}
                    class={cx(
                      dealBase,
                      tones[tone],
                      isSelected && dealSelected,
                    )}
                  >
                    <div class="flex items-start justify-between gap-3">
                      <p class="pt-1 text-xs font-medium">Oct {item.day}</p>
                      <button
                        type="button"
                        aria-label={`Open ${item.title}`}
                        class={cardButton(tone)}
                        onclick={() => openDeal(item.id)}
                      >
                        {@render icon(
                          tone === "night" ? "arrow" : "dots",
                          "size-4",
                        )}
                      </button>
                    </div>
                    <h3
                      class="mt-1 max-w-56 text-lg leading-snug font-semibold"
                    >
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        class={selectable}
                        onclick={() => openDeal(item.id)}>{item.title}</button
                      >
                    </h3>
                    <div
                      class="mt-auto flex items-end justify-between gap-2 pt-4"
                    >
                      <p class="text-lg font-bold tracking-tight tabular-nums">
                        {rupiah(item.value)}
                      </p>
                      {@render team(item.team, "ring-(--card)")}
                    </div>
                  </li>
                {/each}
              </ul>
            </section>
            <div class="grid gap-4 lg:grid-cols-2">
              <section aria-labelledby="kirana-schedule-title" class={panel}>
                {#snippet scheduleActions()}
                  {@render panelMenu(
                    "Tasks Schedule",
                    scheduleMenu,
                    onScheduleSelect,
                  )}
                  {@render expandButton("Tasks Schedule")}
                {/snippet}
                {@render panelHead(
                  "kirana-schedule-title",
                  "Tasks Schedule",
                  undefined,
                  scheduleActions,
                )}
                <div class="flex items-center justify-between gap-3">
                  <h3 class="flex items-baseline gap-2 text-base font-semibold">
                    {monthName}
                    <span class="text-sm font-normal text-muted"
                      >{view.year}</span
                    >
                  </h3>
                  <div class="flex gap-2">
                    <button
                      type="button"
                      aria-label="Previous month"
                      class={smallButton}
                      onclick={() => shift(-1)}
                    >
                      {@render icon("prev", "size-4")}
                    </button>
                    <button
                      type="button"
                      aria-label="Next month"
                      class={smallButton}
                      onclick={() => shift(1)}
                    >
                      {@render icon("next", "size-4")}
                    </button>
                  </div>
                </div>
                <div class="grid grid-cols-7 gap-1.5">
                  {#each weekdays as day, index (index)}
                    <span
                      aria-hidden="true"
                      class="text-center text-xs font-medium text-muted"
                      >{day}</span
                    >
                  {/each}
                  {#each cells as day, index (index)}
                    {#if day === null}
                      <span aria-hidden="true"></span>
                    {:else}
                      {@const iso = isoDate(view.year, view.month, day)}
                      {@const item = marks[iso]}
                      <button
                        type="button"
                        aria-pressed={selected === iso}
                        class={cx(
                          dayBase,
                          dayTones[item?.tone ?? "none"],
                          selected === iso && daySelected,
                        )}
                        onclick={() => (selected = iso)}
                      >
                        <span aria-hidden="true">{day}</span>
                        <span class="sr-only"
                          >{`${monthName} ${day}${item ? `, ${item.task}` : ""}`}</span
                        >
                        {#if item}
                          {@render faceEl(
                            item.who,
                            "size-5 text-[8px] ring-1 ring-(--tpl-on) max-sm:hidden",
                          )}
                        {/if}
                      </button>
                    {/if}
                  {/each}
                </div>
                <p aria-live="polite" data-agenda class="text-sm text-muted">
                  <span class="font-semibold text-ink"
                    >{shortDay(selected)}</span
                  >{mark
                    ? `: ${mark.task} with ${mark.who}`
                    : ": no tasks scheduled"}
                </p>
              </section>
              <section aria-labelledby="kirana-funnel-title" class={panel}>
                {#snippet funnelActions()}
                  {@render panelMenu("Stage Funnel", funnelMenu, (value) =>
                    value === "export"
                      ? notify("Funnel exported", "stage-funnel.csv")
                      : (mode = value as FunnelMode),
                  )}
                  {@render expandButton("Stage Funnel")}
                {/snippet}
                {@render panelHead(
                  "kirana-funnel-title",
                  "Stage Funnel",
                  undefined,
                  funnelActions,
                )}
                <div class="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p
                      data-funnel-total
                      class="text-2xl font-bold tracking-tight tabular-nums"
                    >
                      {funnelData.total}
                    </p>
                    <p class="text-xs text-muted">Total in Pipeline</p>
                  </div>
                  <div
                    role="group"
                    aria-label="Pipeline value"
                    class="inline-flex rounded-full bg-subtle p-1"
                  >
                    {#each funnelModes as value (value)}
                      <button
                        type="button"
                        aria-pressed={mode === value}
                        class={cx(
                          segment,
                          mode === value ? segmentOn : segmentOff,
                        )}
                        onclick={() => (mode = value)}
                        >{value === "weighted" ? "Weighted" : "Total"}</button
                      >
                    {/each}
                  </div>
                </div>
                <ol class="grid gap-2.5" aria-label="Pipeline by stage">
                  {#each funnelData.steps as [label, value], index (label)}
                    <li
                      class={cx(
                        "mx-auto flex h-14 items-center justify-between gap-3 rounded-full bg-subtle pr-2 pl-5",
                        funnelWidths[index],
                      )}
                    >
                      <span class="grid leading-tight">
                        <span class="text-xs text-muted">{label}</span>
                        <span class="text-sm font-bold tabular-nums"
                          >{value}</span
                        >
                      </span>
                      {#if index === 0}
                        <button
                          type="button"
                          aria-label={`Open ${label}`}
                          class={cx(smallButton, "size-10")}
                          onclick={() =>
                            notify(label!, `${value} in this stage`)}
                        >
                          {@render icon("arrow", "size-4")}
                        </button>
                      {:else}
                        <span class="size-10" aria-hidden="true"></span>
                      {/if}
                    </li>
                  {/each}
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
                    class={smallButton}
                    onclick={() => notify("Contact forwarded", fullName)}
                  >
                    {@render icon("forward", "size-4")}
                  </button>
                  <button
                    type="button"
                    aria-label="Share profile"
                    class={smallButton}
                    onclick={() => notify("Share link ready", fullName)}
                  >
                    {@render icon("share", "size-4")}
                  </button>
                </div>
                <div class="flex gap-2">
                  {@render panelMenu("Profile", profileMenu, (value) =>
                    notify(value, fullName),
                  )}
                  {@render expandButton("Profile")}
                </div>
              </div>
              <div class="grid justify-items-center gap-1 pb-1 text-center">
                {@render faceEl(
                  fullName,
                  "mb-2 size-24 text-2xl ring-4 ring-surface",
                )}
                <h2
                  id="kirana-profile-name"
                  class="text-xl font-bold tracking-tight"
                >
                  {fullName}
                </h2>
                <p class="text-sm text-muted">Chief Growth Officer</p>
                <p class="text-sm font-medium">PT Nusantara Digital</p>
              </div>
              <div class="flex flex-wrap justify-center gap-2">
                {#each profileActions as action (action.label)}
                  <button
                    type="button"
                    aria-label={action.label}
                    class={cx(smallButton, "size-10 border-transparent")}
                    onclick={() => notify(action.label, fullName)}
                  >
                    {@render icon(action.icon, "size-4")}
                  </button>
                {/each}
              </div>
            </section>

            <section aria-labelledby="kirana-details-title" class={panel}>
              {#snippet detailsActions()}
                <Drawer title="Edit contact details" onclose={onEditClose}>
                  {#snippet trigger()}
                    <button
                      type="button"
                      aria-label="Edit details"
                      class={smallButton}
                      onclick={() => (draft = { ...contact })}
                    >
                      {@render icon("pencil", "size-4")}
                    </button>
                  {/snippet}
                  <div class="grid gap-4">
                    {#each contactFields as field (field.key)}
                      <Input
                        bind:value={draft[field.key]}
                        label={field.label}
                        type={field.type}
                        name={field.key}
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
                {@render expandButton("Detailed Information")}
              {/snippet}
              {@render panelHead(
                "kirana-details-title",
                "Detailed Information",
                undefined,
                detailsActions,
              )}
              <ul class="grid grid-cols-1">
                {#each contactFields as field (field.key)}
                  <li class="flex items-center gap-3 py-2.5">
                    <span
                      class="flex size-10 shrink-0 items-center justify-center rounded-full bg-subtle"
                    >
                      {@render icon(field.icon, "size-4")}
                    </span>
                    <div class="min-w-0 flex-1">
                      <p class="text-xs text-muted">{field.label}</p>
                      <p class="truncate text-sm font-semibold">
                        {contact[field.key]}
                      </p>
                    </div>
                    {#if field.add}
                      <button
                        type="button"
                        aria-label={field.add}
                        class={cx(smallButton, "size-8")}
                        onclick={() => notify(field.add!, fullName)}
                      >
                        {@render icon("plus", "size-4")}
                      </button>
                    {/if}
                  </li>
                {/each}
                <li class="flex items-center gap-3 py-2.5">
                  <span
                    class="flex size-10 shrink-0 items-center justify-center rounded-full bg-subtle"
                  >
                    {@render icon("share", "size-4")}
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs text-muted">Sources</p>
                    <div class="mt-1 flex gap-1.5">
                      {#each sources as source (source.label)}
                        <span
                          role="img"
                          aria-label={source.label}
                          class={cx(
                            "flex size-7 items-center justify-center rounded-full text-(--tpl-on)",
                            source.tone,
                          )}
                        >
                          {@render icon(source.icon, "size-3.5")}
                        </span>
                      {/each}
                    </div>
                  </div>
                </li>
                <li class="flex items-center gap-3 py-2.5">
                  <span
                    class="flex size-10 shrink-0 items-center justify-center rounded-full bg-subtle"
                  >
                    {@render icon("clock", "size-4")}
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs text-muted">Last Contacted</p>
                    <p class="text-sm font-semibold">Oct 14, 2026, 10:20</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Log contact"
                    class={cx(smallButton, "size-8")}
                    onclick={() => notify("Contact logged", fullName)}
                  >
                    {@render icon("plus", "size-4")}
                  </button>
                </li>
              </ul>
            </section>
          </div>

          <Drawer id={DEAL_DRAWER} title="Deal details" onclose={onDealClose}>
            <div class="grid gap-4 text-ink">
              <div class={cx("rounded-3xl p-4", tones[deal.tone as Tone])}>
                <p class="text-xs font-medium">Oct {deal.day}, 2026</p>
                <p class="mt-1 text-lg leading-snug font-semibold">
                  {deal.title}
                </p>
                <p class="mt-3 text-2xl font-bold tabular-nums">
                  {rupiah(deal.value)}
                </p>
              </div>
              <dl class="grid gap-3">
                <div class="flex justify-between gap-3">
                  <dt class="text-muted">Stage</dt>
                  <dd data-stage class="font-semibold">{deal.stage}</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="text-muted">Customer</dt>
                  <dd class="font-semibold">{fullName}</dd>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <dt class="text-muted">Team</dt>
                  <dd>{@render team(deal.team, "ring-surface")}</dd>
                </div>
              </dl>
            </div>
            {#snippet footer()}
              <Button variant="secondary" type="submit" value="cancel"
                >Close</Button
              >
              <Button type="submit" value="won">Mark as won</Button>
            {/snippet}
          </Drawer>
        </div>
      {:else if pageId === "home"}
        <div class="grid content-start gap-4 lg:grid-cols-2 xl:col-span-2">
          <section aria-labelledby="kirana-today-title" class={panel}>
            {@render panelHead(
              "kirana-today-title",
              "Today's tasks",
              `${done.length} of ${todayTasks.length} done`,
            )}
            <Progress
              value={done.length}
              max={todayTasks.length}
              aria-label="Tasks completed"
            />
            <ul class="grid gap-2">
              {#each todayTasks as task (task.id)}
                <li class="rounded-2xl bg-surface p-3">
                  <Checkbox
                    label={task.title}
                    description={task.time}
                    checked={done.includes(task.id)}
                    onchange={() => (done = toggleIn(done, task.id))}
                  />
                </li>
              {/each}
            </ul>
          </section>
          <section aria-labelledby="kirana-activity-title" class={panel}>
            {@render panelHead(
              "kirana-activity-title",
              "Recent activity",
              "Latest updates from your team",
            )}
            <ol class="grid gap-4">
              {#each activity as item (item.when)}
                <li class="flex items-start gap-3">
                  {@render faceEl(item.who, "size-9 text-xs")}
                  <div class="min-w-0 flex-1">
                    <p class="text-sm">
                      <span class="font-semibold">{item.who}</span>
                      {item.what}
                    </p>
                    <p class="text-xs text-muted">{item.when}</p>
                  </div>
                </li>
              {/each}
            </ol>
          </section>
        </div>
      {:else if pageId === "summaries"}
        <section
          aria-labelledby="kirana-books-title"
          class={cx(panel, "xl:col-span-2")}
        >
          {@render panelHead(
            "kirana-books-title",
            "Library",
            `${read.length} of ${books.length} read`,
          )}
          <div
            role="group"
            aria-label="Filter by topic"
            class="flex flex-wrap gap-2"
          >
            {#each topics as item (item)}
              <button
                type="button"
                aria-pressed={topic === item}
                class={cx(chip, topic === item ? chipOn : chipOff)}
                onclick={() => (topic = item)}>{item}</button
              >
            {/each}
          </div>
          <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {#each visibleBooks as book, index (book.id)}
              {@const isRead = read.includes(book.id)}
              <li
                data-book={book.id}
                class="grid gap-3 rounded-3xl border border-line bg-surface p-3"
              >
                <div
                  aria-hidden="true"
                  class={cx(
                    "relative h-32 overflow-hidden rounded-2xl",
                    tones[book.tone as Tone],
                  )}
                >
                  <span
                    class="absolute -top-6 -right-4 size-24 rounded-full bg-(--tpl-on)/20"
                  ></span>
                  <span
                    class="absolute bottom-3 left-4 h-2 rounded-full bg-(--tpl-on)/40"
                    style:width={`${30 + ((index * 17) % 40)}%`}
                  ></span>
                  <span
                    class="absolute bottom-7 left-4 h-2 w-1/4 rounded-full bg-(--tpl-on)/25"
                  ></span>
                </div>
                <div class="flex items-start justify-between gap-3 px-1">
                  <div class="min-w-0">
                    <h3 class="font-semibold">{book.title}</h3>
                    <p class="text-sm text-muted">
                      {book.author}, {book.minutes} min
                    </p>
                  </div>
                  <span class={cx(pill, statBadges.sky)}>{book.topic}</span>
                </div>
                <button
                  type="button"
                  aria-pressed={isRead}
                  class={cx(
                    chip,
                    "relative justify-center",
                    isRead ? chipOn : chipOff,
                  )}
                  onclick={() => (read = toggleIn(read, book.id))}
                >
                  <span aria-hidden="true"
                    >{isRead ? "Read" : "Mark as read"}</span
                  >
                  <span class="sr-only"
                    >{`${isRead ? "Read" : "Mark as read"}: ${book.title}`}</span
                  >
                </button>
              </li>
            {/each}
          </ul>
        </section>
      {:else if pageId === "founders"}
        <section
          aria-labelledby="kirana-founders-title"
          class={cx(panel, "xl:col-span-2")}
        >
          {@render panelHead(
            "kirana-founders-title",
            "People to know",
            plural(visibleFounders.length, "founder"),
          )}
          <Input
            bind:value={query}
            label="Search founders"
            type="search"
            class="max-w-sm"
          />
          {#if visibleFounders.length === 0}
            <p class="text-sm text-muted">No founders match your search.</p>
          {/if}
          <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {#each visibleFounders as item (item.name)}
              <li
                class="flex items-center gap-3 rounded-3xl border border-line bg-surface p-4"
              >
                {@render faceEl(item.name, "size-12 text-sm")}
                <div class="min-w-0 flex-1">
                  <h3 class="truncate font-semibold">{item.name}</h3>
                  <p class="truncate text-sm text-muted">
                    {item.company}, {item.sector}
                  </p>
                  <p class="text-xs font-semibold tabular-nums">
                    {rupiah(item.raised)} raised
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  aria-label={`Connect with ${item.name}`}
                  onclick={() => notify("Intro requested", item.name)}
                  >Connect</Button
                >
              </li>
            {/each}
          </ul>
        </section>
      {:else if pageId === "finance"}
        <div
          class="grid content-start gap-4 xl:col-span-2 xl:grid-cols-[minmax(0,1fr)_360px]"
        >
          <section aria-labelledby="kirana-invoices-title" class={panel}>
            {@render panelHead(
              "kirana-invoices-title",
              "Invoices",
              "October 2026",
            )}
            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <div
              tabindex="0"
              role="region"
              aria-label="Invoice table"
              class={tableWrap}
            >
              <table class="w-full text-sm">
                <thead class="bg-subtle text-muted">
                  <tr>
                    <th scope="col" class={cx(th, "text-left")}>Invoice</th>
                    {#each invoiceColumns as column (column.key)}
                      <th
                        scope="col"
                        aria-sort={ariaSort(column.key)}
                        class={cx(th, column.align)}
                      >
                        <button
                          type="button"
                          class={thButton}
                          onclick={() => sortBy(column.key)}
                        >
                          {column.label}
                          {@render icon("sort", "size-3.5")}
                        </button>
                      </th>
                    {/each}
                    <th scope="col" class={cx(th, "text-left")}>Status</th>
                    <th scope="col" class={cx(th, "text-right")}
                      ><span class="sr-only">Actions</span></th
                    >
                  </tr>
                </thead>
                <tbody>
                  {#each rows as invoice (invoice.id)}
                    <tr data-row={invoice.id} class="border-t border-line">
                      <td class={td}
                        ><span class="font-semibold">{invoice.id}</span><span
                          class="block text-xs text-muted"
                          >{invoice.customer}</span
                        ></td
                      >
                      <td class={td}>{shortDay(invoice.due)}</td>
                      <td
                        class={cx(td, "text-right font-semibold tabular-nums")}
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
                            onclick={() =>
                              notify(
                                "Reminder sent",
                                `${invoice.id} to ${invoice.customer}`,
                              )}>Remind</Button
                          >
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </section>
          <section aria-labelledby="kirana-cash-title" class={panel}>
            {@render panelHead(
              "kirana-cash-title",
              "Cash flow",
              "Rp million per month",
            )}
            <div
              role="img"
              aria-label={`Cash flow: ${cashflow.map(([month, value]) => `${month} Rp ${value} million`).join(", ")}`}
              class="flex h-56 items-end gap-3"
            >
              {#each cashflow as [month, value], index (month)}
                <div
                  class="flex h-full min-w-0 flex-1 flex-col justify-end gap-2"
                >
                  <span class="text-center text-xs font-semibold tabular-nums"
                    >{value}</span
                  >
                  <div
                    class={cx(
                      "rounded-xl",
                      index === cashflow.length - 1
                        ? "bg-(--tpl-teal)"
                        : "bg-(--tpl-mint)",
                    )}
                    style:height={`${Math.round((value / cashPeak) * 80)}%`}
                  ></div>
                  <span class="text-center text-xs text-muted">{month}</span>
                </div>
              {/each}
            </div>
          </section>
        </div>
      {:else if pageId === "growth"}
        <section
          aria-labelledby="kirana-growth-title"
          class={cx(panel, "xl:col-span-2")}
        >
          {@render panelHead(
            "kirana-growth-title",
            "Lead generation",
            "New leads per week",
          )}
          <Tabs
            defaultValue="30d"
            items={[
              {
                value: growthPeriods[0]!.value,
                label: growthPeriods[0]!.label,
                content: period7,
              },
              {
                value: growthPeriods[1]!.value,
                label: growthPeriods[1]!.label,
                content: period30,
              },
              {
                value: growthPeriods[2]!.value,
                label: growthPeriods[2]!.label,
                content: period90,
              },
            ]}
          />
        </section>
      {:else}
        <section
          aria-labelledby="kirana-projects-title"
          class={cx(panel, "xl:col-span-2")}
        >
          {@render panelHead(
            "kirana-projects-title",
            "Delivery board",
            plural(visibleProjects.length, "project"),
          )}
          <div
            role="group"
            aria-label="Filter by status"
            class="flex flex-wrap gap-2"
          >
            {#each projectFilters as item (item)}
              <button
                type="button"
                aria-pressed={filter === item}
                class={cx(chip, filter === item ? chipOn : chipOff)}
                onclick={() => (filter = item)}>{item}</button
              >
            {/each}
          </div>
          <ul class="grid gap-3 md:grid-cols-2">
            {#each visibleProjects as item (item.id)}
              <li
                data-project={item.id}
                class="grid gap-3 rounded-3xl border border-line bg-surface p-4"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <h3 class="font-semibold">{item.name}</h3>
                    <p class="text-sm text-muted">
                      {item.client}, due {item.due}
                    </p>
                  </div>
                  <Badge variant={projectVariant[item.status]}
                    >{item.status}</Badge
                  >
                </div>
                <div class="grid gap-1.5">
                  <p class="flex justify-between gap-4 text-sm">
                    <span class="font-medium">Progress</span>
                    <span class="text-muted tabular-nums">{item.progress}%</span
                    >
                  </p>
                  <Progress
                    value={item.progress}
                    max={100}
                    aria-label={`${item.name} progress`}
                  />
                </div>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    </main>
  </div>
  <Toaster />
</div>
