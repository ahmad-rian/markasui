import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChild,
  type WritableSignal,
} from "@angular/core";
import { Avatar } from "../../../components/avatar/avatar.component";
import { Badge } from "../../../components/badge/badge.component";
import { Button } from "../../../components/button/button.component";
import { Drawer } from "../../../components/drawer/drawer.component";
import { Faq } from "../../../components/faq/faq.component";
import { Footer } from "../../../components/footer/footer.component";
import { Input } from "../../../components/input/input.component";
import { Modal } from "../../../components/modal/modal.component";
import { Navbar } from "../../../components/navbar/navbar.component";
import { Toaster, toast } from "../../../components/toast/toast.component";
import { ToggleGroup } from "../../../components/toggle-group/toggle-group.component";

/* Classes */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const root = "min-h-dvh bg-canvas text-ink";
const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
const navbarEdge = "bg-canvas/80 px-[max(0rem,calc((100%-70rem)/2))]";
const footerEdge = "px-[max(1rem,calc((100%-72rem)/2))]";
const brandLink = `flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink ${focusRing}`;
const brandMark =
  "flex size-7 items-center justify-center rounded-full bg-primary text-on-primary";
const navActions = "flex items-center gap-1";
const iconButton = `relative inline-flex size-9 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const iconSize = "size-5";
const countBadge =
  "absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full bg-primary px-1 text-center text-[10px] leading-4 font-semibold text-on-primary";
const hero = `${container} pt-4 sm:pt-6`;
const heroCard =
  "relative grid overflow-hidden rounded-[2rem] bg-surface lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]";
const heroCopy =
  "relative z-10 flex flex-col justify-center gap-6 p-6 pt-10 sm:p-12 lg:py-20 lg:pr-0 lg:pl-14";
const kicker = "text-sm font-medium text-muted";
const h1 =
  "text-5xl leading-[0.95] font-semibold tracking-tighter text-balance sm:text-7xl lg:text-8xl";
const heroLead =
  "max-w-md text-base leading-relaxed text-pretty text-muted sm:text-lg";
const heroActions = "flex flex-wrap items-center gap-3";
const primaryLink = `inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const ghostButton = "h-12 rounded-full! px-5 text-base";
const heroMedia = "relative min-h-80 sm:min-h-[28rem] lg:min-h-0";
const heroImage =
  "absolute inset-0 size-full object-cover object-[60%_50%] lg:scale-110";
const heroChip =
  "absolute right-4 bottom-4 flex items-center gap-3 rounded-2xl bg-surface/90 p-2 pr-4 shadow-overlay backdrop-blur-md sm:right-6 sm:bottom-6";
const chipImage = "size-14 rounded-xl object-cover";
const chipName = "text-sm font-medium";
const chipPrice = "text-sm text-muted";
const section = `${container} scroll-mt-20 pt-20 sm:pt-28`;
const sectionHead = "flex flex-wrap items-end justify-between gap-x-8 gap-y-4";
const h2 =
  "text-3xl font-semibold tracking-tight text-balance sm:text-5xl sm:tracking-tighter";
const lead = "mt-3 max-w-xl text-base text-pretty text-muted sm:text-lg";
const bento =
  "mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:grid-rows-[repeat(2,minmax(15rem,auto))]";
const tileBase =
  "group relative flex flex-col overflow-hidden rounded-[1.75rem] p-6";
const tileAccent = `${tileBase} min-h-[26rem] bg-primary text-on-primary sm:col-span-2 lg:row-span-2`;
const tileWide = `${tileBase} min-h-60 bg-surface sm:col-span-2`;
const tileSmall = `${tileBase} min-h-60 bg-surface`;
const tileTitle = "relative z-10 text-2xl font-semibold tracking-tight";
const tileText =
  "relative z-10 mt-1 max-w-[16rem] text-sm text-pretty opacity-90";
const tileImageAccent =
  "absolute bottom-3 left-3 h-[60%] w-[calc(100%-1.5rem)] rounded-[1.25rem] object-cover";
const tileImageWide =
  "absolute right-0 bottom-0 h-[58%] w-[70%] rounded-tl-3xl object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none sm:h-full sm:w-1/2 sm:rounded-tl-none";
const tileImageSmall =
  "absolute right-0 bottom-0 h-[58%] w-[70%] rounded-tl-3xl object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none";
const tileArrow = `relative z-10 mt-auto inline-flex size-11 items-center justify-center rounded-full transition-transform duration-150 group-hover:translate-x-0.5 ${focusRing}`;
const arrowAccent = `${tileArrow} bg-on-primary text-primary focus-visible:outline-on-primary`;
const arrowPlain = `${tileArrow} bg-primary text-on-primary`;
const toolbar = "mt-8 flex flex-wrap items-center justify-between gap-3";
const filterScroll =
  "-mx-4 max-w-[calc(100%+2rem)] overflow-x-auto px-4 sm:mx-0 sm:max-w-full sm:px-0";
const countText = "text-sm text-muted";
const productGrid = "mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3";
const productCard = "flex flex-col rounded-[1.75rem] bg-surface p-3";
const productMedia = "relative overflow-hidden rounded-[1.25rem] bg-subtle";
const productImage = "aspect-[5/4] w-full object-cover";
const productBadge = "absolute top-3 left-3";
const productBody = "flex flex-1 flex-col gap-1 px-3 pt-4 pb-2";
const productName = "text-lg font-semibold tracking-tight";
const productSpec = "text-sm text-muted";
const productFoot = "mt-auto flex items-center justify-between gap-3 pt-4";
const priceText = "text-base font-medium";
const quickButton = "rounded-full!";
const modalBody =
  "grid gap-5 text-ink sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]";
const modalImage = "aspect-square w-full rounded-2xl bg-subtle object-cover";
const modalInfo = "grid content-start gap-4";
const modalName = "text-xl font-semibold tracking-tight";
const modalSpecs = "grid gap-1.5 text-sm text-muted";
const specItem = "flex gap-2";
const specIcon = "mt-0.5 size-4 shrink-0 text-ink";
const optionLabel = "mb-2 text-sm font-medium";
const modalPrice = "text-2xl font-semibold tracking-tight";
const modalNote = "text-sm text-muted";
const band = `${container} pt-20 sm:pt-28`;
const bandCard =
  "grid gap-10 rounded-[2rem] bg-surface p-6 sm:p-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16";
const pointList = "mt-8 grid gap-6 sm:grid-cols-3 sm:gap-4";
const pointIcon =
  "flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary";
const pointTitle = "mt-4 text-base font-semibold";
const pointText = "mt-1 text-sm leading-relaxed text-pretty text-muted";
const consultCard = "grid gap-5 rounded-[1.5rem] bg-subtle p-6";
const person = "flex items-center gap-4";
const personName = "text-base font-semibold";
const personRole = "text-sm text-muted";
const consultText = "text-sm leading-relaxed text-pretty text-muted";
const consultButton = "h-12 w-full rounded-full! text-base";
const deliveryGrid = "mt-8 grid gap-3 sm:gap-4 md:grid-cols-3";
const deliveryCard = "flex flex-col gap-3 rounded-[1.75rem] bg-surface p-6";
const deliveryIcon = "size-6 text-ink";
const deliveryTitle = "mt-2 text-lg font-semibold tracking-tight";
const deliveryText = "text-sm leading-relaxed text-pretty text-muted";
const deliveryMeta =
  "mt-auto border-t border-line pt-3 text-sm font-medium text-ink";
const faqLayout = `${section} grid gap-10 pb-24 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16`;
const faqAside = "grid content-start justify-items-start gap-4";
const faqList = "[&>div]:max-w-none [&>div]:gap-0";
const quizForm = "grid gap-6 text-ink";
const quizStep = "grid gap-2";
const quizLabel = "text-sm font-medium";
const quizScroll = "max-w-full overflow-x-auto";
const fieldError = "text-sm text-danger";
const fieldHint = "text-sm text-muted";
const field = "h-11 text-base sm:text-sm";
const footer = `${footerEdge} bg-canvas`;

/* Data */
// prettier-ignore
const icons = {
  orbit: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 12c0-2.2 3.6-4 8-4s8 1.8 8 4-3.6 4-8 4-8-1.8-8-4Z",
  search: "M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm9 2-4-4",
  bag: "M5 8h14l-1 12H6L5 8Zm4 0V7a3 3 0 0 1 6 0v1",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  check: "m5 12.5 4.5 4.5L19 7.5",
  box: "M4 8 12 4l8 4v8l-8 4-8-4V8Zm0 0 8 4 8-4M12 12v8",
  setup: "M4 7h10M18 7h2M4 17h4M12 17h8M16 5v4M10 15v4",
  support: "M5 13v-1a7 7 0 0 1 14 0v1M5 13a2 2 0 0 0 2 2h1v-5H7a2 2 0 0 0-2 2Zm14 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Zm-3 2v1a3 3 0 0 1-3 3h-1",
  truck: "M3 6h11v10H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2",
  store: "M4 9h16l-1-4H5L4 9Zm0 0v10h16V9M9 19v-5h6v5",
};
type IconName = keyof typeof icons;

const TITLE = "Closer to the future.";
const QUICK_ID = "gawai-quick-view";
const SEARCH_ID = "gawai-search";
const SEARCH_FIELD = "gawai-search-field";
const HELP_ID = "gawai-help";
const PHONE_ID = "gawai-phone";
const PHONE_PATTERN = /^(\+62|0)8\d{7,11}$/;
const image = (name: string) => `/template-images/gawai/${name}.webp`;
// prettier-ignore
const nav = [
  { label: "Catalog", href: "#catalog" }, { label: "New", href: "#popular" },
  { label: "Delivery", href: "#delivery" }, { label: "Help", href: "#faq" },
];
// prettier-ignore
const filters = [
  { value: "all", label: "All" }, { value: "phones", label: "Phones" }, { value: "tablets", label: "Tablets" },
  { value: "laptops", label: "Laptops" }, { value: "audio", label: "Audio" }, { value: "accessories", label: "Accessories" },
];
// prettier-ignore
const tiles = [
  { id: "phones", title: "Smartphones", text: "Flagships and everyday phones, all with official warranty.", image: "cat-phones", alt: "Close-up of a lilac phone's triple camera", style: "accent" },
  { id: "laptops", title: "Laptops", text: "Thin, quiet, and ready for a full workday.", image: "cat-laptops", alt: "Top view of a silver laptop keyboard", style: "wide" },
  { id: "audio", title: "Headphones", text: "Over-ear, in-ear, and studio.", image: "cat-headphones", alt: "Grey over-ear headphones on white", style: "small" },
  { id: "accessories", title: "Accessories", text: "Chargers, watches, and power banks.", image: "cat-accessories", alt: "Black chargers and power banks on marble", style: "small" },
] as const;
// prettier-ignore
const products = [
  { id: "phone", name: "Arka Phone 12", category: "phones", image: "phone-standing", badge: "New", spec: "6.4-inch OLED, 50 MP camera", price: 8499000, optionName: "Storage", options: [{ value: "128", label: "128 GB", add: 0 }, { value: "256", label: "256 GB", add: 1000000 }, { value: "512", label: "512 GB", add: 3000000 }], specs: ["120 Hz display, bright enough for midday sun", "Two days of battery, 45 W charging", "Five years of security updates"] },
  { id: "tablet", name: "Arka Tab 11", category: "tablets", image: "tablet", badge: "", spec: "11-inch display, pen included", price: 6999000, optionName: "Storage", options: [{ value: "128", label: "128 GB", add: 0 }, { value: "256", label: "256 GB", add: 1200000 }], specs: ["Pen with 4,096 pressure levels in the box", "Up to 12 hours of video", "Works as a second screen for your laptop"] },
  { id: "laptop", name: "Lumen Book 14", category: "laptops", image: "cat-laptops", badge: "", spec: "14-inch, 16 GB memory", price: 13999000, optionName: "Storage", options: [{ value: "512", label: "512 GB", add: 0 }, { value: "1024", label: "1 TB", add: 2500000 }], specs: ["1.2 kg aluminium body", "Fanless, silent under load", "18 hours of battery"] },
  { id: "buds", name: "Sora Buds Pro", category: "audio", image: "earbuds", badge: "New", spec: "Noise cancelling, 30 h with case", price: 1899000, optionName: "Colour", options: [{ value: "graphite", label: "Graphite", add: 0 }, { value: "copper", label: "Copper", add: 0 }], specs: ["Adaptive noise cancelling", "Six microphones for clear calls", "Wireless charging case"] },
  { id: "headphones", name: "Sora Studio", category: "audio", image: "cat-headphones", badge: "", spec: "Wired, 50 mm drivers", price: 1299000, optionName: "Cable", options: [{ value: "1.2", label: "1.2 m", add: 0 }, { value: "3", label: "3 m coiled", add: 150000 }], specs: ["Flat, honest sound for mixing", "Folds flat for travel", "Replaceable ear pads"] },
  { id: "watch", name: "Sora Watch 3", category: "accessories", image: "smartwatch", badge: "", spec: "Heart rate and sleep, 5 day battery", price: 2799000, optionName: "Size", options: [{ value: "41", label: "41 mm", add: 0 }, { value: "45", label: "45 mm", add: 300000 }], specs: ["Water resistant to 50 m", "Built-in GPS for runs and rides", "Works with Android and iOS"] },
];
// prettier-ignore
const points = [
  { icon: "box", title: "Check on delivery", text: "Open the box in front of the courier. If anything is wrong, it goes straight back at our cost." },
  { icon: "setup", title: "Setup help", text: "We move your photos, chats, and apps to the new device, in store or over a video call." },
  { icon: "support", title: "After-sales support", text: "One number for warranty claims and repairs, for as long as you own the device." },
] as const;
const uses = ["Work", "Photos", "Gaming", "Everyday"].map((label) => ({
  value: label.toLowerCase(),
  label,
}));
// prettier-ignore
const budgets = [
  { value: "low", label: "Under Rp 5 jt", phrase: "under Rp 5 jt" },
  { value: "mid", label: "Rp 5 to 10 jt", phrase: "between Rp 5 and 10 jt" },
  { value: "high", label: "Over Rp 10 jt", phrase: "over Rp 10 jt" },
];
// prettier-ignore
const delivery = [
  { icon: "truck", title: "Same day in 6 cities", text: "Order by 14.00 for delivery the same evening in Jakarta, Bandung, Surabaya, Medan, Semarang, and Makassar.", meta: "Free on orders over Rp 2 jt" },
  { icon: "clock", title: "2 to 4 days elsewhere", text: "Insured shipping to every province, with tracking from our warehouse to your door.", meta: "From Rp 25.000" },
  { icon: "store", title: "Pick up in store", text: "Collect from one of nine Lintang stores within two hours and set the device up with our staff.", meta: "Always free" },
] as const;
// prettier-ignore
const faqs = [
  { question: "Are your devices official and new?", answer: "Yes. We are an authorised reseller, so every device is new, sealed, and covered by the official Indonesian warranty with a registered IMEI." },
  { question: "Can I pay in instalments?", answer: "Yes. Pay in 3, 6, or 12 months with most Indonesian credit cards, or use a paylater service at checkout." },
  { question: "What if the device is faulty?", answer: "Return it within 14 days for a replacement. After that, we handle the warranty claim with the maker for you." },
  { question: "Do you take trade-ins?", answer: "Yes. Bring your old phone or laptop to any store, or book a courier pickup, and we take its value off your new device." },
];
// prettier-ignore
const footerColumns = [
  { title: "Shop", links: [{ label: "Smartphones", href: "#catalog" }, { label: "Laptops", href: "#catalog" }, { label: "Audio", href: "#catalog" }] },
  { title: "Service", links: [{ label: "Delivery", href: "#delivery" }, { label: "Trade-in", href: "/trade-in" }, { label: "Warranty", href: "/warranty" }] },
  { title: "Lintang", links: [{ label: "Stores", href: "/stores" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }] },
];
// prettier-ignore
const legal = [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }];

const rupiah = (value: number) =>
  `Rp ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
const optionOf = (product: Product, value: string) =>
  product.options.find((option) => option.value === value) ??
  product.options[0]!;
const countLabel = (shown: number) =>
  shown === products.length
    ? `Showing all ${products.length} devices`
    : `Showing ${shown} of ${products.length} devices`;
const itemsLabel = (count: number) =>
  `${count} ${count === 1 ? "item" : "items"}`;
const phraseOf = (value: string) =>
  budgets.find((item) => item.value === value)?.phrase ?? "";

type Product = (typeof products)[number];
type CartLine = { name: string; price: number };

/** Ikon garis 24px; atribut svg di host supaya class dari pemakai langsung berlaku. */
@Component({
  selector: "svg[gawaiIcon]",
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
  readonly gawaiIcon = input.required<IconName>();
  protected readonly path = computed(() => icons[this.gawaiIcon()]);
}

@Component({
  selector: "template-gawai",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  imports: [
    Avatar,
    Badge,
    Button,
    Drawer,
    Faq,
    Footer,
    Icon,
    Input,
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
            ><svg gawaiIcon="orbit" class="size-4"></svg></span
          >Lintang
        </a>
        <div actions [class]="navActions">
          <button
            type="button"
            aria-label="Search"
            [class]="iconButton"
            (click)="open(SEARCH_ID)"
          >
            <svg gawaiIcon="search" [class]="iconSize"></svg>
          </button>
          <button
            type="button"
            [attr.aria-label]="'Cart, ' + itemsLabel(cart().length)"
            [class]="iconButton"
            (click)="showCart()"
          >
            <svg gawaiIcon="bag" [class]="iconSize"></svg>
            @if (cart().length > 0) {
              <span
                aria-hidden="true"
                data-cart-count=""
                [class]="countBadge"
                [textContent]="cart().length"
              ></span>
            }
          </button>
        </div>
      </header>

      <main>
        <section aria-labelledby="gawai-title" [class]="hero">
          <div [class]="heroCard">
            <div [class]="heroCopy">
              <p [class]="kicker">Authorised reseller since 2014</p>
              <h1 id="gawai-title" [class]="h1" [textContent]="TITLE"></h1>
              <p [class]="heroLead">
                Phones, laptops, and audio from makers you trust, delivered the
                same day in six cities and set up by people who know them.
              </p>
              <div [class]="heroActions">
                <a href="#catalog" [class]="primaryLink"
                  >Choose a device<svg gawaiIcon="arrow" class="size-4"></svg
                ></a>
                <button
                  markas-button
                  variant="ghost"
                  [class]="ghostButton"
                  (click)="openHelp()"
                >
                  Help me choose
                </button>
              </div>
            </div>
            <div [class]="heroMedia">
              <img
                [src]="image('hero-phone')"
                alt="A slim phone with a silver frame resting at an angle on a light grey surface"
                width="1400"
                height="1050"
                fetchpriority="high"
                decoding="async"
                [class]="heroImage"
              />
              <div [class]="heroChip">
                <img
                  [src]="image('earbuds')"
                  alt=""
                  width="56"
                  height="56"
                  decoding="async"
                  [class]="chipImage"
                />
                <div>
                  <p [class]="chipName">Sora Buds Pro</p>
                  <p [class]="chipPrice">From Rp 1.899.000</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="catalog" aria-labelledby="gawai-catalog" [class]="section">
          <div [class]="sectionHead">
            <div>
              <h2 id="gawai-catalog" [class]="h2">Find yours</h2>
              <p [class]="lead">
                Four shelves, each one picked by our staff. Nothing we would not
                use ourselves.
              </p>
            </div>
          </div>
          <ul [class]="bento">
            @for (tile of tiles; track tile.id) {
              <li [class]="tileClass[tile.style]">
                <h3 [class]="tileTitle" [textContent]="tile.title"></h3>
                <p [class]="tileText" [textContent]="tile.text"></p>
                <img
                  [src]="image(tile.image)"
                  [alt]="tile.alt"
                  [width]="tile.style === 'accent' ? 800 : 600"
                  [height]="tile.style === 'accent' ? 800 : 600"
                  loading="lazy"
                  decoding="async"
                  [class]="tileImageClass[tile.style]"
                />
                <a
                  href="#popular"
                  [attr.aria-label]="'Shop ' + tile.title.toLowerCase()"
                  [class]="tile.style === 'accent' ? arrowAccent : arrowPlain"
                  (click)="filter.set(tile.id)"
                >
                  <svg gawaiIcon="arrow" class="size-5"></svg>
                </a>
              </li>
            }
          </ul>
        </section>

        <section id="popular" aria-labelledby="gawai-popular" [class]="section">
          <div [class]="sectionHead">
            <div>
              <h2 id="gawai-popular" [class]="h2">Popular now</h2>
              <p [class]="lead">
                What people asked about most in our stores this month.
              </p>
            </div>
          </div>
          <div [class]="toolbar">
            <div [class]="filterScroll">
              <markas-toggle-group
                #filterGroup
                label="Filter devices by type"
                [items]="filters"
                [value]="filter()"
                (valueChange)="keep(filter, filterGroup, $event)"
              />
            </div>
            <p
              aria-live="polite"
              [class]="countText"
              [textContent]="countLabel(visible().length)"
            ></p>
          </div>
          <ul [class]="productGrid">
            @for (product of visible(); track product.id) {
              <li [attr.data-device]="product.id" [class]="productCard">
                <div [class]="productMedia">
                  <img
                    [src]="image(product.image)"
                    alt=""
                    width="600"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    [class]="productImage"
                  />
                  @if (product.badge) {
                    <span
                      markas-badge
                      variant="neutral"
                      [dot]="false"
                      [class]="productBadge"
                      >{{ product.badge }}</span
                    >
                  }
                </div>
                <div [class]="productBody">
                  <h3 [class]="productName" [textContent]="product.name"></h3>
                  <p [class]="productSpec" [textContent]="product.spec"></p>
                  <div [class]="productFoot">
                    <p
                      [class]="priceText"
                      [textContent]="'from ' + rupiah(product.price)"
                    ></p>
                    <button
                      markas-button
                      variant="secondary"
                      size="sm"
                      [class]="quickButton"
                      [attr.aria-label]="'Quick view, ' + product.name"
                      (click)="openQuick(product)"
                    >
                      Quick view
                    </button>
                  </div>
                </div>
              </li>
            }
          </ul>
          <markas-modal
            #quickModal
            [id]="QUICK_ID"
            title="Quick view"
            (closed)="onQuickClose()"
          >
            <div [class]="modalBody">
              <img
                [src]="image(selected().image)"
                alt=""
                width="600"
                height="600"
                decoding="async"
                [class]="modalImage"
              />
              <div [class]="modalInfo">
                <div>
                  <p
                    data-quick-name=""
                    [class]="modalName"
                    [textContent]="selected().name"
                  ></p>
                  <p [class]="productSpec" [textContent]="selected().spec"></p>
                </div>
                <ul [class]="modalSpecs">
                  @for (spec of selected().specs; track spec) {
                    <li [class]="specItem">
                      <svg gawaiIcon="check" [class]="specIcon"></svg>{{ spec }}
                    </li>
                  }
                </ul>
                <div>
                  <p
                    [class]="optionLabel"
                    [textContent]="selected().optionName"
                  ></p>
                  @for (item of [selected()]; track item.id) {
                    <markas-toggle-group
                      #optionGroup
                      [label]="item.optionName"
                      [items]="item.options"
                      [value]="option()"
                      (valueChange)="keep(option, optionGroup, $event)"
                    />
                  }
                </div>
                <div>
                  <p
                    data-quick-price=""
                    [class]="modalPrice"
                    [textContent]="rupiah(selectedPrice())"
                  ></p>
                  <p
                    [class]="modalNote"
                    [textContent]="
                      'Or ' +
                      rupiah(round(selectedPrice() / 12)) +
                      ' a month for 12 months, 0% interest'
                    "
                  ></p>
                </div>
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
              <button markas-button type="submit" value="add">
                Add to cart
              </button>
            </ng-container>
          </markas-modal>
        </section>

        <div [class]="band">
          <section aria-labelledby="gawai-calm" [class]="bandCard">
            <div>
              <h2 id="gawai-calm" [class]="h2">Good tech. Calm purchase.</h2>
              <p [class]="lead">
                Buying a device should not feel like a gamble. Every order comes
                with three things, at no extra cost.
              </p>
              <ul [class]="pointList">
                @for (point of points; track point.title) {
                  <li>
                    <span [class]="pointIcon"
                      ><svg [gawaiIcon]="point.icon" class="size-5"></svg
                    ></span>
                    <h3 [class]="pointTitle" [textContent]="point.title"></h3>
                    <p [class]="pointText" [textContent]="point.text"></p>
                  </li>
                }
              </ul>
            </div>
            <div [class]="consultCard">
              <div [class]="person">
                <markas-avatar
                  [src]="image('consultant')"
                  alt=""
                  name="Nadia Rahma"
                  size="lg"
                />
                <div>
                  <p [class]="personName">Nadia Rahma</p>
                  <p [class]="personRole">
                    Product consultant, Lintang Senopati
                  </p>
                </div>
              </div>
              <p [class]="consultText">
                Tell me what you need it for and your budget. I will reply on
                WhatsApp with two or three honest options, usually within 5
                minutes.
              </p>
              <button
                markas-button
                [class]="consultButton"
                (click)="openHelp()"
              >
                Help me choose
              </button>
            </div>
          </section>
        </div>

        <section
          id="delivery"
          aria-labelledby="gawai-delivery"
          [class]="section"
        >
          <div [class]="sectionHead">
            <div>
              <h2 id="gawai-delivery" [class]="h2">Delivery and pickup</h2>
              <p [class]="lead">
                Every parcel is insured and sealed. You pay only when it
                arrives, if you prefer.
              </p>
            </div>
          </div>
          <ul [class]="deliveryGrid">
            @for (item of delivery; track item.title) {
              <li [class]="deliveryCard">
                <svg [gawaiIcon]="item.icon" [class]="deliveryIcon"></svg>
                <h3 [class]="deliveryTitle" [textContent]="item.title"></h3>
                <p [class]="deliveryText" [textContent]="item.text"></p>
                <p [class]="deliveryMeta" [textContent]="item.meta"></p>
              </li>
            }
          </ul>
        </section>

        <section id="faq" aria-labelledby="gawai-faq" [class]="faqLayout">
          <div [class]="faqAside">
            <h2 id="gawai-faq" [class]="h2">Questions before you buy</h2>
            <p [class]="lead">
              Still unsure? A consultant can compare two devices for you.
            </p>
            <button
              markas-button
              variant="secondary"
              [class]="quickButton"
              (click)="openHelp()"
            >
              Ask a consultant
            </button>
          </div>
          <markas-faq [items]="faqs" exclusive [class]="faqList" />
        </section>
      </main>

      <footer
        markas-footer
        [class]="footer"
        description="An authorised reseller of phones, laptops, and audio, with nine stores in Indonesia."
        [columns]="footerColumns"
        [legal]="legal"
        copyright="© 2026 Lintang. Built with MarkasUI."
      >
        <a brand href="#top" [class]="brandLink">
          <span [class]="brandMark"
            ><svg gawaiIcon="orbit" class="size-4"></svg></span
          >Lintang
        </a>
      </footer>

      <markas-modal [id]="SEARCH_ID" title="Search Lintang">
        <form role="search" [class]="quizForm" (submit)="search($event)">
          <label [for]="SEARCH_FIELD" [class]="quizLabel"
            >Device or model</label
          >
          <div [class]="quizStep">
            <markas-input
              [(value)]="query"
              [id]="SEARCH_FIELD"
              type="search"
              name="q"
              placeholder="Try phone, 14-inch laptop, earbuds"
              [class]="field"
            />
            <button markas-button type="submit">Search</button>
          </div>
        </form>
      </markas-modal>

      <markas-drawer [id]="HELP_ID" title="Help me choose">
        <form [class]="quizForm" novalidate (submit)="askConsultant($event)">
          <div [class]="quizStep">
            <p [class]="quizLabel">What will you use it for?</p>
            <div [class]="quizScroll">
              <markas-toggle-group
                #useGroup
                label="What will you use it for?"
                [items]="uses"
                [value]="use()"
                (valueChange)="keep(use, useGroup, $event)"
              />
            </div>
          </div>
          <div [class]="quizStep">
            <p [class]="quizLabel">Your budget</p>
            <div [class]="quizScroll">
              <markas-toggle-group
                #budgetGroup
                label="Your budget"
                [items]="budgets"
                [value]="budget()"
                (valueChange)="keep(budget, budgetGroup, $event)"
              />
            </div>
          </div>
          <div [class]="quizStep">
            <label [for]="PHONE_ID" [class]="quizLabel">WhatsApp number</label>
            <markas-input
              [(value)]="phone"
              [id]="PHONE_ID"
              type="tel"
              name="phone"
              autocomplete="tel"
              placeholder="0812 3456 7890"
              [class]="field"
              [aria-invalid]="phoneError() ? true : undefined"
              [aria-describedby]="PHONE_ID + '-note'"
            />
            <p
              [id]="PHONE_ID + '-note'"
              [class]="phoneError() ? fieldError : fieldHint"
              [textContent]="
                phoneError() || 'Nadia replies from 08.00 to 22.00 WIB.'
              "
            ></p>
          </div>
          <button markas-button type="submit" [class]="consultButton">
            Send to Nadia
          </button>
        </form>
      </markas-drawer>
      <markas-toaster />
    </div>
  `,
})
export default class Gawai {
  protected readonly root = root;
  protected readonly navbarEdge = navbarEdge;
  protected readonly brandLink = brandLink;
  protected readonly brandMark = brandMark;
  protected readonly navActions = navActions;
  protected readonly iconButton = iconButton;
  protected readonly iconSize = iconSize;
  protected readonly countBadge = countBadge;
  protected readonly hero = hero;
  protected readonly heroCard = heroCard;
  protected readonly heroCopy = heroCopy;
  protected readonly kicker = kicker;
  protected readonly h1 = h1;
  protected readonly heroLead = heroLead;
  protected readonly heroActions = heroActions;
  protected readonly primaryLink = primaryLink;
  protected readonly ghostButton = ghostButton;
  protected readonly heroMedia = heroMedia;
  protected readonly heroImage = heroImage;
  protected readonly heroChip = heroChip;
  protected readonly chipImage = chipImage;
  protected readonly chipName = chipName;
  protected readonly chipPrice = chipPrice;
  protected readonly section = section;
  protected readonly sectionHead = sectionHead;
  protected readonly h2 = h2;
  protected readonly lead = lead;
  protected readonly bento = bento;
  protected readonly tileTitle = tileTitle;
  protected readonly tileText = tileText;
  protected readonly arrowAccent = arrowAccent;
  protected readonly arrowPlain = arrowPlain;
  protected readonly toolbar = toolbar;
  protected readonly filterScroll = filterScroll;
  protected readonly countText = countText;
  protected readonly productGrid = productGrid;
  protected readonly productCard = productCard;
  protected readonly productMedia = productMedia;
  protected readonly productImage = productImage;
  protected readonly productBadge = productBadge;
  protected readonly productBody = productBody;
  protected readonly productName = productName;
  protected readonly productSpec = productSpec;
  protected readonly productFoot = productFoot;
  protected readonly priceText = priceText;
  protected readonly quickButton = quickButton;
  protected readonly modalBody = modalBody;
  protected readonly modalImage = modalImage;
  protected readonly modalInfo = modalInfo;
  protected readonly modalName = modalName;
  protected readonly modalSpecs = modalSpecs;
  protected readonly specItem = specItem;
  protected readonly specIcon = specIcon;
  protected readonly optionLabel = optionLabel;
  protected readonly modalPrice = modalPrice;
  protected readonly modalNote = modalNote;
  protected readonly band = band;
  protected readonly bandCard = bandCard;
  protected readonly pointList = pointList;
  protected readonly pointIcon = pointIcon;
  protected readonly pointTitle = pointTitle;
  protected readonly pointText = pointText;
  protected readonly consultCard = consultCard;
  protected readonly person = person;
  protected readonly personName = personName;
  protected readonly personRole = personRole;
  protected readonly consultText = consultText;
  protected readonly consultButton = consultButton;
  protected readonly deliveryGrid = deliveryGrid;
  protected readonly deliveryCard = deliveryCard;
  protected readonly deliveryIcon = deliveryIcon;
  protected readonly deliveryTitle = deliveryTitle;
  protected readonly deliveryText = deliveryText;
  protected readonly deliveryMeta = deliveryMeta;
  protected readonly faqLayout = faqLayout;
  protected readonly faqAside = faqAside;
  protected readonly faqList = faqList;
  protected readonly quizForm = quizForm;
  protected readonly quizStep = quizStep;
  protected readonly quizLabel = quizLabel;
  protected readonly quizScroll = quizScroll;
  protected readonly fieldError = fieldError;
  protected readonly fieldHint = fieldHint;
  protected readonly field = field;
  protected readonly footer = footer;
  protected readonly TITLE = TITLE;
  protected readonly QUICK_ID = QUICK_ID;
  protected readonly SEARCH_ID = SEARCH_ID;
  protected readonly SEARCH_FIELD = SEARCH_FIELD;
  protected readonly HELP_ID = HELP_ID;
  protected readonly PHONE_ID = PHONE_ID;
  protected readonly image = image;
  protected readonly nav = nav;
  protected readonly filters = filters;
  protected readonly tiles = tiles;
  protected readonly points = points;
  protected readonly uses = uses;
  protected readonly budgets = budgets;
  protected readonly delivery = delivery;
  protected readonly faqs = faqs;
  protected readonly footerColumns = footerColumns;
  protected readonly legal = legal;
  protected readonly rupiah = rupiah;
  protected readonly countLabel = countLabel;
  protected readonly itemsLabel = itemsLabel;
  protected readonly tileClass = {
    accent: tileAccent,
    wide: tileWide,
    small: tileSmall,
  };
  protected readonly tileImageClass = {
    accent: tileImageAccent,
    wide: tileImageWide,
    small: tileImageSmall,
  };
  protected readonly round = Math.round;
  private readonly quickModal = viewChild("quickModal", { read: ElementRef });
  protected readonly filter = signal("all");
  protected readonly selected = signal<Product>(products[0]!);
  protected readonly option = signal(products[0]!.options[0]!.value);
  protected readonly cart = signal<CartLine[]>([]);
  protected readonly query = signal("");
  protected readonly use = signal("everyday");
  protected readonly budget = signal("mid");
  protected readonly phone = signal("");
  protected readonly phoneError = signal("");
  protected readonly visible = computed(() =>
    products.filter(
      (product) =>
        this.filter() === "all" || product.category === this.filter(),
    ),
  );
  protected readonly selectedOption = computed(() =>
    optionOf(this.selected(), this.option()),
  );
  protected readonly selectedPrice = computed(
    () => this.selected().price + this.selectedOption().add,
  );

  /** ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; kembalikan supaya selalu ada pilihan. */
  protected keep(
    target: WritableSignal<string>,
    group: ToggleGroup,
    value: string | string[] | undefined,
  ) {
    if (typeof value === "string" && value) target.set(value);
    else group.value.set(target());
  }
  /** Navbar tidak menutup menu mobile saat link di-klik; tutup lewat tombolnya sendiri. */
  protected closeMenuOnLink(event: MouseEvent) {
    const link = (event.target as Element).closest("a");
    const toggle = (
      event.currentTarget as HTMLElement
    ).querySelector<HTMLButtonElement>("button[aria-expanded=true]");
    if (link?.closest("[data-state=open]") && toggle) toggle.click();
  }
  protected open(id: string) {
    (document.getElementById(id) as HTMLDialogElement).showModal();
  }
  protected openHelp() {
    this.open(HELP_ID);
  }
  protected openQuick(product: Product) {
    this.selected.set(product);
    this.option.set(product.options[0]!.value);
    this.open(QUICK_ID);
  }
  /** Modal hanya memancarkan closed; returnValue dibaca dari dialog di dalamnya. */
  protected onQuickClose() {
    const dialog = this.quickModal()?.nativeElement.querySelector("dialog");
    if (!dialog) return;
    if (dialog.returnValue === "add") {
      const name = `${this.selected().name}, ${this.selectedOption().label}`;
      const price = this.selectedPrice();
      this.cart.update((cart) => [...cart, { name, price }]);
      toast({
        title: "Added to cart",
        description: `${name}. ${rupiah(price)}.`,
        variant: "success",
      });
    }
    dialog.returnValue = "";
  }
  protected showCart() {
    const cart = this.cart();
    const total = cart.reduce((sum, line) => sum + line.price, 0);
    toast(
      cart.length === 0
        ? {
            title: "Your cart is empty",
            description: "Open any device and choose Add to cart.",
          }
        : {
            title: `Your cart has ${itemsLabel(cart.length)}`,
            description: `Total ${rupiah(total)}. Checkout opens in the next step.`,
          },
    );
  }
  protected search(event: Event) {
    event.preventDefault();
    const value = this.query().trim();
    if (!value) return;
    (document.getElementById(SEARCH_ID) as HTMLDialogElement).close();
    this.query.set("");
    toast({
      title: `Results for ${value}`,
      description: "Showing devices in stock at your nearest store first.",
    });
  }
  protected askConsultant(event: Event) {
    event.preventDefault();
    const value = this.phone().replace(/[\s-]/g, "");
    if (!PHONE_PATTERN.test(value)) {
      this.phoneError.set("Enter a WhatsApp number, like 0812 3456 7890.");
      return;
    }
    this.phoneError.set("");
    this.phone.set("");
    (document.getElementById(HELP_ID) as HTMLDialogElement).close();
    toast({
      title: "Nadia will message you",
      description: `Two or three ${this.use()} picks ${phraseOf(this.budget())}, on WhatsApp in about 5 minutes.`,
      variant: "success",
    });
  }
}
