import type { Framework } from "@markasui/registry/schema";

export const FRAMEWORK_KEY = "markas-framework";
export const THEME_KEY = "markas-theme";
export const DEFAULT_FRAMEWORK: Framework = "blade";
const FRAMEWORKS: readonly Framework[] = ["blade", "react", "vue"];

const read = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Mode privat atau storage diblok: pilihan tetap berlaku sampai halaman ditutup.
  }
};

export const isFramework = (value: unknown): value is Framework =>
  FRAMEWORKS.includes(value as Framework);

/** True kalau pengunjung pernah memilih framework (tersimpan di localStorage). */
export const hasStoredFramework = (): boolean =>
  isFramework(read(FRAMEWORK_KEY));

export const getFramework = (): Framework => {
  const current = document.documentElement.dataset.framework;
  if (isFramework(current)) return current;
  const stored = read(FRAMEWORK_KEY);
  return isFramework(stored) ? stored : DEFAULT_FRAMEWORK;
};

export function setFramework(framework: Framework) {
  write(FRAMEWORK_KEY, framework);
  document.documentElement.dataset.framework = framework;
  document.dispatchEvent(
    new CustomEvent("markas:framework", { detail: framework }),
  );
}

export function setTheme(theme: "light" | "dark") {
  write(THEME_KEY, theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
}
