<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import Button from "../../../components/button/Button.vue";
import Input from "../../../components/input/Input.vue";
import Select from "../../../components/select/Select.vue";
import Textarea from "../../../components/textarea/Textarea.vue";
import Toaster, { toast } from "../../../components/toast/Toast.vue";

/* Palet lokal. Hero adalah "foto" sehingga nadanya sama di terang dan gelap; kartu ilustrasi punya versi gelap. */
const palette = [
  "[--tpl-lime:#d7f35f] [--tpl-lime-ink:#1a2306] [--tpl-night:#10130f] [--tpl-snow:#ffffff] dark:[--tpl-lime:#cdeb55] dark:[--tpl-night:#0b0d0a]",
  "[--tpl-wood-1:#9a6743] [--tpl-wood-2:#4a2c1a] [--tpl-wood-3:#b27a52] [--tpl-ceil:#2a211a] [--tpl-glow:#fff3d6] [--tpl-floor:#3b2d24] [--tpl-table:#1d1714] [--tpl-table-2:#5a4536] [--tpl-screen:#1f2a2f] [--tpl-screen-2:#7cc4b6]",
  "[--tpl-skin-1:#c99a78] [--tpl-skin-2:#8d5f45] [--tpl-skin-3:#e2b996] [--tpl-shirt-1:#e9e6df] [--tpl-shirt-2:#2e3b4e] [--tpl-shirt-3:#6b7b5c] [--tpl-shirt-4:#a6403a]",
  "[--tpl-sand:#e8dccb] [--tpl-sand-3:#5e4a2e] [--tpl-sage:#c7d4c1] [--tpl-sage-3:#3b5237] [--tpl-sky:#c9dbe8] [--tpl-sky-3:#284459] [--tpl-clay:#e6c3ae] [--tpl-clay-3:#713a24] [--tpl-mauve:#d8c6e0] [--tpl-mauve-3:#4b3559]",
  "dark:[--tpl-sand:#3a3328] dark:[--tpl-sand-3:#c9b08a] dark:[--tpl-sage:#2f3a2e] dark:[--tpl-sage-3:#a9c2a2] dark:[--tpl-sky:#233441] dark:[--tpl-sky-3:#a3c2d9] dark:[--tpl-clay:#4a3227] dark:[--tpl-clay-3:#e2b39a] dark:[--tpl-mauve:#3a2f42] dark:[--tpl-mauve-3:#cdb4da]",
].join(" ");
const tones = {
  sand: "[--art-1:var(--tpl-sand)] [--art-3:var(--tpl-sand-3)]",
  sage: "[--art-1:var(--tpl-sage)] [--art-3:var(--tpl-sage-3)]",
  sky: "[--art-1:var(--tpl-sky)] [--art-3:var(--tpl-sky-3)]",
  clay: "[--art-1:var(--tpl-clay)] [--art-3:var(--tpl-clay-3)]",
  mauve: "[--art-1:var(--tpl-mauve)] [--art-3:var(--tpl-mauve-3)]",
};

/* Kelas */
const root =
  "min-h-dvh bg-canvas p-2 text-ink scroll-smooth sm:p-3 motion-reduce:scroll-auto";
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const reveal =
  "transition duration-700 ease-out motion-safe:[&:not([data-in])]:translate-y-6 motion-safe:[&:not([data-in])]:opacity-0 motion-reduce:transition-none";
const hero =
  "relative isolate flex min-h-[720px] flex-col overflow-hidden rounded-[28px] text-(--tpl-snow) lg:min-h-[780px]";
const room = "absolute inset-0 -z-10";
const wall =
  "absolute inset-0 bg-[repeating-linear-gradient(90deg,var(--tpl-wood-1)_0_18px,var(--tpl-wood-2)_18px_21px,var(--tpl-wood-3)_21px_38px,var(--tpl-wood-2)_38px_41px)]";
const wallShade =
  "absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--tpl-ceil)_70%,transparent),transparent_40%,color-mix(in_oklab,var(--tpl-ceil)_55%,transparent))]";
const ceiling = "absolute inset-x-0 top-0 h-[14%] bg-(--tpl-ceil)";
const lamp =
  "absolute top-[10%] h-1.5 w-[12%] -translate-x-1/2 rounded-full bg-(--tpl-glow) shadow-[0_0_48px_14px_var(--tpl-glow)]";
const screen =
  "absolute top-[24%] left-1/2 flex aspect-video w-[30%] max-w-[420px] -translate-x-1/2 items-end gap-[4%] rounded-md border-4 border-(--tpl-table) bg-(--tpl-screen) p-[3%]";
const screenBar = "flex-1 rounded-t-sm bg-(--tpl-screen-2)";
const floor = "absolute inset-x-0 bottom-0 h-[30%] bg-(--tpl-floor)";
const table =
  "absolute bottom-[6%] left-1/2 h-[24%] w-[78%] -translate-x-1/2 bg-[linear-gradient(180deg,var(--tpl-table-2),var(--tpl-table))] [clip-path:polygon(14%_0,86%_0,100%_100%,0_100%)]";
const person = "absolute w-[8%] min-w-11 -translate-x-1/2";
const head = "mx-auto aspect-square w-[42%] rounded-full";
const body = "mt-[6%] aspect-[5/4] w-full rounded-t-[48%]";
const overlay =
  "absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--tpl-night)_45%,transparent),color-mix(in_oklab,var(--tpl-night)_35%,transparent)_45%,color-mix(in_oklab,var(--tpl-night)_92%,transparent))]";
const headerWrap = "relative z-20 p-2 sm:p-3";
const navbar =
  "flex h-16 items-center justify-between gap-3 rounded-2xl bg-surface px-3 text-ink shadow-overlay sm:px-4";
const brand = `flex items-center gap-2.5 rounded-lg text-lg font-semibold tracking-tight ${focusRing}`;
const brandMark =
  "flex size-9 items-center justify-center rounded-xl bg-(--tpl-lime) text-(--tpl-lime-ink)";
const navLinks = "hidden items-center gap-1 lg:flex";
const navLink = `rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink motion-reduce:transition-none ${focusRing}`;
const navPill = `inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-subtle motion-reduce:transition-none ${focusRing}`;
const navDot = "size-1.5 rounded-full bg-ink";
const navTools = "flex items-center gap-2";
const iconButton = `flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-150 hover:bg-subtle motion-reduce:transition-none ${focusRing}`;
const limeBase = `inline-flex items-center justify-center gap-2 rounded-full bg-(--tpl-lime) px-5 text-sm font-semibold whitespace-nowrap text-(--tpl-lime-ink) transition-[filter] duration-150 hover:brightness-95 motion-reduce:transition-none`;
const heroFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime)";
const contactNav = `${limeBase} hidden h-10 sm:inline-flex ${focusRing}`;
const menuButton = `${iconButton} lg:hidden`;
const panel =
  "absolute inset-x-2 top-full mt-2 grid gap-3 rounded-2xl bg-surface p-3 text-ink shadow-overlay sm:inset-x-3";
const menuList = "grid gap-1";
const menuLink = `block rounded-xl px-3 py-2.5 text-base font-medium hover:bg-subtle ${focusRing}`;
const resultList = "grid gap-1";
const resultLink = `flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-subtle ${focusRing}`;
const resultTag =
  "shrink-0 rounded-full bg-subtle px-2.5 py-0.5 text-xs text-muted";
const muted = "text-sm text-muted";
const heroBody =
  "relative z-10 flex flex-1 flex-col justify-end gap-8 px-5 pt-10 pb-2 sm:px-8 lg:px-12";
const heroGrid = "grid items-end gap-8 lg:grid-cols-[1.9fr_1fr] lg:gap-12";
const heroIntro = "grid justify-items-start gap-6";
const eyebrow =
  "inline-flex items-center gap-2 rounded-full border border-(--tpl-snow)/30 bg-(--tpl-snow)/10 px-3 py-1 text-sm backdrop-blur";
const heroTitle =
  "max-w-4xl text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl lg:text-[76px]";
const heroLine =
  "mr-4 inline-block h-[3px] w-14 translate-y-[-0.3em] rounded-full bg-(--tpl-lime) sm:w-24";
const heroLead =
  "max-w-xl text-base text-pretty text-(--tpl-snow)/80 sm:text-lg";
const heroActions = "flex flex-wrap items-center gap-3";
const ghostLink = `inline-flex h-12 items-center gap-2 rounded-full border border-(--tpl-snow)/40 px-5 text-sm font-medium transition-colors duration-150 hover:bg-(--tpl-snow)/10 motion-reduce:transition-none ${heroFocus}`;
const ctaBig = `${limeBase} h-12 pr-2 pl-6 ${heroFocus}`;
const ctaArrow =
  "flex size-8 items-center justify-center rounded-full bg-(--tpl-lime-ink) text-(--tpl-lime)";
const tabPanel =
  "grid gap-3 rounded-3xl border border-(--tpl-snow)/20 bg-(--tpl-snow)/10 p-5 backdrop-blur-md";
const tabPanelTitle = "text-xl font-semibold tracking-tight";
const tabPanelText = "text-sm text-pretty text-(--tpl-snow)/80";
const tabStat =
  "flex items-center gap-2 border-t border-(--tpl-snow)/20 pt-3 text-sm font-medium";
const tabList = "grid grid-cols-3 border-t border-(--tpl-snow)/25";
const tab = `-mt-px grid gap-1 border-t-2 py-4 pr-3 text-left text-sm font-medium transition-colors duration-150 motion-reduce:transition-none sm:text-base ${heroFocus}`;
const tabIdle =
  "border-transparent text-(--tpl-snow)/65 hover:text-(--tpl-snow)";
const tabActive = "border-(--tpl-lime) text-(--tpl-snow)";
const tabNumber = "text-xs text-(--tpl-snow)/60";
const section = "mx-auto w-full max-w-[1320px] px-3 py-16 sm:px-6 lg:py-24";
const sectionHead =
  "mb-10 grid gap-4 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16";
const h2 =
  "text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl";
const lead = "max-w-xl text-base text-pretty text-muted";
const cardGrid = "grid gap-4 lg:grid-cols-3";
const greyCard =
  "flex min-h-[460px] flex-col gap-5 rounded-[28px] bg-subtle p-5 sm:p-6";
const limeCard =
  "flex min-h-[460px] flex-col gap-5 rounded-[28px] bg-(--tpl-lime) p-3 text-(--tpl-lime-ink) sm:p-3.5";
const chip =
  "inline-flex w-fit items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-medium";
const chipDark =
  "inline-flex w-fit items-center gap-2 rounded-full bg-(--tpl-lime-ink) px-3 py-1 text-xs font-medium text-(--tpl-lime)";
const h3 = "text-xl font-semibold tracking-tight text-balance sm:text-2xl";
const photo =
  "relative mt-auto min-h-[200px] flex-1 overflow-hidden rounded-[20px] bg-(--art-1)";
const deskLaptop =
  "absolute bottom-[18%] left-1/2 flex aspect-[16/10] w-[58%] -translate-x-1/2 items-end gap-[5%] rounded-t-lg border-[6px] border-b-0 border-(--art-3) bg-surface px-[6%] pt-[8%]";
const deskBar = "flex-1 rounded-t bg-(--art-3)";
const deskBase =
  "absolute bottom-[14%] left-1/2 h-[4%] w-[70%] -translate-x-1/2 rounded-b-lg bg-(--art-3)";
const deskTop = "absolute inset-x-0 bottom-0 h-[14%] bg-(--art-3)/30";
const deskCup =
  "absolute right-[8%] bottom-[14%] h-[16%] w-[8%] rounded-b-lg bg-surface";
const limePhoto =
  "relative min-h-[240px] flex-1 overflow-hidden rounded-[22px] bg-(--art-1)";
const artLayer = "absolute inset-0";
const blob =
  "absolute -top-[18%] -left-[14%] size-[62%] rounded-[58%_42%_63%_37%/49%_56%_44%_51%] bg-(--tpl-lime)";
const trophyCup =
  "absolute bottom-[34%] left-1/2 h-[32%] w-[26%] -translate-x-1/2 rounded-b-[45%] bg-(--art-3)";
const trophyStem =
  "absolute bottom-[22%] left-1/2 h-[12%] w-[6%] -translate-x-1/2 bg-(--art-3)";
const trophyBase =
  "absolute bottom-[16%] left-1/2 h-[7%] w-[22%] -translate-x-1/2 rounded-md bg-(--art-3)";
const trophyHandle =
  "absolute bottom-[44%] h-[16%] w-[10%] rounded-full border-[5px] border-(--art-3)";
const notch =
  "absolute -right-px -bottom-px flex size-[76px] items-end justify-end rounded-tl-[30px] bg-(--tpl-lime) p-2.5";
const notchLink = `flex size-14 items-center justify-center rounded-full bg-(--tpl-lime-ink) text-(--tpl-lime) ${focusRing}`;
const limeBody = "grid gap-3 px-2.5 pb-3";
const limeStat = "text-5xl font-semibold tracking-tight";
const limeMeta = "text-sm text-(--tpl-lime-ink)/80";
const avatarRow = "flex items-center";
const avatar =
  "-ml-2 flex size-11 items-center justify-center rounded-full border-2 border-subtle bg-(--art-1) text-sm font-semibold text-(--art-3) first:ml-0";
const avatarMore =
  "-ml-2 flex size-11 items-center justify-center rounded-full border-2 border-subtle bg-ink text-xs font-semibold text-canvas";
const cityList = "mt-auto grid grid-cols-2 gap-2";
const cityItem = "rounded-2xl bg-surface p-3";
const cityValue = "text-2xl font-semibold tracking-tight";
const arrowLink = `inline-flex w-fit items-center gap-2 rounded-full text-sm font-semibold underline decoration-line underline-offset-4 hover:decoration-ink ${focusRing}`;
const filterRow = "flex flex-wrap gap-2";
const filter = `h-9 rounded-full border px-4 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none ${focusRing}`;
const filterIdle = "border-line bg-surface text-muted hover:text-ink";
const filterActive = "border-primary bg-primary text-on-primary";
const serviceGrid = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";
const serviceCard =
  "group grid gap-4 rounded-[28px] border border-line bg-surface p-3";
const portrait =
  "relative aspect-[4/3] overflow-hidden rounded-[20px] bg-(--art-1)";
const portraitRings =
  "absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,var(--color-surface)_0_14%,transparent_15%)] opacity-60";
const portraitHead =
  "absolute bottom-[38%] left-1/2 size-[26%] -translate-x-1/2 rounded-full bg-(--art-3)";
const portraitBody =
  "absolute bottom-[-22%] left-1/2 h-[56%] w-[58%] -translate-x-1/2 rounded-t-[50%] bg-(--art-3)";
const portraitInitials =
  "absolute bottom-3 left-3 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold";
const badgeIcon =
  "absolute top-3 right-3 flex size-12 items-center justify-center rounded-full bg-(--tpl-lime) text-(--tpl-lime-ink) transition-transform duration-300 group-hover:rotate-45 motion-reduce:transition-none";
const serviceBody = "grid gap-2 px-2 pb-2";
const tagRow = "flex flex-wrap gap-1.5";
const tag = "rounded-full bg-subtle px-2.5 py-0.5 text-xs text-muted";
const statsBand =
  "grid gap-10 rounded-[28px] bg-(--tpl-night) p-6 text-(--tpl-snow) sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:p-14";
const statsGrid = "grid grid-cols-2 gap-x-6 gap-y-10";
const statValue =
  "text-4xl font-semibold tracking-tight text-(--tpl-lime) sm:text-5xl";
const statLabel = "mt-2 text-sm text-(--tpl-snow)/75";
const statsLead = "max-w-md text-base text-(--tpl-snow)/75";
const quoteGrid = "grid gap-4 lg:grid-cols-[1fr_2fr]";
const ratingCard =
  "flex flex-col justify-between gap-8 rounded-[28px] bg-(--tpl-lime) p-6 text-(--tpl-lime-ink) sm:p-8";
const ratingValue = "text-6xl font-semibold tracking-tight";
const stars = "flex gap-1";
const quoteCard =
  "flex flex-col justify-between gap-8 rounded-[28px] bg-subtle p-6 sm:p-10";
const quoteText =
  "text-xl leading-snug font-medium tracking-tight text-pretty sm:text-2xl lg:text-3xl";
const quoteFoot = "flex flex-wrap items-center justify-between gap-4";
const person2 = "flex items-center gap-3";
const quoteAvatar =
  "flex size-12 items-center justify-center rounded-full bg-(--art-1) text-sm font-semibold text-(--art-3)";
const controls = "flex items-center gap-3";
const roundButton = `flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-canvas motion-reduce:transition-none ${focusRing}`;
const counter = "min-w-10 text-center text-sm text-muted tabular-nums";
const dots = "flex gap-1.5";
const dotBase = "h-1.5 rounded-full transition-all duration-300";
const dotIdle = "w-1.5 bg-faint/40";
const dotActive = "w-6 bg-primary";
const contactGrid = "grid gap-10 lg:grid-cols-2 lg:gap-16";
const contactList = "mt-8 grid gap-4";
const contactItem = "flex items-start gap-3";
const contactIcon =
  "flex size-10 shrink-0 items-center justify-center rounded-full bg-(--tpl-lime) text-(--tpl-lime-ink)";
const formCard =
  "grid gap-4 rounded-[28px] border border-line bg-surface p-5 sm:grid-cols-2 sm:p-8";
const full = "sm:col-span-2";
const errorText = "text-sm text-danger sm:col-span-2";
const formFoot =
  "flex flex-wrap items-center justify-between gap-3 sm:col-span-2";
const footer =
  "grid gap-12 rounded-[28px] bg-(--tpl-night) px-6 pt-12 pb-6 text-(--tpl-snow) sm:px-10 lg:px-14 lg:pt-16";
const footerTop = "grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]";
const footerCta = `${limeBase} h-12 w-fit ${heroFocus}`;
const footerTitle =
  "max-w-md text-3xl font-semibold tracking-tight text-balance sm:text-4xl";
const footerHeading = "text-sm font-semibold";
const footerList = "mt-4 grid gap-2.5";
const footerLink = `rounded-sm text-sm text-(--tpl-snow)/70 hover:text-(--tpl-snow) ${heroFocus}`;
const footerBottom =
  "flex flex-wrap items-center justify-between gap-4 border-t border-(--tpl-snow)/15 pt-6 text-sm text-(--tpl-snow)/70";
const builtLink = `rounded-sm font-medium text-(--tpl-snow) underline decoration-(--tpl-snow)/40 underline-offset-4 hover:decoration-(--tpl-snow) ${heroFocus}`;
const srOnly = "sr-only";

// prettier-ignore
const icons = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  upRight: "M7 17 17 7M8 7h9v9",
  search: "m20 20-4.2-4.2M10.5 17.5a7 7 0 1 1 0-14 7 7 0 0 1 0 14z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  left: "m15 18-6-6 6-6",
  right: "m9 18 6-6-6-6",
  chart: "M4 19V5M4 19h16M8 15l4-4 3 3 5-6",
  shield: "M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z",
  bolt: "M13 3 5 14h6l-1 7 8-11h-6z",
  chip: "M8 8h8v8H8zM10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3",
  bag: "M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2",
  merge: "M6 4v5a6 6 0 0 0 6 6h6M18 15l-3-3M18 15l-3 3M6 20v-3",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  pin: "M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z",
  mark: "M5 19V5h7a4.5 4.5 0 0 1 0 9H5M12 14l6 5",
};
type IconName = keyof typeof icons;
type Tone = keyof typeof tones;

/* Data: identik di Blade, React, dan Vue. */
// prettier-ignore
const navItems = [
  { label: "Home", href: "#top" }, { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" }, { label: "About", href: "#about" },
];
// prettier-ignore
const insights = [
  { title: "Five pricing moves for 2027 budgets", tag: "Finance" },
  { title: "What the new OJK rules mean for lenders", tag: "Regulation" },
  { title: "Funding the energy transition in Java", tag: "Energy" },
  { title: "Running an AI pilot without the hype", tag: "Technology" },
];
// prettier-ignore
const heroTabs = [
  { id: "partner", label: "Trusted partner", title: "Advisors who stay for the long run", text: "One senior partner leads your account from the first workshop to the board meeting, so nothing gets lost between teams.", stat: "92% of clients renew after year one" },
  { id: "finance", label: "Financial services", title: "Sharper decisions for banks and lenders", text: "We help banks, multifinance firms, and fintechs price risk, meet OJK rules, and grow a healthier loan book.", stat: "Rp1.8T in loan portfolios restructured" },
  { id: "invest", label: "Investing", title: "Due diligence you can act on", text: "Our deal team reviews markets, models, and management in weeks, not months, before you commit capital.", stat: "140 deals reviewed since 2019" },
];
// prettier-ignore
const people = [
  { x: 24, y: 27, s: "skin-2", c: "shirt-2" }, { x: 36, y: 29, s: "skin-1", c: "shirt-1" },
  { x: 64, y: 29, s: "skin-3", c: "shirt-3" }, { x: 76, y: 27, s: "skin-1", c: "shirt-4" },
  { x: 6, y: -6, s: "skin-3", c: "shirt-1", big: true }, { x: 94, y: -6, s: "skin-2", c: "shirt-2", big: true },
];
const screenBars = [38, 54, 46, 70, 62, 88];
// prettier-ignore
const partners = [
  { initials: "SA", tone: "sage" }, { initials: "BP", tone: "sky" }, { initials: "LW", tone: "clay" }, { initials: "RP", tone: "mauve" },
] as const satisfies readonly { initials: string; tone: Tone }[];
// prettier-ignore
const cities = [{ value: "14", label: "Cities across Asia" }, { value: "120+", label: "Senior partners" }];
// prettier-ignore
const industries = ["All", "Finance", "Energy", "Technology", "Consumer"] as const;
type Industry = (typeof industries)[number];
// prettier-ignore
const services = [
  { title: "Corporate finance", lead: "Sekar Ayuningtyas", initials: "SA", tone: "sage", icon: "chart", tags: ["Finance"] },
  { title: "Risk and compliance", lead: "Bima Prasetyo", initials: "BP", tone: "sky", icon: "shield", tags: ["Finance", "Energy"] },
  { title: "Energy transition", lead: "Laras Wulandari", initials: "LW", tone: "sand", icon: "bolt", tags: ["Energy"] },
  { title: "Digital transformation", lead: "Raka Pratama", initials: "RP", tone: "mauve", icon: "chip", tags: ["Technology"] },
  { title: "Consumer growth", lead: "Ayu Lestari", initials: "AL", tone: "clay", icon: "bag", tags: ["Consumer"] },
  { title: "Mergers and acquisitions", lead: "Dimas Hartono", initials: "DH", tone: "sage", icon: "merge", tags: ["Finance", "Technology", "Consumer"] },
] as const satisfies readonly { title: string; lead: string; initials: string; tone: Tone; icon: IconName; tags: readonly Industry[] }[];
// prettier-ignore
const stats = [
  { value: "17", label: "Years advising Indonesian companies" },
  { value: "Rp4.2T", label: "Capital raised and advised" },
  { value: "320+", label: "Companies served across Asia" },
  { value: "98%", label: "Client retention in 2026" },
];
// prettier-ignore
const quotes = [
  { text: "Pranata rebuilt our credit model in six weeks. Our non-performing loans fell by a third within the year.", name: "Wulan Sari", role: "CFO, Bank Kertajaya", initials: "WS", tone: "sage" },
  { text: "They challenged every assumption in our plan, then stayed to help us deliver it. That is rare.", name: "Hendra Gunawan", role: "CEO, Nusa Energi", initials: "HG", tone: "sky" },
  { text: "The due diligence report was clear enough for our board and deep enough for our analysts.", name: "Citra Maharani", role: "Partner, Lintas Capital", initials: "CM", tone: "clay" },
  { text: "Our digital roadmap finally has owners, budgets, and dates. Revenue from the app doubled.", name: "Fajar Nugroho", role: "COO, Toko Raya", initials: "FN", tone: "mauve" },
] as const satisfies readonly { text: string; name: string; role: string; initials: string; tone: Tone }[];
// prettier-ignore
const contacts = [
  { icon: "mail", label: "Email", value: "hello@pranata.id" },
  { icon: "phone", label: "Phone", value: "+62 21 5080 1188" },
  { icon: "pin", label: "Office", value: "Menara Astra, Jl. Jend. Sudirman Kav. 5, Jakarta" },
] as const satisfies readonly { icon: IconName; label: string; value: string }[];
// prettier-ignore
const footerColumns = [
  { title: "Services", links: ["Corporate finance", "Risk and compliance", "Energy transition", "Digital transformation"] },
  { title: "Company", links: ["About us", "Careers", "Partners", "Press"] },
  { title: "Insights", links: ["Reports", "Events", "Newsletter", "Podcast"] },
];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORM_ERROR_ID = "konsultan-form-error";
const PANEL_ID = "konsultan-panel";
const emptyForm = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const rootRef = ref<HTMLDivElement>();
const menuOpen = ref(false);
const searchOpen = ref(false);
const query = ref("");
const tabIndex = ref(0);
const industry = ref<Industry>("All");
const quoteIndex = ref(0);
const form = ref({ ...emptyForm });
const error = ref({ field: "", message: "" });
const menuItems = [
  ...navItems,
  { label: "Insight", href: "#insight" },
  { label: "Contact us", href: "#contact" },
];
const lamps = [22, 50, 78];
const deskBars = [30, 48, 40, 66, 82];

// Animasi masuk saat elemen terlihat; tanpa animasi saat reduced motion (lihat kelas reveal).
let observer: IntersectionObserver | undefined;
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-in", "");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  rootRef.value
    ?.querySelectorAll("[data-reveal]")
    .forEach((node) => observer?.observe(node));
});
onBeforeUnmount(() => observer?.disconnect());

const results = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return insights.filter((item) =>
    `${item.title} ${item.tag}`.toLowerCase().includes(needle),
  );
});
const shown = computed(() =>
  services.filter(
    (item) =>
      industry.value === "All" ||
      (item.tags as readonly string[]).includes(industry.value),
  ),
);
const activeTab = computed(() => heroTabs[tabIndex.value]!);
const quote = computed(() => quotes[quoteIndex.value]!);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
  searchOpen.value = false;
}
function toggleSearch() {
  searchOpen.value = !searchOpen.value;
  menuOpen.value = false;
  void nextTick(() =>
    document.querySelector<HTMLInputElement>(`#${PANEL_ID} input`)?.focus(),
  );
}
function closePanels() {
  menuOpen.value = false;
  searchOpen.value = false;
}
function onTabKey(event: KeyboardEvent) {
  const step = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[
    event.key
  ];
  if (!step) return;
  event.preventDefault();
  const next = (tabIndex.value + step + heroTabs.length) % heroTabs.length;
  tabIndex.value = next;
  void nextTick(() =>
    document.getElementById(`konsultan-tab-${heroTabs[next]!.id}`)?.focus(),
  );
}
function moveQuote(step: number) {
  quoteIndex.value = (quoteIndex.value + step + quotes.length) % quotes.length;
}
function submit() {
  const name = form.value.name.trim();
  const email = form.value.email.trim();
  if (!name) {
    error.value = { field: "name", message: "Tell us your name." };
    return;
  }
  if (!EMAIL_PATTERN.test(email)) {
    error.value = {
      field: "email",
      message: "Enter a valid email address, like you@company.com.",
    };
    return;
  }
  error.value = { field: "", message: "" };
  form.value = { ...emptyForm };
  toast({
    title: "Request received",
    description: `Thanks, ${name.split(" ")[0]}. A partner will reply within one business day.`,
    variant: "success",
  });
}
const invalid = (field: string) =>
  error.value.field === field
    ? { "aria-invalid": "true", "aria-describedby": FORM_ERROR_ID }
    : {};
</script>

<template>
  <div ref="rootRef" :class="cx(root, palette)">
    <section id="top" :class="hero" aria-label="Introduction">
      <div
        :class="room"
        role="img"
        aria-label="Illustration of a boardroom with wooden slat walls, where six people meet around a long table"
      >
        <div :class="wall" />
        <div :class="wallShade" />
        <div :class="ceiling" />
        <div
          v-for="left in lamps"
          :key="left"
          :class="lamp"
          :style="{ left: `${left}%` }"
        />
        <div :class="screen">
          <div
            v-for="height in screenBars"
            :key="height"
            :class="screenBar"
            :style="{ height: `${height}%` }"
          />
        </div>
        <div :class="floor" />
        <template v-for="layer in [false, true]" :key="String(layer)">
          <div v-if="layer" :class="table" />
          <div
            v-for="item in people.filter((p) => !!p.big === layer)"
            :key="item.x"
            :class="person"
            :style="{
              left: `${item.x}%`,
              bottom: `${item.y}%`,
              width: item.big ? '15%' : undefined,
            }"
          >
            <div
              :class="head"
              :style="{ background: `var(--tpl-${item.s})` }"
            />
            <div
              :class="body"
              :style="{ background: `var(--tpl-${item.c})` }"
            />
          </div>
        </template>
      </div>
      <div :class="overlay" aria-hidden="true" />
      <header :class="headerWrap">
        <nav aria-label="Main" :class="navbar">
          <a href="#top" :class="brand">
            <span :class="brandMark" aria-hidden="true">
              <svg
                class="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path :d="icons.mark" />
              </svg>
            </span>
            Pranata
          </a>
          <div :class="navLinks">
            <a
              v-for="item in navItems"
              :key="item.href"
              :href="item.href"
              :class="navLink"
              >{{ item.label }}</a
            >
            <a href="#insight" :class="navPill">
              <span :class="navDot" aria-hidden="true" />
              Insight
            </a>
          </div>
          <div :class="navTools">
            <button
              type="button"
              :class="iconButton"
              aria-label="Search"
              :aria-expanded="searchOpen"
              :aria-controls="PANEL_ID"
              @click="toggleSearch"
            >
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path :d="icons[searchOpen ? 'close' : 'search']" />
              </svg>
            </button>
            <a href="#contact" :class="contactNav">Contact us</a>
            <button
              type="button"
              :class="menuButton"
              aria-label="Menu"
              :aria-expanded="menuOpen"
              :aria-controls="PANEL_ID"
              @click="toggleMenu"
            >
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path :d="icons[menuOpen ? 'close' : 'menu']" />
              </svg>
            </button>
          </div>
        </nav>
        <div
          v-if="menuOpen || searchOpen"
          :id="PANEL_ID"
          :class="panel"
          @keydown.esc="closePanels"
        >
          <ul v-if="menuOpen" :class="menuList">
            <li v-for="item in menuItems" :key="item.href">
              <a :href="item.href" :class="menuLink" @click="closePanels">{{
                item.label
              }}</a>
            </li>
          </ul>
          <template v-else>
            <Input
              v-model="query"
              type="search"
              label="Search insights"
              placeholder="Try energy or pricing"
            />
            <p :class="muted" aria-live="polite">
              {{
                results.length
                  ? `${results.length} ${results.length === 1 ? "article" : "articles"}`
                  : "No articles match your search."
              }}
            </p>
            <ul :class="resultList">
              <li v-for="item in results" :key="item.title">
                <a href="#insight" :class="resultLink" @click="closePanels">
                  {{ item.title }}
                  <span :class="resultTag">{{ item.tag }}</span>
                </a>
              </li>
            </ul>
          </template>
        </div>
      </header>
      <div :class="heroBody">
        <div :class="heroGrid">
          <div :class="heroIntro">
            <p :class="eyebrow">Advisory firm since 2009</p>
            <h1 :class="heroTitle">
              Your trusted<br /><span
                :class="heroLine"
                aria-hidden="true"
              />consulting partner
            </h1>
            <p :class="heroLead">
              Strategy, finance, and transformation advice for Indonesian
              companies that want to grow with confidence.
            </p>
            <div :class="heroActions">
              <a href="#contact" :class="ctaBig">
                Book a consultation
                <span :class="ctaArrow" aria-hidden="true">
                  <svg
                    class="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path :d="icons.upRight" />
                  </svg>
                </span>
              </a>
              <a href="#services" :class="ghostLink">Explore services</a>
            </div>
          </div>
          <div
            id="konsultan-tabpanel"
            role="tabpanel"
            :aria-labelledby="`konsultan-tab-${activeTab.id}`"
            :class="tabPanel"
          >
            <h2 :class="tabPanelTitle">{{ activeTab.title }}</h2>
            <p :class="tabPanelText">{{ activeTab.text }}</p>
            <p :class="tabStat">
              <svg
                class="size-4 text-(--tpl-lime)"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path :d="icons.upRight" />
              </svg>
              {{ activeTab.stat }}
            </p>
          </div>
        </div>
        <div
          role="tablist"
          aria-label="Why Pranata"
          :class="tabList"
          @keydown="onTabKey"
        >
          <button
            v-for="(item, index) in heroTabs"
            :id="`konsultan-tab-${item.id}`"
            :key="item.id"
            type="button"
            role="tab"
            :aria-selected="index === tabIndex"
            aria-controls="konsultan-tabpanel"
            :tabindex="index === tabIndex ? 0 : -1"
            :class="cx(tab, index === tabIndex ? tabActive : tabIdle)"
            @click="tabIndex = index"
          >
            <span :class="tabNumber">0{{ index + 1 }}</span>
            {{ item.label }}
          </button>
        </div>
      </div>
    </section>

    <main>
      <section
        id="services"
        :class="section"
        aria-labelledby="konsultan-services"
      >
        <div :class="cx(sectionHead, reveal)" data-reveal="">
          <h2 id="konsultan-services" :class="h2">
            Advice that moves the numbers, not just the slides
          </h2>
          <p :class="lead">
            From the first diagnostic to the final rollout, our partners work
            inside your team and measure success the way your board does.
          </p>
        </div>
        <div :class="cardGrid">
          <article :class="cx(greyCard, reveal)" data-reveal="">
            <span :class="chip">Strategy</span>
            <h3 :class="h3">Growth plans built on real market data</h3>
            <p :class="muted">
              We size the market, test the pricing, and turn it into a three
              year plan your managers can own.
            </p>
            <div
              :class="cx(photo, tones.sand)"
              role="img"
              aria-label="A laptop showing a rising bar chart on a desk next to a coffee cup"
            >
              <div :class="deskTop" />
              <div :class="deskLaptop">
                <div
                  v-for="height in deskBars"
                  :key="height"
                  :class="deskBar"
                  :style="{ height: `${height}%` }"
                />
              </div>
              <div :class="deskBase" />
              <div :class="deskCup" />
            </div>
          </article>
          <article :class="cx(limeCard, reveal)" data-reveal="">
            <div :class="cx(limePhoto, tones.sage)">
              <div
                :class="artLayer"
                role="img"
                aria-label="A trophy on a pedestal, framed by an organic lime shape"
              >
                <div :class="blob" />
                <div :class="trophyCup" />
                <div :class="cx(trophyHandle, 'left-[30%]')" />
                <div :class="cx(trophyHandle, 'right-[30%]')" />
                <div :class="trophyStem" />
                <div :class="trophyBase" />
              </div>
              <div :class="notch">
                <a
                  href="#about"
                  :class="notchLink"
                  aria-label="Read about our recognition"
                >
                  <svg
                    class="size-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path :d="icons.upRight" />
                  </svg>
                </a>
              </div>
            </div>
            <div :class="limeBody">
              <span :class="chipDark">Recognition</span>
              <h3 :class="h3">Named a top advisory firm in Southeast Asia</h3>
              <p :class="limeStat">No. 4</p>
              <p :class="limeMeta">Asia Business Review ranking, 2026</p>
            </div>
          </article>
          <article :class="cx(greyCard, reveal)" data-reveal="">
            <span :class="chip">Our people</span>
            <div :class="avatarRow">
              <span
                v-for="item in partners"
                :key="item.initials"
                :class="cx(avatar, tones[item.tone])"
                aria-hidden="true"
                >{{ item.initials }}</span
              >
              <span :class="avatarMore" aria-hidden="true">+116</span>
            </div>
            <h3 :class="h3">Senior partners who have run companies</h3>
            <p :class="muted">
              Former CFOs, bankers, and engineers who sit at your table, not
              behind a junior team.
            </p>
            <dl :class="cityList">
              <div v-for="item in cities" :key="item.label" :class="cityItem">
                <dt :class="muted">{{ item.label }}</dt>
                <dd :class="cityValue">{{ item.value }}</dd>
              </div>
            </dl>
            <a href="#industries" :class="arrowLink">
              Meet the team
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path :d="icons.arrow" />
              </svg>
            </a>
          </article>
        </div>
      </section>

      <section
        id="industries"
        :class="section"
        aria-labelledby="konsultan-industries"
      >
        <div :class="cx(sectionHead, reveal)" data-reveal="">
          <h2 id="konsultan-industries" :class="h2">
            We champion the bold to achieve the extraordinary
          </h2>
          <div class="grid gap-5">
            <p :class="lead">
              Each practice is led by a partner with at least fifteen years in
              the field. Filter by industry to find the right team.
            </p>
            <div
              :class="filterRow"
              role="group"
              aria-label="Filter by industry"
            >
              <button
                v-for="item in industries"
                :key="item"
                type="button"
                :aria-pressed="industry === item"
                :class="
                  cx(filter, industry === item ? filterActive : filterIdle)
                "
                @click="industry = item"
              >
                {{ item }}
              </button>
            </div>
          </div>
        </div>
        <p :class="srOnly" aria-live="polite">
          {{
            `Showing ${shown.length} ${shown.length === 1 ? "practice" : "practices"}`
          }}
        </p>
        <ul :class="cx(serviceGrid, reveal)" data-reveal="">
          <li v-for="item in shown" :key="item.title" :class="serviceCard">
            <div :class="cx(portrait, tones[item.tone])">
              <div :class="portraitRings" />
              <div :class="portraitHead" />
              <div :class="portraitBody" />
              <span :class="portraitInitials" aria-hidden="true">{{
                item.initials
              }}</span>
              <span :class="badgeIcon" aria-hidden="true">
                <svg
                  class="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path :d="icons[item.icon]" />
                </svg>
              </span>
            </div>
            <div :class="serviceBody">
              <h3 class="text-lg font-semibold tracking-tight">
                {{ item.title }}
              </h3>
              <p :class="muted">Led by {{ item.lead }}</p>
              <div :class="tagRow">
                <span v-for="name in item.tags" :key="name" :class="tag">{{
                  name
                }}</span>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <section id="about" :class="section" aria-labelledby="konsultan-about">
        <div :class="cx(statsBand, reveal)" data-reveal="">
          <div class="grid content-start gap-5">
            <h2 id="konsultan-about" :class="h2">
              Numbers our clients can take to the bank
            </h2>
            <p :class="statsLead">
              Pranata started in a small Jakarta office in 2009. Today we advise
              listed companies, family businesses, and state owned enterprises
              across Asia.
            </p>
          </div>
          <dl :class="statsGrid">
            <div v-for="item in stats" :key="item.label">
              <dt class="sr-only">{{ item.label }}</dt>
              <dd :class="statValue">{{ item.value }}</dd>
              <dd :class="statLabel" aria-hidden="true">{{ item.label }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        id="insight"
        :class="section"
        aria-labelledby="konsultan-insight"
      >
        <div :class="cx(sectionHead, reveal)" data-reveal="">
          <h2 id="konsultan-insight" :class="h2">
            What leaders say after working with us
          </h2>
          <p :class="lead">
            Independent reviews from the executives we advised in the last two
            years.
          </p>
        </div>
        <div :class="cx(quoteGrid, reveal)" data-reveal="">
          <div :class="ratingCard">
            <div :class="stars" role="img" aria-label="Rated 4.9 out of 5">
              <svg
                v-for="n in 5"
                :key="n"
                class="size-5 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path :d="icons.star" />
              </svg>
            </div>
            <div>
              <p :class="ratingValue">4.9</p>
              <p :class="limeMeta">Average rating from 210 client reviews</p>
            </div>
          </div>
          <div
            :class="quoteCard"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            <figure
              class="grid gap-8"
              aria-live="polite"
              aria-roledescription="slide"
              :aria-label="`${quoteIndex + 1} of ${quotes.length}`"
            >
              <blockquote :class="quoteText">“{{ quote.text }}”</blockquote>
              <figcaption :class="person2">
                <span
                  :class="cx(quoteAvatar, tones[quote.tone])"
                  aria-hidden="true"
                  >{{ quote.initials }}</span
                >
                <span>
                  <span class="block font-semibold">{{ quote.name }}</span>
                  <span :class="muted">{{ quote.role }}</span>
                </span>
              </figcaption>
            </figure>
            <div :class="quoteFoot">
              <div :class="dots" aria-hidden="true">
                <span
                  v-for="(item, index) in quotes"
                  :key="item.name"
                  :class="
                    cx(dotBase, index === quoteIndex ? dotActive : dotIdle)
                  "
                />
              </div>
              <div :class="controls">
                <button
                  type="button"
                  :class="roundButton"
                  aria-label="Previous testimonial"
                  @click="moveQuote(-1)"
                >
                  <svg
                    class="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path :d="icons.left" />
                  </svg>
                </button>
                <span :class="counter"
                  >{{ quoteIndex + 1 }} / {{ quotes.length }}</span
                >
                <button
                  type="button"
                  :class="roundButton"
                  aria-label="Next testimonial"
                  @click="moveQuote(1)"
                >
                  <svg
                    class="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path :d="icons.right" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        :class="section"
        aria-labelledby="konsultan-contact"
      >
        <div :class="contactGrid">
          <div :class="reveal" data-reveal="">
            <h2 id="konsultan-contact" :class="h2">
              Book a free 30 minute consultation
            </h2>
            <p :class="cx(lead, 'mt-5')">
              Tell us where you want to be in three years. A partner will call
              you back within one business day.
            </p>
            <ul :class="contactList">
              <li
                v-for="item in contacts"
                :key="item.label"
                :class="contactItem"
              >
                <span :class="contactIcon" aria-hidden="true">
                  <svg
                    class="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path :d="icons[item.icon]" />
                  </svg>
                </span>
                <span>
                  <span :class="cx(muted, 'block')">{{ item.label }}</span>
                  <span class="font-medium">{{ item.value }}</span>
                </span>
              </li>
            </ul>
          </div>
          <form
            :class="cx(formCard, reveal)"
            data-reveal=""
            novalidate
            aria-label="Consultation request"
            @submit.prevent="submit"
          >
            <Input
              v-model="form.name"
              label="Full name"
              name="name"
              autocomplete="name"
              v-bind="invalid('name')"
            />
            <Input
              v-model="form.email"
              label="Work email"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="you@company.com"
              v-bind="invalid('email')"
            />
            <Input
              v-model="form.company"
              label="Company"
              name="company"
              autocomplete="organization"
            />
            <Select v-model="form.service" label="Service" name="service">
              <option value="">Not sure yet</option>
              <option
                v-for="item in services"
                :key="item.title"
                :value="item.title"
              >
                {{ item.title }}
              </option>
            </Select>
            <div :class="full">
              <Textarea
                v-model="form.message"
                label="What would you like to discuss?"
                name="message"
                :rows="4"
              />
            </div>
            <p v-if="error.message" :id="FORM_ERROR_ID" :class="errorText">
              {{ error.message }}
            </p>
            <div :class="formFoot">
              <p :class="muted">We reply within one business day.</p>
              <Button type="submit">Send request</Button>
            </div>
          </form>
        </div>
      </section>
    </main>

    <footer :class="footer">
      <div :class="footerTop">
        <div class="grid content-start gap-6">
          <p :class="footerTitle">Ready to make your next bold move?</p>
          <a href="#contact" :class="footerCta">Contact us</a>
        </div>
        <nav
          v-for="column in footerColumns"
          :key="column.title"
          :aria-label="column.title"
        >
          <h2 :class="footerHeading">{{ column.title }}</h2>
          <ul :class="footerList">
            <li v-for="link in column.links" :key="link">
              <a href="#top" :class="footerLink">{{ link }}</a>
            </li>
          </ul>
        </nav>
      </div>
      <div :class="footerBottom">
        <p>© 2026 Pranata Advisory. Jakarta, Indonesia.</p>
        <p>
          Built with
          <a href="https://markasui.pages.dev" :class="builtLink">MarkasUI</a>
        </p>
      </div>
    </footer>
    <Toaster />
  </div>
</template>
