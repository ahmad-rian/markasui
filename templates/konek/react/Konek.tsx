"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { Button } from "../../../components/button/Button";
import { Faq } from "../../../components/faq/Faq";
import { Input } from "../../../components/input/Input";
import { Switch } from "../../../components/switch/Switch";
import { Toaster, toast } from "../../../components/toast/Toast";

/* Palet lokal merek dan ilustrasi, terang dan gelap. */
const palette =
  "[--tpl-red:#d6001c] [--tpl-red-strong:#b30017] [--tpl-orange:#ff8a3d] [--tpl-orange-deep:#e8541f] [--tpl-cream:#fff4e3] [--tpl-brown:#8b4a2b] [--tpl-pink:#ffb3c2] [--tpl-violet:#7b4dff] [--tpl-sun:#ffd54a] [--tpl-green:#2fd27a] [--tpl-line:#141414] [--tpl-doodle:#141414] [--tpl-paper:#ffffff] [--tpl-night:#0f0f0f] [--tpl-on-night:#ffffff] [--tpl-on-bright:#141414] [--tpl-white:#ffffff] dark:[--tpl-orange:#f27f34] dark:[--tpl-orange-deep:#d24a18] dark:[--tpl-cream:#f6e9d5] dark:[--tpl-violet:#a68cff] dark:[--tpl-line:#0b0b0b] dark:[--tpl-doodle:#efefef] dark:[--tpl-paper:#f4f4f4] dark:[--tpl-night:#1d1d1d]";
/* Animasi ilustrasi (melayang, ekor, sinyal, amplop) dan animasi masuk saat scroll. Semua mati di reduced motion. */
const motionCss =
  "@keyframes konek-float{50%{translate:0 -10px}}@keyframes konek-wag{0%,100%{rotate:-10deg}50%{rotate:12deg}}@keyframes konek-pulse{50%{opacity:.3}}@keyframes konek-fly{50%{translate:12px -14px;rotate:6deg}}@media (prefers-reduced-motion:no-preference){.konek-float{animation:konek-float 5s ease-in-out infinite}.konek-float-late{animation:konek-float 5s ease-in-out -2.5s infinite}.konek-wag{animation:konek-wag 1.4s ease-in-out infinite}.konek-pulse{animation:konek-pulse 2s ease-in-out infinite}.konek-fly{animation:konek-fly 3.5s ease-in-out infinite}[data-motion=on] [data-reveal]{transition:opacity .7s cubic-bezier(.2,.7,.2,1),translate .7s cubic-bezier(.2,.7,.2,1)}[data-motion=on] [data-reveal]:not([data-shown]){opacity:0;translate:0 24px}}";

/* Kelas */
const root =
  "min-h-dvh overflow-x-clip bg-surface text-ink [scroll-behavior:smooth] motion-reduce:[scroll-behavior:auto]";
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const header =
  "sticky top-0 z-40 border-b border-line/60 bg-surface/90 backdrop-blur";
const headerInner =
  "relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6";
const brand = `inline-flex items-center gap-2 rounded-md text-2xl font-extrabold tracking-tight text-(--tpl-red) ${focusRing}`;
const brandMark =
  "inline-flex size-8 items-center justify-center rounded-full bg-(--tpl-red) text-(--tpl-white)";
const navList = "hidden items-center gap-1 lg:flex";
const navLink = `inline-flex h-9 items-center rounded-full px-3 text-sm font-medium transition-colors duration-150 ease-out motion-reduce:transition-none ${focusRing}`;
const navIdle = "text-muted hover:text-ink";
const navOn =
  "text-ink underline decoration-primary decoration-2 underline-offset-8";
const headerActions = "flex items-center gap-2";
const appButton = `hidden h-10 items-center rounded-full bg-(--tpl-night) px-5 text-sm font-semibold text-(--tpl-on-night) transition-transform duration-150 ease-out hover:-translate-y-0.5 motion-reduce:transition-none sm:inline-flex ${focusRing}`;
const menuButton = `inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-subtle lg:hidden ${focusRing}`;
const menuPanel =
  "absolute inset-x-4 top-full mt-2 grid gap-1 rounded-3xl border border-line bg-surface p-2 shadow-overlay lg:hidden";
const menuLink = `flex h-11 items-center rounded-2xl px-4 text-sm font-medium text-ink hover:bg-subtle ${focusRing}`;
const hero =
  "relative mx-auto grid max-w-7xl scroll-mt-20 justify-items-center px-4 pt-14 pb-12 text-center md:px-6 md:pt-20 lg:pb-16";
const heroTitle =
  "text-[clamp(3.75rem,12vw,9rem)] leading-[0.86] font-extrabold tracking-[-0.055em] text-ink";
const heroLine = "block";
const heroLead = "mt-8 max-w-md text-base text-pretty text-muted md:text-lg";
const heroActions = "mt-8 flex flex-wrap justify-center gap-3";
const pillLink = `inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-transform duration-150 ease-out hover:-translate-y-0.5 motion-reduce:transition-none ${focusRing}`;
const outlineLink = "border-2 border-ink text-ink";
const redButton =
  "bg-(--tpl-red) text-(--tpl-white) hover:bg-(--tpl-red-strong)";
const artRow = "mt-10 grid w-full max-w-md grid-cols-2 gap-4 lg:contents";
const artBase = "h-auto w-full lg:absolute lg:bottom-4 lg:w-[25%] lg:max-w-96";
const wrap = "mx-auto max-w-7xl px-4 md:px-6";
const section = "scroll-mt-20 py-16 md:py-24";
const h2 =
  "text-4xl font-extrabold tracking-[-0.04em] text-balance md:text-6xl";
const sectionLead = "mt-4 max-w-xl text-base text-pretty text-muted md:text-lg";
const cardGrid = "grid gap-5 md:grid-cols-2";
const bigCard =
  "relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-[2rem] p-8 md:p-10";
const cardIcon =
  "inline-flex size-14 items-center justify-center rounded-full text-(--tpl-on-bright)";
const cardTitle =
  "mt-8 max-w-sm text-4xl leading-[1.02] font-extrabold tracking-[-0.04em] md:text-5xl";
const cardText = "mt-4 max-w-sm text-base";
const cardButton = `relative mt-10 inline-flex h-12 items-center gap-2 self-start rounded-full px-6 text-sm font-semibold transition-transform duration-150 ease-out hover:translate-x-1 motion-reduce:transition-none ${focusRing}`;
const cardArcs = "pointer-events-none absolute -right-10 -bottom-10 size-64";
const statGrid =
  "grid grid-cols-2 gap-x-6 gap-y-10 border-y border-line py-12 md:grid-cols-4";
const statValue = "text-4xl font-extrabold tracking-[-0.04em] md:text-5xl";
const statLabel = "mt-2 text-sm text-muted";
const pricingHead = "flex flex-wrap items-end justify-between gap-6";
const tabGroup =
  "inline-flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1";
const tabBase = `h-10 rounded-full px-4 text-sm font-semibold transition-colors duration-150 ease-out motion-reduce:transition-none ${focusRing}`;
const tabIdle = "text-muted hover:text-ink";
const tabOn = "bg-primary text-on-primary";
const boostRow = "mt-8 flex items-center gap-3";
const boostLabelClass = "text-sm font-medium text-ink";
const planGrid = "mt-8 grid gap-5 md:grid-cols-3";
const planCard =
  "relative grid content-start gap-5 rounded-[2rem] border-2 bg-surface p-7";
const planIdle = "border-line";
const planFeatured = "border-primary";
const planBadge =
  "absolute -top-3.5 left-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary";
const planName = "text-sm font-semibold text-muted";
const planAmount = "text-5xl font-extrabold tracking-[-0.04em]";
const planPrice = "text-lg font-semibold";
const planPeriod = "text-sm font-normal text-muted";
const perkList = "grid gap-2 text-sm text-muted";
const perk = "flex items-center gap-2";
const perkIcon = "size-4 shrink-0 text-success";
const coverageGrid = "grid items-start gap-10 lg:grid-cols-2";
const coverageForm = "mt-8 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end";
const chipRow = "mt-4 flex flex-wrap items-center gap-2 text-sm text-muted";
const chip = `inline-flex h-8 items-center rounded-full border border-line px-3 text-sm font-medium text-ink hover:bg-subtle ${focusRing}`;
const errorText = "text-sm text-danger sm:col-span-2";
const resultCard = "grid gap-6 rounded-[2rem] bg-subtle p-8";
const resultTitle = "text-2xl font-extrabold tracking-tight";
const resultRows = "grid gap-3 sm:grid-cols-3";
const resultCell = "grid gap-1 rounded-2xl bg-surface p-4";
const resultLabel = "text-xs text-muted";
const resultValue = "text-base font-semibold";
const bars = "flex h-10 items-end gap-1.5";
const barBase = "w-3 rounded-sm";
const faqWrap = "scroll-mt-20 py-16 md:py-24";
const careers =
  "grid gap-6 rounded-[2rem] bg-(--tpl-red) p-8 text-(--tpl-white) md:grid-cols-[1fr_auto] md:items-end md:p-12";
const careersTitle =
  "text-4xl font-extrabold tracking-[-0.04em] text-balance md:text-6xl";
const careersLink = `inline-flex h-12 items-center justify-center rounded-full bg-(--tpl-white) px-6 text-sm font-semibold text-(--tpl-on-bright) ${focusRing}`;
const footer = "mt-16 border-t border-line";
const footerInner =
  "mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6";
const footerTitle = "text-sm font-semibold text-ink";
const footerList = "mt-3 grid gap-2 text-sm text-muted";
const quietLink = `rounded-sm hover:text-ink ${focusRing}`;
const footerBottom =
  "mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 pb-10 text-sm text-muted md:px-6";
const small = "text-sm text-muted";
const srOnly = "sr-only";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const icons = {
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M18 6 6 18M6 6l12 12",
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12l5 5 9-10",
  people:
    "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM3 21v-1a6 6 0 0 1 12 0v1M16 3.5a4 4 0 0 1 0 7M21 21v-1a6 6 0 0 0-4-5.6",
  leaf: "M5 21c0-9 5-15 15-16-1 10-7 15-15 16ZM5 21l8-8",
  signal: "M5 18v-2M10 18v-5M15 18V9M20 18V5",
};
type IconName = keyof typeof icons;

const nav = [
  { id: "home", label: "Home" },
  { id: "pricing", label: "Pricing" },
  { id: "about", label: "About" },
  { id: "investors", label: "Investors" },
  { id: "coverage", label: "Business" },
  { id: "careers", label: "Careers" },
];
const sectionIds = nav.map((item) => item.id);

/* Ilustrasi kartun: path SVG 320x320, dikelompokkan per lapisan supaya tiap lapisan bisa dianimasikan. */
const circle = (x: number, y: number, r: number) =>
  `M${x - r} ${y}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`;
const oval = (x: number, y: number, rx: number, ry: number) =>
  `M${x - rx} ${y}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0Z`;
const outline = "stroke-(--tpl-line) [stroke-width:5]";
const line = "fill-none stroke-(--tpl-line) [stroke-width:3.5]";
const doodle = "fill-none stroke-(--tpl-doodle) [stroke-width:3.5]";
const cream = `fill-(--tpl-cream) ${outline}`;
const cloud = `fill-(--tpl-orange) ${outline}`;
const hatch = "fill-none stroke-(--tpl-orange-deep) [stroke-width:4]";
const ink = "fill-(--tpl-line)";
const blush = "fill-(--tpl-pink)";
const pivot = "[transform-box:view-box]";

type Shape = { d: string; c: string };
type Layer = { c: string; s: Shape[] };
type Art = { label: string; float: string; layers: Layer[] };

const catArt: Art = {
  label: "Cartoon cat sitting on an orange cloud, holding a phone",
  float: "konek-float",
  layers: [
    {
      c: "konek-pulse",
      s: [
        { d: circle(72, 96, 6), c: "fill-(--tpl-violet)" },
        {
          d: "M58 82A20 20 0 0 1 86 82M48 72A34 34 0 0 1 96 72M38 62A48 48 0 0 1 106 62",
          c: "fill-none stroke-(--tpl-violet) [stroke-width:7]",
        },
      ],
    },
    {
      c: "",
      s: [
        { d: "M252 64c10-14 28-4 18 9-8 11-25 0-12-10", c: doodle },
        {
          d: "M268 116l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z",
          c: `fill-(--tpl-sun) stroke-(--tpl-line) [stroke-width:3]`,
        },
        { d: "M26 150l12 4M30 164h12M276 196l12-4", c: doodle },
      ],
    },
    {
      c: "",
      s: [
        {
          d: "M48 292C18 292 14 252 44 246c-6-32 34-46 54-26 10-32 62-36 74-6 16-22 64-16 64 14 34-6 56 24 36 44 24 14 8 34-18 30H70c-20 2-30-6-22-10Z",
          c: cloud,
        },
        {
          d: "M60 270c30 12 140 16 202-2M76 284l18-12M108 290l20-14M206 290l22-15M240 284l16-11",
          c: hatch,
        },
      ],
    },
    {
      c: `konek-wag ${pivot} [transform-origin:196px_206px]`,
      s: [
        {
          d: "M196 206c40-2 52-38 30-56-12-10-24 0-16 10",
          c: "fill-none stroke-(--tpl-line) [stroke-width:17]",
        },
        {
          d: "M196 206c40-2 52-38 30-56-12-10-24 0-16 10",
          c: "fill-none stroke-(--tpl-cream) [stroke-width:8]",
        },
      ],
    },
    {
      c: "",
      s: [
        {
          d: "M118 216c-6-48 12-76 42-76s48 28 42 76Z",
          c: cream,
        },
        { d: "M120 96l-2-46 32 24ZM200 96l2-46-32 24Z", c: cream },
        { d: "M126 84l-1-22 15 12ZM194 84l1-22-15 12Z", c: blush },
        { d: oval(160, 108, 46, 40), c: cream },
        { d: "M150 72l4 12M160 70v13M170 72l-4 12", c: line },
        { d: oval(143, 106, 5, 6), c: ink },
        { d: oval(177, 106, 5, 6), c: ink },
        { d: `${oval(132, 120, 8, 5)}${oval(188, 120, 8, 5)}`, c: blush },
        {
          d: "M155 115h10l-5 6Z",
          c: "fill-(--tpl-pink) stroke-(--tpl-line) [stroke-width:2.5]",
        },
        { d: "M151 125q4.5 5 9 0 4.5 5 9 0", c: line },
        {
          d: "M112 112l-16-4M112 120l-16 2M208 112l16-4M208 120l16 2",
          c: line,
        },
        {
          d: "M142 156h36a6 6 0 0 1 6 6v44a6 6 0 0 1-6 6h-36a6 6 0 0 1-6-6v-44a6 6 0 0 1 6-6Z",
          c: `fill-(--tpl-night) ${outline}`,
        },
        { d: "M143 165h34v36h-34Z", c: "fill-(--tpl-violet)" },
        { d: "M150 172h20v10h-14l-6 5Z", c: "fill-(--tpl-paper)" },
        { d: `${oval(136, 186, 10, 9)}${oval(184, 186, 10, 9)}`, c: cream },
        { d: `${oval(138, 216, 15, 9)}${oval(182, 216, 15, 9)}`, c: cream },
      ],
    },
  ],
};

const dogArt: Art = {
  label: "Cartoon puppy sitting on an orange cloud, reading a letter",
  float: "konek-float-late",
  layers: [
    {
      c: "konek-fly [transform-box:fill-box] origin-center",
      s: [
        { d: "M18 132h62v40H18Z", c: `fill-(--tpl-paper) ${outline}` },
        { d: "M18 132l31 22 31-22", c: `fill-none ${outline}` },
        { d: "M24 116l-8-10M40 112l-2-12M58 114l4-11", c: doodle },
      ],
    },
    {
      c: "rotate-6 [transform-box:fill-box] origin-center",
      s: [
        {
          d: "M222 50h64v64h-64Z",
          c: "fill-(--tpl-sun) stroke-(--tpl-line) [stroke-width:4]",
        },
        {
          d: "M240 66v32M240 84q8-9 15 0v14M268 82v16M281 66v20",
          c: "fill-none stroke-(--tpl-line) [stroke-width:5]",
        },
        { d: `${circle(268, 73, 3)}${circle(281, 96, 3)}`, c: ink },
      ],
    },
    {
      c: "",
      s: [
        {
          d: "M100 46c-6-8-18-2-12 8l12 10 12-10c6-10-6-16-12-8Z",
          c: "fill-(--tpl-red) stroke-(--tpl-line) [stroke-width:3]",
        },
        { d: "M262 168c12-6 20 8 10 14-10 6-18-8-6-14", c: doodle },
        { d: "M286 214l12 4M22 196l12-4", c: doodle },
      ],
    },
    {
      c: "",
      s: [
        {
          d: "M40 290c-26-4-22-40 6-40 0-30 40-40 56-18 14-36 70-36 78-6 18-20 64-12 60 18 32-2 50 26 28 42 12 18-16 22-32 16H64c-20 0-34-6-24-12Z",
          c: cloud,
        },
        {
          d: "M54 272c34 12 150 14 210-4M70 286l18-12M104 290l20-14M200 290l22-15M236 286l16-11",
          c: hatch,
        },
      ],
    },
    {
      c: `konek-wag ${pivot} [transform-origin:186px_214px]`,
      s: [
        {
          d: "M186 214c24-8 30-28 20-42",
          c: "fill-none stroke-(--tpl-line) [stroke-width:17]",
        },
        {
          d: "M186 214c24-8 30-28 20-42",
          c: "fill-none stroke-(--tpl-cream) [stroke-width:8]",
        },
      ],
    },
    {
      c: "",
      s: [
        { d: "M110 220c-6-48 12-74 40-74s46 26 40 74Z", c: cream },
        { d: oval(150, 112, 44, 38), c: cream },
        { d: oval(168, 106, 13, 12), c: "fill-(--tpl-brown)" },
        {
          d: "M112 92c-20 4-24 40-12 50 12 4 18-22 20-38ZM188 92c20 4 24 40 12 50-12 4-18-22-20-38Z",
          c: `fill-(--tpl-brown) ${outline}`,
        },
        { d: `${oval(136, 110, 5, 6)}${oval(166, 110, 5, 6)}`, c: ink },
        { d: oval(150, 124, 8, 6), c: ink },
        { d: "M147 134q3 10 6 0Z", c: blush },
        { d: "M142 132q8 8 16 0", c: line },
        {
          d: "M120 160l60-8 6 54-60 8Z",
          c: `fill-(--tpl-paper) ${outline}`,
        },
        { d: "M132 170l40-5M134 182l40-5M136 194l24-3", c: line },
        { d: `${oval(124, 192, 10, 9)}${oval(182, 186, 10, 9)}`, c: cream },
        { d: `${oval(128, 220, 15, 9)}${oval(172, 220, 15, 9)}`, c: cream },
      ],
    },
  ],
};

const arcs =
  "M40 200a120 120 0 0 1 240 0M80 200a80 80 0 0 1 160 0M120 200a40 40 0 0 1 80 0";

const cards = [
  {
    id: "people",
    title: "Empowering people",
    text: "Affordable data, free calls to family, and digital skills classes in 120 cities. Connection should never be a luxury.",
    icon: "people" as IconName,
    card: "bg-(--tpl-red) text-(--tpl-white)",
    iconTone: "bg-(--tpl-green)",
    button: "bg-(--tpl-white) text-(--tpl-on-bright)",
    arcs: "stroke-(--tpl-white)/25",
    href: "#pricing",
  },
  {
    id: "future",
    title: "We connect for a better future",
    text: "Solar powered towers, recycled SIM trays, and a network that reaches villages from Aceh to Papua.",
    icon: "leaf" as IconName,
    card: "bg-(--tpl-night) text-(--tpl-on-night)",
    iconTone: "bg-(--tpl-white)",
    button: "border-2 border-(--tpl-white) text-(--tpl-white)",
    arcs: "stroke-(--tpl-white)/15",
    href: "#coverage",
  },
];

const stats = [
  ["60 M+", "customers across Indonesia"],
  ["34", "provinces on our network"],
  ["98%", "of people within 4G reach"],
  ["Rp41,2 T", "revenue in 2025"],
];

type Plan = {
  name: string;
  amount: string;
  boosted: string;
  price: string;
  boostedPrice: string;
  perks: string[];
};
const tabs = [
  {
    id: "prepaid",
    label: "Prepaid",
    boost: "Double the quota",
    period: "/30 days",
  },
  {
    id: "postpaid",
    label: "Postpaid",
    boost: "Double the quota",
    period: "/month",
  },
  {
    id: "home",
    label: "Home internet",
    boost: "Double the speed",
    period: "/month",
  },
];
const plans: Record<string, Plan[]> = {
  prepaid: [
    {
      name: "Lite",
      amount: "6 GB",
      boosted: "12 GB",
      price: "Rp35.000",
      boostedPrice: "Rp50.000",
      perks: ["Unlimited WhatsApp", "100 minutes to all operators"],
    },
    {
      name: "Daily",
      amount: "25 GB",
      boosted: "50 GB",
      price: "Rp75.000",
      boostedPrice: "Rp99.000",
      perks: ["Unlimited social apps", "Free calls to Konek numbers"],
    },
    {
      name: "Max",
      amount: "60 GB",
      boosted: "120 GB",
      price: "Rp130.000",
      boostedPrice: "Rp165.000",
      perks: ["5G where available", "Hotspot with no limits"],
    },
  ],
  postpaid: [
    {
      name: "Halo",
      amount: "30 GB",
      boosted: "60 GB",
      price: "Rp100.000",
      boostedPrice: "Rp135.000",
      perks: ["Rollover unused quota", "Unlimited calls"],
    },
    {
      name: "Halo Plus",
      amount: "75 GB",
      boosted: "150 GB",
      price: "Rp175.000",
      boostedPrice: "Rp220.000",
      perks: ["Video streaming pass", "Roaming in ASEAN"],
    },
    {
      name: "Halo Family",
      amount: "200 GB",
      boosted: "400 GB",
      price: "Rp350.000",
      boostedPrice: "Rp425.000",
      perks: ["Share with 4 lines", "Priority support"],
    },
  ],
  home: [
    {
      name: "Basic",
      amount: "30 Mbps",
      boosted: "60 Mbps",
      price: "Rp250.000",
      boostedPrice: "Rp310.000",
      perks: ["Free Wi-Fi 6 router", "Installed in 2 days"],
    },
    {
      name: "Stream",
      amount: "100 Mbps",
      boosted: "200 Mbps",
      price: "Rp385.000",
      boostedPrice: "Rp455.000",
      perks: ["90 TV channels", "Mesh extender included"],
    },
    {
      name: "Ultra",
      amount: "300 Mbps",
      boosted: "600 Mbps",
      price: "Rp575.000",
      boostedPrice: "Rp690.000",
      perks: ["Symmetric upload", "Static IP on request"],
    },
  ],
};
const FEATURED = 1;

type Coverage = { network: string; speed: string; home: string; bars: number };
const coverageByCity: Record<string, Coverage> = {
  jakarta: {
    network: "5G",
    speed: "Up to 420 Mbps",
    home: "Fiber ready",
    bars: 4,
  },
  surabaya: {
    network: "5G",
    speed: "Up to 380 Mbps",
    home: "Fiber ready",
    bars: 4,
  },
  bandung: {
    network: "5G",
    speed: "Up to 350 Mbps",
    home: "Fiber ready",
    bars: 4,
  },
  denpasar: {
    network: "5G",
    speed: "Up to 300 Mbps",
    home: "Fiber ready",
    bars: 4,
  },
  medan: {
    network: "4G+",
    speed: "Up to 150 Mbps",
    home: "Fiber ready",
    bars: 3,
  },
  makassar: {
    network: "4G+",
    speed: "Up to 140 Mbps",
    home: "Fiber in 2026",
    bars: 3,
  },
  jayapura: {
    network: "4G",
    speed: "Up to 80 Mbps",
    home: "Fixed wireless",
    bars: 2,
  },
};
const fallbackCoverage: Coverage = {
  network: "4G",
  speed: "Up to 60 Mbps",
  home: "Fiber coming in 2027",
  bars: 2,
};
const quickCities = ["Jakarta", "Medan", "Makassar", "Jayapura"];
const barHeights = ["h-3", "h-5", "h-7", "h-10"];

const faqs = [
  {
    question: "Can I keep my current number?",
    answer:
      "Yes. Port your number from any Indonesian operator in the app. It takes about 24 hours and your old SIM keeps working until the switch.",
  },
  {
    question: "How fast is SIM card delivery?",
    answer:
      "Same day in Jakarta, Surabaya, and Bandung, and one to two days everywhere else. Delivery is free.",
  },
  {
    question: "What happens when I run out of quota?",
    answer:
      "You keep a slow 256 Kbps connection for messaging, and you can add a top up from Rp10.000 in the app at any time.",
  },
  {
    question: "Is home internet available in apartments?",
    answer:
      "In most buildings, yes. Check coverage with your city and our team confirms the building within one working day.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Anytime. Upgrades apply right away, and downgrades start on your next billing date with no fee.",
  },
];

const footerColumns = [
  {
    title: "Products",
    links: ["Prepaid", "Postpaid", "Home internet", "eSIM"],
  },
  { title: "Company", links: ["About", "Investors", "Careers", "Newsroom"] },
  {
    title: "Support",
    links: ["Help center", "Store locator", "Network status", "Contact"],
  },
];

function lookupCoverage(city: string): Coverage {
  return coverageByCity[city.trim().toLowerCase()] ?? fallbackCoverage;
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
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function Icon({ name, className }: { name: IconName; className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[name]} />
    </svg>
  );
}

function Illustration({ art, className }: { art: Art; className: string }) {
  return (
    <svg
      className={cx(className, art.float)}
      viewBox="0 0 320 320"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={art.label}
    >
      {art.layers.map((layer, index) => (
        <g key={index} className={layer.c}>
          {layer.s.map((shape, shapeIndex) => (
            <path key={shapeIndex} d={shape.d} className={shape.c} />
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function Konek() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useSyncExternalStore(subscribeHash, readHash, () => "home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState(tabs[0]!.id);
  const [boost, setBoost] = useState(false);
  const [city, setCity] = useState("");
  const [result, setResult] = useState<{
    city: string;
    coverage: Coverage;
  } | null>(null);
  const [cityError, setCityError] = useState("");

  useEffect(() => startReveal(rootRef.current!), []);

  const currentTab = tabs.find((item) => item.id === tab)!;

  const getApp = () =>
    toast({
      title: "Get the Konek app",
      description: "Search for Konek in the App Store or Google Play.",
    });
  const orderSim = () =>
    toast({
      title: "SIM card on its way",
      description: "Free delivery in 1 to 2 days anywhere in Indonesia.",
      variant: "success",
    });
  const choosePlan = (plan: Plan) =>
    toast({
      title: `${plan.name} plan selected`,
      description: `${boost ? plan.boosted : plan.amount} for ${boost ? plan.boostedPrice : plan.price}${currentTab.period}.`,
      variant: "success",
    });
  const check = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
      setCityError("Enter a city name, like Jakarta.");
      setResult(null);
      return;
    }
    const coverage = lookupCoverage(trimmed);
    setCityError("");
    setCity(trimmed);
    setResult({ city: trimmed, coverage });
    toast({
      title: "Coverage checked",
      description: `${coverage.network} in ${trimmed}, ${coverage.speed.toLowerCase()}.`,
    });
  };
  const submitCity = (event: FormEvent) => {
    event.preventDefault();
    check(city);
  };

  return (
    <div ref={rootRef} className={cx(root, palette)}>
      <style>{motionCss}</style>
      <header className={header}>
        <div className={headerInner}>
          <a href="#home" className={brand} aria-label="Konek, home">
            <span className={brandMark} aria-hidden="true">
              <Icon name="signal" className="size-4" />
            </span>
            konek
          </a>
          <nav aria-label="Main" className={navList}>
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={cx(navLink, active === item.id ? navOn : navIdle)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className={headerActions}>
            <button type="button" className={appButton} onClick={getApp}>
              Get the app
            </button>
            <button
              type="button"
              className={menuButton}
              aria-expanded={menuOpen}
              aria-controls="konek-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "close" : "menu"} className="size-5" />
            </button>
          </div>
          {menuOpen && (
            <nav
              id="konek-menu"
              aria-label="Mobile"
              className={menuPanel}
              onKeyDown={(event) =>
                event.key === "Escape" && setMenuOpen(false)
              }
            >
              {nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                  className={menuLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main>
        <section id="home" aria-labelledby="konek-title" className={hero}>
          <h1 id="konek-title" className={heroTitle}>
            <span className={heroLine}>Stay</span>
            <span className={heroLine}>Connected</span>
          </h1>
          <p className={heroLead}>
            We provide mobile and home internet to over 60 million customers
            across 34 provinces.
          </p>
          <div className={heroActions}>
            <a href="#pricing" className={cx(pillLink, outlineLink)}>
              View plans
            </a>
            <button
              type="button"
              className={cx(pillLink, redButton)}
              onClick={orderSim}
            >
              Order a SIM card
            </button>
          </div>
          <div className={artRow}>
            <Illustration art={catArt} className={cx(artBase, "lg:left-4")} />
            <Illustration art={dogArt} className={cx(artBase, "lg:right-4")} />
          </div>
        </section>

        <section
          id="about"
          aria-labelledby="konek-about-title"
          className={cx(wrap, section)}
        >
          <h2 id="konek-about-title" className={srOnly}>
            About Konek
          </h2>
          <ul className={cardGrid} data-reveal="">
            {cards.map((item) => (
              <li key={item.id} className={cx(bigCard, item.card)}>
                <svg
                  className={cardArcs}
                  viewBox="0 0 320 320"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d={arcs}
                    className={cx("[stroke-width:18]", item.arcs)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="relative">
                  <span
                    className={cx(cardIcon, item.iconTone)}
                    aria-hidden="true"
                  >
                    <Icon name={item.icon} className="size-6" />
                  </span>
                  <h3 className={cardTitle}>{item.title}</h3>
                  <p className={cardText}>{item.text}</p>
                </div>
                <a href={item.href} className={cx(cardButton, item.button)}>
                  Start building
                  <span className={srOnly}>{`: ${item.title}`}</span>
                  <Icon name="arrow" className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="investors"
          aria-labelledby="konek-investors-title"
          className={cx(wrap, "scroll-mt-20")}
        >
          <h2 id="konek-investors-title" className={srOnly}>
            Konek in numbers
          </h2>
          <dl className={statGrid} data-reveal="">
            {stats.map(([value, label]) => (
              <div key={label}>
                <dt className={statValue}>{value}</dt>
                <dd className={statLabel}>{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          id="pricing"
          aria-labelledby="konek-pricing-title"
          className={cx(wrap, section)}
        >
          <div className={pricingHead} data-reveal="">
            <div>
              <h2 id="konek-pricing-title" className={h2}>
                Plans for every day
              </h2>
              <p className={sectionLead}>
                No contracts, no surprise fees. Switch plans whenever life
                changes.
              </p>
            </div>
            <div className={tabGroup} role="group" aria-label="Plan type">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={tab === item.id}
                  className={cx(tabBase, tab === item.id ? tabOn : tabIdle)}
                  onClick={() => setTab(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className={boostRow}>
            <Switch
              id="konek-boost"
              checked={boost}
              onCheckedChange={setBoost}
            />
            <label htmlFor="konek-boost" className={boostLabelClass}>
              {currentTab.boost}
            </label>
          </div>
          <ul className={planGrid} data-reveal="">
            {plans[tab]!.map((plan, index) => (
              <li
                key={plan.name}
                data-plan={plan.name}
                className={cx(
                  planCard,
                  index === FEATURED ? planFeatured : planIdle,
                )}
              >
                {index === FEATURED && (
                  <span className={planBadge}>Most popular</span>
                )}
                <div>
                  <h3 className={planName}>{plan.name}</h3>
                  <p className={planAmount}>
                    {boost ? plan.boosted : plan.amount}
                  </p>
                </div>
                <p className={planPrice}>
                  {boost ? plan.boostedPrice : plan.price}
                  <span className={planPeriod}>{currentTab.period}</span>
                </p>
                <ul className={perkList}>
                  {plan.perks.map((text) => (
                    <li key={text} className={perk}>
                      <Icon name="check" className={perkIcon} />
                      {text}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={index === FEATURED ? "primary" : "secondary"}
                  onClick={() => choosePlan(plan)}
                >
                  Choose {plan.name}
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="coverage"
          aria-labelledby="konek-coverage-title"
          className={cx(wrap, section)}
        >
          <div className={coverageGrid}>
            <div data-reveal="">
              <h2 id="konek-coverage-title" className={h2}>
                Check coverage for your home or business
              </h2>
              <p className={sectionLead}>
                See signal, speed, and home internet options in your city before
                you switch.
              </p>
              <form
                className={coverageForm}
                noValidate
                aria-label="Coverage check"
                onSubmit={submitCity}
              >
                <Input
                  id="konek-city"
                  label="City"
                  name="city"
                  placeholder="Jakarta"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  aria-invalid={cityError ? true : undefined}
                  aria-describedby={cityError ? "konek-city-error" : undefined}
                />
                <Button type="submit">Check coverage</Button>
                {cityError && (
                  <p id="konek-city-error" className={errorText}>
                    {cityError}
                  </p>
                )}
              </form>
              <div className={chipRow}>
                Try
                {quickCities.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className={chip}
                    onClick={() => check(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <div className={resultCard} aria-live="polite" data-reveal="">
              {result ? (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={small}>Coverage in</p>
                      <p className={resultTitle} data-result="">
                        {result.city}
                      </p>
                    </div>
                    <div className={bars} aria-hidden="true">
                      {barHeights.map((height, index) => (
                        <span
                          key={height}
                          className={cx(
                            barBase,
                            height,
                            index < result.coverage.bars
                              ? "bg-primary"
                              : "bg-line",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <dl className={resultRows}>
                    <div className={resultCell}>
                      <dt className={resultLabel}>Network</dt>
                      <dd className={resultValue}>{result.coverage.network}</dd>
                    </div>
                    <div className={resultCell}>
                      <dt className={resultLabel}>Speed</dt>
                      <dd className={resultValue}>{result.coverage.speed}</dd>
                    </div>
                    <div className={resultCell}>
                      <dt className={resultLabel}>Home internet</dt>
                      <dd className={resultValue}>{result.coverage.home}</dd>
                    </div>
                  </dl>
                </>
              ) : (
                <>
                  <div className={bars} aria-hidden="true">
                    {barHeights.map((height) => (
                      <span
                        key={height}
                        className={cx(barBase, height, "bg-line")}
                      />
                    ))}
                  </div>
                  <p className={resultTitle}>Your signal, at a glance</p>
                  <p className={small}>
                    Pick a city to see network, speed, and home internet. We
                    cover 514 cities and regencies today.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        <div className={cx(wrap, faqWrap)} data-reveal="">
          <Faq
            id="faq"
            variant="split"
            title="Questions, answered"
            description="Everything people ask before they switch to Konek."
            items={faqs}
            exclusive
          />
        </div>

        <section
          id="careers"
          aria-labelledby="konek-careers-title"
          className={cx(wrap, "scroll-mt-20")}
        >
          <div className={careers} data-reveal="">
            <div>
              <h2 id="konek-careers-title" className={careersTitle}>
                Build the network with us
              </h2>
              <p className="mt-4 max-w-md text-base">
                320 open roles across 18 cities, from tower engineers to product
                designers.
              </p>
            </div>
            <a href="mailto:careers@konek.id" className={careersLink}>
              See open roles
            </a>
          </div>
        </section>
      </main>

      <footer className={footer}>
        <div className={footerInner}>
          <div>
            <p className={cx(brand, "text-xl")}>konek</p>
            <p className={cx(small, "mt-3 max-w-xs")}>
              Mobile and home internet for every corner of Indonesia.
            </p>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className={footerTitle}>{column.title}</p>
              <ul className={footerList}>
                {column.links.map((label) => (
                  <li key={label}>
                    <a href="#home" className={quietLink}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={footerBottom}>
          <p>&copy; 2026 Konek. Built with MarkasUI.</p>
          <a href="#home" className={quietLink}>
            Back to top
          </a>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
