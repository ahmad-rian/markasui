import Alpine from "alpinejs";
import { fixtureName, fixtureRoot, markReady } from "./fixture";

// HTML dibuat oleh scripts/render-blade.php (pnpm blade:playground).
const name = fixtureName();
const response = await fetch(`/blade/${name}.html`);
if (!response.ok)
  throw new Error(`Fixture Blade "${name}" tidak ada (${response.status})`);

fixtureRoot().innerHTML = await response.text();
Alpine.start();
markReady();
