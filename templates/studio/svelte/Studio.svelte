<script lang="ts">
  import { onMount } from "svelte";
  import Button from "../../../components/button/Button.svelte";
  import Input from "../../../components/input/Input.svelte";
  import Modal from "../../../components/modal/Modal.svelte";
  import Textarea from "../../../components/textarea/Textarea.svelte";
  import Toaster, { toast } from "../../../components/toast/Toast.svelte";

  /* Palet lokal kertas dan catatan tempel, terang dan gelap. */
  const palette =
    "[--tpl-paper:#efece3] [--tpl-sheet:#fbf9f3] [--tpl-grid:#dcd7c9] [--tpl-rule:#e3e7ef] [--tpl-margin:#efb7b0] [--tpl-edge:#d9d3c2] [--tpl-sun:#fbdc6a] [--tpl-pink:#f7c4d4] [--tpl-sky:#bcd8f5] [--tpl-mint:#bfe5c8] [--tpl-lilac:#d9cdf6] [--tpl-on-note:#1f1d17] [--tpl-night:#17181c] [--tpl-on-night:#f3f1ea] [--tpl-polaroid:#fffdf8] [--tpl-tape:#f3e6a8cc] [--tpl-coral:#f2906f] dark:[--tpl-paper:#121210] dark:[--tpl-sheet:#191916] dark:[--tpl-grid:#26251f] dark:[--tpl-rule:#24272d] dark:[--tpl-margin:#5c2f2b] dark:[--tpl-edge:#2e2c25] dark:[--tpl-sun:#f3d35e] dark:[--tpl-pink:#eeb6c8] dark:[--tpl-sky:#aecbea] dark:[--tpl-mint:#b0d9ba] dark:[--tpl-lilac:#cbbdf0] dark:[--tpl-night:#0b0c0e] dark:[--tpl-polaroid:#ece8dc] dark:[--tpl-tape:#d9c98599]";
  /* Animasi masuk saat scroll: hanya aktif jika root diberi data-motion oleh skrip. */
  const motionCss =
    "@media (prefers-reduced-motion:no-preference){[data-motion=on] [data-reveal]{transition:opacity .7s cubic-bezier(.2,.7,.2,1),translate .7s cubic-bezier(.2,.7,.2,1)}[data-motion=on] [data-reveal]:not([data-shown]){opacity:0;translate:0 24px}}";

  /* Kelas */
  const root =
    "min-h-dvh bg-(--tpl-paper) bg-[linear-gradient(var(--tpl-grid)_1px,transparent_1px),linear-gradient(90deg,var(--tpl-grid)_1px,transparent_1px)] bg-size-[24px_24px] text-ink";
  const sheet =
    "relative mx-auto max-w-6xl border-x border-(--tpl-edge) bg-(--tpl-sheet) bg-[repeating-linear-gradient(to_bottom,transparent_0_31px,var(--tpl-rule)_31px_32px)] before:pointer-events-none before:absolute before:inset-y-0 before:left-6 before:w-px before:bg-(--tpl-margin) md:before:left-12";
  const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const headerWrap = "sticky top-3 z-30 flex justify-center px-4 pt-3";
  const navPill =
    "relative flex items-center gap-1 rounded-full border border-line bg-surface p-1.5 shadow-overlay";
  const dots = "flex items-center gap-1 px-2";
  const dot = "size-2.5 rounded-full";
  const tabList = "hidden items-center gap-0.5 sm:flex";
  const tabBase = `inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors duration-150 ease-out motion-reduce:transition-none ${focusRing}`;
  const tabIdle = "text-muted hover:bg-subtle hover:text-ink";
  const tabDot = "size-1.5 rounded-full";
  const contactPill = `inline-flex h-8 items-center rounded-full bg-primary px-3.5 text-sm font-medium text-on-primary transition-colors duration-150 ease-out hover:bg-primary-strong motion-reduce:transition-none ${focusRing}`;
  const menuButton = `inline-flex size-8 items-center justify-center rounded-full text-ink hover:bg-subtle sm:hidden ${focusRing}`;
  const menuPanel =
    "absolute inset-x-0 top-full mt-2 grid gap-1 rounded-2xl border border-line bg-surface p-2 shadow-overlay sm:hidden";
  const menuLink = `flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-ink hover:bg-subtle ${focusRing}`;
  const content = "relative pr-5 pl-10 md:pr-12 md:pl-20";
  const hero =
    "grid justify-items-center gap-7 pt-14 pb-20 text-center md:pt-20";
  const stage =
    "relative grid w-full max-w-3xl justify-items-center md:px-36 md:py-16";
  const lines =
    "pointer-events-none absolute inset-0 hidden size-full text-ink/40 md:block";
  const nameBox =
    "relative w-full max-w-lg border-2 border-ink bg-(--tpl-sheet) px-6 py-7 md:px-8 md:py-9";
  const handle =
    "absolute size-2.5 border-2 border-ink bg-(--tpl-sheet) [&:nth-child(1)]:-top-1.5 [&:nth-child(1)]:-left-1.5 [&:nth-child(2)]:-top-1.5 [&:nth-child(2)]:-right-1.5 [&:nth-child(3)]:-bottom-1.5 [&:nth-child(3)]:-left-1.5 [&:nth-child(4)]:-right-1.5 [&:nth-child(4)]:-bottom-1.5";
  const sizeTag =
    "absolute -bottom-7 left-1/2 -translate-x-1/2 rounded bg-primary px-1.5 py-0.5 font-mono text-[11px] text-on-primary";
  const pixelName = "h-auto w-full fill-ink";
  const noteList = "mt-12 flex flex-wrap justify-center gap-3 md:contents";
  const noteBase =
    "rounded-sm px-4 py-3 font-serif text-lg text-(--tpl-on-note) italic shadow-[0_6px_14px_-6px_rgb(0_0_0/0.35)] md:absolute";
  const status =
    "inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium";
  const pingWrap = "relative flex size-2.5";
  const ping =
    "absolute inset-0 animate-ping rounded-full bg-success opacity-60 motion-reduce:animate-none";
  const pingDot = "relative size-2.5 rounded-full bg-success";
  const heroTitle =
    "max-w-3xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance md:text-6xl";
  const iconTile =
    "mx-1 inline-flex size-9 translate-y-[-0.1em] items-center justify-center rounded-xl align-middle text-(--tpl-on-note) md:size-12";
  const lead = "max-w-xl text-lg text-pretty text-muted";
  const actions = "flex flex-wrap justify-center gap-3";
  const linkButton = `inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors duration-150 ease-out motion-reduce:transition-none ${focusRing}`;
  const linkPrimary = "bg-primary text-on-primary hover:bg-primary-strong";
  const linkSecondary =
    "border border-line bg-surface text-ink hover:bg-subtle";
  const section = "scroll-mt-24 border-t border-(--tpl-edge) py-20";
  const kicker = "font-serif text-xl text-muted italic";
  const hand =
    "font-serif text-5xl font-medium tracking-tight italic md:text-6xl";
  const h2 = "text-3xl font-semibold tracking-tight md:text-4xl";
  const aboutGrid = "grid items-start gap-14 lg:grid-cols-[1.1fr_1fr]";
  const aboutText = "grid gap-6";
  const handHeading = `${hand} -rotate-2`;
  const notesList = "grid gap-4";
  const noteRow = "font-serif text-xl leading-snug italic md:text-2xl";
  const noteKey =
    "mr-2 font-sans text-sm font-semibold tracking-wide text-muted not-italic uppercase";
  const marker =
    "bg-[linear-gradient(transparent_55%,var(--tpl-sun)_55%,var(--tpl-sun)_88%,transparent_88%)] px-0.5 text-ink dark:text-(--tpl-sun) dark:bg-none";
  const photos = "relative mx-auto h-96 w-full max-w-md";
  const polaroid =
    "absolute w-52 bg-(--tpl-polaroid) p-3 pb-12 shadow-[0_14px_30px_-12px_rgb(0_0_0/0.45)] md:w-60";
  const tape =
    "absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 bg-(--tpl-tape)";
  const photoArt = "relative aspect-square overflow-hidden";
  const caption =
    "absolute inset-x-3 bottom-3 font-serif text-lg text-(--tpl-on-note) italic";
  const skillsBox = "mt-16 grid gap-5";
  const skillsHead = "flex flex-wrap items-baseline justify-between gap-3";
  const skillList = "flex flex-wrap gap-2.5";
  const skillBase = `inline-flex h-10 items-center gap-2 rounded-full border-2 px-4 text-sm font-semibold text-(--tpl-on-note) transition-transform duration-150 ease-out hover:-translate-y-0.5 motion-reduce:transition-none ${focusRing}`;
  const skillIdle = "border-transparent";
  const skillOn =
    "border-(--tpl-on-note) shadow-[3px_3px_0_var(--tpl-on-note)]";
  const skillPanel =
    "grid gap-1 rounded-2xl border border-line bg-surface p-5 md:max-w-2xl";
  const skillTitle = "text-base font-semibold";
  const small = "text-sm text-muted";
  const workHead = "flex flex-wrap items-end justify-between gap-5";
  const filterGroup =
    "inline-flex gap-1 rounded-full border border-line bg-surface p-1";
  const filterBase = `h-8 rounded-full px-3.5 text-sm font-medium transition-colors duration-150 ease-out motion-reduce:transition-none ${focusRing}`;
  const filterIdle = "text-muted hover:bg-subtle hover:text-ink";
  const filterOn = "bg-primary text-on-primary";
  const projectList = "mt-12 grid gap-10";
  const projectItem = "relative pt-9";
  const folderTab =
    "absolute top-0 left-0 flex h-10 items-start rounded-t-xl px-5 pt-2.5 font-mono text-xs font-semibold tracking-[0.2em]";
  const projectCard =
    "grid items-center gap-10 overflow-hidden rounded-2xl rounded-tl-none p-6 md:p-10 lg:grid-cols-[1fr_1.1fr]";
  const projectText = "grid justify-items-start gap-5";
  const projectTitle = "text-4xl font-semibold tracking-tight md:text-5xl";
  const projectLead = "max-w-md text-base text-pretty";
  const chipList = "flex flex-wrap gap-2";
  const chip = "rounded-full border px-3 py-1 text-xs font-medium";
  const openButton = `inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-transform duration-150 ease-out hover:translate-x-0.5 motion-reduce:transition-none ${focusRing}`;
  const mockStage = "relative flex min-h-80 items-center justify-center";
  const emptyText = "rounded-2xl border border-line bg-surface p-6 text-muted";
  const phone =
    "relative w-56 rounded-[2.2rem] border-[6px] border-(--tpl-on-night)/15 bg-(--tpl-on-night) p-3 text-(--tpl-night) shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]";
  const notch = "mx-auto mb-3 h-1.5 w-16 rounded-full bg-(--tpl-night)/20";
  const phoneCard = "rounded-2xl p-3";
  const bar = "h-2 rounded-full";
  const avatar =
    "flex size-7 items-center justify-center rounded-full text-[10px] font-semibold text-(--tpl-on-note)";
  const windowFrame =
    "w-full max-w-md overflow-hidden rounded-xl border border-(--tpl-on-note)/15 bg-(--tpl-polaroid) text-(--tpl-on-note) shadow-[0_24px_50px_-24px_rgb(0_0_0/0.5)]";
  const windowBar =
    "flex items-center gap-1.5 border-b border-(--tpl-on-note)/10 px-3 py-2.5";
  const windowDot = "size-2.5 rounded-full";
  const columns = "grid grid-cols-3 gap-3 p-4";
  const column = "grid content-start gap-2 rounded-lg bg-(--tpl-on-note)/5 p-2";
  const ticket = "grid gap-1.5 rounded-md bg-(--tpl-polaroid) p-2 shadow-sm";
  const mapFrame =
    "relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-(--tpl-on-note)/15 bg-(--tpl-polaroid) bg-[linear-gradient(var(--tpl-sky)_1px,transparent_1px),linear-gradient(90deg,var(--tpl-sky)_1px,transparent_1px)] bg-size-[28px_28px]";
  const mapCard =
    "absolute right-4 bottom-4 left-4 flex items-center justify-between gap-3 rounded-xl bg-(--tpl-night) px-4 py-3 text-(--tpl-on-night)";
  const playGrid = "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4";
  const playTile = "grid gap-3";
  const playArt =
    "relative aspect-square overflow-hidden rounded-2xl border border-line";
  const contactGrid = "grid gap-12 lg:grid-cols-[1fr_1.1fr]";
  const contactText = "grid content-start gap-6";
  const mailLink = `inline-flex items-center gap-2 justify-self-start rounded-md text-lg font-semibold underline decoration-(--tpl-sun) decoration-4 underline-offset-4 ${focusRing}`;
  const factList = "grid gap-3 text-base";
  const fact = "flex items-center gap-3";
  const factIcon =
    "flex size-8 items-center justify-center rounded-lg text-(--tpl-on-note)";
  const form =
    "grid gap-5 rounded-2xl border border-line bg-surface p-6 shadow-[6px_6px_0_var(--tpl-edge)] md:p-8";
  const field = "grid gap-1.5";
  const errorText = "text-sm text-danger";
  const footer =
    "flex flex-wrap items-center justify-between gap-4 border-t border-(--tpl-edge) py-8 text-sm text-muted";
  const footerNav = "flex flex-wrap gap-4";
  const quietLink = `rounded-sm hover:text-ink ${focusRing}`;
  const caseMeta = "grid grid-cols-3 gap-3 text-sm";
  const caseLabel = "text-xs text-muted";
  const caseValue = "font-medium text-ink";
  const caseBody = "grid gap-4";
  const caseStats = "grid grid-cols-3 gap-3";
  const caseStat = "grid gap-0.5 rounded-xl border border-line p-3";
  const caseNumber = "text-xl font-semibold text-ink";
  const caseSteps = "grid list-decimal gap-1 pl-5";
  const srOnly = "sr-only";

  const cx = (...c: (string | false | null | undefined)[]) =>
    c.filter(Boolean).join(" ");

  const icons = {
    arrow: "M5 12h14M13 6l6 6-6 6",
    menu: "M4 7h16M4 12h16M4 17h16",
    close: "M18 6 6 18M6 6l12 12",
    cursor: "m5 3 14 7-6 2-2 6Z",
    sparkle:
      "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
    mail: "M4 6h16v12H4zM4 7l8 6 8-6",
    clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
    pin: "M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12ZM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  };
  type IconName = keyof typeof icons;

  /* Huruf piksel 5x7 untuk nama besar di hero. */
  const pixelFont: Record<string, string[]> = {
    R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
    I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  };
  const PIXEL_NAME = "RANIA";
  function pixelPath(word: string) {
    let d = "";
    [...word].forEach((letter, index) =>
      pixelFont[letter]!.forEach((row, y) =>
        [...row].forEach((bit, x) => {
          if (bit === "1") d += `M${(index * 6 + x) * 10} ${y * 10}h9v9h-9z`;
        }),
      ),
    );
    return d;
  }
  const namePath = pixelPath(PIXEL_NAME);

  const nav = [
    { id: "home", label: "Home", tone: "bg-(--tpl-sun)" },
    { id: "about", label: "About", tone: "bg-(--tpl-pink)" },
    { id: "work", label: "Case Study", tone: "bg-(--tpl-sky)" },
    { id: "playground", label: "Playground", tone: "bg-(--tpl-mint)" },
  ];
  const sectionIds = ["home", "about", "work", "playground", "contact"];

  const stickyNotes = [
    {
      text: "make things",
      className: "-rotate-6 bg-(--tpl-sun) md:top-4 md:left-0",
    },
    {
      text: "sweat the details",
      className: "rotate-3 bg-(--tpl-pink) md:top-10 md:right-0",
    },
    {
      text: "Product Designer",
      className: "-rotate-2 bg-(--tpl-sky) md:bottom-0 md:left-12",
    },
  ];

  const nowNotes = [
    ["Now", "redesigning a payroll app for people who dread payday admin."],
    ["Reading", "The Shape of Design, for the third time."],
    ["Learning", "state machines, so prototypes stop lying."],
  ];

  const skills = [
    {
      id: "interaction",
      label: "Interaction Design",
      tone: "bg-(--tpl-sun)",
      detail:
        "Flows, states, and the small moments in between. Eight years of turning messy requirements into screens people understand on the first try.",
    },
    {
      id: "prototyping",
      label: "Prototyping",
      tone: "bg-(--tpl-mint)",
      detail:
        "Clickable in a day, coded when it matters. I test ideas with real data so the team argues about evidence, not opinions.",
    },
    {
      id: "research",
      label: "User Research",
      tone: "bg-(--tpl-pink)",
      detail:
        "Interviews, diary studies, and plenty of sitting next to people while they work. Over 140 sessions across finance and logistics.",
    },
    {
      id: "motion",
      label: "Motion Design",
      tone: "bg-(--tpl-sky)",
      detail:
        "Motion that explains where things went. Short, purposeful, and always respectful of reduced motion settings.",
    },
  ];

  const tones = {
    night: {
      card: "bg-(--tpl-night) text-(--tpl-on-night)",
      lead: "text-(--tpl-on-night)/80",
      chip: "border-(--tpl-on-night)/30",
      button: "bg-(--tpl-on-night) text-(--tpl-night)",
    },
    sun: {
      card: "bg-(--tpl-sun) text-(--tpl-on-note)",
      lead: "text-(--tpl-on-note)/80",
      chip: "border-(--tpl-on-note)/30",
      button: "bg-(--tpl-on-note) text-(--tpl-polaroid)",
    },
    sky: {
      card: "bg-(--tpl-sky) text-(--tpl-on-note)",
      lead: "text-(--tpl-on-note)/80",
      chip: "border-(--tpl-on-note)/30",
      button: "bg-(--tpl-on-note) text-(--tpl-polaroid)",
    },
  };
  type Tone = keyof typeof tones;

  type Project = {
    id: string;
    number: string;
    name: string;
    kind: "mobile" | "web";
    tone: Tone;
    lead: string;
    chips: string[];
    role: string;
    timeline: string;
    team: string;
    problem: string;
    steps: string[];
    stats: [string, string][];
  };

  const projects: Project[] = [
    {
      id: "tandem",
      number: "PROJECT 01",
      name: "Tandem",
      kind: "mobile",
      tone: "night",
      lead: "A shared wallet for couples and housemates. Split bills, plan savings, and never ask who paid for the gas again.",
      chips: ["Mobile app", "Fintech", "2025"],
      role: "Lead designer",
      timeline: "5 months",
      team: "2 designers, 6 engineers",
      problem:
        "People sharing money tracked it in chat threads and spreadsheets. Every month ended with an awkward settle up conversation.",
      steps: [
        "Interviewed 24 couples and housemates in Jakarta and Bandung.",
        "Prototyped three split models and tested them with real receipts.",
        "Shipped a shared timeline with gentle nudges instead of reminders.",
      ],
      stats: [
        ["38%", "fewer support chats"],
        ["4.8", "store rating"],
        ["Rp2,1 M", "saved per pair yearly"],
      ],
    },
    {
      id: "forge",
      number: "PROJECT 02",
      name: "Forge",
      kind: "web",
      tone: "sun",
      lead: "A planning board for hardware teams. Parts, suppliers, and build stages live in one calm view instead of twelve tabs.",
      chips: ["Web app", "B2B", "2024"],
      role: "Product designer",
      timeline: "8 months",
      team: "3 designers, 9 engineers",
      problem:
        "Hardware teams juggled supplier emails and part numbers in spreadsheets, so late parts surfaced only when a build stalled.",
      steps: [
        "Mapped a full build cycle with two factory teams in Batam.",
        "Designed a board where every card carries its supplier risk.",
        "Built a design system of 40 components with the front end team.",
      ],
      stats: [
        ["2x", "faster weekly planning"],
        ["61%", "fewer late parts"],
        ["40", "shared components"],
      ],
    },
    {
      id: "lintas",
      number: "PROJECT 03",
      name: "Lintas",
      kind: "mobile",
      tone: "sky",
      lead: "Commuter routes that respect your time. Live transfers, crowd levels, and one tap to tell your team you are late.",
      chips: ["Mobile app", "Mobility", "2023"],
      role: "Designer and researcher",
      timeline: "4 months",
      team: "1 designer, 4 engineers",
      problem:
        "Commuters switched between three apps to plan one trip and still missed transfers when trains ran late.",
      steps: [
        "Rode the morning lines with 12 commuters and logged every switch.",
        "Merged planning and live status into a single trip card.",
        "Tested crowd indicators until riders trusted them over guesses.",
      ],
      stats: [
        ["27%", "fewer missed transfers"],
        ["310 K", "monthly riders"],
        ["9 min", "saved per trip"],
      ],
    },
  ];

  const filters = [
    { id: "all", label: "All work" },
    { id: "mobile", label: "Mobile" },
    { id: "web", label: "Web" },
  ];

  const playItems = [
    { title: "Squishy toggle", meta: "Rive, 2025", art: "toggle" },
    { title: "Type specimen", meta: "Figma, 2025", art: "type" },
    { title: "Colour study", meta: "CSS, 2024", art: "stripes" },
    { title: "Tiny clock", meta: "SVG, 2024", art: "clock" },
  ];

  const contactFacts: { icon: IconName; text: string; tone: string }[] = [
    {
      icon: "clock",
      text: "Replies within two working days",
      tone: "bg-(--tpl-mint)",
    },
    {
      icon: "pin",
      text: "Based in Yogyakarta, working worldwide",
      tone: "bg-(--tpl-pink)",
    },
    {
      icon: "sparkle",
      text: "Booking projects from January 2027",
      tone: "bg-(--tpl-sun)",
    },
  ];

  const footerLinks = [
    { label: "Journal", href: "#playground" },
    { label: "Resume", href: "#about" },
    { label: "Email", href: "mailto:hello@rania.studio" },
  ];

  const CASE_ID = "studio-case";
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MIN_MESSAGE = 10;
  const EMPTY_FORM = { name: "", email: "", message: "" };
  type FormState = typeof EMPTY_FORM;

  function validate(values: FormState): Partial<FormState> {
    const errors: Partial<FormState> = {};
    if (!values.name.trim()) errors.name = "Tell me your name.";
    if (!EMAIL_PATTERN.test(values.email.trim()))
      errors.email = "Enter a valid email address, like you@company.com.";
    if (values.message.trim().length < MIN_MESSAGE)
      errors.message = "Write at least 10 characters about your project.";
    return errors;
  }

  /** Tampilkan elemen data-reveal saat masuk layar; dilewati saat reduced motion. */
  function startReveal(element: HTMLElement) {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return () => {};
    element.dataset.motion = "on";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    element
      .querySelectorAll("[data-reveal]")
      .forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }

  function readHash() {
    const id = window.location.hash.slice(1);
    return sectionIds.includes(id) ? id : "home";
  }

  let rootEl = $state<HTMLDivElement>();
  let active = $state("home");
  let menuOpen = $state(false);
  let filter = $state("all");
  let skill = $state(skills[0]!.id);
  let projectId = $state(projects[0]!.id);
  let values = $state<FormState>({ ...EMPTY_FORM });
  let errors = $state<Partial<FormState>>({});

  // Browser API hanya disentuh setelah mount (onMount tidak berjalan saat SSR).
  onMount(() => {
    const onHashChange = () => (active = readHash());
    active = readHash();
    window.addEventListener("hashchange", onHashChange);
    const stop = startReveal(rootEl!);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      stop();
    };
  });

  const visible = $derived(
    projects.filter((project) => filter === "all" || project.kind === filter),
  );
  const project = $derived(projects.find((item) => item.id === projectId)!);
  const currentSkill = $derived(skills.find((item) => item.id === skill)!);

  const openCase = (id: string) => {
    projectId = id;
    const dialog = document.getElementById(CASE_ID);
    if (dialog instanceof HTMLDialogElement && !dialog.open) dialog.showModal();
  };
  const nextCase = () => {
    const list = visible.length ? visible : projects;
    const index = list.findIndex((item) => item.id === projectId);
    projectId = list[(index + 1) % list.length]!.id;
  };
  const submit = (event: SubmitEvent) => {
    event.preventDefault();
    const found = validate(values);
    errors = found;
    if (Object.keys(found).length) return;
    const first = values.name.trim().split(/\s+/)[0];
    toast({
      title: "Message sent",
      description: `Thanks ${first}, I will reply to ${values.email.trim()} within two days.`,
      variant: "success",
    });
    values = { ...EMPTY_FORM };
  };
</script>

{#snippet icon(name: IconName, className: string)}
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

{#snippet mockup(id: string)}
  {#if id === "tandem"}
    <div class={phone} aria-hidden="true">
      <div class={notch}></div>
      <p class="text-[11px] font-medium opacity-70">Shared with Dimas</p>
      <p class="mt-1 text-2xl font-semibold tracking-tight">Rp4.250.000</p>
      <div class={cx(phoneCard, "mt-3 bg-(--tpl-sun)")}>
        <p class="text-[11px] font-semibold text-(--tpl-on-note)">
          Bali trip fund
        </p>
        <div class={cx(bar, "mt-2 bg-(--tpl-on-note)/15")}>
          <div class={cx(bar, "w-3/5 bg-(--tpl-on-note)")}></div>
        </div>
      </div>
      <div class="mt-3 grid gap-2">
        {#each [["DP", "Groceries", "bg-(--tpl-pink)"], ["RA", "Electricity", "bg-(--tpl-mint)"], ["DP", "Netflix split", "bg-(--tpl-lilac)"]] as [who, label, tone], index (index)}
          <div
            class="flex items-center gap-2 rounded-xl bg-(--tpl-night)/5 p-2"
          >
            <span class={cx(avatar, tone)}>{who}</span>
            <span class="flex-1 text-[11px] font-medium">{label}</span>
            <span class={cx(bar, "w-8 bg-(--tpl-night)/20")}></span>
          </div>
        {/each}
      </div>
    </div>
  {:else if id === "forge"}
    <div class={windowFrame} aria-hidden="true">
      <div class={windowBar}>
        <span class={cx(windowDot, "bg-(--tpl-coral)")}></span>
        <span class={cx(windowDot, "bg-(--tpl-sun)")}></span>
        <span class={cx(windowDot, "bg-(--tpl-mint)")}></span>
        <span class="ml-3 text-[11px] font-semibold"
          >Build 14 · Drone frame</span
        >
      </div>
      <div class={columns}>
        {#each [["Sourcing", 3, "bg-(--tpl-pink)"], ["Assembly", 2, "bg-(--tpl-sky)"], ["Testing", 1, "bg-(--tpl-mint)"]] as const as [label, count, tone] (label)}
          <div class={column}>
            <p class="text-[10px] font-semibold">{label}</p>
            {#each Array.from({ length: count }, (_, index) => index) as index (index)}
              <div class={ticket}>
                <span class={cx(bar, "w-3/4 bg-(--tpl-on-note)/20")}></span>
                <span class={cx(bar, "w-1/3", tone)}></span>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class={mapFrame} aria-hidden="true">
      <svg class="absolute inset-0 size-full" viewBox="0 0 400 300" fill="none">
        <path
          d="M40 250 C 110 230, 90 150, 170 140 S 260 60, 350 50"
          class="stroke-(--tpl-night) stroke-[6] [stroke-linecap:round]"
        />
        <path
          d="M40 250 C 110 230, 90 150, 170 140 S 260 60, 350 50"
          class="stroke-(--tpl-sun) stroke-[2] [stroke-dasharray:8_10] [stroke-linecap:round]"
        />
        <circle cx="40" cy="250" r="10" class="fill-(--tpl-pink)" />
        <circle cx="170" cy="140" r="8" class="fill-(--tpl-sun)" />
        <circle cx="350" cy="50" r="10" class="fill-(--tpl-mint)" />
      </svg>
      <div class={mapCard}>
        <div>
          <p class="text-[11px] opacity-80">Next transfer</p>
          <p class="text-sm font-semibold">Manggarai in 6 min</p>
        </div>
        <span
          class="rounded-full bg-(--tpl-mint) px-2 py-1 text-[10px] font-semibold text-(--tpl-on-note)"
          >Quiet car</span
        >
      </div>
    </div>
  {/if}
{/snippet}

{#snippet playArtOf(art: string)}
  {#if art === "toggle"}
    <div
      class={cx(playArt, "grid place-items-center bg-(--tpl-lilac)")}
      aria-hidden="true"
    >
      <div
        class="flex h-16 w-28 items-center justify-end rounded-full bg-(--tpl-on-note) p-2"
      >
        <div
          class="size-12 rounded-full bg-(--tpl-sun) shadow-[inset_-4px_-4px_0_rgb(0_0_0/0.15)]"
        ></div>
      </div>
    </div>
  {:else if art === "type"}
    <div
      class={cx(playArt, "grid place-items-center bg-(--tpl-sun)")}
      aria-hidden="true"
    >
      <span class="font-serif text-8xl text-(--tpl-on-note) italic">Aa</span>
    </div>
  {:else if art === "stripes"}
    <div
      class={cx(
        playArt,
        "bg-[repeating-linear-gradient(135deg,var(--tpl-pink)_0_18px,var(--tpl-coral)_18px_36px,var(--tpl-sky)_36px_54px,var(--tpl-mint)_54px_72px)]",
      )}
      aria-hidden="true"
    ></div>
  {:else}
    <div
      class={cx(playArt, "grid place-items-center bg-(--tpl-mint)")}
      aria-hidden="true"
    >
      <div
        class="relative size-28 rounded-full border-4 border-(--tpl-on-note) bg-(--tpl-polaroid)"
      >
        <span
          class="absolute bottom-1/2 left-1/2 h-9 w-1 origin-bottom -translate-x-1/2 rotate-[30deg] rounded-full bg-(--tpl-on-note)"
        ></span>
        <span
          class="absolute bottom-1/2 left-1/2 h-11 w-0.5 origin-bottom -translate-x-1/2 rotate-[200deg] rounded-full bg-(--tpl-coral)"
        ></span>
        <span
          class="absolute top-1/2 left-1/2 size-2.5 -translate-1/2 rounded-full bg-(--tpl-on-note)"
        ></span>
      </div>
    </div>
  {/if}
{/snippet}

<div bind:this={rootEl} class={cx(root, palette)}>
  {@html `<style>${motionCss}</style>`}
  <div class={sheet}>
    <header class={headerWrap}>
      <div class={navPill}>
        <span class={dots} aria-hidden="true">
          <span class={cx(dot, "bg-(--tpl-coral)")}></span>
          <span class={cx(dot, "bg-(--tpl-sun)")}></span>
          <span class={cx(dot, "bg-(--tpl-mint)")}></span>
        </span>
        <nav aria-label="Main" class={tabList}>
          {#each nav as item (item.id)}
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              class={cx(
                tabBase,
                active === item.id
                  ? cx(item.tone, "text-(--tpl-on-note)")
                  : tabIdle,
              )}
            >
              <span class={cx(tabDot, item.tone)}></span>
              {item.label}
            </a>
          {/each}
        </nav>
        <a href="#contact" class={contactPill}>Contact</a>
        <button
          type="button"
          class={menuButton}
          aria-expanded={menuOpen}
          aria-controls="studio-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onclick={() => (menuOpen = !menuOpen)}
        >
          {@render icon(menuOpen ? "close" : "menu", "size-4")}
        </button>
        {#if menuOpen}
          <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
          <nav
            id="studio-menu"
            aria-label="Mobile"
            class={menuPanel}
            onkeydown={(event) => event.key === "Escape" && (menuOpen = false)}
          >
            {#each nav as item (item.id)}
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                class={menuLink}
                onclick={() => (menuOpen = false)}
              >
                <span class={cx(tabDot, item.tone)}></span>
                {item.label}
              </a>
            {/each}
          </nav>
        {/if}
      </div>
    </header>

    <main class={content}>
      <section
        id="home"
        aria-labelledby="studio-hero-title"
        class={cx(hero, "scroll-mt-24")}
      >
        <div class={stage}>
          <svg
            class={lines}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M14 24 C 20 30, 24 34, 31 38"
              class="stroke-current [stroke-dasharray:4_4] [vector-effect:non-scaling-stroke]"
            />
            <path
              d="M84 34 C 78 38, 74 40, 69 44"
              class="stroke-current [stroke-dasharray:4_4] [vector-effect:non-scaling-stroke]"
            />
            <path
              d="M28 84 C 30 78, 32 74, 36 68"
              class="stroke-current [stroke-dasharray:4_4] [vector-effect:non-scaling-stroke]"
            />
          </svg>
          <div class={nameBox}>
            <span class={handle} aria-hidden="true"></span>
            <span class={handle} aria-hidden="true"></span>
            <span class={handle} aria-hidden="true"></span>
            <span class={handle} aria-hidden="true"></span>
            <svg
              class={pixelName}
              viewBox="0 0 289 69"
              role="img"
              aria-label="Rania Putri"
            >
              <path d={namePath} />
            </svg>
            <span class={sizeTag} aria-hidden="true">Rania Putri</span>
          </div>
          <ul class={noteList} aria-label="About me in three notes">
            {#each stickyNotes as note (note.text)}
              <li class={cx(noteBase, note.className)}>{note.text}</li>
            {/each}
          </ul>
        </div>
        <p class={status}>
          <span class={pingWrap} aria-hidden="true">
            <span class={ping}></span>
            <span class={pingDot}></span>
          </span>
          open to new work
        </p>
        <h1 id="studio-hero-title" class={heroTitle}>
          I design software that<span
            class={cx(iconTile, "rotate-6 bg-(--tpl-sun)")}
            >{@render icon("cursor", "size-5 md:size-6")}</span
          >gets out of<span class={cx(iconTile, "-rotate-6 bg-(--tpl-pink)")}
            >{@render icon("sparkle", "size-5 md:size-6")}</span
          >your way
        </h1>
        <p class={lead}>
          Product designer in Yogyakarta. I help small teams ship calm, useful
          tools for money, work, and getting around.
        </p>
        <div class={actions}>
          <a href="#contact" class={cx(linkButton, linkPrimary)}>
            Contact me
            {@render icon("arrow", "size-4")}
          </a>
          <a href="#work" class={cx(linkButton, linkSecondary)}
            >See case studies</a
          >
        </div>
      </section>

      <section id="about" aria-labelledby="studio-about-title" class={section}>
        <div class={aboutGrid}>
          <div class={aboutText} data-reveal="">
            <p class={kicker}>about me</p>
            <h2 id="studio-about-title" class={handHeading}>what&apos;s up?</h2>
            <p class={lead}>
              I am Rania. I spent eight years designing for banks, factories,
              and train operators, and I still get excited when a confusing form
              becomes <span class={marker}>one obvious button</span>.
            </p>
            <ul class={notesList}>
              {#each nowNotes as [key, text] (key)}
                <li class={noteRow}>
                  <span class={noteKey}>{key}</span>{text}
                </li>
              {/each}
            </ul>
          </div>
          <div class={photos} data-reveal="">
            <figure class={cx(polaroid, "top-0 left-0 -rotate-6")}>
              <span class={tape} aria-hidden="true"></span>
              <div
                class={cx(
                  photoArt,
                  "bg-[linear-gradient(var(--tpl-sky),var(--tpl-polaroid))]",
                )}
                role="img"
                aria-label="Illustration of Mount Merapi at sunrise"
              >
                <span
                  class="absolute top-6 right-8 size-12 rounded-full bg-(--tpl-sun)"
                ></span>
                <span
                  class="absolute inset-x-0 bottom-0 h-3/5 bg-(--tpl-mint) [clip-path:polygon(0_100%,0_55%,30%_10%,55%_60%,75%_30%,100%_70%,100%_100%)]"
                ></span>
                <span
                  class="absolute inset-x-0 bottom-0 h-1/3 bg-(--tpl-on-note)/80 [clip-path:polygon(0_100%,0_60%,40%_20%,70%_70%,100%_40%,100%_100%)]"
                ></span>
              </div>
              <figcaption class={caption}>Merapi, 5 am</figcaption>
            </figure>
            <figure class={cx(polaroid, "top-24 right-0 rotate-[5deg]")}>
              <span class={tape} aria-hidden="true"></span>
              <div
                class={cx(photoArt, "bg-(--tpl-pink)")}
                role="img"
                aria-label="Abstract portrait of Rania"
              >
                <span
                  class="absolute -bottom-10 left-1/2 h-32 w-40 -translate-x-1/2 rounded-t-full bg-(--tpl-coral)"
                ></span>
                <span
                  class="absolute top-8 left-1/2 flex size-24 -translate-x-1/2 items-center justify-center rounded-full bg-(--tpl-polaroid) text-2xl font-semibold text-(--tpl-on-note)"
                  >RP</span
                >
              </div>
              <figcaption class={caption}>me, mid sketch</figcaption>
            </figure>
          </div>
        </div>

        <div class={skillsBox} data-reveal="">
          <div class={skillsHead}>
            <h3 class={h2}>Things I am good at</h3>
            <p class={small}>Pick one to read more</p>
          </div>
          <div class={skillList}>
            {#each skills as item (item.id)}
              <button
                type="button"
                aria-pressed={skill === item.id}
                class={cx(
                  skillBase,
                  item.tone,
                  skill === item.id ? skillOn : skillIdle,
                )}
                onclick={() => (skill = item.id)}>{item.label}</button
              >
            {/each}
          </div>
          <div class={skillPanel} aria-live="polite">
            <p class={skillTitle}>{currentSkill.label}</p>
            <p class={small}>{currentSkill.detail}</p>
          </div>
        </div>
      </section>

      <section id="work" aria-labelledby="studio-work-title" class={section}>
        <div class={workHead} data-reveal="">
          <div>
            <p class={kicker}>selected work</p>
            <h2 id="studio-work-title" class={h2}>Case studies</h2>
          </div>
          <div class={filterGroup} role="group" aria-label="Filter projects">
            {#each filters as item (item.id)}
              <button
                type="button"
                aria-pressed={filter === item.id}
                class={cx(
                  filterBase,
                  filter === item.id ? filterOn : filterIdle,
                )}
                onclick={() => (filter = item.id)}>{item.label}</button
              >
            {/each}
          </div>
        </div>
        <p class={srOnly} aria-live="polite">
          {`${visible.length} ${visible.length === 1 ? "project" : "projects"}`}
        </p>
        <ul class={projectList} data-reveal="">
          {#each visible as item (item.id)}
            <li class={projectItem} data-project={item.id}>
              <span
                class={cx(folderTab, tones[item.tone].card)}
                aria-hidden="true">{item.number}</span
              >
              <article
                class={cx(projectCard, tones[item.tone].card)}
                aria-labelledby={`studio-${item.id}-title`}
              >
                <div class={projectText}>
                  <h3 id={`studio-${item.id}-title`} class={projectTitle}>
                    {item.name}
                  </h3>
                  <p class={cx(projectLead, tones[item.tone].lead)}>
                    {item.lead}
                  </p>
                  <ul class={chipList} aria-label="Tags">
                    {#each item.chips as chipText (chipText)}
                      <li class={cx(chip, tones[item.tone].chip)}>
                        {chipText}
                      </li>
                    {/each}
                  </ul>
                  <button
                    type="button"
                    class={cx(openButton, tones[item.tone].button)}
                    onclick={() => openCase(item.id)}
                  >
                    Read case study<span class={srOnly}
                      >{` for ${item.name}`}</span
                    >{@render icon("arrow", "size-4")}
                  </button>
                </div>
                <div class={mockStage}>{@render mockup(item.id)}</div>
              </article>
            </li>
          {/each}
        </ul>
        {#if !visible.length}
          <p class={emptyText}>No projects in this category yet.</p>
        {/if}
      </section>

      <section
        id="playground"
        aria-labelledby="studio-play-title"
        class={section}
      >
        <div data-reveal="">
          <p class={kicker}>small experiments</p>
          <h2 id="studio-play-title" class={h2}>Playground</h2>
          <p class={cx(lead, "mt-3")}>
            Weekend sketches in motion and type. Most of them never ship, all of
            them teach me something.
          </p>
        </div>
        <ul class={playGrid} data-reveal="">
          {#each playItems as item (item.title)}
            <li class={playTile}>
              {@render playArtOf(item.art)}
              <div>
                <p class="font-semibold">{item.title}</p>
                <p class={small}>{item.meta}</p>
              </div>
            </li>
          {/each}
        </ul>
      </section>

      <section
        id="contact"
        aria-labelledby="studio-contact-title"
        class={section}
      >
        <div class={contactGrid}>
          <div class={contactText} data-reveal="">
            <h2 id="studio-contact-title" class={handHeading}>say hello!</h2>
            <p class={lead}>
              Have a product that feels heavier than it should? Tell me about
              it. Short notes are perfect.
            </p>
            <a href="mailto:hello@rania.studio" class={mailLink}>
              {@render icon("mail", "size-5")}
              hello@rania.studio
            </a>
            <ul class={factList}>
              {#each contactFacts as item (item.text)}
                <li class={fact}>
                  <span class={cx(factIcon, item.tone)} aria-hidden="true"
                    >{@render icon(item.icon, "size-4")}</span
                  >
                  {item.text}
                </li>
              {/each}
            </ul>
          </div>
          <form
            class={form}
            novalidate
            aria-label="Contact form"
            onsubmit={submit}
            data-reveal=""
          >
            <div class={field}>
              <Input
                id="studio-name"
                label="Name"
                name="name"
                autocomplete="name"
                placeholder="Andi Pratama"
                bind:value={values.name}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "studio-name-error" : undefined}
              />
              {#if errors.name}
                <p id="studio-name-error" class={errorText}>{errors.name}</p>
              {/if}
            </div>
            <div class={field}>
              <Input
                id="studio-email"
                label="Email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="you@company.com"
                bind:value={values.email}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email
                  ? "studio-email-error"
                  : undefined}
              />
              {#if errors.email}
                <p id="studio-email-error" class={errorText}>{errors.email}</p>
              {/if}
            </div>
            <div class={field}>
              <Textarea
                id="studio-message"
                label="Project details"
                name="message"
                rows={4}
                placeholder="What are you building, and when?"
                bind:value={values.message}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message
                  ? "studio-message-error"
                  : undefined}
              />
              {#if errors.message}
                <p id="studio-message-error" class={errorText}>
                  {errors.message}
                </p>
              {/if}
            </div>
            <Button type="submit" size="lg">Send message</Button>
          </form>
        </div>
      </section>

      <footer class={footer}>
        <p>&copy; 2026 Rania Putri. Built with MarkasUI.</p>
        <nav aria-label="Footer" class={footerNav}>
          {#each footerLinks as link (link.label)}
            <a href={link.href} class={quietLink}>{link.label}</a>
          {/each}
          <a href="#home" class={quietLink}>Back to top</a>
        </nav>
      </footer>
    </main>
  </div>

  <Modal id={CASE_ID} title={project.name}>
    <div class={caseBody}>
      <dl class={caseMeta}>
        <div>
          <dt class={caseLabel}>Role</dt>
          <dd class={caseValue}>{project.role}</dd>
        </div>
        <div>
          <dt class={caseLabel}>Timeline</dt>
          <dd class={caseValue}>{project.timeline}</dd>
        </div>
        <div>
          <dt class={caseLabel}>Team</dt>
          <dd class={caseValue}>{project.team}</dd>
        </div>
      </dl>
      <p>{project.problem}</p>
      <ol class={caseSteps}>
        {#each project.steps as step (step)}
          <li>{step}</li>
        {/each}
      </ol>
      <div class={caseStats}>
        {#each project.stats as [value, label] (label)}
          <p class={caseStat}>
            <span class={caseNumber}>{value}</span>
            <span class={caseLabel}>{label}</span>
          </p>
        {/each}
      </div>
    </div>
    {#snippet footer()}
      <Button variant="secondary" type="submit">Done</Button>
      <Button onclick={nextCase}>Next project</Button>
    {/snippet}
  </Modal>
  <Toaster />
</div>
