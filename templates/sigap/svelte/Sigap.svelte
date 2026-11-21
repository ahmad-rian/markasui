<script lang="ts">
  import { onMount, tick } from "svelte";
  import Badge from "../../../components/badge/Badge.svelte";
  import Button from "../../../components/button/Button.svelte";
  import Drawer from "../../../components/drawer/Drawer.svelte";
  import DropdownMenu, {
    type DropdownMenuItem,
  } from "../../../components/dropdown-menu/DropdownMenu.svelte";
  import Input from "../../../components/input/Input.svelte";
  import Modal from "../../../components/modal/Modal.svelte";
  import Popover from "../../../components/popover/Popover.svelte";
  import Progress from "../../../components/progress/Progress.svelte";
  import Select from "../../../components/select/Select.svelte";
  import Switch from "../../../components/switch/Switch.svelte";
  import Table from "../../../components/table/Table.svelte";
  import Toaster, { toast } from "../../../components/toast/Toast.svelte";
  import ToggleGroup from "../../../components/toggle-group/ToggleGroup.svelte";

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
  const candidateCard =
    "grid gap-3 rounded-lg border border-line bg-surface p-3";
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
    item.from === item.to
      ? `${item.from} Nov`
      : `${item.from} to ${item.to} Nov`;
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

  /* Shell */
  let page = $state<PageId>(DEFAULT_PAGE);
  let query = $state("");
  let leave = $state<LeaveState>(initialLeave());
  let unread = $state(notifications.length);
  const pending = $derived(leaveCount(leave, "pending"));
  const go = (id: PageId) => window.location.assign(`#${id}`);
  function decide(item: LeaveRequest, status: LeaveStatus) {
    leave = { ...leave, [item.id]: status };
    toast({
      title: status === "approved" ? "Leave approved" : "Leave rejected",
      description: `${item.who}, ${leaveDates(item)}`,
      variant: status === "approved" ? "success" : "default",
    });
  }
  function search(event: SubmitEvent) {
    event.preventDefault();
    go("employees");
  }
  function pickMenu(value: string) {
    if (value === "settings") return go("settings");
    toast(
      value === "signout"
        ? { title: "Signed out", description: "See you tomorrow, Dewi." }
        : { title: "Profile", description: `${ME}, HR Manager` },
    );
  }

  /* Overview */
  let range = $state("14");
  const chart = $derived(trendOf(range));
  const waiting = $derived(
    leaveRequests.filter((item) => leave[item.id] === "pending"),
  );

  /* Employees */
  let list = $state(employeeList);
  let dept = $state("all");
  let type = $state("all");
  let openId = $state(employeeList[0]!.id);
  let draft = $state({ ...emptyDraft });
  let draftErrors = $state({ name: "", email: "" });
  const shown = $derived(
    list.filter((item) => matchesEmployee(item, query, dept, type)),
  );
  const current = $derived(list.find((item) => item.id === openId)!);
  const currentFields = $derived([
    ["Employee ID", current.id],
    ["Status", current.type],
    ["Shift", `${current.shift}, starts ${shiftStart[current.shift]}`],
    ["Joined", current.joined],
    ["Base salary", rupiah(current.salary)],
    ["Email", emailOf(current.name)],
  ] as [string, string][]);
  function view(id: string) {
    openId = id;
    openDialog(EMPLOYEE_DRAWER);
  }
  function resetDraft() {
    draft = { ...emptyDraft };
    draftErrors = { name: "", email: "" };
  }
  function add() {
    const name = draft.name.trim();
    const next = {
      name: name ? "" : "Enter the employee's full name",
      email: EMAIL.test(draft.email) ? "" : "Enter a valid work email",
    };
    draftErrors = next;
    if (next.name || next.email) return;
    const id = `SG-${NEW_ID_START + list.length - employeeList.length}`;
    const { dept: newDept, type: newType } = draft;
    list = [{ ...NEW_HIRE, id, name, dept: newDept, type: newType }, ...list];
    closeDialog(ADD_MODAL);
    toast({
      title: "Employee added",
      description: `${name}, ${newDept}`,
      variant: "success",
    });
  }

  /* Attendance */
  let dateIndex = $state(dates.length - 1);
  let shift = $state("all");
  let records = $state(attendance);
  let fix = $state({ ...emptyFix });
  let fixErrors = $state({ in: "", reason: "" });
  const date = $derived(dates[dateIndex]!);
  const rows = $derived(
    employeeList
      .map((item, index) => ({
        item,
        index,
        ...dayRow(records[date.id]![index]!, item.shift),
      }))
      .filter((row) => shift === "all" || row.item.shift === shift),
  );
  const tally = (status: string) =>
    rows.filter((row) => row.status === status).length;
  function correct(index: number) {
    const row = dayRow(records[date.id]![index]!, employeeList[index]!.shift);
    fix = { index, in: row.in, out: row.out, reason: "" };
    fixErrors = { in: "", reason: "" };
    openDialog(CORRECT_MODAL);
  }
  function saveFix() {
    const next = {
      in: fix.in ? "" : "Enter a clock-in time",
      reason: fix.reason.trim() ? "" : "Add a reason for the audit log",
    };
    fixErrors = next;
    if (next.in || next.reason) return;
    const { index: fixed, in: start, out: end } = fix;
    records = {
      ...records,
      [date.id]: records[date.id]!.map((record, index) =>
        index === fixed ? `${start}-${end}` : record,
      ),
    };
    closeDialog(CORRECT_MODAL);
    toast({
      title: "Attendance corrected",
      description: `${employeeList[fixed]!.name}, ${date.label}`,
      variant: "success",
    });
  }

  /* Leave */
  let filter = $state("pending");
  const requests = $derived(
    leaveRequests.filter((item) => leave[item.id] === filter),
  );

  /* Payroll */
  let run = $state("draft");
  let progress = $state(0);
  let openSlip = $state("");
  let timer = 0;
  function startRun() {
    let value = 0;
    run = "running";
    timer = window.setInterval(() => {
      value += RUN_STEP;
      progress = value;
      if (value < 100) return;
      window.clearInterval(timer);
      closeDialog(RUN_MODAL);
      run = "paid";
      toast({
        title: "Payroll completed",
        description: `${HEADCOUNT} payslips sent, ${rupiah(PAYROLL_NET)} queued for transfer`,
        variant: "success",
      });
    }, RUN_TICK);
  }

  /* Recruitment */
  let candidates = $state(candidateList);
  function move(item: Candidate, step: number) {
    const stage = stages[stages.indexOf(item.stage) + step]!;
    candidates = candidates.map((entry) =>
      entry.id === item.id ? { ...entry, stage, days: 0 } : entry,
    );
    toast({
      title: `Moved to ${stage}`,
      description: `${item.name}, ${item.role}`,
      variant: "success",
    });
    focusLater(`[data-candidate=${item.id}] button`);
  }

  /* Settings */
  const defaultEnabled = () =>
    policies.filter((item) => item.on).map((item) => item.id);
  let profile = $state({ ...profileDefaults });
  let profileErrors = $state<Partial<Record<ProfileKey, string>>>({});
  let workDays = $state(defaultWorkDays);
  let tolerance = $state(tolerances[1]!);
  let cutoff = $state(cutoffs[1]!);
  let enabled = $state(defaultEnabled());
  function saveProfile(event: SubmitEvent) {
    event.preventDefault();
    const next = {
      company: profile.company.trim() ? "" : "Enter the company name",
      npwp:
        profile.npwp.replace(/\D/g, "").length === NPWP_DIGITS
          ? ""
          : "NPWP must have 15 digits",
      email: EMAIL.test(profile.email) ? "" : "Enter a valid email address",
    };
    profileErrors = next;
    if (next.company || next.npwp || next.email) return;
    toast({
      title: "Company profile saved",
      description: profile.company,
      variant: "success",
    });
  }
  function toggleDay(day: string) {
    workDays = weekdays.filter(
      (item) => (item === day) !== workDays.includes(item),
    );
  }
  function togglePolicy(id: string, label: string, on: boolean) {
    enabled = on ? [...enabled, id] : enabled.filter((item) => item !== id);
    toast({ title: `${label} ${on ? "enabled" : "disabled"}` });
  }
  function saveSchedule() {
    toast({
      title: "Work schedule saved",
      description: `${workDays.join(", ")}. Late after ${tolerance}, cutoff on the ${cutoff.toLowerCase()}.`,
      variant: "success",
    });
  }

  /** State halaman kembali ke awal saat pindah halaman, sama dengan React yang me-mount ulang. */
  function resetPages() {
    window.clearInterval(timer);
    range = "14";
    list = employeeList;
    dept = "all";
    type = "all";
    resetDraft();
    dateIndex = dates.length - 1;
    shift = "all";
    records = attendance;
    filter = "pending";
    run = "draft";
    progress = 0;
    openSlip = "";
    candidates = candidateList;
    profile = { ...profileDefaults };
    profileErrors = {};
    workDays = defaultWorkDays;
    tolerance = tolerances[1]!;
    cutoff = cutoffs[1]!;
    enabled = defaultEnabled();
  }

  onMount(() => {
    const onHashChange = async () => {
      const next = readHash();
      if (next !== page) resetPages();
      page = next;
      await tick();
      document.getElementById(TITLE_ID)?.focus();
    };
    page = readHash();
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("hashchange", onHashChange);
    };
  });
</script>

{#snippet icon(name: IconName, className = "size-4")}
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

{#snippet faceOf(name: string, className: string)}
  <span aria-hidden="true" class={cx(face, faceTone(name), className)}
    >{initials(name)}</span
  >
{/snippet}

{#snippet pillOf(tone: string, text: string)}
  <span class={pill}
    ><span aria-hidden="true" class={cx(dotBase, dots[tone])}
    ></span>{text}</span
  >
{/snippet}

{#snippet personOf(name: string, meta: string)}
  <div class={person}>
    {@render faceOf(name, "size-8 text-[11px]")}
    <div class="min-w-0">
      <p class={personName}>{name}</p>
      <p class={personMeta}>{meta}</p>
    </div>
  </div>
{/snippet}

{#snippet leaveActions(item: LeaveRequest)}
  <div class="flex gap-2">
    <Button
      size="sm"
      variant="secondary"
      aria-label={`Reject ${item.who}`}
      onclick={() => decide(item, "rejected")}>Reject</Button
    >
    <Button
      size="sm"
      aria-label={`Approve ${item.who}`}
      onclick={() => decide(item, "approved")}>Approve</Button
    >
  </div>
{/snippet}

{#snippet sidebar(sheet: boolean)}
  <div class="flex items-center gap-2.5 px-3">
    <span
      aria-hidden="true"
      class="flex size-8 items-center justify-center rounded-md bg-primary text-on-primary"
      >{@render icon("check", "size-4.5")}</span
    >
    <div class="leading-tight">
      <p class="text-sm font-semibold">Sigap</p>
      <p class="text-xs text-(--tpl-side-muted)">Sigap Karya Nusantara</p>
    </div>
  </div>
  <nav aria-label={sheet ? "Mobile" : "Main"} class="grid gap-5">
    {#each navGroups as group (group.label)}
      <div>
        <p class={navLabel}>{group.label}</p>
        <div class="grid gap-0.5">
          {#each group.ids as id (id)}
            <button
              type={sheet ? "submit" : "button"}
              aria-current={page === id ? "page" : undefined}
              class={cx(navItem, page === id ? navOn : navOff)}
              onclick={() => go(id)}
              >{@render icon(pages[id].icon)}{pages[id]
                .label}{#if id === "leave" && pending > 0}<span class={navCount}
                  >{pending}<span class="sr-only">{" pending"}</span></span
                >{/if}</button
            >
          {/each}
        </div>
      </div>
    {/each}
  </nav>
  <div class="mt-auto rounded-md border border-(--tpl-side-line) p-3">
    <p class="text-xs text-(--tpl-side-muted)">Payroll cutoff</p>
    <p class="mt-1 text-sm font-semibold">5 days left</p>
    <span
      aria-hidden="true"
      class="mt-2.5 block h-1 overflow-hidden rounded-full bg-(--tpl-side-line)"
      ><span class="block h-full w-4/5 rounded-full bg-primary"></span></span
    >
    <p class="mt-2 text-xs text-(--tpl-side-muted)">
      Attendance for 1 to 25 Nov locks on Wednesday.
    </p>
  </div>
{/snippet}

<div class={shell}>
  <aside class={side}>
    {@render sidebar(false)}
  </aside>

  <div class="min-w-0">
    <header
      class="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-line bg-surface px-4 lg:px-8"
    >
      <Drawer
        title="Menu"
        side="left"
        class="max-w-64 bg-(--tpl-side) lg:hidden [&_h2]:sr-only [&>div]:gap-0 [&>div>div:first-child]:absolute [&>div>div:first-child]:top-3 [&>div>div:first-child]:right-3 [&>div>div:first-child]:z-10 [&>div>div:first-child_button]:text-(--tpl-side-ink) [&>div>div:first-child_button]:hover:bg-(--tpl-side-hover)"
      >
        {#snippet trigger()}
          <button
            type="button"
            aria-label="Open menu"
            class={cx(iconButton, "lg:hidden")}
            >{@render icon("menu", "size-5")}</button
          >
        {/snippet}
        <form method="dialog" class={sideSheet}>
          {@render sidebar(true)}
        </form>
      </Drawer>
      <form
        role="search"
        class="relative min-w-0 flex-1 sm:max-w-xs"
        onsubmit={search}
      >
        {@render icon(
          "search",
          "pointer-events-none absolute top-2.5 left-3 z-10 size-4 text-muted",
        )}
        <Input
          bind:value={query}
          type="search"
          aria-label="Search people"
          placeholder="Search people"
          class="h-9 pl-9"
        />
      </form>
      <p class="ml-auto hidden text-xs text-muted md:block">
        Fri, 20 Nov 2026, 16:20 WIB
      </p>
      <Popover align="end" class={cx(bellTrigger, "max-md:ml-auto")}>
        {#snippet trigger()}
          {@render icon("bell", "size-5")}<span class="sr-only"
            >{`Notifications, ${unread} unread`}</span
          >{#if unread > 0}<span
              aria-hidden="true"
              class="absolute top-2 right-2 size-2 rounded-full bg-primary ring-2 ring-surface"
            ></span>{/if}
        {/snippet}
        <div class="grid gap-3">
          <div class="flex items-center justify-between gap-3">
            <p class="font-semibold">Notifications</p>
            <Button
              size="sm"
              variant="ghost"
              disabled={unread === 0}
              onclick={() => (unread = 0)}>Mark all read</Button
            >
          </div>
          <ul class="grid gap-3">
            {#each notifications as item (item.id)}
              <li class="flex gap-2.5">
                <span
                  aria-hidden="true"
                  class={cx(
                    dotBase,
                    "mt-1.5",
                    unread > 0 ? "bg-primary" : "bg-line",
                  )}
                ></span>
                <div>
                  <p>{item.title}</p>
                  <p class="text-xs text-muted">{item.time}</p>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      </Popover>
      <DropdownMenu items={userMenu} class={userTrigger} onselect={pickMenu}>
        {#snippet trigger()}
          {@render faceOf(ME, "size-7 text-[11px]")}<span
            class="sr-only sm:not-sr-only">{ME}</span
          >
        {/snippet}
      </DropdownMenu>
    </header>

    <main class="grid content-start gap-5 px-4 py-6 lg:px-8">
      <div>
        <h1
          id={TITLE_ID}
          tabindex="-1"
          class="text-xl font-semibold tracking-tight focus:outline-none"
        >
          {pages[page].title}
        </h1>
        <p class="mt-1 max-w-2xl text-sm text-muted">{pages[page].sub}</p>
      </div>

      {#if page === "overview"}
        <div class="grid gap-4">
          <dl class={cx(strip, "grid-cols-2 md:grid-cols-3 xl:grid-cols-6")}>
            {#each stats as stat (stat.label)}
              <div class={cell}>
                <dt class={statLabel}>
                  {#if stat.tone}<span
                      aria-hidden="true"
                      class={cx(dotBase, dots[stat.tone])}
                    ></span>{/if}{stat.label}
                </dt>
                <dd class={statValue}>{stat.value}</dd>
                <dd class={statNote}>{stat.note}</dd>
              </div>
            {/each}
            <div class={cx(cell, "col-span-2")}>
              <dt class={statLabel}>Payroll this month</dt>
              <dd class={statValue}>{rupiah(PAYROLL_GROSS)}</dd>
              <dd class={statNote}>
                {`${rupiah(PAYROLL_NET)} net after BPJS and PPh 21`}
              </dd>
            </div>
          </dl>

          <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
            <section aria-labelledby="sigap-trend-title" class={panel}>
              <div class={panelHead}>
                <h2 id="sigap-trend-title" class={panelTitle}>
                  Attendance trend
                </h2>
                <ToggleGroup
                  label="Trend range"
                  items={rangeOptions}
                  bind:value={
                    () => range, (value) => (range = String(value || range))
                  }
                />
              </div>
              <div class="p-4">
                <p class="flex flex-wrap items-baseline gap-x-2">
                  <span
                    data-average
                    class="text-2xl font-semibold tracking-tight tabular-nums"
                    >{`${chart.average}%`}</span
                  >
                  <span class="text-xs text-muted">average attendance rate</span
                  >
                </p>
                <p class="sr-only">{chart.summary}</p>
                <div
                  aria-hidden="true"
                  class="mt-4 grid grid-cols-[32px_minmax(0,1fr)] gap-x-2"
                >
                  <div
                    class="flex h-36 flex-col justify-between text-[11px] leading-none text-muted tabular-nums"
                  >
                    {#each rateMarks as mark (mark)}<span>{mark}</span>{/each}
                  </div>
                  <div
                    class="relative h-36 border-b border-line bg-linear-to-b from-line from-[1px] to-transparent to-[1px] bg-size-[100%_50%]"
                  >
                    <svg
                      class="absolute inset-0 size-full overflow-visible"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <polygon points={chart.area} class="fill-primary/10" />
                      <polyline
                        points={chart.line}
                        fill="none"
                        stroke-width="2"
                        stroke-linejoin="round"
                        vector-effect="non-scaling-stroke"
                        class="stroke-primary"
                      />
                    </svg>
                  </div>
                  <span class="pt-2 text-[11px] leading-none text-muted"
                    >Late</span
                  >
                  <div data-bars class="flex h-10 items-end pt-2">
                    {#each chart.points as point (point.day)}
                      <span class="flex h-full flex-1 items-end justify-center"
                        ><span
                          class="w-2/5 max-w-4 rounded-t-sm bg-(--tpl-late)"
                          style={`height: ${(point.late / LATE_SCALE) * 100}%`}
                        ></span></span
                      >
                    {/each}
                  </div>
                  <span class="pt-1.5 text-[11px] leading-none text-muted"
                    >Nov</span
                  >
                  <div
                    class="flex pt-1.5 text-[11px] leading-none text-muted tabular-nums"
                  >
                    {#each chart.points as point (point.day)}
                      <span class="flex-1 text-center">{point.day}</span>
                    {/each}
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="sigap-waiting-title" class={panel}>
              <div class={panelHead}>
                <h2 id="sigap-waiting-title" class={panelTitle}>
                  Awaiting approval
                </h2>
                <Badge variant="primary" dot={false} data-waiting
                  >{`${waiting.length} pending`}</Badge
                >
              </div>
              {#if waiting.length === 0}
                <p class="p-4 text-sm text-muted">
                  All caught up. No leave requests are waiting.
                </p>
              {:else}
                <ul>
                  {#each waiting.slice(0, WAITING_PREVIEW) as item (item.id)}
                    <li data-request={item.id} class={listRow}>
                      <div class="min-w-0 flex-1">
                        {@render personOf(
                          item.who,
                          `${item.type} leave, ${leaveDates(item)}`,
                        )}
                      </div>
                      {@render leaveActions(item)}
                    </li>
                  {/each}
                </ul>
              {/if}
              <div class="border-t border-line p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  class="w-full"
                  onclick={() => go("leave")}>Open leave</Button
                >
              </div>
            </section>
          </div>

          <div class="grid gap-4 xl:grid-cols-2">
            <section aria-labelledby="sigap-dept-title" class={panel}>
              <div class={panelHead}>
                <h2 id="sigap-dept-title" class={panelTitle}>
                  On site by department
                </h2>
                <span class="text-xs text-muted tabular-nums">116 of 128</span>
              </div>
              <ul class="grid gap-3 p-4">
                {#each deptToday as item (item.dept)}
                  <li
                    class="grid grid-cols-[88px_minmax(0,1fr)_56px] items-center gap-3 text-sm"
                  >
                    <span class="truncate">{item.dept}</span>
                    <span
                      aria-hidden="true"
                      class="h-2 overflow-hidden rounded-full bg-subtle"
                      ><span
                        class="block h-full rounded-full bg-(--tpl-on)"
                        style={`width: ${(item.present / item.total) * 100}%`}
                      ></span></span
                    >
                    <span class="text-right text-xs text-muted tabular-nums"
                      >{`${item.present} / ${item.total}`}</span
                    >
                  </li>
                {/each}
              </ul>
            </section>

            <section aria-labelledby="sigap-upcoming-title" class={panel}>
              <div class={panelHead}>
                <h2 id="sigap-upcoming-title" class={panelTitle}>
                  Birthdays and contract dates
                </h2>
                <span class="text-xs text-muted">Next 30 days</span>
              </div>
              <ul>
                {#each upcoming as item (`${item.who}${item.kind}`)}
                  <li
                    class="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-3 border-b border-line px-4 py-2.5 text-sm last:border-b-0 sm:grid-cols-[52px_minmax(0,1fr)_auto]"
                  >
                    <span class="text-xs font-medium tabular-nums"
                      >{item.date}</span
                    >
                    <div class="min-w-0">
                      <p class="truncate font-medium">{item.who}</p>
                      <p class={personMeta}>{item.note}</p>
                    </div>
                    <span
                      class="hidden items-center gap-1.5 text-xs text-muted sm:inline-flex"
                      >{@render icon(item.icon)}{item.kind}</span
                    >
                  </li>
                {/each}
              </ul>
            </section>
          </div>
        </div>
      {:else if page === "employees"}
        <section aria-label="Employee directory" class={panel}>
          <div
            class="grid items-end gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_180px_180px_auto]"
          >
            <Input
              bind:value={query}
              label="Search by name or ID"
              type="search"
            />
            <Select bind:value={dept} label="Department">
              <option value="all">All departments</option>
              {#each departments as item (item)}
                <option>{item}</option>
              {/each}
            </Select>
            <Select bind:value={type} label="Status">
              <option value="all">All statuses</option>
              {#each employmentTypes as item (item)}
                <option>{item}</option>
              {/each}
            </Select>
            <Button onclick={() => openDialog(ADD_MODAL)}
              >{@render icon("plus")}Add employee</Button
            >
          </div>
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <div
            tabindex="0"
            role="region"
            aria-label="Employees table"
            class={scroller}
          >
            <table class={table}>
              <thead>
                <tr>
                  <th scope="col" class={th}>Employee</th>
                  <th scope="col" class={cx(th, "max-md:hidden")}>Department</th
                  >
                  <th scope="col" class={cx(th, "max-xl:hidden")}>Role</th>
                  <th scope="col" class={th}>Status</th>
                  <th scope="col" class={cx(th, "max-lg:hidden")}>Shift</th>
                  <th scope="col" class={cx(th, "max-xl:hidden")}>Joined</th>
                  <th scope="col" class={th}
                    ><span class="sr-only">Actions</span></th
                  >
                </tr>
              </thead>
              <tbody>
                {#each shown as item (item.id)}
                  <tr data-employee={item.id}>
                    <td class={td}>{@render personOf(item.name, item.id)}</td>
                    <td class={cx(td, "max-md:hidden")}>{item.dept}</td>
                    <td class={cx(td, "max-xl:hidden")}>{item.role}</td>
                    <td class={td}
                      >{@render pillOf(typeTones[item.type]!, item.type)}</td
                    >
                    <td class={cx(td, "max-lg:hidden")}>{item.shift}</td>
                    <td class={cx(td, "text-muted max-xl:hidden")}
                      >{item.joined}</td
                    >
                    <td class={cx(td, "text-right")}>
                      <Button
                        size="sm"
                        variant="ghost"
                        aria-label={`View ${item.name}`}
                        onclick={() => view(item.id)}>View</Button
                      >
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
          <p
            data-count
            class="border-t border-line px-4 py-3 text-xs text-muted"
          >
            {shown.length === 0
              ? "No employees match these filters."
              : `Showing ${shown.length} of ${list.length} sample records, ${HEADCOUNT} employees in total`}
          </p>

          <Drawer id={EMPLOYEE_DRAWER} title="Employee details">
            <div class="grid gap-5 text-ink">
              <div class={person}>
                {@render faceOf(current.name, "size-12 text-sm")}
                <div class="min-w-0">
                  <p class="text-base font-semibold">{current.name}</p>
                  <p class="text-sm text-muted">
                    {`${current.role}, ${current.dept}`}
                  </p>
                </div>
              </div>
              <dl
                class="grid grid-cols-[112px_minmax(0,1fr)] gap-y-2.5 text-sm"
              >
                {#each currentFields as [label, value] (label)}
                  <div class="contents">
                    <dt class="text-muted">{label}</dt>
                    <dd data-field={label} class="truncate font-medium">
                      {value}
                    </dd>
                  </div>
                {/each}
              </dl>
            </div>
            {#snippet footer()}
              <Button variant="secondary" type="submit">Close</Button>
              <Button type="submit" onclick={() => go("payroll")}
                >Open payroll</Button
              >
            {/snippet}
          </Drawer>

          <Modal id={ADD_MODAL} title="Add employee" onclose={resetDraft}>
            <div class="grid gap-4 text-ink">
              <Input
                bind:value={draft.name}
                label="Full name"
                error={draftErrors.name}
              />
              <Input
                bind:value={draft.email}
                label="Work email"
                type="email"
                error={draftErrors.email}
              />
              <div class="grid gap-4 sm:grid-cols-2">
                <Select bind:value={draft.dept} label="Assign to department">
                  {#each departments as item (item)}
                    <option>{item}</option>
                  {/each}
                </Select>
                <Select bind:value={draft.type} label="Employment status">
                  {#each employmentTypes as item (item)}
                    <option>{item}</option>
                  {/each}
                </Select>
              </div>
            </div>
            {#snippet footer()}
              <Button variant="secondary" type="submit">Cancel</Button>
              <Button onclick={add}>Save employee</Button>
            {/snippet}
          </Modal>
        </section>
      {:else if page === "attendance"}
        <section aria-label="Daily attendance" class={panel}>
          <div class={cx(panelHead, "py-3")}>
            <div class="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous day"
                disabled={dateIndex === 0}
                class={cx(iconButton, "disabled:opacity-40")}
                onclick={() => (dateIndex -= 1)}>{@render icon("prev")}</button
              >
              <h2
                data-date
                class="min-w-36 text-center text-sm font-semibold tabular-nums"
              >
                {date.label}
              </h2>
              <button
                type="button"
                aria-label="Next day"
                disabled={dateIndex === dates.length - 1}
                class={cx(iconButton, "disabled:opacity-40")}
                onclick={() => (dateIndex += 1)}>{@render icon("next")}</button
              >
            </div>
            <ToggleGroup
              label="Filter by shift"
              items={shiftOptions}
              bind:value={
                () => shift, (value) => (shift = String(value || shift))
              }
            />
          </div>
          <dl
            class="flex flex-wrap gap-x-5 gap-y-1 border-b border-line px-4 py-2.5 text-xs text-muted"
          >
            {#each ["ontime", "late", "absent", "leave"] as status (status)}
              <div class="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  class={cx(dotBase, dots[dayStatus[status]!.tone])}
                ></span>
                <dt>{dayStatus[status]!.label}</dt>
                <dd
                  data-tally={status}
                  class="font-semibold text-ink tabular-nums"
                >
                  {tally(status)}
                </dd>
              </div>
            {/each}
          </dl>
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <div
            tabindex="0"
            role="region"
            aria-label="Attendance table"
            class={scroller}
          >
            <table class={table}>
              <thead>
                <tr>
                  <th scope="col" class={th}>Employee</th>
                  <th scope="col" class={cx(th, "max-lg:hidden")}>Shift</th>
                  <th scope="col" class={th}>Clock in</th>
                  <th scope="col" class={cx(th, "max-sm:hidden")}>Clock out</th>
                  <th scope="col" class={cx(th, "max-md:hidden")}>Hours</th>
                  <th scope="col" class={th}>Status</th>
                  <th scope="col" class={cx(th, "max-sm:hidden")}
                    ><span class="sr-only">Actions</span></th
                  >
                </tr>
              </thead>
              <tbody>
                {#each rows as row (row.item.id)}
                  <tr data-row={row.item.id}>
                    <td class={td}
                      >{@render personOf(row.item.name, row.item.dept)}</td
                    >
                    <td class={cx(td, "max-lg:hidden")}>{row.item.shift}</td>
                    <td data-in class={cx(td, "tabular-nums")}>{row.in}</td>
                    <td class={cx(td, "tabular-nums max-sm:hidden")}
                      >{row.out}</td
                    >
                    <td class={cx(td, "text-muted tabular-nums max-md:hidden")}
                      >{row.hours}</td
                    >
                    <td data-status class={td}
                      >{@render pillOf(
                        dayStatus[row.status]!.tone,
                        dayStatus[row.status]!.label,
                      )}</td
                    >
                    <td class={cx(td, "text-right max-sm:hidden")}>
                      <Button
                        size="sm"
                        variant="ghost"
                        aria-label={`Correct ${row.item.name}`}
                        onclick={() => correct(row.index)}>Correct</Button
                      >
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>

          <Modal id={CORRECT_MODAL} title="Correct attendance">
            <div class="grid gap-4 text-ink">
              <p data-fix-who class="text-sm text-muted">
                {fix.index < 0
                  ? ""
                  : `${employeeList[fix.index]!.name}, ${date.label}`}
              </p>
              <div class="grid grid-cols-2 gap-4">
                <Input
                  bind:value={fix.in}
                  label="Clock in"
                  type="time"
                  error={fixErrors.in}
                />
                <Input bind:value={fix.out} label="Clock out" type="time" />
              </div>
              <Input
                bind:value={fix.reason}
                label="Reason"
                error={fixErrors.reason}
              />
            </div>
            {#snippet footer()}
              <Button variant="secondary" type="submit">Cancel</Button>
              <Button onclick={saveFix}>Save correction</Button>
            {/snippet}
          </Modal>
        </section>
      {:else if page === "leave"}
        <div class="grid gap-4">
          <ul class={cx(strip, "sm:grid-cols-3")}>
            {#each balances as item (item.type)}
              {@const used = usedDays(leave, item.type, item.used)}
              <li data-balance={item.type} class={cell}>
                <p class={statLabel}>{item.label}</p>
                <p class={statValue}>
                  {used}<span class="ml-1.5 text-sm font-normal text-muted"
                    >{`of ${item.total.toLocaleString("id-ID")} days used`}</span
                  >
                </p>
                <Progress
                  value={used}
                  max={item.total}
                  aria-label={`${item.label} used`}
                  class="mt-3 h-1.5"
                />
                <p class={statNote}>{item.note}</p>
              </li>
            {/each}
          </ul>

          <section aria-labelledby="sigap-out-title" class={panel}>
            <div class={panelHead}>
              <h2 id="sigap-out-title" class={panelTitle}>Who is out</h2>
              <span class="text-xs text-muted">16 to 29 November</span>
            </div>
            <ol class="grid grid-cols-7 gap-px bg-line md:grid-cols-14">
              {#each stripDays as item (item.day)}
                {@const out = outOn(leave, item.day)}
                <li
                  data-day={item.day}
                  class={cx(
                    "grid h-20 content-start justify-items-center gap-1 pt-2 text-xs",
                    item.weekend ? "bg-subtle text-muted" : "bg-surface",
                  )}
                >
                  <span class="text-muted">{item.weekday}</span>
                  <span
                    class={cx(
                      "inline-flex size-6 items-center justify-center rounded-full text-sm font-semibold tabular-nums",
                      item.day === TODAY && "bg-primary text-on-primary",
                    )}>{item.day}</span
                  >
                  {#if out > 0}
                    <span
                      class="rounded-sm bg-primary-soft px-1.5 font-medium text-primary tabular-nums"
                      >{`${out} out`}</span
                    >
                  {/if}
                </li>
              {/each}
            </ol>
          </section>

          <section aria-labelledby="sigap-requests-title" class={panel}>
            <div class={panelHead}>
              <h2 id="sigap-requests-title" class={panelTitle}>Requests</h2>
              <ToggleGroup
                label="Filter requests"
                items={leaveFilters}
                bind:value={
                  () => filter, (value) => (filter = String(value || filter))
                }
              />
            </div>
            <dl
              data-counts
              class="flex flex-wrap gap-x-5 gap-y-1 border-b border-line px-4 py-2.5 text-xs text-muted"
            >
              {#each leaveFilters as item (item.value)}
                <div class="flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    class={cx(dotBase, dots[leaveTones[item.value]!])}
                  ></span>
                  <dt>{item.label}</dt>
                  <dd
                    data-count={item.value}
                    class="font-semibold text-ink tabular-nums"
                  >
                    {leaveCount(leave, item.value as LeaveStatus)}
                  </dd>
                </div>
              {/each}
            </dl>
            {#if requests.length === 0}
              <p class="p-4 text-sm text-muted">No requests in this view.</p>
            {:else}
              <ul>
                {#each requests as item (item.id)}
                  <li data-request={item.id} class={listRow}>
                    <div class="w-full min-w-0 sm:w-56">
                      {@render personOf(item.who, item.id)}
                    </div>
                    <div class="min-w-0 flex-1 basis-48 text-sm">
                      <p class="font-medium">
                        {`${item.type} leave, ${leaveDates(item)} (${dayWord(item.days)})`}
                      </p>
                      <p class={personMeta}>{item.reason}</p>
                    </div>
                    {#if filter === "pending"}
                      {@render leaveActions(item)}
                    {:else}
                      {@render pillOf(
                        leaveTones[filter]!,
                        filter === "approved" ? "Approved" : "Rejected",
                      )}
                    {/if}
                  </li>
                {/each}
              </ul>
            {/if}
          </section>
        </div>
      {:else if page === "payroll"}
        <div class="grid gap-4">
          <dl class={cx(strip, "grid-cols-2 xl:grid-cols-4")}>
            {#each payrollTotals as item (item.label)}
              <div class={cell}>
                <dt class={statLabel}>{item.label}</dt>
                <dd class={cx(statValue, "text-xl")}>{rupiah(item.value)}</dd>
                <dd class={statNote}>{item.note}</dd>
              </div>
            {/each}
          </dl>

          <section aria-labelledby="sigap-run-title" class={panel}>
            <div class={cx(panelHead, "py-3")}>
              <div class="flex items-center gap-3">
                <h2 id="sigap-run-title" class={panelTitle}>
                  November 2026 run
                </h2>
                <span data-run-status class="inline-flex"
                  >{@render pillOf(
                    runStatus[run]!.tone,
                    runStatus[run]!.label,
                  )}</span
                >
              </div>
              <Button
                size="sm"
                disabled={run !== "draft"}
                onclick={() => openDialog(RUN_MODAL)}>Run payroll</Button
              >
            </div>
            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <div
              tabindex="0"
              role="region"
              aria-label="Payroll table"
              class={scroller}
            >
              <table class={table}>
                <thead>
                  <tr>
                    <th scope="col" class={cx(th, "w-10 pr-0")}
                      ><span class="sr-only">Payslip</span></th
                    >
                    <th scope="col" class={th}>Employee</th>
                    <th scope="col" class={cx(th, num, "max-lg:hidden")}
                      >Basic salary</th
                    >
                    <th scope="col" class={cx(th, num, "max-xl:hidden")}
                      >Allowances</th
                    >
                    <th scope="col" class={cx(th, num, "max-md:hidden")}
                      >Deductions</th
                    >
                    <th scope="col" class={cx(th, num)}>Net pay</th>
                    <th scope="col" class={cx(th, "max-sm:hidden")}>Status</th>
                  </tr>
                </thead>
                {#each employeeList as item (item.id)}
                  {@const slip = payslip(item)}
                  {@const expanded = openSlip === item.id}
                  <tbody data-slip={item.id}>
                    <tr>
                      <td class={cx(td, "pr-0")}>
                        <button
                          type="button"
                          aria-label={`Payslip for ${item.name}`}
                          aria-expanded={expanded}
                          class={cx(iconButton, "size-8")}
                          onclick={() => (openSlip = expanded ? "" : item.id)}
                          >{@render icon(
                            "next",
                            cx(
                              "size-4 transition-transform duration-150",
                              expanded && "rotate-90",
                            ),
                          )}</button
                        >
                      </td>
                      <td class={td}
                        >{@render personOf(item.name, item.role)}</td
                      >
                      <td class={cx(td, num, "max-lg:hidden")}
                        >{rupiah(item.salary)}</td
                      >
                      <td class={cx(td, num, "max-xl:hidden")}
                        >{rupiah(slip.allowance)}</td
                      >
                      <td class={cx(td, num, "text-muted max-md:hidden")}
                        >{rupiah(slip.deduction)}</td
                      >
                      <td data-net class={cx(td, num, "font-semibold")}
                        >{rupiah(slip.net)}</td
                      >
                      <td class={cx(td, "max-sm:hidden")}
                        >{@render pillOf(
                          runStatus[run]!.tone,
                          runStatus[run]!.label,
                        )}</td
                      >
                    </tr>
                    {#if expanded}
                      <tr>
                        <td
                          colspan="7"
                          class="border-t border-line bg-subtle px-4 py-3"
                        >
                          <dl
                            data-lines
                            class="grid max-w-md grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1.5 text-sm sm:ml-10"
                          >
                            {#each slip.lines as [label, amount] (label)}
                              <div class="contents">
                                <dt class="text-muted">{label}</dt>
                                <dd class={num}>
                                  {amount < 0
                                    ? `- ${rupiah(-amount)}`
                                    : rupiah(amount)}
                                </dd>
                              </div>
                            {/each}
                            <dt
                              class="border-t border-line pt-1.5 font-semibold"
                            >
                              Net pay
                            </dt>
                            <dd
                              class={cx(
                                num,
                                "border-t border-line pt-1.5 font-semibold",
                              )}
                            >
                              {rupiah(slip.net)}
                            </dd>
                          </dl>
                        </td>
                      </tr>
                    {/if}
                  </tbody>
                {/each}
              </table>
            </div>
            <p class="border-t border-line px-4 py-3 text-xs text-muted">
              {`Showing ${employeeList.length} of ${HEADCOUNT} payslips`}
            </p>
          </section>

          <section aria-labelledby="sigap-rates-title" class={panel}>
            <div class={panelHead}>
              <h2 id="sigap-rates-title" class={panelTitle}>
                Statutory contribution rates
              </h2>
              <span class="text-xs text-muted">Share of basic salary</span>
            </div>
            <Table
              caption="Statutory contribution rates"
              label="Contribution rates table"
              columns={rateColumns}
              rows={rateRows}
              rowKey="name"
              size="sm"
              square
              class="border-0"
            />
          </section>

          <Modal id={RUN_MODAL} title="Run November payroll">
            <div class="grid gap-4">
              <p>
                {`${HEADCOUNT} payslips will be locked and ${rupiah(PAYROLL_NET)} queued for transfer from Bank Mandiri on 25 Nov.`}
              </p>
              {#if run !== "draft"}
                <Progress label="Processing payslips" value={progress} />
              {/if}
            </div>
            {#snippet footer()}
              <Button
                variant="secondary"
                type="submit"
                disabled={run === "running"}>Cancel</Button
              >
              <Button disabled={run === "running"} onclick={startRun}
                >Confirm and run</Button
              >
            {/snippet}
          </Modal>
        </div>
      {:else if page === "recruitment"}
        <div class="grid gap-x-4 gap-y-6 md:grid-cols-2 xl:grid-cols-4">
          {#each stages as stage, index (stage)}
            {@const items = candidates.filter((item) => item.stage === stage)}
            <section aria-label={stage} data-stage={stage} class={column}>
              <div class={columnHead}>
                <h2>{stage}</h2>
                <span class="text-xs font-medium text-muted tabular-nums"
                  >{items.length}</span
                >
              </div>
              {#if items.length === 0}
                <p class="py-3 text-xs text-muted">No candidates here.</p>
              {/if}
              {#each items as item (item.id)}
                <article data-candidate={item.id} class={candidateCard}>
                  {@render personOf(item.name, item.role)}
                  <div class="flex items-center justify-between gap-2">
                    <p class="text-xs text-muted">
                      {`${item.source}, ${item.days === 0 ? "moved today" : `${dayWord(item.days)} in stage`}`}
                    </p>
                    <div class="flex gap-1.5">
                      {#if index > 0}
                        <button
                          type="button"
                          aria-label={`Move ${item.name} back to ${stages[index - 1]}`}
                          class={moveButton}
                          onclick={() => move(item, -1)}
                          >{@render icon("prev")}</button
                        >
                      {/if}
                      {#if index < stages.length - 1}
                        <button
                          type="button"
                          aria-label={`Move ${item.name} to ${stages[index + 1]}`}
                          class={moveButton}
                          onclick={() => move(item, 1)}
                          >{@render icon("next")}</button
                        >
                      {/if}
                    </div>
                  </div>
                </article>
              {/each}
            </section>
          {/each}
        </div>
      {:else}
        <div class="grid items-start gap-4 xl:grid-cols-2">
          <section aria-labelledby="sigap-profile-title" class={panel}>
            <div class={panelHead}>
              <h2 id="sigap-profile-title" class={panelTitle}>
                Company profile
              </h2>
            </div>
            <form
              novalidate
              class="grid gap-4 p-4 sm:grid-cols-2"
              onsubmit={saveProfile}
            >
              {#each profileFields as field (field.key)}
                <Input
                  bind:value={profile[field.key]}
                  label={field.label}
                  type={field.type}
                  error={profileErrors[field.key]}
                />
              {/each}
              <div class="sm:col-span-2">
                <Button type="submit">Save profile</Button>
              </div>
            </form>
          </section>

          <div class="grid gap-4">
            <section aria-labelledby="sigap-schedule-title" class={panel}>
              <div class={panelHead}>
                <h2 id="sigap-schedule-title" class={panelTitle}>
                  Work schedule
                </h2>
                <span data-workdays class="text-xs text-muted"
                  >{`${workDays.length} work days a week`}</span
                >
              </div>
              <div class="grid gap-4 p-4">
                <div
                  role="group"
                  aria-label="Work days"
                  class="flex flex-wrap gap-1.5"
                >
                  {#each weekdays as day (day)}
                    <button
                      type="button"
                      aria-pressed={workDays.includes(day)}
                      class={cx(
                        dayButton,
                        workDays.includes(day) ? dayOn : dayOff,
                      )}
                      onclick={() => toggleDay(day)}>{day}</button
                    >
                  {/each}
                </div>
                <div class="grid gap-4 sm:grid-cols-2">
                  <Select bind:value={tolerance} label="Late tolerance">
                    {#each tolerances as item (item)}
                      <option>{item}</option>
                    {/each}
                  </Select>
                  <Select bind:value={cutoff} label="Payroll cutoff">
                    {#each cutoffs as item (item)}
                      <option>{item}</option>
                    {/each}
                  </Select>
                </div>
                <div>
                  <Button variant="secondary" onclick={saveSchedule}
                    >Save schedule</Button
                  >
                </div>
              </div>
            </section>

            <section aria-labelledby="sigap-policy-title" class={panel}>
              <div class={panelHead}>
                <h2 id="sigap-policy-title" class={panelTitle}>
                  Attendance policies
                </h2>
                <span data-enabled class="text-xs text-muted"
                  >{`${enabled.length} of ${policies.length} on`}</span
                >
              </div>
              <ul>
                {#each policies as item (item.id)}
                  <li class={cx(listRow, "flex-nowrap")}>
                    <div class="min-w-0 flex-1 text-sm">
                      <p class="font-medium">{item.label}</p>
                      <p class="text-xs text-muted">{item.note}</p>
                    </div>
                    <Switch
                      aria-label={item.label}
                      checked={enabled.includes(item.id)}
                      onchange={(event) =>
                        togglePolicy(
                          item.id,
                          item.label,
                          event.currentTarget.checked,
                        )}
                    />
                  </li>
                {/each}
              </ul>
            </section>
          </div>
        </div>
      {/if}
    </main>
  </div>
  <Toaster />
</div>
