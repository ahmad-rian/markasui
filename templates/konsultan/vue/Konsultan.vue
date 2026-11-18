<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import Button from "../../../components/button/Button.vue";
import Input from "../../../components/input/Input.vue";
import Select from "../../../components/select/Select.vue";
import Textarea from "../../../components/textarea/Textarea.vue";
import Toaster, { toast } from "../../../components/toast/Toast.vue";

/* Palet lokal, kelas, dan data: identik dengan versi Blade dan React. Hero dan CTA hijau tua di terang dan gelap. */
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
const svgAttrs = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
} as const;

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
  practices.filter(
    (item) =>
      industry.value === "All" ||
      (item.tags as readonly string[]).includes(industry.value),
  ),
);
const activeTab = computed(() => serviceTabs[tabIndex.value]!);
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
  const next =
    (tabIndex.value + step + serviceTabs.length) % serviceTabs.length;
  tabIndex.value = next;
  void nextTick(() =>
    document.getElementById(`konsultan-tab-${serviceTabs[next]!.id}`)?.focus(),
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
      <div :class="heroLines" aria-hidden="true" />
      <div :class="heroGlow" aria-hidden="true" />
      <header :class="headerWrap">
        <nav aria-label="Main" :class="navbar">
          <a href="#top" :class="brand">
            <span :class="brandMark" aria-hidden="true">
              <svg class="size-5" v-bind="svgAttrs">
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
            >
              {{ item.label }}
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
              <svg class="size-4" v-bind="svgAttrs">
                <path :d="searchOpen ? icons.close : icons.search" />
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
              <svg class="size-4" v-bind="svgAttrs">
                <path :d="menuOpen ? icons.close : icons.menu" />
              </svg>
            </button>
          </div>
        </nav>
        <div
          v-if="menuOpen || searchOpen"
          :id="PANEL_ID"
          :class="panel"
          @keydown.escape="closePanels"
        >
          <ul v-if="menuOpen" :class="menuList">
            <li v-for="item in menuItems" :key="item.href">
              <a :href="item.href" :class="menuLink" @click="closePanels">
                {{ item.label }}
              </a>
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
        <div :class="heroIntro">
          <p :class="eyebrow">
            <span :class="eyebrowDot" aria-hidden="true" />
            Independent advisory since 2009
          </p>
          <h1 :class="heroTitle">
            Clear advice for <em :class="heroAccent">bold</em> decisions
          </h1>
          <p :class="heroLead">
            Pranata helps Indonesian boards and founders grow, finance, and
            transform their companies, with senior partners at the table from
            day one.
          </p>
          <div :class="heroActions">
            <a href="#contact" :class="ctaBig">
              Book a consultation
              <span :class="ctaArrow" aria-hidden="true">
                <svg class="size-4" v-bind="svgAttrs">
                  <path :d="icons.upRight" />
                </svg>
              </span>
            </a>
            <a href="#services" :class="ghostLink">Explore services</a>
          </div>
          <div :class="trust">
            <div :class="trustAvatars" aria-hidden="true">
              <span
                v-for="item in heroAvatars"
                :key="item.initials"
                :class="cx(trustAvatar, tones[item.tone])"
              >
                {{ item.initials }}
              </span>
            </div>
            <div :class="trustStars" role="img" aria-label="Rated 4.9 out of 5">
              <svg
                v-for="n in 5"
                :key="n"
                class="size-4 fill-current"
                v-bind="svgAttrs"
              >
                <path :d="icons.star" />
              </svg>
            </div>
            <p>4.9 from 210 executives</p>
          </div>
        </div>
        <div :class="visual">
          <div :class="dataCard">
            <div :class="cardHead">
              <div>
                <p :class="cardLabel">Assets under advisory</p>
                <p :class="cardValue">Rp 2,4 T</p>
              </div>
              <p :class="growthBadge">
                <svg class="size-3.5" v-bind="svgAttrs">
                  <path :d="icons.trend" />
                </svg>
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
                <line
                  v-for="y in chart.grid"
                  :key="y"
                  x1="0"
                  x2="480"
                  :y1="y"
                  :y2="y"
                  :class="chartGridLine"
                  stroke-dasharray="4 6"
                />
                <path
                  :d="chart.area"
                  fill="url(#konsultan-area)"
                  :class="chartArea"
                />
                <path
                  :d="chart.line"
                  pathLength="1"
                  stroke-width="3"
                  stroke-linecap="round"
                  :class="chartLine"
                />
                <circle :cx="chart.x" :cy="chart.y" r="14" :class="chartHalo" />
                <circle :cx="chart.x" :cy="chart.y" r="6" :class="chartDot" />
              </svg>
              <div :class="chartAxis" aria-hidden="true">
                <span v-for="year in heroYears" :key="year">{{ year }}</span>
              </div>
            </div>
            <dl :class="metricGrid">
              <div :class="cx(metricTile, statPair)">
                <dt :class="metricLabel">Clients advised</dt>
                <dd :class="metricValue">320+</dd>
              </div>
              <div :class="cx(metricTileLime, statPair)">
                <dt :class="metricLabelLime">Client retention</dt>
                <dd :class="metricValue">98%</dd>
              </div>
            </dl>
          </div>
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
          <div>
            <p :class="kicker">
              <span :class="kickerDot" aria-hidden="true" />
              What we do
            </p>
            <h2 id="konsultan-services" :class="h2">
              Three practices, one senior team
            </h2>
          </div>
          <p :class="lead">
            Every engagement is led by a partner who has run a business, and
            measured the way your board measures it.
          </p>
        </div>
        <div :class="reveal" data-reveal="">
          <div
            role="tablist"
            aria-label="Services"
            :class="tabList"
            @keydown="onTabKey"
          >
            <button
              v-for="(item, index) in serviceTabs"
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
          <div
            id="konsultan-tabpanel"
            role="tabpanel"
            :aria-labelledby="`konsultan-tab-${activeTab.id}`"
            :class="tabPanel"
          >
            <div>
              <h3 :class="panelTitle">{{ activeTab.title }}</h3>
              <p :class="panelText">{{ activeTab.text }}</p>
              <ul :class="pointList">
                <li
                  v-for="point in activeTab.points"
                  :key="point"
                  :class="pointItem"
                >
                  <span :class="pointIcon" aria-hidden="true">
                    <svg class="size-3.5" v-bind="svgAttrs">
                      <path :d="icons.check" />
                    </svg>
                  </span>
                  {{ point }}
                </li>
              </ul>
              <a href="#contact" :class="arrowLink">
                Talk to a partner
                <svg class="size-4" v-bind="svgAttrs">
                  <path :d="icons.arrow" />
                </svg>
              </a>
            </div>
            <dl :class="panelStats">
              <div
                v-for="stat in activeTab.stats"
                :key="stat.label"
                :class="statPair"
              >
                <dt :class="panelStatLabel">{{ stat.label }}</dt>
                <dd :class="panelStatValue">{{ stat.value }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="about" :class="section" aria-labelledby="konsultan-about">
        <div :class="cx(sectionHead, reveal)" data-reveal="">
          <div>
            <p :class="kicker">
              <span :class="kickerDot" aria-hidden="true" />
              About Pranata
            </p>
            <h2 id="konsultan-about" :class="h2">
              A firm built around partners, not pyramids
            </h2>
          </div>
          <p :class="lead">
            We stay small on purpose. The people who win your trust are the
            people who do the work.
          </p>
        </div>
        <div :class="cx(cardGrid, reveal)" data-reveal="">
          <article :class="greyCard">
            <span :class="chip">Since 2009</span>
            <h3 :class="h3">Seventeen years inside Indonesian boardrooms</h3>
            <p :class="muted">
              From a two person office in Jakarta to listed companies, family
              groups, and state owned enterprises across Asia.
            </p>
            <div :class="barChart">
              <div
                :class="barRow"
                role="img"
                aria-label="Bar chart: companies advised each year, rising from 38 in 2021 to 88 in 2026"
              >
                <div
                  v-for="(item, index) in growthBars"
                  :key="item.year"
                  :class="index === growthBars.length - 1 ? barActive : bar"
                  :style="{ height: `${(item.value / maxBar) * 100}%` }"
                />
              </div>
              <div :class="barYears" aria-hidden="true">
                <span v-for="item in growthBars" :key="item.year">{{
                  item.year
                }}</span>
              </div>
            </div>
          </article>
          <article :class="limeCard">
            <div :class="limeArt">
              <svg
                :class="artSvg"
                viewBox="0 0 400 300"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <circle cx="300" cy="80" r="150" :class="artRing" />
                <circle cx="300" cy="80" r="105" :class="artRing" />
                <circle cx="300" cy="80" r="60" :class="artRing" />
                <path
                  d="M-20 210c40-70 120-90 170-60s70 90 150 80 110 40 120 90H-20z"
                  :class="artSoft"
                />
                <path
                  d="M86 64c38-30 104-24 122 22s-12 94-64 104-104-14-104-62 14-44 46-64z"
                  :class="artBlob"
                />
                <circle cx="330" cy="200" r="12" :class="artBlob" />
              </svg>
              <div :class="notch">
                <a
                  href="#cases"
                  :class="notchLink"
                  aria-label="See the work behind our recognition"
                >
                  <svg class="size-5" v-bind="svgAttrs">
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
          <article :class="greyCard">
            <span :class="chip">Our people</span>
            <div :class="avatarRow" aria-hidden="true">
              <span
                v-for="item in partners"
                :key="item.initials"
                :class="cx(avatar, tones[item.tone])"
              >
                {{ item.initials }}
              </span>
              <span :class="avatarMore">+116</span>
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
          </article>
        </div>
      </section>

      <section
        id="industries"
        :class="section"
        aria-labelledby="konsultan-industries"
      >
        <div :class="cx(sectionHead, reveal)" data-reveal="">
          <div>
            <p :class="kicker">
              <span :class="kickerDot" aria-hidden="true" />
              Practices
            </p>
            <h2 id="konsultan-industries" :class="h2">
              We champion the bold to achieve the extraordinary
            </h2>
          </div>
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
        <p class="sr-only" aria-live="polite">
          {{
            `Showing ${shown.length} ${shown.length === 1 ? "practice" : "practices"}`
          }}
        </p>
        <ul :class="cx(practiceGrid, reveal)" data-reveal="">
          <li v-for="item in shown" :key="item.title" :class="practiceCard">
            <div :class="practiceTop">
              <span :class="practiceIcon" aria-hidden="true">
                <svg class="size-5" v-bind="svgAttrs">
                  <path :d="icons[item.icon]" />
                </svg>
              </span>
              <svg :class="practiceArrow" class="size-4" v-bind="svgAttrs">
                <path :d="icons.upRight" />
              </svg>
            </div>
            <div>
              <h3 :class="practiceTitle">{{ item.title }}</h3>
              <p :class="practiceText">{{ item.text }}</p>
            </div>
            <div :class="practiceFoot">
              <p :class="leadRow">
                <span
                  :class="cx(leadAvatar, tones[item.tone])"
                  aria-hidden="true"
                >
                  {{ item.initials }}
                </span>
                Led by {{ item.lead }}
              </p>
              <div :class="tagRow">
                <span v-for="name in item.tags" :key="name" :class="tag">
                  {{ name }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <section id="cases" :class="section" aria-labelledby="konsultan-cases">
        <div :class="cx(sectionHead, reveal)" data-reveal="">
          <div>
            <p :class="kicker">
              <span :class="kickerDot" aria-hidden="true" />
              Case studies
            </p>
            <h2 id="konsultan-cases" :class="h2">
              Results our clients can take to the bank
            </h2>
          </div>
          <p :class="lead">
            We agree on the number before we start, then report against it every
            month until it moves.
          </p>
        </div>
        <div :class="cx(caseGrid, reveal)" data-reveal="">
          <article v-for="item in cases" :key="item.client" :class="caseCard">
            <div :class="caseHead">
              <h3 class="font-semibold">{{ item.client }}</h3>
              <span :class="tag">{{ item.industry }}</span>
            </div>
            <div>
              <p :class="caseValue">{{ item.value }}</p>
              <p :class="caseMetric">
                <span :class="caseMark" aria-hidden="true" />
                {{ item.metric }}
              </p>
            </div>
            <p :class="muted">{{ item.text }}</p>
            <p :class="caseFoot">
              <span>{{ item.scope }}</span>
              <span>{{ item.time }}</span>
            </p>
          </article>
        </div>
      </section>

      <section
        id="insight"
        :class="section"
        aria-labelledby="konsultan-insight"
      >
        <div :class="cx(sectionHead, reveal)" data-reveal="">
          <div>
            <p :class="kicker">
              <span :class="kickerDot" aria-hidden="true" />
              Client voices
            </p>
            <h2 id="konsultan-insight" :class="h2">
              What leaders say after working with us
            </h2>
          </div>
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
                v-bind="svgAttrs"
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
              <figcaption :class="quotePerson">
                <span
                  :class="cx(quoteAvatar, tones[quote.tone])"
                  aria-hidden="true"
                >
                  {{ quote.initials }}
                </span>
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
                  <svg class="size-4" v-bind="svgAttrs">
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
                  <svg class="size-4" v-bind="svgAttrs">
                    <path :d="icons.right" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div :class="cx(logoWrap, reveal)" data-reveal="">
          <p :class="muted">Trusted by 320+ companies across Asia</p>
          <ul :class="logoGrid" aria-label="Selected clients">
            <li v-for="item in logos" :key="item.name" :class="logoCell">
              <svg class="size-5" v-bind="svgAttrs">
                <path :d="icons[item.glyph]" />
              </svg>
              {{ item.name }}
            </li>
          </ul>
        </div>
      </section>

      <section
        id="contact"
        :class="section"
        aria-labelledby="konsultan-contact"
      >
        <div :class="cx(ctaBand, reveal)" data-reveal="">
          <div :class="ctaLines" aria-hidden="true" />
          <div>
            <p :class="ctaKicker">
              <span :class="eyebrowDot" aria-hidden="true" />
              Free consultation
            </p>
            <h2 id="konsultan-contact" :class="ctaTitle">
              Start with a <em :class="heroAccent">30 minute</em> call
            </h2>
            <p :class="ctaLead">
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
                  <svg class="size-4" v-bind="svgAttrs">
                    <path :d="icons[item.icon]" />
                  </svg>
                </span>
                <span>
                  <span :class="contactLabel">{{ item.label }}</span>
                  <span class="font-medium">{{ item.value }}</span>
                </span>
              </li>
            </ul>
          </div>
          <form
            :class="formCard"
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
                v-for="item in practices"
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
        <div>
          <a href="#top" :class="footerBrand">
            <span :class="brandMark" aria-hidden="true">
              <svg class="size-5" v-bind="svgAttrs">
                <path :d="icons.mark" />
              </svg>
            </span>
            Pranata
          </a>
          <p :class="footerText">
            Independent strategy, finance, and transformation advice from
            Jakarta since 2009.
          </p>
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
          <a href="https://markas.jenderalcorp.com" :class="builtLink"
            >MarkasUI</a
          >
        </p>
      </div>
    </footer>
    <Toaster />
  </div>
</template>
