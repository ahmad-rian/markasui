<script setup lang="ts">
import {
  computed,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type FunctionalComponent,
  type Ref,
} from "vue";
import Accordion from "../../../components/accordion/Accordion.vue";
import AlertDialog from "../../../components/alert-dialog/AlertDialog.vue";
import Avatar from "../../../components/avatar/Avatar.vue";
import Badge from "../../../components/badge/Badge.vue";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb.vue";
import Button from "../../../components/button/Button.vue";
import Card from "../../../components/card/Card.vue";
import Drawer from "../../../components/drawer/Drawer.vue";
import DropdownMenu from "../../../components/dropdown-menu/DropdownMenu.vue";
import Input from "../../../components/input/Input.vue";
import Modal from "../../../components/modal/Modal.vue";
import Progress from "../../../components/progress/Progress.vue";
import Select from "../../../components/select/Select.vue";
import Switch from "../../../components/switch/Switch.vue";
import Textarea from "../../../components/textarea/Textarea.vue";
import Toaster, { toast } from "../../../components/toast/Toast.vue";
import ToggleGroup from "../../../components/toggle-group/ToggleGroup.vue";

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

const shareOf = (count: number, first: number) =>
  Math.round((count / first) * 1000) / 10;
const visitsOf = (visits: number, share: number) =>
  Math.round((visits * share) / 100).toLocaleString("en-US");

const Icon: FunctionalComponent<{ d: string; cls?: string }> = (props) =>
  h(
    "svg",
    {
      class: props.cls ?? "size-4",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true",
    },
    [h("path", { d: props.d })],
  );
Icon.props = ["d", "cls"];

const Stars: FunctionalComponent<{ rating: number }> = (props) =>
  h(
    "span",
    {
      role: "img",
      "aria-label": `Rated ${props.rating} out of 5`,
      class: "flex shrink-0 gap-0.5",
    },
    [1, 2, 3, 4, 5].map((star) =>
      h(Icon, {
        key: star,
        d: icons.reviews,
        cls: cx(
          "size-4",
          star <= props.rating ? "fill-warning text-warning" : "text-faint",
        ),
      }),
    ),
  );
Stars.props = ["rating"];

function compareSellers(a: Seller, b: Seller, key: SortKey, dir: SortDir) {
  const x = a[key];
  const y = b[key];
  const order =
    typeof x === "number" && typeof y === "number"
      ? x - y
      : String(x).localeCompare(String(y));
  return dir === "asc" ? order : -order;
}

// Mulai dari halaman default supaya cocok dengan HTML server; hash dibaca setelah mount.
const page = ref<Page>("overview");
const period = ref<Period>("monthly");
const selectedBar = ref(DEFAULT_BAR);
const query = ref("");
const sortKey = ref<SortKey>("total");
const sortDir = ref<SortDir>("desc");
const draftRange = ref("last-30");
const draftCategory = ref("all");
const appliedRange = ref("last-30");
const appliedCategory = ref("all");
const range = ref("30d");
const segment = ref("all");
const customerQuery = ref("");
const customerName = ref("");
const integrationCategory = ref("all");
const connected = ref(["Bayarin", "Kirimaja", "Chatku", "Metrik"]);
const chat = ref("dewi");
const threads = ref(initialThreads);
const read = ref(["dewi"]);
const reply = ref("");
const stars = ref("all");
const replies = ref<Record<string, string>>({
  "Yoga Pratama": "Sorry about that! A replacement pair is on its way.",
});
const reviewName = ref("");
const draftReply = ref("");
const faqQuery = ref("");
const heading = ref<HTMLHeadingElement | null>(null);
let navigated = false;

const sync = () => {
  navigated = true;
  page.value = pageFromHash();
};
onMounted(() => {
  page.value = pageFromHash();
  window.addEventListener("hashchange", sync);
});
onBeforeUnmount(() => window.removeEventListener("hashchange", sync));
watch(page, () => {
  if (navigated) nextTick(() => heading.value?.focus());
});

const current = computed(() => expand(data[period.value]));
const bar = computed(() => {
  const bars = current.value.chart.bars;
  return bars[selectedBar.value] ?? bars[bars.length - 1];
});
const visibleSellers = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return sellers
    .filter(
      (s) =>
        appliedCategory.value === "all" || s.category === appliedCategory.value,
    )
    .filter((s) => includes(needle, s.name, s.product))
    .sort((a, b) => compareSellers(a, b, sortKey.value, sortDir.value));
});
const stats = computed(() => traffic[range.value] ?? traffic["30d"]!);
const trend = computed(() => linePath(stats.value.points));
const visibleCustomers = computed(() => {
  const needle = customerQuery.value.trim().toLowerCase();
  return customers.filter(
    (c) =>
      (segment.value === "all" || c.segment === segment.value) &&
      includes(needle, c.name, c.email, c.city),
  );
});
const customerDetails = computed(() => {
  const c = customers.find((entry) => entry.name === customerName.value);
  if (!c) return undefined;
  return {
    name: c.name,
    email: c.email,
    items: [
      ["Segment", labelOf(segments, c.segment)],
      ["City", c.city],
      ["Orders", String(c.orders)],
      ["Total spent", c.spent],
      ["Customer since", c.since],
      ["Last order", c.last],
    ],
  };
});
const visibleIntegrations = computed(() =>
  integrations.filter(
    (item) =>
      integrationCategory.value === "all" ||
      item.category === integrationCategory.value,
  ),
);
const conversation = computed(
  () =>
    conversations.find((entry) => entry.id === chat.value) ?? conversations[0]!,
);
const thread = computed(() => threads.value[conversation.value.id] ?? []);
const visibleReviews = computed(() =>
  reviews.filter(
    (entry) =>
      stars.value === "all" || ratingGroup(entry.rating) === stars.value,
  ),
);
const review = computed(() =>
  reviews.find((entry) => entry.name === reviewName.value),
);
const visibleFaqs = computed(() => {
  const needle = faqQuery.value.trim().toLowerCase();
  return faqs.filter((faq) => includes(needle, faq.title, faq.content));
});
const lastOf = (id: string) => threads.value[id]?.slice(-1)[0];
const unreadOf = (id: string, unread: number) =>
  read.value.includes(id) ? 0 : unread;

/** Pindah halaman lewat hash. Item yang sudah aktif cukup memindahkan fokus ke judul. */
const go = (value: string) => {
  if (!isPage(value)) return;
  if (value === page.value) heading.value?.focus();
  else window.location.hash = value;
};
/** ToggleGroup tunggal: abaikan nilai kosong supaya selalu ada pilihan aktif. */
const choose =
  (target: Ref<string>) => (value: string | string[] | undefined) => {
    if (typeof value === "string" && value) target.value = value;
  };
const setRange = choose(range);
const setSegment = choose(segment);
const setIntegrationCategory = choose(integrationCategory);
const setStars = choose(stars);
function changePeriod(value: string) {
  if (!(value in data)) return;
  period.value = value as Period;
  selectedBar.value = DEFAULT_BAR;
}
function sortBy(key: SortKey, numeric: boolean) {
  if (key === sortKey.value) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
    return;
  }
  sortKey.value = key;
  sortDir.value = numeric ? "desc" : "asc";
}
const ariaSort = (key: SortKey) =>
  key === sortKey.value
    ? sortDir.value === "asc"
      ? "ascending"
      : "descending"
    : undefined;
const sortIcon = (key: SortKey) =>
  key === sortKey.value
    ? sortDir.value === "asc"
      ? icons.asc
      : icons.desc
    : icons.sort;

function openFilters() {
  draftRange.value = appliedRange.value;
  draftCategory.value = appliedCategory.value;
}
function applyFilters() {
  appliedRange.value = draftRange.value;
  appliedCategory.value = draftCategory.value;
  toast({
    title: "Filters applied",
    description: `${labelOf(ranges, draftRange.value)}, ${labelOf(categories, draftCategory.value)}`,
  });
}
function resetFilters() {
  draftRange.value = "last-30";
  draftCategory.value = "all";
  appliedRange.value = "last-30";
  appliedCategory.value = "all";
  toast({ title: "Filters reset" });
}
const exportReport = () =>
  toast({
    title: "Report exported",
    description: `${current.value.label} sales report saved as CSV.`,
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
    description: `${visibleCustomers.value.length} customers saved as CSV.`,
    variant: "success",
  });
function viewCustomer(name: string) {
  customerName.value = name;
  openDialog(CUSTOMER_ID);
}
function toggleIntegration(name: string, on: boolean) {
  connected.value = on
    ? [...connected.value, name]
    : connected.value.filter((entry) => entry !== name);
  toast({
    title: on ? `${name} connected` : `${name} disconnected`,
    variant: on ? "success" : "default",
  });
}
function openChat(id: string) {
  chat.value = id;
  if (!read.value.includes(id)) read.value = [...read.value, id];
  reply.value = "";
}
function markAllRead() {
  read.value = conversations.map((entry) => entry.id);
  toast({ title: "All messages marked as read" });
}
function sendReply() {
  const text = reply.value.trim();
  if (text === "")
    return toast({ title: "Write a message first", variant: "danger" });
  const id = chat.value;
  threads.value = {
    ...threads.value,
    [id]: [...(threads.value[id] ?? []), { from: "me", text, time: "Now" }],
  };
  reply.value = "";
  toast({
    title: "Reply sent",
    description: `To ${conversation.value.name}`,
    variant: "success",
  });
}
function openReply(name: string) {
  reviewName.value = name;
  draftReply.value = "";
  openDialog(REPLY_ID);
}
function postReply() {
  const text = draftReply.value.trim();
  if (text === "") return toast({ title: "Reply is empty", variant: "danger" });
  replies.value = { ...replies.value, [reviewName.value]: text };
  toast({
    title: "Reply posted",
    description: `${reviewName.value} will be notified.`,
    variant: "success",
  });
}
const startChat = () =>
  toast({
    title: "Chat started",
    description: "A support agent will join in a moment.",
  });
</script>

<template>
  <div
    class="min-h-dvh bg-canvas text-ink lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]"
  >
    <aside
      class="sticky top-0 hidden h-dvh flex-col gap-8 border-r border-line bg-surface px-4 py-6 lg:flex"
    >
      <div class="flex items-center gap-2.5 px-3">
        <span
          class="grid size-8 place-items-center rounded-lg bg-primary text-sm font-semibold text-on-primary"
          aria-hidden="true"
          >L</span
        >
        <span class="text-lg font-semibold tracking-tight">Larisa</span>
      </div>
      <nav aria-label="Main navigation" class="grid flex-1 content-start gap-6">
        <div v-for="group in navGroups" :key="group.label" class="grid gap-2">
          <p class="px-3 text-xs font-medium text-faint">{{ group.label }}</p>
          <ul class="grid gap-1">
            <li v-for="item in group.items" :key="item.value">
              <button
                type="button"
                :aria-current="page === item.value ? 'page' : undefined"
                :class="[navItem, page === item.value ? navActive : navIdle]"
                @click="go(item.value)"
              >
                <Icon :d="item.icon" />
                {{ item.label }}
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div class="grid gap-1 border-t border-line pt-4">
        <button
          type="button"
          :aria-current="page === 'help' ? 'page' : undefined"
          :class="[navItem, page === 'help' ? navActive : navIdle]"
          @click="go('help')"
        >
          <Icon :d="icons.help" />
          Help center
        </button>
        <button
          type="button"
          :class="[navItem, navIdle]"
          @click="openDialog(LOGOUT_ID)"
        >
          <Icon :d="icons.logout" />
          Log out
        </button>
      </div>
    </aside>

    <div class="flex min-w-0 flex-col">
      <header
        class="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 sm:px-6 lg:px-8"
      >
        <Drawer title="Menu" side="left">
          <template #trigger>
            <button
              type="button"
              :class="[iconButton, 'lg:hidden']"
              aria-label="Open menu"
            >
              <Icon :d="icons.menu" />
            </button>
          </template>
          <form method="dialog" class="grid gap-6">
            <nav aria-label="Mobile navigation" class="grid gap-6">
              <div
                v-for="group in navGroups"
                :key="group.label"
                class="grid gap-2"
              >
                <p class="px-3 text-xs font-medium text-faint">
                  {{ group.label }}
                </p>
                <ul class="grid gap-1">
                  <li v-for="item in group.items" :key="item.value">
                    <button
                      type="submit"
                      :aria-current="page === item.value ? 'page' : undefined"
                      :class="[
                        navItem,
                        page === item.value ? navActive : navIdle,
                      ]"
                      @click="go(item.value)"
                    >
                      <Icon :d="item.icon" />
                      {{ item.label }}
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
            <div class="grid gap-1 border-t border-line pt-4">
              <button
                type="submit"
                :aria-current="page === 'help' ? 'page' : undefined"
                :class="[navItem, page === 'help' ? navActive : navIdle]"
                @click="go('help')"
              >
                <Icon :d="icons.help" />
                Help center
              </button>
              <button
                type="button"
                :class="[navItem, navIdle]"
                @click="openDialog(LOGOUT_ID)"
              >
                <Icon :d="icons.logout" />
                Log out
              </button>
            </div>
          </form>
        </Drawer>
        <div class="relative min-w-0 flex-1 sm:max-w-sm">
          <Input
            v-model="query"
            type="search"
            aria-label="Search sellers"
            placeholder="Search sellers or products"
            class="pl-9!"
          />
          <Icon :d="icons.search" :cls="searchIcon" />
        </div>
        <div class="ml-auto flex items-center gap-3">
          <button
            type="button"
            :class="iconButton"
            aria-label="Notifications, 3 unread"
            @click="showNotifications"
          >
            <Icon :d="icons.bell" />
            <span
              class="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full border-2 border-surface bg-danger text-[10px] font-semibold text-on-primary"
              aria-hidden="true"
              >3</span
            >
          </button>
          <span class="hidden h-8 w-px bg-line sm:block" aria-hidden="true" />
          <div class="flex items-center gap-3">
            <Avatar name="Rizky Pratama" />
            <div class="hidden leading-tight md:grid">
              <span class="text-sm font-medium text-ink">Rizky Pratama</span>
              <span class="text-xs text-muted">rizky@larisa.id</span>
            </div>
          </div>
        </div>
      </header>

      <main class="grid min-w-0 content-start gap-6 p-4 sm:p-6 lg:p-8">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="grid gap-1">
            <Breadcrumb
              class="mb-1"
              :items="[
                { label: 'Dashboard', href: '#overview' },
                { label: pageTitles[page] },
              ]"
            />
            <h1
              ref="heading"
              tabindex="-1"
              class="text-2xl font-semibold tracking-tight text-ink focus:outline-none"
            >
              {{ pageTitles[page] }}
            </h1>
            <p class="text-sm text-muted">
              {{ page === "overview" ? current.subtitle : pageSubtitles[page] }}
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <template v-if="page === 'overview'">
              <DropdownMenu :items="periodItems" @select="changePeriod">
                <template #trigger>
                  <Icon :d="icons.calendar" />
                  <span class="sr-only">Period: </span>
                  <span>{{ current.label }}</span>
                </template>
              </DropdownMenu>
              <Drawer title="Filter report">
                <template #trigger>
                  <Button variant="secondary" @click="openFilters">
                    <Icon :d="icons.filter" />
                    Filter
                  </Button>
                </template>
                <div class="grid gap-5">
                  <p>
                    Narrow down the best sellers table by date range and product
                    category.
                  </p>
                  <Select v-model="draftRange" label="Date range">
                    <option
                      v-for="entry in ranges"
                      :key="entry.value"
                      :value="entry.value"
                    >
                      {{ entry.label }}
                    </option>
                  </Select>
                  <Select v-model="draftCategory" label="Category">
                    <option
                      v-for="entry in categories"
                      :key="entry.value"
                      :value="entry.value"
                    >
                      {{ entry.label }}
                    </option>
                  </Select>
                </div>
                <template #footer>
                  <Button
                    variant="secondary"
                    type="submit"
                    value="reset"
                    @click="resetFilters"
                    >Reset</Button
                  >
                  <Button type="submit" value="apply" @click="applyFilters"
                    >Apply filters</Button
                  >
                </template>
              </Drawer>
              <Button @click="exportReport">
                <Icon :d="icons.download" />
                Export
              </Button>
            </template>
            <ToggleGroup
              v-if="page === 'analytics'"
              label="Period"
              :items="trafficRanges"
              :model-value="range"
              @update:model-value="setRange"
            />
            <Button
              v-if="page === 'customers'"
              variant="secondary"
              @click="exportCustomers"
            >
              <Icon :d="icons.download" />
              Export
            </Button>
            <Button
              v-if="page === 'messages'"
              variant="secondary"
              @click="markAllRead"
              >Mark all as read</Button
            >
          </div>
        </div>

        <div v-if="page === 'overview'" class="grid min-w-0 gap-6">
          <section aria-labelledby="metrics-title">
            <h2 id="metrics-title" class="sr-only">Key metrics</h2>
            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <article
                v-for="(card, index) in statCards"
                :key="card.label"
                :class="[
                  'grid gap-4 rounded-xl border p-5',
                  index === 0
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-line bg-surface text-ink',
                ]"
              >
                <div class="flex items-center justify-between gap-3">
                  <h3
                    :class="[
                      'text-sm font-medium',
                      index === 0 ? 'text-on-primary' : 'text-muted',
                    ]"
                  >
                    {{ card.label }}
                  </h3>
                  <span
                    :class="[
                      'grid size-9 place-items-center rounded-lg',
                      index === 0 ? 'bg-on-primary/10' : 'bg-subtle',
                    ]"
                  >
                    <Icon :d="card.icon" />
                  </span>
                </div>
                <div class="flex items-end justify-between gap-3">
                  <p class="text-2xl font-semibold tracking-tight tabular-nums">
                    {{ current.stats[index]?.value }}
                  </p>
                  <svg
                    v-if="index === 3"
                    class="h-10 w-24 shrink-0 text-primary"
                    viewBox="0 0 120 40"
                    preserveAspectRatio="none"
                    role="img"
                    :aria-label="current.spark.summary"
                  >
                    <path :d="current.spark.area" class="fill-primary/10" />
                    <path
                      :d="current.spark.line"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      vector-effect="non-scaling-stroke"
                    />
                  </svg>
                </div>
                <div class="flex flex-wrap items-center gap-2 text-xs">
                  <span class="inline-flex rounded-full bg-surface">
                    <Badge
                      :variant="current.stats[index]?.up ? 'success' : 'danger'"
                      :dot="false"
                      ><span>{{ current.stats[index]?.change }}</span></Badge
                    >
                  </span>
                  <span :class="index === 0 ? 'text-on-primary' : 'text-muted'"
                    >vs {{ current.stats[index]?.previous }}
                    {{ current.compare }}</span
                  >
                </div>
              </article>
            </div>
          </section>

          <div class="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <Card aria-labelledby="report-title">
              <div class="grid gap-6">
                <div class="flex flex-wrap items-start justify-between gap-4">
                  <div class="grid gap-1">
                    <h2 id="report-title" :class="sectionTitle">
                      Sales report
                    </h2>
                    <p :class="sectionCaption">{{ current.chart.caption }}</p>
                  </div>
                  <div
                    class="grid justify-items-end gap-0.5 text-right"
                    aria-live="polite"
                  >
                    <p class="text-xs text-muted">{{ bar?.label }}</p>
                    <p class="text-lg font-semibold tabular-nums">
                      {{ bar?.value }}
                    </p>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="pointer-events-none absolute inset-x-0 top-12 bottom-6 flex flex-col justify-between"
                    aria-hidden="true"
                  >
                    <span class="border-t border-dashed border-line" />
                    <span class="border-t border-dashed border-line" />
                    <span class="border-t border-dashed border-line" />
                    <span class="border-t border-line" />
                  </div>
                  <div
                    role="group"
                    :aria-label="current.chart.summary"
                    class="relative grid grid-cols-6 gap-3 sm:gap-5"
                  >
                    <button
                      v-for="(entry, index) in current.chart.bars"
                      :key="entry.label"
                      type="button"
                      :aria-pressed="index === selectedBar ? 'true' : 'false'"
                      :class="[
                        'group flex h-64 min-w-0 flex-col items-center justify-end gap-2 rounded-md',
                        focusRing,
                      ]"
                      @click="selectedBar = index"
                    >
                      <span
                        :class="[
                          'text-xs tabular-nums',
                          index === selectedBar
                            ? 'font-semibold text-ink'
                            : 'hidden text-muted sm:block',
                        ]"
                        >{{ entry.short }}</span
                      >
                      <span
                        :class="[
                          'w-full max-w-14 rounded-t-md transition-colors duration-150 ease-out motion-reduce:transition-none',
                          index === selectedBar
                            ? 'bg-primary'
                            : 'bg-primary/15 group-hover:bg-primary/25',
                        ]"
                        :style="{
                          height: `${(entry.height * BAR_MAX_PX) / 100}px`,
                        }"
                      />
                      <span
                        :class="[
                          'text-xs',
                          index === selectedBar
                            ? 'font-medium text-ink'
                            : 'text-muted',
                        ]"
                        >{{ entry.label }}</span
                      >
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            <Card aria-labelledby="activity-title">
              <div class="grid gap-6">
                <div class="grid gap-1">
                  <h2 id="activity-title" :class="sectionTitle">
                    Sales activity
                  </h2>
                  <p :class="sectionCaption">{{ current.activity.caption }}</p>
                </div>
                <div class="relative mx-auto w-full max-w-72">
                  <svg
                    viewBox="0 0 200 110"
                    class="w-full"
                    role="img"
                    :aria-label="current.activity.summary"
                  >
                    <path
                      :d="GAUGE_ARC"
                      pathLength="100"
                      fill="none"
                      stroke-width="20"
                      class="stroke-subtle"
                    />
                    <path
                      v-for="(entry, index) in current.activity.segments"
                      :key="entry.label"
                      :d="GAUGE_ARC"
                      pathLength="100"
                      fill="none"
                      stroke-width="20"
                      :stroke-dasharray="
                        dashFor(current.activity.segments, index).dasharray
                      "
                      :stroke-dashoffset="
                        dashFor(current.activity.segments, index).dashoffset
                      "
                      :class="segmentClasses[index]"
                    />
                  </svg>
                  <div
                    class="absolute inset-x-0 bottom-0 grid justify-items-center gap-0.5"
                  >
                    <p
                      class="text-2xl font-semibold tracking-tight tabular-nums"
                    >
                      {{ current.activity.total }}
                    </p>
                    <p class="text-xs text-muted">Total orders</p>
                  </div>
                </div>
                <ul class="grid gap-3">
                  <li
                    v-for="(entry, index) in current.activity.segments"
                    :key="entry.label"
                    class="flex items-center justify-between gap-3"
                  >
                    <span class="flex items-center gap-2">
                      <span
                        :class="['size-2.5 rounded-full', dotClasses[index]]"
                        aria-hidden="true"
                      />
                      {{ entry.label }}
                    </span>
                    <span class="flex items-center gap-2 tabular-nums">
                      <span class="font-medium text-ink">{{
                        entry.count
                      }}</span>
                      <span class="w-10 text-right text-muted"
                        >{{ entry.share }}%</span
                      >
                    </span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          <div class="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <Card aria-labelledby="sellers-title" class="min-w-0">
              <div class="grid gap-5">
                <div class="grid gap-1">
                  <h2 id="sellers-title" :class="sectionTitle">Best sellers</h2>
                  <p :class="sectionCaption">
                    {{ labelOf(ranges, appliedRange) }},
                    {{ labelOf(categories, appliedCategory) }}
                  </p>
                </div>
                <div
                  role="region"
                  aria-label="Best sellers"
                  tabindex="0"
                  :class="[tableWrap, focusRing]"
                >
                  <table class="w-full border-collapse text-sm">
                    <thead>
                      <tr :class="headRow">
                        <th
                          v-for="column in columns"
                          :key="column.key"
                          scope="col"
                          :aria-sort="ariaSort(column.key)"
                          :class="[
                            headCell,
                            column.numeric ? 'text-right' : 'text-left',
                          ]"
                        >
                          <button
                            type="button"
                            :class="[
                              '-my-0.5 inline-flex min-h-6 items-center gap-1 rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none',
                              column.key === sortKey && 'text-ink',
                              focusRing,
                            ]"
                            @click="sortBy(column.key, column.numeric)"
                          >
                            {{ column.label }}
                            <Icon :d="sortIcon(column.key)" cls="size-3.5" />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="seller in visibleSellers"
                        :key="seller.name"
                        :class="row"
                      >
                        <td class="px-4 py-3">
                          <div class="flex items-center gap-3">
                            <Avatar :name="seller.name" size="sm" />
                            <span
                              class="font-medium whitespace-nowrap text-ink"
                              >{{ seller.name }}</span
                            >
                          </div>
                        </td>
                        <td class="px-4 py-3">
                          <div class="grid">
                            <span class="whitespace-nowrap text-ink">{{
                              seller.product
                            }}</span>
                            <span class="text-xs text-muted">{{
                              labelOf(categories, seller.category)
                            }}</span>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-right">
                          <Badge
                            :variant="seller.change >= 0 ? 'success' : 'danger'"
                            :dot="false"
                            ><span>{{ signed(seller.change) }}</span></Badge
                          >
                        </td>
                        <td
                          class="px-4 py-3 text-right font-medium whitespace-nowrap text-ink tabular-nums"
                        >
                          Rp {{ seller.total.toFixed(1) }}M
                        </td>
                      </tr>
                      <tr
                        v-if="visibleSellers.length === 0"
                        class="border-t border-line"
                      >
                        <td
                          colspan="4"
                          class="px-4 py-8 text-center text-muted"
                        >
                          No sellers match your filters.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            <Card aria-labelledby="regions-title">
              <div class="grid gap-5">
                <div class="grid gap-1">
                  <h2 id="regions-title" :class="sectionTitle">
                    Orders by region
                  </h2>
                  <p :class="sectionCaption">{{ current.regions.caption }}</p>
                </div>
                <div class="flex items-baseline gap-2">
                  <p class="text-3xl font-semibold tracking-tight tabular-nums">
                    {{ current.regions.total }}
                  </p>
                  <p class="text-sm text-muted">orders from 34 provinces</p>
                </div>
                <ul class="grid gap-4">
                  <li
                    v-for="region in current.regions.items"
                    :key="region.name"
                    class="grid gap-2"
                  >
                    <div class="flex items-center justify-between gap-3">
                      <span class="font-medium text-ink">{{
                        region.name
                      }}</span>
                      <span class="text-muted tabular-nums"
                        >{{ region.share }}%</span
                      >
                    </div>
                    <Progress
                      :value="region.share"
                      :aria-label="`${region.name} share of orders`"
                      class="h-1.5!"
                    />
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>

        <div v-if="page === 'analytics'" class="grid min-w-0 gap-6">
          <section aria-labelledby="traffic-title">
            <h2 id="traffic-title" class="sr-only">Traffic metrics</h2>
            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <article
                v-for="(label, index) in kpiLabels"
                :key="label"
                :class="[panel, 'grid gap-3 p-5']"
              >
                <h3 class="text-sm font-medium text-muted">{{ label }}</h3>
                <div class="flex items-center justify-between gap-3">
                  <p class="text-2xl font-semibold tracking-tight tabular-nums">
                    {{ stats.kpis[index] }}
                  </p>
                  <Badge
                    :variant="
                      stats.changes[index]?.startsWith('-')
                        ? 'danger'
                        : 'success'
                    "
                    :dot="false"
                    ><span>{{ stats.changes[index] }}</span></Badge
                  >
                </div>
              </article>
            </div>
          </section>
          <div class="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <Card aria-labelledby="trend-title">
              <div class="grid gap-6">
                <div class="flex flex-wrap items-start justify-between gap-4">
                  <div class="grid gap-1">
                    <h2 id="trend-title" :class="sectionTitle">Sales trend</h2>
                    <p :class="sectionCaption">{{ stats.caption }}</p>
                  </div>
                  <p class="text-lg font-semibold tabular-nums">
                    {{ stats.total }}
                  </p>
                </div>
                <div class="grid gap-3">
                  <svg
                    :viewBox="`0 0 ${CHART_W} ${CHART_H}`"
                    preserveAspectRatio="none"
                    class="h-56 w-full text-primary"
                    role="img"
                    :aria-label="stats.summary"
                  >
                    <path
                      d="M0 50H600M0 100H600M0 150H600"
                      class="stroke-line"
                      stroke-dasharray="4 4"
                      vector-effect="non-scaling-stroke"
                    />
                    <path
                      :d="`${trend}L${CHART_W} ${CHART_H}L0 ${CHART_H}Z`"
                      class="fill-primary/10"
                    />
                    <path
                      :d="trend"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linejoin="round"
                      vector-effect="non-scaling-stroke"
                    />
                  </svg>
                  <div
                    class="flex justify-between text-xs text-muted"
                    aria-hidden="true"
                  >
                    <span v-for="label in stats.axis" :key="label">{{
                      label
                    }}</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card aria-labelledby="funnel-title">
              <div class="grid gap-5">
                <div class="grid gap-1">
                  <h2 id="funnel-title" :class="sectionTitle">
                    Conversion funnel
                  </h2>
                  <p :class="sectionCaption">
                    From store visit to completed order
                  </p>
                </div>
                <ol class="grid gap-5">
                  <li
                    v-for="(step, index) in funnelSteps"
                    :key="step"
                    class="grid gap-2"
                  >
                    <div class="flex items-center justify-between gap-3">
                      <span class="font-medium text-ink">{{ step }}</span>
                      <span class="text-muted tabular-nums"
                        >{{
                          (stats.funnel[index] ?? 0).toLocaleString("en-US")
                        }}
                        ({{
                          shareOf(
                            stats.funnel[index] ?? 0,
                            stats.funnel[0] ?? 1,
                          )
                        }}%)</span
                      >
                    </div>
                    <Progress
                      :value="
                        shareOf(stats.funnel[index] ?? 0, stats.funnel[0] ?? 1)
                      "
                      :aria-label="`${step}, ${shareOf(stats.funnel[index] ?? 0, stats.funnel[0] ?? 1)}% of visits`"
                      class="h-1.5!"
                    />
                  </li>
                </ol>
              </div>
            </Card>
          </div>
          <Card aria-labelledby="channels-title">
            <div class="grid gap-5">
              <div class="grid gap-1">
                <h2 id="channels-title" :class="sectionTitle">
                  Traffic channels
                </h2>
                <p :class="sectionCaption">
                  Where your {{ stats.kpis[0] }} visitors came from
                </p>
              </div>
              <div
                class="flex h-3 gap-1 overflow-hidden rounded-full"
                aria-hidden="true"
              >
                <span
                  v-for="(share, index) in stats.channels"
                  :key="channelNames[index]"
                  :class="['h-full', channelClasses[index]]"
                  :style="{ width: `${share}%` }"
                />
              </div>
              <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <li
                  v-for="(share, index) in stats.channels"
                  :key="channelNames[index]"
                  class="grid gap-1"
                >
                  <span class="flex items-center gap-2 text-muted">
                    <span
                      :class="['size-2.5 rounded-full', channelClasses[index]]"
                      aria-hidden="true"
                    />
                    {{ channelNames[index] }}
                  </span>
                  <span
                    class="text-xl font-semibold tracking-tight tabular-nums"
                    >{{ share }}%</span
                  >
                  <span class="text-xs text-muted tabular-nums"
                    >{{ visitsOf(stats.funnel[0] ?? 0, share) }} visits</span
                  >
                </li>
              </ul>
            </div>
          </Card>
        </div>

        <div v-if="page === 'customers'" class="grid min-w-0 gap-6">
          <Card aria-labelledby="customers-title" class="min-w-0">
            <div class="grid gap-5">
              <div class="flex flex-wrap items-end justify-between gap-4">
                <div class="grid gap-1">
                  <h2 id="customers-title" :class="sectionTitle">
                    Customer list
                  </h2>
                  <p :class="sectionCaption" aria-live="polite">
                    Showing {{ visibleCustomers.length }} of
                    {{ customers.length }} customers
                  </p>
                </div>
                <ToggleGroup
                  label="Segment"
                  :items="segments"
                  :model-value="segment"
                  class="flex-wrap"
                  @update:model-value="setSegment"
                />
              </div>
              <div class="relative sm:max-w-xs">
                <Input
                  v-model="customerQuery"
                  type="search"
                  aria-label="Search customers"
                  placeholder="Search name, email or city"
                  class="pl-9!"
                />
                <Icon :d="icons.search" :cls="searchIcon" />
              </div>
              <div
                role="region"
                aria-label="Customers"
                tabindex="0"
                :class="[tableWrap, focusRing]"
              >
                <table class="w-full border-collapse text-sm">
                  <thead>
                    <tr :class="headRow">
                      <th scope="col" :class="headCell">Customer</th>
                      <th scope="col" :class="headCell">City</th>
                      <th scope="col" :class="headCell">Segment</th>
                      <th scope="col" :class="[headCell, 'text-right']">
                        Orders
                      </th>
                      <th scope="col" :class="[headCell, 'text-right']">
                        Total spent
                      </th>
                      <th scope="col" :class="headCell">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="entry in visibleCustomers"
                      :key="entry.name"
                      :class="row"
                    >
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-3">
                          <Avatar :name="entry.name" size="sm" />
                          <div class="grid">
                            <span
                              class="font-medium whitespace-nowrap text-ink"
                              >{{ entry.name }}</span
                            >
                            <span class="text-xs text-muted">{{
                              entry.email
                            }}</span>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        {{ entry.city }}
                      </td>
                      <td class="px-4 py-3">
                        <Badge :variant="segmentBadges[entry.segment]">{{
                          labelOf(segments, entry.segment)
                        }}</Badge>
                      </td>
                      <td class="px-4 py-3 text-right tabular-nums">
                        {{ entry.orders }}
                      </td>
                      <td
                        class="px-4 py-3 text-right font-medium whitespace-nowrap text-ink tabular-nums"
                      >
                        {{ entry.spent }}
                      </td>
                      <td class="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          :aria-label="`View ${entry.name}`"
                          @click="viewCustomer(entry.name)"
                          >View</Button
                        >
                      </td>
                    </tr>
                    <tr
                      v-if="visibleCustomers.length === 0"
                      class="border-t border-line"
                    >
                      <td colspan="6" class="px-4 py-8 text-center text-muted">
                        No customers match your search.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
          <Drawer :id="CUSTOMER_ID" title="Customer details">
            <div v-if="customerDetails" class="grid gap-6">
              <div class="grid gap-0.5">
                <p class="text-base font-semibold text-ink">
                  {{ customerDetails.name }}
                </p>
                <p>{{ customerDetails.email }}</p>
              </div>
              <dl class="grid grid-cols-2 gap-4">
                <div
                  v-for="[term, value] in customerDetails.items"
                  :key="term"
                  class="grid gap-1"
                >
                  <dt class="text-xs">{{ term }}</dt>
                  <dd class="font-medium text-ink">{{ value }}</dd>
                </div>
              </dl>
            </div>
            <template #footer>
              <Button type="submit" @click="go('messages')">
                <Icon :d="icons.messages" />
                Send message
              </Button>
            </template>
          </Drawer>
        </div>

        <div v-if="page === 'integrations'" class="grid min-w-0 gap-6">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <ToggleGroup
              label="Category"
              :items="integrationCategories"
              :model-value="integrationCategory"
              class="flex-wrap"
              @update:model-value="setIntegrationCategory"
            />
            <p class="text-sm text-muted" aria-live="polite">
              {{ connected.length }} of {{ integrations.length }} active
            </p>
          </div>
          <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <li
              v-for="item in visibleIntegrations"
              :key="item.name"
              :class="[panel, 'grid content-start gap-4 p-5']"
            >
              <div class="flex items-center justify-between gap-3">
                <span
                  class="grid size-10 place-items-center rounded-lg bg-subtle text-sm font-semibold text-ink"
                  aria-hidden="true"
                  >{{ item.name.slice(0, 2).toUpperCase() }}</span
                >
                <Switch
                  :aria-label="`Enable ${item.name}`"
                  :model-value="connected.includes(item.name)"
                  @update:model-value="toggleIntegration(item.name, $event)"
                />
              </div>
              <div class="grid gap-1">
                <h2 :class="sectionTitle">{{ item.name }}</h2>
                <p :class="sectionCaption">{{ item.description }}</p>
              </div>
              <div class="flex items-center justify-between gap-3 text-xs">
                <span class="text-muted">{{
                  labelOf(integrationCategories, item.category)
                }}</span>
                <Badge
                  :variant="
                    connected.includes(item.name) ? 'success' : 'neutral'
                  "
                  >{{
                    connected.includes(item.name) ? "Active" : "Inactive"
                  }}</Badge
                >
              </div>
            </li>
          </ul>
        </div>

        <div v-if="page === 'messages'" class="grid min-w-0 gap-6">
          <section
            aria-label="Inbox"
            :class="[
              panel,
              'grid overflow-hidden lg:grid-cols-[20rem_minmax(0,1fr)]',
            ]"
          >
            <div
              class="grid grid-cols-1 content-start gap-1 border-b border-line p-3 lg:border-r lg:border-b-0"
            >
              <h2 class="px-3 py-2 text-sm font-semibold text-ink">
                Conversations
              </h2>
              <ul class="grid grid-cols-1 gap-1">
                <li v-for="entry in conversations" :key="entry.id">
                  <button
                    type="button"
                    :aria-current="chat === entry.id ? 'true' : undefined"
                    :class="[
                      chatItem,
                      chat === entry.id ? 'bg-subtle' : 'hover:bg-subtle/60',
                    ]"
                    @click="openChat(entry.id)"
                  >
                    <Avatar :name="entry.name" size="sm" />
                    <span class="grid min-w-0 flex-1 grid-cols-1 gap-0.5">
                      <span class="flex items-center justify-between gap-2">
                        <span class="truncate text-sm font-medium text-ink">{{
                          entry.name
                        }}</span>
                        <span class="shrink-0 text-xs text-muted">{{
                          lastOf(entry.id)?.time
                        }}</span>
                      </span>
                      <span class="flex items-center justify-between gap-2">
                        <span class="truncate text-xs text-muted">{{
                          lastOf(entry.id)?.text
                        }}</span>
                        <span
                          v-if="unreadOf(entry.id, entry.unread) > 0"
                          class="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-semibold text-on-primary"
                          >{{ unreadOf(entry.id, entry.unread)
                          }}<span class="sr-only"> unread</span></span
                        >
                      </span>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
            <div class="grid min-h-[32rem] grid-rows-[auto_minmax(0,1fr)_auto]">
              <div
                class="flex items-center justify-between gap-3 border-b border-line px-5 py-4"
              >
                <div class="grid gap-0.5">
                  <h2 :class="sectionTitle">{{ conversation.name }}</h2>
                  <p class="text-xs text-muted">{{ conversation.topic }}</p>
                </div>
                <Badge variant="success">Online</Badge>
              </div>
              <div
                role="log"
                :aria-label="`Conversation with ${conversation.name}`"
                class="grid content-start gap-4 p-5"
              >
                <div
                  v-for="(message, index) in thread"
                  :key="index"
                  :class="[
                    'grid max-w-[80%] gap-1',
                    message.from === 'me'
                      ? 'justify-items-end justify-self-end'
                      : 'justify-items-start justify-self-start',
                  ]"
                >
                  <p
                    :class="[
                      'rounded-2xl px-4 py-2.5 text-sm',
                      message.from === 'me'
                        ? 'bg-primary text-on-primary'
                        : 'bg-subtle text-ink',
                    ]"
                  >
                    {{ message.text }}
                  </p>
                  <span class="text-xs text-muted">{{ message.time }}</span>
                </div>
              </div>
              <form
                class="flex items-end gap-2 border-t border-line p-4"
                @submit.prevent="sendReply"
              >
                <div class="min-w-0 flex-1">
                  <Input
                    v-model="reply"
                    :aria-label="`Reply to ${conversation.name}`"
                    placeholder="Write a reply"
                  />
                </div>
                <Button type="submit">
                  <Icon :d="icons.send" />
                  Send
                </Button>
              </form>
            </div>
          </section>
        </div>

        <div
          v-if="page === 'reviews'"
          class="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
        >
          <Card aria-labelledby="rating-title" class="self-start">
            <div class="grid gap-5">
              <h2 id="rating-title" :class="sectionTitle">Rating summary</h2>
              <div class="flex items-center gap-4">
                <p class="text-5xl font-semibold tracking-tight tabular-nums">
                  4.5
                </p>
                <div class="grid gap-1">
                  <Stars :rating="4.5" />
                  <p class="text-sm text-muted">From 1,248 reviews</p>
                </div>
              </div>
              <ul class="grid gap-3">
                <li
                  v-for="entry in ratingBreakdown"
                  :key="entry.stars"
                  class="grid grid-cols-[3.5rem_minmax(0,1fr)_2.5rem] items-center gap-3"
                >
                  <span class="text-muted">{{ entry.label }}</span>
                  <Progress
                    :value="entry.share"
                    :aria-label="`${entry.label}, ${entry.share}% of reviews`"
                    class="h-1.5!"
                  />
                  <span class="text-right text-muted tabular-nums">{{
                    entry.count
                  }}</span>
                </li>
              </ul>
            </div>
          </Card>
          <Card aria-labelledby="reviews-title" class="min-w-0">
            <div class="grid gap-5">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <h2 id="reviews-title" :class="sectionTitle">Latest reviews</h2>
                <ToggleGroup
                  label="Filter by rating"
                  :items="starFilters"
                  :model-value="stars"
                  class="flex-wrap"
                  @update:model-value="setStars"
                />
              </div>
              <ul class="grid gap-5">
                <li
                  v-for="entry in visibleReviews"
                  :key="entry.name"
                  class="grid gap-3 border-t border-line pt-5 first:border-t-0 first:pt-0"
                >
                  <div class="flex flex-wrap items-start justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <Avatar :name="entry.name" size="sm" />
                      <div class="grid">
                        <span class="font-medium text-ink">{{
                          entry.name
                        }}</span>
                        <span class="text-xs text-muted"
                          >{{ entry.product }}, {{ entry.date }}</span
                        >
                      </div>
                    </div>
                    <Stars :rating="entry.rating" />
                  </div>
                  <p class="text-ink">{{ entry.text }}</p>
                  <div
                    v-if="replies[entry.name]"
                    class="grid gap-1 rounded-lg bg-subtle p-3"
                  >
                    <span class="text-xs font-medium text-muted"
                      >Your reply</span
                    >
                    <p class="text-ink">{{ replies[entry.name] }}</p>
                  </div>
                  <div v-else>
                    <Button
                      variant="secondary"
                      size="sm"
                      :aria-label="`Reply to ${entry.name}`"
                      @click="openReply(entry.name)"
                      >Reply</Button
                    >
                  </div>
                </li>
              </ul>
            </div>
          </Card>
          <Modal :id="REPLY_ID" title="Reply to review">
            <div class="grid gap-4">
              <blockquote class="grid gap-1 rounded-lg bg-subtle p-3">
                <span class="font-medium text-ink">{{ review?.name }}</span>
                <span>{{ review?.text }}</span>
              </blockquote>
              <Textarea v-model="draftReply" label="Your reply" :rows="4" />
            </div>
            <template #footer>
              <Button variant="secondary" type="submit" value="cancel"
                >Cancel</Button
              >
              <Button type="submit" value="post" @click="postReply"
                >Post reply</Button
              >
            </template>
          </Modal>
        </div>

        <div
          v-if="page === 'help'"
          class="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
        >
          <Card aria-labelledby="faq-title" class="min-w-0">
            <div class="grid gap-5">
              <div class="grid gap-1">
                <h2 id="faq-title" :class="sectionTitle">
                  Frequently asked questions
                </h2>
                <p :class="sectionCaption" aria-live="polite">
                  Showing {{ visibleFaqs.length }} of {{ faqs.length }} articles
                </p>
              </div>
              <div class="relative">
                <Input
                  v-model="faqQuery"
                  type="search"
                  aria-label="Search help articles"
                  placeholder="Search payouts, shipping, refunds"
                  class="pl-9!"
                />
                <Icon :d="icons.search" :cls="searchIcon" />
              </div>
              <Accordion
                v-if="visibleFaqs.length > 0"
                :items="visibleFaqs"
                default-value="payout"
              >
                <template
                  v-for="faq in visibleFaqs"
                  :key="faq.value"
                  #[faq.value]
                  >{{ faq.content }}</template
                >
              </Accordion>
              <p v-else class="py-8 text-center text-muted">
                No articles match your search.
              </p>
            </div>
          </Card>
          <Card aria-labelledby="contact-title" class="self-start">
            <div class="grid gap-4">
              <div class="grid gap-1">
                <h2 id="contact-title" :class="sectionTitle">
                  Still need help?
                </h2>
                <p :class="sectionCaption">
                  Our team replies within 2 hours, every day from 08.00 to 20.00
                  WIB.
                </p>
              </div>
              <Button @click="startChat">
                <Icon :d="icons.messages" />
                Start a chat
              </Button>
              <p :class="sectionCaption">
                Or email
                <a
                  href="mailto:support@larisa.id"
                  :class="[
                    'rounded-sm font-medium text-primary underline underline-offset-2',
                    focusRing,
                  ]"
                  >support@larisa.id</a
                >
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
    <AlertDialog
      :id="LOGOUT_ID"
      title="Log out of Larisa?"
      variant="danger"
      action-label="Log out"
      @action="signOut"
    >
      You will need to sign in again to manage your store.
    </AlertDialog>
    <Toaster />
  </div>
</template>
