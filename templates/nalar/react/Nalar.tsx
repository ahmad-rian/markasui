"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { Badge } from "../../../components/badge/Badge";
import { Button } from "../../../components/button/Button";
import { Faq } from "../../../components/faq/Faq";
import { Footer } from "../../../components/footer/Footer";
import { Input } from "../../../components/input/Input";
import { LogoCloud } from "../../../components/logo-cloud/LogoCloud";
import { Navbar } from "../../../components/navbar/Navbar";
import { Table, type TableRow } from "../../../components/table/Table";
import { Tabs } from "../../../components/tabs/Tabs";
import { Toaster, toast } from "../../../components/toast/Toast";
import { ToggleGroup } from "../../../components/toggle-group/ToggleGroup";

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

function Icon({ name, className }: { name: IconName; className: string }) {
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

function Brand() {
  return (
    <a href="#top" className={brandLink}>
      <span className={brandMark}>
        <Icon name="arc" className="size-4" />
      </span>
      Nalar
    </a>
  );
}

function StepPanel({ step }: { step: (typeof steps)[number] }) {
  return (
    <div className={howPanel}>
      <div>
        <h3 className={howTitle}>{step.title}</h3>
        <p className={howText}>{step.text}</p>
      </div>
      <div className={terminal}>
        <p className={terminalHead}>
          <span className={terminalTitle}>
            <Icon name="terminal" className={terminalIcon} />
            Terminal
          </span>
          <span>{step.file}</span>
        </p>
        <div className={terminalBody}>
          {step.lines.map((line) => (
            <p key={line.text} className={lineClass[line.kind]}>
              {line.kind === "cmd" && (
                <span aria-hidden="true" className={linePrompt}>
                  $
                </span>
              )}
              {line.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccessForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setError(EMAIL_ERROR);
      return;
    }
    setError("");
    toast({
      title: "You are on the list",
      description: `We sent setup steps to ${value}. Most teams connect their first source within a day.`,
      variant: "success",
    });
    setEmail("");
  };
  return (
    <form className={ctaForm} noValidate onSubmit={submit}>
      <label htmlFor={`${FORM_ID}-email`} className={fieldLabel}>
        Work email
      </label>
      <div className={fieldRow}>
        <div className={fieldWrap}>
          <Input
            id={`${FORM_ID}-email`}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="nama@perusahaan.co.id"
            value={email}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${FORM_ID}-error` : undefined}
            onChange={(event) => setEmail(event.target.value)}
          />
          {error && (
            <p id={`${FORM_ID}-error`} className={fieldError}>
              {error}
            </p>
          )}
        </div>
        <Button type="submit">Request access</Button>
      </div>
      <p className={ctaNote}>Free for 3 sources. No credit card needed.</p>
    </form>
  );
}

export default function Nalar() {
  const [rangeId, setRangeId] = useState<RangeId>("30d");
  const [period, setPeriod] = useState<BillingId>("monthly");
  const range = rangeOf(rangeId);

  /** Navbar tidak menutup menu mobile saat link di-klik; tutup lewat tombolnya sendiri. */
  const closeMenuOnLink = (event: MouseEvent<HTMLElement>) => {
    const link = (event.target as Element).closest("a");
    const toggle = event.currentTarget.querySelector<HTMLButtonElement>(
      "button[aria-expanded=true]",
    );
    if (link?.closest("[data-state=open]") && toggle) toggle.click();
  };
  const createAlert = () =>
    toast({
      title: "Alert created",
      description:
        "Nalar will post to #ops-medan when repeat orders in Medan drop again.",
      variant: "success",
    });
  const bookCall = () =>
    toast({
      title: "Call requested",
      description:
        "An engineer will email you a time slot within one working day.",
    });
  const signalCell = (row: TableRow, key: string) =>
    key === "signal" ? (
      <Badge variant={row.tone as "danger"}>{row.signal}</Badge>
    ) : undefined;

  return (
    <div id="top" className={root}>
      <div className={shell}>
        <div className={palette}>
          <div className={navWrap}>
            <Navbar
              variant="floating"
              className={navbar}
              brand={<Brand />}
              links={nav}
              onClick={closeMenuOnLink}
              actions={
                <>
                  <a href="/login" className={signIn}>
                    Sign in
                  </a>
                  <a href="#start" className={startLink}>
                    Get started
                  </a>
                </>
              }
            />
          </div>

          <main>
            <section aria-labelledby="nalar-title" className={hero}>
              <div aria-hidden="true" className={horizon} />
              <div className={heroCopy}>
                <p className={chip}>
                  <span className={chipTag}>Beta</span>
                  Nalar Agents are in early access
                </p>
                <h1 id="nalar-title" className={h1}>
                  Find the reason behind{" "}
                  <span className={h1Accent}>every metric</span>
                </h1>
                <p className={heroText}>
                  Nalar watches your revenue, product, and operations data,
                  explains what changed in plain language, and sends it to the
                  team that can act before the weekly report.
                </p>
                <div className={heroActions}>
                  <a href="#start" className={heroCta}>
                    Get started
                    <Icon name="arrow" className="size-4" />
                  </a>
                  <a href="#how" className={heroGhost}>
                    <Icon name="play" className="size-4" />
                    Watch demo
                  </a>
                </div>
                <p className={heroNote}>
                  Free for 3 data sources. No credit card needed.
                </p>
              </div>

              <div className={dashWrap}>
                <div
                  role="group"
                  aria-label="Nalar dashboard preview"
                  className={dashFrame}
                >
                  <div className={dashGrid}>
                    <div className={dashSide}>
                      <div className={workspace}>
                        <span aria-hidden="true" className={workspaceMark}>
                          SC
                        </span>
                        <div>
                          <p className={workspaceName}>Sagara Commerce</p>
                          <p className={workspacePlan}>Growth plan</p>
                        </div>
                      </div>
                      <ul className={sideNav}>
                        {sideLinks.map((item, index) => (
                          <li
                            key={item.label}
                            aria-current={index === 0 ? "page" : undefined}
                            className={index === 0 ? sideItemActive : sideItem}
                          >
                            <Icon
                              name={item.icon}
                              className={
                                index === 0 ? sideIconActive : sideIcon
                              }
                            />
                            {item.label}
                            {item.count && (
                              <span className={sideCount}>{item.count}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={dashMain}>
                      <div className={dashHead}>
                        <div>
                          <p className={dashTitle}>Revenue overview</p>
                          <p data-range-sub="" className={dashSub}>
                            {range.sub}
                          </p>
                        </div>
                        <ToggleGroup
                          label="Date range"
                          items={ranges.map(({ value, label }) => ({
                            value,
                            label,
                          }))}
                          value={rangeId}
                          onValueChange={(value) =>
                            value && setRangeId(value as RangeId)
                          }
                        />
                      </div>
                      <dl className={kpiGrid}>
                        {range.kpis.map((kpi) => (
                          <div key={kpi.label} className={kpiCard}>
                            <dt className={kpiLabel}>{kpi.label}</dt>
                            <dd className={kpiRow}>
                              <span className={kpiValue}>{kpi.value}</span>
                              <Badge variant={kpi.tone}>{kpi.delta}</Badge>
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <div data-range={range.value} className={chartCard}>
                        <div className={chartHead}>
                          <p className={chartTitle}>Net revenue</p>
                          <p className={chartNote}>{range.note}</p>
                        </div>
                        <div aria-hidden="true" className={chartBars}>
                          {range.bars.map((value, index) => (
                            <div
                              key={`${range.value}-${index}`}
                              className={index === range.peak ? barPeak : bar}
                              style={{ height: `${value}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <Table
                        label="Accounts to watch"
                        size="sm"
                        columns={accountColumns}
                        rows={accounts}
                        rowKey="account"
                        renderCell={signalCell}
                        className={dashTable}
                      />
                    </div>

                    <div className={dashPanel}>
                      <div className={insightCard}>
                        <p className={insightLabel}>
                          <span aria-hidden="true" className={insightDot} />
                          Insight
                        </p>
                        <p className={insightTitle}>
                          Repeat orders in Medan fell 18% this week
                        </p>
                        <p className={insightText}>
                          Most of the drop comes from orders placed after the
                          courier switch on 3 November.
                        </p>
                        <ul className={driverList}>
                          {drivers.map((driver) => (
                            <li key={driver.label} className={driverRow}>
                              <p className={driverHead}>
                                <span>{driver.label}</span>
                                <span className={driverValue}>
                                  {driver.value}
                                </span>
                              </p>
                              <div className={driverTrack}>
                                <div
                                  className={driverBar}
                                  style={{ width: driver.width }}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                        <Button
                          size="sm"
                          className={insightAction}
                          onClick={createAlert}
                        >
                          Create alert
                        </Button>
                      </div>
                      <p className={feedTitle}>Recent alerts</p>
                      <ul className={feedList}>
                        {feed.map((item) => (
                          <li key={item.text} className={feedItem}>
                            <p className={feedText}>{item.text}</p>
                            <p className={feedTime}>{item.time}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className={logoWrap}>
              <LogoCloud
                title="Data teams at retailers, marketplaces, and logistics companies ask Nalar first"
                logos={logos}
                variant="row"
              />
            </div>

            <section
              id="features"
              aria-labelledby="nalar-features"
              className={section}
            >
              <div className={sectionHead}>
                <h2 id="nalar-features" className={h2}>
                  Everything between a question and the fix
                </h2>
                <p className={lead}>
                  Nalar does the digging an analyst would do on a slow week,
                  every hour, on every metric you care about.
                </p>
              </div>
              <ul className={featureGrid}>
                <li className={featureWide}>
                  <div aria-hidden="true" className={featureArt}>
                    <p className={askBubble}>
                      Why did repeat orders drop in Medan?
                    </p>
                    <div className={answerBubble}>
                      <p>
                        Delivery time rose from 2.1 to 3.4 days after the
                        courier switch on 3 Nov. It explains 71% of the drop.
                      </p>
                      <p className={answerSource}>
                        From orders, shipments, and courier_events
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className={featureIcon}>
                      <Icon name="bulb" className="size-5" />
                    </span>
                    <h3 className={featureTitle}>Answers in plain language</h3>
                    <p className={featureText}>
                      Ask why a number moved. Nalar reads the tables behind it,
                      tests the likely causes, and replies with the two or three
                      that explain most of the change.
                    </p>
                  </div>
                </li>
                <li className={featureCard}>
                  <div aria-hidden="true" className={featureArt}>
                    {alerts.map((item) => (
                      <div key={item.text} className={alertRow}>
                        <div>
                          <Badge variant={item.tone}>{item.badge}</Badge>
                          <p className={alertText}>{item.text}</p>
                        </div>
                        <span className={alertTime}>{item.time}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <span className={featureIcon}>
                      <Icon name="bell" className="size-5" />
                    </span>
                    <h3 className={featureTitle}>
                      Alerts that explain themselves
                    </h3>
                    <p className={featureText}>
                      Thresholds and anomaly checks on any metric, with the
                      likely cause attached, so the person on call knows where
                      to look first.
                    </p>
                  </div>
                </li>
                <li className={featureCard}>
                  <div aria-hidden="true" className={featureArt}>
                    <ol className={flowList}>
                      {flowSteps.map((text, index) => (
                        <li key={text}>
                          {index > 0 && <div className={flowLink} />}
                          <p
                            className={
                              index === flowSteps.length - 1
                                ? flowStepLast
                                : flowStep
                            }
                          >
                            <span className={flowNumber}>{index + 1}</span>
                            {text}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <span className={featureIcon}>
                      <Icon name="flow" className="size-5" />
                    </span>
                    <h3 className={featureTitle}>
                      Workflows that close the loop
                    </h3>
                    <p className={featureText}>
                      Post to a team channel, open a ticket, or pause an ad
                      campaign. Every action is logged with the data that
                      triggered it.
                    </p>
                  </div>
                </li>
                <li className={featureWide}>
                  <div aria-hidden="true" className={featureArt}>
                    <ul className={sourceGrid}>
                      {sources.map((source) => (
                        <li key={source} className={sourceChip}>
                          <Icon name="database" className={sourceIcon} />
                          {source}
                          <span className={sourceDot} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className={featureIcon}>
                      <Icon name="database" className="size-5" />
                    </span>
                    <h3 className={featureTitle}>
                      Connects to the data you already have
                    </h3>
                    <p className={featureText}>
                      Read-only connections to warehouses, databases, and
                      spreadsheets. Most teams are live in an afternoon, without
                      moving a single table.
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section id="how" aria-labelledby="nalar-how" className={section}>
              <div className={sectionHead}>
                <h2 id="nalar-how" className={h2}>
                  From raw tables to a decision in three steps
                </h2>
                <p className={lead}>
                  Use the CLI, the web app, or both. Everything you set up in
                  one shows up in the other.
                </p>
              </div>
              <Tabs
                className={howTabs}
                defaultValue="connect"
                items={steps.map((step) => ({
                  value: step.value,
                  label: step.label,
                  content: <StepPanel step={step} />,
                }))}
              />
            </section>

            <section
              id="customers"
              aria-labelledby="nalar-customers"
              className={section}
            >
              <div className={sectionHead}>
                <h2 id="nalar-customers" className={h2}>
                  Teams that stopped waiting for the Monday report
                </h2>
              </div>
              <div className={storyCard}>
                <figure>
                  <blockquote className={storyQuote}>
                    We used to spend Monday morning arguing about why a number
                    moved. Now the reason is in the channel before anyone asks,
                    and the meeting is about what to do next.
                  </blockquote>
                  <figcaption className={person}>
                    <img
                      src="/template-images/nalar/clara.webp"
                      alt=""
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      className={photoLg}
                    />
                    <div>
                      <p className={personName}>Clara Wijaya</p>
                      <p className={personRole}>
                        Head of Growth, Sagara Commerce
                      </p>
                    </div>
                  </figcaption>
                </figure>
                <dl className={metricList}>
                  {metrics.map((item) => (
                    <div key={item.label} className={metric}>
                      <dt className={metricLabel}>{item.label}</dt>
                      <dd className={metricValue}>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <ul className={quoteGrid}>
                {quotes.map((quote) => (
                  <li key={quote.name} className={quoteCard}>
                    <blockquote className={quoteText}>{quote.text}</blockquote>
                    <div className={person}>
                      <img
                        src={quote.photo}
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                        className={photoMd}
                      />
                      <div>
                        <p className={personName}>{quote.name}</p>
                        <p className={personRole}>{quote.role}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section
              id="pricing"
              aria-labelledby="nalar-pricing"
              className={section}
            >
              <div className={pricingHead}>
                <div className={sectionHead}>
                  <h2 id="nalar-pricing" className={h2}>
                    Pricing that grows with your data
                  </h2>
                  <p className={lead}>
                    Start free on three sources. Upgrade when Nalar is part of
                    how your team works.
                  </p>
                </div>
                <ToggleGroup
                  label="Billing period"
                  items={billing}
                  value={period}
                  onValueChange={(value) =>
                    value && setPeriod(value as BillingId)
                  }
                />
              </div>
              <ul data-billing={period} className={planGrid}>
                {plans.map((plan) => (
                  <li
                    key={plan.name}
                    className={plan.featured ? planFeatured : planCard}
                  >
                    <div className={planTop}>
                      <h3 className={planName}>{plan.name}</h3>
                      {plan.featured && (
                        <Badge variant="primary">{plan.featured}</Badge>
                      )}
                    </div>
                    <p className={planPrice}>{priceOf(plan, period)}</p>
                    <p className={planUnit}>{unitOf(plan, period)}</p>
                    <p className={planDesc}>{plan.desc}</p>
                    <ul className={planList}>
                      {plan.features.map((feature) => (
                        <li key={feature} className={planItem}>
                          <Icon name="check" className={planIcon} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className={planSpacer} />
                    <a
                      href="#start"
                      className={plan.featured ? planCtaFeatured : planCta}
                    >
                      {plan.cta}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section id="faq" aria-labelledby="nalar-faq" className={faqLayout}>
              <div className={faqAside}>
                <h2 id="nalar-faq" className={h2}>
                  Questions before you connect
                </h2>
                <p className={lead}>
                  Talk to the engineers who build Nalar, not a sales script.
                </p>
                <Button variant="secondary" onClick={bookCall}>
                  Book a 20 minute call
                </Button>
              </div>
              <Faq items={faqs} exclusive className={faqList} />
            </section>

            <section
              id="start"
              aria-labelledby="nalar-start"
              className={ctaWrap}
            >
              <div className={ctaCard}>
                <div className={sectionHead}>
                  <h2 id="nalar-start" className={h2}>
                    Put Nalar on your own data this week
                  </h2>
                  <p className={lead}>
                    Early access is open for teams in Indonesia and Southeast
                    Asia. Connect a source, ask the first question, and keep
                    everything you build.
                  </p>
                </div>
                <AccessForm />
              </div>
            </section>
          </main>

          <Footer
            className={footer}
            brand={<Brand />}
            description="Nalar explains what changed in your business data and sends it to the team that can act."
            columns={footerColumns}
            legal={legal}
            copyright="© 2026 Nalar. Built with MarkasUI."
          />
          <Toaster />
        </div>
      </div>
    </div>
  );
}
