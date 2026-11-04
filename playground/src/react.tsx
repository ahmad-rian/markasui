import { createElement, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { fixtureName, fixtureRoot, markReady, missingFixture } from "./fixture";

const fixtures = import.meta.glob<{ default: ComponentType }>(
  "../../examples/react/*.tsx",
  { eager: true },
);
const name = fixtureName();
const fixture =
  fixtures[`../../examples/react/${name}.tsx`] ?? missingFixture("React", name);

createRoot(fixtureRoot()).render(createElement(fixture.default));
markReady();
