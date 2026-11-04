import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { IndexItem, RegistryItem, Theme } from "./types.ts";

export const DEFAULT_REGISTRY = "https://markasui.pages.dev/r";
const TIMEOUT_MS = 15_000;

export class RegistryError extends Error {
  override name = "RegistryError";
}

/** Registry bisa berupa URL https atau folder lokal (path biasa / file://), berguna untuk mirror dan tes. */
async function fetchJson<T>(registry: string, file: string): Promise<T> {
  const base = registry.replace(/\/+$/, "");
  if (/^https?:\/\//.test(base)) {
    const url = `${base}/${file}`;
    let response: Response;
    try {
      response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    } catch (error) {
      throw new RegistryError(
        `Gagal menghubungi registry ${url}: ${(error as Error).message}`,
      );
    }
    if (response.status === 404)
      throw new RegistryError(`Tidak ditemukan di registry: ${url}`);
    if (!response.ok)
      throw new RegistryError(
        `Registry membalas ${response.status} untuk ${url}`,
      );
    return (await response.json()) as T;
  }

  const dir = base.startsWith("file:") ? fileURLToPath(base) : base;
  try {
    return JSON.parse(await readFile(`${dir}/${file}`, "utf8")) as T;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    throw new RegistryError(
      code === "ENOENT"
        ? `Tidak ditemukan di registry: ${dir}/${file}`
        : (error as Error).message,
    );
  }
}

const NAME = /^[a-z][a-z0-9-]*$/;

export function createRegistry(
  registry: string = process.env.MARKASUI_REGISTRY ?? DEFAULT_REGISTRY,
) {
  const cache = new Map<string, Promise<unknown>>();
  const cached = <T>(file: string) => {
    if (!cache.has(file)) {
      const pending = fetchJson<T>(registry, file);
      pending.catch(() => cache.delete(file));
      cache.set(file, pending);
    }
    return cache.get(file) as Promise<T>;
  };

  return {
    url: registry,
    index: () => cached<IndexItem[]>("index.json"),
    theme: () => cached<Theme>("theme.json"),
    component: (name: string) => {
      if (!NAME.test(name))
        return Promise.reject(
          new RegistryError(`Nama komponen tidak valid: "${name}"`),
        );
      return cached<RegistryItem>(`${name}.json`);
    },
  };
}

export type Registry = ReturnType<typeof createRegistry>;
