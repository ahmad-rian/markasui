import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { Accordion } from "../../../components/accordion/accordion.component";
import { Button } from "../../../components/button/button.component";
import { Input } from "../../../components/input/input.component";
import { Toaster, toast } from "../../../components/toast/toast.component";

/* Palet lokal: warna karya (vivid) dan pasangan lembut/tegas untuk avatar, terang dan gelap. */
const palette = [
  "[--tpl-paper:#f3f3f0] dark:[--tpl-paper:#111113] [--tpl-tag-a:#b23a1d] [--tpl-tag-b:#2b4bc4] [--tpl-on-tag:#ffffff] dark:[--tpl-tag-a:#b23a1d] dark:[--tpl-tag-b:#2b4bc4]",
  "[--art-coral:#f07652] [--art-sun:#f6c34c] [--art-sky:#6ea8ea] [--art-mint:#5fc49f] [--art-violet:#8f78e0] [--art-rose:#ea7fa4] [--art-night:#1d2140] [--art-cream:#fbf1dc] [--art-deep:#1f5a48] [--art-plum:#4a2f7a]",
  "dark:[--art-coral:#e06a48] dark:[--art-sun:#e8b443] dark:[--art-sky:#6299d8] dark:[--art-mint:#56b08f] dark:[--art-violet:#8370cf] dark:[--art-rose:#d97396] dark:[--art-night:#171a33] dark:[--art-cream:#efe3c8] dark:[--art-deep:#1b4f40] dark:[--art-plum:#41296b]",
  "[--tpl-coral-1:#fde4da] [--tpl-coral-3:#8a2c12] [--tpl-sun-1:#fdf0c9] [--tpl-sun-3:#7a5200] [--tpl-sky-1:#deebfb] [--tpl-sky-3:#1d4677] [--tpl-mint-1:#dcf3ea] [--tpl-mint-3:#135a44] [--tpl-violet-1:#ebe6fb] [--tpl-violet-3:#45358a] [--tpl-rose-1:#fbe3ec] [--tpl-rose-3:#8a2246]",
  "dark:[--tpl-coral-1:#2c1b15] dark:[--tpl-coral-3:#f3b199] dark:[--tpl-sun-1:#2a2412] dark:[--tpl-sun-3:#f2cb6f] dark:[--tpl-sky-1:#162330] dark:[--tpl-sky-3:#a8c8ea] dark:[--tpl-mint-1:#13251f] dark:[--tpl-mint-3:#9dd6cc] dark:[--tpl-violet-1:#1e1a2d] dark:[--tpl-violet-3:#c2b5f0] dark:[--tpl-rose-1:#2b181b] dark:[--tpl-rose-3:#f0b2ba]",
].join(" ");
const tones = {
  coral: "bg-(--tpl-coral-1) text-(--tpl-coral-3)",
  sun: "bg-(--tpl-sun-1) text-(--tpl-sun-3)",
  sky: "bg-(--tpl-sky-1) text-(--tpl-sky-3)",
  mint: "bg-(--tpl-mint-1) text-(--tpl-mint-3)",
  violet: "bg-(--tpl-violet-1) text-(--tpl-violet-3)",
  rose: "bg-(--tpl-rose-1) text-(--tpl-rose-3)",
};
/* Lukisan abstrak dari gradien CSS, deterministik dan tanpa gambar. */
// prettier-ignore
const paintings = [
  "bg-[radial-gradient(circle_at_50%_56%,var(--art-sun)_0_15%,transparent_16%),radial-gradient(130%_55%_at_50%_100%,var(--art-plum)_0_48%,transparent_49%),linear-gradient(180deg,var(--art-coral),var(--art-rose)_55%,var(--art-violet))]",
  "bg-[repeating-radial-gradient(circle_at_0%_100%,var(--art-sky)_0_14px,var(--art-cream)_14px_28px)]",
  "bg-[radial-gradient(circle,var(--art-sun)_0_5px,transparent_6px),conic-gradient(from_45deg,var(--art-plum)_0_25%,var(--art-coral)_0_50%,var(--art-plum)_0_75%,var(--art-coral)_0)] bg-size-[36px_36px]",
  "bg-[radial-gradient(90%_50%_at_20%_100%,var(--art-deep)_0_60%,transparent_61%),radial-gradient(80%_45%_at_85%_100%,var(--art-mint)_0_70%,transparent_71%),radial-gradient(circle_at_70%_25%,var(--art-cream)_0_10%,transparent_11%),linear-gradient(180deg,var(--art-sky),var(--art-cream))]",
  "bg-[repeating-linear-gradient(135deg,var(--art-sun)_0_18px,var(--art-rose)_18px_36px,var(--art-cream)_36px_54px)]",
  "bg-[radial-gradient(circle,var(--art-sun)_0_17%,transparent_18%),repeating-conic-gradient(from_0deg,var(--art-violet)_0_15deg,var(--art-plum)_15deg_30deg)]",
  "bg-[repeating-radial-gradient(ellipse_at_50%_140%,var(--art-mint)_0_16px,var(--art-deep)_16px_20px,var(--art-cream)_20px_36px)]",
  "bg-[radial-gradient(circle_at_72%_26%,var(--art-cream)_0_9%,transparent_10%),radial-gradient(70%_30%_at_30%_100%,var(--art-coral)_0_50%,transparent_51%),linear-gradient(180deg,var(--art-night),var(--art-plum))]",
];
const keyframes =
  "@keyframes galeri-drift{to{transform:translate(28px,16px)}}@keyframes galeri-drift-b{to{transform:translate(-26px,-14px)}}";

/* Kelas */
const root =
  "min-h-dvh bg-(--tpl-paper) text-ink bg-[radial-gradient(60%_40%_at_50%_0%,var(--color-surface),transparent)] bg-no-repeat";
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const header =
  "sticky top-0 z-40 border-b border-line/60 bg-(--tpl-paper)/85 backdrop-blur";
const headerInner =
  "mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8";
const brand = `flex items-center gap-2 rounded-md text-base font-semibold tracking-tight ${focusRing}`;
const brandMark =
  "flex size-7 items-center justify-center rounded-full bg-ink text-(--tpl-paper)";
const navList = "hidden items-center gap-1 lg:flex";
const navLink = `rounded-full px-3 py-1.5 text-sm text-muted transition-colors duration-150 hover:bg-surface hover:text-ink motion-reduce:transition-none ${focusRing}`;
const iconRow = "flex items-center gap-1";
const iconButton = `inline-flex size-9 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-surface motion-reduce:transition-none ${focusRing}`;
const menuPanel =
  "absolute inset-x-4 top-full mt-2 grid gap-1 rounded-2xl border border-line bg-surface p-2 shadow-overlay lg:right-8 lg:left-auto lg:w-64";
const menuLink = `rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-subtle ${focusRing}`;
const hero = "overflow-x-clip pt-14 text-center sm:pt-20";
const eyebrow =
  "mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted";
const eyebrowDot = "size-1.5 rounded-full bg-success";
const heroTitle =
  "mx-auto mt-5 max-w-4xl px-4 text-5xl leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-7xl lg:text-8xl";
const heroLead =
  "mx-auto mt-5 max-w-xl px-4 text-base text-pretty text-muted sm:text-lg";
const heroActions =
  "mt-7 flex flex-wrap items-center justify-center gap-3 px-4";
const pillBase = `inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium whitespace-nowrap transition-colors duration-150 motion-reduce:transition-none ${focusRing}`;
const pillPrimary = "bg-primary text-on-primary hover:bg-primary-strong";
const pillGhost = "border border-line bg-surface text-ink hover:bg-subtle";
const stage =
  "relative mx-auto mt-4 h-[380px] max-w-[1440px] cursor-grab touch-pan-y overflow-hidden select-none [--fan-r:900px] [--fan-step:13deg] active:cursor-grabbing sm:h-[540px] sm:[--fan-r:1300px] sm:[--fan-step:10deg]";
const fanList = "absolute inset-0";
const fanCard =
  "absolute top-16 left-1/2 -ml-20 w-40 origin-[50%_var(--fan-r)] rounded-[1.75rem] bg-surface p-2 text-left shadow-overlay transition-[transform,opacity] duration-500 ease-out [transform:rotate(calc(var(--off)*var(--fan-step)))_translateY(var(--lift))] motion-reduce:transition-none sm:top-20 sm:-ml-26 sm:w-52";
const fanHidden = "pointer-events-none opacity-0";
const fanArt = "aspect-[4/5] rounded-[1.35rem]";
const fanCaption =
  "grid gap-1 px-1.5 pt-2.5 pb-1 sm:flex sm:items-end sm:justify-between sm:gap-2";
const fanTitle = "truncate text-sm font-medium";
const fanArtist = "truncate text-xs text-muted";
const fanPrice = "shrink-0 text-xs font-semibold";
const cursorBase =
  "pointer-events-none absolute z-30 flex items-start motion-reduce:animate-none";
const cursorA = `${cursorBase} top-6 left-[6%] animate-[galeri-drift_9s_ease-in-out_infinite_alternate] sm:top-10 sm:left-[24%]`;
const cursorB = `${cursorBase} top-[58%] right-[6%] animate-[galeri-drift-b_11s_ease-in-out_infinite_alternate] sm:top-[34%] sm:right-[22%]`;
const cursorTag =
  "mt-4 -ml-1 rounded-full px-3 py-1 text-sm font-medium text-(--tpl-on-tag)";
const controls =
  "relative z-10 mx-auto -mt-6 flex max-w-md items-center justify-between gap-4 px-4 sm:-mt-10";
const roundButton = `inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none ${focusRing}`;
const nowShowing = "min-w-0 text-center";
const section = "mx-auto max-w-6xl scroll-mt-20 px-4 py-20 lg:px-8 lg:py-28";
const sectionHead = "mx-auto max-w-2xl text-center";
const sectionTitle =
  "text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl";
const sectionLead = "mt-4 text-base text-pretty text-muted";
const reveal =
  "transition duration-700 ease-out motion-reduce:transition-none motion-safe:[&:not([data-in])]:translate-y-6 motion-safe:[&:not([data-in])]:opacity-0";
const categoryGrid = "mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6";
const categoryTile =
  "grid gap-3 rounded-3xl border border-line bg-surface p-2.5 pb-4";
const categoryArt = "aspect-square rounded-2xl";
const categoryName = "px-1.5 text-sm font-medium";
const categoryCount = "px-1.5 text-xs text-muted";
const chips = "mt-8 flex flex-wrap justify-center gap-2";
const chip = `inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none ${focusRing}`;
const chipIdle = "border-line bg-surface text-muted hover:text-ink";
const chipActive = "border-primary bg-primary text-on-primary";
const artistGrid = "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3";
const artistCard = "grid gap-4 rounded-3xl border border-line bg-surface p-5";
const artistHead = "flex items-center gap-3";
const avatar =
  "flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold";
const artistName = "truncate text-base font-semibold tracking-tight";
const artistMeta = "truncate text-sm text-muted";
const thumbs = "grid grid-cols-3 gap-2";
const thumb = "aspect-square rounded-xl";
const artistFoot = "flex items-center justify-between gap-3";
const statText = "text-sm text-muted";
const followIdle = "border-line bg-surface text-ink hover:bg-subtle";
const stepGrid = "mt-12 grid gap-4 md:grid-cols-3";
const stepCard =
  "relative grid content-start gap-3 overflow-hidden rounded-3xl border border-line bg-surface p-6";
const stepNumber =
  "flex size-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-(--tpl-paper)";
const stepTitle = "mt-3 text-lg font-semibold tracking-tight";
const stepText = "text-sm text-pretty text-muted";
const stepArt = "mt-4 h-28 rounded-2xl";
const billing =
  "mx-auto mt-8 flex w-fit gap-1 rounded-full border border-line bg-surface p-1";
const billingButton = `inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none ${focusRing}`;
const billingIdle = "text-muted hover:text-ink";
const billingActive = "bg-primary text-on-primary";
const saveTag =
  "rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary";
const planGrid = "mt-10 grid gap-4 lg:grid-cols-3";
const planCard =
  "grid content-start gap-5 rounded-3xl border border-line bg-surface p-6";
const planFeatured = "border-primary ring-1 ring-primary";
const planTop = "flex items-center justify-between gap-3";
const planName = "text-lg font-semibold tracking-tight";
const popular =
  "rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary";
const priceRow = "flex items-baseline gap-1";
const priceValue = "text-4xl font-semibold tracking-tight tabular-nums";
const priceUnit = "text-sm text-muted";
const featureList = "grid gap-2.5 text-sm";
const featureItem = "flex items-start gap-2";
const check = "mt-0.5 size-4 shrink-0 text-success";
const faqWrap = "mx-auto mt-10 max-w-3xl";
const contactCard =
  "grid gap-8 overflow-hidden rounded-[2rem] border border-line bg-surface p-6 sm:p-10 lg:grid-cols-2 lg:items-center";
const contactArt =
  "relative h-48 overflow-hidden rounded-3xl sm:h-64 lg:order-last";
const contactForm = "flex flex-col gap-3 sm:flex-row sm:items-end";
const grow = "min-w-0 flex-1";
const errorText = "mt-2 text-sm text-danger";
const footer = "border-t border-line";
const footerInner =
  "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:px-8";
const footerBrand = "grid content-start gap-3 lg:col-span-2";
const footerTitle = "text-sm font-semibold";
const footerLinks = "mt-3 grid gap-2";
const footerLink = `rounded-sm text-sm text-muted hover:text-ink ${focusRing}`;
const footerBottom =
  "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-6 text-sm text-muted lg:px-8";

/* Data */
const BRAND = "Sanggar";
const MENU_ID = "galeri-menu";
const DRAG_THRESHOLD = 40;
const START_INDEX = 3;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// prettier-ignore
const navItems = [
  { label: "Get Started", href: "#how" }, { label: "Create strategy", href: "#categories" },
  { label: "Pricing", href: "#pricing" }, { label: "Contact", href: "#contact" },
  { label: "Solution", href: "#artists" }, { label: "E-Commerce", href: "#faq" },
];
// prettier-ignore
const artworks = [
  { title: "Sunset over Bromo", artist: "Dewi Lestari", price: "Rp4.200.000", art: 0 },
  { title: "Tide Study", artist: "Bayu Pratama", price: "Rp2.750.000", art: 1 },
  { title: "Kawung Bloom", artist: "Sekar Ayu", price: "Rp3.100.000", art: 2 },
  { title: "Quiet Hills", artist: "Rizky Ramadhan", price: "Rp5.400.000", art: 3 },
  { title: "Market at Noon", artist: "Putri Maharani", price: "Rp1.900.000", art: 4 },
  { title: "Orbit No. 7", artist: "Galih Saputra", price: "Rp6.800.000", art: 5 },
  { title: "Tegallalang", artist: "Made Wirawan", price: "Rp3.650.000", art: 6 },
  { title: "Night Ferry", artist: "Nadia Kusuma", price: "Rp4.900.000", art: 7 },
];
// prettier-ignore
const categories = [
  { name: "Painting", count: "2,340 works", art: 0 }, { name: "Illustration", count: "1,860 works", art: 4 },
  { name: "Printmaking", count: "920 works", art: 2 }, { name: "Batik and textile", count: "640 works", art: 6 },
  { name: "Photography", count: "1,210 works", art: 3 }, { name: "Digital art", count: "2,080 works", art: 5 },
];
const filters = ["All", "Painting", "Illustration", "Digital art"] as const;
type Filter = (typeof filters)[number];
// prettier-ignore
const artists = [
  { id: "dewi", name: "Dewi Lestari", initials: "DL", city: "Yogyakarta", medium: "Painting", tone: "coral", followers: 1840, works: 42, art: [0, 3, 7] },
  { id: "bayu", name: "Bayu Pratama", initials: "BP", city: "Bandung", medium: "Illustration", tone: "sky", followers: 960, works: 31, art: [1, 4, 2] },
  { id: "galih", name: "Galih Saputra", initials: "GS", city: "Jakarta", medium: "Digital art", tone: "violet", followers: 2310, works: 58, art: [5, 2, 0] },
  { id: "sekar", name: "Sekar Ayu", initials: "SA", city: "Solo", medium: "Painting", tone: "rose", followers: 1275, works: 27, art: [2, 6, 4] },
  { id: "putri", name: "Putri Maharani", initials: "PM", city: "Surabaya", medium: "Illustration", tone: "sun", followers: 705, works: 19, art: [4, 1, 5] },
  { id: "made", name: "Made Wirawan", initials: "MW", city: "Ubud", medium: "Digital art", tone: "mint", followers: 1530, works: 36, art: [6, 3, 1] },
] as const;
type ArtistId = (typeof artists)[number]["id"];
// prettier-ignore
const steps = [
  { title: "Open your gallery", text: "Pick a handle, add a short bio, and choose the room color that frames your work.", art: 3 },
  { title: "Upload and price", text: "Drop high resolution files, set editions and prices in Rupiah, and we prepare the listing.", art: 4 },
  { title: "Sell and get paid", text: "Collectors check out with QRIS or bank transfer. Payouts land in your account every Friday.", art: 7 },
];
// prettier-ignore
const plans = [
  { name: "Starter", monthly: 0, yearly: 0, featured: false, blurb: "For trying the room out.", cta: "Start free", features: ["Up to 12 artworks", "Public gallery page", "10% sales fee"] },
  { name: "Artist", monthly: 149, yearly: 119, featured: true, blurb: "For working artists who sell often.", cta: "Join Artist", features: ["Unlimited artworks", "Custom domain", "5% sales fee", "Sales insights"] },
  { name: "Studio", monthly: 399, yearly: 319, featured: false, blurb: "For collectives and small galleries.", cta: "Join Studio", features: ["Up to 10 artists", "Shared inventory", "3% sales fee", "Priority curation"] },
];
// prettier-ignore
const faqs = [
  { value: "fee", title: "How much does Sanggar take from a sale?", content: "Starter pays a 10% fee, Artist 5%, and Studio 3%. Payment processing is included, so the price a collector pays is the price you set." },
  { value: "payout", title: "When do I receive my money?", content: "Every Friday we send the week's earnings to your Indonesian bank account or e-wallet, as long as the balance is above Rp50.000." },
  { value: "shipping", title: "Who handles shipping for physical works?", content: "You pack the work, we book the courier and insure it. Collectors see the shipping cost at checkout before they pay." },
  { value: "rights", title: "Do I keep the rights to my art?", content: "Always. You grant Sanggar a license to show your work on the marketplace only, and you can remove it at any time." },
  { value: "cancel", title: "Can I cancel or switch plans?", content: "Yes. Change plans from your settings at any time. Yearly plans are refunded pro rata for unused months." },
];
// prettier-ignore
const footerGroups = [
  { title: "Marketplace", links: [{ label: "Browse art", href: "#categories" }, { label: "Featured artists", href: "#artists" }, { label: "Pricing", href: "#pricing" }] },
  { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "#contact" }] },
  { title: "Support", links: [{ label: "Help center", href: "/help" }, { label: "Shipping", href: "/shipping" }, { label: "Returns", href: "/returns" }] },
];
// prettier-ignore
const icons = {
  logo: "M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-1.3-1-1.5-1-2.6 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5c0-4-4-7.2-9-7.2ZM7.5 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm3-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  left: "M15 6l-6 6 6 6",
  right: "M9 6l6 6-6 6",
  check: "M5 12.5 10 17l9-10",
  arrow: "M5 12h14M13 6l6 6-6 6",
};
const cursorPath = "M2 2l7 17 2.6-7.4L19 9z";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const rupiah = (thousands: number) => (thousands ? `Rp${thousands}k` : "Rp0");
const formatCount = (value: number) => value.toLocaleString("en-US");

/** Ikon garis 24px; svg-nya sendiri jadi host karena template Angular tidak punya komponen fungsi. */
@Component({
  selector: "svg[galeriIcon]",
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
  readonly galeriIcon = input.required<keyof typeof icons>();
  protected readonly path = computed(() => icons[this.galeriIcon()]);
}

@Component({
  selector: "template-galeri",
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Keyframes global: nama animasi dipakai langsung oleh class Tailwind.
  encapsulation: ViewEncapsulation.None,
  styles: keyframes,
  host: { class: "contents" },
  imports: [Accordion, Button, Input, Toaster, Icon],
  template: `
    <div [class]="cx(root, palette)">
      <header [class]="header" (keydown)="onMenuKey($event)">
        <div [class]="cx(headerInner, 'relative')">
          <a href="#top" [class]="brand"
            ><span [class]="brandMark" aria-hidden="true"
              ><svg galeriIcon="logo" class="size-4"></svg></span
            >{{ BRAND }}</a
          >
          <nav aria-label="Main" [class]="navList">
            @for (item of navItems; track item.href) {
              <a [href]="item.href" [class]="navLink">{{ item.label }}</a>
            }
          </nav>
          <div [class]="iconRow">
            <a href="/login" [class]="iconButton" aria-label="Sign in"
              ><svg galeriIcon="user" class="size-5"></svg
            ></a>
            <button
              type="button"
              [class]="iconButton"
              [attr.aria-label]="menuOpen() ? 'Close menu' : 'Open menu'"
              [attr.aria-expanded]="menuOpen()"
              [attr.aria-controls]="MENU_ID"
              (click)="menuOpen.set(!menuOpen())"
            >
              <svg
                [galeriIcon]="menuOpen() ? 'close' : 'menu'"
                class="size-5"
              ></svg>
            </button>
          </div>
          @if (menuOpen()) {
            <nav [id]="MENU_ID" aria-label="Menu" [class]="menuPanel">
              @for (item of navItems; track item.href) {
                <a
                  [href]="item.href"
                  [class]="menuLink"
                  (click)="menuOpen.set(false)"
                  >{{ item.label }}</a
                >
              }
            </nav>
          }
        </div>
      </header>

      <main id="top">
        <section aria-labelledby="galeri-title" [class]="hero">
          <p [class]="eyebrow">
            <span [class]="eyebrowDot" aria-hidden="true"></span>
            1,240 new works from Indonesian artists this month
          </p>
          <h1 id="galeri-title" [class]="heroTitle">
            A place to display your masterpiece.
          </h1>
          <p [class]="heroLead">
            Sanggar is a marketplace where painters, illustrators, and
            printmakers show their work, find collectors, and get paid in
            Rupiah.
          </p>
          <div [class]="heroActions">
            <a href="#pricing" [class]="cx(pillBase, pillPrimary)"
              >Join for Rp149k/mo</a
            >
            <a href="#how" [class]="cx(pillBase, pillGhost)">Read more</a>
          </div>

          <div
            [class]="cx(stage, focusRing)"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured artworks"
            tabindex="0"
            (keydown)="onStageKey($event)"
            (pointerdown)="onPointerDown($event)"
            (pointerup)="onPointerUp($event)"
            (pointercancel)="dragStart = null"
          >
            <ul [class]="fanList">
              @for (work of artworks; track work.title; let index = $index) {
                @let offset = index - active();
                <li
                  [class]="cx(fanCard, abs(offset) > 4 && fanHidden)"
                  [style.--off]="offset"
                  [style.--lift]="offset === 0 ? '-24px' : '0px'"
                  [style.z-index]="10 - abs(offset)"
                  [attr.aria-hidden]="offset === 0 ? null : true"
                  aria-roledescription="slide"
                  [attr.aria-label]="index + 1 + ' of ' + artworks.length"
                  [attr.data-active]="offset === 0 ? '' : null"
                  (click)="onCardClick(index)"
                >
                  <div
                    [class]="cx(fanArt, paintings[work.art])"
                    aria-hidden="true"
                  ></div>
                  <div [class]="fanCaption">
                    <div class="min-w-0">
                      <p [class]="fanTitle">{{ work.title }}</p>
                      <p [class]="fanArtist">{{ work.artist }}</p>
                    </div>
                    <p [class]="fanPrice">{{ work.price }}</p>
                  </div>
                </li>
              }
            </ul>
            <div [class]="cursorA" aria-hidden="true">
              <svg class="size-5 fill-(--tpl-tag-a)" viewBox="0 0 20 20">
                <path [attr.d]="cursorPath" />
              </svg>
              <span [class]="cx(cursorTag, 'bg-(--tpl-tag-a)')"
                >&#64;coplin</span
              >
            </div>
            <div [class]="cursorB" aria-hidden="true">
              <svg class="size-5 fill-(--tpl-tag-b)" viewBox="0 0 20 20">
                <path [attr.d]="cursorPath" />
              </svg>
              <span [class]="cx(cursorTag, 'bg-(--tpl-tag-b)')"
                >&#64;ercobs</span
              >
            </div>
          </div>
          <div [class]="controls">
            <button
              type="button"
              [class]="roundButton"
              aria-label="Previous artwork"
              [disabled]="active() === 0"
              (click)="go(active() - 1)"
            >
              <svg galeriIcon="left" class="size-5"></svg>
            </button>
            <p [class]="nowShowing" aria-live="polite" data-now="">
              <span
                class="block truncate text-sm font-medium"
                [textContent]="current().title"
              ></span>
              <span
                class="block truncate text-xs text-muted"
                [textContent]="
                  current().artist +
                  ', ' +
                  (active() + 1) +
                  ' of ' +
                  artworks.length
                "
              ></span>
            </p>
            <button
              type="button"
              [class]="roundButton"
              aria-label="Next artwork"
              [disabled]="active() === artworks.length - 1"
              (click)="go(active() + 1)"
            >
              <svg galeriIcon="right" class="size-5"></svg>
            </button>
          </div>
        </section>

        <section
          id="categories"
          aria-labelledby="galeri-categories"
          [class]="section"
        >
          <div [class]="cx(sectionHead, reveal)" data-reveal="">
            <h2 id="galeri-categories" [class]="sectionTitle">
              Every medium has a room
            </h2>
            <p [class]="sectionLead">
              Collectors browse by the way a work was made. List yours where the
              right people already look.
            </p>
          </div>
          <ul [class]="cx(categoryGrid, reveal)" data-reveal="">
            @for (category of categories; track category.name) {
              <li [class]="categoryTile">
                <div
                  [class]="cx(categoryArt, paintings[category.art])"
                  aria-hidden="true"
                ></div>
                <div>
                  <p [class]="categoryName">{{ category.name }}</p>
                  <p [class]="categoryCount">{{ category.count }}</p>
                </div>
              </li>
            }
          </ul>
        </section>

        <section
          id="artists"
          aria-labelledby="galeri-artists"
          [class]="cx(section, 'pt-0 lg:pt-0')"
        >
          <div [class]="cx(sectionHead, reveal)" data-reveal="">
            <h2 id="galeri-artists" [class]="sectionTitle">
              Featured artists this week
            </h2>
            <p [class]="sectionLead">
              Hand picked by our curators from studios across the archipelago.
            </p>
          </div>
          <div [class]="chips" role="group" aria-label="Filter by medium">
            @for (item of filters; track item) {
              <button
                type="button"
                [class]="cx(chip, filter() === item ? chipActive : chipIdle)"
                [attr.aria-pressed]="filter() === item"
                (click)="filter.set(item)"
              >
                {{ item }}
              </button>
            }
          </div>
          <ul [class]="artistGrid">
            @for (artist of shownArtists(); track artist.id) {
              @let isFollowing = following().includes(artist.id);
              <li [class]="artistCard" data-artist="">
                <div [class]="artistHead">
                  <span
                    [class]="cx(avatar, tones[artist.tone])"
                    aria-hidden="true"
                    >{{ artist.initials }}</span
                  >
                  <div class="min-w-0">
                    <h3 [class]="artistName">{{ artist.name }}</h3>
                    <p
                      [class]="artistMeta"
                      [textContent]="artist.medium + ', ' + artist.city"
                    ></p>
                  </div>
                </div>
                <div [class]="thumbs" aria-hidden="true">
                  @for (art of artist.art; track art) {
                    <div [class]="cx(thumb, paintings[art])"></div>
                  }
                </div>
                <div [class]="artistFoot">
                  <p
                    [class]="statText"
                    [textContent]="
                      formatCount(artist.followers + (isFollowing ? 1 : 0)) +
                      ' followers, ' +
                      artist.works +
                      ' works'
                    "
                  ></p>
                  <button
                    type="button"
                    [class]="
                      cx(
                        chip,
                        'h-8 px-3',
                        isFollowing ? chipActive : followIdle
                      )
                    "
                    [attr.aria-pressed]="isFollowing"
                    [attr.aria-label]="'Follow ' + artist.name"
                    (click)="toggleFollow(artist)"
                  >
                    {{ isFollowing ? "Following" : "Follow" }}
                  </button>
                </div>
              </li>
            }
          </ul>
        </section>

        <section id="how" aria-labelledby="galeri-how" [class]="section">
          <div [class]="cx(sectionHead, reveal)" data-reveal="">
            <h2 id="galeri-how" [class]="sectionTitle">
              From studio to collector in three steps
            </h2>
            <p [class]="sectionLead">
              No website to build and no gallery contract to sign.
            </p>
          </div>
          <ol [class]="stepGrid">
            @for (step of steps; track step.title; let index = $index) {
              <li [class]="cx(stepCard, reveal)" data-reveal="">
                <span
                  [class]="stepNumber"
                  aria-hidden="true"
                  [textContent]="'0' + (index + 1)"
                ></span>
                <h3 [class]="stepTitle">{{ step.title }}</h3>
                <p [class]="stepText">{{ step.text }}</p>
                <div
                  [class]="cx(stepArt, paintings[step.art])"
                  aria-hidden="true"
                ></div>
              </li>
            }
          </ol>
        </section>

        <section
          id="pricing"
          aria-labelledby="galeri-pricing"
          [class]="cx(section, 'pt-0 lg:pt-0')"
        >
          <div [class]="cx(sectionHead, reveal)" data-reveal="">
            <h2 id="galeri-pricing" [class]="sectionTitle">
              Simple pricing in Rupiah
            </h2>
            <p [class]="sectionLead">
              Start free, upgrade when your first collectors arrive.
            </p>
          </div>
          <div [class]="billing" role="group" aria-label="Billing period">
            <button
              type="button"
              [class]="
                cx(billingButton, yearly() ? billingIdle : billingActive)
              "
              [attr.aria-pressed]="!yearly()"
              (click)="yearly.set(false)"
            >
              Monthly
            </button>
            <button
              type="button"
              [class]="
                cx(billingButton, yearly() ? billingActive : billingIdle)
              "
              [attr.aria-pressed]="yearly()"
              (click)="yearly.set(true)"
            >
              Yearly<span [class]="saveTag">-20%</span>
            </button>
          </div>
          <ul [class]="planGrid">
            @for (plan of plans; track plan.name) {
              <li [class]="cx(planCard, plan.featured && planFeatured)">
                <div [class]="planTop">
                  <h3 [class]="planName">{{ plan.name }}</h3>
                  @if (plan.featured) {
                    <span [class]="popular">Popular</span>
                  }
                </div>
                <p [class]="statText">{{ plan.blurb }}</p>
                <p [class]="priceRow">
                  <span
                    [class]="priceValue"
                    data-price=""
                    [textContent]="
                      rupiah(yearly() ? plan.yearly : plan.monthly)
                    "
                  ></span>
                  <span
                    [class]="priceUnit"
                    [textContent]="yearly() ? '/mo, billed yearly' : '/mo'"
                  ></span>
                </p>
                <button
                  markas-button
                  [variant]="plan.featured ? 'primary' : 'secondary'"
                  (click)="choosePlan(plan.name)"
                >
                  {{ plan.cta }}
                </button>
                <ul [class]="featureList">
                  @for (feature of plan.features; track feature) {
                    <li [class]="featureItem">
                      <svg galeriIcon="check" [class]="check"></svg>
                      {{ feature }}
                    </li>
                  }
                </ul>
              </li>
            }
          </ul>
        </section>

        <section
          id="faq"
          aria-labelledby="galeri-faq"
          [class]="cx(section, 'pt-0 lg:pt-0')"
        >
          <div [class]="cx(sectionHead, reveal)" data-reveal="">
            <h2 id="galeri-faq" [class]="sectionTitle">
              Questions artists ask us
            </h2>
          </div>
          <div [class]="faqWrap">
            <markas-accordion [items]="faqs" defaultValue="fee" />
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="galeri-contact"
          [class]="cx(section, 'pt-0 lg:pt-0')"
        >
          <div [class]="cx(contactCard, reveal)" data-reveal="">
            <div
              [class]="cx(contactArt, paintings[0])"
              aria-hidden="true"
            ></div>
            <div>
              <h2 id="galeri-contact" [class]="sectionTitle">
                Get the weekly drop
              </h2>
              <p [class]="cx(sectionLead, 'mb-6')">
                Twelve new works, one artist interview, and open calls for
                exhibitions. Every Monday, no spam.
              </p>
              <form novalidate (submit)="subscribe($event)">
                <div [class]="contactForm">
                  <div [class]="grow">
                    <markas-input
                      [(value)]="email"
                      label="Email address"
                      type="email"
                      name="email"
                      placeholder="you&#64;studio.id"
                      [aria-invalid]="emailError() ? true : undefined"
                      [aria-describedby]="
                        emailError() ? 'galeri-email-error' : undefined
                      "
                    />
                  </div>
                  <button markas-button type="submit">Subscribe</button>
                </div>
                @if (emailError()) {
                  <p id="galeri-email-error" [class]="errorText">
                    {{ emailError() }}
                  </p>
                }
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer [class]="footer">
        <div [class]="footerInner">
          <div [class]="footerBrand">
            <a href="#top" [class]="brand"
              ><span [class]="brandMark" aria-hidden="true"
                ><svg galeriIcon="logo" class="size-4"></svg></span
              >{{ BRAND }}</a
            >
            <p [class]="cx(statText, 'max-w-xs')">
              A marketplace for Indonesian art, from Yogyakarta studios to your
              living room wall.
            </p>
          </div>
          @for (group of footerGroups; track group.title) {
            <nav [attr.aria-label]="group.title">
              <p [class]="footerTitle">{{ group.title }}</p>
              <ul [class]="footerLinks">
                @for (link of group.links; track link.label) {
                  <li>
                    <a [href]="link.href" [class]="footerLink">{{
                      link.label
                    }}</a>
                  </li>
                }
              </ul>
            </nav>
          }
        </div>
        <div [class]="footerBottom">
          <p>&copy; 2026 Sanggar Studio. Prices include VAT.</p>
          <p>Built with MarkasUI</p>
        </div>
      </footer>
      <markas-toaster />
    </div>
  `,
})
export default class Galeri {
  protected readonly palette = palette;
  protected readonly tones = tones;
  protected readonly paintings = paintings;
  protected readonly root = root;
  protected readonly focusRing = focusRing;
  protected readonly header = header;
  protected readonly headerInner = headerInner;
  protected readonly brand = brand;
  protected readonly brandMark = brandMark;
  protected readonly navList = navList;
  protected readonly navLink = navLink;
  protected readonly iconRow = iconRow;
  protected readonly iconButton = iconButton;
  protected readonly menuPanel = menuPanel;
  protected readonly menuLink = menuLink;
  protected readonly hero = hero;
  protected readonly eyebrow = eyebrow;
  protected readonly eyebrowDot = eyebrowDot;
  protected readonly heroTitle = heroTitle;
  protected readonly heroLead = heroLead;
  protected readonly heroActions = heroActions;
  protected readonly pillBase = pillBase;
  protected readonly pillPrimary = pillPrimary;
  protected readonly pillGhost = pillGhost;
  protected readonly stage = stage;
  protected readonly fanList = fanList;
  protected readonly fanCard = fanCard;
  protected readonly fanHidden = fanHidden;
  protected readonly fanArt = fanArt;
  protected readonly fanCaption = fanCaption;
  protected readonly fanTitle = fanTitle;
  protected readonly fanArtist = fanArtist;
  protected readonly fanPrice = fanPrice;
  protected readonly cursorA = cursorA;
  protected readonly cursorB = cursorB;
  protected readonly cursorTag = cursorTag;
  protected readonly controls = controls;
  protected readonly roundButton = roundButton;
  protected readonly nowShowing = nowShowing;
  protected readonly section = section;
  protected readonly sectionHead = sectionHead;
  protected readonly sectionTitle = sectionTitle;
  protected readonly sectionLead = sectionLead;
  protected readonly reveal = reveal;
  protected readonly categoryGrid = categoryGrid;
  protected readonly categoryTile = categoryTile;
  protected readonly categoryArt = categoryArt;
  protected readonly categoryName = categoryName;
  protected readonly categoryCount = categoryCount;
  protected readonly chips = chips;
  protected readonly chip = chip;
  protected readonly chipIdle = chipIdle;
  protected readonly chipActive = chipActive;
  protected readonly artistGrid = artistGrid;
  protected readonly artistCard = artistCard;
  protected readonly artistHead = artistHead;
  protected readonly avatar = avatar;
  protected readonly artistName = artistName;
  protected readonly artistMeta = artistMeta;
  protected readonly thumbs = thumbs;
  protected readonly thumb = thumb;
  protected readonly artistFoot = artistFoot;
  protected readonly statText = statText;
  protected readonly followIdle = followIdle;
  protected readonly stepGrid = stepGrid;
  protected readonly stepCard = stepCard;
  protected readonly stepNumber = stepNumber;
  protected readonly stepTitle = stepTitle;
  protected readonly stepText = stepText;
  protected readonly stepArt = stepArt;
  protected readonly billing = billing;
  protected readonly billingButton = billingButton;
  protected readonly billingIdle = billingIdle;
  protected readonly billingActive = billingActive;
  protected readonly saveTag = saveTag;
  protected readonly planGrid = planGrid;
  protected readonly planCard = planCard;
  protected readonly planFeatured = planFeatured;
  protected readonly planTop = planTop;
  protected readonly planName = planName;
  protected readonly popular = popular;
  protected readonly priceRow = priceRow;
  protected readonly priceValue = priceValue;
  protected readonly priceUnit = priceUnit;
  protected readonly featureList = featureList;
  protected readonly featureItem = featureItem;
  protected readonly check = check;
  protected readonly faqWrap = faqWrap;
  protected readonly contactCard = contactCard;
  protected readonly contactArt = contactArt;
  protected readonly contactForm = contactForm;
  protected readonly grow = grow;
  protected readonly errorText = errorText;
  protected readonly footer = footer;
  protected readonly footerInner = footerInner;
  protected readonly footerBrand = footerBrand;
  protected readonly footerTitle = footerTitle;
  protected readonly footerLinks = footerLinks;
  protected readonly footerLink = footerLink;
  protected readonly footerBottom = footerBottom;
  protected readonly BRAND = BRAND;
  protected readonly MENU_ID = MENU_ID;
  protected readonly navItems = navItems;
  protected readonly artworks = artworks;
  protected readonly categories = categories;
  protected readonly filters = filters;
  protected readonly steps = steps;
  protected readonly plans = plans;
  protected readonly faqs = faqs;
  protected readonly footerGroups = footerGroups;
  protected readonly cursorPath = cursorPath;
  protected readonly cx = cx;
  protected readonly rupiah = rupiah;
  protected readonly formatCount = formatCount;
  protected readonly abs = Math.abs;

  protected dragStart: number | null = null;
  private dragged = false;
  protected readonly menuOpen = signal(false);
  protected readonly active = signal(START_INDEX);
  protected readonly filter = signal<Filter>("All");
  protected readonly following = signal<ArtistId[]>([]);
  protected readonly yearly = signal(false);
  protected readonly email = signal("");
  protected readonly emailError = signal("");
  protected readonly current = computed(() => artworks[this.active()]!);
  protected readonly shownArtists = computed(() => {
    const filter = this.filter();
    return artists.filter(
      (artist) => filter === "All" || artist.medium === filter,
    );
  });

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef);
    let observer: IntersectionObserver | undefined;
    /* Animasi masuk saat scroll: data-in dipasang sekali, CSS motion-safe yang menyembunyikan. */
    afterNextRender(() => {
      const items = host.nativeElement.querySelectorAll("[data-reveal]");
      if (!("IntersectionObserver" in window)) {
        items.forEach((item) => item.setAttribute("data-in", ""));
        return;
      }
      const watcher = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.setAttribute("data-in", "");
            watcher.unobserve(entry.target);
          }),
        { rootMargin: "0px 0px -10% 0px" },
      );
      items.forEach((item) => watcher.observe(item));
      observer = watcher;
    });
    inject(DestroyRef).onDestroy(() => observer?.disconnect());
  }

  protected go(index: number) {
    this.active.set(Math.min(artworks.length - 1, Math.max(0, index)));
  }

  protected onPointerDown(event: PointerEvent) {
    this.dragStart = event.clientX;
    this.dragged = false;
  }

  protected onPointerUp(event: PointerEvent) {
    if (this.dragStart === null) return;
    const delta = event.clientX - this.dragStart;
    this.dragStart = null;
    if (Math.abs(delta) < DRAG_THRESHOLD) return;
    this.dragged = true;
    this.go(this.active() + (delta < 0 ? 1 : -1));
  }

  protected onCardClick(index: number) {
    if (this.dragged) return;
    this.go(index);
  }

  protected onStageKey(event: KeyboardEvent) {
    if (event.key === "ArrowRight") this.go(this.active() + 1);
    else if (event.key === "ArrowLeft") this.go(this.active() - 1);
    else return;
    event.preventDefault();
  }

  protected onMenuKey(event: KeyboardEvent) {
    if (event.key === "Escape") this.menuOpen.set(false);
  }

  protected toggleFollow(artist: (typeof artists)[number]) {
    const isFollowing = this.following().includes(artist.id);
    this.following.update((list) =>
      isFollowing
        ? list.filter((id) => id !== artist.id)
        : [...list, artist.id],
    );
    if (!isFollowing)
      toast({
        title: `You follow ${artist.name}`,
        description: "New works will show up in your weekly drop.",
        variant: "success",
      });
  }

  protected choosePlan(name: string) {
    toast({
      title: `${name} plan selected`,
      description: `Billed ${this.yearly() ? "yearly" : "monthly"}. You can switch any time.`,
      variant: "success",
    });
  }

  protected subscribe(event: Event) {
    event.preventDefault();
    const value = this.email().trim();
    if (!EMAIL_PATTERN.test(value)) {
      this.emailError.set("Enter a valid email address, like you@studio.id.");
      return;
    }
    this.emailError.set("");
    this.email.set("");
    toast({
      title: "You are on the list",
      description: `The weekly drop will reach ${value} every Monday.`,
      variant: "success",
    });
  }
}
