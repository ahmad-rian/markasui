"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { Input } from "../../../components/input/Input";
import { Toaster, toast } from "../../../components/toast/Toast";

/* Palet lokal: langit biru muda, biru merek, dan nada status, terang dan gelap. */
const palette =
  "[--tpl-sky-1:#c9def9] [--tpl-sky-2:#e4eefc] [--tpl-cloud:#ffffff] [--tpl-blue:#1d56d6] [--tpl-blue-ink:#1747b0] [--tpl-blue-soft:#e2ebfd] [--tpl-on:#ffffff] [--tpl-glass:#ffffffd1] [--tpl-glass-line:#ffffff] [--tpl-mint:#dcf5e6] [--tpl-mint-ink:#14532d] [--tpl-amber:#fdf0cc] [--tpl-amber-ink:#7a4a05] [--tpl-av1:#c7dafd] [--tpl-av2:#fbd5dd] [--tpl-av3:#fde7a6] [--tpl-av4:#c4eed9] [--tpl-av-ink:#1f2937] [--tpl-error:#b42318] [--tpl-shadow:0_24px_48px_-24px_#1e3a8a40] dark:[--tpl-sky-1:#0c1a33] dark:[--tpl-sky-2:#0d1524] dark:[--tpl-cloud:#ffffff12] dark:[--tpl-blue-ink:#9dbcff] dark:[--tpl-blue-soft:#172a4d] dark:[--tpl-glass:#141a24d9] dark:[--tpl-glass-line:#ffffff1a] dark:[--tpl-mint:#123626] dark:[--tpl-mint-ink:#a7f3d0] dark:[--tpl-amber:#3a2a0c] dark:[--tpl-amber-ink:#fcd34d] dark:[--tpl-shadow:0_24px_48px_-24px_#00000099]";
const keyframes =
  "@keyframes tender-float{to{transform:translateY(-8px)}}@keyframes tender-drift{to{transform:translateX(24px)}}@media (prefers-reduced-motion:no-preference){[data-reveal-ready] [data-reveal]:not([data-shown]){opacity:0;transform:translateY(24px)}}[data-reveal]{transition:opacity .7s ease-out,transform .7s ease-out}";

/* Kelas */
const root = `${palette} relative min-h-dvh overflow-x-clip bg-canvas text-ink`;
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const sky =
  "absolute inset-x-0 top-0 -z-0 h-[1100px] bg-linear-to-b from-(--tpl-sky-1) via-(--tpl-sky-2) to-canvas";
const cloud =
  "absolute rounded-full bg-(--tpl-cloud) blur-2xl animate-[tender-drift_14s_ease-in-out_infinite_alternate] motion-reduce:animate-none";
const headerWrap = "sticky top-4 z-30 px-4";
const navBar =
  "relative mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 rounded-full border border-(--tpl-glass-line) bg-(--tpl-glass) py-2 pr-2 pl-5 shadow-(--tpl-shadow) backdrop-blur-xl";
const brand = `flex items-center gap-2 rounded-full text-base font-semibold tracking-tight ${focusRing}`;
const brandMark =
  "flex size-7 items-center justify-center rounded-lg bg-(--tpl-blue) text-(--tpl-on)";
const navList = "hidden items-center gap-1 lg:flex";
const navLink = `inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-150 ${focusRing}`;
const navIdle = "text-muted hover:text-ink";
const navActive = "bg-primary-soft text-primary";
const navActions = "flex items-center gap-1";
const loginLink = `hidden h-9 items-center rounded-full px-3.5 text-sm font-medium text-ink hover:bg-subtle sm:inline-flex ${focusRing}`;
const ctaLink = `inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const ctaLarge = `inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-semibold whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const ghostLarge = `inline-flex h-12 items-center justify-center gap-2 rounded-full border border-(--tpl-glass-line) bg-(--tpl-glass) px-6 text-base font-semibold whitespace-nowrap text-ink shadow-(--tpl-shadow) transition-colors duration-150 hover:bg-surface ${focusRing}`;
const menuButton = `inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-subtle lg:hidden ${focusRing}`;
const mobileMenu =
  "absolute inset-x-0 top-16 grid gap-1 rounded-3xl border border-line bg-surface p-3 shadow-overlay lg:hidden";
const mobileLink = `flex h-11 items-center rounded-2xl px-4 text-base font-medium ${focusRing}`;
const heroSection = "relative px-4 pt-16 text-center sm:pt-20";
const heroInner = "relative mx-auto grid max-w-6xl justify-items-center gap-6";
const eyebrow =
  "inline-flex items-center gap-2 rounded-full border border-(--tpl-glass-line) bg-(--tpl-glass) py-1 pr-3 pl-1 text-sm font-medium shadow-(--tpl-shadow)";
const eyebrowTag =
  "rounded-full bg-(--tpl-blue) px-2 py-0.5 text-xs font-semibold text-(--tpl-on)";
const heroTitle =
  "text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl";
const highlight = "text-(--tpl-blue-ink)";
const highlightLine = "text-(--tpl-blue-ink) lg:block";
const heroLead = "max-w-2xl text-lg text-pretty text-muted";
const heroActions = "flex flex-wrap justify-center gap-3";
const heroNote = "text-sm text-muted";
const stage =
  "relative mx-auto mt-14 max-w-6xl px-0 sm:mt-16 lg:mb-10 lg:px-20";
const tilt =
  "origin-top [transform:perspective(2200px)_rotateX(16deg)] rounded-[28px] border border-(--tpl-glass-line) bg-(--tpl-glass) p-2 shadow-(--tpl-shadow) backdrop-blur-xl";
const dash =
  "grid overflow-hidden rounded-[22px] border border-line bg-surface text-left md:grid-cols-[180px_minmax(0,1fr)]";
const dashSide =
  "hidden gap-1 border-r border-line bg-subtle/60 p-4 md:grid md:content-start";
const dashSideItem =
  "flex h-9 items-center gap-2.5 rounded-xl px-3 text-sm font-medium";
const dashMain = "grid min-w-0 grid-cols-1 content-start gap-4 p-4 sm:p-5";
const dashStat = "grid gap-1 rounded-2xl border border-line p-2.5 sm:p-3";
const dashCard =
  "grid grid-cols-1 content-start gap-3 rounded-2xl border border-line p-4";
const float =
  "absolute z-10 hidden rounded-2xl border border-(--tpl-glass-line) bg-(--tpl-glass) p-4 text-left shadow-(--tpl-shadow) backdrop-blur-xl lg:block animate-[tender-float_3.4s_ease-in-out_infinite_alternate] motion-reduce:animate-none";
const pill =
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap";
const mintPill = `${pill} bg-(--tpl-mint) text-(--tpl-mint-ink)`;
const amberPill = `${pill} bg-(--tpl-amber) text-(--tpl-amber-ink)`;
const bluePill = `${pill} bg-(--tpl-blue-soft) text-(--tpl-blue-ink)`;
const face =
  "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-(--tpl-av-ink) select-none";
const faceTones = [
  "bg-(--tpl-av1)",
  "bg-(--tpl-av2)",
  "bg-(--tpl-av3)",
  "bg-(--tpl-av4)",
];
const trust = "mx-auto mt-16 grid max-w-5xl justify-items-center gap-5 px-4";
const statPill =
  "inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm shadow-(--tpl-shadow)";
const section = "mx-auto max-w-6xl scroll-mt-28 px-4 py-20 sm:py-24";
const sectionHead =
  "mx-auto grid max-w-2xl justify-items-center gap-4 text-center";
const kicker =
  "inline-flex items-center gap-2 rounded-full bg-(--tpl-blue-soft) px-3 py-1 text-sm font-semibold text-(--tpl-blue-ink)";
const h2 = "text-3xl font-semibold tracking-tight text-balance sm:text-5xl";
const lead = "text-lg text-pretty text-muted";
const stepGrid = "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4";
const stepCard =
  "relative grid content-start gap-4 rounded-3xl border border-line bg-surface p-6 shadow-(--tpl-shadow)";
const stepTop = "flex items-center justify-between";
const stepIcon =
  "flex size-12 items-center justify-center rounded-2xl bg-(--tpl-blue-soft) text-(--tpl-blue-ink)";
const stepNumber = "text-sm font-semibold text-muted";
const cardTitle = "text-lg font-semibold tracking-tight";
const cardText = "text-sm text-pretty text-muted";
const featureGrid = "mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3";
const featureCard =
  "grid content-start gap-5 rounded-3xl border border-line bg-surface p-6 shadow-(--tpl-shadow)";
const featureHot =
  "grid content-between gap-6 rounded-3xl bg-(--tpl-blue) p-6 text-(--tpl-on) shadow-(--tpl-shadow) md:col-span-2 lg:col-span-1 lg:row-span-2";
const mini = "grid gap-2 rounded-2xl border border-line bg-canvas p-3";
const miniRow =
  "flex items-center gap-2.5 rounded-xl bg-surface px-3 py-2 text-sm";
const hotText = "text-sm text-pretty text-(--tpl-on)/85";
const hotEditor =
  "grid gap-3 rounded-2xl bg-(--tpl-on) p-4 text-sm text-(--tpl-av-ink) shadow-(--tpl-shadow)";
const hotButton = `inline-flex h-11 items-center justify-center gap-2 rounded-full bg-(--tpl-on) px-5 text-sm font-semibold text-(--tpl-blue) transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-on)`;
const sectorPanel =
  "mt-10 grid gap-6 rounded-[32px] border border-line bg-surface p-4 shadow-(--tpl-shadow) sm:p-6 lg:grid-cols-[280px_minmax(0,1fr)]";
const tabList = "flex gap-1 overflow-x-auto lg:grid lg:content-start";
const tab = `flex h-11 shrink-0 items-center gap-3 rounded-2xl px-4 text-left text-sm font-medium whitespace-nowrap transition-colors duration-150 ${focusRing}`;
const tabOn = "bg-primary text-on-primary";
const tabOff = "text-muted hover:bg-subtle hover:text-ink";
const tenderRow =
  "grid gap-3 rounded-2xl border border-line p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center";
const toggleWrap =
  "mt-8 inline-flex items-center gap-1 rounded-full border border-line bg-surface p-1 shadow-(--tpl-shadow)";
const toggleItem = `inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-150 ${focusRing}`;
const priceGrid = "mt-10 grid gap-4 lg:grid-cols-3";
const priceCard =
  "relative grid content-start gap-6 rounded-3xl border border-line bg-surface p-6 shadow-(--tpl-shadow)";
const priceHot = "ring-2 ring-primary";
const priceValue = "text-4xl font-semibold tracking-tight tabular-nums";
const planButton = `inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition-colors duration-150 ${focusRing}`;
const planPrimary = "bg-primary text-on-primary hover:bg-primary-strong";
const planSecondary = "border border-line bg-surface text-ink hover:bg-subtle";
const checkList = "grid gap-3 text-sm";
const checkIcon =
  "flex size-5 shrink-0 items-center justify-center rounded-full bg-(--tpl-blue-soft) text-(--tpl-blue-ink)";
const faqWrap = "mt-12 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]";
const resourceLink = `group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const faqItem =
  "group rounded-2xl border border-line bg-surface open:shadow-(--tpl-shadow)";
const faqSummary = `flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-left text-base font-semibold ${focusRing} [&::-webkit-details-marker]:hidden`;
const faqChevron =
  "flex size-8 shrink-0 items-center justify-center rounded-full bg-subtle transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none";
const faqBody = "px-5 pb-5 text-sm text-pretty text-muted";
const ctaBand =
  "relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-(--tpl-blue) px-6 py-16 text-center text-(--tpl-on) sm:px-12";
const ctaCloud = "absolute rounded-full bg-(--tpl-on)/15 blur-2xl";
const ctaForm =
  "relative mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start";
const ctaInput =
  "h-12 rounded-full border-transparent bg-(--tpl-on) px-5 text-base text-(--tpl-av-ink) placeholder:text-(--tpl-av-ink)/60";
const ctaSubmit = `inline-flex h-12 items-center justify-center rounded-full bg-(--tpl-av-ink) px-6 text-base font-semibold text-(--tpl-on) transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-on)`;
const ctaError =
  "rounded-full bg-(--tpl-on) px-4 py-1.5 text-sm font-medium text-(--tpl-error) sm:col-span-2";
const footer = "mx-auto mt-20 max-w-6xl px-4 pb-10";
const footerGrid =
  "grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]";
const footerLink = `rounded-sm text-sm text-muted hover:text-ink ${focusRing}`;
const footerBottom =
  "mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-sm text-muted";
const builtWith = `rounded-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink ${focusRing}`;

/* Data */
// prettier-ignore
const icons = {
  logo: "M4 7l8-4 8 4-8 4zM4 12l8 4 8-4M4 17l8 4 8-4",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M18 6 6 18M6 6l12 12",
  arrow: "M5 12h14M13 6l6 6-6 6",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10M9 12l2 2 4-4",
  pen: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z",
  send: "m22 2-7 20-4-9-9-4zM22 2 11 13",
  check: "M20 6 9 17l-5-5",
  clock: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
  folder: "M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  sparkle: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  building: "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M3 21h18M8 7h4M8 11h4M8 15h4",
  cpu: "M6 6h12v12H6zM9 9h6v6H9zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4",
  heart: "M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z",
  briefcase: "M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  truck: "M3 6h11v10H3zM14 9h4l3 3v4h-7M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3",
  plus: "M12 5v14M5 12h14",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",
  play: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M10 8l6 4-6 4z",
};
type IconName = keyof typeof icons;

const BRAND = "Tendera";
const MENU_ID = "tender-mobile-menu";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// prettier-ignore
const nav = [
  { id: "product", label: "Product" }, { id: "how", label: "How it Works" }, { id: "pricing", label: "Pricing" },
  { id: "sectors", label: "Sectors" }, { id: "resources", label: "Resources" },
];
// prettier-ignore
const dashNav: { label: string; icon: IconName }[] = [
  { label: "Overview", icon: "home" }, { label: "Tenders", icon: "search" }, { label: "Documents", icon: "folder" },
  { label: "Proposals", icon: "pen" }, { label: "Team", icon: "users" },
];
// prettier-ignore
const dashStats = [
  { label: "Active tenders", value: "12", note: "+3 this week" },
  { label: "Win rate", value: "38%", note: "+6 pts" },
  { label: "Pipeline", value: "Rp 4,2 M", note: "8 bids" },
];
// prettier-ignore
const dashRows = [
  { title: "Bridge maintenance, Sleman", agency: "PUPR Yogyakarta", close: "Nov 14", status: "Drafting", tone: "amber" },
  { title: "Hospital network upgrade", agency: "RSUD Kota Bandung", close: "Nov 18", status: "Ready", tone: "mint" },
  { title: "School furniture supply", agency: "Disdik Jawa Timur", close: "Nov 21", status: "Review", tone: "blue" },
];
const dashBars = [42, 64, 50, 78, 58, 90, 72];
// prettier-ignore
const deadlines = [
  { day: "14", month: "Nov", title: "Bridge maintenance", time: "Closes 15:00 WIB" },
  { day: "18", month: "Nov", title: "Hospital network", time: "Clarification 10:00" },
  { day: "21", month: "Nov", title: "School furniture", time: "Upload window opens" },
];
// prettier-ignore
const trustStats = [
  { value: "Rp 1,8 T", label: "in tenders won" }, { value: "45 min", label: "average submission" },
  { value: "98%", label: "pass the admin check" },
];
const trustFaces = [
  "Rizky Pratama",
  "Sinta Dewi",
  "Bayu Saputra",
  "Maya Lestari",
  "Hendra Wijaya",
];
// prettier-ignore
const steps: { icon: IconName; title: string; text: string; time: string }[] = [
  { icon: "search", title: "Find the right tender", text: "Tendera scans LPSE portals and the e-catalogue every morning and shortlists tenders that fit your sector, region, and capacity.", time: "5 min" },
  { icon: "shield", title: "Check your eligibility", text: "Upload your NIB, SBU, and tax documents once. We flag missing permits and expiring certificates before you commit.", time: "10 min" },
  { icon: "pen", title: "Draft the proposal", text: "The AI writes the technical proposal from the tender document and your past wins, section by section, in your voice.", time: "20 min" },
  { icon: "send", title: "Review and submit", text: "Your team comments in one place, then exports a package in the exact format the agency asks for.", time: "10 min" },
];
// prettier-ignore
const checklist = [
  { label: "Company deed and NIB", done: true }, { label: "SBU construction permit", done: true },
  { label: "Tax clearance (KSWP)", done: false }, { label: "Bid bond, 1% of HPS", done: false },
];
// prettier-ignore
const vault = [
  { name: "ISO 9001 certificate", note: "Expires in 21 days", tone: "amber" },
  { name: "SBU BG004 permit", note: "Valid until 2028", tone: "mint" },
  { name: "Audited report 2025", note: "Uploaded today", tone: "blue" },
];
// prettier-ignore
const timeline = [
  { label: "Clarification", start: 4, width: 18 }, { label: "Upload window", start: 26, width: 44 }, { label: "Closing", start: 74, width: 12 },
];
const benchmark = [62, 74, 58, 81, 69];
// prettier-ignore
const sectors: { id: string; label: string; icon: IconName; open: string; value: string; tenders: { title: string; agency: string; value: string; close: string }[] }[] = [
  { id: "construction", label: "Construction", icon: "building", open: "412 open tenders", value: "Rp 9,6 T total value", tenders: [
    { title: "Irrigation canal rehabilitation", agency: "BBWS Pemali Juana", value: "Rp 18,4 M", close: "Closes Nov 16" },
    { title: "Village road paving, phase 2", agency: "Kabupaten Banyumas", value: "Rp 3,2 M", close: "Closes Nov 19" },
    { title: "Market hall renovation", agency: "Kota Surakarta", value: "Rp 7,9 M", close: "Closes Nov 24" },
  ] },
  { id: "it", label: "IT and Telecom", icon: "cpu", open: "186 open tenders", value: "Rp 2,1 T total value", tenders: [
    { title: "Smart city command centre", agency: "Kota Makassar", value: "Rp 12,5 M", close: "Closes Nov 15" },
    { title: "Data centre cooling upgrade", agency: "Kementerian Keuangan", value: "Rp 6,8 M", close: "Closes Nov 22" },
    { title: "School broadband rollout", agency: "Dinas Kominfo NTB", value: "Rp 4,1 M", close: "Closes Nov 27" },
  ] },
  { id: "health", label: "Healthcare", icon: "heart", open: "238 open tenders", value: "Rp 3,4 T total value", tenders: [
    { title: "Hospital bed procurement", agency: "RSUP Dr. Sardjito", value: "Rp 5,6 M", close: "Closes Nov 17" },
    { title: "Medical waste incinerator", agency: "Dinkes Kalimantan Timur", value: "Rp 2,9 M", close: "Closes Nov 20" },
    { title: "Puskesmas lab equipment", agency: "Kabupaten Sleman", value: "Rp 1,7 M", close: "Closes Nov 26" },
  ] },
  { id: "consulting", label: "Consulting", icon: "briefcase", open: "154 open tenders", value: "Rp 860 M total value", tenders: [
    { title: "Spatial plan review", agency: "Bappeda Jawa Barat", value: "Rp 1,2 M", close: "Closes Nov 18" },
    { title: "Flood control feasibility study", agency: "BBWS Citarum", value: "Rp 2,4 M", close: "Closes Nov 23" },
    { title: "Tourism master plan", agency: "Kabupaten Labuan Bajo", value: "Rp 980 jt", close: "Closes Nov 28" },
  ] },
  { id: "logistics", label: "Logistics", icon: "truck", open: "97 open tenders", value: "Rp 1,3 T total value", tenders: [
    { title: "Fuel distribution to outer islands", agency: "Kabupaten Kepulauan Seribu", value: "Rp 8,2 M", close: "Closes Nov 15" },
    { title: "Rice warehouse operations", agency: "Perum Bulog Sulsel", value: "Rp 4,6 M", close: "Closes Nov 21" },
    { title: "Ambulance fleet maintenance", agency: "Dinkes DKI Jakarta", value: "Rp 2,2 M", close: "Closes Nov 25" },
  ] },
];
type Billing = "monthly" | "yearly";
// prettier-ignore
const plans = [
  { id: "starter", name: "Starter", text: "For solo consultants who bid a few times a month.", monthly: 490000, yearly: 392000, cta: "Start free trial", features: ["5 active tenders", "Compliance checklist", "Document vault, 2 GB", "Email support"] },
  { id: "growth", name: "Growth", text: "For contractors with a dedicated bid team.", monthly: 1290000, yearly: 1032000, cta: "Start free trial", features: ["Unlimited tenders", "AI proposal writer", "Price benchmarking", "5 team seats", "Priority support"] },
  { id: "enterprise", name: "Enterprise", text: "For groups that bid across many entities.", monthly: 0, yearly: 0, cta: "Talk to sales", features: ["Unlimited seats", "SSO and audit log", "Dedicated bid analyst", "Custom integrations"] },
];
const POPULAR = "growth";
// prettier-ignore
const resources: { icon: IconName; title: string; text: string; href: string }[] = [
  { icon: "book", title: "Tender readiness checklist", text: "A 12 point guide for your first government bid.", href: "/guides/readiness" },
  { icon: "file", title: "Proposal template library", text: "Technical proposal outlines for 20 sectors.", href: "/templates" },
  { icon: "play", title: "Webinar replays", text: "Bid teams share how they win, every month.", href: "/webinars" },
];
// prettier-ignore
const faqs = [
  { q: "Which tender portals does Tendera cover?", a: "Every LPSE portal that runs SPSE, the LKPP e-catalogue, and the procurement pages of the larger state-owned companies. New listings show up within an hour of publication." },
  { q: "Will the AI write the whole proposal for me?", a: "It writes a complete first draft from the tender document and your past proposals. Your team still reviews every section, and each paragraph links to the clause it answers." },
  { q: "Is my company data safe?", a: "Files are stored in Jakarta data centres and encrypted at rest. Your documents are never used to train shared models, and you can export or delete them at any time." },
  { q: "Can I cancel at any time?", a: "Yes. Monthly plans stop at the end of the billing period. Yearly plans can be refunded pro rata within the first 30 days." },
  { q: "Do you replace our bid consultant?", a: "Most teams use Tendera to bring bidding in house. Some keep their consultant for very large tenders and use Tendera to prepare everything else." },
];
// prettier-ignore
const footerCols = [
  { title: "Product", links: [["Features", "#product"], ["Pricing", "#pricing"], ["Sectors", "#sectors"], ["Changelog", "/changelog"]] },
  { title: "Company", links: [["About", "/about"], ["Careers", "/careers"], ["Contact", "/contact"]] },
  { title: "Resources", links: [["Guides", "/guides"], ["Templates", "/templates"], ["Help center", "/help"]] },
];

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const rupiah = (value: number) =>
  `Rp ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
const tonePill = (tone: string) =>
  tone === "mint" ? mintPill : tone === "amber" ? amberPill : bluePill;

/** Animasi masuk saat scroll; tidak aktif bila pengguna memilih reduced motion. */
function revealOnScroll(rootEl: HTMLElement) {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  )
    return () => {};
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
  rootEl
    .querySelectorAll("[data-reveal]")
    .forEach((el) => observer.observe(el));
  rootEl.setAttribute("data-reveal-ready", "");
  return () => observer.disconnect();
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

function Face({
  name,
  index,
  className = "size-8 text-xs",
}: {
  name: string;
  index: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cx(face, faceTones[index % faceTones.length], className)}
    >
      {initials(name)}
    </span>
  );
}

function Dashboard() {
  return (
    <div className={stage} data-reveal="">
      <div className={tilt}>
        <div className={dash}>
          <aside className={dashSide} aria-hidden="true">
            <p className="mb-3 flex items-center gap-2 px-3 text-sm font-semibold">
              <span className={brandMark}>
                <Icon name="logo" />
              </span>
              {BRAND}
            </p>
            {dashNav.map((item, index) => (
              <span
                key={item.label}
                className={cx(
                  dashSideItem,
                  index === 0
                    ? "bg-surface text-ink shadow-(--tpl-shadow)"
                    : "text-muted",
                )}
              >
                <Icon name={item.icon} />
                {item.label}
              </span>
            ))}
          </aside>
          <div className={dashMain}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-muted">Monday, Nov 9</p>
                <p className="text-lg font-semibold tracking-tight">
                  Bid overview
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden h-9 w-48 items-center gap-2 rounded-full border border-line px-3 text-xs text-muted sm:flex">
                  <Icon name="search" className="size-3.5" />
                  Search tenders
                </span>
                <Face name="Rizky Pratama" index={0} />
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-2 sm:gap-3">
              {dashStats.map((stat) => (
                <div key={stat.label} className={dashStat}>
                  <dt className="text-xs text-muted sm:truncate">
                    {stat.label}
                  </dt>
                  <dd className="text-base font-semibold tracking-tight whitespace-nowrap tabular-nums sm:text-xl">
                    {stat.value}
                  </dd>
                  <dd className="text-xs text-(--tpl-blue-ink) sm:truncate">
                    {stat.note}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
              <div className={dashCard}>
                <p className="text-sm font-semibold">Open tenders</p>
                <ul className="grid grid-cols-1 gap-2">
                  {dashRows.map((row) => (
                    <li
                      key={row.title}
                      className="flex items-center justify-between gap-3 rounded-xl bg-subtle/60 px-3 py-2"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">
                          {row.title}
                        </span>
                        <span className="block truncate text-xs text-muted">
                          {row.agency}, closes {row.close}
                        </span>
                      </span>
                      <span className={tonePill(row.tone)}>{row.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={cx(dashCard, "max-md:hidden")}>
                <p className="text-sm font-semibold">Submissions per week</p>
                <div
                  className="flex h-32 items-end gap-2"
                  role="img"
                  aria-label="Submissions grew from 3 to 7 per week"
                >
                  {dashBars.map((value, index) => (
                    <span
                      key={index}
                      className={cx(
                        "flex-1 rounded-t-lg",
                        index === 5
                          ? "bg-(--tpl-blue)"
                          : "bg-(--tpl-blue-soft)",
                      )}
                      style={{ height: `${value}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx(float, "-top-6 left-0 w-60 -rotate-3")}>
        <p className="text-sm font-semibold">Welcome back, Rizky</p>
        <p className="mt-1 text-xs text-muted">3 tenders need you today</p>
        <div className="mt-3 flex -space-x-2">
          {trustFaces.slice(1, 4).map((name, index) => (
            <Face
              key={name}
              name={name}
              index={index + 1}
              className="size-7 text-[10px] ring-2 ring-surface"
            />
          ))}
        </div>
      </div>
      <div
        className={cx(
          float,
          "top-10 right-0 w-56 rotate-3 [animation-delay:.6s]",
        )}
      >
        <p className="text-xs text-muted">Win rate, last 90 days</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-semibold tracking-tight">38%</span>
          <span className={mintPill}>+6 pts</span>
        </p>
        <svg
          viewBox="0 0 160 40"
          className="mt-2 h-10 w-full"
          aria-hidden="true"
        >
          <path
            d="M0 34 L26 28 L52 30 L78 20 L104 22 L130 10 L160 6"
            className="fill-none stroke-(--tpl-blue) stroke-[2.5] [stroke-linecap:round] [stroke-linejoin:round]"
          />
        </svg>
      </div>
      <div
        className={cx(
          float,
          "-bottom-8 left-0 w-64 rotate-2 [animation-delay:1.2s]",
        )}
      >
        <p className="text-sm font-semibold">Upcoming deadlines</p>
        <ul className="mt-3 grid gap-2.5">
          {deadlines.map((item) => (
            <li key={item.title} className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-content-center rounded-xl bg-(--tpl-blue-soft) text-center leading-none text-(--tpl-blue-ink)">
                <span className="text-sm font-semibold">{item.day}</span>
                <span className="text-[10px]">{item.month}</span>
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {item.title}
                </span>
                <span className="block truncate text-xs text-muted">
                  {item.time}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={cx(
          float,
          "right-0 -bottom-6 w-72 -rotate-2 [animation-delay:.3s]",
        )}
      >
        <p className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex size-7 items-center justify-center rounded-lg bg-(--tpl-blue) text-(--tpl-on)">
            <Icon name="sparkle" />
          </span>
          AI insights
        </p>
        <p className="mt-2 text-sm text-pretty text-muted">
          Clause 4.2 asks for ISO 9001. Your certificate expires before the
          closing date, so renew it this week.
        </p>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className={featureGrid}>
      <article className={featureCard} data-reveal="">
        <div className={mini} aria-hidden="true">
          {checklist.map((item) => (
            <span key={item.label} className={miniRow}>
              <span
                className={cx(
                  "flex size-5 items-center justify-center rounded-md",
                  item.done
                    ? "bg-(--tpl-blue) text-(--tpl-on)"
                    : "border border-line",
                )}
              >
                {item.done && <Icon name="check" className="size-3.5" />}
              </span>
              <span
                className={cx(
                  "truncate",
                  item.done && "text-muted line-through",
                )}
              >
                {item.label}
              </span>
            </span>
          ))}
        </div>
        <div className="grid gap-2">
          <h3 className={cardTitle}>Compliance checklist</h3>
          <p className={cardText}>
            Every requirement in the tender document becomes a task with an
            owner and a due date, so nothing is missed at the admin check.
          </p>
        </div>
      </article>

      <article className={featureHot} data-reveal="">
        <div className="grid gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-(--tpl-on)/15">
            <Icon name="sparkle" className="size-6" />
          </span>
          <h3 className="text-2xl font-semibold tracking-tight">
            AI proposal writer
          </h3>
          <p className={hotText}>
            Draft a 40 page technical proposal in minutes. Each paragraph cites
            the clause it answers, so reviewers can check it fast.
          </p>
        </div>
        <div className={hotEditor} aria-hidden="true">
          <p className="text-xs font-semibold tracking-wide text-(--tpl-blue)">
            3.1 Work methodology
          </p>
          <span className="h-2 w-full rounded-full bg-(--tpl-blue-soft)" />
          <span className="h-2 w-11/12 rounded-full bg-(--tpl-blue-soft)" />
          <span className="h-2 w-4/5 rounded-full bg-(--tpl-blue-soft)" />
          <p className="rounded-xl bg-(--tpl-blue-soft) p-3 text-xs text-(--tpl-blue-ink)">
            Suggestion: mention the 2025 Kulon Progo bridge project to meet the
            experience criterion in clause 2.4.
          </p>
          <span className="h-2 w-3/4 rounded-full bg-(--tpl-blue-soft)" />
        </div>
        <button
          type="button"
          className={hotButton}
          onClick={() =>
            toast({
              title: "Sample proposal ready",
              description: "We drafted 3.1 Work methodology for you.",
              variant: "success",
            })
          }
        >
          Try the writer
          <Icon name="arrow" />
        </button>
      </article>

      <article className={featureCard} data-reveal="">
        <div className={mini} aria-hidden="true">
          {vault.map((item) => (
            <span key={item.name} className={cx(miniRow, "justify-between")}>
              <span className="flex min-w-0 items-center gap-2">
                <Icon name="file" className="size-4 shrink-0 text-muted" />
                <span className="truncate">{item.name}</span>
              </span>
              <span className={tonePill(item.tone)}>{item.note}</span>
            </span>
          ))}
        </div>
        <div className="grid gap-2">
          <h3 className={cardTitle}>Document vault</h3>
          <p className={cardText}>
            Keep permits, certificates, and past contracts in one place. We
            remind you 30 days before anything expires.
          </p>
        </div>
      </article>

      <article className={featureCard} data-reveal="">
        <div className={cx(mini, "gap-3")} aria-hidden="true">
          {timeline.map((item) => (
            <span key={item.label} className="grid gap-1">
              <span className="text-xs text-muted">{item.label}</span>
              <span className="relative h-3 rounded-full bg-surface">
                <span
                  className="absolute inset-y-0 rounded-full bg-(--tpl-blue)"
                  style={{ left: `${item.start}%`, width: `${item.width}%` }}
                />
              </span>
            </span>
          ))}
        </div>
        <div className="grid gap-2">
          <h3 className={cardTitle}>Deadline radar</h3>
          <p className={cardText}>
            See every clarification meeting, upload window, and closing time on
            one timeline, with reminders on WhatsApp and email.
          </p>
        </div>
      </article>

      <article className={featureCard} data-reveal="">
        <div className={mini} aria-hidden="true">
          <span className="relative flex h-24 items-end gap-3 px-2">
            <span className="absolute inset-x-0 top-5 border-t-2 border-dashed border-(--tpl-blue)" />
            <span className="absolute top-0 right-1 text-[10px] font-semibold text-(--tpl-blue-ink)">
              HPS
            </span>
            {benchmark.map((value, index) => (
              <span
                key={index}
                className={cx(
                  "flex-1 rounded-t-md",
                  index === 3 ? "bg-(--tpl-blue)" : "bg-(--tpl-blue-soft)",
                )}
                style={{ height: `${value}%` }}
              />
            ))}
          </span>
        </div>
        <div className="grid gap-2">
          <h3 className={cardTitle}>Price benchmarking</h3>
          <p className={cardText}>
            Compare your bid with the owner estimate (HPS) and past winning
            prices before you submit.
          </p>
        </div>
      </article>
    </div>
  );
}

function Sectors() {
  const [active, setActive] = useState(sectors[0]!.id);
  const current = sectors.find((item) => item.id === active)!;
  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[
      event.key
    ];
    if (!step) return;
    event.preventDefault();
    const index = sectors.findIndex((item) => item.id === active);
    const next = sectors[(index + step + sectors.length) % sectors.length]!;
    setActive(next.id);
    document.getElementById(`tender-tab-${next.id}`)?.focus();
  };
  return (
    <div className={sectorPanel} data-reveal="">
      <div
        role="tablist"
        aria-label="Sectors"
        aria-orientation="vertical"
        className={tabList}
        onKeyDown={onKey}
      >
        {sectors.map((item) => (
          <button
            key={item.id}
            id={`tender-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={item.id === active}
            aria-controls="tender-sector-panel"
            tabIndex={item.id === active ? 0 : -1}
            className={cx(tab, item.id === active ? tabOn : tabOff)}
            onClick={() => setActive(item.id)}
          >
            <Icon name={item.icon} />
            {item.label}
          </button>
        ))}
      </div>
      <div
        id="tender-sector-panel"
        role="tabpanel"
        aria-labelledby={`tender-tab-${current.id}`}
        className="grid content-start gap-4"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-muted">This week in {current.label}</p>
            <p className="text-2xl font-semibold tracking-tight">
              {current.open}
            </p>
          </div>
          <span className={bluePill}>{current.value}</span>
        </div>
        <ul className="grid gap-3">
          {current.tenders.map((item) => (
            <li key={item.title} className={tenderRow}>
              <div className="min-w-0">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted">
                  {item.agency}, {item.close}
                </p>
              </div>
              <span className="text-lg font-semibold tracking-tight tabular-nums">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const choose = (plan: (typeof plans)[number]) =>
    toast(
      plan.monthly
        ? {
            title: `${plan.name} trial started`,
            description: `14 days free, then ${rupiah(plan[billing])} per month.`,
            variant: "success",
          }
        : {
            title: "Sales will call you",
            description: "Expect a call from Andi within one working day.",
          },
    );
  return (
    <>
      <div className="flex justify-center">
        <div role="group" aria-label="Billing period" className={toggleWrap}>
          {(["monthly", "yearly"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={billing === value}
              className={cx(
                toggleItem,
                billing === value
                  ? "bg-primary text-on-primary"
                  : "text-muted hover:text-ink",
              )}
              onClick={() => setBilling(value)}
            >
              {value === "monthly" ? "Monthly" : "Yearly"}
              {value === "yearly" && <span className={mintPill}>Save 20%</span>}
            </button>
          ))}
        </div>
      </div>
      <div className={priceGrid}>
        {plans.map((plan) => {
          const hot = plan.id === POPULAR;
          return (
            <article
              key={plan.id}
              className={cx(priceCard, hot && priceHot)}
              data-reveal=""
            >
              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {hot && <span className={bluePill}>Most popular</span>}
                </div>
                <p className={cardText}>{plan.text}</p>
              </div>
              <div>
                <p className={priceValue} data-price={plan.id}>
                  {plan.monthly ? rupiah(plan[billing]) : "Custom"}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {plan.monthly
                    ? billing === "monthly"
                      ? "per month, billed monthly"
                      : "per month, billed yearly"
                    : "Volume pricing for groups"}
                </p>
              </div>
              <button
                type="button"
                className={cx(planButton, hot ? planPrimary : planSecondary)}
                aria-label={`${plan.cta}, ${plan.name} plan`}
                onClick={() => choose(plan)}
              >
                {plan.cta}
              </button>
              <ul className={checkList}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className={checkIcon}>
                      <Icon name="check" className="size-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </>
  );
}

function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setError("Enter a valid work email, like you@company.co.id.");
      return;
    }
    setError("");
    setEmail("");
    toast({
      title: "Your trial is ready",
      description: `We sent a sign-in link to ${value}.`,
      variant: "success",
    });
  };
  return (
    <form className={ctaForm} noValidate onSubmit={submit}>
      <div>
        <label htmlFor="tender-email" className="sr-only">
          Work email
        </label>
        <Input
          id="tender-email"
          type="email"
          name="email"
          placeholder="you@company.co.id"
          className={ctaInput}
          value={email}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "tender-email-error" : undefined}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <button type="submit" className={ctaSubmit}>
        Start free trial
      </button>
      {error && (
        <p id="tender-email-error" className={ctaError}>
          {error}
        </p>
      )}
    </form>
  );
}

export default function Tender() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("product");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => revealOnScroll(rootRef.current!), []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const pick = (id: string) => {
    setActive(id);
    setMenuOpen(false);
  };
  const demo = () =>
    toast({
      title: "Demo request received",
      description: "Sinta from our team will email you a time slot today.",
    });

  return (
    <div ref={rootRef} className={root}>
      <style>{keyframes}</style>
      <div className={sky} aria-hidden="true">
        <span className={cx(cloud, "top-24 -left-24 h-40 w-[420px]")} />
        <span
          className={cx(
            cloud,
            "top-56 right-[-80px] h-48 w-[480px] [animation-delay:-5s]",
          )}
        />
        <span
          className={cx(
            cloud,
            "top-[520px] left-1/4 h-32 w-[360px] opacity-80 [animation-delay:-9s]",
          )}
        />
      </div>

      <header className={headerWrap}>
        <nav aria-label="Main" className={navBar}>
          <a href="#top" className={brand}>
            <span className={brandMark} aria-hidden="true">
              <Icon name="logo" />
            </span>
            {BRAND}
          </a>
          <ul className={navList}>
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cx(
                    navLink,
                    active === item.id ? navActive : navIdle,
                  )}
                  onClick={() => pick(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={navActions}>
            <a href="/login" className={loginLink}>
              Login
            </a>
            <a href="#start" className={cx(ctaLink, "max-sm:hidden")}>
              Start free trial
            </a>
            <button
              type="button"
              className={menuButton}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "close" : "menu"} className="size-5" />
            </button>
          </div>
          {menuOpen && (
            <div id={MENU_ID} className={mobileMenu}>
              {nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cx(
                    mobileLink,
                    active === item.id ? navActive : "text-ink hover:bg-subtle",
                  )}
                  onClick={() => pick(item.id)}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3">
                <a
                  href="/login"
                  className={cx(
                    mobileLink,
                    "justify-center border border-line",
                  )}
                >
                  Login
                </a>
                <a
                  href="#start"
                  className={ctaLink}
                  onClick={() => setMenuOpen(false)}
                >
                  Start free trial
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main id="top" className="relative">
        <section aria-labelledby="tender-title" className={heroSection}>
          <div className={heroInner}>
            <p className={eyebrow}>
              <span className={eyebrowTag}>New</span>
              AI checks every clause against LKPP rules
            </p>
            <h1 id="tender-title" className={heroTitle}>
              Stop losing government tenders{" "}
              <span className={highlightLine}>to expensive bid agencies</span>
            </h1>
            <p className={heroLead}>
              {BRAND} reads the tender documents, builds your compliance
              checklist, and drafts the technical proposal. Submit in 45 minutes
              instead of paying an agency Rp 25 juta per bid.
            </p>
            <div className={heroActions}>
              <a href="#start" className={ctaLarge}>
                Start free trial
                <Icon name="arrow" />
              </a>
              <button type="button" className={ghostLarge} onClick={demo}>
                Book a demo
              </button>
            </div>
            <p className={heroNote}>14 days free. No credit card needed.</p>
          </div>
          <Dashboard />
        </section>

        <section aria-label="Customers" className={trust} data-reveal="">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="flex -space-x-2">
              {trustFaces.map((name, index) => (
                <Face
                  key={name}
                  name={name}
                  index={index}
                  className="size-9 text-xs ring-2 ring-canvas"
                />
              ))}
            </span>
            <p className="text-sm text-muted">
              Trusted by{" "}
              <strong className="font-semibold text-ink">
                1.200+ contractors
              </strong>{" "}
              and consultants across Indonesia
            </p>
          </div>
          <ul className="flex flex-wrap justify-center gap-3">
            {trustStats.map((stat) => (
              <li key={stat.label} className={statPill}>
                <span className="font-semibold">{stat.value}</span>
                <span className="text-muted">{stat.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="how" aria-labelledby="tender-how" className={section}>
          <div className={sectionHead} data-reveal="">
            <span className={kicker}>
              <Icon name="clock" />
              How it works
            </span>
            <h2 id="tender-how" className={h2}>
              The 45-minute path to a{" "}
              <span className={highlight}>submission-ready</span> tender
            </h2>
            <p className={lead}>
              Four steps replace two weeks of agency back and forth. Your team
              stays in control of every document.
            </p>
          </div>
          <ol className={stepGrid}>
            {steps.map((step, index) => (
              <li key={step.title} className={stepCard} data-reveal="">
                <div className={stepTop}>
                  <span className={stepIcon}>
                    <Icon name={step.icon} className="size-6" />
                  </span>
                  <span className={bluePill}>{step.time}</span>
                </div>
                <p className={stepNumber}>Step {index + 1}</p>
                <h3 className={cardTitle}>{step.title}</h3>
                <p className={cardText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="product"
          aria-labelledby="tender-product"
          className={section}
        >
          <div className={sectionHead} data-reveal="">
            <span className={kicker}>
              <Icon name="shield" />
              Product
            </span>
            <h2 id="tender-product" className={h2}>
              Eliminate <span className={highlight}>bidding mistakes</span>
            </h2>
            <p className={lead}>
              Most tenders are lost at the administrative check, not on price.{" "}
              {BRAND} catches the small things before the committee does.
            </p>
          </div>
          <Features />
        </section>

        <section
          id="sectors"
          aria-labelledby="tender-sectors"
          className={section}
        >
          <div className={sectionHead} data-reveal="">
            <span className={kicker}>
              <Icon name="building" />
              Sectors
            </span>
            <h2 id="tender-sectors" className={h2}>
              Tenders that fit what you build
            </h2>
            <p className={lead}>
              Pick a sector to see what opened this week across 600+ procurement
              portals.
            </p>
          </div>
          <Sectors />
        </section>

        <section
          id="pricing"
          aria-labelledby="tender-pricing"
          className={section}
        >
          <div className={sectionHead} data-reveal="">
            <span className={kicker}>
              <Icon name="sparkle" />
              Pricing
            </span>
            <h2 id="tender-pricing" className={h2}>
              Cheaper than one agency fee
            </h2>
            <p className={lead}>
              Every plan starts with a 14 day trial. Switch or cancel whenever
              you like.
            </p>
          </div>
          <Pricing />
        </section>

        <section
          id="resources"
          aria-labelledby="tender-faq"
          className={section}
        >
          <div className={faqWrap}>
            <div className="grid content-start gap-6" data-reveal="">
              <div className="grid gap-4">
                <span className={cx(kicker, "justify-self-start")}>
                  <Icon name="book" />
                  Resources
                </span>
                <h2 id="tender-faq" className={h2}>
                  Questions from bid teams
                </h2>
                <p className={lead}>
                  Still unsure? Our guides walk you through your first tender
                  step by step.
                </p>
              </div>
              <ul className="grid gap-3">
                {resources.map((item) => (
                  <li key={item.title}>
                    <a href={item.href} className={resourceLink}>
                      <span className={stepIcon}>
                        <Icon name={item.icon} className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">
                          {item.title}
                        </span>
                        <span className="block text-sm text-muted">
                          {item.text}
                        </span>
                      </span>
                      <Icon
                        name="arrow"
                        className="size-4 text-muted transition-transform duration-150 group-hover:translate-x-1"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid content-start gap-3" data-reveal="">
              {faqs.map((item, index) => (
                <details
                  key={item.q}
                  name="tender-faq"
                  className={faqItem}
                  open={index === 0}
                >
                  <summary className={faqSummary}>
                    {item.q}
                    <span className={faqChevron} aria-hidden="true">
                      <Icon name="plus" />
                    </span>
                  </summary>
                  <p className={faqBody}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          id="start"
          aria-labelledby="tender-start"
          className="scroll-mt-28 px-4"
        >
          <div className={ctaBand} data-reveal="">
            <span
              className={cx(ctaCloud, "-top-10 -left-10 h-40 w-80")}
              aria-hidden="true"
            />
            <span
              className={cx(ctaCloud, "-right-16 -bottom-12 h-48 w-96")}
              aria-hidden="true"
            />
            <h2
              id="tender-start"
              className="relative text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              Your next tender closes soon. Be ready for it.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-pretty text-(--tpl-on)/85">
              Start a free trial with your work email. Your first submission is
              on us.
            </p>
            <Signup />
          </div>
        </section>
      </main>

      <footer className={footer}>
        <div className={footerGrid}>
          <div className="grid content-start gap-4">
            <a href="#top" className={cx(brand, "justify-self-start")}>
              <span className={brandMark} aria-hidden="true">
                <Icon name="logo" />
              </span>
              {BRAND}
            </a>
            <p className="max-w-xs text-sm text-muted">
              Tender software for Indonesian contractors, consultants, and
              suppliers. Made in Yogyakarta.
            </p>
          </div>
          {footerCols.map((col) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className="grid content-start gap-3"
            >
              <p className="text-sm font-semibold">{col.title}</p>
              {col.links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className={cx(footerLink, "justify-self-start")}
                >
                  {label}
                </a>
              ))}
            </nav>
          ))}
        </div>
        <div className={footerBottom}>
          <p>&copy; 2026 PT Tendera Solusi Indonesia</p>
          <p>
            Built with{" "}
            <a href="https://markasui.pages.dev" className={builtWith}>
              MarkasUI
            </a>
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
