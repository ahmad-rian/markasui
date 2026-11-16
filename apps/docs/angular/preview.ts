/**
 * Entry bundle preview Angular di situs docs (dibangun oleh scripts/angular-previews.ts ke
 * public/angular/). Setiap contoh jadi chunk sendiri; runtime Angular hanya diunduh saat pengunjung
 * memilih Angular.
 */
import {
  createComponent,
  provideZonelessChangeDetection,
  type ApplicationRef,
  type Type,
} from "@angular/core";
import { createApplication } from "@angular/platform-browser";

const examples = import.meta.glob<{ default: Type<unknown> }>(
  "../../../examples/angular/*.ts",
);
/** Template (templates/<slug>/angular/<slug>.component.ts), dipakai halaman /demo/templates/<slug>/angular. */
const templates = import.meta.glob<{ default: Type<unknown> }>(
  "../../../templates/*/angular/*.component.ts",
);
let app: Promise<ApplicationRef> | undefined;

async function attach(
  host: HTMLElement,
  load: (() => Promise<{ default: Type<unknown> }>) | undefined,
): Promise<boolean> {
  if (!load) return false;
  app ??= createApplication({
    providers: [provideZonelessChangeDetection()],
  });
  const [appRef, module] = await Promise.all([app, load()]);
  const ref = createComponent(module.default, {
    environmentInjector: appRef.injector,
    hostElement: host,
  });
  appRef.attachView(ref.hostView);
  ref.changeDetectorRef.detectChanges();
  return true;
}

/** Pasang contoh `name` di dalam `host`. False kalau contohnya belum ada. */
export const mount = (host: HTMLElement, name: string): Promise<boolean> =>
  attach(host, examples[`../../../examples/angular/${name}.ts`]);

/** Pasang template `slug` di dalam `host`. False kalau versi Angular-nya belum ada. */
export const mountTemplate = (
  host: HTMLElement,
  slug: string,
): Promise<boolean> =>
  attach(
    host,
    templates[`../../../templates/${slug}/angular/${slug}.component.ts`],
  );
