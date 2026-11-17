"use client";

import {
  createElement,
  useEffect,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type SyntheticEvent,
} from "react";
import { Badge } from "../../../components/badge/Badge";
import { Button } from "../../../components/button/Button";
import { CopyButton } from "../../../components/copy-button/CopyButton";
import { Input } from "../../../components/input/Input";
import { Modal } from "../../../components/modal/Modal";
import { Progress } from "../../../components/progress/Progress";
import { Textarea } from "../../../components/textarea/Textarea";
import { Toaster, toast } from "../../../components/toast/Toast";

/* Palet lokal: tiga nada per halaman (latar, tengah, tegas), terang dan gelap. */
const palette = [
  "[--tpl-sky-1:#e4eef8] [--tpl-sky-2:#a8c8ea] [--tpl-sky-3:#1e4b78] dark:[--tpl-sky-1:#162330] dark:[--tpl-sky-2:#2d4f72] dark:[--tpl-sky-3:#a8c8ea]",
  "[--tpl-rose-1:#fbe7e9] [--tpl-rose-2:#f0b2ba] [--tpl-rose-3:#8c2536] dark:[--tpl-rose-1:#2b181b] dark:[--tpl-rose-2:#6d303b] dark:[--tpl-rose-3:#f0b2ba]",
  "[--tpl-sun-1:#fcf0d4] [--tpl-sun-2:#f2cb6f] [--tpl-sun-3:#7a5200] dark:[--tpl-sun-1:#2a2412] dark:[--tpl-sun-2:#6b5521] dark:[--tpl-sun-3:#f2cb6f]",
  "[--tpl-violet-1:#ece8fa] [--tpl-violet-2:#c2b5f0] [--tpl-violet-3:#47388a] dark:[--tpl-violet-1:#1e1a2d] dark:[--tpl-violet-2:#4b3f7a] dark:[--tpl-violet-3:#c2b5f0]",
  "[--tpl-coral-1:#fce8df] [--tpl-coral-2:#f3b199] [--tpl-coral-3:#8e3314] dark:[--tpl-coral-1:#2c1b15] dark:[--tpl-coral-2:#703624] dark:[--tpl-coral-3:#f3b199]",
  "[--tpl-cone-1:#fdeedb] [--tpl-cone-2:#f6a65a] [--tpl-cone-3:#7f4004] dark:[--tpl-cone-1:#2b2013] dark:[--tpl-cone-2:#b0631d] dark:[--tpl-cone-3:#f6a65a]",
  "[--tpl-teal-1:#def2ee] [--tpl-teal-2:#9dd6cc] [--tpl-teal-3:#17554d] dark:[--tpl-teal-1:#13251f] dark:[--tpl-teal-2:#2c5c53] dark:[--tpl-teal-3:#9dd6cc]",
].join(" ");
const tones = {
  sky: "[--art-1:var(--tpl-sky-1)] [--art-2:var(--tpl-sky-2)] [--art-3:var(--tpl-sky-3)]",
  rose: "[--art-1:var(--tpl-rose-1)] [--art-2:var(--tpl-rose-2)] [--art-3:var(--tpl-rose-3)]",
  sun: "[--art-1:var(--tpl-sun-1)] [--art-2:var(--tpl-sun-2)] [--art-3:var(--tpl-sun-3)]",
  violet:
    "[--art-1:var(--tpl-violet-1)] [--art-2:var(--tpl-violet-2)] [--art-3:var(--tpl-violet-3)]",
  coral:
    "[--art-1:var(--tpl-coral-1)] [--art-2:var(--tpl-coral-2)] [--art-3:var(--tpl-coral-3)]",
  cone: "[--art-1:var(--tpl-cone-1)] [--art-2:var(--tpl-cone-2)] [--art-3:var(--tpl-cone-3)]",
  teal: "[--art-1:var(--tpl-teal-1)] [--art-2:var(--tpl-teal-2)] [--art-3:var(--tpl-teal-3)]",
};
const keyframes =
  "@keyframes rambu-float{to{transform:translateY(-8px)}}@keyframes rambu-sway{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}@keyframes rambu-blink{50%{opacity:.3}}";

/* Kelas */
const root =
  "flex min-h-dvh flex-col bg-canvas text-ink bg-[radial-gradient(var(--color-line)_1px,transparent_1px)] bg-size-[24px_24px]";
const header =
  "mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 pt-5 lg:px-8";
const brand =
  "flex items-center gap-2.5 text-base font-semibold tracking-tight";
const brandMark =
  "flex size-8 items-center justify-center rounded-lg bg-primary text-on-primary";
const quietLink =
  "inline-flex min-h-6 items-center rounded-md text-sm font-medium text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const navWrap = "sticky top-3 z-20 mt-4 flex justify-center px-4";
const nav =
  "flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-line bg-surface/90 p-1 shadow-overlay backdrop-blur";
const navItem =
  "inline-flex h-8 shrink-0 items-center gap-1 rounded-full px-2.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none sm:px-3 sm:text-sm";
const navIdle = "text-muted hover:bg-subtle hover:text-ink";
const navActive = "bg-primary text-on-primary";
const navRest = "sr-only lg:not-sr-only";
const main =
  "mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-4 pt-8 pb-12 lg:grid-cols-2 lg:gap-14 lg:px-8";
const artPanel =
  "relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-(--art-1)";
const artDots =
  "absolute inset-0 bg-[radial-gradient(var(--art-2)_1.5px,transparent_1.5px)] bg-size-[22px_22px] opacity-50";
const artSvg = "relative size-full";
const numeral = "font-extrabold tracking-tight [text-anchor:middle]";
const content = "grid gap-6";
const intro = "grid justify-items-start gap-3";
const title =
  "text-3xl font-semibold tracking-tight text-balance focus:outline-none sm:text-4xl";
const lead = "max-w-prose text-base text-pretty text-muted";
const actions = "flex flex-wrap gap-3";
const linkBase =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const linkPrimary = "bg-primary text-on-primary hover:bg-primary-strong";
const linkSecondary = "border border-line bg-surface text-ink hover:bg-subtle";
const cardRow =
  "flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 sm:p-5";
const card = "grid gap-4 rounded-2xl border border-line bg-surface p-4 sm:p-5";
const help = "text-sm text-muted";
const inlineLink =
  "rounded-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const footer =
  "mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-5 text-sm text-muted lg:px-8";
const footerLinks = "flex flex-wrap gap-4";
const smallLabel = "text-sm text-muted";
const bigValue = "text-lg font-semibold tracking-tight";
const suggestionList = "grid gap-1 sm:grid-cols-2";
const suggestion =
  "flex min-w-0 items-center gap-3 rounded-xl p-2 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const suggestionIcon =
  "flex size-8 shrink-0 items-center justify-center rounded-lg bg-subtle text-muted";
const truncate = "block truncate";
const details = "group rounded-2xl border border-line bg-surface";
const summary =
  "flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden";
const chevron =
  "size-4 text-muted transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none";
const detailsBody =
  "grid gap-2 border-t border-line px-4 py-3 text-sm text-muted";
const bullets = "grid list-disc gap-1 pl-5";
const avatar =
  "flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary";
const rowBetween = "flex flex-wrap items-center justify-between gap-3";
const countdown = "text-3xl font-semibold tracking-tight tabular-nums";
const refCode = "truncate text-base font-semibold tracking-tight";
const factList = "grid grid-cols-2 gap-3 text-sm";
const notifyRow = "flex flex-col gap-3 sm:flex-row sm:items-end";
const grow = "min-w-0 flex-1";
const errorText = "text-sm text-danger";
const statusDot = "relative flex size-3 shrink-0";
const ping =
  "absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:animate-none";
const dot = "relative size-3 rounded-full";
const srOnly = "sr-only";

/* Animasi ilustrasi, mati saat reduced motion. */
const sway =
  "origin-bottom [transform-box:fill-box] animate-[rambu-sway_3.6s_ease-in-out_infinite_alternate] motion-reduce:animate-none";
const tilt =
  "origin-center [transform-box:fill-box] animate-[rambu-sway_4s_ease-in-out_infinite_alternate] motion-reduce:animate-none";
const float =
  "[transform-box:fill-box] animate-[rambu-float_3s_ease-in-out_infinite_alternate] motion-reduce:animate-none";
const blink =
  "animate-[rambu-blink_1.6s_ease-in-out_infinite] motion-reduce:animate-none";
const later = "[animation-delay:.8s]";
const deep = "fill-(--art-3)";
const mid = "fill-(--art-2)";
const soft = "fill-(--art-1)";
const line =
  "fill-none [stroke-linecap:round] [stroke-linejoin:round] stroke-(--art-3)";

type Shape = {
  t: "g" | "path" | "rect" | "circle" | "ellipse";
  c?: string;
  a?: Record<string, number | string>;
  k?: Shape[];
};

/* Bentuk ilustrasi sebagai data supaya sama persis di Blade, React, dan Vue. */
// prettier-ignore
const cloud: Shape[] = [
  { t: "circle", a: { cx: 80, cy: 96, r: 16 } },
  { t: "circle", a: { cx: 102, cy: 86, r: 22 } },
  { t: "circle", a: { cx: 124, cy: 98, r: 14 } },
  { t: "rect", a: { x: 64, y: 96, width: 74, height: 16, rx: 8 } },
];
// prettier-ignore
const scenery: Shape[] = [
  { t: "g", c: `fill-surface ${float}`, k: cloud },
  { t: "g", a: { transform: "translate(290 -40)" }, k: [{ t: "g", c: `fill-surface ${float} ${later}`, k: cloud }] },
  { t: "path", c: "fill-none stroke-(--art-2) stroke-[4] [stroke-linecap:round] [stroke-dasharray:18_16]", a: { d: "M36 340H444" } },
];
const sparkle = (x: number, y: number, s: number): Shape => ({
  t: "path",
  a: {
    d: `M${x} ${y - 2 * s}l${s / 2} ${s * 1.5} ${s * 1.5} ${s / 2}-${s * 1.5} ${s / 2}-${s / 2} ${s * 1.5}-${s / 2}-${s * 1.5}-${s * 1.5}-${s / 2} ${s * 1.5}-${s / 2}z`,
  },
});
// prettier-ignore
const art: Record<string, Shape[]> = {
  "404": [
    { t: "g", c: sway, k: [
      { t: "rect", c: deep, a: { x: 234, y: 178, width: 12, height: 140, rx: 3 } },
      { t: "circle", c: deep, a: { cx: 240, cy: 178, r: 64 } },
      { t: "circle", c: "fill-none stroke-surface stroke-[4]", a: { cx: 240, cy: 178, r: 55 } },
      { t: "path", c: "fill-none stroke-surface stroke-[10] [stroke-linecap:round] [stroke-linejoin:round]", a: { d: "M258 204v-30a18 18 0 0 0-36 0v6M210 168l12 14 12-14" } },
    ] },
    { t: "rect", c: deep, a: { x: 417, y: 256, width: 6, height: 62, rx: 2 } },
    { t: "path", c: `${mid} stroke-(--art-3) stroke-[4] [stroke-linejoin:round]`, a: { d: "M420 200l28 28-28 28-28-28z" } },
    { t: "path", c: `${line} stroke-[6]`, a: { d: "M420 216v14M420 240v1" } },
  ],
  "403": [
    { t: "g", c: float, k: [
      { t: "path", c: `${line} stroke-[14]`, a: { d: "M208 170v-22a32 32 0 0 1 64 0v22" } },
      { t: "rect", c: deep, a: { x: 188, y: 162, width: 104, height: 88, rx: 18 } },
      { t: "circle", c: soft, a: { cx: 240, cy: 198, r: 11 } },
      { t: "rect", c: soft, a: { x: 235, y: 202, width: 10, height: 26, rx: 4 } },
    ] },
    { ...sparkle(344, 110, 8), c: `fill-primary ${blink}` },
    { ...sparkle(136, 160, 5), c: `fill-primary ${blink} ${later}` },
  ],
  "419": [
    { t: "g", c: tilt, k: [
      { t: "path", c: "fill-surface stroke-(--art-3) stroke-[4] [stroke-linejoin:round]", a: { d: "M212 120h56c0 34-20 46-20 74s20 40 20 74h-56c0-34 20-46 20-74s-20-40-20-74z" } },
      { t: "path", c: mid, a: { d: "M222 134h36c-2 18-12 28-18 36-6-8-16-18-18-36z" } },
      { t: "path", c: mid, a: { d: "M220 262c4-20 12-28 20-30 8 2 16 10 20 30z" } },
      { t: "rect", c: `${mid} ${blink}`, a: { x: 238, y: 170, width: 4, height: 62, rx: 2 } },
      { t: "rect", c: deep, a: { x: 200, y: 108, width: 80, height: 12, rx: 6 } },
      { t: "rect", c: deep, a: { x: 200, y: 268, width: 80, height: 12, rx: 6 } },
    ] },
    { ...sparkle(352, 104, 7), c: `fill-primary ${blink}` },
  ],
  "429": [
    { t: "rect", c: deep, a: { x: 234, y: 270, width: 12, height: 48, rx: 3 } },
    { t: "rect", c: deep, a: { x: 194, y: 92, width: 92, height: 182, rx: 24 } },
    { t: "circle", c: `fill-danger ${blink}`, a: { cx: 240, cy: 136, r: 20 } },
    { t: "circle", c: `${mid} opacity-40`, a: { cx: 240, cy: 184, r: 20 } },
    { t: "circle", c: `${mid} opacity-40`, a: { cx: 240, cy: 232, r: 20 } },
    { t: "path", c: "fill-none stroke-(--art-2) stroke-[6] [stroke-linecap:round]", a: { d: "M70 268h44M54 290h60" } },
  ],
  "500": [
    { t: "path", c: `${line} stroke-[8]`, a: { d: "M24 304c64 0 88-34 150-34M316 270c60 0 84 34 140 34" } },
    { t: "rect", c: deep, a: { x: 172, y: 254, width: 40, height: 32, rx: 8 } },
    { t: "rect", c: deep, a: { x: 212, y: 261, width: 18, height: 6, rx: 3 } },
    { t: "rect", c: deep, a: { x: 212, y: 273, width: 18, height: 6, rx: 3 } },
    { t: "rect", c: deep, a: { x: 272, y: 252, width: 44, height: 36, rx: 10 } },
    { t: "rect", c: soft, a: { x: 280, y: 262, width: 8, height: 6, rx: 2 } },
    { t: "rect", c: soft, a: { x: 280, y: 274, width: 8, height: 6, rx: 2 } },
    { t: "path", c: `fill-none stroke-warning stroke-[4] [stroke-linecap:round] [stroke-linejoin:round] ${blink}`, a: { d: "M252 240l-7 12h10l-7 12" } },
    { t: "path", c: `fill-none stroke-warning stroke-[4] [stroke-linecap:round] ${blink} ${later}`, a: { d: "M256 300l5-9M240 298l-6-8" } },
  ],
  "503": [
    { t: "g", c: float, k: [
      { t: "path", c: `${mid} stroke-(--art-3) stroke-[4] [stroke-linejoin:round]`, a: { d: "M240 106l48 154h-96z" } },
      { t: "path", c: "fill-surface", a: { d: "M226 154h28l7 24h-42z" } },
      { t: "path", c: "fill-surface", a: { d: "M213 196h54l7 24h-68z" } },
      { t: "rect", c: deep, a: { x: 178, y: 258, width: 124, height: 14, rx: 5 } },
    ] },
    { t: "rect", c: deep, a: { x: 64, y: 282, width: 8, height: 36, rx: 2 } },
    { t: "rect", c: deep, a: { x: 152, y: 282, width: 8, height: 36, rx: 2 } },
    { t: "rect", c: `${mid} stroke-(--art-3) stroke-[3]`, a: { x: 52, y: 262, width: 120, height: 22, rx: 4 } },
    { t: "path", c: "fill-none stroke-surface stroke-[8]", a: { d: "M80 264l-12 18M108 264l-12 18M136 264l-12 18M164 264l-12 18" } },
  ],
  offline: [
    { t: "path", c: `${line} stroke-[14] ${blink} ${later}`, a: { d: "M172 132a96 96 0 0 1 136 0" } },
    { t: "path", c: `${line} stroke-[14] ${blink}`, a: { d: "M195 155a64 64 0 0 1 90 0" } },
    { t: "path", c: `${line} stroke-[14]`, a: { d: "M217 177a32 32 0 0 1 46 0" } },
    { t: "circle", c: deep, a: { cx: 240, cy: 200, r: 10 } },
    { t: "path", c: "fill-none stroke-(--art-1) stroke-[22] [stroke-linecap:round]", a: { d: "M184 98l112 112" } },
    { t: "path", c: "fill-none stroke-danger stroke-[10] [stroke-linecap:round]", a: { d: "M184 98l112 112" } },
  ],
};

type Tone = keyof typeof tones;
type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger";
type PageInfo = {
  id: string;
  short: string;
  rest: string;
  tone: Tone;
  badge: BadgeVariant;
  numeral: string;
  alt: string;
  title: string;
  text: string;
};
// prettier-ignore
const pages = [
  { id: "404", short: "404", rest: " Not Found", tone: "sky", badge: "neutral", numeral: "404", alt: "A U-turn road sign standing in front of the number 404", title: "This page took a wrong turn", text: "The page you are looking for moved, was renamed, or never existed. Check the address, or search for where you meant to go." },
  { id: "403", short: "403", rest: " Forbidden", tone: "rose", badge: "danger", numeral: "403", alt: "A closed padlock in front of the number 403", title: "This area is off limits", text: "You are signed in, but this page is only open to certain roles. Ask a workspace admin for access or switch to another account." },
  { id: "419", short: "419", rest: " Page Expired", tone: "sun", badge: "warning", numeral: "419", alt: "An hourglass running out in front of the number 419", title: "Your session has expired", text: "For your security, forms expire after a while. Refresh the page and submit again. You may need to re-enter what you typed." },
  { id: "429", short: "429", rest: " Too Many Requests", tone: "violet", badge: "warning", numeral: "429", alt: "A traffic light showing red in front of the number 429", title: "Slow down a little", text: "We received too many requests from your connection in a short time. Wait for the timer to finish, then try again." },
  { id: "500", short: "500", rest: " Server Error", tone: "coral", badge: "danger", numeral: "500", alt: "An unplugged cable with sparks under the number 500", title: "Something broke on our end", text: "An unexpected error stopped this request. Our team has been alerted. Share the reference below if you contact support." },
  { id: "503", short: "503", rest: " Maintenance", tone: "cone", badge: "warning", numeral: "503", alt: "A traffic cone and a barrier in front of the number 503", title: "We are tuning things up", text: "Rambu is down for scheduled maintenance while we upgrade the database. Everything you saved is safe." },
  { id: "offline", short: "Offline", rest: "", tone: "teal", badge: "danger", numeral: "offline", alt: "A Wi-Fi signal crossed out above the word offline", title: "You are offline", text: "Check your Wi-Fi or mobile data. This page reconnects on its own as soon as the network returns." },
] as const satisfies readonly PageInfo[];
type PageId = (typeof pages)[number]["id"];
const ONLINE_COPY = {
  title: "You are back online",
  text: "Your connection is working again. Pick up where you left off, or reload to get the latest data.",
};
const DEFAULT_PAGE: PageId = "404";
const TITLE_ID = "rambu-title";

/* 404 */
// prettier-ignore
const suggestions = [
  { label: "Dashboard", path: "/dashboard" }, { label: "Orders", path: "/orders" },
  { label: "Invoices", path: "/billing/invoices" }, { label: "Customers", path: "/customers" },
  { label: "Team members", path: "/settings/team" }, { label: "API tokens", path: "/settings/api-tokens" },
];
/* 429 */
const COOLDOWN = 30;
/* 500 */
const REFERENCE = "RMB-500-7F3A9C";
// prettier-ignore
const facts = [{ label: "Time", value: "Nov 5, 2026, 09:42 WIB" }, { label: "Request", value: "POST /orders" }];
/* 503 */
const MAINTENANCE_PROGRESS = 68;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// prettier-ignore
const footerNav = [{ label: "Status", href: "/status" }, { label: "Help center", href: "/help" }, { label: "Privacy", href: "/privacy" }];
const SUPPORT = "mailto:support@rambu.id";
// prettier-ignore
const icons = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  chevron: "m6 9 6 6 6-6",
  sign: "M12 2.5 21.5 12 12 21.5 2.5 12z",
};

/** Halaman aktif disimpan di hash URL supaya bisa dibagikan dan tombol Back bekerja. */
function readHash(): PageId {
  const id = window.location.hash.slice(1);
  return pages.find((page) => page.id === id)?.id ?? DEFAULT_PAGE;
}
function subscribeHash(onChange: () => void) {
  const handle = () => {
    onChange();
    document.getElementById(TITLE_ID)?.focus();
  };
  window.addEventListener("hashchange", handle);
  return () => window.removeEventListener("hashchange", handle);
}
function subscribeOnline(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}
const pad = (value: number) => `0:${String(value).padStart(2, "0")}`;
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

function Icon({
  name,
  className = "size-4",
}: {
  name: keyof typeof icons;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[name]} />
    </svg>
  );
}

function Shapes({ list }: { list: readonly Shape[] }) {
  return list.map((shape, index) =>
    createElement(
      shape.t,
      { key: index, className: shape.c, ...shape.a },
      shape.k ? <Shapes list={shape.k} /> : undefined,
    ),
  );
}

function Art({ page }: { page: (typeof pages)[number] }) {
  const small = page.id === "offline";
  return (
    <div className={cx(artPanel, tones[page.tone])}>
      <div className={artDots} aria-hidden="true" />
      <svg
        className={artSvg}
        viewBox="0 0 480 360"
        role="img"
        aria-label={page.alt}
      >
        <Shapes list={scenery} />
        <text
          x={small ? 244 : 248}
          y={small ? 304 : 240}
          className={cx(
            numeral,
            "fill-(--art-2)",
            small ? "[font-size:96px]" : "[font-size:150px]",
          )}
        >
          {page.numeral}
        </text>
        <text
          x={240}
          y={small ? 300 : 232}
          className={cx(
            numeral,
            "fill-surface stroke-(--art-3) stroke-[3]",
            small ? "[font-size:96px]" : "[font-size:150px]",
          )}
        >
          {page.numeral}
        </text>
        <Shapes list={art[page.id]!} />
      </svg>
    </div>
  );
}

function HomeLink({ primary = false }: { primary?: boolean }) {
  return (
    <a href="/" className={cx(linkBase, primary ? linkPrimary : linkSecondary)}>
      Back home
    </a>
  );
}

function BackButton() {
  return (
    <Button variant="secondary" onClick={() => window.history.back()}>
      Go back
    </Button>
  );
}

const reload = () => window.location.reload();

function NotFound() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const matches = suggestions.filter((item) =>
    `${item.label} ${item.path}`.toLowerCase().includes(needle),
  );
  const summaryText = !needle
    ? "Popular pages"
    : matches.length
      ? `${matches.length} ${matches.length === 1 ? "page" : "pages"} found`
      : "No pages match your search.";
  return (
    <>
      <div className={actions}>
        <HomeLink primary />
        <BackButton />
      </div>
      <div className={card}>
        <Input
          type="search"
          label="Search pages"
          placeholder="Try invoices or team"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <p className={smallLabel} aria-live="polite">
          {summaryText}
        </p>
        {matches.length > 0 && (
          <ul className={suggestionList}>
            {matches.map((item) => (
              <li key={item.path}>
                <a href={item.path} className={suggestion}>
                  <span className={suggestionIcon}>
                    <Icon name="arrow" />
                  </span>
                  <span className="min-w-0">
                    <span className={cx(truncate, "text-sm font-medium")}>
                      {item.label}
                    </span>
                    <span className={cx(truncate, "text-xs text-muted")}>
                      {item.path}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function Forbidden() {
  const [requested, setRequested] = useState(false);
  const request = () => {
    setRequested(true);
    toast({
      title: "Access requested",
      description: "Rina Kusuma, the workspace admin, will review it.",
      variant: "success",
    });
  };
  return (
    <>
      <div className={actions}>
        <HomeLink primary />
        <BackButton />
      </div>
      <div className={cx(cardRow, "flex-wrap justify-between")}>
        <div className="flex min-w-0 items-center gap-3">
          <span className={avatar} aria-hidden="true">
            AW
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium">Signed in as Andi Wijaya</p>
            <p className={cx(smallLabel, "truncate")}>
              andi@rambu.id, Member role
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          disabled={requested}
          onClick={request}
        >
          {requested ? "Request sent" : "Request access"}
        </Button>
      </div>
    </>
  );
}

function Expired() {
  return (
    <>
      <div className={actions}>
        <Button onClick={reload}>Refresh page</Button>
        <BackButton />
      </div>
      <details className={details}>
        <summary className={summary}>
          Why did this happen?
          <Icon name="chevron" className={chevron} />
        </summary>
        <div className={detailsBody}>
          <p>
            Laravel protects every form with a CSRF token tied to your session.
            If the page stays open longer than the session lifetime (120 minutes
            here), or you signed out in another tab, the token no longer matches
            and the request stops with code 419.
          </p>
          <ul className={bullets}>
            <li>Refresh the page to get a fresh token.</li>
            <li>Copy long text before you submit it again.</li>
            <li>Keep one tab open while you edit.</li>
          </ul>
        </div>
      </details>
    </>
  );
}

function TooMany() {
  const [left, setLeft] = useState(COOLDOWN);
  useEffect(() => {
    const timer = setInterval(
      () => setLeft((value) => Math.max(0, value - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);
  const retry = () =>
    toast({
      title: "Request sent",
      description: "You are back within the limit.",
      variant: "success",
    });
  return (
    <>
      <div className={card}>
        <div className={rowBetween}>
          <div>
            <p className={smallLabel}>
              {left > 0 ? "You can try again in" : "Ready when you are"}
            </p>
            <p className={countdown} data-countdown="">
              {pad(left)}
            </p>
          </div>
          <Badge variant="warning">60 requests per minute</Badge>
        </div>
        <Progress label="Cooldown" value={COOLDOWN - left} max={COOLDOWN} />
      </div>
      <div className={actions}>
        <Button disabled={left > 0} onClick={retry}>
          Try again
        </Button>
        <HomeLink />
      </div>
      <p role="status" className={srOnly}>
        {left === 0 ? "You can try again now." : ""}
      </p>
    </>
  );
}

function ServerError() {
  const [report, setReport] = useState({ details: "", email: "" });
  const onClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    const dialog = event.currentTarget;
    if (dialog.returnValue === "send") {
      toast({
        title: "Report sent",
        description: `Thanks, we logged it under ${REFERENCE}.`,
        variant: "success",
      });
      setReport({ details: "", email: "" });
    }
    dialog.returnValue = "";
  };
  return (
    <>
      <div className={actions}>
        <Button onClick={reload}>Try again</Button>
        <Modal
          title="Report a problem"
          onClose={onClose}
          trigger={<Button variant="secondary">Report this problem</Button>}
          footer={
            <>
              <Button variant="secondary" type="submit" value="cancel">
                Cancel
              </Button>
              <Button type="submit" value="send">
                Send report
              </Button>
            </>
          }
        >
          <div className="grid gap-4">
            <p>
              Tell us what you were doing. We will attach reference {REFERENCE}.
            </p>
            <Textarea
              label="What happened?"
              name="details"
              rows={3}
              value={report.details}
              onChange={(event) =>
                setReport({ ...report, details: event.target.value })
              }
            />
            <Input
              label="Email for updates"
              type="email"
              name="email"
              placeholder="you@company.com"
              value={report.email}
              onChange={(event) =>
                setReport({ ...report, email: event.target.value })
              }
            />
          </div>
        </Modal>
      </div>
      <div className={card}>
        <div className={rowBetween}>
          <div className="min-w-0">
            <p className={smallLabel}>Error reference</p>
            <p className={refCode} data-reference="">
              {REFERENCE}
            </p>
          </div>
          <CopyButton
            text={REFERENCE}
            variant="secondary"
            size="sm"
            copyLabel="Copy reference"
          />
        </div>
        <dl className={factList}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-muted">{fact.label}</dt>
              <dd className="font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}

function Maintenance() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const notify = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setError("Enter a valid email address, like you@company.com.");
      return;
    }
    setError("");
    setEmail("");
    toast({
      title: "You are on the list",
      description: `We will email ${value} when Rambu is back.`,
      variant: "success",
    });
  };
  return (
    <>
      <div className={card}>
        <div className={rowBetween}>
          <div>
            <p className={smallLabel}>Estimated completion</p>
            <p className={bigValue}>Today, 14:30 WIB</p>
          </div>
          <Badge variant="warning">About 25 minutes left</Badge>
        </div>
        <Progress label="Database upgrade" value={MAINTENANCE_PROGRESS} />
      </div>
      <form className={card} noValidate onSubmit={notify}>
        <div className={notifyRow}>
          <div className={grow}>
            <Input
              label="Email me when Rambu is back"
              type="email"
              name="email"
              placeholder="you@company.com"
              value={email}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "rambu-notify-error" : undefined}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <Button type="submit">Notify me</Button>
        </div>
        {error && (
          <p id="rambu-notify-error" className={errorText}>
            {error}
          </p>
        )}
      </form>
      <div className={actions}>
        <a href="/status" className={cx(linkBase, linkSecondary)}>
          View status page
        </a>
      </div>
    </>
  );
}

function Offline({ online }: { online: boolean }) {
  const retry = () =>
    toast(
      navigator.onLine
        ? {
            title: "Connected",
            description: "Your connection is working.",
            variant: "success",
          }
        : {
            title: "Still offline",
            description: "Check your network and try again.",
            variant: "danger",
          },
    );
  return (
    <>
      <div role="status" className={cardRow}>
        <span className={statusDot} aria-hidden="true">
          <span className={cx(ping, online ? "bg-success" : "bg-danger")} />
          <span className={cx(dot, online ? "bg-success" : "bg-danger")} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium">
            {online ? "Connection restored" : "No connection"}
          </p>
          <p className={smallLabel}>
            {online
              ? "Your browser reports that you are online."
              : "We will reconnect automatically when the network returns."}
          </p>
        </div>
      </div>
      <div className={actions}>
        <Button onClick={retry}>Try again</Button>
        <BackButton />
      </div>
    </>
  );
}

const views = {
  "404": NotFound,
  "403": Forbidden,
  "419": Expired,
  "429": TooMany,
  "500": ServerError,
  "503": Maintenance,
};

export default function Rambu() {
  const pageId = useSyncExternalStore(
    subscribeHash,
    readHash,
    () => DEFAULT_PAGE,
  );
  const online = useSyncExternalStore(
    subscribeOnline,
    () => navigator.onLine,
    () => true,
  );
  const page = pages.find((item) => item.id === pageId)!;
  const isOffline = page.id === "offline";
  const copy = isOffline && online ? ONLINE_COPY : page;
  const badgeText = isOffline
    ? online
      ? "Online"
      : "Offline"
    : `${page.short}${page.rest}`;
  const badgeVariant = isOffline ? (online ? "success" : "danger") : page.badge;
  const View = page.id === "offline" ? null : views[page.id];

  return (
    <div className={cx(root, palette)}>
      <style>{keyframes}</style>
      <header className={header}>
        <a href="/" className={brand}>
          <span className={brandMark} aria-hidden="true">
            <Icon name="sign" />
          </span>
          Rambu
        </a>
        <a href="/status" className={quietLink}>
          System status
        </a>
      </header>
      <div className={navWrap}>
        <nav aria-label="Error pages" className={nav}>
          {pages.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={item.id === page.id ? "page" : undefined}
              className={cx(navItem, item.id === page.id ? navActive : navIdle)}
              onClick={() => window.location.assign(`#${item.id}`)}
            >
              {item.short}
              {item.rest && <span className={navRest}>{item.rest}</span>}
            </button>
          ))}
        </nav>
      </div>
      <main className={main}>
        <Art page={page} />
        <div className={content}>
          <div className={intro}>
            <Badge variant={badgeVariant}>{badgeText}</Badge>
            <h1 id={TITLE_ID} tabIndex={-1} className={title}>
              {copy.title}
            </h1>
            <p className={lead}>{copy.text}</p>
          </div>
          {View ? <View key={page.id} /> : <Offline online={online} />}
          <p className={help}>
            Still stuck?{" "}
            <a href={SUPPORT} className={inlineLink}>
              Contact support
            </a>{" "}
            or browse the{" "}
            <a href="/help" className={inlineLink}>
              help center
            </a>
            .
          </p>
        </div>
      </main>
      <footer className={footer}>
        <p>&copy; 2026 Rambu Labs. Error pages for Laravel apps.</p>
        <nav aria-label="Footer" className={footerLinks}>
          {footerNav.map((item) => (
            <a key={item.href} href={item.href} className={quietLink}>
              {item.label}
            </a>
          ))}
        </nav>
      </footer>
      <Toaster />
    </div>
  );
}
