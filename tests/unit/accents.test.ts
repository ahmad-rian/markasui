import { describe, expect, test } from "vitest";
import { ACCENTS } from "../../apps/docs/src/lib/accents";

/** Token permukaan markas.css yang menjadi latar teks beraksen. */
const SURFACES = {
  light: {
    canvas: "#f4f4f1",
    surface: "#ffffff",
    subtle: "#ecece8",
    ink: "#121412",
    muted: "#5e625d",
  },
  dark: {
    canvas: "#0e110e",
    surface: "#151915",
    subtle: "#1c211c",
    ink: "#f2f4f1",
    muted: "#a3a9a2",
  },
} as const;
const AA_TEXT = 4.5;

const channel = (value: number) => {
  const srgb = value / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((index) =>
    channel(parseInt(hex.slice(index, index + 2), 16)),
  );
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
};
const contrast = (a: string, b: string) => {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high! + 0.05) / (low! + 0.05);
};

describe("aksen template lolos kontras AA", () => {
  for (const accent of ACCENTS) {
    for (const mode of ["light", "dark"] as const) {
      test(`${accent.name} (${mode})`, () => {
        const tokens = accent[mode];
        const base = SURFACES[mode];
        const pairs: [string, string, string][] = [
          ["primary di canvas", tokens.primary, base.canvas],
          ["primary di surface", tokens.primary, base.surface],
          ["primary di subtle", tokens.primary, base.subtle],
          ["primary di primary-soft", tokens.primary, tokens.soft],
          ["on-primary di primary", tokens.on, tokens.primary],
          ["on-primary di primary-strong", tokens.on, tokens.strong],
          ["ink di primary-soft", base.ink, tokens.soft],
          ["muted di primary-soft", base.muted, tokens.soft],
        ];
        const failing = pairs
          .map(([label, fg, bg]) => ({
            label,
            ratio: Number(contrast(fg, bg).toFixed(2)),
          }))
          .filter(({ ratio }) => ratio < AA_TEXT);
        expect(failing).toEqual([]);
      });
    }
  }
});
