"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { Badge } from "../../../components/badge/Badge";
import { Button } from "../../../components/button/Button";
import { CurrencyInput } from "../../../components/currency-input/CurrencyInput";
import { Faq } from "../../../components/faq/Faq";
import { Footer } from "../../../components/footer/Footer";
import { Input } from "../../../components/input/Input";
import { Navbar } from "../../../components/navbar/Navbar";
import { Slider } from "../../../components/slider/Slider";
import { Toaster, toast } from "../../../components/toast/Toast";
import { ToggleGroup } from "../../../components/toggle-group/ToggleGroup";

/* Classes */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const root = "min-h-dvh bg-canvas text-ink";
const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
const navbarEdge =
  "mx-auto mt-3 max-w-[calc(100%-1.5rem)] sm:max-w-[calc(100%-3rem)] lg:max-w-[68rem]";
const footerEdge = "px-[max(1rem,calc((100%-72rem)/2))]";
const brandLink = `flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink ${focusRing}`;
const brandMark =
  "flex size-7 items-center justify-center rounded-full bg-primary text-on-primary";
const navCta = `inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const primaryLink = `inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const secondaryLink = `inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-6 text-base font-medium whitespace-nowrap text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const hero = `${container} grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:pt-20 lg:pb-24`;
const h1 =
  "text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl";
const heroLead = "mt-5 max-w-lg text-lg leading-relaxed text-pretty text-muted";
const heroActions = "mt-8 flex flex-wrap gap-3";
const statList =
  "mt-12 grid max-w-lg grid-cols-3 divide-x divide-line border-t border-line pt-6";
const statItem = "grid gap-1 px-4 first:pl-0";
const statValue =
  "-order-1 text-lg font-semibold tracking-tight tabular-nums sm:text-xl";
const statLabel = "text-sm text-muted";
const heroMedia = "relative lg:pl-8";
const heroImage =
  "aspect-[4/5] w-full rounded-3xl bg-subtle object-cover object-[50%_25%] sm:aspect-[5/4] lg:aspect-[6/7]";
const balanceCard =
  "absolute bottom-4 left-4 grid w-[min(18rem,calc(100%-2rem))] gap-3 rounded-2xl border border-line bg-surface p-5 shadow-overlay lg:bottom-10 lg:left-0";
const balanceHead = "flex items-center justify-between gap-2";
const balanceLabel = "text-sm text-muted";
const balanceAmount = "text-2xl font-semibold tracking-tight tabular-nums";
const goalRow = "grid gap-2 border-t border-line pt-3";
const goalText = "flex justify-between gap-2 text-xs text-muted";
const goalTrack = "h-1.5 overflow-hidden rounded-full bg-subtle";
const goalBar = "h-full w-[78%] rounded-full bg-primary";
const section = `${container} scroll-mt-20 py-16 sm:py-24`;
const sectionHead = "grid max-w-2xl gap-4";
const h2 = "text-3xl font-semibold tracking-tight text-balance sm:text-4xl";
const lead = "text-lg leading-relaxed text-pretty text-muted";
const lifestyle = `${container} scroll-mt-20 py-4`;
const lifestylePanel =
  "relative grid min-h-[30rem] content-start overflow-hidden rounded-3xl bg-subtle p-3 sm:min-h-[38rem] sm:p-4";
const lifestyleImage =
  "absolute inset-0 size-full object-cover object-[50%_80%]";
const lifestyleHead =
  "relative grid max-w-md gap-3 rounded-2xl bg-surface/90 p-6 backdrop-blur-md sm:p-8";
const lifestyleTitle =
  "text-3xl font-semibold tracking-tight text-balance sm:text-4xl";
const lifestyleText = "text-base leading-relaxed text-pretty text-muted";
const pillarGrid = "mt-3 grid gap-3 md:grid-cols-3";
const pillarCard =
  "grid content-start gap-3 rounded-2xl border border-line bg-surface p-6";
const pillarIcon =
  "flex size-10 items-center justify-center rounded-full bg-primary-soft text-primary";
const pillarTitle = "text-lg font-semibold tracking-tight";
const pillarText = "text-sm leading-relaxed text-pretty text-muted";
const simGrid = "mt-10 grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]";
const simForm =
  "grid content-start gap-8 rounded-2xl border border-line bg-surface p-5 sm:p-8";
const fieldGroup = "grid gap-3";
const fieldLabel = "text-sm font-medium";
const filterScroll = "max-w-full overflow-x-auto";
const simResult =
  "grid content-start gap-6 rounded-2xl bg-primary-soft p-5 sm:p-8";
const resultLabel = "text-sm text-muted";
const resultAmount =
  "mt-1 text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl";
const splitTrack = "flex h-3 overflow-hidden rounded-full bg-surface";
const splitPaid = "h-full bg-primary";
const splitList = "grid gap-3 text-sm";
const splitRow = "flex items-center justify-between gap-3";
const splitKey = "flex items-center gap-2 text-muted";
const dotPaid = "size-2.5 rounded-full bg-primary";
const dotGrowth = "size-2.5 rounded-full border border-primary bg-surface";
const splitValue = "font-medium tabular-nums";
const simNote = "text-xs leading-relaxed text-pretty text-muted";
const productGrid = "mt-10 grid gap-4 lg:grid-cols-3";
const productCard =
  "flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6";
const productHead = "flex items-center justify-between gap-2";
const productName = "text-lg font-semibold tracking-tight";
const productRate = "text-4xl font-semibold tracking-tight tabular-nums";
const productUnit = "mt-1 text-sm text-muted";
const productText = "text-sm leading-relaxed text-pretty text-muted";
const featureList =
  "grid flex-1 content-start gap-3 border-t border-line pt-5 text-sm";
const featureItem = "flex gap-2";
const checkIcon = "mt-0.5 size-4 shrink-0 text-primary";
const trustWrap = `${container} scroll-mt-20 pb-4`;
const trustBand =
  "grid gap-8 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12";
const trustTitle = "text-xl font-semibold tracking-tight";
const trustText = "mt-2 text-sm leading-relaxed text-pretty text-muted";
const trustGrid = "grid gap-6 sm:grid-cols-2";
const trustItem = "flex gap-3";
const trustIcon =
  "flex size-9 shrink-0 items-center justify-center rounded-lg bg-subtle text-ink";
const trustName = "text-sm font-semibold";
const trustNote = "mt-1 text-sm leading-relaxed text-pretty text-muted";
const faqLayout = `${section} grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16`;
const faqAside = "grid content-start justify-items-start gap-4";
const faqList = "[&>div]:max-w-none [&>div]:gap-0";
const appWrap = `${container} scroll-mt-20 pb-20 sm:pb-24`;
const appBand =
  "grid gap-8 rounded-3xl bg-primary-soft p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12";
const appTitle =
  "text-3xl font-semibold tracking-tight text-balance sm:text-4xl";
const appText = "mt-3 text-base leading-relaxed text-pretty text-muted";
const storeRow = "mt-6 flex flex-wrap gap-3";
const linkForm = "grid gap-2";
const linkRow = "grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]";
const linkField = "h-11 bg-surface text-base sm:text-sm";
const linkButton = "h-11 shrink-0";
const fieldError = "text-sm text-danger";
const fieldHint = "text-sm text-muted";
const footer = `${footerEdge} bg-canvas`;

/* Data */
// prettier-ignore
const icons = {
  sprout: "M12 20v-8m0 0c0-4 3-7 7-7 0 4-3 7-7 7Zm0 0C12 8 9 5 5 5c0 4 3 7 7 7",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  check: "m5 12.5 4.5 4.5L19 7.5",
  layers: "m12 4 8 4-8 4-8-4Zm-8 8 8 4 8-4m-16 4 8 4 8-4",
  chart: "M4 19h16M6 15l4-4 3 3 5-6",
  flag: "M5 21V4m0 0h11l-2 4 2 4H5",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z",
  bank: "M3 10h18L12 4Zm2 0v8m4-8v8m6-8v8m4-8v8M3 20h18",
  shield: "M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6Z",
  badge: "M12 3l2.5 2 3.2-.3.8 3.1 2.5 2-1.4 2.9.4 3.2-3.1.8-2 2.5-2.9-1.4-2.9 1.4-2-2.5-3.1-.8.4-3.2L3 10.2l2.5-2 .8-3.1 3.2.3Z",
};
type IconName = keyof typeof icons;

const IMG = "/template-images/tabungan";
const PHONE_ID = "tabungan-phone";
const PHONE_PATTERN = /^(\+62|62|0)8\d{8,11}$/;
const MONTHS = 12;
const DEFAULT_MONTHLY = 1000000;
const DEFAULT_YEARS = 5;
const DEFAULT_PLAN = "balanced";
// prettier-ignore
const nav = [
  { label: "Save", href: "#save" }, { label: "Invest", href: "#invest" },
  { label: "Plan", href: "#plan" }, { label: "Advice", href: "#advice" },
  { label: "About", href: "#about" },
];
// prettier-ignore
const stats = [
  { value: "1,2 million", label: "savers" }, { value: "Rp 4,8 T", label: "saved so far" },
  { value: "4,8 / 5", label: "app rating" },
];
// prettier-ignore
const pillars = [
  { icon: "layers", title: "Build capital", text: "Put aside from Rp 10.000 at a time, or set an automatic transfer on payday and forget about it." },
  { icon: "chart", title: "Grow your money", text: "Move savings you will not need for a while into mutual funds or gold, without a minimum balance." },
  { icon: "flag", title: "Fund your dreams", text: "Name a goal, pick a date, and see exactly how much to put aside each month to get there." },
] as const;
// prettier-ignore
const plans = [
  { value: "savings", label: "Savings 4,5%", rate: 0.045 },
  { value: "balanced", label: "Balanced 7%", rate: 0.07 },
  { value: "equity", label: "Equity 10%", rate: 0.1 },
];
const presets = [500000, 1000000, 2500000];
// prettier-ignore
const products = [
  { id: "saver", name: "Tunas Saver", cta: "Open a Saver pocket", tag: "Most opened", rate: "4,5%", unit: "a year, paid daily", text: "A savings pocket for money you might need soon. Withdraw to any bank in minutes.", features: ["No minimum balance", "Free transfers to all banks", "Up to 10 goal pockets"] },
  { id: "funds", name: "Mutual funds", cta: "Start investing", tag: "", rate: "7,1%", unit: "5-year average, balanced fund", text: "Money market, bond, balanced, and equity funds from licensed fund managers.", features: ["Start from Rp 10.000", "No buying or selling fees", "Monthly auto-invest"] },
  { id: "gold", name: "Digital gold", cta: "Buy gold", tag: "", rate: "0,01 g", unit: "smallest purchase", text: "Buy 24 karat gold by the gram, stored in an insured vault and backed one to one.", features: ["Live buy and sell prices", "Print to physical gold from 5 g", "Gift gold to family"] },
];
// prettier-ignore
const trust = [
  { icon: "lock", name: "Bank-grade encryption", note: "Your data and transactions are encrypted in transit and at rest." },
  { icon: "bank", name: "Funds held by a custodian bank", note: "Your money sits in segregated accounts, never mixed with ours." },
  { icon: "shield", name: "Two-step login", note: "Every new device needs your PIN and a one-time code." },
  { icon: "badge", name: "Licensed and supervised", note: "Licence no. KEP-0417/2026. Tunas is a fictional brand: show your real licence here." },
] as const;
// prettier-ignore
const faqs = [
  { question: "Is my money safe with Tunas?", answer: "Savings are held in segregated accounts at our custodian bank, and fund units are registered in your own name, so they stay yours even if Tunas stops operating." },
  { question: "How much do I need to start?", answer: "Rp 10.000. There is no minimum balance and no monthly fee for savings, funds, or gold." },
  { question: "How fast can I withdraw?", answer: "Savings reach your bank account within minutes. Mutual fund sales settle in one to three working days, depending on the fund." },
  { question: "Are the simulator returns guaranteed?", answer: "No. Savings interest is fixed for the month, but fund and gold returns change with the market. The simulator shows an estimate, not a promise." },
  { question: "Which documents do I need to sign up?", answer: "Your e-KTP and a selfie. Most accounts are verified within ten minutes." },
];
// prettier-ignore
const footerColumns = [
  { title: "Products", links: [{ label: "Tunas Saver", href: "#invest" }, { label: "Mutual funds", href: "#invest" }, { label: "Digital gold", href: "#invest" }] },
  { title: "Company", links: [{ label: "About", href: "#about" }, { label: "Careers", href: "/careers" }, { label: "Press", href: "/press" }] },
  { title: "Help", links: [{ label: "FAQ", href: "#advice" }, { label: "Contact", href: "/contact" }, { label: "Report fraud", href: "/fraud" }] },
];
// prettier-ignore
const legal = [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Risk disclosure", href: "/risk" }];

const rupiah = (value: number) =>
  `Rp ${String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
const rateOf = (value: string) =>
  plans.find((plan) => plan.value === value)?.rate ?? 0;
/** Proyeksi setoran bulanan dengan bunga majemuk bulanan, dibulatkan ke rupiah. */
const project = (monthly: number, years: number, rate: number) => {
  const months = years * MONTHS;
  const paid = monthly * months;
  const r = rate / MONTHS;
  const total = r === 0 ? paid : (monthly * ((1 + r) ** months - 1)) / r;
  return { paid, total: Math.round(total), growth: Math.round(total) - paid };
};
const yearsLabel = (years: number) =>
  years === 1 ? "1 year" : `${years} years`;
const sharePercent = (part: number, whole: number) =>
  whole > 0 ? `${Math.round((part / whole) * 100)}%` : "0%";

/* End data */

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
        <Icon name="sprout" className="size-4" />
      </span>
      Tunas
    </a>
  );
}

function Checks({ items }: { items: readonly string[] }) {
  return (
    <ul className={featureList}>
      {items.map((item) => (
        <li key={item} className={featureItem}>
          <Icon name="check" className={checkIcon} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Tabungan() {
  const [monthly, setMonthly] = useState<number | null>(DEFAULT_MONTHLY);
  const [years, setYears] = useState(DEFAULT_YEARS);
  const [plan, setPlan] = useState(DEFAULT_PLAN);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const result = project(monthly ?? 0, years, rateOf(plan));

  /** Navbar tidak menutup menu mobile saat link di-klik; tutup lewat tombolnya sendiri. */
  const closeMenuOnLink = (event: MouseEvent<HTMLElement>) => {
    const link = (event.target as Element).closest("a");
    const toggle = event.currentTarget.querySelector<HTMLButtonElement>(
      "button[aria-expanded=true]",
    );
    if (link?.closest("[data-state=open]") && toggle) toggle.click();
  };
  const startPlan = () =>
    toast({
      title: "Plan saved",
      description: `${rupiah(monthly ?? 0)} a month for ${yearsLabel(years)}. Finish sign-up in the app to start your first transfer.`,
      variant: "success",
    });
  const openProduct = (name: string) =>
    toast({
      title: `${name} selected`,
      description: "Open the Tunas app to finish in about two minutes.",
    });
  const store = (platform: string) =>
    toast({
      title: `Opening the ${platform} store`,
      description:
        "Tunas is free to download. Sign-up takes about ten minutes.",
    });
  const advisor = () =>
    toast({
      title: "Advisor chat opened",
      description:
        "A licensed advisor replies within 15 minutes, 08.00 to 22.00 WIB.",
    });
  const sendLink = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = phone.replace(/[\s-]/g, "");
    if (!PHONE_PATTERN.test(value)) {
      setPhoneError("Enter an Indonesian mobile number, like 0812 3456 7890.");
      return;
    }
    setPhoneError("");
    setPhone("");
    toast({
      title: "Download link sent",
      description: `Check the SMS we sent to ${value}.`,
      variant: "success",
    });
  };

  return (
    <div id="top" className={root}>
      <Navbar
        variant="floating"
        sticky
        className={navbarEdge}
        brand={<Brand />}
        links={nav}
        onClick={closeMenuOnLink}
        actions={
          <a href="#download" className={navCta}>
            Get started
          </a>
        }
      />

      <main>
        <section aria-labelledby="tabungan-title" className={hero}>
          <div>
            <h1 id="tabungan-title" className={h1}>
              Bigger plans, starting today
            </h1>
            <p className={heroLead}>
              Save for the trip, the house, or the rainy day. Grow it in funds
              and gold when you are ready, all from Rp 10.000 and one app.
            </p>
            <div className={heroActions}>
              <a href="#download" className={primaryLink}>
                Get started
                <Icon name="arrow" className="size-4" />
              </a>
              <a href="#plan" className={secondaryLink}>
                Try the simulator
              </a>
            </div>
            <dl className={statList}>
              {stats.map((stat) => (
                <div key={stat.label} className={statItem}>
                  <dt className={statLabel}>{stat.label}</dt>
                  <dd className={statValue}>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className={heroMedia}>
            <img
              src={`${IMG}/traveller.webp`}
              alt="Smiling young woman with a backpack checking her phone at a train station"
              width={960}
              height={1120}
              decoding="async"
              className={heroImage}
            />
            <figcaption className={balanceCard}>
              <div className={balanceHead}>
                <span className={balanceLabel}>My savings</span>
                <Badge variant="success" dot={false}>
                  +12,5%
                </Badge>
              </div>
              <p className={balanceAmount}>Rp 58.300.000</p>
              <div className={goalRow}>
                <p className={goalText}>
                  <span>Trip to Japan</span>
                  <span>78% of Rp 75.000.000</span>
                </p>
                <div className={goalTrack}>
                  <div className={goalBar} />
                </div>
              </div>
            </figcaption>
          </figure>
        </section>

        <section
          id="save"
          aria-labelledby="tabungan-save"
          className={lifestyle}
        >
          <div className={lifestylePanel}>
            <img
              src={`${IMG}/family-park.webp`}
              alt="A family walking hand in hand along a tree-lined park path"
              width={1600}
              height={760}
              loading="lazy"
              decoding="async"
              className={lifestyleImage}
            />
            <div className={lifestyleHead}>
              <h2 id="tabungan-save" className={lifestyleTitle}>
                Save today to live better tomorrow
              </h2>
              <p className={lifestyleText}>
                Small amounts, set aside often, add up to the things that
                matter. Tunas makes the habit automatic.
              </p>
            </div>
          </div>
          <ul className={pillarGrid}>
            {pillars.map((pillar) => (
              <li key={pillar.title} className={pillarCard}>
                <span className={pillarIcon}>
                  <Icon name={pillar.icon} className="size-5" />
                </span>
                <h3 className={pillarTitle}>{pillar.title}</h3>
                <p className={pillarText}>{pillar.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="plan" aria-labelledby="tabungan-plan" className={section}>
          <div className={sectionHead}>
            <h2 id="tabungan-plan" className={h2}>
              See where a monthly habit can take you
            </h2>
            <p className={lead}>
              Pick an amount, a time frame, and how you want to grow it. The
              projection updates as you go.
            </p>
          </div>
          <div className={simGrid}>
            <form
              className={simForm}
              aria-label="Savings simulator"
              onSubmit={(event) => event.preventDefault()}
            >
              <CurrencyInput
                label="Monthly amount"
                name="monthly"
                min={10000}
                max={100000000}
                defaultValue={DEFAULT_MONTHLY}
                presets={presets}
                onValueChange={setMonthly}
              />
              <Slider
                label="Duration in years"
                name="years"
                min={1}
                max={20}
                value={years}
                onValueChange={setYears}
              />
              <div className={fieldGroup}>
                <p className={fieldLabel}>Expected return a year</p>
                <div className={filterScroll}>
                  <ToggleGroup
                    label="Expected return a year"
                    items={plans}
                    value={plan}
                    onValueChange={(value) => value && setPlan(value)}
                  />
                </div>
              </div>
            </form>
            <div className={simResult} aria-live="polite">
              <div>
                <p className={resultLabel}>
                  Projected total after{" "}
                  <span data-sim-years="">{yearsLabel(years)}</span>
                </p>
                <p data-sim-total="" className={resultAmount}>
                  {rupiah(result.total)}
                </p>
              </div>
              <div className={splitTrack} aria-hidden="true">
                <div
                  className={splitPaid}
                  style={{ width: sharePercent(result.paid, result.total) }}
                />
              </div>
              <dl className={splitList}>
                <div className={splitRow}>
                  <dt className={splitKey}>
                    <span className={dotPaid} />
                    You put in
                  </dt>
                  <dd data-sim-paid="" className={splitValue}>
                    {rupiah(result.paid)}
                  </dd>
                </div>
                <div className={splitRow}>
                  <dt className={splitKey}>
                    <span className={dotGrowth} />
                    Expected growth
                  </dt>
                  <dd data-sim-growth="" className={splitValue}>
                    {rupiah(result.growth)}
                  </dd>
                </div>
              </dl>
              <Button size="lg" onClick={startPlan}>
                Start this plan
              </Button>
              <p className={simNote}>
                Estimate only, compounded monthly. Fund and gold returns go up
                and down and are not guaranteed.
              </p>
            </div>
          </div>
        </section>

        <section
          id="invest"
          aria-labelledby="tabungan-invest"
          className={section}
        >
          <div className={sectionHead}>
            <h2 id="tabungan-invest" className={h2}>
              One app for saving and investing
            </h2>
            <p className={lead}>
              Start with savings, add funds or gold when you are ready. Move
              between them any time.
            </p>
          </div>
          <ul className={productGrid}>
            {products.map((product) => (
              <li
                key={product.id}
                data-product={product.id}
                className={productCard}
              >
                <div className={productHead}>
                  <h3 className={productName}>{product.name}</h3>
                  {product.tag && (
                    <Badge variant="primary" dot={false}>
                      {product.tag}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className={productRate}>{product.rate}</p>
                  <p className={productUnit}>{product.unit}</p>
                </div>
                <p className={productText}>{product.text}</p>
                <Checks items={product.features} />
                <Button
                  variant={product.tag ? "primary" : "secondary"}
                  onClick={() => openProduct(product.name)}
                >
                  {product.cta}
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <div id="about" className={trustWrap}>
          <section aria-labelledby="tabungan-trust" className={trustBand}>
            <div>
              <h2 id="tabungan-trust" className={trustTitle}>
                Your money is protected
              </h2>
              <p className={trustText}>
                PT Tunas Finansial Nusantara works with a custodian bank and
                licensed fund managers. We never lend out your savings.
              </p>
            </div>
            <ul className={trustGrid}>
              {trust.map((item) => (
                <li key={item.name} className={trustItem}>
                  <span className={trustIcon}>
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <div>
                    <p className={trustName}>{item.name}</p>
                    <p className={trustNote}>{item.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section
          id="advice"
          aria-labelledby="tabungan-faq"
          className={faqLayout}
        >
          <div className={faqAside}>
            <h2 id="tabungan-faq" className={h2}>
              Questions before you start
            </h2>
            <p className={lead}>
              Not sure where to put your money? Our licensed advisors answer for
              free, with no sales targets.
            </p>
            <Button variant="secondary" onClick={advisor}>
              Ask an advisor
            </Button>
          </div>
          <Faq items={faqs} exclusive className={faqList} />
        </section>

        <div id="download" className={appWrap}>
          <section aria-labelledby="tabungan-app" className={appBand}>
            <div>
              <h2 id="tabungan-app" className={appTitle}>
                Your plans, in your pocket
              </h2>
              <p className={appText}>
                Open an account in ten minutes with your e-KTP. Free on iPhone
                and Android.
              </p>
              <div className={storeRow}>
                <Button variant="secondary" onClick={() => store("iPhone")}>
                  Download for iPhone
                </Button>
                <Button variant="secondary" onClick={() => store("Android")}>
                  Download for Android
                </Button>
              </div>
            </div>
            <form className={linkForm} noValidate onSubmit={sendLink}>
              <label htmlFor={PHONE_ID} className={fieldLabel}>
                Get the link by SMS
              </label>
              <div className={linkRow}>
                <Input
                  id={PHONE_ID}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="0812 3456 7890"
                  className={linkField}
                  value={phone}
                  aria-invalid={phoneError ? true : undefined}
                  aria-describedby={`${PHONE_ID}-note`}
                  onChange={(event) => setPhone(event.target.value)}
                />
                <Button type="submit" className={linkButton}>
                  Send link
                </Button>
              </div>
              <p
                id={`${PHONE_ID}-note`}
                className={phoneError ? fieldError : fieldHint}
              >
                {phoneError || "One SMS, no marketing messages."}
              </p>
            </form>
          </section>
        </div>
      </main>

      <Footer
        className={footer}
        brand={<Brand />}
        description="Savings, mutual funds, and digital gold for everyday plans in Indonesia."
        columns={footerColumns}
        legal={legal}
        copyright="© 2026 PT Tunas Finansial Nusantara. Built with MarkasUI."
      />
      <Toaster />
    </div>
  );
}
