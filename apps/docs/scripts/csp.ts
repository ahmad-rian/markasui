/**
 * Writes the nginx CSP snippet for a built site (runs after astro build and pagefind).
 * Usage: node scripts/csp.ts [dist]
 * Output: <dist>/.csp-nginx.conf, installed on the server by scripts/deploy.sh.
 */
import { writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import {
  SNIPPET_FILE,
  buildPolicy,
  collectSite,
  nginxSnippet,
} from "./csp-policy.ts";

const dist = resolve(process.argv[2] ?? "dist");
const inline = await collectSite(dist);
const policy = buildPolicy(inline);
await writeFile(join(dist, SNIPPET_FILE), nginxSnippet(policy, inline));
console.log(
  `csp: ${inline.scripts.size} script and ${inline.handlers.size} handler hashes, ${policy.length} bytes -> ${SNIPPET_FILE}`,
);
