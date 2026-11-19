import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  viewChild,
} from "@angular/core";
import { Badge } from "../../../components/badge/badge.component";
import { Button } from "../../../components/button/button.component";
import { Faq } from "../../../components/faq/faq.component";
import { Footer } from "../../../components/footer/footer.component";
import { Input } from "../../../components/input/input.component";
import { LogoCloud } from "../../../components/logo-cloud/logo-cloud.component";
import { Navbar } from "../../../components/navbar/navbar.component";
import { Table } from "../../../components/table/table.component";
import { TabPanel, Tabs } from "../../../components/tabs/tabs.component";
import { NgTemplateOutlet } from "@angular/common";
import { Toaster, toast } from "../../../components/toast/toast.component";
import { ToggleGroup } from "../../../components/toggle-group/toggle-group.component";

/* Classes */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
// Halaman gelap di kedua tema. Aksen diambil dari tema halaman sebelum kelas dark menimpanya:
// tema terang memakai primary-line (nada terang), tema gelap memakai primary.
const root =
  "[--nalar-accent:var(--markas-primary-line)] dark:[--nalar-accent:var(--markas-primary)]";
const shell =
  "dark [--nalar-canvas:var(--markas-canvas)] [--nalar-surface:var(--markas-surface)] [--nalar-subtle:var(--markas-subtle)] [--nalar-line:var(--markas-line)]";
const palette =
  "relative min-h-dvh overflow-x-clip bg-canvas text-ink [--markas-canvas:color-mix(in_oklab,var(--nalar-accent)_6%,var(--nalar-canvas))] [--markas-surface:color-mix(in_oklab,var(--nalar-accent)_6%,var(--nalar-surface))] [--markas-subtle:color-mix(in_oklab,var(--nalar-accent)_9%,var(--nalar-subtle))] [--markas-line:color-mix(in_oklab,var(--nalar-accent)_14%,var(--nalar-line))] [--markas-primary:var(--nalar-accent)] [--markas-primary-strong:color-mix(in_oklab,var(--nalar-accent)_82%,var(--markas-ink))] [--markas-on-primary:var(--nalar-canvas)] [--markas-primary-soft:color-mix(in_oklab,var(--nalar-accent)_16%,var(--nalar-canvas))] [--markas-primary-line:color-mix(in_oklab,var(--nalar-accent)_40%,var(--nalar-canvas))]";
const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
const footerEdge = "px-[max(1rem,calc((100%-72rem)/2+2rem))]";
const navWrap = "absolute inset-x-4 top-4 z-30 sm:inset-x-8 sm:top-6";
const navbar = "mx-auto max-w-5xl";
const brandLink = `flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink ${focusRing}`;
const brandMark =
  "flex size-7 items-center justify-center rounded-lg bg-primary text-on-primary";
const signIn = `hidden h-9 items-center rounded-lg px-3 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink sm:inline-flex ${focusRing}`;
const startLink = `hidden h-9 items-center rounded-lg bg-ink px-4 text-sm font-medium whitespace-nowrap text-canvas transition-colors duration-150 hover:bg-ink/90 sm:inline-flex ${focusRing}`;
const hero = "relative isolate overflow-hidden pt-36 sm:pt-44";
const horizon =
  "pointer-events-none absolute top-24 left-1/2 -z-10 aspect-square w-[340%] -translate-x-1/2 rounded-full border-t border-primary/70 shadow-[0_-36px_140px_-48px_var(--color-primary),inset_0_48px_96px_-80px_var(--color-primary)] sm:top-28 sm:w-[220%] lg:w-[150%]";
const heroCopy = `${container} flex flex-col items-center text-center`;
const chip =
  "inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1 pr-3 pl-1 text-sm text-muted backdrop-blur-md";
const chipTag =
  "rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary";
const h1 =
  "mt-7 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl";
const h1Accent = "text-primary";
const heroText =
  "mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg";
const heroActions = "mt-9 flex flex-wrap items-center justify-center gap-3";
const heroCta = `inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const heroGhost = `inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-surface/60 px-5 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const heroNote = "mt-4 text-sm text-muted";
const dashWrap = `${container} relative mt-16 sm:mt-20`;
const dashFrame =
  "overflow-hidden rounded-t-2xl border border-b-0 border-line bg-surface shadow-overlay [mask-image:linear-gradient(to_bottom,black_86%,transparent)]";
const dashGrid =
  "grid lg:grid-cols-[14rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)_17rem]";
const dashSide = "hidden flex-col gap-6 border-r border-line p-4 lg:flex";
const workspace = "flex items-center gap-2.5 px-2 py-1";
const workspaceMark =
  "flex size-7 items-center justify-center rounded-md bg-primary text-xs font-semibold text-on-primary";
const workspaceName = "text-sm font-medium";
const workspacePlan = "text-xs text-muted";
const sideNav = "grid gap-0.5";
const sideItem =
  "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-muted";
const sideItemActive =
  "flex items-center gap-2.5 rounded-lg bg-primary/12 px-2 py-1.5 text-sm font-medium text-ink";
const sideIcon = "size-4 shrink-0";
const sideIconActive = "size-4 shrink-0 text-primary";
const sideCount =
  "ml-auto rounded-full bg-primary px-1.5 text-xs font-medium text-on-primary tabular-nums";
const dashMain = "grid min-w-0 content-start gap-4 p-4 sm:p-6";
const dashHead = "flex flex-wrap items-center justify-between gap-3";
const dashTitle = "text-base font-semibold tracking-tight";
const dashSub = "text-sm text-muted";
const kpiGrid = "grid gap-3 sm:grid-cols-3";
const kpiCard = "rounded-xl border border-line bg-canvas/60 p-4";
const kpiLabel = "text-xs text-muted";
const kpiRow =
  "mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1";
const kpiValue =
  "text-xl font-semibold tracking-tight whitespace-nowrap tabular-nums";
const chartCard = "rounded-xl border border-line bg-canvas/60 p-4";
const chartHead = "flex flex-wrap items-baseline justify-between gap-2";
const chartTitle = "text-sm font-medium";
const chartNote = "text-xs font-medium text-primary";
const chartBars = "mt-4 flex h-32 items-end gap-1.5 sm:h-36 sm:gap-2";
const bar = "flex-1 rounded-t-[3px] bg-primary/30";
const barPeak = "flex-1 rounded-t-[3px] bg-primary";
const dashTable = "bg-canvas/60";
const dashPanel = "hidden content-start gap-4 border-l border-line p-4 xl:grid";
const insightCard = "rounded-xl border border-primary/30 bg-primary/8 p-4";
const insightLabel = "flex items-center gap-2 text-xs font-medium text-primary";
const insightDot = "size-1.5 rounded-full bg-primary";
const insightTitle = "mt-3 text-sm leading-snug font-semibold";
const insightText = "mt-2 text-xs leading-relaxed text-muted";
const driverList = "mt-4 grid gap-3";
const driverRow = "grid gap-1.5";
const driverHead = "flex justify-between gap-2 text-xs";
const driverValue = "text-muted tabular-nums";
const driverTrack = "h-1.5 overflow-hidden rounded-full bg-ink/10";
const driverBar = "h-full rounded-full bg-primary";
const insightAction = "mt-4 w-full";
const feedTitle = "px-1 text-xs font-medium text-muted";
const feedList = "grid gap-2";
const feedItem = "rounded-lg border border-line p-3";
const feedText = "text-xs leading-snug";
const feedTime = "mt-1 text-xs text-muted";
const logoWrap = `${container} py-14 sm:py-20`;
const section = `${container} scroll-mt-6 py-16 sm:py-24`;
const sectionHead = "grid max-w-2xl gap-4";
const h2 = "text-3xl font-semibold tracking-tight text-balance sm:text-4xl";
const lead = "text-lg leading-relaxed text-pretty text-muted";
const featureGrid = "mt-12 grid gap-4 lg:grid-cols-3";
const featureCard =
  "flex flex-col gap-6 rounded-2xl border border-line bg-surface p-5 sm:p-6";
const featureWide =
  "flex flex-col gap-6 rounded-2xl border border-line bg-surface p-5 sm:p-6 lg:col-span-2";
const featureArt =
  "flex min-h-44 flex-1 flex-col justify-center gap-3 rounded-xl border border-line bg-canvas/70 p-4";
const featureIcon =
  "flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary";
const featureTitle = "mt-4 text-lg font-semibold tracking-tight";
const featureText = "mt-2 text-sm leading-relaxed text-pretty text-muted";
const askBubble =
  "max-w-xs self-end rounded-xl rounded-br-sm bg-subtle px-3 py-2 text-sm";
const answerBubble =
  "max-w-md rounded-xl rounded-bl-sm border border-primary/30 bg-primary/10 px-3 py-2 text-sm leading-relaxed";
const answerSource = "text-xs text-muted";
const alertRow =
  "flex items-start justify-between gap-3 rounded-lg border border-line bg-surface p-3";
const alertText = "mt-1.5 text-sm leading-snug";
const alertTime = "shrink-0 text-xs text-muted";
const flowList = "grid gap-0";
const flowStep =
  "flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2.5 text-sm";
const flowStepLast =
  "flex items-center gap-3 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2.5 text-sm";
const flowNumber =
  "flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-medium text-primary tabular-nums";
const flowLink = "ml-6 h-3 w-px bg-primary/40";
const sourceGrid = "grid grid-cols-2 gap-2 sm:grid-cols-4";
const sourceChip =
  "flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm whitespace-nowrap";
const sourceDot = "ml-auto size-1.5 shrink-0 rounded-full bg-success";
const sourceIcon = "size-4 shrink-0 text-primary";
const howTabs = "mt-10";
const howPanel =
  "grid gap-8 pt-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-12";
const howTitle = "text-xl font-semibold tracking-tight";
const howText = "mt-3 text-base leading-relaxed text-pretty text-muted";
const terminal =
  "min-w-0 overflow-hidden rounded-xl border border-line bg-surface";
const terminalHead =
  "flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 text-xs text-muted";
const terminalTitle = "flex items-center gap-2";
const terminalIcon = "size-3.5 text-primary";
const terminalBody = "overflow-x-auto p-4 font-mono text-[13px] leading-6";
const lineCmd = "whitespace-pre text-ink";
const linePrompt = "mr-2 text-primary select-none";
const lineOut = "whitespace-pre text-muted";
const lineOk = "whitespace-pre text-success";
const storyCard =
  "mt-12 grid gap-10 rounded-3xl border border-primary/25 bg-primary/8 p-6 sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:p-12";
const storyQuote =
  "text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl";
const person = "mt-8 flex items-center gap-3";
const photoLg = "size-12 shrink-0 rounded-full bg-subtle object-cover";
const photoMd = "size-10 shrink-0 rounded-full bg-subtle object-cover";
const personName = "text-sm font-medium";
const personRole = "text-sm text-muted";
const metricList = "grid content-end gap-6";
const metric = "flex flex-col-reverse gap-1 border-t border-primary/25 pt-5";
const metricValue =
  "text-4xl font-semibold tracking-tight text-primary tabular-nums";
const metricLabel = "text-sm text-muted";
const quoteGrid = "mt-4 grid gap-4 md:grid-cols-2";
const quoteCard =
  "flex flex-col justify-between gap-8 rounded-2xl border border-line bg-surface p-6 sm:p-8";
const quoteText = "text-base leading-relaxed text-pretty";
const pricingHead =
  "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between";
const planGrid = "mt-10 grid gap-4 lg:grid-cols-3";
const planCard =
  "flex flex-col rounded-2xl border border-line bg-surface p-6 sm:p-8";
const planFeatured =
  "flex flex-col rounded-2xl border border-primary/60 bg-primary/8 p-6 sm:p-8";
const planTop = "flex items-center justify-between gap-3";
const planName = "text-lg font-semibold tracking-tight";
const planPrice = "mt-6 text-4xl font-semibold tracking-tight tabular-nums";
const planUnit = "mt-1 text-sm text-muted";
const planDesc = "mt-4 text-sm leading-relaxed text-pretty text-muted";
const planList = "mt-6 grid gap-3 border-t border-line pt-6 text-sm";
const planItem = "flex gap-2";
const planIcon = "mt-0.5 size-4 shrink-0 text-primary";
const planCta = `mt-8 inline-flex h-11 items-center justify-center rounded-lg border border-line bg-surface px-5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const planCtaFeatured = `mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const planSpacer = "flex-1";
const faqLayout = `${section} grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16`;
const faqAside = "grid content-start justify-items-start gap-4";
const faqList = "[&>div]:max-w-none [&>div]:gap-0";
const ctaWrap = `${container} scroll-mt-6 pb-20 sm:pb-28`;
const ctaCard =
  "grid gap-10 rounded-3xl border border-primary/40 bg-primary/8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-16 lg:p-14";
const ctaForm = "grid gap-3";
const fieldLabel = "text-sm font-medium";
const fieldRow = "flex flex-col gap-3 sm:flex-row sm:items-start";
const fieldWrap = "grid flex-1 gap-1.5";
const fieldError = "text-sm text-danger";
const ctaNote = "text-sm text-muted";
const footer = `${footerEdge} border-t border-line bg-canvas`;

/* Data */
// prettier-ignore
const icons = {
  arc: "M3 18a9 9 0 0 1 18 0M7.5 18a4.5 4.5 0 0 1 9 0",
  arrow: "M5 12h14M13 6l6 6-6 6",
  play: "M8 5.5v13l11-6.5Z",
  check: "m5 12.5 4.5 4.5L19 7.5",
  grid: "M4 4h7v7H4ZM13 4h7v7h-7ZM4 13h7v7H4ZM13 13h7v7h-7Z",
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z",
  bell: "M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15ZM10 20.5a2 2 0 0 0 4 0",
  flow: "M4 7h10m0 0-3-3m3 3-3 3M20 17H10m0 0 3-3m-3 3 3 3",
  database: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  sliders: "M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4",
  terminal: "m4 7 5 5-5 5M12 18h8",
};
type IconName = keyof typeof icons;

const FORM_ID = "nalar-access";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_ERROR = "Enter a work email, like nama@perusahaan.co.id.";
// prettier-ignore
const nav = [
  { label: "Features", href: "#features" }, { label: "Workflow", href: "#how" },
  { label: "Pricing", href: "#pricing" }, { label: "FAQ", href: "#faq" },
];
// prettier-ignore
const sideLinks: { label: string; icon: IconName; count?: string }[] = [
  { label: "Overview", icon: "grid" }, { label: "Insights", icon: "bulb" }, { label: "Alerts", icon: "bell", count: "3" },
  { label: "Workflows", icon: "flow" }, { label: "Sources", icon: "database" }, { label: "Settings", icon: "sliders" },
];
// prettier-ignore
const ranges = [
  { value: "7d", label: "7D", sub: "Last 7 days, all channels", note: "Saturday peak, Rp 214 mn", peak: 5, bars: [52, 48, 61, 58, 66, 100, 72],
    kpis: [{ label: "Net revenue", value: "Rp 1.21 bn", delta: "+6.2%", tone: "success" }, { label: "Active customers", value: "18,240", delta: "+3.1%", tone: "success" }, { label: "Churn risk", value: "4.8%", delta: "+0.9 pt", tone: "danger" }] },
  { value: "30d", label: "30D", sub: "Last 30 days, all channels", note: "11.11 Harbolnas, Rp 612 mn", peak: 9, bars: [38, 42, 40, 47, 45, 52, 50, 58, 55, 100, 63, 57, 60, 66, 62],
    kpis: [{ label: "Net revenue", value: "Rp 4.86 bn", delta: "+12.4%", tone: "success" }, { label: "Active customers", value: "21,905", delta: "+8.7%", tone: "success" }, { label: "Churn risk", value: "4.1%", delta: "-0.6 pt", tone: "success" }] },
  { value: "90d", label: "90D", sub: "Last 90 days, all channels", note: "Best week: 9 to 15 Nov", peak: 10, bars: [41, 44, 39, 48, 52, 50, 57, 55, 61, 64, 100, 70, 68],
    kpis: [{ label: "Net revenue", value: "Rp 13.9 bn", delta: "+21.0%", tone: "success" }, { label: "Active customers", value: "26,410", delta: "+14.2%", tone: "success" }, { label: "Churn risk", value: "3.9%", delta: "-1.2 pt", tone: "success" }] },
] as const;
type RangeId = (typeof ranges)[number]["value"];
// prettier-ignore
const accountColumns = [
  { key: "account", label: "Account" }, { key: "city", label: "City" },
  { key: "mrr", label: "MRR", align: "right" as const }, { key: "signal", label: "Signal" },
];
// prettier-ignore
const accounts = [
  { account: "Kopi Senja Group", city: "Bandung", mrr: "Rp 48 mn", signal: "Churn risk", tone: "danger" },
  { account: "Rumah Rasa", city: "Surabaya", mrr: "Rp 36 mn", signal: "Usage down", tone: "warning" },
  { account: "Batik Lestari", city: "Yogyakarta", mrr: "Rp 29 mn", signal: "Expansion", tone: "success" },
  { account: "Toko Pelita", city: "Medan", mrr: "Rp 22 mn", signal: "New insight", tone: "primary" },
];
// prettier-ignore
const drivers = [
  { label: "Delivery time", value: "+62%", width: "71%" }, { label: "Cart abandonment", value: "+9%", width: "18%" },
  { label: "Promo usage", value: "-4%", width: "11%" },
];
// prettier-ignore
const feed = [
  { text: "Checkout errors 3.2x normal on Android", time: "2 min ago" },
  { text: "Stock below 5 days at Gudang Cikarang", time: "18 min ago" },
];
// prettier-ignore
const logos = [
  { name: "Sagara Commerce", path: "M3 15a9 9 0 0 1 18 0Z" },
  { name: "Rumah Rasa", path: "M4 11 12 4l8 7v9H4Z" },
  { name: "Kirim Cepat", path: "M3 7h12v10H3ZM15 10h4l2 3v4h-6Z" },
  { name: "Batik Lestari", path: "M12 2 22 12 12 22 2 12Z" },
  { name: "Pelita Finance", path: "M12 3 21 20H3Z" },
];
// prettier-ignore
const alerts = [
  { badge: "Anomaly", tone: "danger", text: "Checkout errors 3.2x normal on Android", time: "2 min" },
  { badge: "Threshold", tone: "warning", text: "Stock below 5 days at Gudang Cikarang", time: "18 min" },
] as const;
// prettier-ignore
const flowSteps = ["When churn risk passes 8%", "Score the accounts behind it", "Post to #retention with the reasons"];
// prettier-ignore
const sources = ["PostgreSQL", "MySQL", "BigQuery", "Snowflake", "Google Sheets", "Kafka", "REST API", "CSV upload"];
// prettier-ignore
const steps = [
  { value: "connect", label: "1. Connect", title: "Connect a source in one command", text: "Read-only credentials, encrypted at rest. Nalar maps tables, joins, and metric definitions on the first sync, then keeps them in step with your schema.", file: "sagara-prod",
    lines: [{ kind: "cmd", text: "nalar connect postgres --name sagara-prod" }, { kind: "out", text: "Checking read-only access ... ok" }, { kind: "out", text: "Found 48 tables, 6 with revenue columns" }, { kind: "ok", text: "Synced 2.4M rows in 3m 12s" }] },
  { value: "ask", label: "2. Ask", title: "Ask the way you would ask an analyst", text: "Nalar compares periods, segments, and cohorts on its own, and tells you how much of the change each cause explains.", file: "sagara-prod",
    lines: [{ kind: "cmd", text: "nalar ask \"why did repeat orders drop in Medan?\"" }, { kind: "out", text: "Compared 14 days before and after 3 Nov" }, { kind: "out", text: "Delivery time 2.1 to 3.4 days, explains 71%" }, { kind: "ok", text: "Insight posted to #ops-medan" }] },
  { value: "automate", label: "3. Automate", title: "Turn the answer into an alert", text: "Save any insight as a rule. Nalar checks it every 15 minutes and posts to the channel or ticket queue that owns the metric.", file: "sagara-prod",
    lines: [{ kind: "cmd", text: "nalar alert create --metric repeat_orders --city Medan" }, { kind: "out", text: "Rule: drop of 10% or more over 7 days" }, { kind: "out", text: "Action: post to #ops-medan, open a ticket" }, { kind: "ok", text: "Alert active, checked every 15 minutes" }] },
];
// prettier-ignore
const metrics = [
  { value: "9 hrs", label: "saved per analyst every week" },
  { value: "41%", label: "faster response to revenue drops" },
  { value: "3 days", label: "from first connection to the first alert" },
];
// prettier-ignore
const quotes = [
  { name: "Dimas Pratama", role: "Data Lead, Rumah Rasa", photo: "/template-images/nalar/dimas.webp", text: "Our analysts finally work on the questions nobody had time for. The routine why-did-this-change requests now answer themselves." },
  { name: "Nadia Rahmawati", role: "VP Operations, Kirim Cepat", photo: "/template-images/nalar/nadia.webp", text: "The courier delay alert paid for the year in its first week. We switched routes in Medan two days before customers started to complain." },
];
// prettier-ignore
const billing = [{ value: "monthly", label: "Monthly" }, { value: "yearly", label: "Yearly, save 20%" }];
type BillingId = "monthly" | "yearly";
// prettier-ignore
const plans = [
  { name: "Starter", monthly: "Rp 0", yearly: "Rp 0", free: true, featured: "", desc: "For one analyst trying Nalar on real data.", cta: "Start free",
    features: ["3 data sources", "100 questions per month", "Daily anomaly checks", "Community support"] },
  { name: "Growth", monthly: "Rp 1.490.000", yearly: "Rp 1.190.000", free: false, featured: "Most teams start here", desc: "For teams that want insights and alerts in their own channels.", cta: "Start 14-day trial",
    features: ["15 data sources", "Unlimited questions", "Alerts every 15 minutes", "Workflows to chat and tickets", "Email support within 4 working hours"] },
  { name: "Scale", monthly: "Rp 4.900.000", yearly: "Rp 3.920.000", free: false, featured: "", desc: "For companies with a warehouse and strict access rules.", cta: "Talk to sales",
    features: ["Unlimited sources", "Row-level access control", "SSO and audit log", "Data processed in the Jakarta region", "Named success manager"] },
];
// prettier-ignore
const faqs = [
  { question: "Does Nalar copy our data?", answer: "No. Nalar queries your sources with read-only credentials and keeps only aggregated results and metadata. Raw rows stay in your database or warehouse." },
  { question: "Which data sources are supported?", answer: "PostgreSQL, MySQL, BigQuery, Snowflake, Google Sheets, Kafka, CSV uploads, and any REST API that returns JSON. New connectors ship every month." },
  { question: "How do we check that an explanation is right?", answer: "Every insight shows the query, the comparison window, and how much of the change each cause explains, so your analysts can check the work before anyone acts on it." },
  { question: "Where is our data processed?", answer: "In data centres in the Jakarta region by default, with Singapore available on the Scale plan. We follow Indonesia's Personal Data Protection Law (UU PDP)." },
  { question: "What happens after the early access beta?", answer: "Beta customers keep their price for 12 months after general availability, and every alert and workflow you build carries over." },
];
// prettier-ignore
const footerColumns = [
  { title: "Product", links: [{ label: "Features", href: "#features" }, { label: "Workflow", href: "#how" }, { label: "Pricing", href: "#pricing" }] },
  { title: "Resources", links: [{ label: "Docs", href: "/docs" }, { label: "Changelog", href: "/changelog" }, { label: "Status", href: "/status" }] },
  { title: "Company", links: [{ label: "Customers", href: "#customers" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "#start" }] },
];
// prettier-ignore
const legal = [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }];

const lineClass: Record<string, string> = {
  cmd: lineCmd,
  out: lineOut,
  ok: lineOk,
};
const rangeOf = (value: string) =>
  ranges.find((item) => item.value === value) ?? ranges[1];
const priceOf = (plan: (typeof plans)[number], period: BillingId) =>
  period === "yearly" ? plan.yearly : plan.monthly;
const unitOf = (plan: (typeof plans)[number], period: BillingId) =>
  plan.free
    ? "free, no card needed"
    : `per month, billed ${period === "yearly" ? "yearly" : "monthly"}`;

const rangeItems = ranges.map(({ value, label }) => ({ value, label }));
const stepItems = steps.map(({ value, label }) => ({ value, label }));

/** Ikon garis 24px; atribut svg di host supaya class dari pemakai langsung berlaku. */
@Component({
  selector: "svg[nalarIcon]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.75",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true",
  },
  template: `<svg:path [attr.d]="path()" />`,
})
class Icon {
  readonly nalarIcon = input.required<IconName>();
  protected readonly path = computed(() => icons[this.nalarIcon()]);
}

@Component({
  selector: "template-nalar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  imports: [
    Badge,
    Button,
    Faq,
    Footer,
    Icon,
    Input,
    LogoCloud,
    Navbar,
    NgTemplateOutlet,
    Table,
    TabPanel,
    Tabs,
    Toaster,
    ToggleGroup,
  ],
  template: `
    <div id="top" [class]="root">
      <div [class]="shell">
        <div [class]="palette">
          <div [class]="navWrap">
            <header
              markas-navbar
              variant="floating"
              [class]="navbar"
              [links]="nav"
              (click)="closeMenuOnLink($event)"
            >
              <a brand href="#top" [class]="brandLink">
                <span [class]="brandMark"
                  ><svg nalarIcon="arc" class="size-4"></svg></span
                >Nalar
              </a>
              <ng-container actions>
                <a href="/login" [class]="signIn">Sign in</a>
                <a href="#start" [class]="startLink">Get started</a>
              </ng-container>
            </header>
          </div>

          <main>
            <section aria-labelledby="nalar-title" [class]="hero">
              <div aria-hidden="true" [class]="horizon"></div>
              <div [class]="heroCopy">
                <p [class]="chip">
                  <span [class]="chipTag">Beta</span>Nalar Agents are in early
                  access
                </p>
                <h1 id="nalar-title" [class]="h1">
                  Find the reason behind
                  <span [class]="h1Accent">every metric</span>
                </h1>
                <p [class]="heroText">
                  Nalar watches your revenue, product, and operations data,
                  explains what changed in plain language, and sends it to the
                  team that can act before the weekly report.
                </p>
                <div [class]="heroActions">
                  <a href="#start" [class]="heroCta"
                    >Get started<svg nalarIcon="arrow" class="size-4"></svg
                  ></a>
                  <a href="#how" [class]="heroGhost"
                    ><svg nalarIcon="play" class="size-4"></svg>Watch demo</a
                  >
                </div>
                <p [class]="heroNote">
                  Free for 3 data sources. No credit card needed.
                </p>
              </div>

              <div [class]="dashWrap">
                <div
                  role="group"
                  aria-label="Nalar dashboard preview"
                  [class]="dashFrame"
                >
                  <div [class]="dashGrid">
                    <div [class]="dashSide">
                      <div [class]="workspace">
                        <span aria-hidden="true" [class]="workspaceMark"
                          >SC</span
                        >
                        <div>
                          <p [class]="workspaceName">Sagara Commerce</p>
                          <p [class]="workspacePlan">Growth plan</p>
                        </div>
                      </div>
                      <ul [class]="sideNav">
                        @for (
                          item of sideLinks;
                          track item.label;
                          let i = $index
                        ) {
                          <li
                            [attr.aria-current]="i === 0 ? 'page' : null"
                            [class]="i === 0 ? sideItemActive : sideItem"
                          >
                            <svg
                              [nalarIcon]="item.icon"
                              [class]="i === 0 ? sideIconActive : sideIcon"
                            ></svg
                            >{{ item.label }}
                            @if (item.count) {
                              <span [class]="sideCount">{{ item.count }}</span>
                            }
                          </li>
                        }
                      </ul>
                    </div>

                    <div [class]="dashMain">
                      <div [class]="dashHead">
                        <div>
                          <p [class]="dashTitle">Revenue overview</p>
                          <p
                            data-range-sub=""
                            [class]="dashSub"
                            [textContent]="range().sub"
                          ></p>
                        </div>
                        <markas-toggle-group
                          #rangeGroup
                          label="Date range"
                          [items]="rangeItems"
                          [value]="rangeId()"
                          (valueChange)="pickRange($event)"
                        />
                      </div>
                      <dl [class]="kpiGrid">
                        @for (kpi of range().kpis; track kpi.label) {
                          <div [class]="kpiCard">
                            <dt [class]="kpiLabel">{{ kpi.label }}</dt>
                            <dd [class]="kpiRow">
                              <span [class]="kpiValue">{{ kpi.value }}</span>
                              <span markas-badge [variant]="kpi.tone">{{
                                kpi.delta
                              }}</span>
                            </dd>
                          </div>
                        }
                      </dl>
                      <div
                        [attr.data-range]="range().value"
                        [class]="chartCard"
                      >
                        <div [class]="chartHead">
                          <p [class]="chartTitle">Net revenue</p>
                          <p [class]="chartNote">{{ range().note }}</p>
                        </div>
                        <div aria-hidden="true" [class]="chartBars">
                          @for (
                            value of range().bars;
                            track range().value + "-" + $index;
                            let i = $index
                          ) {
                            <div
                              [class]="i === range().peak ? barPeak : bar"
                              [style.height.%]="value"
                            ></div>
                          }
                        </div>
                      </div>
                      <div
                        markas-table
                        label="Accounts to watch"
                        size="sm"
                        [columns]="accountColumns"
                        [rows]="accounts"
                        rowKey="account"
                        [cells]="{ signal: signalCell }"
                        [class]="dashTable"
                      ></div>
                      <ng-template #signalCell let-row>
                        <span markas-badge [variant]="row.tone">{{
                          row.signal
                        }}</span>
                      </ng-template>
                    </div>

                    <div [class]="dashPanel">
                      <div [class]="insightCard">
                        <p [class]="insightLabel">
                          <span aria-hidden="true" [class]="insightDot"></span
                          >Insight
                        </p>
                        <p [class]="insightTitle">
                          Repeat orders in Medan fell 18% this week
                        </p>
                        <p [class]="insightText">
                          Most of the drop comes from orders placed after the
                          courier switch on 3 November.
                        </p>
                        <ul [class]="driverList">
                          @for (driver of drivers; track driver.label) {
                            <li [class]="driverRow">
                              <p [class]="driverHead">
                                <span>{{ driver.label }}</span>
                                <span [class]="driverValue">{{
                                  driver.value
                                }}</span>
                              </p>
                              <div [class]="driverTrack">
                                <div
                                  [class]="driverBar"
                                  [style.width]="driver.width"
                                ></div>
                              </div>
                            </li>
                          }
                        </ul>
                        <button
                          markas-button
                          size="sm"
                          [class]="insightAction"
                          (click)="createAlert()"
                        >
                          Create alert
                        </button>
                      </div>
                      <p [class]="feedTitle">Recent alerts</p>
                      <ul [class]="feedList">
                        @for (item of feed; track item.text) {
                          <li [class]="feedItem">
                            <p [class]="feedText">{{ item.text }}</p>
                            <p [class]="feedTime">{{ item.time }}</p>
                          </li>
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div [class]="logoWrap">
              <markas-logo-cloud
                title="Data teams at retailers, marketplaces, and logistics companies ask Nalar first"
                [logos]="logos"
                variant="row"
              />
            </div>

            <section
              id="features"
              aria-labelledby="nalar-features"
              [class]="section"
            >
              <div [class]="sectionHead">
                <h2 id="nalar-features" [class]="h2">
                  Everything between a question and the fix
                </h2>
                <p [class]="lead">
                  Nalar does the digging an analyst would do on a slow week,
                  every hour, on every metric you care about.
                </p>
              </div>
              <ul [class]="featureGrid">
                <li [class]="featureWide">
                  <div aria-hidden="true" [class]="featureArt">
                    <p [class]="askBubble">
                      Why did repeat orders drop in Medan?
                    </p>
                    <div [class]="answerBubble">
                      <p>
                        Delivery time rose from 2.1 to 3.4 days after the
                        courier switch on 3 Nov. It explains 71% of the drop.
                      </p>
                      <p [class]="answerSource">
                        From orders, shipments, and courier_events
                      </p>
                    </div>
                  </div>
                  <div>
                    <span [class]="featureIcon"
                      ><svg nalarIcon="bulb" class="size-5"></svg
                    ></span>
                    <h3 [class]="featureTitle">Answers in plain language</h3>
                    <p [class]="featureText">
                      Ask why a number moved. Nalar reads the tables behind it,
                      tests the likely causes, and replies with the two or three
                      that explain most of the change.
                    </p>
                  </div>
                </li>
                <li [class]="featureCard">
                  <div aria-hidden="true" [class]="featureArt">
                    @for (item of alerts; track item.text) {
                      <div [class]="alertRow">
                        <div>
                          <span markas-badge [variant]="item.tone">{{
                            item.badge
                          }}</span>
                          <p [class]="alertText">{{ item.text }}</p>
                        </div>
                        <span [class]="alertTime">{{ item.time }}</span>
                      </div>
                    }
                  </div>
                  <div>
                    <span [class]="featureIcon"
                      ><svg nalarIcon="bell" class="size-5"></svg
                    ></span>
                    <h3 [class]="featureTitle">
                      Alerts that explain themselves
                    </h3>
                    <p [class]="featureText">
                      Thresholds and anomaly checks on any metric, with the
                      likely cause attached, so the person on call knows where
                      to look first.
                    </p>
                  </div>
                </li>
                <li [class]="featureCard">
                  <div aria-hidden="true" [class]="featureArt">
                    <ol [class]="flowList">
                      @for (text of flowSteps; track text; let i = $index) {
                        <li>
                          @if (i > 0) {
                            <div [class]="flowLink"></div>
                          }
                          <p
                            [class]="
                              i === flowSteps.length - 1
                                ? flowStepLast
                                : flowStep
                            "
                          >
                            <span [class]="flowNumber">{{ i + 1 }}</span
                            >{{ text }}
                          </p>
                        </li>
                      }
                    </ol>
                  </div>
                  <div>
                    <span [class]="featureIcon"
                      ><svg nalarIcon="flow" class="size-5"></svg
                    ></span>
                    <h3 [class]="featureTitle">
                      Workflows that close the loop
                    </h3>
                    <p [class]="featureText">
                      Post to a team channel, open a ticket, or pause an ad
                      campaign. Every action is logged with the data that
                      triggered it.
                    </p>
                  </div>
                </li>
                <li [class]="featureWide">
                  <div aria-hidden="true" [class]="featureArt">
                    <ul [class]="sourceGrid">
                      @for (source of sources; track source) {
                        <li [class]="sourceChip">
                          <svg nalarIcon="database" [class]="sourceIcon"></svg
                          >{{ source }}<span [class]="sourceDot"></span>
                        </li>
                      }
                    </ul>
                  </div>
                  <div>
                    <span [class]="featureIcon"
                      ><svg nalarIcon="database" class="size-5"></svg
                    ></span>
                    <h3 [class]="featureTitle">
                      Connects to the data you already have
                    </h3>
                    <p [class]="featureText">
                      Read-only connections to warehouses, databases, and
                      spreadsheets. Most teams are live in an afternoon, without
                      moving a single table.
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section id="how" aria-labelledby="nalar-how" [class]="section">
              <div [class]="sectionHead">
                <h2 id="nalar-how" [class]="h2">
                  From raw tables to a decision in three steps
                </h2>
                <p [class]="lead">
                  Use the CLI, the web app, or both. Everything you set up in
                  one shows up in the other.
                </p>
              </div>
              <markas-tabs
                [class]="howTabs"
                defaultValue="connect"
                [items]="stepItems"
              >
                <ng-template markasTabPanel="connect">
                  <ng-container
                    *ngTemplateOutlet="
                      stepTpl;
                      context: { $implicit: steps[0] }
                    "
                  />
                </ng-template>
                <ng-template markasTabPanel="ask">
                  <ng-container
                    *ngTemplateOutlet="
                      stepTpl;
                      context: { $implicit: steps[1] }
                    "
                  />
                </ng-template>
                <ng-template markasTabPanel="automate">
                  <ng-container
                    *ngTemplateOutlet="
                      stepTpl;
                      context: { $implicit: steps[2] }
                    "
                  />
                </ng-template>
              </markas-tabs>
              <ng-template #stepTpl let-step>
                <div [class]="howPanel">
                  <div>
                    <h3 [class]="howTitle">{{ step.title }}</h3>
                    <p [class]="howText">{{ step.text }}</p>
                  </div>
                  <div [class]="terminal">
                    <p [class]="terminalHead">
                      <span [class]="terminalTitle"
                        ><svg nalarIcon="terminal" [class]="terminalIcon"></svg
                        >Terminal</span
                      >
                      <span>{{ step.file }}</span>
                    </p>
                    <div [class]="terminalBody">
                      @for (line of step.lines; track line.text) {
                        <p [class]="lineClass[line.kind]">
                          @if (line.kind === "cmd") {
                            <span aria-hidden="true" [class]="linePrompt"
                              >$</span
                            >
                          }
                          <span [textContent]="line.text"></span>
                        </p>
                      }
                    </div>
                  </div>
                </div>
              </ng-template>
            </section>

            <section
              id="customers"
              aria-labelledby="nalar-customers"
              [class]="section"
            >
              <div [class]="sectionHead">
                <h2 id="nalar-customers" [class]="h2">
                  Teams that stopped waiting for the Monday report
                </h2>
              </div>
              <div [class]="storyCard">
                <figure>
                  <blockquote [class]="storyQuote">
                    We used to spend Monday morning arguing about why a number
                    moved. Now the reason is in the channel before anyone asks,
                    and the meeting is about what to do next.
                  </blockquote>
                  <figcaption [class]="person">
                    <img
                      src="/template-images/nalar/clara.webp"
                      alt=""
                      width="48"
                      height="48"
                      loading="lazy"
                      decoding="async"
                      [class]="photoLg"
                    />
                    <div>
                      <p [class]="personName">Clara Wijaya</p>
                      <p [class]="personRole">
                        Head of Growth, Sagara Commerce
                      </p>
                    </div>
                  </figcaption>
                </figure>
                <dl [class]="metricList">
                  @for (item of metrics; track item.label) {
                    <div [class]="metric">
                      <dt [class]="metricLabel">{{ item.label }}</dt>
                      <dd [class]="metricValue">{{ item.value }}</dd>
                    </div>
                  }
                </dl>
              </div>
              <ul [class]="quoteGrid">
                @for (quote of quotes; track quote.name) {
                  <li [class]="quoteCard">
                    <blockquote [class]="quoteText">
                      {{ quote.text }}
                    </blockquote>
                    <div [class]="person">
                      <img
                        [src]="quote.photo"
                        alt=""
                        width="40"
                        height="40"
                        loading="lazy"
                        decoding="async"
                        [class]="photoMd"
                      />
                      <div>
                        <p [class]="personName">{{ quote.name }}</p>
                        <p [class]="personRole">{{ quote.role }}</p>
                      </div>
                    </div>
                  </li>
                }
              </ul>
            </section>

            <section
              id="pricing"
              aria-labelledby="nalar-pricing"
              [class]="section"
            >
              <div [class]="pricingHead">
                <div [class]="sectionHead">
                  <h2 id="nalar-pricing" [class]="h2">
                    Pricing that grows with your data
                  </h2>
                  <p [class]="lead">
                    Start free on three sources. Upgrade when Nalar is part of
                    how your team works.
                  </p>
                </div>
                <markas-toggle-group
                  #periodGroup
                  label="Billing period"
                  [items]="billing"
                  [value]="period()"
                  (valueChange)="pickPeriod($event)"
                />
              </div>
              <ul [attr.data-billing]="period()" [class]="planGrid">
                @for (plan of plans; track plan.name) {
                  <li [class]="plan.featured ? planFeatured : planCard">
                    <div [class]="planTop">
                      <h3 [class]="planName">{{ plan.name }}</h3>
                      @if (plan.featured) {
                        <span markas-badge variant="primary">{{
                          plan.featured
                        }}</span>
                      }
                    </div>
                    <p [class]="planPrice">{{ priceOf(plan, period()) }}</p>
                    <p [class]="planUnit">{{ unitOf(plan, period()) }}</p>
                    <p [class]="planDesc">{{ plan.desc }}</p>
                    <ul [class]="planList">
                      @for (feature of plan.features; track feature) {
                        <li [class]="planItem">
                          <svg nalarIcon="check" [class]="planIcon"></svg
                          >{{ feature }}
                        </li>
                      }
                    </ul>
                    <div [class]="planSpacer"></div>
                    <a
                      href="#start"
                      [class]="plan.featured ? planCtaFeatured : planCta"
                      >{{ plan.cta }}</a
                    >
                  </li>
                }
              </ul>
            </section>

            <section id="faq" aria-labelledby="nalar-faq" [class]="faqLayout">
              <div [class]="faqAside">
                <h2 id="nalar-faq" [class]="h2">
                  Questions before you connect
                </h2>
                <p [class]="lead">
                  Talk to the engineers who build Nalar, not a sales script.
                </p>
                <button markas-button variant="secondary" (click)="bookCall()">
                  Book a 20 minute call
                </button>
              </div>
              <markas-faq [items]="faqs" exclusive [class]="faqList" />
            </section>

            <section id="start" aria-labelledby="nalar-start" [class]="ctaWrap">
              <div [class]="ctaCard">
                <div [class]="sectionHead">
                  <h2 id="nalar-start" [class]="h2">
                    Put Nalar on your own data this week
                  </h2>
                  <p [class]="lead">
                    Early access is open for teams in Indonesia and Southeast
                    Asia. Connect a source, ask the first question, and keep
                    everything you build.
                  </p>
                </div>
                <form [class]="ctaForm" novalidate (submit)="submit($event)">
                  <label [for]="FORM_ID + '-email'" [class]="fieldLabel"
                    >Work email</label
                  >
                  <div [class]="fieldRow">
                    <div [class]="fieldWrap">
                      <markas-input
                        [(value)]="email"
                        [id]="FORM_ID + '-email'"
                        type="email"
                        name="email"
                        autocomplete="email"
                        placeholder="nama&#64;perusahaan.co.id"
                        [aria-invalid]="error() ? true : undefined"
                        [aria-describedby]="
                          error() ? FORM_ID + '-error' : undefined
                        "
                      />
                      @if (error()) {
                        <p
                          [id]="FORM_ID + '-error'"
                          [class]="fieldError"
                          [textContent]="error()"
                        ></p>
                      }
                    </div>
                    <button markas-button type="submit">Request access</button>
                  </div>
                  <p [class]="ctaNote">
                    Free for 3 sources. No credit card needed.
                  </p>
                </form>
              </div>
            </section>
          </main>

          <footer
            markas-footer
            [class]="footer"
            description="Nalar explains what changed in your business data and sends it to the team that can act."
            [columns]="footerColumns"
            [legal]="legal"
            copyright="© 2026 Nalar. Built with MarkasUI."
          >
            <a brand href="#top" [class]="brandLink">
              <span [class]="brandMark"
                ><svg nalarIcon="arc" class="size-4"></svg></span
              >Nalar
            </a>
          </footer>
          <markas-toaster />
        </div>
      </div>
    </div>
  `,
})
export default class Nalar {
  protected readonly focusRing = focusRing;
  protected readonly root = root;
  protected readonly shell = shell;
  protected readonly palette = palette;
  protected readonly container = container;
  protected readonly footerEdge = footerEdge;
  protected readonly navWrap = navWrap;
  protected readonly navbar = navbar;
  protected readonly brandLink = brandLink;
  protected readonly brandMark = brandMark;
  protected readonly signIn = signIn;
  protected readonly startLink = startLink;
  protected readonly hero = hero;
  protected readonly horizon = horizon;
  protected readonly heroCopy = heroCopy;
  protected readonly chip = chip;
  protected readonly chipTag = chipTag;
  protected readonly h1 = h1;
  protected readonly h1Accent = h1Accent;
  protected readonly heroText = heroText;
  protected readonly heroActions = heroActions;
  protected readonly heroCta = heroCta;
  protected readonly heroGhost = heroGhost;
  protected readonly heroNote = heroNote;
  protected readonly dashWrap = dashWrap;
  protected readonly dashFrame = dashFrame;
  protected readonly dashGrid = dashGrid;
  protected readonly dashSide = dashSide;
  protected readonly workspace = workspace;
  protected readonly workspaceMark = workspaceMark;
  protected readonly workspaceName = workspaceName;
  protected readonly workspacePlan = workspacePlan;
  protected readonly sideNav = sideNav;
  protected readonly sideItem = sideItem;
  protected readonly sideItemActive = sideItemActive;
  protected readonly sideIcon = sideIcon;
  protected readonly sideIconActive = sideIconActive;
  protected readonly sideCount = sideCount;
  protected readonly dashMain = dashMain;
  protected readonly dashHead = dashHead;
  protected readonly dashTitle = dashTitle;
  protected readonly dashSub = dashSub;
  protected readonly kpiGrid = kpiGrid;
  protected readonly kpiCard = kpiCard;
  protected readonly kpiLabel = kpiLabel;
  protected readonly kpiRow = kpiRow;
  protected readonly kpiValue = kpiValue;
  protected readonly chartCard = chartCard;
  protected readonly chartHead = chartHead;
  protected readonly chartTitle = chartTitle;
  protected readonly chartNote = chartNote;
  protected readonly chartBars = chartBars;
  protected readonly bar = bar;
  protected readonly barPeak = barPeak;
  protected readonly dashTable = dashTable;
  protected readonly dashPanel = dashPanel;
  protected readonly insightCard = insightCard;
  protected readonly insightLabel = insightLabel;
  protected readonly insightDot = insightDot;
  protected readonly insightTitle = insightTitle;
  protected readonly insightText = insightText;
  protected readonly driverList = driverList;
  protected readonly driverRow = driverRow;
  protected readonly driverHead = driverHead;
  protected readonly driverValue = driverValue;
  protected readonly driverTrack = driverTrack;
  protected readonly driverBar = driverBar;
  protected readonly insightAction = insightAction;
  protected readonly feedTitle = feedTitle;
  protected readonly feedList = feedList;
  protected readonly feedItem = feedItem;
  protected readonly feedText = feedText;
  protected readonly feedTime = feedTime;
  protected readonly logoWrap = logoWrap;
  protected readonly section = section;
  protected readonly sectionHead = sectionHead;
  protected readonly h2 = h2;
  protected readonly lead = lead;
  protected readonly featureGrid = featureGrid;
  protected readonly featureCard = featureCard;
  protected readonly featureWide = featureWide;
  protected readonly featureArt = featureArt;
  protected readonly featureIcon = featureIcon;
  protected readonly featureTitle = featureTitle;
  protected readonly featureText = featureText;
  protected readonly askBubble = askBubble;
  protected readonly answerBubble = answerBubble;
  protected readonly answerSource = answerSource;
  protected readonly alertRow = alertRow;
  protected readonly alertText = alertText;
  protected readonly alertTime = alertTime;
  protected readonly flowList = flowList;
  protected readonly flowStep = flowStep;
  protected readonly flowStepLast = flowStepLast;
  protected readonly flowNumber = flowNumber;
  protected readonly flowLink = flowLink;
  protected readonly sourceGrid = sourceGrid;
  protected readonly sourceChip = sourceChip;
  protected readonly sourceDot = sourceDot;
  protected readonly sourceIcon = sourceIcon;
  protected readonly howTabs = howTabs;
  protected readonly howPanel = howPanel;
  protected readonly howTitle = howTitle;
  protected readonly howText = howText;
  protected readonly terminal = terminal;
  protected readonly terminalHead = terminalHead;
  protected readonly terminalTitle = terminalTitle;
  protected readonly terminalIcon = terminalIcon;
  protected readonly terminalBody = terminalBody;
  protected readonly lineCmd = lineCmd;
  protected readonly linePrompt = linePrompt;
  protected readonly lineOut = lineOut;
  protected readonly lineOk = lineOk;
  protected readonly storyCard = storyCard;
  protected readonly storyQuote = storyQuote;
  protected readonly person = person;
  protected readonly photoLg = photoLg;
  protected readonly photoMd = photoMd;
  protected readonly personName = personName;
  protected readonly personRole = personRole;
  protected readonly metricList = metricList;
  protected readonly metric = metric;
  protected readonly metricValue = metricValue;
  protected readonly metricLabel = metricLabel;
  protected readonly quoteGrid = quoteGrid;
  protected readonly quoteCard = quoteCard;
  protected readonly quoteText = quoteText;
  protected readonly pricingHead = pricingHead;
  protected readonly planGrid = planGrid;
  protected readonly planCard = planCard;
  protected readonly planFeatured = planFeatured;
  protected readonly planTop = planTop;
  protected readonly planName = planName;
  protected readonly planPrice = planPrice;
  protected readonly planUnit = planUnit;
  protected readonly planDesc = planDesc;
  protected readonly planList = planList;
  protected readonly planItem = planItem;
  protected readonly planIcon = planIcon;
  protected readonly planCta = planCta;
  protected readonly planCtaFeatured = planCtaFeatured;
  protected readonly planSpacer = planSpacer;
  protected readonly faqLayout = faqLayout;
  protected readonly faqAside = faqAside;
  protected readonly faqList = faqList;
  protected readonly ctaWrap = ctaWrap;
  protected readonly ctaCard = ctaCard;
  protected readonly ctaForm = ctaForm;
  protected readonly fieldLabel = fieldLabel;
  protected readonly fieldRow = fieldRow;
  protected readonly fieldWrap = fieldWrap;
  protected readonly fieldError = fieldError;
  protected readonly ctaNote = ctaNote;
  protected readonly footer = footer;
  protected readonly icons = icons;
  protected readonly FORM_ID = FORM_ID;
  protected readonly EMAIL_PATTERN = EMAIL_PATTERN;
  protected readonly EMAIL_ERROR = EMAIL_ERROR;
  protected readonly nav = nav;
  protected readonly sideLinks = sideLinks;
  protected readonly ranges = ranges;
  protected readonly accountColumns = accountColumns;
  protected readonly accounts = accounts;
  protected readonly drivers = drivers;
  protected readonly feed = feed;
  protected readonly logos = logos;
  protected readonly alerts = alerts;
  protected readonly flowSteps = flowSteps;
  protected readonly sources = sources;
  protected readonly steps = steps;
  protected readonly metrics = metrics;
  protected readonly quotes = quotes;
  protected readonly billing = billing;
  protected readonly plans = plans;
  protected readonly faqs = faqs;
  protected readonly footerColumns = footerColumns;
  protected readonly legal = legal;
  protected readonly lineClass = lineClass;
  protected readonly rangeOf = rangeOf;
  protected readonly priceOf = priceOf;
  protected readonly unitOf = unitOf;
  protected readonly rangeItems = rangeItems;
  protected readonly stepItems = stepItems;
  private readonly rangeGroup = viewChild<ToggleGroup>("rangeGroup");
  private readonly periodGroup = viewChild<ToggleGroup>("periodGroup");
  protected readonly rangeId = signal<RangeId>("30d");
  protected readonly period = signal<BillingId>("monthly");
  protected readonly range = computed(() => rangeOf(this.rangeId()));
  protected readonly email = signal("");
  protected readonly error = signal("");

  /** ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; kembalikan supaya selalu ada pilihan. */
  protected pickRange(value: string | string[] | undefined) {
    if (typeof value === "string" && value) this.rangeId.set(value as RangeId);
    else this.rangeGroup()?.value.set(this.rangeId());
  }
  protected pickPeriod(value: string | string[] | undefined) {
    if (typeof value === "string" && value) this.period.set(value as BillingId);
    else this.periodGroup()?.value.set(this.period());
  }
  /** Navbar tidak menutup menu mobile saat link di-klik; tutup lewat tombolnya sendiri. */
  protected closeMenuOnLink(event: MouseEvent) {
    const link = (event.target as Element).closest("a");
    const toggle = (
      event.currentTarget as HTMLElement
    ).querySelector<HTMLButtonElement>("button[aria-expanded=true]");
    if (link?.closest("[data-state=open]") && toggle) toggle.click();
  }
  protected createAlert() {
    toast({
      title: "Alert created",
      description:
        "Nalar will post to #ops-medan when repeat orders in Medan drop again.",
      variant: "success",
    });
  }
  protected bookCall() {
    toast({
      title: "Call requested",
      description:
        "An engineer will email you a time slot within one working day.",
    });
  }
  protected submit(event: Event) {
    event.preventDefault();
    const value = this.email().trim();
    if (!EMAIL_PATTERN.test(value)) {
      this.error.set(EMAIL_ERROR);
      return;
    }
    this.error.set("");
    toast({
      title: "You are on the list",
      description: `We sent setup steps to ${value}. Most teams connect their first source within a day.`,
      variant: "success",
    });
    this.email.set("");
  }
}
