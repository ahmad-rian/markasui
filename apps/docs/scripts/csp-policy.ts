/**
 * Content-Security-Policy for the docs site, built from the static output.
 *
 * Why hashes over the whole site instead of per page: Base.astro uses <ClientRouter />, which runs the inline
 * scripts of the next page inside the document that was loaded first, so that first document's policy must
 * already allow every inline script on the site. The policy is served as one nginx header (see deploy/nginx).
 *
 * Remaining relaxations, and why:
 * - 'unsafe-eval': Alpine.js (Blade previews) compiles x-* expressions with the Function constructor. The CSP
 *   build of Alpine would remove this but is a different package with a reduced expression syntax.
 * - 'wasm-unsafe-eval': Pagefind search runs its index in WebAssembly.
 * - 'unsafe-hashes' + one hash: Svelte 5 server output puts onload/onerror="this.__e=event" on <img> so it can
 *   replay load events after hydration. Only the exact handler bodies found in the build are allowed.
 * - style-src 'unsafe-inline': components, Shiki and the previews use style="" attributes and inline <style>.
 */
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

/** Name of the generated nginx snippet, written next to the HTML so it ships with the same build. */
export const SNIPPET_FILE = ".csp-nginx.conf";

/** nginx variable that holds the policy; deploy/nginx/markas.jenderalcorp.com.conf reads it. */
export const POLICY_VARIABLE = "$markas_csp_policy";

type Directives = Readonly<Record<string, readonly string[]>>;

const BASE_SCRIPT_SRC = ["'self'", "'unsafe-eval'", "'wasm-unsafe-eval'"];

const BASE_DIRECTIVES: Directives = {
  "default-src": ["'self'"],
  "script-src": BASE_SCRIPT_SRC,
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "blob:"],
  "font-src": ["'self'", "data:"],
  "connect-src": ["'self'"],
  "media-src": ["'self'", "blob:"],
  // Pagefind starts a same-origin worker; lottie-web builds its loader worker from a blob URL.
  "worker-src": ["'self'", "blob:"],
  "frame-src": ["'self'"],
  "manifest-src": ["'self'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  // Template and page detail pages embed /demo/* in same-origin iframes.
  "frame-ancestors": ["'self'"],
  "upgrade-insecure-requests": [],
};

/** Script types the browser does not execute (data blocks), so CSP does not apply to them. */
const DATA_SCRIPT_TYPES = new Set([
  "application/json",
  "application/ld+json",
  "importmap",
  "speculationrules",
]);

const SCRIPT_TAG = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
const START_TAG = /<[a-z][\w-]*\s[^<>]*>/gi;
/** Lowercase names and quoted values only: skips JSX in code samples and JS text inside x-data values. */
const HANDLER_ATTR = /\son[a-z]+=(?:"([^"]*)"|'([^']*)')/g;
const ENTITIES: Readonly<Record<string, string>> = {
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
  "&lt;": "<",
  "&gt;": ">",
};

export const sha256 = (text: string) =>
  `'sha256-${createHash("sha256").update(text, "utf8").digest("base64")}'`;

const decodeAttribute = (value: string) =>
  value.replace(
    /&(?:amp|quot|#39|#x27|lt|gt);/g,
    (entity) => ENTITIES[entity] ?? entity,
  );

const scriptType = (attributes: string) =>
  /\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attributes)?.[1]?.toLowerCase();

export interface InlineCode {
  scripts: ReadonlySet<string>;
  handlers: ReadonlySet<string>;
}

/** Hashes of the inline scripts and inline event handler attributes in one HTML document. */
export function collectInline(html: string): InlineCode {
  const scripts = new Set<string>();
  for (const [, attributes = "", body = ""] of html.matchAll(SCRIPT_TAG)) {
    if (/\ssrc\s*=/i.test(` ${attributes}`)) continue;
    const type = scriptType(attributes);
    if (type && DATA_SCRIPT_TYPES.has(type)) continue;
    scripts.add(sha256(body));
  }
  const handlers = new Set<string>();
  for (const [tag] of html.matchAll(START_TAG)) {
    for (const match of tag.matchAll(HANDLER_ATTR)) {
      handlers.add(sha256(decodeAttribute(match[1] ?? match[2] ?? "")));
    }
  }
  return { scripts, handlers };
}

async function htmlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => join(entry.parentPath, entry.name))
    .sort();
}

/** Union of the inline hashes over every HTML file in a build folder. */
export async function collectSite(dir: string): Promise<InlineCode> {
  const scripts = new Set<string>();
  const handlers = new Set<string>();
  for (const file of await htmlFiles(dir)) {
    const found = collectInline(await readFile(file, "utf8"));
    found.scripts.forEach((hash) => scripts.add(hash));
    found.handlers.forEach((hash) => handlers.add(hash));
  }
  return { scripts, handlers };
}

/** Policy string with sorted hashes, so the same build always gives the same header. */
export function buildPolicy({ scripts, handlers }: InlineCode): string {
  const handlerSources =
    handlers.size > 0 ? ["'unsafe-hashes'", ...[...handlers].sort()] : [];
  const directives: Directives = {
    ...BASE_DIRECTIVES,
    "script-src": [
      ...BASE_SCRIPT_SRC,
      ...handlerSources,
      ...[...scripts].sort(),
    ],
  };
  return Object.entries(directives)
    .map(([name, sources]) => [name, ...sources].join(" "))
    .join("; ");
}

/** nginx rejects a single config parameter longer than 4096 bytes, so the policy is stored in parts. */
const NGINX_PART_LENGTH = 3000;
const PART_VARIABLE = "markas_csp_part";

/**
 * nginx snippet (http context) that defines the policy variable for the site config: one map per part, then a
 * map that joins them (map values may combine variables).
 */
export function nginxSnippet(policy: string, inline: InlineCode): string {
  if (/["$\\{}\n]/.test(policy)) {
    throw new Error("CSP contains a character nginx would interpret");
  }
  const parts = Array.from(
    { length: Math.ceil(policy.length / NGINX_PART_LENGTH) },
    (_, index) =>
      policy.slice(index * NGINX_PART_LENGTH, (index + 1) * NGINX_PART_LENGTH),
  );
  const joined = parts
    .map((_, index) => `\${${PART_VARIABLE}${index}}`)
    .join("");
  return [
    "# Generated by apps/docs/scripts/csp.ts from the built site. Do not edit by hand.",
    `# ${inline.scripts.size} inline script hashes, ${inline.handlers.size} inline handler hashes.`,
    ...parts.map(
      (part, index) =>
        `map $host $${PART_VARIABLE}${index} {\n    default "${part}";\n}`,
    ),
    `map $host ${POLICY_VARIABLE} {\n    default "${joined}";\n}`,
    "",
  ].join("\n");
}

/** Reads the policy back out of a generated snippet. */
export function policyFromSnippet(snippet: string): string {
  const pattern = new RegExp(
    `map \\$host \\$${PART_VARIABLE}(\\d+) \\{\\s*default "([^"]*)";`,
    "g",
  );
  const parts = [...snippet.matchAll(pattern)]
    .sort((a, b) => Number(a[1]) - Number(b[1]))
    .map((match) => match[2]);
  if (parts.length === 0) throw new Error("No policy found in the CSP snippet");
  return parts.join("");
}
