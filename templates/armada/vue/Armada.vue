<script setup lang="ts">
import { computed, ref } from "vue";
import Avatar from "../../../components/avatar/Avatar.vue";
import AvatarGroup from "../../../components/avatar-group/AvatarGroup.vue";
import Badge from "../../../components/badge/Badge.vue";
import Button from "../../../components/button/Button.vue";
import Faq from "../../../components/faq/Faq.vue";
import Footer from "../../../components/footer/Footer.vue";
import Input from "../../../components/input/Input.vue";
import LogoCloud from "../../../components/logo-cloud/LogoCloud.vue";
import Navbar from "../../../components/navbar/Navbar.vue";
import Select from "../../../components/select/Select.vue";
import Toaster, { toast } from "../../../components/toast/Toast.vue";
import ToggleGroup from "../../../components/toggle-group/ToggleGroup.vue";

/* Classes */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const root = "relative min-h-dvh bg-canvas text-ink";
const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
const footerEdge = "px-[max(1rem,calc((100%-72rem)/2+2rem))]";
const navWrap = "absolute inset-x-5 top-5 z-30 sm:inset-x-8 sm:top-7";
const navbar = "mx-auto max-w-5xl";
const brandLink = `flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink ${focusRing}`;
const brandMark =
  "flex size-7 items-center justify-center rounded-lg bg-primary text-on-primary";
const signIn = `hidden h-9 items-center rounded-full px-3 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink sm:inline-flex ${focusRing}`;
const demoLink = `hidden h-9 items-center gap-2 rounded-full bg-primary pr-1 pl-4 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong sm:inline-flex ${focusRing}`;
const demoIcon =
  "flex size-7 items-center justify-center rounded-full bg-on-primary text-primary";
const hero =
  "relative isolate m-2 flex min-h-[680px] flex-col overflow-hidden rounded-[28px] bg-subtle sm:m-3 lg:min-h-[780px]";
const heroImage =
  "absolute inset-0 -z-10 size-full object-cover object-[62%_center]";
const heroShade =
  "dark absolute inset-0 -z-10 bg-linear-to-b from-canvas/55 via-canvas/40 to-canvas/85 sm:via-canvas/15";
const heroBody =
  "dark flex flex-1 flex-col justify-between gap-14 px-5 pt-32 pb-6 text-ink sm:px-10 sm:pt-40 sm:pb-10 lg:px-14 lg:pb-12";
const chip =
  "inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/10 px-3 py-1.5 text-sm text-ink backdrop-blur-md";
const chipDot = "size-1.5 shrink-0 rounded-full bg-success";
const h1 =
  "mt-6 max-w-4xl text-5xl leading-[1.02] font-light tracking-tight text-balance sm:text-6xl lg:text-[5.5rem]";
const h1Strong = "font-semibold";
const heroActions = "mt-10 flex flex-wrap items-center gap-x-6 gap-y-5";
const heroCta = `inline-flex h-12 items-center gap-3 rounded-full bg-ink pr-1.5 pl-6 text-base font-medium whitespace-nowrap text-canvas transition-colors duration-150 hover:bg-ink/90 ${focusRing}`;
const heroCtaIcon =
  "flex size-9 items-center justify-center rounded-full bg-canvas text-ink";
const trust = "flex items-center gap-3";
const trustText = "max-w-40 text-sm leading-snug text-ink/85";
const heroFoot =
  "grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12";
const heroText = "max-w-md text-base leading-relaxed text-pretty text-ink/85";
const vesselCard =
  "w-full rounded-2xl border border-ink/15 bg-canvas/45 p-4 backdrop-blur-xl sm:max-w-sm";
const vesselTop = "flex items-center justify-between gap-3";
const vesselName = "text-sm font-semibold";
const vesselRoute = "mt-1 text-sm text-ink/80";
const vesselTrack = "mt-4 h-1 overflow-hidden rounded-full bg-ink/15";
const vesselBar = "h-full w-[62%] rounded-full bg-ink";
const vesselMeta = "mt-3 flex justify-between gap-3 text-xs text-ink/80";
const logoWrap = `${container} py-14 sm:py-16`;
const section = `${container} scroll-mt-6 py-16 sm:py-24`;
const sectionHead = "grid max-w-2xl gap-4";
const h2 = "text-3xl font-semibold tracking-tight text-balance sm:text-4xl";
const lead = "text-lg leading-relaxed text-pretty text-muted";
const platformGrid =
  "mt-12 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14";
const moduleAside = "grid content-start gap-6";
const moduleScroll = "max-w-full overflow-x-auto";
const moduleTitle = "text-xl font-semibold tracking-tight";
const moduleText = "mt-3 text-base leading-relaxed text-pretty text-muted";
const pointList = "grid gap-3 border-t border-line pt-6 text-sm";
const pointItem = "flex gap-2";
const pointIcon = "mt-0.5 size-4 shrink-0 text-primary";
const panel =
  "rounded-2xl border border-line bg-surface p-4 shadow-overlay sm:p-6";
const panelHead = "flex items-center justify-between gap-3";
const panelTitle = "text-sm font-semibold";
const panelSub = "text-xs text-muted";
const statGrid = "mt-5 grid grid-cols-3 gap-2 sm:gap-3";
const statCell = "rounded-xl bg-subtle p-3 sm:p-4";
const statLabel = "text-xs leading-snug text-muted";
const statValue =
  "mt-2 text-lg font-semibold tracking-tight tabular-nums sm:text-2xl";
const rowList = "mt-5 divide-y divide-line border-t border-line";
const row = "flex items-center justify-between gap-4 py-3";
const rowName = "text-sm font-medium";
const rowDetail = "text-xs text-muted";
const rowEnd =
  "flex flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-3";
const rowValue = "text-sm tabular-nums";
const sectorGrid = "mt-12 grid gap-4 md:grid-cols-3";
const sectorCard =
  "flex flex-col overflow-hidden rounded-2xl border border-line bg-surface";
const sectorImage = "aspect-[4/3] w-full bg-subtle object-cover";
const sectorBody = "grid gap-2 p-6";
const sectorTitle = "text-lg font-semibold tracking-tight";
const sectorText = "text-sm leading-relaxed text-pretty text-muted";
const sectorFacts = "mt-3 grid gap-2 border-t border-line pt-4 text-sm";
const caseCard =
  "grid gap-10 rounded-3xl bg-subtle p-6 sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:p-14";
const caseLabel = "text-sm font-medium text-muted";
const caseQuote =
  "mt-6 text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl";
const person = "mt-8 flex items-center gap-3";
const personName = "text-sm font-medium";
const personRole = "text-sm text-muted";
const metricList = "grid content-end gap-6";
const metric = "flex flex-col-reverse gap-1 border-t border-line pt-5";
const metricValue = "text-4xl font-semibold tracking-tight tabular-nums";
const metricLabel = "text-sm text-muted";
const demoGrid =
  "grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16";
const stepList = "mt-10 grid gap-6";
const stepItem = "grid grid-cols-[auto_minmax(0,1fr)] gap-4";
const stepNumber =
  "flex size-8 items-center justify-center rounded-full border border-line bg-surface text-sm font-medium tabular-nums";
const stepTitle = "text-base font-semibold";
const stepText = "mt-1 text-sm leading-relaxed text-pretty text-muted";
const formCard =
  "grid gap-5 rounded-2xl border border-line bg-surface p-5 shadow-overlay sm:grid-cols-2 sm:p-8";
const formTitle = "text-lg font-semibold tracking-tight sm:col-span-2";
const fieldWrap = "grid content-start gap-1.5";
const fieldLabel = "text-sm font-medium";
const fieldError = "text-sm text-danger";
const formFoot = "grid gap-3 sm:col-span-2";
const submitButton = "w-full";
const formNote = "text-sm text-muted";
const faqLayout = `${section} grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16`;
const faqAside = "grid content-start justify-items-start gap-4";
const faqList = "[&>div]:max-w-none [&>div]:gap-0";
const footer = `${footerEdge} bg-canvas`;

/* Data */
// prettier-ignore
const icons = {
  bow: "M3 17c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0M12 3v10M8 7l4-4 4 4",
  arrow: "M7 17 17 7M8 7h9v9",
  check: "m5 12.5 4.5 4.5L19 7.5",
};

const FORM_ID = "armada-demo";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// prettier-ignore
const nav = [
  { label: "Platform", href: "#platform" }, { label: "Solutions", href: "#solutions" },
  { label: "Customers", href: "#customers" }, { label: "FAQ", href: "#faq" },
];
// prettier-ignore
const leaders = [
  { name: "Rudi Hartono" }, { name: "Maya Wijaya" }, { name: "Agus Salim" }, { name: "Dewi Lestari" },
];
// prettier-ignore
const logos = [
  { name: "Bahari Lines", path: "M3 15a9 9 0 0 1 18 0Z" },
  { name: "Selat Logistik", path: "M4 4h7v16H4ZM13 9h7v11h-7Z" },
  { name: "Tirta Marine", path: "M12 2 21 7v10l-9 5-9-5V7Z" },
  { name: "Dermaga Port Group", path: "M12 2 22 12 12 22 2 12Z" },
  { name: "Karang Offshore", path: "M12 3 22 20H2Z" },
];
// prettier-ignore
const modules = [
  { value: "tracking", label: "Tracking", title: "Live vessel tracking", text: "AIS positions every minute, merged with noon reports and port calls, so the map in the office matches what the master sees on the bridge.", points: ["Positions refreshed every 60 seconds", "ETA recalculated from speed, weather, and berth windows", "Alerts for route deviation and port congestion"], panel: "Fleet position", sub: "47 vessels, updated 1 min ago",
    stats: [{ label: "Underway", value: "38" }, { label: "At berth", value: "9" }, { label: "ETA accuracy", value: "42 min" }],
    rows: [{ name: "KM Bahari Jaya", detail: "Tanjung Priok to Tanjung Perak", value: "13.8 kn", status: "On time", tone: "success" }, { name: "MV Selat Mas", detail: "Batam to Singapore", value: "11.2 kn", status: "On time", tone: "success" }, { name: "KM Tirta Kencana", detail: "Makassar to Bitung", value: "9.6 kn", status: "Delayed", tone: "warning" }] },
  { value: "fuel", label: "Fuel", title: "Fuel and emissions", text: "Fuel burn per voyage from flow meters and bunker notes, with CO2 and CII ratings calculated the way your auditor expects them.", points: ["Daily consumption per vessel and per leg", "CII rating forecast for the full year", "Bunker delivery notes matched to tank soundings"], panel: "Fuel this week", sub: "Fleet total, all vessels",
    stats: [{ label: "Fuel burned", value: "412 t" }, { label: "CO2 emitted", value: "1,283 t" }, { label: "Fleet CII", value: "B" }],
    rows: [{ name: "KM Bahari Jaya", detail: "Container, 1,700 TEU", value: "36.2 t/day", status: "Rating B", tone: "success" }, { name: "MV Selat Mas", detail: "Feeder, 900 TEU", value: "21.4 t/day", status: "Rating C", tone: "neutral" }, { name: "KM Tirta Kencana", detail: "General cargo", value: "18.9 t/day", status: "Rating D", tone: "warning" }] },
  { value: "maintenance", label: "Maintenance", title: "Planned maintenance", text: "Running hours from the engine room feed your maintenance plan, so work orders open before a part fails and not after.", points: ["Work orders from running hours and calendar", "Spare parts reserved at the next port of call", "Class survey dates on one timeline"], panel: "Work orders", sub: "Next 14 days",
    stats: [{ label: "Open", value: "27" }, { label: "Due soon", value: "8" }, { label: "Overdue", value: "1" }],
    rows: [{ name: "Main engine overhaul", detail: "KM Bahari Jaya, 12,000 h", value: "3 days", status: "Planned", tone: "neutral" }, { name: "Ballast pump seal", detail: "MV Selat Mas", value: "Today", status: "Due", tone: "warning" }, { name: "Lifeboat inspection", detail: "KM Tirta Kencana", value: "Done", status: "Closed", tone: "success" }] },
  { value: "crew", label: "Crew", title: "Crew and certificates", text: "Rotations, rest hours, and certificates for every seafarer, with reminders long before a certificate keeps a vessel in port.", points: ["Crew changes planned around port calls", "Rest hour records ready for inspection", "Certificate expiry alerts 90 days ahead"], panel: "Crew overview", sub: "All vessels, this month",
    stats: [{ label: "On board", value: "612" }, { label: "Crew changes", value: "22" }, { label: "Expiring certs", value: "14" }],
    rows: [{ name: "Capt. Hendra Wijaya", detail: "Master, KM Bahari Jaya", value: "Sign off 2 Dec", status: "Relief set", tone: "success" }, { name: "Siti Rahma", detail: "Chief Officer, MV Selat Mas", value: "GMDSS cert", status: "Renew", tone: "warning" }, { name: "Yosef Manuhutu", detail: "2nd Engineer, KM Tirta Kencana", value: "Rest hours", status: "Compliant", tone: "success" }] },
] as const;
type ModuleId = (typeof modules)[number]["value"];
// prettier-ignore
const sectors = [
  { id: "shipping", image: "/template-images/armada/sector-shipping.webp", alt: "Aerial view of a loaded container ship leaving a white wake on green water", title: "Shipping lines", text: "Container, bulk, and tanker operators who need on-time arrivals and lower fuel bills across long routes.", facts: ["Voyage performance per leg", "Charter party speed and consumption checks"] },
  { id: "ports", image: "/template-images/armada/sector-port.webp", alt: "Container terminal from above, with cranes loading a ship beside stacked containers", title: "Ports and logistics", text: "Terminals and forwarders who plan berths, trucks, and yards around ships that arrive when the data says they will.", facts: ["Arrival forecasts for berth planning", "Shared vessel views for agents and customers"] },
  { id: "offshore", image: "/template-images/armada/sector-offshore.webp", alt: "Supply vessel alongside an offshore rig at sunset, with a crane lifting cargo", title: "Offshore operators", text: "Supply and crew boat fleets serving rigs and platforms, where every hour on location is billed and checked.", facts: ["Time on location per contract", "Weather windows for crew transfers"] },
];
// prettier-ignore
const metrics = [
  { value: "8.6%", label: "less fuel per nautical mile" },
  { value: "31%", label: "fewer unplanned off-hire days" },
  { value: "2 weeks", label: "from kickoff to the full fleet live" },
];
// prettier-ignore
const steps = [
  { title: "A 30 minute call", text: "Tell us about your fleet, routes, and the reports you build by hand today." },
  { title: "Your fleet on the map", text: "We load 90 days of AIS history for your vessels, so the demo shows your own voyages." },
  { title: "A free 60 day pilot", text: "Run Haluan on up to five vessels with your crew and office team before you decide." },
];
// prettier-ignore
const fleetSizes = [
  { value: "", label: "Choose fleet size" }, { value: "1-10", label: "1 to 10 vessels" },
  { value: "11-50", label: "11 to 50 vessels" }, { value: "51-200", label: "51 to 200 vessels" },
  { value: "200+", label: "More than 200 vessels" },
];
// prettier-ignore
const faqs = [
  { question: "Which data sources does Haluan connect to?", answer: "Satellite and terrestrial AIS, noon reports, engine flow meters, and your existing planned maintenance system. Most fleets connect in under two weeks." },
  { question: "Do we need to install hardware on board?", answer: "No. Tracking and reporting work with the AIS your vessels already carry. Flow meter data is optional and adds more accurate fuel figures." },
  { question: "Does it work with limited connectivity at sea?", answer: "Yes. The crew app works offline and syncs noon reports and rest hours whenever the vessel has a connection, even over narrow VSAT links." },
  { question: "How is pricing calculated?", answer: "Per vessel per month, billed in Rupiah or US dollars. Fuel and crew modules are optional, and the pilot on five vessels is free for 60 days." },
  { question: "Where is our data stored?", answer: "In data centres in Jakarta, with daily backups. You own your data and can export everything as CSV or through the API at any time." },
];
// prettier-ignore
const footerColumns = [
  { title: "Platform", links: [{ label: "Tracking", href: "#platform" }, { label: "Fuel and emissions", href: "#platform" }, { label: "Maintenance", href: "#platform" }] },
  { title: "Solutions", links: [{ label: "Shipping lines", href: "#solutions" }, { label: "Ports and logistics", href: "#solutions" }, { label: "Offshore", href: "#solutions" }] },
  { title: "Company", links: [{ label: "Customers", href: "#customers" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "#demo" }] },
];
// prettier-ignore
const legal = [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }];

type DemoValues = {
  name: string;
  email: string;
  company: string;
  fleet: string;
};
type DemoErrors = Partial<Record<keyof DemoValues, string>>;
const EMPTY_DEMO: DemoValues = { name: "", email: "", company: "", fleet: "" };

const moduleOf = (value: string) =>
  modules.find((item) => item.value === value) ?? modules[0];
const validateDemo = (values: DemoValues): DemoErrors => {
  const errors: DemoErrors = {};
  if (!values.name.trim()) errors.name = "Enter your full name.";
  if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Enter a work email, like nama@perusahaan.co.id.";
  if (!values.company.trim()) errors.company = "Enter your company name.";
  if (!values.fleet) errors.fleet = "Choose your fleet size.";
  return errors;
};
const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? "";

const svgAttrs = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.75",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
};
const moduleItems = modules.map(({ value, label }) => ({ value, label }));

const moduleId = ref<ModuleId>("tracking");
/** ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; abaikan supaya selalu ada pilihan. */
const moduleModel = computed({
  get: () => moduleId.value,
  set: (value: string | string[]) => {
    if (typeof value === "string" && value) moduleId.value = value as ModuleId;
  },
});
const current = computed(() => moduleOf(moduleId.value));
const values = ref<DemoValues>({ ...EMPTY_DEMO });
const errors = ref<DemoErrors>({});
const describe = (key: keyof DemoValues) =>
  errors.value[key] ? `${FORM_ID}-${key}-error` : undefined;

/** Navbar tidak menutup menu mobile saat link di-klik; tutup lewat tombolnya sendiri. */
function closeMenuOnLink(event: MouseEvent) {
  const link = (event.target as Element).closest("a");
  const toggle = (
    event.currentTarget as HTMLElement
  ).querySelector<HTMLButtonElement>("button[aria-expanded=true]");
  if (link?.closest("[data-state=open]") && toggle) toggle.click();
}
function callBack() {
  toast({
    title: "We will call you back",
    description:
      "A fleet specialist calls within two working hours, 08.00 to 17.00 WIB.",
  });
}
function submit() {
  const found = validateDemo(values.value);
  errors.value = found;
  if (Object.keys(found).length > 0) return;
  toast({
    title: "Demo request sent",
    description: `Thanks, ${firstName(values.value.name)}. A fleet specialist will email ${values.value.email.trim()} within one working day.`,
    variant: "success",
  });
  values.value = { ...EMPTY_DEMO };
}
</script>

<template>
  <div id="top" :class="root">
    <div :class="navWrap">
      <Navbar
        variant="floating"
        :class="navbar"
        :links="nav"
        @click="closeMenuOnLink"
      >
        <template #brand>
          <a href="#top" :class="brandLink">
            <span :class="brandMark">
              <svg class="size-4" v-bind="svgAttrs">
                <path :d="icons.bow" />
              </svg>
            </span>
            Haluan
          </a>
        </template>
        <template #actions>
          <a href="/login" :class="signIn">Sign in</a>
          <a href="#demo" :class="demoLink">
            Get a demo
            <span :class="demoIcon">
              <svg class="size-3.5" v-bind="svgAttrs">
                <path :d="icons.arrow" />
              </svg>
            </span>
          </a>
        </template>
      </Navbar>
    </div>

    <main>
      <section aria-labelledby="armada-title" :class="hero">
        <img
          src="/template-images/armada/hero-ship.webp"
          alt="Container ship loaded with stacked containers sailing on a calm grey-blue sea"
          width="1600"
          height="1067"
          fetchpriority="high"
          decoding="async"
          :class="heroImage"
        />
        <div aria-hidden="true" :class="heroShade" />
        <div :class="heroBody">
          <div>
            <p :class="chip">
              <span aria-hidden="true" :class="chipDot" />
              New: CII forecasts for 2027
            </p>
            <h1 id="armada-title" :class="h1">
              Every vessel. <strong :class="h1Strong">One</strong> clear view.
            </h1>
            <div :class="heroActions">
              <a href="#demo" :class="heroCta">
                Book a demo
                <span :class="heroCtaIcon">
                  <svg class="size-4" v-bind="svgAttrs">
                    <path :d="icons.arrow" />
                  </svg>
                </span>
              </a>
              <div :class="trust">
                <AvatarGroup
                  :items="leaders"
                  size="sm"
                  group-label="Fleet managers using Haluan"
                />
                <p :class="trustText">
                  Trusted by 40+ shipping lines and ports
                </p>
              </div>
            </div>
          </div>
          <div :class="heroFoot">
            <p :class="heroText">
              Haluan brings positions, fuel burn, maintenance, and crew into one
              live picture, so operations teams in Jakarta, Surabaya, and
              Singapore act before a small issue becomes a delay.
            </p>
            <div :class="vesselCard">
              <div :class="vesselTop">
                <p :class="vesselName">KM Bahari Jaya</p>
                <Badge variant="success">Underway</Badge>
              </div>
              <p :class="vesselRoute">Tanjung Priok to Tanjung Perak</p>
              <div :class="vesselTrack"><div :class="vesselBar" /></div>
              <p :class="vesselMeta">
                <span>13.8 knots</span>
                <span>ETA today, 14.20 WIB</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div :class="logoWrap">
        <LogoCloud
          title="Running voyages for shipping lines, ports, and offshore fleets"
          :logos="logos"
          variant="marquee"
        />
      </div>

      <section id="platform" aria-labelledby="armada-platform" :class="section">
        <div :class="sectionHead">
          <h2 id="armada-platform" :class="h2">
            One platform from the bridge to the back office
          </h2>
          <p :class="lead">
            Four modules that share the same vessel data. Start with tracking
            and add the rest when your team is ready.
          </p>
        </div>
        <div :class="platformGrid">
          <div :class="moduleAside">
            <div :class="moduleScroll">
              <ToggleGroup
                v-model="moduleModel"
                label="Platform modules"
                :items="moduleItems"
              />
            </div>
            <div>
              <h3 :class="moduleTitle">{{ current.title }}</h3>
              <p :class="moduleText">{{ current.text }}</p>
            </div>
            <ul :class="pointList">
              <li
                v-for="point in current.points"
                :key="point"
                :class="pointItem"
              >
                <svg :class="pointIcon" v-bind="svgAttrs">
                  <path :d="icons.check" />
                </svg>
                {{ point }}
              </li>
            </ul>
          </div>
          <div :data-module="current.value" :class="panel">
            <div :class="panelHead">
              <div>
                <p data-panel-title="" :class="panelTitle">
                  {{ current.panel }}
                </p>
                <p :class="panelSub">{{ current.sub }}</p>
              </div>
              <Badge variant="success">Live</Badge>
            </div>
            <dl :class="statGrid">
              <div
                v-for="stat in current.stats"
                :key="stat.label"
                :class="statCell"
              >
                <dt :class="statLabel">{{ stat.label }}</dt>
                <dd :class="statValue">{{ stat.value }}</dd>
              </div>
            </dl>
            <ul :class="rowList">
              <li v-for="item in current.rows" :key="item.name" :class="row">
                <div>
                  <p :class="rowName">{{ item.name }}</p>
                  <p :class="rowDetail">{{ item.detail }}</p>
                </div>
                <div :class="rowEnd">
                  <span :class="rowValue">{{ item.value }}</span>
                  <Badge :variant="item.tone">{{ item.status }}</Badge>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="solutions"
        aria-labelledby="armada-solutions"
        :class="section"
      >
        <div :class="sectionHead">
          <h2 id="armada-solutions" :class="h2">
            Built for the way your fleet earns
          </h2>
          <p :class="lead">
            The same platform, set up for the reports and alerts each kind of
            operator checks every morning.
          </p>
        </div>
        <ul :class="sectorGrid">
          <li v-for="sector in sectors" :key="sector.id" :class="sectorCard">
            <img
              :src="sector.image"
              :alt="sector.alt"
              width="720"
              height="540"
              loading="lazy"
              decoding="async"
              :class="sectorImage"
            />
            <div :class="sectorBody">
              <h3 :class="sectorTitle">{{ sector.title }}</h3>
              <p :class="sectorText">{{ sector.text }}</p>
              <ul :class="sectorFacts">
                <li v-for="fact in sector.facts" :key="fact" :class="pointItem">
                  <svg :class="pointIcon" v-bind="svgAttrs">
                    <path :d="icons.check" />
                  </svg>
                  {{ fact }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </section>

      <section
        id="customers"
        aria-labelledby="armada-customers"
        :class="section"
      >
        <h2 id="armada-customers" class="sr-only">Customer story</h2>
        <div :class="caseCard">
          <figure>
            <p :class="caseLabel">Bahari Lines, 34 container vessels</p>
            <blockquote :class="caseQuote">
              We used to find out about a slow voyage from the fuel invoice. Now
              the duty officer sees it on the second day and calls the master
              while there is still time to recover.
            </blockquote>
            <figcaption :class="person">
              <Avatar name="Ratna Sihombing" size="md" />
              <div>
                <p :class="personName">Ratna Sihombing</p>
                <p :class="personRole">
                  Head of Fleet Operations, Bahari Lines
                </p>
              </div>
            </figcaption>
          </figure>
          <dl :class="metricList">
            <div v-for="item in metrics" :key="item.label" :class="metric">
              <dt :class="metricLabel">{{ item.label }}</dt>
              <dd :class="metricValue">{{ item.value }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="demo" aria-labelledby="armada-demo" :class="section">
        <div :class="demoGrid">
          <div>
            <div :class="sectionHead">
              <h2 id="armada-demo" :class="h2">See your own fleet in Haluan</h2>
              <p :class="lead">
                No slides. We show your vessels, your routes, and last quarter's
                fuel figures in the first call.
              </p>
            </div>
            <ol :class="stepList">
              <li
                v-for="(step, index) in steps"
                :key="step.title"
                :class="stepItem"
              >
                <span aria-hidden="true" :class="stepNumber">{{
                  index + 1
                }}</span>
                <div>
                  <h3 :class="stepTitle">{{ step.title }}</h3>
                  <p :class="stepText">{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </div>
          <form
            :class="formCard"
            novalidate
            :aria-labelledby="`${FORM_ID}-title`"
            @submit.prevent="submit"
          >
            <h3 :id="`${FORM_ID}-title`" :class="formTitle">Request a demo</h3>
            <div :class="fieldWrap">
              <label :for="`${FORM_ID}-name`" :class="fieldLabel"
                >Full name</label
              >
              <Input
                :id="`${FORM_ID}-name`"
                v-model="values.name"
                name="name"
                autocomplete="name"
                placeholder="Rina Siregar"
                :aria-invalid="errors.name ? true : undefined"
                :aria-describedby="describe('name')"
              />
              <p
                v-if="errors.name"
                :id="`${FORM_ID}-name-error`"
                :class="fieldError"
              >
                {{ errors.name }}
              </p>
            </div>
            <div :class="fieldWrap">
              <label :for="`${FORM_ID}-email`" :class="fieldLabel"
                >Work email</label
              >
              <Input
                :id="`${FORM_ID}-email`"
                v-model="values.email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="nama@perusahaan.co.id"
                :aria-invalid="errors.email ? true : undefined"
                :aria-describedby="describe('email')"
              />
              <p
                v-if="errors.email"
                :id="`${FORM_ID}-email-error`"
                :class="fieldError"
              >
                {{ errors.email }}
              </p>
            </div>
            <div :class="fieldWrap">
              <label :for="`${FORM_ID}-company`" :class="fieldLabel"
                >Company</label
              >
              <Input
                :id="`${FORM_ID}-company`"
                v-model="values.company"
                name="company"
                autocomplete="organization"
                placeholder="PT Bahari Lines"
                :aria-invalid="errors.company ? true : undefined"
                :aria-describedby="describe('company')"
              />
              <p
                v-if="errors.company"
                :id="`${FORM_ID}-company-error`"
                :class="fieldError"
              >
                {{ errors.company }}
              </p>
            </div>
            <div :class="fieldWrap">
              <label :for="`${FORM_ID}-fleet`" :class="fieldLabel"
                >Fleet size</label
              >
              <Select
                :id="`${FORM_ID}-fleet`"
                v-model="values.fleet"
                name="fleet"
                :aria-invalid="errors.fleet ? true : undefined"
                :aria-describedby="describe('fleet')"
              >
                <option
                  v-for="size in fleetSizes"
                  :key="size.value"
                  :value="size.value"
                >
                  {{ size.label }}
                </option>
              </Select>
              <p
                v-if="errors.fleet"
                :id="`${FORM_ID}-fleet-error`"
                :class="fieldError"
              >
                {{ errors.fleet }}
              </p>
            </div>
            <div :class="formFoot">
              <Button type="submit" size="lg" :class="submitButton"
                >Request a demo</Button
              >
              <p :class="formNote">
                We reply within one working day, 08.00 to 17.00 WIB.
              </p>
            </div>
          </form>
        </div>
      </section>

      <section id="faq" aria-labelledby="armada-faq" :class="faqLayout">
        <div :class="faqAside">
          <h2 id="armada-faq" :class="h2">Questions from operations teams</h2>
          <p :class="lead">
            Want to check something specific to your fleet? Our team has run
            vessels before they built software for them.
          </p>
          <Button variant="secondary" @click="callBack"
            >Request a call back</Button
          >
        </div>
        <Faq :items="faqs" exclusive :class="faqList" />
      </section>
    </main>

    <Footer
      :class="footer"
      description="Fleet operations software for shipping lines, ports, and offshore operators in Southeast Asia."
      :columns="footerColumns"
      :legal="legal"
      copyright="© 2026 Haluan. Built with MarkasUI."
    >
      <template #brand>
        <a href="#top" :class="brandLink">
          <span :class="brandMark">
            <svg class="size-4" v-bind="svgAttrs"><path :d="icons.bow" /></svg>
          </span>
          Haluan
        </a>
      </template>
    </Footer>
    <Toaster />
  </div>
</template>
