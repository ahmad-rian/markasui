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
  lead: "MarkasUI is free and open source, made by JenderalCorp in Purwokerto. If it saved you some time, a coffee helps us keep building it.",
  amount: "Amount",
  presets: "Quick amounts",
  amountHint: `Any whole amount from ${MIN} to ${MAX}.`,
  name: "Name",
  nameHint: "Optional. Only we see it.",
  message: "Message",
  messageHint: "Optional, up to 140 characters.",
  qris: "You pay on Sumopod's checkout page with QRIS. Scan the code with any Indonesian e-wallet or banking app. It stays valid for one hour.",
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
    waiting:
      "We will confirm once the payment arrives. QRIS payments usually land within a minute, and you can close this page.",
    failed:
      "This payment expired or was not completed, so nothing was charged.",
    again: "Try again",
    home: "Back to MarkasUI",
  },
  launcher: {
    open: "Buy me a coffee",
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
  lead: "MarkasUI gratis dan open source, dibuat oleh JenderalCorp di Purwokerto. Kalau MarkasUI menghemat waktumu, secangkir kopi membantu kami terus mengembangkannya.",
  amount: "Nominal",
  presets: "Nominal cepat",
  amountHint: `Nominal bulat berapa pun dari ${MIN} sampai ${MAX}.`,
  name: "Nama",
  nameHint: "Opsional. Hanya kami yang melihatnya.",
  message: "Pesan",
  messageHint: "Opsional, paling banyak 140 karakter.",
  qris: "Pembayaran dilakukan di halaman checkout Sumopod dengan QRIS. Pindai kodenya dengan e-wallet atau aplikasi bank mana pun. Kode berlaku satu jam.",
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
    waiting:
      "Kami akan mengonfirmasi begitu pembayaran masuk. Pembayaran QRIS biasanya masuk dalam semenit, dan halaman ini boleh ditutup.",
    failed:
      "Pembayaran ini kedaluwarsa atau tidak selesai, jadi tidak ada dana yang terpotong.",
    again: "Coba lagi",
    home: "Kembali ke MarkasUI",
  },
  launcher: {
    open: "Traktir kopi",
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
    again: "Coba lagi",
    home: "Kembali ke MarkasUI",
  },
};

const dictionaries: Record<Locale, SupportStrings> = { en, id };
export const supportStrings = (locale: Locale): SupportStrings =>
  dictionaries[locale];
