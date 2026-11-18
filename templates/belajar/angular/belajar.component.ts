import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core";
import { Avatar } from "../../../components/avatar/avatar.component";
import { Badge } from "../../../components/badge/badge.component";
import { Button } from "../../../components/button/button.component";
import { Faq } from "../../../components/faq/faq.component";
import { Footer } from "../../../components/footer/footer.component";
import { Input } from "../../../components/input/input.component";
import { LogoCloud } from "../../../components/logo-cloud/logo-cloud.component";
import { Modal } from "../../../components/modal/modal.component";
import { Navbar } from "../../../components/navbar/navbar.component";
import { Toaster, toast } from "../../../components/toast/toast.component";
import { ToggleGroup } from "../../../components/toggle-group/toggle-group.component";
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
const eyebrow = "flex items-center gap-2 text-sm text-muted";
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
const progressTrack = "h-1.5 flex-1 overflow-hidden rounded-full bg-subtle";
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
const factCell = "rounded-lg bg-subtle p-3";
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
  "flex size-28 items-center justify-center rounded-xl border border-line bg-surface";
const stepLottie = `size-24 text-ink ${lottieInk}`;
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
  "flex h-full flex-col justify-between gap-8 rounded-xl bg-subtle p-6";
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
  "grid gap-8 rounded-2xl bg-subtle p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12";
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

/** Ikon garis 24px; atribut svg di host supaya class dari pemakai langsung berlaku. */
@Component({
  selector: "svg[belajarIcon]",
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
  readonly belajarIcon = input.required<IconName>();
  protected readonly path = computed(() => icons[this.belajarIcon()]);
}

/** Kotak berukuran tetap; animasi dimuat setelah render pertama di browser dan dihancurkan saat destroy. */
@Directive({ selector: "[belajarLottie]" })
class Lottie {
  readonly belajarLottie = input.required<LottieName>();

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef);
    let stop = () => {};
    afterNextRender(() => {
      stop = playLottie(host.nativeElement, this.belajarLottie());
    });
    inject(DestroyRef).onDestroy(() => stop());
  }
}

@Component({
  selector: "template-belajar",
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
    Lottie,
    Modal,
    Navbar,
    Toaster,
    ToggleGroup,
  ],
  template: `
    <div id="top" [class]="root">
      <header
        markas-navbar
        variant="blur"
        sticky
        [class]="navbarEdge"
        [links]="nav"
        (click)="closeMenuOnLink($event)"
      >
        <a brand href="#top" [class]="brandLink">
          <span [class]="brandMark"
            ><svg belajarIcon="book" class="size-4"></svg></span
          >Benak
        </a>
        <ng-container actions>
          <a href="/login" [class]="signIn">Sign in</a>
          <a href="#courses" [class]="startLink">Start learning</a>
        </ng-container>
      </header>

      <main>
        <section aria-labelledby="belajar-title" [class]="hero">
          <div>
            <p [class]="eyebrow">
              <span aria-hidden="true" [class]="eyebrowDot"></span>Next cohorts
              start 12 January 2027
            </p>
            <h1 id="belajar-title" [class]="h1" [textContent]="TITLE"></h1>
            <p [class]="heroLead">
              Live, mentor-led courses in data, product, design, and marketing.
              Small cohorts, weekly projects, and feedback in Bahasa Indonesia,
              planned around a full-time job.
            </p>
            <div [class]="heroActions">
              <a href="#courses" [class]="heroLink"
                >Browse courses<svg belajarIcon="arrow" class="size-4"></svg
              ></a>
              <button
                markas-button
                variant="secondary"
                size="lg"
                (click)="freeLesson()"
              >
                Try a free lesson
              </button>
            </div>
            <ul [class]="factList">
              @for (item of heroFacts; track item) {
                <li [class]="fact">
                  <svg belajarIcon="check" [class]="checkIcon"></svg>{{ item }}
                </li>
              }
            </ul>
          </div>
          <figure [class]="heroCard">
            <div [class]="heroStage">
              <div
                belajarLottie="hero"
                data-lottie-name="hero"
                aria-hidden="true"
                [class]="heroLottie"
              ></div>
            </div>
            <figcaption>
              <div [class]="nextRow">
                <markas-avatar name="Rina Siregar" size="sm" />
                <div>
                  <p [class]="nextLabel">Up next in your cohort</p>
                  <p [class]="nextTitle">Live review: joining sales tables</p>
                  <p [class]="nextLabel">
                    Thursday, 19.30 WIB with Rina Siregar
                  </p>
                </div>
              </div>
              <div [class]="progressRow">
                <div [class]="progressTrack">
                  <div [class]="progressBar"></div>
                </div>
                <span [class]="progressText">Week 3 of 8</span>
              </div>
            </figcaption>
          </figure>
        </section>

        <div [class]="logoWrap">
          <markas-logo-cloud
            title="Our graduates work at teams like these"
            [logos]="logos"
          />
        </div>

        <section
          id="courses"
          aria-labelledby="belajar-courses"
          [class]="section"
        >
          <div [class]="sectionHead">
            <h2 id="belajar-courses" [class]="h2">
              Pick a course that fits your week
            </h2>
            <p [class]="lead">
              Every course runs as a cohort of up to 24 people, with two live
              evening sessions a week and a project you keep.
            </p>
          </div>
          <div [class]="toolbar">
            <div [class]="filterScroll">
              <markas-toggle-group
                #topicGroup
                label="Filter courses by topic"
                [items]="topics"
                [value]="topic()"
                (valueChange)="pickTopic($event)"
              />
            </div>
            <p
              aria-live="polite"
              [class]="countText"
              [textContent]="countLabel(visible().length)"
            ></p>
          </div>
          <ul [class]="courseGrid">
            @for (course of visible(); track course.id) {
              <li [attr.data-course]="course.id" [class]="courseCard">
                <div [class]="courseBody">
                  <div [class]="courseTop">
                    <span
                      [class]="topicText"
                      [textContent]="topicLabel(course.topic)"
                    ></span>
                    <span markas-badge [dot]="false">{{ course.level }}</span>
                  </div>
                  <h3 [class]="courseTitle" [textContent]="course.title"></h3>
                  <p [class]="courseText" [textContent]="course.text"></p>
                  <p
                    [class]="courseMeta"
                    [textContent]="
                      course.weeks + ' weeks, starts ' + course.starts
                    "
                  ></p>
                </div>
                <div [class]="courseFoot">
                  <span
                    [class]="priceText"
                    [textContent]="rupiah(course.price)"
                  ></span>
                  <button
                    markas-button
                    variant="secondary"
                    size="sm"
                    [attr.aria-label]="'Details, ' + course.title"
                    (click)="openCourse(course)"
                  >
                    Details
                  </button>
                </div>
              </li>
            }
          </ul>
          <markas-modal
            #courseModal
            [id]="MODAL_ID"
            title="Course details"
            (closed)="onModalClose()"
          >
            <div [class]="modalBody">
              <div>
                <div [class]="courseTop">
                  <span
                    [class]="topicText"
                    [textContent]="topicLabel(selected().topic)"
                  ></span>
                  <span markas-badge [dot]="false">{{ selected().level }}</span>
                </div>
                <p
                  data-modal-title=""
                  [class]="modalTitle"
                  [textContent]="selected().title"
                ></p>
                <p [class]="modalText" [textContent]="selected().text"></p>
              </div>
              <dl [class]="factGrid">
                <div [class]="factCell">
                  <dt [class]="factTerm">Length</dt>
                  <dd
                    [class]="factValue"
                    [textContent]="selected().weeks + ' weeks'"
                  ></dd>
                </div>
                <div [class]="factCell">
                  <dt [class]="factTerm">Starts</dt>
                  <dd
                    [class]="factValue"
                    [textContent]="selected().starts"
                  ></dd>
                </div>
                <div [class]="factCell">
                  <dt [class]="factTerm">Live</dt>
                  <dd [class]="factValue" [textContent]="SCHEDULE"></dd>
                </div>
              </dl>
              <div [class]="projectBox">
                <p [class]="projectTerm">What you will build</p>
                <p [class]="projectText" [textContent]="selected().project"></p>
              </div>
              <div [class]="modalMentor">
                <div [class]="person">
                  <markas-avatar [name]="selectedMentor().name" size="sm" />
                  <div>
                    <p
                      [class]="personName"
                      [textContent]="selectedMentor().name"
                    ></p>
                    <p
                      [class]="personRole"
                      [textContent]="selectedMentor().role"
                    ></p>
                  </div>
                </div>
                <p
                  [class]="modalPrice"
                  [textContent]="rupiah(selected().price)"
                ></p>
              </div>
            </div>
            <ng-container footer>
              <button
                markas-button
                variant="secondary"
                type="submit"
                value="cancel"
              >
                Close
              </button>
              <button markas-button type="submit" value="apply">
                Apply for this cohort
              </button>
            </ng-container>
          </markas-modal>
        </section>

        <section id="how" aria-labelledby="belajar-how" [class]="section">
          <div [class]="sectionHead">
            <h2 id="belajar-how" [class]="h2">How a course works</h2>
            <p [class]="lead">
              About six to eight hours a week, most of it in the evening. You
              learn on your own first, then practise with people.
            </p>
          </div>
          <ol [class]="stepGrid">
            @for (step of steps; track step.lottie) {
              <li>
                <div [class]="stepArt">
                  <div
                    [belajarLottie]="step.lottie"
                    [attr.data-lottie-name]="step.lottie"
                    aria-hidden="true"
                    [class]="stepLottie"
                  ></div>
                </div>
                <p [class]="stepLabel" [textContent]="step.label"></p>
                <h3 [class]="stepTitle" [textContent]="step.title"></h3>
                <p [class]="stepText" [textContent]="step.text"></p>
              </li>
            }
          </ol>
        </section>

        <section
          id="mentors"
          aria-labelledby="belajar-mentors"
          [class]="section"
        >
          <div [class]="sectionHead">
            <h2 id="belajar-mentors" [class]="h2">
              Taught by people who still do the work
            </h2>
            <p [class]="lead">
              Every mentor works in the field they teach and leads at most two
              cohorts a year.
            </p>
          </div>
          <ul [class]="mentorGrid">
            @for (mentor of mentors; track mentor.id) {
              <li [class]="mentorCard">
                <markas-avatar [name]="mentor.name" size="lg" />
                <div>
                  <h3 [class]="mentorName" [textContent]="mentor.name"></h3>
                  <p [class]="personRole" [textContent]="mentor.role"></p>
                </div>
                <p [class]="mentorBio" [textContent]="mentor.bio"></p>
                <p
                  [class]="mentorTeaches"
                  [textContent]="'Teaches ' + coursesBy(mentor.id)"
                ></p>
              </li>
            }
          </ul>
        </section>

        <section
          id="stories"
          aria-labelledby="belajar-stories"
          [class]="section"
        >
          <div [class]="sectionHead">
            <h2 id="belajar-stories" [class]="h2">From recent graduates</h2>
          </div>
          <ul [class]="storyGrid">
            @for (story of stories; track story.name) {
              <li>
                <figure [class]="storyCard">
                  <blockquote
                    [class]="quoteText"
                    [textContent]="story.quote"
                  ></blockquote>
                  <figcaption [class]="person">
                    <markas-avatar [name]="story.name" size="md" />
                    <div>
                      <p [class]="personName" [textContent]="story.name"></p>
                      <p
                        [class]="personRole"
                        [textContent]="story.role + ', ' + story.course"
                      ></p>
                    </div>
                  </figcaption>
                </figure>
              </li>
            }
          </ul>
        </section>

        <section
          id="pricing"
          aria-labelledby="belajar-pricing"
          [class]="section"
        >
          <div [class]="pricingHead">
            <div [class]="sectionHead">
              <h2 id="belajar-pricing" [class]="h2">
                Pay per course, or learn all year
              </h2>
              <p [class]="lead">
                Course prices above are one-time. A membership suits you if you
                plan to keep learning.
              </p>
            </div>
            <div [class]="billingRow">
              <markas-toggle-group
                #billingGroup
                label="Billing period"
                [items]="billingOptions"
                [value]="billing()"
                (valueChange)="pickBilling($event)"
              />
              <span [class]="saveNote">Save 20% with yearly</span>
            </div>
          </div>
          <ul [class]="planGrid">
            @for (plan of plans; track plan.id) {
              <li
                [attr.data-plan]="plan.id"
                [class]="plan.tag ? planFeatured : planCard"
              >
                <div [class]="planHead">
                  <h3 [class]="planName" [textContent]="plan.name"></h3>
                  @if (plan.tag) {
                    <span markas-badge variant="primary" [dot]="false">{{
                      plan.tag
                    }}</span>
                  }
                </div>
                <p [class]="planText" [textContent]="plan.text"></p>
                <p [class]="planPrice">
                  <span
                    data-price=""
                    [class]="planAmount"
                    [textContent]="rupiah(planPriceOf(plan, billing()))"
                  ></span>
                  <span [class]="planUnit">/month</span>
                </p>
                <p
                  [class]="planNote"
                  [textContent]="planNoteOf(plan, billing())"
                ></p>
                <ul [class]="featureList">
                  @for (feature of plan.features; track feature) {
                    <li [class]="featureItem">
                      <svg belajarIcon="check" [class]="featureIcon"></svg
                      >{{ feature }}
                    </li>
                  }
                </ul>
                <button
                  markas-button
                  [variant]="plan.tag ? 'primary' : 'secondary'"
                  [class]="planButton"
                  (click)="choosePlan(plan.name)"
                >
                  Choose {{ plan.name }}
                </button>
              </li>
            }
          </ul>
        </section>

        <section id="faq" aria-labelledby="belajar-faq" [class]="faqLayout">
          <div [class]="faqAside">
            <h2 id="belajar-faq" [class]="h2">Questions, answered</h2>
            <p [class]="lead">
              Not sure which course fits? An advisor can look at your goals and
              suggest one.
            </p>
            <button markas-button variant="secondary" (click)="chat()">
              Chat with an advisor
            </button>
          </div>
          <markas-faq [items]="faqs" exclusive [class]="faqList" />
        </section>

        <div [class]="bandWrap">
          <section aria-labelledby="belajar-newsletter" [class]="band">
            <div>
              <h2 id="belajar-newsletter" [class]="bandTitle">
                One free lesson every Tuesday
              </h2>
              <p [class]="bandText">
                A ten minute lesson from one of our mentors, with an exercise
                you can finish over coffee.
              </p>
            </div>
            <form [class]="form" novalidate (submit)="subscribe($event)">
              <label [for]="EMAIL_ID" [class]="fieldLabel">Email address</label>
              <div [class]="fieldRow">
                <markas-input
                  [(value)]="email"
                  [id]="EMAIL_ID"
                  type="email"
                  name="email"
                  autocomplete="email"
                  placeholder="nama&#64;email.com"
                  [class]="field"
                  [aria-invalid]="emailError() ? true : undefined"
                  [aria-describedby]="EMAIL_ID + '-note'"
                />
                <button markas-button type="submit" [class]="fieldButton">
                  Subscribe
                </button>
              </div>
              <p
                [id]="EMAIL_ID + '-note'"
                [class]="emailError() ? fieldError : fieldHint"
                [textContent]="
                  emailError() || 'One email a week. Unsubscribe in one click.'
                "
              ></p>
            </form>
          </section>
        </div>
      </main>

      <footer
        markas-footer
        [class]="footer"
        description="Live online courses for working professionals in Indonesia."
        [columns]="footerColumns"
        [legal]="legal"
        copyright="© 2026 Benak. Built with MarkasUI."
      >
        <a brand href="#top" [class]="brandLink">
          <span [class]="brandMark"
            ><svg belajarIcon="book" class="size-4"></svg></span
          >Benak
        </a>
      </footer>
      <markas-toaster />
    </div>
  `,
})
export default class Belajar {
  protected readonly focusRing = focusRing;
  protected readonly root = root;
  protected readonly container = container;
  protected readonly navbarEdge = navbarEdge;
  protected readonly footerEdge = footerEdge;
  protected readonly brandLink = brandLink;
  protected readonly brandMark = brandMark;
  protected readonly signIn = signIn;
  protected readonly startLink = startLink;
  protected readonly heroLink = heroLink;
  protected readonly lottieInk = lottieInk;
  protected readonly hero = hero;
  protected readonly eyebrow = eyebrow;
  protected readonly eyebrowDot = eyebrowDot;
  protected readonly h1 = h1;
  protected readonly heroLead = heroLead;
  protected readonly heroActions = heroActions;
  protected readonly factList = factList;
  protected readonly fact = fact;
  protected readonly checkIcon = checkIcon;
  protected readonly heroCard = heroCard;
  protected readonly heroStage = heroStage;
  protected readonly heroLottie = heroLottie;
  protected readonly nextRow = nextRow;
  protected readonly nextLabel = nextLabel;
  protected readonly nextTitle = nextTitle;
  protected readonly progressRow = progressRow;
  protected readonly progressTrack = progressTrack;
  protected readonly progressBar = progressBar;
  protected readonly progressText = progressText;
  protected readonly logoWrap = logoWrap;
  protected readonly section = section;
  protected readonly sectionHead = sectionHead;
  protected readonly h2 = h2;
  protected readonly lead = lead;
  protected readonly toolbar = toolbar;
  protected readonly filterScroll = filterScroll;
  protected readonly countText = countText;
  protected readonly courseGrid = courseGrid;
  protected readonly courseCard = courseCard;
  protected readonly courseBody = courseBody;
  protected readonly courseTop = courseTop;
  protected readonly topicText = topicText;
  protected readonly courseTitle = courseTitle;
  protected readonly courseText = courseText;
  protected readonly courseMeta = courseMeta;
  protected readonly courseFoot = courseFoot;
  protected readonly priceText = priceText;
  protected readonly modalBody = modalBody;
  protected readonly modalTitle = modalTitle;
  protected readonly modalText = modalText;
  protected readonly factGrid = factGrid;
  protected readonly factCell = factCell;
  protected readonly factTerm = factTerm;
  protected readonly factValue = factValue;
  protected readonly projectBox = projectBox;
  protected readonly projectTerm = projectTerm;
  protected readonly projectText = projectText;
  protected readonly modalMentor = modalMentor;
  protected readonly person = person;
  protected readonly personName = personName;
  protected readonly personRole = personRole;
  protected readonly modalPrice = modalPrice;
  protected readonly stepGrid = stepGrid;
  protected readonly stepArt = stepArt;
  protected readonly stepLottie = stepLottie;
  protected readonly stepLabel = stepLabel;
  protected readonly stepTitle = stepTitle;
  protected readonly stepText = stepText;
  protected readonly mentorGrid = mentorGrid;
  protected readonly mentorCard = mentorCard;
  protected readonly mentorName = mentorName;
  protected readonly mentorBio = mentorBio;
  protected readonly mentorTeaches = mentorTeaches;
  protected readonly storyGrid = storyGrid;
  protected readonly storyCard = storyCard;
  protected readonly quoteText = quoteText;
  protected readonly pricingHead = pricingHead;
  protected readonly billingRow = billingRow;
  protected readonly saveNote = saveNote;
  protected readonly planGrid = planGrid;
  protected readonly planCard = planCard;
  protected readonly planFeatured = planFeatured;
  protected readonly planHead = planHead;
  protected readonly planName = planName;
  protected readonly planPrice = planPrice;
  protected readonly planAmount = planAmount;
  protected readonly planUnit = planUnit;
  protected readonly planNote = planNote;
  protected readonly planText = planText;
  protected readonly featureList = featureList;
  protected readonly featureItem = featureItem;
  protected readonly featureIcon = featureIcon;
  protected readonly planButton = planButton;
  protected readonly faqLayout = faqLayout;
  protected readonly faqAside = faqAside;
  protected readonly faqList = faqList;
  protected readonly bandWrap = bandWrap;
  protected readonly band = band;
  protected readonly bandTitle = bandTitle;
  protected readonly bandText = bandText;
  protected readonly form = form;
  protected readonly fieldLabel = fieldLabel;
  protected readonly fieldRow = fieldRow;
  protected readonly field = field;
  protected readonly fieldButton = fieldButton;
  protected readonly fieldError = fieldError;
  protected readonly fieldHint = fieldHint;
  protected readonly footer = footer;
  protected readonly icons = icons;
  protected readonly TITLE = TITLE;
  protected readonly MODAL_ID = MODAL_ID;
  protected readonly EMAIL_ID = EMAIL_ID;
  protected readonly EMAIL_PATTERN = EMAIL_PATTERN;
  protected readonly nav = nav;
  protected readonly heroFacts = heroFacts;
  protected readonly logos = logos;
  protected readonly topics = topics;
  protected readonly mentors = mentors;
  protected readonly courses = courses;
  protected readonly SCHEDULE = SCHEDULE;
  protected readonly steps = steps;
  protected readonly stories = stories;
  protected readonly billingOptions = billingOptions;
  protected readonly plans = plans;
  protected readonly faqs = faqs;
  protected readonly footerColumns = footerColumns;
  protected readonly legal = legal;
  protected readonly rupiah = rupiah;
  protected readonly mentorOf = mentorOf;
  protected readonly topicLabel = topicLabel;
  protected readonly coursesBy = coursesBy;
  protected readonly countLabel = countLabel;
  protected readonly planPriceOf = planPriceOf;
  protected readonly planNoteOf = planNoteOf;
  private readonly courseModal = viewChild("courseModal", { read: ElementRef });
  private readonly topicGroup = viewChild<ToggleGroup>("topicGroup");
  private readonly billingGroup = viewChild<ToggleGroup>("billingGroup");
  protected readonly topic = signal("all");
  protected readonly billing = signal("monthly");
  protected readonly selected = signal<Course>(courses[0]!);
  protected readonly email = signal("");
  protected readonly emailError = signal("");
  protected readonly visible = computed(() =>
    courses.filter(
      (course) => this.topic() === "all" || course.topic === this.topic(),
    ),
  );
  protected readonly selectedMentor = computed(() =>
    mentorOf(this.selected().mentor),
  );

  /** ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; kembalikan supaya selalu ada pilihan. */
  protected pickTopic(value: string | string[] | undefined) {
    if (typeof value === "string" && value) this.topic.set(value);
    else this.topicGroup()?.value.set(this.topic());
  }
  protected pickBilling(value: string | string[] | undefined) {
    if (typeof value === "string" && value) this.billing.set(value);
    else this.billingGroup()?.value.set(this.billing());
  }
  /** Navbar tidak menutup menu mobile saat link di-klik; tutup lewat tombolnya sendiri. */
  protected closeMenuOnLink(event: MouseEvent) {
    const link = (event.target as Element).closest("a");
    const toggle = (
      event.currentTarget as HTMLElement
    ).querySelector<HTMLButtonElement>("button[aria-expanded=true]");
    if (link?.closest("[data-state=open]") && toggle) toggle.click();
  }
  protected openCourse(course: Course) {
    this.selected.set(course);
    (document.getElementById(MODAL_ID) as HTMLDialogElement).showModal();
  }
  /** Modal hanya memancarkan closed; returnValue dibaca dari dialog di dalamnya. */
  protected onModalClose() {
    const dialog = this.courseModal()?.nativeElement.querySelector("dialog");
    if (!dialog) return;
    if (dialog.returnValue === "apply")
      toast({
        title: "Application started",
        description: `We saved a seat for you in ${this.selected().title}. Finish your application within 48 hours.`,
        variant: "success",
      });
    dialog.returnValue = "";
  }
  protected freeLesson() {
    toast({
      title: "Free lesson unlocked",
      description:
        "Lesson 1 of SQL for data analysis is ready. It takes about 15 minutes.",
    });
  }
  protected choosePlan(name: string) {
    toast({
      title: `${name} plan selected`,
      description:
        "Checkout opens in the next step. You can switch plans later.",
    });
  }
  protected chat() {
    toast({
      title: "Chat opened",
      description:
        "An advisor usually replies within 10 minutes, 09.00 to 21.00 WIB.",
    });
  }
  protected subscribe(event: Event) {
    event.preventDefault();
    const value = this.email().trim();
    if (!EMAIL_PATTERN.test(value)) {
      this.emailError.set("Enter a valid email address, like nama@email.com.");
      return;
    }
    this.emailError.set("");
    this.email.set("");
    toast({
      title: "You are subscribed",
      description: `The first lesson is on its way to ${value}.`,
      variant: "success",
    });
  }
}
