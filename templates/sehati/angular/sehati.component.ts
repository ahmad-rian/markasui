import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from "@angular/core";
import { Badge } from "../../../components/badge/badge.component";
import { Button } from "../../../components/button/button.component";
import { Drawer } from "../../../components/drawer/drawer.component";
import {
  DropdownMenu,
  type DropdownMenuItem,
} from "../../../components/dropdown-menu/dropdown-menu.component";
import { Input } from "../../../components/input/input.component";
import { Modal } from "../../../components/modal/modal.component";
import { Popover } from "../../../components/popover/popover.component";
import { Select } from "../../../components/select/select.component";
import { Switch } from "../../../components/switch/switch.component";
import { TabPanel, Tabs } from "../../../components/tabs/tabs.component";
import { Toaster, toast } from "../../../components/toast/toast.component";

// prettier-ignore
const icons = {
  pulse: "M3 12h4l3-8 4 16 3-8h4",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  doctor: "M5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 12 0V4a2 2 0 0 0-2-2h-1M8 15v1a6 6 0 0 0 12 0v-4M22 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
  pill: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7ZM8.5 8.5l7 7",
  receipt: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1ZM8 8h8M8 12h8M8 16h5",
  sliders: "M4 6h10M18 6h2M4 12h2M10 12h10M4 18h8M16 18h4M14 4v4M6 10v4M12 16v4",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  plus: "M12 5v14M5 12h14",
  check: "M20 6 9 17l-5-5",
};
type IconName = keyof typeof icons;

// prettier-ignore
const pages = {
  today: { label: "Today", title: "Today", icon: "pulse" },
  appointments: { label: "Agenda", title: "Appointments", icon: "calendar" },
  patients: { label: "Patients", title: "Patients", icon: "users" },
  doctors: { label: "Doctors", title: "Doctors", icon: "doctor" },
  pharmacy: { label: "Pharmacy", title: "Pharmacy", icon: "pill" },
  billing: { label: "Billing", title: "Billing", icon: "receipt" },
  settings: { label: "Settings", title: "Settings", icon: "sliders" },
} as const;
type PageId = keyof typeof pages;
const pageIds = Object.keys(pages) as PageId[];
const DEFAULT_PAGE: PageId = "today";
const TITLE_ID = "sehati-page-title";
const PATIENT_DRAWER = "sehati-patient-drawer";
const APPOINTMENT_MODAL = "sehati-appointment-modal";
const INVOICE_MODAL = "sehati-invoice-modal";
const CLINIC = "Klinik Sehati Bandung";
const TODAY = "Thu, 19 Nov 2026";

/* Dokter dan poli. Semua nama dan data pasien fiktif. */
// prettier-ignore
const doctors = [
  { id: "d1", name: "dr. Ratna Dewi", poli: "General", room: "Room 1", tone: "c1", load: 14, hours: ["08-14", "08-14", "13-19", "08-14", "08-14", "Off"] },
  { id: "d2", name: "drg. Bima Santoso", poli: "Dental", room: "Room 2", tone: "c2", load: 9, hours: ["09-15", "Off", "09-15", "09-15", "09-15", "09-13"] },
  { id: "d3", name: "dr. Laras Putri, Sp.A", poli: "Pediatrics", room: "Room 3", tone: "c3", load: 7, hours: ["13-19", "13-19", "08-14", "08-14", "Off", "08-12"] },
  { id: "d4", name: "dr. Yoga Pratama, Sp.PD", poli: "Internal medicine", room: "Room 4", tone: "c4", load: 0, hours: ["Off", "08-14", "08-14", "Off", "13-19", "08-12"] },
];
type Doctor = (typeof doctors)[number];
const ROOMS = 3;
const TODAY_INDEX = 3;

// prettier-ignore
const patients = [
  { id: "p1", mrn: "RM-00412", name: "Siti Aminah", sex: "F", age: 34, payer: "BPJS", doctor: "d1", last: "12 Oct 2026", phone: "+62 812 5550 0141", blood: "O+", city: "Bandung", allergies: ["Penicillin"] },
  { id: "p2", mrn: "RM-00398", name: "Budi Santoso", sex: "M", age: 52, payer: "Umum", doctor: "d1", last: "3 Nov 2026", phone: "+62 812 5550 0122", blood: "A+", city: "Cimahi", allergies: ["Sulfa drugs", "Shellfish"] },
  { id: "p3", mrn: "RM-00377", name: "Made Wirawan", sex: "M", age: 61, payer: "BPJS", doctor: "d1", last: "28 Oct 2026", phone: "+62 812 5550 0109", blood: "B+", city: "Bandung", allergies: [] as string[] },
  { id: "p4", mrn: "RM-00431", name: "Dewi Lestari", sex: "F", age: 28, payer: "Umum", doctor: "d2", last: "21 Jul 2026", phone: "+62 812 5550 0163", blood: "AB+", city: "Lembang", allergies: ["Latex"] },
  { id: "p5", mrn: "RM-00405", name: "Agus Salim", sex: "M", age: 45, payer: "BPJS", doctor: "d2", last: "9 Sep 2026", phone: "+62 812 5550 0137", blood: "O+", city: "Bandung", allergies: [] as string[] },
  { id: "p6", mrn: "RM-00440", name: "Putri Ayu", sex: "F", age: 6, payer: "Umum", doctor: "d3", last: "5 Nov 2026", phone: "+62 812 5550 0178", blood: "A+", city: "Cimahi", allergies: ["Egg protein"] },
  { id: "p7", mrn: "RM-00442", name: "Rizky Ramadhan", sex: "M", age: 4, payer: "BPJS", doctor: "d3", last: "30 Oct 2026", phone: "+62 812 5550 0185", blood: "B+", city: "Bandung", allergies: [] as string[] },
  { id: "p8", mrn: "RM-00366", name: "Nur Hidayati", sex: "F", age: 57, payer: "Umum", doctor: "d1", last: "14 Oct 2026", phone: "+62 812 5550 0104", blood: "O-", city: "Sumedang", allergies: ["Aspirin"] },
];
type Patient = (typeof patients)[number];

/* Antrean hari ini */
// prettier-ignore
const queue = [
  { id: "q1", no: "A-012", patient: "p1", doctor: "d1", type: "Consultation", at: "08:42", status: "serving" },
  { id: "q4", no: "B-007", patient: "p4", doctor: "d2", type: "Scaling", at: "08:50", status: "serving" },
  { id: "q2", no: "A-013", patient: "p2", doctor: "d1", type: "Follow-up", at: "08:55", status: "waiting" },
  { id: "q6", no: "C-005", patient: "p6", doctor: "d3", type: "Immunization", at: "09:02", status: "waiting" },
  { id: "q5", no: "B-008", patient: "p5", doctor: "d2", type: "Extraction", at: "09:05", status: "waiting" },
  { id: "q3", no: "A-014", patient: "p3", doctor: "d1", type: "Lab review", at: "09:10", status: "waiting" },
  { id: "q7", no: "C-006", patient: "p7", doctor: "d3", type: "Consultation", at: "09:14", status: "waiting" },
  { id: "q8", no: "A-015", patient: "p8", doctor: "d1", type: "Consultation", at: "09:21", status: "waiting" },
];
type QueueState = Record<string, string>;
const DONE_BASE = 21;
const UP_NEXT = 5;

// prettier-ignore
const visitTypes = [
  { label: "General", count: 14, tone: "c1" }, { label: "Dental", count: 9, tone: "c2" },
  { label: "Pediatrics", count: 7, tone: "c3" }, { label: "Lab", count: 4, tone: "c4" },
  { label: "Vaccination", count: 3, tone: "c5" },
];
const VISIT_TOTAL = 37;
// prettier-ignore
const flow = [
  { hour: "08", count: 3 }, { hour: "09", count: 6 }, { hour: "10", count: 8 }, { hour: "11", count: 5 },
  { hour: "12", count: 2 }, { hour: "13", count: 4 }, { hour: "14", count: 6 }, { hour: "15", count: 3 },
];
const FLOW_MAX = 8;

/* Jadwal minggu ini */
// prettier-ignore
const days = [
  { id: "mon", label: "Mon", date: "16" }, { id: "tue", label: "Tue", date: "17" }, { id: "wed", label: "Wed", date: "18" },
  { id: "thu", label: "Thu", date: "19" }, { id: "fri", label: "Fri", date: "20" }, { id: "sat", label: "Sat", date: "21" },
];
const TODAY_DAY = "thu";
const slots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];
// prettier-ignore
const appointmentList = [
  { id: "a1", patient: "Siti Aminah", doctor: "d1", day: "mon", time: "08:00" },
  { id: "a2", patient: "Agus Salim", doctor: "d2", day: "mon", time: "10:00" },
  { id: "a3", patient: "Budi Santoso", doctor: "d1", day: "tue", time: "09:00" },
  { id: "a4", patient: "Putri Ayu", doctor: "d3", day: "tue", time: "13:00" },
  { id: "a5", patient: "Dewi Lestari", doctor: "d2", day: "wed", time: "11:00" },
  { id: "a6", patient: "Made Wirawan", doctor: "d1", day: "thu", time: "08:00" },
  { id: "a7", patient: "Rizky Ramadhan", doctor: "d3", day: "thu", time: "10:00" },
  { id: "a8", patient: "Nur Hidayati", doctor: "d1", day: "thu", time: "13:00" },
  { id: "a9", patient: "Dewi Lestari", doctor: "d2", day: "fri", time: "09:00" },
  { id: "a10", patient: "Siti Aminah", doctor: "d4", day: "fri", time: "14:00" },
  { id: "a11", patient: "Budi Santoso", doctor: "d4", day: "sat", time: "08:00" },
];
type Appointment = (typeof appointmentList)[number];
const blankAppointment: Appointment = {
  id: "",
  patient: "",
  doctor: "d1",
  day: TODAY_DAY,
  time: "08:00",
};

/* Rekam medis ringkas */
const visitDates = ["12 Oct 2026", "3 Sep 2026", "21 Jul 2026"];
// prettier-ignore
const visitPool = [
  { title: "General checkup", note: "Blood pressure stable, continue current medication." },
  { title: "Follow-up visit", note: "Lab results reviewed, no changes needed." },
  { title: "Dental scaling", note: "Mild gingivitis, advised flossing daily." },
  { title: "Vaccination", note: "Influenza vaccine given, no reaction observed." },
  { title: "Lab panel", note: "Fasting glucose and lipid profile ordered." },
];
// prettier-ignore
const vitalDefs = [
  { label: "Systolic", unit: "mmHg", base: 110, step: 5, spread: 14 },
  { label: "Heart rate", unit: "bpm", base: 66, step: 3, spread: 12 },
  { label: "Resp. rate", unit: "/min", base: 14, step: 1, spread: 3 },
];
const wave = [0, 3, -2, 4, 1];
const patientTabs = [
  { value: "profile", label: "Profile" },
  { value: "visits", label: "Visits" },
  { value: "vitals", label: "Vitals" },
  { value: "allergies", label: "Allergies" },
];

/* Farmasi */
// prettier-ignore
const prescriptions = [
  { id: "r1", no: "RX-2051", patient: "Siti Aminah", doctor: "d1", items: "Amoxicillin 500 mg x15, Paracetamol 500 mg x10", dispensed: false },
  { id: "r2", no: "RX-2052", patient: "Dewi Lestari", doctor: "d2", items: "Ibuprofen 400 mg x10, Chlorhexidine rinse x1", dispensed: false },
  { id: "r3", no: "RX-2053", patient: "Made Wirawan", doctor: "d1", items: "Metformin 500 mg x60, Amlodipine 5 mg x30", dispensed: false },
  { id: "r4", no: "RX-2054", patient: "Putri Ayu", doctor: "d3", items: "Cetirizine syrup x1, Zinc 20 mg x10", dispensed: false },
  { id: "r5", no: "RX-2050", patient: "Nur Hidayati", doctor: "d1", items: "Omeprazole 20 mg x14", dispensed: true },
];
// prettier-ignore
const stock = [
  { name: "Amoxicillin 500 mg", form: "Capsule", stock: 320, min: 200, exp: "Aug 2027" },
  { name: "Paracetamol 500 mg", form: "Tablet", stock: 1240, min: 500, exp: "Jan 2028" },
  { name: "Cetirizine 10 mg", form: "Tablet", stock: 45, min: 150, exp: "Mar 2027" },
  { name: "Metformin 500 mg", form: "Tablet", stock: 610, min: 300, exp: "Nov 2027" },
  { name: "Amlodipine 5 mg", form: "Tablet", stock: 90, min: 200, exp: "Jun 2027" },
  { name: "Ibuprofen 400 mg", form: "Tablet", stock: 260, min: 200, exp: "Sep 2027" },
  { name: "Chlorhexidine rinse", form: "Bottle", stock: 0, min: 20, exp: "Dec 2026" },
  { name: "ORS sachet", form: "Sachet", stock: 180, min: 100, exp: "May 2028" },
];
type StockItem = (typeof stock)[number];
// prettier-ignore
const stockStates = {
  ok: { label: "In stock", badge: "success", bar: "bg-success" },
  low: { label: "Low stock", badge: "warning", bar: "bg-warning" },
  out: { label: "Out of stock", badge: "danger", bar: "bg-danger" },
} as const;

/* Tagihan */
// prettier-ignore
const invoices = [
  { id: "i1", no: "INV-1182", patient: "Siti Aminah", payer: "BPJS", date: "19 Nov", covered: 150000, paid: false, items: [{ label: "Consultation", amount: 150000 }, { label: "Amoxicillin 500 mg", amount: 45000 }] },
  { id: "i2", no: "INV-1181", patient: "Budi Santoso", payer: "Umum", date: "19 Nov", covered: 0, paid: false, items: [{ label: "Consultation", amount: 150000 }, { label: "Blood panel", amount: 220000 }] },
  { id: "i3", no: "INV-1180", patient: "Dewi Lestari", payer: "Umum", date: "19 Nov", covered: 0, paid: true, items: [{ label: "Dental scaling", amount: 450000 }, { label: "Fluoride treatment", amount: 120000 }] },
  { id: "i4", no: "INV-1179", patient: "Made Wirawan", payer: "BPJS", date: "18 Nov", covered: 210000, paid: true, items: [{ label: "Consultation", amount: 150000 }, { label: "Metformin 500 mg", amount: 60000 }] },
  { id: "i5", no: "INV-1178", patient: "Putri Ayu", payer: "Umum", date: "18 Nov", covered: 0, paid: false, items: [{ label: "Pediatric visit", amount: 175000 }, { label: "Immunization", amount: 310000 }] },
  { id: "i6", no: "INV-1177", patient: "Agus Salim", payer: "BPJS", date: "18 Nov", covered: 350000, paid: false, items: [{ label: "Tooth extraction", amount: 350000 }, { label: "Ibuprofen 400 mg", amount: 30000 }] },
  { id: "i7", no: "INV-1176", patient: "Nur Hidayati", payer: "Umum", date: "17 Nov", covered: 0, paid: true, items: [{ label: "Consultation", amount: 150000 }, { label: "ECG", amount: 250000 }] },
];
type Invoice = (typeof invoices)[number];
// prettier-ignore
const statusFilters = [{ id: "all", label: "All" }, { id: "unpaid", label: "Unpaid" }, { id: "paid", label: "Paid" }];
const payerFilters = ["All payers", "BPJS", "Umum"];

/* Pengaturan */
// prettier-ignore
const openingHours = [
  { day: "Monday", hours: "08:00 - 20:00", open: true }, { day: "Tuesday", hours: "08:00 - 20:00", open: true },
  { day: "Wednesday", hours: "08:00 - 20:00", open: true }, { day: "Thursday", hours: "08:00 - 20:00", open: true },
  { day: "Friday", hours: "08:00 - 20:00", open: true }, { day: "Saturday", hours: "08:00 - 14:00", open: true },
  { day: "Sunday", hours: "09:00 - 12:00", open: false },
];
// prettier-ignore
const alerts = [
  { id: "queue", label: "Queue call announcements", note: "Play a chime and read the number in the waiting room.", on: true },
  { id: "reminder", label: "WhatsApp appointment reminders", note: "Sent one day before the visit at 17:00.", on: true },
  { id: "stock", label: "Low stock alerts", note: "Notify the pharmacist when an item drops below its minimum.", on: false },
];
// prettier-ignore
const notifications = [
  { title: "Low stock: Cetirizine 10 mg", time: "12 min ago" },
  { title: "BPJS claim INV-1179 approved", time: "1 hour ago" },
  { title: "dr. Laras Putri starts at 13:00 today", time: "2 hours ago" },
];
// prettier-ignore
const userMenu: DropdownMenuItem[] = [
  { label: "My profile", value: "Profile opened" }, { label: "Switch clinic", value: "Clinic switched" },
  { separator: true }, { label: "Sign out", value: "Signed out", danger: true },
];

/* Gaya */
// Palet lokal untuk kategori grafik dan avatar, nilai terang dan gelap. Hex hanya di sini.
const palette =
  "[--tpl-c1:#0d9488] [--tpl-c2:#2563eb] [--tpl-c3:#d97706] [--tpl-c4:#7c3aed] [--tpl-c5:#e11d48] [--tpl-av1:#ccfbf1] [--tpl-av2:#dbeafe] [--tpl-av3:#fef3c7] [--tpl-av4:#ede9fe] [--tpl-av5:#ffe4e6] [--tpl-av-ink:#1f2937] dark:[--tpl-c1:#2dd4bf] dark:[--tpl-c2:#60a5fa] dark:[--tpl-c3:#fbbf24] dark:[--tpl-c4:#a78bfa] dark:[--tpl-c5:#fb7185]";
const shell = `${palette} min-h-dvh bg-canvas text-sm text-ink lg:pl-16 xl:pr-80`;
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const rail =
  "fixed inset-y-0 left-0 z-20 hidden w-16 flex-col items-center gap-1 border-r border-line bg-surface py-3 lg:flex";
const railBase = `inline-flex size-10 items-center justify-center rounded-lg transition-colors duration-150 ${focusRing}`;
const railActive = "bg-primary-soft text-primary";
const railIdle = "text-muted hover:bg-subtle hover:text-ink";
const bottomBar =
  "fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-surface px-1 lg:hidden";
const bottomBase = `flex h-14 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg text-[10px] font-medium transition-colors duration-150 ${focusRing}`;
const bottomActive = "text-primary";
const bottomIdle = "text-muted hover:text-ink";
const logo =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary";
const topbar =
  "sticky top-0 z-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-surface px-4 py-2.5 lg:px-6";
const iconTrigger = "[&>button]:relative [&>button]:px-2.5";
const userTrigger = "[&>button]:gap-2 [&>button]:px-1.5 sm:[&>button]:pr-3";
const main = "grid min-w-0 content-start gap-5 px-4 pt-5 pb-24 lg:px-6 lg:pb-8";
const todayPanel =
  "fixed inset-y-0 right-0 z-10 hidden w-80 flex-col gap-5 overflow-y-auto border-l border-line bg-surface p-5 xl:flex";
const card = "rounded-xl border border-line bg-surface";
const h2 = "text-base font-semibold";
const h3 = "text-sm font-semibold";
const note = "text-xs text-muted";
const statGrid =
  "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line";
const statCell = "bg-surface p-4";
const statValue = "mt-1 text-2xl font-semibold tracking-tight tabular-nums";
const ticket = "rounded-lg border border-primary-line bg-primary-soft p-3";
const ticketFree =
  "flex min-h-[86px] items-center rounded-lg border border-dashed border-line p-3 text-muted";
const ticketNo = "text-2xl font-semibold tracking-tight tabular-nums";
const queueRow = "flex items-center gap-3 py-2";
const queueNo = "w-12 shrink-0 font-semibold tabular-nums";
const tableWrap = `overflow-x-auto ${card}`;
const table = "w-full border-collapse";
const th =
  "px-4 py-2.5 text-left text-xs font-medium whitespace-nowrap text-muted";
const td = "border-t border-line px-4 py-2.5 whitespace-nowrap";
const linkButton = `rounded-sm text-left font-medium underline-offset-4 hover:underline ${focusRing}`;
const chip = `inline-flex h-8 items-center rounded-lg px-3 font-medium whitespace-nowrap transition-colors duration-150 ${focusRing}`;
const chipOn = "bg-primary-soft text-primary";
const chipOff = "text-muted hover:bg-subtle hover:text-ink";
const slotCell = "h-16 border-t border-l border-line p-1 align-top";
const slotToday = "bg-primary-soft/40";
const booking = `flex w-full min-w-0 items-center gap-1.5 rounded-md bg-subtle px-2 py-1 text-left text-xs font-medium transition-colors duration-150 hover:bg-line ${focusRing}`;
const face =
  "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-(--tpl-av-ink) select-none";
const faceTones = [
  "bg-(--tpl-av1)",
  "bg-(--tpl-av2)",
  "bg-(--tpl-av3)",
  "bg-(--tpl-av4)",
  "bg-(--tpl-av5)",
];
const tones: Record<string, string> = {
  c1: "bg-(--tpl-c1)",
  c2: "bg-(--tpl-c2)",
  c3: "bg-(--tpl-c3)",
  c4: "bg-(--tpl-c4)",
  c5: "bg-(--tpl-c5)",
};
const dot = "size-2 shrink-0 rounded-full";
const field = "rounded-lg bg-subtle p-3";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const rupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
/** Inisial tanpa gelar (dr., drg., Sp.A). */
const initials = (name: string) =>
  name
    .split(",")[0]!
    .split(" ")
    .filter((word) => !word.endsWith("."))
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
const doctorById = (id: string) => doctors.find((item) => item.id === id)!;
const patientById = (id: string) => patients.find((item) => item.id === id)!;
const dayById = (id: string) => days.find((item) => item.id === id)!;
const sexLabel = (patient: Patient) =>
  `${patient.age} yr, ${patient.sex === "F" ? "female" : "male"}`;

const servingOf = (state: QueueState, doctorId: string) =>
  queue.find(
    (item) => item.doctor === doctorId && state[item.id] === "serving",
  );
const waitingOf = (state: QueueState, doctorId?: string) =>
  queue.filter(
    (item) =>
      state[item.id] === "waiting" && (!doctorId || item.doctor === doctorId),
  );
const countOf = (state: QueueState, status: string) =>
  queue.filter((item) => state[item.id] === status).length;

const visitsFor = (index: number) =>
  visitDates.map((date, offset) => ({
    date,
    ...visitPool[(index + offset) % visitPool.length]!,
  }));
const seriesFor = (def: (typeof vitalDefs)[number], index: number) =>
  wave.map(
    (_, at) =>
      def.base +
      ((index * def.step) % def.spread) +
      wave[(at + index * def.step) % wave.length]!,
  );
/** Titik polyline sparkline di viewBox 100 x 32. */
const spark = (values: number[]) => {
  const min = Math.min(...values);
  const span = Math.max(...values) - min || 1;
  return values
    .map(
      (value, at) =>
        `${at * 25},${28 - Math.round(((value - min) * 24) / span)}`,
    )
    .join(" ");
};

const stockState = (item: StockItem) =>
  item.stock === 0 ? "out" : item.stock < item.min ? "low" : "ok";
const stockLevel = (item: StockItem) =>
  Math.min(100, Math.round((item.stock / (item.min * 2)) * 100));
const subtotal = (invoice: Invoice) =>
  invoice.items.reduce((sum, item) => sum + item.amount, 0);
const due = (invoice: Invoice) => subtotal(invoice) - invoice.covered;
const nextAppointmentId = (list: Appointment[]) =>
  `a${1 + Math.max(0, ...list.map((item) => Number(item.id.slice(1))))}`;
/** Nama wajib diisi dan satu dokter hanya punya satu pasien per slot. */
const checkAppointment = (form: Appointment, list: Appointment[]) => ({
  patient: form.patient.trim() ? "" : "Enter the patient name.",
  slot: list.some(
    (item) =>
      item.id !== form.id &&
      item.doctor === form.doctor &&
      item.day === form.day &&
      item.time === form.time,
  )
    ? "That slot is already booked for this doctor."
    : "",
});

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
const flags = <T>(items: T[], pick: (item: T) => [string, boolean]) =>
  Object.fromEntries(items.map(pick));
const low = stock.filter((item) => stockState(item) !== "ok");
const visitSummary = visitTypes
  .map((type) => `${type.label} ${type.count}`)
  .join(", ");
// Kelas dipakai template lewat satu objek supaya daftar member komponen tetap pendek.
// prettier-ignore
const ui = {
  shell, rail, railBase, railActive, railIdle, bottomBar, bottomBase, bottomActive, bottomIdle, logo, topbar,
  iconTrigger, userTrigger, main, todayPanel, card, h2, h3, note, statGrid, statCell, statValue, ticket,
  ticketFree, ticketNo, queueRow, queueNo, tableWrap, table, th, td, linkButton, chip, chipOn, chipOff,
  slotCell, slotToday, booking, dot, field,
};

/** Ikon garis 24px; svg-nya sendiri jadi host karena template Angular tidak punya komponen fungsi. */
@Component({
  selector: "svg[sehatiIcon]",
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
  readonly sehatiIcon = input.required<IconName>();
  protected readonly path = computed(() => icons[this.sehatiIcon()]);
}

/** Avatar inisial berwarna dari palet lokal. */
@Component({
  selector: "span[sehatiFace]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "aria-hidden": "true",
    "[class]": "tone()",
    "[textContent]": "letters()",
  },
  template: "",
})
class Face {
  readonly sehatiFace = input.required<string>();
  protected readonly tone = computed(() =>
    cx(face, faceTone(this.sehatiFace())),
  );
  protected readonly letters = computed(() => initials(this.sehatiFace()));
}

/** Judul bagian dengan catatan kecil; kontrol tambahan diproyeksikan di sisi kanan. */
@Component({
  selector: "div[sehatiHead]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "flex flex-wrap items-end justify-between gap-3" },
  template: `<div>
      <h2 [id]="sehatiHead()" [class]="h2" [textContent]="heading()"></h2>
      <p data-note [class]="noteClass" [textContent]="text()"></p>
    </div>
    <ng-content />`,
})
class Head {
  readonly sehatiHead = input.required<string>();
  readonly heading = input.required<string>();
  readonly text = input.required<string>();
  protected readonly h2 = h2;
  protected readonly noteClass = cx(note, "mt-0.5");
}

@Component({
  selector: "template-sehati",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  imports: [
    Badge,
    Button,
    Drawer,
    DropdownMenu,
    Input,
    Modal,
    Popover,
    Select,
    Switch,
    Tabs,
    TabPanel,
    Toaster,
    Icon,
    Face,
    Head,
  ],
  template: `
    <div [class]="ui.shell">
      <nav aria-label="Main" [class]="ui.rail">
        <span aria-hidden="true" [class]="ui.logo + ' mb-3'">
          <svg sehatiIcon="plus" class="size-5"></svg>
        </span>
        @for (id of pageIds; track id) {
          <button
            type="button"
            [attr.aria-label]="pages[id].title"
            [attr.aria-current]="page() === id ? 'page' : null"
            [attr.title]="pages[id].title"
            [class]="
              cx(
                ui.railBase,
                page() === id ? ui.railActive : ui.railIdle,
                id === 'settings' && 'mt-auto'
              )
            "
            (click)="go(id)"
          >
            <svg [sehatiIcon]="pages[id].icon" class="size-5"></svg>
          </button>
        }
      </nav>

      <header [class]="ui.topbar">
        <span aria-hidden="true" [class]="ui.logo + ' lg:hidden'">
          <svg sehatiIcon="plus" class="size-5"></svg>
        </span>
        <div class="min-w-0 flex-1">
          <h1
            [id]="TITLE_ID"
            tabindex="-1"
            class="truncate text-base leading-tight font-semibold focus:outline-none"
            [textContent]="pages[page()].title"
          ></h1>
          <p [class]="ui.note + ' truncate'">{{ CLINIC }} · {{ TODAY }}</p>
        </div>
        <form
          role="search"
          class="order-last w-full sm:order-none sm:w-60"
          (submit)="find($event)"
        >
          <markas-input
            [(value)]="search"
            type="search"
            aria-label="Search patients"
            placeholder="Search patient or MRN"
          />
        </form>
        <markas-popover align="end" [class]="ui.iconTrigger">
          <ng-container trigger>
            <svg sehatiIcon="bell" class="size-5"></svg>
            <span
              data-unread
              class="sr-only"
              [textContent]="
                unread() ? 'Notifications, 3 unread' : 'Notifications'
              "
            ></span>
            @if (unread()) {
              <span
                aria-hidden="true"
                class="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"
              ></span>
            }
          </ng-container>
          <div class="grid gap-3">
            <p [class]="ui.h3">Notifications</p>
            <ul class="grid gap-3">
              @for (item of notifications; track item.title) {
                <li class="flex gap-2">
                  <span
                    aria-hidden="true"
                    [class]="
                      cx(ui.dot, 'mt-1.5', unread() ? 'bg-primary' : 'bg-line')
                    "
                  ></span>
                  <div>
                    <p class="font-medium">{{ item.title }}</p>
                    <p [class]="ui.note">{{ item.time }}</p>
                  </div>
                </li>
              }
            </ul>
            <button
              markas-button
              variant="secondary"
              size="sm"
              [disabled]="!unread()"
              (click)="unread.set(false)"
            >
              Mark all as read
            </button>
          </div>
        </markas-popover>
        <markas-dropdown-menu
          [items]="userMenu"
          [class]="ui.userTrigger"
          (selected)="notify($event)"
        >
          <ng-container trigger>
            <span sehatiFace="Ayu Kartika" class="size-7 text-[11px]"></span>
            <span class="sr-only">Account, </span>
            <span class="hidden sm:inline">Ayu Kartika</span>
          </ng-container>
        </markas-dropdown-menu>
      </header>

      <main [class]="ui.main">
        @switch (page()) {
          @case ("today") {
            <dl [class]="ui.statGrid + ' lg:grid-cols-4'">
              @for (stat of stats(); track stat.label) {
                <div [class]="ui.statCell">
                  <dt [class]="ui.note">{{ stat.label }}</dt>
                  <dd
                    [attr.data-stat]="stat.label"
                    [class]="ui.statValue"
                    [textContent]="stat.value"
                  ></dd>
                  <dd [class]="ui.note">{{ stat.text }}</dd>
                </div>
              }
            </dl>

            <section aria-labelledby="sehati-board-title" class="grid gap-3">
              <div
                sehatiHead="sehati-board-title"
                heading="Queue board"
                text="Call the next number when a room is ready."
              ></div>
              <div class="grid gap-4 md:grid-cols-3">
                @for (room of rooms(); track room.doctor.id) {
                  @let doctor = room.doctor;
                  <article
                    [attr.data-room]="doctor.id"
                    [attr.aria-label]="doctor.room + ', ' + doctor.name"
                    [class]="ui.card + ' flex flex-col gap-3 p-4'"
                  >
                    <div class="flex items-center gap-3">
                      <span
                        [sehatiFace]="doctor.name"
                        class="size-9 text-xs"
                      ></span>
                      <div class="min-w-0">
                        <h3 [class]="ui.h3 + ' truncate'">{{ doctor.name }}</h3>
                        <p [class]="ui.note">
                          {{ doctor.poli }} · {{ doctor.room }}
                        </p>
                      </div>
                    </div>
                    @if (room.serving; as serving) {
                      <div data-serving [class]="ui.ticket">
                        <p class="text-xs font-medium text-primary">
                          Now serving
                        </p>
                        <p [class]="ui.ticketNo">{{ serving.no }}</p>
                        <p class="truncate text-xs">
                          {{ patientById(serving.patient).name }},
                          {{ serving.type }}
                        </p>
                      </div>
                    } @else {
                      <p data-serving [class]="ui.ticketFree">Room is free</p>
                    }
                    <div>
                      <p
                        data-waiting
                        [class]="ui.note"
                        [textContent]="room.waiting.length + ' waiting'"
                      ></p>
                      <ul class="divide-y divide-line">
                        @for (item of room.waiting; track item.id) {
                          <li [class]="ui.queueRow">
                            <span [class]="ui.queueNo">{{ item.no }}</span>
                            <button
                              type="button"
                              [class]="
                                ui.linkButton + ' min-w-0 flex-1 truncate'
                              "
                              (click)="openPatient(item.patient)"
                            >
                              {{ patientById(item.patient).name }}
                            </button>
                            <span [class]="ui.note + ' tabular-nums'">{{
                              item.at
                            }}</span>
                          </li>
                        }
                      </ul>
                    </div>
                    <div class="mt-auto grid grid-cols-2 gap-2">
                      <button
                        markas-button
                        variant="secondary"
                        size="sm"
                        [disabled]="!room.serving"
                        (click)="finish(doctor)"
                      >
                        Mark done
                      </button>
                      <button
                        markas-button
                        size="sm"
                        [disabled]="room.waiting.length === 0"
                        (click)="callNext(doctor)"
                      >
                        Call next
                      </button>
                    </div>
                  </article>
                }
              </div>
            </section>

            <div class="grid gap-4 md:grid-cols-2">
              <section
                aria-labelledby="sehati-types-title"
                [class]="ui.card + ' grid content-start gap-4 p-4'"
              >
                <div
                  sehatiHead="sehati-types-title"
                  heading="Visits by type"
                  [text]="VISIT_TOTAL + ' visits registered today'"
                ></div>
                <div
                  role="img"
                  [attr.aria-label]="visitSummary"
                  class="flex h-3 gap-0.5 overflow-hidden rounded-full"
                >
                  @for (type of visitTypes; track type.label) {
                    <span
                      [class]="tones[type.tone]"
                      [style.flex-grow]="type.count"
                    ></span>
                  }
                </div>
                <ul class="grid gap-2">
                  @for (type of visitTypes; track type.label) {
                    <li class="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        [class]="cx(ui.dot, tones[type.tone])"
                      ></span>
                      <span class="flex-1">{{ type.label }}</span>
                      <span class="font-medium tabular-nums">{{
                        type.count
                      }}</span>
                      <span [class]="ui.note + ' w-9 text-right tabular-nums'"
                        >{{ share(type.count) }}%</span
                      >
                    </li>
                  }
                </ul>
              </section>

              <section
                aria-labelledby="sehati-flow-title"
                [class]="ui.card + ' flex flex-col gap-4 p-4'"
              >
                <div
                  sehatiHead="sehati-flow-title"
                  heading="Patient flow"
                  text="Check-ins per hour, peak at 10:00"
                ></div>
                <ol
                  aria-label="Check-ins per hour"
                  class="flex min-h-36 flex-1 items-end gap-2"
                >
                  @for (item of flow; track item.hour) {
                    <li
                      class="flex h-full flex-1 flex-col items-center justify-end gap-1"
                    >
                      <span class="text-xs font-medium tabular-nums">{{
                        item.count
                      }}</span>
                      <span
                        aria-hidden="true"
                        [class]="
                          cx(
                            'w-full rounded-t-md',
                            item.count === FLOW_MAX
                              ? 'bg-primary'
                              : 'bg-primary-line'
                          )
                        "
                        [style.height.%]="(item.count / FLOW_MAX) * 70"
                      ></span>
                      <span [class]="ui.note + ' tabular-nums'"
                        ><span class="sr-only">at </span>{{ item.hour }}</span
                      >
                    </li>
                  }
                </ol>
              </section>
            </div>
          }
          @case ("appointments") {
            <section aria-labelledby="sehati-week-title" class="grid gap-3">
              <div
                sehatiHead="sehati-week-title"
                heading="Week of 16 Nov 2026"
                [text]="shownAppointments().length + ' appointments'"
              >
                <div class="flex flex-wrap items-end gap-2">
                  <markas-select
                    [(value)]="doctorFilter"
                    aria-label="Filter by doctor"
                    class="sm:w-56"
                  >
                    <option value="all">All doctors</option>
                    @for (doctor of doctors; track doctor.id) {
                      <option [value]="doctor.id">
                        {{ doctor.name }} ({{ doctor.poli }})
                      </option>
                    }
                  </markas-select>
                  <button markas-button (click)="edit(blankAppointment)">
                    <svg sehatiIcon="plus" class="size-4"></svg>
                    New appointment
                  </button>
                </div>
              </div>
              <div [class]="ui.tableWrap">
                <table [class]="ui.table + ' min-w-[720px] table-fixed'">
                  <thead>
                    <tr>
                      <th scope="col" [class]="ui.th + ' w-16'">Time</th>
                      @for (day of days; track day.id) {
                        <th
                          scope="col"
                          [class]="
                            cx(
                              ui.th,
                              'border-l border-line',
                              day.id === TODAY_DAY && 'text-primary'
                            )
                          "
                        >
                          {{ day.label }} {{ day.date }}
                        </th>
                      }
                    </tr>
                  </thead>
                  <tbody>
                    @for (time of slots; track time) {
                      <tr>
                        <th
                          scope="row"
                          class="border-t border-line px-4 py-2 text-left align-top text-xs font-medium text-muted tabular-nums"
                        >
                          {{ time }}
                        </th>
                        @for (day of days; track day.id) {
                          <td
                            [attr.data-slot]="day.id + '-' + time"
                            [class]="
                              cx(
                                ui.slotCell,
                                day.id === TODAY_DAY && ui.slotToday
                              )
                            "
                          >
                            <div class="grid gap-1">
                              @for (
                                item of inSlot(day.id, time);
                                track item.id
                              ) {
                                <button
                                  type="button"
                                  [attr.data-appointment]="item.id"
                                  [attr.aria-label]="
                                    item.patient +
                                    ', ' +
                                    doctorById(item.doctor).name +
                                    ', ' +
                                    day.label +
                                    ' ' +
                                    time
                                  "
                                  [class]="ui.booking"
                                  (click)="edit(item)"
                                >
                                  <span
                                    aria-hidden="true"
                                    [class]="
                                      cx(
                                        ui.dot,
                                        tones[doctorById(item.doctor).tone]
                                      )
                                    "
                                  ></span>
                                  <span class="truncate">{{
                                    item.patient
                                  }}</span>
                                </button>
                              }
                            </div>
                          </td>
                        }
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
              <ul aria-label="Doctors" class="flex flex-wrap gap-x-4 gap-y-1">
                @for (doctor of doctors; track doctor.id) {
                  <li [class]="ui.note + ' flex items-center gap-1.5'">
                    <span
                      aria-hidden="true"
                      [class]="cx(ui.dot, tones[doctor.tone])"
                    ></span>
                    {{ doctor.name }}
                  </li>
                }
              </ul>

              <markas-modal
                [id]="APPOINTMENT_MODAL"
                [title]="form().id ? 'Edit appointment' : 'New appointment'"
              >
                <div class="grid gap-4 text-ink">
                  <markas-input
                    [value]="form().patient"
                    (valueChange)="setField('patient', $event)"
                    label="Patient name"
                    [error]="errors().patient"
                  />
                  <markas-select
                    [value]="form().doctor"
                    (valueChange)="setField('doctor', $event)"
                    label="Doctor"
                  >
                    @for (doctor of doctors; track doctor.id) {
                      <option [value]="doctor.id">
                        {{ doctor.name }} ({{ doctor.poli }})
                      </option>
                    }
                  </markas-select>
                  <div class="grid grid-cols-2 gap-3">
                    <markas-select
                      [value]="form().day"
                      (valueChange)="setField('day', $event)"
                      label="Day"
                    >
                      @for (day of days; track day.id) {
                        <option [value]="day.id">
                          {{ day.label }}, {{ day.date }} Nov
                        </option>
                      }
                    </markas-select>
                    <markas-select
                      [value]="form().time"
                      (valueChange)="setField('time', $event)"
                      label="Time"
                    >
                      @for (time of slots; track time) {
                        <option [value]="time">{{ time }}</option>
                      }
                    </markas-select>
                  </div>
                  @if (errors().slot) {
                    <p
                      role="alert"
                      class="text-danger"
                      [textContent]="errors().slot"
                    ></p>
                  }
                </div>
                <ng-container footer>
                  @if (form().id) {
                    <button markas-button variant="danger" (click)="cancel()">
                      Cancel appointment
                    </button>
                  }
                  <button markas-button (click)="save()">
                    {{ form().id ? "Save changes" : "Book appointment" }}
                  </button>
                </ng-container>
              </markas-modal>
            </section>
          }
          @case ("patients") {
            <section aria-labelledby="sehati-patients-title" class="grid gap-3">
              <div
                sehatiHead="sehati-patients-title"
                heading="Patient records"
                [text]="
                  shownPatients().length +
                  ' of ' +
                  patients.length +
                  ' patients'
                "
              >
                <div class="w-full sm:w-64">
                  <markas-input
                    [(value)]="query"
                    type="search"
                    aria-label="Filter patients"
                    placeholder="Filter by name or MRN"
                  />
                </div>
              </div>
              <div [class]="ui.tableWrap">
                <table [class]="ui.table">
                  <thead>
                    <tr>
                      <th scope="col" [class]="ui.th">Patient</th>
                      <th scope="col" [class]="ui.th + ' hidden sm:table-cell'">
                        MRN
                      </th>
                      <th scope="col" [class]="ui.th">Insurance</th>
                      <th scope="col" [class]="ui.th + ' hidden md:table-cell'">
                        Doctor
                      </th>
                      <th scope="col" [class]="ui.th + ' hidden md:table-cell'">
                        Last visit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (item of shownPatients(); track item.id) {
                      <tr [attr.data-patient]="item.id">
                        <td [class]="ui.td">
                          <div class="flex items-center gap-3">
                            <span
                              [sehatiFace]="item.name"
                              class="size-8 text-xs"
                            ></span>
                            <div>
                              <button
                                type="button"
                                [class]="ui.linkButton"
                                (click)="openPatient(item.id)"
                              >
                                {{ item.name }}
                              </button>
                              <p [class]="ui.note">{{ sexLabel(item) }}</p>
                            </div>
                          </div>
                        </td>
                        <td
                          [class]="ui.td + ' hidden tabular-nums sm:table-cell'"
                        >
                          {{ item.mrn }}
                        </td>
                        <td [class]="ui.td">
                          <span
                            markas-badge
                            [variant]="
                              item.payer === 'BPJS' ? 'primary' : 'neutral'
                            "
                            [dot]="false"
                            >{{ item.payer }}</span
                          >
                        </td>
                        <td [class]="ui.td + ' hidden md:table-cell'">
                          {{ doctorById(item.doctor).name }}
                        </td>
                        <td
                          [class]="ui.td + ' hidden text-muted md:table-cell'"
                        >
                          {{ item.last }}
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
                @if (shownPatients().length === 0) {
                  <p class="border-t border-line p-4 text-muted">
                    No patients match this filter.
                  </p>
                }
              </div>
            </section>
          }
          @case ("doctors") {
            <section aria-labelledby="sehati-roster-title" class="grid gap-3">
              <div
                sehatiHead="sehati-roster-title"
                heading="Roster"
                [text]="
                  acceptingCount() +
                  ' of ' +
                  doctors.length +
                  ' doctors accepting patients'
                "
              ></div>
              <ul class="grid gap-4 md:grid-cols-2">
                @for (doctor of doctors; track doctor.id) {
                  <li
                    [attr.data-doctor]="doctor.id"
                    [class]="ui.card + ' grid gap-4 p-4'"
                  >
                    <div class="flex items-start gap-3">
                      <span
                        [sehatiFace]="doctor.name"
                        class="size-11 text-sm"
                      ></span>
                      <div class="min-w-0 flex-1">
                        <h3 [class]="ui.h3 + ' truncate'">{{ doctor.name }}</h3>
                        <p [class]="ui.note">
                          {{ doctor.poli }} · {{ doctor.room }} ·
                          {{ doctor.load }} patients today
                        </p>
                      </div>
                      <span
                        markas-badge
                        [variant]="
                          available()[doctor.id] ? 'success' : 'neutral'
                        "
                        >{{
                          available()[doctor.id] ? "Available" : "Away"
                        }}</span
                      >
                    </div>
                    <dl class="grid grid-cols-6 gap-1 text-center">
                      @for (day of days; track day.id; let index = $index) {
                        <div
                          [class]="
                            cx(
                              'rounded-md py-1.5',
                              day.id === TODAY_DAY
                                ? 'bg-primary-soft'
                                : 'bg-subtle'
                            )
                          "
                        >
                          <dt [class]="ui.note">{{ day.label }}</dt>
                          <dd
                            [class]="
                              cx(
                                'text-xs font-medium tabular-nums',
                                doctor.hours[index] === 'Off' && 'text-muted'
                              )
                            "
                          >
                            {{ doctor.hours[index] }}
                          </dd>
                        </div>
                      }
                    </dl>
                    <markas-switch
                      label="Accepting patients"
                      [checked]="available()[doctor.id]"
                      (checkedChange)="toggle(doctor, $event)"
                    />
                  </li>
                }
              </ul>
            </section>
          }
          @case ("pharmacy") {
            <section aria-labelledby="sehati-rx-title" class="grid gap-3">
              <div
                sehatiHead="sehati-rx-title"
                heading="Prescription queue"
                [text]="pending() + ' waiting to be dispensed'"
              ></div>
              <ul [class]="ui.card + ' divide-y divide-line'">
                @for (item of prescriptions; track item.id) {
                  <li
                    [attr.data-rx]="item.id"
                    class="flex flex-wrap items-center gap-x-4 gap-y-2 p-4"
                  >
                    <div class="min-w-0 flex-1 basis-56">
                      <p class="font-medium">
                        <span class="tabular-nums">{{ item.no }}</span>
                        · {{ item.patient }}
                      </p>
                      <p [class]="ui.note + ' mt-0.5'">{{ item.items }}</p>
                    </div>
                    <p [class]="ui.note + ' hidden md:block'">
                      {{ doctorById(item.doctor).name }}
                    </p>
                    @if (dispensed()[item.id]) {
                      <span markas-badge variant="success">Dispensed</span>
                    } @else {
                      <button
                        markas-button
                        variant="secondary"
                        size="sm"
                        [attr.aria-label]="'Dispense ' + item.no"
                        (click)="dispense(item.id, item.no, item.patient)"
                      >
                        <svg sehatiIcon="check" class="size-4"></svg>
                        Dispense
                      </button>
                    }
                  </li>
                }
              </ul>
            </section>

            <section aria-labelledby="sehati-stock-title" class="grid gap-3">
              <div
                sehatiHead="sehati-stock-title"
                heading="Stock"
                [text]="low.length + ' items need reorder'"
              >
                <markas-switch
                  label="Low stock only"
                  [checked]="lowOnly()"
                  (checkedChange)="lowOnly.set($event)"
                />
              </div>
              <div [class]="ui.tableWrap">
                <table [class]="ui.table">
                  <thead>
                    <tr>
                      <th scope="col" [class]="ui.th">Item</th>
                      <th scope="col" [class]="ui.th">On hand</th>
                      <th scope="col" [class]="ui.th + ' hidden sm:table-cell'">
                        Minimum
                      </th>
                      <th scope="col" [class]="ui.th">Status</th>
                      <th scope="col" [class]="ui.th + ' hidden md:table-cell'">
                        Expires
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (item of shownStock(); track item.name) {
                      @let state = stockStates[stockState(item)];
                      <tr [attr.data-stock]="stockState(item)">
                        <td [class]="ui.td">
                          <p class="font-medium">{{ item.name }}</p>
                          <p [class]="ui.note">{{ item.form }}</p>
                        </td>
                        <td [class]="ui.td">
                          <p class="font-medium tabular-nums">
                            {{ item.stock }}
                          </p>
                          <span
                            aria-hidden="true"
                            class="mt-1 block h-1 w-20 overflow-hidden rounded-full bg-subtle"
                          >
                            <span
                              [class]="'block h-full rounded-full ' + state.bar"
                              [style.width.%]="stockLevel(item)"
                            ></span>
                          </span>
                        </td>
                        <td
                          [class]="
                            ui.td +
                            ' hidden text-muted tabular-nums sm:table-cell'
                          "
                        >
                          {{ item.min }}
                        </td>
                        <td [class]="ui.td">
                          <span markas-badge [variant]="state.badge">{{
                            state.label
                          }}</span>
                        </td>
                        <td
                          [class]="ui.td + ' hidden text-muted md:table-cell'"
                        >
                          {{ item.exp }}
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </section>
          }
          @case ("billing") {
            <dl [class]="ui.statGrid + ' sm:grid-cols-3'">
              @for (total of totals(); track total.label; let index = $index) {
                <div
                  [class]="cx(ui.statCell, index === 0 && 'max-sm:col-span-2')"
                >
                  <dt [class]="ui.note">{{ total.label }}</dt>
                  <dd
                    [attr.data-total]="total.label"
                    [class]="ui.statValue"
                    [textContent]="rupiah(total.value)"
                  ></dd>
                  <dd [class]="ui.note">{{ total.text }}</dd>
                </div>
              }
            </dl>

            <section aria-labelledby="sehati-invoices-title" class="grid gap-3">
              <div
                sehatiHead="sehati-invoices-title"
                heading="Invoices"
                [text]="
                  shownInvoices().length +
                  ' of ' +
                  invoices.length +
                  ' invoices'
                "
              >
                <div class="flex flex-wrap items-center gap-2">
                  <div
                    role="group"
                    aria-label="Filter by payment status"
                    class="flex gap-1"
                  >
                    @for (item of statusFilters; track item.id) {
                      <button
                        type="button"
                        [attr.aria-pressed]="status() === item.id"
                        [class]="
                          cx(
                            ui.chip,
                            status() === item.id ? ui.chipOn : ui.chipOff
                          )
                        "
                        (click)="status.set(item.id)"
                      >
                        {{ item.label }}
                      </button>
                    }
                  </div>
                  <markas-select
                    [(value)]="payer"
                    aria-label="Filter by payer"
                    class="w-36"
                  >
                    @for (item of payerFilters; track item) {
                      <option>{{ item }}</option>
                    }
                  </markas-select>
                </div>
              </div>
              <div [class]="ui.tableWrap">
                <table [class]="ui.table">
                  <thead>
                    <tr>
                      <th scope="col" [class]="ui.th">Invoice</th>
                      <th scope="col" [class]="ui.th + ' hidden sm:table-cell'">
                        Payer
                      </th>
                      <th scope="col" [class]="ui.th + ' hidden md:table-cell'">
                        Date
                      </th>
                      <th scope="col" [class]="ui.th + ' text-right'">
                        Amount due
                      </th>
                      <th scope="col" [class]="ui.th">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (item of shownInvoices(); track item.id) {
                      <tr [attr.data-invoice]="item.id">
                        <td [class]="ui.td">
                          <button
                            type="button"
                            [class]="ui.linkButton + ' tabular-nums'"
                            (click)="view(item.id)"
                          >
                            {{ item.no }}
                          </button>
                          <p [class]="ui.note">{{ item.patient }}</p>
                        </td>
                        <td [class]="ui.td + ' hidden sm:table-cell'">
                          <span
                            markas-badge
                            [variant]="
                              item.payer === 'BPJS' ? 'primary' : 'neutral'
                            "
                            [dot]="false"
                            >{{ item.payer }}</span
                          >
                        </td>
                        <td
                          [class]="ui.td + ' hidden text-muted md:table-cell'"
                        >
                          {{ item.date }}
                        </td>
                        <td
                          [class]="
                            ui.td + ' text-right font-medium tabular-nums'
                          "
                        >
                          {{ rupiah(due(item)) }}
                        </td>
                        <td [class]="ui.td">
                          <span
                            markas-badge
                            [variant]="paid()[item.id] ? 'success' : 'warning'"
                            >{{ paid()[item.id] ? "Paid" : "Unpaid" }}</span
                          >
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
                @if (shownInvoices().length === 0) {
                  <p class="border-t border-line p-4 text-muted">
                    No invoices match these filters.
                  </p>
                }
              </div>
            </section>

            <markas-modal
              [id]="INVOICE_MODAL"
              [title]="'Invoice ' + invoice().no"
            >
              <div class="grid gap-4 text-ink">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="font-medium">{{ invoice().patient }}</p>
                    <p [class]="ui.note">
                      {{ invoice().date }} 2026 · {{ invoice().payer }}
                    </p>
                  </div>
                  <span
                    markas-badge
                    [variant]="paid()[invoice().id] ? 'success' : 'warning'"
                    >{{ paid()[invoice().id] ? "Paid" : "Unpaid" }}</span
                  >
                </div>
                <dl class="grid gap-2 border-y border-line py-3">
                  @for (item of invoice().items; track item.label) {
                    <div class="flex justify-between gap-3">
                      <dt>{{ item.label }}</dt>
                      <dd class="tabular-nums">{{ rupiah(item.amount) }}</dd>
                    </div>
                  }
                  <div class="flex justify-between gap-3 text-muted">
                    <dt>BPJS coverage</dt>
                    <dd class="tabular-nums">
                      - {{ rupiah(invoice().covered) }}
                    </dd>
                  </div>
                </dl>
                <p
                  class="flex items-baseline justify-between gap-3 font-semibold"
                >
                  Amount due
                  <span
                    data-due
                    class="text-lg tabular-nums"
                    [textContent]="rupiah(due(invoice()))"
                  ></span>
                </p>
              </div>
              <ng-container footer>
                <button
                  markas-button
                  variant="secondary"
                  type="submit"
                  value="close"
                >
                  Close
                </button>
                @if (!paid()[invoice().id]) {
                  <button markas-button (click)="markPaid()">
                    Mark as paid
                  </button>
                }
              </ng-container>
            </markas-modal>
          }
          @default {
            <div class="grid items-start gap-4 lg:grid-cols-2">
              <section
                aria-labelledby="sehati-profile-title"
                [class]="ui.card + ' grid gap-4 p-4 lg:row-span-2'"
              >
                <div
                  sehatiHead="sehati-profile-title"
                  heading="Clinic profile"
                  text="Shown on invoices and appointment reminders."
                ></div>
                <form
                  novalidate
                  class="grid gap-4"
                  (submit)="saveProfile($event)"
                >
                  <markas-input
                    [(value)]="clinicName"
                    label="Clinic name"
                    [error]="nameError()"
                  />
                  <markas-input
                    label="Phone"
                    type="tel"
                    value="+62 22 5550 0100"
                  />
                  <markas-input
                    label="Address"
                    value="Jl. Cendana No. 12, Bandung"
                  />
                  <markas-input label="BPJS provider code" value="0114-B-027" />
                  <div>
                    <button markas-button type="submit">Save profile</button>
                  </div>
                </form>
              </section>

              <section
                aria-labelledby="sehati-hours-title"
                [class]="ui.card + ' grid gap-3 p-4'"
              >
                <div
                  sehatiHead="sehati-hours-title"
                  heading="Opening hours"
                  text="Patients can only book inside these hours."
                ></div>
                <ul class="divide-y divide-line">
                  @for (item of openingHours; track item.day) {
                    <li
                      [attr.data-day]="item.day"
                      class="flex items-center justify-between gap-3 py-2"
                    >
                      <markas-switch
                        [label]="item.day"
                        [checked]="open()[item.day]"
                        (checkedChange)="setOpen(item.day, $event)"
                      />
                      <span
                        [class]="
                          cx('tabular-nums', !open()[item.day] && 'text-muted')
                        "
                        >{{ open()[item.day] ? item.hours : "Closed" }}</span
                      >
                    </li>
                  }
                </ul>
              </section>

              <section
                aria-labelledby="sehati-alerts-title"
                [class]="ui.card + ' grid gap-3 p-4'"
              >
                <div
                  sehatiHead="sehati-alerts-title"
                  heading="Notifications"
                  text="Choose what the front desk and pharmacy hear about."
                ></div>
                <ul class="grid gap-4">
                  @for (item of alerts; track item.id) {
                    <li>
                      <markas-switch
                        [label]="item.label"
                        [checked]="enabled()[item.id]"
                        (checkedChange)="setAlert(item, $event)"
                      />
                      <p [class]="ui.note + ' mt-1 pl-[52px]'">
                        {{ item.note }}
                      </p>
                    </li>
                  }
                </ul>
              </section>
            </div>
          }
        }
      </main>

      <aside aria-labelledby="sehati-panel-title" [class]="ui.todayPanel">
        <div>
          <h2 id="sehati-panel-title" [class]="ui.h2">Live queue</h2>
          <p [class]="ui.note">{{ TODAY }} · open until 20:00</p>
        </div>
        <dl [class]="ui.statGrid + ' grid-cols-3'">
          @for (count of counts(); track count[0]) {
            <div class="bg-surface px-3 py-2">
              <dt [class]="ui.note">{{ count[0] }}</dt>
              <dd
                [attr.data-count]="count[0]"
                class="text-lg font-semibold tabular-nums"
                [textContent]="count[1]"
              ></dd>
            </div>
          }
        </dl>
        <section aria-labelledby="sehati-now-title" class="grid gap-2">
          <h3 id="sehati-now-title" [class]="ui.h3">Now serving</h3>
          <ul class="grid gap-2">
            @for (room of rooms(); track room.doctor.id) {
              <li
                [attr.data-now]="room.doctor.id"
                [class]="
                  cx(
                    'flex items-center gap-3 rounded-lg border p-3',
                    room.serving
                      ? 'border-primary-line bg-primary-soft'
                      : 'border-dashed border-line'
                  )
                "
              >
                <span [class]="ui.ticketNo + ' w-20 text-xl'">{{
                  room.serving ? room.serving.no : "Free"
                }}</span>
                <div class="min-w-0">
                  <p class="truncate font-medium">
                    {{
                      room.serving
                        ? patientById(room.serving.patient).name
                        : "No patient"
                    }}
                  </p>
                  <p [class]="ui.note + ' truncate'">
                    {{ room.doctor.room }} · {{ room.doctor.poli }}
                  </p>
                </div>
              </li>
            }
          </ul>
        </section>
        <section aria-labelledby="sehati-next-title" class="grid gap-1">
          <h3 id="sehati-next-title" [class]="ui.h3">Up next</h3>
          @if (upNext().length === 0) {
            <p data-next class="text-muted">The waiting room is empty.</p>
          } @else {
            <ol data-next class="divide-y divide-line">
              @for (item of upNext(); track item.id) {
                <li [class]="ui.queueRow">
                  <span [class]="ui.queueNo">{{ item.no }}</span>
                  <div class="min-w-0 flex-1">
                    <p class="truncate">{{ patientById(item.patient).name }}</p>
                    <p [class]="ui.note + ' truncate'">
                      {{ doctorById(item.doctor).room }} · {{ item.type }}
                    </p>
                  </div>
                  <span [class]="ui.note + ' tabular-nums'">{{ item.at }}</span>
                </li>
              }
            </ol>
          }
        </section>
      </aside>

      <nav aria-label="Main mobile" [class]="ui.bottomBar">
        @for (id of pageIds; track id) {
          <button
            type="button"
            [attr.aria-current]="page() === id ? 'page' : null"
            [class]="
              cx(ui.bottomBase, page() === id ? ui.bottomActive : ui.bottomIdle)
            "
            (click)="go(id)"
          >
            <svg [sehatiIcon]="pages[id].icon" class="size-5"></svg>
            <span class="max-w-full truncate">{{ pages[id].label }}</span>
          </button>
        }
      </nav>

      <markas-drawer [id]="PATIENT_DRAWER" title="Patient record">
        <div class="grid gap-4 text-ink">
          <div class="flex items-center gap-3">
            <span [sehatiFace]="patient().name" class="size-12 text-sm"></span>
            <div class="min-w-0">
              <p
                data-patient-name
                class="text-base font-semibold"
                [textContent]="patient().name"
              ></p>
              <p [class]="ui.note">
                {{ patient().mrn }} · {{ doctorById(patient().doctor).name }}
              </p>
            </div>
          </div>
          <markas-tabs [items]="patientTabs">
            <ng-template markasTabPanel="profile">
              <dl class="grid grid-cols-2 gap-2">
                @for (row of profile(); track row[0]) {
                  <div [class]="ui.field">
                    <dt [class]="ui.note">{{ row[0] }}</dt>
                    <dd
                      [attr.data-field]="row[0]"
                      class="mt-0.5 font-medium"
                      [textContent]="row[1]"
                    ></dd>
                  </div>
                }
              </dl>
            </ng-template>
            <ng-template markasTabPanel="visits">
              <ol class="ml-1.5 grid gap-4 border-l border-line">
                @for (visit of visits(); track visit.date) {
                  <li class="relative pl-4">
                    <span
                      aria-hidden="true"
                      class="absolute top-1.5 -left-[4.5px] size-2 rounded-full bg-primary ring-4 ring-surface"
                    ></span>
                    <p [class]="ui.note">{{ visit.date }}</p>
                    <p class="font-medium">{{ visit.title }}</p>
                    <p class="text-muted">{{ visit.note }}</p>
                  </li>
                }
              </ol>
            </ng-template>
            <ng-template markasTabPanel="vitals">
              <ul class="grid gap-2">
                @for (vital of vitals(); track vital.def.label) {
                  <li
                    [class]="
                      ui.field + ' flex items-center justify-between gap-3'
                    "
                  >
                    <div>
                      <p [class]="ui.note">{{ vital.def.label }}</p>
                      <p class="font-semibold tabular-nums">
                        {{ vital.last }} {{ vital.def.unit }}
                      </p>
                    </div>
                    <svg
                      role="img"
                      [attr.aria-label]="vital.summary"
                      viewBox="0 0 100 32"
                      class="h-8 w-28 text-primary"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline [attr.points]="vital.points" />
                    </svg>
                  </li>
                }
              </ul>
            </ng-template>
            <ng-template markasTabPanel="allergies">
              @if (patient().allergies.length === 0) {
                <p data-allergies>No known allergies.</p>
              } @else {
                <ul data-allergies class="flex flex-wrap gap-2">
                  @for (item of patient().allergies; track item) {
                    <li>
                      <span markas-badge variant="danger">{{ item }}</span>
                    </li>
                  }
                </ul>
              }
            </ng-template>
          </markas-tabs>
        </div>
        <ng-container footer>
          <button markas-button variant="secondary" type="submit" value="close">
            Close
          </button>
          <button markas-button type="submit" value="remind" (click)="remind()">
            Send reminder
          </button>
        </ng-container>
      </markas-drawer>
      <markas-toaster />
    </div>
  `,
})
export default class Sehati {
  protected readonly ui = ui;
  protected readonly cx = cx;
  protected readonly pages = pages;
  protected readonly pageIds = pageIds;
  protected readonly TITLE_ID = TITLE_ID;
  protected readonly PATIENT_DRAWER = PATIENT_DRAWER;
  protected readonly APPOINTMENT_MODAL = APPOINTMENT_MODAL;
  protected readonly INVOICE_MODAL = INVOICE_MODAL;
  protected readonly CLINIC = CLINIC;
  protected readonly TODAY = TODAY;
  protected readonly TODAY_DAY = TODAY_DAY;
  protected readonly VISIT_TOTAL = VISIT_TOTAL;
  protected readonly FLOW_MAX = FLOW_MAX;
  protected readonly doctors = doctors;
  protected readonly patients = patients;
  protected readonly visitTypes = visitTypes;
  protected readonly visitSummary = visitSummary;
  protected readonly flow = flow;
  protected readonly days = days;
  protected readonly slots = slots;
  protected readonly blankAppointment = blankAppointment;
  protected readonly patientTabs = patientTabs;
  protected readonly prescriptions = prescriptions;
  protected readonly stockStates = stockStates;
  protected readonly low = low;
  protected readonly invoices = invoices;
  protected readonly statusFilters = statusFilters;
  protected readonly payerFilters = payerFilters;
  protected readonly openingHours = openingHours;
  protected readonly alerts = alerts;
  protected readonly notifications = notifications;
  protected readonly userMenu = userMenu;
  protected readonly tones = tones;
  protected readonly rupiah = rupiah;
  protected readonly doctorById = doctorById;
  protected readonly patientById = patientById;
  protected readonly sexLabel = sexLabel;
  protected readonly stockState = stockState;
  protected readonly stockLevel = stockLevel;
  protected readonly due = due;

  protected readonly page = signal<PageId>(readHash());
  protected readonly queueState = signal<QueueState>(
    Object.fromEntries(queue.map((item) => [item.id, item.status])),
  );
  protected readonly patientId = signal("p1");
  protected readonly unread = signal(true);
  protected readonly search = signal("");
  protected readonly patient = computed(() => patientById(this.patientId()));
  private readonly patientIndex = computed(() =>
    patients.indexOf(this.patient()),
  );
  protected readonly profile = computed(() => {
    const patient = this.patient();
    return [
      ["MRN", patient.mrn],
      ["Age and sex", sexLabel(patient)],
      ["Phone", patient.phone],
      ["Blood type", patient.blood],
      ["Insurance", patient.payer],
      ["City", patient.city],
    ];
  });
  protected readonly visits = computed(() => visitsFor(this.patientIndex()));
  protected readonly vitals = computed(() =>
    vitalDefs.map((def) => {
      const values = seriesFor(def, this.patientIndex());
      return {
        def,
        last: values[values.length - 1],
        points: spark(values),
        summary: `${def.label} over the last 5 visits: ${values.join(", ")}`,
      };
    }),
  );
  protected readonly rooms = computed(() =>
    doctors.slice(0, ROOMS).map((doctor) => ({
      doctor,
      serving: servingOf(this.queueState(), doctor.id),
      waiting: waitingOf(this.queueState(), doctor.id),
    })),
  );
  protected readonly upNext = computed(() =>
    waitingOf(this.queueState()).slice(0, UP_NEXT),
  );
  protected readonly counts = computed<[string, number][]>(() => [
    ["Waiting", countOf(this.queueState(), "waiting")],
    ["In room", countOf(this.queueState(), "serving")],
    ["Done", DONE_BASE + countOf(this.queueState(), "done")],
  ]);
  // prettier-ignore
  protected readonly stats = computed(() => [
    { label: "Waiting", value: countOf(this.queueState(), "waiting"), text: "across 3 rooms" },
    { label: "In consultation", value: countOf(this.queueState(), "serving"), text: "rooms occupied" },
    { label: "Completed", value: DONE_BASE + countOf(this.queueState(), "done"), text: "visits since 08:00" },
    { label: "Avg. wait", value: "14 min", text: "2 min faster than Wednesday" },
  ]);

  /* State halaman, direset setiap kali pindah halaman (React me-mount ulang view). */
  protected readonly list = signal(appointmentList);
  protected readonly doctorFilter = signal("all");
  protected readonly form = signal({ ...blankAppointment });
  protected readonly errors = signal({ patient: "", slot: "" });
  protected readonly query = signal("");
  protected readonly available = signal<Record<string, boolean>>({});
  protected readonly dispensed = signal<Record<string, boolean>>({});
  protected readonly lowOnly = signal(false);
  protected readonly paid = signal<Record<string, boolean>>({});
  protected readonly status = signal("all");
  protected readonly payer = signal(payerFilters[0]!);
  protected readonly openId = signal("i1");
  protected readonly clinicName = signal(CLINIC);
  protected readonly nameError = signal("");
  protected readonly open = signal<Record<string, boolean>>({});
  protected readonly enabled = signal<Record<string, boolean>>({});

  protected readonly shownAppointments = computed(() =>
    this.list().filter(
      (item) =>
        this.doctorFilter() === "all" || item.doctor === this.doctorFilter(),
    ),
  );
  protected readonly shownPatients = computed(() => {
    const needle = this.query().trim().toLowerCase();
    return patients.filter((item) =>
      `${item.name} ${item.mrn}`.toLowerCase().includes(needle),
    );
  });
  protected readonly acceptingCount = computed(
    () => Object.values(this.available()).filter(Boolean).length,
  );
  protected readonly pending = computed(
    () => prescriptions.filter((item) => !this.dispensed()[item.id]).length,
  );
  protected readonly shownStock = computed(() =>
    this.lowOnly() ? low : stock,
  );
  protected readonly invoice = computed(() =>
    invoices.find((item) => item.id === this.openId())!,
  );
  protected readonly shownInvoices = computed(() =>
    invoices.filter(
      (item) =>
        (this.status() === "all" ||
          (this.status() === "paid") === this.paid()[item.id]) &&
        (this.payer() === payerFilters[0] || item.payer === this.payer()),
    ),
  );
  // prettier-ignore
  protected readonly totals = computed(() => {
    const paid = this.paid();
    const sum = (items: Invoice[], pick: (item: Invoice) => number) =>
      items.reduce((total, item) => total + pick(item), 0);
    return [
      { label: "Outstanding", value: sum(invoices.filter((item) => !paid[item.id]), due), text: "awaiting payment" },
      { label: "Collected", value: sum(invoices.filter((item) => paid[item.id]), due), text: "paid by patients this week" },
      { label: "BPJS claims", value: sum(invoices, (item) => item.covered), text: "covered by BPJS Kesehatan" },
    ];
  });

  constructor() {
    this.resetPage();
    const onHashChange = () => {
      this.page.set(readHash());
      this.resetPage();
      // Judul selalu ada di DOM, jadi fokus bisa langsung dipindah.
      document.getElementById(TITLE_ID)?.focus();
    };
    window.addEventListener("hashchange", onHashChange);
    inject(DestroyRef).onDestroy(() =>
      window.removeEventListener("hashchange", onHashChange),
    );
  }

  private resetPage() {
    this.list.set(appointmentList);
    this.doctorFilter.set("all");
    this.form.set({ ...blankAppointment });
    this.errors.set({ patient: "", slot: "" });
    this.query.set("");
    this.available.set(
      flags(doctors, (doctor) => [
        doctor.id,
        doctor.hours[TODAY_INDEX] !== "Off",
      ]),
    );
    this.dispensed.set(
      flags(prescriptions, (item) => [item.id, item.dispensed]),
    );
    this.lowOnly.set(false);
    this.paid.set(flags(invoices, (item) => [item.id, item.paid]));
    this.status.set("all");
    this.payer.set(payerFilters[0]!);
    this.openId.set("i1");
    this.clinicName.set(CLINIC);
    this.nameError.set("");
    this.open.set(flags(openingHours, (item) => [item.day, item.open]));
    this.enabled.set(flags(alerts, (item) => [item.id, item.on]));
  }

  protected go(id: PageId) {
    window.location.assign(`#${id}`);
  }

  protected notify(title: string) {
    toast({ title });
  }

  protected share(count: number) {
    return Math.round((count / VISIT_TOTAL) * 100);
  }

  protected openPatient(id: string) {
    this.patientId.set(id);
    openDialog(PATIENT_DRAWER);
  }

  protected callNext(doctor: Doctor) {
    const state = this.queueState();
    const serving = servingOf(state, doctor.id);
    const next = waitingOf(state, doctor.id)[0];
    if (!next) return;
    this.queueState.set({
      ...state,
      ...(serving ? { [serving.id]: "done" } : {}),
      [next.id]: "serving",
    });
    toast({
      title: `Calling ${next.no}`,
      description: `${patientById(next.patient).name} to ${doctor.room}`,
    });
  }

  protected finish(doctor: Doctor) {
    const serving = servingOf(this.queueState(), doctor.id);
    if (!serving) return;
    this.queueState.set({ ...this.queueState(), [serving.id]: "done" });
    toast({
      title: "Visit completed",
      description: `${serving.no}, ${patientById(serving.patient).name}`,
      variant: "success",
    });
  }

  protected find(event: Event) {
    event.preventDefault();
    const needle = this.search().trim().toLowerCase();
    const match = patients.find((item) =>
      `${item.name} ${item.mrn}`.toLowerCase().includes(needle),
    );
    if (!needle) return;
    if (match) this.openPatient(match.id);
    else
      toast({
        title: "No patient found",
        description: `Nothing matches "${this.search().trim()}"`,
        variant: "danger",
      });
  }

  protected remind() {
    toast({
      title: "Reminder sent",
      description: `WhatsApp to ${this.patient().name}`,
      variant: "success",
    });
  }

  /* Appointments */
  protected inSlot(day: string, time: string) {
    return this.shownAppointments().filter(
      (item) => item.day === day && item.time === time,
    );
  }

  protected setField(key: keyof Appointment, value: string | undefined) {
    this.form.set({ ...this.form(), [key]: value ?? "" });
  }

  protected edit(appointment: Appointment) {
    this.form.set({ ...appointment });
    this.errors.set({ patient: "", slot: "" });
    openDialog(APPOINTMENT_MODAL);
  }

  protected save() {
    const form = this.form();
    const list = this.list();
    const found = checkAppointment(form, list);
    this.errors.set(found);
    if (found.patient || found.slot) return;
    const saved = { ...form, patient: form.patient.trim() };
    this.list.set(
      saved.id
        ? list.map((item) => (item.id === saved.id ? saved : item))
        : [...list, { ...saved, id: nextAppointmentId(list) }],
    );
    closeDialog(APPOINTMENT_MODAL);
    toast({
      title: saved.id ? "Appointment rescheduled" : "Appointment booked",
      description: `${saved.patient}, ${dayById(saved.day).label} ${saved.time}`,
      variant: "success",
    });
  }

  protected cancel() {
    const form = this.form();
    this.list.set(this.list().filter((item) => item.id !== form.id));
    closeDialog(APPOINTMENT_MODAL);
    toast({ title: "Appointment cancelled", description: form.patient });
  }

  /* Doctors */
  protected toggle(doctor: Doctor, on: boolean) {
    this.available.set({ ...this.available(), [doctor.id]: on });
    toast({
      title: on ? "Accepting patients" : "Set to away",
      description: doctor.name,
    });
  }

  /* Pharmacy */
  protected dispense(id: string, no: string, name: string) {
    this.dispensed.set({ ...this.dispensed(), [id]: true });
    toast({
      title: "Prescription dispensed",
      description: `${no} for ${name}`,
      variant: "success",
    });
  }

  /* Billing */
  protected view(id: string) {
    this.openId.set(id);
    openDialog(INVOICE_MODAL);
  }

  protected markPaid() {
    const invoice = this.invoice();
    this.paid.set({ ...this.paid(), [invoice.id]: true });
    closeDialog(INVOICE_MODAL);
    toast({
      title: "Payment recorded",
      description: `${invoice.no}, ${rupiah(due(invoice))}`,
      variant: "success",
    });
  }

  /* Settings */
  protected saveProfile(event: Event) {
    event.preventDefault();
    const name = this.clinicName().trim();
    this.nameError.set(name ? "" : "Enter the clinic name.");
    if (!name) return;
    toast({
      title: "Clinic profile saved",
      description: name,
      variant: "success",
    });
  }

  protected setOpen(day: string, on: boolean) {
    this.open.set({ ...this.open(), [day]: on });
  }

  protected setAlert(item: (typeof alerts)[number], on: boolean) {
    this.enabled.set({ ...this.enabled(), [item.id]: on });
    toast({
      title: on ? "Notification enabled" : "Notification disabled",
      description: item.label,
    });
  }
}
