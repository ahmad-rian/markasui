"use client";

import {
  useEffect,
  useState,
  type FormEvent,
  type SyntheticEvent,
} from "react";
import { Avatar } from "../../../components/avatar/Avatar";
import { BottomNavigation } from "../../../components/bottom-navigation/BottomNavigation";
import { Button } from "../../../components/button/Button";
import { Carousel } from "../../../components/carousel/Carousel";
import { Drawer } from "../../../components/drawer/Drawer";
import { Footer } from "../../../components/footer/Footer";
import { Input } from "../../../components/input/Input";
import { Toaster, toast } from "../../../components/toast/Toast";
import { ToggleGroup } from "../../../components/toggle-group/ToggleGroup";

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
const eyebrow =
  "inline-flex items-center gap-2 text-sm font-medium text-primary";
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
const timerCell = "rounded-xl bg-primary-soft px-2 py-3 text-center";
const timerValue =
  "block text-2xl leading-none font-semibold tracking-tight text-primary tabular-nums sm:text-3xl";
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
  "grid overflow-hidden rounded-3xl bg-primary-soft sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]";
const promoCopy = "flex flex-col items-start gap-3 p-6 sm:p-8";
const promoKicker = "text-sm font-medium text-primary";
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
  "absolute top-2 left-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-on-primary shadow-overlay";
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
  "grid gap-6 rounded-3xl border border-primary-line bg-primary-soft p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12";
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
        <Icon name="bag" className="size-5" />
      </span>
      <span className="min-w-0">
        <span className={brandName}>Pasarloka</span>
        <span className={brandTagline}>Shop from 40.000 local sellers</span>
      </span>
    </a>
  );
}

function FooterBrand() {
  return (
    <a href="#top" className={brandLink}>
      <span className={brandMark}>
        <Icon name="bag" className="size-5" />
      </span>
      Pasarloka
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
      description: `Next Thursday's deals are on their way to ${value}.`,
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

export default function Pasar() {
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState<Cart>({ mug: 1, sunglasses: 1 });
  const [wishlist, setWishlist] = useState<string[]>(["smartwatch"]);
  const [now, setNow] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("home");
  const visible = products.filter(
    (product) => category === "all" || product.category === category,
  );
  const lines = Object.entries(cart).map(([id, qty]) => ({
    ...productOf(id),
    qty,
  }));
  const cartCount = lines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.qty * line.price, 0);
  const timer = timerParts(now);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const dialog = (id: string) =>
    document.getElementById(id) as HTMLDialogElement;
  const addToCart = (id: string) => {
    setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 });
    toast({
      title: "Added to cart",
      description: `${productOf(id).name}. Your cart has ${itemsLabel(cartCount + 1)}.`,
      variant: "success",
    });
  };
  const toggleWish = (id: string) =>
    setWishlist(
      wishlist.includes(id)
        ? wishlist.filter((item) => item !== id)
        : [...wishlist, id],
    );
  const pickFromMenu = (value: string) => {
    setCategory(value);
    dialog(MENU_ID).close();
  };
  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
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
  };
  const onCartClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    const target = event.currentTarget;
    if (target.returnValue === "checkout")
      toast({
        title: "Taking you to checkout",
        description: `${itemsLabel(cartCount)}, ${rupiah(subtotal)}. Pay with QRIS, virtual account, or card.`,
        variant: "success",
      });
    target.returnValue = "";
  };
  const onTab = (value: string) => {
    setTab(value);
    if (value === "account")
      toast({
        title: "Sign in to see your account",
        description: "Orders, saved addresses, and vouchers live here.",
      });
  };
  const openShop = () =>
    toast({
      title: "Seller sign-up opened",
      description:
        "Have your KTP and a bank account ready. It takes about ten minutes.",
    });

  return (
    <div id="top" className={root}>
      <p className={promoBar}>
        Free shipping on orders over Rp 150.000. New here? Use{" "}
        <span className={promoCode}>PASARBARU</span> for 10% off.
      </p>
      <header className={header}>
        <div className={headerRow}>
          <button
            type="button"
            aria-label="Open menu"
            className={iconButton}
            onClick={() => dialog(MENU_ID).showModal()}
          >
            <Icon name="menu" className={iconSize} />
          </button>
          <Brand />
          <form role="search" className={searchForm} onSubmit={search}>
            <div className={searchField}>
              <label htmlFor={SEARCH_ID} className={srOnly}>
                Search products
              </label>
              <Icon name="search" className={searchIcon} />
              <Input
                id={SEARCH_ID}
                type="search"
                name="q"
                placeholder="Search headphones, batik, rice..."
                className={searchInput}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <Button type="submit" className={searchButton}>
              Search
            </Button>
          </form>
          <div className={actions}>
            <a href="/account" aria-label="Account" className={accountLink}>
              <Icon name="user" className={iconSize} />
            </a>
            <a
              href="#products"
              aria-label={`Wishlist, ${itemsLabel(wishlist.length)}`}
              className={iconButton}
            >
              <Icon name="heart" className={iconSize} />
              {wishlist.length > 0 && (
                <span aria-hidden="true" className={countBadge}>
                  {wishlist.length}
                </span>
              )}
            </a>
            <button
              type="button"
              aria-label={`Cart, ${itemsLabel(cartCount)}`}
              className={iconButton}
              onClick={() => dialog(CART_ID).showModal()}
            >
              <Icon name="bag" className={iconSize} />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  data-cart-count=""
                  className={countBadge}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main>
        <nav aria-label="Shop by category" className={categoryNav}>
          <ul className={categoryList}>
            {categoryRow.map((item) => (
              <li key={item.value}>
                <a
                  href="#products"
                  className={categoryLink}
                  onClick={() => setCategory(item.value)}
                >
                  <span className={categoryBubble}>
                    <Icon name={item.icon} className={categoryIcon} />
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="pasar-title" className={hero}>
          <div className={heroCard}>
            <div className={heroCopy}>
              <p className={eyebrow}>
                <span aria-hidden="true" className={eyebrowDot} />
                Payday sale, until 30 November
              </p>
              <h1 id="pasar-title" className={h1}>
                {TITLE}
              </h1>
              <p className={heroLead}>
                Fashion, gadgets, groceries, and home goods from local sellers
                across Indonesia, with same-day delivery in 12 cities.
              </p>
              <div className={heroActions}>
                <a href="#deals" className={primaryLink}>
                  Shop the sale
                  <Icon name="arrow" className="size-4" />
                </a>
                <a href="#categories" className={secondaryLink}>
                  Browse categories
                </a>
              </div>
            </div>
            <div className={heroMedia}>
              <img
                src={image("hero-bags")}
                alt="A hand holding red, white, and brown paper shopping bags"
                width={1200}
                height={900}
                fetchPriority="high"
                decoding="async"
                className={heroImage}
              />
              <p className={offerTag}>
                <span className={offerSmall}>Up to</span>
                <span className={offerBig}>60%</span>
                <span className={offerSmall}>off</span>
              </p>
              <div className={heroChip}>
                <img
                  src={image("smartwatch")}
                  alt=""
                  width={48}
                  height={48}
                  decoding="async"
                  className={chipImage}
                />
                <div className="min-w-0">
                  <p className={chipName}>Fitness smartwatch</p>
                  <p className={chipPrice}>
                    Rp 449.000<span className={chipWas}>Rp 899.000</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ul aria-label="Why shop with us" className={trustList}>
          {trust.map((item) => (
            <li key={item.title} className={trustItem}>
              <span className={trustIcon}>
                <Icon name={item.icon} className="size-5" />
              </span>
              <div>
                <p className={trustTitle}>{item.title}</p>
                <p className={trustText}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <section id="deals" aria-labelledby="pasar-deals" className={section}>
          <div className={sectionHead}>
            <div>
              <h2 id="pasar-deals" className={h2}>
                Flash deal
              </h2>
              <p className={lead}>
                A new deal every three days, while stock lasts.
              </p>
            </div>
          </div>
          <div className={dealCard}>
            <div className={dealMedia}>
              <img
                src={image("flash-speaker")}
                alt="A dark grey portable speaker on a white table"
                width={600}
                height={600}
                loading="lazy"
                decoding="async"
                className={dealImage}
              />
            </div>
            <div className={dealBody}>
              <p className={dealLabel}>
                <Icon name="bolt" className={dealIcon} />
                Flash deal
              </p>
              <h3 className={dealTitle}>{deal.name}</h3>
              <p className={dealPriceRow}>
                <span className={dealPrice}>{rupiah(deal.price)}</span>
                <span className={dealWas}>{rupiah(deal.was)}</span>
                <span className={dealOff}>
                  {percentOff(deal.price, deal.was)}
                </span>
              </p>
              <div>
                <p id="pasar-timer-label" className={timerLabel}>
                  Deal ends in
                </p>
                <div
                  role="timer"
                  aria-labelledby="pasar-timer-label"
                  className={timerGrid}
                >
                  {timerUnits.map((unit, index) => (
                    <p key={unit} className={timerCell}>
                      <span data-timer={unit} className={timerValue}>
                        {timer[index]}
                      </span>
                      <span className={timerUnit}>{unit}</span>
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className={stockRow}>
                  <span>
                    {deal.sold} of {deal.stock} sold
                  </span>
                  <span className={dealNote}>Limit 2 per customer</span>
                </p>
                <div className={stockTrack}>
                  <div className={stockBar} />
                </div>
              </div>
              <div className={dealActions}>
                <Button
                  className={dealButton}
                  onClick={() => addToCart(deal.id)}
                >
                  <Icon name="bag" className="size-5" />
                  Add to cart
                </Button>
                <span className={dealNote}>Ships from Jakarta Utara</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="categories"
          aria-labelledby="pasar-categories"
          className={section}
        >
          <div className={sectionHead}>
            <h2 id="pasar-categories" className={h2}>
              Popular categories
            </h2>
            <a
              href="#products"
              className={textLink}
              onClick={() => setCategory("all")}
            >
              See all products
              <Icon name="arrow" className="size-4" />
            </a>
          </div>
          <ul className={tileGrid}>
            {tiles.map((tile) => (
              <li key={tile.value}>
                <a
                  href="#products"
                  className={tileLink}
                  onClick={() => setCategory(tile.value)}
                >
                  <img
                    src={image(tile.image)}
                    alt=""
                    width={480}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className={tileImage}
                  />
                  <p className={tileName}>{tile.label}</p>
                  <p className={tileCount}>{tile.count}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="products"
          aria-labelledby="pasar-products"
          className={section}
        >
          <div className={sectionHead}>
            <div>
              <h2 id="pasar-products" className={h2}>
                Today&apos;s picks
              </h2>
              <p className={lead}>
                Prices drop at midnight WIB. Free returns on everything.
              </p>
            </div>
          </div>
          <div className={toolbar}>
            <div className={filterScroll}>
              <ToggleGroup
                label="Filter products by category"
                items={categoryItems}
                value={category}
                onValueChange={(value) =>
                  typeof value === "string" && value && setCategory(value)
                }
              />
            </div>
            <p aria-live="polite" className={countText}>
              {countLabel(visible.length)}
            </p>
          </div>
          <ul className={productGrid}>
            {visible.map((product) => (
              <li
                key={product.id}
                data-product={product.id}
                className={productCard}
              >
                <div className={productMedia}>
                  <img
                    src={image(product.id)}
                    alt=""
                    width={480}
                    height={480}
                    loading="lazy"
                    decoding="async"
                    className={productImage}
                  />
                  <span className={discountBadge}>
                    {percentOff(product.price, product.was)}
                  </span>
                  <button
                    type="button"
                    aria-label={`Save ${product.name}`}
                    aria-pressed={wishlist.includes(product.id)}
                    className={wishButton}
                    onClick={() => toggleWish(product.id)}
                  >
                    <Icon name="heart" className={wishIcon} />
                  </button>
                </div>
                <div className={productBody}>
                  <h3 className={productName}>{product.name}</h3>
                  <p className={ratingRow}>
                    <Icon name="star" className={starIcon} />
                    <span className={ratingValue}>{product.rating}</span>
                    <span aria-hidden="true">·</span>
                    {product.sold}
                  </p>
                  <p className={priceRow}>
                    <span className={priceNow}>{rupiah(product.price)}</span>
                    <span className={priceWas}>{rupiah(product.was)}</span>
                  </p>
                  <p className={cityText}>{product.city}</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className={addButton}
                    aria-label={`Add to cart, ${product.name}`}
                    onClick={() => addToCart(product.id)}
                  >
                    Add to cart
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="pasar-promos" className={section}>
          <h2 id="pasar-promos" className={h2}>
            Edits for the week
          </h2>
          <ul className={promoGrid}>
            {promos.map((promo) => (
              <li key={promo.category} className={promoCard}>
                <div className={promoCopy}>
                  <p className={promoKicker}>{promo.kicker}</p>
                  <h3 className={promoTitle}>{promo.title}</h3>
                  <p className={promoText}>{promo.text}</p>
                  <a
                    href="#products"
                    className={promoLink}
                    onClick={() => setCategory(promo.category)}
                  >
                    {promo.cta}
                    <Icon name="arrow" className="size-4" />
                  </a>
                </div>
                <img
                  src={image(promo.image)}
                  alt=""
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className={promoImage}
                />
              </li>
            ))}
          </ul>
        </section>

        <section id="best" aria-labelledby="pasar-best" className={section}>
          <div className={sectionHead}>
            <div>
              <h2 id="pasar-best" className={h2}>
                Best sellers this week
              </h2>
              <p className={lead}>Ranked by orders in the last seven days.</p>
            </div>
          </div>
          <div className={carouselWrap}>
            <Carousel label="Best sellers" showDots>
              {bestPages.map((page, pageIndex) => (
                <ol
                  key={pageIndex}
                  start={pageIndex * 4 + 1}
                  className={slideGrid}
                >
                  {page.map((item, index) => (
                    <li key={item.id} className={bestCard}>
                      <div className={bestMedia}>
                        <img
                          src={image(item.id)}
                          alt=""
                          width={480}
                          height={480}
                          loading="lazy"
                          decoding="async"
                          className={bestImage}
                        />
                        <span aria-hidden="true" className={bestRank}>
                          {pageIndex * 4 + index + 1}
                        </span>
                      </div>
                      <div className={bestBody}>
                        <h3 className={productName}>{item.name}</h3>
                        <p className={ratingRow}>
                          <Icon name="star" className={starIcon} />
                          <span className={ratingValue}>{item.rating}</span>
                          <span aria-hidden="true">·</span>
                          {item.sold}
                        </p>
                        <div className={bestFoot}>
                          <p className={priceNow}>{rupiah(item.price)}</p>
                          <button
                            type="button"
                            aria-label={`Add to cart, ${item.name}`}
                            className={bestAdd}
                            onClick={() => addToCart(item.id)}
                          >
                            <Icon name="plus" className="size-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              ))}
            </Carousel>
          </div>
        </section>

        <div className={container}>
          <div className={storyGrid}>
            <figure className={quoteCard}>
              <div>
                <p className={quoteStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="star" className={quoteStar} />
                  ))}
                  <span className={srOnly}>Rated 5 out of 5</span>
                </p>
                <blockquote className={quoteText}>
                  I ordered a rice cooker on Tuesday night and it reached my
                  door in Makassar on Thursday. The lid arrived cracked, and the
                  seller sent a new one the same day I asked.
                </blockquote>
              </div>
              <figcaption className={person}>
                <Avatar name="Dewi Lestari" size="md" />
                <div>
                  <p className={personName}>Dewi Lestari</p>
                  <p className={personRole}>
                    Bought from 14 sellers this year, Makassar
                  </p>
                </div>
              </figcaption>
            </figure>
            <section aria-labelledby="pasar-sell" className={sellCard}>
              <h2 id="pasar-sell" className={sellTitle}>
                Sell on Pasarloka
              </h2>
              <p className={sellText}>
                Over 40.000 small businesses sell here, from batik makers in
                Pekalongan to coffee roasters in Toraja.
              </p>
              <ul className={sellList}>
                {sellPoints.map((point) => (
                  <li key={point} className={sellItem}>
                    <Icon name="check" className={sellIcon} />
                    {point}
                  </li>
                ))}
              </ul>
              <button type="button" className={sellButton} onClick={openShop}>
                Open your shop
              </button>
            </section>
          </div>
        </div>

        <div className={bandWrap}>
          <section aria-labelledby="pasar-newsletter" className={band}>
            <div>
              <h2 id="pasar-newsletter" className={bandTitle}>
                Get deals before they go live
              </h2>
              <p className={bandText}>
                Every Thursday: next week&apos;s flash deals and vouchers from
                new sellers. No spam.
              </p>
            </div>
            <Newsletter />
          </section>
        </div>
      </main>

      <Footer
        className={footer}
        brand={<FooterBrand />}
        description="An online marketplace for local sellers across Indonesia."
        columns={footerColumns}
        legal={legal}
        copyright="© 2026 Pasarloka. Built with MarkasUI."
      />

      <Drawer id={MENU_ID} side="left" title="Shop by category">
        <ul className={drawerList}>
          {categoryRow.map((item) => (
            <li key={item.value}>
              <a
                href="#products"
                className={drawerLink}
                onClick={() => pickFromMenu(item.value)}
              >
                <span className={drawerIcon}>
                  <Icon name={item.icon} className="size-5" />
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className={drawerHeading}>Help and account</p>
        <ul>
          {menuLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={drawerPlain}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Drawer>

      <Drawer
        id={CART_ID}
        title="Your cart"
        onClose={onCartClose}
        footer={
          <>
            <Button variant="secondary" type="submit" value="cancel">
              Keep shopping
            </Button>
            <Button type="submit" value="checkout" disabled={cartCount === 0}>
              Checkout
            </Button>
          </>
        }
      >
        {lines.length === 0 ? (
          <p className={cartEmpty}>Your cart is empty.</p>
        ) : (
          <ul className={cartList}>
            {lines.map((line) => (
              <li key={line.id} data-cart-line={line.id} className={cartLine}>
                <img
                  src={image(line.id)}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className={cartImage}
                />
                <div className="min-w-0">
                  <p className={cartName}>{line.name}</p>
                  <p className={cartMeta}>
                    {line.qty} x {rupiah(line.price)}
                  </p>
                </div>
                <p className={cartTotal}>{rupiah(line.qty * line.price)}</p>
              </li>
            ))}
          </ul>
        )}
        <div className={cartSummary}>
          <p className={summaryRow}>
            <span>Subtotal</span>
            <span data-subtotal="">{rupiah(subtotal)}</span>
          </p>
          <p className={shipNote}>{shippingNote(subtotal)}</p>
        </div>
      </Drawer>

      <BottomNavigation
        items={bottomItems}
        value={tab}
        onValueChange={onTab}
        navLabel="Shop"
        className={bottomNav}
      />
      <Toaster />
    </div>
  );
}
