import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
} from "@angular/core";
import { Button } from "../../../components/button/button.component";
import { Input } from "../../../components/input/input.component";
import { Select } from "../../../components/select/select.component";
import { Textarea } from "../../../components/textarea/textarea.component";
import { Toaster, toast } from "../../../components/toast/toast.component";

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
  "inline-flex min-h-6 w-fit items-center gap-2 rounded-full text-sm font-semibold underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
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

/** Ikon garis 24px; atribut svg di host supaya class dari pemakai langsung berlaku. */
@Component({
  selector: "svg[konsultanIcon]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.5",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true",
  },
  template: `<svg:path [attr.d]="path()" />`,
})
class Icon {
  readonly konsultanIcon = input.required<IconName>();
  protected readonly path = computed(() => icons[this.konsultanIcon()]);
}

@Component({
  selector: "template-konsultan",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  imports: [Button, Input, Select, Textarea, Toaster, Icon],
  template: `
    <div [class]="cx(root, palette)">
      <section id="top" [class]="hero" aria-label="Introduction">
        <div [class]="heroLines" aria-hidden="true"></div>
        <div [class]="heroGlow" aria-hidden="true"></div>
        <header [class]="headerWrap">
          <nav aria-label="Main" [class]="navbar">
            <a href="#top" [class]="brand">
              <span [class]="brandMark" aria-hidden="true">
                <svg konsultanIcon="mark" class="size-5"></svg>
              </span>
              Pranata
            </a>
            <div [class]="navLinks">
              @for (item of navItems; track item.href) {
                <a
                  [href]="item.href"
                  [class]="navLink"
                  [textContent]="item.label"
                ></a>
              }
            </div>
            <div [class]="navTools">
              <button
                type="button"
                [class]="iconButton"
                aria-label="Search"
                [attr.aria-expanded]="searchOpen()"
                [attr.aria-controls]="PANEL_ID"
                (click)="toggleSearch()"
              >
                <svg
                  [konsultanIcon]="searchOpen() ? 'close' : 'search'"
                  class="size-4"
                ></svg>
              </button>
              <a href="#contact" [class]="contactNav">Contact us</a>
              <button
                type="button"
                [class]="menuButton"
                aria-label="Menu"
                [attr.aria-expanded]="menuOpen()"
                [attr.aria-controls]="PANEL_ID"
                (click)="toggleMenu()"
              >
                <svg
                  [konsultanIcon]="menuOpen() ? 'close' : 'menu'"
                  class="size-4"
                ></svg>
              </button>
            </div>
          </nav>
          @if (menuOpen() || searchOpen()) {
            <div [id]="PANEL_ID" [class]="panel" (keydown)="onPanelKey($event)">
              @if (menuOpen()) {
                <ul [class]="menuList">
                  @for (item of menuItems; track item.href) {
                    <li>
                      <a
                        [href]="item.href"
                        [class]="menuLink"
                        (click)="closePanels()"
                        [textContent]="item.label"
                      ></a>
                    </li>
                  }
                </ul>
              } @else {
                <markas-input
                  [(value)]="query"
                  type="search"
                  label="Search insights"
                  placeholder="Try energy or pricing"
                />
                <p
                  [class]="muted"
                  aria-live="polite"
                  [textContent]="resultText()"
                ></p>
                <ul [class]="resultList">
                  @for (item of results(); track item.title) {
                    <li>
                      <a
                        href="#insight"
                        [class]="resultLink"
                        (click)="closePanels()"
                        >{{ item.title
                        }}<span
                          [class]="resultTag"
                          [textContent]="item.tag"
                        ></span
                      ></a>
                    </li>
                  }
                </ul>
              }
            </div>
          }
        </header>
        <div [class]="heroBody">
          <div [class]="heroIntro">
            <p [class]="eyebrow">
              <span [class]="eyebrowDot" aria-hidden="true"></span>
              Independent advisory since 2009
            </p>
            <h1 [class]="heroTitle">
              Clear advice for <em [class]="heroAccent">bold</em> decisions
            </h1>
            <p [class]="heroLead">
              Pranata helps Indonesian boards and founders grow, finance, and
              transform their companies, with senior partners at the table from
              day one.
            </p>
            <div [class]="heroActions">
              <a href="#contact" [class]="ctaBig">
                Book a consultation
                <span [class]="ctaArrow" aria-hidden="true">
                  <svg konsultanIcon="upRight" class="size-4"></svg>
                </span>
              </a>
              <a href="#services" [class]="ghostLink">Explore services</a>
            </div>
            <div [class]="trust">
              <div [class]="trustAvatars" aria-hidden="true">
                @for (item of heroAvatars; track item.initials) {
                  <span
                    [class]="cx(trustAvatar, tones[item.tone])"
                    [textContent]="item.initials"
                  ></span>
                }
              </div>
              <div
                [class]="trustStars"
                role="img"
                aria-label="Rated 4.9 out of 5"
              >
                @for (n of five; track n) {
                  <svg konsultanIcon="star" class="size-4 fill-current"></svg>
                }
              </div>
              <p>4.9 from 210 executives</p>
            </div>
          </div>
          <div [class]="visual">
            <div [class]="dataCard">
              <div [class]="cardHead">
                <div>
                  <p [class]="cardLabel">Assets under advisory</p>
                  <p [class]="cardValue">Rp 2,4 T</p>
                </div>
                <p [class]="growthBadge">
                  <svg konsultanIcon="trend" class="size-3.5"></svg>
                  +23% this year
                </p>
              </div>
              <div data-reveal="">
                <svg
                  viewBox="0 0 480 200"
                  class="h-auto w-full overflow-visible"
                  role="img"
                  aria-label="Line chart: assets under advisory grew from Rp 0,9 T in 2021 to Rp 2,4 T in 2026"
                >
                  <defs>
                    <linearGradient
                      id="konsultan-area"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0"
                        stop-color="var(--tpl-lime)"
                        stop-opacity="0.32"
                      />
                      <stop
                        offset="1"
                        stop-color="var(--tpl-lime)"
                        stop-opacity="0"
                      />
                    </linearGradient>
                  </defs>
                  @for (y of chart.grid; track y) {
                    <line
                      x1="0"
                      x2="480"
                      [attr.y1]="y"
                      [attr.y2]="y"
                      [attr.class]="chartGridLine"
                      stroke-dasharray="4 6"
                    />
                  }
                  <path
                    [attr.d]="chart.area"
                    fill="url(#konsultan-area)"
                    [attr.class]="chartArea"
                  />
                  <path
                    [attr.d]="chart.line"
                    pathLength="1"
                    stroke-width="3"
                    stroke-linecap="round"
                    [attr.class]="chartLine"
                  />
                  <circle
                    [attr.cx]="chart.x"
                    [attr.cy]="chart.y"
                    r="14"
                    [attr.class]="chartHalo"
                  />
                  <circle
                    [attr.cx]="chart.x"
                    [attr.cy]="chart.y"
                    r="6"
                    [attr.class]="chartDot"
                  />
                </svg>
                <div [class]="chartAxis" aria-hidden="true">
                  @for (year of heroYears; track year) {
                    <span [textContent]="year"></span>
                  }
                </div>
              </div>
              <dl [class]="metricGrid">
                <div [class]="cx(metricTile, statPair)">
                  <dt [class]="metricLabel">Clients advised</dt>
                  <dd [class]="metricValue">320+</dd>
                </div>
                <div [class]="cx(metricTileLime, statPair)">
                  <dt [class]="metricLabelLime">Client retention</dt>
                  <dd [class]="metricValue">98%</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section
          id="services"
          [class]="section"
          aria-labelledby="konsultan-services"
        >
          <div [class]="cx(sectionHead, reveal)" data-reveal="">
            <div>
              <p [class]="kicker">
                <span [class]="kickerDot" aria-hidden="true"></span>
                What we do
              </p>
              <h2 id="konsultan-services" [class]="h2">
                Three practices, one senior team
              </h2>
            </div>
            <p [class]="lead">
              Every engagement is led by a partner who has run a business, and
              measured the way your board measures it.
            </p>
          </div>
          <div [class]="reveal" data-reveal="">
            <div
              role="tablist"
              aria-label="Services"
              [class]="tabList"
              (keydown)="onTabKey($event)"
            >
              @for (item of serviceTabs; track item.id; let index = $index) {
                <button
                  [id]="'konsultan-tab-' + item.id"
                  type="button"
                  role="tab"
                  [attr.aria-selected]="index === tabIndex()"
                  aria-controls="konsultan-tabpanel"
                  [attr.tabindex]="index === tabIndex() ? 0 : -1"
                  [class]="cx(tab, index === tabIndex() ? tabActive : tabIdle)"
                  (click)="tabIndex.set(index)"
                >
                  <span
                    [class]="tabNumber"
                    [textContent]="'0' + (index + 1)"
                  ></span>
                  {{ item.label }}
                </button>
              }
            </div>
            <div
              id="konsultan-tabpanel"
              role="tabpanel"
              [attr.aria-labelledby]="'konsultan-tab-' + activeTab().id"
              [class]="tabPanel"
            >
              <div>
                <h3 [class]="panelTitle" [textContent]="activeTab().title"></h3>
                <p [class]="panelText" [textContent]="activeTab().text"></p>
                <ul [class]="pointList">
                  @for (point of activeTab().points; track point) {
                    <li [class]="pointItem">
                      <span [class]="pointIcon" aria-hidden="true">
                        <svg konsultanIcon="check" class="size-3.5"></svg>
                      </span>
                      {{ point }}
                    </li>
                  }
                </ul>
                <a href="#contact" [class]="arrowLink">
                  Talk to a partner
                  <svg konsultanIcon="arrow" class="size-4"></svg>
                </a>
              </div>
              <dl [class]="panelStats">
                @for (stat of activeTab().stats; track stat.label) {
                  <div [class]="statPair">
                    <dt
                      [class]="panelStatLabel"
                      [textContent]="stat.label"
                    ></dt>
                    <dd
                      [class]="panelStatValue"
                      [textContent]="stat.value"
                    ></dd>
                  </div>
                }
              </dl>
            </div>
          </div>
        </section>

        <section id="about" [class]="section" aria-labelledby="konsultan-about">
          <div [class]="cx(sectionHead, reveal)" data-reveal="">
            <div>
              <p [class]="kicker">
                <span [class]="kickerDot" aria-hidden="true"></span>
                About Pranata
              </p>
              <h2 id="konsultan-about" [class]="h2">
                A firm built around partners, not pyramids
              </h2>
            </div>
            <p [class]="lead">
              We stay small on purpose. The people who win your trust are the
              people who do the work.
            </p>
          </div>
          <div [class]="cx(cardGrid, reveal)" data-reveal="">
            <article [class]="greyCard">
              <span [class]="chip">Since 2009</span>
              <h3 [class]="h3">Seventeen years inside Indonesian boardrooms</h3>
              <p [class]="muted">
                From a two person office in Jakarta to listed companies, family
                groups, and state owned enterprises across Asia.
              </p>
              <div [class]="barChart">
                <div
                  [class]="barRow"
                  role="img"
                  aria-label="Bar chart: companies advised each year, rising from 38 in 2021 to 88 in 2026"
                >
                  @for (
                    item of growthBars;
                    track item.year;
                    let index = $index
                  ) {
                    <div
                      [class]="
                        index === growthBars.length - 1 ? barActive : bar
                      "
                      [style.height.%]="(item.value / maxBar) * 100"
                    ></div>
                  }
                </div>
                <div [class]="barYears" aria-hidden="true">
                  @for (item of growthBars; track item.year) {
                    <span [textContent]="item.year"></span>
                  }
                </div>
              </div>
            </article>
            <article [class]="limeCard">
              <div [class]="limeArt">
                <svg
                  [attr.class]="artSvg"
                  viewBox="0 0 400 300"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <circle cx="300" cy="80" r="150" [attr.class]="artRing" />
                  <circle cx="300" cy="80" r="105" [attr.class]="artRing" />
                  <circle cx="300" cy="80" r="60" [attr.class]="artRing" />
                  <path
                    d="M-20 210c40-70 120-90 170-60s70 90 150 80 110 40 120 90H-20z"
                    [attr.class]="artSoft"
                  />
                  <path
                    d="M86 64c38-30 104-24 122 22s-12 94-64 104-104-14-104-62 14-44 46-64z"
                    [attr.class]="artBlob"
                  />
                  <circle cx="330" cy="200" r="12" [attr.class]="artBlob" />
                </svg>
                <div [class]="notch">
                  <a
                    href="#cases"
                    [class]="notchLink"
                    aria-label="See the work behind our recognition"
                  >
                    <svg konsultanIcon="upRight" class="size-5"></svg>
                  </a>
                </div>
              </div>
              <div [class]="limeBody">
                <span [class]="chipDark">Recognition</span>
                <h3 [class]="h3">
                  Named a top advisory firm in Southeast Asia
                </h3>
                <p [class]="limeStat">No. 4</p>
                <p [class]="limeMeta">Asia Business Review ranking, 2026</p>
              </div>
            </article>
            <article [class]="greyCard">
              <span [class]="chip">Our people</span>
              <div [class]="avatarRow" aria-hidden="true">
                @for (item of partners; track item.initials) {
                  <span
                    [class]="cx(avatar, tones[item.tone])"
                    [textContent]="item.initials"
                  ></span>
                }
                <span [class]="avatarMore">+116</span>
              </div>
              <h3 [class]="h3">Senior partners who have run companies</h3>
              <p [class]="muted">
                Former CFOs, bankers, and engineers who sit at your table, not
                behind a junior team.
              </p>
              <dl [class]="cityList">
                @for (item of cities; track item.label) {
                  <div [class]="cityItem">
                    <dt [class]="muted" [textContent]="item.label"></dt>
                    <dd [class]="cityValue" [textContent]="item.value"></dd>
                  </div>
                }
              </dl>
            </article>
          </div>
        </section>

        <section
          id="industries"
          [class]="section"
          aria-labelledby="konsultan-industries"
        >
          <div [class]="cx(sectionHead, reveal)" data-reveal="">
            <div>
              <p [class]="kicker">
                <span [class]="kickerDot" aria-hidden="true"></span>
                Practices
              </p>
              <h2 id="konsultan-industries" [class]="h2">
                We champion the bold to achieve the extraordinary
              </h2>
            </div>
            <div class="grid gap-5">
              <p [class]="lead">
                Each practice is led by a partner with at least fifteen years in
                the field. Filter by industry to find the right team.
              </p>
              <div
                [class]="filterRow"
                role="group"
                aria-label="Filter by industry"
              >
                @for (item of industries; track item) {
                  <button
                    type="button"
                    [attr.aria-pressed]="industry() === item"
                    [class]="
                      cx(
                        filter,
                        industry() === item ? filterActive : filterIdle
                      )
                    "
                    (click)="industry.set(item)"
                    [textContent]="item"
                  ></button>
                }
              </div>
            </div>
          </div>
          <p class="sr-only" aria-live="polite" [textContent]="shownText()"></p>
          <ul [class]="cx(practiceGrid, reveal)" data-reveal="">
            @for (item of shown(); track item.title) {
              <li [class]="practiceCard">
                <div [class]="practiceTop">
                  <span [class]="practiceIcon" aria-hidden="true">
                    <svg [konsultanIcon]="item.icon" class="size-5"></svg>
                  </span>
                  <svg
                    konsultanIcon="upRight"
                    [class]="cx('size-4', practiceArrow)"
                  ></svg>
                </div>
                <div>
                  <h3 [class]="practiceTitle" [textContent]="item.title"></h3>
                  <p [class]="practiceText" [textContent]="item.text"></p>
                </div>
                <div [class]="practiceFoot">
                  <p [class]="leadRow">
                    <span
                      [class]="cx(leadAvatar, tones[item.tone])"
                      aria-hidden="true"
                      [textContent]="item.initials"
                    ></span>
                    {{ "Led by " + item.lead }}
                  </p>
                  <div [class]="tagRow">
                    @for (name of item.tags; track name) {
                      <span [class]="tag" [textContent]="name"></span>
                    }
                  </div>
                </div>
              </li>
            }
          </ul>
        </section>

        <section id="cases" [class]="section" aria-labelledby="konsultan-cases">
          <div [class]="cx(sectionHead, reveal)" data-reveal="">
            <div>
              <p [class]="kicker">
                <span [class]="kickerDot" aria-hidden="true"></span>
                Case studies
              </p>
              <h2 id="konsultan-cases" [class]="h2">
                Results our clients can take to the bank
              </h2>
            </div>
            <p [class]="lead">
              We agree on the number before we start, then report against it
              every month until it moves.
            </p>
          </div>
          <div [class]="cx(caseGrid, reveal)" data-reveal="">
            @for (item of cases; track item.client) {
              <article [class]="caseCard">
                <div [class]="caseHead">
                  <h3 class="font-semibold" [textContent]="item.client"></h3>
                  <span [class]="tag" [textContent]="item.industry"></span>
                </div>
                <div>
                  <p [class]="caseValue" [textContent]="item.value"></p>
                  <p [class]="caseMetric">
                    <span [class]="caseMark" aria-hidden="true"></span>
                    {{ item.metric }}
                  </p>
                </div>
                <p [class]="muted" [textContent]="item.text"></p>
                <p [class]="caseFoot">
                  <span [textContent]="item.scope"></span>
                  <span [textContent]="item.time"></span>
                </p>
              </article>
            }
          </div>
        </section>

        <section
          id="insight"
          [class]="section"
          aria-labelledby="konsultan-insight"
        >
          <div [class]="cx(sectionHead, reveal)" data-reveal="">
            <div>
              <p [class]="kicker">
                <span [class]="kickerDot" aria-hidden="true"></span>
                Client voices
              </p>
              <h2 id="konsultan-insight" [class]="h2">
                What leaders say after working with us
              </h2>
            </div>
            <p [class]="lead">
              Independent reviews from the executives we advised in the last two
              years.
            </p>
          </div>
          <div [class]="cx(quoteGrid, reveal)" data-reveal="">
            <div [class]="ratingCard">
              <div [class]="stars" role="img" aria-label="Rated 4.9 out of 5">
                @for (n of five; track n) {
                  <svg konsultanIcon="star" class="size-5 fill-current"></svg>
                }
              </div>
              <div>
                <p [class]="ratingValue">4.9</p>
                <p [class]="limeMeta">Average rating from 210 client reviews</p>
              </div>
            </div>
            <div
              [class]="quoteCard"
              role="region"
              aria-roledescription="carousel"
              aria-label="Client testimonials"
            >
              <figure
                class="grid gap-8"
                aria-live="polite"
                aria-roledescription="slide"
                [attr.aria-label]="quoteIndex() + 1 + ' of ' + quotes.length"
              >
                <blockquote
                  [class]="quoteText"
                  [textContent]="'“' + quote().text + '”'"
                ></blockquote>
                <figcaption [class]="quotePerson">
                  <span
                    [class]="cx(quoteAvatar, tones[quote().tone])"
                    aria-hidden="true"
                    [textContent]="quote().initials"
                  ></span>
                  <span>
                    <span
                      class="block font-semibold"
                      [textContent]="quote().name"
                    ></span>
                    <span [class]="muted" [textContent]="quote().role"></span>
                  </span>
                </figcaption>
              </figure>
              <div [class]="quoteFoot">
                <div [class]="dots" aria-hidden="true">
                  @for (item of quotes; track item.name; let index = $index) {
                    <span
                      [class]="
                        cx(
                          dotBase,
                          index === quoteIndex() ? dotActive : dotIdle
                        )
                      "
                    ></span>
                  }
                </div>
                <div [class]="controls">
                  <button
                    type="button"
                    [class]="roundButton"
                    aria-label="Previous testimonial"
                    (click)="moveQuote(-1)"
                  >
                    <svg konsultanIcon="left" class="size-4"></svg>
                  </button>
                  <span
                    [class]="counter"
                    [textContent]="quoteIndex() + 1 + ' / ' + quotes.length"
                  ></span>
                  <button
                    type="button"
                    [class]="roundButton"
                    aria-label="Next testimonial"
                    (click)="moveQuote(1)"
                  >
                    <svg konsultanIcon="right" class="size-4"></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div [class]="cx(logoWrap, reveal)" data-reveal="">
            <p [class]="muted">Trusted by 320+ companies across Asia</p>
            <ul [class]="logoGrid" aria-label="Selected clients">
              @for (item of logos; track item.name) {
                <li [class]="logoCell">
                  <svg [konsultanIcon]="item.glyph" class="size-5"></svg>
                  {{ item.name }}
                </li>
              }
            </ul>
          </div>
        </section>

        <section
          id="contact"
          [class]="section"
          aria-labelledby="konsultan-contact"
        >
          <div [class]="cx(ctaBand, reveal)" data-reveal="">
            <div [class]="ctaLines" aria-hidden="true"></div>
            <div>
              <p [class]="ctaKicker">
                <span [class]="eyebrowDot" aria-hidden="true"></span>
                Free consultation
              </p>
              <h2 id="konsultan-contact" [class]="ctaTitle">
                Start with a <em [class]="heroAccent">30 minute</em> call
              </h2>
              <p [class]="ctaLead">
                Tell us where you want to be in three years. A partner will call
                you back within one business day.
              </p>
              <ul [class]="contactList">
                @for (item of contacts; track item.label) {
                  <li [class]="contactItem">
                    <span [class]="contactIcon" aria-hidden="true">
                      <svg [konsultanIcon]="item.icon" class="size-4"></svg>
                    </span>
                    <span>
                      <span
                        [class]="contactLabel"
                        [textContent]="item.label"
                      ></span>
                      <span
                        class="font-medium"
                        [textContent]="item.value"
                      ></span>
                    </span>
                  </li>
                }
              </ul>
            </div>
            <form
              [class]="formCard"
              novalidate
              aria-label="Consultation request"
              (submit)="submit($event)"
            >
              <markas-input
                [(value)]="name"
                label="Full name"
                name="name"
                autocomplete="name"
                [aria-invalid]="error().field === 'name' ? true : undefined"
                [aria-describedby]="
                  error().field === 'name' ? FORM_ERROR_ID : undefined
                "
              />
              <markas-input
                [(value)]="email"
                label="Work email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="you&#64;company.com"
                [aria-invalid]="error().field === 'email' ? true : undefined"
                [aria-describedby]="
                  error().field === 'email' ? FORM_ERROR_ID : undefined
                "
              />
              <markas-input
                [(value)]="company"
                label="Company"
                name="company"
                autocomplete="organization"
              />
              <markas-select [(value)]="service" label="Service" name="service">
                <option value="">Not sure yet</option>
                @for (item of practices; track item.title) {
                  <option
                    [value]="item.title"
                    [textContent]="item.title"
                  ></option>
                }
              </markas-select>
              <div [class]="full">
                <markas-textarea
                  [(value)]="message"
                  label="What would you like to discuss?"
                  name="message"
                  [rows]="4"
                />
              </div>
              @if (error().message) {
                <p
                  [id]="FORM_ERROR_ID"
                  [class]="errorText"
                  [textContent]="error().message"
                ></p>
              }
              <div [class]="formFoot">
                <p [class]="muted">We reply within one business day.</p>
                <button markas-button type="submit">Send request</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer [class]="footer">
        <div [class]="footerTop">
          <div>
            <a href="#top" [class]="footerBrand">
              <span [class]="brandMark" aria-hidden="true">
                <svg konsultanIcon="mark" class="size-5"></svg>
              </span>
              Pranata
            </a>
            <p [class]="footerText">
              Independent strategy, finance, and transformation advice from
              Jakarta since 2009.
            </p>
          </div>
          @for (column of footerColumns; track column.title) {
            <nav [attr.aria-label]="column.title">
              <h2 [class]="footerHeading" [textContent]="column.title"></h2>
              <ul [class]="footerList">
                @for (link of column.links; track link) {
                  <li>
                    <a
                      href="#top"
                      [class]="footerLink"
                      [textContent]="link"
                    ></a>
                  </li>
                }
              </ul>
            </nav>
          }
        </div>
        <div [class]="footerBottom">
          <p>© 2026 Pranata Advisory. Jakarta, Indonesia.</p>
          <p>
            Built with
            <a href="https://markas.jenderalcorp.com" [class]="builtLink"
              >MarkasUI</a
            >
          </p>
        </div>
      </footer>
      <markas-toaster />
    </div>
  `,
})
export default class Konsultan {
  protected readonly palette = palette;
  protected readonly root = root;
  protected readonly reveal = reveal;
  protected readonly hero = hero;
  protected readonly heroLines = heroLines;
  protected readonly heroGlow = heroGlow;
  protected readonly headerWrap = headerWrap;
  protected readonly navbar = navbar;
  protected readonly brand = brand;
  protected readonly brandMark = brandMark;
  protected readonly navLinks = navLinks;
  protected readonly navLink = navLink;
  protected readonly navTools = navTools;
  protected readonly iconButton = iconButton;
  protected readonly contactNav = contactNav;
  protected readonly menuButton = menuButton;
  protected readonly panel = panel;
  protected readonly menuList = menuList;
  protected readonly menuLink = menuLink;
  protected readonly resultList = resultList;
  protected readonly resultLink = resultLink;
  protected readonly resultTag = resultTag;
  protected readonly muted = muted;
  protected readonly heroBody = heroBody;
  protected readonly heroIntro = heroIntro;
  protected readonly eyebrow = eyebrow;
  protected readonly eyebrowDot = eyebrowDot;
  protected readonly heroTitle = heroTitle;
  protected readonly heroAccent = heroAccent;
  protected readonly heroLead = heroLead;
  protected readonly heroActions = heroActions;
  protected readonly ctaBig = ctaBig;
  protected readonly ctaArrow = ctaArrow;
  protected readonly ghostLink = ghostLink;
  protected readonly trust = trust;
  protected readonly trustAvatars = trustAvatars;
  protected readonly trustAvatar = trustAvatar;
  protected readonly trustStars = trustStars;
  protected readonly visual = visual;
  protected readonly dataCard = dataCard;
  protected readonly cardHead = cardHead;
  protected readonly cardLabel = cardLabel;
  protected readonly cardValue = cardValue;
  protected readonly growthBadge = growthBadge;
  protected readonly chartGridLine = chartGridLine;
  protected readonly chartArea = chartArea;
  protected readonly chartLine = chartLine;
  protected readonly chartHalo = chartHalo;
  protected readonly chartDot = chartDot;
  protected readonly chartAxis = chartAxis;
  protected readonly metricGrid = metricGrid;
  protected readonly metricTile = metricTile;
  protected readonly metricTileLime = metricTileLime;
  protected readonly metricValue = metricValue;
  protected readonly metricLabel = metricLabel;
  protected readonly metricLabelLime = metricLabelLime;
  protected readonly section = section;
  protected readonly sectionHead = sectionHead;
  protected readonly kicker = kicker;
  protected readonly kickerDot = kickerDot;
  protected readonly h2 = h2;
  protected readonly lead = lead;
  protected readonly arrowLink = arrowLink;
  protected readonly tabList = tabList;
  protected readonly tab = tab;
  protected readonly tabIdle = tabIdle;
  protected readonly tabActive = tabActive;
  protected readonly tabNumber = tabNumber;
  protected readonly tabPanel = tabPanel;
  protected readonly panelTitle = panelTitle;
  protected readonly panelText = panelText;
  protected readonly pointList = pointList;
  protected readonly pointItem = pointItem;
  protected readonly pointIcon = pointIcon;
  protected readonly panelStats = panelStats;
  protected readonly statPair = statPair;
  protected readonly panelStatValue = panelStatValue;
  protected readonly panelStatLabel = panelStatLabel;
  protected readonly cardGrid = cardGrid;
  protected readonly greyCard = greyCard;
  protected readonly limeCard = limeCard;
  protected readonly chip = chip;
  protected readonly chipDark = chipDark;
  protected readonly h3 = h3;
  protected readonly barChart = barChart;
  protected readonly barRow = barRow;
  protected readonly bar = bar;
  protected readonly barActive = barActive;
  protected readonly barYears = barYears;
  protected readonly limeArt = limeArt;
  protected readonly artSvg = artSvg;
  protected readonly artBlob = artBlob;
  protected readonly artSoft = artSoft;
  protected readonly artRing = artRing;
  protected readonly notch = notch;
  protected readonly notchLink = notchLink;
  protected readonly limeBody = limeBody;
  protected readonly limeStat = limeStat;
  protected readonly limeMeta = limeMeta;
  protected readonly avatarRow = avatarRow;
  protected readonly avatar = avatar;
  protected readonly avatarMore = avatarMore;
  protected readonly cityList = cityList;
  protected readonly cityItem = cityItem;
  protected readonly cityValue = cityValue;
  protected readonly filterRow = filterRow;
  protected readonly filter = filter;
  protected readonly filterIdle = filterIdle;
  protected readonly filterActive = filterActive;
  protected readonly practiceGrid = practiceGrid;
  protected readonly practiceCard = practiceCard;
  protected readonly practiceTop = practiceTop;
  protected readonly practiceIcon = practiceIcon;
  protected readonly practiceArrow = practiceArrow;
  protected readonly practiceTitle = practiceTitle;
  protected readonly practiceText = practiceText;
  protected readonly practiceFoot = practiceFoot;
  protected readonly leadRow = leadRow;
  protected readonly leadAvatar = leadAvatar;
  protected readonly tagRow = tagRow;
  protected readonly tag = tag;
  protected readonly caseGrid = caseGrid;
  protected readonly caseCard = caseCard;
  protected readonly caseHead = caseHead;
  protected readonly caseValue = caseValue;
  protected readonly caseMetric = caseMetric;
  protected readonly caseMark = caseMark;
  protected readonly caseFoot = caseFoot;
  protected readonly quoteGrid = quoteGrid;
  protected readonly ratingCard = ratingCard;
  protected readonly ratingValue = ratingValue;
  protected readonly stars = stars;
  protected readonly quoteCard = quoteCard;
  protected readonly quoteText = quoteText;
  protected readonly quoteFoot = quoteFoot;
  protected readonly quotePerson = quotePerson;
  protected readonly quoteAvatar = quoteAvatar;
  protected readonly controls = controls;
  protected readonly roundButton = roundButton;
  protected readonly counter = counter;
  protected readonly dots = dots;
  protected readonly dotBase = dotBase;
  protected readonly dotIdle = dotIdle;
  protected readonly dotActive = dotActive;
  protected readonly logoWrap = logoWrap;
  protected readonly logoGrid = logoGrid;
  protected readonly logoCell = logoCell;
  protected readonly ctaBand = ctaBand;
  protected readonly ctaLines = ctaLines;
  protected readonly ctaKicker = ctaKicker;
  protected readonly ctaTitle = ctaTitle;
  protected readonly ctaLead = ctaLead;
  protected readonly contactList = contactList;
  protected readonly contactItem = contactItem;
  protected readonly contactIcon = contactIcon;
  protected readonly contactLabel = contactLabel;
  protected readonly formCard = formCard;
  protected readonly full = full;
  protected readonly errorText = errorText;
  protected readonly formFoot = formFoot;
  protected readonly footer = footer;
  protected readonly footerTop = footerTop;
  protected readonly footerBrand = footerBrand;
  protected readonly footerText = footerText;
  protected readonly footerHeading = footerHeading;
  protected readonly footerList = footerList;
  protected readonly footerLink = footerLink;
  protected readonly footerBottom = footerBottom;
  protected readonly builtLink = builtLink;
  protected readonly icons = icons;
  protected readonly tones = tones;
  protected readonly chart = chart;
  protected readonly heroYears = heroYears;
  protected readonly heroAvatars = heroAvatars;
  protected readonly navItems = navItems;
  protected readonly serviceTabs = serviceTabs;
  protected readonly growthBars = growthBars;
  protected readonly partners = partners;
  protected readonly cities = cities;
  protected readonly industries = industries;
  protected readonly practices = practices;
  protected readonly cases = cases;
  protected readonly quotes = quotes;
  protected readonly logos = logos;
  protected readonly contacts = contacts;
  protected readonly footerColumns = footerColumns;
  protected readonly FORM_ERROR_ID = FORM_ERROR_ID;
  protected readonly PANEL_ID = PANEL_ID;
  protected readonly menuItems = menuItems;
  protected readonly maxBar = maxBar;
  protected readonly cx = cx;
  protected readonly five = [1, 2, 3, 4, 5];

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  protected readonly menuOpen = signal(false);
  protected readonly searchOpen = signal(false);
  protected readonly query = signal("");
  protected readonly tabIndex = signal(0);
  protected readonly industry = signal<Industry>("All");
  protected readonly quoteIndex = signal(0);
  protected readonly name = signal("");
  protected readonly email = signal("");
  protected readonly company = signal("");
  protected readonly service = signal("");
  protected readonly message = signal("");
  protected readonly error = signal({ field: "", message: "" });

  protected readonly results = computed(() => {
    const needle = this.query().trim().toLowerCase();
    return insights.filter((item) =>
      `${item.title} ${item.tag}`.toLowerCase().includes(needle),
    );
  });
  protected readonly resultText = computed(() => {
    const count = this.results().length;
    return count
      ? `${count} ${count === 1 ? "article" : "articles"}`
      : "No articles match your search.";
  });
  protected readonly shown = computed(() =>
    practices.filter(
      (item) =>
        this.industry() === "All" ||
        (item.tags as readonly string[]).includes(this.industry()),
    ),
  );
  protected readonly shownText = computed(() => {
    const count = this.shown().length;
    return `Showing ${count} ${count === 1 ? "practice" : "practices"}`;
  });
  protected readonly activeTab = computed(() => serviceTabs[this.tabIndex()]!);
  protected readonly quote = computed(() => quotes[this.quoteIndex()]!);

  constructor() {
    // Animasi masuk saat elemen terlihat; tanpa animasi saat reduced motion (lihat kelas reveal).
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
    afterNextRender(() =>
      this.host.nativeElement
        .querySelectorAll("[data-reveal]")
        .forEach((node) => observer.observe(node)),
    );
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }

  protected toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
    this.searchOpen.set(false);
  }

  /** Kolom pencarian langsung difokus saat panel dibuka, seperti autoFocus di React. */
  protected toggleSearch() {
    this.searchOpen.set(!this.searchOpen());
    this.menuOpen.set(false);
    if (this.searchOpen())
      afterNextRender(
        () =>
          this.host.nativeElement
            .querySelector<HTMLInputElement>(`#${PANEL_ID} input`)
            ?.focus(),
        { injector: this.injector },
      );
  }

  protected closePanels() {
    this.menuOpen.set(false);
    this.searchOpen.set(false);
  }

  protected onPanelKey(event: KeyboardEvent) {
    if (event.key === "Escape") this.closePanels();
  }

  protected onTabKey(event: KeyboardEvent) {
    const step = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[
      event.key
    ];
    if (!step) return;
    event.preventDefault();
    const next =
      (this.tabIndex() + step + serviceTabs.length) % serviceTabs.length;
    this.tabIndex.set(next);
    document.getElementById(`konsultan-tab-${serviceTabs[next]!.id}`)?.focus();
  }

  protected moveQuote(step: number) {
    this.quoteIndex.set(
      (this.quoteIndex() + step + quotes.length) % quotes.length,
    );
  }

  protected submit(event: Event) {
    event.preventDefault();
    const name = this.name().trim();
    const email = this.email().trim();
    if (!name) {
      this.error.set({ field: "name", message: "Tell us your name." });
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      this.error.set({
        field: "email",
        message: "Enter a valid email address, like you@company.com.",
      });
      return;
    }
    this.error.set({ field: "", message: "" });
    this.name.set(emptyForm.name);
    this.email.set(emptyForm.email);
    this.company.set(emptyForm.company);
    this.service.set(emptyForm.service);
    this.message.set(emptyForm.message);
    toast({
      title: "Request received",
      description: `Thanks, ${name.split(" ")[0]}. A partner will reply within one business day.`,
      variant: "success",
    });
  }
}
