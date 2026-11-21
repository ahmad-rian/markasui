"use client";

import {
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { Badge } from "../../../components/badge/Badge";
import { Button } from "../../../components/button/Button";
import { Checkbox } from "../../../components/checkbox/Checkbox";
import { Drawer } from "../../../components/drawer/Drawer";
import {
  DropdownMenu,
  type DropdownMenuItem,
} from "../../../components/dropdown-menu/DropdownMenu";
import { Input } from "../../../components/input/Input";
import { Modal } from "../../../components/modal/Modal";
import { Popover } from "../../../components/popover/Popover";
import { Progress } from "../../../components/progress/Progress";
import { Select } from "../../../components/select/Select";
import { Switch } from "../../../components/switch/Switch";
import { Table } from "../../../components/table/Table";
import { Toaster, toast } from "../../../components/toast/Toast";
import { ToggleGroup } from "../../../components/toggle-group/ToggleGroup";

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

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
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

function subscribeHash(onChange: () => void) {
  const handle = () => {
    onChange();
    document.getElementById(TITLE_ID)?.focus();
  };
  window.addEventListener("hashchange", handle);
  return () => window.removeEventListener("hashchange", handle);
}

function dialogOf(id: string) {
  const dialog = document.getElementById(id);
  return dialog instanceof HTMLDialogElement ? dialog : null;
}
const openDialog = (id: string) => dialogOf(id)?.showModal();
const closeDialog = (id: string) => dialogOf(id)?.close();

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

type PageProps = {
  wh: Wh;
  query: string;
  setQuery: (value: string) => void;
};

function OverviewPage({ wh }: PageProps) {
  const [series, setSeries] = useState("both");
  const flow = flows[wh];
  const axisMax = Math.ceil(Math.max(...flow.flat()) / AXIS_STEP) * AXIS_STEP;
  const today = flow[flow.length - 1]!;
  const yesterday = flow[flow.length - 2]!;
  const totalIn = flow.reduce((sum, day) => sum + day[0]!, 0);
  const totalOut = flow.reduce((sum, day) => sum + day[1]!, 0);
  const short = productList.filter((item) => statusOf(item, wh) !== "ok");
  const empty = short.filter((item) => statusOf(item, wh) === "out");
  const full = zones[wh].filter((zone) => zone.value >= NEAR_CAPACITY);
  // prettier-ignore
  const kpis = [
    { label: "Stock value", value: compact(stockValue(wh)), note: `${plural(productList.length, "SKU")} on hand` },
    { label: "Below reorder point", value: String(short.length), note: `${empty.length} out of stock` },
    { label: "Inbound today", value: num(today[0]!), note: `${signed(today[0]! - yesterday[0]!)} units vs yesterday` },
    { label: "Outbound today", value: num(today[1]!), note: `${signed(today[1]! - yesterday[1]!)} units vs yesterday` },
  ];
  const height = (units: number) => ({
    height: `${(units / axisMax) * 100}%`,
  });

  return (
    <>
      <dl className={cx(kpiGrid, "lg:grid-cols-4")}>
        {kpis.map((kpi) => (
          <div key={kpi.label} className={kpiCell}>
            <dt className="text-xs text-muted">{kpi.label}</dt>
            <dd data-kpi={kpi.label} className={kpiValue}>
              {kpi.value}
            </dd>
            <dd className="text-xs text-muted">{kpi.note}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className={card} aria-labelledby="gudang-flow-title">
          <div className={cardHead}>
            <h2 id="gudang-flow-title" className={cardTitle}>
              Stock movement, last 7 days
            </h2>
            <ToggleGroup
              label="Chart series"
              items={seriesOptions}
              value={series}
              onValueChange={(value: string) => setSeries(value || series)}
            />
          </div>
          <div className="p-4">
            <div
              role="img"
              aria-label={`Units per day for the last 7 days. Today: ${num(today[0]!)} inbound and ${num(today[1]!)} outbound.`}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2"
            >
              <div className="flex h-44 flex-col justify-between text-right text-xs text-muted tabular-nums">
                <span>{num(axisMax)}</span>
                <span>{num(axisMax / 2)}</span>
                <span>0</span>
              </div>
              <div className="flex h-44 items-end gap-2 border-b border-line bg-[linear-gradient(var(--color-line)_1px,transparent_1px)] bg-size-[100%_50%] sm:gap-4">
                {flow.map((day, index) => (
                  <div
                    key={days[index]}
                    data-day={days[index]}
                    className="flex h-full flex-1 items-end justify-center gap-1"
                  >
                    {series !== "out" && (
                      <span
                        data-bar="in"
                        className={cx(bar, barIn)}
                        style={height(day[0]!)}
                      />
                    )}
                    {series !== "in" && (
                      <span
                        data-bar="out"
                        className={cx(bar, barOut)}
                        style={height(day[1]!)}
                      />
                    )}
                  </div>
                ))}
              </div>
              <span />
              <div className="flex gap-2 text-center text-xs text-muted sm:gap-4">
                {days.map((day) => (
                  <span key={day} className="flex-1">
                    {day}
                  </span>
                ))}
              </div>
            </div>
            <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-3 text-sm">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className={cx(legendDot, barIn)} />
                <dt className="text-muted">Inbound</dt>
                <dd className="font-medium tabular-nums">{num(totalIn)}</dd>
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className={cx(legendDot, barOut)} />
                <dt className="text-muted">Outbound</dt>
                <dd className="font-medium tabular-nums">{num(totalOut)}</dd>
              </div>
              <div className="flex items-center gap-2 sm:ml-auto">
                <dt className="text-muted">Net change</dt>
                <dd className="font-medium tabular-nums">
                  {`${signed(totalIn - totalOut)} units`}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={card} aria-labelledby="gudang-zones-title">
          <div className={cardHead}>
            <h2 id="gudang-zones-title" className={cardTitle}>
              Capacity by zone
            </h2>
            <span className="text-xs text-muted">{warehouses[wh].site}</span>
          </div>
          <ul className="grid gap-4 p-4">
            {zones[wh].map((zone) => (
              <li key={zone.label}>
                <Progress
                  label={zone.label}
                  value={zone.value}
                  className={zone.value >= NEAR_CAPACITY ? warnBar : undefined}
                />
              </li>
            ))}
          </ul>
          <p className="border-t border-line px-4 py-3 text-xs text-muted">
            {full.length > 0
              ? `${full[0]!.label.slice(0, 6)} is above ${NEAR_CAPACITY}%. Plan a transfer before the next inbound.`
              : "All zones have room for the next inbound."}
          </p>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className={card} aria-labelledby="gudang-activity-title">
          <div className={cardHead}>
            <h2 id="gudang-activity-title" className={cardTitle}>
              Recent activity
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.assign("#movements")}
            >
              Open ledger
              <Icon name="next" className="size-4" />
            </Button>
          </div>
          <ul>
            {ledger
              .filter((move) => move.wh === wh)
              .slice(0, 5)
              .map((move) => (
                <li
                  key={move.id}
                  data-activity={move.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 border-b border-line px-4 py-2.5 last:border-b-0 sm:grid-cols-[104px_minmax(0,1fr)_auto]"
                >
                  <span className="max-sm:col-span-2">
                    <Badge variant={moveTypes[move.type].variant}>
                      {moveTypes[move.type].label}
                    </Badge>
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">
                      {productById(move.product).name}
                    </span>
                    <span className="block truncate text-xs text-muted">
                      {`${shortDate(move.date)}, ${move.time} · ${move.ref} · ${move.note}`}
                    </span>
                  </span>
                  <span className="text-sm font-medium tabular-nums">
                    {signed(move.qty)}
                  </span>
                </li>
              ))}
          </ul>
        </section>

        <section className={card} aria-labelledby="gudang-short-title">
          <div className={cardHead}>
            <h2 id="gudang-short-title" className={cardTitle}>
              Below reorder point
            </h2>
            <span className="text-xs text-muted">
              {plural(short.length, "item")}
            </span>
          </div>
          <ul>
            {short.map((item) => (
              <li
                key={item.id}
                data-short={item.id}
                className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-b-0"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {item.name}
                  </span>
                  <span className="block text-xs text-muted tabular-nums">
                    {`${num(item.stock[wh])} of ${num(item.reorder)} ${item.unit}`}
                  </span>
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  aria-label={`Reorder ${item.name}`}
                  onClick={() =>
                    notify(
                      "Draft PO created",
                      `${item.name} from ${supplierById(item.supplier).name}`,
                    )
                  }
                >
                  Reorder
                </Button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

function ProductsPage({ wh, query, setQuery }: PageProps) {
  const [items, setItems] = useState(productList);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState({ key: "name", asc: true });
  const [picked, setPicked] = useState<string[]>([]);
  const [openId, setOpenId] = useState("p1");
  const [draft, setDraft] = useState(emptyProduct);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const needle = query.trim().toLowerCase();
  const sortValue = (item: Product) =>
    sort.key in item.stock
      ? item.stock[sort.key as Wh]
      : item[sort.key as "name" | "category"];
  const rows = items
    .filter(
      (item) =>
        (category === "all" || item.category === category) &&
        `${item.name} ${item.sku}`.toLowerCase().includes(needle),
    )
    .toSorted((a, b) => {
      const [x, y] = [sortValue(a), sortValue(b)];
      const order =
        typeof x === "number" ? x - (y as number) : x.localeCompare(String(y));
      return sort.asc ? order : -order;
    });
  const allPicked = rows.length > 0 && rows.every((r) => picked.includes(r.id));
  const product = items.find((item) => item.id === openId) ?? items[0]!;
  const history = ledger.filter((move) => move.product === product.id);
  const bulk = (title: string) => {
    notify(title, plural(picked.length, "product"));
    setPicked([]);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const sku = draft.sku.trim().toUpperCase();
    const stock = Number(draft.stock);
    // prettier-ignore
    const found = {
      name: draft.name.trim() ? "" : "Enter a product name",
      sku: !SKU_PATTERN.test(sku) ? "Use the format ABC-1234" : items.some((item) => item.sku === sku) ? "This SKU already exists" : "",
      stock: draft.stock.trim() !== "" && Number.isInteger(stock) && stock >= 0 ? "" : "Enter a quantity of 0 or more",
    };
    setErrors(found);
    if (Object.values(found).some(Boolean)) return;
    // prettier-ignore
    const added: Product = {
      id: `p${items.length + 1}`, sku, name: draft.name.trim(), category: draft.category, unit: "carton", price: 0, reorder: 0, supplier: "s1",
      stock: { jkt: 0, sby: 0, mdn: 0, [wh]: stock },
    };
    setItems([added, ...items]);
    closeDialog(PRODUCT_MODAL);
    notify("Product added", `${added.name} (${sku})`);
  };

  return (
    <>
      <div className={toolbar}>
        <div className="w-full sm:w-64">
          <Input
            type="search"
            aria-label="Filter products"
            placeholder="Filter by name or SKU"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="w-full sm:w-44">
          <Select
            aria-label="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </div>
        <div className={toolbarEnd}>
          <Button
            variant="secondary"
            onClick={() => notify("Export started", "products.csv")}
          >
            <Icon name="download" className="size-4" />
            Export
          </Button>
          <Button
            onClick={() => {
              setDraft(emptyProduct);
              setErrors({});
              openDialog(PRODUCT_MODAL);
            }}
          >
            <Icon name="plus" className="size-4" />
            Add product
          </Button>
        </div>
      </div>

      <section className={card} aria-label="Product list">
        {picked.length > 0 && (
          <div data-bulk className={cx(cardHead, "bg-primary-soft")}>
            <p className="text-sm font-medium">{`${picked.length} selected`}</p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => bulk("Draft PO created")}>
                Create PO
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => bulk("Labels sent to printer")}
              >
                Print labels
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setPicked([])}>
                Clear
              </Button>
            </div>
          </div>
        )}
        <div className={cx(scroller, "rounded-t-xl")}>
          <table className={cx(table, "min-w-[760px]")}>
            <thead>
              <tr>
                <th scope="col" className={cx(th, "w-10")}>
                  <Checkbox
                    aria-label="Select all products"
                    checked={allPicked}
                    onChange={() =>
                      setPicked(allPicked ? [] : rows.map((row) => row.id))
                    }
                  />
                </th>
                {productColumns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={
                      sort.key !== column.key
                        ? undefined
                        : sort.asc
                          ? "ascending"
                          : "descending"
                    }
                    className={cx(th, column.key in warehouses && "text-right")}
                  >
                    <button
                      type="button"
                      className={sortButton}
                      onClick={() =>
                        setSort({
                          key: column.key,
                          asc: sort.key === column.key ? !sort.asc : true,
                        })
                      }
                    >
                      {column.label}
                      <Icon
                        name="sort"
                        className={cx(
                          "size-3.5",
                          sort.key === column.key ? "text-ink" : "text-faint",
                          sort.key === column.key && !sort.asc && "rotate-180",
                        )}
                      />
                    </button>
                  </th>
                ))}
                <th scope="col" className={th}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id} data-product={item.sku}>
                  <td className={td}>
                    <Checkbox
                      aria-label={`Select ${item.name}`}
                      checked={picked.includes(item.id)}
                      onChange={() => setPicked(toggleIn(picked, item.id))}
                    />
                  </td>
                  <td className={td}>
                    <button
                      type="button"
                      className={linkButton}
                      onClick={() => {
                        setOpenId(item.id);
                        openDialog(PRODUCT_DRAWER);
                      }}
                    >
                      {item.name}
                    </button>
                    <span className={cx(mono, "block")}>{item.sku}</span>
                  </td>
                  <td className={cx(td, "text-muted")}>{item.category}</td>
                  {whIds.map((id) => (
                    <td
                      key={id}
                      className={cx(
                        td,
                        "text-right tabular-nums",
                        id === wh ? "font-medium" : "text-muted",
                      )}
                    >
                      {num(item.stock[id])}
                    </td>
                  ))}
                  <td className={td}>
                    <Badge variant={stockStatus[statusOf(item, wh)].variant}>
                      {stockStatus[statusOf(item, wh)].label}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p data-count className="px-4 py-3 text-xs text-muted">
          {rows.length > 0
            ? `${plural(rows.length, "product")} · status for ${warehouses[wh].label}`
            : "No products match this filter."}
        </p>
      </section>

      <Drawer
        id={PRODUCT_DRAWER}
        title="Product details"
        footer={
          <>
            <Button variant="secondary" type="submit" value="close">
              Close
            </Button>
            <Button
              type="submit"
              value="reorder"
              onClick={() => notify("Draft PO created", product.name)}
            >
              Create PO
            </Button>
          </>
        }
      >
        <div className="grid gap-5 text-ink">
          <div>
            <p className="text-base font-semibold">{product.name}</p>
            <p className={mono}>{`${product.sku} · ${product.category}`}</p>
          </div>
          <dl className="grid gap-2">
            {whIds.map((id) => (
              <div key={id} className="flex items-center justify-between gap-4">
                <dt className="text-muted">{warehouses[id].label}</dt>
                <dd data-stock={id} className="font-medium tabular-nums">
                  {`${num(product.stock[id])} ${product.unit}`}
                </dd>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 border-t border-line pt-2">
              <dt className="text-muted">Reorder point</dt>
              <dd className="font-medium tabular-nums">
                {`${num(product.reorder)} ${product.unit}`}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Unit cost</dt>
              <dd className="font-medium tabular-nums">
                {rupiah(product.price)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Supplier</dt>
              <dd className="font-medium">
                {supplierById(product.supplier).name}
              </dd>
            </div>
          </dl>
          <div>
            <h3 className={cardTitle}>Stock history</h3>
            {history.length === 0 && (
              <p className="mt-2 text-muted">No movements yet.</p>
            )}
            {history.length > 0 && (
              <ul className="mt-2">
                {history.map((move) => (
                  <li
                    key={move.id}
                    data-history={move.id}
                    className="flex items-center justify-between gap-3 border-b border-line py-2 last:border-b-0"
                  >
                    <span>
                      <span className="block font-medium">
                        {`${moveTypes[move.type].label} · ${warehouses[move.wh].label}`}
                      </span>
                      <span className="block text-xs text-muted">
                        {`${shortDate(move.date)}, ${move.time} · ${move.ref}`}
                      </span>
                    </span>
                    <span className="font-medium tabular-nums">
                      {signed(move.qty)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Drawer>

      <Modal id={PRODUCT_MODAL} title="Add product">
        <form noValidate className="grid gap-4" onSubmit={submit}>
          <Input
            label="Product name"
            name="name"
            value={draft.name}
            error={errors.name}
            onChange={(event) =>
              setDraft({ ...draft, name: event.target.value })
            }
          />
          <div className={fieldGrid}>
            <Input
              label="SKU"
              name="sku"
              placeholder="ABC-1234"
              value={draft.sku}
              error={errors.sku}
              onChange={(event) =>
                setDraft({ ...draft, sku: event.target.value })
              }
            />
            <Select
              label="Category"
              name="category"
              value={draft.category}
              onChange={(event) =>
                setDraft({ ...draft, category: event.target.value })
              }
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>
          </div>
          <Input
            label={`Opening stock in ${warehouses[wh].label}`}
            name="stock"
            inputMode="numeric"
            value={draft.stock}
            error={errors.stock}
            onChange={(event) =>
              setDraft({ ...draft, stock: event.target.value })
            }
          />
          <div className={formFooter}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => closeDialog(PRODUCT_MODAL)}
            >
              Cancel
            </Button>
            <Button type="submit">Save product</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

function MovementsPage({ wh }: PageProps) {
  const [moves, setMoves] = useState(ledger);
  const [type, setType] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [draft, setDraft] = useState(emptyAdjustment);
  const [error, setError] = useState("");
  const rows = moves.filter(
    (move) =>
      move.wh === wh &&
      (type === "all" || move.type === type) &&
      (!from || move.date >= from) &&
      (!to || move.date <= to),
  );
  const net = rows.reduce((sum, move) => sum + move.qty, 0);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const qty = Number(draft.qty);
    const valid = draft.qty.trim() !== "" && Number.isInteger(qty) && qty !== 0;
    setError(valid ? "" : "Enter a whole number other than 0");
    if (!valid) return;
    const count = moves.length - ledger.length;
    // prettier-ignore
    const added: Move = {
      id: `m${moves.length + 1}`, wh, date: TODAY, time: ADJUST_TIME, type: "adjust", product: draft.product, qty,
      ref: `ADJ-${String(NEXT_ADJUSTMENT + count).padStart(4, "0")}`, note: draft.reason,
    };
    setMoves([added, ...moves]);
    closeDialog(ADJUST_MODAL);
    notify(
      "Adjustment recorded",
      `${productById(draft.product).name}: ${signed(qty)} ${productById(draft.product).unit}`,
    );
  };

  return (
    <>
      <div className={toolbar}>
        <div className={cx(scroller, "max-w-full")}>
          <ToggleGroup
            label="Filter by type"
            items={moveFilters}
            value={type}
            onValueChange={(value: string) => setType(value || type)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            aria-label="From date"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
          />
          <span className="text-sm text-muted">to</span>
          <Input
            type="date"
            aria-label="To date"
            value={to}
            onChange={(event) => setTo(event.target.value)}
          />
        </div>
        <div className={toolbarEnd}>
          <Button
            onClick={() => {
              setDraft(emptyAdjustment);
              setError("");
              openDialog(ADJUST_MODAL);
            }}
          >
            <Icon name="plus" className="size-4" />
            New adjustment
          </Button>
        </div>
      </div>

      <section className={card} aria-label="Stock ledger">
        <div className={cx(scroller, "rounded-t-xl")}>
          <table className={cx(table, "min-w-[820px]")}>
            <thead>
              <tr>
                {["Date", "Reference", "Type", "Product"].map((label) => (
                  <th key={label} scope="col" className={th}>
                    {label}
                  </th>
                ))}
                <th scope="col" className={cx(th, "text-right")}>
                  Quantity
                </th>
                <th scope="col" className={th}>
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((move) => (
                <tr key={move.id} data-move={move.ref}>
                  <td className={cx(td, "tabular-nums")}>
                    {`${shortDate(move.date)}, ${move.time}`}
                  </td>
                  <td className={cx(td, mono)}>{move.ref}</td>
                  <td className={td}>
                    <Badge variant={moveTypes[move.type].variant}>
                      {moveTypes[move.type].label}
                    </Badge>
                  </td>
                  <td className={td}>
                    <span className="block font-medium">
                      {productById(move.product).name}
                    </span>
                    <span className={cx(mono, "block")}>
                      {productById(move.product).sku}
                    </span>
                  </td>
                  <td className={cx(td, "text-right font-medium tabular-nums")}>
                    {signed(move.qty)}
                  </td>
                  <td className={cx(td, "text-muted")}>{move.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p data-count className="px-4 py-3 text-xs text-muted">
          {rows.length > 0
            ? `${plural(rows.length, "movement")} · net ${signed(net)} units`
            : "No movements in this range."}
        </p>
      </section>

      <Modal id={ADJUST_MODAL} title="New adjustment">
        <form noValidate className="grid gap-4" onSubmit={submit}>
          <Select
            label="Product"
            name="product"
            value={draft.product}
            onChange={(event) =>
              setDraft({ ...draft, product: event.target.value })
            }
          >
            {productList.map((item) => (
              <option key={item.id} value={item.id}>
                {`${item.sku} · ${item.name}`}
              </option>
            ))}
          </Select>
          <div className={fieldGrid}>
            <Input
              label="Quantity change"
              name="qty"
              inputMode="numeric"
              placeholder="-12"
              value={draft.qty}
              error={error}
              hint="Negative writes stock off"
              onChange={(event) =>
                setDraft({ ...draft, qty: event.target.value })
              }
            />
            <Select
              label="Reason"
              name="reason"
              value={draft.reason}
              onChange={(event) =>
                setDraft({ ...draft, reason: event.target.value })
              }
            >
              {reasons.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>
          </div>
          <div className={formFooter}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => closeDialog(ADJUST_MODAL)}
            >
              Cancel
            </Button>
            <Button type="submit">Record adjustment</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

function OrdersPage({ wh }: PageProps) {
  const [status, setStatus] = useState<Record<string, PoStatus>>(() =>
    Object.fromEntries(orderList.map((order) => [order.id, order.status])),
  );
  const [arrived, setArrived] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState("");
  const list = orderList.filter(
    (order) =>
      order.wh === wh && (filter === "all" || status[order.id] === filter),
  );
  const order = list.find((item) => item.id === openId) ?? list[0];
  const step = order ? poSteps.indexOf(status[order.id]!) : 0;
  /** Stok di gudang ini ditambah barang PO yang diterima selama sesi ini. */
  const onHand = (productId: string) =>
    productById(productId).stock[wh] +
    orderList
      .filter((item) => item.wh === wh && arrived.includes(item.id))
      .flatMap((item) => item.lines)
      .filter((line) => line.product === productId)
      .reduce((sum, line) => sum + line.qty, 0);
  const advance = (target: Order) => {
    const current = status[target.id]!;
    const next = poSteps[poSteps.indexOf(current) + 1]!;
    const units = target.lines.reduce((sum, line) => sum + line.qty, 0);
    setStatus({ ...status, [target.id]: next });
    setOpenId(target.id);
    setFilter("all");
    if (next === "received") setArrived([...arrived, target.id]);
    notify(
      poStatus[current].done,
      next === "received"
        ? `${target.id}: ${signed(units)} units added to ${warehouses[wh].label}`
        : `${target.id} to ${supplierById(target.supplier).name}`,
    );
  };

  return (
    <>
      <div className={toolbar}>
        <ToggleGroup
          label="Filter by status"
          items={orderFilters}
          value={filter}
          onValueChange={(value: string) => setFilter(value || filter)}
        />
        <div className={toolbarEnd}>
          <Button
            onClick={() =>
              notify("Draft PO created", `For ${warehouses[wh].label}`)
            }
          >
            <Icon name="plus" className="size-4" />
            New order
          </Button>
        </div>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[340px_minmax(0,1fr)]">
        <section className={cx(card, "overflow-hidden")} aria-label="Orders">
          {list.length === 0 && (
            <p className="px-4 py-6 text-sm text-muted">
              No purchase orders with this status.
            </p>
          )}
          {list.length > 0 && (
            <ul>
              {list.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-pressed={item.id === order?.id}
                    className={cx(
                      orderItem,
                      item.id === order?.id ? orderOn : orderOff,
                    )}
                    onClick={() => setOpenId(item.id)}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs font-medium">
                        {item.id}
                      </span>
                      <Badge variant={poStatus[status[item.id]!].variant}>
                        {poStatus[status[item.id]!].label}
                      </Badge>
                    </span>
                    <span className="truncate text-sm font-medium">
                      {supplierById(item.supplier).name}
                    </span>
                    <span className="text-xs text-muted tabular-nums">
                      {`${rupiah(orderTotal(item))} · ETA ${item.eta}`}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {order && (
          <section
            className={card}
            data-order={order.id}
            aria-labelledby="gudang-order-title"
          >
            <div className={cardHead}>
              <div>
                <h2
                  id="gudang-order-title"
                  className="font-mono text-sm font-semibold"
                >
                  {order.id}
                </h2>
                <p className="text-xs text-muted">
                  {`${supplierById(order.supplier).name} · ETA ${order.eta}`}
                </p>
              </div>
              {poStatus[status[order.id]!].action && (
                <Button size="sm" onClick={() => advance(order)}>
                  {poStatus[status[order.id]!].action}
                </Button>
              )}
            </div>
            <div className="grid gap-5 p-4">
              <ol
                className="flex items-center gap-2"
                aria-label="Order progress"
              >
                {poSteps.map((id, index) => (
                  <li
                    key={id}
                    data-step={id}
                    aria-current={index === step ? "step" : undefined}
                    className="flex items-center gap-2 text-sm not-last:flex-1 not-last:after:h-px not-last:after:flex-1 not-last:after:bg-line"
                  >
                    <span
                      aria-hidden="true"
                      className={cx(
                        stepDot,
                        index < step || step === poSteps.length - 1
                          ? stepDone
                          : index === step
                            ? stepNow
                            : stepNext,
                      )}
                    >
                      {index < step || step === poSteps.length - 1 ? (
                        <Icon name="check" className="size-3.5" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span
                      className={index <= step ? "font-medium" : "text-muted"}
                    >
                      {poStatus[id].label}
                    </span>
                  </li>
                ))}
              </ol>
              <Table
                label="Line items"
                size="sm"
                columns={lineColumns}
                rows={order.lines.map((line) => ({
                  item: productById(line.product).name,
                  qty: num(line.qty),
                  cost: rupiah(productById(line.product).price),
                  subtotal: rupiah(line.qty * productById(line.product).price),
                  onHand: num(onHand(line.product)),
                }))}
              />
              <dl className="ml-auto grid w-full max-w-xs gap-1.5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Subtotal</dt>
                  <dd className="tabular-nums">{rupiah(orderTotal(order))}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">PPN 11%</dt>
                  <dd className="tabular-nums">
                    {rupiah(Math.round(orderTotal(order) * TAX_RATE))}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-line pt-1.5 font-semibold">
                  <dt>Total</dt>
                  <dd data-total className="tabular-nums">
                    {rupiah(Math.round(orderTotal(order) * (1 + TAX_RATE)))}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function ShipmentsPage({ wh }: PageProps) {
  const [stage, setStage] = useState<Record<string, string>>(() =>
    Object.fromEntries(shipmentList.map((item) => [item.id, item.stage])),
  );
  const [courier, setCourier] = useState("all");
  const list = shipmentList.filter(
    (item) => item.wh === wh && (courier === "all" || item.courier === courier),
  );
  const open = list.filter((item) => stage[item.id] !== stages.at(-1));
  const nextStage = (item: Shipment) =>
    stages[stages.indexOf(stage[item.id]!) + 1];
  const advance = (item: Shipment) => {
    const next = nextStage(item)!;
    setStage({ ...stage, [item.id]: next });
    notify(`${item.id} moved to ${next}`, `${item.customer}, ${item.city}`);
  };

  return (
    <>
      <div className={toolbar}>
        <div className="w-full sm:w-52">
          <Select
            aria-label="Courier"
            value={courier}
            onChange={(event) => setCourier(event.target.value)}
          >
            <option value="all">All couriers</option>
            {couriers.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </div>
        <p data-open className="text-sm text-muted">
          {`${plural(open.length, "open order")} from ${warehouses[wh].label}`}
        </p>
        <div className={toolbarEnd}>
          <Button
            variant="secondary"
            onClick={() =>
              notify("Manifest sent to printer", plural(open.length, "order"))
            }
          >
            Print manifest
          </Button>
        </div>
      </div>

      <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stages.map((name) => (
          <section
            key={name}
            data-stage={name}
            aria-label={name}
            className="rounded-xl bg-subtle p-2"
          >
            <h2 className="flex items-center justify-between px-2 py-1.5 text-sm font-semibold">
              {name}
              <span className="text-xs font-medium text-muted tabular-nums">
                {list.filter((item) => stage[item.id] === name).length}
              </span>
            </h2>
            <ul className="grid gap-2">
              {list
                .filter((item) => stage[item.id] === name)
                .map((item) => (
                  <li
                    key={item.id}
                    data-shipment={item.id}
                    className={cx(card, "grid gap-2 p-3")}
                  >
                    <div>
                      <p className={mono}>{item.id}</p>
                      <p className="truncate text-sm font-medium">
                        {item.customer}
                      </p>
                      <p className="text-xs text-muted">
                        {`${item.city} · ${item.items} cartons`}
                      </p>
                    </div>
                    <p className="border-t border-line pt-2 text-xs">
                      {item.courier}
                      <span className={cx(mono, "block")}>{item.tracking}</span>
                    </p>
                    {nextStage(item) && (
                      <Button
                        variant="secondary"
                        size="sm"
                        aria-label={`Move to ${nextStage(item)}: ${item.id}`}
                        onClick={() => advance(item)}
                      >
                        {`Move to ${nextStage(item)}`}
                        <Icon name="next" className="size-4" />
                      </Button>
                    )}
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

function SuppliersPage() {
  const [sort, setSort] = useState("rating");
  const [openId, setOpenId] = useState("s1");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const key = sort as "rating" | "lead" | "onTime";
  const list = supplierList.toSorted((a, b) =>
    key === "lead" ? a.lead - b.lead : b[key] - a[key],
  );
  const supplier = supplierById(openId);
  // prettier-ignore
  const facts = (item: Supplier) => [
    { label: "Lead time", value: plural(item.lead, "day") },
    { label: "Rating", value: `${item.rating.toFixed(1).replace(".", ",")} / 5` },
    { label: "On time", value: `${item.onTime}%` },
  ];
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError(message.trim() ? "" : "Write a message first");
    if (!message.trim()) return;
    closeDialog(CONTACT_MODAL);
    notify("Message sent", `${supplier.contact} at ${supplier.name}`);
  };

  return (
    <>
      <div className={toolbar}>
        <div className="w-full sm:w-56">
          <Select
            aria-label="Sort suppliers"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            {supplierSorts.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </div>
        <div className={toolbarEnd}>
          <Button
            onClick={() =>
              notify("Invitation sent", "Supplier onboarding form")
            }
          >
            <Icon name="plus" className="size-4" />
            Invite supplier
          </Button>
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((item) => (
          <li key={item.id} data-supplier={item.id} className={card}>
            <div className="p-4">
              <h2 className="truncate text-sm font-semibold">{item.name}</h2>
              <p className="text-xs text-muted">
                {`${item.city} · ${item.category}`}
              </p>
            </div>
            <dl className="grid grid-cols-3 border-y border-line">
              {facts(item).map((fact) => (
                <div
                  key={fact.label}
                  className="border-r border-line px-4 py-2.5 last:border-r-0"
                >
                  <dt className="text-xs text-muted">{fact.label}</dt>
                  <dd className="text-sm font-medium tabular-nums">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex items-center justify-between gap-3 px-4 py-2.5">
              <p className="truncate text-xs text-muted">{item.contact}</p>
              <Button
                variant="secondary"
                size="sm"
                aria-label={`Contact ${item.name}`}
                onClick={() => {
                  setOpenId(item.id);
                  setMessage("");
                  setError("");
                  openDialog(CONTACT_MODAL);
                }}
              >
                Contact
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Modal id={CONTACT_MODAL} title="Contact supplier">
        <form noValidate className="grid gap-4" onSubmit={submit}>
          <div className="text-ink">
            <p className="font-medium">{supplier.contact}</p>
            <p className="text-muted">{supplier.name}</p>
            <p className="mt-2 tabular-nums">{supplier.phone}</p>
            <p>{supplier.email}</p>
          </div>
          <Input
            label="Message"
            name="message"
            placeholder="Ask about stock, price, or delivery"
            value={message}
            error={error}
            onChange={(event) => setMessage(event.target.value)}
          />
          <div className={formFooter}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => closeDialog(CONTACT_MODAL)}
            >
              Cancel
            </Button>
            <Button type="submit">Send message</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

function ReportsPage({ wh }: PageProps) {
  const [period, setPeriod] = useState("30");
  const factor = period === "90" ? QUARTER_FACTOR : 1;
  const value = stockValue(wh);
  const list = movers[wh].map((item) => ({
    ...item,
    units: Math.round(item.units * factor),
  }));
  const moved = list.reduce((sum, item) => sum + item.units, 0);
  const aged = Math.round((value * ageing[wh].at(-1)!) / 100);
  // prettier-ignore
  const kpis = [
    { label: "Stock value", value: compact(value) },
    { label: "Aged over 90 days", value: compact(aged) },
    { label: `Units moved, ${period} days`, value: num(moved) },
  ];

  return (
    <>
      <div className={toolbar}>
        <ToggleGroup
          label="Period"
          items={periods}
          value={period}
          onValueChange={(next: string) => setPeriod(next || period)}
        />
        <div className={toolbarEnd}>
          {exportFormats.map((format) => (
            <Button
              key={format}
              variant="secondary"
              onClick={() =>
                notify(
                  `${format} export ready`,
                  `stock-report-${warehouses[wh].code.toLowerCase()}-${period}d.${format.toLowerCase()}`,
                )
              }
            >
              <Icon name="download" className="size-4" />
              {`Export ${format}`}
            </Button>
          ))}
        </div>
      </div>

      <dl className={cx(kpiGrid, "lg:grid-cols-3")}>
        {kpis.map((kpi, index) => (
          <div
            key={kpi.label}
            className={cx(kpiCell, index === 2 && "max-lg:col-span-2")}
          >
            <dt className="text-xs text-muted">{kpi.label}</dt>
            <dd data-kpi={index} className={kpiValue}>
              {kpi.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid items-start gap-5 lg:grid-cols-2">
        <section className={card} aria-labelledby="gudang-ageing-title">
          <div className={cardHead}>
            <h2 id="gudang-ageing-title" className={cardTitle}>
              Stock ageing
            </h2>
            <span className="text-xs text-muted">Share of stock value</span>
          </div>
          <ul className="grid gap-4 p-4">
            {ageBuckets.map((label, index) => (
              <li key={label} data-age={index} className="grid gap-1.5">
                <span className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium">{label}</span>
                  <span className="text-muted tabular-nums">
                    {`${compact((value * ageing[wh][index]!) / 100)} · ${ageing[wh][index]}%`}
                  </span>
                </span>
                <span aria-hidden="true" className={meter}>
                  <span
                    className={cx(
                      "block h-full rounded-full",
                      index === ageBuckets.length - 1 ? "bg-warning" : barIn,
                    )}
                    style={{ width: `${ageing[wh][index]}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className={card} aria-labelledby="gudang-movers-title">
          <div className={cardHead}>
            <h2 id="gudang-movers-title" className={cardTitle}>
              Top movers
            </h2>
            <span className="text-xs text-muted">Units shipped</span>
          </div>
          <ol className="grid gap-4 p-4">
            {list.map((item, index) => (
              <li
                key={item.product}
                data-mover={index}
                className="grid gap-1.5"
              >
                <span className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate font-medium">
                    {`${index + 1}. ${productById(item.product).name}`}
                  </span>
                  <span className="text-muted tabular-nums">
                    {num(item.units)}
                  </span>
                </span>
                <span aria-hidden="true" className={meter}>
                  <span
                    className={cx("block h-full rounded-full", barOut)}
                    style={{ width: `${(item.units / list[0]!.units) * 100}%` }}
                  />
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}

function SettingsPage() {
  const [safety, setSafety] = useState(SAFETY_DEFAULT);
  const [auto, setAuto] = useState(true);
  const [unit, setUnit] = useState(stockUnits[0]!);
  const [weight, setWeight] = useState(weightUnits[0]!);
  const [enabled, setEnabled] = useState(defaultAlerts);
  const [error, setError] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = Number(safety);
    const valid = Number.isInteger(value) && value >= 1 && value <= SAFETY_MAX;
    setError(valid ? "" : `Enter a number from 1 to ${SAFETY_MAX}`);
    if (!valid) return;
    notify(
      "Settings saved",
      `Safety stock ${plural(value, "day")}, ${plural(enabled.length, "alert")} on`,
    );
  };

  return (
    <form
      noValidate
      className="grid max-w-3xl gap-5"
      aria-label="Warehouse settings"
      onSubmit={submit}
    >
      <section className={card} aria-labelledby="gudang-rules-title">
        <div className={cardHead}>
          <h2 id="gudang-rules-title" className={cardTitle}>
            Reorder rules
          </h2>
        </div>
        <div className="grid gap-4 p-4">
          <div className="max-w-xs">
            <Input
              label="Safety stock (days)"
              name="safety"
              inputMode="numeric"
              value={safety}
              error={error}
              hint="Days of average demand kept as a buffer"
              onChange={(event) => setSafety(event.target.value)}
            />
          </div>
          <Switch
            label="Create a draft PO when an item drops below its reorder point"
            name="auto"
            checked={auto}
            onCheckedChange={setAuto}
          />
        </div>
      </section>

      <section className={card} aria-labelledby="gudang-units-title">
        <div className={cardHead}>
          <h2 id="gudang-units-title" className={cardTitle}>
            Units
          </h2>
        </div>
        <div className={cx(fieldGrid, "p-4")}>
          <Select
            label="Default stock unit"
            name="unit"
            value={unit}
            onChange={(event) => setUnit(event.target.value)}
          >
            {stockUnits.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
          <Select
            label="Weight"
            name="weight"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          >
            {weightUnits.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </div>
      </section>

      <section className={card} aria-labelledby="gudang-alerts-title">
        <div className={cardHead}>
          <h2 id="gudang-alerts-title" className={cardTitle}>
            Notifications
          </h2>
          <span data-alerts className="text-xs text-muted">
            {`${enabled.length} of ${alerts.length} on`}
          </span>
        </div>
        <ul>
          {alerts.map((alert) => (
            <li
              key={alert.key}
              className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 last:border-b-0"
            >
              <span>
                <span className="block text-sm font-medium">{alert.label}</span>
                <span className="block text-xs text-muted">{alert.hint}</span>
              </span>
              <Switch
                aria-label={alert.label}
                name={alert.key}
                checked={enabled.includes(alert.key)}
                onCheckedChange={() => setEnabled(toggleIn(enabled, alert.key))}
              />
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-2">
        <Button type="submit">Save changes</Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setSafety(SAFETY_DEFAULT);
            setAuto(true);
            setEnabled(defaultAlerts);
            setError("");
            toast({
              title: "Settings reset",
              description: "Defaults restored",
            });
          }}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}

const pageViews: Record<PageId, (props: PageProps) => ReactNode> = {
  overview: OverviewPage,
  products: ProductsPage,
  movements: MovementsPage,
  orders: OrdersPage,
  shipments: ShipmentsPage,
  suppliers: SuppliersPage,
  reports: ReportsPage,
  settings: SettingsPage,
};

export default function Gudang() {
  const page = useSyncExternalStore(
    subscribeHash,
    readHash,
    () => DEFAULT_PAGE,
  );
  const [wh, setWh] = useState<Wh>(DEFAULT_WH);
  const [query, setQuery] = useState("");
  const [unread, setUnread] = useState(true);
  const PageView = pageViews[page];
  const go = (id: PageId) => window.location.assign(`#${id}`);
  const current = (id: PageId) => (page === id ? "page" : undefined);

  return (
    <div className={shell}>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-4 py-2 sm:gap-3 lg:px-6">
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
            <form method="dialog" className="grid gap-1">
              {pageIds.map((id) => (
                <button
                  key={id}
                  type="submit"
                  aria-current={current(id)}
                  className={cx(menuItem, page === id ? menuOn : menuOff)}
                  onClick={() => go(id)}
                >
                  {pages[id].label}
                </button>
              ))}
            </form>
          </Drawer>
          <div className="flex shrink-0 items-center gap-2">
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-lg bg-primary text-on-primary"
            >
              <Icon name="box" className="size-4.5" />
            </span>
            <p className="text-base font-semibold tracking-tight">Gudang</p>
          </div>
          <div role="group" aria-label="Warehouse" className={whGroup}>
            {whIds.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={wh === id}
                className={cx(whBase, wh === id ? whOn : whOff)}
                onClick={() => setWh(id)}
              >
                {warehouses[id].label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <form
              role="search"
              className="w-64 max-lg:hidden"
              onSubmit={(event) => {
                event.preventDefault();
                go("products");
              }}
            >
              <Input
                type="search"
                aria-label="Search products"
                placeholder="Search SKU or product"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </form>
            <Popover
              align="end"
              className={bellTrigger}
              trigger={
                <>
                  <Icon name="bell" />
                  <span className="sr-only">
                    {unread
                      ? `Notifications, ${notices.length} unread`
                      : "Notifications"}
                  </span>
                  {unread && (
                    <span
                      aria-hidden="true"
                      className="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"
                    />
                  )}
                </>
              }
            >
              <p className="font-semibold">Notifications</p>
              <ul className="mt-2">
                {notices.map((notice) => (
                  <li
                    key={notice.title}
                    className="border-b border-line py-2 last:border-b-0"
                  >
                    <p className={unread ? "font-medium" : undefined}>
                      {notice.title}
                    </p>
                    <p className="text-xs text-muted">{notice.time}</p>
                  </li>
                ))}
              </ul>
              <Button
                variant="secondary"
                size="sm"
                className="mt-2 w-full"
                disabled={!unread}
                onClick={() => setUnread(false)}
              >
                Mark all as read
              </Button>
            </Popover>
            <DropdownMenu
              items={userMenu}
              className={userTrigger}
              onSelect={(value) => notify(value, `${USER.name}, ${USER.role}`)}
              trigger={
                <>
                  <span aria-hidden="true" className={userFace}>
                    {USER.initials}
                  </span>
                  <span className="sr-only">Account menu</span>
                </>
              }
            />
          </div>
        </div>
        <nav
          aria-label="Sections"
          className="mx-auto flex max-w-[1440px] gap-1 px-3 max-lg:hidden"
        >
          {pageIds.map((id) => (
            <button
              key={id}
              type="button"
              aria-current={current(id)}
              className={cx(tabBase, page === id ? tabOn : tabOff)}
              onClick={() => go(id)}
            >
              {pages[id].label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] content-start gap-5 px-4 pt-5 pb-12 lg:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h1
            id={TITLE_ID}
            tabIndex={-1}
            className="text-xl font-semibold tracking-tight focus:outline-none"
          >
            {pages[page].title}
          </h1>
          <p data-context className="text-sm text-muted">
            {`${warehouses[wh].label} · ${warehouses[wh].site} · ${TODAY_LABEL}`}
          </p>
        </div>
        <PageView
          key={`${page}-${wh}`}
          wh={wh}
          query={query}
          setQuery={setQuery}
        />
      </main>
      <Toaster />
    </div>
  );
}
