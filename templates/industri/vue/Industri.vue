<script setup lang="ts">
import { computed, ref } from "vue";
import Badge from "../../../components/badge/Badge.vue";
import Button from "../../../components/button/Button.vue";
import Footer from "../../../components/footer/Footer.vue";
import Input from "../../../components/input/Input.vue";
import Navbar from "../../../components/navbar/Navbar.vue";
import Select from "../../../components/select/Select.vue";
import Textarea from "../../../components/textarea/Textarea.vue";
import Toaster, { toast } from "../../../components/toast/Toast.vue";
import ToggleGroup from "../../../components/toggle-group/ToggleGroup.vue";

/* Classes */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const root = "min-h-dvh bg-canvas text-ink";
const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
const navbarEdge = "px-[max(0rem,calc((100%-70rem)/2))]";
const footerEdge = "px-[max(1rem,calc((100%-72rem)/2))]";
const brandLink = `flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink ${focusRing}`;
const brandMark =
  "flex size-7 items-center justify-center rounded-md bg-primary text-on-primary";
const navCta = `inline-flex h-8 items-center rounded-md bg-primary px-3 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const primaryLink = `inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong ${focusRing}`;
const hero = `${container} pt-10 pb-16 sm:pt-16 lg:pt-20`;
const heroTop = "grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end";
const h1 =
  "text-[2rem] leading-[1.04] font-bold tracking-tight uppercase sm:text-5xl lg:text-[3.75rem]";
const h1Line = "block";
const h1Pale = "block text-primary/70";
const heroAside = "grid gap-6";
const heroLead = "text-base leading-relaxed text-pretty text-muted";
const heroActions = "flex flex-wrap gap-3";
const heroFigure =
  "relative mt-10 overflow-hidden rounded-3xl bg-subtle sm:mt-14";
const heroImage = "aspect-[4/3] w-full object-cover sm:aspect-[16/7]";
const heroNotch =
  "relative bg-canvas pt-3 sm:absolute sm:bottom-0 sm:left-0 sm:max-w-md sm:rounded-tr-3xl sm:pt-3 sm:pr-3";
const heroCard = "grid gap-2 rounded-2xl border border-line bg-surface p-5";
const heroCardName = "text-sm font-semibold";
const heroCardText = "text-sm leading-relaxed text-pretty text-muted";
const section = `${container} scroll-mt-16 py-16 sm:py-24`;
const sectionHead = "grid max-w-2xl gap-4";
const h2 = "text-3xl font-semibold tracking-tight text-balance sm:text-4xl";
const lead = "text-lg leading-relaxed text-pretty text-muted";
const aboutGrid = "grid gap-10 lg:grid-cols-2 lg:gap-16";
const aboutText = "mt-4 text-base leading-relaxed text-pretty text-muted";
const factList =
  "grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2";
const factCell = "bg-surface p-5";
const factTerm = "text-sm text-muted";
const factValue = "mt-1 text-lg font-semibold tracking-tight";
const serviceGrid =
  "mt-10 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10";
const serviceSide = "grid content-between gap-6";
const serviceList = "grid content-start gap-2";
const serviceNote = "grid gap-2 rounded-xl bg-subtle p-5 text-sm";
const serviceNoteText = "leading-relaxed text-pretty text-muted";
const inlineLink = `w-fit rounded-sm font-medium underline decoration-line underline-offset-4 hover:decoration-ink ${focusRing}`;
const serviceRow = `flex w-full cursor-pointer items-center gap-4 rounded-xl border px-4 py-4 text-left transition-colors duration-150 ${focusRing}`;
const serviceIdle = `${serviceRow} border-transparent hover:bg-subtle`;
const serviceActive = `${serviceRow} border-line bg-surface`;
const serviceNumber = "w-6 text-sm font-medium text-muted tabular-nums";
const serviceName = "flex-1 text-base font-medium";
const serviceArrow = "size-4 shrink-0 text-muted";
const shipFigure =
  "relative min-h-[26rem] overflow-hidden rounded-3xl bg-subtle sm:min-h-[32rem]";
const shipImage = "absolute inset-0 size-full object-cover object-top";
const servicePanel =
  "absolute inset-x-3 bottom-3 grid gap-3 rounded-2xl border border-line/60 bg-surface/90 p-5 backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-6";
const panelHead = "flex flex-wrap items-center justify-between gap-2";
const panelTitle = "text-lg font-semibold tracking-tight";
const panelText = "text-sm leading-relaxed text-pretty text-muted";
const checkList = "grid gap-2 text-sm";
const checkItem = "flex gap-2";
const checkIcon = "mt-0.5 size-4 shrink-0 text-primary";
const toolbar = "mt-10 flex flex-wrap items-center justify-between gap-4";
const filterScroll = "max-w-full overflow-x-auto";
const countText = "text-sm text-muted";
const equipmentGrid = "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3";
const equipmentCard =
  "flex flex-col overflow-hidden rounded-2xl border border-line bg-surface";
const equipmentImage = "aspect-[4/3] w-full bg-subtle object-cover";
const equipmentBody = "flex flex-1 flex-col gap-2 p-5";
const categoryText = "text-sm font-medium text-primary";
const equipmentName = "text-lg leading-snug font-semibold tracking-tight";
const equipmentText = "text-sm leading-relaxed text-pretty text-muted";
const specGrid = "mt-auto grid grid-cols-2 gap-2 pt-3 text-sm";
const specCell = "rounded-lg bg-subtle px-3 py-2";
const specTerm = "text-xs text-muted";
const specValue = "font-medium";
const equipmentFoot = "border-t border-line p-4";
const quoteLink = `inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 hover:bg-subtle ${focusRing}`;
const stepGrid = "mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6";
const stepItem = "grid content-start gap-3 border-t border-line pt-5";
const stepNumber = "text-sm font-medium text-primary tabular-nums";
const stepTitle = "text-lg font-semibold tracking-tight";
const stepText = "text-sm leading-relaxed text-pretty text-muted";
const advantagePanel =
  "relative mt-10 grid min-h-[34rem] content-end overflow-hidden rounded-3xl bg-subtle p-3 sm:p-4";
const advantageImage = "absolute inset-0 size-full object-cover";
const advantageGrid = "relative grid gap-3 lg:grid-cols-3";
const glassCard =
  "grid content-start gap-4 rounded-2xl border border-line/60 bg-surface/85 p-5 backdrop-blur-md sm:p-6";
const glassTitle = "text-base font-semibold";
const standardsWrap = `${container} pb-4`;
const standardsBand =
  "grid gap-4 rounded-2xl border border-line bg-surface p-5 sm:p-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-center";
const standardsTitle = "text-sm font-semibold";
const standardsNote = "mt-1 text-sm text-muted";
const standardsList = "flex flex-wrap gap-2 text-sm font-medium tabular-nums";
const standardItem = "rounded-md border border-line bg-canvas px-3 py-1.5";
const projectGrid = "mt-12 grid gap-4 lg:grid-cols-3";
const projectCard =
  "flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-6";
const projectHead = "flex items-center justify-between gap-2";
const projectYear = "text-sm text-muted tabular-nums";
const projectTitle = "text-lg leading-snug font-semibold tracking-tight";
const projectPlace = "-mt-2 text-sm text-muted";
const projectText = "text-sm leading-relaxed text-pretty";
const projectResult =
  "mt-auto border-t border-line pt-4 text-sm font-medium text-primary";
const rfqGrid =
  "grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16";
const rfqAside = "grid content-start gap-8";
const officeList = "grid gap-3";
const officeCard =
  "grid gap-1 rounded-xl border border-line bg-surface p-4 text-sm";
const officeName = "font-semibold";
const officeText = "text-muted";
const formCard =
  "grid gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-2 sm:p-6";
const formFull = "sm:col-span-2";
const formError = "text-sm text-danger sm:col-span-2";
const formFoot =
  "flex flex-wrap items-center justify-between gap-3 sm:col-span-2";
const formNote = "text-sm text-muted";
const footer = `${footerEdge} bg-canvas`;

/* Data */
// prettier-ignore
const icons = {
  mark: "M12 3 20 7.5v9L12 21l-8-4.5v-9ZM12 12l8-4.5M12 12v9M12 12 4 7.5",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  check: "m5 12.5 4.5 4.5L19 7.5",
};

const IMG = "/template-images/industri";
const RFQ_ERROR_ID = "industri-rfq-error";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_DETAILS = 20;
// prettier-ignore
const nav = [
  { label: "About us", href: "#about" }, { label: "Products", href: "#products" },
  { label: "Equipment", href: "#equipment" }, { label: "Advantages", href: "#advantages" },
  { label: "Projects", href: "#projects" }, { label: "Contacts", href: "#contacts" },
];
// prettier-ignore
const facts = [
  { term: "Founded", value: "2009, Surabaya" }, { term: "Vendors audited", value: "320 in 18 countries" },
  { term: "Spare parts in stock", value: "11.400 items" }, { term: "Plants supplied", value: "190 in 14 countries" },
];
// prettier-ignore
const services = [
  { id: "pumps", name: "Process pumps", lead: "6 to 14 weeks", text: "Centrifugal, vertical inline, and positive displacement pumps to API 610 and ISO 5199, sized from your duty point.", points: ["Duty point and NPSH check by our engineers", "Witnessed performance tests at the factory", "Seal and spares kits for two years of running"] },
  { id: "valves", name: "Valves and actuation", lead: "4 to 12 weeks", text: "Gate, globe, ball, and control valves up to class 2500, delivered with actuators and positioners fitted and stroke tested.", points: ["Valve and actuator sizing in one package", "Hydrostatic and seat leak tests", "Tag plates and data books per valve"] },
  { id: "rotating", name: "Turbines and compressors", lead: "10 to 20 weeks", text: "Steam turbines, gas compressor packages, and their overhauls, sourced from audited builders and checked by our rotating equipment team.", points: ["Rotor balancing and alignment on site", "Lube oil and control system upgrades", "Overhaul planning around your shutdown"] },
  { id: "spares", name: "Spare parts and MRO", lead: "48 hours from stock", text: "Original and certified equivalent spares for more than 40 equipment makers, held in our Surabaya and Balikpapan warehouses.", points: ["Critical spares agreements with fixed prices", "Reverse engineering for obsolete parts", "Consignment stock at your site"] },
  { id: "logistics", name: "Logistics and commissioning", lead: "Door to site", text: "Export packing, sea and air freight, customs clearance, and site commissioning by our own field engineers.", points: ["Consolidated shipments from 18 countries", "Import permits and customs handled", "Start-up support and operator training"] },
];
// prettier-ignore
const categories = [
  { value: "all", label: "All" }, { value: "pumps", label: "Pumps" },
  { value: "valves", label: "Valves" }, { value: "rotating", label: "Turbines and compressors" },
];
// prettier-ignore
const equipment = [
  { id: "vertical-pump", category: "pumps", name: "Vertical inline pump", image: "vertical-pump", alt: "Vertical inline pump with its electric motor in a plant room", text: "Space-saving pumps for cooling water, condensate, and hot oil service.", standard: "ISO 5199", leadTime: "8 weeks" },
  { id: "pump-skid", category: "pumps", name: "Packaged pump skid", image: "pump-skid", alt: "Pipework and pump skids inside a process plant", text: "Pumps, piping, and instruments on one base frame, tested before shipping.", standard: "API 610", leadTime: "14 weeks" },
  { id: "gate-valves", category: "valves", name: "Gate valves, class 150 to 2500", image: "gate-valves", alt: "Row of gate valves with handwheels along a pipe gallery", text: "Cast and forged gate valves for isolation on oil, gas, and steam lines.", standard: "API 600", leadTime: "6 weeks" },
  { id: "control-valves", category: "valves", name: "Control valve stations", image: "control-valves", alt: "Control valves with actuators mounted on stainless steel pipework", text: "Globe control valves with smart positioners, sized for your flow cases.", standard: "IEC 60534", leadTime: "10 weeks" },
  { id: "gas-turbine", category: "rotating", name: "Turbine overhaul and parts", image: "gas-turbine", alt: "Close view of the blades of a turbine", text: "Blades, seals, and bearings for industrial turbines, with overhaul crews.", standard: "API 612", leadTime: "From 3 weeks" },
  { id: "compressor", category: "rotating", name: "Gas compressor package", image: "compressor", alt: "Compressor station with large white pipework under a blue sky", text: "Reciprocating and screw compressor packages for gas gathering and fuel gas.", standard: "API 618", leadTime: "20 weeks" },
];
// prettier-ignore
const steps = [
  { title: "Datasheet review", text: "An engineer checks your datasheet, duty, and materials, and flags what will cost time or money before we ask vendors." },
  { title: "Vendor shortlist", text: "We compare at least three audited builders and send you one technical and commercial comparison." },
  { title: "Inspection and testing", text: "Our inspectors witness factory tests and review every certificate before the equipment leaves the factory." },
  { title: "Delivery to site", text: "We ship, clear customs, and deliver to site with a full data book. Field engineers stay for start-up." },
];
// prettier-ignore
const advantages = [
  { title: "One accountable supplier", points: ["A single order for multi-vendor packages", "One document dossier per project", "A named project engineer from quote to start-up"] },
  { title: "Quality you can verify", points: ["Vendors audited on site every two years", "Third-party inspection on request", "Material certificates to EN 10204 3.1"] },
  { title: "Local stock, global reach", points: ["Warehouses in Surabaya and Balikpapan", "Consolidated freight from 18 countries", "Customs and import permits handled"] },
];
const standards = [
  "ISO 9001:2015",
  "ISO 14001:2015",
  "ISO 45001:2018",
  "API 610",
  "API 6D",
  "ASME B16.34",
  "PED 2014/68/EU",
  "SNI",
];
// prettier-ignore
const projects = [
  { sector: "Oil and gas", year: "2025", title: "Gas processing plant expansion", place: "Bontang, East Kalimantan", text: "46 control valves and three pump packages from vendors in Italy and Korea, with witnessed factory tests.", result: "Delivered two weeks ahead of the shutdown" },
  { sector: "Mining and metals", year: "2024", title: "Smelter cooling water system", place: "Morowali, Central Sulawesi", text: "18 vertical pumps with motors and spares, sized and supplied for a nickel smelter expansion.", result: "Delivered to site in 11 weeks" },
  { sector: "Agro-industry", year: "2024", title: "Refinery steam turbine overhaul", place: "Dumai, Riau", text: "Overhaul of a 12 MW steam turbine with new blades, seals, and rotor balancing during a planned stop.", result: "Back online in 16 days" },
];
// prettier-ignore
const offices = [
  { name: "Head office, Surabaya", address: "Jl. Rungkut Industri III No. 18, Surabaya 60293", phone: "+62 31 8740 2210", tel: "+623187402210" },
  { name: "Sales office, Jakarta", address: "Menara Kuningan, 21st floor, Jakarta Selatan 12940", phone: "+62 21 2902 6650", tel: "+622129026650" },
  { name: "Warehouse, Balikpapan", address: "Kawasan Industri Kariangau Blok C2, Balikpapan 76131", phone: "+62 542 860 115", tel: "+62542860115" },
];
// prettier-ignore
const footerColumns = [
  { title: "Company", links: [{ label: "About us", href: "#about" }, { label: "Projects", href: "#projects" }, { label: "Careers", href: "/careers" }] },
  { title: "Supply", links: [{ label: "Products", href: "#products" }, { label: "Equipment", href: "#equipment" }, { label: "How we source", href: "#process" }] },
  { title: "Contact", links: [{ label: "Request a quote", href: "#rfq" }, { label: "Offices", href: "#contacts" }, { label: "Vendor registration", href: "/vendors" }] },
];
// prettier-ignore
const legal = [{ label: "Privacy", href: "/privacy" }, { label: "Terms of supply", href: "/terms" }];
const emptyForm = { company: "", email: "", item: "", details: "" };

const categoryLabel = (value: string) =>
  categories.find((category) => category.value === value)?.label ?? "";
const countLabel = (shown: number) =>
  shown === equipment.length
    ? `Showing all ${equipment.length} items`
    : `Showing ${shown} of ${equipment.length} items`;
const pad = (index: number) => String(index + 1).padStart(2, "0");
/** Pesan galat pertama untuk formulir RFQ, atau kosong bila valid. */
const validate = (form: typeof emptyForm) =>
  !form.company.trim()
    ? { field: "company", message: "Enter your company name." }
    : !EMAIL_PATTERN.test(form.email.trim())
      ? {
          field: "email",
          message: "Enter a valid work email, like nama@perusahaan.co.id.",
        }
      : form.details.trim().length < MIN_DETAILS
        ? {
            field: "details",
            message: `Add a few details, at least ${MIN_DETAILS} characters, so we can quote accurately.`,
          }
        : { field: "", message: "" };

/* End data */

type Equipment = (typeof equipment)[number];

const svgAttrs = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.75",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
};

const service = ref(services[0]!.id);
const category = ref("all");
/** ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; abaikan supaya selalu ada pilihan. */
const categoryModel = computed({
  get: () => category.value,
  set: (value: string | string[]) => {
    if (typeof value === "string" && value) category.value = value;
  },
});
const form = ref({ ...emptyForm });
const error = ref({ field: "", message: "" });
const current = computed(
  () => services.find((item) => item.id === service.value) ?? services[0]!,
);
const visible = computed(() =>
  equipment.filter(
    (item) => category.value === "all" || item.category === category.value,
  ),
);

/** Navbar tidak menutup menu mobile saat link di-klik; tutup lewat tombolnya sendiri. */
function closeMenuOnLink(event: MouseEvent) {
  const link = (event.target as Element).closest("a");
  const toggle = (
    event.currentTarget as HTMLElement
  ).querySelector<HTMLButtonElement>("button[aria-expanded=true]");
  if (link?.closest("[data-state=open]") && toggle) toggle.click();
}
function quote(item: Equipment) {
  form.value = { ...form.value, item: item.id };
}
function submit() {
  const result = validate(form.value);
  error.value = result;
  if (result.field) return;
  const email = form.value.email.trim();
  form.value = { ...emptyForm };
  toast({
    title: "Quotation request sent",
    description: `Reference RFQ-26-0418. A sales engineer will reply to ${email} within one business day.`,
    variant: "success",
  });
}
const invalid = (field: string) =>
  error.value.field === field
    ? { "aria-invalid": true, "aria-describedby": RFQ_ERROR_ID }
    : {};
function brochure() {
  toast({
    title: "Company profile on its way",
    description:
      "The PDF (4,2 MB) with our line card and certificates is downloading.",
  });
}
</script>

<template>
  <div id="top" :class="root">
    <Navbar sticky :class="navbarEdge" :links="nav" @click="closeMenuOnLink">
      <template #brand>
        <a href="#top" :class="brandLink">
          <span :class="brandMark">
            <svg class="size-4" v-bind="svgAttrs"><path :d="icons.mark" /></svg>
          </span>
          Bahtera
        </a>
      </template>
      <template #actions>
        <a href="#rfq" :class="navCta">Request a quote</a>
      </template>
    </Navbar>

    <main>
      <section aria-labelledby="industri-title" :class="hero">
        <div :class="heroTop">
          <h1 id="industri-title" :class="h1">
            <span :class="h1Pale">Unique industrial equipment</span>
            <span :class="h1Line">Worldwide partnership</span>
            <span :class="h1Line">Integrated supplies</span>
          </h1>
          <div :class="heroAside">
            <p :class="heroLead">
              Pumps, valves, turbines, and spare parts for oil and gas, mining,
              and process plants. Sourced from audited makers, inspected by our
              engineers, delivered to your site.
            </p>
            <div :class="heroActions">
              <a href="#rfq" :class="primaryLink">
                Request a quote
                <svg class="size-4" v-bind="svgAttrs">
                  <path :d="icons.arrow" />
                </svg>
              </a>
              <Button variant="secondary" size="lg" @click="brochure">
                Company profile
              </Button>
            </div>
          </div>
        </div>
        <figure :class="heroFigure">
          <img
            :src="`${IMG}/refinery.webp`"
            alt="Refinery columns and pipe racks of a process plant under a pale sky"
            width="1600"
            height="700"
            decoding="async"
            :class="heroImage"
          />
          <figcaption :class="heroNotch">
            <div :class="heroCard">
              <p :class="heroCardName">PT Bahtera Industri Nusantara</p>
              <p :class="heroCardText">
                Supplying process equipment to plants in 14 countries since
                2009, from offices in Surabaya, Jakarta, and Balikpapan.
              </p>
            </div>
          </figcaption>
        </figure>
      </section>

      <section id="about" aria-labelledby="industri-about" :class="section">
        <div :class="aboutGrid">
          <div>
            <h2 id="industri-about" :class="h2">
              An engineering supplier, not a catalogue
            </h2>
            <p :class="aboutText">
              Bahtera started as a pump service workshop in Surabaya. Today 40
              engineers check every datasheet, audit the factories we buy from,
              and witness the tests, so the equipment that arrives is the
              equipment you specified.
            </p>
          </div>
          <dl :class="factList">
            <div v-for="fact in facts" :key="fact.term" :class="factCell">
              <dt :class="factTerm">{{ fact.term }}</dt>
              <dd :class="factValue">{{ fact.value }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        id="products"
        aria-labelledby="industri-products"
        :class="section"
      >
        <div :class="sectionHead">
          <h2 id="industri-products" :class="h2">Core products and services</h2>
          <p :class="lead">
            Five lines of supply, each run by its own team of engineers and
            buyers.
          </p>
        </div>
        <div :class="serviceGrid">
          <div :class="serviceSide">
            <ul :class="serviceList" aria-label="Product lines">
              <li v-for="(item, index) in services" :key="item.id">
                <button
                  type="button"
                  :aria-pressed="item.id === service"
                  aria-controls="industri-service"
                  :class="item.id === service ? serviceActive : serviceIdle"
                  @click="service = item.id"
                >
                  <span :class="serviceNumber">{{ pad(index) }}</span>
                  <span :class="serviceName">{{ item.name }}</span>
                  <svg :class="serviceArrow" v-bind="svgAttrs">
                    <path :d="icons.arrow" />
                  </svg>
                </button>
              </li>
            </ul>
            <div :class="serviceNote">
              <p :class="serviceNoteText">
                Looking for something outside these lines? We source to
                datasheet from more than 300 audited makers.
              </p>
              <a href="#rfq" :class="inlineLink">Send us your datasheet</a>
            </div>
          </div>
          <figure :class="shipFigure">
            <img
              :src="`${IMG}/cargo-ship.webp`"
              alt="Container ship seen from above on a deep blue sea"
              width="900"
              height="900"
              loading="lazy"
              decoding="async"
              :class="shipImage"
            />
            <figcaption
              id="industri-service"
              aria-live="polite"
              :class="servicePanel"
            >
              <div :class="panelHead">
                <p data-service-title="" :class="panelTitle">
                  {{ current.name }}
                </p>
                <Badge :dot="false">{{ current.lead }}</Badge>
              </div>
              <p :class="panelText">{{ current.text }}</p>
              <ul :class="checkList">
                <li
                  v-for="point in current.points"
                  :key="point"
                  :class="checkItem"
                >
                  <svg :class="checkIcon" v-bind="svgAttrs">
                    <path :d="icons.check" />
                  </svg>
                  {{ point }}
                </li>
              </ul>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="equipment"
        aria-labelledby="industri-equipment"
        :class="section"
      >
        <div :class="sectionHead">
          <h2 id="industri-equipment" :class="h2">Equipment sourcing</h2>
          <p :class="lead">
            A selection of what we supply most often. Every item ships with test
            reports, material certificates, and a data book.
          </p>
        </div>
        <div :class="toolbar">
          <div :class="filterScroll">
            <ToggleGroup
              v-model="categoryModel"
              label="Filter equipment by category"
              :items="categories"
            />
          </div>
          <p aria-live="polite" :class="countText">
            {{ countLabel(visible.length) }}
          </p>
        </div>
        <ul :class="equipmentGrid">
          <li
            v-for="item in visible"
            :key="item.id"
            :data-equipment="item.id"
            :class="equipmentCard"
          >
            <img
              :src="`${IMG}/${item.image}.webp`"
              :alt="item.alt"
              width="640"
              height="480"
              loading="lazy"
              decoding="async"
              :class="equipmentImage"
            />
            <div :class="equipmentBody">
              <p :class="categoryText">{{ categoryLabel(item.category) }}</p>
              <h3 :class="equipmentName">{{ item.name }}</h3>
              <p :class="equipmentText">{{ item.text }}</p>
              <dl :class="specGrid">
                <div :class="specCell">
                  <dt :class="specTerm">Standard</dt>
                  <dd :class="specValue">{{ item.standard }}</dd>
                </div>
                <div :class="specCell">
                  <dt :class="specTerm">Lead time</dt>
                  <dd :class="specValue">{{ item.leadTime }}</dd>
                </div>
              </dl>
            </div>
            <div :class="equipmentFoot">
              <a
                href="#rfq"
                :aria-label="`Request a quote, ${item.name}`"
                :class="quoteLink"
                @click="quote(item)"
              >
                Request a quote
              </a>
            </div>
          </li>
        </ul>
      </section>

      <section id="process" aria-labelledby="industri-process" :class="section">
        <div :class="sectionHead">
          <h2 id="industri-process" :class="h2">
            How we source your equipment
          </h2>
          <p :class="lead">
            The same four steps for a single valve or a full compressor package,
            with one engineer responsible from start to finish.
          </p>
        </div>
        <ol :class="stepGrid">
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            :class="stepItem"
          >
            <span :class="stepNumber">{{ pad(index) }}</span>
            <h3 :class="stepTitle">{{ step.title }}</h3>
            <p :class="stepText">{{ step.text }}</p>
          </li>
        </ol>
      </section>

      <section
        id="advantages"
        aria-labelledby="industri-advantages"
        :class="section"
      >
        <div :class="sectionHead">
          <h2 id="industri-advantages" :class="h2">Our strategic advantages</h2>
          <p :class="lead">
            Why plant owners and EPC contractors keep Bahtera on their approved
            vendor lists.
          </p>
        </div>
        <div :class="advantagePanel">
          <img
            :src="`${IMG}/engineer.webp`"
            alt=""
            width="1600"
            height="900"
            loading="lazy"
            decoding="async"
            :class="advantageImage"
          />
          <ul :class="advantageGrid">
            <li v-for="item in advantages" :key="item.title" :class="glassCard">
              <h3 :class="glassTitle">{{ item.title }}</h3>
              <ul :class="checkList">
                <li
                  v-for="point in item.points"
                  :key="point"
                  :class="checkItem"
                >
                  <svg :class="checkIcon" v-bind="svgAttrs">
                    <path :d="icons.check" />
                  </svg>
                  {{ point }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <div :class="standardsWrap">
        <section aria-labelledby="industri-standards" :class="standardsBand">
          <div>
            <h2 id="industri-standards" :class="standardsTitle">
              Certified and supplying to
            </h2>
            <p :class="standardsNote">Certificates on request.</p>
          </div>
          <ul :class="standardsList">
            <li v-for="item in standards" :key="item" :class="standardItem">
              {{ item }}
            </li>
          </ul>
        </section>
      </div>

      <section
        id="projects"
        aria-labelledby="industri-projects"
        :class="section"
      >
        <div :class="sectionHead">
          <h2 id="industri-projects" :class="h2">Recent project references</h2>
          <p :class="lead">
            Full reference lists with contact persons are available to qualified
            buyers.
          </p>
        </div>
        <ul :class="projectGrid">
          <li v-for="project in projects" :key="project.title">
            <article :class="projectCard">
              <div :class="projectHead">
                <Badge :dot="false">{{ project.sector }}</Badge>
                <span :class="projectYear">{{ project.year }}</span>
              </div>
              <h3 :class="projectTitle">{{ project.title }}</h3>
              <p :class="projectPlace">{{ project.place }}</p>
              <p :class="projectText">{{ project.text }}</p>
              <p :class="projectResult">{{ project.result }}</p>
            </article>
          </li>
        </ul>
      </section>

      <section id="rfq" aria-labelledby="industri-rfq" :class="section">
        <div :class="rfqGrid">
          <div :class="rfqAside">
            <div :class="sectionHead">
              <h2 id="industri-rfq" :class="h2">Request a quotation</h2>
              <p :class="lead">
                Send your datasheet or a short description. A sales engineer
                replies within one business day.
              </p>
            </div>
            <div id="contacts" :class="officeList">
              <div
                v-for="office in offices"
                :key="office.name"
                :class="officeCard"
              >
                <p :class="officeName">{{ office.name }}</p>
                <p :class="officeText">{{ office.address }}</p>
                <a :href="`tel:${office.tel}`" :class="inlineLink">
                  {{ office.phone }}
                </a>
              </div>
            </div>
          </div>
          <form
            :class="formCard"
            novalidate
            aria-label="Request for quotation"
            @submit.prevent="submit"
          >
            <Input
              v-model="form.company"
              label="Company"
              name="company"
              autocomplete="organization"
              v-bind="invalid('company')"
            />
            <Input
              v-model="form.email"
              label="Work email"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="nama@perusahaan.co.id"
              v-bind="invalid('email')"
            />
            <div :class="formFull">
              <Select v-model="form.item" label="Equipment" name="item">
                <option value="">Not sure yet</option>
                <option
                  v-for="item in equipment"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </Select>
            </div>
            <div :class="formFull">
              <Textarea
                v-model="form.details"
                label="Requirements"
                name="details"
                :rows="4"
                placeholder="Duty point, materials, quantity, and delivery site"
                v-bind="invalid('details')"
              />
            </div>
            <p v-if="error.message" :id="RFQ_ERROR_ID" :class="formError">
              {{ error.message }}
            </p>
            <div :class="formFoot">
              <p :class="formNote">We never share your datasheets.</p>
              <Button type="submit">Send request</Button>
            </div>
          </form>
        </div>
      </section>
    </main>

    <Footer
      :class="footer"
      description="Industrial equipment supply and sourcing for process plants in Indonesia and Southeast Asia."
      :columns="footerColumns"
      :legal="legal"
      copyright="© 2026 PT Bahtera Industri Nusantara. Built with MarkasUI."
    >
      <template #brand>
        <a href="#top" :class="brandLink">
          <span :class="brandMark">
            <svg class="size-4" v-bind="svgAttrs"><path :d="icons.mark" /></svg>
          </span>
          Bahtera
        </a>
      </template>
    </Footer>
    <Toaster />
  </div>
</template>
