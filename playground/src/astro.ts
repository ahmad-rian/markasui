import { mountAstroHtml } from "./astro-html";
import { fixtureName, fixtureRoot, markReady } from "./fixture";

// HTML dan script dibuat oleh scripts/render-astro.ts (astro build) ke public/astro/.
await mountAstroHtml(`/astro/${fixtureName()}.html`, fixtureRoot());
markReady();
