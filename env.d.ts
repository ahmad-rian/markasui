declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}

declare module "alpinejs" {
  const Alpine: { start(): void };
  export default Alpine;
}

declare module "*.astro" {
  import type { AstroComponentFactory } from "astro/runtime/server/index.js";
  const component: AstroComponentFactory;
  export default component;
}
