"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type SyntheticEvent,
} from "react";
import { Avatar } from "../../../components/avatar/Avatar";
import { Badge } from "../../../components/badge/Badge";
import { Button } from "../../../components/button/Button";
import { Faq } from "../../../components/faq/Faq";
import { Footer } from "../../../components/footer/Footer";
import { Input } from "../../../components/input/Input";
import { LogoCloud } from "../../../components/logo-cloud/LogoCloud";
import { Modal } from "../../../components/modal/Modal";
import { Navbar } from "../../../components/navbar/Navbar";
import { Toaster, toast } from "../../../components/toast/Toast";
import { ToggleGroup } from "../../../components/toggle-group/ToggleGroup";
import { playLottie, type LottieName } from "../lottie/player";

/* Classes */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const root = "min-h-dvh bg-canvas text-ink";
const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
const navbarEdge = "px-[max(0rem,calc((100%-70rem)/2))]";
const footerEdge = "px-[max(1rem,calc((100%-72rem)/2))]";
const brandLink = `flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink ${focusRing}`;
const brandMark =
  "flex size-7 items-center justify-center rounded-lg bg-primary text-on-primary";
const signIn = `hidden h-8 items-center rounded-md px-3 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink sm:inline-flex ${focusRing}`;
const startLink = `inline-flex h-8 items-center rounded-md bg-primary px-3 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const heroLink = `inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const lottieInk =
  "[&_path]:stroke-current [&_path[fill^=rgb]]:fill-current [&_svg]:block";
const hero = `${container} grid items-center gap-12 pt-12 pb-16 sm:pt-20 lg:grid-cols-2 lg:gap-16 lg:pt-24 lg:pb-24`;
const eyebrow = "flex items-center gap-2 text-sm font-medium text-primary";
const eyebrowDot = "size-1.5 shrink-0 rounded-full bg-primary";
const h1 =
  "mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl";
const heroLead = "mt-5 max-w-xl text-lg leading-relaxed text-pretty text-muted";
const heroActions = "mt-8 flex flex-wrap gap-3";
const factList = "mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted";
const fact = "flex items-center gap-2";
const checkIcon = "size-4 shrink-0 text-primary";
const heroCard = "rounded-2xl border border-line bg-surface p-2 shadow-overlay";
const heroStage =
  "grid aspect-[4/3] place-items-center rounded-xl bg-primary-soft bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] bg-size-[28px_28px] bg-center [--grid-line:color-mix(in_oklab,var(--color-primary)_8%,transparent)]";
const heroLottie = `size-[64%] text-primary ${lottieInk}`;
const nextRow = "flex items-center gap-3 px-3 pt-4";
const nextLabel = "text-xs text-muted";
const nextTitle = "text-sm font-medium";
const progressRow = "flex items-center gap-3 px-3 pt-4 pb-3";
const progressTrack =
  "h-1.5 flex-1 overflow-hidden rounded-full bg-primary-soft";
const progressBar = "h-full w-3/8 rounded-full bg-primary";
const progressText = "text-xs whitespace-nowrap text-muted";
const logoWrap = `${container} pb-16 sm:pb-20`;
const section = `${container} scroll-mt-16 py-16 sm:py-24`;
const sectionHead = "grid max-w-2xl gap-4";
const h2 = "text-3xl font-semibold tracking-tight text-balance sm:text-4xl";
const lead = "text-lg leading-relaxed text-pretty text-muted";
const toolbar = "mt-10 flex flex-wrap items-center justify-between gap-4";
const filterScroll = "max-w-full overflow-x-auto";
const countText = "text-sm text-muted";
const courseGrid = "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4";
const courseCard = "flex flex-col rounded-xl border border-line bg-surface";
const courseBody = "flex flex-1 flex-col p-5";
const courseTop = "flex items-center justify-between gap-2";
const topicText = "text-sm font-medium text-primary";
const courseTitle = "mt-4 text-lg leading-snug font-semibold tracking-tight";
const courseText = "mt-2 text-sm leading-relaxed text-pretty text-muted";
const courseMeta = "mt-auto pt-4 text-sm text-muted";
const courseFoot =
  "flex items-center justify-between gap-3 border-t border-line px-5 py-4";
const priceText = "text-base font-semibold";
const modalBody = "grid gap-5 text-ink";
const modalTitle = "mt-2 text-xl font-semibold tracking-tight";
const modalText = "mt-2 text-sm leading-relaxed text-muted";
const factGrid = "grid grid-cols-3 gap-2 text-sm";
const factCell = "rounded-lg bg-primary-soft p-3";
const factTerm = "text-xs text-muted";
const factValue = "mt-1 font-medium";
const projectBox = "rounded-lg border border-line p-4 text-sm";
const projectTerm = "font-medium";
const projectText = "mt-1 leading-relaxed text-muted";
const modalMentor = "flex items-center justify-between gap-4";
const person = "flex items-center gap-3";
const personName = "text-sm font-medium";
const personRole = "text-sm text-muted";
const modalPrice = "text-lg font-semibold whitespace-nowrap";
const stepGrid = "mt-12 grid gap-10 md:grid-cols-3 md:gap-8";
const stepArt =
  "flex size-28 items-center justify-center rounded-xl border border-primary-line bg-primary-soft";
const stepLottie = `size-24 text-primary ${lottieInk}`;
const stepLabel = "mt-6 text-sm font-medium text-primary";
const stepTitle = "mt-2 text-lg font-semibold tracking-tight";
const stepText = "mt-2 text-base leading-relaxed text-pretty text-muted";
const mentorGrid = "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4";
const mentorCard =
  "grid content-start gap-4 rounded-xl border border-line bg-surface p-5";
const mentorName = "text-base font-semibold";
const mentorBio = "text-sm leading-relaxed text-pretty text-muted";
const mentorTeaches = "border-t border-line pt-4 text-sm text-muted";
const storyGrid = "mt-12 grid gap-4 lg:grid-cols-3";
const storyCard =
  "flex h-full flex-col justify-between gap-8 rounded-xl bg-primary-soft p-6";
const quoteText = "text-base leading-relaxed text-pretty";
const pricingHead = "flex flex-wrap items-end justify-between gap-6";
const billingRow = "flex flex-wrap items-center gap-3";
const saveNote = "text-sm text-muted";
const planGrid = "mt-10 grid gap-4 lg:grid-cols-3";
const planCard = "flex flex-col rounded-xl border border-line bg-surface p-6";
const planFeatured =
  "flex flex-col rounded-xl border-2 border-primary bg-surface p-[23px]";
const planHead = "flex items-center justify-between gap-2";
const planName = "text-base font-semibold";
const planPrice = "mt-6 flex items-baseline gap-1";
const planAmount = "text-3xl font-semibold tracking-tight";
const planUnit = "text-sm text-muted";
const planNote = "mt-1 text-sm text-muted";
const planText = "mt-4 text-sm leading-relaxed text-muted";
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
  "grid gap-8 rounded-2xl border border-primary-line bg-primary-soft p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12";
const bandTitle =
  "text-2xl font-semibold tracking-tight text-balance sm:text-3xl";
const bandText = "mt-3 text-base leading-relaxed text-pretty text-muted";
const form = "grid gap-2";
const fieldLabel = "text-sm font-medium";
const fieldRow = "flex flex-col gap-2 sm:flex-row";
const field = "h-11 bg-surface text-base sm:text-sm";
const fieldButton = "h-11 shrink-0";
const fieldError = "text-sm text-danger";
const fieldHint = "text-sm text-muted";
const footer = `${footerEdge} bg-canvas`;

/* Data */
// prettier-ignore
const icons = {
  book: "M4 6.5c2.5-1.3 5-1.3 8 .7 3-2 5.5-2 8-.7v11c-2.5-1.3-5-1.3-8 .7-3-2-5.5-2-8-.7zM12 7.2v11",
  check: "m5 12.5 4.5 4.5L19 7.5",
  arrow: "M5 12h14m-6-6 6 6-6 6",
};
type IconName = keyof typeof icons;

const TITLE = "Learn the job from people who do it";
const MODAL_ID = "belajar-course-modal";
const EMAIL_ID = "belajar-email";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// prettier-ignore
const nav = [
  { label: "Courses", href: "#courses" }, { label: "How it works", href: "#how" },
  { label: "Mentors", href: "#mentors" }, { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];
const heroFacts = [
  "8 to 10 weeks",
  "2 live sessions a week",
  "Reviewed final project",
];
// prettier-ignore
const logos = [
  { name: "Sagara", path: "M3 15a9 9 0 0 1 18 0Z" },
  { name: "Kopi Kita", path: "M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" },
  { name: "Nusantara Labs", path: "M12 2 21 7v10l-9 5-9-5V7Z" },
  { name: "Arunika", path: "M12 3 22 20H2Z" },
  { name: "Lumbung", path: "M12 2 22 12 12 22 2 12Z" },
  { name: "Teras Data", path: "M4 4h7v16H4ZM13 9h7v11h-7Z" },
];
// prettier-ignore
const topics = [
  { value: "all", label: "All" }, { value: "data", label: "Data" }, { value: "product", label: "Product" },
  { value: "design", label: "Design" }, { value: "marketing", label: "Marketing" },
];
// prettier-ignore
const mentors = [
  { id: "rina", name: "Rina Siregar", role: "Senior Data Analyst", bio: "Nine years of analytics in retail and fintech. Still writes SQL every morning." },
  { id: "ayu", name: "Ayu Lestari", role: "Group Product Manager", bio: "Has shipped payment and lending products used by millions of Indonesians." },
  { id: "nadia", name: "Nadia Putri", role: "Lead Product Designer", bio: "Runs a design team of twelve and hires junior designers every year." },
  { id: "bayu", name: "Bayu Saputra", role: "Head of Growth", bio: "Grew two consumer apps from launch to their first million users." },
];
// prettier-ignore
const courses = [
  { id: "sql", title: "SQL for data analysis", topic: "data", level: "Beginner", weeks: 8, starts: "12 Jan", price: 2400000, mentor: "rina", text: "Query real sales data, join messy tables, and answer the questions your manager asks every week.", project: "A weekly sales report built from a retail dataset of 2 million orders." },
  { id: "python", title: "Python for analysts", topic: "data", level: "Intermediate", weeks: 10, starts: "2 Feb", price: 3200000, mentor: "rina", text: "Clean data with pandas, automate the spreadsheets you rebuild by hand, and chart the results.", project: "A notebook that cleans, analyses, and charts a year of ride booking data." },
  { id: "pm", title: "Product management fundamentals", topic: "product", level: "Beginner", weeks: 10, starts: "19 Jan", price: 3500000, mentor: "ayu", text: "Find the problem worth solving, write a clear spec, and work with engineers and designers.", project: "A product spec and launch plan for a feature in an app you use daily." },
  { id: "experiments", title: "Product analytics and experiments", topic: "product", level: "Intermediate", weeks: 8, starts: "9 Feb", price: 2900000, mentor: "ayu", text: "Choose the right metrics, design A/B tests, and explain the results to people who decide.", project: "An experiment plan and readout for a checkout flow change." },
  { id: "figma", title: "UI design with Figma", topic: "design", level: "Beginner", weeks: 8, starts: "12 Jan", price: 2700000, mentor: "nadia", text: "Layout, type, and components in Figma, from the first wireframe to a clickable prototype.", project: "A mobile app redesign with a small component library." },
  { id: "research", title: "UX research in practice", topic: "design", level: "Intermediate", weeks: 6, starts: "26 Jan", price: 2200000, mentor: "nadia", text: "Plan interviews, run usability tests, and turn what you hear into decisions a team can act on.", project: "A usability study with five participants and a findings report." },
  { id: "ads", title: "Performance marketing", topic: "marketing", level: "Beginner", weeks: 8, starts: "19 Jan", price: 2500000, mentor: "bayu", text: "Plan paid campaigns, set budgets, and read the numbers that show what is working.", project: "A one month campaign plan with budget, targeting, and reporting." },
  { id: "seo", title: "Content strategy and SEO", topic: "marketing", level: "Beginner", weeks: 6, starts: "2 Feb", price: 1900000, mentor: "bayu", text: "Research what people search for, plan a content calendar, and write pages that rank.", project: "A three month content plan and two published articles." },
];
const SCHEDULE = "Tue and Thu, 19.30 WIB";
// prettier-ignore
const steps = [
  { lottie: "study", label: "At your own pace", title: "Watch and read before class", text: "Short lessons of 15 to 20 minutes that fit a commute. Each one ends with a small exercise." },
  { lottie: "mentor", label: "Live, twice a week", title: "Work through it with a mentor", text: "Evening sessions with your mentor and up to 24 classmates. Bring your questions and your exercise." },
  { lottie: "certificate", label: "Final two weeks", title: "Finish with a reviewed project", text: "Your mentor reviews your project in detail. Pass the review to get a certificate with a public link." },
] as const;
// prettier-ignore
const stories = [
  { name: "Putri Anggraini", role: "Data Analyst, Medan", course: "SQL for data analysis", quote: "I used to build reports by hand in Excel. Eight weeks later I wrote the queries for our weekly sales review, and the notes on my project were more useful than anything I had read online." },
  { name: "Fajar Ramadhan", role: "Associate Product Manager, Jakarta", course: "Product management fundamentals", quote: "The live sessions felt like a real product team. We argued about scope, wrote specs, and got honest feedback. I talked about my final project in three interviews." },
  { name: "Melati Kusuma", role: "UI Designer, Bandung", course: "UI design with Figma", quote: "I could follow along after work, and the recordings saved me twice when my shift ran late. Nadia reviewed every screen I made, not just the final one." },
];
// prettier-ignore
const billingOptions = [{ value: "monthly", label: "Monthly" }, { value: "yearly", label: "Yearly" }];
// prettier-ignore
const plans = [
  { id: "free", name: "Free", tag: "", monthly: 0, yearly: 0, text: "Try the format before you commit.", features: ["One free lesson from every course", "Community forum", "Monthly live Q&A with a mentor"] },
  { id: "plus", name: "Plus", tag: "", monthly: 249000, yearly: 199000, text: "Self-paced learning across every course.", features: ["All recorded lessons and exercises", "Project templates and datasets", "Certificates for self-paced tracks"] },
  { id: "cohort", name: "Cohort", tag: "Most chosen", monthly: 899000, yearly: 719000, text: "Live cohorts with a mentor, all year.", features: ["Everything in Plus", "Join any live cohort, one at a time", "Mentor review of every project", "A career session with a recruiter"] },
];
// prettier-ignore
const faqs = [
  { question: "Do I need experience before joining?", answer: "Not for beginner courses. Intermediate courses list what you should know first, and a short placement quiz tells you if you are ready." },
  { question: "How much time does a course take each week?", answer: "Plan for six to eight hours: two live sessions of 90 minutes, plus lessons and exercises at your own pace." },
  { question: "What if I miss a live session?", answer: "Every session is recorded and posted within a few hours. Your mentor also answers questions in the cohort chat." },
  { question: "Can my company pay for the course?", answer: "Yes. We issue invoices with full tax details and offer team plans for five or more people." },
  { question: "Can I get a refund?", answer: "Yes. You get a full refund if you cancel before the end of the first week of your cohort." },
];
// prettier-ignore
const footerColumns = [
  { title: "Learn", links: [{ label: "Courses", href: "#courses" }, { label: "How it works", href: "#how" }, { label: "Pricing", href: "#pricing" }] },
  { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Mentors", href: "#mentors" }, { label: "Careers", href: "/careers" }] },
  { title: "Support", links: [{ label: "FAQ", href: "#faq" }, { label: "Contact", href: "/contact" }, { label: "For teams", href: "/teams" }] },
];
// prettier-ignore
const legal = [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }];

const rupiah = (value: number) =>
  `Rp ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
const mentorOf = (id: string) =>
  mentors.find((mentor) => mentor.id === id) ?? mentors[0]!;
const topicLabel = (value: string) =>
  topics.find((topic) => topic.value === value)?.label ?? "";
const coursesBy = (id: string) =>
  courses
    .filter((course) => course.mentor === id)
    .map((course) => course.title)
    .join(", ");
const countLabel = (shown: number) =>
  shown === courses.length
    ? `Showing all ${courses.length} courses`
    : `Showing ${shown} of ${courses.length} courses`;
const planPriceOf = (plan: (typeof plans)[number], billing: string) =>
  billing === "yearly" ? plan.yearly : plan.monthly;
const planNoteOf = (plan: (typeof plans)[number], billing: string) =>
  plan.monthly === 0
    ? "No card needed"
    : billing === "yearly"
      ? `Billed ${rupiah(plan.yearly * 12)} a year`
      : "Billed monthly, cancel anytime";

type Course = (typeof courses)[number];

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

/** Kotak berukuran tetap; animasi dimuat setelah render pertama. */
function Lottie({ name, className }: { name: LottieName; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => playLottie(ref.current!, name), [name]);
  return (
    <div
      ref={ref}
      data-lottie-name={name}
      aria-hidden="true"
      className={className}
    />
  );
}

function Brand() {
  return (
    <a href="#top" className={brandLink}>
      <span className={brandMark}>
        <Icon name="book" className="size-4" />
      </span>
      Benak
    </a>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setError("Enter a valid email address, like nama@email.com.");
      return;
    }
    setError("");
    setEmail("");
    toast({
      title: "You are subscribed",
      description: `The first lesson is on its way to ${value}.`,
      variant: "success",
    });
  };
  return (
    <form className={form} noValidate onSubmit={submit}>
      <label htmlFor={EMAIL_ID} className={fieldLabel}>
        Email address
      </label>
      <div className={fieldRow}>
        <Input
          id={EMAIL_ID}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="nama@email.com"
          className={field}
          value={email}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${EMAIL_ID}-note`}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button type="submit" className={fieldButton}>
          Subscribe
        </Button>
      </div>
      <p id={`${EMAIL_ID}-note`} className={error ? fieldError : fieldHint}>
        {error || "One email a week. Unsubscribe in one click."}
      </p>
    </form>
  );
}

export default function Belajar() {
  const [topic, setTopic] = useState("all");
  const [billing, setBilling] = useState("monthly");
  const [selected, setSelected] = useState<Course>(courses[0]!);
  const visible = courses.filter(
    (course) => topic === "all" || course.topic === topic,
  );
  const selectedMentor = mentorOf(selected.mentor);

  /** Navbar tidak menutup menu mobile saat link di-klik; tutup lewat tombolnya sendiri. */
  const closeMenuOnLink = (event: MouseEvent<HTMLElement>) => {
    const link = (event.target as Element).closest("a");
    const toggle = event.currentTarget.querySelector<HTMLButtonElement>(
      "button[aria-expanded=true]",
    );
    if (link?.closest("[data-state=open]") && toggle) toggle.click();
  };
  const openCourse = (course: Course) => {
    setSelected(course);
    (document.getElementById(MODAL_ID) as HTMLDialogElement).showModal();
  };
  const onModalClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    const dialog = event.currentTarget;
    if (dialog.returnValue === "apply")
      toast({
        title: "Application started",
        description: `We saved a seat for you in ${selected.title}. Finish your application within 48 hours.`,
        variant: "success",
      });
    dialog.returnValue = "";
  };
  const freeLesson = () =>
    toast({
      title: "Free lesson unlocked",
      description:
        "Lesson 1 of SQL for data analysis is ready. It takes about 15 minutes.",
    });
  const choosePlan = (name: string) =>
    toast({
      title: `${name} plan selected`,
      description:
        "Checkout opens in the next step. You can switch plans later.",
    });
  const chat = () =>
    toast({
      title: "Chat opened",
      description:
        "An advisor usually replies within 10 minutes, 09.00 to 21.00 WIB.",
    });

  return (
    <div id="top" className={root}>
      <Navbar
        variant="blur"
        sticky
        className={navbarEdge}
        brand={<Brand />}
        links={nav}
        onClick={closeMenuOnLink}
        actions={
          <>
            <a href="/login" className={signIn}>
              Sign in
            </a>
            <a href="#courses" className={startLink}>
              Start learning
            </a>
          </>
        }
      />

      <main>
        <section aria-labelledby="belajar-title" className={hero}>
          <div>
            <p className={eyebrow}>
              <span aria-hidden="true" className={eyebrowDot} />
              Next cohorts start 12 January 2027
            </p>
            <h1 id="belajar-title" className={h1}>
              {TITLE}
            </h1>
            <p className={heroLead}>
              Live, mentor-led courses in data, product, design, and marketing.
              Small cohorts, weekly projects, and feedback in Bahasa Indonesia,
              planned around a full-time job.
            </p>
            <div className={heroActions}>
              <a href="#courses" className={heroLink}>
                Browse courses
                <Icon name="arrow" className="size-4" />
              </a>
              <Button variant="secondary" size="lg" onClick={freeLesson}>
                Try a free lesson
              </Button>
            </div>
            <ul className={factList}>
              {heroFacts.map((item) => (
                <li key={item} className={fact}>
                  <Icon name="check" className={checkIcon} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <figure className={heroCard}>
            <div className={heroStage}>
              <Lottie name="hero" className={heroLottie} />
            </div>
            <figcaption>
              <div className={nextRow}>
                <Avatar name="Rina Siregar" size="sm" />
                <div>
                  <p className={nextLabel}>Up next in your cohort</p>
                  <p className={nextTitle}>Live review: joining sales tables</p>
                  <p className={nextLabel}>
                    Thursday, 19.30 WIB with Rina Siregar
                  </p>
                </div>
              </div>
              <div className={progressRow}>
                <div className={progressTrack}>
                  <div className={progressBar} />
                </div>
                <span className={progressText}>Week 3 of 8</span>
              </div>
            </figcaption>
          </figure>
        </section>

        <div className={logoWrap}>
          <LogoCloud
            title="Our graduates work at teams like these"
            logos={logos}
          />
        </div>

        <section
          id="courses"
          aria-labelledby="belajar-courses"
          className={section}
        >
          <div className={sectionHead}>
            <h2 id="belajar-courses" className={h2}>
              Pick a course that fits your week
            </h2>
            <p className={lead}>
              Every course runs as a cohort of up to 24 people, with two live
              evening sessions a week and a project you keep.
            </p>
          </div>
          <div className={toolbar}>
            <div className={filterScroll}>
              <ToggleGroup
                label="Filter courses by topic"
                items={topics}
                value={topic}
                onValueChange={(value) => value && setTopic(value)}
              />
            </div>
            <p aria-live="polite" className={countText}>
              {countLabel(visible.length)}
            </p>
          </div>
          <ul className={courseGrid}>
            {visible.map((course) => (
              <li
                key={course.id}
                data-course={course.id}
                className={courseCard}
              >
                <div className={courseBody}>
                  <div className={courseTop}>
                    <span className={topicText}>
                      {topicLabel(course.topic)}
                    </span>
                    <Badge dot={false}>{course.level}</Badge>
                  </div>
                  <h3 className={courseTitle}>{course.title}</h3>
                  <p className={courseText}>{course.text}</p>
                  <p className={courseMeta}>
                    {course.weeks} weeks, starts {course.starts}
                  </p>
                </div>
                <div className={courseFoot}>
                  <span className={priceText}>{rupiah(course.price)}</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    aria-label={`Details, ${course.title}`}
                    onClick={() => openCourse(course)}
                  >
                    Details
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <Modal
            id={MODAL_ID}
            title="Course details"
            onClose={onModalClose}
            footer={
              <>
                <Button variant="secondary" type="submit" value="cancel">
                  Close
                </Button>
                <Button type="submit" value="apply">
                  Apply for this cohort
                </Button>
              </>
            }
          >
            <div className={modalBody}>
              <div>
                <div className={courseTop}>
                  <span className={topicText}>
                    {topicLabel(selected.topic)}
                  </span>
                  <Badge dot={false}>{selected.level}</Badge>
                </div>
                <p data-modal-title="" className={modalTitle}>
                  {selected.title}
                </p>
                <p className={modalText}>{selected.text}</p>
              </div>
              <dl className={factGrid}>
                <div className={factCell}>
                  <dt className={factTerm}>Length</dt>
                  <dd className={factValue}>{selected.weeks} weeks</dd>
                </div>
                <div className={factCell}>
                  <dt className={factTerm}>Starts</dt>
                  <dd className={factValue}>{selected.starts}</dd>
                </div>
                <div className={factCell}>
                  <dt className={factTerm}>Live</dt>
                  <dd className={factValue}>{SCHEDULE}</dd>
                </div>
              </dl>
              <div className={projectBox}>
                <p className={projectTerm}>What you will build</p>
                <p className={projectText}>{selected.project}</p>
              </div>
              <div className={modalMentor}>
                <div className={person}>
                  <Avatar name={selectedMentor.name} size="sm" />
                  <div>
                    <p className={personName}>{selectedMentor.name}</p>
                    <p className={personRole}>{selectedMentor.role}</p>
                  </div>
                </div>
                <p className={modalPrice}>{rupiah(selected.price)}</p>
              </div>
            </div>
          </Modal>
        </section>

        <section id="how" aria-labelledby="belajar-how" className={section}>
          <div className={sectionHead}>
            <h2 id="belajar-how" className={h2}>
              How a course works
            </h2>
            <p className={lead}>
              About six to eight hours a week, most of it in the evening. You
              learn on your own first, then practise with people.
            </p>
          </div>
          <ol className={stepGrid}>
            {steps.map((step) => (
              <li key={step.lottie}>
                <div className={stepArt}>
                  <Lottie name={step.lottie} className={stepLottie} />
                </div>
                <p className={stepLabel}>{step.label}</p>
                <h3 className={stepTitle}>{step.title}</h3>
                <p className={stepText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="mentors"
          aria-labelledby="belajar-mentors"
          className={section}
        >
          <div className={sectionHead}>
            <h2 id="belajar-mentors" className={h2}>
              Taught by people who still do the work
            </h2>
            <p className={lead}>
              Every mentor works in the field they teach and leads at most two
              cohorts a year.
            </p>
          </div>
          <ul className={mentorGrid}>
            {mentors.map((mentor) => (
              <li key={mentor.id} className={mentorCard}>
                <Avatar name={mentor.name} size="lg" />
                <div>
                  <h3 className={mentorName}>{mentor.name}</h3>
                  <p className={personRole}>{mentor.role}</p>
                </div>
                <p className={mentorBio}>{mentor.bio}</p>
                <p className={mentorTeaches}>Teaches {coursesBy(mentor.id)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="stories"
          aria-labelledby="belajar-stories"
          className={section}
        >
          <div className={sectionHead}>
            <h2 id="belajar-stories" className={h2}>
              From recent graduates
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
                      <p className={personRole}>
                        {story.role}, {story.course}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="pricing"
          aria-labelledby="belajar-pricing"
          className={section}
        >
          <div className={pricingHead}>
            <div className={sectionHead}>
              <h2 id="belajar-pricing" className={h2}>
                Pay per course, or learn all year
              </h2>
              <p className={lead}>
                Course prices above are one-time. A membership suits you if you
                plan to keep learning.
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
                  <span className={planUnit}>/month</span>
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

        <section id="faq" aria-labelledby="belajar-faq" className={faqLayout}>
          <div className={faqAside}>
            <h2 id="belajar-faq" className={h2}>
              Questions, answered
            </h2>
            <p className={lead}>
              Not sure which course fits? An advisor can look at your goals and
              suggest one.
            </p>
            <Button variant="secondary" onClick={chat}>
              Chat with an advisor
            </Button>
          </div>
          <Faq items={faqs} exclusive className={faqList} />
        </section>

        <div className={bandWrap}>
          <section aria-labelledby="belajar-newsletter" className={band}>
            <div>
              <h2 id="belajar-newsletter" className={bandTitle}>
                One free lesson every Tuesday
              </h2>
              <p className={bandText}>
                A ten minute lesson from one of our mentors, with an exercise
                you can finish over coffee.
              </p>
            </div>
            <Newsletter />
          </section>
        </div>
      </main>

      <Footer
        className={footer}
        brand={<Brand />}
        description="Live online courses for working professionals in Indonesia."
        columns={footerColumns}
        legal={legal}
        copyright="© 2026 Benak. Built with MarkasUI."
      />
      <Toaster />
    </div>
  );
}
