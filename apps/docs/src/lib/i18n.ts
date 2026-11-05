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
    title: "UI components for Blade, React, and Vue",
    subtitle:
      "One design across three frameworks, built on Tailwind CSS v4. Copy the code into your Laravel, React, or Vue project without extra packages.",
    primary: "Browse components",
    secondary: "Read the docs",
    meta: (n: number) => `${n} components · Open source, MIT`,
    installTitle: "Install from the terminal",
    installText: [
      "detects Laravel, React, Next.js, Vue, or Nuxt and copies",
      "Then",
      "writes component files to the right folder and never overwrites a file you changed.",
    ],
    installLink: "All CLI commands",
    agentTitle: "Used by AI agents with the right paths and tokens",
    agentText:
      "The MCP server fetches code for your project's framework. The Agent Skill, Copy prompt, and llms.txt give Claude Code, Cursor, or Codex the same rules.",
    agentLinks: {
      mcp: "Install the MCP server",
      skill: "Agent Skill",
      llms: "llms.txt",
    },
    componentsTitle: (n: number) => `${n} components`,
    componentsLink: "Browse with previews",
  },
  home: {
    badge: "New",
    badgeText: "MarkasUI 0.1 is out",
    titleBefore: "Polished components for",
    titleAfter: "copied in one command.",
    copyCommand: "Copy install command",
    description: (n: number) =>
      `${n} components for Blade, React, and Vue on Tailwind CSS v4. Copy them yourself, or hand them to your agent.`,
    primary: "Browse components",
    secondary: "Star on GitHub",
    stack: "Works with",
    preview: "Preview",
    terminal: "Terminal",
    frameworks: "Frameworks",
    added: (name: string) => `added ${name}`,
    frameworkMeta: {
      blade: "Alpine.js · resources/views",
      react: "React 19 · src/components",
      vue: "Vue 3 · src/components",
    },
    aliveTitle: "Every component, alive.",
    aliveText:
      "Real components rendered from the same code you copy, in all three frameworks.",
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
    title: "Komponen UI untuk Blade, React, dan Vue",
    subtitle:
      "Satu desain di tiga framework, di atas Tailwind CSS v4. Salin kodenya ke project Laravel, React, atau Vue tanpa paket tambahan.",
    primary: "Lihat komponen",
    secondary: "Baca docs",
    meta: (n: number) => `${n} komponen · Open source, MIT`,
    installTitle: "Pasang dari terminal",
    installText: [
      "mengenali project Laravel, React, Next.js, Vue, atau Nuxt, lalu menyalin",
      "Setelah itu",
      "menulis file komponen ke folder yang tepat dan tidak pernah menimpa file yang sudah Anda ubah.",
    ],
    installLink: "Semua perintah CLI",
    agentTitle: "Dipakai agent AI dengan path dan token yang benar",
    agentText:
      "MCP server mengambil kode untuk framework project Anda. Agent Skill, Copy prompt, dan llms.txt memberi aturan yang sama ke Claude Code, Cursor, atau Codex.",
    agentLinks: {
      mcp: "Pasang MCP server",
      skill: "Agent Skill",
      llms: "llms.txt",
    },
    componentsTitle: (n: number) => `${n} komponen`,
    componentsLink: "Lihat dengan preview",
  },
  home: {
    badge: "Baru",
    badgeText: "MarkasUI 0.1 sudah rilis",
    titleBefore: "Komponen rapi untuk",
    titleAfter: "disalin dengan satu perintah.",
    copyCommand: "Salin perintah instalasi",
    description: (n: number) =>
      `${n} komponen untuk Blade, React, dan Vue di atas Tailwind CSS v4. Salin sendiri, atau serahkan ke agent Anda.`,
    primary: "Lihat komponen",
    secondary: "Beri bintang di GitHub",
    stack: "Bekerja dengan",
    preview: "Preview",
    terminal: "Terminal",
    frameworks: "Framework",
    added: (name: string) => `${name} ditambahkan`,
    frameworkMeta: {
      blade: "Alpine.js · resources/views",
      react: "React 19 · src/components",
      vue: "Vue 3 · src/components",
    },
    aliveTitle: "Setiap komponen, hidup.",
    aliveText:
      "Komponen asli yang dirender dari kode yang sama dengan yang Anda salin, di ketiga framework.",
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
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, id };
export const t = (locale: Locale): Dictionary => dictionaries[locale];

/** Locale dari URL halaman. */
export const getLocale = (url: URL): Locale =>
  /^\/id(\/|\.html$|$)/.test(url.pathname) ? "id" : "en";
