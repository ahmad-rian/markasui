import { resolve } from "node:path";
import { loadComponents } from "@markasui/registry";
import type { RegistryItem } from "@markasui/registry/schema";
import { t, type Locale } from "./i18n";
import { REPO_ROOT } from "./paths";

const componentsDir = resolve(REPO_ROOT, "components");

let cache: Promise<RegistryItem[]> | undefined;

/** Semua komponen, diurutkan A sampai Z. Dibaca sekali per build. */
export const getComponents = (): Promise<RegistryItem[]> =>
  (cache ??= loadComponents(componentsDir));

export const CATEGORIES: RegistryItem["category"][] = [
  "form",
  "feedback",
  "overlay",
  "navigation",
  "data",
];
export const categoryLabel = (
  category: RegistryItem["category"],
  locale: Locale,
) => t(locale).categories[category];

/** Teks komponen dalam bahasa halaman. Inggris dari meta utama, Indonesia dari i18n.id. */
export function localized(item: RegistryItem, locale: Locale) {
  if (locale === "en")
    return {
      description: item.description,
      props: item.props,
      a11y: item.a11y,
      ai: item.ai,
      usage: item.usage,
    };
  const id = item.i18n.id;
  return {
    description: id.description,
    props: item.props.map((prop) => ({
      ...prop,
      description: id.props[prop.name] ?? prop.description,
    })),
    a11y: id.a11y,
    ai: id.ai,
    usage: id.usage,
  };
}

const DAY_MS = 24 * 60 * 60 * 1000;
/** Label tampil 30 hari sejak addedAt atau updatedAt (PRD bagian 7). */
const FRESH_WINDOW_DAYS = 30;
/** Komponen yang ikut rilis pertama tidak diberi label: kalau semuanya "baru", tidak ada yang menonjol. */
const FIRST_RELEASE = "2026-11-04";

export type Freshness = "new" | "updated" | null;

export function freshness(
  item: Pick<RegistryItem, "addedAt" | "updatedAt">,
  now = new Date(),
): Freshness {
  const recent = (date: string) =>
    (now.getTime() - new Date(date).getTime()) / DAY_MS <= FRESH_WINDOW_DAYS;
  if (item.addedAt > FIRST_RELEASE && recent(item.addedAt)) return "new";
  if (
    item.updatedAt &&
    item.updatedAt > FIRST_RELEASE &&
    recent(item.updatedAt)
  )
    return "updated";
  return null;
}

export function groupByCategory(items: RegistryItem[], locale: Locale) {
  return CATEGORIES.map((category) => ({
    category,
    label: categoryLabel(category, locale),
    items: items.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);
}
