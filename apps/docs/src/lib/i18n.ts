import { DEFAULT_LOCALE, type Locale } from "@markasui/registry/schema";

export { DEFAULT_LOCALE, type Locale };
export const LOCALES: readonly Locale[] = ["en", "id"];
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};

/** Parameter [...lang]: undefined untuk Inggris (tanpa prefix), "id" untuk Indonesia. */
export const localeParams = () =>
  LOCALES.map((locale) => ({
    params: { lang: locale === DEFAULT_LOCALE ? undefined : locale },
  }));

export const toLocale = (lang: string | undefined): Locale =>
  lang === "id" ? "id" : "en";

/** Path untuk locale tertentu. Inggris tanpa prefix. */
export const localePath = (locale: Locale, path: string) =>
  locale === DEFAULT_LOCALE ? path : `/${locale}${path === "/" ? "" : path}`;

/**
 * Pathname halaman tanpa akhiran .html. Dengan build.format "file", Astro.url.pathname saat build
 * berakhiran .html, padahal link situs ditulis tanpa ekstensi.
 */
export const pagePath = (url: URL) =>
  url.pathname.replace(/\.html$/, "").replace(/\/index$/, "") || "/";

/** Lepas prefix locale dari pathname, dipakai switcher bahasa. */
export const stripLocale = (pathname: string) =>
  pathname
    .replace(/\.html$/, "")
    .replace(/\/index$/, "")
    .replace(/^\/id(?=\/|$)/, "") || "/";

const en = {
  meta: {
    title:
      "MarkasUI - UI components for Blade, React, Vue, Svelte, Astro, and Angular",
    description:
      "Lightweight UI components for Blade, React, Vue, Svelte, Astro, and Angular with one shared design.",
  },
  nav: {
    home: "Home",
    docs: "Docs",
    components: "Components",
    templates: "Templates",
    pages: "Pages",
    mcp: "MCP",
    main: "Main",
    mainMobile: "Main mobile",
    footer: "Footer",
  },
  header: {
    skip: "Skip to content",
    search: "Search",
    menu: "Menu",
    closeMenu: "Close menu",
    navigation: "Navigation",
    theme: "Toggle light or dark theme",
    github: "GitHub",
    stars: (count: number) => `GitHub, ${count} stars`,
    language: "Language",
    getStarted: "Get started",
  },
  search: {
    dialog: "Search",
    keyword: "Search query",
    placeholder: "Search components or docs",
    trigger: "Search...",
    idle: "Type to search",
    unavailable: "Search is available after the site is built",
    none: "No results",
    results: (n: number) => `${n} ${n === 1 ? "result" : "results"}`,
  },
  sidebar: {
    label: "Docs navigation",
    start: "Guide",
    components: "Components",
    templates: "Templates",
    pages: "Pages",
    fresh: "new",
    updated: "updated",
  },
  framework: {
    label: "Framework",
    example: "Example framework",
    nowShowing: "Now showing",
  },
  toc: "On this page",
  footer: {
    madeBy: "Made by CV Jenderal Solusi Digital, Purwokerto",
    license: "MIT license",
    support: "Buy me a coffee",
  },
  categories: {
    form: "Form",
    feedback: "Feedback",
    overlay: "Overlay",
    navigation: "Navigation",
    data: "Data",
    markas: "MarkasUI",
    section: "Sections",
    animation: "Animations",
    background: "Backgrounds",
    button: "Buttons",
  },
  docsNav: {
    introduction: "Introduction",
    installation: "Installation",
    theming: "Theming",
    livewire: "Livewire",
    cli: "CLI",
    mcp: "MCP",
    skills: "Agent Skill",
    changelog: "Changelog",
  },
  component: {
    breadcrumb: "Components",
    previous: (title: string) => `Previous: ${title}`,
    next: (title: string) => `Next: ${title}`,
    installation: "Installation",
    usage: "Usage",
    props: "Props",
    accessibility: "Accessibility",
    installMethod: "Install method",
    packageManager: "Package manager",
    cli: "CLI",
    manual: "Manual",
    manualSetup: "Make sure Tailwind CSS v4 and markas.css are installed. See",
    manualSetupLink: "Installation",
    manualDeps: "Install the dependency:",
    manualCopy: "Copy the component source below to",
    table: {
      label: "Props table",
      name: "Name",
      type: "Type",
      default: "Default",
      description: "Description",
    },
    reload: "Reload preview",
    controls: "Props controls",
    examples: "Examples",
    view: "View",
    code: "Code",
    viewOrCode: (title: string) => `${title}: view or code`,
    source: "Component source",
    bladeMissing: "Blade preview is not rendered yet. Run pnpm build.",
    unavailable: (framework: string) => `Not available for ${framework} yet.`,
  },
  code: { copy: "Copy code", expand: "Show code" },
  copyPage: {
    copy: "Copy page",
    more: "More options",
    prompt: "Copy prompt",
    promptCopied: "Prompt copied",
    markdown: "View Markdown",
    claude: "Open in Claude",
    chatgpt: "Open in ChatGPT",
    ask: (url: string) =>
      `Read ${url} and help me use this component in my project.`,
    askTemplate: (url: string) =>
      `Read ${url} and help me build this page in my project.`,
  },
  list: {
    title: "Components",
    subtitle: (n: number) =>
      `${n} components with the same look in Blade, React, Vue, Svelte, Astro, and Angular`,
    search: "Search components",
    searchPlaceholder: "Search",
    category: "Category",
    allCategories: "All categories",
    sort: "Sort",
    sortAz: "A to Z",
    sortNew: "Newest",
    empty: "No matching components.",
  },
  landing: {
    wallTitle: ["Every component,", "alive."],
    wallText:
      "Each tile runs the same code the CLI copies into your project. Switch the framework at the top and the tiles follow.",
    agentTitle: ["Coding agents install it", "the way you would."],
    agentText:
      "The MCP server hands an agent the code for your project's framework. The Agent Skill and llms.txt give Claude Code, Cursor, or Codex the same paths and tokens.",
    agentLinks: {
      mcp: "Install the MCP server",
      skill: "Agent Skill",
      llms: "llms.txt",
    },
    templatesTitle: (n: number) => [`${n} full pages from the`, "same parts."],
    templatesText:
      "Every template ships in Blade, React, Vue, Svelte, Astro, and Angular. Open one and click around.",
    templatesLink: "All templates",
    pagesTitle: ["Welcome pages,", "ready to ship."],
    pagesText:
      "Complete landing pages with a navbar, hero, sections, and footer. Swap the copy and launch.",
    pagesLink: "All pages",
    componentsTitle: (n: number) => [`${n} components,`, "one registry."],
    componentsText:
      "Grouped the way you look for them. Each page has a live preview, props, and the code for every framework.",
    componentsLink: "Browse with previews",
    ctaTitle: ["Start with", "one command."],
    ctaText:
      "Run init in a Laravel, React, or Vue project, then add components one at a time.",
    stackLabel: "Works with",
  },
  home: {
    titleBefore: "Ship",
    titleAfter: "components",
    titleEnd: "in one command.",
    titleFrameworks: "Blade, React, Vue, Svelte, Astro, and Angular",
    description:
      "Copy-paste UI components on Tailwind CSS v4. The same classes and variants in every framework, and the code lives in your repo.",
    frameworkLabel: "Framework for the code and previews",
    browse: "Browse components",
    copyCommand: "Copy install command",
    statsLabel: "MarkasUI in numbers",
    stats: {
      components: "components in the registry",
      frameworks: "frameworks, one set of classes",
      dependencies: "runtime packages beyond the framework itself",
      size: "of gzipped JS per component",
    },
    cardBadge: "Try it",
    featuresLabel: "What you get",
    features: [
      ["Copied into your repo", "No package to update or fork"],
      ["Same classes in 6 frameworks", "Every framework renders the same"],
      ["WCAG 2.2 AA tested", "axe and keyboard checks in CI"],
      ["Light and dark tokens", "One CSS file sets every color"],
      ["Ready for AI agents", "MCP server, Skill, and llms.txt"],
    ],
  },
  templates: {
    title: "Templates",
    subtitle:
      "Complete pages built from MarkasUI components, in Blade, React, Vue, Svelte, Astro, and Angular. Try them right here.",
    open: "Open full page",
    preview: "Live preview",
    code: "Code",
    components: "Components used",
    componentsText: (n: number) =>
      `${n} MarkasUI components make up this template. Open one to see its props and variants.`,
    accent: "Accent color",
    install: "Install",
    viewCode: "View code",
    lines: (n: number) => `${n} lines`,
    installText:
      "Add every component this template uses, then copy the page itself from GitHub.",
    source: "View source on GitHub",
    back: "All templates",
    sectors: "Recommended for",
  },
  pages: {
    title: "Pages",
    subtitle:
      "Ready-made welcome and landing pages built from MarkasUI components, in Blade, React, Vue, Svelte, Astro, and Angular.",
    empty: "New pages are on the way. Check back soon.",
    back: "All pages",
    componentsText: (n: number) =>
      `${n} MarkasUI components make up this page. Open one to see its props and variants.`,
    installText:
      "Add every component this page uses, then copy the page itself from GitHub.",
  },
  notFound: {
    eyebrow: "Error 404",
    title: "This page wandered off",
    text: "The address may be mistyped, or the page moved. Try one of these instead.",
    home: "Back home",
    components: "Browse components",
    search: "Search the docs",
    suggestions: "Did you mean",
  },
  switching: {
    title: "Preparing your experience",
    subtitle: "Switching to English",
  },
  agentDemo: {
    caption: "Claude Code with the markasui MCP server",
    prompt:
      "Build a Laravel login page with MarkasUI, showing validation errors",
    calls: "Tools called",
    files: "Files written",
    reply:
      "Added Input and Button, then wrote the login page. Validation errors show under each field.",
  },
  seo: {
    homeEyebrow: "Open source component library",
    homeTitle:
      "MarkasUI by JenderalCorp - Tailwind CSS components for React, Vue, Blade and more",
    homeDescription:
      "Free, open source Tailwind CSS v4 components for React, Vue, Laravel Blade, Svelte, Astro, and Angular. Copy them into your project with one CLI command.",
    componentsTitle: "Tailwind CSS components for React, Vue, Blade and more",
    componentsDescription: (n: number) =>
      `${n} free Tailwind CSS v4 components, from forms and modals to animations, with the same classes in React, Vue, Blade, Svelte, Astro, and Angular.`,
    templatesTitle: "Tailwind dashboard templates for React, Vue and Laravel",
    templatesDescription:
      "Free admin dashboard templates from MarkasUI components, with full source in Laravel Blade, React, Vue, Svelte, Astro, and Angular. Preview them live.",
    pagesTitle: "Tailwind landing page templates for React, Vue and Laravel",
    pagesDescription:
      "Free welcome and landing pages with a navbar, hero, and footer, built from MarkasUI components in Laravel Blade, React, Vue, Svelte, Astro, and Angular.",
    componentTitle: (title: string, frameworks: string) =>
      `${title} component for ${frameworks}`,
    componentTails: (frameworks: string) => [
      `Copy-paste Tailwind CSS code for ${frameworks}, with props and accessibility notes.`,
      `Tailwind CSS code for ${frameworks}.`,
    ],
    templateTitle: (headline: string, frameworks: string) =>
      `${headline}: free Tailwind template for ${frameworks}`,
    templateTails: (frameworks: string) => [
      `Free source code in ${frameworks}, built from MarkasUI components.`,
      `Free source in ${frameworks}.`,
    ],
    and: "and",
    breadcrumb: "Breadcrumb",
    related: "Related components",
    relatedText: (category: string) =>
      `More ${category.toLowerCase()} components with the same classes in every framework.`,
    notFound: "Page not found",
  },
  hub: {
    byFramework: "Browse by framework",
    link: (framework: string) => `${framework} components`,
    footer: "Frameworks",
    install: "Install",
    installText:
      "Run init once in the project root. The CLI detects the framework, saves markas.css, and writes markas.json. Then add components by name.",
    usage: "Usage",
    details: "How the components are built",
    components: (n: number) => `${n} components`,
    componentsText: (framework: string) =>
      `Every link opens the component page with the ${framework} code selected.`,
    templates: "Templates and pages",
    templatesText: (framework: string) =>
      `Full pages built from the same components, with ${framework} source you can copy.`,
    others: "Other frameworks",
  },
};

type Dictionary = typeof en;

const id: Dictionary = {
  meta: {
    title:
      "MarkasUI - Komponen UI untuk Blade, React, Vue, Svelte, Astro, dan Angular",
    description:
      "Komponen UI ringan untuk Blade, React, Vue, Svelte, Astro, dan Angular dengan satu desain yang sama.",
  },
  nav: {
    home: "Beranda",
    docs: "Docs",
    components: "Komponen",
    templates: "Template",
    pages: "Halaman",
    mcp: "MCP",
    main: "Utama",
    mainMobile: "Utama seluler",
    footer: "Footer",
  },
  header: {
    skip: "Lewati ke konten",
    search: "Cari",
    menu: "Menu",
    closeMenu: "Tutup menu",
    navigation: "Navigasi",
    theme: "Ganti tema terang atau gelap",
    github: "GitHub",
    stars: (count: number) => `GitHub, ${count} bintang`,
    language: "Bahasa",
    getStarted: "Mulai",
  },
  search: {
    dialog: "Pencarian",
    keyword: "Kata kunci",
    placeholder: "Cari komponen atau docs",
    trigger: "Cari...",
    idle: "Ketik untuk mencari",
    unavailable: "Pencarian tersedia setelah situs dibangun",
    none: "Tidak ada hasil",
    results: (n: number) => `${n} hasil`,
  },
  sidebar: {
    label: "Navigasi docs",
    start: "Panduan",
    components: "Komponen",
    templates: "Template",
    pages: "Halaman",
    fresh: "baru",
    updated: "diperbarui",
  },
  framework: {
    label: "Framework",
    example: "Framework contoh",
    nowShowing: "Sekarang menampilkan",
  },
  toc: "Di halaman ini",
  footer: {
    madeBy: "Dibuat oleh CV Jenderal Solusi Digital, Purwokerto",
    license: "Lisensi MIT",
    support: "Traktir kopi",
  },
  categories: {
    form: "Form",
    feedback: "Feedback",
    overlay: "Overlay",
    navigation: "Navigasi",
    data: "Data",
    markas: "MarkasUI",
    section: "Section",
    animation: "Animasi",
    background: "Latar",
    button: "Tombol",
  },
  docsNav: {
    introduction: "Pengenalan",
    installation: "Instalasi",
    theming: "Theming",
    livewire: "Livewire",
    cli: "CLI",
    mcp: "MCP",
    skills: "Agent Skill",
    changelog: "Changelog",
  },
  component: {
    breadcrumb: "Komponen",
    previous: (title: string) => `Sebelumnya: ${title}`,
    next: (title: string) => `Berikutnya: ${title}`,
    installation: "Instalasi",
    usage: "Pemakaian",
    props: "Props",
    accessibility: "Aksesibilitas",
    installMethod: "Cara instalasi",
    packageManager: "Package manager",
    cli: "CLI",
    manual: "Manual",
    manualSetup:
      "Pastikan Tailwind CSS v4 dan markas.css sudah terpasang. Lihat",
    manualSetupLink: "Instalasi",
    manualDeps: "Pasang dependensi:",
    manualCopy: "Salin source komponen di bawah ini ke",
    table: {
      label: "Tabel props",
      name: "Nama",
      type: "Tipe",
      default: "Default",
      description: "Keterangan",
    },
    reload: "Muat ulang preview",
    controls: "Pengaturan props",
    examples: "Contoh",
    view: "Tampilan",
    code: "Kode",
    viewOrCode: (title: string) => `${title}: tampilan atau kode`,
    source: "Source komponen",
    bladeMissing: "Preview Blade belum dirender. Jalankan pnpm build.",
    unavailable: (framework: string) => `Belum tersedia untuk ${framework}.`,
  },
  code: { copy: "Salin kode", expand: "Lihat kode" },
  copyPage: {
    copy: "Copy page",
    more: "Opsi lain",
    prompt: "Copy prompt",
    promptCopied: "Prompt tersalin",
    markdown: "Lihat Markdown",
    claude: "Buka di Claude",
    chatgpt: "Buka di ChatGPT",
    ask: (url: string) =>
      `Baca ${url} lalu bantu saya memakai komponen ini di project saya.`,
    askTemplate: (url: string) =>
      `Baca ${url} lalu bantu saya membuat halaman ini di project saya.`,
  },
  list: {
    title: "Komponen",
    subtitle: (n: number) =>
      `${n} komponen dengan tampilan yang sama di Blade, React, Vue, Svelte, Astro, dan Angular`,
    search: "Cari komponen",
    searchPlaceholder: "Cari",
    category: "Kategori",
    allCategories: "Semua kategori",
    sort: "Urutan",
    sortAz: "A sampai Z",
    sortNew: "Terbaru",
    empty: "Tidak ada komponen yang cocok.",
  },
  landing: {
    wallTitle: ["Setiap komponen,", "hidup."],
    wallText:
      "Setiap kotak menjalankan kode yang sama dengan yang disalin CLI ke project Anda. Ganti framework di atas dan kotaknya ikut berganti.",
    agentTitle: ["Agent AI memasangnya", "seperti Anda."],
    agentText:
      "MCP server memberi agent kode untuk framework project Anda. Agent Skill dan llms.txt memberi Claude Code, Cursor, atau Codex path dan token yang sama.",
    agentLinks: {
      mcp: "Pasang MCP server",
      skill: "Agent Skill",
      llms: "llms.txt",
    },
    templatesTitle: (n: number) => [
      `${n} halaman utuh dari komponen yang`,
      "sama.",
    ],
    templatesText:
      "Setiap template tersedia dalam Blade, React, Vue, Svelte, Astro, dan Angular. Buka salah satunya dan coba langsung.",
    templatesLink: "Semua template",
    pagesTitle: ["Halaman sambutan,", "siap rilis."],
    pagesText:
      "Landing page lengkap dengan navbar, hero, section, dan footer. Ganti teksnya lalu luncurkan.",
    pagesLink: "Semua halaman",
    componentsTitle: (n: number) => [`${n} komponen,`, "satu registry."],
    componentsText:
      "Dikelompokkan sesuai cara Anda mencarinya. Setiap halaman punya preview langsung, props, dan kode untuk setiap framework.",
    componentsLink: "Lihat dengan preview",
    ctaTitle: ["Mulai dengan", "satu perintah."],
    ctaText:
      "Jalankan init di project Laravel, React, atau Vue, lalu tambahkan komponen satu per satu.",
    stackLabel: "Bekerja dengan",
  },
  home: {
    titleBefore: "Pasang komponen",
    titleAfter: "",
    titleEnd: "dengan satu perintah.",
    titleFrameworks: "Blade, React, Vue, Svelte, Astro, dan Angular",
    description:
      "Komponen UI siap salin di atas Tailwind CSS v4. Class dan varian yang sama di setiap framework, dan kodenya tinggal di repo Anda.",
    frameworkLabel: "Framework untuk kode dan preview",
    browse: "Lihat komponen",
    copyCommand: "Salin perintah instalasi",
    statsLabel: "MarkasUI dalam angka",
    stats: {
      components: "komponen di registry",
      frameworks: "framework, satu set class",
      dependencies: "paket runtime selain framework itu sendiri",
      size: "JS per komponen setelah gzip",
    },
    cardBadge: "Coba",
    featuresLabel: "Yang Anda dapat",
    features: [
      ["Disalin ke repo Anda", "Tanpa paket untuk diperbarui"],
      ["Class sama di 6 framework", "Semua framework tampil identik"],
      ["Diuji WCAG 2.2 AA", "Cek axe dan keyboard di CI"],
      ["Token terang dan gelap", "Satu file CSS untuk semua warna"],
      ["Siap untuk agent AI", "MCP server, Skill, dan llms.txt"],
    ],
  },
  templates: {
    title: "Template",
    subtitle:
      "Halaman lengkap yang disusun dari komponen MarkasUI, dalam Blade, React, Vue, Svelte, Astro, dan Angular. Coba langsung di sini.",
    open: "Buka layar penuh",
    preview: "Pratinjau langsung",
    code: "Kode",
    components: "Komponen yang dipakai",
    componentsText: (n: number) =>
      `Template ini disusun dari ${n} komponen MarkasUI. Buka salah satunya untuk melihat props dan variasinya.`,
    accent: "Warna aksen",
    install: "Instalasi",
    viewCode: "Lihat kode",
    lines: (n: number) => `${n} baris`,
    installText:
      "Tambahkan semua komponen yang dipakai template ini, lalu salin halamannya dari GitHub.",
    source: "Lihat source di GitHub",
    back: "Semua template",
    sectors: "Cocok untuk",
  },
  pages: {
    title: "Halaman",
    subtitle:
      "Welcome page dan landing page siap pakai yang disusun dari komponen MarkasUI, dalam Blade, React, Vue, Svelte, Astro, dan Angular.",
    empty: "Halaman baru sedang disiapkan. Kunjungi lagi nanti.",
    back: "Semua halaman",
    componentsText: (n: number) =>
      `Halaman ini disusun dari ${n} komponen MarkasUI. Buka salah satunya untuk melihat props dan variasinya.`,
    installText:
      "Tambahkan semua komponen yang dipakai halaman ini, lalu salin halamannya dari GitHub.",
  },
  notFound: {
    eyebrow: "Error 404",
    title: "Halaman ini tidak ditemukan",
    text: "Mungkin alamatnya salah ketik, atau halamannya sudah pindah. Coba salah satu ini.",
    home: "Kembali ke beranda",
    components: "Lihat komponen",
    search: "Cari di docs",
    suggestions: "Mungkin maksud Anda",
  },
  switching: {
    title: "Menyiapkan tampilan",
    subtitle: "Beralih ke Bahasa Indonesia",
  },
  agentDemo: {
    caption: "Claude Code dengan MCP markasui",
    prompt:
      "Buat halaman login Laravel memakai MarkasUI, dengan pesan error dari validasi",
    calls: "Tool yang dipanggil",
    files: "File yang ditulis",
    reply:
      "Input dan Button sudah ditambahkan, lalu halaman login ditulis. Pesan error validasi tampil di bawah setiap field.",
  },
  seo: {
    homeEyebrow: "Library komponen open source",
    homeTitle:
      "MarkasUI by JenderalCorp - Komponen Tailwind CSS untuk React, Vue, dan Blade",
    homeDescription:
      "Komponen Tailwind CSS v4 gratis dan open source untuk React, Vue, Laravel Blade, Svelte, Astro, dan Angular. Salin ke project Anda dengan satu perintah CLI.",
    componentsTitle:
      "Komponen Tailwind CSS untuk React, Vue, Blade, dan lainnya",
    componentsDescription: (n: number) =>
      `${n} komponen Tailwind CSS v4 gratis, dari form dan modal sampai animasi, dengan class yang sama di React, Vue, Blade, Svelte, Astro, dan Angular.`,
    templatesTitle: "Template dashboard Tailwind untuk React, Vue, dan Laravel",
    templatesDescription:
      "Template dashboard admin gratis dari komponen MarkasUI, dengan source lengkap dalam Laravel Blade, React, Vue, Svelte, Astro, dan Angular. Coba langsung.",
    pagesTitle: "Template landing page Tailwind untuk React, Vue, dan Laravel",
    pagesDescription:
      "Welcome page dan landing page gratis dengan navbar, hero, dan footer, dari komponen MarkasUI dalam Laravel Blade, React, Vue, Svelte, Astro, dan Angular.",
    componentTitle: (title: string, frameworks: string) =>
      `Komponen ${title} untuk ${frameworks}`,
    componentTails: (frameworks: string) => [
      `Kode Tailwind CSS siap salin untuk ${frameworks}, lengkap dengan props dan catatan aksesibilitas.`,
      `Kode Tailwind CSS untuk ${frameworks}.`,
    ],
    templateTitle: (headline: string, frameworks: string) =>
      `${headline}: template Tailwind gratis untuk ${frameworks}`,
    templateTails: (frameworks: string) => [
      `Source gratis dalam ${frameworks}, disusun dari komponen MarkasUI.`,
      `Source gratis dalam ${frameworks}.`,
    ],
    and: "dan",
    breadcrumb: "Breadcrumb",
    related: "Komponen terkait",
    relatedText: (category: string) =>
      `Komponen ${category.toLowerCase()} lain dengan class yang sama di setiap framework.`,
    notFound: "Halaman tidak ditemukan",
  },
  hub: {
    byFramework: "Lihat per framework",
    link: (framework: string) => `Komponen ${framework}`,
    footer: "Framework",
    install: "Instalasi",
    installText:
      "Jalankan init sekali di root project. CLI mendeteksi framework, menyimpan markas.css, dan menulis markas.json. Lalu tambahkan komponen berdasarkan nama.",
    usage: "Pemakaian",
    details: "Cara komponennya dibuat",
    components: (n: number) => `${n} komponen`,
    componentsText: (framework: string) =>
      `Setiap tautan membuka halaman komponen dengan kode ${framework} terpilih.`,
    templates: "Template dan halaman",
    templatesText: (framework: string) =>
      `Halaman utuh dari komponen yang sama, dengan source ${framework} yang bisa disalin.`,
    others: "Framework lain",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, id };
export const t = (locale: Locale): Dictionary => dictionaries[locale];

/** Locale dari URL halaman. */
export const getLocale = (url: URL): Locale =>
  /^\/id(\/|\.html$|$)/.test(url.pathname) ? "id" : "en";
