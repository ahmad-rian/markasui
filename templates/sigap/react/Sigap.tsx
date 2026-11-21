"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { Badge } from "../../../components/badge/Badge";
import { Button } from "../../../components/button/Button";
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
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  clock: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20",
  leave: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M9 16l2 2 4-4",
  wallet: "M20 7H5a2 2 0 0 1 0-4h13v4M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1M17 14h.01",
  board: "M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v13h-4z",
  settings: "M4 6h10M18 6h2M4 12h2M10 12h10M4 18h8M16 18h4M14 4v4M6 10v4M12 16v4",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3",
  menu: "M4 6h16M4 12h16M4 18h16",
  plus: "M12 5v14M5 12h14",
  prev: "m15 18-6-6 6-6",
  next: "m9 18 6-6-6-6",
  down: "m6 9 6 6 6-6",
  check: "M5 12.5 10 17 19 7.5",
  cake: "M4 21h16M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7M5 16c2.3 1.6 4.7 1.6 7 0s4.7-1.6 7 0M12 12V8M12 5.5v.01",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5",
};
type IconName = keyof typeof icons;

// prettier-ignore
const pages = {
  overview: { label: "Overview", title: "Overview", sub: "Friday, 20 November 2026. Morning shift is closed, afternoon shift is on the floor.", icon: "home" },
  employees: { label: "Employees", title: "Employees", sub: "Everyone on the payroll across the Bekasi plant, warehouse and stores.", icon: "users" },
  attendance: { label: "Attendance", title: "Attendance", sub: "Clock in and clock out per shift. Late means more than 10 minutes after shift start.", icon: "clock" },
  leave: { label: "Leave", title: "Leave", sub: "Approve requests, watch balances and see who is out over the next two weeks.", icon: "leave" },
  payroll: { label: "Payroll", title: "Payroll", sub: "November 2026 run. Salaries are transferred on the 25th.", icon: "wallet" },
  recruitment: { label: "Recruitment", title: "Recruitment", sub: "Open roles for the December production ramp-up.", icon: "board" },
  settings: { label: "Settings", title: "Settings", sub: "Company profile, work schedule and attendance policies.", icon: "settings" },
} as const;
type PageId = keyof typeof pages;
const DEFAULT_PAGE: PageId = "overview";
// prettier-ignore
const navGroups: { label: string; ids: PageId[] }[] = [
  { label: "Workspace", ids: ["overview"] },
  { label: "People", ids: ["employees", "attendance", "leave"] },
  { label: "Pay and hiring", ids: ["payroll", "recruitment"] },
  { label: "Admin", ids: ["settings"] },
];
const TITLE_ID = "sigap-page-title";
const EMPLOYEE_DRAWER = "sigap-employee-drawer";
const ADD_MODAL = "sigap-add-modal";
const CORRECT_MODAL = "sigap-correct-modal";
const RUN_MODAL = "sigap-run-modal";
const ME = "Dewi Anggraini";
const HEADCOUNT = 128;
const WAITING_PREVIEW = 4;

/* Karyawan */
const departments = [
  "Production",
  "Warehouse",
  "Retail",
  "Operations",
  "Finance",
  "People",
];
const employmentTypes = ["Permanent", "Contract", "Probation"];
const shifts = ["Morning", "Afternoon", "Night"];
type Employee = {
  id: string;
  name: string;
  dept: string;
  role: string;
  type: string;
  shift: string;
  joined: string;
  salary: number;
};
// prettier-ignore
const employeeList: Employee[] = [
  { id: "SG-1042", name: "Dewi Anggraini", dept: "People", role: "HR Manager", type: "Permanent", shift: "Morning", joined: "12 Mar 2019", salary: 14500000 },
  { id: "SG-1057", name: "Agus Setiawan", dept: "Production", role: "Line Supervisor", type: "Permanent", shift: "Morning", joined: "3 Aug 2020", salary: 9800000 },
  { id: "SG-1068", name: "Putri Handayani", dept: "Finance", role: "Payroll Specialist", type: "Permanent", shift: "Morning", joined: "21 Jan 2021", salary: 8900000 },
  { id: "SG-1103", name: "Rizky Pratama", dept: "Warehouse", role: "Forklift Operator", type: "Contract", shift: "Night", joined: "1 Dec 2025", salary: 5600000 },
  { id: "SG-1117", name: "Siti Nurhaliza", dept: "Retail", role: "Store Lead", type: "Permanent", shift: "Afternoon", joined: "17 Jun 2022", salary: 7400000 },
  { id: "SG-1124", name: "Bambang Sutrisno", dept: "Production", role: "Machine Operator", type: "Permanent", shift: "Night", joined: "28 Sep 2018", salary: 6200000 },
  { id: "SG-1139", name: "Maria Kristiani", dept: "Retail", role: "Cashier", type: "Probation", shift: "Afternoon", joined: "5 Oct 2026", salary: 5100000 },
  { id: "SG-1146", name: "Fajar Nugroho", dept: "Warehouse", role: "Inventory Clerk", type: "Contract", shift: "Morning", joined: "15 Dec 2025", salary: 5400000 },
  { id: "SG-1152", name: "Ketut Wirawan", dept: "Production", role: "Quality Inspector", type: "Permanent", shift: "Afternoon", joined: "2 May 2023", salary: 6900000 },
  { id: "SG-1160", name: "Lina Marlina", dept: "Operations", role: "Shift Coordinator", type: "Contract", shift: "Morning", joined: "19 Jan 2026", salary: 6500000 },
];
const NEW_ID_START = 1167;
const NEW_HIRE = {
  role: "New hire",
  shift: "Morning",
  joined: "20 Nov 2026",
  salary: 5200000,
};
const emptyDraft = {
  name: "",
  email: "",
  dept: "Production",
  type: "Contract",
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Ringkasan hari ini */
// prettier-ignore
const stats = [
  { label: "Headcount", value: "128", note: "3 joined this month", tone: "" },
  { label: "Present today", value: "109", note: "85% of headcount", tone: "on" },
  { label: "Late", value: "7", note: "Past the 10 minute tolerance", tone: "late" },
  { label: "Absent", value: "4", note: "8 more on approved leave", tone: "off" },
];
const PAYROLL_GROSS = 1284650000;
const PAYROLL_BPJS = 51386000;
const PAYROLL_TAX = 38540000;
const PAYROLL_NET = PAYROLL_GROSS - PAYROLL_BPJS - PAYROLL_TAX;
// 14 hari kerja terakhir (3 sampai 20 November).
// prettier-ignore
const trend = {
  day: [3, 4, 5, 6, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20],
  present: [114, 111, 116, 108, 112, 117, 110, 113, 106, 115, 112, 111, 114, 109],
  late: [5, 8, 4, 9, 6, 3, 8, 5, 10, 4, 7, 6, 5, 7],
};
const rangeOptions = [
  { value: "7", label: "7 days" },
  { value: "14", label: "14 days" },
];
const RATE_MAX = 96;
const RATE_MIN = 88;
const rateMarks = ["96%", "92%", "88%"];
const LATE_SCALE = 12;
// prettier-ignore
const deptToday = [
  { dept: "Production", total: 46, present: 42 }, { dept: "Retail", total: 30, present: 27 },
  { dept: "Warehouse", total: 24, present: 22 }, { dept: "Operations", total: 12, present: 11 },
  { dept: "Finance", total: 8, present: 7 }, { dept: "People", total: 8, present: 7 },
];
// prettier-ignore
const upcoming = [
  { date: "22 Nov", who: "Siti Nurhaliza", kind: "Birthday", note: "Turns 31", icon: "cake" },
  { date: "30 Nov", who: "Rizky Pratama", kind: "Contract ends", note: "12 month contract, renewal not decided", icon: "file" },
  { date: "5 Dec", who: "Maria Kristiani", kind: "Probation review", note: "Month 2 of 3", icon: "check" },
  { date: "14 Dec", who: "Fajar Nugroho", kind: "Contract ends", note: "Renewal approved by Warehouse", icon: "file" },
  { date: "19 Dec", who: "Agus Setiawan", kind: "Birthday", note: "Turns 38", icon: "cake" },
] satisfies { icon: IconName; [key: string]: unknown }[];
// prettier-ignore
const notifications = [
  { id: "n1", title: "4 leave requests need a decision", time: "10 minutes ago" },
  { id: "n2", title: "Maria Kristiani clocked in 18 minutes late", time: "1 hour ago" },
  { id: "n3", title: "BPJS Ketenagakerjaan report is due on 30 Nov", time: "Yesterday" },
];
// prettier-ignore
const userMenu: DropdownMenuItem[] = [
  { label: "My profile", value: "profile" }, { label: "Settings", value: "settings" },
  { separator: true }, { label: "Sign out", value: "signout" },
];

/* Absensi: "masuk-keluar", "absent", "leave", atau kosong (belum mulai). */
// prettier-ignore
const dates = [
  { id: "d16", label: "Mon, 16 Nov 2026" }, { id: "d17", label: "Tue, 17 Nov 2026" }, { id: "d18", label: "Wed, 18 Nov 2026" },
  { id: "d19", label: "Thu, 19 Nov 2026" }, { id: "d20", label: "Fri, 20 Nov 2026" },
];
// prettier-ignore
const attendance: Record<string, string[]> = {
  d16: ["06:54-15:10", "06:58-15:02", "07:03-15:30", "22:51-07:04", "14:55-23:02", "23:14-07:01", "14:49-23:00", "leave", "15:02-23:05", "07:21-15:00"],
  d17: ["06:57-15:05", "07:12-15:04", "06:59-15:20", "22:58-07:02", "15:16-23:01", "22:55-07:00", "14:52-23:03", "leave", "absent", "06:55-15:01"],
  d18: ["07:01-15:12", "06:55-15:00", "07:04-15:15", "absent", "14:58-23:00", "22:57-07:03", "15:24-23:02", "06:50-15:02", "14:57-23:04", "06:58-15:03"],
  d19: ["06:52-15:08", "06:59-15:03", "06:58-15:07", "22:54-07:01", "14:51-23:05", "leave", "14:56-23:01", "07:00-15:00", "14:59-23:02", "07:08-15:04"],
  d20: ["06:56-15:04", "07:14-15:02", "07:02-15:11", "", "14:53-", "leave", "15:18-", "06:57-15:01", "14:58-", "07:01-15:06"],
};
const shiftStart: Record<string, string> = {
  Morning: "07:00",
  Afternoon: "15:00",
  Night: "23:00",
};
const LATE_AFTER = 10;
const DAY_MINUTES = 1440;
const shiftOptions = [
  { value: "all", label: "All" },
  ...shifts.map((value) => ({ value, label: value })),
];
// prettier-ignore
const dayStatus: Record<string, { label: string; tone: string }> = {
  ontime: { label: "On time", tone: "on" }, late: { label: "Late", tone: "late" }, absent: { label: "Absent", tone: "off" },
  leave: { label: "On leave", tone: "leave" }, scheduled: { label: "Scheduled", tone: "" },
};
const emptyFix = { index: -1, in: "", out: "", reason: "" };

/* Cuti */
type LeaveStatus = "pending" | "approved" | "rejected";
// prettier-ignore
const leaveRequests: { id: string; who: string; type: string; from: number; to: number; days: number; reason: string; status: LeaveStatus }[] = [
  { id: "LV-311", who: "Rizky Pratama", type: "Annual", from: 23, to: 25, days: 3, reason: "Family event in Solo", status: "pending" },
  { id: "LV-312", who: "Maria Kristiani", type: "Sick", from: 23, to: 23, days: 1, reason: "Dental surgery follow-up", status: "pending" },
  { id: "LV-313", who: "Ketut Wirawan", type: "Annual", from: 26, to: 27, days: 2, reason: "Galungan ceremony in Gianyar", status: "pending" },
  { id: "LV-314", who: "Agus Setiawan", type: "Annual", from: 24, to: 24, days: 1, reason: "School report day", status: "pending" },
  { id: "LV-308", who: "Bambang Sutrisno", type: "Annual", from: 19, to: 20, days: 2, reason: "Moving house", status: "approved" },
  { id: "LV-305", who: "Fajar Nugroho", type: "Sick", from: 16, to: 17, days: 2, reason: "Fever, doctor's note attached", status: "approved" },
  { id: "LV-302", who: "Lina Marlina", type: "Unpaid", from: 18, to: 18, days: 1, reason: "Requested with one day notice", status: "rejected" },
];
type LeaveRequest = (typeof leaveRequests)[number];
type LeaveState = Record<string, LeaveStatus>;
const leaveFilters = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];
// prettier-ignore
const leaveTones: Record<string, string> = { pending: "late", approved: "on", rejected: "off" };
// prettier-ignore
const balances = [
  { type: "Annual", label: "Annual leave", used: 742, total: 1536, note: "12 days per employee" },
  { type: "Sick", label: "Sick leave", used: 118, total: 640, note: "With a doctor's note" },
  { type: "Unpaid", label: "Unpaid leave", used: 21, total: 128, note: "Deducted from payroll" },
];
const STRIP_START = 16;
const STRIP_DAYS = 14;
const TODAY = 20;
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const stripDays = Array.from({ length: STRIP_DAYS }, (_, index) => ({
  day: STRIP_START + index,
  weekday: weekdays[index % 7]!,
  weekend: index % 7 > 4,
}));

/* Payroll */
const FIXED_ALLOWANCE = 850000;
const POSITION_RATE = 0.1;
const HEALTH_RATE = 0.01;
const PENSION_RATE = 0.03;
// prettier-ignore
const taxBands = [[15000000, 0.07], [10000000, 0.04], [7000000, 0.0125], [5400000, 0.005]] as const;
const RUN_STEP = 20;
const RUN_TICK = 220;
// prettier-ignore
const runStatus: Record<string, { label: string; tone: string }> = {
  draft: { label: "Draft", tone: "" }, running: { label: "Processing", tone: "late" }, paid: { label: "Paid", tone: "on" },
};
// prettier-ignore
const payrollTotals = [
  { label: "Gross pay", value: PAYROLL_GROSS, note: "128 payslips" },
  { label: "BPJS, employee share", value: PAYROLL_BPJS, note: "Kesehatan, JHT and JP" },
  { label: "PPh 21", value: PAYROLL_TAX, note: "Monthly effective rate" },
  { label: "Net pay", value: PAYROLL_NET, note: "Transfer on 25 Nov" },
];
// prettier-ignore
const rateColumns = [
  { key: "name", label: "Contribution" }, { key: "employee", label: "Employee", align: "right" as const },
  { key: "employer", label: "Employer", align: "right" as const },
];
// prettier-ignore
const rateRows = [
  { name: "BPJS Kesehatan", employee: "1%", employer: "4%" },
  { name: "Jaminan Hari Tua (JHT)", employee: "2%", employer: "3,7%" },
  { name: "Jaminan Pensiun (JP)", employee: "1%", employer: "2%" },
  { name: "Jaminan Kecelakaan Kerja (JKK)", employee: "0%", employer: "0,54%" },
  { name: "Jaminan Kematian (JKM)", employee: "0%", employer: "0,3%" },
];

/* Rekrutmen */
const stages = ["Applied", "Screening", "Interview", "Offer"];
// prettier-ignore
const candidateList = [
  { id: "c1", name: "Yoga Aditya", role: "Machine Operator", source: "Walk-in", days: 2, stage: "Applied" },
  { id: "c2", name: "Nurul Hidayah", role: "Cashier", source: "Job portal", days: 1, stage: "Applied" },
  { id: "c3", name: "Hendra Wijaya", role: "Forklift Operator", source: "Referral", days: 4, stage: "Screening" },
  { id: "c4", name: "Ayu Lestari", role: "Quality Inspector", source: "Job portal", days: 3, stage: "Screening" },
  { id: "c5", name: "Dimas Prakoso", role: "Machine Operator", source: "Vocational school", days: 6, stage: "Interview" },
  { id: "c6", name: "Wayan Sudarma", role: "Warehouse Lead", source: "Referral", days: 5, stage: "Interview" },
  { id: "c7", name: "Fitri Ramadhani", role: "Payroll Officer", source: "LinkedIn", days: 2, stage: "Offer" },
];
type Candidate = (typeof candidateList)[number];

/* Pengaturan */
// prettier-ignore
const profileFields = [
  { key: "company", label: "Company name", type: "text" }, { key: "npwp", label: "NPWP", type: "text" },
  { key: "email", label: "HR email", type: "email" }, { key: "city", label: "City", type: "text" },
] as const;
type ProfileKey = (typeof profileFields)[number]["key"];
// prettier-ignore
const profileDefaults: Record<ProfileKey, string> = {
  company: "PT Sigap Karya Nusantara", npwp: "01.234.567.8-431.000", email: "hr@sigapkarya.co.id", city: "Bekasi",
};
const NPWP_DIGITS = 15;
const defaultWorkDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const tolerances = ["5 minutes", "10 minutes", "15 minutes"];
const cutoffs = ["20th", "25th", "Last working day"];
// prettier-ignore
const policies = [
  { id: "geofence", label: "Geofenced clock-in", note: "Only accept clock-ins within 150 m of a registered site.", on: true },
  { id: "overtime", label: "Overtime needs approval", note: "Supervisors approve overtime before it reaches payroll.", on: true },
  { id: "payslip", label: "Email payslips", note: "Send a PDF payslip to every employee after each run.", on: true },
  { id: "selfie", label: "Selfie verification", note: "Ask for a photo on mobile clock-in.", on: false },
];

/* Gaya */
// Palet lokal, nilai terang dan gelap. Hex hanya di sini.
const palette =
  "[--tpl-side:#17181c] [--tpl-side-ink:#f4f4f5] [--tpl-side-muted:#a9abb4] [--tpl-side-line:#2b2d34] [--tpl-side-hover:#22242a] [--tpl-on:#15803d] [--tpl-late:#b45309] [--tpl-off:#64748b] [--tpl-leave:#0369a1] [--tpl-av1:#c7dafd] [--tpl-av2:#fbd0da] [--tpl-av3:#fde68a] [--tpl-av4:#bfecd6] [--tpl-av5:#ddd3fb] [--tpl-av-ink:#1f2937] dark:[--tpl-side:#0c0d0f] dark:[--tpl-side-line:#24262b] dark:[--tpl-side-hover:#191b1f] dark:[--tpl-on:#4ade80] dark:[--tpl-late:#fbbf24] dark:[--tpl-off:#94a3b8] dark:[--tpl-leave:#38bdf8]";
const shell = `${palette} min-h-dvh bg-canvas text-ink lg:grid lg:grid-cols-[232px_minmax(0,1fr)]`;
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const sideFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-side-ink)";
const side =
  "sticky top-0 hidden h-dvh flex-col gap-6 overflow-y-auto bg-(--tpl-side) px-3 py-4 text-(--tpl-side-ink) lg:flex dark:border-r dark:border-(--tpl-side-line)";
const sideSheet =
  "[--tpl-menu:var(--tpl-side)] -m-6 flex min-h-[calc(100%+3rem)] flex-col gap-6 bg-(--tpl-side) px-3 py-4 text-(--tpl-side-ink)";
const navLabel = "px-3 pb-1.5 text-xs text-(--tpl-side-muted)";
const navItem = `relative flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-sm transition-colors duration-150 ${sideFocus}`;
const navOn =
  "bg-(--tpl-side-hover) font-semibold text-(--tpl-side-ink) before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-primary";
const navOff =
  "text-(--tpl-side-muted) hover:bg-(--tpl-side-hover) hover:text-(--tpl-side-ink)";
const navCount =
  "ml-auto rounded-full bg-(--tpl-side-ink) px-1.5 text-xs leading-5 font-semibold text-(--tpl-side) tabular-nums";
const iconButton = `relative inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink ${focusRing}`;
const bellTrigger =
  "[&>button]:relative [&>button]:size-9 [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-0 [&>button]:text-muted";
const userTrigger =
  "[&>button]:h-9 [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-1.5";
const panel = "min-w-0 rounded-lg border border-line bg-surface";
const panelHead =
  "flex min-h-12 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-line px-4 py-2";
const panelTitle = "text-sm font-semibold";
const strip =
  "grid gap-px overflow-hidden rounded-lg border border-line bg-line";
const cell = "bg-surface p-4";
const statLabel = "flex items-center gap-1.5 text-xs text-muted";
const statValue = "mt-1.5 text-2xl font-semibold tracking-tight tabular-nums";
const statNote = "mt-1 text-xs text-muted";
const dotBase = "size-2 shrink-0 rounded-full";
// prettier-ignore
const dots: Record<string, string> = {
  "": "bg-faint", on: "bg-(--tpl-on)", late: "bg-(--tpl-late)", off: "bg-(--tpl-off)", leave: "bg-(--tpl-leave)",
};
const pill =
  "inline-flex h-6 items-center gap-1.5 rounded-md border border-line bg-surface px-2 text-xs font-medium whitespace-nowrap";
// prettier-ignore
const typeTones: Record<string, string> = { Permanent: "on", Contract: "leave", Probation: "late" };
const face =
  "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-(--tpl-av-ink) select-none";
const faceTones = [
  "bg-(--tpl-av1)",
  "bg-(--tpl-av2)",
  "bg-(--tpl-av3)",
  "bg-(--tpl-av4)",
  "bg-(--tpl-av5)",
];
const scroller = `overflow-x-auto ${focusRing}`;
const table = "w-full border-collapse text-sm";
const th =
  "h-10 bg-subtle px-4 text-left text-xs font-medium whitespace-nowrap text-muted";
const td = "border-t border-line px-4 py-2.5 whitespace-nowrap";
const num = "text-right tabular-nums";
const person = "flex items-center gap-3";
const personName = "truncate text-sm font-medium";
const personMeta = "truncate text-xs text-muted";
const listRow =
  "flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-4 py-3 last:border-b-0";
const dayOn =
  "border-primary bg-primary text-on-primary hover:bg-primary-strong";
const dayOff = "border-line bg-surface text-muted hover:text-ink";
const dayButton = `inline-flex h-9 min-w-11 items-center justify-center rounded-md border px-2 text-sm font-medium transition-colors duration-150 ${focusRing}`;
const column = "grid content-start gap-2";
const columnHead =
  "flex items-center justify-between border-b-2 border-line pb-2 text-sm font-semibold";
const candidateCard = "grid gap-3 rounded-lg border border-line bg-surface p-3";
const moveButton = `inline-flex size-8 items-center justify-center rounded-md border border-line text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink ${focusRing}`;

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const rupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
/** Huruf pertama kata pertama dan terakhir. */
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
const emailOf = (name: string) =>
  `${name.toLowerCase().replace(/\s+/g, ".")}@sigapkarya.co.id`;
const matchesEmployee = (
  item: Employee,
  query: string,
  dept: string,
  type: string,
) =>
  `${item.name} ${item.id}`
    .toLowerCase()
    .includes(query.trim().toLowerCase()) &&
  (dept === "all" || item.dept === dept) &&
  (type === "all" || item.type === type);

const minutes = (time: string) =>
  Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
/** Baris absensi dari catatan mentah: jam, durasi, dan status terhadap awal shift. */
function dayRow(record: string, shift: string) {
  if (record === "" || record === "absent" || record === "leave")
    return { in: "", out: "", hours: "", status: record || "scheduled" };
  const [start = "", end = ""] = record.split("-");
  const worked = (minutes(end) - minutes(start) + DAY_MINUTES) % DAY_MINUTES;
  const late = minutes(start) - minutes(shiftStart[shift]!) > LATE_AFTER;
  return {
    in: start,
    out: end,
    hours: end
      ? `${Math.floor(worked / 60)}h ${String(worked % 60).padStart(2, "0")}m`
      : "",
    status: late ? "late" : "ontime",
  };
}

const leaveDates = (item: LeaveRequest) =>
  item.from === item.to ? `${item.from} Nov` : `${item.from} to ${item.to} Nov`;
const dayWord = (count: number) => `${count} ${count === 1 ? "day" : "days"}`;
const initialLeave = (): LeaveState =>
  Object.fromEntries(leaveRequests.map((item) => [item.id, item.status]));
const leaveCount = (state: LeaveState, status: LeaveStatus) =>
  leaveRequests.filter((item) => state[item.id] === status).length;
/** Jumlah orang cuti (disetujui) pada tanggal itu. */
const outOn = (state: LeaveState, day: number) =>
  leaveRequests.filter(
    (item) =>
      state[item.id] === "approved" && item.from <= day && day <= item.to,
  ).length;
/** Hari terpakai: angka dasar ditambah permintaan contoh yang baru disetujui. */
const usedDays = (state: LeaveState, type: string, base: number) =>
  leaveRequests
    .filter(
      (item) =>
        item.type === type &&
        item.status === "pending" &&
        state[item.id] === "approved",
    )
    .reduce((sum, item) => sum + item.days, base);

function payslip(item: Employee) {
  const position =
    item.type === "Permanent" ? Math.round(item.salary * POSITION_RATE) : 0;
  const gross = item.salary + FIXED_ALLOWANCE + position;
  const health = Math.round(item.salary * HEALTH_RATE);
  const pension = Math.round(item.salary * PENSION_RATE);
  const rate = taxBands.find(([floor]) => gross > floor)?.[1] ?? 0;
  const tax = Math.round(gross * rate);
  const lines: [string, number][] = [
    ["Basic salary", item.salary],
    ["Transport and meals", FIXED_ALLOWANCE],
    ["Position allowance", position],
    ["BPJS Kesehatan 1%", -health],
    ["BPJS JHT and JP 3%", -pension],
    ["PPh 21", -tax],
  ];
  return {
    allowance: FIXED_ALLOWANCE + position,
    deduction: health + pension + tax,
    net: gross - health - pension - tax,
    lines,
  };
}

/** Garis tren tingkat kehadiran untuk n hari kerja terakhir. */
function trendOf(range: string) {
  const count = Number(range);
  const from = trend.day.length - count;
  const points = trend.day.slice(from).map((day, index) => {
    const late = trend.late[from + index]!;
    const rate = ((trend.present[from + index]! + late) / HEADCOUNT) * 100;
    const x = ((index + 0.5) / count) * 100;
    const y = ((RATE_MAX - rate) / (RATE_MAX - RATE_MIN)) * 100;
    return { day, late, rate, at: `${x.toFixed(2)},${y.toFixed(2)}` };
  });
  const line = points.map((point) => point.at).join(" ");
  const first = (0.5 / count) * 100;
  const average = points.reduce((sum, point) => sum + point.rate, 0) / count;
  const lowest = points.reduce((a, b) => (b.rate < a.rate ? b : a));
  return {
    points,
    line,
    area: `${first.toFixed(2)},100 ${line} ${(100 - first).toFixed(2)},100`,
    average: average.toFixed(1),
    summary: `Attendance rate over the last ${count} working days: average ${average.toFixed(1)}%, lowest ${lowest.rate.toFixed(1)}% on ${lowest.day} Nov.`,
  };
}

/** Halaman aktif disimpan di hash URL supaya bisa dibagikan dan tombol Back bekerja. */
function readHash(): PageId {
  const id = window.location.hash.slice(1);
  return id in pages ? (id as PageId) : DEFAULT_PAGE;
}

const dialogOf = (id: string) => {
  const dialog = document.getElementById(id);
  return dialog instanceof HTMLDialogElement ? dialog : null;
};
const openDialog = (id: string) => dialogOf(id)?.showModal();
const closeDialog = (id: string) => dialogOf(id)?.close();
/** Fokus ke elemen yang baru dirender ulang (kartu yang pindah kolom). */
const focusLater = (selector: string) =>
  requestAnimationFrame(() =>
    document.querySelector<HTMLElement>(selector)?.focus(),
  );

/* Komponen */
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
  className = "size-4",
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

function Face({ name, className }: { name: string; className: string }) {
  return (
    <span aria-hidden="true" className={cx(face, faceTone(name), className)}>
      {initials(name)}
    </span>
  );
}

function Pill({ tone, children }: { tone: string; children: ReactNode }) {
  return (
    <span className={pill}>
      <span aria-hidden="true" className={cx(dotBase, dots[tone])} />
      {children}
    </span>
  );
}

function Person({ name, meta }: { name: string; meta: string }) {
  return (
    <div className={person}>
      <Face name={name} className="size-8 text-[11px]" />
      <div className="min-w-0">
        <p className={personName}>{name}</p>
        <p className={personMeta}>{meta}</p>
      </div>
    </div>
  );
}

function LeaveActions({
  item,
  decide,
}: {
  item: LeaveRequest;
  decide: Shared["decide"];
}) {
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="secondary"
        aria-label={`Reject ${item.who}`}
        onClick={() => decide(item, "rejected")}
      >
        Reject
      </Button>
      <Button
        size="sm"
        aria-label={`Approve ${item.who}`}
        onClick={() => decide(item, "approved")}
      >
        Approve
      </Button>
    </div>
  );
}

type Shared = {
  query: string;
  setQuery: (value: string) => void;
  leave: LeaveState;
  decide: (item: LeaveRequest, status: LeaveStatus) => void;
  go: (id: PageId) => void;
};

function OverviewPage({ leave, decide, go }: Shared) {
  const [range, setRange] = useState("14");
  const chart = trendOf(range);
  const waiting = leaveRequests.filter((item) => leave[item.id] === "pending");
  return (
    <div className="grid gap-4">
      <dl className={cx(strip, "grid-cols-2 md:grid-cols-3 xl:grid-cols-6")}>
        {stats.map((stat) => (
          <div key={stat.label} className={cell}>
            <dt className={statLabel}>
              {stat.tone && (
                <span
                  aria-hidden="true"
                  className={cx(dotBase, dots[stat.tone])}
                />
              )}
              {stat.label}
            </dt>
            <dd className={statValue}>{stat.value}</dd>
            <dd className={statNote}>{stat.note}</dd>
          </div>
        ))}
        <div className={cx(cell, "col-span-2")}>
          <dt className={statLabel}>Payroll this month</dt>
          <dd className={statValue}>{rupiah(PAYROLL_GROSS)}</dd>
          <dd className={statNote}>
            {`${rupiah(PAYROLL_NET)} net after BPJS and PPh 21`}
          </dd>
        </div>
      </dl>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section aria-labelledby="sigap-trend-title" className={panel}>
          <div className={panelHead}>
            <h2 id="sigap-trend-title" className={panelTitle}>
              Attendance trend
            </h2>
            <ToggleGroup
              label="Trend range"
              items={rangeOptions}
              value={range}
              onValueChange={(value: string) => setRange(value || range)}
            />
          </div>
          <div className="p-4">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span
                data-average
                className="text-2xl font-semibold tracking-tight tabular-nums"
              >{`${chart.average}%`}</span>
              <span className="text-xs text-muted">
                average attendance rate
              </span>
            </p>
            <p className="sr-only">{chart.summary}</p>
            <div
              aria-hidden="true"
              className="mt-4 grid grid-cols-[32px_minmax(0,1fr)] gap-x-2"
            >
              <div className="flex h-36 flex-col justify-between text-[11px] leading-none text-muted tabular-nums">
                {rateMarks.map((mark) => (
                  <span key={mark}>{mark}</span>
                ))}
              </div>
              <div className="relative h-36 border-b border-line bg-linear-to-b from-line from-[1px] to-transparent to-[1px] bg-size-[100%_50%]">
                <svg
                  className="absolute inset-0 size-full overflow-visible"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon points={chart.area} className="fill-primary/10" />
                  <polyline
                    points={chart.line}
                    fill="none"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    className="stroke-primary"
                  />
                </svg>
              </div>
              <span className="pt-2 text-[11px] leading-none text-muted">
                Late
              </span>
              <div data-bars className="flex h-10 items-end pt-2">
                {chart.points.map((point) => (
                  <span
                    key={point.day}
                    className="flex h-full flex-1 items-end justify-center"
                  >
                    <span
                      className="w-2/5 max-w-4 rounded-t-sm bg-(--tpl-late)"
                      style={{ height: `${(point.late / LATE_SCALE) * 100}%` }}
                    />
                  </span>
                ))}
              </div>
              <span className="pt-1.5 text-[11px] leading-none text-muted">
                Nov
              </span>
              <div className="flex pt-1.5 text-[11px] leading-none text-muted tabular-nums">
                {chart.points.map((point) => (
                  <span key={point.day} className="flex-1 text-center">
                    {point.day}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="sigap-waiting-title" className={panel}>
          <div className={panelHead}>
            <h2 id="sigap-waiting-title" className={panelTitle}>
              Awaiting approval
            </h2>
            <Badge variant="primary" dot={false} data-waiting>
              {`${waiting.length} pending`}
            </Badge>
          </div>
          {waiting.length === 0 ? (
            <p className="p-4 text-sm text-muted">
              All caught up. No leave requests are waiting.
            </p>
          ) : (
            <ul>
              {waiting.slice(0, WAITING_PREVIEW).map((item) => (
                <li key={item.id} data-request={item.id} className={listRow}>
                  <div className="min-w-0 flex-1">
                    <Person
                      name={item.who}
                      meta={`${item.type} leave, ${leaveDates(item)}`}
                    />
                  </div>
                  <LeaveActions item={item} decide={decide} />
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-line p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => go("leave")}
            >
              Open leave
            </Button>
          </div>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section aria-labelledby="sigap-dept-title" className={panel}>
          <div className={panelHead}>
            <h2 id="sigap-dept-title" className={panelTitle}>
              On site by department
            </h2>
            <span className="text-xs text-muted tabular-nums">116 of 128</span>
          </div>
          <ul className="grid gap-3 p-4">
            {deptToday.map((item) => (
              <li
                key={item.dept}
                className="grid grid-cols-[88px_minmax(0,1fr)_56px] items-center gap-3 text-sm"
              >
                <span className="truncate">{item.dept}</span>
                <span
                  aria-hidden="true"
                  className="h-2 overflow-hidden rounded-full bg-subtle"
                >
                  <span
                    className="block h-full rounded-full bg-(--tpl-on)"
                    style={{ width: `${(item.present / item.total) * 100}%` }}
                  />
                </span>
                <span className="text-right text-xs text-muted tabular-nums">
                  {`${item.present} / ${item.total}`}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sigap-upcoming-title" className={panel}>
          <div className={panelHead}>
            <h2 id="sigap-upcoming-title" className={panelTitle}>
              Birthdays and contract dates
            </h2>
            <span className="text-xs text-muted">Next 30 days</span>
          </div>
          <ul>
            {upcoming.map((item) => (
              <li
                key={`${item.who}${item.kind}`}
                className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-3 border-b border-line px-4 py-2.5 text-sm last:border-b-0 sm:grid-cols-[52px_minmax(0,1fr)_auto]"
              >
                <span className="text-xs font-medium tabular-nums">
                  {item.date}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium">{item.who}</p>
                  <p className={personMeta}>{item.note}</p>
                </div>
                <span className="hidden items-center gap-1.5 text-xs text-muted sm:inline-flex">
                  <Icon name={item.icon} />
                  {item.kind}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function EmployeesPage({ query, setQuery, go }: Shared) {
  const [list, setList] = useState(employeeList);
  const [dept, setDept] = useState("all");
  const [type, setType] = useState("all");
  const [openId, setOpenId] = useState(employeeList[0]!.id);
  const [draft, setDraft] = useState(emptyDraft);
  const [errors, setErrors] = useState({ name: "", email: "" });
  const shown = list.filter((item) => matchesEmployee(item, query, dept, type));
  const current = list.find((item) => item.id === openId)!;
  const view = (id: string) => {
    setOpenId(id);
    openDialog(EMPLOYEE_DRAWER);
  };
  const resetDraft = () => {
    setDraft(emptyDraft);
    setErrors({ name: "", email: "" });
  };
  const add = () => {
    const name = draft.name.trim();
    const next = {
      name: name ? "" : "Enter the employee's full name",
      email: EMAIL.test(draft.email) ? "" : "Enter a valid work email",
    };
    setErrors(next);
    if (next.name || next.email) return;
    const id = `SG-${NEW_ID_START + list.length - employeeList.length}`;
    setList([
      { ...NEW_HIRE, id, name, dept: draft.dept, type: draft.type },
      ...list,
    ]);
    closeDialog(ADD_MODAL);
    toast({
      title: "Employee added",
      description: `${name}, ${draft.dept}`,
      variant: "success",
    });
  };
  return (
    <section aria-label="Employee directory" className={panel}>
      <div className="grid items-end gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
        <Input
          label="Search by name or ID"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Select
          label="Department"
          value={dept}
          onChange={(event) => setDept(event.target.value)}
        >
          <option value="all">All departments</option>
          {departments.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Select>
        <Select
          label="Status"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="all">All statuses</option>
          {employmentTypes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Select>
        <Button onClick={() => openDialog(ADD_MODAL)}>
          <Icon name="plus" />
          Add employee
        </Button>
      </div>
      <div
        tabIndex={0}
        role="region"
        aria-label="Employees table"
        className={scroller}
      >
        <table className={table}>
          <thead>
            <tr>
              <th scope="col" className={th}>
                Employee
              </th>
              <th scope="col" className={cx(th, "max-md:hidden")}>
                Department
              </th>
              <th scope="col" className={cx(th, "max-xl:hidden")}>
                Role
              </th>
              <th scope="col" className={th}>
                Status
              </th>
              <th scope="col" className={cx(th, "max-lg:hidden")}>
                Shift
              </th>
              <th scope="col" className={cx(th, "max-xl:hidden")}>
                Joined
              </th>
              <th scope="col" className={th}>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {shown.map((item) => (
              <tr key={item.id} data-employee={item.id}>
                <td className={td}>
                  <Person name={item.name} meta={item.id} />
                </td>
                <td className={cx(td, "max-md:hidden")}>{item.dept}</td>
                <td className={cx(td, "max-xl:hidden")}>{item.role}</td>
                <td className={td}>
                  <Pill tone={typeTones[item.type]!}>{item.type}</Pill>
                </td>
                <td className={cx(td, "max-lg:hidden")}>{item.shift}</td>
                <td className={cx(td, "text-muted max-xl:hidden")}>
                  {item.joined}
                </td>
                <td className={cx(td, "text-right")}>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={`View ${item.name}`}
                    onClick={() => view(item.id)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p
        data-count
        className="border-t border-line px-4 py-3 text-xs text-muted"
      >
        {shown.length === 0
          ? "No employees match these filters."
          : `Showing ${shown.length} of ${list.length} sample records, ${HEADCOUNT} employees in total`}
      </p>

      <Drawer
        id={EMPLOYEE_DRAWER}
        title="Employee details"
        footer={
          <>
            <Button variant="secondary" type="submit">
              Close
            </Button>
            <Button type="submit" onClick={() => go("payroll")}>
              Open payroll
            </Button>
          </>
        }
      >
        <div className="grid gap-5 text-ink">
          <div className={person}>
            <Face name={current.name} className="size-12 text-sm" />
            <div className="min-w-0">
              <p className="text-base font-semibold">{current.name}</p>
              <p className="text-sm text-muted">{`${current.role}, ${current.dept}`}</p>
            </div>
          </div>
          <dl className="grid grid-cols-[112px_minmax(0,1fr)] gap-y-2.5 text-sm">
            {[
              ["Employee ID", current.id],
              ["Status", current.type],
              [
                "Shift",
                `${current.shift}, starts ${shiftStart[current.shift]}`,
              ],
              ["Joined", current.joined],
              ["Base salary", rupiah(current.salary)],
              ["Email", emailOf(current.name)],
            ].map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-muted">{label}</dt>
                <dd data-field={label} className="truncate font-medium">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Drawer>

      <Modal
        id={ADD_MODAL}
        title="Add employee"
        onClose={resetDraft}
        footer={
          <>
            <Button variant="secondary" type="submit">
              Cancel
            </Button>
            <Button onClick={add}>Save employee</Button>
          </>
        }
      >
        <div className="grid gap-4 text-ink">
          <Input
            label="Full name"
            value={draft.name}
            error={errors.name}
            onChange={(event) =>
              setDraft({ ...draft, name: event.target.value })
            }
          />
          <Input
            label="Work email"
            type="email"
            value={draft.email}
            error={errors.email}
            onChange={(event) =>
              setDraft({ ...draft, email: event.target.value })
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Assign to department"
              value={draft.dept}
              onChange={(event) =>
                setDraft({ ...draft, dept: event.target.value })
              }
            >
              {departments.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>
            <Select
              label="Employment status"
              value={draft.type}
              onChange={(event) =>
                setDraft({ ...draft, type: event.target.value })
              }
            >
              {employmentTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
    </section>
  );
}

function AttendancePage() {
  const [dateIndex, setDateIndex] = useState(dates.length - 1);
  const [shift, setShift] = useState("all");
  const [records, setRecords] = useState(attendance);
  const [fix, setFix] = useState(emptyFix);
  const [errors, setErrors] = useState({ in: "", reason: "" });
  const date = dates[dateIndex]!;
  const rows = employeeList
    .map((item, index) => ({
      item,
      index,
      ...dayRow(records[date.id]![index]!, item.shift),
    }))
    .filter((row) => shift === "all" || row.item.shift === shift);
  const tally = (status: string) =>
    rows.filter((row) => row.status === status).length;
  const correct = (index: number) => {
    const row = dayRow(records[date.id]![index]!, employeeList[index]!.shift);
    setFix({ index, in: row.in, out: row.out, reason: "" });
    setErrors({ in: "", reason: "" });
    openDialog(CORRECT_MODAL);
  };
  const save = () => {
    const next = {
      in: fix.in ? "" : "Enter a clock-in time",
      reason: fix.reason.trim() ? "" : "Add a reason for the audit log",
    };
    setErrors(next);
    if (next.in || next.reason) return;
    setRecords({
      ...records,
      [date.id]: records[date.id]!.map((record, index) =>
        index === fix.index ? `${fix.in}-${fix.out}` : record,
      ),
    });
    closeDialog(CORRECT_MODAL);
    toast({
      title: "Attendance corrected",
      description: `${employeeList[fix.index]!.name}, ${date.label}`,
      variant: "success",
    });
  };
  return (
    <section aria-label="Daily attendance" className={panel}>
      <div className={cx(panelHead, "py-3")}>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous day"
            disabled={dateIndex === 0}
            className={cx(iconButton, "disabled:opacity-40")}
            onClick={() => setDateIndex(dateIndex - 1)}
          >
            <Icon name="prev" />
          </button>
          <h2
            data-date
            className="min-w-36 text-center text-sm font-semibold tabular-nums"
          >
            {date.label}
          </h2>
          <button
            type="button"
            aria-label="Next day"
            disabled={dateIndex === dates.length - 1}
            className={cx(iconButton, "disabled:opacity-40")}
            onClick={() => setDateIndex(dateIndex + 1)}
          >
            <Icon name="next" />
          </button>
        </div>
        <ToggleGroup
          label="Filter by shift"
          items={shiftOptions}
          value={shift}
          onValueChange={(value: string) => setShift(value || shift)}
        />
      </div>
      <dl className="flex flex-wrap gap-x-5 gap-y-1 border-b border-line px-4 py-2.5 text-xs text-muted">
        {["ontime", "late", "absent", "leave"].map((status) => (
          <div key={status} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className={cx(dotBase, dots[dayStatus[status]!.tone])}
            />
            <dt>{dayStatus[status]!.label}</dt>
            <dd
              data-tally={status}
              className="font-semibold text-ink tabular-nums"
            >
              {tally(status)}
            </dd>
          </div>
        ))}
      </dl>
      <div
        tabIndex={0}
        role="region"
        aria-label="Attendance table"
        className={scroller}
      >
        <table className={table}>
          <thead>
            <tr>
              <th scope="col" className={th}>
                Employee
              </th>
              <th scope="col" className={cx(th, "max-lg:hidden")}>
                Shift
              </th>
              <th scope="col" className={th}>
                Clock in
              </th>
              <th scope="col" className={cx(th, "max-sm:hidden")}>
                Clock out
              </th>
              <th scope="col" className={cx(th, "max-md:hidden")}>
                Hours
              </th>
              <th scope="col" className={th}>
                Status
              </th>
              <th scope="col" className={cx(th, "max-sm:hidden")}>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.item.id} data-row={row.item.id}>
                <td className={td}>
                  <Person name={row.item.name} meta={row.item.dept} />
                </td>
                <td className={cx(td, "max-lg:hidden")}>{row.item.shift}</td>
                <td data-in className={cx(td, "tabular-nums")}>
                  {row.in}
                </td>
                <td className={cx(td, "tabular-nums max-sm:hidden")}>
                  {row.out}
                </td>
                <td className={cx(td, "text-muted tabular-nums max-md:hidden")}>
                  {row.hours}
                </td>
                <td data-status className={td}>
                  <Pill tone={dayStatus[row.status]!.tone}>
                    {dayStatus[row.status]!.label}
                  </Pill>
                </td>
                <td className={cx(td, "text-right max-sm:hidden")}>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={`Correct ${row.item.name}`}
                    onClick={() => correct(row.index)}
                  >
                    Correct
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        id={CORRECT_MODAL}
        title="Correct attendance"
        footer={
          <>
            <Button variant="secondary" type="submit">
              Cancel
            </Button>
            <Button onClick={save}>Save correction</Button>
          </>
        }
      >
        <div className="grid gap-4 text-ink">
          <p data-fix-who className="text-sm text-muted">
            {fix.index < 0
              ? ""
              : `${employeeList[fix.index]!.name}, ${date.label}`}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Clock in"
              type="time"
              value={fix.in}
              error={errors.in}
              onChange={(event) => setFix({ ...fix, in: event.target.value })}
            />
            <Input
              label="Clock out"
              type="time"
              value={fix.out}
              onChange={(event) => setFix({ ...fix, out: event.target.value })}
            />
          </div>
          <Input
            label="Reason"
            value={fix.reason}
            error={errors.reason}
            onChange={(event) => setFix({ ...fix, reason: event.target.value })}
          />
        </div>
      </Modal>
    </section>
  );
}

function LeavePage({ leave, decide }: Shared) {
  const [filter, setFilter] = useState("pending");
  const shown = leaveRequests.filter((item) => leave[item.id] === filter);
  return (
    <div className="grid gap-4">
      <ul className={cx(strip, "sm:grid-cols-3")}>
        {balances.map((item) => {
          const used = usedDays(leave, item.type, item.used);
          return (
            <li key={item.type} data-balance={item.type} className={cell}>
              <p className={statLabel}>{item.label}</p>
              <p className={statValue}>
                {used}
                <span className="ml-1.5 text-sm font-normal text-muted">
                  {`of ${item.total.toLocaleString("id-ID")} days used`}
                </span>
              </p>
              <Progress
                value={used}
                max={item.total}
                aria-label={`${item.label} used`}
                className="mt-3 h-1.5"
              />
              <p className={statNote}>{item.note}</p>
            </li>
          );
        })}
      </ul>

      <section aria-labelledby="sigap-out-title" className={panel}>
        <div className={panelHead}>
          <h2 id="sigap-out-title" className={panelTitle}>
            Who is out
          </h2>
          <span className="text-xs text-muted">16 to 29 November</span>
        </div>
        <ol className="grid grid-cols-7 gap-px bg-line md:grid-cols-14">
          {stripDays.map((item) => {
            const out = outOn(leave, item.day);
            return (
              <li
                key={item.day}
                data-day={item.day}
                className={cx(
                  "grid h-20 content-start justify-items-center gap-1 pt-2 text-xs",
                  item.weekend ? "bg-subtle text-muted" : "bg-surface",
                )}
              >
                <span className="text-muted">{item.weekday}</span>
                <span
                  className={cx(
                    "inline-flex size-6 items-center justify-center rounded-full text-sm font-semibold tabular-nums",
                    item.day === TODAY && "bg-primary text-on-primary",
                  )}
                >
                  {item.day}
                </span>
                {out > 0 && (
                  <span className="rounded-sm bg-primary-soft px-1.5 font-medium text-primary tabular-nums">
                    {`${out} out`}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="sigap-requests-title" className={panel}>
        <div className={panelHead}>
          <h2 id="sigap-requests-title" className={panelTitle}>
            Requests
          </h2>
          <ToggleGroup
            label="Filter requests"
            items={leaveFilters}
            value={filter}
            onValueChange={(value: string) => setFilter(value || filter)}
          />
        </div>
        <dl
          data-counts
          className="flex flex-wrap gap-x-5 gap-y-1 border-b border-line px-4 py-2.5 text-xs text-muted"
        >
          {leaveFilters.map((item) => (
            <div key={item.value} className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={cx(dotBase, dots[leaveTones[item.value]!])}
              />
              <dt>{item.label}</dt>
              <dd
                data-count={item.value}
                className="font-semibold text-ink tabular-nums"
              >
                {leaveCount(leave, item.value as LeaveStatus)}
              </dd>
            </div>
          ))}
        </dl>
        {shown.length === 0 ? (
          <p className="p-4 text-sm text-muted">No requests in this view.</p>
        ) : (
          <ul>
            {shown.map((item) => (
              <li key={item.id} data-request={item.id} className={listRow}>
                <div className="w-full min-w-0 sm:w-56">
                  <Person name={item.who} meta={item.id} />
                </div>
                <div className="min-w-0 flex-1 basis-48 text-sm">
                  <p className="font-medium">
                    {`${item.type} leave, ${leaveDates(item)} (${dayWord(item.days)})`}
                  </p>
                  <p className={personMeta}>{item.reason}</p>
                </div>
                {filter === "pending" ? (
                  <LeaveActions item={item} decide={decide} />
                ) : (
                  <Pill tone={leaveTones[filter]!}>
                    {filter === "approved" ? "Approved" : "Rejected"}
                  </Pill>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function PayrollPage() {
  const [run, setRun] = useState("draft");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState("");
  const timer = useRef(0);
  useEffect(() => () => window.clearInterval(timer.current), []);
  const start = () => {
    let value = 0;
    setRun("running");
    timer.current = window.setInterval(() => {
      value += RUN_STEP;
      setProgress(value);
      if (value < 100) return;
      window.clearInterval(timer.current);
      closeDialog(RUN_MODAL);
      setRun("paid");
      toast({
        title: "Payroll completed",
        description: `${HEADCOUNT} payslips sent, ${rupiah(PAYROLL_NET)} queued for transfer`,
        variant: "success",
      });
    }, RUN_TICK);
  };
  return (
    <div className="grid gap-4">
      <dl className={cx(strip, "grid-cols-2 xl:grid-cols-4")}>
        {payrollTotals.map((item) => (
          <div key={item.label} className={cell}>
            <dt className={statLabel}>{item.label}</dt>
            <dd className={cx(statValue, "text-xl")}>{rupiah(item.value)}</dd>
            <dd className={statNote}>{item.note}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="sigap-run-title" className={panel}>
        <div className={cx(panelHead, "py-3")}>
          <div className="flex items-center gap-3">
            <h2 id="sigap-run-title" className={panelTitle}>
              November 2026 run
            </h2>
            <span data-run-status className="inline-flex">
              <Pill tone={runStatus[run]!.tone}>{runStatus[run]!.label}</Pill>
            </span>
          </div>
          <Button
            size="sm"
            disabled={run !== "draft"}
            onClick={() => openDialog(RUN_MODAL)}
          >
            Run payroll
          </Button>
        </div>
        <div
          tabIndex={0}
          role="region"
          aria-label="Payroll table"
          className={scroller}
        >
          <table className={table}>
            <thead>
              <tr>
                <th scope="col" className={cx(th, "w-10 pr-0")}>
                  <span className="sr-only">Payslip</span>
                </th>
                <th scope="col" className={th}>
                  Employee
                </th>
                <th scope="col" className={cx(th, num, "max-lg:hidden")}>
                  Basic salary
                </th>
                <th scope="col" className={cx(th, num, "max-xl:hidden")}>
                  Allowances
                </th>
                <th scope="col" className={cx(th, num, "max-md:hidden")}>
                  Deductions
                </th>
                <th scope="col" className={cx(th, num)}>
                  Net pay
                </th>
                <th scope="col" className={cx(th, "max-sm:hidden")}>
                  Status
                </th>
              </tr>
            </thead>
            {employeeList.map((item) => {
              const slip = payslip(item);
              const expanded = open === item.id;
              return (
                <tbody key={item.id} data-slip={item.id}>
                  <tr>
                    <td className={cx(td, "pr-0")}>
                      <button
                        type="button"
                        aria-label={`Payslip for ${item.name}`}
                        aria-expanded={expanded}
                        className={cx(iconButton, "size-8")}
                        onClick={() => setOpen(expanded ? "" : item.id)}
                      >
                        <Icon
                          name="next"
                          className={cx(
                            "size-4 transition-transform duration-150",
                            expanded && "rotate-90",
                          )}
                        />
                      </button>
                    </td>
                    <td className={td}>
                      <Person name={item.name} meta={item.role} />
                    </td>
                    <td className={cx(td, num, "max-lg:hidden")}>
                      {rupiah(item.salary)}
                    </td>
                    <td className={cx(td, num, "max-xl:hidden")}>
                      {rupiah(slip.allowance)}
                    </td>
                    <td className={cx(td, num, "text-muted max-md:hidden")}>
                      {rupiah(slip.deduction)}
                    </td>
                    <td data-net className={cx(td, num, "font-semibold")}>
                      {rupiah(slip.net)}
                    </td>
                    <td className={cx(td, "max-sm:hidden")}>
                      <Pill tone={runStatus[run]!.tone}>
                        {runStatus[run]!.label}
                      </Pill>
                    </td>
                  </tr>
                  {expanded && (
                    <tr>
                      <td
                        colSpan={7}
                        className="border-t border-line bg-subtle px-4 py-3"
                      >
                        <dl
                          data-lines
                          className="grid max-w-md grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1.5 text-sm sm:ml-10"
                        >
                          {slip.lines.map(([label, amount]) => (
                            <div key={label} className="contents">
                              <dt className="text-muted">{label}</dt>
                              <dd className={num}>
                                {amount < 0
                                  ? `- ${rupiah(-amount)}`
                                  : rupiah(amount)}
                              </dd>
                            </div>
                          ))}
                          <dt className="border-t border-line pt-1.5 font-semibold">
                            Net pay
                          </dt>
                          <dd
                            className={cx(
                              num,
                              "border-t border-line pt-1.5 font-semibold",
                            )}
                          >
                            {rupiah(slip.net)}
                          </dd>
                        </dl>
                      </td>
                    </tr>
                  )}
                </tbody>
              );
            })}
          </table>
        </div>
        <p className="border-t border-line px-4 py-3 text-xs text-muted">
          {`Showing ${employeeList.length} of ${HEADCOUNT} payslips`}
        </p>
      </section>

      <section aria-labelledby="sigap-rates-title" className={panel}>
        <div className={panelHead}>
          <h2 id="sigap-rates-title" className={panelTitle}>
            Statutory contribution rates
          </h2>
          <span className="text-xs text-muted">Share of basic salary</span>
        </div>
        <Table
          caption="Statutory contribution rates"
          label="Contribution rates table"
          columns={rateColumns}
          rows={rateRows}
          rowKey="name"
          size="sm"
          square
          className="border-0"
        />
      </section>

      <Modal
        id={RUN_MODAL}
        title="Run November payroll"
        footer={
          <>
            <Button
              variant="secondary"
              type="submit"
              disabled={run === "running"}
            >
              Cancel
            </Button>
            <Button disabled={run === "running"} onClick={start}>
              Confirm and run
            </Button>
          </>
        }
      >
        <div className="grid gap-4">
          <p>
            {`${HEADCOUNT} payslips will be locked and ${rupiah(PAYROLL_NET)} queued for transfer from Bank Mandiri on 25 Nov.`}
          </p>
          {run !== "draft" && (
            <Progress label="Processing payslips" value={progress} />
          )}
        </div>
      </Modal>
    </div>
  );
}

function RecruitmentPage() {
  const [candidates, setCandidates] = useState(candidateList);
  const move = (item: Candidate, step: number) => {
    const stage = stages[stages.indexOf(item.stage) + step]!;
    setCandidates(
      candidates.map((entry) =>
        entry.id === item.id ? { ...entry, stage, days: 0 } : entry,
      ),
    );
    toast({
      title: `Moved to ${stage}`,
      description: `${item.name}, ${item.role}`,
      variant: "success",
    });
    focusLater(`[data-candidate=${item.id}] button`);
  };
  return (
    <div className="grid gap-x-4 gap-y-6 md:grid-cols-2 xl:grid-cols-4">
      {stages.map((stage, index) => {
        const items = candidates.filter((item) => item.stage === stage);
        return (
          <section
            key={stage}
            aria-label={stage}
            data-stage={stage}
            className={column}
          >
            <div className={columnHead}>
              <h2>{stage}</h2>
              <span className="text-xs font-medium text-muted tabular-nums">
                {items.length}
              </span>
            </div>
            {items.length === 0 && (
              <p className="py-3 text-xs text-muted">No candidates here.</p>
            )}
            {items.map((item) => (
              <article
                key={item.id}
                data-candidate={item.id}
                className={candidateCard}
              >
                <Person name={item.name} meta={item.role} />
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted">
                    {`${item.source}, ${item.days === 0 ? "moved today" : `${dayWord(item.days)} in stage`}`}
                  </p>
                  <div className="flex gap-1.5">
                    {index > 0 && (
                      <button
                        type="button"
                        aria-label={`Move ${item.name} back to ${stages[index - 1]}`}
                        className={moveButton}
                        onClick={() => move(item, -1)}
                      >
                        <Icon name="prev" />
                      </button>
                    )}
                    {index < stages.length - 1 && (
                      <button
                        type="button"
                        aria-label={`Move ${item.name} to ${stages[index + 1]}`}
                        className={moveButton}
                        onClick={() => move(item, 1)}
                      >
                        <Icon name="next" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </section>
        );
      })}
    </div>
  );
}

function SettingsPage() {
  const [profile, setProfile] = useState(profileDefaults);
  const [errors, setErrors] = useState<Partial<Record<ProfileKey, string>>>({});
  const [workDays, setWorkDays] = useState(defaultWorkDays);
  const [tolerance, setTolerance] = useState(tolerances[1]!);
  const [cutoff, setCutoff] = useState(cutoffs[1]!);
  const [enabled, setEnabled] = useState(() =>
    policies.filter((item) => item.on).map((item) => item.id),
  );
  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = {
      company: profile.company.trim() ? "" : "Enter the company name",
      npwp:
        profile.npwp.replace(/\D/g, "").length === NPWP_DIGITS
          ? ""
          : "NPWP must have 15 digits",
      email: EMAIL.test(profile.email) ? "" : "Enter a valid email address",
    };
    setErrors(next);
    if (next.company || next.npwp || next.email) return;
    toast({
      title: "Company profile saved",
      description: profile.company,
      variant: "success",
    });
  };
  const toggleDay = (day: string) =>
    setWorkDays(
      weekdays.filter((item) => (item === day) !== workDays.includes(item)),
    );
  const togglePolicy = (id: string, label: string, on: boolean) => {
    setEnabled(on ? [...enabled, id] : enabled.filter((item) => item !== id));
    toast({ title: `${label} ${on ? "enabled" : "disabled"}` });
  };
  return (
    <div className="grid items-start gap-4 xl:grid-cols-2">
      <section aria-labelledby="sigap-profile-title" className={panel}>
        <div className={panelHead}>
          <h2 id="sigap-profile-title" className={panelTitle}>
            Company profile
          </h2>
        </div>
        <form
          noValidate
          className="grid gap-4 p-4 sm:grid-cols-2"
          onSubmit={saveProfile}
        >
          {profileFields.map((field) => (
            <Input
              key={field.key}
              label={field.label}
              type={field.type}
              value={profile[field.key]}
              error={errors[field.key]}
              onChange={(event) =>
                setProfile({ ...profile, [field.key]: event.target.value })
              }
            />
          ))}
          <div className="sm:col-span-2">
            <Button type="submit">Save profile</Button>
          </div>
        </form>
      </section>

      <div className="grid gap-4">
        <section aria-labelledby="sigap-schedule-title" className={panel}>
          <div className={panelHead}>
            <h2 id="sigap-schedule-title" className={panelTitle}>
              Work schedule
            </h2>
            <span data-workdays className="text-xs text-muted">
              {`${workDays.length} work days a week`}
            </span>
          </div>
          <div className="grid gap-4 p-4">
            <div
              role="group"
              aria-label="Work days"
              className="flex flex-wrap gap-1.5"
            >
              {weekdays.map((day) => (
                <button
                  key={day}
                  type="button"
                  aria-pressed={workDays.includes(day)}
                  className={cx(
                    dayButton,
                    workDays.includes(day) ? dayOn : dayOff,
                  )}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Late tolerance"
                value={tolerance}
                onChange={(event) => setTolerance(event.target.value)}
              >
                {tolerances.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
              <Select
                label="Payroll cutoff"
                value={cutoff}
                onChange={(event) => setCutoff(event.target.value)}
              >
                {cutoffs.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </div>
            <div>
              <Button
                variant="secondary"
                onClick={() =>
                  toast({
                    title: "Work schedule saved",
                    description: `${workDays.join(", ")}. Late after ${tolerance}, cutoff on the ${cutoff.toLowerCase()}.`,
                    variant: "success",
                  })
                }
              >
                Save schedule
              </Button>
            </div>
          </div>
        </section>

        <section aria-labelledby="sigap-policy-title" className={panel}>
          <div className={panelHead}>
            <h2 id="sigap-policy-title" className={panelTitle}>
              Attendance policies
            </h2>
            <span data-enabled className="text-xs text-muted">
              {`${enabled.length} of ${policies.length} on`}
            </span>
          </div>
          <ul>
            {policies.map((item) => (
              <li key={item.id} className={cx(listRow, "flex-nowrap")}>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-xs text-muted">{item.note}</p>
                </div>
                <Switch
                  aria-label={item.label}
                  checked={enabled.includes(item.id)}
                  onCheckedChange={(on) =>
                    togglePolicy(item.id, item.label, on)
                  }
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

const pageViews: Record<PageId, (props: Shared) => React.JSX.Element> = {
  overview: OverviewPage,
  employees: EmployeesPage,
  attendance: AttendancePage,
  leave: LeavePage,
  payroll: PayrollPage,
  recruitment: RecruitmentPage,
  settings: SettingsPage,
};

function Sidebar({
  page,
  pending,
  go,
  sheet = false,
}: {
  page: PageId;
  pending: number;
  go: (id: PageId) => void;
  sheet?: boolean;
}) {
  return (
    <>
      <div className="flex items-center gap-2.5 px-3">
        <span
          aria-hidden="true"
          className="flex size-8 items-center justify-center rounded-md bg-primary text-on-primary"
        >
          <Icon name="check" className="size-4.5" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold">Sigap</p>
          <p className="text-xs text-(--tpl-side-muted)">
            Sigap Karya Nusantara
          </p>
        </div>
      </div>
      <nav aria-label={sheet ? "Mobile" : "Main"} className="grid gap-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className={navLabel}>{group.label}</p>
            <div className="grid gap-0.5">
              {group.ids.map((id) => (
                <button
                  key={id}
                  type={sheet ? "submit" : "button"}
                  aria-current={page === id ? "page" : undefined}
                  className={cx(navItem, page === id ? navOn : navOff)}
                  onClick={() => go(id)}
                >
                  <Icon name={pages[id].icon} />
                  {pages[id].label}
                  {id === "leave" && pending > 0 && (
                    <span className={navCount}>
                      {pending}
                      <span className="sr-only"> pending</span>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="mt-auto rounded-md border border-(--tpl-side-line) p-3">
        <p className="text-xs text-(--tpl-side-muted)">Payroll cutoff</p>
        <p className="mt-1 text-sm font-semibold">5 days left</p>
        <span
          aria-hidden="true"
          className="mt-2.5 block h-1 overflow-hidden rounded-full bg-(--tpl-side-line)"
        >
          <span className="block h-full w-4/5 rounded-full bg-primary" />
        </span>
        <p className="mt-2 text-xs text-(--tpl-side-muted)">
          Attendance for 1 to 25 Nov locks on Wednesday.
        </p>
      </div>
    </>
  );
}

export default function Sigap() {
  const page = useSyncExternalStore(
    subscribeHash,
    readHash,
    () => DEFAULT_PAGE,
  );
  const [query, setQuery] = useState("");
  const [leave, setLeave] = useState(initialLeave);
  const [unread, setUnread] = useState(notifications.length);
  const PageView = pageViews[page];
  const pending = leaveCount(leave, "pending");
  const go = (id: PageId) => window.location.assign(`#${id}`);
  const decide = (item: LeaveRequest, status: LeaveStatus) => {
    setLeave({ ...leave, [item.id]: status });
    toast({
      title: status === "approved" ? "Leave approved" : "Leave rejected",
      description: `${item.who}, ${leaveDates(item)}`,
      variant: status === "approved" ? "success" : "default",
    });
  };
  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    go("employees");
  };
  const pickMenu = (value: string) => {
    if (value === "settings") return go("settings");
    toast(
      value === "signout"
        ? { title: "Signed out", description: "See you tomorrow, Dewi." }
        : { title: "Profile", description: `${ME}, HR Manager` },
    );
  };

  return (
    <div className={shell}>
      <aside className={side}>
        <Sidebar page={page} pending={pending} go={go} />
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-line bg-surface px-4 lg:px-8">
          <Drawer
            title="Menu"
            side="left"
            className="max-w-64 bg-(--tpl-side) lg:hidden [&_h2]:sr-only [&>div]:gap-0 [&>div>div:first-child]:absolute [&>div>div:first-child]:top-3 [&>div>div:first-child]:right-3 [&>div>div:first-child]:z-10 [&>div>div:first-child_button]:text-(--tpl-side-ink) [&>div>div:first-child_button]:hover:bg-(--tpl-side-hover)"
            trigger={
              <button
                type="button"
                aria-label="Open menu"
                className={cx(iconButton, "lg:hidden")}
              >
                <Icon name="menu" className="size-5" />
              </button>
            }
          >
            <form method="dialog" className={sideSheet}>
              <Sidebar page={page} pending={pending} go={go} sheet />
            </form>
          </Drawer>
          <form
            role="search"
            className="relative min-w-0 flex-1 sm:max-w-xs"
            onSubmit={search}
          >
            <Icon
              name="search"
              className="pointer-events-none absolute top-2.5 left-3 z-10 size-4 text-muted"
            />
            <Input
              type="search"
              aria-label="Search people"
              placeholder="Search people"
              className="h-9 pl-9"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
          <p className="ml-auto hidden text-xs text-muted md:block">
            Fri, 20 Nov 2026, 16:20 WIB
          </p>
          <Popover
            align="end"
            className={cx(bellTrigger, "max-md:ml-auto")}
            trigger={
              <>
                <Icon name="bell" className="size-5" />
                <span className="sr-only">
                  {`Notifications, ${unread} unread`}
                </span>
                {unread > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-2 right-2 size-2 rounded-full bg-primary ring-2 ring-surface"
                  />
                )}
              </>
            }
          >
            <div className="grid gap-3">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">Notifications</p>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={unread === 0}
                  onClick={() => setUnread(0)}
                >
                  Mark all read
                </Button>
              </div>
              <ul className="grid gap-3">
                {notifications.map((item) => (
                  <li key={item.id} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className={cx(
                        dotBase,
                        "mt-1.5",
                        unread > 0 ? "bg-primary" : "bg-line",
                      )}
                    />
                    <div>
                      <p>{item.title}</p>
                      <p className="text-xs text-muted">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Popover>
          <DropdownMenu
            items={userMenu}
            className={userTrigger}
            onSelect={pickMenu}
            trigger={
              <>
                <Face name={ME} className="size-7 text-[11px]" />
                <span className="sr-only sm:not-sr-only">{ME}</span>
              </>
            }
          />
        </header>

        <main className="grid content-start gap-5 px-4 py-6 lg:px-8">
          <div>
            <h1
              id={TITLE_ID}
              tabIndex={-1}
              className="text-xl font-semibold tracking-tight focus:outline-none"
            >
              {pages[page].title}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted">
              {pages[page].sub}
            </p>
          </div>
          <PageView
            key={page}
            query={query}
            setQuery={setQuery}
            leave={leave}
            decide={decide}
            go={go}
          />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
