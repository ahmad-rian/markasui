import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from "@angular/core";
import { Avatar } from "../../../components/avatar/avatar.component";
import { Badge } from "../../../components/badge/badge.component";
import { Button } from "../../../components/button/button.component";
import { Faq } from "../../../components/faq/faq.component";
import { Footer } from "../../../components/footer/footer.component";
import { Input } from "../../../components/input/input.component";
import { LogoCloud } from "../../../components/logo-cloud/logo-cloud.component";
import { Navbar } from "../../../components/navbar/navbar.component";
import { Select } from "../../../components/select/select.component";
import { Toaster, toast } from "../../../components/toast/toast.component";

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

const statClasses = [statLeft, statRight, statBottom];
const graphLines = graphLinks.map(([from, to]) => ({
  key: `${from}-${to}`,
  from: graphNodes[from ?? 0]!,
  to: graphNodes[to ?? 0]!,
}));

/** Ikon garis 24px; atribut svg di host supaya class dari pemakai langsung berlaku. */
@Component({
  selector: "svg[relasiIcon]",
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
  readonly relasiIcon = input.required<IconName>();
  protected readonly path = computed(() => icons[this.relasiIcon()]);
}

@Component({
  selector: "template-relasi",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  imports: [
    Avatar,
    Badge,
    Button,
    Faq,
    Footer,
    Icon,
    Input,
    LogoCloud,
    Navbar,
    Select,
    Toaster,
  ],
  template: `
    <div id="top" [class]="root">
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
              ><svg relasiIcon="link" class="size-4"></svg></span
            >Relasi
          </a>
          <ng-container actions>
            <a href="#book" [class]="navCta">Book a call</a>
          </ng-container>
        </header>
      </div>

      <main>
        <section aria-labelledby="relasi-title" [class]="hero">
          <div [class]="heroInner">
            <div [class]="heroCopy">
              <p [class]="chip">
                <span aria-hidden="true" [class]="chipDot"></span>DevRel agency
                for API and developer-tool companies
              </p>
              <h1 id="relasi-title" [class]="h1">
                Turn your DevRel program into
                <span [class]="h1Accent">revenue growth</span>
              </h1>
              <p [class]="heroText">
                We run developer content, community, and events for B2B software
                teams, and we report on the one number your board asks about:
                pipeline.
              </p>
              <div [class]="heroActions">
                <a href="#book" [class]="heroCta"
                  >Book a strategy call<svg
                    relasiIcon="arrow"
                    class="size-4"
                  ></svg
                ></a>
                <a href="#pricing" [class]="heroGhost">Pricing</a>
              </div>
            </div>
            <ul [class]="statRow">
              @for (stat of stats; track stat.value; let i = $index) {
                <li [class]="statClasses[i]">
                  <p [class]="statValue">{{ stat.value }}</p>
                  <p [class]="statLabel">{{ stat.label }}</p>
                  <div aria-hidden="true" [class]="statMeter">
                    @for (on of meterOf(stat.meter); track $index) {
                      <span [class]="on ? statMeterOn : statMeterOff"></span>
                    }
                  </div>
                </li>
              }
            </ul>
          </div>
        </section>

        <div [class]="logoWrap">
          <markas-logo-cloud
            title="Trusted by developer-tool teams in Jakarta, Singapore, and Bangalore"
            [logos]="logos"
            variant="row"
          />
        </div>

        <section aria-labelledby="relasi-results" [class]="resultsBand">
          <div [class]="container + ' ' + sectionHeadCenter">
            <h2 id="relasi-results" [class]="h2">
              DevRel that delivers
              <span [class]="h2Accent">business results</span>
            </h2>
            <p [class]="lead">
              Developer love is the start. We measure what happens after it:
              activation, pipeline, and revenue.
            </p>
          </div>
          <ul [class]="resultGrid">
            <li [class]="glassCard">
              <div aria-hidden="true" [class]="art">
                <ul [class]="leadList">
                  @for (item of pipeline; track item.name) {
                    <li [class]="leadRow">
                      <div>
                        <p [class]="leadName">{{ item.name }}</p>
                        <p [class]="leadMeta">{{ item.meta }}</p>
                      </div>
                      <span markas-badge [variant]="item.tone">{{
                        item.stage
                      }}</span>
                    </li>
                  }
                </ul>
              </div>
              <div>
                <h3 [class]="resultTitle">Pipeline acceleration</h3>
                <p [class]="resultText">
                  Developer sign-ups scored and routed to sales the day they hit
                  real usage, not the quarter after.
                </p>
              </div>
            </li>
            <li [class]="glassCard">
              <div aria-hidden="true" [class]="art">
                <svg viewBox="0 0 300 140" [class]="chartSvg">
                  @for (y of CHART_GRID; track y) {
                    <svg:line
                      x1="8"
                      x2="292"
                      [attr.y1]="y"
                      [attr.y2]="y"
                      stroke-dasharray="3 5"
                      [class]="chartGrid"
                    />
                  }
                  <svg:path [attr.d]="CHART_AREA" [class]="chartArea" />
                  <svg:path
                    [attr.d]="CHART_LINE"
                    stroke-width="2.5"
                    [class]="chartLine"
                  />
                  <svg:circle cx="292" cy="24" r="5" [class]="chartDot" />
                </svg>
                <p [class]="chartLegend">
                  <span>Q1</span>
                  <span>Activated accounts</span>
                  <span>Q4</span>
                </p>
              </div>
              <div>
                <h3 [class]="resultTitle">Growth metrics</h3>
                <p [class]="resultText">
                  One monthly report that links every program to activated
                  accounts and the revenue they bring in.
                </p>
              </div>
            </li>
            <li [class]="glassCard">
              <div aria-hidden="true" [class]="art">
                <svg viewBox="0 0 300 150" [class]="graphSvg">
                  @for (node of graphNodes; track "hub-" + node.x) {
                    <svg:line
                      [attr.x1]="GRAPH_HUB.x"
                      [attr.y1]="GRAPH_HUB.y"
                      [attr.x2]="node.x"
                      [attr.y2]="node.y"
                      [class]="graphEdge"
                    />
                  }
                  @for (line of graphLines; track line.key) {
                    <svg:line
                      [attr.x1]="line.from.x"
                      [attr.y1]="line.from.y"
                      [attr.x2]="line.to.x"
                      [attr.y2]="line.to.y"
                      [class]="graphEdge"
                    />
                  }
                  @for (node of graphNodes; track "node-" + node.x) {
                    <svg:circle
                      [attr.cx]="node.x"
                      [attr.cy]="node.y"
                      r="7"
                      stroke-width="2"
                      [class]="graphNode"
                    />
                  }
                  <svg:circle
                    [attr.cx]="GRAPH_HUB.x"
                    [attr.cy]="GRAPH_HUB.y"
                    r="13"
                    [class]="graphHub"
                  />
                </svg>
              </div>
              <div>
                <h3 [class]="resultTitle">Developer adoption</h3>
                <p [class]="resultText">
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
          [class]="section"
        >
          <div [class]="sectionHead">
            <p [class]="eyebrow">Services</p>
            <h2 id="relasi-services" [class]="h2">
              Everything a DevRel team does, run by people who have done it
            </h2>
          </div>
          <ul [class]="serviceGrid">
            @for (service of services; track service.title) {
              <li [class]="serviceCard">
                <span [class]="serviceIcon"
                  ><svg [relasiIcon]="service.icon" class="size-5"></svg
                ></span>
                <h3 [class]="serviceTitle">{{ service.title }}</h3>
                <p [class]="serviceText">{{ service.text }}</p>
              </li>
            }
          </ul>
        </section>

        <section id="cases" aria-labelledby="relasi-cases" [class]="section">
          <div [class]="sectionHead">
            <p [class]="eyebrow">Case studies</p>
            <h2 id="relasi-cases" [class]="h2">
              Numbers our clients report to their boards
            </h2>
          </div>
          <ul [class]="caseGrid">
            @for (item of cases; track item.name) {
              <li [class]="caseCard">
                <div [class]="caseTop">
                  <h3 [class]="caseName">{{ item.name }}</h3>
                  <span markas-badge variant="primary">{{ item.sector }}</span>
                </div>
                <dl [class]="caseStats">
                  @for (stat of item.stats; track stat.label) {
                    <div [class]="caseStat">
                      <dt [class]="caseLabel">{{ stat.label }}</dt>
                      <dd [class]="caseValue">{{ stat.value }}</dd>
                    </div>
                  }
                </dl>
                <p [class]="caseText">{{ item.text }}</p>
              </li>
            }
          </ul>
        </section>

        <section
          id="process"
          aria-labelledby="relasi-process"
          [class]="section"
        >
          <div [class]="sectionHead">
            <p [class]="eyebrow">Process</p>
            <h2 id="relasi-process" [class]="h2">
              From audit to pipeline in one quarter
            </h2>
          </div>
          <ol [class]="stepGrid">
            @for (step of steps; track step.title; let i = $index) {
              <li [class]="stepCard">
                <div [class]="stepTop">
                  <span
                    aria-hidden="true"
                    [class]="stepNumber"
                    [textContent]="i + 1"
                  ></span>
                  <span [class]="stepTime">{{ step.time }}</span>
                </div>
                <h3 [class]="stepTitle">{{ step.title }}</h3>
                <p [class]="stepText">{{ step.text }}</p>
              </li>
            }
          </ol>
        </section>

        <section id="team" aria-labelledby="relasi-team" [class]="section">
          <div [class]="sectionHead">
            <p [class]="eyebrow">Team</p>
            <h2 id="relasi-team" [class]="h2">
              Former advocates, engineers, and growth analysts
            </h2>
          </div>
          <ul [class]="teamGrid">
            @for (member of team; track member.name) {
              <li [class]="teamCard">
                <img
                  [src]="member.photo"
                  [alt]="'Portrait of ' + member.name"
                  width="480"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  [class]="teamPhoto"
                />
                <div>
                  <h3 [class]="teamName">{{ member.name }}</h3>
                  <p [class]="teamRole">{{ member.role }}</p>
                </div>
              </li>
            }
          </ul>
        </section>

        <section
          id="pricing"
          aria-labelledby="relasi-pricing"
          [class]="section"
        >
          <div [class]="sectionHead">
            <p [class]="eyebrow">Engagement models</p>
            <h2 id="relasi-pricing" [class]="h2">
              Start with an audit, stay for the pipeline
            </h2>
            <p [class]="lead">
              Prices in Rupiah, excluding VAT. Every engagement starts with the
              same 30 minute call.
            </p>
          </div>
          <ul [class]="planGrid">
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
                <p [class]="planPrice">{{ plan.price }}</p>
                <p [class]="planUnit">{{ plan.unit }}</p>
                <p [class]="planDesc">{{ plan.desc }}</p>
                <ul [class]="planList">
                  @for (feature of plan.features; track feature) {
                    <li [class]="planItem">
                      <svg relasiIcon="check" [class]="planIcon"></svg
                      >{{ feature }}
                    </li>
                  }
                </ul>
                <div [class]="planSpacer"></div>
                <a
                  href="#book"
                  [class]="plan.featured ? planCtaFeatured : planCta"
                  >{{ plan.cta }}</a
                >
              </li>
            }
          </ul>
        </section>

        <section id="faq" aria-labelledby="relasi-faq" [class]="faqLayout">
          <div [class]="faqAside">
            <h2 id="relasi-faq" [class]="h2">
              Questions from founders and marketing leads
            </h2>
            <p [class]="lead">
              Want to see how we measure DevRel before you talk to us? Our
              attribution playbook is free.
            </p>
            <button markas-button variant="secondary" (click)="sendPlaybook()">
              Send me the playbook
            </button>
          </div>
          <markas-faq [items]="faqs" exclusive [class]="faqList" />
        </section>

        <section id="book" aria-labelledby="relasi-book" [class]="bookBand">
          <div [class]="bookGrid">
            <div>
              <div [class]="sectionHead">
                <h2 id="relasi-book" [class]="h2">
                  Tell us where your developers
                  <span [class]="h2Accent">get stuck</span>
                </h2>
                <p [class]="lead">
                  In 30 minutes we look at your funnel together and name the
                  first three things we would change. You keep the notes either
                  way.
                </p>
              </div>
              <figure [class]="quoteCard">
                <blockquote [class]="quoteText">
                  Relasi rebuilt our quickstart in three weeks. Activation went
                  up before their first community event even happened.
                </blockquote>
                <figcaption [class]="person">
                  <markas-avatar name="Rizky Hidayat" size="md" />
                  <div>
                    <p [class]="personName">Rizky Hidayat</p>
                    <p [class]="personRole">VP Growth, Gerbang API</p>
                  </div>
                </figcaption>
              </figure>
            </div>
            <form
              [class]="formCard"
              novalidate
              [attr.aria-labelledby]="FORM_ID + '-title'"
              (submit)="submit($event)"
            >
              <h3 [id]="FORM_ID + '-title'" [class]="formTitle">
                Book a strategy call
              </h3>
              @for (field of fields; track field.key) {
                <div [class]="fieldWrap">
                  <label
                    [for]="FORM_ID + '-' + field.key"
                    [class]="fieldLabel"
                    [textContent]="field.label"
                  ></label>
                  <markas-input
                    [value]="values()[field.key]"
                    (valueChange)="update(field.key, $event)"
                    [id]="FORM_ID + '-' + field.key"
                    [type]="field.type"
                    [name]="field.key"
                    [autocomplete]="field.autocomplete"
                    [placeholder]="field.placeholder"
                    [aria-invalid]="errors()[field.key] ? true : undefined"
                    [aria-describedby]="describe(field.key)"
                  />
                  @if (errors()[field.key]) {
                    <p
                      [id]="FORM_ID + '-' + field.key + '-error'"
                      [class]="fieldError"
                      [textContent]="errors()[field.key]"
                    ></p>
                  }
                </div>
              }
              <div [class]="fieldWrap">
                <label [for]="FORM_ID + '-stage'" [class]="fieldLabel"
                  >Program stage</label
                >
                <!-- Select Angular menampilkan pesan error sendiri dengan id dan class yang sama. -->
                <markas-select
                  [value]="values().stage"
                  (valueChange)="update('stage', $event ?? '')"
                  [id]="FORM_ID + '-stage'"
                  name="stage"
                  [error]="errors().stage"
                >
                  @for (stage of stages; track stage.value) {
                    <option [value]="stage.value">{{ stage.label }}</option>
                  }
                </markas-select>
              </div>
              <div [class]="formFoot">
                <button
                  markas-button
                  type="submit"
                  size="lg"
                  [class]="submitButton"
                >
                  Request a call
                </button>
                <p [class]="formNote">
                  30 minutes on video, no slides. We reply within one working
                  day.
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer
        markas-footer
        [class]="footer"
        description="DevRel and developer marketing for API platforms and B2B software teams in Southeast Asia."
        [columns]="footerColumns"
        [legal]="legal"
        copyright="© 2026 Relasi. Built with MarkasUI."
      >
        <a brand href="#top" [class]="brandLink">
          <span [class]="brandMark"
            ><svg relasiIcon="link" class="size-4"></svg></span
          >Relasi
        </a>
      </footer>
      <markas-toaster />
    </div>
  `,
})
export default class Relasi {
  protected readonly focusRing = focusRing;
  protected readonly root = root;
  protected readonly container = container;
  protected readonly footerEdge = footerEdge;
  protected readonly navWrap = navWrap;
  protected readonly navbar = navbar;
  protected readonly brandLink = brandLink;
  protected readonly brandMark = brandMark;
  protected readonly navCta = navCta;
  protected readonly hero = hero;
  protected readonly heroInner = heroInner;
  protected readonly heroCopy = heroCopy;
  protected readonly chip = chip;
  protected readonly chipDot = chipDot;
  protected readonly h1 = h1;
  protected readonly h1Accent = h1Accent;
  protected readonly heroText = heroText;
  protected readonly heroActions = heroActions;
  protected readonly heroCta = heroCta;
  protected readonly heroGhost = heroGhost;
  protected readonly statRow = statRow;
  protected readonly statCard = statCard;
  protected readonly statLeft = statLeft;
  protected readonly statRight = statRight;
  protected readonly statBottom = statBottom;
  protected readonly statValue = statValue;
  protected readonly statLabel = statLabel;
  protected readonly statMeter = statMeter;
  protected readonly statMeterOn = statMeterOn;
  protected readonly statMeterOff = statMeterOff;
  protected readonly logoWrap = logoWrap;
  protected readonly section = section;
  protected readonly sectionHead = sectionHead;
  protected readonly sectionHeadCenter = sectionHeadCenter;
  protected readonly eyebrow = eyebrow;
  protected readonly h2 = h2;
  protected readonly h2Accent = h2Accent;
  protected readonly lead = lead;
  protected readonly resultsBand = resultsBand;
  protected readonly resultGrid = resultGrid;
  protected readonly glassCard = glassCard;
  protected readonly art = art;
  protected readonly resultTitle = resultTitle;
  protected readonly resultText = resultText;
  protected readonly leadList = leadList;
  protected readonly leadRow = leadRow;
  protected readonly leadName = leadName;
  protected readonly leadMeta = leadMeta;
  protected readonly chartSvg = chartSvg;
  protected readonly chartGrid = chartGrid;
  protected readonly chartArea = chartArea;
  protected readonly chartLine = chartLine;
  protected readonly chartDot = chartDot;
  protected readonly chartLegend = chartLegend;
  protected readonly graphSvg = graphSvg;
  protected readonly graphEdge = graphEdge;
  protected readonly graphNode = graphNode;
  protected readonly graphHub = graphHub;
  protected readonly serviceGrid = serviceGrid;
  protected readonly serviceCard = serviceCard;
  protected readonly serviceIcon = serviceIcon;
  protected readonly serviceTitle = serviceTitle;
  protected readonly serviceText = serviceText;
  protected readonly caseGrid = caseGrid;
  protected readonly caseCard = caseCard;
  protected readonly caseTop = caseTop;
  protected readonly caseName = caseName;
  protected readonly caseStats = caseStats;
  protected readonly caseStat = caseStat;
  protected readonly caseValue = caseValue;
  protected readonly caseLabel = caseLabel;
  protected readonly caseText = caseText;
  protected readonly stepGrid = stepGrid;
  protected readonly stepCard = stepCard;
  protected readonly stepTop = stepTop;
  protected readonly stepNumber = stepNumber;
  protected readonly stepTime = stepTime;
  protected readonly stepTitle = stepTitle;
  protected readonly stepText = stepText;
  protected readonly teamGrid = teamGrid;
  protected readonly teamCard = teamCard;
  protected readonly teamPhoto = teamPhoto;
  protected readonly teamName = teamName;
  protected readonly teamRole = teamRole;
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
  protected readonly planSpacer = planSpacer;
  protected readonly planCta = planCta;
  protected readonly planCtaFeatured = planCtaFeatured;
  protected readonly faqLayout = faqLayout;
  protected readonly faqAside = faqAside;
  protected readonly faqList = faqList;
  protected readonly bookBand = bookBand;
  protected readonly bookGrid = bookGrid;
  protected readonly quoteCard = quoteCard;
  protected readonly quoteText = quoteText;
  protected readonly person = person;
  protected readonly personName = personName;
  protected readonly personRole = personRole;
  protected readonly formCard = formCard;
  protected readonly formTitle = formTitle;
  protected readonly fieldWrap = fieldWrap;
  protected readonly fieldLabel = fieldLabel;
  protected readonly fieldError = fieldError;
  protected readonly formFoot = formFoot;
  protected readonly submitButton = submitButton;
  protected readonly formNote = formNote;
  protected readonly footer = footer;
  protected readonly icons = icons;
  protected readonly FORM_ID = FORM_ID;
  protected readonly EMAIL_PATTERN = EMAIL_PATTERN;
  protected readonly nav = nav;
  protected readonly stats = stats;
  protected readonly logos = logos;
  protected readonly pipeline = pipeline;
  protected readonly CHART_LINE = CHART_LINE;
  protected readonly CHART_AREA = CHART_AREA;
  protected readonly CHART_GRID = CHART_GRID;
  protected readonly graphNodes = graphNodes;
  protected readonly GRAPH_HUB = GRAPH_HUB;
  protected readonly graphLinks = graphLinks;
  protected readonly services = services;
  protected readonly cases = cases;
  protected readonly steps = steps;
  protected readonly team = team;
  protected readonly plans = plans;
  protected readonly faqs = faqs;
  protected readonly stages = stages;
  protected readonly footerColumns = footerColumns;
  protected readonly legal = legal;
  protected readonly EMPTY_BOOK = EMPTY_BOOK;
  protected readonly fields = fields;
  protected readonly meterOf = meterOf;
  protected readonly validateBook = validateBook;
  protected readonly firstName = firstName;
  protected readonly statClasses = statClasses;
  protected readonly graphLines = graphLines;
  protected readonly values = signal<BookValues>({ ...EMPTY_BOOK });
  protected readonly errors = signal<BookErrors>({});

  protected update(key: keyof BookValues, value: string) {
    this.values.update((current) => ({ ...current, [key]: value }));
  }
  protected describe(key: keyof BookValues) {
    return this.errors()[key] ? `${FORM_ID}-${key}-error` : undefined;
  }
  /** Navbar tidak menutup menu mobile saat link di-klik; tutup lewat tombolnya sendiri. */
  protected closeMenuOnLink(event: MouseEvent) {
    const link = (event.target as Element).closest("a");
    const toggle = (
      event.currentTarget as HTMLElement
    ).querySelector<HTMLButtonElement>("button[aria-expanded=true]");
    if (link?.closest("[data-state=open]") && toggle) toggle.click();
  }
  protected sendPlaybook() {
    toast({
      title: "Playbook on its way",
      description:
        "Check your inbox for the 24-page DevRel attribution playbook.",
    });
  }
  protected submit(event: Event) {
    event.preventDefault();
    const values = this.values();
    const found = validateBook(values);
    this.errors.set(found);
    if (Object.keys(found).length > 0) return;
    toast({
      title: "Strategy call requested",
      description: `Thanks, ${firstName(values.name)}. Sari will email ${values.email.trim()} with three time slots within one working day.`,
      variant: "success",
    });
    this.values.set({ ...EMPTY_BOOK });
  }
}
