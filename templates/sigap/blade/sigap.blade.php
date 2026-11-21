@php
    use Illuminate\Support\HtmlString;

    // Kelas Tailwind dan data untuk komponen Blade, identik dengan versi React dan Vue.
    $DEFAULT_PAGE = 'overview';
    $TITLE_ID = 'sigap-page-title';
    $EMPLOYEE_DRAWER = 'sigap-employee-drawer';
    $ADD_MODAL = 'sigap-add-modal';
    $CORRECT_MODAL = 'sigap-correct-modal';
    $RUN_MODAL = 'sigap-run-modal';
    $ME = 'Dewi Anggraini';
    $palette = '[--tpl-side:#17181c] [--tpl-side-ink:#f4f4f5] [--tpl-side-muted:#a9abb4] [--tpl-side-line:#2b2d34] [--tpl-side-hover:#22242a] [--tpl-on:#15803d] [--tpl-late:#b45309] [--tpl-off:#64748b] [--tpl-leave:#0369a1] [--tpl-av1:#c7dafd] [--tpl-av2:#fbd0da] [--tpl-av3:#fde68a] [--tpl-av4:#bfecd6] [--tpl-av5:#ddd3fb] [--tpl-av-ink:#1f2937] dark:[--tpl-side:#0c0d0f] dark:[--tpl-side-line:#24262b] dark:[--tpl-side-hover:#191b1f] dark:[--tpl-on:#4ade80] dark:[--tpl-late:#fbbf24] dark:[--tpl-off:#94a3b8] dark:[--tpl-leave:#38bdf8]';
    $shell = '[--tpl-side:#17181c] [--tpl-side-ink:#f4f4f5] [--tpl-side-muted:#a9abb4] [--tpl-side-line:#2b2d34] [--tpl-side-hover:#22242a] [--tpl-on:#15803d] [--tpl-late:#b45309] [--tpl-off:#64748b] [--tpl-leave:#0369a1] [--tpl-av1:#c7dafd] [--tpl-av2:#fbd0da] [--tpl-av3:#fde68a] [--tpl-av4:#bfecd6] [--tpl-av5:#ddd3fb] [--tpl-av-ink:#1f2937] dark:[--tpl-side:#0c0d0f] dark:[--tpl-side-line:#24262b] dark:[--tpl-side-hover:#191b1f] dark:[--tpl-on:#4ade80] dark:[--tpl-late:#fbbf24] dark:[--tpl-off:#94a3b8] dark:[--tpl-leave:#38bdf8] min-h-dvh bg-canvas text-ink lg:grid lg:grid-cols-[232px_minmax(0,1fr)]';
    $focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $sideFocus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-side-ink)';
    $side = 'sticky top-0 hidden h-dvh flex-col gap-6 overflow-y-auto bg-(--tpl-side) px-3 py-4 text-(--tpl-side-ink) lg:flex dark:border-r dark:border-(--tpl-side-line)';
    $sideSheet = '[--tpl-menu:var(--tpl-side)] -m-6 flex min-h-[calc(100%+3rem)] flex-col gap-6 bg-(--tpl-side) px-3 py-4 text-(--tpl-side-ink)';
    $navLabel = 'px-3 pb-1.5 text-xs text-(--tpl-side-muted)';
    $navItem = 'relative flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-side-ink)';
    $navOn = 'bg-(--tpl-side-hover) font-semibold text-(--tpl-side-ink) before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-primary';
    $navOff = 'text-(--tpl-side-muted) hover:bg-(--tpl-side-hover) hover:text-(--tpl-side-ink)';
    $navCount = 'ml-auto rounded-full bg-(--tpl-side-ink) px-1.5 text-xs leading-5 font-semibold text-(--tpl-side) tabular-nums';
    $iconButton = 'relative inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $bellTrigger = '[&>button]:relative [&>button]:size-9 [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-0 [&>button]:text-muted';
    $userTrigger = '[&>button]:h-9 [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-1.5';
    $panel = 'min-w-0 rounded-lg border border-line bg-surface';
    $panelHead = 'flex min-h-12 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-line px-4 py-2';
    $panelTitle = 'text-sm font-semibold';
    $strip = 'grid gap-px overflow-hidden rounded-lg border border-line bg-line';
    $cell = 'bg-surface p-4';
    $statLabel = 'flex items-center gap-1.5 text-xs text-muted';
    $statValue = 'mt-1.5 text-2xl font-semibold tracking-tight tabular-nums';
    $statNote = 'mt-1 text-xs text-muted';
    $dotBase = 'size-2 shrink-0 rounded-full';
    $pill = 'inline-flex h-6 items-center gap-1.5 rounded-md border border-line bg-surface px-2 text-xs font-medium whitespace-nowrap';
    $face = 'inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-(--tpl-av-ink) select-none';
    $scroller = 'overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $table = 'w-full border-collapse text-sm';
    $th = 'h-10 bg-subtle px-4 text-left text-xs font-medium whitespace-nowrap text-muted';
    $td = 'border-t border-line px-4 py-2.5 whitespace-nowrap';
    $num = 'text-right tabular-nums';
    $person = 'flex items-center gap-3';
    $personName = 'truncate text-sm font-medium';
    $personMeta = 'truncate text-xs text-muted';
    $listRow = 'flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-4 py-3 last:border-b-0';
    $dayOn = 'border-primary bg-primary text-on-primary hover:bg-primary-strong';
    $dayOff = 'border-line bg-surface text-muted hover:text-ink';
    $dayButton = 'inline-flex h-9 min-w-11 items-center justify-center rounded-md border px-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $column = 'grid content-start gap-2';
    $columnHead = 'flex items-center justify-between border-b-2 border-line pb-2 text-sm font-semibold';
    $candidateCard = 'grid gap-3 rounded-lg border border-line bg-surface p-3';
    $moveButton = 'inline-flex size-8 items-center justify-center rounded-md border border-line text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $icons = ['home' => 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z', 'users' => 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', 'clock' => 'M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20', 'leave' => 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M9 16l2 2 4-4', 'wallet' => 'M20 7H5a2 2 0 0 1 0-4h13v4M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1M17 14h.01', 'board' => 'M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v13h-4z', 'settings' => 'M4 6h10M18 6h2M4 12h2M10 12h10M4 18h8M16 18h4M14 4v4M6 10v4M12 16v4', 'bell' => 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0', 'search' => 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3', 'menu' => 'M4 6h16M4 12h16M4 18h16', 'plus' => 'M12 5v14M5 12h14', 'prev' => 'm15 18-6-6 6-6', 'next' => 'm9 18 6-6-6-6', 'down' => 'm6 9 6 6 6-6', 'check' => 'M5 12.5 10 17 19 7.5', 'cake' => 'M4 21h16M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7M5 16c2.3 1.6 4.7 1.6 7 0s4.7-1.6 7 0M12 12V8M12 5.5v.01', 'file' => 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5'];
    $rateColumns = json_decode('[{"key":"name","label":"Contribution"},{"key":"employee","label":"Employee","align":"right"},{"key":"employer","label":"Employer","align":"right"}]', true);
    $rateRows = json_decode('[{"name":"BPJS Kesehatan","employee":"1%","employer":"4%"},{"name":"Jaminan Hari Tua (JHT)","employee":"2%","employer":"3,7%"},{"name":"Jaminan Pensiun (JP)","employee":"1%","employer":"2%"},{"name":"Jaminan Kecelakaan Kerja (JKK)","employee":"0%","employer":"0,54%"},{"name":"Jaminan Kematian (JKM)","employee":"0%","employer":"0,3%"}]', true);
    $userMenu = json_decode('[{"label":"My profile","value":"profile"},{"label":"Settings","value":"settings"},{"separator":true},{"label":"Sign out","value":"signout"}]', true);
    $rangeOptions = json_decode('[{"value":"7","label":"7 days"},{"value":"14","label":"14 days"}]', true);
    $shiftOptions = json_decode('[{"value":"all","label":"All"},{"value":"Morning","label":"Morning"},{"value":"Afternoon","label":"Afternoon"},{"value":"Night","label":"Night"}]', true);
    $leaveFilters = json_decode('[{"value":"pending","label":"Pending"},{"value":"approved","label":"Approved"},{"value":"rejected","label":"Rejected"}]', true);
    $departments = json_decode('["Production","Warehouse","Retail","Operations","Finance","People"]', true);
    $employmentTypes = json_decode('["Permanent","Contract","Probation"]', true);
    $tolerances = json_decode('["5 minutes","10 minutes","15 minutes"]', true);
    $cutoffs = json_decode('["20th","25th","Last working day"]', true);
    $profileFields = json_decode('[{"key":"company","label":"Company name","type":"text"},{"key":"npwp","label":"NPWP","type":"text"},{"key":"email","label":"HR email","type":"email"},{"key":"city","label":"City","type":"text"}]', true);

    $html = fn (string $markup) => new HtmlString($markup);
    $svg = fn (string $path, string $class) => '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path '.$path.' /></svg>';
    // Ikon garis 24px. $iconOf memakai nama ikon dari ekspresi Alpine.
    $icon = fn (string $name, string $class = 'size-4') => $html($svg('d="'.$icons[$name].'"', $class));
    $iconOf = fn (string $expr, string $class = 'size-4') => $html($svg(':d="icons['.e($expr).']"', $class));
    // Avatar inisial berwarna dari palet lokal, nama dari ekspresi Alpine.
    $faceOf = fn (string $expr, string $class) => '<span aria-hidden="true" class="'.$face.' '.$class.'" :class="faceTone('.e($expr).')" x-text="initials('.e($expr).')"></span>';
    // Pil status: titik warna dari $tone, teks dari $text (keduanya ekspresi Alpine).
    $pillOf = fn (string $tone, string $text) => $html('<span class="'.$pill.'"><span aria-hidden="true" class="'.$dotBase.'" :class="dots['.e($tone).']"></span><span x-text="'.e($text).'"></span></span>');
    $personOf = fn (string $name, string $meta) => $html('<div class="'.$person.'">'.$faceOf($name, 'size-8 text-[11px]').'<div class="min-w-0"><p class="'.$personName.'" x-text="'.e($name).'"></p><p class="'.$personMeta.'" x-text="'.e($meta).'"></p></div></div>');
    // Pesan error di bawah input, dibungkus grid yang sama dengan komponen Input.
    $errorOf = fn (string $expr, string $id) => $html('<template x-if="'.e($expr).'"><p id="'.$id.'" class="text-sm text-danger" x-text="'.e($expr).'"></p></template>');

    // State dan fungsi: blok konstanta yang sama dengan React (tanpa tipe) di dalam satu closure Alpine.
    $script = <<<'JS'
(() => {
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
const pages = {
  overview: { label: "Overview", title: "Overview", sub: "Friday, 20 November 2026. Morning shift is closed, afternoon shift is on the floor.", icon: "home" },
  employees: { label: "Employees", title: "Employees", sub: "Everyone on the payroll across the Bekasi plant, warehouse and stores.", icon: "users" },
  attendance: { label: "Attendance", title: "Attendance", sub: "Clock in and clock out per shift. Late means more than 10 minutes after shift start.", icon: "clock" },
  leave: { label: "Leave", title: "Leave", sub: "Approve requests, watch balances and see who is out over the next two weeks.", icon: "leave" },
  payroll: { label: "Payroll", title: "Payroll", sub: "November 2026 run. Salaries are transferred on the 25th.", icon: "wallet" },
  recruitment: { label: "Recruitment", title: "Recruitment", sub: "Open roles for the December production ramp-up.", icon: "board" },
  settings: { label: "Settings", title: "Settings", sub: "Company profile, work schedule and attendance policies.", icon: "settings" },
}         ;
const DEFAULT_PAGE         = "overview";
const navGroups                                     = [
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
const employeeList             = [
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
const deptToday = [
  { dept: "Production", total: 46, present: 42 }, { dept: "Retail", total: 30, present: 27 },
  { dept: "Warehouse", total: 24, present: 22 }, { dept: "Operations", total: 12, present: 11 },
  { dept: "Finance", total: 8, present: 7 }, { dept: "People", total: 8, present: 7 },
];
const upcoming = [
  { date: "22 Nov", who: "Siti Nurhaliza", kind: "Birthday", note: "Turns 31", icon: "cake" },
  { date: "30 Nov", who: "Rizky Pratama", kind: "Contract ends", note: "12 month contract, renewal not decided", icon: "file" },
  { date: "5 Dec", who: "Maria Kristiani", kind: "Probation review", note: "Month 2 of 3", icon: "check" },
  { date: "14 Dec", who: "Fajar Nugroho", kind: "Contract ends", note: "Renewal approved by Warehouse", icon: "file" },
  { date: "19 Dec", who: "Agus Setiawan", kind: "Birthday", note: "Turns 38", icon: "cake" },
]                                                       ;
const notifications = [
  { id: "n1", title: "4 leave requests need a decision", time: "10 minutes ago" },
  { id: "n2", title: "Maria Kristiani clocked in 18 minutes late", time: "1 hour ago" },
  { id: "n3", title: "BPJS Ketenagakerjaan report is due on 30 Nov", time: "Yesterday" },
];
const userMenu                     = [
  { label: "My profile", value: "profile" }, { label: "Settings", value: "settings" },
  { separator: true }, { label: "Sign out", value: "signout" },
];
/* Absensi: "masuk-keluar", "absent", "leave", atau kosong (belum mulai). */
const dates = [
  { id: "d16", label: "Mon, 16 Nov 2026" }, { id: "d17", label: "Tue, 17 Nov 2026" }, { id: "d18", label: "Wed, 18 Nov 2026" },
  { id: "d19", label: "Thu, 19 Nov 2026" }, { id: "d20", label: "Fri, 20 Nov 2026" },
];
const attendance                           = {
  d16: ["06:54-15:10", "06:58-15:02", "07:03-15:30", "22:51-07:04", "14:55-23:02", "23:14-07:01", "14:49-23:00", "leave", "15:02-23:05", "07:21-15:00"],
  d17: ["06:57-15:05", "07:12-15:04", "06:59-15:20", "22:58-07:02", "15:16-23:01", "22:55-07:00", "14:52-23:03", "leave", "absent", "06:55-15:01"],
  d18: ["07:01-15:12", "06:55-15:00", "07:04-15:15", "absent", "14:58-23:00", "22:57-07:03", "15:24-23:02", "06:50-15:02", "14:57-23:04", "06:58-15:03"],
  d19: ["06:52-15:08", "06:59-15:03", "06:58-15:07", "22:54-07:01", "14:51-23:05", "leave", "14:56-23:01", "07:00-15:00", "14:59-23:02", "07:08-15:04"],
  d20: ["06:56-15:04", "07:14-15:02", "07:02-15:11", "", "14:53-", "leave", "15:18-", "06:57-15:01", "14:58-", "07:01-15:06"],
};
const shiftStart                         = {
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
const dayStatus                                                  = {
  ontime: { label: "On time", tone: "on" }, late: { label: "Late", tone: "late" }, absent: { label: "Absent", tone: "off" },
  leave: { label: "On leave", tone: "leave" }, scheduled: { label: "Scheduled", tone: "" },
};
const emptyFix = { index: -1, in: "", out: "", reason: "" };
/* Cuti */
const leaveRequests                                                                                                                           = [
  { id: "LV-311", who: "Rizky Pratama", type: "Annual", from: 23, to: 25, days: 3, reason: "Family event in Solo", status: "pending" },
  { id: "LV-312", who: "Maria Kristiani", type: "Sick", from: 23, to: 23, days: 1, reason: "Dental surgery follow-up", status: "pending" },
  { id: "LV-313", who: "Ketut Wirawan", type: "Annual", from: 26, to: 27, days: 2, reason: "Galungan ceremony in Gianyar", status: "pending" },
  { id: "LV-314", who: "Agus Setiawan", type: "Annual", from: 24, to: 24, days: 1, reason: "School report day", status: "pending" },
  { id: "LV-308", who: "Bambang Sutrisno", type: "Annual", from: 19, to: 20, days: 2, reason: "Moving house", status: "approved" },
  { id: "LV-305", who: "Fajar Nugroho", type: "Sick", from: 16, to: 17, days: 2, reason: "Fever, doctor's note attached", status: "approved" },
  { id: "LV-302", who: "Lina Marlina", type: "Unpaid", from: 18, to: 18, days: 1, reason: "Requested with one day notice", status: "rejected" },
];
const leaveFilters = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];
const leaveTones                         = { pending: "late", approved: "on", rejected: "off" };
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
  weekday: weekdays[index % 7] ,
  weekend: index % 7 > 4,
}));
/* Payroll */
const FIXED_ALLOWANCE = 850000;
const POSITION_RATE = 0.1;
const HEALTH_RATE = 0.01;
const PENSION_RATE = 0.03;
const taxBands = [[15000000, 0.07], [10000000, 0.04], [7000000, 0.0125], [5400000, 0.005]]         ;
const RUN_STEP = 20;
const RUN_TICK = 220;
const runStatus                                                  = {
  draft: { label: "Draft", tone: "" }, running: { label: "Processing", tone: "late" }, paid: { label: "Paid", tone: "on" },
};
const payrollTotals = [
  { label: "Gross pay", value: PAYROLL_GROSS, note: "128 payslips" },
  { label: "BPJS, employee share", value: PAYROLL_BPJS, note: "Kesehatan, JHT and JP" },
  { label: "PPh 21", value: PAYROLL_TAX, note: "Monthly effective rate" },
  { label: "Net pay", value: PAYROLL_NET, note: "Transfer on 25 Nov" },
];
const rateColumns = [
  { key: "name", label: "Contribution" }, { key: "employee", label: "Employee", align: "right"          },
  { key: "employer", label: "Employer", align: "right"          },
];
const rateRows = [
  { name: "BPJS Kesehatan", employee: "1%", employer: "4%" },
  { name: "Jaminan Hari Tua (JHT)", employee: "2%", employer: "3,7%" },
  { name: "Jaminan Pensiun (JP)", employee: "1%", employer: "2%" },
  { name: "Jaminan Kecelakaan Kerja (JKK)", employee: "0%", employer: "0,54%" },
  { name: "Jaminan Kematian (JKM)", employee: "0%", employer: "0,3%" },
];
/* Rekrutmen */
const stages = ["Applied", "Screening", "Interview", "Offer"];
const candidateList = [
  { id: "c1", name: "Yoga Aditya", role: "Machine Operator", source: "Walk-in", days: 2, stage: "Applied" },
  { id: "c2", name: "Nurul Hidayah", role: "Cashier", source: "Job portal", days: 1, stage: "Applied" },
  { id: "c3", name: "Hendra Wijaya", role: "Forklift Operator", source: "Referral", days: 4, stage: "Screening" },
  { id: "c4", name: "Ayu Lestari", role: "Quality Inspector", source: "Job portal", days: 3, stage: "Screening" },
  { id: "c5", name: "Dimas Prakoso", role: "Machine Operator", source: "Vocational school", days: 6, stage: "Interview" },
  { id: "c6", name: "Wayan Sudarma", role: "Warehouse Lead", source: "Referral", days: 5, stage: "Interview" },
  { id: "c7", name: "Fitri Ramadhani", role: "Payroll Officer", source: "LinkedIn", days: 2, stage: "Offer" },
];
/* Pengaturan */
const profileFields = [
  { key: "company", label: "Company name", type: "text" }, { key: "npwp", label: "NPWP", type: "text" },
  { key: "email", label: "HR email", type: "email" }, { key: "city", label: "City", type: "text" },
]         ;
const profileDefaults                             = {
  company: "PT Sigap Karya Nusantara", npwp: "01.234.567.8-431.000", email: "hr@sigapkarya.co.id", city: "Bekasi",
};
const NPWP_DIGITS = 15;
const defaultWorkDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const tolerances = ["5 minutes", "10 minutes", "15 minutes"];
const cutoffs = ["20th", "25th", "Last working day"];
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
const dots                         = {
  "": "bg-faint", on: "bg-(--tpl-on)", late: "bg-(--tpl-late)", off: "bg-(--tpl-off)", leave: "bg-(--tpl-leave)",
};
const pill =
  "inline-flex h-6 items-center gap-1.5 rounded-md border border-line bg-surface px-2 text-xs font-medium whitespace-nowrap";
const typeTones                         = { Permanent: "on", Contract: "leave", Probation: "late" };
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
const cx = (...c                                       ) =>
  c.filter(Boolean).join(" ");
const rupiah = (value        ) => `Rp ${value.toLocaleString("id-ID")}`;
/** Huruf pertama kata pertama dan terakhir. */
const initials = (name        ) =>
  name
    .split(" ")
    .filter((_, index, words) => index === 0 || index === words.length - 1)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
/** Warna avatar inisial yang selalu sama untuk nama yang sama. */
const faceTone = (name        ) =>
  faceTones[
    [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
      faceTones.length
  ];
const emailOf = (name        ) =>
  `${name.toLowerCase().replace(/\s+/g, ".")}@sigapkarya.co.id`;
const matchesEmployee = (
  item          ,
  query        ,
  dept        ,
  type        ,
) =>
  `${item.name} ${item.id}`
    .toLowerCase()
    .includes(query.trim().toLowerCase()) &&
  (dept === "all" || item.dept === dept) &&
  (type === "all" || item.type === type);
const minutes = (time        ) =>
  Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
/** Baris absensi dari catatan mentah: jam, durasi, dan status terhadap awal shift. */
function dayRow(record        , shift        ) {
  if (record === "" || record === "absent" || record === "leave")
    return { in: "", out: "", hours: "", status: record || "scheduled" };
  const [start = "", end = ""] = record.split("-");
  const worked = (minutes(end) - minutes(start) + DAY_MINUTES) % DAY_MINUTES;
  const late = minutes(start) - minutes(shiftStart[shift] ) > LATE_AFTER;
  return {
    in: start,
    out: end,
    hours: end
      ? `${Math.floor(worked / 60)}h ${String(worked % 60).padStart(2, "0")}m`
      : "",
    status: late ? "late" : "ontime",
  };
}
const leaveDates = (item              ) =>
  item.from === item.to ? `${item.from} Nov` : `${item.from} to ${item.to} Nov`;
const dayWord = (count        ) => `${count} ${count === 1 ? "day" : "days"}`;
const initialLeave = ()             =>
  Object.fromEntries(leaveRequests.map((item) => [item.id, item.status]));
const leaveCount = (state            , status             ) =>
  leaveRequests.filter((item) => state[item.id] === status).length;
/** Jumlah orang cuti (disetujui) pada tanggal itu. */
const outOn = (state            , day        ) =>
  leaveRequests.filter(
    (item) =>
      state[item.id] === "approved" && item.from <= day && day <= item.to,
  ).length;
/** Hari terpakai: angka dasar ditambah permintaan contoh yang baru disetujui. */
const usedDays = (state            , type        , base        ) =>
  leaveRequests
    .filter(
      (item) =>
        item.type === type &&
        item.status === "pending" &&
        state[item.id] === "approved",
    )
    .reduce((sum, item) => sum + item.days, base);
function payslip(item          ) {
  const position =
    item.type === "Permanent" ? Math.round(item.salary * POSITION_RATE) : 0;
  const gross = item.salary + FIXED_ALLOWANCE + position;
  const health = Math.round(item.salary * HEALTH_RATE);
  const pension = Math.round(item.salary * PENSION_RATE);
  const rate = taxBands.find(([floor]) => gross > floor)?.[1] ?? 0;
  const tax = Math.round(gross * rate);
  const lines                     = [
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
function trendOf(range        ) {
  const count = Number(range);
  const from = trend.day.length - count;
  const points = trend.day.slice(from).map((day, index) => {
    const late = trend.late[from + index] ;
    const rate = ((trend.present[from + index]  + late) / HEADCOUNT) * 100;
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
function readHash()         {
  const id = window.location.hash.slice(1);
  return id in pages ? (id          ) : DEFAULT_PAGE;
}
const dialogOf = (id        ) => {
  const dialog = document.getElementById(id);
  return dialog instanceof HTMLDialogElement ? dialog : null;
};
const openDialog = (id        ) => dialogOf(id)?.showModal();
const closeDialog = (id        ) => dialogOf(id)?.close();
/** Fokus ke elemen yang baru dirender ulang (kartu yang pindah kolom). */
const focusLater = (selector        ) =>
  requestAnimationFrame(() =>
    document.querySelector             (selector)?.focus(),
  );
return {
icons, pages, DEFAULT_PAGE, navGroups, TITLE_ID, EMPLOYEE_DRAWER, ADD_MODAL, CORRECT_MODAL, RUN_MODAL, ME, HEADCOUNT, WAITING_PREVIEW, departments, employmentTypes, shifts, employeeList, NEW_ID_START, NEW_HIRE, emptyDraft, EMAIL, stats, PAYROLL_GROSS, PAYROLL_BPJS, PAYROLL_TAX, PAYROLL_NET, trend, rangeOptions, RATE_MAX, RATE_MIN, rateMarks, LATE_SCALE, deptToday, upcoming, notifications, userMenu, dates, attendance, shiftStart, LATE_AFTER, DAY_MINUTES, shiftOptions, dayStatus, emptyFix, leaveRequests, leaveFilters, leaveTones, balances, STRIP_START, STRIP_DAYS, TODAY, weekdays, stripDays, FIXED_ALLOWANCE, POSITION_RATE, HEALTH_RATE, PENSION_RATE, taxBands, RUN_STEP, RUN_TICK, runStatus, payrollTotals, rateColumns, rateRows, stages, candidateList, profileFields, profileDefaults, NPWP_DIGITS, defaultWorkDays, tolerances, cutoffs, policies, palette, shell, focusRing, sideFocus, side, sideSheet, navLabel, navItem, navOn, navOff, navCount, iconButton, bellTrigger, userTrigger, panel, panelHead, panelTitle, strip, cell, statLabel, statValue, statNote, dotBase, dots, pill, typeTones, face, faceTones, scroller, table, th, td, num, person, personName, personMeta, listRow, dayOn, dayOff, dayButton, column, columnHead, candidateCard, moveButton, cx, rupiah, initials, faceTone, emailOf, matchesEmployee, minutes, dayRow, leaveDates, dayWord, initialLeave, leaveCount, outOn, usedDays, payslip, trendOf, readHash, dialogOf, openDialog, closeDialog, focusLater,
page: DEFAULT_PAGE,
query: '',
leave: initialLeave(),
unread: notifications.length,
get pending() {
return leaveCount(this.leave, 'pending');
},
go(id) {
window.location.assign('#' + id);
},
notify(title, description = '', variant = 'default') {
this.$dispatch('markas-toast', { title, description, variant });
},
decide(item, status) {
this.leave = { ...this.leave, [item.id]: status };
this.notify(status === 'approved' ? 'Leave approved' : 'Leave rejected', item.who + ', ' + leaveDates(item), status === 'approved' ? 'success' : 'default');
},
pickMenu(value) {
if (value === 'settings') return this.go('settings');
if (value === 'signout') this.notify('Signed out', 'See you tomorrow, Dewi.');
else this.notify('Profile', ME + ', HR Manager');
},
onHash() {
this.page = readHash();
this.$nextTick(() => document.getElementById(TITLE_ID).focus());
},
};
})()
JS;
@endphp

{{-- Isi sidebar dipakai di aside desktop dan Drawer menu mobile. --}}
@php ob_start(); @endphp
<div class="flex items-center gap-2.5 px-3">
  <span aria-hidden="true" class="flex size-8 items-center justify-center rounded-md bg-primary text-on-primary">{{ $icon('check', 'size-4.5') }}</span>
  <div class="leading-tight">
    <p class="text-sm font-semibold">Sigap</p>
    <p class="text-xs text-(--tpl-side-muted)">Sigap Karya Nusantara</p>
  </div>
</div>
<nav aria-label="__NAV__" class="grid gap-5">
  <template x-for="group in navGroups" :key="group.label">
    <div>
      <p class="{{ $navLabel }}" x-text="group.label"></p>
      <div class="grid gap-0.5">
        <template x-for="id in group.ids" :key="id">
          <button type="__TYPE__" class="{{ $navItem }}" :class="page === id ? navOn : navOff" :aria-current="page === id ? 'page' : null" @click="go(id)">{{ $iconOf('pages[id].icon') }}<span x-text="pages[id].label"></span><template x-if="id === 'leave' && pending > 0"><span class="{{ $navCount }}"><span x-text="pending"></span><span class="sr-only"> pending</span></span></template></button>
        </template>
      </div>
    </div>
  </template>
</nav>
<div class="mt-auto rounded-md border border-(--tpl-side-line) p-3">
  <p class="text-xs text-(--tpl-side-muted)">Payroll cutoff</p>
  <p class="mt-1 text-sm font-semibold">5 days left</p>
  <span aria-hidden="true" class="mt-2.5 block h-1 overflow-hidden rounded-full bg-(--tpl-side-line)"><span class="block h-full w-4/5 rounded-full bg-primary"></span></span>
  <p class="mt-2 text-xs text-(--tpl-side-muted)">Attendance for 1 to 25 Nov locks on Wednesday.</p>
</div>
@php
    $sidebarMarkup = ob_get_clean();
    $sidebar = fn (bool $sheet) => $html(str_replace(['__NAV__', '__TYPE__'], $sheet ? ['Mobile', 'submit'] : ['Main', 'button'], $sidebarMarkup));
    ob_start();
@endphp
<div class="flex gap-2">
  <x-markas.button size="sm" variant="secondary" x-bind:aria-label="'Reject ' + item.who" @click="decide(item, 'rejected')">Reject</x-markas.button>
  <x-markas.button size="sm" x-bind:aria-label="'Approve ' + item.who" @click="decide(item, 'approved')">Approve</x-markas.button>
</div>
@php $leaveActions = $html(ob_get_clean()); @endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp

<div class="{{ $shell }}" x-data="{{ $script }}" x-init="page = readHash()" x-on:hashchange.window="onHash()">
  <aside class="{{ $side }}">{{ $sidebar(false) }}</aside>

  <div class="min-w-0">
    <header class="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-line bg-surface px-4 lg:px-8">
      <x-markas.drawer title="Menu" side="left" class="max-w-64 bg-(--tpl-side) lg:hidden [&_h2]:sr-only [&>div]:gap-0 [&>div>div:first-child]:absolute [&>div>div:first-child]:top-3 [&>div>div:first-child]:right-3 [&>div>div:first-child]:z-10 [&>div>div:first-child_button]:text-(--tpl-side-ink) [&>div>div:first-child_button]:hover:bg-(--tpl-side-hover)">
        <x-slot:trigger>
          <button type="button" aria-label="Open menu" class="{{ $iconButton }} lg:hidden">{{ $icon('menu', 'size-5') }}</button>
        </x-slot:trigger>
        <form method="dialog" class="{{ $sideSheet }}">{{ $sidebar(true) }}</form>
      </x-markas.drawer>
      <form role="search" class="relative min-w-0 flex-1 sm:max-w-xs" @submit.prevent="go('employees')">
        {{ $icon('search', 'pointer-events-none absolute top-2.5 left-3 z-10 size-4 text-muted') }}
        <x-markas.input type="search" aria-label="Search people" placeholder="Search people" class="h-9 pl-9" x-model="query" />
      </form>
      <p class="ml-auto hidden text-xs text-muted md:block">Fri, 20 Nov 2026, 16:20 WIB</p>
      <x-markas.popover align="end" class="{{ $bellTrigger }} max-md:ml-auto">
        <x-slot:trigger>{{ $icon('bell', 'size-5') }}<span class="sr-only" x-text="'Notifications, ' + unread + ' unread'">Notifications, 3 unread</span><template x-if="unread > 0"><span aria-hidden="true" class="absolute top-2 right-2 size-2 rounded-full bg-primary ring-2 ring-surface"></span></template></x-slot:trigger>
        <div class="grid gap-3">
          <div class="flex items-center justify-between gap-3">
            <p class="font-semibold">Notifications</p>
            <x-markas.button size="sm" variant="ghost" x-bind:disabled="unread === 0" @click="unread = 0">Mark all read</x-markas.button>
          </div>
          <ul class="grid gap-3">
            <template x-for="item in notifications" :key="item.id">
              <li class="flex gap-2.5">
                <span aria-hidden="true" class="{{ $dotBase }} mt-1.5" :class="unread > 0 ? 'bg-primary' : 'bg-line'"></span>
                <div>
                  <p x-text="item.title"></p>
                  <p class="text-xs text-muted" x-text="item.time"></p>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </x-markas.popover>
      <x-markas.dropdown-menu :items="$userMenu" class="{{ $userTrigger }}" x-on:markas-select="pickMenu($event.detail)">
        <x-slot:trigger>{!! $faceOf('ME', 'size-7 text-[11px]') !!}<span class="sr-only sm:not-sr-only">{{ $ME }}</span></x-slot:trigger>
      </x-markas.dropdown-menu>
    </header>

    <main class="grid content-start gap-5 px-4 py-6 lg:px-8">
      <div>
        <h1 id="{{ $TITLE_ID }}" tabindex="-1" class="text-xl font-semibold tracking-tight focus:outline-none" x-text="pages[page].title">Overview</h1>
        <p class="mt-1 max-w-2xl text-sm text-muted" x-text="pages[page].sub"></p>
      </div>

      {{-- Overview --}}
      <template x-if="page === 'overview'">
        <div
          class="grid gap-4"
          x-data="{
            range: '14',
            get chart() {
              return this.trendOf(this.range);
            },
            get waiting() {
              return this.leaveRequests.filter((item) => this.leave[item.id] === 'pending');
            },
          }"
        >
          <dl class="{{ $strip }} grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            <template x-for="stat in stats" :key="stat.label">
              <div class="{{ $cell }}">
                <dt class="{{ $statLabel }}"><template x-if="stat.tone"><span aria-hidden="true" class="{{ $dotBase }}" :class="dots[stat.tone]"></span></template><span x-text="stat.label"></span></dt>
                <dd class="{{ $statValue }}" x-text="stat.value"></dd>
                <dd class="{{ $statNote }}" x-text="stat.note"></dd>
              </div>
            </template>
            <div class="{{ $cell }} col-span-2">
              <dt class="{{ $statLabel }}">Payroll this month</dt>
              <dd class="{{ $statValue }}" x-text="rupiah(PAYROLL_GROSS)"></dd>
              <dd class="{{ $statNote }}" x-text="rupiah(PAYROLL_NET) + ' net after BPJS and PPh 21'"></dd>
            </div>
          </dl>

          <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
            <section aria-labelledby="sigap-trend-title" class="{{ $panel }}">
              <div class="{{ $panelHead }}">
                <h2 id="sigap-trend-title" class="{{ $panelTitle }}">Attendance trend</h2>
                <x-markas.toggle-group label="Trend range" :items="$rangeOptions" value="14" x-effect="if (selected.length) range = selected[0]; else selected = [range]" />
              </div>
              <div class="p-4">
                <p class="flex flex-wrap items-baseline gap-x-2">
                  <span data-average class="text-2xl font-semibold tracking-tight tabular-nums" x-text="chart.average + '%'"></span>
                  <span class="text-xs text-muted">average attendance rate</span>
                </p>
                <p class="sr-only" x-text="chart.summary"></p>
                <div aria-hidden="true" class="mt-4 grid grid-cols-[32px_minmax(0,1fr)] gap-x-2">
                  <div class="flex h-36 flex-col justify-between text-[11px] leading-none text-muted tabular-nums">
                    <template x-for="mark in rateMarks" :key="mark"><span x-text="mark"></span></template>
                  </div>
                  <div class="relative h-36 border-b border-line bg-linear-to-b from-line from-[1px] to-transparent to-[1px] bg-size-[100%_50%]">
                    <svg class="absolute inset-0 size-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polygon :points="chart.area" class="fill-primary/10" />
                      <polyline :points="chart.line" fill="none" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke" class="stroke-primary" />
                    </svg>
                  </div>
                  <span class="pt-2 text-[11px] leading-none text-muted">Late</span>
                  <div data-bars class="flex h-10 items-end pt-2">
                    <template x-for="point in chart.points" :key="point.day">
                      <span class="flex h-full flex-1 items-end justify-center"><span class="w-2/5 max-w-4 rounded-t-sm bg-(--tpl-late)" :style="{ height: (point.late / LATE_SCALE) * 100 + '%' }"></span></span>
                    </template>
                  </div>
                  <span class="pt-1.5 text-[11px] leading-none text-muted">Nov</span>
                  <div class="flex pt-1.5 text-[11px] leading-none text-muted tabular-nums">
                    <template x-for="point in chart.points" :key="point.day"><span class="flex-1 text-center" x-text="point.day"></span></template>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="sigap-waiting-title" class="{{ $panel }}">
              <div class="{{ $panelHead }}">
                <h2 id="sigap-waiting-title" class="{{ $panelTitle }}">Awaiting approval</h2>
                <x-markas.badge variant="primary" :dot="false" data-waiting x-text="waiting.length + ' pending'"></x-markas.badge>
              </div>
              <template x-if="waiting.length === 0">
                <p class="p-4 text-sm text-muted">All caught up. No leave requests are waiting.</p>
              </template>
              <template x-if="waiting.length > 0">
                <ul>
                  <template x-for="item in waiting.slice(0, WAITING_PREVIEW)" :key="item.id">
                    <li :data-request="item.id" class="{{ $listRow }}">
                      <div class="min-w-0 flex-1">{{ $personOf('item.who', "item.type + ' leave, ' + leaveDates(item)") }}</div>
                      {{ $leaveActions }}
                    </li>
                  </template>
                </ul>
              </template>
              <div class="border-t border-line p-2">
                <x-markas.button variant="ghost" size="sm" class="w-full" @click="go('leave')">Open leave</x-markas.button>
              </div>
            </section>
          </div>

          <div class="grid gap-4 xl:grid-cols-2">
            <section aria-labelledby="sigap-dept-title" class="{{ $panel }}">
              <div class="{{ $panelHead }}">
                <h2 id="sigap-dept-title" class="{{ $panelTitle }}">On site by department</h2>
                <span class="text-xs text-muted tabular-nums">116 of 128</span>
              </div>
              <ul class="grid gap-3 p-4">
                <template x-for="item in deptToday" :key="item.dept">
                  <li class="grid grid-cols-[88px_minmax(0,1fr)_56px] items-center gap-3 text-sm">
                    <span class="truncate" x-text="item.dept"></span>
                    <span aria-hidden="true" class="h-2 overflow-hidden rounded-full bg-subtle"><span class="block h-full rounded-full bg-(--tpl-on)" :style="{ width: (item.present / item.total) * 100 + '%' }"></span></span>
                    <span class="text-right text-xs text-muted tabular-nums" x-text="item.present + ' / ' + item.total"></span>
                  </li>
                </template>
              </ul>
            </section>

            <section aria-labelledby="sigap-upcoming-title" class="{{ $panel }}">
              <div class="{{ $panelHead }}">
                <h2 id="sigap-upcoming-title" class="{{ $panelTitle }}">Birthdays and contract dates</h2>
                <span class="text-xs text-muted">Next 30 days</span>
              </div>
              <ul>
                <template x-for="item in upcoming" :key="item.who + item.kind">
                  <li class="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-3 border-b border-line px-4 py-2.5 text-sm last:border-b-0 sm:grid-cols-[52px_minmax(0,1fr)_auto]">
                    <span class="text-xs font-medium tabular-nums" x-text="item.date"></span>
                    <div class="min-w-0">
                      <p class="truncate font-medium" x-text="item.who"></p>
                      <p class="{{ $personMeta }}" x-text="item.note"></p>
                    </div>
                    <span class="hidden items-center gap-1.5 text-xs text-muted sm:inline-flex">{{ $iconOf('item.icon') }}<span x-text="item.kind"></span></span>
                  </li>
                </template>
              </ul>
            </section>
          </div>
        </div>
      </template>

      {{-- Employees --}}
      <template x-if="page === 'employees'">
        <section
          aria-label="Employee directory"
          class="{{ $panel }}"
          x-data="{
            list: employeeList,
            dept: 'all',
            type: 'all',
            openId: employeeList[0].id,
            draft: { ...emptyDraft },
            errors: { name: '', email: '' },
            get shown() {
              return this.list.filter((item) => this.matchesEmployee(item, this.query, this.dept, this.type));
            },
            get current() {
              return this.list.find((item) => item.id === this.openId);
            },
            get currentFields() {
              const item = this.current;
              return [['Employee ID', item.id], ['Status', item.type], ['Shift', item.shift + ', starts ' + this.shiftStart[item.shift]], ['Joined', item.joined], ['Base salary', this.rupiah(item.salary)], ['Email', this.emailOf(item.name)]];
            },
            view(id) {
              this.openId = id;
              this.openDialog(this.EMPLOYEE_DRAWER);
            },
            resetDraft() {
              this.draft = { ...this.emptyDraft };
              this.errors = { name: '', email: '' };
            },
            add() {
              const name = this.draft.name.trim();
              const next = { name: name ? '' : 'Enter the employee\'s full name', email: this.EMAIL.test(this.draft.email) ? '' : 'Enter a valid work email' };
              this.errors = next;
              if (next.name || next.email) return;
              const id = 'SG-' + (this.NEW_ID_START + this.list.length - this.employeeList.length);
              const { dept, type } = this.draft;
              this.list = [{ ...this.NEW_HIRE, id, name, dept, type }, ...this.list];
              this.closeDialog(this.ADD_MODAL);
              this.notify('Employee added', name + ', ' + dept, 'success');
            },
          }"
        >
          <div class="grid items-end gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
            <x-markas.input label="Search by name or ID" type="search" x-model="query" />
            <x-markas.select label="Department" x-model="dept">
              <option value="all">All departments</option>
              @foreach ($departments as $item)
                <option>{{ $item }}</option>
              @endforeach
            </x-markas.select>
            <x-markas.select label="Status" x-model="type">
              <option value="all">All statuses</option>
              @foreach ($employmentTypes as $item)
                <option>{{ $item }}</option>
              @endforeach
            </x-markas.select>
            <x-markas.button @click="openDialog(ADD_MODAL)">{{ $icon('plus') }}Add employee</x-markas.button>
          </div>
          <div tabindex="0" role="region" aria-label="Employees table" class="{{ $scroller }}">
            <table class="{{ $table }}">
              <thead>
                <tr>
                  <th scope="col" class="{{ $th }}">Employee</th>
                  <th scope="col" class="{{ $th }} max-md:hidden">Department</th>
                  <th scope="col" class="{{ $th }} max-xl:hidden">Role</th>
                  <th scope="col" class="{{ $th }}">Status</th>
                  <th scope="col" class="{{ $th }} max-lg:hidden">Shift</th>
                  <th scope="col" class="{{ $th }} max-xl:hidden">Joined</th>
                  <th scope="col" class="{{ $th }}"><span class="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                <template x-for="item in shown" :key="item.id">
                  <tr :data-employee="item.id">
                    <td class="{{ $td }}">{{ $personOf('item.name', 'item.id') }}</td>
                    <td class="{{ $td }} max-md:hidden" x-text="item.dept"></td>
                    <td class="{{ $td }} max-xl:hidden" x-text="item.role"></td>
                    <td class="{{ $td }}">{{ $pillOf('typeTones[item.type]', 'item.type') }}</td>
                    <td class="{{ $td }} max-lg:hidden" x-text="item.shift"></td>
                    <td class="{{ $td }} text-muted max-xl:hidden" x-text="item.joined"></td>
                    <td class="{{ $td }} text-right"><x-markas.button size="sm" variant="ghost" x-bind:aria-label="'View ' + item.name" @click="view(item.id)">View</x-markas.button></td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <p data-count class="border-t border-line px-4 py-3 text-xs text-muted" x-text="shown.length === 0 ? 'No employees match these filters.' : 'Showing ' + shown.length + ' of ' + list.length + ' sample records, ' + HEADCOUNT + ' employees in total'"></p>

          <x-markas.drawer id="{{ $EMPLOYEE_DRAWER }}" title="Employee details">
            <div class="grid gap-5 text-ink">
              <div class="{{ $person }}">
                {!! $faceOf('current.name', 'size-12 text-sm') !!}
                <div class="min-w-0">
                  <p class="text-base font-semibold" x-text="current.name"></p>
                  <p class="text-sm text-muted" x-text="current.role + ', ' + current.dept"></p>
                </div>
              </div>
              <dl class="grid grid-cols-[112px_minmax(0,1fr)] gap-y-2.5 text-sm">
                <template x-for="[label, value] in currentFields" :key="label">
                  <div class="contents">
                    <dt class="text-muted" x-text="label"></dt>
                    <dd :data-field="label" class="truncate font-medium" x-text="value"></dd>
                  </div>
                </template>
              </dl>
            </div>
            <x-slot:footer>
              <x-markas.button variant="secondary" type="submit">Close</x-markas.button>
              <x-markas.button type="submit" @click="go('payroll')">Open payroll</x-markas.button>
            </x-slot:footer>
          </x-markas.drawer>

          <x-markas.modal id="{{ $ADD_MODAL }}" title="Add employee" x-on:close="resetDraft()">
            <div class="grid gap-4 text-ink">
              <div class="grid gap-1.5">
                <x-markas.input label="Full name" x-model="draft.name" x-bind:aria-invalid="errors.name ? 'true' : null" x-bind:aria-describedby="errors.name ? 'sigap-name-error' : null" />
                {{ $errorOf('errors.name', 'sigap-name-error') }}
              </div>
              <div class="grid gap-1.5">
                <x-markas.input label="Work email" type="email" x-model="draft.email" x-bind:aria-invalid="errors.email ? 'true' : null" x-bind:aria-describedby="errors.email ? 'sigap-email-error' : null" />
                {{ $errorOf('errors.email', 'sigap-email-error') }}
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <x-markas.select label="Assign to department" x-model="draft.dept">
                  @foreach ($departments as $item)
                    <option>{{ $item }}</option>
                  @endforeach
                </x-markas.select>
                <x-markas.select label="Employment status" x-model="draft.type">
                  @foreach ($employmentTypes as $item)
                    <option>{{ $item }}</option>
                  @endforeach
                </x-markas.select>
              </div>
            </div>
            <x-slot:footer>
              <x-markas.button variant="secondary" type="submit">Cancel</x-markas.button>
              <x-markas.button @click="add()">Save employee</x-markas.button>
            </x-slot:footer>
          </x-markas.modal>
        </section>
      </template>

      {{-- Attendance --}}
      <template x-if="page === 'attendance'">
        <section
          aria-label="Daily attendance"
          class="{{ $panel }}"
          x-data="{
            dateIndex: dates.length - 1,
            shift: 'all',
            records: attendance,
            fix: { ...emptyFix },
            errors: { in: '', reason: '' },
            get date() {
              return this.dates[this.dateIndex];
            },
            get rows() {
              return this.employeeList
                .map((item, index) => ({ item, index, ...this.dayRow(this.records[this.date.id][index], item.shift) }))
                .filter((row) => this.shift === 'all' || row.item.shift === this.shift);
            },
            tally(status) {
              return this.rows.filter((row) => row.status === status).length;
            },
            correct(index) {
              const row = this.dayRow(this.records[this.date.id][index], this.employeeList[index].shift);
              this.fix = { index, in: row.in, out: row.out, reason: '' };
              this.errors = { in: '', reason: '' };
              this.openDialog(this.CORRECT_MODAL);
            },
            save() {
              const next = { in: this.fix.in ? '' : 'Enter a clock-in time', reason: this.fix.reason.trim() ? '' : 'Add a reason for the audit log' };
              this.errors = next;
              if (next.in || next.reason) return;
              const fix = this.fix;
              this.records = { ...this.records, [this.date.id]: this.records[this.date.id].map((record, index) => (index === fix.index ? fix.in + '-' + fix.out : record)) };
              this.closeDialog(this.CORRECT_MODAL);
              this.notify('Attendance corrected', this.employeeList[fix.index].name + ', ' + this.date.label, 'success');
            },
          }"
        >
          <div class="{{ $panelHead }} py-3">
            <div class="flex items-center gap-1">
              <button type="button" aria-label="Previous day" class="{{ $iconButton }} disabled:opacity-40" :disabled="dateIndex === 0" @click="dateIndex -= 1">{{ $icon('prev') }}</button>
              <h2 data-date class="min-w-36 text-center text-sm font-semibold tabular-nums" x-text="date.label"></h2>
              <button type="button" aria-label="Next day" class="{{ $iconButton }} disabled:opacity-40" :disabled="dateIndex === dates.length - 1" @click="dateIndex += 1">{{ $icon('next') }}</button>
            </div>
            <x-markas.toggle-group label="Filter by shift" :items="$shiftOptions" value="all" x-effect="if (selected.length) shift = selected[0]; else selected = [shift]" />
          </div>
          <dl class="flex flex-wrap gap-x-5 gap-y-1 border-b border-line px-4 py-2.5 text-xs text-muted">
            <template x-for="status in ['ontime', 'late', 'absent', 'leave']" :key="status">
              <div class="flex items-center gap-1.5">
                <span aria-hidden="true" class="{{ $dotBase }}" :class="dots[dayStatus[status].tone]"></span>
                <dt x-text="dayStatus[status].label"></dt>
                <dd :data-tally="status" class="font-semibold text-ink tabular-nums" x-text="tally(status)"></dd>
              </div>
            </template>
          </dl>
          <div tabindex="0" role="region" aria-label="Attendance table" class="{{ $scroller }}">
            <table class="{{ $table }}">
              <thead>
                <tr>
                  <th scope="col" class="{{ $th }}">Employee</th>
                  <th scope="col" class="{{ $th }} max-lg:hidden">Shift</th>
                  <th scope="col" class="{{ $th }}">Clock in</th>
                  <th scope="col" class="{{ $th }} max-sm:hidden">Clock out</th>
                  <th scope="col" class="{{ $th }} max-md:hidden">Hours</th>
                  <th scope="col" class="{{ $th }}">Status</th>
                  <th scope="col" class="{{ $th }} max-sm:hidden"><span class="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                <template x-for="row in rows" :key="row.item.id">
                  <tr :data-row="row.item.id">
                    <td class="{{ $td }}">{{ $personOf('row.item.name', 'row.item.dept') }}</td>
                    <td class="{{ $td }} max-lg:hidden" x-text="row.item.shift"></td>
                    <td data-in class="{{ $td }} tabular-nums" x-text="row.in"></td>
                    <td class="{{ $td }} tabular-nums max-sm:hidden" x-text="row.out"></td>
                    <td class="{{ $td }} text-muted tabular-nums max-md:hidden" x-text="row.hours"></td>
                    <td data-status class="{{ $td }}">{{ $pillOf('dayStatus[row.status].tone', 'dayStatus[row.status].label') }}</td>
                    <td class="{{ $td }} text-right max-sm:hidden"><x-markas.button size="sm" variant="ghost" x-bind:aria-label="'Correct ' + row.item.name" @click="correct(row.index)">Correct</x-markas.button></td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <x-markas.modal id="{{ $CORRECT_MODAL }}" title="Correct attendance">
            <div class="grid gap-4 text-ink">
              <p data-fix-who class="text-sm text-muted" x-text="fix.index < 0 ? '' : employeeList[fix.index].name + ', ' + date.label"></p>
              <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-1.5">
                  <x-markas.input label="Clock in" type="time" x-model="fix.in" x-bind:aria-invalid="errors.in ? 'true' : null" x-bind:aria-describedby="errors.in ? 'sigap-in-error' : null" />
                  {{ $errorOf('errors.in', 'sigap-in-error') }}
                </div>
                <x-markas.input label="Clock out" type="time" x-model="fix.out" />
              </div>
              <div class="grid gap-1.5">
                <x-markas.input label="Reason" x-model="fix.reason" x-bind:aria-invalid="errors.reason ? 'true' : null" x-bind:aria-describedby="errors.reason ? 'sigap-reason-error' : null" />
                {{ $errorOf('errors.reason', 'sigap-reason-error') }}
              </div>
            </div>
            <x-slot:footer>
              <x-markas.button variant="secondary" type="submit">Cancel</x-markas.button>
              <x-markas.button @click="save()">Save correction</x-markas.button>
            </x-slot:footer>
          </x-markas.modal>
        </section>
      </template>

      {{-- Leave --}}
      <template x-if="page === 'leave'">
        <div
          class="grid gap-4"
          x-data="{
            filter: 'pending',
            get requests() {
              return this.leaveRequests.filter((item) => this.leave[item.id] === this.filter);
            },
          }"
        >
          <ul class="{{ $strip }} sm:grid-cols-3">
            <template x-for="item in balances" :key="item.type">
              <li :data-balance="item.type" class="{{ $cell }}">
                <p class="{{ $statLabel }}" x-text="item.label"></p>
                <p class="{{ $statValue }}"><span x-text="usedDays(leave, item.type, item.used)"></span><span class="ml-1.5 text-sm font-normal text-muted" x-text="'of ' + item.total.toLocaleString('id-ID') + ' days used'"></span></p>
                <x-markas.progress :value="0" x-bind:id="'sigap-balance-' + item.type" x-bind:value="usedDays(leave, item.type, item.used)" x-bind:max="item.total" x-bind:aria-label="item.label + ' used'" class="mt-3 h-1.5" />
                <p class="{{ $statNote }}" x-text="item.note"></p>
              </li>
            </template>
          </ul>

          <section aria-labelledby="sigap-out-title" class="{{ $panel }}">
            <div class="{{ $panelHead }}">
              <h2 id="sigap-out-title" class="{{ $panelTitle }}">Who is out</h2>
              <span class="text-xs text-muted">16 to 29 November</span>
            </div>
            <ol class="grid grid-cols-7 gap-px bg-line md:grid-cols-14">
              <template x-for="item in stripDays" :key="item.day">
                <li :data-day="item.day" class="grid h-20 content-start justify-items-center gap-1 pt-2 text-xs" :class="item.weekend ? 'bg-subtle text-muted' : 'bg-surface'">
                  <span class="text-muted" x-text="item.weekday"></span>
                  <span class="inline-flex size-6 items-center justify-center rounded-full text-sm font-semibold tabular-nums" :class="item.day === TODAY && 'bg-primary text-on-primary'" x-text="item.day"></span>
                  <template x-if="outOn(leave, item.day) > 0">
                    <span class="rounded-sm bg-primary-soft px-1.5 font-medium text-primary tabular-nums" x-text="outOn(leave, item.day) + ' out'"></span>
                  </template>
                </li>
              </template>
            </ol>
          </section>

          <section aria-labelledby="sigap-requests-title" class="{{ $panel }}">
            <div class="{{ $panelHead }}">
              <h2 id="sigap-requests-title" class="{{ $panelTitle }}">Requests</h2>
              <x-markas.toggle-group label="Filter requests" :items="$leaveFilters" value="pending" x-effect="if (selected.length) filter = selected[0]; else selected = [filter]" />
            </div>
            <dl data-counts class="flex flex-wrap gap-x-5 gap-y-1 border-b border-line px-4 py-2.5 text-xs text-muted">
              <template x-for="item in leaveFilters" :key="item.value">
                <div class="flex items-center gap-1.5">
                  <span aria-hidden="true" class="{{ $dotBase }}" :class="dots[leaveTones[item.value]]"></span>
                  <dt x-text="item.label"></dt>
                  <dd :data-count="item.value" class="font-semibold text-ink tabular-nums" x-text="leaveCount(leave, item.value)"></dd>
                </div>
              </template>
            </dl>
            <template x-if="requests.length === 0">
              <p class="p-4 text-sm text-muted">No requests in this view.</p>
            </template>
            <template x-if="requests.length > 0">
              <ul>
                <template x-for="item in requests" :key="item.id">
                  <li :data-request="item.id" class="{{ $listRow }}">
                    <div class="w-full min-w-0 sm:w-56">{{ $personOf('item.who', 'item.id') }}</div>
                    <div class="min-w-0 flex-1 basis-48 text-sm">
                      <p class="font-medium" x-text="item.type + ' leave, ' + leaveDates(item) + ' (' + dayWord(item.days) + ')'"></p>
                      <p class="{{ $personMeta }}" x-text="item.reason"></p>
                    </div>
                    <template x-if="filter === 'pending'">{{ $leaveActions }}</template>
                    <template x-if="filter !== 'pending'">{{ $pillOf('leaveTones[filter]', "filter === 'approved' ? 'Approved' : 'Rejected'") }}</template>
                  </li>
                </template>
              </ul>
            </template>
          </section>
        </div>
      </template>

      {{-- Payroll --}}
      <template x-if="page === 'payroll'">
        <div
          class="grid gap-4"
          x-data="{
            run: 'draft',
            progress: 0,
            openSlip: '',
            timer: 0,
            start() {
              let value = 0;
              this.run = 'running';
              this.timer = window.setInterval(() => {
                value += this.RUN_STEP;
                this.progress = value;
                if (value < 100) return;
                window.clearInterval(this.timer);
                this.closeDialog(this.RUN_MODAL);
                this.run = 'paid';
                this.notify('Payroll completed', this.HEADCOUNT + ' payslips sent, ' + this.rupiah(this.PAYROLL_NET) + ' queued for transfer', 'success');
              }, this.RUN_TICK);
            },
            destroy() {
              window.clearInterval(this.timer);
            },
          }"
        >
          <dl class="{{ $strip }} grid-cols-2 xl:grid-cols-4">
            <template x-for="item in payrollTotals" :key="item.label">
              <div class="{{ $cell }}">
                <dt class="{{ $statLabel }}" x-text="item.label"></dt>
                <dd class="{{ $statValue }} text-xl" x-text="rupiah(item.value)"></dd>
                <dd class="{{ $statNote }}" x-text="item.note"></dd>
              </div>
            </template>
          </dl>

          <section aria-labelledby="sigap-run-title" class="{{ $panel }}">
            <div class="{{ $panelHead }} py-3">
              <div class="flex items-center gap-3">
                <h2 id="sigap-run-title" class="{{ $panelTitle }}">November 2026 run</h2>
                <span data-run-status class="inline-flex">{{ $pillOf('runStatus[run].tone', 'runStatus[run].label') }}</span>
              </div>
              <x-markas.button size="sm" x-bind:disabled="run !== 'draft'" @click="openDialog(RUN_MODAL)">Run payroll</x-markas.button>
            </div>
            <div tabindex="0" role="region" aria-label="Payroll table" class="{{ $scroller }}">
              <table class="{{ $table }}">
                <thead>
                  <tr>
                    <th scope="col" class="{{ $th }} w-10 pr-0"><span class="sr-only">Payslip</span></th>
                    <th scope="col" class="{{ $th }}">Employee</th>
                    <th scope="col" class="{{ $th }} {{ $num }} max-lg:hidden">Basic salary</th>
                    <th scope="col" class="{{ $th }} {{ $num }} max-xl:hidden">Allowances</th>
                    <th scope="col" class="{{ $th }} {{ $num }} max-md:hidden">Deductions</th>
                    <th scope="col" class="{{ $th }} {{ $num }}">Net pay</th>
                    <th scope="col" class="{{ $th }} max-sm:hidden">Status</th>
                  </tr>
                </thead>
                <template x-for="item in employeeList" :key="item.id">
                  <tbody :data-slip="item.id">
                    <tr>
                      <td class="{{ $td }} pr-0">
                        <button type="button" class="{{ $iconButton }} size-8" :aria-label="'Payslip for ' + item.name" :aria-expanded="openSlip === item.id ? 'true' : 'false'" @click="openSlip = openSlip === item.id ? '' : item.id"><svg class="size-4 transition-transform duration-150" :class="openSlip === item.id && 'rotate-90'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $icons['next'] }}" /></svg></button>
                      </td>
                      <td class="{{ $td }}">{{ $personOf('item.name', 'item.role') }}</td>
                      <td class="{{ $td }} {{ $num }} max-lg:hidden" x-text="rupiah(item.salary)"></td>
                      <td class="{{ $td }} {{ $num }} max-xl:hidden" x-text="rupiah(payslip(item).allowance)"></td>
                      <td class="{{ $td }} {{ $num }} text-muted max-md:hidden" x-text="rupiah(payslip(item).deduction)"></td>
                      <td data-net class="{{ $td }} {{ $num }} font-semibold" x-text="rupiah(payslip(item).net)"></td>
                      <td class="{{ $td }} max-sm:hidden">{{ $pillOf('runStatus[run].tone', 'runStatus[run].label') }}</td>
                    </tr>
                    <template x-if="openSlip === item.id">
                      <tr>
                        <td colspan="7" class="border-t border-line bg-subtle px-4 py-3">
                          <dl data-lines class="grid max-w-md grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1.5 text-sm sm:ml-10">
                            <template x-for="[label, amount] in payslip(item).lines" :key="label">
                              <div class="contents">
                                <dt class="text-muted" x-text="label"></dt>
                                <dd class="{{ $num }}" x-text="amount < 0 ? '- ' + rupiah(-amount) : rupiah(amount)"></dd>
                              </div>
                            </template>
                            <dt class="border-t border-line pt-1.5 font-semibold">Net pay</dt>
                            <dd class="{{ $num }} border-t border-line pt-1.5 font-semibold" x-text="rupiah(payslip(item).net)"></dd>
                          </dl>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </template>
              </table>
            </div>
            <p class="border-t border-line px-4 py-3 text-xs text-muted" x-text="'Showing ' + employeeList.length + ' of ' + HEADCOUNT + ' payslips'"></p>
          </section>

          <section aria-labelledby="sigap-rates-title" class="{{ $panel }}">
            <div class="{{ $panelHead }}">
              <h2 id="sigap-rates-title" class="{{ $panelTitle }}">Statutory contribution rates</h2>
              <span class="text-xs text-muted">Share of basic salary</span>
            </div>
            <x-markas.table caption="Statutory contribution rates" label="Contribution rates table" :columns="$rateColumns" :rows="$rateRows" size="sm" square class="border-0" />
          </section>

          <x-markas.modal id="{{ $RUN_MODAL }}" title="Run November payroll">
            <div class="grid gap-4">
              <p x-text="HEADCOUNT + ' payslips will be locked and ' + rupiah(PAYROLL_NET) + ' queued for transfer from Bank Mandiri on 25 Nov.'"></p>
              <template x-if="run !== 'draft'">
                {{-- Persen di label ikut bergerak: header ditulis di sini, batangnya tetap komponen Progress. --}}
                <div class="grid gap-1.5">
                  <div class="flex items-center justify-between gap-4 text-sm">
                    <label for="sigap-run-progress" class="font-medium text-ink">Processing payslips</label>
                    <span class="text-muted tabular-nums" x-text="progress + '%'"></span>
                  </div>
                  <x-markas.progress id="sigap-run-progress" :value="0" x-bind:value="progress" />
                </div>
              </template>
            </div>
            <x-slot:footer>
              <x-markas.button variant="secondary" type="submit" x-bind:disabled="run === 'running'">Cancel</x-markas.button>
              <x-markas.button x-bind:disabled="run === 'running'" @click="start()">Confirm and run</x-markas.button>
            </x-slot:footer>
          </x-markas.modal>
        </div>
      </template>

      {{-- Recruitment --}}
      <template x-if="page === 'recruitment'">
        <div
          class="grid gap-x-4 gap-y-6 md:grid-cols-2 xl:grid-cols-4"
          x-data="{
            candidates: candidateList,
            inStage(stage) {
              return this.candidates.filter((item) => item.stage === stage);
            },
            move(item, step) {
              const stage = this.stages[this.stages.indexOf(item.stage) + step];
              this.candidates = this.candidates.map((entry) => (entry.id === item.id ? { ...entry, stage, days: 0 } : entry));
              this.notify('Moved to ' + stage, item.name + ', ' + item.role, 'success');
              this.focusLater('[data-candidate=' + item.id + '] button');
            },
          }"
        >
          <template x-for="(stage, index) in stages" :key="stage">
            <section :aria-label="stage" :data-stage="stage" class="{{ $column }}">
              <div class="{{ $columnHead }}">
                <h2 x-text="stage"></h2>
                <span class="text-xs font-medium text-muted tabular-nums" x-text="inStage(stage).length"></span>
              </div>
              <template x-if="inStage(stage).length === 0">
                <p class="py-3 text-xs text-muted">No candidates here.</p>
              </template>
              <template x-for="item in inStage(stage)" :key="item.id">
                <article :data-candidate="item.id" class="{{ $candidateCard }}">
                  {{ $personOf('item.name', 'item.role') }}
                  <div class="flex items-center justify-between gap-2">
                    <p class="text-xs text-muted" x-text="item.source + ', ' + (item.days === 0 ? 'moved today' : dayWord(item.days) + ' in stage')"></p>
                    <div class="flex gap-1.5">
                      <template x-if="index > 0">
                        <button type="button" class="{{ $moveButton }}" :aria-label="'Move ' + item.name + ' back to ' + stages[index - 1]" @click="move(item, -1)">{{ $icon('prev') }}</button>
                      </template>
                      <template x-if="index < stages.length - 1">
                        <button type="button" class="{{ $moveButton }}" :aria-label="'Move ' + item.name + ' to ' + stages[index + 1]" @click="move(item, 1)">{{ $icon('next') }}</button>
                      </template>
                    </div>
                  </div>
                </article>
              </template>
            </section>
          </template>
        </div>
      </template>

      {{-- Settings --}}
      <template x-if="page === 'settings'">
        <div
          class="grid items-start gap-4 xl:grid-cols-2"
          x-data="{
            profile: { ...profileDefaults },
            errors: {},
            workDays: defaultWorkDays,
            tolerance: tolerances[1],
            cutoff: cutoffs[1],
            enabled: policies.filter((item) => item.on).map((item) => item.id),
            saveProfile() {
              const next = {
                company: this.profile.company.trim() ? '' : 'Enter the company name',
                npwp: this.profile.npwp.replace(/\D/g, '').length === this.NPWP_DIGITS ? '' : 'NPWP must have 15 digits',
                email: this.EMAIL.test(this.profile.email) ? '' : 'Enter a valid email address',
              };
              this.errors = next;
              if (next.company || next.npwp || next.email) return;
              this.notify('Company profile saved', this.profile.company, 'success');
            },
            toggleDay(day) {
              this.workDays = this.weekdays.filter((item) => (item === day) !== this.workDays.includes(item));
            },
            togglePolicy(id, label, on) {
              this.enabled = on ? [...this.enabled, id] : this.enabled.filter((item) => item !== id);
              this.notify(label + ' ' + (on ? 'enabled' : 'disabled'));
            },
            saveSchedule() {
              this.notify('Work schedule saved', this.workDays.join(', ') + '. Late after ' + this.tolerance + ', cutoff on the ' + this.cutoff.toLowerCase() + '.', 'success');
            },
          }"
        >
          <section aria-labelledby="sigap-profile-title" class="{{ $panel }}">
            <div class="{{ $panelHead }}">
              <h2 id="sigap-profile-title" class="{{ $panelTitle }}">Company profile</h2>
            </div>
            <form novalidate class="grid gap-4 p-4 sm:grid-cols-2" @submit.prevent="saveProfile()">
              @foreach ($profileFields as $field)
                <div class="grid gap-1.5">
                  <x-markas.input :label="$field['label']" :type="$field['type']" x-model="profile.{{ $field['key'] }}" x-bind:aria-invalid="errors.{{ $field['key'] }} ? 'true' : null" x-bind:aria-describedby="errors.{{ $field['key'] }} ? 'sigap-{{ $field['key'] }}-error' : null" />
                  {{ $errorOf('errors.'.$field['key'], 'sigap-'.$field['key'].'-error') }}
                </div>
              @endforeach
              <div class="sm:col-span-2">
                <x-markas.button type="submit">Save profile</x-markas.button>
              </div>
            </form>
          </section>

          <div class="grid gap-4">
            <section aria-labelledby="sigap-schedule-title" class="{{ $panel }}">
              <div class="{{ $panelHead }}">
                <h2 id="sigap-schedule-title" class="{{ $panelTitle }}">Work schedule</h2>
                <span data-workdays class="text-xs text-muted" x-text="workDays.length + ' work days a week'"></span>
              </div>
              <div class="grid gap-4 p-4">
                <div role="group" aria-label="Work days" class="flex flex-wrap gap-1.5">
                  <template x-for="day in weekdays" :key="day">
                    <button type="button" class="{{ $dayButton }}" :class="workDays.includes(day) ? dayOn : dayOff" :aria-pressed="workDays.includes(day) ? 'true' : 'false'" @click="toggleDay(day)" x-text="day"></button>
                  </template>
                </div>
                <div class="grid gap-4 sm:grid-cols-2">
                  <x-markas.select label="Late tolerance" x-model="tolerance">
                    @foreach ($tolerances as $item)
                      <option>{{ $item }}</option>
                    @endforeach
                  </x-markas.select>
                  <x-markas.select label="Payroll cutoff" x-model="cutoff">
                    @foreach ($cutoffs as $item)
                      <option>{{ $item }}</option>
                    @endforeach
                  </x-markas.select>
                </div>
                <div>
                  <x-markas.button variant="secondary" @click="saveSchedule()">Save schedule</x-markas.button>
                </div>
              </div>
            </section>

            <section aria-labelledby="sigap-policy-title" class="{{ $panel }}">
              <div class="{{ $panelHead }}">
                <h2 id="sigap-policy-title" class="{{ $panelTitle }}">Attendance policies</h2>
                <span data-enabled class="text-xs text-muted" x-text="enabled.length + ' of ' + policies.length + ' on'"></span>
              </div>
              <ul>
                <template x-for="item in policies" :key="item.id">
                  <li class="{{ $listRow }} flex-nowrap">
                    <div class="min-w-0 flex-1 text-sm">
                      <p class="font-medium" x-text="item.label"></p>
                      <p class="text-xs text-muted" x-text="item.note"></p>
                    </div>
                    <x-markas.switch x-bind:id="'sigap-policy-' + item.id" x-bind:aria-label="item.label" x-bind:checked="enabled.includes(item.id)" x-on:change="togglePolicy(item.id, item.label, $event.target.checked)" />
                  </li>
                </template>
              </ul>
            </section>
          </div>
        </div>
      </template>
    </main>
  </div>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
