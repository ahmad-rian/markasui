/**
 * Fixture examples/ yang tampil hidup di landing. Dipakai halaman landing dan juga oleh
 * scripts/page-css.ts, yang membangkitkan CSS landing hanya dari class fixture ini.
 */
export type LandingTile = {
  fixture: string;
  component: string;
  title: string;
  span: string;
};

/** Fixture di kartu hero. */
export const HERO_FIXTURE = "switch--card";

/** Di layar sempit tiga sel kecil disembunyikan supaya dinding tidak terlalu panjang. Grid 12 kolom di desktop; baris minimal 176px, jadi row-span-2 untuk fixture yang tinggi. */
export const LANDING_TILES: LandingTile[] = [
  {
    fixture: "dock",
    component: "dock",
    title: "Dock",
    span: "lg:col-span-7 lg:row-span-2",
  },
  {
    fixture: "dynamic-island",
    component: "dynamic-island",
    title: "Dynamic Island",
    span: "lg:col-span-5 lg:row-span-2",
  },
  {
    fixture: "currency-input",
    component: "currency-input",
    title: "Currency Input",
    span: "lg:col-span-4 lg:row-span-2",
  },
  {
    fixture: "card-stack",
    component: "card-stack",
    title: "Card Stack",
    span: "lg:col-span-5 lg:row-span-2",
  },
  {
    fixture: "command--icon-trigger",
    component: "command",
    title: "Command",
    span: "lg:col-span-3",
  },
  {
    fixture: "toggle-group",
    component: "toggle-group",
    title: "Toggle Group",
    span: "max-sm:hidden lg:col-span-3",
  },
  {
    fixture: "prompt-input",
    component: "prompt-input",
    title: "Prompt Input",
    span: "max-sm:hidden lg:col-span-7",
  },
  {
    fixture: "theme-toggle--in-navbar",
    component: "theme-toggle",
    title: "Theme Toggle",
    span: "max-sm:hidden lg:col-span-5",
  },
];

export const LANDING_FIXTURES = [
  HERO_FIXTURE,
  ...LANDING_TILES.map((tile) => tile.fixture),
];
