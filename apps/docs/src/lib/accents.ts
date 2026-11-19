/**
 * Warna aksen untuk pratinjau template. Hanya mengganti token primary MarkasUI,
 * jadi template yang memakai bg-primary dan kawan-kawan ikut berubah.
 */
type Tokens = {
  primary: string;
  strong: string;
  on: string;
  soft: string;
  line: string;
};
export type Accent = {
  name: string;
  label: string;
  swatch: string;
  light: Tokens;
  dark: Tokens;
};

export const ACCENTS: Accent[] = [
  {
    name: "neutral",
    label: "Neutral",
    swatch: "#121412",
    light: {
      primary: "#121412",
      strong: "#2c312c",
      on: "#ffffff",
      soft: "#ececea",
      line: "#d2d4cf",
    },
    dark: {
      primary: "#f2f4f1",
      strong: "#d6dad5",
      on: "#0e110e",
      soft: "#232823",
      line: "#3a403a",
    },
  },
  {
    name: "green",
    label: "Green",
    swatch: "#13773a",
    light: {
      primary: "#13773a",
      strong: "#166534",
      on: "#ffffff",
      soft: "#dcfce7",
      line: "#86efac",
    },
    dark: {
      primary: "#4ade80",
      strong: "#22c55e",
      on: "#052e16",
      soft: "#12301c",
      line: "#1f5130",
    },
  },
  {
    name: "emerald",
    label: "Emerald",
    swatch: "#047857",
    light: {
      primary: "#047857",
      strong: "#065f46",
      on: "#ffffff",
      soft: "#d1fae5",
      line: "#6ee7b7",
    },
    dark: {
      primary: "#34d399",
      strong: "#10b981",
      on: "#022c22",
      soft: "#0b2e24",
      line: "#14503f",
    },
  },
  {
    name: "teal",
    label: "Teal",
    swatch: "#0f766e",
    light: {
      primary: "#0f766e",
      strong: "#115e59",
      on: "#ffffff",
      soft: "#ccfbf1",
      line: "#5eead4",
    },
    dark: {
      primary: "#2dd4bf",
      strong: "#14b8a6",
      on: "#042f2c",
      soft: "#0f2d2a",
      line: "#18504a",
    },
  },
  {
    name: "sky",
    label: "Sky",
    swatch: "#0369a1",
    light: {
      primary: "#0369a1",
      strong: "#075985",
      on: "#ffffff",
      soft: "#e0f2fe",
      line: "#7dd3fc",
    },
    dark: {
      primary: "#38bdf8",
      strong: "#0ea5e9",
      on: "#082f49",
      soft: "#0c2a3d",
      line: "#164e6e",
    },
  },
  {
    name: "blue",
    label: "Blue",
    swatch: "#1d4ed8",
    light: {
      primary: "#1d4ed8",
      strong: "#1e40af",
      on: "#ffffff",
      soft: "#dbeafe",
      line: "#93c5fd",
    },
    dark: {
      primary: "#60a5fa",
      strong: "#3b82f6",
      on: "#0b1b3a",
      soft: "#13233f",
      line: "#1e3a66",
    },
  },
  {
    name: "indigo",
    label: "Indigo",
    swatch: "#4338ca",
    light: {
      primary: "#4338ca",
      strong: "#3730a3",
      on: "#ffffff",
      soft: "#e0e7ff",
      line: "#a5b4fc",
    },
    dark: {
      primary: "#818cf8",
      strong: "#7c83f6",
      on: "#1e1b4b",
      soft: "#1c1d42",
      line: "#33366e",
    },
  },
  {
    name: "violet",
    label: "Violet",
    swatch: "#6d28d9",
    light: {
      primary: "#6d28d9",
      strong: "#5b21b6",
      on: "#ffffff",
      soft: "#ede9fe",
      line: "#c4b5fd",
    },
    dark: {
      primary: "#a78bfa",
      strong: "#9370f7",
      on: "#1c0f3d",
      soft: "#261b45",
      line: "#3f2d70",
    },
  },
  {
    name: "rose",
    label: "Rose",
    swatch: "#be123c",
    light: {
      primary: "#be123c",
      strong: "#9f1239",
      on: "#ffffff",
      soft: "#ffe4e6",
      line: "#fda4af",
    },
    dark: {
      primary: "#fb7185",
      strong: "#f43f5e",
      on: "#2d0611",
      soft: "#3a1620",
      line: "#612433",
    },
  },
  {
    name: "red",
    label: "Red",
    swatch: "#b91c1c",
    light: {
      primary: "#b91c1c",
      strong: "#991b1b",
      on: "#ffffff",
      soft: "#fee2e2",
      line: "#fca5a5",
    },
    dark: {
      primary: "#f87171",
      strong: "#ef4444",
      on: "#2b0707",
      soft: "#3a1616",
      line: "#632525",
    },
  },
  {
    name: "orange",
    label: "Orange",
    swatch: "#b93e0b",
    light: {
      primary: "#b93e0b",
      strong: "#9a3412",
      on: "#ffffff",
      soft: "#ffedd5",
      line: "#fdba74",
    },
    dark: {
      primary: "#fb923c",
      strong: "#f97316",
      on: "#2a1205",
      soft: "#35200f",
      line: "#5c3415",
    },
  },
  {
    name: "amber",
    label: "Amber",
    swatch: "#a84d08",
    light: {
      primary: "#a84d08",
      strong: "#92400e",
      on: "#ffffff",
      soft: "#fef3c7",
      line: "#fcd34d",
    },
    dark: {
      primary: "#fbbf24",
      strong: "#f59e0b",
      on: "#2a1a03",
      soft: "#33260b",
      line: "#5c4512",
    },
  },
];

const declarations = (tokens: Tokens) =>
  `--markas-primary:${tokens.primary};--markas-primary-strong:${tokens.strong};--markas-on-primary:${tokens.on};--markas-primary-soft:${tokens.soft};--markas-primary-line:${tokens.line};`;

/** CSS untuk html[data-accent=...], terang dan gelap. Spesifisitasnya mengalahkan :root dan .dark di markas.css. */
export const accentCss = (): string =>
  ACCENTS.filter((accent) => accent.name !== "neutral")
    .map(
      (accent) =>
        `html[data-accent="${accent.name}"]{${declarations(accent.light)}}html.dark[data-accent="${accent.name}"]{${declarations(accent.dark)}}`,
    )
    .join("");

/** Aksen bawaan bila meta.json template tidak menyebutnya. */
export const DEFAULT_ACCENT = "neutral";

/** Nama aksen yang dikenal pemilih warna (dipakai validasi meta.json dan parameter ?accent=). */
export const isAccentName = (value: unknown): value is string =>
  ACCENTS.some((accent) => accent.name === value);
