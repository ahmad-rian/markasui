import { mount, type Component } from "svelte";
import { fixtureName, fixtureRoot, markReady, missingFixture } from "./fixture";

const fixtures = import.meta.glob<{ default: Component }>(
  "../../examples/svelte/*.svelte",
  { eager: true },
);
const name = fixtureName();
const fixture =
  fixtures[`../../examples/svelte/${name}.svelte`] ??
  missingFixture("Svelte", name);

mount(fixture.default, { target: fixtureRoot() });
markReady();
