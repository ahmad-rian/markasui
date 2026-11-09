"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { Button } from "../../../components/button/Button";
import { Input } from "../../../components/input/Input";
import { Select } from "../../../components/select/Select";
import { Textarea } from "../../../components/textarea/Textarea";
import { Toaster, toast } from "../../../components/toast/Toast";

/* Palet lokal, kelas, dan data: identik dengan versi Blade dan Vue. Hero dan CTA hijau tua di terang dan gelap. */
const palette =
  "[--tpl-lime:#d4f25a] [--tpl-lime-ink:#172003] [--tpl-forest:#0f2a1f] [--tpl-forest-2:#173a2b] [--tpl-snow:#ffffff] dark:[--tpl-forest:#0b1f17] dark:[--tpl-forest-2:#123124] [--tpl-sand:#e8dccb] [--tpl-sand-3:#5e4a2e] [--tpl-sage:#c7d4c1] [--tpl-sage-3:#3b5237] [--tpl-sky:#c9dbe8] [--tpl-sky-3:#284459] [--tpl-clay:#e6c3ae] [--tpl-clay-3:#713a24] [--tpl-mauve:#d8c6e0] [--tpl-mauve-3:#4b3559] dark:[--tpl-sand:#3a3328] dark:[--tpl-sand-3:#e0c9a6] dark:[--tpl-sage:#2f3a2e] dark:[--tpl-sage-3:#bcd4b5] dark:[--tpl-sky:#233441] dark:[--tpl-sky-3:#b5d0e4] dark:[--tpl-clay:#4a3227] dark:[--tpl-clay-3:#ecc2aa] dark:[--tpl-mauve:#3a2f42] dark:[--tpl-mauve-3:#dcc6e8]";
const root =
  "min-h-dvh bg-canvas p-2 text-ink scroll-smooth sm:p-3 motion-reduce:scroll-auto";
const reveal =
  "transition duration-700 ease-out motion-safe:[&:not([data-in])]:translate-y-6 motion-safe:[&:not([data-in])]:opacity-0 motion-reduce:transition-none";
const hero =
  "relative isolate overflow-hidden rounded-[28px] bg-(--tpl-forest) text-(--tpl-snow)";
const heroLines =
  "pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--tpl-snow)_7%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--tpl-snow)_7%,transparent)_1px,transparent_1px)] bg-size-[96px_96px] [mask-image:radial-gradient(ellipse_70%_80%_at_75%_35%,black,transparent)]";
const heroGlow =
  "pointer-events-none absolute -top-48 -right-40 -z-10 size-[720px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--tpl-lime)_16%,transparent),transparent)]";
const headerWrap =
  "relative z-20 mx-auto w-full max-w-[1240px] px-5 pt-5 sm:px-8 lg:px-10";
const navbar =
  "flex items-center justify-between gap-4 border-b border-(--tpl-snow)/15 pb-5";
const brand =
  "flex w-fit items-center gap-2.5 rounded-lg text-lg font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime)";
const brandMark =
  "flex size-9 items-center justify-center rounded-xl bg-(--tpl-lime) text-(--tpl-lime-ink)";
const navLinks = "hidden items-center gap-8 lg:flex";
const navLink =
  "rounded-sm text-sm font-medium text-(--tpl-snow)/75 transition-colors duration-150 hover:text-(--tpl-snow) motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime)";
const navTools = "flex items-center gap-2";
const iconButton =
  "flex size-10 items-center justify-center rounded-full border border-(--tpl-snow)/20 text-(--tpl-snow) transition-colors duration-150 hover:bg-(--tpl-snow)/10 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime)";
const contactNav =
  "items-center justify-center gap-2 rounded-full bg-(--tpl-lime) text-sm font-semibold whitespace-nowrap text-(--tpl-lime-ink) transition-[filter] duration-150 hover:brightness-95 motion-reduce:transition-none hidden h-10 px-5 sm:inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime)";
const menuButton =
  "flex size-10 items-center justify-center rounded-full border border-(--tpl-snow)/20 text-(--tpl-snow) transition-colors duration-150 hover:bg-(--tpl-snow)/10 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime) lg:hidden";
const panel =
  "absolute inset-x-5 top-full z-30 -mt-2 grid gap-3 rounded-2xl bg-surface p-3 text-ink shadow-overlay sm:inset-x-8 lg:inset-x-10";
const menuList = "grid gap-1";
const menuLink =
  "block rounded-xl px-3 py-2.5 text-base font-medium hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const resultList = "grid gap-1";
const resultLink =
  "flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const resultTag =
  "shrink-0 rounded-full bg-subtle px-2.5 py-0.5 text-xs text-muted";
const muted = "text-sm text-muted";
const heroBody =
  "relative z-10 mx-auto grid w-full max-w-[1240px] items-center gap-12 px-5 pt-14 pb-10 sm:px-8 sm:pt-20 sm:pb-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-10 lg:pt-24 lg:pb-24";
const heroIntro = "grid min-w-0 justify-items-start gap-7";
const eyebrow =
  "inline-flex items-center gap-2 rounded-full border border-(--tpl-snow)/15 bg-(--tpl-snow)/5 px-3 py-1 text-sm text-(--tpl-snow)/85";
const eyebrowDot = "size-1.5 rounded-full bg-(--tpl-lime)";
const heroTitle =
  "max-w-[12ch] text-[44px] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[64px] xl:text-[84px]";
const heroAccent =
  "font-serif font-normal tracking-normal text-(--tpl-lime) italic";
const heroLead =
  "max-w-lg text-base leading-relaxed text-pretty text-(--tpl-snow)/75 sm:text-lg";
const heroActions = "flex flex-wrap items-center gap-3";
const ctaBig =
  "inline-flex items-center justify-center gap-2 rounded-full bg-(--tpl-lime) text-sm font-semibold whitespace-nowrap text-(--tpl-lime-ink) transition-[filter] duration-150 hover:brightness-95 motion-reduce:transition-none h-12 pr-1.5 pl-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime)";
const ctaArrow =
  "flex size-9 items-center justify-center rounded-full bg-(--tpl-lime-ink) text-(--tpl-lime)";
const ghostLink =
  "inline-flex h-12 items-center gap-2 rounded-full border border-(--tpl-snow)/25 px-6 text-sm font-medium transition-colors duration-150 hover:bg-(--tpl-snow)/10 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime)";
const trust =
  "flex w-full max-w-lg flex-wrap items-center gap-x-4 gap-y-2 border-t border-(--tpl-snow)/15 pt-6 text-sm text-(--tpl-snow)/75";
const trustAvatars = "flex";
const trustAvatar =
  "-ml-1.5 flex size-9 items-center justify-center rounded-full border-2 border-(--tpl-forest) bg-(--art-1) text-[11px] font-semibold text-(--art-3) first:ml-0";
const trustStars = "flex gap-0.5 text-(--tpl-lime)";
const visual = "relative min-w-0";
const dataCard =
  "grid gap-6 rounded-[28px] border border-(--tpl-snow)/10 bg-(--tpl-forest-2) p-5 shadow-overlay sm:p-7";
const cardHead = "flex flex-wrap items-start justify-between gap-4";
const cardLabel = "text-sm text-(--tpl-snow)/70";
const cardValue =
  "mt-1 text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl";
const growthBadge =
  "inline-flex items-center gap-1 rounded-full bg-(--tpl-lime) px-2.5 py-1 text-xs font-semibold text-(--tpl-lime-ink)";
const chartGridLine = "stroke-(--tpl-snow)/10";
const chartArea =
  "transition-opacity delay-500 duration-1000 motion-safe:[[data-reveal]:not([data-in])_&]:opacity-0 motion-reduce:transition-none";
const chartLine =
  "fill-none stroke-(--tpl-lime) [stroke-dasharray:1] transition-[stroke-dashoffset] duration-[1800ms] ease-out motion-safe:[[data-reveal]:not([data-in])_&]:[stroke-dashoffset:1] motion-reduce:transition-none";
const chartHalo = "fill-(--tpl-lime)/20";
const chartDot = "fill-(--tpl-lime)";
const chartAxis =
  "mt-3 flex justify-between text-xs text-(--tpl-snow)/60 tabular-nums";
const metricGrid = "grid grid-cols-2 gap-3";
const metricTile =
  "rounded-2xl border border-(--tpl-snow)/10 bg-(--tpl-snow)/5 p-4";
const metricTileLime = "rounded-2xl bg-(--tpl-lime) p-4 text-(--tpl-lime-ink)";
const metricValue =
  "text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl";
const metricLabel = "mt-1 text-sm text-(--tpl-snow)/70";
const metricLabelLime = "mt-1 text-sm text-(--tpl-lime-ink)/80";
const section = "mx-auto w-full max-w-[1240px] px-3 py-16 sm:px-6 lg:py-24";
const sectionHead =
  "mb-12 grid gap-5 lg:mb-14 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16";
const kicker = "mb-4 flex items-center gap-2 text-sm font-medium text-muted";
const kickerDot = "size-1.5 rounded-full bg-primary";
const h2 =
  "text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[56px]";
const lead =
  "max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg";
const arrowLink =
  "inline-flex w-fit items-center gap-2 rounded-full text-sm font-semibold underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const tabList = "grid grid-cols-3 border-b border-line";
const tab =
  "-mb-px flex flex-col items-start gap-1 border-b-2 pt-2 pr-3 pb-4 text-left text-base font-semibold tracking-tight transition-colors duration-150 motion-reduce:transition-none sm:flex-row sm:items-center sm:gap-3 sm:text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const tabIdle = "border-transparent text-muted hover:text-ink";
const tabActive = "border-primary text-ink";
const tabNumber = "text-sm font-medium text-muted tabular-nums";
const tabPanel =
  "mt-8 grid gap-10 rounded-[28px] border border-line bg-surface p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:p-12";
const panelTitle =
  "text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl";
const panelText =
  "mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted";
const pointList = "mt-8 mb-8 grid gap-3";
const pointItem = "flex items-center gap-3 text-sm font-medium sm:text-base";
const pointIcon =
  "flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary";
const panelStats =
  "grid content-start gap-8 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16";
const statPair = "flex flex-col-reverse";
const panelStatValue =
  "text-5xl font-semibold tracking-[-0.03em] tabular-nums sm:text-6xl";
const panelStatLabel = "mt-2 max-w-64 text-sm text-muted";
const cardGrid = "grid gap-4 lg:grid-cols-3";
const greyCard =
  "flex min-h-[520px] flex-col gap-5 rounded-[28px] bg-subtle p-6 sm:p-7";
const limeCard =
  "flex min-h-[520px] flex-col gap-5 rounded-[28px] bg-(--tpl-lime) p-3 text-(--tpl-lime-ink)";
const chip =
  "inline-flex w-fit items-center rounded-full bg-surface px-3 py-1 text-xs font-medium";
const chipDark =
  "inline-flex w-fit items-center rounded-full bg-(--tpl-lime-ink) px-3 py-1 text-xs font-medium text-(--tpl-lime)";
const h3 = "text-2xl leading-tight font-semibold tracking-tight text-balance";
const barChart = "mt-auto grid gap-3";
const barRow = "flex h-36 items-end gap-2";
const bar = "flex-1 rounded-t-lg bg-ink/15";
const barActive = "flex-1 rounded-t-lg bg-primary";
const barYears = "flex justify-between gap-2 text-xs text-muted tabular-nums";
const limeArt =
  "relative min-h-[250px] flex-1 overflow-hidden rounded-[22px] bg-(--tpl-forest)";
const artSvg = "absolute inset-0 size-full";
const artBlob = "fill-(--tpl-lime)";
const artSoft = "fill-(--tpl-lime)/25";
const artRing = "fill-none stroke-(--tpl-lime)/45";
const notch =
  "absolute -right-px -bottom-px flex size-[76px] items-end justify-end rounded-tl-[30px] bg-(--tpl-lime) p-2.5";
const notchLink =
  "flex size-14 items-center justify-center rounded-full bg-(--tpl-lime-ink) text-(--tpl-lime) transition-transform duration-200 hover:rotate-45 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const limeBody = "grid gap-3 px-3 pt-1 pb-4";
const limeStat = "text-6xl font-semibold tracking-[-0.03em]";
const limeMeta = "text-sm text-(--tpl-lime-ink)/80";
const avatarRow = "flex items-center";
const avatar =
  "-ml-2 flex size-11 items-center justify-center rounded-full border-2 border-subtle bg-(--art-1) text-sm font-semibold text-(--art-3) first:ml-0";
const avatarMore =
  "-ml-2 flex size-11 items-center justify-center rounded-full border-2 border-subtle bg-ink text-xs font-semibold text-canvas";
const cityList = "mt-auto grid grid-cols-2 gap-2";
const cityItem = "flex flex-col-reverse rounded-2xl bg-surface p-4";
const cityValue = "text-3xl font-semibold tracking-tight";
const filterRow = "flex flex-wrap gap-2";
const filter =
  "h-9 rounded-full border px-4 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const filterIdle = "border-line bg-surface text-muted hover:text-ink";
const filterActive = "border-primary bg-primary text-on-primary";
const practiceGrid = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";
const practiceCard =
  "group flex flex-col gap-6 rounded-[24px] border border-line bg-surface p-6 transition-colors duration-200 hover:border-ink/25 motion-reduce:transition-none sm:p-7";
const practiceTop = "flex items-start justify-between";
const practiceIcon =
  "flex size-12 items-center justify-center rounded-2xl border border-line bg-canvas text-ink";
const practiceArrow =
  "text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none";
const practiceTitle = "text-xl font-semibold tracking-tight";
const practiceText = "mt-2 text-sm leading-relaxed text-pretty text-muted";
const practiceFoot =
  "mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5";
const leadRow = "flex items-center gap-2.5 text-sm";
const leadAvatar =
  "flex size-8 items-center justify-center rounded-full bg-(--art-1) text-xs font-semibold text-(--art-3)";
const tagRow = "flex flex-wrap gap-1.5";
const tag = "rounded-full bg-subtle px-2.5 py-0.5 text-xs text-muted";
const caseGrid = "grid gap-4 lg:grid-cols-3";
const caseCard =
  "flex flex-col gap-8 rounded-[28px] border border-line bg-surface p-6 sm:p-8";
const caseHead = "flex items-center justify-between gap-3 text-sm";
const caseValue =
  "text-6xl font-semibold tracking-[-0.04em] tabular-nums sm:text-7xl";
const caseMetric = "mt-3 flex items-center gap-2.5 text-sm font-medium";
const caseMark = "h-0.5 w-6 rounded-full bg-primary";
const caseFoot =
  "mt-auto flex items-center justify-between gap-3 border-t border-line pt-5 text-sm text-muted";
const quoteGrid = "grid gap-4 lg:grid-cols-[1fr_2fr]";
const ratingCard =
  "flex flex-col justify-between gap-8 rounded-[28px] bg-(--tpl-lime) p-6 text-(--tpl-lime-ink) sm:p-8";
const ratingValue = "text-7xl font-semibold tracking-[-0.04em]";
const stars = "flex gap-1";
const quoteCard =
  "flex flex-col justify-between gap-10 rounded-[28px] bg-subtle p-6 sm:p-10";
const quoteText =
  "text-xl leading-snug font-medium tracking-tight text-pretty sm:text-2xl lg:text-[32px]";
const quoteFoot = "flex flex-wrap items-center justify-between gap-4";
const quotePerson = "flex items-center gap-3";
const quoteAvatar =
  "flex size-12 items-center justify-center rounded-full bg-(--art-1) text-sm font-semibold text-(--art-3)";
const controls = "flex items-center gap-3";
const roundButton =
  "flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-canvas motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const counter = "min-w-10 text-center text-sm text-muted tabular-nums";
const dots = "flex gap-1.5";
const dotBase =
  "h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none";
const dotIdle = "w-1.5 bg-ink/25";
const dotActive = "w-6 bg-primary";
const logoWrap =
  "mt-16 grid gap-6 lg:grid-cols-[200px_1fr] lg:items-center lg:gap-10";
const logoGrid =
  "grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-6";
const logoCell =
  "flex h-20 items-center justify-center gap-2 border-r border-b border-line px-3 text-sm font-semibold tracking-tight text-muted";
const ctaBand =
  "relative isolate grid gap-12 overflow-hidden rounded-[28px] bg-(--tpl-forest) p-6 text-(--tpl-snow) sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:p-14";
const ctaLines =
  "pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--tpl-snow)_7%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--tpl-snow)_7%,transparent)_1px,transparent_1px)] bg-size-[96px_96px] [mask-image:radial-gradient(ellipse_60%_80%_at_0%_0%,black,transparent)]";
const ctaKicker =
  "mb-4 flex items-center gap-2 text-sm font-medium text-(--tpl-snow)/75";
const ctaTitle =
  "text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-5xl";
const ctaLead =
  "mt-5 max-w-md text-base leading-relaxed text-pretty text-(--tpl-snow)/75";
const contactList = "mt-10 grid gap-5";
const contactItem = "flex items-start gap-3";
const contactIcon =
  "flex size-10 shrink-0 items-center justify-center rounded-full bg-(--tpl-lime) text-(--tpl-lime-ink)";
const contactLabel = "block text-sm text-(--tpl-snow)/70";
const formCard =
  "grid gap-4 rounded-[24px] bg-surface p-5 text-ink sm:grid-cols-2 sm:p-8";
const full = "sm:col-span-2";
const errorText = "text-sm text-danger sm:col-span-2";
const formFoot =
  "flex flex-wrap items-center justify-between gap-3 sm:col-span-2";
const footer = "mx-auto w-full max-w-[1240px] px-3 pt-8 pb-8 sm:px-6";
const footerTop =
  "grid gap-10 border-b border-line pb-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]";
const footerBrand =
  "flex w-fit items-center gap-2.5 rounded-lg text-lg font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const footerText = "mt-4 max-w-xs text-sm leading-relaxed text-muted";
const footerHeading = "text-sm font-semibold";
const footerList = "mt-4 grid gap-2.5";
const footerLink =
  "rounded-sm text-sm text-muted transition-colors duration-150 hover:text-ink motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const footerBottom =
  "flex flex-wrap items-center justify-between gap-4 pt-6 text-sm text-muted";
const builtLink =
  "rounded-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

// prettier-ignore
const icons = {"arrow":"M5 12h14M13 6l6 6-6 6","upRight":"M7 17 17 7M8 7h9v9","search":"m20 20-4.2-4.2M10.5 17.5a7 7 0 1 1 0-14 7 7 0 0 1 0 14z","menu":"M4 7h16M4 12h16M4 17h16","close":"M6 6l12 12M18 6 6 18","left":"m15 18-6-6 6-6","right":"m9 18 6-6-6-6","check":"m5 12.5 4.5 4.5L19 7.5","trend":"M4 16l5-5 4 4 7-7M15 8h5v5","chart":"M4 19V5M4 19h16M8 15l4-4 3 3 5-6","shield":"M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z","bolt":"M13 3 5 14h6l-1 7 8-11h-6z","chip":"M8 8h8v8H8zM10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3","bag":"M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2","merge":"M6 4v5a6 6 0 0 0 6 6h6M18 15l-3-3M18 15l-3 3M6 20v-3","mail":"M4 6h16v12H4zM4 7l8 6 8-6","phone":"M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z","pin":"M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z","star":"M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z","mark":"M7 20V4h6a5 5 0 0 1 0 10H7M15 20h2","circle":"M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z","triangle":"M12 4.5 20 19H4z","square":"M5 5h14v14H5z","diamond":"M12 3l9 9-9 9-9-9z","wave":"M3 9c3-3 6-3 9 0s6 3 9 0M3 15c3-3 6-3 9 0s6 3 9 0","hexagon":"M12 3l8 4.5v9L12 21l-8-4.5v-9z"} as const;
// prettier-ignore
const tones = {"sand":"[--art-1:var(--tpl-sand)] [--art-3:var(--tpl-sand-3)]","sage":"[--art-1:var(--tpl-sage)] [--art-3:var(--tpl-sage-3)]","sky":"[--art-1:var(--tpl-sky)] [--art-3:var(--tpl-sky-3)]","clay":"[--art-1:var(--tpl-clay)] [--art-3:var(--tpl-clay-3)]","mauve":"[--art-1:var(--tpl-mauve)] [--art-3:var(--tpl-mauve-3)]"} as const;
// prettier-ignore
const chart = {"line":"M20 156C49 156 79 140 108 140C137 140 167 128 196 128C225 128 255 100 284 100C313 100 343 72 372 72C401 72 431 36 460 36","area":"M20 156C49 156 79 140 108 140C137 140 167 128 196 128C225 128 255 100 284 100C313 100 343 72 372 72C401 72 431 36 460 36L460 200L20 200Z","x":460,"y":36,"grid":[20,73,127,180]} as const;
// prettier-ignore
const heroYears = ["2021","2022","2023","2024","2025","2026"] as const;
// prettier-ignore
const heroAvatars = [{"initials":"WS","tone":"sage"},{"initials":"HG","tone":"sky"},{"initials":"CM","tone":"clay"}] as const;
// prettier-ignore
const navItems = [{"label":"Services","href":"#services"},{"label":"About","href":"#about"},{"label":"Industries","href":"#industries"},{"label":"Cases","href":"#cases"},{"label":"Insight","href":"#insight"}] as const;
// prettier-ignore
const insights = [{"title":"Five pricing moves for 2027 budgets","tag":"Finance"},{"title":"What the new OJK rules mean for lenders","tag":"Regulation"},{"title":"Funding the energy transition in Java","tag":"Energy"},{"title":"Running an AI pilot without the hype","tag":"Technology"}] as const;
// prettier-ignore
const serviceTabs = [{"id":"strategy","label":"Strategy","title":"Growth plans built on real market data","text":"We size the market, test pricing with real customers, and turn the findings into a three year plan your managers can own.","points":["Market entry and sizing","Pricing and portfolio strategy","Board and investor roadmaps"],"stats":[{"value":"3.1x","label":"Average revenue growth over three years"},{"value":"86","label":"Growth plans delivered since 2019"}]},{"id":"finance","label":"Finance","title":"Sharper decisions for banks and lenders","text":"We help banks, multifinance firms, and fintechs price risk, meet OJK rules, and grow a healthier loan book.","points":["Credit risk models","Capital raising and debt advisory","OJK and Basel compliance"],"stats":[{"value":"Rp 1,8 T","label":"Loan portfolios restructured"},{"value":"-34%","label":"Average drop in non-performing loans"}]},{"id":"transformation","label":"Transformation","title":"Change that sticks after we leave","text":"From operating model to digital roadmap, we name owners, budgets, and dates, then stay until the numbers move.","points":["Operating model redesign","Digital and AI roadmaps","Post merger integration"],"stats":[{"value":"120+","label":"Transformation programs led"},{"value":"18 mo","label":"Median time to payback"}]}] as const;
// prettier-ignore
const growthBars = [{"year":"2021","value":38},{"year":"2022","value":45},{"year":"2023","value":54},{"year":"2024","value":63},{"year":"2025","value":74},{"year":"2026","value":88}] as const;
// prettier-ignore
const partners = [{"initials":"SA","tone":"sage"},{"initials":"BP","tone":"sky"},{"initials":"LW","tone":"clay"},{"initials":"RP","tone":"mauve"}] as const;
// prettier-ignore
const cities = [{"value":"14","label":"Cities across Asia"},{"value":"120+","label":"Senior partners"}] as const;
// prettier-ignore
const industries = ["All","Finance","Energy","Technology","Consumer"] as const;
// prettier-ignore
const practices = [{"title":"Corporate finance","text":"Valuations, capital structure, and funding plans that hold up in front of investors.","lead":"Sekar Ayuningtyas","initials":"SA","tone":"sage","icon":"chart","tags":["Finance"]},{"title":"Risk and compliance","text":"Credit, market, and climate risk frameworks that satisfy OJK and your board.","lead":"Bima Prasetyo","initials":"BP","tone":"sky","icon":"shield","tags":["Finance","Energy"]},{"title":"Energy transition","text":"Investment cases for renewables, grid upgrades, and decarbonization programs.","lead":"Laras Wulandari","initials":"LW","tone":"sand","icon":"bolt","tags":["Energy"]},{"title":"Digital transformation","text":"Roadmaps, platforms, and teams that turn technology spend into revenue.","lead":"Raka Pratama","initials":"RP","tone":"mauve","icon":"chip","tags":["Technology"]},{"title":"Consumer growth","text":"Pricing, channels, and brand portfolios for fast moving consumer companies.","lead":"Ayu Lestari","initials":"AL","tone":"clay","icon":"bag","tags":["Consumer"]},{"title":"Mergers and acquisitions","text":"Due diligence, deal strategy, and integration from term sheet to day 100.","lead":"Dimas Hartono","initials":"DH","tone":"sage","icon":"merge","tags":["Finance","Technology","Consumer"]}] as const;
// prettier-ignore
const cases = [{"client":"Bank Kertajaya","industry":"Finance","value":"-34%","metric":"Non-performing loans in 12 months","text":"Rebuilt the credit scoring model and collections playbook for a regional bank with 1.2 million borrowers.","scope":"Credit risk","time":"6 weeks"},{"client":"Nusa Energi","industry":"Energy","value":"Rp 640 M","metric":"Green financing secured","text":"Structured the investment case and lender pitch for 210 MW of new solar capacity in East Java.","scope":"Capital raising","time":"4 months"},{"client":"Toko Raya","industry":"Consumer","value":"2.1x","metric":"App revenue in one year","text":"Redesigned the loyalty program and pricing tiers across 380 stores and the mobile app.","scope":"Consumer growth","time":"9 months"}] as const;
// prettier-ignore
const quotes = [{"text":"Pranata rebuilt our credit model in six weeks. Our non-performing loans fell by a third within the year.","name":"Wulan Sari","role":"CFO, Bank Kertajaya","initials":"WS","tone":"sage"},{"text":"They challenged every assumption in our plan, then stayed to help us deliver it. That is rare.","name":"Hendra Gunawan","role":"CEO, Nusa Energi","initials":"HG","tone":"sky"},{"text":"The due diligence report was clear enough for our board and deep enough for our analysts.","name":"Citra Maharani","role":"Partner, Lintas Capital","initials":"CM","tone":"clay"},{"text":"Our digital roadmap finally has owners, budgets, and dates. Revenue from the app doubled.","name":"Fajar Nugroho","role":"COO, Toko Raya","initials":"FN","tone":"mauve"}] as const;
// prettier-ignore
const logos = [{"name":"Kertajaya","glyph":"circle"},{"name":"Nusa Energi","glyph":"triangle"},{"name":"Lintas Capital","glyph":"square"},{"name":"Toko Raya","glyph":"diamond"},{"name":"Samudra","glyph":"wave"},{"name":"Bumi Agro","glyph":"hexagon"}] as const;
// prettier-ignore
const contacts = [{"icon":"mail","label":"Email","value":"hello@pranata.id"},{"icon":"phone","label":"Phone","value":"+62 21 5080 1188"},{"icon":"pin","label":"Office","value":"Menara Astra, Jl. Jend. Sudirman Kav. 5, Jakarta"}] as const;
// prettier-ignore
const footerColumns = [{"title":"Services","links":["Strategy","Finance","Transformation","Energy transition"]},{"title":"Company","links":["About us","Careers","Partners","Press"]},{"title":"Insights","links":["Reports","Events","Newsletter","Podcast"]}] as const;

type IconName = keyof typeof icons;
type Industry = (typeof industries)[number];
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
const menuItems = [...navItems, { label: "Contact us", href: "#contact" }];
const maxBar = Math.max(...growthBars.map((item) => item.value));

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[name]} />
    </svg>
  );
}

function GrowthChart() {
  return (
    <div data-reveal="">
      <svg
        viewBox="0 0 480 200"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Line chart: assets under advisory grew from Rp 0,9 T in 2021 to Rp 2,4 T in 2026"
      >
        <defs>
          <linearGradient id="konsultan-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--tpl-lime)" stopOpacity="0.32" />
            <stop offset="1" stopColor="var(--tpl-lime)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {chart.grid.map((y) => (
          <line
            key={y}
            x1="0"
            x2="480"
            y1={y}
            y2={y}
            className={chartGridLine}
            strokeDasharray="4 6"
          />
        ))}
        <path
          d={chart.area}
          fill="url(#konsultan-area)"
          className={chartArea}
        />
        <path
          d={chart.line}
          pathLength={1}
          strokeWidth="3"
          strokeLinecap="round"
          className={chartLine}
        />
        <circle cx={chart.x} cy={chart.y} r="14" className={chartHalo} />
        <circle cx={chart.x} cy={chart.y} r="6" className={chartDot} />
      </svg>
      <div className={chartAxis} aria-hidden="true">
        {heroYears.map((year) => (
          <span key={year}>{year}</span>
        ))}
      </div>
    </div>
  );
}

function OrganicArt() {
  return (
    <svg
      className={artSvg}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <circle cx="300" cy="80" r="150" className={artRing} />
      <circle cx="300" cy="80" r="105" className={artRing} />
      <circle cx="300" cy="80" r="60" className={artRing} />
      <path
        d="M-20 210c40-70 120-90 170-60s70 90 150 80 110 40 120 90H-20z"
        className={artSoft}
      />
      <path
        d="M86 64c38-30 104-24 122 22s-12 94-64 104-104-14-104-62 14-44 46-64z"
        className={artBlob}
      />
      <circle cx="330" cy="200" r="12" className={artBlob} />
    </svg>
  );
}

export default function Konsultan() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [industry, setIndustry] = useState<Industry>("All");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState({ field: "", message: "" });

  // Animasi masuk saat elemen terlihat; tanpa animasi saat reduced motion (lihat kelas reveal).
  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll("[data-reveal]") ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const needle = query.trim().toLowerCase();
  const results = insights.filter((item) =>
    `${item.title} ${item.tag}`.toLowerCase().includes(needle),
  );
  const shown = practices.filter(
    (item) =>
      industry === "All" || (item.tags as readonly string[]).includes(industry),
  );
  const activeTab = serviceTabs[tabIndex]!;
  const quote = quotes[quoteIndex]!;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSearchOpen(false);
  };
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setMenuOpen(false);
  };
  const closePanels = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };
  const onTabKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (tabIndex + step + serviceTabs.length) % serviceTabs.length;
    setTabIndex(next);
    document.getElementById(`konsultan-tab-${serviceTabs[next]!.id}`)?.focus();
  };
  const moveQuote = (step: number) =>
    setQuoteIndex((quoteIndex + step + quotes.length) % quotes.length);
  const update = (field: keyof typeof emptyForm, value: string) =>
    setForm({ ...form, [field]: value });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    if (!name) {
      setError({ field: "name", message: "Tell us your name." });
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setError({
        field: "email",
        message: "Enter a valid email address, like you@company.com.",
      });
      return;
    }
    setError({ field: "", message: "" });
    setForm(emptyForm);
    toast({
      title: "Request received",
      description: `Thanks, ${name.split(" ")[0]}. A partner will reply within one business day.`,
      variant: "success",
    });
  };
  const invalid = (field: string) =>
    error.field === field
      ? { "aria-invalid": true, "aria-describedby": FORM_ERROR_ID }
      : {};

  return (
    <div ref={rootRef} className={cx(root, palette)}>
      <section id="top" className={hero} aria-label="Introduction">
        <div className={heroLines} aria-hidden="true" />
        <div className={heroGlow} aria-hidden="true" />
        <header className={headerWrap}>
          <nav aria-label="Main" className={navbar}>
            <a href="#top" className={brand}>
              <span className={brandMark} aria-hidden="true">
                <Icon name="mark" className="size-5" />
              </span>
              Pranata
            </a>
            <div className={navLinks}>
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className={navLink}>
                  {item.label}
                </a>
              ))}
            </div>
            <div className={navTools}>
              <button
                type="button"
                className={iconButton}
                aria-label="Search"
                aria-expanded={searchOpen}
                aria-controls={PANEL_ID}
                onClick={toggleSearch}
              >
                <Icon name={searchOpen ? "close" : "search"} />
              </button>
              <a href="#contact" className={contactNav}>
                Contact us
              </a>
              <button
                type="button"
                className={menuButton}
                aria-label="Menu"
                aria-expanded={menuOpen}
                aria-controls={PANEL_ID}
                onClick={toggleMenu}
              >
                <Icon name={menuOpen ? "close" : "menu"} />
              </button>
            </div>
          </nav>
          {(menuOpen || searchOpen) && (
            <div
              id={PANEL_ID}
              className={panel}
              onKeyDown={(event) => event.key === "Escape" && closePanels()}
            >
              {menuOpen ? (
                <ul className={menuList}>
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className={menuLink}
                        onClick={closePanels}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <Input
                    type="search"
                    label="Search insights"
                    placeholder="Try energy or pricing"
                    value={query}
                    autoFocus
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <p className={muted} aria-live="polite">
                    {results.length
                      ? `${results.length} ${results.length === 1 ? "article" : "articles"}`
                      : "No articles match your search."}
                  </p>
                  <ul className={resultList}>
                    {results.map((item) => (
                      <li key={item.title}>
                        <a
                          href="#insight"
                          className={resultLink}
                          onClick={closePanels}
                        >
                          {item.title}
                          <span className={resultTag}>{item.tag}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </header>
        <div className={heroBody}>
          <div className={heroIntro}>
            <p className={eyebrow}>
              <span className={eyebrowDot} aria-hidden="true" />
              Independent advisory since 2009
            </p>
            <h1 className={heroTitle}>
              Clear advice for <em className={heroAccent}>bold</em> decisions
            </h1>
            <p className={heroLead}>
              Pranata helps Indonesian boards and founders grow, finance, and
              transform their companies, with senior partners at the table from
              day one.
            </p>
            <div className={heroActions}>
              <a href="#contact" className={ctaBig}>
                Book a consultation
                <span className={ctaArrow} aria-hidden="true">
                  <Icon name="upRight" />
                </span>
              </a>
              <a href="#services" className={ghostLink}>
                Explore services
              </a>
            </div>
            <div className={trust}>
              <div className={trustAvatars} aria-hidden="true">
                {heroAvatars.map((item) => (
                  <span
                    key={item.initials}
                    className={cx(trustAvatar, tones[item.tone])}
                  >
                    {item.initials}
                  </span>
                ))}
              </div>
              <div
                className={trustStars}
                role="img"
                aria-label="Rated 4.9 out of 5"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <Icon key={n} name="star" className="size-4 fill-current" />
                ))}
              </div>
              <p>4.9 from 210 executives</p>
            </div>
          </div>
          <div className={visual}>
            <div className={dataCard}>
              <div className={cardHead}>
                <div>
                  <p className={cardLabel}>Assets under advisory</p>
                  <p className={cardValue}>Rp 2,4 T</p>
                </div>
                <p className={growthBadge}>
                  <Icon name="trend" className="size-3.5" />
                  +23% this year
                </p>
              </div>
              <GrowthChart />
              <dl className={metricGrid}>
                <div className={cx(metricTile, statPair)}>
                  <dt className={metricLabel}>Clients advised</dt>
                  <dd className={metricValue}>320+</dd>
                </div>
                <div className={cx(metricTileLime, statPair)}>
                  <dt className={metricLabelLime}>Client retention</dt>
                  <dd className={metricValue}>98%</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section
          id="services"
          className={section}
          aria-labelledby="konsultan-services"
        >
          <div className={cx(sectionHead, reveal)} data-reveal="">
            <div>
              <p className={kicker}>
                <span className={kickerDot} aria-hidden="true" />
                What we do
              </p>
              <h2 id="konsultan-services" className={h2}>
                Three practices, one senior team
              </h2>
            </div>
            <p className={lead}>
              Every engagement is led by a partner who has run a business, and
              measured the way your board measures it.
            </p>
          </div>
          <div className={reveal} data-reveal="">
            <div
              role="tablist"
              aria-label="Services"
              className={tabList}
              onKeyDown={onTabKey}
            >
              {serviceTabs.map((item, index) => (
                <button
                  key={item.id}
                  id={`konsultan-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={index === tabIndex}
                  aria-controls="konsultan-tabpanel"
                  tabIndex={index === tabIndex ? 0 : -1}
                  className={cx(tab, index === tabIndex ? tabActive : tabIdle)}
                  onClick={() => setTabIndex(index)}
                >
                  <span className={tabNumber}>0{index + 1}</span>
                  {item.label}
                </button>
              ))}
            </div>
            <div
              id="konsultan-tabpanel"
              role="tabpanel"
              aria-labelledby={`konsultan-tab-${activeTab.id}`}
              className={tabPanel}
            >
              <div>
                <h3 className={panelTitle}>{activeTab.title}</h3>
                <p className={panelText}>{activeTab.text}</p>
                <ul className={pointList}>
                  {activeTab.points.map((point) => (
                    <li key={point} className={pointItem}>
                      <span className={pointIcon} aria-hidden="true">
                        <Icon name="check" className="size-3.5" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={arrowLink}>
                  Talk to a partner
                  <Icon name="arrow" />
                </a>
              </div>
              <dl className={panelStats}>
                {activeTab.stats.map((stat) => (
                  <div key={stat.label} className={statPair}>
                    <dt className={panelStatLabel}>{stat.label}</dt>
                    <dd className={panelStatValue}>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section
          id="about"
          className={section}
          aria-labelledby="konsultan-about"
        >
          <div className={cx(sectionHead, reveal)} data-reveal="">
            <div>
              <p className={kicker}>
                <span className={kickerDot} aria-hidden="true" />
                About Pranata
              </p>
              <h2 id="konsultan-about" className={h2}>
                A firm built around partners, not pyramids
              </h2>
            </div>
            <p className={lead}>
              We stay small on purpose. The people who win your trust are the
              people who do the work.
            </p>
          </div>
          <div className={cx(cardGrid, reveal)} data-reveal="">
            <article className={greyCard}>
              <span className={chip}>Since 2009</span>
              <h3 className={h3}>
                Seventeen years inside Indonesian boardrooms
              </h3>
              <p className={muted}>
                From a two person office in Jakarta to listed companies, family
                groups, and state owned enterprises across Asia.
              </p>
              <div className={barChart}>
                <div
                  className={barRow}
                  role="img"
                  aria-label="Bar chart: companies advised each year, rising from 38 in 2021 to 88 in 2026"
                >
                  {growthBars.map((item, index) => (
                    <div
                      key={item.year}
                      className={
                        index === growthBars.length - 1 ? barActive : bar
                      }
                      style={{ height: `${(item.value / maxBar) * 100}%` }}
                    />
                  ))}
                </div>
                <div className={barYears} aria-hidden="true">
                  {growthBars.map((item) => (
                    <span key={item.year}>{item.year}</span>
                  ))}
                </div>
              </div>
            </article>
            <article className={limeCard}>
              <div className={limeArt}>
                <OrganicArt />
                <div className={notch}>
                  <a
                    href="#cases"
                    className={notchLink}
                    aria-label="See the work behind our recognition"
                  >
                    <Icon name="upRight" className="size-5" />
                  </a>
                </div>
              </div>
              <div className={limeBody}>
                <span className={chipDark}>Recognition</span>
                <h3 className={h3}>
                  Named a top advisory firm in Southeast Asia
                </h3>
                <p className={limeStat}>No. 4</p>
                <p className={limeMeta}>Asia Business Review ranking, 2026</p>
              </div>
            </article>
            <article className={greyCard}>
              <span className={chip}>Our people</span>
              <div className={avatarRow} aria-hidden="true">
                {partners.map((item) => (
                  <span
                    key={item.initials}
                    className={cx(avatar, tones[item.tone])}
                  >
                    {item.initials}
                  </span>
                ))}
                <span className={avatarMore}>+116</span>
              </div>
              <h3 className={h3}>Senior partners who have run companies</h3>
              <p className={muted}>
                Former CFOs, bankers, and engineers who sit at your table, not
                behind a junior team.
              </p>
              <dl className={cityList}>
                {cities.map((item) => (
                  <div key={item.label} className={cityItem}>
                    <dt className={muted}>{item.label}</dt>
                    <dd className={cityValue}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>
        </section>

        <section
          id="industries"
          className={section}
          aria-labelledby="konsultan-industries"
        >
          <div className={cx(sectionHead, reveal)} data-reveal="">
            <div>
              <p className={kicker}>
                <span className={kickerDot} aria-hidden="true" />
                Practices
              </p>
              <h2 id="konsultan-industries" className={h2}>
                We champion the bold to achieve the extraordinary
              </h2>
            </div>
            <div className="grid gap-5">
              <p className={lead}>
                Each practice is led by a partner with at least fifteen years in
                the field. Filter by industry to find the right team.
              </p>
              <div
                className={filterRow}
                role="group"
                aria-label="Filter by industry"
              >
                {industries.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={industry === item}
                    className={cx(
                      filter,
                      industry === item ? filterActive : filterIdle,
                    )}
                    onClick={() => setIndustry(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {`Showing ${shown.length} ${shown.length === 1 ? "practice" : "practices"}`}
          </p>
          <ul className={cx(practiceGrid, reveal)} data-reveal="">
            {shown.map((item) => (
              <li key={item.title} className={practiceCard}>
                <div className={practiceTop}>
                  <span className={practiceIcon} aria-hidden="true">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <Icon
                    name="upRight"
                    className={cx("size-4", practiceArrow)}
                  />
                </div>
                <div>
                  <h3 className={practiceTitle}>{item.title}</h3>
                  <p className={practiceText}>{item.text}</p>
                </div>
                <div className={practiceFoot}>
                  <p className={leadRow}>
                    <span
                      className={cx(leadAvatar, tones[item.tone])}
                      aria-hidden="true"
                    >
                      {item.initials}
                    </span>
                    Led by {item.lead}
                  </p>
                  <div className={tagRow}>
                    {item.tags.map((name) => (
                      <span key={name} className={tag}>
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="cases"
          className={section}
          aria-labelledby="konsultan-cases"
        >
          <div className={cx(sectionHead, reveal)} data-reveal="">
            <div>
              <p className={kicker}>
                <span className={kickerDot} aria-hidden="true" />
                Case studies
              </p>
              <h2 id="konsultan-cases" className={h2}>
                Results our clients can take to the bank
              </h2>
            </div>
            <p className={lead}>
              We agree on the number before we start, then report against it
              every month until it moves.
            </p>
          </div>
          <div className={cx(caseGrid, reveal)} data-reveal="">
            {cases.map((item) => (
              <article key={item.client} className={caseCard}>
                <div className={caseHead}>
                  <h3 className="font-semibold">{item.client}</h3>
                  <span className={tag}>{item.industry}</span>
                </div>
                <div>
                  <p className={caseValue}>{item.value}</p>
                  <p className={caseMetric}>
                    <span className={caseMark} aria-hidden="true" />
                    {item.metric}
                  </p>
                </div>
                <p className={muted}>{item.text}</p>
                <p className={caseFoot}>
                  <span>{item.scope}</span>
                  <span>{item.time}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="insight"
          className={section}
          aria-labelledby="konsultan-insight"
        >
          <div className={cx(sectionHead, reveal)} data-reveal="">
            <div>
              <p className={kicker}>
                <span className={kickerDot} aria-hidden="true" />
                Client voices
              </p>
              <h2 id="konsultan-insight" className={h2}>
                What leaders say after working with us
              </h2>
            </div>
            <p className={lead}>
              Independent reviews from the executives we advised in the last two
              years.
            </p>
          </div>
          <div className={cx(quoteGrid, reveal)} data-reveal="">
            <div className={ratingCard}>
              <div className={stars} role="img" aria-label="Rated 4.9 out of 5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Icon key={n} name="star" className="size-5 fill-current" />
                ))}
              </div>
              <div>
                <p className={ratingValue}>4.9</p>
                <p className={limeMeta}>
                  Average rating from 210 client reviews
                </p>
              </div>
            </div>
            <div
              className={quoteCard}
              role="region"
              aria-roledescription="carousel"
              aria-label="Client testimonials"
            >
              <figure
                className="grid gap-8"
                aria-live="polite"
                aria-roledescription="slide"
                aria-label={`${quoteIndex + 1} of ${quotes.length}`}
              >
                <blockquote className={quoteText}>“{quote.text}”</blockquote>
                <figcaption className={quotePerson}>
                  <span
                    className={cx(quoteAvatar, tones[quote.tone])}
                    aria-hidden="true"
                  >
                    {quote.initials}
                  </span>
                  <span>
                    <span className="block font-semibold">{quote.name}</span>
                    <span className={muted}>{quote.role}</span>
                  </span>
                </figcaption>
              </figure>
              <div className={quoteFoot}>
                <div className={dots} aria-hidden="true">
                  {quotes.map((item, index) => (
                    <span
                      key={item.name}
                      className={cx(
                        dotBase,
                        index === quoteIndex ? dotActive : dotIdle,
                      )}
                    />
                  ))}
                </div>
                <div className={controls}>
                  <button
                    type="button"
                    className={roundButton}
                    aria-label="Previous testimonial"
                    onClick={() => moveQuote(-1)}
                  >
                    <Icon name="left" />
                  </button>
                  <span className={counter}>
                    {quoteIndex + 1} / {quotes.length}
                  </span>
                  <button
                    type="button"
                    className={roundButton}
                    aria-label="Next testimonial"
                    onClick={() => moveQuote(1)}
                  >
                    <Icon name="right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={cx(logoWrap, reveal)} data-reveal="">
            <p className={muted}>Trusted by 320+ companies across Asia</p>
            <ul className={logoGrid} aria-label="Selected clients">
              {logos.map((item) => (
                <li key={item.name} className={logoCell}>
                  <Icon name={item.glyph} className="size-5" />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="contact"
          className={section}
          aria-labelledby="konsultan-contact"
        >
          <div className={cx(ctaBand, reveal)} data-reveal="">
            <div className={ctaLines} aria-hidden="true" />
            <div>
              <p className={ctaKicker}>
                <span className={eyebrowDot} aria-hidden="true" />
                Free consultation
              </p>
              <h2 id="konsultan-contact" className={ctaTitle}>
                Start with a <em className={heroAccent}>30 minute</em> call
              </h2>
              <p className={ctaLead}>
                Tell us where you want to be in three years. A partner will call
                you back within one business day.
              </p>
              <ul className={contactList}>
                {contacts.map((item) => (
                  <li key={item.label} className={contactItem}>
                    <span className={contactIcon} aria-hidden="true">
                      <Icon name={item.icon} />
                    </span>
                    <span>
                      <span className={contactLabel}>{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <form
              className={formCard}
              noValidate
              aria-label="Consultation request"
              onSubmit={submit}
            >
              <Input
                label="Full name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                {...invalid("name")}
              />
              <Input
                label="Work email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                {...invalid("email")}
              />
              <Input
                label="Company"
                name="company"
                autoComplete="organization"
                value={form.company}
                onChange={(event) => update("company", event.target.value)}
              />
              <Select
                label="Service"
                name="service"
                value={form.service}
                onChange={(event) => update("service", event.target.value)}
              >
                <option value="">Not sure yet</option>
                {practices.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </Select>
              <div className={full}>
                <Textarea
                  label="What would you like to discuss?"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                />
              </div>
              {error.message && (
                <p id={FORM_ERROR_ID} className={errorText}>
                  {error.message}
                </p>
              )}
              <div className={formFoot}>
                <p className={muted}>We reply within one business day.</p>
                <Button type="submit">Send request</Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className={footer}>
        <div className={footerTop}>
          <div>
            <a href="#top" className={footerBrand}>
              <span className={brandMark} aria-hidden="true">
                <Icon name="mark" className="size-5" />
              </span>
              Pranata
            </a>
            <p className={footerText}>
              Independent strategy, finance, and transformation advice from
              Jakarta since 2009.
            </p>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className={footerHeading}>{column.title}</h2>
              <ul className={footerList}>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#top" className={footerLink}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={footerBottom}>
          <p>© 2026 Pranata Advisory. Jakarta, Indonesia.</p>
          <p>
            Built with{" "}
            <a href="https://markasui.pages.dev" className={builtLink}>
              MarkasUI
            </a>
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
