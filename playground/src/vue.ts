import { createApp, type Component } from "vue";
import { fixtureName, fixtureRoot, markReady, missingFixture } from "./fixture";

const fixtures = import.meta.glob<{ default: Component }>(
  "../../examples/vue/*.vue",
  { eager: true },
);
const name = fixtureName();
const fixture =
  fixtures[`../../examples/vue/${name}.vue`] ?? missingFixture("Vue", name);

createApp(fixture.default).mount(fixtureRoot());
markReady();
