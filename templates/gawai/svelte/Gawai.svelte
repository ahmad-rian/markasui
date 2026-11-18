<script lang="ts">
  import Avatar from "../../../components/avatar/Avatar.svelte";
  import Badge from "../../../components/badge/Badge.svelte";
  import Button from "../../../components/button/Button.svelte";
  import Drawer from "../../../components/drawer/Drawer.svelte";
  import Faq from "../../../components/faq/Faq.svelte";
  import Footer from "../../../components/footer/Footer.svelte";
  import Input from "../../../components/input/Input.svelte";
  import Modal from "../../../components/modal/Modal.svelte";
  import Navbar from "../../../components/navbar/Navbar.svelte";
  import Toaster, { toast } from "../../../components/toast/Toast.svelte";
  import ToggleGroup from "../../../components/toggle-group/ToggleGroup.svelte";

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
  const sectionHead =
    "flex flex-wrap items-end justify-between gap-x-8 gap-y-4";
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

  let filter = $state("all");
  let selected = $state<Product>(products[0]!);
  let option = $state(products[0]!.options[0]!.value);
  let cart = $state<CartLine[]>([]);
  let query = $state("");
  let use = $state("everyday");
  let budget = $state("mid");
  let phone = $state("");
  let phoneError = $state("");
  const visible = $derived(
    products.filter(
      (product) => filter === "all" || product.category === filter,
    ),
  );
  const selectedOption = $derived(optionOf(selected, option));
  const selectedPrice = $derived(selected.price + selectedOption.add);
  const total = $derived(cart.reduce((sum, line) => sum + line.price, 0));

  /** ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; abaikan supaya selalu ada pilihan. */
  const picked = (value: string | string[] | undefined) =>
    typeof value === "string" && value ? value : undefined;
  const dialog = (id: string) =>
    document.getElementById(id) as HTMLDialogElement;
  /** Navbar tidak menutup menu mobile saat link di-klik; tutup lewat tombolnya sendiri. */
  function closeMenuOnLink(event: MouseEvent) {
    const link = (event.target as Element).closest("a");
    const toggle = (
      event.currentTarget as HTMLElement
    ).querySelector<HTMLButtonElement>("button[aria-expanded=true]");
    if (link?.closest("[data-state=open]") && toggle) toggle.click();
  }
  function openQuick(product: Product) {
    selected = product;
    option = product.options[0]!.value;
    dialog(QUICK_ID).showModal();
  }
  function onQuickClose(event: Event & { currentTarget: HTMLDialogElement }) {
    const target = event.currentTarget;
    if (target.returnValue === "add") {
      const name = `${selected.name}, ${selectedOption.label}`;
      cart = [...cart, { name, price: selectedPrice }];
      toast({
        title: "Added to cart",
        description: `${name}. ${rupiah(selectedPrice)}.`,
        variant: "success",
      });
    }
    target.returnValue = "";
  }
  const showCart = () =>
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
  function search(event: SubmitEvent) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    dialog(SEARCH_ID).close();
    query = "";
    toast({
      title: `Results for ${value}`,
      description: "Showing devices in stock at your nearest store first.",
    });
  }
  function askConsultant(event: SubmitEvent) {
    event.preventDefault();
    const value = phone.replace(/[\s-]/g, "");
    if (!PHONE_PATTERN.test(value)) {
      phoneError = "Enter a WhatsApp number, like 0812 3456 7890.";
      return;
    }
    phoneError = "";
    phone = "";
    dialog(HELP_ID).close();
    toast({
      title: "Nadia will message you",
      description: `Two or three ${use} picks ${phraseOf(budget)}, on WhatsApp in about 5 minutes.`,
      variant: "success",
    });
  }
  const openHelp = () => dialog(HELP_ID).showModal();
</script>

{#snippet icon(name: IconName, className: string)}
  <svg
    class={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"><path d={icons[name]} /></svg
  >
{/snippet}

{#snippet brandEl()}
  <a href="#top" class={brandLink}
    ><span class={brandMark}>{@render icon("orbit", "size-4")}</span>Lintang</a
  >
{/snippet}

<div id="top" class={root}>
  <Navbar
    variant="blur"
    sticky
    class={navbarEdge}
    links={nav}
    onclick={closeMenuOnLink}
    brand={brandEl}
  >
    {#snippet actions()}
      <div class={navActions}>
        <button
          type="button"
          aria-label="Search"
          class={iconButton}
          onclick={() => dialog(SEARCH_ID).showModal()}
          >{@render icon("search", iconSize)}</button
        >
        <button
          type="button"
          aria-label={`Cart, ${itemsLabel(cart.length)}`}
          class={iconButton}
          onclick={showCart}
        >
          {@render icon("bag", iconSize)}
          {#if cart.length > 0}
            <span aria-hidden="true" data-cart-count="" class={countBadge}
              >{cart.length}</span
            >
          {/if}
        </button>
      </div>
    {/snippet}
  </Navbar>

  <main>
    <section aria-labelledby="gawai-title" class={hero}>
      <div class={heroCard}>
        <div class={heroCopy}>
          <p class={kicker}>Authorised reseller since 2014</p>
          <h1 id="gawai-title" class={h1}>{TITLE}</h1>
          <p class={heroLead}>
            Phones, laptops, and audio from makers you trust, delivered the same
            day in six cities and set up by people who know them.
          </p>
          <div class={heroActions}>
            <a href="#catalog" class={primaryLink}
              >Choose a device{@render icon("arrow", "size-4")}</a
            >
            <Button variant="ghost" class={ghostButton} onclick={openHelp}
              >Help me choose</Button
            >
          </div>
        </div>
        <div class={heroMedia}>
          <img
            src={image("hero-phone")}
            alt="A slim phone with a silver frame resting at an angle on a light grey surface"
            width="1400"
            height="1050"
            fetchpriority="high"
            decoding="async"
            class={heroImage}
          />
          <div class={heroChip}>
            <img
              src={image("earbuds")}
              alt=""
              width="56"
              height="56"
              decoding="async"
              class={chipImage}
            />
            <div>
              <p class={chipName}>Sora Buds Pro</p>
              <p class={chipPrice}>From Rp 1.899.000</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="catalog" aria-labelledby="gawai-catalog" class={section}>
      <div class={sectionHead}>
        <div>
          <h2 id="gawai-catalog" class={h2}>Find yours</h2>
          <p class={lead}>
            Four shelves, each one picked by our staff. Nothing we would not use
            ourselves.
          </p>
        </div>
      </div>
      <ul class={bento}>
        {#each tiles as tile (tile.id)}
          <li
            class={tile.style === "accent"
              ? tileAccent
              : tile.style === "wide"
                ? tileWide
                : tileSmall}
          >
            <h3 class={tileTitle}>{tile.title}</h3>
            <p class={tileText}>{tile.text}</p>
            <img
              src={image(tile.image)}
              alt={tile.alt}
              width={tile.style === "accent" ? 800 : 600}
              height={tile.style === "accent" ? 800 : 600}
              loading="lazy"
              decoding="async"
              class={tile.style === "accent"
                ? tileImageAccent
                : tile.style === "wide"
                  ? tileImageWide
                  : tileImageSmall}
            />
            <a
              href="#popular"
              aria-label={`Shop ${tile.title.toLowerCase()}`}
              class={tile.style === "accent" ? arrowAccent : arrowPlain}
              onclick={() => (filter = tile.id)}
              >{@render icon("arrow", "size-5")}</a
            >
          </li>
        {/each}
      </ul>
    </section>

    <section id="popular" aria-labelledby="gawai-popular" class={section}>
      <div class={sectionHead}>
        <div>
          <h2 id="gawai-popular" class={h2}>Popular now</h2>
          <p class={lead}>
            What people asked about most in our stores this month.
          </p>
        </div>
      </div>
      <div class={toolbar}>
        <div class={filterScroll}>
          <ToggleGroup
            label="Filter devices by type"
            items={filters}
            bind:value={
              () => filter, (value) => (filter = picked(value) ?? filter)
            }
          />
        </div>
        <p aria-live="polite" class={countText}>{countLabel(visible.length)}</p>
      </div>
      <ul class={productGrid}>
        {#each visible as product (product.id)}
          <li data-device={product.id} class={productCard}>
            <div class={productMedia}>
              <img
                src={image(product.image)}
                alt=""
                width="600"
                height="600"
                loading="lazy"
                decoding="async"
                class={productImage}
              />
              {#if product.badge}
                <Badge variant="neutral" dot={false} class={productBadge}
                  >{product.badge}</Badge
                >
              {/if}
            </div>
            <div class={productBody}>
              <h3 class={productName}>{product.name}</h3>
              <p class={productSpec}>{product.spec}</p>
              <div class={productFoot}>
                <p class={priceText}>from {rupiah(product.price)}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  class={quickButton}
                  aria-label={`Quick view, ${product.name}`}
                  onclick={() => openQuick(product)}>Quick view</Button
                >
              </div>
            </div>
          </li>
        {/each}
      </ul>
      <Modal id={QUICK_ID} title="Quick view" onclose={onQuickClose}>
        <div class={modalBody}>
          <img
            src={image(selected.image)}
            alt=""
            width="600"
            height="600"
            decoding="async"
            class={modalImage}
          />
          <div class={modalInfo}>
            <div>
              <p data-quick-name="" class={modalName}>{selected.name}</p>
              <p class={productSpec}>{selected.spec}</p>
            </div>
            <ul class={modalSpecs}>
              {#each selected.specs as spec (spec)}
                <li class={specItem}>
                  {@render icon("check", specIcon)}{spec}
                </li>
              {/each}
            </ul>
            <div>
              <p class={optionLabel}>{selected.optionName}</p>
              {#key selected.id}
                <ToggleGroup
                  label={selected.optionName}
                  items={selected.options}
                  bind:value={
                    () => option, (value) => (option = picked(value) ?? option)
                  }
                />
              {/key}
            </div>
            <div>
              <p data-quick-price="" class={modalPrice}>
                {rupiah(selectedPrice)}
              </p>
              <p class={modalNote}>
                Or {rupiah(Math.round(selectedPrice / 12))} a month for 12 months,
                0% interest
              </p>
            </div>
          </div>
        </div>
        {#snippet footer()}
          <Button variant="secondary" type="submit" value="cancel">Close</Button
          >
          <Button type="submit" value="add">Add to cart</Button>
        {/snippet}
      </Modal>
    </section>

    <div class={band}>
      <section aria-labelledby="gawai-calm" class={bandCard}>
        <div>
          <h2 id="gawai-calm" class={h2}>Good tech. Calm purchase.</h2>
          <p class={lead}>
            Buying a device should not feel like a gamble. Every order comes
            with three things, at no extra cost.
          </p>
          <ul class={pointList}>
            {#each points as point (point.title)}
              <li>
                <span class={pointIcon}
                  >{@render icon(point.icon, "size-5")}</span
                >
                <h3 class={pointTitle}>{point.title}</h3>
                <p class={pointText}>{point.text}</p>
              </li>
            {/each}
          </ul>
        </div>
        <div class={consultCard}>
          <div class={person}>
            <Avatar
              src={image("consultant")}
              alt=""
              name="Nadia Rahma"
              size="lg"
            />
            <div>
              <p class={personName}>Nadia Rahma</p>
              <p class={personRole}>Product consultant, Lintang Senopati</p>
            </div>
          </div>
          <p class={consultText}>
            Tell me what you need it for and your budget. I will reply on
            WhatsApp with two or three honest options, usually within 5 minutes.
          </p>
          <Button class={consultButton} onclick={openHelp}
            >Help me choose</Button
          >
        </div>
      </section>
    </div>

    <section id="delivery" aria-labelledby="gawai-delivery" class={section}>
      <div class={sectionHead}>
        <div>
          <h2 id="gawai-delivery" class={h2}>Delivery and pickup</h2>
          <p class={lead}>
            Every parcel is insured and sealed. You pay only when it arrives, if
            you prefer.
          </p>
        </div>
      </div>
      <ul class={deliveryGrid}>
        {#each delivery as item (item.title)}
          <li class={deliveryCard}>
            {@render icon(item.icon, deliveryIcon)}
            <h3 class={deliveryTitle}>{item.title}</h3>
            <p class={deliveryText}>{item.text}</p>
            <p class={deliveryMeta}>{item.meta}</p>
          </li>
        {/each}
      </ul>
    </section>

    <section id="faq" aria-labelledby="gawai-faq" class={faqLayout}>
      <div class={faqAside}>
        <h2 id="gawai-faq" class={h2}>Questions before you buy</h2>
        <p class={lead}>
          Still unsure? A consultant can compare two devices for you.
        </p>
        <Button variant="secondary" class={quickButton} onclick={openHelp}
          >Ask a consultant</Button
        >
      </div>
      <Faq items={faqs} exclusive class={faqList} />
    </section>
  </main>

  <Footer
    class={footer}
    brand={brandEl}
    description="An authorised reseller of phones, laptops, and audio, with nine stores in Indonesia."
    columns={footerColumns}
    {legal}
    copyright="© 2026 Lintang. Built with MarkasUI."
  />

  <Modal id={SEARCH_ID} title="Search Lintang">
    <form role="search" class={quizForm} onsubmit={search}>
      <label for={SEARCH_FIELD} class={quizLabel}>Device or model</label>
      <div class={quizStep}>
        <Input
          id={SEARCH_FIELD}
          type="search"
          name="q"
          placeholder="Try phone, 14-inch laptop, earbuds"
          class={field}
          bind:value={query}
        />
        <Button type="submit">Search</Button>
      </div>
    </form>
  </Modal>

  <Drawer id={HELP_ID} title="Help me choose">
    <form class={quizForm} novalidate onsubmit={askConsultant}>
      <div class={quizStep}>
        <p class={quizLabel}>What will you use it for?</p>
        <div class={quizScroll}>
          <ToggleGroup
            label="What will you use it for?"
            items={uses}
            bind:value={() => use, (value) => (use = picked(value) ?? use)}
          />
        </div>
      </div>
      <div class={quizStep}>
        <p class={quizLabel}>Your budget</p>
        <div class={quizScroll}>
          <ToggleGroup
            label="Your budget"
            items={budgets}
            bind:value={
              () => budget, (value) => (budget = picked(value) ?? budget)
            }
          />
        </div>
      </div>
      <div class={quizStep}>
        <label for={PHONE_ID} class={quizLabel}>WhatsApp number</label>
        <Input
          id={PHONE_ID}
          type="tel"
          name="phone"
          autocomplete="tel"
          placeholder="0812 3456 7890"
          class={field}
          bind:value={phone}
          aria-invalid={phoneError ? true : undefined}
          aria-describedby={`${PHONE_ID}-note`}
        />
        <p id={`${PHONE_ID}-note`} class={phoneError ? fieldError : fieldHint}>
          {phoneError || "Nadia replies from 08.00 to 22.00 WIB."}
        </p>
      </div>
      <Button type="submit" class={consultButton}>Send to Nadia</Button>
    </form>
  </Drawer>
  <Toaster />
</div>
