import {
  createComponent,
  provideZonelessChangeDetection,
  type Type,
} from "@angular/core";
import { createApplication } from "@angular/platform-browser";
import { fixtureName, fixtureRoot, markReady, missingFixture } from "./fixture";

const fixtures = import.meta.glob<{ default: Type<unknown> }>(
  "../../examples/angular/*.ts",
  { eager: true },
);
const name = fixtureName();
const fixture =
  fixtures[`../../examples/angular/${name}.ts`] ??
  missingFixture("Angular", name);

// Fixture dirender ke dalam #fixture lewat elemen host sendiri (display: contents),
// supaya class wrapper #fixture tidak ikut diubah Angular.
const app = await createApplication({
  providers: [provideZonelessChangeDetection()],
});
const host = document.createElement("div");
host.className = "contents";
fixtureRoot().append(host);
const ref = createComponent(fixture.default, {
  environmentInjector: app.injector,
  hostElement: host,
});
app.attachView(ref.hostView);
ref.changeDetectorRef.detectChanges();
markReady();
