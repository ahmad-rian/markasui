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
let app: Promise<ApplicationRef> | undefined;

/** Pasang contoh `name` di dalam `host`. False kalau contohnya belum ada. */
export async function mount(host: HTMLElement, name: string): Promise<boolean> {
  const load = examples[`../../../examples/angular/${name}.ts`];
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
