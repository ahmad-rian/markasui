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
  viewChild,
} from "@angular/core";
import { Avatar } from "../../../components/avatar/avatar.component";
import { BottomNavigation } from "../../../components/bottom-navigation/bottom-navigation.component";
import { Button } from "../../../components/button/button.component";
import { Carousel } from "../../../components/carousel/carousel.component";
import { Drawer } from "../../../components/drawer/drawer.component";
import { Footer } from "../../../components/footer/footer.component";
import { Input } from "../../../components/input/input.component";
import { Toaster, toast } from "../../../components/toast/toast.component";
import { ToggleGroup } from "../../../components/toggle-group/toggle-group.component";

/* Classes */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const root = "min-h-dvh bg-canvas pb-28 text-ink md:pb-0";
const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const footerEdge = "px-[max(1rem,calc((100%-78rem)/2))]";
const promoBar =
  "bg-primary px-4 py-2 text-center text-xs leading-5 text-on-primary sm:text-sm";
const promoCode = "font-semibold";
const header =
  "sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur-md";
const headerRow = `${container} grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-3 py-3 lg:grid-cols-[auto_auto_minmax(0,1fr)_auto] lg:gap-x-6`;
const iconButton = `relative inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const iconSize = "size-6";
const countBadge =
  "absolute top-0.5 right-0.5 h-4 min-w-4 rounded-full bg-danger px-1 text-center text-[10px] leading-4 font-semibold text-on-primary";
const brandLink = `flex min-w-0 items-center gap-2.5 rounded-md text-ink ${focusRing}`;
const brandMark =
  "flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary";
const brandName = "block text-lg leading-5 font-semibold tracking-tight";
const brandTagline = "hidden truncate text-xs text-muted sm:block";
const actions =
  "col-start-3 row-start-1 flex items-center gap-0.5 sm:gap-1 lg:col-start-4";
const accountLink = `relative hidden size-10 shrink-0 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-subtle sm:inline-flex ${focusRing}`;
const searchForm =
  "col-span-3 row-start-2 flex items-center gap-2 lg:col-span-1 lg:col-start-3 lg:row-start-1";
const searchField = "relative min-w-0 flex-1";
const searchIcon =
  "pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted";
const searchInput = "h-11 rounded-full! bg-subtle pl-11 text-base sm:text-sm";
const searchButton = "h-11 shrink-0 rounded-full! px-5";
const srOnly = "sr-only";
const categoryNav = `${container} pt-5`;
const categoryList =
  "-mx-4 flex snap-x gap-1 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:justify-between sm:px-0 [&::-webkit-scrollbar]:hidden";
const categoryLink = `group flex w-[4.75rem] shrink-0 snap-start flex-col items-center gap-2 rounded-xl py-1 text-center text-xs font-medium text-ink sm:w-24 sm:text-sm ${focusRing}`;
const categoryBubble =
  "flex size-14 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 group-hover:border-primary group-hover:bg-primary-soft sm:size-16";
const categoryIcon = "size-6 sm:size-7";
const hero = `${container} pt-4 sm:pt-6`;
const heroCard =
  "grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]";
const heroCopy =
  "flex flex-col justify-center p-6 sm:p-10 lg:py-14 lg:pr-6 lg:pl-14";
const eyebrow = "inline-flex items-center gap-2 text-sm font-medium text-muted";
const eyebrowDot = "size-2 shrink-0 rounded-full bg-danger";
const h1 =
  "mt-4 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl";
const heroLead =
  "mt-4 max-w-lg text-base leading-relaxed text-pretty text-muted sm:text-lg";
const heroActions = "mt-7 flex flex-wrap gap-3";
const primaryLink = `inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const secondaryLink = `inline-flex h-12 items-center justify-center rounded-full border border-line bg-surface px-6 text-base font-medium whitespace-nowrap text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const heroMedia = "relative min-h-72 bg-subtle sm:min-h-96 lg:min-h-0";
const heroImage = "absolute inset-0 size-full object-cover";
const offerTag =
  "absolute top-4 right-4 grid size-24 place-content-center rounded-full bg-danger text-center text-on-primary shadow-overlay sm:top-6 sm:right-6 sm:size-28";
const offerSmall = "text-xs font-medium";
const offerBig =
  "text-3xl leading-none font-semibold tracking-tight sm:text-4xl";
const heroChip =
  "absolute bottom-4 left-4 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl border border-line bg-surface p-2 pr-4 shadow-overlay sm:bottom-6 sm:left-6";
const chipImage = "size-12 shrink-0 rounded-xl bg-subtle object-cover";
const chipName = "truncate text-sm font-medium";
const chipPrice = "text-sm font-semibold";
const chipWas = "ml-1.5 text-xs font-normal text-muted line-through";
const trustList = `${container} mt-4 grid grid-cols-3 gap-2 sm:gap-4`;
const trustItem =
  "flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface p-3 text-center sm:flex-row sm:gap-3 sm:p-4 sm:text-left";
const trustIcon =
  "flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary";
const trustTitle = "text-xs leading-tight font-medium sm:text-sm";
const trustText = "hidden text-sm text-muted sm:block";
const section = `${container} scroll-mt-36 pt-14 sm:pt-20`;
const sectionHead = "flex flex-wrap items-end justify-between gap-x-6 gap-y-3";
const h2 = "text-2xl font-semibold tracking-tight text-balance sm:text-3xl";
const lead = "mt-2 text-base text-pretty text-muted";
const textLink = `inline-flex items-center gap-1 rounded-md text-sm font-medium text-ink underline-offset-4 hover:underline ${focusRing}`;
const dealCard =
  "mt-6 grid overflow-hidden rounded-3xl border border-line bg-surface md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]";
const dealMedia = "relative aspect-square bg-subtle md:aspect-auto";
const dealImage = "absolute inset-0 size-full object-cover object-[50%_75%]";
const dealBody = "flex flex-col gap-5 p-5 sm:p-8 lg:p-10";
const dealLabel =
  "inline-flex items-center gap-1.5 self-start rounded-full bg-danger px-3 py-1 text-xs font-semibold text-on-primary";
const dealIcon = "size-3.5";
const dealTitle =
  "text-xl leading-snug font-semibold tracking-tight text-balance sm:text-2xl";
const dealPriceRow = "flex flex-wrap items-baseline gap-x-3 gap-y-1";
const dealPrice = "text-3xl font-semibold tracking-tight";
const dealWas = "text-base text-muted line-through";
const dealOff = "text-sm font-semibold text-danger";
const timerLabel = "text-sm text-muted";
const timerGrid = "mt-2 grid max-w-sm grid-cols-4 gap-2";
const timerCell = "rounded-xl bg-subtle px-2 py-3 text-center";
const timerValue =
  "block text-2xl leading-none font-semibold tracking-tight tabular-nums sm:text-3xl";
const timerUnit = "mt-1 block text-xs text-muted";
const stockRow = "flex items-center justify-between text-sm";
const stockTrack = "mt-2 h-2 overflow-hidden rounded-full bg-subtle";
const stockBar = "h-full w-[68%] rounded-full bg-danger";
const dealActions = "flex flex-wrap items-center gap-3";
const dealButton = "h-12 rounded-full! px-6 text-base";
const dealNote = "text-sm text-muted";
const tileGrid =
  "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6";
const tileLink = `group block rounded-2xl ${focusRing}`;
const tileImage =
  "aspect-[4/5] w-full rounded-2xl bg-subtle object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none";
const tileName = "mt-3 text-sm font-medium";
const tileCount = "text-sm text-muted";
const toolbar = "mt-6 flex flex-wrap items-center justify-between gap-3";
const filterScroll =
  "-mx-4 max-w-[calc(100%+2rem)] overflow-x-auto px-4 sm:mx-0 sm:max-w-full sm:px-0";
const countText = "text-sm text-muted";
const productGrid =
  "mt-5 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-4";
const productCard = "flex flex-col";
const productMedia = "relative overflow-hidden rounded-2xl bg-subtle";
const productImage = "aspect-square w-full object-cover";
const discountBadge =
  "absolute top-2 left-2 rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-on-primary";
const wishButton = `absolute top-2 right-2 inline-flex size-9 items-center justify-center rounded-full bg-surface text-ink shadow-overlay transition-colors duration-150 hover:text-danger aria-pressed:text-danger ${focusRing}`;
const wishIcon = "size-5 [[aria-pressed=true]_&]:fill-current";
const productBody = "flex flex-1 flex-col pt-3";
const productName =
  "line-clamp-2 text-sm leading-snug font-medium text-pretty sm:text-base";
const ratingRow = "mt-1.5 flex items-center gap-1 text-xs text-muted";
const starIcon = "size-3.5 fill-current text-warning";
const ratingValue = "font-medium text-ink";
const priceRow = "mt-1.5 flex flex-wrap items-baseline gap-x-2";
const priceNow = "text-base font-semibold";
const priceWas = "text-xs text-muted line-through";
const cityText = "mt-1 text-xs text-muted";
const addButton = "mt-3 w-full rounded-full!";
const promoGrid = "mt-6 grid gap-4 md:grid-cols-2";
const promoCard =
  "grid overflow-hidden rounded-3xl bg-subtle sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]";
const promoCopy = "flex flex-col items-start gap-3 p-6 sm:p-8";
const promoKicker = "text-sm font-medium text-muted";
const promoTitle = "text-2xl font-semibold tracking-tight text-balance";
const promoText = "text-sm leading-relaxed text-pretty text-muted";
const promoLink = `mt-auto inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const promoImage = "aspect-[16/10] size-full object-cover sm:aspect-auto";
const carouselWrap = "mt-6";
const slideGrid = "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4";
const bestCard =
  "flex h-full flex-col rounded-2xl border border-line bg-surface p-2.5 sm:p-3";
const bestMedia = "relative";
const bestRank =
  "absolute top-2 left-2 flex size-7 items-center justify-center rounded-full bg-surface text-xs font-semibold shadow-overlay";
const bestImage = "aspect-square w-full rounded-xl bg-subtle object-cover";
const bestBody = "flex flex-1 flex-col gap-1 px-1 pt-3";
const bestFoot = "mt-auto flex items-center justify-between gap-2 pt-2";
const bestAdd = `inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const storyGrid =
  "mt-14 grid gap-4 sm:mt-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]";
const quoteCard =
  "flex flex-col justify-between gap-8 rounded-3xl border border-line bg-surface p-6 sm:p-10";
const quoteStars = "flex gap-0.5 text-warning";
const quoteStar = "size-5 fill-current";
const quoteText =
  "mt-4 text-xl leading-relaxed font-medium tracking-tight text-pretty sm:text-2xl";
const person = "flex items-center gap-3";
const personName = "text-sm font-medium";
const personRole = "text-sm text-muted";
const sellCard =
  "flex flex-col gap-5 rounded-3xl bg-primary p-6 text-on-primary sm:p-10";
const sellTitle = "text-2xl font-semibold tracking-tight text-balance";
const sellText = "text-base leading-relaxed text-pretty opacity-80";
const sellList = "grid gap-3 text-sm";
const sellItem = "flex gap-2";
const sellIcon = "mt-0.5 size-4 shrink-0";
const sellButton = `mt-auto inline-flex h-11 items-center justify-center self-start rounded-full bg-on-primary px-5 text-sm font-medium text-primary transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary`;
const bandWrap = `${container} py-14 sm:py-20`;
const band =
  "grid gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12";
const bandTitle =
  "text-2xl font-semibold tracking-tight text-balance sm:text-3xl";
const bandText = "mt-2 text-base leading-relaxed text-pretty text-muted";
const form = "grid gap-2";
const fieldLabel = "text-sm font-medium";
const fieldRow = "flex flex-col gap-2 sm:flex-row";
const field =
  "h-11 rounded-full! bg-surface px-4 text-base sm:flex-1 sm:text-sm";
const fieldButton = "h-11 shrink-0 rounded-full! px-5";
const fieldError = "text-sm text-danger";
const fieldHint = "text-sm text-muted";
const drawerList = "grid gap-1";
const drawerLink = `flex items-center gap-3 rounded-lg px-2 py-2.5 text-base font-medium text-ink hover:bg-subtle ${focusRing}`;
const drawerIcon =
  "flex size-9 items-center justify-center rounded-full bg-subtle text-ink";
const drawerHeading = "mt-6 mb-2 px-2 text-sm text-muted";
const drawerPlain = `block rounded-lg px-2 py-2 text-sm text-ink hover:bg-subtle ${focusRing}`;
const cartList = "grid gap-4";
const cartLine = "flex items-center gap-3";
const cartImage = "size-14 shrink-0 rounded-xl bg-subtle object-cover";
const cartName = "line-clamp-1 text-sm font-medium text-ink";
const cartMeta = "text-sm text-muted";
const cartTotal = "ml-auto text-sm font-semibold whitespace-nowrap text-ink";
const cartEmpty = "py-10 text-center text-sm text-muted";
const cartSummary = "mt-6 grid gap-2 border-t border-line pt-4";
const summaryRow = "flex justify-between text-base font-semibold text-ink";
const shipNote = "text-sm text-muted";
const bottomNav = "fixed inset-x-3 bottom-3 z-30 md:hidden";
const footer = `${footerEdge} bg-canvas`;

/* Data */
// prettier-ignore
const icons = {
  menu: "M4 7h16M4 12h16M4 17h16",
  search: "M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm9 2-4-4",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
  bag: "M5 8h14l-1 12H6L5 8Zm4 0V7a3 3 0 0 1 6 0v1",
  truck: "M3 6h11v10H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  returns: "M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4",
  shield: "M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3Zm-3 9 2 2 4-4",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  plus: "M12 5v14M5 12h14",
  check: "m5 12.5 4.5 4.5L19 7.5",
  bolt: "M13 3 5 14h6l-1 7 8-11h-6l1-7Z",
  fashion: "M8 4 4 7l2 4 2-1v10h8V10l2 1 2-4-4-3c-.5 1.5-2 2.5-4 2.5S8.5 5.5 8 4Z",
  electronics: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm4 15h2",
  beauty: "M9 21h6v-9H9v9Zm1-9V7l4-3v8",
  home: "M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 11h18v6H3zM5 17v2m14-2v2",
  grocery: "M3 10h18l-2 9H5l-2-9Zm5 0 3-6m5 6-3-6",
  sports: "M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12",
  all: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
};
type IconName = keyof typeof icons;

const TITLE = "Everything you need, all in one place";
const CART_ID = "pasar-cart";
const MENU_ID = "pasar-menu";
const SEARCH_ID = "pasar-search";
const EMAIL_ID = "pasar-email";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FREE_SHIPPING = 150000;
/** Flash deal berganti setiap tiga hari, tepat tengah malam WIB. */
const DEAL_CYCLE = 3 * 86_400_000;
const WIB_OFFSET = 7 * 3_600_000;
const image = (name: string) => `/template-images/pasar/${name}.webp`;
// prettier-ignore
const categories = [
  { value: "all", label: "All", icon: "all" }, { value: "fashion", label: "Fashion", icon: "fashion" },
  { value: "electronics", label: "Electronics", icon: "electronics" }, { value: "beauty", label: "Beauty", icon: "beauty" },
  { value: "home", label: "Home", icon: "home" }, { value: "grocery", label: "Grocery", icon: "grocery" },
  { value: "sports", label: "Sports", icon: "sports" },
] as const;
const categoryItems = categories.map(({ value, label }) => ({ value, label }));
const categoryRow = [...categories.slice(1), categories[0]];
// prettier-ignore
const trust = [
  { icon: "truck", title: "Free shipping", text: "On orders over Rp 150.000" },
  { icon: "returns", title: "Easy returns", text: "30 days, picked up from your door" },
  { icon: "shield", title: "Secure payment", text: "QRIS, virtual account, or card" },
] as const;
// prettier-ignore
const tiles = [
  { value: "fashion", label: "Fashion", count: "18.420 products", image: "cat-fashion" },
  { value: "electronics", label: "Electronics", count: "9.310 products", image: "cat-electronics" },
  { value: "beauty", label: "Beauty", count: "7.865 products", image: "cat-beauty" },
  { value: "home", label: "Home and living", count: "12.040 products", image: "cat-home" },
  { value: "grocery", label: "Grocery", count: "5.270 products", image: "cat-grocery" },
  { value: "sports", label: "Sports", count: "4.190 products", image: "cat-sports" },
];
// prettier-ignore
const products = [
  { id: "headphones", name: "Over-ear wired headphones", category: "electronics", price: 189000, was: 349000, rating: "4.7", sold: "2.4k sold", city: "Jakarta Barat" },
  { id: "sneakers", name: "Suede and canvas low-top sneakers", category: "fashion", price: 279000, was: 459000, rating: "4.8", sold: "1.1k sold", city: "Bandung" },
  { id: "smartwatch", name: "Fitness smartwatch with heart rate", category: "electronics", price: 449000, was: 899000, rating: "4.6", sold: "3.2k sold", city: "Surabaya" },
  { id: "skincare-set", name: "Skincare starter set, 6 pieces", category: "beauty", price: 199000, was: 399000, rating: "4.8", sold: "4.1k sold", city: "Medan" },
  { id: "sunglasses", name: "Cat-eye sunglasses, UV400", category: "fashion", price: 89000, was: 179000, rating: "4.5", sold: "860 sold", city: "Denpasar" },
  { id: "mug", name: "Stoneware coffee mug, 350 ml", category: "home", price: 45000, was: 69000, rating: "4.9", sold: "7.8k sold", city: "Yogyakarta" },
  { id: "fruit-box", name: "Weekly fruit and vegetable box", category: "grocery", price: 125000, was: 150000, rating: "4.8", sold: "6.1k sold", city: "Bogor" },
  { id: "dumbbells", name: "Hex dumbbells, 2 x 5 kg", category: "sports", price: 319000, was: 429000, rating: "4.7", sold: "940 sold", city: "Semarang" },
];
// prettier-ignore
const bestSellers = [
  { id: "headphones-studio", name: "Wireless headphones, 40 hour battery", price: 399000, was: 799000, rating: "4.8", sold: "9.3k sold" },
  { id: "speaker-mini", name: "Mini Bluetooth speaker, 5 W", price: 129000, was: 229000, rating: "4.8", sold: "5.6k sold" },
  { id: "cups-stack", name: "Handmade ceramic cups, set of 4", price: 159000, was: 219000, rating: "4.9", sold: "1.4k sold" },
  { id: "sunglasses-black", name: "Classic browline sunglasses", price: 99000, was: 199000, rating: "4.7", sold: "3.9k sold" },
  { id: "yoga-set", name: "Yoga starter kit, 4 pieces", price: 249000, was: 389000, rating: "4.7", sold: "2.2k sold" },
  { id: "speaker-pebble", name: "Speaker with light show, 20 W", price: 219000, was: 329000, rating: "4.6", sold: "2.8k sold" },
  { id: "headphones-corded", name: "Retro on-ear headphones", price: 259000, was: 359000, rating: "4.6", sold: "1.7k sold" },
  { id: "mug-white", name: "Classic white mug, 300 ml", price: 29000, was: 39000, rating: "4.8", sold: "12k sold" },
];
const bestPages = [bestSellers.slice(0, 4), bestSellers.slice(4)];
const deal = {
  id: "flash-speaker",
  name: "Portable speaker with 20 hour battery, splash resistant",
  price: 349000,
  was: 899000,
  sold: 68,
  stock: 100,
};
const catalog = [...products, ...bestSellers, deal];
const timerUnits = ["Days", "Hrs", "Mins", "Secs"];
// prettier-ignore
const promos = [
  { kicker: "New season", title: "Linen and cotton for hot days", text: "Shirts, dresses, and wide trousers from 300 local labels, from Rp 129.000.", cta: "Shop fashion", category: "fashion", image: "promo-fashion" },
  { kicker: "Home refresh", title: "Make the living room feel new", text: "Cushions, rugs, lamps, and ceramics up to 40% off this week.", cta: "Shop home", category: "home", image: "promo-home" },
];
const sellPoints = [
  "Open a shop in ten minutes, no monthly fee",
  "Pickup from your door by six courier partners",
  "Payouts to any Indonesian bank every day",
];
// prettier-ignore
const bottomItems = [
  { value: "home", label: "Home", icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z", href: "#top" },
  { value: "categories", label: "Categories", icon: icons.all, href: "#categories" },
  { value: "deals", label: "Deals", icon: "M3 12V4h8l10 10-8 8L3 12Zm5-4h.01", href: "#deals" },
  { value: "wishlist", label: "Wishlist", icon: icons.heart, href: "#products" },
  { value: "account", label: "Account", icon: icons.user },
];
// prettier-ignore
const menuLinks = [
  { label: "Track my order", href: "/orders" }, { label: "Help centre", href: "/help" }, { label: "Sell on Pasarloka", href: "/sell" },
];
// prettier-ignore
const footerColumns = [
  { title: "Shop", links: [{ label: "Categories", href: "#categories" }, { label: "Flash deals", href: "#deals" }, { label: "Best sellers", href: "#best" }] },
  { title: "Sell", links: [{ label: "Open a shop", href: "/sell" }, { label: "Seller centre", href: "/seller" }, { label: "Shipping rates", href: "/shipping" }] },
  { title: "Help", links: [{ label: "Track my order", href: "/orders" }, { label: "Returns", href: "/returns" }, { label: "Contact us", href: "/contact" }] },
];
// prettier-ignore
const legal = [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }];

const rupiah = (value: number) =>
  `Rp ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
const percentOff = (price: number, was: number) =>
  `-${Math.round((1 - price / was) * 100)}%`;
const productOf = (id: string) =>
  catalog.find((item) => item.id === id) ?? catalog[0]!;
const countLabel = (shown: number) =>
  shown === products.length
    ? `Showing all ${products.length} products`
    : `Showing ${shown} of ${products.length} products`;
const itemsLabel = (count: number) =>
  `${count} ${count === 1 ? "item" : "items"}`;
/** Sisa waktu flash deal dalam milidetik; null sebelum mount supaya render server dan klien sama. */
const timeLeft = (now: number) =>
  DEAL_CYCLE - ((now + WIB_OFFSET) % DEAL_CYCLE);
const timerParts = (now: number | null) => {
  if (now === null) return ["--", "--", "--", "--"];
  const seconds = Math.floor(timeLeft(now) / 1000);
  return [
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ].map((part) => String(part).padStart(2, "0"));
};
const shippingNote = (subtotal: number) =>
  subtotal >= FREE_SHIPPING
    ? "Free shipping applied to this order."
    : `Add ${rupiah(FREE_SHIPPING - subtotal)} more for free shipping.`;

type Cart = Record<string, number>;

/** Ikon garis 24px; atribut svg di host supaya class dari pemakai langsung berlaku. */
@Component({
  selector: "svg[pasarIcon]",
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
  readonly pasarIcon = input.required<IconName>();
  protected readonly path = computed(() => icons[this.pasarIcon()]);
}

@Component({
  selector: "template-pasar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  imports: [
    Avatar,
    BottomNavigation,
    Button,
    Carousel,
    Drawer,
    Footer,
    Icon,
    Input,
    Toaster,
    ToggleGroup,
  ],
  template: `
    <div id="top" [class]="root">
      <p [class]="promoBar">
        Free shipping on orders over Rp 150.000. New here? Use
        <span [class]="promoCode">PASARBARU</span> for 10% off.
      </p>
      <header [class]="header">
        <div [class]="headerRow">
          <button
            type="button"
            aria-label="Open menu"
            [class]="iconButton"
            (click)="open(MENU_ID)"
          >
            <svg pasarIcon="menu" [class]="iconSize"></svg>
          </button>
          <a href="#top" [class]="brandLink">
            <span [class]="brandMark"
              ><svg pasarIcon="bag" class="size-5"></svg
            ></span>
            <span class="min-w-0">
              <span [class]="brandName">Pasarloka</span>
              <span [class]="brandTagline">Shop from 40.000 local sellers</span>
            </span>
          </a>
          <form role="search" [class]="searchForm" (submit)="search($event)">
            <div [class]="searchField">
              <label [for]="SEARCH_ID" [class]="srOnly">Search products</label>
              <svg pasarIcon="search" [class]="searchIcon"></svg>
              <markas-input
                [(value)]="query"
                [id]="SEARCH_ID"
                type="search"
                name="q"
                placeholder="Search headphones, batik, rice..."
                [class]="searchInput"
              />
            </div>
            <button markas-button type="submit" [class]="searchButton">
              Search
            </button>
          </form>
          <div [class]="actions">
            <a href="/account" aria-label="Account" [class]="accountLink">
              <svg pasarIcon="user" [class]="iconSize"></svg>
            </a>
            <a
              href="#products"
              [attr.aria-label]="'Wishlist, ' + itemsLabel(wishlist().length)"
              [class]="iconButton"
            >
              <svg pasarIcon="heart" [class]="iconSize"></svg>
              @if (wishlist().length > 0) {
                <span
                  aria-hidden="true"
                  [class]="countBadge"
                  [textContent]="wishlist().length"
                ></span>
              }
            </a>
            <button
              type="button"
              [attr.aria-label]="'Cart, ' + itemsLabel(cartCount())"
              [class]="iconButton"
              (click)="open(CART_ID)"
            >
              <svg pasarIcon="bag" [class]="iconSize"></svg>
              @if (cartCount() > 0) {
                <span
                  aria-hidden="true"
                  data-cart-count=""
                  [class]="countBadge"
                  [textContent]="cartCount()"
                ></span>
              }
            </button>
          </div>
        </div>
      </header>

      <main>
        <nav aria-label="Shop by category" [class]="categoryNav">
          <ul [class]="categoryList">
            @for (item of categoryRow; track item.value) {
              <li>
                <a
                  href="#products"
                  [class]="categoryLink"
                  (click)="category.set(item.value)"
                >
                  <span [class]="categoryBubble"
                    ><svg [pasarIcon]="item.icon" [class]="categoryIcon"></svg
                  ></span>
                  {{ item.label }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <section aria-labelledby="pasar-title" [class]="hero">
          <div [class]="heroCard">
            <div [class]="heroCopy">
              <p [class]="eyebrow">
                <span aria-hidden="true" [class]="eyebrowDot"></span>Payday
                sale, until 30 November
              </p>
              <h1 id="pasar-title" [class]="h1" [textContent]="TITLE"></h1>
              <p [class]="heroLead">
                Fashion, gadgets, groceries, and home goods from local sellers
                across Indonesia, with same-day delivery in 12 cities.
              </p>
              <div [class]="heroActions">
                <a href="#deals" [class]="primaryLink"
                  >Shop the sale<svg pasarIcon="arrow" class="size-4"></svg
                ></a>
                <a href="#categories" [class]="secondaryLink"
                  >Browse categories</a
                >
              </div>
            </div>
            <div [class]="heroMedia">
              <img
                [src]="image('hero-bags')"
                alt="A hand holding red, white, and brown paper shopping bags"
                width="1200"
                height="900"
                fetchpriority="high"
                decoding="async"
                [class]="heroImage"
              />
              <p [class]="offerTag">
                <span [class]="offerSmall">Up to</span>
                <span [class]="offerBig">60%</span>
                <span [class]="offerSmall">off</span>
              </p>
              <div [class]="heroChip">
                <img
                  [src]="image('smartwatch')"
                  alt=""
                  width="48"
                  height="48"
                  decoding="async"
                  [class]="chipImage"
                />
                <div class="min-w-0">
                  <p [class]="chipName">Fitness smartwatch</p>
                  <p [class]="chipPrice">
                    Rp 449.000<span [class]="chipWas">Rp 899.000</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ul aria-label="Why shop with us" [class]="trustList">
          @for (item of trust; track item.title) {
            <li [class]="trustItem">
              <span [class]="trustIcon"
                ><svg [pasarIcon]="item.icon" class="size-5"></svg
              ></span>
              <div>
                <p [class]="trustTitle" [textContent]="item.title"></p>
                <p [class]="trustText" [textContent]="item.text"></p>
              </div>
            </li>
          }
        </ul>

        <section id="deals" aria-labelledby="pasar-deals" [class]="section">
          <div [class]="sectionHead">
            <div>
              <h2 id="pasar-deals" [class]="h2">Flash deal</h2>
              <p [class]="lead">
                A new deal every three days, while stock lasts.
              </p>
            </div>
          </div>
          <div [class]="dealCard">
            <div [class]="dealMedia">
              <img
                [src]="image('flash-speaker')"
                alt="A dark grey portable speaker on a white table"
                width="600"
                height="600"
                loading="lazy"
                decoding="async"
                [class]="dealImage"
              />
            </div>
            <div [class]="dealBody">
              <p [class]="dealLabel">
                <svg pasarIcon="bolt" [class]="dealIcon"></svg>Flash deal
              </p>
              <h3 [class]="dealTitle" [textContent]="deal.name"></h3>
              <p [class]="dealPriceRow">
                <span
                  [class]="dealPrice"
                  [textContent]="rupiah(deal.price)"
                ></span>
                <span [class]="dealWas" [textContent]="rupiah(deal.was)"></span>
                <span
                  [class]="dealOff"
                  [textContent]="percentOff(deal.price, deal.was)"
                ></span>
              </p>
              <div>
                <p id="pasar-timer-label" [class]="timerLabel">Deal ends in</p>
                <div
                  role="timer"
                  aria-labelledby="pasar-timer-label"
                  [class]="timerGrid"
                >
                  @for (unit of timerUnits; track unit; let index = $index) {
                    <p [class]="timerCell">
                      <span
                        [attr.data-timer]="unit"
                        [class]="timerValue"
                        [textContent]="timer()[index]"
                      ></span>
                      <span [class]="timerUnit" [textContent]="unit"></span>
                    </p>
                  }
                </div>
              </div>
              <div>
                <p [class]="stockRow">
                  <span
                    [textContent]="deal.sold + ' of ' + deal.stock + ' sold'"
                  ></span>
                  <span [class]="dealNote">Limit 2 per customer</span>
                </p>
                <div [class]="stockTrack"><div [class]="stockBar"></div></div>
              </div>
              <div [class]="dealActions">
                <button
                  markas-button
                  [class]="dealButton"
                  (click)="addToCart(deal.id)"
                >
                  <svg pasarIcon="bag" class="size-5"></svg>Add to cart
                </button>
                <span [class]="dealNote">Ships from Jakarta Utara</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="categories"
          aria-labelledby="pasar-categories"
          [class]="section"
        >
          <div [class]="sectionHead">
            <h2 id="pasar-categories" [class]="h2">Popular categories</h2>
            <a href="#products" [class]="textLink" (click)="category.set('all')"
              >See all products<svg pasarIcon="arrow" class="size-4"></svg
            ></a>
          </div>
          <ul [class]="tileGrid">
            @for (tile of tiles; track tile.value) {
              <li>
                <a
                  href="#products"
                  [class]="tileLink"
                  (click)="category.set(tile.value)"
                >
                  <img
                    [src]="image(tile.image)"
                    alt=""
                    width="480"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    [class]="tileImage"
                  />
                  <p [class]="tileName" [textContent]="tile.label"></p>
                  <p [class]="tileCount" [textContent]="tile.count"></p>
                </a>
              </li>
            }
          </ul>
        </section>

        <section
          id="products"
          aria-labelledby="pasar-products"
          [class]="section"
        >
          <div [class]="sectionHead">
            <div>
              <h2 id="pasar-products" [class]="h2">Today's picks</h2>
              <p [class]="lead">
                Prices drop at midnight WIB. Free returns on everything.
              </p>
            </div>
          </div>
          <div [class]="toolbar">
            <div [class]="filterScroll">
              <markas-toggle-group
                #categoryGroup
                label="Filter products by category"
                [items]="categoryItems"
                [value]="category()"
                (valueChange)="pickCategory($event)"
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
              <li [attr.data-product]="product.id" [class]="productCard">
                <div [class]="productMedia">
                  <img
                    [src]="image(product.id)"
                    alt=""
                    width="480"
                    height="480"
                    loading="lazy"
                    decoding="async"
                    [class]="productImage"
                  />
                  <span
                    [class]="discountBadge"
                    [textContent]="percentOff(product.price, product.was)"
                  ></span>
                  <button
                    type="button"
                    [attr.aria-label]="'Save ' + product.name"
                    [attr.aria-pressed]="wishlist().includes(product.id)"
                    [class]="wishButton"
                    (click)="toggleWish(product.id)"
                  >
                    <svg pasarIcon="heart" [class]="wishIcon"></svg>
                  </button>
                </div>
                <div [class]="productBody">
                  <h3 [class]="productName" [textContent]="product.name"></h3>
                  <p [class]="ratingRow">
                    <svg pasarIcon="star" [class]="starIcon"></svg>
                    <span
                      [class]="ratingValue"
                      [textContent]="product.rating"
                    ></span>
                    <span aria-hidden="true">·</span>
                    <span [textContent]="product.sold"></span>
                  </p>
                  <p [class]="priceRow">
                    <span
                      [class]="priceNow"
                      [textContent]="rupiah(product.price)"
                    ></span>
                    <span
                      [class]="priceWas"
                      [textContent]="rupiah(product.was)"
                    ></span>
                  </p>
                  <p [class]="cityText" [textContent]="product.city"></p>
                  <button
                    markas-button
                    variant="secondary"
                    size="sm"
                    [class]="addButton"
                    [attr.aria-label]="'Add to cart, ' + product.name"
                    (click)="addToCart(product.id)"
                  >
                    Add to cart
                  </button>
                </div>
              </li>
            }
          </ul>
        </section>

        <section aria-labelledby="pasar-promos" [class]="section">
          <h2 id="pasar-promos" [class]="h2">Edits for the week</h2>
          <ul [class]="promoGrid">
            @for (promo of promos; track promo.category) {
              <li [class]="promoCard">
                <div [class]="promoCopy">
                  <p [class]="promoKicker" [textContent]="promo.kicker"></p>
                  <h3 [class]="promoTitle" [textContent]="promo.title"></h3>
                  <p [class]="promoText" [textContent]="promo.text"></p>
                  <a
                    href="#products"
                    [class]="promoLink"
                    (click)="category.set(promo.category)"
                    >{{ promo.cta }}<svg pasarIcon="arrow" class="size-4"></svg
                  ></a>
                </div>
                <img
                  [src]="image(promo.image)"
                  alt=""
                  width="800"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  [class]="promoImage"
                />
              </li>
            }
          </ul>
        </section>

        <section id="best" aria-labelledby="pasar-best" [class]="section">
          <div [class]="sectionHead">
            <div>
              <h2 id="pasar-best" [class]="h2">Best sellers this week</h2>
              <p [class]="lead">Ranked by orders in the last seven days.</p>
            </div>
          </div>
          <div [class]="carouselWrap">
            <markas-carousel label="Best sellers" showDots [items]="bestPages">
              <ng-template let-page let-pageIndex="index">
                <ol [attr.start]="pageIndex * 4 + 1" [class]="slideGrid">
                  @for (
                    item of asBest(page);
                    track item.id;
                    let index = $index
                  ) {
                    <li [class]="bestCard">
                      <div [class]="bestMedia">
                        <img
                          [src]="image(item.id)"
                          alt=""
                          width="480"
                          height="480"
                          loading="lazy"
                          decoding="async"
                          [class]="bestImage"
                        />
                        <span
                          aria-hidden="true"
                          [class]="bestRank"
                          [textContent]="pageIndex * 4 + index + 1"
                        ></span>
                      </div>
                      <div [class]="bestBody">
                        <h3
                          [class]="productName"
                          [textContent]="item.name"
                        ></h3>
                        <p [class]="ratingRow">
                          <svg pasarIcon="star" [class]="starIcon"></svg>
                          <span
                            [class]="ratingValue"
                            [textContent]="item.rating"
                          ></span>
                          <span aria-hidden="true">·</span>
                          <span [textContent]="item.sold"></span>
                        </p>
                        <div [class]="bestFoot">
                          <p
                            [class]="priceNow"
                            [textContent]="rupiah(item.price)"
                          ></p>
                          <button
                            type="button"
                            [attr.aria-label]="'Add to cart, ' + item.name"
                            [class]="bestAdd"
                            (click)="addToCart(item.id)"
                          >
                            <svg pasarIcon="plus" class="size-4"></svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  }
                </ol>
              </ng-template>
            </markas-carousel>
          </div>
        </section>

        <div [class]="container">
          <div [class]="storyGrid">
            <figure [class]="quoteCard">
              <div>
                <p [class]="quoteStars">
                  @for (star of stars; track star) {
                    <svg pasarIcon="star" [class]="quoteStar"></svg>
                  }
                  <span [class]="srOnly">Rated 5 out of 5</span>
                </p>
                <blockquote [class]="quoteText">
                  I ordered a rice cooker on Tuesday night and it reached my
                  door in Makassar on Thursday. The lid arrived cracked, and the
                  seller sent a new one the same day I asked.
                </blockquote>
              </div>
              <figcaption [class]="person">
                <markas-avatar name="Dewi Lestari" size="md" />
                <div>
                  <p [class]="personName">Dewi Lestari</p>
                  <p [class]="personRole">
                    Bought from 14 sellers this year, Makassar
                  </p>
                </div>
              </figcaption>
            </figure>
            <section aria-labelledby="pasar-sell" [class]="sellCard">
              <h2 id="pasar-sell" [class]="sellTitle">Sell on Pasarloka</h2>
              <p [class]="sellText">
                Over 40.000 small businesses sell here, from batik makers in
                Pekalongan to coffee roasters in Toraja.
              </p>
              <ul [class]="sellList">
                @for (point of sellPoints; track point) {
                  <li [class]="sellItem">
                    <svg pasarIcon="check" [class]="sellIcon"></svg>{{ point }}
                  </li>
                }
              </ul>
              <button type="button" [class]="sellButton" (click)="openShop()">
                Open your shop
              </button>
            </section>
          </div>
        </div>

        <div [class]="bandWrap">
          <section aria-labelledby="pasar-newsletter" [class]="band">
            <div>
              <h2 id="pasar-newsletter" [class]="bandTitle">
                Get deals before they go live
              </h2>
              <p [class]="bandText">
                Every Thursday: next week's flash deals and vouchers from new
                sellers. No spam.
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
        description="An online marketplace for local sellers across Indonesia."
        [columns]="footerColumns"
        [legal]="legal"
        copyright="© 2026 Pasarloka. Built with MarkasUI."
      >
        <a brand href="#top" [class]="brandLink">
          <span [class]="brandMark"
            ><svg pasarIcon="bag" class="size-5"></svg></span
          >Pasarloka
        </a>
      </footer>

      <markas-drawer [id]="MENU_ID" side="left" title="Shop by category">
        <ul [class]="drawerList">
          @for (item of categoryRow; track item.value) {
            <li>
              <a
                href="#products"
                [class]="drawerLink"
                (click)="pickFromMenu(item.value)"
              >
                <span [class]="drawerIcon"
                  ><svg [pasarIcon]="item.icon" class="size-5"></svg
                ></span>
                {{ item.label }}
              </a>
            </li>
          }
        </ul>
        <p [class]="drawerHeading">Help and account</p>
        <ul>
          @for (link of menuLinks; track link.href) {
            <li>
              <a
                [href]="link.href"
                [class]="drawerPlain"
                [textContent]="link.label"
              ></a>
            </li>
          }
        </ul>
      </markas-drawer>

      <markas-drawer
        #cartDrawer
        [id]="CART_ID"
        title="Your cart"
        (closed)="onCartClose()"
      >
        @if (lines().length === 0) {
          <p [class]="cartEmpty">Your cart is empty.</p>
        } @else {
          <ul [class]="cartList">
            @for (line of lines(); track line.id) {
              <li [attr.data-cart-line]="line.id" [class]="cartLine">
                <img
                  [src]="image(line.id)"
                  alt=""
                  width="56"
                  height="56"
                  loading="lazy"
                  decoding="async"
                  [class]="cartImage"
                />
                <div class="min-w-0">
                  <p [class]="cartName" [textContent]="line.name"></p>
                  <p
                    [class]="cartMeta"
                    [textContent]="line.qty + ' x ' + rupiah(line.price)"
                  ></p>
                </div>
                <p
                  [class]="cartTotal"
                  [textContent]="rupiah(line.qty * line.price)"
                ></p>
              </li>
            }
          </ul>
        }
        <div [class]="cartSummary">
          <p [class]="summaryRow">
            <span>Subtotal</span>
            <span data-subtotal="" [textContent]="rupiah(subtotal())"></span>
          </p>
          <p [class]="shipNote" [textContent]="shippingNote(subtotal())"></p>
        </div>
        <ng-container footer>
          <button
            markas-button
            variant="secondary"
            type="submit"
            value="cancel"
          >
            Keep shopping
          </button>
          <button
            markas-button
            type="submit"
            value="checkout"
            [disabled]="cartCount() === 0"
          >
            Checkout
          </button>
        </ng-container>
      </markas-drawer>

      <markas-bottom-navigation
        [items]="bottomItems"
        [value]="tab()"
        (valueChange)="onTab($event)"
        navLabel="Shop"
        [class]="bottomNav"
      />
      <markas-toaster />
    </div>
  `,
})
export default class Pasar {
  protected readonly root = root;
  protected readonly container = container;
  protected readonly promoBar = promoBar;
  protected readonly promoCode = promoCode;
  protected readonly header = header;
  protected readonly headerRow = headerRow;
  protected readonly iconButton = iconButton;
  protected readonly iconSize = iconSize;
  protected readonly countBadge = countBadge;
  protected readonly brandLink = brandLink;
  protected readonly brandMark = brandMark;
  protected readonly brandName = brandName;
  protected readonly brandTagline = brandTagline;
  protected readonly actions = actions;
  protected readonly accountLink = accountLink;
  protected readonly searchForm = searchForm;
  protected readonly searchField = searchField;
  protected readonly searchIcon = searchIcon;
  protected readonly searchInput = searchInput;
  protected readonly searchButton = searchButton;
  protected readonly srOnly = srOnly;
  protected readonly categoryNav = categoryNav;
  protected readonly categoryList = categoryList;
  protected readonly categoryLink = categoryLink;
  protected readonly categoryBubble = categoryBubble;
  protected readonly categoryIcon = categoryIcon;
  protected readonly hero = hero;
  protected readonly heroCard = heroCard;
  protected readonly heroCopy = heroCopy;
  protected readonly eyebrow = eyebrow;
  protected readonly eyebrowDot = eyebrowDot;
  protected readonly h1 = h1;
  protected readonly heroLead = heroLead;
  protected readonly heroActions = heroActions;
  protected readonly primaryLink = primaryLink;
  protected readonly secondaryLink = secondaryLink;
  protected readonly heroMedia = heroMedia;
  protected readonly heroImage = heroImage;
  protected readonly offerTag = offerTag;
  protected readonly offerSmall = offerSmall;
  protected readonly offerBig = offerBig;
  protected readonly heroChip = heroChip;
  protected readonly chipImage = chipImage;
  protected readonly chipName = chipName;
  protected readonly chipPrice = chipPrice;
  protected readonly chipWas = chipWas;
  protected readonly trustList = trustList;
  protected readonly trustItem = trustItem;
  protected readonly trustIcon = trustIcon;
  protected readonly trustTitle = trustTitle;
  protected readonly trustText = trustText;
  protected readonly section = section;
  protected readonly sectionHead = sectionHead;
  protected readonly h2 = h2;
  protected readonly lead = lead;
  protected readonly textLink = textLink;
  protected readonly dealCard = dealCard;
  protected readonly dealMedia = dealMedia;
  protected readonly dealImage = dealImage;
  protected readonly dealBody = dealBody;
  protected readonly dealLabel = dealLabel;
  protected readonly dealIcon = dealIcon;
  protected readonly dealTitle = dealTitle;
  protected readonly dealPriceRow = dealPriceRow;
  protected readonly dealPrice = dealPrice;
  protected readonly dealWas = dealWas;
  protected readonly dealOff = dealOff;
  protected readonly timerLabel = timerLabel;
  protected readonly timerGrid = timerGrid;
  protected readonly timerCell = timerCell;
  protected readonly timerValue = timerValue;
  protected readonly timerUnit = timerUnit;
  protected readonly stockRow = stockRow;
  protected readonly stockTrack = stockTrack;
  protected readonly stockBar = stockBar;
  protected readonly dealActions = dealActions;
  protected readonly dealButton = dealButton;
  protected readonly dealNote = dealNote;
  protected readonly tileGrid = tileGrid;
  protected readonly tileLink = tileLink;
  protected readonly tileImage = tileImage;
  protected readonly tileName = tileName;
  protected readonly tileCount = tileCount;
  protected readonly toolbar = toolbar;
  protected readonly filterScroll = filterScroll;
  protected readonly countText = countText;
  protected readonly productGrid = productGrid;
  protected readonly productCard = productCard;
  protected readonly productMedia = productMedia;
  protected readonly productImage = productImage;
  protected readonly discountBadge = discountBadge;
  protected readonly wishButton = wishButton;
  protected readonly wishIcon = wishIcon;
  protected readonly productBody = productBody;
  protected readonly productName = productName;
  protected readonly ratingRow = ratingRow;
  protected readonly starIcon = starIcon;
  protected readonly ratingValue = ratingValue;
  protected readonly priceRow = priceRow;
  protected readonly priceNow = priceNow;
  protected readonly priceWas = priceWas;
  protected readonly cityText = cityText;
  protected readonly addButton = addButton;
  protected readonly promoGrid = promoGrid;
  protected readonly promoCard = promoCard;
  protected readonly promoCopy = promoCopy;
  protected readonly promoKicker = promoKicker;
  protected readonly promoTitle = promoTitle;
  protected readonly promoText = promoText;
  protected readonly promoLink = promoLink;
  protected readonly promoImage = promoImage;
  protected readonly carouselWrap = carouselWrap;
  protected readonly slideGrid = slideGrid;
  protected readonly bestCard = bestCard;
  protected readonly bestMedia = bestMedia;
  protected readonly bestRank = bestRank;
  protected readonly bestImage = bestImage;
  protected readonly bestBody = bestBody;
  protected readonly bestFoot = bestFoot;
  protected readonly bestAdd = bestAdd;
  protected readonly storyGrid = storyGrid;
  protected readonly quoteCard = quoteCard;
  protected readonly quoteStars = quoteStars;
  protected readonly quoteStar = quoteStar;
  protected readonly quoteText = quoteText;
  protected readonly person = person;
  protected readonly personName = personName;
  protected readonly personRole = personRole;
  protected readonly sellCard = sellCard;
  protected readonly sellTitle = sellTitle;
  protected readonly sellText = sellText;
  protected readonly sellList = sellList;
  protected readonly sellItem = sellItem;
  protected readonly sellIcon = sellIcon;
  protected readonly sellButton = sellButton;
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
  protected readonly drawerList = drawerList;
  protected readonly drawerLink = drawerLink;
  protected readonly drawerIcon = drawerIcon;
  protected readonly drawerHeading = drawerHeading;
  protected readonly drawerPlain = drawerPlain;
  protected readonly cartList = cartList;
  protected readonly cartLine = cartLine;
  protected readonly cartImage = cartImage;
  protected readonly cartName = cartName;
  protected readonly cartMeta = cartMeta;
  protected readonly cartTotal = cartTotal;
  protected readonly cartEmpty = cartEmpty;
  protected readonly cartSummary = cartSummary;
  protected readonly summaryRow = summaryRow;
  protected readonly shipNote = shipNote;
  protected readonly bottomNav = bottomNav;
  protected readonly footer = footer;
  protected readonly TITLE = TITLE;
  protected readonly CART_ID = CART_ID;
  protected readonly MENU_ID = MENU_ID;
  protected readonly SEARCH_ID = SEARCH_ID;
  protected readonly EMAIL_ID = EMAIL_ID;
  protected readonly image = image;
  protected readonly categories = categories;
  protected readonly categoryItems = categoryItems;
  protected readonly categoryRow = categoryRow;
  protected readonly trust = trust;
  protected readonly tiles = tiles;
  protected readonly products = products;
  protected readonly bestPages = bestPages;
  protected readonly deal = deal;
  protected readonly timerUnits = timerUnits;
  protected readonly promos = promos;
  protected readonly sellPoints = sellPoints;
  protected readonly bottomItems = bottomItems;
  protected readonly menuLinks = menuLinks;
  protected readonly footerColumns = footerColumns;
  protected readonly legal = legal;
  protected readonly rupiah = rupiah;
  protected readonly percentOff = percentOff;
  protected readonly countLabel = countLabel;
  protected readonly itemsLabel = itemsLabel;
  protected readonly shippingNote = shippingNote;
  protected readonly stars = [1, 2, 3, 4, 5];
  private readonly cartDrawer = viewChild("cartDrawer", { read: ElementRef });
  private readonly categoryGroup = viewChild<ToggleGroup>("categoryGroup");
  protected readonly category = signal("all");
  protected readonly cart = signal<Cart>({ mug: 1, sunglasses: 1 });
  protected readonly wishlist = signal<string[]>(["smartwatch"]);
  protected readonly now = signal<number | null>(null);
  protected readonly query = signal("");
  protected readonly tab = signal("home");
  protected readonly email = signal("");
  protected readonly emailError = signal("");
  protected readonly visible = computed(() =>
    products.filter(
      (product) =>
        this.category() === "all" || product.category === this.category(),
    ),
  );
  protected readonly lines = computed(() =>
    Object.entries(this.cart()).map(([id, qty]) => ({ ...productOf(id), qty })),
  );
  protected readonly cartCount = computed(() =>
    this.lines().reduce((sum, line) => sum + line.qty, 0),
  );
  protected readonly subtotal = computed(() =>
    this.lines().reduce((sum, line) => sum + line.qty * line.price, 0),
  );
  protected readonly timer = computed(() => timerParts(this.now()));

  constructor() {
    let ticker = 0;
    afterNextRender(() => {
      const tick = () => this.now.set(Date.now());
      tick();
      ticker = window.setInterval(tick, 1000);
    });
    inject(DestroyRef).onDestroy(() => window.clearInterval(ticker));
  }

  /** Slide carousel Angular tidak bertipe; kembalikan ke tipe halaman terlaris. */
  protected asBest(page: unknown) {
    return page as (typeof bestSellers)[number][];
  }
  /** ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; kembalikan supaya selalu ada pilihan. */
  protected pickCategory(value: string | string[] | undefined) {
    if (typeof value === "string" && value) this.category.set(value);
    else this.categoryGroup()?.value.set(this.category());
  }
  protected open(id: string) {
    (document.getElementById(id) as HTMLDialogElement).showModal();
  }
  protected addToCart(id: string) {
    const count = this.cartCount();
    this.cart.update((cart) => ({ ...cart, [id]: (cart[id] ?? 0) + 1 }));
    toast({
      title: "Added to cart",
      description: `${productOf(id).name}. Your cart has ${itemsLabel(count + 1)}.`,
      variant: "success",
    });
  }
  protected toggleWish(id: string) {
    this.wishlist.update((list) =>
      list.includes(id) ? list.filter((item) => item !== id) : [...list, id],
    );
  }
  protected pickFromMenu(value: string) {
    this.category.set(value);
    (document.getElementById(MENU_ID) as HTMLDialogElement).close();
  }
  protected search(event: Event) {
    event.preventDefault();
    const value = this.query().trim();
    toast(
      value
        ? {
            title: `Results for ${value}`,
            description:
              "Sorted by best match. Filter by price, city, and rating on the next page.",
          }
        : {
            title: "Type something to search",
            description: "Try headphones, batik, or rice.",
          },
    );
  }
  /** Drawer hanya memancarkan closed; returnValue dibaca dari dialog di dalamnya. */
  protected onCartClose() {
    const dialog = this.cartDrawer()?.nativeElement.querySelector("dialog");
    if (!dialog) return;
    if (dialog.returnValue === "checkout")
      toast({
        title: "Taking you to checkout",
        description: `${itemsLabel(this.cartCount())}, ${rupiah(this.subtotal())}. Pay with QRIS, virtual account, or card.`,
        variant: "success",
      });
    dialog.returnValue = "";
  }
  protected onTab(value: string | undefined) {
    if (!value) return;
    this.tab.set(value);
    if (value === "account")
      toast({
        title: "Sign in to see your account",
        description: "Orders, saved addresses, and vouchers live here.",
      });
  }
  protected openShop() {
    toast({
      title: "Seller sign-up opened",
      description:
        "Have your KTP and a bank account ready. It takes about ten minutes.",
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
      description: `Next Thursday's deals are on their way to ${value}.`,
      variant: "success",
    });
  }
}
