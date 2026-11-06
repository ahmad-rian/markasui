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
    title: "MarkasUI - UI components for Blade, React, and Vue",
    description:
      "Lightweight UI components for Blade, React, and Vue with one shared design.",
  },
  nav: {
    home: "Home",
    docs: "Docs",
    components: "Components",
    templates: "Templates",
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
    fresh: "new",
    updated: "updated",
  },
  framework: { label: "Framework", example: "Example framework" },
  toc: "On this page",
  footer: {
    madeBy: "Made by CV Jenderal Solusi Digital, Purwokerto",
    license: "MIT license",
  },
  categories: {
    form: "Form",
    feedback: "Feedback",
    overlay: "Overlay",
    navigation: "Navigation",
    data: "Data",
    markas: "MarkasUI",
    animation: "Animations",
    background: "Backgrounds",
    button: "Buttons",
  },
  docsNav: {
    introduction: "Introduction",
    installation: "Installation",
    theming: "Theming",
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
  },
  list: {
    title: "Components",
    subtitle: (n: number) =>
      `${n} components, each in Blade, React, and Vue with the same look`,
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
    agentTitle: "Coding agents install it the way you would",
    agentText:
      "The MCP server hands an agent the code for your project's framework. The Agent Skill and llms.txt give Claude Code, Cursor, or Codex the same paths and tokens.",
    agentLinks: {
      mcp: "Install the MCP server",
      skill: "Agent Skill",
      llms: "llms.txt",
    },
    templatesTitle: (n: number) => `${n} full pages built from the same parts`,
    templatesText:
      "Every template ships in Blade, React, and Vue. Open one and click around.",
    templatesLink: "All templates",
    componentsTitle: (n: number) => `${n} components`,
    componentsLink: "Browse with previews",
  },
  home: {
    titleBefore: "Ship",
    titleAfter: "components",
    titleEnd: "in one command",
    titleFrameworks: "Blade, React, and Vue",
    description:
      "Copy-paste UI components for Blade, React, and Vue on Tailwind CSS v4. Same classes, same variants, and the code lives in your repo.",
    frameworkLabel: "Framework for the code and previews",
    start: "Get started",
    browse: "Browse components",
    copyCommand: "Copy install command",
    stackLabel: "Works with",
    wallTitle: "Every component, alive.",
    wallText: "Each tile runs the same code the CLI copies into your project.",
    figuresLabel: "MarkasUI in numbers",
    figures: {
      components: "components in the registry",
      frameworks: "frameworks sharing one set of class names",
      dependencies: "runtime packages besides React, Vue, or Alpine.js",
      size: "of gzipped JS per component, checked in CI",
    },
  },
  templates: {
    title: "Templates",
    subtitle:
      "Complete pages built from MarkasUI components, in Blade, React, and Vue. Try them right here.",
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
};

type Dictionary = typeof en;

const id: Dictionary = {
  meta: {
    title: "MarkasUI - Komponen UI untuk Blade, React, dan Vue",
    description:
      "Komponen UI ringan untuk Blade, React, dan Vue dengan satu desain yang sama.",
  },
  nav: {
    home: "Beranda",
    docs: "Docs",
    components: "Komponen",
    templates: "Template",
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
    fresh: "baru",
    updated: "diperbarui",
  },
  framework: { label: "Framework", example: "Framework contoh" },
  toc: "Di halaman ini",
  footer: {
    madeBy: "Dibuat oleh CV Jenderal Solusi Digital, Purwokerto",
    license: "Lisensi MIT",
  },
  categories: {
    form: "Form",
    feedback: "Feedback",
    overlay: "Overlay",
    navigation: "Navigasi",
    data: "Data",
    markas: "MarkasUI",
    animation: "Animasi",
    background: "Latar",
    button: "Tombol",
  },
  docsNav: {
    introduction: "Pengenalan",
    installation: "Instalasi",
    theming: "Theming",
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
  },
  list: {
    title: "Komponen",
    subtitle: (n: number) =>
      `${n} komponen, masing-masing dalam versi Blade, React, dan Vue dengan tampilan yang sama`,
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
    agentTitle: "Agent AI memasangnya dengan cara yang sama seperti Anda",
    agentText:
      "MCP server memberi agent kode untuk framework project Anda. Agent Skill dan llms.txt memberi Claude Code, Cursor, atau Codex path dan token yang sama.",
    agentLinks: {
      mcp: "Pasang MCP server",
      skill: "Agent Skill",
      llms: "llms.txt",
    },
    templatesTitle: (n: number) => `${n} halaman utuh dari komponen yang sama`,
    templatesText:
      "Setiap template tersedia dalam Blade, React, dan Vue. Buka salah satunya dan coba langsung.",
    templatesLink: "Semua template",
    componentsTitle: (n: number) => `${n} komponen`,
    componentsLink: "Lihat dengan preview",
  },
  home: {
    titleBefore: "Pasang komponen",
    titleAfter: "",
    titleEnd: "dengan satu perintah",
    titleFrameworks: "Blade, React, dan Vue",
    description:
      "Komponen UI siap salin untuk Blade, React, dan Vue di atas Tailwind CSS v4. Class dan varian sama, dan kodenya tinggal di repo Anda.",
    frameworkLabel: "Framework untuk kode dan preview",
    start: "Mulai",
    browse: "Lihat komponen",
    copyCommand: "Salin perintah instalasi",
    stackLabel: "Bekerja dengan",
    wallTitle: "Setiap komponen, hidup.",
    wallText:
      "Setiap kotak menjalankan kode yang sama dengan yang disalin CLI ke project Anda.",
    figuresLabel: "MarkasUI dalam angka",
    figures: {
      components: "komponen di registry",
      frameworks: "framework dengan nama class yang sama",
      dependencies: "paket runtime selain React, Vue, atau Alpine.js",
      size: "JS per komponen setelah gzip, dicek di CI",
    },
  },
  templates: {
    title: "Template",
    subtitle:
      "Halaman lengkap yang disusun dari komponen MarkasUI, dalam Blade, React, dan Vue. Coba langsung di sini.",
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
};

const dictionaries: Record<Locale, Dictionary> = { en, id };
export const t = (locale: Locale): Dictionary => dictionaries[locale];

/** Locale dari URL halaman. */
export const getLocale = (url: URL): Locale =>
  /^\/id(\/|\.html$|$)/.test(url.pathname) ? "id" : "en";
