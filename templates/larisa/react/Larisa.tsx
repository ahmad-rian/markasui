import { useEffect, useRef, useState, type FormEvent } from "react";
import { Accordion } from "../../../components/accordion/Accordion";
import { AlertDialog } from "../../../components/alert-dialog/AlertDialog";
import { Avatar } from "../../../components/avatar/Avatar";
import { Badge } from "../../../components/badge/Badge";
import { Breadcrumb } from "../../../components/breadcrumb/Breadcrumb";
import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { Drawer } from "../../../components/drawer/Drawer";
import { DropdownMenu } from "../../../components/dropdown-menu/DropdownMenu";
import { Input } from "../../../components/input/Input";
import { Modal } from "../../../components/modal/Modal";
import { Progress } from "../../../components/progress/Progress";
import { Select } from "../../../components/select/Select";
import { Switch } from "../../../components/switch/Switch";
import { Textarea } from "../../../components/textarea/Textarea";
import { Toaster, toast } from "../../../components/toast/Toast";
import { ToggleGroup } from "../../../components/toggle-group/ToggleGroup";

type Page =
  | "overview"
  | "analytics"
  | "customers"
  | "integrations"
  | "messages"
  | "reviews"
  | "help";
type Period = "weekly" | "monthly" | "yearly";
type SortKey = "name" | "product" | "change" | "total";
type SortDir = "asc" | "desc";
type Option = { value: string; label: string };
type Seller = {
  name: string;
  product: string;
  category: string;
  change: number;
  total: number;
};
type PeriodData = {
  label: string;
  unit: string;
  stats: string[][];
  spark: string;
  sparkSummary: string;
  chart: string;
  chartSummary: string;
  bars: [string, string, number][];
  segments: [string, number][];
  regions: number[];
};
type Traffic = {
  caption: string;
  total: string;
  summary: string;
  kpis: string[];
  changes: string[];
  points: number[];
  axis: string[];
  funnel: number[];
  channels: number[];
};
type Message = { from: "me" | "them"; text: string; time: string };

const icons = {
  overview: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  analytics: "M3 20h18M7 16v-5M12 16V7M17 16v-8",
  customers:
    "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM21 19v-1a4 4 0 0 0-3-3.9M16 5.1a3 3 0 0 1 0 5.8",
  integrations: "m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5",
  messages: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z",
  reviews:
    "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z",
  help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01",
  logout: "M9 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3M16 16l4-4-4-4M20 12H10",
  search: "m21 21-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",
  menu: "M4 6h16M4 12h16M4 18h16",
  download: "M12 4v12M7 11l5 5 5-5M5 20h14",
  filter: "M4 6h16M7 12h10M10 18h4",
  calendar:
    "M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  wallet:
    "M19 7V5a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v3h-3a2 2 0 0 0 0 4h3v3a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6",
  bag: "M6 7h12l1 13H5L6 7ZM9 7V6a3 3 0 0 1 6 0v1",
  trend: "m3 17 6-6 4 4 8-8M15 7h6v6",
  percent:
    "M19 5 5 19M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM16.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  sort: "m8 9 4-4 4 4M16 15l-4 4-4-4",
  asc: "m8 14 4-4 4 4",
  desc: "m8 10 4 4 4-4",
  send: "m4 12 16-8-6 16-2.5-6.5L4 12Z",
};

const navGroups = [
  {
    label: "Main menu",
    items: [
      { value: "overview", label: "Business overview", icon: icons.overview },
      { value: "analytics", label: "Analytics", icon: icons.analytics },
      { value: "customers", label: "Customers", icon: icons.customers },
      {
        value: "integrations",
        label: "Integrations",
        icon: icons.integrations,
      },
    ],
  },
  {
    label: "Settings",
    items: [
      { value: "messages", label: "Messages", icon: icons.messages },
      { value: "reviews", label: "Reviews", icon: icons.reviews },
    ],
  },
];

const pageTitles: Record<Page, string> = {
  overview: "Business overview",
  analytics: "Analytics",
  customers: "Customers",
  integrations: "Integrations",
  messages: "Messages",
  reviews: "Reviews",
  help: "Help center",
};
const pageSubtitles: Record<Page, string> = {
  overview: "",
  analytics: "Traffic, conversion and revenue trends for your store.",
  customers: "Everyone who bought from your store, grouped by segment.",
  integrations: "Connect payment, shipping and marketing tools.",
  messages: "Answer buyers quickly to keep your response rate high.",
  reviews: "See what buyers say about your products and reply.",
  help: "Answers to common questions about selling on Larisa.",
};

const periodItems = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const statCards = [
  { label: "Total profit", icon: icons.wallet },
  { label: "Total orders", icon: icons.bag },
  { label: "Organic sales", icon: icons.trend },
  { label: "Gross margin", icon: icons.percent },
];
const segmentLabels = ["On process", "Canceled", "Delivered"];
const provinces = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Timur",
  "Bali",
  "Sumatera Utara",
];

const data: Record<Period, PeriodData> = {
  weekly: {
    label: "Weekly",
    unit: "week",
    stats: [
      ["Rp 62.4M", "+8.1%", "Rp 57.7M"],
      ["1,284", "+5.1%", "1,222"],
      ["Rp 18.9M", "-2.6%", "Rp 19.4M"],
      ["41.2%", "+1.3%", "39.9%"],
    ],
    spark: "M0 32L20 23.4L40 26.6L60 14.8L80 8.3L100 11.5L120 4",
    sparkSummary: "Gross margin trend this week, from 38.6% to 41.2%",
    chart: "Daily profit this week",
    chartSummary:
      "Daily profit this week, lowest Rp 7.4M on Wed and highest Rp 13.1M on Fri",
    bars: [
      ["Mon", "8.2M", 63],
      ["Tue", "9.6M", 73],
      ["Wed", "7.4M", 56],
      ["Thu", "11.8M", 90],
      ["Fri", "13.1M", 100],
      ["Sat", "12.3M", 94],
    ],
    segments: [
      ["318", 25],
      ["74", 6],
      ["892", 69],
    ],
    regions: [31, 24, 18, 12, 9],
  },
  monthly: {
    label: "Monthly",
    unit: "month",
    stats: [
      ["Rp 248.6M", "+12.4%", "Rp 221.2M"],
      ["5,312", "+9.8%", "4,838"],
      ["Rp 76.3M", "+4.7%", "Rp 72.9M"],
      ["42.8%", "-0.9%", "43.7%"],
    ],
    spark: "M0 4L20 7.7L40 20.8L60 11.5L80 24.5L100 32L120 28.3",
    sparkSummary: "Gross margin trend this month, from 44.1% to 42.8%",
    chart: "Monthly profit over the last 6 months",
    chartSummary:
      "Monthly profit over the last 6 months, rising from Rp 142.8M in Jun to Rp 248.6M in Nov",
    bars: [
      ["Jun", "142.8M", 57],
      ["Jul", "176.5M", 71],
      ["Aug", "158.2M", 64],
      ["Sep", "194.7M", 78],
      ["Oct", "221.2M", 89],
      ["Nov", "248.6M", 100],
    ],
    segments: [
      ["1,186", 22],
      ["302", 6],
      ["3,824", 72],
    ],
    regions: [32, 23, 19, 11, 9],
  },
  yearly: {
    label: "Yearly",
    unit: "year",
    stats: [
      ["Rp 2.86B", "+18.7%", "Rp 2.41B"],
      ["61,940", "+14.2%", "54,238"],
      ["Rp 884.1M", "+21.3%", "Rp 728.9M"],
      ["41.9%", "+2.1%", "39.8%"],
    ],
    spark: "M0 32L20 27.6L40 21.2L60 23.6L80 14.3L100 10.4L120 4",
    sparkSummary: "Gross margin trend this year, from 36.2% to 41.9%",
    chart: "Yearly profit since 2021",
    chartSummary:
      "Yearly profit since 2021, rising from Rp 1.38B in 2021 to Rp 2.86B in 2026",
    bars: [
      ["2021", "1.38B", 48],
      ["2022", "1.62B", 57],
      ["2023", "1.94B", 68],
      ["2024", "2.18B", 76],
      ["2025", "2.41B", 84],
      ["2026", "2.86B", 100],
    ],
    segments: [
      ["12,388", 20],
      ["3,097", 5],
      ["46,455", 75],
    ],
    regions: [30, 25, 18, 12, 10],
  },
};

const sellers: Seller[] = (
  [
    ["Dewi Lestari", "Wireless Earbuds Pro", "electronics", 12.4, 48.2],
    ["Budi Santoso", "Batik Shirt Premium", "fashion", 8.1, 36.7],
    ["Siti Rahmawati", "Ceramic Dinner Set", "home", -3.2, 29.4],
    ["Agus Wijaya", "Smartwatch Series 5", "electronics", 15.6, 27.9],
    ["Putri Anggraini", "Vitamin C Serum", "beauty", 6.3, 21.5],
    ["Rizky Hidayat", "Linen Throw Pillow", "home", -1.8, 14.6],
  ] as const
).map(([name, product, category, change, total]) => ({
  name,
  product,
  category,
  change,
  total,
}));
const columns: { key: SortKey; label: string; numeric: boolean }[] = [
  { key: "name", label: "Seller", numeric: false },
  { key: "product", label: "Product", numeric: false },
  { key: "change", label: "Change", numeric: true },
  { key: "total", label: "Total", numeric: true },
];

const ranges = [
  { value: "last-7", label: "Last 7 days" },
  { value: "last-30", label: "Last 30 days" },
  { value: "last-90", label: "Last 90 days" },
  { value: "ytd", label: "Year to date" },
];

const categories = [
  { value: "all", label: "All categories" },
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home", label: "Home and living" },
  { value: "beauty", label: "Beauty" },
];

const trafficRanges: Option[] = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "12m", label: "12 months" },
];
const kpiLabels = [
  "Visitors",
  "Conversion rate",
  "Avg. order value",
  "Returning buyers",
];
const funnelSteps = [
  "Store visits",
  "Product views",
  "Added to cart",
  "Purchased",
];
const channelNames = ["Organic search", "Social media", "Direct", "Email"];
const channelClasses = [
  "bg-primary",
  "bg-primary/60",
  "bg-primary/30",
  "bg-faint",
];
const traffic: Record<string, Traffic> = {
  "7d": {
    caption: "Revenue in the last 7 days",
    total: "Rp 151.5M",
    summary: "Revenue in the last 7 days, climbing steadily to its peak today",
    kpis: ["37,760", "3.4%", "Rp 118K", "28%"],
    changes: ["+6.2%", "+0.3%", "-1.8%", "+2.1%"],
    points: [30, 38, 34, 46, 52, 48, 60, 66, 58, 72, 80, 76],
    axis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    funnel: [37760, 15480, 3890, 1284],
    channels: [42, 27, 19, 12],
  },
  "30d": {
    caption: "Revenue in the last 30 days",
    total: "Rp 580.8M",
    summary: "Revenue in the last 30 days, with a dip mid month and a high now",
    kpis: ["152,400", "3.5%", "Rp 109K", "31%"],
    changes: ["+9.4%", "+0.2%", "-0.6%", "+1.4%"],
    points: [40, 44, 38, 50, 47, 55, 62, 58, 66, 70, 64, 78],
    axis: ["Oct 7", "Oct 14", "Oct 21", "Oct 28", "Nov 4"],
    funnel: [152400, 61900, 15720, 5312],
    channels: [44, 25, 18, 13],
  },
  "12m": {
    caption: "Revenue in the last 12 months",
    total: "Rp 6.83B",
    summary: "Revenue in the last 12 months, almost four times higher by Nov",
    kpis: ["1.68M", "3.7%", "Rp 110K", "34%"],
    changes: ["+22.8%", "+0.4%", "+3.9%", "+5.2%"],
    points: [22, 28, 35, 31, 42, 48, 45, 56, 63, 60, 72, 84],
    axis: ["Dec", "Feb", "Apr", "Jun", "Aug", "Oct"],
    funnel: [1684000, 702300, 181500, 61940],
    channels: [47, 22, 19, 12],
  },
};

const segments: Option[] = [
  { value: "all", label: "All" },
  { value: "vip", label: "VIP" },
  { value: "regular", label: "Regular" },
  { value: "new", label: "New" },
  { value: "risk", label: "At risk" },
];
const segmentBadges = {
  vip: "primary",
  regular: "neutral",
  new: "success",
  risk: "warning",
} as const;
const customers = (
  [
    ["Dewi Lestari", "Bandung", "vip", 42, "Rp 18.4M", "Mar 2022", "3 Nov"],
    [
      "Hendra Gunawan",
      "Surabaya",
      "regular",
      17,
      "Rp 6.2M",
      "Jan 2023",
      "28 Oct",
    ],
    ["Ayu Kartika", "Denpasar", "new", 2, "Rp 840K", "Oct 2026", "1 Nov"],
    ["Fajar Nugroho", "Yogyakarta", "risk", 9, "Rp 3.1M", "Jun 2023", "14 Jul"],
    ["Maya Sari", "Jakarta", "vip", 36, "Rp 15.7M", "Aug 2021", "4 Nov"],
    ["Yoga Pratama", "Semarang", "risk", 6, "Rp 2.4M", "Sep 2023", "30 Jun"],
  ] as const
).map(([name, city, segment, orders, spent, since, last]) => ({
  name,
  city,
  segment,
  orders,
  spent,
  since,
  last,
  email: `${name.toLowerCase().replace(" ", ".")}@mail.id`,
}));
type Customer = (typeof customers)[number];

const integrationCategories: Option[] = [
  { value: "all", label: "All" },
  { value: "payments", label: "Payments" },
  { value: "shipping", label: "Shipping" },
  { value: "marketing", label: "Marketing" },
  { value: "analytics", label: "Analytics" },
];
const integrations = [
  ["Bayarin", "payments", "Accept cards, e-wallets and virtual accounts."],
  ["QRIS Kasir", "payments", "Take QRIS payments online and in store."],
  ["Kirimaja", "shipping", "Compare courier rates and print labels."],
  ["Gudangku", "shipping", "Sync stock with your warehouse every hour."],
  ["Sebar Mail", "marketing", "Send abandoned cart and win back emails."],
  ["Chatku", "marketing", "Answer WhatsApp orders from your inbox."],
  ["Metrik", "analytics", "Track visits, funnels and campaign revenue."],
  ["Bukukas", "analytics", "Send daily sales to your accounting ledger."],
].map(([name = "", category = "", description = ""]) => ({
  name,
  category,
  description,
}));

const conversations = [
  { id: "dewi", name: "Dewi Lestari", topic: "Order #LR-2841", unread: 2 },
  { id: "hendra", name: "Hendra Gunawan", topic: "Return request", unread: 1 },
  { id: "ayu", name: "Ayu Kartika", topic: "Product question", unread: 0 },
  { id: "maya", name: "Maya Sari", topic: "Bulk order", unread: 0 },
  { id: "rudi", name: "Rudi Hartono", topic: "Payment", unread: 0 },
];
const initialThreads: Record<string, Message[]> = {
  dewi: [
    { from: "them", text: "Hi, has my order shipped yet?", time: "09.30" },
    {
      from: "me",
      text: "Hi Dewi, it left our warehouse today.",
      time: "09.36",
    },
    {
      from: "them",
      text: "Great, can I get the tracking number?",
      time: "09.42",
    },
  ],
  hendra: [
    {
      from: "them",
      text: "The batik shirt is too small. Can I swap it for L?",
      time: "08.15",
    },
  ],
  ayu: [
    {
      from: "them",
      text: "Is the ceramic set microwave safe?",
      time: "Yesterday",
    },
    {
      from: "me",
      text: "Yes, every piece is microwave and dishwasher safe.",
      time: "Yesterday",
    },
  ],
  maya: [
    {
      from: "them",
      text: "I need 40 serums for my salon. Any discount?",
      time: "Mon",
    },
    {
      from: "me",
      text: "We can offer 12% off orders above 30 units.",
      time: "Mon",
    },
  ],
  rudi: [
    {
      from: "them",
      text: "I paid by transfer but the order still says unpaid.",
      time: "Sun",
    },
  ],
};

const starFilters: Option[] = [
  { value: "all", label: "All" },
  { value: "5", label: "5 stars" },
  { value: "4", label: "4 stars" },
  { value: "low", label: "3 or less" },
];
const ratingBreakdown = [
  { stars: 5, label: "5 stars", count: "842", share: 67 },
  { stars: 4, label: "4 stars", count: "268", share: 22 },
  { stars: 3, label: "3 stars", count: "84", share: 7 },
  { stars: 2, label: "2 stars", count: "31", share: 2 },
  { stars: 1, label: "1 star", count: "23", share: 2 },
];
/** Kelompok filter bintang: 5, 4, atau "low" untuk 3 bintang ke bawah. */
const ratingGroup = (rating: number) => (rating <= 3 ? "low" : String(rating));
const reviews = [
  [
    "Maya Sari",
    "Vitamin C Serum",
    5,
    "2 days ago",
    "My skin looks brighter after two weeks. Fast delivery to Jakarta too.",
  ],
  [
    "Hendra Gunawan",
    "Batik Shirt Premium",
    4,
    "4 days ago",
    "The fabric feels premium and the colors are rich. Runs a little small.",
  ],
  [
    "Ayu Kartika",
    "Ceramic Dinner Set",
    5,
    "1 week ago",
    "Arrived well packed without a single chip. Looks lovely on our table.",
  ],
  [
    "Fajar Nugroho",
    "Smartwatch Series 5",
    3,
    "1 week ago",
    "Battery life is good, but the strap broke after a month.",
  ],
  [
    "Yoga Pratama",
    "Wireless Earbuds Pro",
    2,
    "3 weeks ago",
    "The left earbud keeps disconnecting. Support was helpful though.",
  ],
].map(([name, product, rating, date, text]) => ({
  name: String(name),
  product: String(product),
  rating: Number(rating),
  date: String(date),
  text: String(text),
}));

const faqs = [
  [
    "payout",
    "When do I receive my payouts?",
    "Sales are paid out every Monday and Thursday. Transfers usually reach your bank within one business day.",
  ],
  [
    "couriers",
    "How do I change my shipping couriers?",
    "Open Integrations, turn on Kirimaja, then choose the couriers you want to offer at checkout.",
  ],
  [
    "refunds",
    "How do refunds work?",
    "Approve the return from the order page. The buyer gets their money back within three business days.",
  ],
  [
    "fees",
    "What fees does Larisa charge?",
    "We charge 2.5% per completed order. There are no monthly fees or setup costs.",
  ],
  [
    "stock",
    "Can I sync stock across channels?",
    "Yes. Turn on Gudangku to keep stock levels in sync every hour across all your channels.",
  ],
  [
    "team",
    "How do I invite my team?",
    "Send an invite by email from your account settings and choose what each member can access.",
  ],
].map(([value = "", title = "", content = ""]) => ({ value, title, content }));

const segmentClasses = ["stroke-primary/40", "stroke-danger", "stroke-primary"];
const dotClasses = ["bg-primary/40", "bg-danger", "bg-primary"];
const GAUGE_ARC = "M20 100A80 80 0 0 1 180 100";
const GAUGE_GAP = 1;
const BAR_MAX_PX = 184;
const DEFAULT_BAR = 5;
const CHART_W = 600;
const CHART_H = 200;
const LOGOUT_ID = "logout-dialog";
const CUSTOMER_ID = "customer-drawer";
const REPLY_ID = "reply-modal";

const navItem =
  "flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const navActive = "bg-primary-soft text-ink";
const navIdle = "text-muted hover:bg-subtle hover:text-ink";
const iconButton =
  "relative inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const sectionTitle = "text-base font-semibold text-ink";
const sectionCaption = "text-sm text-muted";
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const panel = "rounded-xl border border-line bg-surface";
const tableWrap = "relative overflow-x-auto rounded-lg border border-line";
const headRow = "bg-subtle text-left text-muted";
const headCell = "px-4 py-2.5 font-medium whitespace-nowrap";
const row =
  "border-t border-line transition-colors duration-150 ease-out hover:bg-subtle/50 motion-reduce:transition-none";
const searchIcon =
  "pointer-events-none absolute bottom-3 left-3 size-4 text-muted";
const chatItem =
  "flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const labelOf = (list: Option[], value: string) =>
  list.find((entry) => entry.value === value)?.label ?? "";
const isPage = (value: string): value is Page => value in pageTitles;
const pageFromHash = (): Page => {
  const value = typeof location === "undefined" ? "" : location.hash.slice(1);
  return isPage(value) ? value : "overview";
};
/** Garis grafik dari titik 0-100 ke viewBox CHART_W x CHART_H. */
const linePath = (points: number[]) =>
  points
    .map(
      (p, i) =>
        `${i ? "L" : "M"}${(i * CHART_W) / (points.length - 1)} ${CHART_H - p * 2}`,
    )
    .join("");
const includes = (needle: string, ...fields: string[]) =>
  fields.some((field) => field.toLowerCase().includes(needle));
const openDialog = (id: string) => {
  const dialog = document.getElementById(id);
  if (!(dialog instanceof HTMLDialogElement)) return;
  dialog.returnValue = "";
  dialog.showModal();
};

const signed = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;

/** Bentuk lengkap data periode untuk tampilan, dari data ringkas di atas. */
const expand = (d: PeriodData) => {
  const total = d.stats[1]?.[0] ?? "";
  const [onProcess, canceled, delivered] = d.segments.map(([count]) => count);
  return {
    label: d.label,
    subtitle: `Here is how your store performed this ${d.unit}.`,
    compare: `last ${d.unit}`,
    stats: d.stats.map(([value = "", change = "", previous = ""]) => ({
      value,
      change,
      previous,
      up: !change.startsWith("-"),
    })),
    spark: {
      line: d.spark,
      area: `${d.spark}L120 40L0 40Z`,
      summary: d.sparkSummary,
    },
    chart: {
      caption: d.chart,
      summary: d.chartSummary,
      bars: d.bars.map(([label, short, height]) => ({
        label,
        short,
        height,
        value: `Rp ${short}`,
      })),
    },
    activity: {
      caption: `Order status this ${d.unit}`,
      total,
      summary: `${total} orders this ${d.unit}: ${onProcess} on process, ${canceled} canceled, ${delivered} delivered`,
      segments: d.segments.map(([count, share], i) => ({
        label: segmentLabels[i] ?? "",
        count,
        share,
      })),
    },
    regions: {
      caption: `Top provinces this ${d.unit}`,
      total,
      items: d.regions.map((share, i) => ({ name: provinces[i] ?? "", share })),
    },
  };
};

/** Panjang dan posisi tiap segmen gauge pada busur dengan pathLength 100. */
const dashFor = (segments: { share: number }[], index: number) => {
  const start = segments.slice(0, index).reduce((sum, s) => sum + s.share, 0);
  const segment = segments[index];
  const length = Math.max((segment?.share ?? 0) - GAUGE_GAP, 0);
  return { dasharray: `${length} 100`, dashoffset: `${-start}` };
};

function Icon({ d, className = "size-4" }: { d: string; className?: string }) {
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
      <path d={d} />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="flex shrink-0 gap-0.5"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          d={icons.reviews}
          className={cx(
            "size-4",
            star <= rating ? "fill-warning text-warning" : "text-faint",
          )}
        />
      ))}
    </span>
  );
}

function NavGroups({
  active,
  submit,
  onSelect,
}: {
  active: string;
  submit: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <>
      {navGroups.map((group) => (
        <div key={group.label} className="grid gap-2">
          <p className="px-3 text-xs font-medium text-faint">{group.label}</p>
          <ul className="grid gap-1">
            {group.items.map((item) => (
              <li key={item.value}>
                <button
                  type={submit ? "submit" : "button"}
                  aria-current={active === item.value ? "page" : undefined}
                  className={cx(
                    navItem,
                    active === item.value ? navActive : navIdle,
                  )}
                  onClick={() => onSelect(item.value)}
                >
                  <Icon d={item.icon} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function SupportNav({
  active,
  submit,
  onSelect,
}: {
  active: string;
  submit: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid gap-1 border-t border-line pt-4">
      <button
        type={submit ? "submit" : "button"}
        aria-current={active === "help" ? "page" : undefined}
        className={cx(navItem, active === "help" ? navActive : navIdle)}
        onClick={() => onSelect("help")}
      >
        <Icon d={icons.help} />
        Help center
      </button>
      <button
        type="button"
        className={cx(navItem, navIdle)}
        onClick={() => openDialog(LOGOUT_ID)}
      >
        <Icon d={icons.logout} />
        Log out
      </button>
    </div>
  );
}

function compareSellers(a: Seller, b: Seller, key: SortKey, dir: SortDir) {
  const x = a[key];
  const y = b[key];
  const order =
    typeof x === "number" && typeof y === "number"
      ? x - y
      : String(x).localeCompare(String(y));
  return dir === "asc" ? order : -order;
}

function useDashboard() {
  const [page, setPage] = useState<Page>(pageFromHash);
  const [period, setPeriod] = useState<Period>("monthly");
  const [selectedBar, setSelectedBar] = useState(DEFAULT_BAR);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("total");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [draftRange, setDraftRange] = useState("last-30");
  const [draftCategory, setDraftCategory] = useState("all");
  const [appliedRange, setAppliedRange] = useState("last-30");
  const [appliedCategory, setAppliedCategory] = useState("all");
  const [range, setRange] = useState("30d");
  const [segment, setSegment] = useState("all");
  const [customerQuery, setCustomerQuery] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [integrationCategory, setIntegrationCategory] = useState("all");
  const [connected, setConnected] = useState([
    "Bayarin",
    "Kirimaja",
    "Chatku",
    "Metrik",
  ]);
  const [chat, setChat] = useState("dewi");
  const [threads, setThreads] = useState(initialThreads);
  const [read, setRead] = useState(["dewi"]);
  const [reply, setReply] = useState("");
  const [stars, setStars] = useState("all");
  const [replies, setReplies] = useState<Record<string, string>>({
    "Yoga Pratama": "Sorry about that! A replacement pair is on its way.",
  });
  const [reviewName, setReviewName] = useState("");
  const [draftReply, setDraftReply] = useState("");
  const [faqQuery, setFaqQuery] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const navigated = useRef(false);

  useEffect(() => {
    const sync = () => {
      navigated.current = true;
      setPage(pageFromHash());
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    if (navigated.current) heading.current?.focus();
  }, [page]);

  const current = expand(data[period]);
  const bars = current.chart.bars;
  const bar = bars[selectedBar] ?? bars[bars.length - 1];
  const needle = query.trim().toLowerCase();
  const visibleSellers = sellers
    .filter((s) => appliedCategory === "all" || s.category === appliedCategory)
    .filter((s) => includes(needle, s.name, s.product))
    .sort((a, b) => compareSellers(a, b, sortKey, sortDir));
  const stats = traffic[range] ?? traffic["30d"]!;
  const trend = linePath(stats.points);
  const customerNeedle = customerQuery.trim().toLowerCase();
  const visibleCustomers = customers.filter(
    (c) =>
      (segment === "all" || c.segment === segment) &&
      includes(customerNeedle, c.name, c.email, c.city),
  );
  const customer = customers.find((c) => c.name === customerName);
  const visibleIntegrations = integrations.filter(
    (item) =>
      integrationCategory === "all" || item.category === integrationCategory,
  );
  const conversation =
    conversations.find((entry) => entry.id === chat) ?? conversations[0]!;
  const thread = threads[conversation.id] ?? [];
  const visibleReviews = reviews.filter(
    (review) => stars === "all" || ratingGroup(review.rating) === stars,
  );
  const review = reviews.find((entry) => entry.name === reviewName);
  const faqNeedle = faqQuery.trim().toLowerCase();
  const visibleFaqs = faqs.filter((faq) =>
    includes(faqNeedle, faq.title, faq.content),
  );

  /** Pindah halaman lewat hash. Item yang sudah aktif cukup memindahkan fokus ke judul. */
  const go = (value: string) => {
    if (!isPage(value)) return;
    if (value === page) heading.current?.focus();
    else window.location.hash = value;
  };
  const changePeriod = (value: string) => {
    if (!(value in data)) return;
    setPeriod(value as Period);
    setSelectedBar(DEFAULT_BAR);
  };
  const sortBy = (key: SortKey, numeric: boolean) => {
    if (key === sortKey) return setSortDir(sortDir === "asc" ? "desc" : "asc");
    setSortKey(key);
    setSortDir(numeric ? "desc" : "asc");
  };
  const ariaSort = (key: SortKey) =>
    key === sortKey
      ? sortDir === "asc"
        ? "ascending"
        : "descending"
      : undefined;
  const sortIcon = (key: SortKey) =>
    key === sortKey ? (sortDir === "asc" ? icons.asc : icons.desc) : icons.sort;

  const openFilters = () => {
    setDraftRange(appliedRange);
    setDraftCategory(appliedCategory);
  };
  const applyFilters = () => {
    setAppliedRange(draftRange);
    setAppliedCategory(draftCategory);
    toast({
      title: "Filters applied",
      description: `${labelOf(ranges, draftRange)}, ${labelOf(categories, draftCategory)}`,
    });
  };
  const resetFilters = () => {
    setDraftRange("last-30");
    setDraftCategory("all");
    setAppliedRange("last-30");
    setAppliedCategory("all");
    toast({ title: "Filters reset" });
  };
  const exportReport = () =>
    toast({
      title: "Report exported",
      description: `${current.label} sales report saved as CSV.`,
      variant: "success",
    });
  const showNotifications = () =>
    toast({
      title: "3 new notifications",
      description: "Dewi Lestari reached Rp 48.2M in sales.",
    });
  const signOut = () =>
    toast({
      title: "Signed out",
      description: "This is a demo, your session is still active.",
    });
  const exportCustomers = () =>
    toast({
      title: "Customers exported",
      description: `${visibleCustomers.length} customers saved as CSV.`,
      variant: "success",
    });
  const viewCustomer = (name: string) => {
    setCustomerName(name);
    openDialog(CUSTOMER_ID);
  };
  const toggleIntegration = (name: string, on: boolean) => {
    setConnected((list) =>
      on ? [...list, name] : list.filter((entry) => entry !== name),
    );
    toast({
      title: on ? `${name} connected` : `${name} disconnected`,
      variant: on ? "success" : "default",
    });
  };
  const openChat = (id: string) => {
    setChat(id);
    setRead((list) => (list.includes(id) ? list : [...list, id]));
    setReply("");
  };
  const markAllRead = () => {
    setRead(conversations.map((entry) => entry.id));
    toast({ title: "All messages marked as read" });
  };
  const sendReply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = reply.trim();
    if (text === "")
      return toast({ title: "Write a message first", variant: "danger" });
    setThreads((all) => ({
      ...all,
      [chat]: [...(all[chat] ?? []), { from: "me", text, time: "Now" }],
    }));
    setReply("");
    toast({
      title: "Reply sent",
      description: `To ${conversation.name}`,
      variant: "success",
    });
  };
  const openReply = (name: string) => {
    setReviewName(name);
    setDraftReply("");
    openDialog(REPLY_ID);
  };
  const postReply = () => {
    const text = draftReply.trim();
    if (text === "")
      return toast({ title: "Reply is empty", variant: "danger" });
    setReplies((all) => ({ ...all, [reviewName]: text }));
    toast({
      title: "Reply posted",
      description: `${reviewName} will be notified.`,
      variant: "success",
    });
  };
  const startChat = () =>
    toast({
      title: "Chat started",
      description: "A support agent will join in a moment.",
    });

  return {
    page,
    setPage,
    period,
    setPeriod,
    selectedBar,
    setSelectedBar,
    query,
    setQuery,
    sortKey,
    setSortKey,
    sortDir,
    setSortDir,
    draftRange,
    setDraftRange,
    draftCategory,
    setDraftCategory,
    appliedRange,
    setAppliedRange,
    appliedCategory,
    setAppliedCategory,
    range,
    setRange,
    segment,
    setSegment,
    customerQuery,
    setCustomerQuery,
    customerName,
    setCustomerName,
    integrationCategory,
    setIntegrationCategory,
    connected,
    setConnected,
    chat,
    setChat,
    threads,
    setThreads,
    read,
    setRead,
    reply,
    setReply,
    stars,
    setStars,
    replies,
    setReplies,
    reviewName,
    setReviewName,
    draftReply,
    setDraftReply,
    faqQuery,
    setFaqQuery,
    heading,
    navigated,
    current,
    bars,
    bar,
    needle,
    visibleSellers,
    stats,
    trend,
    customerNeedle,
    visibleCustomers,
    customer,
    visibleIntegrations,
    conversation,
    thread,
    visibleReviews,
    review,
    faqNeedle,
    visibleFaqs,
    go,
    changePeriod,
    sortBy,
    ariaSort,
    sortIcon,
    openFilters,
    applyFilters,
    resetFilters,
    exportReport,
    showNotifications,
    signOut,
    exportCustomers,
    viewCustomer,
    toggleIntegration,
    openChat,
    markAllRead,
    sendReply,
    openReply,
    postReply,
    startChat,
  };
}

type Dashboard = ReturnType<typeof useDashboard>;

export default function Larisa() {
  const s = useDashboard();
  const {
    page,
    query,
    setQuery,
    draftRange,
    setDraftRange,
    draftCategory,
    setDraftCategory,
    range,
    setRange,
    heading,
    current,
    go,
    changePeriod,
    openFilters,
    applyFilters,
    resetFilters,
    exportReport,
    showNotifications,
    signOut,
    exportCustomers,
    markAllRead,
  } = s;
  return (
    <div className="min-h-dvh bg-canvas text-ink lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-dvh flex-col gap-8 border-r border-line bg-surface px-4 py-6 lg:flex">
        <div className="flex items-center gap-2.5 px-3">
          <span
            className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-semibold text-on-primary"
            aria-hidden="true"
          >
            L
          </span>
          <span className="text-lg font-semibold tracking-tight">Larisa</span>
        </div>
        <nav
          aria-label="Main navigation"
          className="grid flex-1 content-start gap-6"
        >
          <NavGroups active={page} submit={false} onSelect={go} />
        </nav>
        <SupportNav active={page} submit={false} onSelect={go} />
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 sm:px-6 lg:px-8">
          <Drawer
            title="Menu"
            side="left"
            trigger={
              <button
                type="button"
                className={cx(iconButton, "lg:hidden")}
                aria-label="Open menu"
              >
                <Icon d={icons.menu} />
              </button>
            }
          >
            <form method="dialog" className="grid gap-6">
              <nav aria-label="Mobile navigation" className="grid gap-6">
                <NavGroups active={page} submit onSelect={go} />
              </nav>
              <SupportNav active={page} submit onSelect={go} />
            </form>
          </Drawer>
          <div className="relative min-w-0 flex-1 sm:max-w-sm">
            <Input
              type="search"
              aria-label="Search sellers"
              placeholder="Search sellers or products"
              className="pl-9!"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Icon d={icons.search} className={searchIcon} />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              className={iconButton}
              aria-label="Notifications, 3 unread"
              onClick={showNotifications}
            >
              <Icon d={icons.bell} />
              <span
                className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full border-2 border-surface bg-danger text-[10px] font-semibold text-on-primary"
                aria-hidden="true"
              >
                3
              </span>
            </button>
            <span
              className="hidden h-8 w-px bg-line sm:block"
              aria-hidden="true"
            />
            <div className="flex items-center gap-3">
              <Avatar name="Rizky Pratama" />
              <div className="hidden leading-tight md:grid">
                <span className="text-sm font-medium text-ink">
                  Rizky Pratama
                </span>
                <span className="text-xs text-muted">rizky@larisa.id</span>
              </div>
            </div>
          </div>
        </header>

        <main className="grid min-w-0 content-start gap-6 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="grid gap-1">
              <Breadcrumb
                className="mb-1"
                items={[
                  { label: "Dashboard", href: "#overview" },
                  { label: pageTitles[page] },
                ]}
              />
              <h1
                ref={heading}
                tabIndex={-1}
                className="text-2xl font-semibold tracking-tight text-ink focus:outline-none"
              >
                {pageTitles[page]}
              </h1>
              <p className="text-sm text-muted">
                {page === "overview" ? current.subtitle : pageSubtitles[page]}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {page === "overview" && (
                <>
                  <DropdownMenu
                    items={periodItems}
                    onSelect={changePeriod}
                    trigger={
                      <>
                        <Icon d={icons.calendar} />
                        <span className="sr-only">Period: </span>
                        <span>{current.label}</span>
                      </>
                    }
                  />
                  <Drawer
                    title="Filter report"
                    trigger={
                      <Button variant="secondary" onClick={openFilters}>
                        <Icon d={icons.filter} />
                        Filter
                      </Button>
                    }
                    footer={
                      <>
                        <Button
                          variant="secondary"
                          type="submit"
                          value="reset"
                          onClick={resetFilters}
                        >
                          Reset
                        </Button>
                        <Button
                          type="submit"
                          value="apply"
                          onClick={applyFilters}
                        >
                          Apply filters
                        </Button>
                      </>
                    }
                  >
                    <div className="grid gap-5">
                      <p>
                        Narrow down the best sellers table by date range and
                        product category.
                      </p>
                      <Select
                        label="Date range"
                        value={draftRange}
                        onChange={(event) => setDraftRange(event.target.value)}
                      >
                        {ranges.map((entry) => (
                          <option key={entry.value} value={entry.value}>
                            {entry.label}
                          </option>
                        ))}
                      </Select>
                      <Select
                        label="Category"
                        value={draftCategory}
                        onChange={(event) =>
                          setDraftCategory(event.target.value)
                        }
                      >
                        {categories.map((entry) => (
                          <option key={entry.value} value={entry.value}>
                            {entry.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </Drawer>
                  <Button onClick={exportReport}>
                    <Icon d={icons.download} />
                    Export
                  </Button>
                </>
              )}
              {page === "analytics" && (
                <ToggleGroup
                  label="Period"
                  items={trafficRanges}
                  value={range}
                  onValueChange={(value) => value && setRange(value)}
                />
              )}
              {page === "customers" && (
                <Button variant="secondary" onClick={exportCustomers}>
                  <Icon d={icons.download} />
                  Export
                </Button>
              )}
              {page === "messages" && (
                <Button variant="secondary" onClick={markAllRead}>
                  Mark all as read
                </Button>
              )}
            </div>
          </div>

          {page === "overview" && <OverviewPage s={s} />}

          {page === "analytics" && <AnalyticsPage s={s} />}

          {page === "customers" && <CustomersPage s={s} />}

          {page === "integrations" && <IntegrationsPage s={s} />}

          {page === "messages" && <MessagesPage s={s} />}

          {page === "reviews" && <ReviewsPage s={s} />}

          {page === "help" && <HelpPage s={s} />}
        </main>
      </div>
      <AlertDialog
        id={LOGOUT_ID}
        title="Log out of Larisa?"
        variant="danger"
        actionLabel="Log out"
        onAction={signOut}
      >
        You will need to sign in again to manage your store.
      </AlertDialog>
      <Toaster />
    </div>
  );
}

function OverviewPage({ s }: { s: Dashboard }) {
  const {
    selectedBar,
    setSelectedBar,
    sortKey,
    appliedRange,
    appliedCategory,
    current,
    bars,
    bar,
    visibleSellers,
    sortBy,
    ariaSort,
    sortIcon,
  } = s;
  return (
    <div className="grid min-w-0 gap-6">
      <section aria-labelledby="metrics-title">
        <h2 id="metrics-title" className="sr-only">
          Key metrics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card, index) => {
            const stat = current.stats[index]!;
            const highlight = index === 0;
            return (
              <article
                key={card.label}
                className={cx(
                  "grid gap-4 rounded-xl border p-5",
                  highlight
                    ? "border-primary bg-primary text-on-primary"
                    : "border-line bg-surface text-ink",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className={cx(
                      "text-sm font-medium",
                      highlight ? "text-on-primary/85" : "text-muted",
                    )}
                  >
                    {card.label}
                  </h3>
                  <span
                    className={cx(
                      "grid size-9 place-items-center rounded-lg",
                      highlight ? "bg-on-primary/10" : "bg-subtle",
                    )}
                  >
                    <Icon d={card.icon} />
                  </span>
                </div>
                <div className="flex items-end justify-between gap-3">
                  <p className="text-2xl font-semibold tracking-tight tabular-nums">
                    {stat.value}
                  </p>
                  {index === 3 && (
                    <svg
                      className="h-10 w-24 shrink-0 text-primary"
                      viewBox="0 0 120 40"
                      preserveAspectRatio="none"
                      role="img"
                      aria-label={current.spark.summary}
                    >
                      <path
                        d={current.spark.area}
                        className="fill-primary/10"
                      />
                      <path
                        d={current.spark.line}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex rounded-full bg-surface">
                    <Badge variant={stat.up ? "success" : "danger"} dot={false}>
                      <span>{stat.change}</span>
                    </Badge>
                  </span>
                  <span
                    className={highlight ? "text-on-primary/85" : "text-muted"}
                  >
                    vs {stat.previous} {current.compare}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <Card aria-labelledby="report-title">
          <div className="grid gap-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="grid gap-1">
                <h2 id="report-title" className={sectionTitle}>
                  Sales report
                </h2>
                <p className={sectionCaption}>{current.chart.caption}</p>
              </div>
              <div
                className="grid justify-items-end gap-0.5 text-right"
                aria-live="polite"
              >
                <p className="text-xs text-muted">{bar?.label}</p>
                <p className="text-lg font-semibold tabular-nums">
                  {bar?.value}
                </p>
              </div>
            </div>
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-x-0 top-12 bottom-6 flex flex-col justify-between"
                aria-hidden="true"
              >
                <span className="border-t border-dashed border-line" />
                <span className="border-t border-dashed border-line" />
                <span className="border-t border-dashed border-line" />
                <span className="border-t border-line" />
              </div>
              <div
                role="group"
                aria-label={current.chart.summary}
                className="relative grid grid-cols-6 gap-3 sm:gap-5"
              >
                {bars.map((entry, index) => {
                  const selected = index === selectedBar;
                  return (
                    <button
                      key={entry.label}
                      type="button"
                      aria-pressed={selected}
                      className={cx(
                        "group flex h-64 min-w-0 flex-col items-center justify-end gap-2 rounded-md",
                        focusRing,
                      )}
                      onClick={() => setSelectedBar(index)}
                    >
                      <span
                        className={cx(
                          "text-xs tabular-nums",
                          selected
                            ? "font-semibold text-ink"
                            : "hidden text-muted sm:block",
                        )}
                      >
                        {entry.short}
                      </span>
                      <span
                        className={cx(
                          "w-full max-w-14 rounded-t-md transition-colors duration-150 ease-out motion-reduce:transition-none",
                          selected
                            ? "bg-primary"
                            : "bg-primary/15 group-hover:bg-primary/25",
                        )}
                        style={{
                          height: `${(entry.height * BAR_MAX_PX) / 100}px`,
                        }}
                      />
                      <span
                        className={cx(
                          "text-xs",
                          selected ? "font-medium text-ink" : "text-muted",
                        )}
                      >
                        {entry.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        <Card aria-labelledby="activity-title">
          <div className="grid gap-6">
            <div className="grid gap-1">
              <h2 id="activity-title" className={sectionTitle}>
                Sales activity
              </h2>
              <p className={sectionCaption}>{current.activity.caption}</p>
            </div>
            <div className="relative mx-auto w-full max-w-72">
              <svg
                viewBox="0 0 200 110"
                className="w-full"
                role="img"
                aria-label={current.activity.summary}
              >
                <path
                  d={GAUGE_ARC}
                  pathLength={100}
                  fill="none"
                  strokeWidth="20"
                  className="stroke-subtle"
                />
                {current.activity.segments.map((entry, index) => {
                  const dash = dashFor(current.activity.segments, index);
                  return (
                    <path
                      key={entry.label}
                      d={GAUGE_ARC}
                      pathLength={100}
                      fill="none"
                      strokeWidth="20"
                      strokeDasharray={dash.dasharray}
                      strokeDashoffset={dash.dashoffset}
                      className={segmentClasses[index]}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-x-0 bottom-0 grid justify-items-center gap-0.5">
                <p className="text-2xl font-semibold tracking-tight tabular-nums">
                  {current.activity.total}
                </p>
                <p className="text-xs text-muted">Total orders</p>
              </div>
            </div>
            <ul className="grid gap-3">
              {current.activity.segments.map((entry, index) => (
                <li
                  key={entry.label}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cx("size-2.5 rounded-full", dotClasses[index])}
                      aria-hidden="true"
                    />
                    {entry.label}
                  </span>
                  <span className="flex items-center gap-2 tabular-nums">
                    <span className="font-medium text-ink">{entry.count}</span>
                    <span className="w-10 text-right text-muted">
                      {entry.share}%
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <Card aria-labelledby="sellers-title" className="min-w-0">
          <div className="grid gap-5">
            <div className="grid gap-1">
              <h2 id="sellers-title" className={sectionTitle}>
                Best sellers
              </h2>
              <p className={sectionCaption}>
                {labelOf(ranges, appliedRange)},{" "}
                {labelOf(categories, appliedCategory)}
              </p>
            </div>
            <div
              role="region"
              aria-label="Best sellers"
              tabIndex={0}
              className={cx(tableWrap, focusRing)}
            >
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className={headRow}>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        scope="col"
                        aria-sort={ariaSort(column.key)}
                        className={cx(
                          headCell,
                          column.numeric ? "text-right" : "text-left",
                        )}
                      >
                        <button
                          type="button"
                          className={cx(
                            "inline-flex items-center gap-1 rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none",
                            column.key === sortKey && "text-ink",
                            focusRing,
                          )}
                          onClick={() => sortBy(column.key, column.numeric)}
                        >
                          {column.label}
                          <Icon d={sortIcon(column.key)} className="size-3.5" />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleSellers.map((seller) => (
                    <tr key={seller.name} className={row}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={seller.name} size="sm" />
                          <span className="font-medium whitespace-nowrap text-ink">
                            {seller.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="grid">
                          <span className="whitespace-nowrap text-ink">
                            {seller.product}
                          </span>
                          <span className="text-xs text-muted">
                            {labelOf(categories, seller.category)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Badge
                          variant={seller.change >= 0 ? "success" : "danger"}
                          dot={false}
                        >
                          <span>{signed(seller.change)}</span>
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-medium whitespace-nowrap text-ink tabular-nums">
                        Rp {seller.total.toFixed(1)}M
                      </td>
                    </tr>
                  ))}
                  {visibleSellers.length === 0 && (
                    <tr className="border-t border-line">
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-muted"
                      >
                        No sellers match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card aria-labelledby="regions-title">
          <div className="grid gap-5">
            <div className="grid gap-1">
              <h2 id="regions-title" className={sectionTitle}>
                Orders by region
              </h2>
              <p className={sectionCaption}>{current.regions.caption}</p>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-semibold tracking-tight tabular-nums">
                {current.regions.total}
              </p>
              <p className="text-sm text-muted">orders from 34 provinces</p>
            </div>
            <ul className="grid gap-4">
              {current.regions.items.map((region) => (
                <li key={region.name} className="grid gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium text-ink">{region.name}</span>
                    <span className="text-muted tabular-nums">
                      {region.share}%
                    </span>
                  </div>
                  <Progress
                    value={region.share}
                    aria-label={`${region.name} share of orders`}
                    className="h-1.5!"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

function AnalyticsPage({ s }: { s: Dashboard }) {
  const { stats, trend } = s;
  return (
    <div className="grid min-w-0 gap-6">
      <section aria-labelledby="traffic-title">
        <h2 id="traffic-title" className="sr-only">
          Traffic metrics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiLabels.map((label, index) => {
            const change = stats.changes[index] ?? "";
            return (
              <article key={label} className={cx(panel, "grid gap-3 p-5")}>
                <h3 className="text-sm font-medium text-muted">{label}</h3>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-2xl font-semibold tracking-tight tabular-nums">
                    {stats.kpis[index]}
                  </p>
                  <Badge
                    variant={change.startsWith("-") ? "danger" : "success"}
                    dot={false}
                  >
                    <span>{change}</span>
                  </Badge>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <Card aria-labelledby="trend-title">
          <div className="grid gap-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="grid gap-1">
                <h2 id="trend-title" className={sectionTitle}>
                  Sales trend
                </h2>
                <p className={sectionCaption}>{stats.caption}</p>
              </div>
              <p className="text-lg font-semibold tabular-nums">
                {stats.total}
              </p>
            </div>
            <div className="grid gap-3">
              <svg
                viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                preserveAspectRatio="none"
                className="h-56 w-full text-primary"
                role="img"
                aria-label={stats.summary}
              >
                <path
                  d="M0 50H600M0 100H600M0 150H600"
                  className="stroke-line"
                  strokeDasharray="4 4"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={`${trend}L${CHART_W} ${CHART_H}L0 ${CHART_H}Z`}
                  className="fill-primary/10"
                />
                <path
                  d={trend}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div
                className="flex justify-between text-xs text-muted"
                aria-hidden="true"
              >
                {stats.axis.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>
        <Card aria-labelledby="funnel-title">
          <div className="grid gap-5">
            <div className="grid gap-1">
              <h2 id="funnel-title" className={sectionTitle}>
                Conversion funnel
              </h2>
              <p className={sectionCaption}>
                From store visit to completed order
              </p>
            </div>
            <ol className="grid gap-5">
              {funnelSteps.map((step, index) => {
                const count = stats.funnel[index] ?? 0;
                const share =
                  Math.round((count / (stats.funnel[0] ?? 1)) * 1000) / 10;
                return (
                  <li key={step} className="grid gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium text-ink">{step}</span>
                      <span className="text-muted tabular-nums">
                        {count.toLocaleString("en-US")} ({share}%)
                      </span>
                    </div>
                    <Progress
                      value={share}
                      aria-label={`${step}, ${share}% of visits`}
                      className="h-1.5!"
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        </Card>
      </div>
      <Card aria-labelledby="channels-title">
        <div className="grid gap-5">
          <div className="grid gap-1">
            <h2 id="channels-title" className={sectionTitle}>
              Traffic channels
            </h2>
            <p className={sectionCaption}>
              Where your {stats.kpis[0]} visitors came from
            </p>
          </div>
          <div
            className="flex h-3 gap-1 overflow-hidden rounded-full"
            aria-hidden="true"
          >
            {stats.channels.map((share, index) => (
              <span
                key={channelNames[index]}
                className={cx("h-full", channelClasses[index])}
                style={{ width: `${share}%` }}
              />
            ))}
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.channels.map((share, index) => (
              <li key={channelNames[index]} className="grid gap-1">
                <span className="flex items-center gap-2 text-muted">
                  <span
                    className={cx(
                      "size-2.5 rounded-full",
                      channelClasses[index],
                    )}
                    aria-hidden="true"
                  />
                  {channelNames[index]}
                </span>
                <span className="text-xl font-semibold tracking-tight tabular-nums">
                  {share}%
                </span>
                <span className="text-xs text-muted tabular-nums">
                  {Math.round(
                    ((stats.funnel[0] ?? 0) * share) / 100,
                  ).toLocaleString("en-US")}{" "}
                  visits
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

function CustomersPage({ s }: { s: Dashboard }) {
  const {
    segment,
    setSegment,
    customerQuery,
    setCustomerQuery,
    visibleCustomers,
    customer,
    go,
    viewCustomer,
  } = s;
  return (
    <div className="grid min-w-0 gap-6">
      <Card aria-labelledby="customers-title" className="min-w-0">
        <div className="grid gap-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="grid gap-1">
              <h2 id="customers-title" className={sectionTitle}>
                Customer list
              </h2>
              <p className={sectionCaption} aria-live="polite">
                Showing {visibleCustomers.length} of {customers.length}{" "}
                customers
              </p>
            </div>
            <ToggleGroup
              label="Segment"
              items={segments}
              value={segment}
              onValueChange={(value) => value && setSegment(value)}
              className="flex-wrap"
            />
          </div>
          <div className="relative sm:max-w-xs">
            <Input
              type="search"
              aria-label="Search customers"
              placeholder="Search name, email or city"
              className="pl-9!"
              value={customerQuery}
              onChange={(event) => setCustomerQuery(event.target.value)}
            />
            <Icon d={icons.search} className={searchIcon} />
          </div>
          <div
            role="region"
            aria-label="Customers"
            tabIndex={0}
            className={cx(tableWrap, focusRing)}
          >
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className={headRow}>
                  <th scope="col" className={headCell}>
                    Customer
                  </th>
                  <th scope="col" className={headCell}>
                    City
                  </th>
                  <th scope="col" className={headCell}>
                    Segment
                  </th>
                  <th scope="col" className={cx(headCell, "text-right")}>
                    Orders
                  </th>
                  <th scope="col" className={cx(headCell, "text-right")}>
                    Total spent
                  </th>
                  <th scope="col" className={headCell}>
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleCustomers.map((entry) => (
                  <tr key={entry.name} className={row}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={entry.name} size="sm" />
                        <div className="grid">
                          <span className="font-medium whitespace-nowrap text-ink">
                            {entry.name}
                          </span>
                          <span className="text-xs text-muted">
                            {entry.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {entry.city}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={segmentBadges[entry.segment]}>
                        {labelOf(segments, entry.segment)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {entry.orders}
                    </td>
                    <td className="px-4 py-3 text-right font-medium whitespace-nowrap text-ink tabular-nums">
                      {entry.spent}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`View ${entry.name}`}
                        onClick={() => viewCustomer(entry.name)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
                {visibleCustomers.length === 0 && (
                  <tr className="border-t border-line">
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-muted"
                    >
                      No customers match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <Drawer
        id={CUSTOMER_ID}
        title="Customer details"
        footer={
          <Button type="submit" onClick={() => go("messages")}>
            <Icon d={icons.messages} />
            Send message
          </Button>
        }
      >
        <CustomerDetails customer={customer} />
      </Drawer>
    </div>
  );
}

function IntegrationsPage({ s }: { s: Dashboard }) {
  const {
    integrationCategory,
    setIntegrationCategory,
    connected,
    visibleIntegrations,
    toggleIntegration,
  } = s;
  return (
    <div className="grid min-w-0 gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ToggleGroup
          label="Category"
          items={integrationCategories}
          value={integrationCategory}
          onValueChange={(value) => value && setIntegrationCategory(value)}
          className="flex-wrap"
        />
        <p className="text-sm text-muted" aria-live="polite">
          {connected.length} of {integrations.length} active
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {visibleIntegrations.map((item) => {
          const on = connected.includes(item.name);
          return (
            <li
              key={item.name}
              className={cx(panel, "grid content-start gap-4 p-5")}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="grid size-10 place-items-center rounded-lg bg-subtle text-sm font-semibold text-ink"
                  aria-hidden="true"
                >
                  {item.name.slice(0, 2).toUpperCase()}
                </span>
                <Switch
                  aria-label={`Enable ${item.name}`}
                  checked={on}
                  onCheckedChange={(value) =>
                    toggleIntegration(item.name, value)
                  }
                />
              </div>
              <div className="grid gap-1">
                <h2 className={sectionTitle}>{item.name}</h2>
                <p className={sectionCaption}>{item.description}</p>
              </div>
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-muted">
                  {labelOf(integrationCategories, item.category)}
                </span>
                <Badge variant={on ? "success" : "neutral"}>
                  {on ? "Active" : "Inactive"}
                </Badge>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MessagesPage({ s }: { s: Dashboard }) {
  const {
    chat,
    threads,
    read,
    reply,
    setReply,
    conversation,
    thread,
    openChat,
    sendReply,
  } = s;
  return (
    <div className="grid min-w-0 gap-6">
      <section
        aria-label="Inbox"
        className={cx(
          panel,
          "grid overflow-hidden lg:grid-cols-[20rem_minmax(0,1fr)]",
        )}
      >
        <div className="grid grid-cols-1 content-start gap-1 border-b border-line p-3 lg:border-r lg:border-b-0">
          <h2 className="px-3 py-2 text-sm font-semibold text-ink">
            Conversations
          </h2>
          <ul className="grid grid-cols-1 gap-1">
            {conversations.map((entry) => {
              const last = threads[entry.id]?.slice(-1)[0];
              const unread = read.includes(entry.id) ? 0 : entry.unread;
              return (
                <li key={entry.id}>
                  <button
                    type="button"
                    aria-current={chat === entry.id ? "true" : undefined}
                    className={cx(
                      chatItem,
                      chat === entry.id ? "bg-subtle" : "hover:bg-subtle/60",
                    )}
                    onClick={() => openChat(entry.id)}
                  >
                    <Avatar name={entry.name} size="sm" />
                    <span className="grid min-w-0 flex-1 grid-cols-1 gap-0.5">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium text-ink">
                          {entry.name}
                        </span>
                        <span className="shrink-0 text-xs text-muted">
                          {last?.time}
                        </span>
                      </span>
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-xs text-muted">
                          {last?.text}
                        </span>
                        {unread > 0 && (
                          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-semibold text-on-primary">
                            {unread}
                            <span className="sr-only"> unread</span>
                          </span>
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="grid min-h-[32rem] grid-rows-[auto_minmax(0,1fr)_auto]">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
            <div className="grid gap-0.5">
              <h2 className={sectionTitle}>{conversation.name}</h2>
              <p className="text-xs text-muted">{conversation.topic}</p>
            </div>
            <Badge variant="success">Online</Badge>
          </div>
          <div
            role="log"
            aria-label={`Conversation with ${conversation.name}`}
            className="grid content-start gap-4 p-5"
          >
            {thread.map((message, index) => (
              <div
                key={index}
                className={cx(
                  "grid max-w-[80%] gap-1",
                  message.from === "me"
                    ? "justify-items-end justify-self-end"
                    : "justify-items-start justify-self-start",
                )}
              >
                <p
                  className={cx(
                    "rounded-2xl px-4 py-2.5 text-sm",
                    message.from === "me"
                      ? "bg-primary text-on-primary"
                      : "bg-subtle text-ink",
                  )}
                >
                  {message.text}
                </p>
                <span className="text-xs text-muted">{message.time}</span>
              </div>
            ))}
          </div>
          <form
            className="flex items-end gap-2 border-t border-line p-4"
            onSubmit={sendReply}
          >
            <div className="min-w-0 flex-1">
              <Input
                aria-label={`Reply to ${conversation.name}`}
                placeholder="Write a reply"
                value={reply}
                onChange={(event) => setReply(event.target.value)}
              />
            </div>
            <Button type="submit">
              <Icon d={icons.send} />
              Send
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}

function ReviewsPage({ s }: { s: Dashboard }) {
  const {
    stars,
    setStars,
    replies,
    draftReply,
    setDraftReply,
    visibleReviews,
    review,
    openReply,
    postReply,
  } = s;
  return (
    <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <Card aria-labelledby="rating-title" className="self-start">
        <div className="grid gap-5">
          <h2 id="rating-title" className={sectionTitle}>
            Rating summary
          </h2>
          <div className="flex items-center gap-4">
            <p className="text-5xl font-semibold tracking-tight tabular-nums">
              4.5
            </p>
            <div className="grid gap-1">
              <Stars rating={4.5} />
              <p className="text-sm text-muted">From 1,248 reviews</p>
            </div>
          </div>
          <ul className="grid gap-3">
            {ratingBreakdown.map((entry) => (
              <li
                key={entry.stars}
                className="grid grid-cols-[3.5rem_minmax(0,1fr)_2.5rem] items-center gap-3"
              >
                <span className="text-muted">{entry.label}</span>
                <Progress
                  value={entry.share}
                  aria-label={`${entry.label}, ${entry.share}% of reviews`}
                  className="h-1.5!"
                />
                <span className="text-right text-muted tabular-nums">
                  {entry.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
      <Card aria-labelledby="reviews-title" className="min-w-0">
        <div className="grid gap-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 id="reviews-title" className={sectionTitle}>
              Latest reviews
            </h2>
            <ToggleGroup
              label="Filter by rating"
              items={starFilters}
              value={stars}
              onValueChange={(value) => value && setStars(value)}
              className="flex-wrap"
            />
          </div>
          <ul className="grid gap-5">
            {visibleReviews.map((entry) => (
              <li
                key={entry.name}
                className="grid gap-3 border-t border-line pt-5 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={entry.name} size="sm" />
                    <div className="grid">
                      <span className="font-medium text-ink">{entry.name}</span>
                      <span className="text-xs text-muted">
                        {entry.product}, {entry.date}
                      </span>
                    </div>
                  </div>
                  <Stars rating={entry.rating} />
                </div>
                <p className="text-ink">{entry.text}</p>
                {replies[entry.name] ? (
                  <div className="grid gap-1 rounded-lg bg-subtle p-3">
                    <span className="text-xs font-medium text-muted">
                      Your reply
                    </span>
                    <p className="text-ink">{replies[entry.name]}</p>
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="secondary"
                      size="sm"
                      aria-label={`Reply to ${entry.name}`}
                      onClick={() => openReply(entry.name)}
                    >
                      Reply
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Card>
      <Modal
        id={REPLY_ID}
        title="Reply to review"
        footer={
          <>
            <Button variant="secondary" type="submit" value="cancel">
              Cancel
            </Button>
            <Button type="submit" value="post" onClick={postReply}>
              Post reply
            </Button>
          </>
        }
      >
        <div className="grid gap-4">
          <blockquote className="grid gap-1 rounded-lg bg-subtle p-3">
            <span className="font-medium text-ink">{review?.name}</span>
            <span>{review?.text}</span>
          </blockquote>
          <Textarea
            label="Your reply"
            rows={4}
            value={draftReply}
            onChange={(event) => setDraftReply(event.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}

function HelpPage({ s }: { s: Dashboard }) {
  const { faqQuery, setFaqQuery, visibleFaqs, startChat } = s;
  return (
    <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <Card aria-labelledby="faq-title" className="min-w-0">
        <div className="grid gap-5">
          <div className="grid gap-1">
            <h2 id="faq-title" className={sectionTitle}>
              Frequently asked questions
            </h2>
            <p className={sectionCaption} aria-live="polite">
              Showing {visibleFaqs.length} of {faqs.length} articles
            </p>
          </div>
          <div className="relative">
            <Input
              type="search"
              aria-label="Search help articles"
              placeholder="Search payouts, shipping, refunds"
              className="pl-9!"
              value={faqQuery}
              onChange={(event) => setFaqQuery(event.target.value)}
            />
            <Icon d={icons.search} className={searchIcon} />
          </div>
          {visibleFaqs.length > 0 ? (
            <Accordion items={visibleFaqs} defaultValue="payout" />
          ) : (
            <p className="py-8 text-center text-muted">
              No articles match your search.
            </p>
          )}
        </div>
      </Card>
      <Card aria-labelledby="contact-title" className="self-start">
        <div className="grid gap-4">
          <div className="grid gap-1">
            <h2 id="contact-title" className={sectionTitle}>
              Still need help?
            </h2>
            <p className={sectionCaption}>
              Our team replies within 2 hours, every day from 08.00 to 20.00
              WIB.
            </p>
          </div>
          <Button onClick={startChat}>
            <Icon d={icons.messages} />
            Start a chat
          </Button>
          <p className={sectionCaption}>
            Or email{" "}
            <a
              href="mailto:support@larisa.id"
              className={cx(
                "rounded-sm font-medium text-primary underline underline-offset-2",
                focusRing,
              )}
            >
              support@larisa.id
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}

function CustomerDetails({ customer }: { customer: Customer | undefined }) {
  if (!customer) return null;
  const details = [
    ["Segment", labelOf(segments, customer.segment)],
    ["City", customer.city],
    ["Orders", String(customer.orders)],
    ["Total spent", customer.spent],
    ["Customer since", customer.since],
    ["Last order", customer.last],
  ];
  return (
    <div className="grid gap-6">
      <div className="grid gap-0.5">
        <p className="text-base font-semibold text-ink">{customer.name}</p>
        <p>{customer.email}</p>
      </div>
      <dl className="grid grid-cols-2 gap-4">
        {details.map(([term, value]) => (
          <div key={term} className="grid gap-1">
            <dt className="text-xs">{term}</dt>
            <dd className="font-medium text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
