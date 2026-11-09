<script setup lang="ts">
import {
  computed,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type FunctionalComponent,
} from "vue";
import Input from "../../../components/input/Input.vue";
import Modal from "../../../components/modal/Modal.vue";
import Toaster, { toast } from "../../../components/toast/Toast.vue";

const palette =
  "[--tpl-blue:#2449f2] [--tpl-blue-deep:#1a35c2] [--tpl-on:#ffffff] [--tpl-blue-text:#2449f2] [--tpl-lime:#d2f65a] [--tpl-lime-ink:#1c2a06] [--tpl-sky:#e9eeff] [--tpl-peach:#ffe2d1] [--tpl-lilac:#ece4ff] [--tpl-mint:#dcf6e8] [--tpl-skin:#f6c7a6] [--tpl-hair:#1f2240] [--tpl-star:#f5a524] [--tpl-paper:#ffffff] [--tpl-clip:#9aa3b5] [--tpl-av1:#c7d3ff] [--tpl-av2:#ffd3c2] [--tpl-av3:#e2f7a1] [--tpl-av4:#e0d4ff] [--tpl-av-ink:#1f2937] [--tpl-error:#b42318] [--tpl-rose:#ff7d8f] [--tpl-violet:#7a5cf5] [--tpl-green:#2c9f64] [--tpl-shade:#0f1b5c26] [--tpl-shadow:0_24px_48px_-24px_#1a35c240] dark:[--tpl-blue-text:#9db0ff] dark:[--tpl-sky:#161d3a] dark:[--tpl-peach:#3a2519] dark:[--tpl-lilac:#251d3d] dark:[--tpl-mint:#12301f] dark:[--tpl-paper:#1a1d24] dark:[--tpl-clip:#6b7385] dark:[--tpl-shadow:0_24px_48px_-24px_#00000099]";
const keyframes =
  "@keyframes belajar-bob{to{transform:translateY(-10px) rotate(-4deg)}}@keyframes belajar-float{to{transform:translateY(-8px)}}@media (prefers-reduced-motion:no-preference){[data-reveal-ready] [data-reveal]:not([data-shown]){opacity:0;transform:translateY(24px)}}[data-reveal]{transition:opacity .7s ease-out,transform .7s ease-out}";

/* Kelas */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const root = `${palette} relative min-h-dvh overflow-x-clip bg-canvas text-ink`;
const headerBar =
  "sticky top-0 z-30 border-b border-line/60 bg-canvas/85 backdrop-blur-xl";
const headerInner =
  "relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8";
const brand = `flex items-center gap-2 rounded-full text-lg font-bold tracking-tight ${focusRing}`;
const brandMark =
  "flex size-9 items-center justify-center rounded-full bg-(--tpl-blue)";
const navList = "hidden items-center gap-1 md:flex";
const navLink = `inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-colors duration-150 ${focusRing}`;
const navIdle = "text-muted hover:text-ink";
const navActive = "bg-primary-soft text-primary";
const signIn = `hidden h-10 items-center rounded-full px-4 text-sm font-medium hover:bg-subtle sm:inline-flex ${focusRing}`;
const pillButton = `inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const bigButton = `inline-flex h-14 items-center justify-center gap-3 rounded-full bg-primary pr-2 pl-7 text-base font-semibold whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const bigButtonIcon =
  "flex size-10 items-center justify-center rounded-full bg-(--tpl-lime) text-(--tpl-lime-ink)";
const ghostButton = `inline-flex h-14 items-center justify-center gap-2 rounded-full border border-line px-6 text-base font-semibold whitespace-nowrap hover:bg-subtle ${focusRing}`;
const menuButton = `inline-flex size-10 items-center justify-center rounded-full hover:bg-subtle md:hidden ${focusRing}`;
const mobileMenu =
  "absolute inset-x-4 top-16 grid gap-1 rounded-3xl border border-line bg-surface p-3 shadow-overlay md:hidden";
const mobileLink = `flex h-11 items-center rounded-2xl px-4 text-base font-medium ${focusRing}`;
const hero =
  "mx-auto grid max-w-7xl items-center gap-12 px-4 pt-12 pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:px-8 lg:pt-16";
const heroCopy = "grid justify-items-start gap-6";
const heroBadge =
  "inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pr-4 pl-1 text-sm font-medium";
const heroBadgeDot =
  "rounded-full bg-(--tpl-lime) px-2.5 py-0.5 text-xs font-bold text-(--tpl-lime-ink)";
const heroTitle =
  "text-5xl leading-[0.98] font-bold tracking-tight text-balance sm:text-7xl xl:text-[88px]";
const marker =
  "relative isolate inline-block text-(--tpl-blue-text) before:absolute before:inset-x-[-4px] before:bottom-[0.08em] before:-z-10 before:h-[0.32em] before:-rotate-1 before:rounded-full before:bg-(--tpl-lime)";
const heroLead = "max-w-lg text-lg text-pretty text-muted";
const heroStatsGrid =
  "mt-2 grid w-full max-w-lg grid-cols-3 gap-4 border-t border-line pt-6";
const art = "relative mx-auto aspect-square w-full max-w-[520px]";
const blob = "absolute inset-[4%] fill-(--tpl-lime)";
const photo =
  "absolute inset-[14%] rotate-6 overflow-hidden rounded-[36px] bg-(--tpl-blue) shadow-(--tpl-shadow)";
const mascot =
  "absolute bottom-[4%] left-[2%] w-[26%] animate-[belajar-bob_2.6s_ease-in-out_infinite_alternate] motion-reduce:animate-none";
const infoCard =
  "absolute top-[8%] right-0 w-56 -rotate-3 rounded-3xl border border-line bg-surface p-4 shadow-(--tpl-shadow) animate-[belajar-float_3.2s_ease-in-out_infinite_alternate] motion-reduce:animate-none max-sm:w-48";
const face =
  "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-(--tpl-av-ink) select-none";
const faceTones = [
  "bg-(--tpl-av1)",
  "bg-(--tpl-av2)",
  "bg-(--tpl-av3)",
  "bg-(--tpl-av4)",
];
const tracksWrap = "scroll-mt-20 px-4 lg:px-8";
const tracksPanel =
  "mx-auto max-w-7xl rounded-[40px] bg-(--tpl-blue) px-5 py-14 text-(--tpl-on) sm:px-10 lg:rounded-[56px] lg:px-14 lg:py-20";
const tracksHead = "grid gap-4 lg:grid-cols-2 lg:items-end";
const tracksGrid = "mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4";
const trackCard = `group relative grid w-full gap-4 rounded-[28px] bg-(--tpl-paper) p-4 pt-7 text-left text-ink shadow-(--tpl-shadow) transition-transform duration-200 hover:rotate-0 hover:-translate-y-1 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--tpl-on)`;
const trackTilt = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];
const clip = "absolute -top-6 left-8 h-14 w-6 -rotate-12";
const trackArt =
  "flex h-40 items-center justify-center rounded-[20px] bg-(--tpl-sky)";
const countPill =
  "inline-flex items-center rounded-full bg-(--tpl-lime) px-3 py-1 text-xs font-bold text-(--tpl-lime-ink)";
const section = "mx-auto max-w-7xl scroll-mt-20 px-4 py-20 lg:px-8 lg:py-28";
const h2 = "text-4xl font-bold tracking-tight text-balance sm:text-6xl";
const lead = "max-w-xl text-lg text-pretty text-muted";
const filterBar = "flex gap-2 overflow-x-auto pb-1";
const filterItem = `inline-flex h-11 shrink-0 items-center rounded-full border px-5 text-sm font-semibold whitespace-nowrap transition-colors duration-150 ${focusRing}`;
const filterOn = "border-primary bg-primary text-on-primary";
const filterOff = "border-line bg-surface text-ink hover:bg-subtle";
const courseGrid = "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4";
const courseCard =
  "flex flex-col gap-4 rounded-[28px] border border-line bg-surface p-3 pb-4 shadow-(--tpl-shadow)";
const courseArt = "relative h-44 overflow-hidden rounded-[20px]";
const tag =
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold";
const category =
  "inline-flex items-center rounded-full bg-(--tpl-sky) px-2.5 py-1 text-xs font-semibold text-(--tpl-blue) dark:text-(--tpl-on)";
const meta = "flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted";
const detailsButton = `inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const slider = "relative mt-10 overflow-hidden rounded-[36px]";
const slideTrack =
  "flex transition-transform duration-500 ease-out motion-reduce:transition-none";
const slide =
  "grid w-full shrink-0 gap-8 rounded-[36px] bg-(--tpl-sky) p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center lg:p-14";
const roundButton = `inline-flex size-12 items-center justify-center rounded-full border border-line bg-surface transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const dot = `box-content h-2.5 rounded-full bg-clip-content p-[7px] transition-all duration-200 ${focusRing}`;
const faqLayout = "grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]";
const faqItem = "group border-b border-line";
const faqSummary = `flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl py-6 text-left text-lg font-semibold ${focusRing} [&::-webkit-details-marker]:hidden`;
const faqIcon =
  "flex size-10 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-200 group-open:rotate-45 group-open:border-(--tpl-lime) group-open:bg-(--tpl-lime) group-open:text-(--tpl-lime-ink) motion-reduce:transition-none";
const faqBody = "-mt-2 pr-14 pb-6 text-base text-pretty text-muted";
const helpCard =
  "grid gap-4 rounded-[28px] bg-(--tpl-lime) p-6 text-(--tpl-lime-ink)";
const helpButton = `inline-flex h-11 items-center justify-center justify-self-start rounded-full bg-(--tpl-lime-ink) px-5 text-sm font-semibold text-(--tpl-lime) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime-ink)`;
const footer = "px-4 pb-6 lg:px-8";
const footerPanel =
  "mx-auto max-w-7xl rounded-[40px] bg-(--tpl-blue-deep) px-6 py-12 text-(--tpl-on) sm:px-10 lg:px-14";
const footerGrid =
  "grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,2fr)_minmax(0,2fr)_minmax(0,2fr)]";
const footerLink =
  "justify-self-start rounded-sm text-sm text-(--tpl-on)/80 hover:text-(--tpl-on) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-on)";
const newsField =
  "h-12 rounded-full border-transparent bg-(--tpl-on) px-5 text-base text-(--tpl-av-ink) placeholder:text-(--tpl-av-ink)/60";
const newsButton =
  "inline-flex h-12 items-center justify-center rounded-full bg-(--tpl-lime) px-6 text-base font-semibold text-(--tpl-lime-ink) transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-on)";
const newsError =
  "rounded-full bg-(--tpl-on) px-4 py-1.5 text-sm font-medium text-(--tpl-error) sm:col-span-2";
const footerBottom =
  "mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-(--tpl-on)/20 pt-6 text-sm text-(--tpl-on)/80";
const builtWith =
  "rounded-sm font-semibold text-(--tpl-on) underline decoration-(--tpl-on)/40 underline-offset-4 hover:decoration-(--tpl-on) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-on)";

/* Data */
// prettier-ignore
const icons = {
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M18 6 6 18M6 6l12 12",
  arrow: "M5 12h14M13 6l6 6-6 6",
  prev: "m15 18-6-6 6-6",
  next: "m9 18 6-6-6-6",
  plus: "M12 5v14M5 12h14",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",
  hand: "M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.4l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15",
  star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z",
  live: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19.1 4.9a10 10 0 0 1 0 14.2M4.9 19.1a10 10 0 0 1 0-14.2",
  chat: "M7.9 20A9 9 0 1 0 4 16.1L2 22z",
  quote: "M3 21c3 0 7-1 7-8V5H3v8h4c0 4-2 5-4 5zM14 21c3 0 7-1 7-8V5h-7v8h4c0 4-2 5-4 5z",
};
type IconName = keyof typeof icons;

const BRAND = "Benak";
const MENU_ID = "belajar-mobile-menu";
const MODAL_ID = "belajar-course-modal";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// prettier-ignore
const nav = [
  { id: "courses", label: "Courses" }, { id: "tracks", label: "Tracks" },
  { id: "reviews", label: "Reviews" }, { id: "faq", label: "FAQ" },
];
// prettier-ignore
const heroStats = [
  { value: "18.000+", label: "students" }, { value: "4,9", label: "average rating" }, { value: "120+", label: "courses" },
];

/* Ilustrasi sebagai data supaya sama persis di Blade, React, dan Vue. */
const lineCap = "[stroke-linecap:round] [stroke-linejoin:round]";
// prettier-ignore
const blobShape = [{ t: "path", a: { d: "M54 3C77 5 98 23 96 48C94 72 79 96 53 97C27 98 5 83 3 57C1 31 30 1 54 3Z" } }];
// prettier-ignore
const couple = [
  { t: "circle", c: "fill-(--tpl-lime)", a: { cx: 236, cy: 64, r: 26 } },
  { t: "path", c: `fill-none stroke-(--tpl-on)/40 stroke-[3] ${lineCap}`, a: { d: "M30 70c10-14 24-14 34 0M44 40l4 10M262 140l10 4" } },
  { t: "circle", c: "fill-(--tpl-hair)", a: { cx: 82, cy: 126, r: 15 } },
  { t: "path", c: "fill-(--tpl-on)", a: { d: "M36 300C36 222 66 192 108 192C150 192 176 222 176 300Z" } },
  { t: "path", c: "fill-(--tpl-hair)", a: { d: "M70 156C66 120 86 108 108 108C134 108 148 124 146 158C146 176 138 196 128 204H88C76 194 70 176 70 156Z" } },
  { t: "circle", c: "fill-(--tpl-skin)", a: { cx: 108, cy: 152, r: 32 } },
  { t: "path", c: "fill-(--tpl-hair)", a: { d: "M76 146C78 124 94 114 112 116C128 118 138 128 140 142C126 134 104 130 76 146Z" } },
  { t: "path", c: "fill-(--tpl-lime)", a: { d: "M138 300C138 232 164 206 202 206C242 206 264 236 264 300Z" } },
  { t: "circle", c: "fill-(--tpl-skin)", a: { cx: 202, cy: 166, r: 31 } },
  { t: "path", c: "fill-(--tpl-hair)", a: { d: "M170 162C170 140 186 130 204 130C222 130 236 142 234 162C224 150 196 146 170 162Z" } },
  { t: "path", c: "fill-(--tpl-rose)", a: { d: "M156 116c-15-10-23-18-23-28a11.5 11.5 0 0 1 23-4 11.5 11.5 0 0 1 23 4c0 10-8 18-23 28z" } },
  { t: "path", c: `fill-none stroke-(--tpl-hair) stroke-[3] ${lineCap}`, a: { d: "M98 160q4 4 8 0M114 160q4 4 8 0M104 172q6 5 12 0M192 172q4 4 8 0M208 172q4 4 8 0M198 184q6 5 12 0" } },
];
// prettier-ignore
const mascotShapes = [
  { t: "path", c: `fill-none stroke-(--tpl-green) stroke-[4] ${lineCap}`, a: { d: "M50 14C50 6 54 2 60 0" } },
  { t: "ellipse", c: "fill-(--tpl-green)", a: { cx: 66, cy: 4, rx: 9, ry: 5, transform: "rotate(-20 66 4)" } },
  { t: "ellipse", c: "fill-(--tpl-blue-deep)", a: { cx: 14, cy: 66, rx: 8, ry: 12, transform: "rotate(30 14 66)" } },
  { t: "ellipse", c: "fill-(--tpl-blue-deep)", a: { cx: 86, cy: 66, rx: 8, ry: 12, transform: "rotate(-30 86 66)" } },
  { t: "path", c: "fill-(--tpl-blue) stroke-(--tpl-on) stroke-[3]", a: { d: "M50 14C78 14 92 34 92 60C92 88 74 102 50 102C26 102 8 88 8 60C8 34 22 14 50 14Z" } },
  { t: "circle", c: "fill-(--tpl-on)", a: { cx: 36, cy: 54, r: 10 } },
  { t: "circle", c: "fill-(--tpl-on)", a: { cx: 64, cy: 54, r: 10 } },
  { t: "circle", c: "fill-(--tpl-hair)", a: { cx: 38, cy: 56, r: 5 } },
  { t: "circle", c: "fill-(--tpl-hair)", a: { cx: 66, cy: 56, r: 5 } },
  { t: "circle", c: "fill-(--tpl-rose)/70", a: { cx: 26, cy: 72, r: 6 } },
  { t: "circle", c: "fill-(--tpl-rose)/70", a: { cx: 74, cy: 72, r: 6 } },
  { t: "path", c: `fill-none stroke-(--tpl-on) stroke-[4] ${lineCap}`, a: { d: "M40 74q10 10 20 0" } },
  { t: "ellipse", c: "fill-(--tpl-blue-deep)", a: { cx: 36, cy: 104, rx: 10, ry: 5 } },
  { t: "ellipse", c: "fill-(--tpl-blue-deep)", a: { cx: 64, cy: 104, rx: 10, ry: 5 } },
];
// prettier-ignore
const clipShapes = [
  { t: "path", c: `fill-none stroke-(--tpl-clip) stroke-[3.5] ${lineCap}`, a: { d: "M8 40V12a8 8 0 0 1 16 0v38a12 12 0 0 1-24 0V18" } },
];
const shadowEllipse = {
  t: "ellipse",
  c: "fill-(--tpl-shade)",
  a: { cx: 60, cy: 108, rx: 34, ry: 6 },
};
// prettier-ignore
const trackArtShapes = {
  foundations: [
    shadowEllipse,
    { t: "path", c: `fill-none stroke-(--tpl-blue-deep) stroke-[10] ${lineCap}`, a: { d: "M34 30v18a26 26 0 0 0 52 0V30M60 22v76M44 98h32" } },
    { t: "path", c: `fill-none stroke-(--tpl-blue) stroke-[10] ${lineCap}`, a: { d: "M30 26v18a26 26 0 0 0 52 0V26M56 18v76M40 94h32" } },
    { t: "path", c: `fill-none stroke-(--tpl-on)/60 stroke-[4] ${lineCap}`, a: { d: "M28 30v8M54 24v14" } },
  ],
  child: [
    shadowEllipse,
    { t: "ellipse", c: "fill-(--tpl-rose)", a: { cx: 60, cy: 76, rx: 30, ry: 32 } },
    { t: "circle", c: "fill-(--tpl-rose)", a: { cx: 60, cy: 38, r: 24 } },
    { t: "circle", c: "fill-(--tpl-skin)", a: { cx: 60, cy: 40, r: 15 } },
    { t: "ellipse", c: "fill-(--tpl-lime)", a: { cx: 60, cy: 82, rx: 18, ry: 16 } },
    { t: "circle", c: "fill-(--tpl-rose)", a: { cx: 60, cy: 82, r: 6 } },
    { t: "circle", c: "fill-(--tpl-hair)", a: { cx: 55, cy: 39, r: 2 } },
    { t: "circle", c: "fill-(--tpl-hair)", a: { cx: 65, cy: 39, r: 2 } },
    { t: "path", c: `fill-none stroke-(--tpl-hair) stroke-2 ${lineCap}`, a: { d: "M56 46q4 3 8 0" } },
    { t: "ellipse", c: "fill-(--tpl-on)/50", a: { cx: 46, cy: 64, rx: 5, ry: 12 } },
  ],
  clinical: [
    shadowEllipse,
    { t: "path", c: `fill-none stroke-(--tpl-hair) stroke-[12] ${lineCap}`, a: { d: "M74 74l22 24" } },
    { t: "circle", c: "fill-(--tpl-sky) stroke-(--tpl-violet) stroke-[10]", a: { cx: 54, cy: 52, r: 30 } },
    { t: "circle", c: "fill-none stroke-(--tpl-on)/70 stroke-[3]", a: { cx: 54, cy: 52, r: 20 } },
    { t: "path", c: `fill-none stroke-(--tpl-on) stroke-[5] ${lineCap}`, a: { d: "M40 44a16 16 0 0 1 12-10" } },
  ],
  wellbeing: [
    shadowEllipse,
    { t: "path", c: `fill-none stroke-(--tpl-green) stroke-[4] ${lineCap}`, a: { d: "M60 64V30M60 52C52 44 44 44 38 46M60 46c8-8 16-8 22-6" } },
    { t: "circle", c: "fill-(--tpl-rose)", a: { cx: 60, cy: 26, r: 10 } },
    { t: "circle", c: "fill-(--tpl-lime)", a: { cx: 36, cy: 44, r: 8 } },
    { t: "circle", c: "fill-(--tpl-star)", a: { cx: 84, cy: 38, r: 8 } },
    { t: "path", c: "fill-(--tpl-blue)", a: { d: "M44 62h32c0 10 8 14 8 26 0 12-10 20-24 20s-24-8-24-20c0-12 8-16 8-26z" } },
    { t: "path", c: "fill-(--tpl-on)/40", a: { d: "M50 70h6c-2 8-6 12-6 22h-6c0-10 4-14 6-22z" } },
  ],
};
// prettier-ignore
const tracks = [
  { id: "foundations", label: "Foundations", text: "How memory, emotion, and behaviour work.", count: 32 },
  { id: "child", label: "Child and family", text: "Development, parenting, and family systems.", count: 18 },
  { id: "clinical", label: "Clinical practice", text: "Assessment, CBT, and counselling skills.", count: 24 },
  { id: "wellbeing", label: "Wellbeing", text: "Stress, sleep, and everyday resilience.", count: 21 },
];
// prettier-ignore
const filters = [{ id: "all", label: "All courses" }, ...tracks.map((track) => ({ id: track.id, label: track.label }))];
const artTones = {
  foundations: { bg: "bg-(--tpl-sky)", fill: "fill-(--tpl-blue)" },
  child: { bg: "bg-(--tpl-peach)", fill: "fill-(--tpl-rose)" },
  clinical: { bg: "bg-(--tpl-lilac)", fill: "fill-(--tpl-violet)" },
  wellbeing: { bg: "bg-(--tpl-mint)", fill: "fill-(--tpl-green)" },
};
const bigX = [212, 92, 226, 74, 204, 106, 238, 84];
const smallX = [78, 228, 70, 222, 92, 226, 60, 212];
const courseArtShapes = (index: number, track: Track) => [
  {
    t: "circle",
    c: artTones[track].fill,
    a: { cx: bigX[index], cy: 118, r: 72 },
  },
  {
    t: "circle",
    c: "fill-(--tpl-lime)",
    a: { cx: smallX[index], cy: 52, r: 24 },
  },
  {
    t: "path",
    c: "fill-(--tpl-on)/50",
    a: { d: "M0 150C60 122 120 170 180 142S270 120 300 134V176H0Z" },
  },
  {
    t: "path",
    c: "fill-(--tpl-hair)",
    a: { d: "M116 176C116 142 131 126 150 126C169 126 184 142 184 176Z" },
  },
  { t: "circle", c: "fill-(--tpl-skin)", a: { cx: 150, cy: 106, r: 18 } },
  {
    t: "path",
    c: "fill-(--tpl-hair)",
    a: {
      d:
        index % 2
          ? "M132 104c0-14 8-20 18-20s18 6 18 20c-6-6-24-8-36 0z"
          : "M131 108c-2-16 8-24 19-24 12 0 20 8 19 24 0 10-4 18-8 22h-22c-5-4-8-12-8-22z",
    },
  },
  {
    t: "circle",
    c: "fill-(--tpl-skin)",
    a: { cx: 150, cy: 106, r: index % 2 ? 0 : 14 },
  },
];
// prettier-ignore
const courseList = [
  { id: "c1", title: "Introduction to psychology", track: "foundations", price: 0, rating: "4,9", reviews: "1.204", theory: 12, practice: 4, lessons: 24, mentor: "Dr. Ayu Lestari", text: "A friendly tour of the field: perception, memory, motivation, and the research methods behind them." },
  { id: "c2", title: "Cognitive behavioural therapy basics", track: "clinical", price: 649000, rating: "4,8", reviews: "532", theory: 16, practice: 10, lessons: 32, mentor: "Rahmat Hidayat, M.Psi.", text: "Learn the CBT model, thought records, and behavioural experiments through guided role plays." },
  { id: "c3", title: "Child development from 0 to 12", track: "child", price: 449000, rating: "4,9", reviews: "318", theory: 14, practice: 6, lessons: 28, mentor: "Nadia Putri, M.Psi.", text: "Milestones, attachment, and play, with observation tasks you can do at home or in class." },
  { id: "c4", title: "Stress and burnout recovery", track: "wellbeing", price: 299000, rating: "4,7", reviews: "884", theory: 6, practice: 8, lessons: 18, mentor: "Dimas Saputra, M.Psi.", text: "Spot the early signs of burnout and build a weekly recovery plan that fits real work." },
  { id: "c5", title: "Couples counselling skills", track: "clinical", price: 749000, rating: "4,8", reviews: "207", theory: 18, practice: 12, lessons: 36, mentor: "Dr. Sekar Wulandari", text: "Structure a first session, map conflict cycles, and practise repair conversations." },
  { id: "c6", title: "Social psychology in daily life", track: "foundations", price: 249000, rating: "4,6", reviews: "419", theory: 10, practice: 4, lessons: 20, mentor: "Bima Prakoso, M.Si.", text: "Why groups conform, how first impressions form, and what persuasion research really shows." },
  { id: "c7", title: "Parenting teenagers", track: "child", price: 349000, rating: "4,7", reviews: "261", theory: 8, practice: 6, lessons: 16, mentor: "Nadia Putri, M.Psi.", text: "Talk so teenagers listen, set limits without fights, and support their growing independence." },
  { id: "c8", title: "Mindfulness for beginners", track: "wellbeing", price: 0, rating: "4,9", reviews: "1.530", theory: 4, practice: 6, lessons: 12, mentor: "Dimas Saputra, M.Psi.", text: "Short daily practices for attention and calm, with audio guides in Bahasa Indonesia." },
].map((course, index) => ({ ...course, art: courseArtShapes(index, course.track as Track) }));
// prettier-ignore
const reviews = [
  { name: "Putri Anggraini", role: "HR specialist, Surabaya", course: "Stress and burnout recovery", quote: "I finally understand why my team burns out every quarter. The practice tasks were things I could try on Monday morning." },
  { name: "Fajar Ramadhan", role: "Psychology student, UGM", course: "Cognitive behavioural therapy basics", quote: "The role plays made CBT click for me. My mentor gave feedback on every recording within two days." },
  { name: "Melati Kusuma", role: "Kindergarten teacher, Bandung", course: "Child development from 0 to 12", quote: "I use the observation sheets with my class every week. Parents notice the difference in how I explain things." },
  { name: "Arif Nugroho", role: "Software engineer, Jakarta", course: "Mindfulness for beginners", quote: "Ten minutes a day, no jargon. I sleep better and I stopped checking Slack at midnight." },
  { name: "Lestari Handayani", role: "Counsellor, Yogyakarta", course: "Couples counselling skills", quote: "Clear structure for first sessions and honest examples from real practice. Worth every rupiah." },
];
// prettier-ignore
const faqs = [
  { q: "Do I need a psychology background?", a: "No. Foundations courses start from zero. Clinical practice courses list what you should know first on each course page." },
  { q: "What is the difference between theory and practice hours?", a: "Theory hours are short video lessons and readings. Practice hours are guided exercises, role plays, and case studies that a mentor reviews." },
  { q: "Will I get a certificate?", a: "Yes. Finish all lessons and practice tasks to receive a certificate with a verification link you can add to your CV or LinkedIn." },
  { q: "Can I study on my phone?", a: "Every lesson works in the browser on phones and laptops, and you can download audio guides to listen offline." },
  { q: "Is this a replacement for therapy?", a: "No. Our courses teach knowledge and skills. If you are struggling, please reach out to a licensed psychologist or call 119 ext 8." },
];
// prettier-ignore
const footerCols = [
  { title: "Learn", links: [["Courses", "#courses"], ["Tracks", "#tracks"], ["Free lessons", "/free"]] },
  { title: "Company", links: [["About", "/about"], ["Mentors", "/mentors"], ["Careers", "/careers"]] },
  { title: "Help", links: [["FAQ", "#faq"], ["Contact", "/contact"], ["Privacy", "/privacy"]] },
];

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const rupiah = (value: number) =>
  value ? `Rp ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` : "Free";
const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

type Track = keyof typeof artTones;
type Shape = {
  t: string;
  c?: string;
  a?: Record<string, string | number | undefined>;
};
type Course = (typeof courseList)[number];

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

const Icon: FunctionalComponent<{ name: IconName; cls?: string }> = (props) =>
  h(
    "svg",
    {
      class: props.cls ?? "size-4",
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
Icon.props = ["name", "cls"];
const Shapes: FunctionalComponent<{ list: readonly Shape[] }> = (props) =>
  props.list.map((shape) => h(shape.t, { class: shape.c, ...shape.a }));
Shapes.props = ["list"];
const Face: FunctionalComponent<{
  name: string;
  index: number;
  cls?: string;
}> = (props) =>
  h(
    "span",
    {
      "aria-hidden": "true",
      class: cx(
        face,
        faceTones[props.index % faceTones.length],
        props.cls ?? "size-10 text-sm",
      ),
    },
    initials(props.name),
  );
Face.props = ["name", "index", "cls"];
const Stars: FunctionalComponent = () =>
  h(
    "span",
    { class: "flex text-(--tpl-star)", "aria-hidden": "true" },
    [0, 1, 2, 3, 4].map(() =>
      h("svg", { viewBox: "0 0 24 24", class: "size-3.5 fill-current" }, [
        h("path", { d: icons.star }),
      ]),
    ),
  );

const rootRef = ref<HTMLElement | null>(null);
const active = ref("courses");
const menuOpen = ref(false);
const filter = ref("all");
const selected = ref<Course>(courseList[0]!);
const visible = computed(() =>
  courseList.filter(
    (course) => filter.value === "all" || course.track === filter.value,
  ),
);
const selectedTrack = computed(() =>
  tracks.find((item) => item.id === selected.value.track)!,
);
const trackLabel = (id: string) => tracks.find((item) => item.id === id)!.label;
const review = ref(0);
const email = ref("");
const emailError = ref("");

let stopReveal = () => {};
const onEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape") menuOpen.value = false;
};
onMounted(() => {
  stopReveal = revealOnScroll(rootRef.value!);
});
watch(menuOpen, (open) => {
  if (open) window.addEventListener("keydown", onEscape);
  else window.removeEventListener("keydown", onEscape);
});
onBeforeUnmount(() => {
  stopReveal();
  window.removeEventListener("keydown", onEscape);
});

function pick(id: string) {
  active.value = id;
  menuOpen.value = false;
}
function pickTrack(id: string) {
  filter.value = id;
  active.value = "courses";
  document.getElementById("courses")?.scrollIntoView();
}
function openCourse(course: Course) {
  selected.value = course;
  (document.getElementById(MODAL_ID) as HTMLDialogElement).showModal();
}
function onModalClose(event: Event) {
  const dialog = event.currentTarget as HTMLDialogElement;
  if (dialog.returnValue === "enroll")
    toast({
      title: "You are enrolled",
      description: `${selected.value.title} is waiting in your dashboard.`,
      variant: "success",
    });
  dialog.returnValue = "";
}
function freeLesson() {
  toast({
    title: "Free lesson unlocked",
    description: "Start with How memory works, 12 minutes.",
  });
}
function chat() {
  toast({
    title: "Chat opened",
    description: "Dewi from student support will reply in a few minutes.",
  });
}
function go(next: number) {
  review.value = (next + reviews.length) % reviews.length;
}
function submit() {
  const value = email.value.trim();
  if (!EMAIL_PATTERN.test(value)) {
    emailError.value = "Enter a valid email, like nama@email.com.";
    return;
  }
  emailError.value = "";
  email.value = "";
  toast({
    title: "Check your inbox",
    description: `Your free mini course is on its way to ${value}.`,
    variant: "success",
  });
}
</script>

<template>
  <div ref="rootRef" :class="root">
    <component :is="'style'">{{ keyframes }}</component>
    <header :class="headerBar">
      <div :class="headerInner">
        <a href="#top" :class="brand">
          <span :class="brandMark" aria-hidden="true">
            <svg viewBox="-4 -6 108 118" class="size-7">
              <Shapes :list="mascotShapes" />
            </svg>
          </span>
          {{ BRAND }}
        </a>
        <nav aria-label="Main" :class="navList">
          <a
            v-for="item in nav"
            :key="item.id"
            :href="`#${item.id}`"
            :aria-current="active === item.id ? 'true' : undefined"
            :class="cx(navLink, active === item.id ? navActive : navIdle)"
            @click="pick(item.id)"
            >{{ item.label }}</a
          >
        </nav>
        <div class="flex items-center gap-1">
          <a href="/login" :class="signIn">Sign in</a>
          <a
            href="#courses"
            :class="cx(pillButton, 'max-sm:hidden')"
            @click="pick('courses')"
            >Choose a course</a
          >
          <button
            type="button"
            :class="menuButton"
            :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="menuOpen ? 'true' : 'false'"
            :aria-controls="MENU_ID"
            @click="menuOpen = !menuOpen"
          >
            <Icon :name="menuOpen ? 'close' : 'menu'" cls="size-5" />
          </button>
        </div>
        <nav
          v-if="menuOpen"
          :id="MENU_ID"
          aria-label="Mobile"
          :class="mobileMenu"
        >
          <a
            v-for="item in nav"
            :key="item.id"
            :href="`#${item.id}`"
            :aria-current="active === item.id ? 'true' : undefined"
            :class="
              cx(mobileLink, active === item.id ? navActive : 'hover:bg-subtle')
            "
            @click="pick(item.id)"
            >{{ item.label }}</a
          >
          <a
            href="/login"
            :class="cx(mobileLink, 'mt-2 justify-center border border-line')"
            >Sign in</a
          >
        </nav>
      </div>
    </header>

    <main id="top">
      <section aria-labelledby="belajar-title" :class="hero">
        <div :class="heroCopy" data-reveal="">
          <p :class="heroBadge">
            <span :class="heroBadgeDot">New</span>
            120+ courses by practising psychologists
          </p>
          <h1 id="belajar-title" :class="heroTitle">
            Online <span :class="marker">psychology</span> courses
          </h1>
          <p :class="heroLead">
            Learn how the mind works from people who use it at work every day.
            Short theory, real practice with a mentor, and a certificate you can
            show.
          </p>
          <div class="flex flex-wrap gap-3">
            <a href="#courses" :class="bigButton" @click="pick('courses')">
              Choose a course
              <span :class="bigButtonIcon"><Icon name="arrow" /></span>
            </a>
            <button type="button" :class="ghostButton" @click="freeLesson">
              Try a free lesson
            </button>
          </div>
          <dl :class="heroStatsGrid">
            <div
              v-for="stat in heroStats"
              :key="stat.label"
              class="flex flex-col"
            >
              <dt class="text-sm text-muted">{{ stat.label }}</dt>
              <dd
                class="order-first text-2xl font-bold tracking-tight sm:text-3xl"
              >
                {{ stat.value }}
              </dd>
            </div>
          </dl>
        </div>

        <div :class="art" data-reveal="">
          <svg viewBox="0 0 100 100" :class="blob" aria-hidden="true">
            <Shapes :list="blobShape" />
          </svg>
          <div :class="photo">
            <svg
              viewBox="0 0 300 300"
              class="size-full"
              role="img"
              aria-label="Illustration of two people talking warmly, with a heart between them"
            >
              <Shapes :list="couple" />
            </svg>
          </div>
          <svg viewBox="-4 -6 108 118" :class="mascot" aria-hidden="true">
            <Shapes :list="mascotShapes" />
          </svg>
          <div :class="infoCard">
            <p
              class="flex items-center gap-2 text-xs font-semibold text-danger"
            >
              <Icon name="live" />
              Live tonight
            </p>
            <p class="mt-2 text-sm leading-snug font-semibold">
              Couples therapy basics
            </p>
            <p class="mt-1 text-xs text-muted">Thursday, 19:00 WIB</p>
            <div class="mt-3 flex items-center gap-2">
              <span class="flex -space-x-2">
                <Face
                  v-for="(item, index) in reviews.slice(0, 3)"
                  :key="item.name"
                  :name="item.name"
                  :index="index"
                  cls="size-7 text-[10px] ring-2 ring-surface"
                />
              </span>
              <span class="text-xs text-muted">324 joined</span>
            </div>
          </div>
        </div>
      </section>

      <section id="tracks" aria-labelledby="belajar-tracks" :class="tracksWrap">
        <div :class="tracksPanel">
          <div :class="tracksHead" data-reveal="">
            <h2 id="belajar-tracks" :class="h2">Learning tracks</h2>
            <p
              class="max-w-md text-lg text-pretty text-(--tpl-on)/85 lg:justify-self-end"
            >
              Four paths from first lecture to confident practice. Pick one to
              see its courses.
            </p>
          </div>
          <div :class="tracksGrid">
            <button
              v-for="(track, index) in tracks"
              :key="track.id"
              type="button"
              :class="cx(trackCard, trackTilt[index])"
              data-reveal=""
              @click="pickTrack(track.id)"
            >
              <svg viewBox="0 0 24 64" :class="clip" aria-hidden="true">
                <Shapes :list="clipShapes" />
              </svg>
              <span :class="trackArt">
                <svg viewBox="0 0 120 120" class="size-32" aria-hidden="true">
                  <Shapes :list="trackArtShapes[track.id as Track]" />
                </svg>
              </span>
              <span class="grid gap-1 px-1">
                <span class="text-xl font-bold tracking-tight">{{
                  track.label
                }}</span>
                <span class="text-sm text-muted">{{ track.text }}</span>
              </span>
              <span class="flex items-center justify-between px-1">
                <span :class="countPill">{{ track.count }} courses</span>
                <span
                  class="flex size-9 items-center justify-center rounded-full bg-primary text-on-primary transition-transform duration-200 group-hover:translate-x-1"
                >
                  <Icon name="arrow" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>

      <section id="courses" aria-labelledby="belajar-courses" :class="section">
        <div
          class="flex flex-wrap items-end justify-between gap-6"
          data-reveal=""
        >
          <div class="grid gap-4">
            <h2 id="belajar-courses" :class="h2">Courses</h2>
            <p :class="lead">
              Every course mixes short theory videos with practice tasks a
              mentor reviews.
            </p>
          </div>
          <p class="text-sm text-muted" aria-live="polite">
            Showing {{ visible.length }} of {{ courseList.length }} courses
          </p>
        </div>
        <div
          role="group"
          aria-label="Filter by track"
          :class="cx(filterBar, 'mt-8')"
        >
          <button
            v-for="item in filters"
            :key="item.id"
            type="button"
            :aria-pressed="filter === item.id ? 'true' : 'false'"
            :class="cx(filterItem, filter === item.id ? filterOn : filterOff)"
            @click="filter = item.id"
          >
            {{ item.label }}
          </button>
        </div>
        <ul :class="courseGrid">
          <li
            v-for="course in visible"
            :key="course.id"
            :class="courseCard"
            :data-course="course.id"
          >
            <div :class="cx(courseArt, artTones[course.track as Track].bg)">
              <svg
                viewBox="0 0 300 176"
                preserveAspectRatio="xMidYMid slice"
                class="size-full"
                aria-hidden="true"
              >
                <Shapes :list="course.art" />
              </svg>
              <span class="absolute top-3 left-3 flex gap-1.5">
                <span
                  v-if="course.price === 0"
                  :class="cx(tag, 'bg-(--tpl-lime) text-(--tpl-lime-ink)')"
                  >Free</span
                >
                <span :class="cx(tag, 'bg-(--tpl-on) text-(--tpl-av-ink)')"
                  >Online</span
                >
              </span>
            </div>
            <div class="grid flex-1 content-start gap-3 px-2">
              <span :class="cx(category, 'justify-self-start')">{{
                trackLabel(course.track)
              }}</span>
              <h3 class="text-lg leading-snug font-bold tracking-tight">
                {{ course.title }}
              </h3>
              <p class="flex items-center gap-2 text-sm">
                <Stars />
                <span class="font-semibold">{{ course.rating }}</span>
                <span class="text-muted">({{ course.reviews }} reviews)</span>
              </p>
              <p :class="meta">
                <span class="flex items-center gap-1.5">
                  <Icon name="book" cls="size-3.5" />
                  Theory {{ course.theory }} h
                </span>
                <span class="flex items-center gap-1.5">
                  <Icon name="hand" cls="size-3.5" />
                  Practice {{ course.practice }} h
                </span>
              </p>
            </div>
            <div
              class="flex items-center justify-between gap-3 border-t border-line px-2 pt-4"
            >
              <span class="text-lg font-bold tracking-tight tabular-nums">{{
                rupiah(course.price)
              }}</span>
              <button
                type="button"
                :class="detailsButton"
                :aria-label="`Details, ${course.title}`"
                @click="openCourse(course)"
              >
                Details
              </button>
            </div>
          </li>
        </ul>
        <Modal :id="MODAL_ID" title="Course details" @close="onModalClose">
          <div class="grid gap-4 text-ink">
            <div
              :class="
                cx(
                  'h-32 overflow-hidden rounded-2xl',
                  artTones[selected.track as Track].bg,
                )
              "
            >
              <svg
                viewBox="0 0 300 176"
                preserveAspectRatio="xMidYMid slice"
                class="size-full"
                aria-hidden="true"
              >
                <Shapes :list="selected.art" />
              </svg>
            </div>
            <div class="grid gap-1">
              <span :class="cx(category, 'justify-self-start')">{{
                selectedTrack.label
              }}</span>
              <p class="text-lg font-bold" data-modal-title="">
                {{ selected.title }}
              </p>
              <p class="text-sm text-muted">{{ selected.text }}</p>
            </div>
            <dl class="grid grid-cols-3 gap-3 text-sm">
              <div class="rounded-2xl bg-subtle p-3">
                <dt class="text-muted">Lessons</dt>
                <dd class="font-semibold">{{ selected.lessons }}</dd>
              </div>
              <div class="rounded-2xl bg-subtle p-3">
                <dt class="text-muted">Theory</dt>
                <dd class="font-semibold">{{ selected.theory }} h</dd>
              </div>
              <div class="rounded-2xl bg-subtle p-3">
                <dt class="text-muted">Practice</dt>
                <dd class="font-semibold">{{ selected.practice }} h</dd>
              </div>
            </dl>
            <p
              class="flex flex-wrap items-center justify-between gap-2 text-sm"
            >
              <span>Mentor: {{ selected.mentor }}</span>
              <span class="text-lg font-bold">{{
                rupiah(selected.price)
              }}</span>
            </p>
          </div>
          <template #footer>
            <button
              type="submit"
              value="cancel"
              :class="cx(ghostButton, 'h-10 text-sm')"
            >
              Close
            </button>
            <button type="submit" value="enroll" :class="pillButton">
              Enroll now
            </button>
          </template>
        </Modal>
      </section>

      <section id="reviews" aria-labelledby="belajar-reviews" :class="section">
        <div class="grid gap-4" data-reveal="">
          <h2 id="belajar-reviews" :class="h2">
            Students on <span :class="marker">Benak</span>
          </h2>
          <p :class="lead">
            Teachers, HR teams, engineers, and future psychologists share what
            changed after their course.
          </p>
        </div>
        <div class="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p class="text-sm font-semibold text-muted" aria-live="polite">
            Review {{ review + 1 }} of {{ reviews.length }}
          </p>
          <div class="flex gap-2">
            <button
              type="button"
              :class="roundButton"
              aria-label="Previous review"
              @click="go(review - 1)"
            >
              <Icon name="prev" cls="size-5" />
            </button>
            <button
              type="button"
              :class="roundButton"
              aria-label="Next review"
              @click="go(review + 1)"
            >
              <Icon name="next" cls="size-5" />
            </button>
          </div>
        </div>
        <div :class="cx(slider, 'mt-6')" data-reveal="">
          <ul
            :class="slideTrack"
            :style="{ transform: `translateX(-${review * 100}%)` }"
          >
            <li
              v-for="(item, position) in reviews"
              :key="item.name"
              :class="slide"
              :aria-hidden="position !== review ? 'true' : 'false'"
              :inert="position !== review"
            >
              <blockquote class="grid gap-6">
                <Icon name="quote" cls="size-10 text-(--tpl-blue)" />
                <p
                  class="text-2xl leading-snug font-semibold tracking-tight text-pretty sm:text-3xl"
                >
                  {{ item.quote }}
                </p>
                <footer class="flex items-center gap-3">
                  <Face
                    :name="item.name"
                    :index="position"
                    cls="size-12 text-base"
                  />
                  <span>
                    <span class="block font-semibold">{{ item.name }}</span>
                    <span class="block text-sm text-muted">{{
                      item.role
                    }}</span>
                  </span>
                </footer>
              </blockquote>
              <div class="grid gap-2 rounded-[28px] bg-surface p-5">
                <span class="text-xs text-muted">Course taken</span>
                <span class="font-semibold">{{ item.course }}</span>
                <span class="flex items-center gap-2 text-sm">
                  <Stars />
                  5,0
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div class="mt-6 flex justify-center">
          <button
            v-for="(item, position) in reviews"
            :key="item.name"
            type="button"
            :class="
              cx(
                dot,
                position === review
                  ? 'w-8 bg-primary'
                  : 'w-2.5 bg-line hover:bg-muted',
              )
            "
            :aria-label="`Show review ${position + 1}`"
            :aria-current="position === review ? 'true' : undefined"
            @click="go(position)"
          />
        </div>
      </section>

      <section id="faq" aria-labelledby="belajar-faq" :class="section">
        <div :class="faqLayout">
          <div class="grid content-start gap-6" data-reveal="">
            <h2 id="belajar-faq" :class="h2">Questions, answered</h2>
            <p :class="lead">
              Everything about courses, certificates, and studying with a
              mentor.
            </p>
            <div :class="helpCard">
              <Icon name="chat" cls="size-8" />
              <p class="text-xl font-bold tracking-tight">
                Still unsure which course fits?
              </p>
              <p class="text-sm">
                Our student advisors reply within minutes, every day from 08:00
                to 21:00 WIB.
              </p>
              <button type="button" :class="helpButton" @click="chat">
                Chat with an advisor
              </button>
            </div>
          </div>
          <div class="border-t border-line" data-reveal="">
            <details
              v-for="(item, index) in faqs"
              :key="item.q"
              name="belajar-faq"
              :class="faqItem"
              :open="index === 0"
            >
              <summary :class="faqSummary">
                {{ item.q }}
                <span :class="faqIcon" aria-hidden="true"
                  ><Icon name="plus"
                /></span>
              </summary>
              <p :class="faqBody">{{ item.a }}</p>
            </details>
          </div>
        </div>
      </section>
    </main>

    <footer :class="footer">
      <div :class="footerPanel">
        <div :class="footerGrid">
          <div>
            <a
              href="#top"
              :class="cx(brand, 'focus-visible:outline-(--tpl-on)')"
            >
              <span :class="cx(brandMark, 'bg-(--tpl-on)')" aria-hidden="true">
                <svg viewBox="-4 -6 108 118" class="size-7">
                  <Shapes :list="mascotShapes" />
                </svg>
              </span>
              {{ BRAND }}
            </a>
            <p class="mt-6 text-2xl font-bold tracking-tight text-balance">
              Get a free mini course every month.
            </p>
            <form
              class="mt-6 grid max-w-md gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start"
              novalidate
              @submit.prevent="submit"
            >
              <div>
                <label for="belajar-email" class="sr-only">Email address</label>
                <Input
                  id="belajar-email"
                  v-model="email"
                  type="email"
                  name="email"
                  placeholder="nama@email.com"
                  :class="newsField"
                  :aria-invalid="emailError ? 'true' : undefined"
                  :aria-describedby="
                    emailError ? 'belajar-email-error' : undefined
                  "
                />
              </div>
              <button type="submit" :class="newsButton">Subscribe</button>
              <p v-if="emailError" id="belajar-email-error" :class="newsError">
                {{ emailError }}
              </p>
            </form>
          </div>
          <nav
            v-for="col in footerCols"
            :key="col.title"
            :aria-label="col.title"
            class="grid content-start gap-3"
          >
            <p class="font-semibold">{{ col.title }}</p>
            <a
              v-for="[label, href] in col.links"
              :key="label"
              :href="href"
              :class="footerLink"
              >{{ label }}</a
            >
          </nav>
        </div>
        <div :class="footerBottom">
          <p>&copy; 2026 PT Benak Edukasi Nusantara</p>
          <p>
            Built with
            <a href="https://markasui.pages.dev" :class="builtWith">MarkasUI</a>
          </p>
        </div>
      </div>
    </footer>
    <Toaster />
  </div>
</template>
