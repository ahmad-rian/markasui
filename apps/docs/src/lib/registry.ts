import { resolve } from "node:path";
import { loadComponents } from "@markasui/registry";
import type { RegistryItem } from "@markasui/registry/schema";
import { REPO_ROOT } from "./paths";

const componentsDir = resolve(REPO_ROOT, "components");

let cache: Promise<RegistryItem[]> | undefined;

/** Semua komponen, diurutkan A sampai Z. Dibaca sekali per build. */
export const getComponents = (): Promise<RegistryItem[]> =>
  (cache ??= loadComponents(componentsDir));

export const CATEGORY_LABELS: Record<RegistryItem["category"], string> = {
  form: "Form",
  feedback: "Feedback",
  overlay: "Overlay",
  navigation: "Navigasi",
  data: "Data",
};

const DAY_MS = 24 * 60 * 60 * 1000;
/** Label BARU tampil 30 hari sejak addedAt (PRD bagian 7). */
const NEW_WINDOW_DAYS = 30;

export type Freshness = "baru" | "diperbarui" | null;

export function freshness(
  item: Pick<RegistryItem, "addedAt" | "updatedAt">,
  now = new Date(),
): Freshness {
  const age = (date: string) =>
    (now.getTime() - new Date(date).getTime()) / DAY_MS;
  if (age(item.addedAt) <= NEW_WINDOW_DAYS) return "baru";
  if (item.updatedAt && age(item.updatedAt) <= NEW_WINDOW_DAYS)
    return "diperbarui";
  return null;
}

export function groupByCategory(items: RegistryItem[]) {
  return (Object.keys(CATEGORY_LABELS) as RegistryItem["category"][])
    .map((category) => ({
      category,
      label: CATEGORY_LABELS[category],
      items: items.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);
}
