<script setup lang="ts">
import {
  computed,
  h,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  type FunctionalComponent,
} from "vue";
import Badge from "../../../components/badge/Badge.vue";
import Button from "../../../components/button/Button.vue";
import Checkbox from "../../../components/checkbox/Checkbox.vue";
import Drawer from "../../../components/drawer/Drawer.vue";
import DropdownMenu from "../../../components/dropdown-menu/DropdownMenu.vue";
import Input from "../../../components/input/Input.vue";
import Modal from "../../../components/modal/Modal.vue";
import Popover from "../../../components/popover/Popover.vue";
import Progress from "../../../components/progress/Progress.vue";
import Select from "../../../components/select/Select.vue";
import Switch from "../../../components/switch/Switch.vue";
import Table from "../../../components/table/Table.vue";
import Toaster, { toast } from "../../../components/toast/Toast.vue";
import ToggleGroup from "../../../components/toggle-group/ToggleGroup.vue";

type DropdownMenuItem =
  { separator: true } | { separator?: false; label: string; value?: string };

// prettier-ignore
const icons = {
  menu: "M4 6h16M4 12h16M4 18h16",
  box: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  plus: "M12 5v14M5 12h14",
  check: "m5 12.5 4.5 4.5L19 7.5",
  sort: "m6 15 6-6 6 6",
  next: "M5 12h14M13 6l6 6-6 6",
  download: "M12 4v11M7 10l5 5 5-5M5 20h14",
};
type IconName = keyof typeof icons;

// prettier-ignore
const pages = {
  overview: { label: "Overview", title: "Overview" },
  products: { label: "Products", title: "Products" },
  movements: { label: "Stock movements", title: "Stock movements" },
  orders: { label: "Purchase orders", title: "Purchase orders" },
  shipments: { label: "Shipments", title: "Shipments" },
  suppliers: { label: "Suppliers", title: "Suppliers" },
  reports: { label: "Reports", title: "Reports" },
  settings: { label: "Settings", title: "Settings" },
} as const;
type PageId = keyof typeof pages;
const pageIds = Object.keys(pages) as PageId[];
const DEFAULT_PAGE: PageId = "overview";
const TITLE_ID = "gudang-page-title";
const PRODUCT_DRAWER = "gudang-product-drawer";
const PRODUCT_MODAL = "gudang-product-modal";
const ADJUST_MODAL = "gudang-adjust-modal";
const CONTACT_MODAL = "gudang-contact-modal";
const TODAY = "2026-11-20";
const TODAY_LABEL = "Fri, 20 Nov 2026";
const TAX_RATE = 0.11;
const NEAR_CAPACITY = 90;

/* Gudang */
// prettier-ignore
const warehouses = {
  jkt: { label: "Jakarta", code: "JKT", site: "Cakung DC" },
  sby: { label: "Surabaya", code: "SBY", site: "Rungkut DC" },
  mdn: { label: "Medan", code: "MDN", site: "KIM Mabar DC" },
};
type Wh = keyof typeof warehouses;
const whIds = Object.keys(warehouses) as Wh[];
const DEFAULT_WH: Wh = "jkt";

/* Produk: stok per gudang, harga pokok per satuan, titik pesan ulang per gudang. */
type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  reorder: number;
  supplier: string;
  stock: Record<Wh, number>;
};
// prettier-ignore
const productList: Product[] = [
  { id: "p1", sku: "BEV-1042", name: "Teh Melati Botol 450 ml", category: "Beverages", unit: "carton", price: 86000, reorder: 400, supplier: "s1", stock: { jkt: 1840, sby: 620, mdn: 310 } },
  { id: "p2", sku: "BEV-1108", name: "Kopi Gayo Bubuk 250 g", category: "Beverages", unit: "carton", price: 412000, reorder: 150, supplier: "s2", stock: { jkt: 96, sby: 240, mdn: 180 } },
  { id: "p3", sku: "STP-2015", name: "Beras Pandan Wangi 5 kg", category: "Staples", unit: "sack", price: 74500, reorder: 600, supplier: "s3", stock: { jkt: 2460, sby: 1380, mdn: 540 } },
  { id: "p4", sku: "STP-2033", name: "Minyak Goreng Sawit 2 L", category: "Staples", unit: "carton", price: 198000, reorder: 300, supplier: "s4", stock: { jkt: 0, sby: 410, mdn: 265 } },
  { id: "p5", sku: "STP-2071", name: "Gula Pasir 1 kg", category: "Staples", unit: "bale", price: 162000, reorder: 250, supplier: "s5", stock: { jkt: 730, sby: 190, mdn: 420 } },
  { id: "p6", sku: "STP-2096", name: "Mi Instan Ayam Bawang", category: "Staples", unit: "carton", price: 108000, reorder: 500, supplier: "s3", stock: { jkt: 3120, sby: 1760, mdn: 0 } },
  { id: "p7", sku: "HSH-3004", name: "Deterjen Bubuk 1,8 kg", category: "Household", unit: "carton", price: 236000, reorder: 200, supplier: "s6", stock: { jkt: 540, sby: 88, mdn: 230 } },
  { id: "p8", sku: "HSH-3027", name: "Sabun Cuci Piring 800 ml", category: "Household", unit: "carton", price: 144000, reorder: 180, supplier: "s6", stock: { jkt: 410, sby: 372, mdn: 96 } },
];
const categories = ["Beverages", "Staples", "Household"];
const SKU_PATTERN = /^[A-Z]{3}-\d{4}$/;
// prettier-ignore
const stockStatus = {
  ok: { label: "In stock", variant: "success" },
  low: { label: "Low stock", variant: "warning" },
  out: { label: "Out of stock", variant: "danger" },
} as const;
// prettier-ignore
const productColumns = [
  { key: "name", label: "Product" }, { key: "category", label: "Category" },
  { key: "jkt", label: "JKT" }, { key: "sby", label: "SBY" }, { key: "mdn", label: "MDN" },
];

/* Pemasok */
// prettier-ignore
const supplierList = [
  { id: "s1", name: "PT Tirta Melati Abadi", city: "Bekasi", category: "Beverages", lead: 3, rating: 4.7, onTime: 96, contact: "Hendra Wijaya", phone: "+62 21 8840 1127", email: "hendra@tirtamelati.co.id" },
  { id: "s2", name: "CV Gayo Lestari", city: "Takengon", category: "Beverages", lead: 9, rating: 4.4, onTime: 88, contact: "Cut Meutia", phone: "+62 643 2210 45", email: "meutia@gayolestari.id" },
  { id: "s3", name: "PT Lumbung Pangan Nusantara", city: "Karawang", category: "Staples", lead: 4, rating: 4.8, onTime: 97, contact: "Bambang Sutrisno", phone: "+62 267 8455 310", email: "bambang@lumbungpangan.co.id" },
  { id: "s4", name: "PT Sawit Makmur Sejati", city: "Dumai", category: "Staples", lead: 7, rating: 4.1, onTime: 82, contact: "Rina Siregar", phone: "+62 765 4390 882", email: "rina@sawitmakmur.co.id" },
  { id: "s5", name: "PT Manis Jaya Rafinasi", city: "Cilegon", category: "Staples", lead: 5, rating: 4.5, onTime: 91, contact: "Yohanes Gunawan", phone: "+62 254 3981 204", email: "yohanes@manisjaya.co.id" },
  { id: "s6", name: "PT Bersih Cemerlang", city: "Tangerang", category: "Household", lead: 2, rating: 4.6, onTime: 94, contact: "Dewi Lestari", phone: "+62 21 5577 0931", email: "dewi@bersihcemerlang.co.id" },
];
type Supplier = (typeof supplierList)[number];
// prettier-ignore
const supplierSorts = [
  { value: "rating", label: "Highest rating" }, { value: "lead", label: "Shortest lead time" }, { value: "onTime", label: "Best on-time rate" },
];

/* Buku mutasi stok */
// prettier-ignore
const moveTypes = {
  in: { label: "Inbound", variant: "success" },
  out: { label: "Outbound", variant: "primary" },
  transfer: { label: "Transfer", variant: "neutral" },
  adjust: { label: "Adjustment", variant: "warning" },
} as const;
type MoveType = keyof typeof moveTypes;
type Move = {
  id: string;
  wh: Wh;
  date: string;
  time: string;
  type: MoveType;
  product: string;
  qty: number;
  ref: string;
  note: string;
};
// prettier-ignore
const ledger: Move[] = [
  { id: "m1", wh: "jkt", date: "2026-11-20", time: "09:42", type: "in", product: "p3", qty: 400, ref: "GRN-20418", note: "PO-2611-009 from Lumbung Pangan" },
  { id: "m2", wh: "jkt", date: "2026-11-20", time: "08:15", type: "out", product: "p6", qty: -260, ref: "SO-48211", note: "Toko Sumber Rejeki, Bandung" },
  { id: "m3", wh: "jkt", date: "2026-11-19", time: "16:30", type: "transfer", product: "p1", qty: -300, ref: "TRF-0312", note: "To Surabaya" },
  { id: "m4", wh: "jkt", date: "2026-11-19", time: "11:05", type: "adjust", product: "p2", qty: -4, ref: "ADJ-0088", note: "Damaged in handling" },
  { id: "m5", wh: "jkt", date: "2026-11-18", time: "14:20", type: "in", product: "p7", qty: 180, ref: "GRN-20402", note: "PO-2611-011 from Bersih Cemerlang" },
  { id: "m6", wh: "jkt", date: "2026-11-17", time: "10:10", type: "out", product: "p5", qty: -120, ref: "SO-48190", note: "Koperasi Sejahtera, Serang" },
  { id: "m7", wh: "sby", date: "2026-11-20", time: "10:20", type: "transfer", product: "p1", qty: 300, ref: "TRF-0312", note: "From Jakarta" },
  { id: "m8", wh: "sby", date: "2026-11-20", time: "07:50", type: "out", product: "p3", qty: -210, ref: "SO-48214", note: "UD Tani Makmur, Malang" },
  { id: "m9", wh: "sby", date: "2026-11-19", time: "15:10", type: "out", product: "p6", qty: -340, ref: "SO-48203", note: "Koperasi Karya Bakti, Gresik" },
  { id: "m10", wh: "sby", date: "2026-11-18", time: "09:00", type: "adjust", product: "p7", qty: -6, ref: "ADJ-0087", note: "Cycle count variance" },
  { id: "m11", wh: "sby", date: "2026-11-17", time: "13:45", type: "in", product: "p4", qty: 200, ref: "GRN-20395", note: "PO-2611-006 from Sawit Makmur" },
  { id: "m12", wh: "sby", date: "2026-11-16", time: "11:30", type: "transfer", product: "p8", qty: -60, ref: "TRF-0309", note: "To Medan" },
  { id: "m13", wh: "mdn", date: "2026-11-20", time: "11:15", type: "transfer", product: "p8", qty: 60, ref: "TRF-0309", note: "From Surabaya" },
  { id: "m14", wh: "mdn", date: "2026-11-20", time: "08:40", type: "out", product: "p2", qty: -36, ref: "SO-48216", note: "Kedai Kopi Horas, Pematangsiantar" },
  { id: "m15", wh: "mdn", date: "2026-11-19", time: "14:00", type: "out", product: "p6", qty: -150, ref: "SO-48205", note: "UD Maju Bersama, Pekanbaru" },
  { id: "m16", wh: "mdn", date: "2026-11-18", time: "10:30", type: "adjust", product: "p4", qty: 12, ref: "ADJ-0086", note: "Found during cycle count" },
  { id: "m17", wh: "mdn", date: "2026-11-17", time: "09:20", type: "in", product: "p5", qty: 160, ref: "GRN-20391", note: "PO-2611-004 from Manis Jaya" },
  { id: "m18", wh: "mdn", date: "2026-11-16", time: "15:00", type: "out", product: "p1", qty: -90, ref: "SO-48177", note: "Toko Harapan, Padang" },
];
// prettier-ignore
const moveFilters = [
  { value: "all", label: "All" }, { value: "in", label: "Inbound" }, { value: "out", label: "Outbound" },
  { value: "transfer", label: "Transfer" }, { value: "adjust", label: "Adjustment" },
];
const reasons = ["Cycle count", "Damaged", "Expired", "Found stock"];
const ADJUST_TIME = "14:05";
const NEXT_ADJUSTMENT = 89;

/* Arus barang 7 hari terakhir: [masuk, keluar] dalam unit, hari terakhir = hari ini. */
const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
// prettier-ignore
const flows: Record<Wh, number[][]> = {
  jkt: [[820, 760], [540, 610], [1100, 910], [760, 1020], [1310, 990], [890, 1140], [1240, 986]],
  sby: [[480, 520], [310, 290], [690, 640], [850, 700], [560, 780], [640, 590], [720, 815]],
  mdn: [[260, 240], [120, 180], [380, 310], [300, 420], [450, 330], [340, 290], [410, 362]],
};
const AXIS_STEP = 500;
// prettier-ignore
const seriesOptions = [
  { value: "both", label: "Both" }, { value: "in", label: "Inbound" }, { value: "out", label: "Outbound" },
];
// prettier-ignore
const zones: Record<Wh, { label: string; value: number }[]> = {
  jkt: [{ label: "Zone A, ambient racking", value: 78 }, { label: "Zone B, cold room", value: 64 }, { label: "Zone C, bulk floor", value: 92 }, { label: "Zone D, staging dock", value: 41 }],
  sby: [{ label: "Zone A, ambient racking", value: 66 }, { label: "Zone B, cold room", value: 48 }, { label: "Zone C, bulk floor", value: 73 }, { label: "Zone D, staging dock", value: 57 }],
  mdn: [{ label: "Zone A, ambient racking", value: 52 }, { label: "Zone B, cold room", value: 95 }, { label: "Zone C, bulk floor", value: 61 }, { label: "Zone D, staging dock", value: 34 }],
};

/* Purchase order */
const poSteps = ["draft", "sent", "received"] as const;
type PoStatus = (typeof poSteps)[number];
// prettier-ignore
const poStatus = {
  draft: { label: "Draft", variant: "neutral", action: "Send to supplier", done: "Sent to supplier" },
  sent: { label: "Sent", variant: "primary", action: "Receive goods", done: "Goods received" },
  received: { label: "Received", variant: "success", action: "", done: "" },
} as const;
// prettier-ignore
const orderList: { id: string; wh: Wh; supplier: string; status: PoStatus; eta: string; lines: { product: string; qty: number }[] }[] = [
  { id: "PO-2611-014", wh: "jkt", supplier: "s3", status: "sent", eta: "21 Nov 2026", lines: [{ product: "p3", qty: 400 }, { product: "p6", qty: 600 }] },
  { id: "PO-2611-015", wh: "jkt", supplier: "s4", status: "draft", eta: "24 Nov 2026", lines: [{ product: "p4", qty: 300 }] },
  { id: "PO-2611-011", wh: "jkt", supplier: "s6", status: "received", eta: "18 Nov 2026", lines: [{ product: "p7", qty: 180 }, { product: "p8", qty: 120 }] },
  { id: "PO-2611-013", wh: "sby", supplier: "s5", status: "sent", eta: "22 Nov 2026", lines: [{ product: "p5", qty: 240 }] },
  { id: "PO-2611-012", wh: "sby", supplier: "s6", status: "draft", eta: "25 Nov 2026", lines: [{ product: "p7", qty: 200 }, { product: "p8", qty: 90 }] },
  { id: "PO-2611-006", wh: "sby", supplier: "s4", status: "received", eta: "17 Nov 2026", lines: [{ product: "p4", qty: 200 }] },
  { id: "PO-2611-016", wh: "mdn", supplier: "s3", status: "sent", eta: "23 Nov 2026", lines: [{ product: "p6", qty: 500 }, { product: "p3", qty: 300 }] },
  { id: "PO-2611-017", wh: "mdn", supplier: "s1", status: "draft", eta: "26 Nov 2026", lines: [{ product: "p1", qty: 360 }] },
  { id: "PO-2611-004", wh: "mdn", supplier: "s5", status: "received", eta: "17 Nov 2026", lines: [{ product: "p5", qty: 160 }] },
];
type Order = (typeof orderList)[number];
// prettier-ignore
const orderFilters = [
  { value: "all", label: "All" }, { value: "draft", label: "Draft" }, { value: "sent", label: "Sent" }, { value: "received", label: "Received" },
];
// prettier-ignore
const lineColumns = [
  { key: "item", label: "Item" }, { key: "qty", label: "Qty", align: "right" }, { key: "cost", label: "Unit cost", align: "right" },
  { key: "subtotal", label: "Subtotal", align: "right" }, { key: "onHand", label: "On hand", align: "right" },
] satisfies { key: string; label: string; align?: "right" }[];

/* Pengiriman keluar */
const stages = ["Picking", "Packed", "Shipped", "Delivered"];
// prettier-ignore
const shipmentList: { id: string; wh: Wh; customer: string; city: string; items: number; courier: string; tracking: string; stage: string }[] = [
  { id: "SO-48211", wh: "jkt", customer: "Toko Sumber Rejeki", city: "Bandung", items: 26, courier: "JNE Trucking", tracking: "JN3390127761", stage: "Picking" },
  { id: "SO-48212", wh: "jkt", customer: "Mitra Swalayan", city: "Bogor", items: 48, courier: "Armada Gudang", tracking: "AG-B-9214-TXA", stage: "Picking" },
  { id: "SO-48208", wh: "jkt", customer: "CV Berkah Abadi", city: "Semarang", items: 32, courier: "SiCepat Cargo", tracking: "SC8821904417", stage: "Packed" },
  { id: "SO-48201", wh: "jkt", customer: "Toko Anugerah", city: "Cirebon", items: 18, courier: "J&T Cargo", tracking: "JT5510982236", stage: "Shipped" },
  { id: "SO-48190", wh: "jkt", customer: "Koperasi Sejahtera", city: "Serang", items: 12, courier: "JNE Trucking", tracking: "JN3390127754", stage: "Delivered" },
  { id: "SO-48214", wh: "sby", customer: "UD Tani Makmur", city: "Malang", items: 21, courier: "Armada Gudang", tracking: "AG-L-7730-KC", stage: "Picking" },
  { id: "SO-48213", wh: "sby", customer: "Toko Barokah", city: "Kediri", items: 15, courier: "SiCepat Cargo", tracking: "SC8821904455", stage: "Packed" },
  { id: "SO-48209", wh: "sby", customer: "Swalayan Delta", city: "Sidoarjo", items: 40, courier: "J&T Cargo", tracking: "JT5510982301", stage: "Packed" },
  { id: "SO-48203", wh: "sby", customer: "Koperasi Karya Bakti", city: "Gresik", items: 34, courier: "JNE Trucking", tracking: "JN3390127702", stage: "Shipped" },
  { id: "SO-48195", wh: "sby", customer: "Toko Lestari", city: "Madiun", items: 9, courier: "SiCepat Cargo", tracking: "SC8821904380", stage: "Delivered" },
  { id: "SO-48216", wh: "mdn", customer: "Kedai Kopi Horas", city: "Pematangsiantar", items: 6, courier: "JNE Trucking", tracking: "JN3390127790", stage: "Picking" },
  { id: "SO-48215", wh: "mdn", customer: "Toko Sinar Deli", city: "Binjai", items: 22, courier: "Armada Gudang", tracking: "AG-BK-8102-MD", stage: "Picking" },
  { id: "SO-48210", wh: "mdn", customer: "Minimarket Tapian", city: "Tebing Tinggi", items: 14, courier: "J&T Cargo", tracking: "JT5510982340", stage: "Packed" },
  { id: "SO-48205", wh: "mdn", customer: "UD Maju Bersama", city: "Pekanbaru", items: 30, courier: "SiCepat Cargo", tracking: "SC8821904402", stage: "Shipped" },
  { id: "SO-48177", wh: "mdn", customer: "Toko Harapan", city: "Padang", items: 11, courier: "JNE Trucking", tracking: "JN3390127688", stage: "Delivered" },
];
type Shipment = (typeof shipmentList)[number];
const couriers = [
  "JNE Trucking",
  "SiCepat Cargo",
  "J&T Cargo",
  "Armada Gudang",
];

/* Laporan: porsi umur stok (%) dan produk terlaris 30 hari (unit). */
const ageBuckets = [
  "0 to 30 days",
  "31 to 60 days",
  "61 to 90 days",
  "Over 90 days",
];
// prettier-ignore
const ageing: Record<Wh, number[]> = { jkt: [58, 24, 12, 6], sby: [49, 28, 15, 8], mdn: [44, 27, 17, 12] };
// prettier-ignore
const movers: Record<Wh, { product: string; units: number }[]> = {
  jkt: [{ product: "p6", units: 4180 }, { product: "p3", units: 3350 }, { product: "p1", units: 2920 }, { product: "p5", units: 1460 }, { product: "p7", units: 980 }],
  sby: [{ product: "p3", units: 2740 }, { product: "p6", units: 2510 }, { product: "p1", units: 1630 }, { product: "p4", units: 1120 }, { product: "p8", units: 640 }],
  mdn: [{ product: "p6", units: 1980 }, { product: "p5", units: 1210 }, { product: "p3", units: 1090 }, { product: "p2", units: 520 }, { product: "p1", units: 470 }],
};
// prettier-ignore
const periods = [{ value: "30", label: "30 days" }, { value: "90", label: "90 days" }];
const QUARTER_FACTOR = 2.8;
const exportFormats = ["CSV", "PDF"];

/* Pengaturan */
const stockUnits = ["Carton", "Pallet", "Piece"];
const weightUnits = ["Kilogram", "Ton"];
// prettier-ignore
const alerts = [
  { key: "low", label: "Low stock alerts", hint: "When an item drops below its reorder point" },
  { key: "delay", label: "Inbound delays", hint: "When a purchase order misses its arrival date" },
  { key: "exception", label: "Shipment exceptions", hint: "Failed pickups and returned parcels" },
  { key: "digest", label: "Daily summary email", hint: "Sent at 07:00 to warehouse managers" },
];
const defaultAlerts = ["low", "delay", "exception"];
const SAFETY_DEFAULT = "14";
const SAFETY_MAX = 90;

/* Topbar */
const USER = {
  name: "Rudi Hartono",
  initials: "RH",
  role: "Warehouse manager",
};
// prettier-ignore
const notices = [
  { title: "Minyak Goreng Sawit 2 L is out of stock in Jakarta", time: "12 minutes ago" },
  { title: "PO-2611-014 from Lumbung Pangan arrives tomorrow", time: "1 hour ago" },
  { title: "SO-48190 was delivered to Koperasi Sejahtera", time: "Yesterday, 16:20" },
];
// prettier-ignore
const userMenu: DropdownMenuItem[] = [
  { label: "Profile", value: "Profile" }, { label: "Team members", value: "Team members" },
  { separator: true }, { label: "Sign out", value: "Sign out" },
];

/* Gaya */
const shell = "min-h-dvh bg-canvas text-ink";
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const iconButton = `inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const whGroup =
  "flex shrink-0 items-center gap-0.5 rounded-lg bg-subtle p-0.5 max-sm:order-last max-sm:w-full";
const whBase = `inline-flex h-9 items-center justify-center rounded-md px-2.5 max-sm:flex-1 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${focusRing}`;
const whOn = "bg-surface text-ink ring-1 ring-line";
const whOff = "text-muted hover:text-ink";
const tabBase = `inline-flex h-11 items-center border-b-2 px-3 text-sm whitespace-nowrap transition-colors duration-150 ${focusRing}`;
const tabOn = "border-primary font-medium text-ink";
const tabOff = "border-transparent text-muted hover:text-ink";
const menuItem = `flex h-10 w-full items-center rounded-lg px-3 text-left text-sm font-medium transition-colors duration-150 ${focusRing}`;
const menuOn = "bg-primary-soft text-primary";
const menuOff = "text-ink hover:bg-subtle";
const bellTrigger = "[&>button]:relative [&>button]:size-10 [&>button]:px-0";
const userTrigger = "[&>button]:gap-1.5 [&>button]:px-1.5";
const userFace =
  "inline-flex size-7 items-center justify-center rounded-md bg-primary text-xs font-semibold text-on-primary";
const card = "rounded-xl border border-line bg-surface";
const cardHead =
  "flex min-h-14 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-4 py-2.5";
const cardTitle = "text-sm font-semibold";
const toolbar = "flex flex-wrap items-center gap-2";
const toolbarEnd = "flex flex-wrap items-center gap-2 sm:ml-auto";
const scroller = "overflow-x-auto";
const table = "w-full border-collapse text-sm";
const th =
  "h-10 border-b border-line bg-subtle px-4 text-left text-xs font-medium whitespace-nowrap text-muted";
const td = "border-b border-line px-4 py-2.5 whitespace-nowrap";
const sortButton = `-mx-1 inline-flex h-7 items-center gap-1 rounded-sm px-1 hover:text-ink ${focusRing}`;
const mono = "font-mono text-xs text-muted";
const linkButton = `rounded-sm text-left font-medium hover:underline ${focusRing}`;
const kpiGrid =
  "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line";
const kpiCell = "grid content-start gap-1 bg-surface p-4";
const kpiValue = "text-2xl font-semibold tracking-tight tabular-nums";
const bar = "w-full max-w-6 rounded-t-sm";
const barIn = "bg-primary";
const barOut = "bg-primary-line";
const legendDot = "size-2 rounded-xs";
const warnBar =
  "[&::-moz-progress-bar]:bg-warning [&::-webkit-progress-value]:bg-warning";
const stepDot =
  "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold";
const stepDone = "border-primary bg-primary text-on-primary";
const stepNow = "border-primary text-primary";
const stepNext = "border-line text-muted";
const orderItem = `grid w-full gap-1 border-b border-line px-4 py-3 text-left transition-colors duration-150 last:border-b-0 ${focusRing} -outline-offset-2`;
const orderOn = "bg-primary-soft";
const orderOff = "hover:bg-subtle";
const meter = "h-2 overflow-hidden rounded-full bg-subtle";
const fieldGrid = "grid items-start gap-4 sm:grid-cols-2";
const formFooter = "flex flex-wrap justify-end gap-2 pt-2";

const num = (value: number) => value.toLocaleString("id-ID");
const signed = (value: number) => `${value > 0 ? "+" : ""}${num(value)}`;
const rupiah = (value: number) => `Rp ${num(value)}`;
/** Rupiah ringkas untuk angka besar: miliar (M) atau juta (jt). */
const compact = (value: number) =>
  value >= 1e9
    ? `Rp ${(value / 1e9).toFixed(2).replace(".", ",")} M`
    : `Rp ${(value / 1e6).toFixed(1).replace(".", ",")} jt`;
const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;
/** "2026-11-20" menjadi "20 Nov". */
const shortDate = (iso: string) =>
  `${Number(iso.slice(8))} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Number(iso.slice(5, 7)) - 1]}`;
const productById = (id: string) => productList.find((item) => item.id === id)!;
const supplierById = (id: string) =>
  supplierList.find((item) => item.id === id)!;
const statusOf = (product: Product, wh: Wh) =>
  product.stock[wh] === 0
    ? "out"
    : product.stock[wh] <= product.reorder
      ? "low"
      : "ok";
const stockValue = (wh: Wh) =>
  productList.reduce((sum, item) => sum + item.stock[wh] * item.price, 0);
const orderTotal = (order: Order) =>
  order.lines.reduce(
    (sum, line) => sum + line.qty * productById(line.product).price,
    0,
  );
const toggleIn = (list: string[], id: string) =>
  list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
const notify = (title: string, description = "") =>
  toast({ title, description, variant: "success" });

const emptyProduct = { name: "", sku: "", category: categories[0]!, stock: "" };
const emptyAdjustment = { product: "p1", qty: "", reason: reasons[0]! };

/** Halaman aktif disimpan di hash URL supaya bisa dibagikan dan tombol Back bekerja. */
function readHash(): PageId {
  const id = window.location.hash.slice(1);
  return id in pages ? (id as PageId) : DEFAULT_PAGE;
}

function dialogOf(id: string) {
  const dialog = document.getElementById(id);
  return dialog instanceof HTMLDialogElement ? dialog : null;
}
const openDialog = (id: string) => dialogOf(id)?.showModal();
const closeDialog = (id: string) => dialogOf(id)?.close();

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

/* Navigasi dan state bersama */
const page = ref<PageId>(DEFAULT_PAGE);
const wh = ref<Wh>(DEFAULT_WH);
const query = ref("");
const unread = ref(true);
/** State halaman: dibuat ulang setiap pindah halaman atau gudang. */
const fresh = () => ({
  series: "both",
  items: productList,
  category: "all",
  sort: { key: "name", asc: true },
  picked: [] as string[],
  productId: "p1",
  draft: { ...emptyProduct },
  errors: {} as Record<string, string>,
  moves: ledger,
  type: "all",
  from: "",
  to: "",
  adjustment: { ...emptyAdjustment },
  adjustmentError: "",
  status: Object.fromEntries(
    orderList.map((order) => [order.id, order.status]),
  ) as Record<string, PoStatus>,
  arrived: [] as string[],
  orderFilter: "all",
  orderId: "",
  stage: Object.fromEntries(
    shipmentList.map((item) => [item.id, item.stage]),
  ) as Record<string, string>,
  courier: "all",
  supplierSort: "rating",
  supplierId: "s1",
  message: "",
  messageError: "",
  period: "30",
  safety: SAFETY_DEFAULT,
  auto: true,
  unit: stockUnits[0]!,
  weight: weightUnits[0]!,
  enabled: defaultAlerts,
  safetyError: "",
});
const s = reactive(fresh());
const go = (id: PageId) => window.location.assign(`#${id}`);
const current = (id: PageId) => (page.value === id ? "page" : undefined);
/** ToggleGroup mengirim string kosong saat pilihan dilepas: pertahankan nilai lama. */
const keep = (value: string | string[] | undefined, fallback: string) =>
  (typeof value === "string" && value) || fallback;
function setWarehouse(id: Wh) {
  if (id === wh.value) return;
  wh.value = id;
  Object.assign(s, fresh());
}
function onHashChange() {
  page.value = readHash();
  Object.assign(s, fresh());
  document.getElementById(TITLE_ID)?.focus();
}
onMounted(() => {
  page.value = readHash();
  window.addEventListener("hashchange", onHashChange);
});
onBeforeUnmount(() => window.removeEventListener("hashchange", onHashChange));

/* Overview */
const flow = computed(() => flows[wh.value]);
const axisMax = computed(
  () => Math.ceil(Math.max(...flow.value.flat()) / AXIS_STEP) * AXIS_STEP,
);
const today = computed(() => flow.value[flow.value.length - 1]!);
const yesterday = computed(() => flow.value[flow.value.length - 2]!);
const totalIn = computed(() =>
  flow.value.reduce((sum, day) => sum + day[0]!, 0),
);
const totalOut = computed(() =>
  flow.value.reduce((sum, day) => sum + day[1]!, 0),
);
const short = computed(() =>
  productList.filter((item) => statusOf(item, wh.value) !== "ok"),
);
const full = computed(() =>
  zones[wh.value].filter((zone) => zone.value >= NEAR_CAPACITY),
);
// prettier-ignore
const kpis = computed(() => [
  { label: "Stock value", value: compact(stockValue(wh.value)), note: `${plural(productList.length, "SKU")} on hand` },
  { label: "Below reorder point", value: String(short.value.length), note: `${short.value.filter((item) => statusOf(item, wh.value) === "out").length} out of stock` },
  { label: "Inbound today", value: num(today.value[0]!), note: `${signed(today.value[0]! - yesterday.value[0]!)} units vs yesterday` },
  { label: "Outbound today", value: num(today.value[1]!), note: `${signed(today.value[1]! - yesterday.value[1]!)} units vs yesterday` },
]);
const height = (units: number) => ({
  height: `${(units / axisMax.value) * 100}%`,
});
const activity = computed(() =>
  ledger.filter((move) => move.wh === wh.value).slice(0, 5),
);

/* Products */
const sortValue = (item: Product) =>
  s.sort.key in item.stock
    ? item.stock[s.sort.key as Wh]
    : item[s.sort.key as "name" | "category"];
const productRows = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return s.items
    .filter(
      (item) =>
        (s.category === "all" || item.category === s.category) &&
        `${item.name} ${item.sku}`.toLowerCase().includes(needle),
    )
    .toSorted((a, b) => {
      const [x, y] = [sortValue(a), sortValue(b)];
      const order =
        typeof x === "number" ? x - (y as number) : x.localeCompare(String(y));
      return s.sort.asc ? order : -order;
    });
});
const allPicked = computed(
  () =>
    productRows.value.length > 0 &&
    productRows.value.every((row) => s.picked.includes(row.id)),
);
const product = computed(
  () => s.items.find((item) => item.id === s.productId) ?? s.items[0]!,
);
const history = computed(() =>
  ledger.filter((move) => move.product === product.value.id),
);
const ariaSort = (key: string) =>
  s.sort.key !== key ? undefined : s.sort.asc ? "ascending" : "descending";
function bulk(title: string) {
  notify(title, plural(s.picked.length, "product"));
  s.picked = [];
}
function openProduct(id: string) {
  s.productId = id;
  openDialog(PRODUCT_DRAWER);
}
function newProduct() {
  s.draft = { ...emptyProduct };
  s.errors = {};
  openDialog(PRODUCT_MODAL);
}
function submitProduct() {
  const sku = s.draft.sku.trim().toUpperCase();
  const stock = Number(s.draft.stock);
  // prettier-ignore
  const found = {
    name: s.draft.name.trim() ? "" : "Enter a product name",
    sku: !SKU_PATTERN.test(sku) ? "Use the format ABC-1234" : s.items.some((item) => item.sku === sku) ? "This SKU already exists" : "",
    stock: s.draft.stock.trim() !== "" && Number.isInteger(stock) && stock >= 0 ? "" : "Enter a quantity of 0 or more",
  };
  s.errors = found;
  if (Object.values(found).some(Boolean)) return;
  // prettier-ignore
  const added: Product = {
    id: `p${s.items.length + 1}`, sku, name: s.draft.name.trim(), category: s.draft.category, unit: "carton", price: 0, reorder: 0, supplier: "s1",
    stock: { jkt: 0, sby: 0, mdn: 0, [wh.value]: stock },
  };
  s.items = [added, ...s.items];
  closeDialog(PRODUCT_MODAL);
  notify("Product added", `${added.name} (${sku})`);
}

/* Stock movements */
const moveRows = computed(() =>
  s.moves.filter(
    (move) =>
      move.wh === wh.value &&
      (s.type === "all" || move.type === s.type) &&
      (!s.from || move.date >= s.from) &&
      (!s.to || move.date <= s.to),
  ),
);
const net = computed(() => moveRows.value.reduce((sum, m) => sum + m.qty, 0));
function newAdjustment() {
  s.adjustment = { ...emptyAdjustment };
  s.adjustmentError = "";
  openDialog(ADJUST_MODAL);
}
function submitAdjustment() {
  const draft = s.adjustment;
  const qty = Number(draft.qty);
  const valid = draft.qty.trim() !== "" && Number.isInteger(qty) && qty !== 0;
  s.adjustmentError = valid ? "" : "Enter a whole number other than 0";
  if (!valid) return;
  const count = s.moves.length - ledger.length;
  // prettier-ignore
  const added: Move = {
    id: `m${s.moves.length + 1}`, wh: wh.value, date: TODAY, time: ADJUST_TIME, type: "adjust", product: draft.product, qty,
    ref: `ADJ-${String(NEXT_ADJUSTMENT + count).padStart(4, "0")}`, note: draft.reason,
  };
  s.moves = [added, ...s.moves];
  closeDialog(ADJUST_MODAL);
  notify(
    "Adjustment recorded",
    `${productById(draft.product).name}: ${signed(qty)} ${productById(draft.product).unit}`,
  );
}

/* Purchase orders */
const orderRows = computed(() =>
  orderList.filter(
    (order) =>
      order.wh === wh.value &&
      (s.orderFilter === "all" || s.status[order.id] === s.orderFilter),
  ),
);
const order = computed(
  () =>
    orderRows.value.find((item) => item.id === s.orderId) ?? orderRows.value[0],
);
const step = computed(() =>
  order.value ? poSteps.indexOf(s.status[order.value.id]!) : 0,
);
const stepDoneAt = (index: number) =>
  index < step.value || step.value === poSteps.length - 1;
/** Stok di gudang ini ditambah barang PO yang diterima selama sesi ini. */
const onHand = (productId: string) =>
  productById(productId).stock[wh.value] +
  orderList
    .filter((item) => item.wh === wh.value && s.arrived.includes(item.id))
    .flatMap((item) => item.lines)
    .filter((line) => line.product === productId)
    .reduce((sum, line) => sum + line.qty, 0);
const lineRows = computed(() =>
  (order.value?.lines ?? []).map((line) => ({
    item: productById(line.product).name,
    qty: num(line.qty),
    cost: rupiah(productById(line.product).price),
    subtotal: rupiah(line.qty * productById(line.product).price),
    onHand: num(onHand(line.product)),
  })),
);
function advanceOrder(target: Order) {
  const from = s.status[target.id]!;
  const next = poSteps[poSteps.indexOf(from) + 1]!;
  const units = target.lines.reduce((sum, line) => sum + line.qty, 0);
  s.status = { ...s.status, [target.id]: next };
  s.orderId = target.id;
  s.orderFilter = "all";
  if (next === "received") s.arrived = [...s.arrived, target.id];
  notify(
    poStatus[from].done,
    next === "received"
      ? `${target.id}: ${signed(units)} units added to ${warehouses[wh.value].label}`
      : `${target.id} to ${supplierById(target.supplier).name}`,
  );
}

/* Shipments */
const shipments = computed(() =>
  shipmentList.filter(
    (item) =>
      item.wh === wh.value &&
      (s.courier === "all" || item.courier === s.courier),
  ),
);
const inStage = (name: string) =>
  shipments.value.filter((item) => s.stage[item.id] === name);
const openCount = computed(
  () =>
    shipments.value.filter((item) => s.stage[item.id] !== stages.at(-1)).length,
);
const nextStage = (item: Shipment) =>
  stages[stages.indexOf(s.stage[item.id]!) + 1];
function advanceShipment(item: Shipment) {
  const next = nextStage(item)!;
  s.stage = { ...s.stage, [item.id]: next };
  notify(`${item.id} moved to ${next}`, `${item.customer}, ${item.city}`);
}

/* Suppliers */
const supplierRows = computed(() => {
  const key = s.supplierSort as "rating" | "lead" | "onTime";
  return supplierList.toSorted((a, b) =>
    key === "lead" ? a.lead - b.lead : b[key] - a[key],
  );
});
const supplier = computed(() => supplierById(s.supplierId));
// prettier-ignore
const facts = (item: Supplier) => [
  { label: "Lead time", value: plural(item.lead, "day") },
  { label: "Rating", value: `${item.rating.toFixed(1).replace(".", ",")} / 5` },
  { label: "On time", value: `${item.onTime}%` },
];
function contact(id: string) {
  s.supplierId = id;
  s.message = "";
  s.messageError = "";
  openDialog(CONTACT_MODAL);
}
function submitMessage() {
  s.messageError = s.message.trim() ? "" : "Write a message first";
  if (!s.message.trim()) return;
  closeDialog(CONTACT_MODAL);
  notify("Message sent", `${supplier.value.contact} at ${supplier.value.name}`);
}

/* Reports */
const value = computed(() => stockValue(wh.value));
const moverRows = computed(() =>
  movers[wh.value].map((item) => ({
    ...item,
    units: Math.round(item.units * (s.period === "90" ? QUARTER_FACTOR : 1)),
  })),
);
// prettier-ignore
const reportKpis = computed(() => [
  { label: "Stock value", value: compact(value.value) },
  { label: "Aged over 90 days", value: compact(Math.round((value.value * ageing[wh.value].at(-1)!) / 100)) },
  { label: `Units moved, ${s.period} days`, value: num(moverRows.value.reduce((sum, item) => sum + item.units, 0)) },
]);
const exportReport = (format: string) =>
  notify(
    `${format} export ready`,
    `stock-report-${warehouses[wh.value].code.toLowerCase()}-${s.period}d.${format.toLowerCase()}`,
  );

/* Settings */
function saveSettings() {
  const days = Number(s.safety);
  const valid = Number.isInteger(days) && days >= 1 && days <= SAFETY_MAX;
  s.safetyError = valid ? "" : `Enter a number from 1 to ${SAFETY_MAX}`;
  if (!valid) return;
  notify(
    "Settings saved",
    `Safety stock ${plural(days, "day")}, ${plural(s.enabled.length, "alert")} on`,
  );
}
function resetSettings() {
  s.safety = SAFETY_DEFAULT;
  s.auto = true;
  s.enabled = defaultAlerts;
  s.safetyError = "";
  toast({ title: "Settings reset", description: "Defaults restored" });
}
</script>

<template>
  <div :class="shell">
    <header class="border-b border-line bg-surface">
      <div
        class="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-4 py-2 sm:gap-3 lg:px-6"
      >
        <Drawer title="Menu" side="left">
          <template #trigger>
            <button
              type="button"
              aria-label="Open menu"
              :class="[iconButton, 'lg:hidden']"
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
              :class="[menuItem, page === id ? menuOn : menuOff]"
              @click="go(id)"
            >
              {{ pages[id].label }}
            </button>
          </form>
        </Drawer>
        <div class="flex shrink-0 items-center gap-2">
          <span
            aria-hidden="true"
            class="flex size-8 items-center justify-center rounded-lg bg-primary text-on-primary"
          >
            <Icon name="box" class="size-4.5" />
          </span>
          <p class="text-base font-semibold tracking-tight">Gudang</p>
        </div>
        <div role="group" aria-label="Warehouse" :class="whGroup">
          <button
            v-for="id in whIds"
            :key="id"
            type="button"
            :aria-pressed="wh === id"
            :class="[whBase, wh === id ? whOn : whOff]"
            @click="setWarehouse(id)"
          >
            {{ warehouses[id].label }}
          </button>
        </div>
        <div class="ml-auto flex items-center gap-2">
          <form
            role="search"
            class="w-64 max-lg:hidden"
            @submit.prevent="go('products')"
          >
            <Input
              v-model="query"
              type="search"
              aria-label="Search products"
              placeholder="Search SKU or product"
            />
          </form>
          <Popover align="end" :class="bellTrigger">
            <template #trigger>
              <Icon name="bell" class="size-5" />
              <span class="sr-only">{{
                unread
                  ? `Notifications, ${notices.length} unread`
                  : "Notifications"
              }}</span>
              <span
                v-if="unread"
                aria-hidden="true"
                class="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"
              />
            </template>
            <p class="font-semibold">Notifications</p>
            <ul class="mt-2">
              <li
                v-for="notice in notices"
                :key="notice.title"
                class="border-b border-line py-2 last:border-b-0"
              >
                <p :class="unread ? 'font-medium' : undefined">
                  {{ notice.title }}
                </p>
                <p class="text-xs text-muted">{{ notice.time }}</p>
              </li>
            </ul>
            <Button
              variant="secondary"
              size="sm"
              class="mt-2 w-full"
              :disabled="!unread"
              @click="unread = false"
            >
              Mark all as read
            </Button>
          </Popover>
          <DropdownMenu
            :items="userMenu"
            :class="userTrigger"
            @select="(label) => notify(label, `${USER.name}, ${USER.role}`)"
          >
            <template #trigger>
              <span aria-hidden="true" :class="userFace">{{
                USER.initials
              }}</span>
              <span class="sr-only">Account menu</span>
            </template>
          </DropdownMenu>
        </div>
      </div>
      <nav
        aria-label="Sections"
        class="mx-auto flex max-w-[1440px] gap-1 px-3 max-lg:hidden"
      >
        <button
          v-for="id in pageIds"
          :key="id"
          type="button"
          :aria-current="current(id)"
          :class="[tabBase, page === id ? tabOn : tabOff]"
          @click="go(id)"
        >
          {{ pages[id].label }}
        </button>
      </nav>
    </header>

    <main
      class="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] content-start gap-5 px-4 pt-5 pb-12 lg:px-6"
    >
      <div
        class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
      >
        <h1
          :id="TITLE_ID"
          tabindex="-1"
          class="text-xl font-semibold tracking-tight focus:outline-none"
        >
          {{ pages[page].title }}
        </h1>
        <p data-context class="text-sm text-muted">
          {{
            `${warehouses[wh].label} · ${warehouses[wh].site} · ${TODAY_LABEL}`
          }}
        </p>
      </div>

      <!-- Overview -->
      <template v-if="page === 'overview'">
        <dl :class="[kpiGrid, 'lg:grid-cols-4']">
          <div v-for="kpi in kpis" :key="kpi.label" :class="kpiCell">
            <dt class="text-xs text-muted">{{ kpi.label }}</dt>
            <dd :data-kpi="kpi.label" :class="kpiValue">{{ kpi.value }}</dd>
            <dd class="text-xs text-muted">{{ kpi.note }}</dd>
          </div>
        </dl>

        <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section :class="card" aria-labelledby="gudang-flow-title">
            <div :class="cardHead">
              <h2 id="gudang-flow-title" :class="cardTitle">
                Stock movement, last 7 days
              </h2>
              <ToggleGroup
                label="Chart series"
                :items="seriesOptions"
                :model-value="s.series"
                @update:model-value="s.series = keep($event, s.series)"
              />
            </div>
            <div class="p-4">
              <div
                role="img"
                :aria-label="`Units per day for the last 7 days. Today: ${num(today[0]!)} inbound and ${num(today[1]!)} outbound.`"
                class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2"
              >
                <div
                  class="flex h-44 flex-col justify-between text-right text-xs text-muted tabular-nums"
                >
                  <span>{{ num(axisMax) }}</span>
                  <span>{{ num(axisMax / 2) }}</span>
                  <span>0</span>
                </div>
                <div
                  class="flex h-44 items-end gap-2 border-b border-line bg-[linear-gradient(var(--color-line)_1px,transparent_1px)] bg-size-[100%_50%] sm:gap-4"
                >
                  <div
                    v-for="(day, index) in flow"
                    :key="days[index]"
                    :data-day="days[index]"
                    class="flex h-full flex-1 items-end justify-center gap-1"
                  >
                    <span
                      v-if="s.series !== 'out'"
                      data-bar="in"
                      :class="[bar, barIn]"
                      :style="height(day[0]!)"
                    />
                    <span
                      v-if="s.series !== 'in'"
                      data-bar="out"
                      :class="[bar, barOut]"
                      :style="height(day[1]!)"
                    />
                  </div>
                </div>
                <span />
                <div class="flex gap-2 text-center text-xs text-muted sm:gap-4">
                  <span v-for="day in days" :key="day" class="flex-1">{{
                    day
                  }}</span>
                </div>
              </div>
              <dl
                class="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-3 text-sm"
              >
                <div class="flex items-center gap-2">
                  <span aria-hidden="true" :class="[legendDot, barIn]" />
                  <dt class="text-muted">Inbound</dt>
                  <dd class="font-medium tabular-nums">{{ num(totalIn) }}</dd>
                </div>
                <div class="flex items-center gap-2">
                  <span aria-hidden="true" :class="[legendDot, barOut]" />
                  <dt class="text-muted">Outbound</dt>
                  <dd class="font-medium tabular-nums">{{ num(totalOut) }}</dd>
                </div>
                <div class="flex items-center gap-2 sm:ml-auto">
                  <dt class="text-muted">Net change</dt>
                  <dd class="font-medium tabular-nums">
                    {{ `${signed(totalIn - totalOut)} units` }}
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section :class="card" aria-labelledby="gudang-zones-title">
            <div :class="cardHead">
              <h2 id="gudang-zones-title" :class="cardTitle">
                Capacity by zone
              </h2>
              <span class="text-xs text-muted">{{ warehouses[wh].site }}</span>
            </div>
            <ul class="grid gap-4 p-4">
              <li v-for="zone in zones[wh]" :key="zone.label">
                <Progress
                  :label="zone.label"
                  :value="zone.value"
                  :class="zone.value >= NEAR_CAPACITY ? warnBar : undefined"
                />
              </li>
            </ul>
            <p class="border-t border-line px-4 py-3 text-xs text-muted">
              {{
                full.length > 0
                  ? `${full[0]!.label.slice(0, 6)} is above ${NEAR_CAPACITY}%. Plan a transfer before the next inbound.`
                  : "All zones have room for the next inbound."
              }}
            </p>
          </section>
        </div>

        <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section :class="card" aria-labelledby="gudang-activity-title">
            <div :class="cardHead">
              <h2 id="gudang-activity-title" :class="cardTitle">
                Recent activity
              </h2>
              <Button variant="ghost" size="sm" @click="go('movements')">
                Open ledger
                <Icon name="next" class="size-4" />
              </Button>
            </div>
            <ul>
              <li
                v-for="move in activity"
                :key="move.id"
                :data-activity="move.id"
                class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 border-b border-line px-4 py-2.5 last:border-b-0 sm:grid-cols-[104px_minmax(0,1fr)_auto]"
              >
                <span class="max-sm:col-span-2">
                  <Badge :variant="moveTypes[move.type].variant">
                    {{ moveTypes[move.type].label }}
                  </Badge>
                </span>
                <span class="min-w-0">
                  <span class="block truncate text-sm font-medium">
                    {{ productById(move.product).name }}
                  </span>
                  <span class="block truncate text-xs text-muted">
                    {{
                      `${shortDate(move.date)}, ${move.time} · ${move.ref} · ${move.note}`
                    }}
                  </span>
                </span>
                <span class="text-sm font-medium tabular-nums">
                  {{ signed(move.qty) }}
                </span>
              </li>
            </ul>
          </section>

          <section :class="card" aria-labelledby="gudang-short-title">
            <div :class="cardHead">
              <h2 id="gudang-short-title" :class="cardTitle">
                Below reorder point
              </h2>
              <span class="text-xs text-muted">
                {{ plural(short.length, "item") }}
              </span>
            </div>
            <ul>
              <li
                v-for="item in short"
                :key="item.id"
                :data-short="item.id"
                class="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-b-0"
              >
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-sm font-medium">
                    {{ item.name }}
                  </span>
                  <span class="block text-xs text-muted tabular-nums">
                    {{
                      `${num(item.stock[wh])} of ${num(item.reorder)} ${item.unit}`
                    }}
                  </span>
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  :aria-label="`Reorder ${item.name}`"
                  @click="
                    notify(
                      'Draft PO created',
                      `${item.name} from ${supplierById(item.supplier).name}`,
                    )
                  "
                >
                  Reorder
                </Button>
              </li>
            </ul>
          </section>
        </div>
      </template>

      <!-- Products -->
      <template v-else-if="page === 'products'">
        <div :class="toolbar">
          <div class="w-full sm:w-64">
            <Input
              v-model="query"
              type="search"
              aria-label="Filter products"
              placeholder="Filter by name or SKU"
            />
          </div>
          <div class="w-full sm:w-44">
            <Select v-model="s.category" aria-label="Category">
              <option value="all">All categories</option>
              <option v-for="item in categories" :key="item">{{ item }}</option>
            </Select>
          </div>
          <div :class="toolbarEnd">
            <Button
              variant="secondary"
              @click="notify('Export started', 'products.csv')"
            >
              <Icon name="download" class="size-4" />
              Export
            </Button>
            <Button @click="newProduct">
              <Icon name="plus" class="size-4" />
              Add product
            </Button>
          </div>
        </div>

        <section :class="card" aria-label="Product list">
          <div
            v-if="s.picked.length > 0"
            data-bulk
            :class="[cardHead, 'bg-primary-soft']"
          >
            <p class="text-sm font-medium">
              {{ `${s.picked.length} selected` }}
            </p>
            <div class="flex flex-wrap gap-2">
              <Button size="sm" @click="bulk('Draft PO created')">
                Create PO
              </Button>
              <Button
                size="sm"
                variant="secondary"
                @click="bulk('Labels sent to printer')"
              >
                Print labels
              </Button>
              <Button size="sm" variant="ghost" @click="s.picked = []">
                Clear
              </Button>
            </div>
          </div>
          <div :class="[scroller, 'rounded-t-xl']">
            <table :class="[table, 'min-w-[760px]']">
              <thead>
                <tr>
                  <th scope="col" :class="[th, 'w-10']">
                    <Checkbox
                      aria-label="Select all products"
                      :model-value="allPicked"
                      @update:model-value="
                        s.picked = allPicked
                          ? []
                          : productRows.map((row) => row.id)
                      "
                    />
                  </th>
                  <th
                    v-for="column in productColumns"
                    :key="column.key"
                    scope="col"
                    :aria-sort="ariaSort(column.key)"
                    :class="[th, column.key in warehouses && 'text-right']"
                  >
                    <button
                      type="button"
                      :class="sortButton"
                      @click="
                        s.sort = {
                          key: column.key,
                          asc: s.sort.key === column.key ? !s.sort.asc : true,
                        }
                      "
                    >
                      {{ column.label }}
                      <Icon
                        name="sort"
                        :class="[
                          'size-3.5',
                          s.sort.key === column.key ? 'text-ink' : 'text-faint',
                          s.sort.key === column.key &&
                            !s.sort.asc &&
                            'rotate-180',
                        ]"
                      />
                    </button>
                  </th>
                  <th scope="col" :class="th">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in productRows"
                  :key="item.id"
                  :data-product="item.sku"
                >
                  <td :class="td">
                    <Checkbox
                      :aria-label="`Select ${item.name}`"
                      :model-value="s.picked.includes(item.id)"
                      @update:model-value="
                        s.picked = toggleIn(s.picked, item.id)
                      "
                    />
                  </td>
                  <td :class="td">
                    <button
                      type="button"
                      :class="linkButton"
                      @click="openProduct(item.id)"
                    >
                      {{ item.name }}
                    </button>
                    <span :class="[mono, 'block']">{{ item.sku }}</span>
                  </td>
                  <td :class="[td, 'text-muted']">{{ item.category }}</td>
                  <td
                    v-for="id in whIds"
                    :key="id"
                    :class="[
                      td,
                      'text-right tabular-nums',
                      id === wh ? 'font-medium' : 'text-muted',
                    ]"
                  >
                    {{ num(item.stock[id]) }}
                  </td>
                  <td :class="td">
                    <Badge :variant="stockStatus[statusOf(item, wh)].variant">
                      {{ stockStatus[statusOf(item, wh)].label }}
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p data-count class="px-4 py-3 text-xs text-muted">
            {{
              productRows.length > 0
                ? `${plural(productRows.length, "product")} · status for ${warehouses[wh].label}`
                : "No products match this filter."
            }}
          </p>
        </section>

        <Drawer :id="PRODUCT_DRAWER" title="Product details">
          <div class="grid gap-5 text-ink">
            <div>
              <p class="text-base font-semibold">{{ product.name }}</p>
              <p :class="mono">
                {{ `${product.sku} · ${product.category}` }}
              </p>
            </div>
            <dl class="grid gap-2">
              <div
                v-for="id in whIds"
                :key="id"
                class="flex items-center justify-between gap-4"
              >
                <dt class="text-muted">{{ warehouses[id].label }}</dt>
                <dd :data-stock="id" class="font-medium tabular-nums">
                  {{ `${num(product.stock[id])} ${product.unit}` }}
                </dd>
              </div>
              <div
                class="flex items-center justify-between gap-4 border-t border-line pt-2"
              >
                <dt class="text-muted">Reorder point</dt>
                <dd class="font-medium tabular-nums">
                  {{ `${num(product.reorder)} ${product.unit}` }}
                </dd>
              </div>
              <div class="flex items-center justify-between gap-4">
                <dt class="text-muted">Unit cost</dt>
                <dd class="font-medium tabular-nums">
                  {{ rupiah(product.price) }}
                </dd>
              </div>
              <div class="flex items-center justify-between gap-4">
                <dt class="text-muted">Supplier</dt>
                <dd class="font-medium">
                  {{ supplierById(product.supplier).name }}
                </dd>
              </div>
            </dl>
            <div>
              <h3 :class="cardTitle">Stock history</h3>
              <p v-if="history.length === 0" class="mt-2 text-muted">
                No movements yet.
              </p>
              <ul v-if="history.length > 0" class="mt-2">
                <li
                  v-for="move in history"
                  :key="move.id"
                  :data-history="move.id"
                  class="flex items-center justify-between gap-3 border-b border-line py-2 last:border-b-0"
                >
                  <span>
                    <span class="block font-medium">
                      {{
                        `${moveTypes[move.type].label} · ${warehouses[move.wh].label}`
                      }}
                    </span>
                    <span class="block text-xs text-muted">
                      {{
                        `${shortDate(move.date)}, ${move.time} · ${move.ref}`
                      }}
                    </span>
                  </span>
                  <span class="font-medium tabular-nums">
                    {{ signed(move.qty) }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <template #footer>
            <Button variant="secondary" type="submit" value="close">
              Close
            </Button>
            <Button
              type="submit"
              value="reorder"
              @click="notify('Draft PO created', product.name)"
            >
              Create PO
            </Button>
          </template>
        </Drawer>

        <Modal :id="PRODUCT_MODAL" title="Add product">
          <form novalidate class="grid gap-4" @submit.prevent="submitProduct">
            <Input
              v-model="s.draft.name"
              label="Product name"
              name="name"
              :error="s.errors.name"
            />
            <div :class="fieldGrid">
              <Input
                v-model="s.draft.sku"
                label="SKU"
                name="sku"
                placeholder="ABC-1234"
                :error="s.errors.sku"
              />
              <Select
                v-model="s.draft.category"
                label="Category"
                name="category"
              >
                <option v-for="item in categories" :key="item">
                  {{ item }}
                </option>
              </Select>
            </div>
            <Input
              v-model="s.draft.stock"
              :label="`Opening stock in ${warehouses[wh].label}`"
              name="stock"
              inputmode="numeric"
              :error="s.errors.stock"
            />
            <div :class="formFooter">
              <Button
                type="button"
                variant="secondary"
                @click="closeDialog(PRODUCT_MODAL)"
              >
                Cancel
              </Button>
              <Button type="submit">Save product</Button>
            </div>
          </form>
        </Modal>
      </template>

      <!-- Stock movements -->
      <template v-else-if="page === 'movements'">
        <div :class="toolbar">
          <div :class="[scroller, 'max-w-full']">
            <ToggleGroup
              label="Filter by type"
              :items="moveFilters"
              :model-value="s.type"
              @update:model-value="s.type = keep($event, s.type)"
            />
          </div>
          <div class="flex items-center gap-2">
            <Input v-model="s.from" type="date" aria-label="From date" />
            <span class="text-sm text-muted">to</span>
            <Input v-model="s.to" type="date" aria-label="To date" />
          </div>
          <div :class="toolbarEnd">
            <Button @click="newAdjustment">
              <Icon name="plus" class="size-4" />
              New adjustment
            </Button>
          </div>
        </div>

        <section :class="card" aria-label="Stock ledger">
          <div :class="[scroller, 'rounded-t-xl']">
            <table :class="[table, 'min-w-[820px]']">
              <thead>
                <tr>
                  <th
                    v-for="label in ['Date', 'Reference', 'Type', 'Product']"
                    :key="label"
                    scope="col"
                    :class="th"
                  >
                    {{ label }}
                  </th>
                  <th scope="col" :class="[th, 'text-right']">Quantity</th>
                  <th scope="col" :class="th">Note</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="move in moveRows"
                  :key="move.id"
                  :data-move="move.ref"
                >
                  <td :class="[td, 'tabular-nums']">
                    {{ `${shortDate(move.date)}, ${move.time}` }}
                  </td>
                  <td :class="[td, mono]">{{ move.ref }}</td>
                  <td :class="td">
                    <Badge :variant="moveTypes[move.type].variant">
                      {{ moveTypes[move.type].label }}
                    </Badge>
                  </td>
                  <td :class="td">
                    <span class="block font-medium">
                      {{ productById(move.product).name }}
                    </span>
                    <span :class="[mono, 'block']">
                      {{ productById(move.product).sku }}
                    </span>
                  </td>
                  <td :class="[td, 'text-right font-medium tabular-nums']">
                    {{ signed(move.qty) }}
                  </td>
                  <td :class="[td, 'text-muted']">{{ move.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p data-count class="px-4 py-3 text-xs text-muted">
            {{
              moveRows.length > 0
                ? `${plural(moveRows.length, "movement")} · net ${signed(net)} units`
                : "No movements in this range."
            }}
          </p>
        </section>

        <Modal :id="ADJUST_MODAL" title="New adjustment">
          <form
            novalidate
            class="grid gap-4"
            @submit.prevent="submitAdjustment"
          >
            <Select
              v-model="s.adjustment.product"
              label="Product"
              name="product"
            >
              <option
                v-for="item in productList"
                :key="item.id"
                :value="item.id"
              >
                {{ `${item.sku} · ${item.name}` }}
              </option>
            </Select>
            <div :class="fieldGrid">
              <Input
                v-model="s.adjustment.qty"
                label="Quantity change"
                name="qty"
                inputmode="numeric"
                placeholder="-12"
                :error="s.adjustmentError"
                hint="Negative writes stock off"
              />
              <Select
                v-model="s.adjustment.reason"
                label="Reason"
                name="reason"
              >
                <option v-for="item in reasons" :key="item">{{ item }}</option>
              </Select>
            </div>
            <div :class="formFooter">
              <Button
                type="button"
                variant="secondary"
                @click="closeDialog(ADJUST_MODAL)"
              >
                Cancel
              </Button>
              <Button type="submit">Record adjustment</Button>
            </div>
          </form>
        </Modal>
      </template>

      <!-- Purchase orders -->
      <template v-else-if="page === 'orders'">
        <div :class="toolbar">
          <ToggleGroup
            label="Filter by status"
            :items="orderFilters"
            :model-value="s.orderFilter"
            @update:model-value="s.orderFilter = keep($event, s.orderFilter)"
          />
          <div :class="toolbarEnd">
            <Button
              @click="notify('Draft PO created', `For ${warehouses[wh].label}`)"
            >
              <Icon name="plus" class="size-4" />
              New order
            </Button>
          </div>
        </div>

        <div class="grid items-start gap-5 lg:grid-cols-[340px_minmax(0,1fr)]">
          <section :class="[card, 'overflow-hidden']" aria-label="Orders">
            <p
              v-if="orderRows.length === 0"
              class="px-4 py-6 text-sm text-muted"
            >
              No purchase orders with this status.
            </p>
            <ul v-if="orderRows.length > 0">
              <li v-for="item in orderRows" :key="item.id">
                <button
                  type="button"
                  :aria-pressed="item.id === order?.id"
                  :class="[
                    orderItem,
                    item.id === order?.id ? orderOn : orderOff,
                  ]"
                  @click="s.orderId = item.id"
                >
                  <span class="flex items-center justify-between gap-3">
                    <span class="font-mono text-xs font-medium">
                      {{ item.id }}
                    </span>
                    <Badge :variant="poStatus[s.status[item.id]!].variant">
                      {{ poStatus[s.status[item.id]!].label }}
                    </Badge>
                  </span>
                  <span class="truncate text-sm font-medium">
                    {{ supplierById(item.supplier).name }}
                  </span>
                  <span class="text-xs text-muted tabular-nums">
                    {{ `${rupiah(orderTotal(item))} · ETA ${item.eta}` }}
                  </span>
                </button>
              </li>
            </ul>
          </section>

          <section
            v-if="order"
            :class="card"
            :data-order="order.id"
            aria-labelledby="gudang-order-title"
          >
            <div :class="cardHead">
              <div>
                <h2
                  id="gudang-order-title"
                  class="font-mono text-sm font-semibold"
                >
                  {{ order.id }}
                </h2>
                <p class="text-xs text-muted">
                  {{
                    `${supplierById(order.supplier).name} · ETA ${order.eta}`
                  }}
                </p>
              </div>
              <Button
                v-if="poStatus[s.status[order.id]!].action"
                size="sm"
                @click="advanceOrder(order)"
              >
                {{ poStatus[s.status[order.id]!].action }}
              </Button>
            </div>
            <div class="grid gap-5 p-4">
              <ol class="flex items-center gap-2" aria-label="Order progress">
                <li
                  v-for="(id, index) in poSteps"
                  :key="id"
                  :data-step="id"
                  :aria-current="index === step ? 'step' : undefined"
                  class="flex items-center gap-2 text-sm not-last:flex-1 not-last:after:h-px not-last:after:flex-1 not-last:after:bg-line"
                >
                  <span
                    aria-hidden="true"
                    :class="[
                      stepDot,
                      stepDoneAt(index)
                        ? stepDone
                        : index === step
                          ? stepNow
                          : stepNext,
                    ]"
                  >
                    <Icon
                      v-if="stepDoneAt(index)"
                      name="check"
                      class="size-3.5"
                    />
                    <template v-else>{{ index + 1 }}</template>
                  </span>
                  <span :class="index <= step ? 'font-medium' : 'text-muted'">
                    {{ poStatus[id].label }}
                  </span>
                </li>
              </ol>
              <Table
                label="Line items"
                size="sm"
                :columns="lineColumns"
                :rows="lineRows"
              />
              <dl class="ml-auto grid w-full max-w-xs gap-1.5 text-sm">
                <div class="flex justify-between gap-4">
                  <dt class="text-muted">Subtotal</dt>
                  <dd class="tabular-nums">{{ rupiah(orderTotal(order)) }}</dd>
                </div>
                <div class="flex justify-between gap-4">
                  <dt class="text-muted">PPN 11%</dt>
                  <dd class="tabular-nums">
                    {{ rupiah(Math.round(orderTotal(order) * TAX_RATE)) }}
                  </dd>
                </div>
                <div
                  class="flex justify-between gap-4 border-t border-line pt-1.5 font-semibold"
                >
                  <dt>Total</dt>
                  <dd data-total class="tabular-nums">
                    {{ rupiah(Math.round(orderTotal(order) * (1 + TAX_RATE))) }}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </template>

      <!-- Shipments -->
      <template v-else-if="page === 'shipments'">
        <div :class="toolbar">
          <div class="w-full sm:w-52">
            <Select v-model="s.courier" aria-label="Courier">
              <option value="all">All couriers</option>
              <option v-for="item in couriers" :key="item">{{ item }}</option>
            </Select>
          </div>
          <p data-open class="text-sm text-muted">
            {{
              `${plural(openCount, "open order")} from ${warehouses[wh].label}`
            }}
          </p>
          <div :class="toolbarEnd">
            <Button
              variant="secondary"
              @click="
                notify('Manifest sent to printer', plural(openCount, 'order'))
              "
            >
              Print manifest
            </Button>
          </div>
        </div>

        <div class="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <section
            v-for="name in stages"
            :key="name"
            :data-stage="name"
            :aria-label="name"
            class="rounded-xl bg-subtle p-2"
          >
            <h2
              class="flex items-center justify-between px-2 py-1.5 text-sm font-semibold"
            >
              {{ name }}
              <span class="text-xs font-medium text-muted tabular-nums">
                {{ inStage(name).length }}
              </span>
            </h2>
            <ul class="grid gap-2">
              <li
                v-for="item in inStage(name)"
                :key="item.id"
                :data-shipment="item.id"
                :class="[card, 'grid gap-2 p-3']"
              >
                <div>
                  <p :class="mono">{{ item.id }}</p>
                  <p class="truncate text-sm font-medium">
                    {{ item.customer }}
                  </p>
                  <p class="text-xs text-muted">
                    {{ `${item.city} · ${item.items} cartons` }}
                  </p>
                </div>
                <p class="border-t border-line pt-2 text-xs">
                  {{ item.courier }}
                  <span :class="[mono, 'block']">{{ item.tracking }}</span>
                </p>
                <Button
                  v-if="nextStage(item)"
                  variant="secondary"
                  size="sm"
                  :aria-label="`Move to ${nextStage(item)}: ${item.id}`"
                  @click="advanceShipment(item)"
                >
                  {{ `Move to ${nextStage(item)}` }}
                  <Icon name="next" class="size-4" />
                </Button>
              </li>
            </ul>
          </section>
        </div>
      </template>

      <!-- Suppliers -->
      <template v-else-if="page === 'suppliers'">
        <div :class="toolbar">
          <div class="w-full sm:w-56">
            <Select v-model="s.supplierSort" aria-label="Sort suppliers">
              <option
                v-for="item in supplierSorts"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </Select>
          </div>
          <div :class="toolbarEnd">
            <Button
              @click="notify('Invitation sent', 'Supplier onboarding form')"
            >
              <Icon name="plus" class="size-4" />
              Invite supplier
            </Button>
          </div>
        </div>

        <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <li
            v-for="item in supplierRows"
            :key="item.id"
            :data-supplier="item.id"
            :class="card"
          >
            <div class="p-4">
              <h2 class="truncate text-sm font-semibold">{{ item.name }}</h2>
              <p class="text-xs text-muted">
                {{ `${item.city} · ${item.category}` }}
              </p>
            </div>
            <dl class="grid grid-cols-3 border-y border-line">
              <div
                v-for="fact in facts(item)"
                :key="fact.label"
                class="border-r border-line px-4 py-2.5 last:border-r-0"
              >
                <dt class="text-xs text-muted">{{ fact.label }}</dt>
                <dd class="text-sm font-medium tabular-nums">
                  {{ fact.value }}
                </dd>
              </div>
            </dl>
            <div class="flex items-center justify-between gap-3 px-4 py-2.5">
              <p class="truncate text-xs text-muted">{{ item.contact }}</p>
              <Button
                variant="secondary"
                size="sm"
                :aria-label="`Contact ${item.name}`"
                @click="contact(item.id)"
              >
                Contact
              </Button>
            </div>
          </li>
        </ul>

        <Modal :id="CONTACT_MODAL" title="Contact supplier">
          <form novalidate class="grid gap-4" @submit.prevent="submitMessage">
            <div class="text-ink">
              <p class="font-medium">{{ supplier.contact }}</p>
              <p class="text-muted">{{ supplier.name }}</p>
              <p class="mt-2 tabular-nums">{{ supplier.phone }}</p>
              <p>{{ supplier.email }}</p>
            </div>
            <Input
              v-model="s.message"
              label="Message"
              name="message"
              placeholder="Ask about stock, price, or delivery"
              :error="s.messageError"
            />
            <div :class="formFooter">
              <Button
                type="button"
                variant="secondary"
                @click="closeDialog(CONTACT_MODAL)"
              >
                Cancel
              </Button>
              <Button type="submit">Send message</Button>
            </div>
          </form>
        </Modal>
      </template>

      <!-- Reports -->
      <template v-else-if="page === 'reports'">
        <div :class="toolbar">
          <ToggleGroup
            label="Period"
            :items="periods"
            :model-value="s.period"
            @update:model-value="s.period = keep($event, s.period)"
          />
          <div :class="toolbarEnd">
            <Button
              v-for="format in exportFormats"
              :key="format"
              variant="secondary"
              @click="exportReport(format)"
            >
              <Icon name="download" class="size-4" />
              {{ `Export ${format}` }}
            </Button>
          </div>
        </div>

        <dl :class="[kpiGrid, 'lg:grid-cols-3']">
          <div
            v-for="(kpi, index) in reportKpis"
            :key="kpi.label"
            :class="[kpiCell, index === 2 && 'max-lg:col-span-2']"
          >
            <dt class="text-xs text-muted">{{ kpi.label }}</dt>
            <dd :data-kpi="index" :class="kpiValue">{{ kpi.value }}</dd>
          </div>
        </dl>

        <div class="grid items-start gap-5 lg:grid-cols-2">
          <section :class="card" aria-labelledby="gudang-ageing-title">
            <div :class="cardHead">
              <h2 id="gudang-ageing-title" :class="cardTitle">Stock ageing</h2>
              <span class="text-xs text-muted">Share of stock value</span>
            </div>
            <ul class="grid gap-4 p-4">
              <li
                v-for="(label, index) in ageBuckets"
                :key="label"
                :data-age="index"
                class="grid gap-1.5"
              >
                <span class="flex items-baseline justify-between gap-3 text-sm">
                  <span class="font-medium">{{ label }}</span>
                  <span class="text-muted tabular-nums">
                    {{
                      `${compact((value * ageing[wh][index]!) / 100)} · ${ageing[wh][index]}%`
                    }}
                  </span>
                </span>
                <span aria-hidden="true" :class="meter">
                  <span
                    :class="[
                      'block h-full rounded-full',
                      index === ageBuckets.length - 1 ? 'bg-warning' : barIn,
                    ]"
                    :style="{ width: `${ageing[wh][index]}%` }"
                  />
                </span>
              </li>
            </ul>
          </section>

          <section :class="card" aria-labelledby="gudang-movers-title">
            <div :class="cardHead">
              <h2 id="gudang-movers-title" :class="cardTitle">Top movers</h2>
              <span class="text-xs text-muted">Units shipped</span>
            </div>
            <ol class="grid gap-4 p-4">
              <li
                v-for="(item, index) in moverRows"
                :key="item.product"
                :data-mover="index"
                class="grid gap-1.5"
              >
                <span class="flex items-baseline justify-between gap-3 text-sm">
                  <span class="truncate font-medium">
                    {{ `${index + 1}. ${productById(item.product).name}` }}
                  </span>
                  <span class="text-muted tabular-nums">
                    {{ num(item.units) }}
                  </span>
                </span>
                <span aria-hidden="true" :class="meter">
                  <span
                    :class="['block h-full rounded-full', barOut]"
                    :style="{
                      width: `${(item.units / moverRows[0]!.units) * 100}%`,
                    }"
                  />
                </span>
              </li>
            </ol>
          </section>
        </div>
      </template>

      <!-- Settings -->
      <form
        v-else
        novalidate
        class="grid max-w-3xl gap-5"
        aria-label="Warehouse settings"
        @submit.prevent="saveSettings"
      >
        <section :class="card" aria-labelledby="gudang-rules-title">
          <div :class="cardHead">
            <h2 id="gudang-rules-title" :class="cardTitle">Reorder rules</h2>
          </div>
          <div class="grid gap-4 p-4">
            <div class="max-w-xs">
              <Input
                v-model="s.safety"
                label="Safety stock (days)"
                name="safety"
                inputmode="numeric"
                :error="s.safetyError"
                hint="Days of average demand kept as a buffer"
              />
            </div>
            <Switch
              v-model="s.auto"
              label="Create a draft PO when an item drops below its reorder point"
              name="auto"
            />
          </div>
        </section>

        <section :class="card" aria-labelledby="gudang-units-title">
          <div :class="cardHead">
            <h2 id="gudang-units-title" :class="cardTitle">Units</h2>
          </div>
          <div :class="[fieldGrid, 'p-4']">
            <Select v-model="s.unit" label="Default stock unit" name="unit">
              <option v-for="item in stockUnits" :key="item">{{ item }}</option>
            </Select>
            <Select v-model="s.weight" label="Weight" name="weight">
              <option v-for="item in weightUnits" :key="item">
                {{ item }}
              </option>
            </Select>
          </div>
        </section>

        <section :class="card" aria-labelledby="gudang-alerts-title">
          <div :class="cardHead">
            <h2 id="gudang-alerts-title" :class="cardTitle">Notifications</h2>
            <span data-alerts class="text-xs text-muted">
              {{ `${s.enabled.length} of ${alerts.length} on` }}
            </span>
          </div>
          <ul>
            <li
              v-for="alert in alerts"
              :key="alert.key"
              class="flex items-center justify-between gap-4 border-b border-line px-4 py-3 last:border-b-0"
            >
              <span>
                <span class="block text-sm font-medium">{{ alert.label }}</span>
                <span class="block text-xs text-muted">{{ alert.hint }}</span>
              </span>
              <Switch
                :aria-label="alert.label"
                :name="alert.key"
                :model-value="s.enabled.includes(alert.key)"
                @update:model-value="s.enabled = toggleIn(s.enabled, alert.key)"
              />
            </li>
          </ul>
        </section>

        <div class="flex flex-wrap gap-2">
          <Button type="submit">Save changes</Button>
          <Button type="button" variant="secondary" @click="resetSettings">
            Reset
          </Button>
        </div>
      </form>
    </main>
    <Toaster />
  </div>
</template>
