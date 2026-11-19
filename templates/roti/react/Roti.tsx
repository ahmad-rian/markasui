"use client";

import { useRef, useState, type FormEvent, type SyntheticEvent } from "react";
import { Avatar } from "../../../components/avatar/Avatar";
import { Button } from "../../../components/button/Button";
import { Drawer } from "../../../components/drawer/Drawer";
import { Faq } from "../../../components/faq/Faq";
import { Footer } from "../../../components/footer/Footer";
import { Input } from "../../../components/input/Input";
import { Toaster, toast } from "../../../components/toast/Toast";
import { ToggleGroup } from "../../../components/toggle-group/ToggleGroup";

/* Classes */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const focusOnPrimary =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary";
const root = "min-h-dvh bg-canvas text-ink";
const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const footerEdge = "px-[max(1rem,calc((100%-78rem)/2))]";
const srOnly = "sr-only";
const promoBar =
  "bg-primary-strong px-4 py-2 text-center text-xs leading-5 text-on-primary sm:text-sm";
const header = "sticky top-0 z-30 bg-primary text-on-primary";
const headerRow = `${container} flex h-16 items-center gap-3`;
const brandLink = `flex shrink-0 items-center gap-2.5 rounded-full text-on-primary ${focusOnPrimary}`;
const brandMark =
  "flex size-9 shrink-0 items-center justify-center rounded-full bg-on-primary text-primary";
const brandName = "text-xl font-black tracking-tight";
const navList = "ml-6 hidden items-center gap-1 lg:flex";
const navLink = `rounded-full px-3 py-2 text-sm font-medium text-on-primary transition-colors duration-150 hover:bg-on-primary/10 ${focusOnPrimary}`;
const headerActions = "ml-auto flex items-center gap-2";
const chatButton = `hidden h-10 items-center gap-2 rounded-full border border-on-primary/40 px-4 text-sm font-semibold text-on-primary transition-colors duration-150 hover:bg-on-primary/10 sm:inline-flex ${focusOnPrimary}`;
const basketButton = `inline-flex h-10 items-center gap-2 rounded-full bg-on-primary pr-2 pl-4 text-sm font-semibold text-primary transition-opacity duration-150 hover:opacity-90 ${focusOnPrimary}`;
const basketCount =
  "inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-on-primary tabular-nums";
const iconSm = "size-4 shrink-0";
const iconMd = "size-5 shrink-0";
const hero = "bg-primary text-on-primary";
const heroGrid = `${container} grid grid-cols-2 items-center gap-4 pt-10 pb-10 sm:gap-6 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)_minmax(0,1fr)] lg:gap-10 lg:pt-16 lg:pb-14`;
const heroCopy =
  "col-span-2 text-center lg:col-span-1 lg:col-start-2 lg:row-start-1";
const heroKicker =
  "inline-flex items-center gap-2 rounded-full bg-on-primary/10 px-3.5 py-1.5 text-sm font-medium";
const h1 =
  "mt-5 text-[2.6rem] leading-[0.95] font-black tracking-[-0.04em] text-balance sm:text-7xl lg:text-[5.5rem]";
const heroLead =
  "mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty sm:text-lg";
const heroActions = "mt-8 flex flex-wrap justify-center gap-3";
const heroPrimary = `inline-flex h-12 items-center gap-2 rounded-full bg-on-primary px-6 text-base font-semibold text-primary transition-opacity duration-150 hover:opacity-90 ${focusOnPrimary}`;
const heroSecondary = `inline-flex h-12 items-center gap-2 rounded-full border border-on-primary/40 px-6 text-base font-semibold text-on-primary transition-colors duration-150 hover:bg-on-primary/10 ${focusOnPrimary}`;
const heroPhotoLeft = "lg:col-start-1 lg:row-start-1 lg:self-start";
const heroPhotoRight = "lg:col-start-3 lg:row-start-1 lg:self-end";
const heroImage =
  "aspect-[4/5] w-full rounded-[2rem] bg-primary-strong object-cover";
const statsList =
  "grid grid-cols-2 gap-x-6 gap-y-6 border-t border-on-primary/25 py-8 sm:py-10 lg:grid-cols-4";
const statValue = "text-4xl font-black tracking-tight sm:text-5xl";
const statLabel = "mt-1 text-sm leading-snug sm:text-base";
const section = `${container} scroll-mt-20 pt-16 sm:pt-24`;
const sectionHead = "flex flex-wrap items-end justify-between gap-x-6 gap-y-4";
const kicker = "text-sm font-semibold text-primary";
const h2 =
  "mt-2 text-3xl leading-[1.05] font-black tracking-[-0.03em] text-balance sm:text-5xl";
const lead =
  "mt-3 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg";
const catGrid = "mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4";
const catLink = `group flex h-full flex-col overflow-hidden rounded-3xl bg-primary-soft text-ink ${focusRing}`;
const catMedia = "overflow-hidden";
const catImage =
  "aspect-[5/4] w-full object-cover transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transition-none";
const catBody = "flex flex-1 flex-col gap-1 p-4 sm:p-5";
const catName = "text-lg font-black tracking-tight sm:text-2xl";
const catText = "text-sm leading-snug text-pretty text-muted";
const catFoot =
  "mt-auto flex items-center justify-between gap-2 pt-4 text-sm font-semibold";
const catArrow =
  "flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none";
const storyGrid = `${container} scroll-mt-20 grid gap-8 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16`;
const storyMedia = "relative";
const storyImage = "aspect-[4/5] w-full rounded-[2rem] bg-subtle object-cover";
const storyNote =
  "absolute right-4 bottom-4 left-4 rounded-2xl bg-surface p-4 text-sm leading-relaxed text-ink shadow-overlay sm:right-auto sm:max-w-xs";
const storyText =
  "mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg";
const factList = "mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6";
const factValue = "text-2xl font-black tracking-tight text-primary sm:text-4xl";
const factLabel = "mt-1 text-sm leading-snug text-muted";
const rackHead = "text-xl font-black tracking-tight sm:text-2xl";
const rackList =
  "-mx-4 mt-5 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pt-1 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-6 sm:gap-6 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden";
const rackLink = `group flex w-28 shrink-0 snap-start flex-col items-center gap-3 rounded-2xl text-center sm:w-auto ${focusRing}`;
const rackImage =
  "aspect-square w-full rounded-full bg-subtle object-cover ring-4 ring-primary-soft transition-shadow duration-150 group-hover:ring-primary motion-reduce:transition-none";
const rackLabel = "text-sm font-semibold";
const toolbar = "mt-8 flex flex-wrap items-center justify-between gap-4";
const filterRow = "flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2";
const filterScroll =
  "-mx-4 max-w-[calc(100%+2rem)] overflow-x-auto px-4 sm:mx-0 sm:max-w-full sm:px-0";
const filterGroup =
  "bg-primary-soft [&>[data-state=on]]:bg-primary [&>[data-state=on]]:text-on-primary";
const countText = "text-sm text-muted";
const stripControls = "hidden items-center gap-2 sm:flex";
const stripButton = `inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const strip =
  "-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8 [&::-webkit-scrollbar]:hidden";
const productCard =
  "flex w-[16.5rem] shrink-0 snap-start flex-col rounded-3xl border border-line bg-surface p-3 sm:w-72";
const productMedia = "relative overflow-hidden rounded-2xl bg-subtle";
const productImage = "aspect-square w-full object-cover";
const productTag =
  "absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-on-primary";
const productBody = "flex flex-1 flex-col px-1 pt-4";
const productName = "text-lg leading-snug font-black tracking-tight";
const productText = "mt-1 text-sm leading-snug text-pretty text-muted";
const productFoot = "mt-auto flex items-center justify-between gap-3 pt-4";
const productPrice = "text-lg font-bold tabular-nums";
const addButton = "rounded-full! pr-4 pl-3";
const howBand = "mt-16 scroll-mt-20 bg-primary-soft py-16 sm:mt-24 sm:py-24";
const howGrid = `${container} grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16`;
const howImage = "aspect-[3/2] w-full rounded-[2rem] bg-subtle object-cover";
const stepList = "mt-8 grid gap-6";
const stepItem = "grid grid-cols-[auto_minmax(0,1fr)] gap-4";
const stepNumber =
  "flex size-11 items-center justify-center rounded-full bg-primary text-base font-black text-on-primary";
const stepTitle = "text-lg font-black tracking-tight sm:text-xl";
const stepText =
  "mt-1 text-sm leading-relaxed text-pretty text-muted sm:text-base";
const ratingLine = "flex items-center gap-2 text-sm text-muted";
const ratingValue = "text-base font-bold text-ink";
const reviewGrid = "mt-8 grid gap-4 md:grid-cols-3";
const reviewCard =
  "flex flex-col gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-8";
const stars = "flex gap-0.5 text-primary";
const star = "size-5 fill-current";
const reviewText =
  "text-lg leading-relaxed font-medium tracking-tight text-pretty";
const person = "mt-auto flex items-center gap-3";
const personName = "text-sm font-semibold";
const personMeta = "text-sm text-muted";
const faqLayout = `${section} grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16`;
const faqAside = "grid content-start justify-items-start gap-4";
const faqList = "[&>div]:max-w-none [&>div]:gap-0";
const faqButton = "rounded-full! px-5";
const newsWrap = `${container} py-16 sm:py-24`;
const newsBand =
  "grid gap-8 rounded-[2rem] bg-primary p-6 text-on-primary sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-12";
const newsTitle =
  "text-3xl leading-[1.05] font-black tracking-[-0.03em] text-balance sm:text-5xl";
const newsText = "mt-3 text-base leading-relaxed text-pretty sm:text-lg";
const form = "grid gap-2";
const fieldLabel = "text-sm font-semibold";
const fieldRow = "grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]";
const field =
  "h-12 rounded-full! border-transparent! px-5 text-base focus-visible:outline-on-primary!";
const fieldButton =
  "h-12 shrink-0 rounded-full! bg-on-primary! px-6 text-base! font-semibold text-primary! hover:opacity-90 focus-visible:outline-on-primary!";
const fieldError = "text-sm font-semibold";
const fieldHint = "text-sm";
const footer = `${footerEdge} [&>div[aria-hidden]>p]:from-primary [&>div[aria-hidden]>p]:via-primary/70`;
const footerBrand = `flex items-center gap-2.5 rounded-full text-lg font-black tracking-tight text-ink ${focusRing}`;
const footerMark =
  "flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary";
const payRow = "flex flex-wrap items-center gap-2";
const payBadge =
  "rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-ink";
const cartList = "grid gap-4";
const cartLine =
  "grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-3";
const cartImage = "size-14 rounded-xl bg-subtle object-cover";
const cartName = "truncate text-sm font-semibold text-ink";
const cartMeta = "text-sm text-muted tabular-nums";
const stepper = "flex items-center gap-1";
const stepButton = `inline-flex size-8 items-center justify-center rounded-full border border-line text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const stepValue = "w-6 text-center text-sm font-semibold text-ink tabular-nums";
const cartEmpty = "py-10 text-center text-sm text-muted";
const cartSummary = "mt-6 grid gap-2 border-t border-line pt-4";
const summaryRow = "flex justify-between text-base font-semibold text-ink";
const shipNote = "text-sm text-muted";

/* Data */
// prettier-ignore
const icons = {
  wheat: "M12 21V8m0 0c0-2.5 1.5-4.5 3.5-5-.2 2.6-1.5 4.3-3.5 5Zm0 0c0-2.5-1.5-4.5-3.5-5 .2 2.6 1.5 4.3 3.5 5Zm0 6c0-2.5 1.5-4.5 3.5-5-.2 2.6-1.5 4.3-3.5 5Zm0 0c0-2.5-1.5-4.5-3.5-5 .2 2.6 1.5 4.3 3.5 5Zm0 6c0-2.5 1.5-4.5 3.5-5-.2 2.6-1.5 4.3-3.5 5Zm0 0c0-2.5-1.5-4.5-3.5-5 .2 2.6 1.5 4.3 3.5 5Z",
  bag: "M5 8h14l-1 12H6L5 8Zm4 0V7a3 3 0 0 1 6 0v1",
  chat: "M4 20l1.3-3.9A8 8 0 1 1 8 19.3L4 20Zm5-8h.01M12 12h.01M15 12h.01",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  back: "M19 12H5m6-6-6 6 6 6",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9Z",
  pin: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
};
type IconName = keyof typeof icons;

const TITLE = "Jogja's favourite bread, delivered warm to your door";
const BRAND = "Pawon Ragi";
const CART_ID = "roti-cart";
const EMAIL_ID = "roti-email";
const STRIP_ID = "roti-strip";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FREE_DELIVERY = 150000;
const EMAIL_HINT = "One email every Friday. Unsubscribe in one click.";
const EMAIL_ERROR = "Enter a valid email address, like nama@email.com.";
const image = (name: string) => `/template-images/roti/${name}.webp`;
// prettier-ignore
const nav = [
  { label: "Menu", href: "#menu" }, { label: "Our story", href: "#story" }, { label: "How it's made", href: "#how" },
  { label: "Reviews", href: "#reviews" }, { label: "FAQ", href: "#faq" },
];
// prettier-ignore
const stats = [
  { value: "5.000+", label: "happy customers across Jogja" }, { value: "98%", label: "of orders arrive still warm" },
  { value: "6.000+", label: "five-star reviews since 2019" }, { value: "100%", label: "real butter, never margarine" },
];
// prettier-ignore
const categories = [
  { value: "all", label: "All" }, { value: "bread", label: "Bread" }, { value: "pastry", label: "Pastry" },
  { value: "pretzel", label: "Pretzels" }, { value: "hampers", label: "Hampers" },
];
// prettier-ignore
const categoryCards = [
  { value: "bread", label: "Bread", text: "Roti sobek and slow sourdough", image: "cat-bread" },
  { value: "pastry", label: "Pastry", text: "Croissants and cinnamon rolls", image: "cat-pastry" },
  { value: "pretzel", label: "Pretzels", text: "Chewy, salted or sweet", image: "cat-pretzel" },
  { value: "hampers", label: "Hampers", text: "Gift boxes with a handwritten card", image: "hampers" },
];
// prettier-ignore
const products = [
  { id: "croissant-butter", name: "Butter croissant", category: "pastry", price: 32000, text: "French butter, 27 layers, out of the oven at 6 am.", tag: "Best seller" },
  { id: "roti-sobek", name: "Roti sobek", category: "bread", price: 45000, text: "Twelve pull-apart milk buns that stay soft for three days.", tag: "" },
  { id: "pretzel-salt", name: "Salted butter pretzel", category: "pretzel", price: 28000, text: "Dark, chewy crust with sea salt from Madura.", tag: "Best seller" },
  { id: "cinnamon-roll", name: "Cinnamon roll", category: "pastry", price: 34000, text: "Kerinci cinnamon and a cream cheese glaze.", tag: "New" },
  { id: "sourdough", name: "Country sourdough", category: "bread", price: 65000, text: "800 g loaf, fermented 18 hours, sliced on request.", tag: "" },
  { id: "pretzel-cinnamon", name: "Cinnamon sugar pretzel", category: "pretzel", price: 30000, text: "Brushed with butter and rolled while warm.", tag: "" },
  { id: "croissant-almond", name: "Almond croissant", category: "pastry", price: 38000, text: "Baked twice with almond cream and toasted flakes.", tag: "" },
  { id: "hampers", name: "Cookie hampers", category: "hampers", price: 185000, text: "Twelve cookies in a gift box with a handwritten card.", tag: "Pre-order" },
];
// prettier-ignore
const rack = [
  { image: "round-croissants", label: "Croissants", value: "pastry" }, { image: "round-pretzel", label: "Pretzels", value: "pretzel" },
  { image: "round-buns", label: "Cinnamon buns", value: "pastry" }, { image: "round-loaves", label: "Country loaves", value: "bread" },
  { image: "round-trays", label: "Morning trays", value: "all" }, { image: "round-croissant", label: "Almond croissant", value: "pastry" },
];
// prettier-ignore
const facts = [
  { value: "2019", label: "first bake, in a garage" }, { value: "14", label: "bakers and couriers" }, { value: "3 am", label: "first dough of the day" },
];
// prettier-ignore
const steps = [
  { title: "Slow dough", text: "Every dough rests 18 hours in the cold, so the bread tastes deeper and keeps longer." },
  { title: "Shaped by hand", text: "Eight bakers fold, roll, and twist each piece. No machine touches it after the mixer." },
  { title: "Baked at dawn", text: "The deck oven fires at 4 am, and the first trays come out at 6." },
  { title: "At your door by 10", text: "Couriers leave Kotabaru at 7 with insulated bags, so your order arrives warm." },
];
// prettier-ignore
const reviews = [
  { name: "Rara Wulandari", meta: "Orders every Sunday, Condongcatur", text: "The roti sobek is gone before my kids leave for school. It still smells like the oven when the courier rings." },
  { name: "Dimas Prakoso", meta: "Office pantry order, Kotagede", text: "We order 40 croissants for Monday meetings. They always arrive before 9 and nobody has ever had a soggy one." },
  { name: "Ayu Paramitha", meta: "Sent hampers to Semarang", text: "I sent cookie hampers to my parents for their anniversary. The handwritten card made my mum cry, in a good way." },
];
// prettier-ignore
const faqs = [
  { question: "Where do you deliver?", answer: "Anywhere in Kota Yogyakarta, Sleman, and Bantul, from 7 to 10 am. Order by 10 pm for the next morning. Hampers ship anywhere in Java by next-day courier." },
  { question: "How do I order on WhatsApp?", answer: "Fill your basket here and tap Order on WhatsApp. Your order arrives as a ready-made message; we confirm the delivery slot and send a QRIS code within 15 minutes." },
  { question: "How long does the bread keep?", answer: "Croissants and pretzels are best on the day. Roti sobek stays soft for three days in a sealed bag, and sourdough keeps for five. Warm anything for four minutes at 180 °C." },
  { question: "Can I order for an event?", answer: "Yes. For 50 pieces or more, message us three days ahead and we will bake a separate batch, label the boxes, and deliver at the time you choose." },
  { question: "Is your kitchen halal?", answer: "We use no pork, lard, or alcohol, and every ingredient comes from certified suppliers. Our halal certificate number is printed on each box." },
];
// prettier-ignore
const footerColumns = [
  { title: "Shop", links: [{ label: "Bread", href: "#menu" }, { label: "Pastry", href: "#menu" }, { label: "Hampers", href: "#menu" }] },
  { title: "Bakery", links: [{ label: "Our story", href: "#story" }, { label: "How it's made", href: "#how" }, { label: "Reviews", href: "#reviews" }] },
  { title: "Help", links: [{ label: "FAQ", href: "#faq" }, { label: "Delivery areas", href: "/delivery" }, { label: "Contact", href: "/contact" }] },
];
// prettier-ignore
const legal = [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }];
const payments = [
  "QRIS",
  "Bank transfer",
  "Virtual account",
  "Debit card",
  "Cash on delivery",
];
const ratingStars = [1, 2, 3, 4, 5];

const rupiah = (value: number) =>
  `Rp ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
const productOf = (id: string) =>
  products.find((item) => item.id === id) ?? products[0]!;
const priceFrom = (category: string) =>
  `From ${rupiah(Math.min(...products.filter((item) => item.category === category).map((item) => item.price)))}`;
const countLabel = (shown: number) =>
  shown === products.length
    ? `Showing all ${products.length} bakes`
    : `Showing ${shown} of ${products.length} bakes`;
const itemsWord = (count: number) => (count === 1 ? "item" : "items");
const itemsLabel = (count: number) => `${count} ${itemsWord(count)}`;
const deliveryNote = (subtotal: number) =>
  subtotal >= FREE_DELIVERY
    ? "Free delivery applied. Arrives tomorrow, 7 to 10 am."
    : `Add ${rupiah(FREE_DELIVERY - subtotal)} more for free delivery in Jogja.`;
const chatToast = {
  title: "Opening WhatsApp",
  description:
    "Chat with Pawon Ragi at +62 812 2019 0600. We reply within 15 minutes, 7 am to 9 pm.",
};

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
        <Icon name="wheat" className={iconMd} />
      </span>
      <span className={brandName}>{BRAND}</span>
    </a>
  );
}

function FooterBrand() {
  return (
    <a href="#top" className={footerBrand}>
      <span className={footerMark}>
        <Icon name="wheat" className={iconMd} />
      </span>
      {BRAND}
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
      setError(EMAIL_ERROR);
      return;
    }
    setError("");
    setEmail("");
    toast({
      title: "You are on the list",
      description: `The Friday bake list goes to ${value}.`,
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
        {error || EMAIL_HINT}
      </p>
    </form>
  );
}

export default function Roti() {
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState<Cart>({});
  const stripRef = useRef<HTMLUListElement>(null);
  const visible = products.filter(
    (product) => category === "all" || product.category === category,
  );
  const lines = Object.entries(cart).map(([id, qty]) => ({
    ...productOf(id),
    qty,
  }));
  const cartCount = lines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.qty * line.price, 0);

  const pick = (value: string) => {
    setCategory(value);
    stripRef.current?.scrollTo({ left: 0 });
  };
  const scrollStrip = (direction: number) => {
    const list = stripRef.current;
    if (list) list.scrollBy({ left: direction * list.clientWidth * 0.8 });
  };
  const addToCart = (id: string) => {
    setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 });
    toast({
      title: "Added to your basket",
      description: `${productOf(id).name}. Your basket has ${itemsLabel(cartCount + 1)}.`,
      variant: "success",
    });
  };
  const changeQty = (id: string, step: number) => {
    const qty = (cart[id] ?? 0) + step;
    setCart(
      qty > 0
        ? { ...cart, [id]: qty }
        : Object.fromEntries(
            Object.entries(cart).filter(([key]) => key !== id),
          ),
    );
  };
  const openCart = () =>
    (document.getElementById(CART_ID) as HTMLDialogElement).showModal();
  const chat = () => toast(chatToast);
  const onCartClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    const target = event.currentTarget;
    if (target.returnValue === "checkout")
      toast({
        title: "Sending your order on WhatsApp",
        description: `${itemsLabel(cartCount)}, ${rupiah(subtotal)}. We will confirm your delivery slot in a few minutes.`,
        variant: "success",
      });
    target.returnValue = "";
  };

  return (
    <div id="top" className={root}>
      <p className={promoBar}>
        Free delivery in Jogja on orders over Rp 150.000. Order by 10 pm for
        tomorrow morning.
      </p>
      <header className={header}>
        <div className={headerRow}>
          <Brand />
          <nav aria-label="Main" className={navList}>
            {nav.map((link) => (
              <a key={link.href} href={link.href} className={navLink}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className={headerActions}>
            <button type="button" className={chatButton} onClick={chat}>
              <Icon name="chat" className={iconSm} />
              Order on WhatsApp
            </button>
            <button type="button" className={basketButton} onClick={openCart}>
              <Icon name="bag" className={iconSm} />
              Basket{" "}
              <span data-cart-count="" className={basketCount}>
                {cartCount}
              </span>{" "}
              <span className={srOnly}>{itemsWord(cartCount)}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section aria-labelledby="roti-title" className={hero}>
          <div className={heroGrid}>
            <div className={heroCopy}>
              <p className={heroKicker}>
                <Icon name="pin" className={iconSm} />
                Baked daily in Kotabaru, Yogyakarta
              </p>
              <h1 id="roti-title" className={h1}>
                {TITLE}
              </h1>
              <p className={heroLead}>
                Croissants, roti sobek, and soft pretzels made with real butter
                and an 18-hour dough. Order by 10 pm and we deliver warm between
                7 and 10 the next morning.
              </p>
              <div className={heroActions}>
                <a href="#menu" className={heroPrimary}>
                  Order now
                  <Icon name="arrow" className={iconSm} />
                </a>
                <button type="button" className={heroSecondary} onClick={chat}>
                  <Icon name="chat" className={iconSm} />
                  Chat on WhatsApp
                </button>
              </div>
            </div>
            <div className={heroPhotoLeft}>
              <img
                src={image("hero-pretzels")}
                alt="A basket of glossy brown pretzels on the bakery counter"
                width={640}
                height={800}
                fetchPriority="high"
                decoding="async"
                className={heroImage}
              />
            </div>
            <div className={heroPhotoRight}>
              <img
                src={image("hero-buns")}
                alt="A tray of cinnamon buns fresh from the oven"
                width={640}
                height={800}
                fetchPriority="high"
                decoding="async"
                className={heroImage}
              />
            </div>
          </div>
          <div className={container}>
            <ul aria-label="Pawon Ragi in numbers" className={statsList}>
              {stats.map((stat) => (
                <li key={stat.value}>
                  <p className={statValue}>{stat.value}</p>
                  <p className={statLabel}>{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="roti-categories" className={section}>
          <p className={kicker}>Fresh today</p>
          <h2 id="roti-categories" className={h2}>
            What we bake
          </h2>
          <ul className={catGrid}>
            {categoryCards.map((card) => (
              <li key={card.value}>
                <a
                  href="#menu"
                  className={catLink}
                  onClick={() => pick(card.value)}
                >
                  <div className={catMedia}>
                    <img
                      src={image(card.image)}
                      alt=""
                      width={640}
                      height={512}
                      loading="lazy"
                      decoding="async"
                      className={catImage}
                    />
                  </div>
                  <div className={catBody}>
                    <h3 className={catName}>{card.label}</h3>
                    <p className={catText}>{card.text}</p>
                    <p className={catFoot}>
                      {priceFrom(card.value)}
                      <span className={catArrow}>
                        <Icon name="arrow" className={iconSm} />
                      </span>
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="story" aria-labelledby="roti-story" className={storyGrid}>
          <figure className={storyMedia}>
            <img
              src={image("story")}
              alt="A baker in a hijab wrapping a loaf in brown paper in the Pawon Ragi kitchen"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className={storyImage}
            />
            <figcaption className={storyNote}>
              Sekar wraps the first delivery run herself, every morning at 6.45.
            </figcaption>
          </figure>
          <div>
            <p className={kicker}>Our story</p>
            <h2 id="roti-story" className={h2}>
              Sekar and the team
            </h2>
            <p className={storyText}>
              Pawon Ragi started in 2019 with one oven in Sekar&apos;s garage
              and a WhatsApp group of twelve neighbours. She baked the roti
              sobek her grandmother made in Kotagede, then added the croissants
              and pretzels she learned to laminate and knot in a bakery job
              abroad.
            </p>
            <p className={storyText}>
              Today fourteen bakers and couriers work from a small kitchen on
              Jalan Suroto. The recipes have not changed: real butter, local
              flour, and no shortcuts on time.
            </p>
            <ul className={factList}>
              {facts.map((fact) => (
                <li key={fact.value}>
                  <p className={factValue}>{fact.value}</p>
                  <p className={factLabel}>{fact.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="roti-rack" className={section}>
          <h2 id="roti-rack" className={rackHead}>
            On the racks this morning
          </h2>
          <ul className={rackList}>
            {rack.map((item) => (
              <li key={item.image}>
                <a
                  href="#menu"
                  className={rackLink}
                  onClick={() => pick(item.value)}
                >
                  <img
                    src={image(item.image)}
                    alt=""
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                    className={rackImage}
                  />
                  <span className={rackLabel}>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="menu" aria-labelledby="roti-menu" className={section}>
          <div className={sectionHead}>
            <div>
              <p className={kicker}>Order for tomorrow</p>
              <h2 id="roti-menu" className={h2}>
                Our bakes
              </h2>
              <p className={lead}>
                Prices are per piece unless noted. Everything is baked the
                morning it is delivered.
              </p>
            </div>
          </div>
          <div className={toolbar}>
            <div className={filterRow}>
              <div className={filterScroll}>
                <ToggleGroup
                  label="Filter bakes by category"
                  items={categories}
                  value={category}
                  className={filterGroup}
                  onValueChange={(value) =>
                    typeof value === "string" && value && pick(value)
                  }
                />
              </div>
              <p aria-live="polite" className={countText}>
                {countLabel(visible.length)}
              </p>
            </div>
            <div className={stripControls}>
              <button
                type="button"
                aria-label="Scroll bakes back"
                aria-controls={STRIP_ID}
                className={stripButton}
                onClick={() => scrollStrip(-1)}
              >
                <Icon name="back" className={iconMd} />
              </button>
              <button
                type="button"
                aria-label="Scroll more bakes"
                aria-controls={STRIP_ID}
                className={stripButton}
                onClick={() => scrollStrip(1)}
              >
                <Icon name="arrow" className={iconMd} />
              </button>
            </div>
          </div>
          <ul id={STRIP_ID} ref={stripRef} className={strip}>
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
                    width={560}
                    height={560}
                    loading="lazy"
                    decoding="async"
                    className={productImage}
                  />
                  {product.tag && (
                    <span className={productTag}>{product.tag}</span>
                  )}
                </div>
                <div className={productBody}>
                  <h3 className={productName}>{product.name}</h3>
                  <p className={productText}>{product.text}</p>
                  <div className={productFoot}>
                    <p className={productPrice}>{rupiah(product.price)}</p>
                    <Button
                      size="sm"
                      className={addButton}
                      aria-label={`Add to basket, ${product.name}`}
                      onClick={() => addToCart(product.id)}
                    >
                      <Icon name="plus" className={iconSm} />
                      Add
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="how" aria-labelledby="roti-how" className={howBand}>
          <div className={howGrid}>
            <div>
              <p className={kicker}>How it&apos;s made</p>
              <h2 id="roti-how" className={h2}>
                Eighteen hours from flour to your table
              </h2>
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
            <img
              src={image("oven")}
              alt="Two bakers shaping dough on a long table in front of a brick oven"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              className={howImage}
            />
          </div>
        </section>

        <section
          id="reviews"
          aria-labelledby="roti-reviews"
          className={section}
        >
          <div className={sectionHead}>
            <div>
              <p className={kicker}>Reviews</p>
              <h2 id="roti-reviews" className={h2}>
                What people are saying
              </h2>
            </div>
            <p className={ratingLine}>
              <span className={ratingValue}>4.9 out of 5</span>
              from 6.100 reviews
            </p>
          </div>
          <ul className={reviewGrid}>
            {reviews.map((review) => (
              <li key={review.name}>
                <figure className={reviewCard}>
                  <p className={stars}>
                    {ratingStars.map((value) => (
                      <Icon key={value} name="star" className={star} />
                    ))}
                    <span className={srOnly}>Rated 5 out of 5</span>
                  </p>
                  <blockquote className={reviewText}>{review.text}</blockquote>
                  <figcaption className={person}>
                    <Avatar name={review.name} size="md" />
                    <div>
                      <p className={personName}>{review.name}</p>
                      <p className={personMeta}>{review.meta}</p>
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" aria-labelledby="roti-faq" className={faqLayout}>
          <div className={faqAside}>
            <p className={kicker}>FAQ</p>
            <h2 id="roti-faq" className={h2}>
              Good to know
            </h2>
            <p className={lead}>
              Still wondering about something? Our team answers on WhatsApp from
              7 am to 9 pm, every day.
            </p>
            <Button variant="secondary" className={faqButton} onClick={chat}>
              <Icon name="chat" className={iconSm} />
              Ask on WhatsApp
            </Button>
          </div>
          <Faq items={faqs} exclusive className={faqList} />
        </section>

        <div className={newsWrap}>
          <section aria-labelledby="roti-news" className={newsBand}>
            <div>
              <h2 id="roti-news" className={newsTitle}>
                Stay in the loop
              </h2>
              <p className={newsText}>
                New bakes every Friday, early pre-order slots for holiday
                hampers, and one discount code a month.
              </p>
            </div>
            <Newsletter />
          </section>
        </div>
      </main>

      <Footer
        variant="big-brand"
        className={footer}
        brand={<FooterBrand />}
        description="An artisan bakery on Jalan Suroto, Kotabaru, Yogyakarta. Open every day, 6 am to 9 pm."
        columns={footerColumns}
        legal={legal}
        copyright="© 2026 Pawon Ragi. Built with MarkasUI."
        wordmark={BRAND}
        actions={
          <ul aria-label="Payment methods" className={payRow}>
            {payments.map((method) => (
              <li key={method} className={payBadge}>
                {method}
              </li>
            ))}
          </ul>
        }
      />

      <Drawer
        id={CART_ID}
        title="Your basket"
        onClose={onCartClose}
        footer={
          <>
            <Button variant="secondary" type="submit" value="cancel">
              Keep browsing
            </Button>
            <Button type="submit" value="checkout" disabled={cartCount === 0}>
              Order on WhatsApp
            </Button>
          </>
        }
      >
        {lines.length === 0 ? (
          <p className={cartEmpty}>
            Your basket is empty. Add a bake to get started.
          </p>
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
                <div className={stepper}>
                  <button
                    type="button"
                    aria-label={`Remove one ${line.name}`}
                    className={stepButton}
                    onClick={() => changeQty(line.id, -1)}
                  >
                    <Icon name="minus" className={iconSm} />
                  </button>
                  <span className={stepValue}>{line.qty}</span>
                  <button
                    type="button"
                    aria-label={`Add one ${line.name}`}
                    className={stepButton}
                    onClick={() => changeQty(line.id, 1)}
                  >
                    <Icon name="plus" className={iconSm} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className={cartSummary}>
          <p className={summaryRow}>
            <span>Subtotal</span>
            <span data-subtotal="">{rupiah(subtotal)}</span>
          </p>
          <p className={shipNote}>{deliveryNote(subtotal)}</p>
        </div>
      </Drawer>
      <Toaster />
    </div>
  );
}
