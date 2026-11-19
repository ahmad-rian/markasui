"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { Avatar } from "../../../components/avatar/Avatar";
import { Badge } from "../../../components/badge/Badge";
import { Button } from "../../../components/button/Button";
import { Faq } from "../../../components/faq/Faq";
import { Footer } from "../../../components/footer/Footer";
import { Input } from "../../../components/input/Input";
import { Navbar } from "../../../components/navbar/Navbar";
import { Toaster, toast } from "../../../components/toast/Toast";
import { ToggleGroup } from "../../../components/toggle-group/ToggleGroup";

/* Classes */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const root = "relative min-h-dvh bg-canvas text-ink";
const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
const footerEdge = "px-[max(1rem,calc((100%-72rem)/2+2rem))]";
const navWrap =
  "dark absolute inset-x-6 top-6 z-30 sm:inset-x-10 sm:top-10 lg:inset-x-12 lg:top-12";
const navbar =
  "mx-auto max-w-4xl border-ink/15! bg-canvas/55! shadow-none! backdrop-blur-xl";
const brandLink = `flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink ${focusRing}`;
const brandMark =
  "flex size-7 items-center justify-center rounded-full bg-ink text-canvas";
const startLink = `inline-flex h-9 items-center rounded-full bg-ink px-4 text-sm font-medium whitespace-nowrap text-canvas transition-colors duration-150 hover:bg-ink/90 ${focusRing}`;
const frame =
  "dark m-2 rounded-[36px] border border-line bg-subtle p-2.5 pb-5 sm:m-3 sm:rounded-[44px] sm:p-4 sm:pb-8";
const windowPane =
  "relative isolate flex min-h-[660px] flex-col overflow-hidden rounded-[28px] ring-1 ring-ink/10 ring-inset sm:min-h-[720px] sm:rounded-[32px] lg:min-h-[760px]";
const heroImage =
  "absolute inset-0 -z-10 size-full object-cover object-[50%_70%]";
const heroShade =
  "absolute inset-0 -z-10 bg-linear-to-b from-canvas/70 via-canvas/55 via-45% to-canvas/55 sm:via-canvas/50 sm:to-canvas/15";
const heroBody =
  "flex flex-1 flex-col items-center px-5 pt-32 pb-6 text-center text-ink sm:px-10 sm:pt-40 sm:pb-10";
const chip =
  "inline-flex items-center gap-2 rounded-full border border-ink/15 bg-canvas/35 px-3 py-1.5 text-sm text-ink backdrop-blur-md";
const chipDot = "size-1.5 shrink-0 rounded-full bg-success";
const h1 =
  "mt-6 max-w-3xl text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl";
const heroLead =
  "mt-5 max-w-xl text-lg leading-relaxed text-pretty text-ink text-shadow-sm text-shadow-canvas/60";
const heroForm = "mt-9 grid w-full max-w-md gap-2 text-left";
const heroRow =
  "grid gap-2 rounded-2xl border border-ink/15 bg-canvas/45 p-1.5 backdrop-blur-xl sm:grid-cols-[minmax(0,1fr)_auto] sm:rounded-full";
const heroField =
  "h-11! rounded-full! border-transparent! bg-transparent! px-4! text-base! placeholder:text-ink/70! aria-invalid:border-danger! sm:text-sm!";
const heroButton = `inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium whitespace-nowrap text-canvas transition-colors duration-150 hover:bg-ink/90 ${focusRing}`;
const heroNote = "px-4 text-center text-sm text-ink";
const heroError = "px-4 text-center text-sm font-medium text-ink";
const sessionCard =
  "mt-auto hidden w-full max-w-sm items-center gap-4 rounded-2xl border border-ink/15 bg-canvas/45 p-4 text-left backdrop-blur-xl sm:flex";
const sessionRing =
  "flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink/20 border-t-ink text-xs font-semibold tabular-nums";
const sessionTitle = "text-sm font-semibold";
const sessionText = "text-sm text-ink/80";
const section = `${container} scroll-mt-6 py-16 sm:py-24`;
const sectionHead = "grid max-w-2xl gap-4";
const sectionCenter = "mx-auto grid max-w-2xl gap-4 text-center";
const h2 = "text-3xl font-semibold tracking-tight text-balance sm:text-4xl";
const lead = "text-lg leading-relaxed text-pretty text-muted";
const howGrid =
  "grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16";
const howImage =
  "aspect-[4/5] w-full rounded-3xl bg-subtle object-cover lg:max-w-md";
const stepList = "mt-10 grid gap-8";
const stepItem = "grid grid-cols-[auto_minmax(0,1fr)] gap-4";
const stepNumber =
  "flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary tabular-nums";
const stepTitle = "text-lg font-semibold tracking-tight";
const stepText = "mt-1 text-base leading-relaxed text-pretty text-muted";
const bento = "mt-12 grid gap-4 lg:grid-cols-3";
const bentoCard =
  "flex flex-col gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-8";
const bentoTitle = "text-lg font-semibold tracking-tight";
const bentoText = "mt-2 text-sm leading-relaxed text-pretty text-muted";
const batchList = "mt-auto grid gap-2";
const batchItem =
  "flex items-center justify-between gap-3 rounded-xl bg-subtle px-3 py-2.5 text-sm";
const batchApp = "font-medium";
const batchCount = "text-muted tabular-nums";
const timerBox = "mt-auto rounded-2xl bg-primary-soft p-5";
const timerValue =
  "text-4xl font-semibold tracking-tight text-primary tabular-nums";
const timerLabel = "mt-1 text-sm text-muted";
const timerTrack = "mt-4 h-1.5 overflow-hidden rounded-full bg-primary-line";
const timerBar = "h-full w-[64%] rounded-full bg-primary";
const chart = "mt-auto grid gap-3";
const chartBars = "flex h-32 items-end gap-2";
const chartBar = "flex-1 rounded-md bg-primary";
const chartDays = "flex gap-2 text-center text-xs text-muted";
const chartDay = "flex-1";
const chartNote = "text-sm text-muted";
const previewGrid =
  "grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16";
const profileScroll = "mt-8 max-w-full overflow-x-auto";
const profileText = "mt-6 text-base leading-relaxed text-pretty text-muted";
const phoneWrap =
  "flex justify-center rounded-3xl bg-primary-soft px-4 py-10 sm:py-14";
const phone =
  "w-full max-w-[300px] rounded-[2.75rem] border border-line bg-surface p-2.5 shadow-overlay";
const screen = "grid gap-4 rounded-[2.25rem] bg-canvas px-5 pt-6 pb-7";
const screenTop = "flex items-center justify-between text-xs text-muted";
const screenTitle = "text-xl font-semibold tracking-tight";
const screenSub = "text-sm text-muted";
const screenCard = "grid gap-1 rounded-2xl bg-surface p-4";
const screenLabel = "text-xs text-muted";
const screenValue =
  "text-2xl font-semibold tracking-tight text-primary tabular-nums";
const allowList = "grid gap-2";
const allowItem =
  "flex items-center justify-between gap-3 rounded-xl bg-surface px-3 py-2.5 text-sm";
const storyGrid = "mt-12 grid gap-4 lg:grid-cols-3";
const storyCard =
  "flex h-full flex-col justify-between gap-8 rounded-3xl bg-subtle p-6 sm:p-8";
const quoteText = "text-base leading-relaxed text-pretty";
const person = "flex items-center gap-3";
const personName = "text-sm font-medium";
const personRole = "text-sm text-muted";
const pricingHead = "flex flex-wrap items-end justify-between gap-6";
const billingRow = "flex flex-wrap items-center gap-3";
const saveNote = "text-sm text-muted";
const planGrid = "mt-10 grid gap-4 lg:grid-cols-3";
const planCard = "flex flex-col rounded-3xl border border-line bg-surface p-6";
const planFeatured =
  "flex flex-col rounded-3xl border-2 border-primary bg-surface p-[23px]";
const planHead = "flex items-center justify-between gap-2";
const planName = "text-base font-semibold";
const planText = "mt-4 text-sm leading-relaxed text-muted";
const planPrice = "mt-6 flex items-baseline gap-1";
const planAmount = "text-3xl font-semibold tracking-tight";
const planUnit = "text-sm text-muted";
const planNote = "mt-1 text-sm text-muted";
const featureList =
  "mt-6 mb-8 grid flex-1 content-start gap-3 border-t border-line pt-6 text-sm";
const featureItem = "flex gap-2";
const featureIcon = "mt-0.5 size-4 shrink-0 text-primary";
const planButton = "w-full";
const faqLayout = `${section} grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16`;
const faqAside = "grid content-start justify-items-start gap-4";
const faqList = "[&>div]:max-w-none [&>div]:gap-0";
const bandWrap = `${container} pb-20 sm:pb-24`;
const band =
  "grid overflow-hidden rounded-3xl bg-primary-soft lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]";
const bandImage = "aspect-[4/3] size-full bg-line object-cover";
const bandBody =
  "grid content-center justify-items-start gap-4 p-6 sm:p-10 lg:p-14";
const bandTitle =
  "text-2xl font-semibold tracking-tight text-balance sm:text-3xl";
const bandText = "text-base leading-relaxed text-pretty text-muted";
const bandLink = `mt-2 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const footer = `${footerEdge} bg-canvas`;

/* Data */
// prettier-ignore
const icons = {
  leaf: "M5 19c0-8 5-13 14-14-1 9-6 14-14 14Zm0 0 7-7",
  check: "m5 12.5 4.5 4.5L19 7.5",
};
type IconName = keyof typeof icons;

const EMAIL_ID = "fokus-email";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_HINT = "Free during the beta. One email when your invite is ready.";
const EMAIL_ERROR = "Enter a valid email address, like nama@email.com.";
// prettier-ignore
const nav = [
  { label: "How it works", href: "#how" }, { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" }, { label: "FAQ", href: "#faq" },
];
// prettier-ignore
const steps = [
  { title: "Choose what can wait", text: "Mark the apps and people that can always reach you. Everything else waits quietly in Teduh." },
  { title: "Work in quiet blocks", text: "Start a session from your phone or laptop. Your status updates in team chat so nobody wonders where you went." },
  { title: "Catch up in one batch", text: "Held notifications arrive together at times you pick, sorted by person and by how urgent they are." },
];
// prettier-ignore
const batches = [
  { app: "Team chat", count: "9 messages" }, { app: "Email", count: "14 emails" },
  { app: "Delivery and rides", count: "4 updates" }, { app: "Social", count: "23 alerts" },
];
// prettier-ignore
const week = [
  { day: "Mon", bar: "h-[46%]" }, { day: "Tue", bar: "h-[72%]" }, { day: "Wed", bar: "h-[60%]" },
  { day: "Thu", bar: "h-[88%]" }, { day: "Fri", bar: "h-[54%]" }, { day: "Sat", bar: "h-[22%]" },
  { day: "Sun", bar: "h-[12%]" },
];
// prettier-ignore
const profiles = [
  { value: "work", label: "Deep work", text: "Only your calendar, favourite contacts, and mentions from your own team get through. Everything else waits for the noon batch.", title: "Deep work", sub: "Until 12.00, then one batch", stat: "2h 40m", statLabel: "Focused today", held: "18 held",
    allowed: [{ app: "Calendar", rule: "Meetings only" }, { app: "Phone", rule: "Favourites" }, { app: "Team chat", rule: "Mentions" }] },
  { value: "evening", label: "Evening", text: "Work apps go silent at 18.00. Family groups and delivery updates still arrive, and everything else waits for tomorrow morning.", title: "Evening", sub: "18.00 to 07.00", stat: "0", statLabel: "Work pings after 18.00", held: "31 held",
    allowed: [{ app: "Family group", rule: "Always" }, { app: "Delivery and rides", rule: "Live orders" }, { app: "Phone", rule: "Everyone" }] },
  { value: "weekend", label: "Weekend", text: "One batch on Saturday morning and one on Sunday evening. Your phone stays a phone for the rest of the weekend.", title: "Weekend", sub: "Batches at 09.00 and 19.00", stat: "2", statLabel: "Batches this weekend", held: "54 held",
    allowed: [{ app: "Phone", rule: "Favourites" }, { app: "Maps", rule: "Always" }, { app: "Bank", rule: "Security codes" }] },
] as const;
type ProfileId = (typeof profiles)[number]["value"];
// prettier-ignore
const stories = [
  { name: "Dimas Pratama", role: "Backend Engineer, Bandung", quote: "I used to check my phone every few minutes without noticing. After two weeks with Teduh my longest focus block went from 25 minutes to almost two hours." },
  { name: "Laras Wulandari", role: "Founder of a wellbeing studio, Yogyakarta", quote: "We recommend Teduh to clients who say they cannot switch off. The evening profile alone changed how a lot of them sleep." },
  { name: "Kevin Tanoto", role: "Head of Product, remote team of 40", quote: "Our team shares focus hours now. People know when to expect replies, so nobody feels guilty for not answering in five minutes." },
];
// prettier-ignore
const billingOptions = [{ value: "monthly", label: "Monthly" }, { value: "yearly", label: "Yearly" }];
// prettier-ignore
const plans = [
  { id: "free", name: "Free", tag: "", monthly: 0, yearly: 0, unit: "/month", text: "For trying a calmer phone on your own.", features: ["One focus profile", "Two batches a day", "Seven days of reports"] },
  { id: "plus", name: "Plus", tag: "Most chosen", monthly: 39000, yearly: 31000, unit: "/month", text: "For people who want their attention back for good.", features: ["Unlimited profiles and batches", "Laptop and phone in sync", "Weekly focus report", "Sleep and evening schedules"] },
  { id: "teams", name: "Teams", tag: "", monthly: 59000, yearly: 47000, unit: "/member", text: "For remote teams that agree on quiet hours.", features: ["Everything in Plus", "Shared focus hours and status", "Team report without personal data", "Admin and invoices in Rupiah"] },
];
// prettier-ignore
const faqs = [
  { question: "Does Teduh read my messages?", answer: "No. Teduh only sees which app sent a notification and when. Message content stays on your phone and is never uploaded." },
  { question: "Will I miss something urgent?", answer: "Calls from favourites, security codes, and anything you mark as urgent always come through. You can also let a contact break through by calling twice." },
  { question: "Which devices are supported?", answer: "Android 10 and newer, iOS 17 and newer, and a desktop app for Windows and macOS that keeps your laptop in the same session." },
  { question: "When does the beta open?", answer: "We invite people from the waitlist every week. Most invites go out within three weeks of signing up." },
  { question: "Can my company pay for Teams?", answer: "Yes. Teams is billed per member in Rupiah, with tax invoices for Indonesian companies and a 30 day pilot for up to 20 people." },
];
// prettier-ignore
const footerColumns = [
  { title: "Product", links: [{ label: "How it works", href: "#how" }, { label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }] },
  { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }] },
  { title: "Support", links: [{ label: "FAQ", href: "#faq" }, { label: "Contact", href: "/contact" }, { label: "For teams", href: "#pricing" }] },
];
// prettier-ignore
const legal = [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }];

const rupiah = (value: number) =>
  `Rp ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
const profileOf = (value: string) =>
  profiles.find((item) => item.value === value) ?? profiles[0];
const planPriceOf = (plan: (typeof plans)[number], billing: string) =>
  billing === "yearly" ? plan.yearly : plan.monthly;
const planNoteOf = (plan: (typeof plans)[number], billing: string) =>
  plan.monthly === 0
    ? "Free forever"
    : billing === "yearly"
      ? `Billed ${rupiah(plan.yearly * 12)} a year`
      : "Billed monthly, cancel anytime";

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
        <Icon name="leaf" className="size-4" />
      </span>
      Teduh
    </a>
  );
}

function Waitlist() {
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
    setEmail("");
    toast({
      title: "You are on the waitlist",
      description: `We will email ${value} when your invite is ready.`,
      variant: "success",
    });
  };
  return (
    <form id="join" className={heroForm} noValidate onSubmit={submit}>
      <label htmlFor={EMAIL_ID} className="sr-only">
        Email address
      </label>
      <div className={heroRow}>
        <Input
          id={EMAIL_ID}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="nama@email.com"
          className={heroField}
          value={email}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${EMAIL_ID}-note`}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" className={heroButton}>
          Join the waitlist
        </button>
      </div>
      <p id={`${EMAIL_ID}-note`} className={error ? heroError : heroNote}>
        {error || EMAIL_HINT}
      </p>
    </form>
  );
}

export default function Fokus() {
  const [profileId, setProfileId] = useState<ProfileId>("work");
  const [billing, setBilling] = useState("monthly");
  const profile = profileOf(profileId);

  /** Navbar tidak menutup menu mobile saat link di-klik; tutup lewat tombolnya sendiri. */
  const closeMenuOnLink = (event: MouseEvent<HTMLElement>) => {
    const link = (event.target as Element).closest("a");
    const toggle = event.currentTarget.querySelector<HTMLButtonElement>(
      "button[aria-expanded=true]",
    );
    if (link?.closest("[data-state=open]") && toggle) toggle.click();
  };
  const choosePlan = (name: string) =>
    toast({
      title: `${name} plan selected`,
      description:
        "We saved your choice. It applies when your beta invite arrives.",
    });
  const askQuestion = () =>
    toast({
      title: "Message sent",
      description:
        "Our team replies within one working day, in English or Bahasa Indonesia.",
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
            <a href="#join" className={startLink}>
              Get started
            </a>
          }
        />
      </div>

      <main>
        <section aria-labelledby="fokus-title" className={frame}>
          <div className={windowPane}>
            <img
              src="/template-images/fokus/hero-valley.webp"
              alt="Green valley with grassland and forest under mountains and a bright blue sky with white clouds"
              width={1600}
              height={1000}
              fetchPriority="high"
              decoding="async"
              className={heroImage}
            />
            <div aria-hidden="true" className={heroShade} />
            <div className={heroBody}>
              <p className={chip}>
                <span aria-hidden="true" className={chipDot} />
                Private beta for Android and iOS
              </p>
              <h1 id="fokus-title" className={h1}>
                Quiet your phone. Keep your focus.
              </h1>
              <p className={heroLead}>
                Teduh holds back notifications while you work and delivers them
                in calm batches, so the important ones still reach you.
              </p>
              <Waitlist />
              <div className={sessionCard}>
                <span aria-hidden="true" className={sessionRing}>
                  42m
                </span>
                <div>
                  <p className={sessionTitle}>Focus session, 42 minutes left</p>
                  <p className={sessionText}>
                    Writing the Q1 plan. 14 notifications held until 11.00.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how" aria-labelledby="fokus-how" className={section}>
          <div className={howGrid}>
            <img
              src="/template-images/fokus/desk-notebook.webp"
              alt="Open notebook on a bright white desk next to a closed laptop"
              width={640}
              height={800}
              loading="lazy"
              decoding="async"
              className={howImage}
            />
            <div>
              <div className={sectionHead}>
                <h2 id="fokus-how" className={h2}>
                  How Teduh gives you your mornings back
                </h2>
                <p className={lead}>
                  No app blocking and no willpower tricks. Teduh changes when
                  notifications arrive, not whether they do.
                </p>
              </div>
              <ol className={stepList}>
                {steps.map((step, index) => (
                  <li key={step.title} className={stepItem}>
                    <span aria-hidden="true" className={stepNumber}>
                      {index + 1}
                    </span>
                    <div>
                      <h3 className={stepTitle}>{step.title}</h3>
                      <p className={stepText}>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section
          id="features"
          aria-labelledby="fokus-features"
          className={section}
        >
          <div className={sectionCenter}>
            <h2 id="fokus-features" className={h2}>
              Fewer interruptions, without missing what matters
            </h2>
            <p className={lead}>
              Three tools that work together on your phone and your laptop.
            </p>
          </div>
          <ul className={bento}>
            <li className={bentoCard}>
              <div>
                <h3 className={bentoTitle}>Notification batching</h3>
                <p className={bentoText}>
                  Non-urgent alerts wait and arrive together at 09.00, 12.00,
                  and 16.00, or whenever you choose.
                </p>
              </div>
              <ul className={batchList}>
                {batches.map((batch) => (
                  <li key={batch.app} className={batchItem}>
                    <span className={batchApp}>{batch.app}</span>
                    <span className={batchCount}>{batch.count}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li className={bentoCard}>
              <div>
                <h3 className={bentoTitle}>Focus sessions</h3>
                <p className={bentoText}>
                  Start a session with one tap. Your team chat status changes,
                  and your laptop goes quiet at the same time.
                </p>
              </div>
              <div className={timerBox}>
                <p className={timerValue}>42:18</p>
                <p className={timerLabel}>left in this session</p>
                <div className={timerTrack}>
                  <div className={timerBar} />
                </div>
              </div>
            </li>
            <li className={bentoCard}>
              <div>
                <h3 className={bentoTitle}>Weekly reports</h3>
                <p className={bentoText}>
                  See when you focus best and which apps pull you away, in one
                  short report every Monday.
                </p>
              </div>
              <div className={chart}>
                <div aria-hidden="true" className={chartBars}>
                  {week.map((item) => (
                    <div key={item.day} className={`${chartBar} ${item.bar}`} />
                  ))}
                </div>
                <div aria-hidden="true" className={chartDays}>
                  {week.map((item) => (
                    <span key={item.day} className={chartDay}>
                      {item.day}
                    </span>
                  ))}
                </div>
                <p className={chartNote}>
                  14h 20m focused this week, up 3h from last week.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section
          id="preview"
          aria-labelledby="fokus-preview"
          className={section}
        >
          <div className={previewGrid}>
            <div>
              <div className={sectionHead}>
                <h2 id="fokus-preview" className={h2}>
                  A profile for every part of your day
                </h2>
                <p className={lead}>
                  Teduh switches profiles on its own based on time and place.
                  Pick one to see what gets through.
                </p>
              </div>
              <div className={profileScroll}>
                <ToggleGroup
                  label="Focus profiles"
                  items={profiles.map(({ value, label }) => ({ value, label }))}
                  value={profileId}
                  onValueChange={(value) =>
                    value && setProfileId(value as ProfileId)
                  }
                />
              </div>
              <p className={profileText}>{profile.text}</p>
            </div>
            <div className={phoneWrap}>
              <div data-profile={profile.value} className={phone}>
                <div className={screen}>
                  <div className={screenTop}>
                    <span>09.41</span>
                    <span>{profile.held}</span>
                  </div>
                  <div>
                    <p data-screen-title="" className={screenTitle}>
                      {profile.title}
                    </p>
                    <p className={screenSub}>{profile.sub}</p>
                  </div>
                  <div className={screenCard}>
                    <p className={screenLabel}>{profile.statLabel}</p>
                    <p className={screenValue}>{profile.stat}</p>
                  </div>
                  <ul
                    className={allowList}
                    aria-label="Allowed to break through"
                  >
                    {profile.allowed.map((item) => (
                      <li key={item.app} className={allowItem}>
                        <span>{item.app}</span>
                        <Badge dot={false}>{item.rule}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="stories"
          aria-labelledby="fokus-stories"
          className={section}
        >
          <div className={sectionHead}>
            <h2 id="fokus-stories" className={h2}>
              From people in the beta
            </h2>
          </div>
          <ul className={storyGrid}>
            {stories.map((story) => (
              <li key={story.name}>
                <figure className={storyCard}>
                  <blockquote className={quoteText}>{story.quote}</blockquote>
                  <figcaption className={person}>
                    <Avatar name={story.name} size="md" />
                    <div>
                      <p className={personName}>{story.name}</p>
                      <p className={personRole}>{story.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="pricing"
          aria-labelledby="fokus-pricing"
          className={section}
        >
          <div className={pricingHead}>
            <div className={sectionHead}>
              <h2 id="fokus-pricing" className={h2}>
                Simple pricing, free while in beta
              </h2>
              <p className={lead}>
                Everyone on the waitlist uses Plus for free until launch. Pick
                the plan you want afterwards.
              </p>
            </div>
            <div className={billingRow}>
              <ToggleGroup
                label="Billing period"
                items={billingOptions}
                value={billing}
                onValueChange={(value) => value && setBilling(value)}
              />
              <span className={saveNote}>Save 20% with yearly</span>
            </div>
          </div>
          <ul className={planGrid}>
            {plans.map((plan) => (
              <li
                key={plan.id}
                data-plan={plan.id}
                className={plan.tag ? planFeatured : planCard}
              >
                <div className={planHead}>
                  <h3 className={planName}>{plan.name}</h3>
                  {plan.tag && (
                    <Badge variant="primary" dot={false}>
                      {plan.tag}
                    </Badge>
                  )}
                </div>
                <p className={planText}>{plan.text}</p>
                <p className={planPrice}>
                  <span data-price="" className={planAmount}>
                    {rupiah(planPriceOf(plan, billing))}
                  </span>
                  <span className={planUnit}>{plan.unit}</span>
                </p>
                <p className={planNote}>{planNoteOf(plan, billing)}</p>
                <ul className={featureList}>
                  {plan.features.map((feature) => (
                    <li key={feature} className={featureItem}>
                      <Icon name="check" className={featureIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.tag ? "primary" : "secondary"}
                  className={planButton}
                  onClick={() => choosePlan(plan.name)}
                >
                  Choose {plan.name}
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" aria-labelledby="fokus-faq" className={faqLayout}>
          <div className={faqAside}>
            <h2 id="fokus-faq" className={h2}>
              Questions, answered
            </h2>
            <p className={lead}>
              Something else on your mind? A real person from our team in
              Jakarta reads every message.
            </p>
            <Button variant="secondary" onClick={askQuestion}>
              Ask a question
            </Button>
          </div>
          <Faq items={faqs} exclusive className={faqList} />
        </section>

        <div className={bandWrap}>
          <section aria-labelledby="fokus-teams" className={band}>
            <img
              src="/template-images/fokus/window-break.webp"
              alt="Person sitting by a large window in a warm home office, looking at snowy trees outside"
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              className={bandImage}
            />
            <div className={bandBody}>
              <h2 id="fokus-teams" className={bandTitle}>
                Quiet hours for the whole team
              </h2>
              <p className={bandText}>
                Remote teams use Teduh to agree on focus hours, so replies can
                wait without anyone feeling ignored. Try it with your team for
                30 days.
              </p>
              <a href="#join" className={bandLink}>
                Join the waitlist
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer
        className={footer}
        brand={<Brand />}
        description="A calmer phone for productivity, wellbeing, and remote work. Made in Jakarta."
        columns={footerColumns}
        legal={legal}
        copyright="© 2026 Teduh. Built with MarkasUI."
      />
      <Toaster />
    </div>
  );
}
