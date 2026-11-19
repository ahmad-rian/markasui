"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { Avatar } from "../../../components/avatar/Avatar";
import { Badge } from "../../../components/badge/Badge";
import { Button } from "../../../components/button/Button";
import { Faq } from "../../../components/faq/Faq";
import { Footer } from "../../../components/footer/Footer";
import { Input } from "../../../components/input/Input";
import { LogoCloud } from "../../../components/logo-cloud/LogoCloud";
import { Navbar } from "../../../components/navbar/Navbar";
import { Select } from "../../../components/select/Select";
import { Toaster, toast } from "../../../components/toast/Toast";

/* Classes */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const root = "relative min-h-dvh overflow-x-clip bg-canvas text-ink";
const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
const footerEdge = "px-[max(1rem,calc((100%-72rem)/2+2rem))]";
const navWrap = "absolute inset-x-4 top-4 z-30 sm:inset-x-8 sm:top-6";
const navbar = "mx-auto max-w-5xl";
const brandLink = `flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink ${focusRing}`;
const brandMark =
  "flex size-7 items-center justify-center rounded-full bg-primary text-on-primary";
const navCta = `hidden h-9 items-center rounded-full bg-primary px-4 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong sm:inline-flex ${focusRing}`;
const hero =
  "relative isolate bg-primary-soft/60 pt-36 pb-20 sm:pt-44 sm:pb-28";
const heroInner = "relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const heroCopy = "mx-auto flex max-w-3xl flex-col items-center text-center";
const chip =
  "inline-flex items-center gap-2 rounded-full border border-primary-line bg-surface/70 px-3 py-1 text-sm text-muted backdrop-blur-md";
const chipDot = "size-1.5 rounded-full bg-primary";
const h1 =
  "mt-7 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]";
const h1Accent = "text-primary";
const heroText =
  "mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg";
const heroActions = "mt-9 flex flex-wrap items-center justify-center gap-3";
const heroCta = `inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-base font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const heroGhost = `inline-flex h-12 items-center rounded-full border border-primary-line bg-surface/70 px-6 text-base font-medium whitespace-nowrap text-ink backdrop-blur-md transition-colors duration-150 hover:bg-surface ${focusRing}`;
const statRow = "mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-3 xl:contents";
const statCard =
  "rounded-2xl border border-surface bg-surface/75 p-4 text-left shadow-overlay backdrop-blur-xl";
const statLeft = `${statCard} xl:absolute xl:top-2 xl:left-8 xl:w-52`;
const statRight = `${statCard} xl:absolute xl:top-28 xl:right-8 xl:w-52`;
const statBottom = `${statCard} xl:absolute xl:bottom-0 xl:left-14 xl:w-52`;
const statValue =
  "text-2xl font-semibold tracking-tight text-primary tabular-nums";
const statLabel = "mt-1 text-sm leading-snug text-muted";
const statMeter = "mt-3 flex h-1.5 gap-1";
const statMeterOn = "flex-1 rounded-full bg-primary";
const statMeterOff = "flex-1 rounded-full bg-primary/20";
const logoWrap = `${container} py-14 sm:py-16`;
const section = `${container} scroll-mt-6 py-16 sm:py-24`;
const sectionHead = "grid max-w-2xl gap-4";
const sectionHeadCenter = "mx-auto grid max-w-2xl gap-4 text-center";
const eyebrow = "text-sm font-medium text-primary";
const h2 = "text-3xl font-semibold tracking-tight text-balance sm:text-4xl";
const h2Accent = "text-primary";
const lead = "text-lg leading-relaxed text-pretty text-muted";
const resultsBand = "bg-primary-soft/60 py-16 sm:py-24";
const resultGrid = `${container} mt-12 grid gap-4 md:grid-cols-3`;
const glassCard =
  "flex flex-col gap-6 rounded-3xl border border-surface bg-surface/75 p-5 shadow-overlay backdrop-blur-xl sm:p-6";
const art = "rounded-2xl border border-primary-line/60 bg-canvas/70 p-4";
const resultTitle = "text-lg font-semibold tracking-tight";
const resultText = "mt-2 text-sm leading-relaxed text-pretty text-muted";
const leadList = "grid gap-2";
const leadRow =
  "flex items-center justify-between gap-3 rounded-xl bg-surface px-3 py-2.5 text-sm";
const leadName = "font-medium";
const leadMeta = "text-xs text-muted";
const chartSvg = "h-36 w-full";
const chartGrid = "stroke-line";
const chartArea = "fill-primary/15";
const chartLine = "fill-none stroke-primary";
const chartDot = "fill-primary";
const chartLegend = "mt-3 flex justify-between text-xs text-muted";
const graphSvg = "h-36 w-full";
const graphEdge = "stroke-primary/40";
const graphNode = "fill-surface stroke-primary/60";
const graphHub = "fill-primary";
const serviceGrid = "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3";
const serviceCard = "rounded-2xl border border-line bg-surface p-6";
const serviceIcon =
  "flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary";
const serviceTitle = "mt-5 text-base font-semibold tracking-tight";
const serviceText = "mt-2 text-sm leading-relaxed text-pretty text-muted";
const caseGrid = "mt-12 grid gap-4 lg:grid-cols-3";
const caseCard =
  "flex flex-col rounded-3xl border border-primary-line bg-primary-soft/50 p-6 sm:p-8";
const caseTop = "flex items-center justify-between gap-3";
const caseName = "text-base font-semibold";
const caseStats = "mt-8 grid grid-cols-2 gap-4";
const caseStat = "flex flex-col-reverse";
const caseValue =
  "text-3xl font-semibold tracking-tight text-primary tabular-nums";
const caseLabel = "mt-1 text-sm leading-snug text-muted";
const caseText =
  "mt-8 border-t border-primary-line pt-6 text-sm leading-relaxed text-pretty";
const stepGrid = "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4";
const stepCard = "rounded-2xl border border-line bg-surface p-6";
const stepTop = "flex items-center justify-between gap-3";
const stepNumber =
  "flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary tabular-nums";
const stepTime = "text-xs font-medium text-muted";
const stepTitle = "mt-5 text-base font-semibold tracking-tight";
const stepText = "mt-2 text-sm leading-relaxed text-pretty text-muted";
const teamGrid = "mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4";
const teamCard = "grid gap-3";
const teamPhoto =
  "aspect-[4/5] w-full rounded-2xl bg-primary-soft object-cover";
const teamName = "text-base font-semibold tracking-tight";
const teamRole = "text-sm text-muted";
const planGrid = "mt-12 grid gap-4 lg:grid-cols-3";
const planCard =
  "flex flex-col rounded-3xl border border-line bg-surface p-6 sm:p-8";
const planFeatured =
  "flex flex-col rounded-3xl border-2 border-primary bg-surface p-6 shadow-overlay sm:p-8";
const planTop = "flex items-center justify-between gap-3";
const planName = "text-lg font-semibold tracking-tight";
const planPrice = "mt-6 text-3xl font-semibold tracking-tight tabular-nums";
const planUnit = "mt-1 text-sm text-muted";
const planDesc = "mt-4 text-sm leading-relaxed text-pretty text-muted";
const planList = "mt-6 grid gap-3 border-t border-line pt-6 text-sm";
const planItem = "flex gap-2";
const planIcon = "mt-0.5 size-4 shrink-0 text-primary";
const planSpacer = "flex-1";
const planCta = `mt-8 inline-flex h-11 items-center justify-center rounded-full border border-line px-5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const planCtaFeatured = `mt-8 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const faqLayout = `${section} grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16`;
const faqAside = "grid content-start justify-items-start gap-4";
const faqList = "[&>div]:max-w-none [&>div]:gap-0";
const bookBand = "scroll-mt-6 bg-primary-soft/60 py-16 sm:py-24";
const bookGrid = `${container} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16`;
const quoteCard =
  "mt-10 rounded-3xl border border-surface bg-surface/75 p-6 shadow-overlay backdrop-blur-xl";
const quoteText = "text-base leading-relaxed text-pretty";
const person = "mt-6 flex items-center gap-3";
const personName = "text-sm font-medium";
const personRole = "text-sm text-muted";
const formCard =
  "grid gap-5 rounded-3xl border border-surface bg-surface/85 p-5 shadow-overlay backdrop-blur-xl sm:grid-cols-2 sm:p-8";
const formTitle = "text-lg font-semibold tracking-tight sm:col-span-2";
const fieldWrap = "grid content-start gap-1.5";
const fieldLabel = "text-sm font-medium";
const fieldError = "text-sm text-danger";
const formFoot = "grid gap-3 sm:col-span-2";
const submitButton = "w-full";
const formNote = "text-sm text-muted";
const footer = `${footerEdge} bg-canvas`;

/* Data */
// prettier-ignore
const icons = {
  link: "M9 15 15 9M10.5 6.5l1.8-1.8a4 4 0 0 1 5.7 5.7l-1.8 1.8M13.5 17.5l-1.8 1.8a4 4 0 0 1-5.7-5.7l1.8-1.8",
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "m5 12.5 4.5 4.5L19 7.5",
  pen: "M4 20h4L19 9l-4-4L4 16Zm9-13 4 4",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2ZM4 5v16M8 7h7",
  users: "M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2 20a6 6 0 0 1 12 0M16 4a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 4 6",
  mic: "M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM6 11a6 6 0 0 0 12 0M12 17v4",
  megaphone: "M4 10v4h3l7 4V6L7 10Zm14-1a3 3 0 0 1 0 6",
  chart: "M4 20V4M4 20h16M8 16l4-5 3 3 5-7",
};
type IconName = keyof typeof icons;

const FORM_ID = "relasi-book";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// prettier-ignore
const nav = [
  { label: "Services", href: "#services" }, { label: "Case studies", href: "#cases" },
  { label: "Process", href: "#process" }, { label: "Pricing", href: "#pricing" },
];
// prettier-ignore
const stats = [
  { value: "320%", label: "more pipeline from developer sign-ups", meter: 4 },
  { value: "6.2x", label: "return on DevRel spend in year one", meter: 5 },
  { value: "41 days", label: "median time to the first paid API call", meter: 3 },
];
// prettier-ignore
const logos = [
  { name: "Gerbang API", path: "M4 20V9l8-5 8 5v11M9 20v-6h6v6" },
  { name: "Kodein", path: "m8 7-5 5 5 5M16 7l5 5-5 5" },
  { name: "Arunika Cloud", path: "M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19 10a4 4 0 0 1-1 8Z" },
  { name: "Saku Pay", path: "M3 7h18v10H3ZM3 11h18" },
  { name: "Datanesia", path: "M12 3 21 8v8l-9 5-9-5V8Z" },
];
// prettier-ignore
const pipeline = [
  { name: "Kopi Kenangan Tech", meta: "Sandbox key, 3 days ago", stage: "Activated", tone: "success" },
  { name: "Pasar Raya Digital", meta: "1.2M API calls this week", stage: "Sales-qualified", tone: "primary" },
  { name: "Lumbung Logistik", meta: "Docs visit, webinar", stage: "Signed up", tone: "neutral" },
] as const;
const CHART_LINE = "M8 118 L56 108 L104 111 L152 86 L200 72 L248 44 L292 24";
const CHART_AREA = `${CHART_LINE} L292 140 L8 140 Z`;
const CHART_GRID = [35, 70, 105];
// prettier-ignore
const graphNodes = [
  { x: 60, y: 30 }, { x: 46, y: 104 }, { x: 108, y: 124 }, { x: 236, y: 26 },
  { x: 254, y: 98 }, { x: 190, y: 126 }, { x: 96, y: 64 }, { x: 206, y: 66 },
];
const GRAPH_HUB = { x: 150, y: 74 };
// prettier-ignore
const graphLinks = [[0, 6], [1, 2], [3, 7], [4, 5], [6, 1], [7, 4]];
// prettier-ignore
const services: { icon: IconName; title: string; text: string }[] = [
  { icon: "pen", title: "Technical content", text: "Tutorials, sample apps, and comparison guides written by engineers who have shipped with your API." },
  { icon: "book", title: "Docs and onboarding", text: "Quickstarts that get a developer from sign-up to the first successful call in under ten minutes." },
  { icon: "users", title: "Community programs", text: "Discord, champions, and office hours run with weekly reporting, not vanity member counts." },
  { icon: "mic", title: "Events and meetups", text: "Hackathons and meetups in Jakarta, Bandung, Surabaya, and Singapore, tied to tracked sign-ups." },
  { icon: "megaphone", title: "Developer marketing", text: "Launches, newsletters, and paid placements that speak to developers without sounding like an ad." },
  { icon: "chart", title: "Attribution", text: "Every workshop, post, and sample app traced to activated accounts and pipeline in your CRM." },
];
// prettier-ignore
const cases = [
  { name: "Gerbang API", sector: "Payments API", stats: [{ value: "3.2x", label: "activated accounts" }, { value: "Rp 9.4 bn", label: "new pipeline in 2 quarters" }], text: "Rebuilt the quickstart and ran 14 campus workshops. Time to first transaction fell from 9 days to 2." },
  { name: "Kodein", sector: "Developer tooling", stats: [{ value: "48%", label: "of new revenue from self-serve" }, { value: "11k", label: "community members, 2.1k active" }], text: "Turned a quiet Discord into a champions program that now answers 70% of support questions." },
  { name: "Arunika Cloud", sector: "Cloud infrastructure", stats: [{ value: "6.2x", label: "return on DevRel spend" }, { value: "-38%", label: "cost per activated developer" }], text: "Moved budget from sponsorships to sample apps and tracked every sign-up back to the content that earned it." },
];
// prettier-ignore
const steps = [
  { title: "Audit", time: "Weeks 1 to 2", text: "We interview your developers, read your docs, and map where sign-ups stall before revenue." },
  { title: "Strategy", time: "Week 3", text: "A 90-day plan with three bets, owners, and the pipeline numbers each bet should move." },
  { title: "Launch", time: "Month 2", text: "Content, community, and events ship on a weekly cadence, reviewed with your product team." },
  { title: "Measure", time: "Every month", text: "A report your CFO can read: activated accounts, pipeline, and revenue per program." },
];
// prettier-ignore
const team = [
  { name: "Sari Wulandari", role: "Founder, ex-developer advocate", photo: "/template-images/relasi/sari.webp" },
  { name: "Bima Prakoso", role: "Head of content, staff engineer", photo: "/template-images/relasi/bima.webp" },
  { name: "Laras Anindita", role: "Community lead", photo: "/template-images/relasi/laras.webp" },
  { name: "Arif Nugroho", role: "Growth analyst", photo: "/template-images/relasi/arif.webp" },
];
// prettier-ignore
const plans = [
  { name: "DevRel audit", price: "Rp 45 jt", unit: "one-off, 3 weeks", featured: "", desc: "Find out where developers drop off and which programs will move pipeline.", cta: "Book an audit", features: ["Developer journey map", "Docs and onboarding review", "Competitor benchmark", "90-day plan with targets"] },
  { name: "Growth retainer", price: "Rp 120 jt", unit: "per month, 6 month minimum", featured: "Most booked", desc: "A senior team that runs content, community, and events against a pipeline target.", cta: "Book a strategy call", features: ["Everything in the audit", "4 technical pieces a month", "Community and champions program", "1 event or workshop a month", "Monthly attribution report"] },
  { name: "Embedded team", price: "Custom", unit: "from 2 full-time advocates", featured: "", desc: "Advocates who join your stand-ups, ship with your product team, and report to you.", cta: "Talk to us", features: ["Dedicated advocates and writer", "Your tools and your channels", "Hiring help for your own team", "Quarterly board-ready review"] },
];
// prettier-ignore
const faqs = [
  { question: "How do you tie DevRel to revenue?", answer: "We tag every program with UTM and referral codes, connect product sign-ups to your CRM, and report activated accounts and pipeline per program each month." },
  { question: "Do you only work with API companies?", answer: "Mostly developer tools, API platforms, and B2B SaaS with a technical buyer. If developers influence the purchase, the playbook applies." },
  { question: "Who writes the technical content?", answer: "Engineers on our team who have shipped production code with your type of product. Every piece is tested against your API before it goes live." },
  { question: "Can you work in Bahasa Indonesia and English?", answer: "Yes. Most programs run in both, with Indonesian content for local communities and English for the regional and global audience." },
  { question: "How soon will we see results?", answer: "Onboarding fixes show up in activation within 4 to 6 weeks. Pipeline from content and community usually follows in the second quarter." },
];
// prettier-ignore
const stages = [
  { value: "", label: "Choose your stage" }, { value: "none", label: "No DevRel program yet" },
  { value: "early", label: "Early program, 1 to 2 people" }, { value: "scaling", label: "Scaling, 3 or more people" },
];
// prettier-ignore
const footerColumns = [
  { title: "Agency", links: [{ label: "Services", href: "#services" }, { label: "Case studies", href: "#cases" }, { label: "Team", href: "#team" }] },
  { title: "Engage", links: [{ label: "Process", href: "#process" }, { label: "Pricing", href: "#pricing" }, { label: "Book a call", href: "#book" }] },
  { title: "Company", links: [{ label: "Careers", href: "/careers" }, { label: "Blog", href: "/blog" }, { label: "Contact", href: "#book" }] },
];
// prettier-ignore
const legal = [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }];

type BookValues = {
  name: string;
  email: string;
  company: string;
  stage: string;
};
type BookErrors = Partial<Record<keyof BookValues, string>>;
const EMPTY_BOOK: BookValues = { name: "", email: "", company: "", stage: "" };
// prettier-ignore
const fields = [
  { key: "name", label: "Full name", type: "text", autocomplete: "name", placeholder: "Dimas Saputra" },
  { key: "email", label: "Work email", type: "email", autocomplete: "email", placeholder: "nama@perusahaan.co.id" },
  { key: "company", label: "Company", type: "text", autocomplete: "organization", placeholder: "PT Gerbang Data" },
] as const;

const meterOf = (count: number) => [1, 2, 3, 4, 5].map((step) => step <= count);
const validateBook = (values: BookValues): BookErrors => {
  const errors: BookErrors = {};
  if (!values.name.trim()) errors.name = "Enter your full name.";
  if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Enter a work email, like nama@perusahaan.co.id.";
  if (!values.company.trim()) errors.company = "Enter your company name.";
  if (!values.stage) errors.stage = "Choose your program stage.";
  return errors;
};
const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? "";

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
        <Icon name="link" className="size-4" />
      </span>
      Relasi
    </a>
  );
}

function BookForm() {
  const [values, setValues] = useState<BookValues>(EMPTY_BOOK);
  const [errors, setErrors] = useState<BookErrors>({});
  const update = (key: keyof BookValues, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));
  const describe = (key: keyof BookValues) =>
    errors[key] ? `${FORM_ID}-${key}-error` : undefined;
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateBook(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    toast({
      title: "Strategy call requested",
      description: `Thanks, ${firstName(values.name)}. Sari will email ${values.email.trim()} with three time slots within one working day.`,
      variant: "success",
    });
    setValues(EMPTY_BOOK);
  };
  return (
    <form
      className={formCard}
      noValidate
      aria-labelledby={`${FORM_ID}-title`}
      onSubmit={submit}
    >
      <h3 id={`${FORM_ID}-title`} className={formTitle}>
        Book a strategy call
      </h3>
      {fields.map((field) => (
        <div key={field.key} className={fieldWrap}>
          <label htmlFor={`${FORM_ID}-${field.key}`} className={fieldLabel}>
            {field.label}
          </label>
          <Input
            id={`${FORM_ID}-${field.key}`}
            type={field.type}
            name={field.key}
            autoComplete={field.autocomplete}
            placeholder={field.placeholder}
            value={values[field.key]}
            aria-invalid={errors[field.key] ? true : undefined}
            aria-describedby={describe(field.key)}
            onChange={(event) => update(field.key, event.target.value)}
          />
          {errors[field.key] && (
            <p id={`${FORM_ID}-${field.key}-error`} className={fieldError}>
              {errors[field.key]}
            </p>
          )}
        </div>
      ))}
      <div className={fieldWrap}>
        <label htmlFor={`${FORM_ID}-stage`} className={fieldLabel}>
          Program stage
        </label>
        <Select
          id={`${FORM_ID}-stage`}
          name="stage"
          value={values.stage}
          aria-invalid={errors.stage ? true : undefined}
          aria-describedby={describe("stage")}
          onChange={(event) => update("stage", event.target.value)}
        >
          {stages.map((stage) => (
            <option key={stage.value} value={stage.value}>
              {stage.label}
            </option>
          ))}
        </Select>
        {errors.stage && (
          <p id={`${FORM_ID}-stage-error`} className={fieldError}>
            {errors.stage}
          </p>
        )}
      </div>
      <div className={formFoot}>
        <Button type="submit" size="lg" className={submitButton}>
          Request a call
        </Button>
        <p className={formNote}>
          30 minutes on video, no slides. We reply within one working day.
        </p>
      </div>
    </form>
  );
}

export default function Relasi() {
  /** Navbar tidak menutup menu mobile saat link di-klik; tutup lewat tombolnya sendiri. */
  const closeMenuOnLink = (event: MouseEvent<HTMLElement>) => {
    const link = (event.target as Element).closest("a");
    const toggle = event.currentTarget.querySelector<HTMLButtonElement>(
      "button[aria-expanded=true]",
    );
    if (link?.closest("[data-state=open]") && toggle) toggle.click();
  };
  const sendPlaybook = () =>
    toast({
      title: "Playbook on its way",
      description:
        "Check your inbox for the 24-page DevRel attribution playbook.",
    });

  return (
    <div id="top" className={root}>
      <div className={navWrap}>
        <Navbar
          variant="floating"
          className={navbar}
          brand={<Brand />}
          links={nav}
          onClick={closeMenuOnLink}
          actions={
            <a href="#book" className={navCta}>
              Book a call
            </a>
          }
        />
      </div>

      <main>
        <section aria-labelledby="relasi-title" className={hero}>
          <div className={heroInner}>
            <div className={heroCopy}>
              <p className={chip}>
                <span aria-hidden="true" className={chipDot} />
                DevRel agency for API and developer-tool companies
              </p>
              <h1 id="relasi-title" className={h1}>
                Turn your DevRel program into{" "}
                <span className={h1Accent}>revenue growth</span>
              </h1>
              <p className={heroText}>
                We run developer content, community, and events for B2B software
                teams, and we report on the one number your board asks about:
                pipeline.
              </p>
              <div className={heroActions}>
                <a href="#book" className={heroCta}>
                  Book a strategy call
                  <Icon name="arrow" className="size-4" />
                </a>
                <a href="#pricing" className={heroGhost}>
                  Pricing
                </a>
              </div>
            </div>
            <ul className={statRow}>
              {stats.map((stat, index) => (
                <li
                  key={stat.value}
                  className={
                    index === 0
                      ? statLeft
                      : index === 1
                        ? statRight
                        : statBottom
                  }
                >
                  <p className={statValue}>{stat.value}</p>
                  <p className={statLabel}>{stat.label}</p>
                  <div aria-hidden="true" className={statMeter}>
                    {meterOf(stat.meter).map((on, step) => (
                      <span
                        key={step}
                        className={on ? statMeterOn : statMeterOff}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className={logoWrap}>
          <LogoCloud
            title="Trusted by developer-tool teams in Jakarta, Singapore, and Bangalore"
            logos={logos}
            variant="row"
          />
        </div>

        <section aria-labelledby="relasi-results" className={resultsBand}>
          <div className={`${container} ${sectionHeadCenter}`}>
            <h2 id="relasi-results" className={h2}>
              DevRel that delivers{" "}
              <span className={h2Accent}>business results</span>
            </h2>
            <p className={lead}>
              Developer love is the start. We measure what happens after it:
              activation, pipeline, and revenue.
            </p>
          </div>
          <ul className={resultGrid}>
            <li className={glassCard}>
              <div aria-hidden="true" className={art}>
                <ul className={leadList}>
                  {pipeline.map((item) => (
                    <li key={item.name} className={leadRow}>
                      <div>
                        <p className={leadName}>{item.name}</p>
                        <p className={leadMeta}>{item.meta}</p>
                      </div>
                      <Badge variant={item.tone}>{item.stage}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={resultTitle}>Pipeline acceleration</h3>
                <p className={resultText}>
                  Developer sign-ups scored and routed to sales the day they hit
                  real usage, not the quarter after.
                </p>
              </div>
            </li>
            <li className={glassCard}>
              <div aria-hidden="true" className={art}>
                <svg viewBox="0 0 300 140" className={chartSvg}>
                  {CHART_GRID.map((y) => (
                    <line
                      key={y}
                      x1="8"
                      x2="292"
                      y1={y}
                      y2={y}
                      strokeDasharray="3 5"
                      className={chartGrid}
                    />
                  ))}
                  <path d={CHART_AREA} className={chartArea} />
                  <path
                    d={CHART_LINE}
                    strokeWidth="2.5"
                    className={chartLine}
                  />
                  <circle cx="292" cy="24" r="5" className={chartDot} />
                </svg>
                <p className={chartLegend}>
                  <span>Q1</span>
                  <span>Activated accounts</span>
                  <span>Q4</span>
                </p>
              </div>
              <div>
                <h3 className={resultTitle}>Growth metrics</h3>
                <p className={resultText}>
                  One monthly report that links every program to activated
                  accounts and the revenue they bring in.
                </p>
              </div>
            </li>
            <li className={glassCard}>
              <div aria-hidden="true" className={art}>
                <svg viewBox="0 0 300 150" className={graphSvg}>
                  {graphNodes.map((node) => (
                    <line
                      key={`hub-${node.x}`}
                      x1={GRAPH_HUB.x}
                      y1={GRAPH_HUB.y}
                      x2={node.x}
                      y2={node.y}
                      className={graphEdge}
                    />
                  ))}
                  {graphLinks.map(([from, to]) => (
                    <line
                      key={`${from}-${to}`}
                      x1={graphNodes[from]?.x}
                      y1={graphNodes[from]?.y}
                      x2={graphNodes[to]?.x}
                      y2={graphNodes[to]?.y}
                      className={graphEdge}
                    />
                  ))}
                  {graphNodes.map((node) => (
                    <circle
                      key={`node-${node.x}`}
                      cx={node.x}
                      cy={node.y}
                      r="7"
                      strokeWidth="2"
                      className={graphNode}
                    />
                  ))}
                  <circle
                    cx={GRAPH_HUB.x}
                    cy={GRAPH_HUB.y}
                    r="13"
                    className={graphHub}
                  />
                </svg>
              </div>
              <div>
                <h3 className={resultTitle}>Developer adoption</h3>
                <p className={resultText}>
                  Champions, meetups, and integrations that spread your API from
                  one team to the next inside every account.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section
          id="services"
          aria-labelledby="relasi-services"
          className={section}
        >
          <div className={sectionHead}>
            <p className={eyebrow}>Services</p>
            <h2 id="relasi-services" className={h2}>
              Everything a DevRel team does, run by people who have done it
            </h2>
          </div>
          <ul className={serviceGrid}>
            {services.map((service) => (
              <li key={service.title} className={serviceCard}>
                <span className={serviceIcon}>
                  <Icon name={service.icon} className="size-5" />
                </span>
                <h3 className={serviceTitle}>{service.title}</h3>
                <p className={serviceText}>{service.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="cases" aria-labelledby="relasi-cases" className={section}>
          <div className={sectionHead}>
            <p className={eyebrow}>Case studies</p>
            <h2 id="relasi-cases" className={h2}>
              Numbers our clients report to their boards
            </h2>
          </div>
          <ul className={caseGrid}>
            {cases.map((item) => (
              <li key={item.name} className={caseCard}>
                <div className={caseTop}>
                  <h3 className={caseName}>{item.name}</h3>
                  <Badge variant="primary">{item.sector}</Badge>
                </div>
                <dl className={caseStats}>
                  {item.stats.map((stat) => (
                    <div key={stat.label} className={caseStat}>
                      <dt className={caseLabel}>{stat.label}</dt>
                      <dd className={caseValue}>{stat.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className={caseText}>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="process"
          aria-labelledby="relasi-process"
          className={section}
        >
          <div className={sectionHead}>
            <p className={eyebrow}>Process</p>
            <h2 id="relasi-process" className={h2}>
              From audit to pipeline in one quarter
            </h2>
          </div>
          <ol className={stepGrid}>
            {steps.map((step, index) => (
              <li key={step.title} className={stepCard}>
                <div className={stepTop}>
                  <span aria-hidden="true" className={stepNumber}>
                    {index + 1}
                  </span>
                  <span className={stepTime}>{step.time}</span>
                </div>
                <h3 className={stepTitle}>{step.title}</h3>
                <p className={stepText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="team" aria-labelledby="relasi-team" className={section}>
          <div className={sectionHead}>
            <p className={eyebrow}>Team</p>
            <h2 id="relasi-team" className={h2}>
              Former advocates, engineers, and growth analysts
            </h2>
          </div>
          <ul className={teamGrid}>
            {team.map((member) => (
              <li key={member.name} className={teamCard}>
                <img
                  src={member.photo}
                  alt={`Portrait of ${member.name}`}
                  width={480}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className={teamPhoto}
                />
                <div>
                  <h3 className={teamName}>{member.name}</h3>
                  <p className={teamRole}>{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="pricing"
          aria-labelledby="relasi-pricing"
          className={section}
        >
          <div className={sectionHead}>
            <p className={eyebrow}>Engagement models</p>
            <h2 id="relasi-pricing" className={h2}>
              Start with an audit, stay for the pipeline
            </h2>
            <p className={lead}>
              Prices in Rupiah, excluding VAT. Every engagement starts with the
              same 30 minute call.
            </p>
          </div>
          <ul className={planGrid}>
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
                <p className={planPrice}>{plan.price}</p>
                <p className={planUnit}>{plan.unit}</p>
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
                  href="#book"
                  className={plan.featured ? planCtaFeatured : planCta}
                >
                  {plan.cta}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" aria-labelledby="relasi-faq" className={faqLayout}>
          <div className={faqAside}>
            <h2 id="relasi-faq" className={h2}>
              Questions from founders and marketing leads
            </h2>
            <p className={lead}>
              Want to see how we measure DevRel before you talk to us? Our
              attribution playbook is free.
            </p>
            <Button variant="secondary" onClick={sendPlaybook}>
              Send me the playbook
            </Button>
          </div>
          <Faq items={faqs} exclusive className={faqList} />
        </section>

        <section id="book" aria-labelledby="relasi-book" className={bookBand}>
          <div className={bookGrid}>
            <div>
              <div className={sectionHead}>
                <h2 id="relasi-book" className={h2}>
                  Tell us where your developers{" "}
                  <span className={h2Accent}>get stuck</span>
                </h2>
                <p className={lead}>
                  In 30 minutes we look at your funnel together and name the
                  first three things we would change. You keep the notes either
                  way.
                </p>
              </div>
              <figure className={quoteCard}>
                <blockquote className={quoteText}>
                  Relasi rebuilt our quickstart in three weeks. Activation went
                  up before their first community event even happened.
                </blockquote>
                <figcaption className={person}>
                  <Avatar name="Rizky Hidayat" size="md" />
                  <div>
                    <p className={personName}>Rizky Hidayat</p>
                    <p className={personRole}>VP Growth, Gerbang API</p>
                  </div>
                </figcaption>
              </figure>
            </div>
            <BookForm />
          </div>
        </section>
      </main>

      <Footer
        className={footer}
        brand={<Brand />}
        description="DevRel and developer marketing for API platforms and B2B software teams in Southeast Asia."
        columns={footerColumns}
        legal={legal}
        copyright="© 2026 Relasi. Built with MarkasUI."
      />
      <Toaster />
    </div>
  );
}
