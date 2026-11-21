<script setup lang="ts">
import {
  computed,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  type FunctionalComponent,
} from "vue";
import Badge from "../../../components/badge/Badge.vue";
import Button from "../../../components/button/Button.vue";
import Drawer from "../../../components/drawer/Drawer.vue";
import DropdownMenu, {
  type DropdownMenuItem,
} from "../../../components/dropdown-menu/DropdownMenu.vue";
import Input from "../../../components/input/Input.vue";
import Modal from "../../../components/modal/Modal.vue";
import Popover from "../../../components/popover/Popover.vue";
import Select from "../../../components/select/Select.vue";
import Switch from "../../../components/switch/Switch.vue";
import Tabs from "../../../components/tabs/Tabs.vue";
import Toaster, { toast } from "../../../components/toast/Toast.vue";

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

const Face: FunctionalComponent<{ name: string }> = (props) =>
  h(
    "span",
    { "aria-hidden": "true", class: [face, faceTone(props.name)] },
    initials(props.name),
  );
Face.props = ["name"];

const Head: FunctionalComponent<{ id: string; title: string; text: string }> = (
  props,
  { slots },
) =>
  h("div", { class: "flex flex-wrap items-end justify-between gap-3" }, [
    h("div", [
      h("h2", { id: props.id, class: h2 }, props.title),
      h("p", { "data-note": "", class: [note, "mt-0.5"] }, props.text),
    ]),
    slots.default?.(),
  ]);
Head.props = ["id", "title", "text"];

const flags = <T,>(items: T[], pick: (item: T) => [string, boolean]) =>
  Object.fromEntries(items.map(pick));

const page = ref<PageId>(DEFAULT_PAGE);
const queueState = ref<QueueState>(
  Object.fromEntries(queue.map((item) => [item.id, item.status])),
);
const patientId = ref("p1");
const unread = ref(true);
const search = ref("");
const patient = computed(() => patientById(patientId.value));
const patientIndex = computed(() => patients.indexOf(patient.value));
const profile = computed(() => [
  ["MRN", patient.value.mrn],
  ["Age and sex", sexLabel(patient.value)],
  ["Phone", patient.value.phone],
  ["Blood type", patient.value.blood],
  ["Insurance", patient.value.payer],
  ["City", patient.value.city],
]);
const vitals = computed(() =>
  vitalDefs.map((def) => ({ def, values: seriesFor(def, patientIndex.value) })),
);
const rooms = computed(() =>
  doctors.slice(0, ROOMS).map((doctor) => ({
    doctor,
    serving: servingOf(queueState.value, doctor.id),
    waiting: waitingOf(queueState.value, doctor.id),
  })),
);
const upNext = computed(() => waitingOf(queueState.value).slice(0, UP_NEXT));
const counts = computed<[string, number][]>(() => [
  ["Waiting", countOf(queueState.value, "waiting")],
  ["In room", countOf(queueState.value, "serving")],
  ["Done", DONE_BASE + countOf(queueState.value, "done")],
]);
// prettier-ignore
const stats = computed(() => [
  { label: "Waiting", value: countOf(queueState.value, "waiting"), text: "across 3 rooms" },
  { label: "In consultation", value: countOf(queueState.value, "serving"), text: "rooms occupied" },
  { label: "Completed", value: DONE_BASE + countOf(queueState.value, "done"), text: "visits since 08:00" },
  { label: "Avg. wait", value: "14 min", text: "2 min faster than Wednesday" },
]);

/* State halaman, direset setiap kali pindah halaman (React me-mount ulang view). */
const list = ref(appointmentList);
const doctorFilter = ref("all");
const form = ref({ ...blankAppointment });
const errors = ref({ patient: "", slot: "" });
const query = ref("");
const available = ref<Record<string, boolean>>({});
const dispensed = ref<Record<string, boolean>>({});
const lowOnly = ref(false);
const paid = ref<Record<string, boolean>>({});
const status = ref("all");
const payer = ref(payerFilters[0]!);
const openId = ref("i1");
const clinicName = ref(CLINIC);
const nameError = ref("");
const open = ref<Record<string, boolean>>({});
const enabled = ref<Record<string, boolean>>({});

function resetPage() {
  list.value = appointmentList;
  doctorFilter.value = "all";
  form.value = { ...blankAppointment };
  errors.value = { patient: "", slot: "" };
  query.value = "";
  available.value = flags(doctors, (doctor) => [
    doctor.id,
    doctor.hours[TODAY_INDEX] !== "Off",
  ]);
  dispensed.value = flags(prescriptions, (item) => [item.id, item.dispensed]);
  lowOnly.value = false;
  paid.value = flags(invoices, (item) => [item.id, item.paid]);
  status.value = "all";
  payer.value = payerFilters[0]!;
  openId.value = "i1";
  clinicName.value = CLINIC;
  nameError.value = "";
  open.value = flags(openingHours, (item) => [item.day, item.open]);
  enabled.value = flags(alerts, (item) => [item.id, item.on]);
}
resetPage();

function onHashChange() {
  page.value = readHash();
  resetPage();
  void nextTick(() => document.getElementById(TITLE_ID)?.focus());
}
onMounted(() => {
  page.value = readHash();
  window.addEventListener("hashchange", onHashChange);
});
onBeforeUnmount(() => window.removeEventListener("hashchange", onHashChange));

const go = (id: PageId) => window.location.assign(`#${id}`);
const current = (id: PageId) => (page.value === id ? "page" : undefined);
const openPatient = (id: string) => {
  patientId.value = id;
  openDialog(PATIENT_DRAWER);
};
const callNext = (doctor: Doctor) => {
  const serving = servingOf(queueState.value, doctor.id);
  const next = waitingOf(queueState.value, doctor.id)[0];
  if (!next) return;
  queueState.value = {
    ...queueState.value,
    ...(serving ? { [serving.id]: "done" } : {}),
    [next.id]: "serving",
  };
  toast({
    title: `Calling ${next.no}`,
    description: `${patientById(next.patient).name} to ${doctor.room}`,
  });
};
const finish = (doctor: Doctor) => {
  const serving = servingOf(queueState.value, doctor.id);
  if (!serving) return;
  queueState.value = { ...queueState.value, [serving.id]: "done" };
  toast({
    title: "Visit completed",
    description: `${serving.no}, ${patientById(serving.patient).name}`,
    variant: "success",
  });
};
const find = () => {
  const needle = search.value.trim().toLowerCase();
  const match = patients.find((item) =>
    `${item.name} ${item.mrn}`.toLowerCase().includes(needle),
  );
  if (!needle) return;
  if (match) openPatient(match.id);
  else
    toast({
      title: "No patient found",
      description: `Nothing matches "${search.value.trim()}"`,
      variant: "danger",
    });
};

/* Appointments */
const shownAppointments = computed(() =>
  list.value.filter(
    (item) =>
      doctorFilter.value === "all" || item.doctor === doctorFilter.value,
  ),
);
const inSlot = (day: string, time: string) =>
  shownAppointments.value.filter(
    (item) => item.day === day && item.time === time,
  );
const edit = (appointment: Appointment) => {
  form.value = { ...appointment };
  errors.value = { patient: "", slot: "" };
  openDialog(APPOINTMENT_MODAL);
};
const save = () => {
  const found = checkAppointment(form.value, list.value);
  errors.value = found;
  if (found.patient || found.slot) return;
  const saved = { ...form.value, patient: form.value.patient.trim() };
  list.value = saved.id
    ? list.value.map((item) => (item.id === saved.id ? saved : item))
    : [...list.value, { ...saved, id: nextAppointmentId(list.value) }];
  closeDialog(APPOINTMENT_MODAL);
  toast({
    title: saved.id ? "Appointment rescheduled" : "Appointment booked",
    description: `${saved.patient}, ${dayById(saved.day).label} ${saved.time}`,
    variant: "success",
  });
};
const cancel = () => {
  list.value = list.value.filter((item) => item.id !== form.value.id);
  closeDialog(APPOINTMENT_MODAL);
  toast({ title: "Appointment cancelled", description: form.value.patient });
};

/* Patients */
const shownPatients = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return patients.filter((item) =>
    `${item.name} ${item.mrn}`.toLowerCase().includes(needle),
  );
});

/* Doctors */
const toggle = (doctor: Doctor, on: boolean) => {
  available.value = { ...available.value, [doctor.id]: on };
  toast({
    title: on ? "Accepting patients" : "Set to away",
    description: doctor.name,
  });
};
const acceptingCount = computed(
  () => Object.values(available.value).filter(Boolean).length,
);

/* Pharmacy */
const pending = computed(
  () => prescriptions.filter((item) => !dispensed.value[item.id]).length,
);
const low = stock.filter((item) => stockState(item) !== "ok");
const shownStock = computed(() => (lowOnly.value ? low : stock));
const dispense = (id: string, no: string, name: string) => {
  dispensed.value = { ...dispensed.value, [id]: true };
  toast({
    title: "Prescription dispensed",
    description: `${no} for ${name}`,
    variant: "success",
  });
};

/* Billing */
const invoice = computed(() =>
  invoices.find((item) => item.id === openId.value)!,
);
const shownInvoices = computed(() =>
  invoices.filter(
    (item) =>
      (status.value === "all" ||
        (status.value === "paid") === paid.value[item.id]) &&
      (payer.value === payerFilters[0] || item.payer === payer.value),
  ),
);
const sum = (items: Invoice[], pick: (item: Invoice) => number) =>
  items.reduce((total, item) => total + pick(item), 0);
// prettier-ignore
const totals = computed(() => [
  { label: "Outstanding", value: sum(invoices.filter((item) => !paid.value[item.id]), due), text: "awaiting payment" },
  { label: "Collected", value: sum(invoices.filter((item) => paid.value[item.id]), due), text: "paid by patients this week" },
  { label: "BPJS claims", value: sum(invoices, (item) => item.covered), text: "covered by BPJS Kesehatan" },
]);
const view = (id: string) => {
  openId.value = id;
  openDialog(INVOICE_MODAL);
};
const markPaid = () => {
  paid.value = { ...paid.value, [invoice.value.id]: true };
  closeDialog(INVOICE_MODAL);
  toast({
    title: "Payment recorded",
    description: `${invoice.value.no}, ${rupiah(due(invoice.value))}`,
    variant: "success",
  });
};

/* Settings */
const saveProfile = () => {
  const missing = clinicName.value.trim() === "";
  nameError.value = missing ? "Enter the clinic name." : "";
  if (missing) return;
  toast({
    title: "Clinic profile saved",
    description: clinicName.value.trim(),
    variant: "success",
  });
};
const setAlert = (item: (typeof alerts)[number], on: boolean) => {
  enabled.value = { ...enabled.value, [item.id]: on };
  toast({
    title: on ? "Notification enabled" : "Notification disabled",
    description: item.label,
  });
};
</script>

<template>
  <div :class="shell">
    <nav aria-label="Main" :class="rail">
      <span aria-hidden="true" :class="[logo, 'mb-3']">
        <Icon name="plus" class="size-5" />
      </span>
      <button
        v-for="id in pageIds"
        :key="id"
        type="button"
        :aria-label="pages[id].title"
        :aria-current="current(id)"
        :title="pages[id].title"
        :class="[
          railBase,
          page === id ? railActive : railIdle,
          id === 'settings' && 'mt-auto',
        ]"
        @click="go(id)"
      >
        <Icon :name="pages[id].icon" class="size-5" />
      </button>
    </nav>

    <header :class="topbar">
      <span aria-hidden="true" :class="[logo, 'lg:hidden']">
        <Icon name="plus" class="size-5" />
      </span>
      <div class="min-w-0 flex-1">
        <h1
          :id="TITLE_ID"
          tabindex="-1"
          class="truncate text-base leading-tight font-semibold focus:outline-none"
        >
          {{ pages[page].title }}
        </h1>
        <p :class="[note, 'truncate']">{{ `${CLINIC} · ${TODAY}` }}</p>
      </div>
      <form
        role="search"
        class="order-last w-full sm:order-none sm:w-60"
        @submit.prevent="find"
      >
        <Input
          v-model="search"
          type="search"
          aria-label="Search patients"
          placeholder="Search patient or MRN"
        />
      </form>
      <Popover align="end" :class="iconTrigger">
        <template #trigger>
          <Icon name="bell" class="size-5" />
          <span data-unread class="sr-only">{{
            unread ? "Notifications, 3 unread" : "Notifications"
          }}</span>
          <span
            v-if="unread"
            aria-hidden="true"
            class="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"
          />
        </template>
        <div class="grid gap-3">
          <p :class="h3">Notifications</p>
          <ul class="grid gap-3">
            <li
              v-for="item in notifications"
              :key="item.title"
              class="flex gap-2"
            >
              <span
                aria-hidden="true"
                :class="[dot, 'mt-1.5', unread ? 'bg-primary' : 'bg-line']"
              />
              <div>
                <p class="font-medium">{{ item.title }}</p>
                <p :class="note">{{ item.time }}</p>
              </div>
            </li>
          </ul>
          <Button
            variant="secondary"
            size="sm"
            :disabled="!unread"
            @click="unread = false"
          >
            Mark all as read
          </Button>
        </div>
      </Popover>
      <DropdownMenu
        :items="userMenu"
        :class="userTrigger"
        @select="(value) => toast({ title: value })"
      >
        <template #trigger>
          <Face name="Ayu Kartika" class="size-7 text-[11px]" />
          <span class="sr-only">Account, </span>
          <span class="hidden sm:inline">Ayu Kartika</span>
        </template>
      </DropdownMenu>
    </header>

    <main :class="main">
      <template v-if="page === 'today'">
        <dl :class="[statGrid, 'lg:grid-cols-4']">
          <div v-for="stat in stats" :key="stat.label" :class="statCell">
            <dt :class="note">{{ stat.label }}</dt>
            <dd :data-stat="stat.label" :class="statValue">{{ stat.value }}</dd>
            <dd :class="note">{{ stat.text }}</dd>
          </div>
        </dl>

        <section aria-labelledby="sehati-board-title" class="grid gap-3">
          <Head
            id="sehati-board-title"
            title="Queue board"
            text="Call the next number when a room is ready."
          />
          <div class="grid gap-4 md:grid-cols-3">
            <article
              v-for="{ doctor, serving, waiting } in rooms"
              :key="doctor.id"
              :data-room="doctor.id"
              :aria-label="`${doctor.room}, ${doctor.name}`"
              :class="[card, 'flex flex-col gap-3 p-4']"
            >
              <div class="flex items-center gap-3">
                <Face :name="doctor.name" class="size-9 text-xs" />
                <div class="min-w-0">
                  <h3 :class="[h3, 'truncate']">{{ doctor.name }}</h3>
                  <p :class="note">{{ `${doctor.poli} · ${doctor.room}` }}</p>
                </div>
              </div>
              <div v-if="serving" data-serving :class="ticket">
                <p class="text-xs font-medium text-primary">Now serving</p>
                <p :class="ticketNo">{{ serving.no }}</p>
                <p class="truncate text-xs">
                  {{ `${patientById(serving.patient).name}, ${serving.type}` }}
                </p>
              </div>
              <p v-else data-serving :class="ticketFree">Room is free</p>
              <div>
                <p data-waiting :class="note">
                  {{ `${waiting.length} waiting` }}
                </p>
                <ul class="divide-y divide-line">
                  <li v-for="item in waiting" :key="item.id" :class="queueRow">
                    <span :class="queueNo">{{ item.no }}</span>
                    <button
                      type="button"
                      :class="[linkButton, 'min-w-0 flex-1 truncate']"
                      @click="openPatient(item.patient)"
                    >
                      {{ patientById(item.patient).name }}
                    </button>
                    <span :class="[note, 'tabular-nums']">{{ item.at }}</span>
                  </li>
                </ul>
              </div>
              <div class="mt-auto grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  :disabled="!serving"
                  @click="finish(doctor)"
                >
                  Mark done
                </Button>
                <Button
                  size="sm"
                  :disabled="waiting.length === 0"
                  @click="callNext(doctor)"
                >
                  Call next
                </Button>
              </div>
            </article>
          </div>
        </section>

        <div class="grid gap-4 md:grid-cols-2">
          <section
            aria-labelledby="sehati-types-title"
            :class="[card, 'grid content-start gap-4 p-4']"
          >
            <Head
              id="sehati-types-title"
              title="Visits by type"
              :text="`${VISIT_TOTAL} visits registered today`"
            />
            <div
              role="img"
              :aria-label="
                visitTypes
                  .map((type) => `${type.label} ${type.count}`)
                  .join(', ')
              "
              class="flex h-3 gap-0.5 overflow-hidden rounded-full"
            >
              <span
                v-for="type in visitTypes"
                :key="type.label"
                :class="tones[type.tone]"
                :style="{ flexGrow: type.count }"
              />
            </div>
            <ul class="grid gap-2">
              <li
                v-for="type in visitTypes"
                :key="type.label"
                class="flex items-center gap-2"
              >
                <span aria-hidden="true" :class="[dot, tones[type.tone]]" />
                <span class="flex-1">{{ type.label }}</span>
                <span class="font-medium tabular-nums">{{ type.count }}</span>
                <span :class="[note, 'w-9 text-right tabular-nums']">{{
                  `${Math.round((type.count / VISIT_TOTAL) * 100)}%`
                }}</span>
              </li>
            </ul>
          </section>

          <section
            aria-labelledby="sehati-flow-title"
            :class="[card, 'flex flex-col gap-4 p-4']"
          >
            <Head
              id="sehati-flow-title"
              title="Patient flow"
              text="Check-ins per hour, peak at 10:00"
            />
            <ol
              aria-label="Check-ins per hour"
              class="flex min-h-36 flex-1 items-end gap-2"
            >
              <li
                v-for="item in flow"
                :key="item.hour"
                class="flex h-full flex-1 flex-col items-center justify-end gap-1"
              >
                <span class="text-xs font-medium tabular-nums">{{
                  item.count
                }}</span>
                <span
                  aria-hidden="true"
                  :class="[
                    'w-full rounded-t-md',
                    item.count === FLOW_MAX ? 'bg-primary' : 'bg-primary-line',
                  ]"
                  :style="{ height: `${(item.count / FLOW_MAX) * 70}%` }"
                />
                <span :class="[note, 'tabular-nums']"
                  ><span class="sr-only">at </span>{{ item.hour }}</span
                >
              </li>
            </ol>
          </section>
        </div>
      </template>

      <section
        v-else-if="page === 'appointments'"
        aria-labelledby="sehati-week-title"
        class="grid gap-3"
      >
        <Head
          id="sehati-week-title"
          title="Week of 16 Nov 2026"
          :text="`${shownAppointments.length} appointments`"
        >
          <div class="flex flex-wrap items-end gap-2">
            <Select
              v-model="doctorFilter"
              aria-label="Filter by doctor"
              class="sm:w-56"
            >
              <option value="all">All doctors</option>
              <option
                v-for="doctor in doctors"
                :key="doctor.id"
                :value="doctor.id"
              >
                {{ `${doctor.name} (${doctor.poli})` }}
              </option>
            </Select>
            <Button @click="edit(blankAppointment)">
              <Icon name="plus" class="size-4" />
              New appointment
            </Button>
          </div>
        </Head>
        <div :class="tableWrap">
          <table :class="[table, 'min-w-[720px] table-fixed']">
            <thead>
              <tr>
                <th scope="col" :class="[th, 'w-16']">Time</th>
                <th
                  v-for="day in days"
                  :key="day.id"
                  scope="col"
                  :class="[
                    th,
                    'border-l border-line',
                    day.id === TODAY_DAY && 'text-primary',
                  ]"
                >
                  {{ `${day.label} ${day.date}` }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="time in slots" :key="time">
                <th
                  scope="row"
                  class="border-t border-line px-4 py-2 text-left align-top text-xs font-medium text-muted tabular-nums"
                >
                  {{ time }}
                </th>
                <td
                  v-for="day in days"
                  :key="day.id"
                  :data-slot="`${day.id}-${time}`"
                  :class="[slotCell, day.id === TODAY_DAY && slotToday]"
                >
                  <div class="grid gap-1">
                    <button
                      v-for="item in inSlot(day.id, time)"
                      :key="item.id"
                      type="button"
                      :data-appointment="item.id"
                      :aria-label="`${item.patient}, ${doctorById(item.doctor).name}, ${day.label} ${time}`"
                      :class="booking"
                      @click="edit(item)"
                    >
                      <span
                        aria-hidden="true"
                        :class="[dot, tones[doctorById(item.doctor).tone]]"
                      />
                      <span class="truncate">{{ item.patient }}</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul aria-label="Doctors" class="flex flex-wrap gap-x-4 gap-y-1">
          <li
            v-for="doctor in doctors"
            :key="doctor.id"
            :class="[note, 'flex items-center gap-1.5']"
          >
            <span aria-hidden="true" :class="[dot, tones[doctor.tone]]" />
            {{ doctor.name }}
          </li>
        </ul>

        <Modal
          :id="APPOINTMENT_MODAL"
          :title="form.id ? 'Edit appointment' : 'New appointment'"
        >
          <div class="grid gap-4 text-ink">
            <Input
              v-model="form.patient"
              label="Patient name"
              :error="errors.patient"
            />
            <Select v-model="form.doctor" label="Doctor">
              <option
                v-for="doctor in doctors"
                :key="doctor.id"
                :value="doctor.id"
              >
                {{ `${doctor.name} (${doctor.poli})` }}
              </option>
            </Select>
            <div class="grid grid-cols-2 gap-3">
              <Select v-model="form.day" label="Day">
                <option v-for="day in days" :key="day.id" :value="day.id">
                  {{ `${day.label}, ${day.date} Nov` }}
                </option>
              </Select>
              <Select v-model="form.time" label="Time">
                <option v-for="time in slots" :key="time" :value="time">
                  {{ time }}
                </option>
              </Select>
            </div>
            <p v-if="errors.slot" role="alert" class="text-danger">
              {{ errors.slot }}
            </p>
          </div>
          <template #footer>
            <Button v-if="form.id" variant="danger" @click="cancel">
              Cancel appointment
            </Button>
            <Button @click="save">
              {{ form.id ? "Save changes" : "Book appointment" }}
            </Button>
          </template>
        </Modal>
      </section>

      <section
        v-else-if="page === 'patients'"
        aria-labelledby="sehati-patients-title"
        class="grid gap-3"
      >
        <Head
          id="sehati-patients-title"
          title="Patient records"
          :text="`${shownPatients.length} of ${patients.length} patients`"
        >
          <div class="w-full sm:w-64">
            <Input
              v-model="query"
              type="search"
              aria-label="Filter patients"
              placeholder="Filter by name or MRN"
            />
          </div>
        </Head>
        <div :class="tableWrap">
          <table :class="table">
            <thead>
              <tr>
                <th scope="col" :class="th">Patient</th>
                <th scope="col" :class="[th, 'hidden sm:table-cell']">MRN</th>
                <th scope="col" :class="th">Insurance</th>
                <th scope="col" :class="[th, 'hidden md:table-cell']">
                  Doctor
                </th>
                <th scope="col" :class="[th, 'hidden md:table-cell']">
                  Last visit
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in shownPatients"
                :key="item.id"
                :data-patient="item.id"
              >
                <td :class="td">
                  <div class="flex items-center gap-3">
                    <Face :name="item.name" class="size-8 text-xs" />
                    <div>
                      <button
                        type="button"
                        :class="linkButton"
                        @click="openPatient(item.id)"
                      >
                        {{ item.name }}
                      </button>
                      <p :class="note">{{ sexLabel(item) }}</p>
                    </div>
                  </div>
                </td>
                <td :class="[td, 'hidden tabular-nums sm:table-cell']">
                  {{ item.mrn }}
                </td>
                <td :class="td">
                  <Badge
                    :variant="item.payer === 'BPJS' ? 'primary' : 'neutral'"
                    :dot="false"
                  >
                    {{ item.payer }}
                  </Badge>
                </td>
                <td :class="[td, 'hidden md:table-cell']">
                  {{ doctorById(item.doctor).name }}
                </td>
                <td :class="[td, 'hidden text-muted md:table-cell']">
                  {{ item.last }}
                </td>
              </tr>
            </tbody>
          </table>
          <p
            v-if="shownPatients.length === 0"
            class="border-t border-line p-4 text-muted"
          >
            No patients match this filter.
          </p>
        </div>
      </section>

      <section
        v-else-if="page === 'doctors'"
        aria-labelledby="sehati-roster-title"
        class="grid gap-3"
      >
        <Head
          id="sehati-roster-title"
          title="Roster"
          :text="`${acceptingCount} of ${doctors.length} doctors accepting patients`"
        />
        <ul class="grid gap-4 md:grid-cols-2">
          <li
            v-for="doctor in doctors"
            :key="doctor.id"
            :data-doctor="doctor.id"
            :class="[card, 'grid gap-4 p-4']"
          >
            <div class="flex items-start gap-3">
              <Face :name="doctor.name" class="size-11 text-sm" />
              <div class="min-w-0 flex-1">
                <h3 :class="[h3, 'truncate']">{{ doctor.name }}</h3>
                <p :class="note">
                  {{
                    `${doctor.poli} · ${doctor.room} · ${doctor.load} patients today`
                  }}
                </p>
              </div>
              <Badge :variant="available[doctor.id] ? 'success' : 'neutral'">
                {{ available[doctor.id] ? "Available" : "Away" }}
              </Badge>
            </div>
            <dl class="grid grid-cols-6 gap-1 text-center">
              <div
                v-for="(day, index) in days"
                :key="day.id"
                :class="[
                  'rounded-md py-1.5',
                  day.id === TODAY_DAY ? 'bg-primary-soft' : 'bg-subtle',
                ]"
              >
                <dt :class="note">{{ day.label }}</dt>
                <dd
                  :class="[
                    'text-xs font-medium tabular-nums',
                    doctor.hours[index] === 'Off' && 'text-muted',
                  ]"
                >
                  {{ doctor.hours[index] }}
                </dd>
              </div>
            </dl>
            <Switch
              label="Accepting patients"
              :model-value="available[doctor.id]"
              @update:model-value="(on) => toggle(doctor, Boolean(on))"
            />
          </li>
        </ul>
      </section>

      <template v-else-if="page === 'pharmacy'">
        <section aria-labelledby="sehati-rx-title" class="grid gap-3">
          <Head
            id="sehati-rx-title"
            title="Prescription queue"
            :text="`${pending} waiting to be dispensed`"
          />
          <ul :class="[card, 'divide-y divide-line']">
            <li
              v-for="item in prescriptions"
              :key="item.id"
              :data-rx="item.id"
              class="flex flex-wrap items-center gap-x-4 gap-y-2 p-4"
            >
              <div class="min-w-0 flex-1 basis-56">
                <p class="font-medium">
                  <span class="tabular-nums">{{ item.no }}</span
                  >{{ ` · ${item.patient}` }}
                </p>
                <p :class="[note, 'mt-0.5']">{{ item.items }}</p>
              </div>
              <p :class="[note, 'hidden md:block']">
                {{ doctorById(item.doctor).name }}
              </p>
              <Badge v-if="dispensed[item.id]" variant="success"
                >Dispensed</Badge
              >
              <Button
                v-else
                variant="secondary"
                size="sm"
                :aria-label="`Dispense ${item.no}`"
                @click="dispense(item.id, item.no, item.patient)"
              >
                <Icon name="check" class="size-4" />
                Dispense
              </Button>
            </li>
          </ul>
        </section>

        <section aria-labelledby="sehati-stock-title" class="grid gap-3">
          <Head
            id="sehati-stock-title"
            title="Stock"
            :text="`${low.length} items need reorder`"
          >
            <Switch v-model="lowOnly" label="Low stock only" />
          </Head>
          <div :class="tableWrap">
            <table :class="table">
              <thead>
                <tr>
                  <th scope="col" :class="th">Item</th>
                  <th scope="col" :class="th">On hand</th>
                  <th scope="col" :class="[th, 'hidden sm:table-cell']">
                    Minimum
                  </th>
                  <th scope="col" :class="th">Status</th>
                  <th scope="col" :class="[th, 'hidden md:table-cell']">
                    Expires
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in shownStock"
                  :key="item.name"
                  :data-stock="stockState(item)"
                >
                  <td :class="td">
                    <p class="font-medium">{{ item.name }}</p>
                    <p :class="note">{{ item.form }}</p>
                  </td>
                  <td :class="td">
                    <p class="font-medium tabular-nums">{{ item.stock }}</p>
                    <span
                      aria-hidden="true"
                      class="mt-1 block h-1 w-20 overflow-hidden rounded-full bg-subtle"
                    >
                      <span
                        :class="[
                          'block h-full rounded-full',
                          stockStates[stockState(item)].bar,
                        ]"
                        :style="{ width: `${stockLevel(item)}%` }"
                      />
                    </span>
                  </td>
                  <td
                    :class="[
                      td,
                      'hidden text-muted tabular-nums sm:table-cell',
                    ]"
                  >
                    {{ item.min }}
                  </td>
                  <td :class="td">
                    <Badge :variant="stockStates[stockState(item)].badge">
                      {{ stockStates[stockState(item)].label }}
                    </Badge>
                  </td>
                  <td :class="[td, 'hidden text-muted md:table-cell']">
                    {{ item.exp }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </template>

      <template v-else-if="page === 'billing'">
        <dl :class="[statGrid, 'sm:grid-cols-3']">
          <div
            v-for="(total, index) in totals"
            :key="total.label"
            :class="[statCell, index === 0 && 'max-sm:col-span-2']"
          >
            <dt :class="note">{{ total.label }}</dt>
            <dd :data-total="total.label" :class="statValue">
              {{ rupiah(total.value) }}
            </dd>
            <dd :class="note">{{ total.text }}</dd>
          </div>
        </dl>

        <section aria-labelledby="sehati-invoices-title" class="grid gap-3">
          <Head
            id="sehati-invoices-title"
            title="Invoices"
            :text="`${shownInvoices.length} of ${invoices.length} invoices`"
          >
            <div class="flex flex-wrap items-center gap-2">
              <div
                role="group"
                aria-label="Filter by payment status"
                class="flex gap-1"
              >
                <button
                  v-for="item in statusFilters"
                  :key="item.id"
                  type="button"
                  :aria-pressed="status === item.id"
                  :class="[chip, status === item.id ? chipOn : chipOff]"
                  @click="status = item.id"
                >
                  {{ item.label }}
                </button>
              </div>
              <Select v-model="payer" aria-label="Filter by payer" class="w-36">
                <option v-for="item in payerFilters" :key="item">
                  {{ item }}
                </option>
              </Select>
            </div>
          </Head>
          <div :class="tableWrap">
            <table :class="table">
              <thead>
                <tr>
                  <th scope="col" :class="th">Invoice</th>
                  <th scope="col" :class="[th, 'hidden sm:table-cell']">
                    Payer
                  </th>
                  <th scope="col" :class="[th, 'hidden md:table-cell']">
                    Date
                  </th>
                  <th scope="col" :class="[th, 'text-right']">Amount due</th>
                  <th scope="col" :class="th">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in shownInvoices"
                  :key="item.id"
                  :data-invoice="item.id"
                >
                  <td :class="td">
                    <button
                      type="button"
                      :class="[linkButton, 'tabular-nums']"
                      @click="view(item.id)"
                    >
                      {{ item.no }}
                    </button>
                    <p :class="note">{{ item.patient }}</p>
                  </td>
                  <td :class="[td, 'hidden sm:table-cell']">
                    <Badge
                      :variant="item.payer === 'BPJS' ? 'primary' : 'neutral'"
                      :dot="false"
                    >
                      {{ item.payer }}
                    </Badge>
                  </td>
                  <td :class="[td, 'hidden text-muted md:table-cell']">
                    {{ item.date }}
                  </td>
                  <td :class="[td, 'text-right font-medium tabular-nums']">
                    {{ rupiah(due(item)) }}
                  </td>
                  <td :class="td">
                    <Badge :variant="paid[item.id] ? 'success' : 'warning'">
                      {{ paid[item.id] ? "Paid" : "Unpaid" }}
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              v-if="shownInvoices.length === 0"
              class="border-t border-line p-4 text-muted"
            >
              No invoices match these filters.
            </p>
          </div>
        </section>

        <Modal :id="INVOICE_MODAL" :title="`Invoice ${invoice.no}`">
          <div class="grid gap-4 text-ink">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="font-medium">{{ invoice.patient }}</p>
                <p :class="note">
                  {{ `${invoice.date} 2026 · ${invoice.payer}` }}
                </p>
              </div>
              <Badge :variant="paid[invoice.id] ? 'success' : 'warning'">
                {{ paid[invoice.id] ? "Paid" : "Unpaid" }}
              </Badge>
            </div>
            <dl class="grid gap-2 border-y border-line py-3">
              <div
                v-for="item in invoice.items"
                :key="item.label"
                class="flex justify-between gap-3"
              >
                <dt>{{ item.label }}</dt>
                <dd class="tabular-nums">{{ rupiah(item.amount) }}</dd>
              </div>
              <div class="flex justify-between gap-3 text-muted">
                <dt>BPJS coverage</dt>
                <dd class="tabular-nums">
                  {{ `- ${rupiah(invoice.covered)}` }}
                </dd>
              </div>
            </dl>
            <p class="flex items-baseline justify-between gap-3 font-semibold">
              Amount due
              <span data-due class="text-lg tabular-nums">{{
                rupiah(due(invoice))
              }}</span>
            </p>
          </div>
          <template #footer>
            <Button variant="secondary" type="submit" value="close"
              >Close</Button
            >
            <Button v-if="!paid[invoice.id]" @click="markPaid"
              >Mark as paid</Button
            >
          </template>
        </Modal>
      </template>

      <div v-else class="grid items-start gap-4 lg:grid-cols-2">
        <section
          aria-labelledby="sehati-profile-title"
          :class="[card, 'grid gap-4 p-4 lg:row-span-2']"
        >
          <Head
            id="sehati-profile-title"
            title="Clinic profile"
            text="Shown on invoices and appointment reminders."
          />
          <form novalidate class="grid gap-4" @submit.prevent="saveProfile">
            <Input
              v-model="clinicName"
              label="Clinic name"
              :error="nameError"
            />
            <Input label="Phone" type="tel" value="+62 22 5550 0100" />
            <Input label="Address" value="Jl. Cendana No. 12, Bandung" />
            <Input label="BPJS provider code" value="0114-B-027" />
            <div>
              <Button type="submit">Save profile</Button>
            </div>
          </form>
        </section>

        <section
          aria-labelledby="sehati-hours-title"
          :class="[card, 'grid gap-3 p-4']"
        >
          <Head
            id="sehati-hours-title"
            title="Opening hours"
            text="Patients can only book inside these hours."
          />
          <ul class="divide-y divide-line">
            <li
              v-for="item in openingHours"
              :key="item.day"
              :data-day="item.day"
              class="flex items-center justify-between gap-3 py-2"
            >
              <Switch v-model="open[item.day]" :label="item.day" />
              <span
                :class="['tabular-nums', !open[item.day] && 'text-muted']"
                >{{ open[item.day] ? item.hours : "Closed" }}</span
              >
            </li>
          </ul>
        </section>

        <section
          aria-labelledby="sehati-alerts-title"
          :class="[card, 'grid gap-3 p-4']"
        >
          <Head
            id="sehati-alerts-title"
            title="Notifications"
            text="Choose what the front desk and pharmacy hear about."
          />
          <ul class="grid gap-4">
            <li v-for="item in alerts" :key="item.id">
              <Switch
                :label="item.label"
                :model-value="enabled[item.id]"
                @update:model-value="(on) => setAlert(item, Boolean(on))"
              />
              <p :class="[note, 'mt-1 pl-[52px]']">{{ item.note }}</p>
            </li>
          </ul>
        </section>
      </div>
    </main>

    <aside aria-labelledby="sehati-panel-title" :class="todayPanel">
      <div>
        <h2 id="sehati-panel-title" :class="h2">Live queue</h2>
        <p :class="note">{{ `${TODAY} · open until 20:00` }}</p>
      </div>
      <dl :class="[statGrid, 'grid-cols-3']">
        <div
          v-for="[label, value] in counts"
          :key="label"
          class="bg-surface px-3 py-2"
        >
          <dt :class="note">{{ label }}</dt>
          <dd :data-count="label" class="text-lg font-semibold tabular-nums">
            {{ value }}
          </dd>
        </div>
      </dl>
      <section aria-labelledby="sehati-now-title" class="grid gap-2">
        <h3 id="sehati-now-title" :class="h3">Now serving</h3>
        <ul class="grid gap-2">
          <li
            v-for="{ doctor, serving } in rooms"
            :key="doctor.id"
            :data-now="doctor.id"
            :class="[
              'flex items-center gap-3 rounded-lg border p-3',
              serving
                ? 'border-primary-line bg-primary-soft'
                : 'border-dashed border-line',
            ]"
          >
            <span :class="[ticketNo, 'w-20 text-xl']">{{
              serving ? serving.no : "Free"
            }}</span>
            <div class="min-w-0">
              <p class="truncate font-medium">
                {{ serving ? patientById(serving.patient).name : "No patient" }}
              </p>
              <p :class="[note, 'truncate']">
                {{ `${doctor.room} · ${doctor.poli}` }}
              </p>
            </div>
          </li>
        </ul>
      </section>
      <section aria-labelledby="sehati-next-title" class="grid gap-1">
        <h3 id="sehati-next-title" :class="h3">Up next</h3>
        <p v-if="upNext.length === 0" data-next class="text-muted">
          The waiting room is empty.
        </p>
        <ol v-else data-next class="divide-y divide-line">
          <li v-for="item in upNext" :key="item.id" :class="queueRow">
            <span :class="queueNo">{{ item.no }}</span>
            <div class="min-w-0 flex-1">
              <p class="truncate">{{ patientById(item.patient).name }}</p>
              <p :class="[note, 'truncate']">
                {{ `${doctorById(item.doctor).room} · ${item.type}` }}
              </p>
            </div>
            <span :class="[note, 'tabular-nums']">{{ item.at }}</span>
          </li>
        </ol>
      </section>
    </aside>

    <nav aria-label="Main mobile" :class="bottomBar">
      <button
        v-for="id in pageIds"
        :key="id"
        type="button"
        :aria-current="current(id)"
        :class="[bottomBase, page === id ? bottomActive : bottomIdle]"
        @click="go(id)"
      >
        <Icon :name="pages[id].icon" class="size-5" />
        <span class="max-w-full truncate">{{ pages[id].label }}</span>
      </button>
    </nav>

    <Drawer :id="PATIENT_DRAWER" title="Patient record">
      <div class="grid gap-4 text-ink">
        <div class="flex items-center gap-3">
          <Face :name="patient.name" class="size-12 text-sm" />
          <div class="min-w-0">
            <p data-patient-name class="text-base font-semibold">
              {{ patient.name }}
            </p>
            <p :class="note">
              {{ `${patient.mrn} · ${doctorById(patient.doctor).name}` }}
            </p>
          </div>
        </div>
        <Tabs :items="patientTabs">
          <template #profile>
            <dl class="grid grid-cols-2 gap-2">
              <div
                v-for="[label, value] in profile"
                :key="label"
                :class="field"
              >
                <dt :class="note">{{ label }}</dt>
                <dd :data-field="label" class="mt-0.5 font-medium">
                  {{ value }}
                </dd>
              </div>
            </dl>
          </template>
          <template #visits>
            <ol class="ml-1.5 grid gap-4 border-l border-line">
              <li
                v-for="visit in visitsFor(patientIndex)"
                :key="visit.date"
                class="relative pl-4"
              >
                <span
                  aria-hidden="true"
                  class="absolute top-1.5 -left-[4.5px] size-2 rounded-full bg-primary ring-4 ring-surface"
                />
                <p :class="note">{{ visit.date }}</p>
                <p class="font-medium">{{ visit.title }}</p>
                <p class="text-muted">{{ visit.note }}</p>
              </li>
            </ol>
          </template>
          <template #vitals>
            <ul class="grid gap-2">
              <li
                v-for="{ def, values } in vitals"
                :key="def.label"
                :class="[field, 'flex items-center justify-between gap-3']"
              >
                <div>
                  <p :class="note">{{ def.label }}</p>
                  <p class="font-semibold tabular-nums">
                    {{ `${values[values.length - 1]} ${def.unit}` }}
                  </p>
                </div>
                <svg
                  role="img"
                  :aria-label="`${def.label} over the last 5 visits: ${values.join(', ')}`"
                  viewBox="0 0 100 32"
                  class="h-8 w-28 text-primary"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline :points="spark(values)" />
                </svg>
              </li>
            </ul>
          </template>
          <template #allergies>
            <p v-if="patient.allergies.length === 0" data-allergies>
              No known allergies.
            </p>
            <ul v-else data-allergies class="flex flex-wrap gap-2">
              <li v-for="item in patient.allergies" :key="item">
                <Badge variant="danger">{{ item }}</Badge>
              </li>
            </ul>
          </template>
        </Tabs>
      </div>
      <template #footer>
        <Button variant="secondary" type="submit" value="close">Close</Button>
        <Button
          type="submit"
          value="remind"
          @click="
            toast({
              title: 'Reminder sent',
              description: `WhatsApp to ${patient.name}`,
              variant: 'success',
            })
          "
        >
          Send reminder
        </Button>
      </template>
    </Drawer>
    <Toaster />
  </div>
</template>
