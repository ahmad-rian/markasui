/**
 * "Buy me a coffee" pages (/support, /support/thanks, /support/cancel). The amounts and limits match
 * deploy/donate/server.mjs, which validates them again before creating the Sumopod QRIS payment.
 */
import type { Locale } from "./i18n";

export const SUPPORT_PRESETS = [10_000, 25_000, 50_000, 100_000] as const;
export const SUPPORT_DEFAULT_AMOUNT = 25_000;
export const SUPPORT_MIN = 3_000;
export const SUPPORT_MAX = 5_000_000;
export const SUPPORT_NAME_MAX = 40;
export const SUPPORT_MESSAGE_MAX = 140;
export const SUPPORT_PATH = "/support";
/** Query parameter the floating coffee card uses to preselect an amount on /support. */
export const SUPPORT_AMOUNT_PARAM = "amount";
/** Same-origin endpoint with the latest paid supporters (deploy/donate/server.mjs). */
export const SUPPORTERS_ENDPOINT = "/api/donate/supporters";
/** How many supporters /support shows; the endpoint may return more. */
export const SUPPORTERS_SHOWN = 6;

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

const MIN = `Rp ${formatRupiah(SUPPORT_MIN)}`;
const MAX = `Rp ${formatRupiah(SUPPORT_MAX)}`;

const en = {
  link: "Buy me a coffee",
  title: "Support MarkasUI",
  seoTitle: "Support MarkasUI with a coffee",
  description:
    "MarkasUI is free and open source. Buy the JenderalCorp team a coffee with QRIS from any Indonesian e-wallet or banking app.",
  lead: "MarkasUI is free and open source, with no paid tiers and no ads. A coffee pays for a few hours of the next release.",
  /** Poster headline: {before} <accent word in serif italic> {after}. */
  hero: { before: "Buy MarkasUI a", accent: "coffee", after: "" },
  /** Real numbers under the headline, from the repo at build time. */
  stats: {
    components: "components",
    templates: "templates",
    frameworks: "frameworks",
  },
  form: "Choose your coffee",
  amount: "Amount",
  presets: "Quick amounts",
  tiers: [
    { label: "1 coffee", phrase: "1 coffee" },
    { label: "2 coffees", phrase: "2 coffees" },
    { label: "Coffee + snack", phrase: "a coffee and a snack" },
    { label: "Team round", phrase: "coffee for the whole team" },
  ],
  custom: "Other amount",
  amountHint: `From ${MIN} to ${MAX}.`,
  /** {what} and {amount} are filled in by scripts/support.ts. */
  summaryPreset: "You are buying {what}, {amount}.",
  summaryCustom: "You are buying us coffee worth {amount}.",
  name: "Name",
  nameHint: "Optional. Empty shows Anonymous.",
  message: "Message",
  messageHint:
    "Optional, up to 140 characters. Shown with your name once paid.",
  qrisBadge: "QRIS",
  trust:
    "Pay on Sumopod's checkout with any e-wallet or banking app. No account needed.",
  supporters: {
    title: "Supporters",
    lead: "Recent coffees, with the name and message each person chose. Amounts stay private.",
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
          "You pay with QRIS on Sumopod's checkout, in your own e-wallet or banking app, which also keeps the receipt. We only see the amount, name and message.",
      },
      {
        question: "Will my name be public?",
        answer:
          "Only after the payment goes through, with the message you typed. Leave it empty to appear as Anonymous. The amount is never shown.",
      },
      {
        question: "Other ways to help",
        answer:
          "A star on GitHub, a bug report or sharing MarkasUI with your team helps just as much.",
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
    /** Popover title: {before} <accent word in serif italic>. */
    title: { before: "Buy a", accent: "coffee" },
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
  lead: "MarkasUI gratis dan open source, tanpa paket berbayar dan tanpa iklan. Secangkir kopi membiayai beberapa jam kerja untuk rilis berikutnya.",
  hero: { before: "Traktir", accent: "kopi", after: "untuk MarkasUI" },
  stats: {
    components: "komponen",
    templates: "template",
    frameworks: "framework",
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
  amountHint: `Dari ${MIN} sampai ${MAX}.`,
  summaryPreset: "Kamu mentraktir {what}, {amount}.",
  summaryCustom: "Kamu mentraktir kopi senilai {amount}.",
  name: "Nama",
  nameHint: "Opsional. Kosong tampil sebagai Anonim.",
  message: "Pesan",
  messageHint:
    "Opsional, paling banyak 140 karakter. Tampil bersama namamu setelah dibayar.",
  qrisBadge: "QRIS",
  trust:
    "Bayar di checkout Sumopod dengan e-wallet atau aplikasi bank apa pun. Tanpa akun.",
  supporters: {
    title: "Para pendukung",
    lead: "Kopi terbaru, dengan nama dan pesan pilihan masing-masing. Nominal tidak ditampilkan.",
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
          "Kamu membayar dengan QRIS di checkout Sumopod, lewat e-wallet atau aplikasi bankmu sendiri yang juga menyimpan bukti bayarnya. Kami hanya melihat nominal, nama, dan pesan.",
      },
      {
        question: "Apakah nama saya akan tampil?",
        answer:
          "Hanya setelah pembayaran berhasil, bersama pesan yang kamu ketik. Kosongkan untuk tampil sebagai Anonim. Nominal tidak pernah ditampilkan.",
      },
      {
        question: "Cara lain untuk membantu",
        answer:
          "Bintang di GitHub, laporan bug, atau membagikan MarkasUI ke timmu sama berartinya.",
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
    title: { before: "Traktir", accent: "kopi" },
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
