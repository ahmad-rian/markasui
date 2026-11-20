/**
 * "Buy me a coffee" pages (/support, /support/thanks, /support/cancel). The amounts and limits match
 * deploy/donate/server.mjs, which validates them again before creating the Sumopod QRIS payment.
 */
import type { Locale } from "./i18n";

export const SUPPORT_PRESETS = [10_000, 25_000, 50_000, 100_000] as const;
export const SUPPORT_DEFAULT_AMOUNT = 25_000;
export const SUPPORT_MIN = 10_000;
export const SUPPORT_MAX = 5_000_000;
export const SUPPORT_NAME_MAX = 40;
export const SUPPORT_MESSAGE_MAX = 140;
export const SUPPORT_PATH = "/support";
/** Query parameter the floating coffee card uses to preselect an amount on /support. */
export const SUPPORT_AMOUNT_PARAM = "amount";
/** Same-origin endpoint with the latest paid supporters (deploy/donate/server.mjs). */
export const SUPPORTERS_ENDPOINT = "/api/donate/supporters";

/** What each preset buys, drawn as small icons on its amount card (same order as SUPPORT_PRESETS). */
export const SUPPORT_TIER_ICONS = [
  ["cup"],
  ["cup", "cup"],
  ["cup", "bread"],
  ["cup", "cup", "cup", "cup"],
] as const;
export type SupportTierIcon = (typeof SUPPORT_TIER_ICONS)[number][number];

/** Whole rupiah within the accepted range, or null (used for ?amount= on /support). */
export function parseSupportAmount(value: string | null): number | null {
  if (!value || !/^\d{1,9}$/.test(value)) return null;
  const amount = Number(value);
  return amount >= SUPPORT_MIN && amount <= SUPPORT_MAX ? amount : null;
}

/** 25000 -> "25.000" (id-ID grouping in both languages, the amounts are rupiah). */
export const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(amount);

/** Real numbers from the repo for the "what your coffee funds" row on /support. */
export interface FundCounts {
  components: number;
  templates: number;
  frameworks: number;
}

const MIN = `Rp ${formatRupiah(SUPPORT_MIN)}`;
const MAX = `Rp ${formatRupiah(SUPPORT_MAX)}`;

const en = {
  link: "Buy me a coffee",
  title: "Support MarkasUI",
  seoTitle: "Support MarkasUI with a coffee",
  description:
    "MarkasUI is free and open source. Buy the JenderalCorp team a coffee with QRIS from any Indonesian e-wallet or banking app.",
  lead: "MarkasUI is free and open source, built by a small team at JenderalCorp in Purwokerto. There are no paid tiers and no ads. If it saved you some time, a coffee pays for a few of the hours that go into the next release.",
  funds: {
    title: "What your coffee funds",
    items: [
      {
        title: "New components and templates",
        stat: ({ components, templates }: FundCounts) =>
          `${components} components and ${templates} templates so far`,
      },
      {
        title: "Every framework in sync",
        stat: ({ frameworks }: FundCounts) =>
          `Each component ships for ${frameworks} frameworks`,
      },
      {
        title: "Docs in two languages",
        stat: () => "English and Indonesian, side by side",
      },
    ],
  },
  form: "Choose your coffee",
  amount: "Amount",
  presets: "Quick amounts",
  tiers: [
    { label: "1 coffee", phrase: "1 coffee" },
    { label: "2 coffees", phrase: "2 coffees" },
    { label: "Coffee and a snack", phrase: "a coffee and a snack" },
    { label: "Coffee for the team", phrase: "coffee for the whole team" },
  ],
  custom: "Other amount",
  amountHint: `Any whole amount from ${MIN} to ${MAX}.`,
  /** {what} and {amount} are filled in by scripts/support.ts. */
  summaryPreset: "You are buying {what}, {amount}.",
  summaryCustom: "You are buying us coffee worth {amount}.",
  name: "Name",
  nameHint:
    "Optional. Shown with your message in the supporters list once the payment goes through. Leave it empty to appear as Anonymous.",
  message: "Message",
  messageHint: "Optional, up to 140 characters. Shown with your name.",
  qrisBadge: "QRIS",
  trust: "Secure checkout by Sumopod. No account needed.",
  supporters: {
    title: "Supporters",
    lead: "Recent coffees from people who use MarkasUI, with the name and message they chose. Amounts stay private.",
    anonymous: "Anonymous",
    empty: "No coffees yet. Yours could be the first one here.",
    error: "The supporters list could not be loaded right now.",
  },
  faq: {
    title: "Questions",
    items: [
      {
        question: "Is the payment safe?",
        answer:
          "You pay on Sumopod's checkout page with QRIS, using your own e-wallet or banking app. We never see your account or card details, only the amount and the name and message you type here.",
      },
      {
        question: "Can I get a receipt?",
        answer:
          "Your e-wallet or banking app keeps the QRIS transaction with its reference number, which works as proof of payment. If you need something more formal, open an issue on GitHub and we will sort it out.",
      },
      {
        question: "Will my name be public?",
        answer:
          "Only if the payment goes through, and only the name and message you typed. Leave the name empty to appear as Anonymous. The amount is never shown.",
      },
      {
        question: "Other ways to help",
        answer:
          "A star on GitHub, sharing MarkasUI with your team, or reporting a bug helps just as much. Contributions are welcome too.",
        /** Paths under SITE.repo (lib/site.ts). */
        links: [
          { label: "Star on GitHub", repoPath: "" },
          {
            label: "Contributing guide",
            repoPath: "/blob/main/CONTRIBUTING.md",
          },
        ],
      },
    ],
  },
  steps: {
    title: "How it works",
    items: [
      "Choose an amount and, if you like, leave a name and a message.",
      "Pay on Sumopod's checkout page by scanning the QRIS code with any Indonesian e-wallet or banking app. The code stays valid for one hour.",
      "Done. Once the payment goes through, your name and message appear under Supporters.",
    ],
  },
  submit: "Buy me a coffee",
  busy: "Opening the payment page",
  noscript:
    "This form needs JavaScript to create the payment. Turn it on and reload the page.",
  errors: {
    amount: `Enter an amount from ${MIN} to ${MAX}.`,
    name: "The name can be at most 40 characters.",
    message: "The message can be at most 140 characters.",
    rate: "Too many attempts. Wait a minute and try again.",
    generic: "The payment page could not be opened. Try again in a moment.",
  },
  thanks: {
    title: "Thank you",
    seoTitle: "Thank you for the coffee",
    checking: "Checking the payment",
    received: "Payment received. Thank you for the coffee.",
    lead: "Every coffee goes into the next components, templates and translations.",
    supporters: "See the supporters",
    waiting:
      "We will confirm once the payment arrives. QRIS payments usually land within a minute, and you can close this page.",
    failed:
      "This payment expired or was not completed, so nothing was charged.",
    again: "Try again",
    home: "Back to MarkasUI",
  },
  launcher: {
    open: "Buy me a coffee",
    /** One line under the title on the floating card. */
    subtitle: "Keep MarkasUI free",
    /** The small x on the card: shrinks it to a round button for the rest of the visit. */
    minimize: "Minimize",
    text: "MarkasUI is free and open source. A coffee keeps it going.",
    /** Suffix for the short amounts on the chips: Rp 10k. */
    thousand: "k",
    cta: "Buy me a coffee",
    close: "Close",
    hide: "Hide for 7 days",
  },
  cancel: {
    title: "Payment cancelled",
    seoTitle: "Coffee payment cancelled",
    text: "Nothing was charged. You can try again whenever you like.",
    other: "Not today? A star on GitHub helps too.",
    again: "Try again",
    home: "Back to MarkasUI",
  },
};

type SupportStrings = typeof en;

const id: SupportStrings = {
  link: "Traktir kopi",
  title: "Dukung MarkasUI",
  seoTitle: "Dukung MarkasUI dengan secangkir kopi",
  description:
    "MarkasUI gratis dan open source. Traktir tim JenderalCorp kopi lewat QRIS dari e-wallet atau aplikasi bank mana pun.",
  lead: "MarkasUI gratis dan open source, dibuat oleh tim kecil JenderalCorp di Purwokerto. Tidak ada paket berbayar dan tidak ada iklan. Kalau MarkasUI menghemat waktumu, secangkir kopi membiayai beberapa jam kerja untuk rilis berikutnya.",
  funds: {
    title: "Kopimu dipakai untuk",
    items: [
      {
        title: "Komponen dan template baru",
        stat: ({ components, templates }: FundCounts) =>
          `Sejauh ini ${components} komponen dan ${templates} template`,
      },
      {
        title: "Semua framework tetap selaras",
        stat: ({ frameworks }: FundCounts) =>
          `Setiap komponen tersedia untuk ${frameworks} framework`,
      },
      {
        title: "Dokumentasi dua bahasa",
        stat: () => "Inggris dan Indonesia, berdampingan",
      },
    ],
  },
  form: "Pilih kopimu",
  amount: "Nominal",
  presets: "Nominal cepat",
  tiers: [
    { label: "1 kopi", phrase: "1 kopi" },
    { label: "2 kopi", phrase: "2 kopi" },
    { label: "Kopi + roti", phrase: "kopi dan roti" },
    { label: "Traktir tim", phrase: "kopi untuk satu tim" },
  ],
  custom: "Nominal lain",
  amountHint: `Nominal bulat berapa pun dari ${MIN} sampai ${MAX}.`,
  summaryPreset: "Kamu mentraktir {what}, {amount}.",
  summaryCustom: "Kamu mentraktir kopi senilai {amount}.",
  name: "Nama",
  nameHint:
    "Opsional. Tampil bersama pesanmu di daftar pendukung setelah pembayaran berhasil. Kosongkan untuk tampil sebagai Anonim.",
  message: "Pesan",
  messageHint: "Opsional, paling banyak 140 karakter. Tampil bersama namamu.",
  qrisBadge: "QRIS",
  trust: "Checkout aman lewat Sumopod. Tanpa perlu akun.",
  supporters: {
    title: "Para pendukung",
    lead: "Kopi terbaru dari pengguna MarkasUI, dengan nama dan pesan pilihan mereka. Nominal tidak ditampilkan.",
    anonymous: "Anonim",
    empty: "Belum ada kopi. Kopimu bisa jadi yang pertama di sini.",
    error: "Daftar pendukung belum bisa dimuat sekarang.",
  },
  faq: {
    title: "Pertanyaan",
    items: [
      {
        question: "Apakah pembayarannya aman?",
        answer:
          "Kamu membayar di halaman checkout Sumopod dengan QRIS, memakai e-wallet atau aplikasi bank milikmu sendiri. Kami tidak pernah melihat data rekening atau kartumu, hanya nominal serta nama dan pesan yang kamu ketik di sini.",
      },
      {
        question: "Bisakah saya mendapat bukti pembayaran?",
        answer:
          "E-wallet atau aplikasi bankmu menyimpan transaksi QRIS beserta nomor referensinya, dan itu bisa dipakai sebagai bukti bayar. Kalau butuh yang lebih formal, buka issue di GitHub dan kami bantu.",
      },
      {
        question: "Apakah nama saya akan tampil?",
        answer:
          "Hanya kalau pembayaran berhasil, dan hanya nama serta pesan yang kamu ketik. Kosongkan nama untuk tampil sebagai Anonim. Nominal tidak pernah ditampilkan.",
      },
      {
        question: "Cara lain untuk membantu",
        answer:
          "Bintang di GitHub, membagikan MarkasUI ke timmu, atau melaporkan bug sama berartinya. Kontribusi juga sangat diterima.",
        /** Paths under SITE.repo (lib/site.ts). */
        links: [
          { label: "Beri bintang di GitHub", repoPath: "" },
          {
            label: "Panduan kontribusi",
            repoPath: "/blob/main/CONTRIBUTING.md",
          },
        ],
      },
    ],
  },
  steps: {
    title: "Cara kerjanya",
    items: [
      "Pilih nominal, lalu kalau mau, tulis nama dan pesan.",
      "Bayar di halaman checkout Sumopod dengan memindai kode QRIS memakai e-wallet atau aplikasi bank mana pun. Kode berlaku satu jam.",
      "Selesai. Setelah pembayaran berhasil, nama dan pesanmu tampil di bagian Para pendukung.",
    ],
  },
  submit: "Traktir kopi",
  busy: "Membuka halaman pembayaran",
  noscript:
    "Formulir ini butuh JavaScript untuk membuat pembayaran. Aktifkan lalu muat ulang halaman.",
  errors: {
    amount: `Masukkan nominal dari ${MIN} sampai ${MAX}.`,
    name: "Nama paling banyak 40 karakter.",
    message: "Pesan paling banyak 140 karakter.",
    rate: "Terlalu banyak percobaan. Tunggu satu menit lalu coba lagi.",
    generic: "Halaman pembayaran belum bisa dibuka. Coba lagi sebentar lagi.",
  },
  thanks: {
    title: "Terima kasih",
    seoTitle: "Terima kasih atas kopinya",
    checking: "Memeriksa pembayaran",
    received: "Pembayaran diterima. Terima kasih atas kopinya.",
    lead: "Setiap kopi dipakai untuk komponen, template, dan terjemahan berikutnya.",
    supporters: "Lihat para pendukung",
    waiting:
      "Kami akan mengonfirmasi begitu pembayaran masuk. Pembayaran QRIS biasanya masuk dalam semenit, dan halaman ini boleh ditutup.",
    failed:
      "Pembayaran ini kedaluwarsa atau tidak selesai, jadi tidak ada dana yang terpotong.",
    again: "Coba lagi",
    home: "Kembali ke MarkasUI",
  },
  launcher: {
    open: "Traktir kopi",
    subtitle: "Dukung MarkasUI tetap gratis",
    minimize: "Perkecil",
    text: "MarkasUI gratis dan open source. Secangkir kopi membuatnya terus berjalan.",
    thousand: "rb",
    cta: "Traktir kopi",
    close: "Tutup",
    hide: "Sembunyikan 7 hari",
  },
  cancel: {
    title: "Pembayaran dibatalkan",
    seoTitle: "Pembayaran kopi dibatalkan",
    text: "Tidak ada dana yang terpotong. Kamu bisa mencoba lagi kapan saja.",
    other: "Belum sekarang? Bintang di GitHub juga membantu.",
    again: "Coba lagi",
    home: "Kembali ke MarkasUI",
  },
};

const dictionaries: Record<Locale, SupportStrings> = { en, id };
export const supportStrings = (locale: Locale): SupportStrings =>
  dictionaries[locale];
