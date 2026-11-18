"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Button } from "../../../components/button/Button";
import { Faq } from "../../../components/faq/Faq";
import { Input } from "../../../components/input/Input";
import { Toaster, toast } from "../../../components/toast/Toast";

/* Palet lokal: langit, kertas, dan pastel kartu, terang dan gelap. */
const palette =
  "[--tpl-sky-1:#5d9fe6] [--tpl-sky-2:#a3cbf3] [--tpl-sky-3:#dcebfa] [--tpl-sky-ink:#0c2849] [--tpl-cloud:#ffffff] [--tpl-paper:#ffffff] [--tpl-coal:#1c1c21] [--tpl-coal-ink:#f4f1ea] [--tpl-butter:#fbe38a] [--tpl-butter-line:#e2bf45] [--tpl-lilac:#d8cdf6] [--tpl-peach:#fde1d1] [--tpl-mint:#d4efe1] [--tpl-cream:#fcf0c4] [--tpl-ice:#d9e9fb] [--tpl-rose:#fad8e3] [--tpl-coral:#ef8d70] [--tpl-teal:#5fb3a2] [--tpl-violet:#9c8ae8] [--tpl-sun:#f4c64a] [--tpl-blue:#5b93e0] dark:[--tpl-sky-1:#0b1830] dark:[--tpl-sky-2:#15284a] dark:[--tpl-sky-3:#1b2c48] dark:[--tpl-sky-ink:#e7f0fb] dark:[--tpl-cloud:#3a4f74] dark:[--tpl-paper:#3a3b42] dark:[--tpl-coal:#050506] dark:[--tpl-coal-ink:#f4f1ea] dark:[--tpl-butter:#5b4b17] dark:[--tpl-butter-line:#7d6725] dark:[--tpl-lilac:#3c3463] dark:[--tpl-peach:#4a2e24] dark:[--tpl-mint:#1f3c30] dark:[--tpl-cream:#3f3618] dark:[--tpl-ice:#1c3150] dark:[--tpl-rose:#472534] dark:[--tpl-coral:#a9563f] dark:[--tpl-teal:#2f7a6b] dark:[--tpl-violet:#6655b8] dark:[--tpl-sun:#a9831f] dark:[--tpl-blue:#36649f]";

/* Tepi kertas sobek, animasi awan, dan animasi masuk saat scroll. */
const css =
  "@keyframes catatan-drift{from{transform:translateX(-14px)}to{transform:translateX(14px)}}" +
  ".catatan-torn-a{clip-path:polygon(0% 0%,100% 0%,100% 8.3%,95.4% 16.7%,98.6% 25%,98.9% 33.3%,96.4% 41.7%,97.3% 50%,98.4% 58.3%,96.2% 66.7%,96.2% 75%,97.3% 83.3%,96.6% 91.7%,100% 100%,91.7% 96.8%,83.3% 95.9%,75% 98.8%,66.7% 98.1%,58.3% 96.5%,50% 96.5%,41.7% 99.7%,33.3% 96.6%,25% 97.7%,16.7% 95.4%,8.3% 96%,0% 100%)}" +
  ".catatan-torn-b{clip-path:polygon(0% 0%,6.3% 1.1%,12.5% 4.6%,18.8% 8.3%,25% 6.2%,31.3% 5.8%,37.5% 5.2%,43.8% 8.2%,50% 8.2%,56.3% 3.4%,62.5% 3%,68.8% 7.5%,75% 3%,81.3% 1.4%,87.5% 2.7%,93.8% 3.9%,100% 0%,100% 100%,0% 100%)}" +
  ".catatan-torn-c{clip-path:polygon(0% 0%,100% 0%,100% 100%,0% 100%,2.1% 92.9%,6.6% 85.7%,3.9% 78.6%,5.1% 71.4%,6.1% 64.3%,0.4% 57.1%,1.9% 50%,3.9% 42.9%,3.6% 35.7%,3% 28.6%,1.4% 21.4%,6.4% 14.3%,0.4% 7.1%)}" +
  ".catatan-torn-d{clip-path:polygon(0% 0%,8.3% 2.2%,16.7% 2.1%,25% 4%,33.3% 5.5%,41.7% 3.1%,50% 1%,58.3% 2.4%,66.7% 1.7%,75% 2.2%,83.3% 2.5%,91.7% 2%,100% 0%,100% 100%,0% 100%,3.2% 91.7%,3.7% 83.3%,1.4% 75%,5.4% 66.7%,2.7% 58.3%,5.2% 50%,3.8% 41.7%,3.8% 33.3%,3.1% 25%,3% 16.7%,4.1% 8.3%)}" +
  "@media (prefers-reduced-motion:no-preference){[data-reveal]{transition:opacity .7s ease-out,transform .7s ease-out}[data-reveal=hidden]{opacity:0;transform:translateY(24px)}}";

/* Ikon garis 24px. */
const icons = {
  docs: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4",
  tasks:
    "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9",
  calendar:
    "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  boards:
    "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM12 17v4M8 21h8M7 12l3-3 2 2 4-4",
  daily:
    "M12 3v2M12 19v2M5.6 5.6 7 7M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4 7 17M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
  home: "M3 11l9-8 9 8M5 10v10h14V10",
  folder:
    "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M18 6 6 18M6 6l12 12",
  left: "M15 18l-6-6 6-6",
  right: "M9 18l6-6-6-6",
  check: "M5 12l5 5 9-10",
  plus: "M12 5v14M5 12h14",
  download: "M12 3v12M7 10l5 5 5-5M5 21h14",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
};
type IconName = keyof typeof icons;

/* Kelas */
const root =
  "relative overflow-x-clip bg-canvas font-sans text-ink [scroll-behavior:smooth] motion-reduce:[scroll-behavior:auto]";
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const headerWrap = "fixed inset-x-0 top-3 z-30 px-4 sm:top-4";
const navBar =
  "mx-auto flex h-14 max-w-5xl items-center gap-2 rounded-full bg-surface/95 py-2 pr-2 pl-5 shadow-overlay ring-1 ring-ink/5 backdrop-blur";
const wordmark = "rounded-md text-xl font-black tracking-tighter";
const navLinks = "mx-auto hidden items-center gap-1 md:flex";
const navLink =
  "rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink motion-reduce:transition-none";
const loginLink =
  "ml-auto hidden rounded-full px-3 py-2 text-sm font-medium text-ink hover:bg-subtle md:ml-0 md:inline-flex";
const pillDark =
  "inline-flex h-10 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold whitespace-nowrap text-canvas transition-transform duration-150 hover:-translate-y-px motion-reduce:transition-none";
const menuButton =
  "inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-subtle md:hidden";
const menuPanel =
  "mx-auto mt-2 grid max-w-5xl gap-1 rounded-3xl bg-surface p-3 shadow-overlay ring-1 ring-ink/5 md:hidden";
const menuLink =
  "rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-subtle";
const hero =
  "relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--tpl-sky-1),var(--tpl-sky-2)_38%,var(--tpl-sky-3)_72%,var(--color-canvas))] px-4 pt-32 pb-28 sm:pt-40 sm:pb-32";
const cloud =
  "pointer-events-none absolute -z-10 h-28 w-80 blur-lg animate-[catatan-drift_14s_ease-in-out_infinite_alternate] motion-reduce:animate-none";
const puffBase =
  "absolute bottom-0 left-0 h-[45%] w-full rounded-full bg-(--tpl-cloud)";
const puffSmall =
  "absolute bottom-[20%] left-[14%] h-[60%] w-[30%] rounded-full bg-(--tpl-cloud)";
const puffLarge =
  "absolute bottom-[12%] left-[38%] h-full w-[40%] rounded-full bg-(--tpl-cloud)";
const heroInner = "mx-auto grid max-w-5xl justify-items-center text-center";
const heroTitle =
  "max-w-4xl font-serif text-5xl leading-[1.02] font-normal tracking-tight text-balance text-(--tpl-sky-ink) sm:text-7xl";
const heroLead =
  "mt-6 max-w-xl text-lg text-pretty text-(--tpl-sky-ink)/80 sm:text-xl";
const heroActions = "mt-9 flex flex-wrap items-center justify-center gap-3";
const pillLight =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-surface px-6 text-base font-semibold whitespace-nowrap text-ink shadow-overlay transition-transform duration-150 hover:-translate-y-px motion-reduce:transition-none";
const pillGhost =
  "inline-flex h-12 items-center justify-center rounded-full px-5 text-base font-semibold text-(--tpl-sky-ink) underline decoration-(--tpl-sky-ink)/30 underline-offset-4 hover:decoration-(--tpl-sky-ink)";
const heroNote = "mt-4 text-sm text-(--tpl-sky-ink)/75";
const collage = "relative mx-auto mt-16 w-full max-w-5xl sm:mt-20";
const paperShadow =
  "absolute drop-shadow-[0_10px_18px_rgb(12_40_73/0.18)] dark:drop-shadow-[0_10px_18px_rgb(0_0_0/0.45)]";
const paperWhite = "catatan-torn-a size-full bg-(--tpl-paper)";
const paperCoal = "catatan-torn-b size-full bg-(--tpl-coal)";
const paperLined =
  "catatan-torn-c size-full bg-(--tpl-butter) bg-[repeating-linear-gradient(180deg,transparent_0_21px,var(--tpl-butter-line)_21px_22px)]";
const paperList =
  "absolute top-[66px] right-5 grid text-right font-serif text-base leading-[22px] text-ink/80 italic";
const flip = "absolute inset-0 -scale-x-100";
const paperLilac = "catatan-torn-d size-full bg-(--tpl-lilac)";
const scribble =
  "absolute font-serif text-lg italic text-(--tpl-coal-ink) [writing-mode:horizontal-tb]";
const windowFrame =
  "relative overflow-hidden rounded-2xl bg-surface text-left shadow-[0_30px_60px_-20px_rgb(12_40_73/0.35)] ring-1 ring-ink/10";
const windowBar =
  "flex h-10 items-center gap-2 border-b border-line bg-subtle/60 px-4";
const windowDot = "size-3 rounded-full bg-line";
const windowTitle = "mx-auto text-xs font-medium text-muted";
const appGrid = "grid min-h-96 md:grid-cols-[13rem_1fr]";
const sidebar =
  "hidden flex-col gap-0.5 border-r border-line bg-subtle/40 p-3 text-sm md:flex";
const sideSearch =
  "mb-2 flex h-8 items-center gap-2 rounded-lg bg-surface px-2.5 text-xs text-faint ring-1 ring-line";
const sideItem = "flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-muted";
const sideActive =
  "flex h-8 items-center gap-2.5 rounded-lg bg-surface px-2.5 font-medium text-ink shadow-sm ring-1 ring-line";
const sideLabel = "mt-4 mb-1 px-2.5 text-xs font-medium text-faint";
const sideDot = "size-2.5 rounded-sm";
const docArea = "grid content-start gap-5 p-5 sm:p-7";
const docTitle = "font-serif text-3xl tracking-tight";
const docMeta = "mt-1 text-sm text-muted";
const cardGrid = "grid grid-cols-2 gap-3 lg:grid-cols-3";
const pastelCard = "grid min-h-28 content-between gap-3 rounded-xl p-3.5";
const pastelIcon =
  "flex size-7 items-center justify-center rounded-lg bg-surface/70 text-ink";
const pastelTitle = "text-sm font-semibold";
const pastelMeta = "text-xs text-ink/70";
const iconClass = "size-4 shrink-0";
const section = "scroll-mt-24 px-4 py-20 sm:py-28";
const sectionInner = "mx-auto max-w-6xl";
const serifTitle =
  "mx-auto max-w-3xl text-center font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-6xl";
const sectionLead =
  "mx-auto mt-5 max-w-xl text-center text-lg text-pretty text-muted";
const tabList =
  "mx-auto mt-12 grid max-w-3xl grid-cols-5 gap-1 sm:flex sm:justify-center sm:gap-6";
const tabBase =
  "group grid min-w-0 justify-items-center gap-2 rounded-2xl px-0.5 py-3 text-[11px] font-medium transition-colors duration-150 motion-reduce:transition-none sm:min-w-24 sm:px-2 sm:text-sm";
const tabIdle = "text-muted hover:text-ink";
const tabActive = "text-primary";
const tabIconWrap =
  "flex size-12 items-center justify-center rounded-2xl ring-1 transition-colors duration-150 motion-reduce:transition-none sm:size-16";
const tabIconIdle = "bg-surface ring-line group-hover:ring-ink/30";
const tabIconActive = "bg-primary-soft ring-primary";
const tabIcon =
  "size-7 [stroke-width:1.4] [stroke-linecap:round] [stroke-linejoin:round]";
const panelWrap = "relative isolate mx-auto mt-10 max-w-5xl";
const panelGlow =
  "absolute -inset-x-6 -inset-y-6 -z-10 rounded-[2.5rem] bg-[linear-gradient(135deg,var(--tpl-ice),var(--tpl-lilac)_50%,var(--tpl-peach))] opacity-70 sm:-inset-x-10";
const panelBody = "min-h-[25rem] p-5 sm:p-8";
const kicker = "text-xs font-semibold tracking-wide text-muted uppercase";
const paragraph = "text-sm leading-relaxed text-muted";
const quote =
  "rounded-xl bg-(--tpl-cream) p-4 font-serif text-lg leading-snug italic";
const linkCard =
  "flex items-center gap-3 rounded-xl p-3 text-sm font-medium ring-1 ring-line";
const taskRow =
  "flex items-center gap-3 border-b border-line py-3 text-sm last:border-0";
const checkDone =
  "flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary";
const checkOpen = "size-5 shrink-0 rounded-full ring-1 ring-faint ring-inset";
const tag = "ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium";
const taskDate = "w-14 text-right text-xs text-muted tabular-nums";
const progressTrack = "h-1.5 w-32 overflow-hidden rounded-full bg-subtle";
const progressFill = "h-full w-[62.5%] rounded-full bg-primary";
const weekGrid = "grid grid-cols-7 gap-1.5 sm:gap-2";
const dayHead = "grid justify-items-center gap-0.5 pb-2 text-xs text-muted";
const dayNum = "flex size-7 items-center justify-center rounded-full text-sm";
const dayToday = "bg-primary font-semibold text-on-primary";
const dayCol =
  "grid min-h-64 content-start gap-1.5 rounded-xl bg-subtle/50 p-1";
const eventChip =
  "grid min-w-0 gap-0.5 rounded-lg p-1 text-[10px] leading-tight font-medium [overflow-wrap:anywhere] sm:p-2 sm:text-xs";
const eventTime = "font-normal text-ink/70";
const boardCanvas =
  "relative h-[22rem] overflow-hidden rounded-xl bg-subtle/50 bg-[radial-gradient(var(--color-line)_1.2px,transparent_1.2px)] bg-size-[18px_18px]";
const boardLines =
  "absolute inset-0 size-full fill-none stroke-faint [stroke-dasharray:5_5] [stroke-width:1.5]";
const sticky =
  "absolute grid w-[28%] gap-1 rounded-md p-2 text-[11px] leading-snug shadow-sm sm:w-52 sm:p-3 sm:text-sm";
const stickyTitle = "font-semibold";
const dailyGrid = "grid gap-6 md:grid-cols-[1fr_14rem]";
const dailyDate = "font-serif text-3xl tracking-tight";
const dailyRow = "flex gap-4 border-b border-line py-3 text-sm last:border-0";
const dailyTime = "w-12 shrink-0 text-muted tabular-nums";
const moodRow = "mt-4 flex flex-wrap gap-2";
const moodChip = "rounded-full px-3 py-1 text-xs font-medium";
const asideCard = "grid content-start gap-3 rounded-xl bg-subtle/60 p-4";
const asideItem = "flex items-center justify-between text-sm";
const storiesHead =
  "mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6";
const storiesTitle =
  "font-serif text-4xl leading-tight tracking-tight sm:text-5xl";
const carouselButtons = "flex gap-2";
const roundButton =
  "inline-flex size-11 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-line transition-colors duration-150 hover:bg-subtle disabled:opacity-40 disabled:hover:bg-surface motion-reduce:transition-none";
const viewport =
  "mx-auto mt-10 max-w-6xl snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-3xl pb-2 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden";
const storyList = "flex gap-5";
const storyItem = "w-64 shrink-0 snap-start sm:w-72";
const portrait =
  "relative aspect-[4/5] overflow-hidden rounded-3xl bg-(--story-bg)";
const shapeCircle =
  "absolute -top-8 -right-10 size-40 rounded-full bg-(--story-a)";
const shapeStrip =
  "absolute -bottom-6 -left-8 h-24 w-56 -rotate-12 rounded-2xl bg-(--story-b)";
const shapeHalf =
  "absolute top-10 left-6 size-16 rounded-t-full bg-(--story-c) opacity-80";
const personBody =
  "absolute bottom-0 left-1/2 h-[34%] w-[64%] -translate-x-1/2 rounded-t-[999px] bg-(--story-shirt)";
const personHead =
  "absolute bottom-[30%] left-1/2 flex aspect-square w-[38%] -translate-x-1/2 items-center justify-center rounded-full bg-(--tpl-paper) font-serif text-3xl text-ink ring-4 ring-(--story-bg)";
const storyName = "mt-4 text-base font-semibold";
const storyRole =
  "mt-0.5 text-xs font-semibold tracking-[0.12em] text-muted uppercase";
const storyNote = "mt-3 font-serif text-lg leading-snug text-pretty italic";
const featureGrid = "mt-14 grid gap-5 md:grid-cols-3";
const featureCard = "grid content-start gap-5 rounded-3xl p-5 sm:p-6";
const featureMock =
  "grid min-h-44 content-center gap-2.5 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-ink/5";
const featureStep = "text-sm font-semibold text-ink/70";
const featureTitle = "font-serif text-2xl tracking-tight";
const featureText = "text-sm leading-relaxed text-ink/80";
const captureBox =
  "flex items-center gap-2 rounded-xl bg-subtle px-3 py-2.5 text-sm";
const caret = "h-4 w-px bg-primary";
const chip =
  "inline-flex w-fit items-center gap-1 rounded-full bg-subtle px-2.5 py-1 text-xs font-medium text-muted";
const miniCheck = "flex items-center gap-2 text-sm";
const shareField =
  "flex items-center gap-2 rounded-xl bg-subtle px-3 py-2 text-xs text-muted";
const avatarRow = "flex -space-x-1.5";
const avatar =
  "flex size-8 items-center justify-center rounded-full text-[11px] font-semibold text-ink ring-2 ring-surface";
const published =
  "ml-auto rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-ink";
const billing =
  "mx-auto mt-10 flex w-fit items-center gap-1 rounded-full bg-subtle p-1 ring-1 ring-line";
const billingButton =
  "inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none";
const billingIdle = "text-muted hover:text-ink";
const billingActive = "bg-surface text-ink shadow-sm ring-1 ring-line";
const saveBadge =
  "rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary";
const planGrid = "mt-12 grid items-start gap-5 lg:grid-cols-3";
const planBase = "grid gap-6 rounded-3xl bg-surface p-6 sm:p-7";
const planIdle = "ring-1 ring-line";
const planFeatured = "ring-2 ring-primary shadow-overlay";
const planName = "flex items-center justify-between text-lg font-semibold";
const planBadge =
  "rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-on-primary";
const planBlurb = "mt-1 text-sm text-muted";
const planPrice = "text-5xl font-semibold tracking-tighter tabular-nums";
const planPer = "ml-1 text-sm text-muted";
const planNote = "mt-1 h-5 text-sm text-muted";
const planList = "grid gap-2.5 text-sm";
const planItem = "flex items-start gap-2.5";
const planCheck = "mt-0.5 size-4 shrink-0 text-primary";
const faqWrap =
  "scroll-mt-24 px-4 py-20 sm:py-28 [&_h2]:font-serif [&_h2]:text-4xl [&_h2]:font-normal [&_h2]:tracking-tight sm:[&_h2]:text-5xl";
const faqInner = "mx-auto max-w-6xl";
const ctaWrap = "scroll-mt-24 px-4 pb-20";
const ctaCard =
  "relative isolate mx-auto grid max-w-6xl justify-items-center overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,var(--tpl-sky-1),var(--tpl-sky-2)_55%,var(--tpl-sky-3))] px-5 py-16 text-center sm:py-24";
const ctaTitle =
  "max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-balance text-(--tpl-sky-ink) sm:text-6xl";
const ctaLead = "mt-4 max-w-md text-base text-(--tpl-sky-ink)/80 sm:text-lg";
const ctaForm =
  "mt-8 grid w-full max-w-md gap-3 rounded-3xl bg-surface p-4 text-left shadow-overlay sm:grid-cols-[1fr_auto] sm:items-start";
const emailField = "grid gap-1.5";
const errorText = "text-sm text-danger";
const platformRow = "mt-6 flex flex-wrap justify-center gap-2";
const platform =
  "inline-flex h-9 items-center gap-1.5 rounded-full bg-surface/80 px-4 text-sm font-medium text-ink ring-1 ring-ink/5";
const footer = "border-t border-line px-4 pt-14 pb-10";
const footerInner =
  "mx-auto grid max-w-6xl grid-cols-3 gap-x-4 gap-y-10 md:grid-cols-[1.4fr_repeat(3,1fr)]";
const footerBrand = "col-span-3 grid content-start gap-3 md:col-span-1";
const footerTag = "max-w-xs text-sm text-muted";
const footerHead = "text-sm font-semibold";
const footerList = "mt-3 grid gap-2 text-sm";
const footerLink = "rounded-sm text-muted hover:text-ink";
const footerBottom =
  "mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-sm text-muted";
const builtWith = "rounded-sm font-medium text-ink hover:underline";

/* Data */
const NAV = [
  ["Product", "#product"],
  ["Community", "#stories"],
  ["Pricing", "#pricing"],
  ["Download", "#download"],
] as const;

const tones = {
  peach: "bg-(--tpl-peach)",
  mint: "bg-(--tpl-mint)",
  lilac: "bg-(--tpl-lilac)",
  cream: "bg-(--tpl-cream)",
  ice: "bg-(--tpl-ice)",
  rose: "bg-(--tpl-rose)",
};
type Tone = keyof typeof tones;

const SIDE_ITEMS: [IconName, string][] = [
  ["home", "Home"],
  ["daily", "Daily Notes"],
  ["tasks", "Tasks"],
  ["calendar", "Calendar"],
];
const SPACES: [string, Tone][] = [
  ["Bali offsite", "peach"],
  ["Reading list", "mint"],
  ["Studio Lembar", "lilac"],
];
const HERO_CARDS: [IconName, string, string, Tone][] = [
  ["calendar", "Flights", "Jakarta to Denpasar, 14 Mar", "peach"],
  ["home", "Villa shortlist", "3 options in Ubud", "mint"],
  ["docs", "Agenda", "Day 1 to Day 4", "lilac"],
  ["sparkle", "Budget", "Rp42.500.000", "cream"],
  ["tasks", "Packing list", "18 of 24 packed", "ice"],
  ["boards", "Moodboard", "12 pins", "rose"],
];

const TABS: { id: string; label: string; icon: IconName }[] = [
  { id: "docs", label: "Docs", icon: "docs" },
  { id: "tasks", label: "Tasks", icon: "tasks" },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "boards", label: "Whiteboards", icon: "boards" },
  { id: "daily", label: "Daily Notes", icon: "daily" },
];
const TASKS: [string, boolean, string, Tone, string][] = [
  ["Send the venue deposit", true, "Offsite", "peach", "Mon"],
  ["Draft the November newsletter", true, "Writing", "lilac", "Mon"],
  ["Review Sekar's chapter notes", true, "Reading", "mint", "Tue"],
  ["Book the Ubud villa", true, "Offsite", "peach", "Tue"],
  ["Plan Q1 roadmap session", true, "Team", "ice", "Wed"],
  ["Pick up film from the lab", false, "Personal", "cream", "Thu"],
  ["Call Pak Hendra about catering", false, "Offsite", "peach", "Fri"],
  ["Finish the pitch deck outline", false, "Team", "ice", "Fri"],
];
const WEEK: [string, number, [string, string, Tone][]][] = [
  [
    "Mon",
    9,
    [
      ["Standup", "09:00", "ice"],
      ["Write", "10:30", "lilac"],
      ["Lunch with Rani", "12:30", "peach"],
    ],
  ],
  [
    "Tue",
    10,
    [
      ["Design review", "11:00", "mint"],
      ["Gym", "18:00", "cream"],
    ],
  ],
  ["Wed", 11, [["Roadmap", "13:00", "ice"]]],
  [
    "Thu",
    12,
    [
      ["Studio visit", "10:00", "rose"],
      ["1:1 Bima", "15:00", "mint"],
    ],
  ],
  [
    "Fri",
    13,
    [
      ["Catering call", "09:30", "peach"],
      ["Demo day", "14:00", "lilac"],
    ],
  ],
  ["Sat", 14, [["Flight DPS", "07:15", "peach"]]],
  ["Sun", 15, []],
];
const STICKIES: [string, string, Tone, string][] = [
  [
    "Problem",
    "People lose ideas between apps",
    "cream",
    "top-[10%] left-[3%] -rotate-3",
  ],
  [
    "Insight",
    "Notes, tasks and dates live together",
    "mint",
    "top-[6%] left-[37%] rotate-2",
  ],
  [
    "Idea",
    "One page that grows into a plan",
    "lilac",
    "top-[58%] left-[8%] rotate-1",
  ],
  [
    "Next",
    "Prototype the weekly view",
    "rose",
    "top-[60%] left-[42%] -rotate-2",
  ],
  [
    "Ship",
    "Launch to the first 100 users",
    "ice",
    "top-[32%] left-[70%] rotate-3",
  ],
];
const BOARD_LINES = [
  "M22 22 C 28 14, 32 14, 37 17",
  "M14 38 C 11 46, 12 52, 16 58",
  "M28 72 C 34 76, 37 76, 42 72",
  "M56 20 C 63 22, 67 28, 71 34",
  "M61 70 C 68 68, 72 62, 76 56",
];
const DAILY: [string, string][] = [
  ["07:30", "Morning pages. Slept well, head feels clear."],
  ["09:10", "Idea for the newsletter: small rituals that stick."],
  ["13:00", "Lunch with Rani, she recommended Laut Bercerita."],
  ["16:45", "Shipped the onboarding copy, two typos fixed."],
];
const MOODS: [string, Tone][] = [
  ["Calm", "mint"],
  ["Focused", "ice"],
  ["Grateful", "peach"],
];
const RECENT: [string, string][] = [
  ["Sunday, 8 Nov", "4 notes"],
  ["Saturday, 7 Nov", "2 notes"],
  ["Friday, 6 Nov", "6 notes"],
];

type Story = {
  name: string;
  role: string;
  note: string;
  colors: string;
};
const STORIES: Story[] = [
  {
    name: "Nadia Putri",
    role: "Architect",
    note: "Site notes, sketches and client calls in one place, finally.",
    colors:
      "[--story-bg:var(--tpl-ice)] [--story-a:var(--tpl-sun)] [--story-b:var(--tpl-blue)] [--story-c:var(--tpl-coral)] [--story-shirt:var(--tpl-coal)]",
  },
  {
    name: "Bima Santoso",
    role: "Founder",
    note: "Our whole company handbook started as a single messy page.",
    colors:
      "[--story-bg:var(--tpl-peach)] [--story-a:var(--tpl-coral)] [--story-b:var(--tpl-teal)] [--story-c:var(--tpl-violet)] [--story-shirt:var(--tpl-blue)]",
  },
  {
    name: "Sekar Ayu",
    role: "PhD student",
    note: "Three years of reading notes, and I can still find every quote.",
    colors:
      "[--story-bg:var(--tpl-mint)] [--story-a:var(--tpl-teal)] [--story-b:var(--tpl-sun)] [--story-c:var(--tpl-blue)] [--story-shirt:var(--tpl-violet)]",
  },
  {
    name: "Reza Pratama",
    role: "Product manager",
    note: "Specs, tasks and the launch calendar finally talk to each other.",
    colors:
      "[--story-bg:var(--tpl-lilac)] [--story-a:var(--tpl-violet)] [--story-b:var(--tpl-coral)] [--story-c:var(--tpl-sun)] [--story-shirt:var(--tpl-teal)]",
  },
  {
    name: "Intan Maharani",
    role: "Novelist",
    note: "My second novel lives here, chapter by chapter, draft by draft.",
    colors:
      "[--story-bg:var(--tpl-rose)] [--story-a:var(--tpl-coral)] [--story-b:var(--tpl-violet)] [--story-c:var(--tpl-teal)] [--story-shirt:var(--tpl-sun)]",
  },
  {
    name: "Dimas Wicaksono",
    role: "Teacher",
    note: "Lesson plans for forty students, shared with one link.",
    colors:
      "[--story-bg:var(--tpl-cream)] [--story-a:var(--tpl-sun)] [--story-b:var(--tpl-blue)] [--story-c:var(--tpl-teal)] [--story-shirt:var(--tpl-coral)]",
  },
  {
    name: "Laras Wulandari",
    role: "Chef",
    note: "Every recipe test, every tweak, with photos of the plating.",
    colors:
      "[--story-bg:var(--tpl-ice)] [--story-a:var(--tpl-teal)] [--story-b:var(--tpl-rose)] [--story-c:var(--tpl-violet)] [--story-shirt:var(--tpl-coal)]",
  },
];

const PLANS = [
  {
    id: "free",
    name: "Free",
    blurb: "For your own notes and ideas.",
    monthly: "Rp0",
    yearly: "Rp0",
    note: "Free forever",
    noteYearly: "Free forever",
    cta: "Download free",
    featured: false,
    features: [
      "Unlimited notes on 2 devices",
      "Docs, tasks and daily notes",
      "1 GB of uploads",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    blurb: "For people who live in their notes.",
    monthly: "Rp49.000",
    yearly: "Rp39.000",
    note: "Billed monthly",
    noteYearly: "Rp468.000 billed yearly",
    cta: "Start 14 day trial",
    featured: true,
    features: [
      "Everything in Free, on every device",
      "Calendar and whiteboards",
      "Publish pages as a website",
      "50 GB of uploads",
    ],
  },
  {
    id: "team",
    name: "Team",
    blurb: "For small teams sharing one space.",
    monthly: "Rp89.000",
    yearly: "Rp71.000",
    note: "Per member, billed monthly",
    noteYearly: "Rp852.000 per member yearly",
    cta: "Talk to us",
    featured: false,
    features: [
      "Everything in Plus",
      "Shared spaces and permissions",
      "Admin console and SSO",
      "Priority support in Bahasa and English",
    ],
  },
];

const FAQS = [
  {
    question: "Does Lembar work offline?",
    answer:
      "Yes. Everything is stored on your device first and syncs when you are back online, so a flight or a bad signal never stops you.",
  },
  {
    question: "Can I import from other apps?",
    answer:
      "Bring your notes from Markdown files, Notion, Evernote, or Apple Notes. Folders, images, and links come along.",
  },
  {
    question: "Who can see my notes?",
    answer:
      "Only you, until you share a page. Shared pages can be view only, editable, or published as a public site.",
  },
  {
    question: "Is there a discount for students?",
    answer:
      "Students and teachers get Plus for free with a school email address. Renew it once a year.",
  },
  {
    question: "Can I cancel at any time?",
    answer:
      "Yes. Your plan stays active until the end of the period, and your notes stay yours on the Free plan.",
  },
];

const FOOTER: [string, string[]][] = [
  ["Product", ["Docs", "Tasks", "Calendar", "Whiteboards"]],
  ["Company", ["About", "Careers", "Blog", "Press"]],
  ["Resources", ["Help center", "Templates", "Community", "Status"]],
];
const HERO_CLOUDS = [
  "top-20 -left-16 scale-125 opacity-95",
  "top-44 left-[22%] scale-75 opacity-70 [animation-delay:-5s]",
  "top-16 -right-10 scale-150 opacity-95 [animation-delay:-9s]",
  "top-[25rem] right-[8%] opacity-70 [animation-delay:-3s]",
  "top-[29rem] left-[2%] scale-110 opacity-70 [animation-delay:-7s]",
];
const CTA_CLOUDS = [
  "-top-6 -left-10 opacity-80",
  "right-0 bottom-4 scale-125 opacity-70 [animation-delay:-6s]",
];
const PLATFORMS = ["macOS", "Windows", "iPhone", "Android"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PLAN_MESSAGES: Record<string, [string, string]> = {
  free: [
    "Download started",
    "Lembar Free is on its way to your Downloads folder.",
  ],
  plus: ["Your trial has started", "14 days of Plus, no card needed."],
  team: [
    "Thanks for reaching out",
    "Our team will email you within one working day.",
  ],
};
const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");
const slug = (label: string) => "/" + label.toLowerCase().replace(/\s+/g, "-");
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/**
 * Animasi masuk saat scroll. Elemen di bawah layar disembunyikan dulu lalu muncul saat terlihat.
 * Tidak berjalan saat reduced motion, jadi isi selalu tampil.
 */
function reveal(container: HTMLElement) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-reveal", "shown");
        observer.unobserve(entry.target);
      }),
    { rootMargin: "0px 0px -10% 0px" },
  );
  container.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight) return;
    el.setAttribute("data-reveal", "hidden");
    observer.observe(el);
  });
  return () => observer.disconnect();
}

function Icon({
  name,
  className = iconClass,
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
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[name]} />
    </svg>
  );
}

function Cloud({ place }: { place: string }) {
  return (
    <span className={cx(cloud, place)} aria-hidden="true">
      <span className={puffBase} />
      <span className={puffSmall} />
      <span className={puffLarge} />
    </span>
  );
}

function AppWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={windowFrame}>
      <div className={windowBar}>
        <span className={windowDot} />
        <span className={windowDot} />
        <span className={windowDot} />
        <span className={windowTitle}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function HeroApp() {
  return (
    <div className={appGrid}>
      <div className={sidebar}>
        <div className={sideSearch}>
          <Icon name="search" className="size-3.5" />
          Search
        </div>
        {SIDE_ITEMS.map(([icon, label]) => (
          <span key={label} className={sideItem}>
            <Icon name={icon} />
            {label}
          </span>
        ))}
        <span className={sideLabel}>Spaces</span>
        {SPACES.map(([label, tone], i) => (
          <span key={label} className={i === 0 ? sideActive : sideItem}>
            <span className={cx(sideDot, tones[tone])} />
            {label}
          </span>
        ))}
      </div>
      <div className={docArea}>
        <div>
          <p className={docTitle}>Bali offsite</p>
          <p className={docMeta}>Planning board · edited 2 minutes ago</p>
        </div>
        <div className={cardGrid}>
          {HERO_CARDS.map(([icon, label, meta, tone]) => (
            <div key={label} className={cx(pastelCard, tones[tone])}>
              <span className={pastelIcon}>
                <Icon name={icon} />
              </span>
              <span>
                <span className="block">
                  <span className={pastelTitle}>{label}</span>
                </span>
                <span className={pastelMeta}>{meta}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocsPanel() {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_15rem]">
      <div className="grid content-start gap-4">
        <p className={kicker}>Studio Lembar / Letters</p>
        <p className={docTitle}>A quarterly letter to the team</p>
        <p className={paragraph}>
          This quarter we shipped offline sync, rebuilt search, and welcomed
          four new people. Here is what we learned, and what we want to try
          next.
        </p>
        <p className={quote}>
          &ldquo;Write it down first. Decide later.&rdquo;
        </p>
        <p className={paragraph}>
          Next up: shared spaces for small teams, and a calmer way to plan the
          week without leaving your notes.
        </p>
      </div>
      <div className="grid content-start gap-2">
        <p className={kicker}>Linked pages</p>
        {HERO_CARDS.slice(0, 3).map(([icon, label, , tone]) => (
          <span key={label} className={linkCard}>
            <span className={cx(pastelIcon, tones[tone])}>
              <Icon name={icon} />
            </span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function TasksPanel() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className={docTitle}>This week</p>
        <span className="flex items-center gap-3 text-sm text-muted">
          5 of 8 done
          <span className={progressTrack}>
            <span className={cx("block", progressFill)} />
          </span>
        </span>
      </div>
      <ul>
        {TASKS.map(([label, done, group, tone, day]) => (
          <li key={label} className={taskRow}>
            {done ? (
              <span className={checkDone}>
                <Icon name="check" className="size-3" />
              </span>
            ) : (
              <span className={checkOpen} />
            )}
            <span className={done ? "text-muted line-through" : ""}>
              {label}
            </span>
            <span className={cx(tag, tones[tone])}>{group}</span>
            <span className={taskDate}>{day}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CalendarPanel() {
  return (
    <div className="grid gap-4">
      <p className={docTitle}>November 2026</p>
      <div className={weekGrid}>
        {WEEK.map(([day, num, events]) => (
          <div key={day} className="min-w-0">
            <div className={dayHead}>
              {day}
              <span className={cx(dayNum, num === 9 && dayToday)}>{num}</span>
            </div>
            <div className={dayCol}>
              {events.map(([label, time, tone]) => (
                <span key={label} className={cx(eventChip, tones[tone])}>
                  {label}
                  <span className={eventTime}>{time}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoardsPanel() {
  return (
    <div className={boardCanvas}>
      <svg
        className={boardLines}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {BOARD_LINES.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {STICKIES.map(([label, text, tone, place]) => (
        <span key={label} className={cx(sticky, tones[tone], place)}>
          <span className={stickyTitle}>{label}</span>
          {text}
        </span>
      ))}
    </div>
  );
}

function DailyPanel() {
  return (
    <div className={dailyGrid}>
      <div>
        <p className={kicker}>Daily note</p>
        <p className={dailyDate}>Monday, 9 November</p>
        <ul className="mt-3">
          {DAILY.map(([time, text]) => (
            <li key={time} className={dailyRow}>
              <span className={dailyTime}>{time}</span>
              {text}
            </li>
          ))}
        </ul>
        <div className={moodRow}>
          {MOODS.map(([label, tone]) => (
            <span key={label} className={cx(moodChip, tones[tone])}>
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className={asideCard}>
        <p className={kicker}>Earlier</p>
        {RECENT.map(([day, count]) => (
          <span key={day} className={asideItem}>
            {day}
            <span className="text-muted">{count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const PANELS: Record<string, () => ReactNode> = {
  docs: DocsPanel,
  tasks: TasksPanel,
  calendar: CalendarPanel,
  boards: BoardsPanel,
  daily: DailyPanel,
};

function Portrait({ story, index }: { story: Story; index: number }) {
  return (
    <div className={cx(portrait, story.colors)} aria-hidden="true">
      <span className={index % 2 ? flip : "absolute inset-0"}>
        <span className={shapeCircle} />
        <span className={shapeStrip} />
        <span className={shapeHalf} />
      </span>
      <span className={personBody} />
      <span className={personHead}>{initials(story.name)}</span>
    </div>
  );
}

export default function Catatan() {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState("docs");
  const [yearly, setYearly] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const Panel = PANELS[tab]!;
  const activeTab = TABS.find((item) => item.id === tab)!;

  useEffect(() => (rootRef.current ? reveal(rootRef.current) : undefined), []);

  const onTabKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const index = TABS.findIndex((item) => item.id === tab);
    const next = TABS[(index + step + TABS.length) % TABS.length]!;
    setTab(next.id);
    document.getElementById(`catatan-tab-${next.id}`)?.focus();
  };
  const onScroll = () => {
    const el = viewportRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 1,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  };
  const slide = (direction: number) => {
    const el = viewportRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: direction * (card.offsetWidth + 20) });
  };
  const choosePlan = (id: string) => {
    const [title, description] = PLAN_MESSAGES[id]!;
    toast({ title, description, variant: "success" });
  };
  const download = (name: string) =>
    toast({
      title: `Lembar for ${name}`,
      description: "Your download will start in a moment.",
    });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setEmailError("Enter a valid email address, like you@mail.com.");
      return;
    }
    setEmailError("");
    setEmail("");
    toast({
      title: "Link sent",
      description: `Check ${value} on your phone.`,
      variant: "success",
    });
  };

  return (
    <div ref={rootRef} className={cx(root, palette)}>
      <style>{css}</style>
      <header className={headerWrap}>
        <nav aria-label="Main" className={navBar}>
          <a href="#top" className={cx(wordmark, focusRing)}>
            lembar
          </a>
          <div className={navLinks}>
            {NAV.map(([label, href]) => (
              <a key={href} href={href} className={cx(navLink, focusRing)}>
                {label}
              </a>
            ))}
          </div>
          <a href="/login" className={cx(loginLink, focusRing)}>
            Log in
          </a>
          <a
            href="#pricing"
            className={cx(pillDark, focusRing, "ml-auto md:ml-0")}
          >
            Try free
          </a>
          <button
            type="button"
            className={cx(menuButton, focusRing)}
            aria-expanded={menuOpen}
            aria-controls="catatan-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="size-5" />
          </button>
        </nav>
        {menuOpen && (
          <div id="catatan-menu" className={menuPanel}>
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={cx(menuLink, focusRing)}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a href="/login" className={cx(menuLink, focusRing)}>
              Log in
            </a>
          </div>
        )}
      </header>

      <main>
        <section id="top" aria-labelledby="catatan-title" className={hero}>
          {HERO_CLOUDS.map((place) => (
            <Cloud key={place} place={place} />
          ))}
          <div className={heroInner}>
            <h1 id="catatan-title" className={heroTitle}>
              Your space for notes, tasks, and big ideas
            </h1>
            <p className={heroLead}>
              Lembar keeps everything you think, plan, and make on one calm
              page, from the first scribble to the finished thing.
            </p>
            <div className={heroActions}>
              <a href="#download" className={cx(pillLight, focusRing)}>
                <Icon name="download" />
                Download for free
              </a>
              <a href="#product" className={cx(pillGhost, focusRing)}>
                See what it does
              </a>
            </div>
            <p className={heroNote}>
              Free on Mac, Windows, iPhone, and Android.
            </p>
          </div>
          <div className={collage}>
            <div
              className={cx(
                paperShadow,
                "-top-10 -left-6 h-56 w-72 -rotate-6 sm:-left-14",
              )}
              aria-hidden="true"
            >
              <div className={paperWhite} />
            </div>
            <div
              className={cx(
                paperShadow,
                "-top-8 -right-6 h-72 w-60 rotate-6 sm:-right-12",
              )}
              aria-hidden="true"
            >
              <div className={paperLined} />
              <span className={paperList}>
                <span>buy film</span>
                <span>call Ibu</span>
                <span>ideas!</span>
              </span>
            </div>
            <div
              className={cx(
                paperShadow,
                "-bottom-20 -left-8 h-48 w-80 rotate-3 sm:-left-16",
              )}
              aria-hidden="true"
            >
              <div className={paperCoal} />
              <span className={cx(scribble, "bottom-6 left-8 -rotate-3")}>
                think out loud
              </span>
            </div>
            <div
              className={cx(
                paperShadow,
                "-right-8 -bottom-14 h-44 w-72 -rotate-3 sm:-right-16",
              )}
              aria-hidden="true"
            >
              <div className={paperLilac} />
            </div>
            <div
              className="relative z-10 mx-auto max-w-4xl"
              role="img"
              aria-label="The Lembar app with a sidebar of spaces and a planning board of pastel cards"
            >
              <AppWindow title="Bali offsite">
                <HeroApp />
              </AppWindow>
            </div>
          </div>
        </section>

        <section
          id="product"
          aria-labelledby="catatan-things"
          className={section}
        >
          <div className={sectionInner} data-reveal="">
            <h2 id="catatan-things" className={serifTitle}>
              Lembar isn&rsquo;t just for one thing, it&rsquo;s for{" "}
              <em>your</em> things.
            </h2>
            <p className={sectionLead}>
              Write a doc, tick off a list, plan the week, or think on a canvas.
              Same app, same page, no switching.
            </p>
            <div
              role="tablist"
              aria-label="What you can make"
              className={tabList}
              onKeyDown={onTabKey}
            >
              {TABS.map((item) => {
                const selected = item.id === tab;
                return (
                  <button
                    key={item.id}
                    id={`catatan-tab-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="catatan-panel"
                    tabIndex={selected ? 0 : -1}
                    className={cx(
                      tabBase,
                      focusRing,
                      selected ? tabActive : tabIdle,
                    )}
                    onClick={() => setTab(item.id)}
                  >
                    <span
                      className={cx(
                        tabIconWrap,
                        selected ? tabIconActive : tabIconIdle,
                      )}
                    >
                      <Icon name={item.icon} className={tabIcon} />
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className={panelWrap}>
              <span className={panelGlow} aria-hidden="true" />
              <div
                id="catatan-panel"
                role="tabpanel"
                aria-labelledby={`catatan-tab-${tab}`}
              >
                <AppWindow title={activeTab.label}>
                  <div className={panelBody}>
                    <Panel />
                  </div>
                </AppWindow>
              </div>
            </div>
          </div>
        </section>

        <section
          id="stories"
          aria-labelledby="catatan-stories"
          className={section}
        >
          <div className={storiesHead} data-reveal="">
            <h2 id="catatan-stories" className={storiesTitle}>
              How people use Lembar
            </h2>
            <div className={carouselButtons}>
              <button
                type="button"
                className={cx(roundButton, focusRing)}
                aria-label="Previous stories"
                disabled={edges.start}
                onClick={() => slide(-1)}
              >
                <Icon name="left" className="size-5" />
              </button>
              <button
                type="button"
                className={cx(roundButton, focusRing)}
                aria-label="Next stories"
                disabled={edges.end}
                onClick={() => slide(1)}
              >
                <Icon name="right" className="size-5" />
              </button>
            </div>
          </div>
          <div
            ref={viewportRef}
            role="region"
            aria-label="Stories"
            tabIndex={0}
            className={cx(viewport, focusRing)}
            onScroll={onScroll}
          >
            <ul className={storyList}>
              {STORIES.map((story, i) => (
                <li key={story.name} className={storyItem}>
                  <Portrait story={story} index={i} />
                  <p className={storyName}>{story.name}</p>
                  <p className={storyRole}>{story.role}</p>
                  <p className={storyNote}>&ldquo;{story.note}&rdquo;</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="features"
          aria-labelledby="catatan-features"
          className={section}
        >
          <div className={sectionInner} data-reveal="">
            <h2 id="catatan-features" className={serifTitle}>
              From first thought to finished
            </h2>
            <p className={sectionLead}>
              Catch the idea, give it shape, then hand it to the people who need
              it.
            </p>
            <div className={featureGrid}>
              <div className={cx(featureCard, tones.cream)}>
                <div className={featureMock} aria-hidden="true">
                  <span className={captureBox}>
                    <Icon name="plus" className="size-4 text-muted" />
                    Call Pak Hendra about the venue
                    <span className={caret} />
                  </span>
                  <span className={chip}>
                    <Icon name="folder" className="size-3.5" />
                    Inbox
                  </span>
                </div>
                <p className={featureStep}>01 Capture</p>
                <h3 className={featureTitle}>Jot it before it slips</h3>
                <p className={featureText}>
                  A quick note from the menu bar, your phone, or your watch. It
                  lands in Inbox, ready when you are.
                </p>
              </div>
              <div className={cx(featureCard, tones.mint)}>
                <div className={featureMock} aria-hidden="true">
                  {TASKS.slice(4, 7).map(([label, done]) => (
                    <span key={label} className={miniCheck}>
                      {done ? (
                        <span className={checkDone}>
                          <Icon name="check" className="size-3" />
                        </span>
                      ) : (
                        <span className={checkOpen} />
                      )}
                      {label}
                    </span>
                  ))}
                </div>
                <p className={featureStep}>02 Shape</p>
                <h3 className={featureTitle}>Turn notes into plans</h3>
                <p className={featureText}>
                  Any line becomes a task, any date becomes an event, any page
                  becomes a board. Nothing gets copied twice.
                </p>
              </div>
              <div className={cx(featureCard, tones.lilac)}>
                <div className={featureMock} aria-hidden="true">
                  <span className={shareField}>
                    <Icon name="link" className="size-3.5" />
                    lembar.page/bali-offsite
                  </span>
                  <span className="flex items-center">
                    <span className={avatarRow}>
                      {STORIES.slice(0, 3).map((story, i) => (
                        <span
                          key={story.name}
                          className={cx(
                            avatar,
                            [tones.peach, tones.ice, tones.rose][i],
                          )}
                        >
                          {initials(story.name)}
                        </span>
                      ))}
                    </span>
                    <span className={published}>Published</span>
                  </span>
                </div>
                <p className={featureStep}>03 Share</p>
                <h3 className={featureTitle}>Send it out into the world</h3>
                <p className={featureText}>
                  Invite people to edit, share a read only link, or publish a
                  page as a site with its own address.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          aria-labelledby="catatan-pricing"
          className={section}
        >
          <div className={sectionInner} data-reveal="">
            <h2 id="catatan-pricing" className={serifTitle}>
              Simple plans, honest prices
            </h2>
            <p className={sectionLead}>
              Start free. Upgrade when your notes outgrow two devices.
            </p>
            <div className={billing} role="group" aria-label="Billing period">
              <button
                type="button"
                aria-pressed={!yearly}
                className={cx(
                  billingButton,
                  focusRing,
                  yearly ? billingIdle : billingActive,
                )}
                onClick={() => setYearly(false)}
              >
                Monthly
              </button>
              <button
                type="button"
                aria-pressed={yearly}
                className={cx(
                  billingButton,
                  focusRing,
                  yearly ? billingActive : billingIdle,
                )}
                onClick={() => setYearly(true)}
              >
                Yearly
                <span className={saveBadge}>Save 20%</span>
              </button>
            </div>
            <div className={planGrid}>
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  data-plan={plan.id}
                  className={cx(
                    planBase,
                    plan.featured ? planFeatured : planIdle,
                  )}
                >
                  <div>
                    <h3 className={planName}>
                      {plan.name}
                      {plan.featured && (
                        <span className={planBadge}>Popular</span>
                      )}
                    </h3>
                    <p className={planBlurb}>{plan.blurb}</p>
                  </div>
                  <div>
                    <p>
                      <span className={planPrice}>
                        {yearly ? plan.yearly : plan.monthly}
                      </span>
                      <span className={planPer}>/ month</span>
                    </p>
                    <p className={planNote}>
                      {yearly ? plan.noteYearly : plan.note}
                    </p>
                  </div>
                  <Button
                    variant={plan.featured ? "primary" : "secondary"}
                    className="w-full"
                    onClick={() => choosePlan(plan.id)}
                  >
                    {plan.cta}
                  </Button>
                  <ul className={planList}>
                    {plan.features.map((feature) => (
                      <li key={feature} className={planItem}>
                        <Icon name="check" className={planCheck} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={faqWrap}>
          <div className={faqInner} data-reveal="">
            <Faq
              id="faq"
              variant="split"
              title="Questions, answered"
              description="Everything people ask before they move their notes in."
              items={FAQS}
              exclusive
            />
          </div>
        </div>

        <section
          id="download"
          aria-labelledby="catatan-download"
          className={ctaWrap}
        >
          <div className={ctaCard} data-reveal="">
            {CTA_CLOUDS.map((place) => (
              <Cloud key={place} place={place} />
            ))}
            <h2 id="catatan-download" className={ctaTitle}>
              Start with a blank page
            </h2>
            <p className={ctaLead}>
              Get Lembar on every device. We will send the download link
              straight to your phone.
            </p>
            <div className={platformRow}>
              {PLATFORMS.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={cx(platform, focusRing)}
                  onClick={() => download(name)}
                >
                  <Icon name="download" />
                  {name}
                </button>
              ))}
            </div>
            <form className={ctaForm} noValidate onSubmit={submit}>
              <div className={emailField}>
                <Input
                  id="catatan-email"
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="you@mail.com"
                  value={email}
                  aria-invalid={emailError ? true : undefined}
                  aria-describedby={
                    emailError ? "catatan-email-error" : undefined
                  }
                  onChange={(event) => setEmail(event.target.value)}
                />
                {emailError && (
                  <p id="catatan-email-error" className={errorText}>
                    {emailError}
                  </p>
                )}
              </div>
              <Button type="submit" className="sm:mt-7">
                Send link
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className={footer}>
        <div className={footerInner}>
          <div className={footerBrand}>
            <a href="#top" className={cx(wordmark, focusRing, "w-fit")}>
              lembar
            </a>
            <p className={footerTag}>
              A calm home for notes, tasks, and big ideas. Made in Yogyakarta.
            </p>
          </div>
          {FOOTER.map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h2 className={footerHead}>{heading}</h2>
              <ul className={footerList}>
                {links.map((label) => (
                  <li key={label}>
                    <a href={slug(label)} className={cx(footerLink, focusRing)}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={footerBottom}>
          <p>&copy; 2026 Lembar Labs. All rights reserved.</p>
          <p>
            Built with{" "}
            <a
              href="https://markas.jenderalcorp.com"
              className={cx(builtWith, focusRing)}
            >
              MarkasUI
            </a>
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
