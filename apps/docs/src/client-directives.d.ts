export {};

declare module "astro" {
  interface AstroClientDirectives {
    /** Hydrate saat pane framework mendekati viewport (src/lib/client-near.ts). */
    "client:near"?: boolean;
  }
}
