import type { Element, ElementContent, Root } from "hast";

/**
 * Bungkus setiap blok kode Markdown dengan bingkai dan tombol salin, sama seperti CodeBlock.astro.
 * Dipakai untuk halaman docs (content collection) dan bagian Pemakaian di halaman komponen.
 */
const COPY_PATH =
  "M8 8V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-3M5 8h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z";
const CHECK_PATH = "m5 12 5 5L20 7";

const svg = (path: string, className: string): Element => ({
  type: "element",
  tagName: "svg",
  properties: {
    className: className.split(" "),
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ariaHidden: "true",
  },
  children: [
    { type: "element", tagName: "path", properties: { d: path }, children: [] },
  ],
});

const frame = (pre: Element, copyLabel: string): Element => ({
  type: "element",
  tagName: "div",
  properties: {
    className: ["frame", "group", "relative", "not-prose"],
    dataCodeBlock: "",
  },
  children: [
    {
      type: "element",
      tagName: "button",
      properties: {
        type: "button",
        dataCopy: "",
        ariaLabel: copyLabel,
        dataLabelId: "Salin kode",
        className: [
          "icon-button",
          "absolute",
          "top-2.5",
          "right-2.5",
          "z-10",
          "size-8",
          "hover:bg-subtle",
        ],
      },
      children: [
        svg(COPY_PATH, "size-4 group-data-copied:hidden"),
        svg(CHECK_PATH, "hidden size-4 text-brand group-data-copied:block"),
      ],
    },
    {
      type: "element",
      tagName: "div",
      properties: { className: ["frame-panel", "overflow-hidden"] },
      children: [
        {
          type: "element",
          tagName: "div",
          properties: {
            className: [
              "overflow-x-auto",
              "px-4",
              "py-3.5",
              "pr-12",
              "font-mono",
              "text-[12.5px]",
              "leading-6",
            ],
            dataCode: "",
          },
          children: [pre],
        },
      ],
    },
  ],
});

/** Kode inline sepanjang ini atau lebih diberi titik patah <wbr>; yang lebih pendek tidak dipatah. */
const LONG_INLINE_CODE = 24;
/** Setelah / atau \ (kecuali "</"), dan sebelum . atau < yang menyambung kata. */
const BREAK_AT = /(?<=[^<][/\\])(?=[^/\\\s])|(?<=[\w)\]>])(?=[.<])/;

/**
 * Path, URL, dan potongan HTML panjang di kode inline dipatahkan di pemisahnya (/, ., <), bukan
 * di tengah kata seperti overflow-wrap: anywhere. <wbr> tidak ikut tersalin.
 */
const withBreakHints = (code: Element): Element => {
  const [only] = code.children;
  if (code.children.length !== 1 || only?.type !== "text") return code;
  // Token pendek seperti #[Computed] tidak boleh patah sama sekali (browser boleh patah sebelum "[").
  if (only.value.length < LONG_INLINE_CODE)
    return /\s/.test(only.value)
      ? code
      : {
          ...code,
          properties: { ...code.properties, className: ["whitespace-nowrap"] },
        };
  const parts = only.value.split(BREAK_AT);
  if (parts.length < 2) return code;
  return {
    ...code,
    children: parts.flatMap((value, index): ElementContent[] => [
      ...(index > 0
        ? [
            {
              type: "element",
              tagName: "wbr",
              properties: {},
              children: [],
            } as Element,
          ]
        : []),
      { type: "text", value },
    ]),
  };
};

export function rehypeCodeFrame(options: { copyLabel?: string } = {}) {
  const copyLabel = options.copyLabel ?? "Copy code";
  const walk = (node: Root | Element) => {
    node.children = node.children.map((child): ElementContent => {
      if (child.type !== "element") return child as ElementContent;
      if (child.tagName === "pre") return frame(child, copyLabel);
      if (child.tagName === "code") return withBreakHints(child);
      walk(child);
      // Tabel lebar bergeser di dalam wadahnya sendiri, bukan melebarkan halaman di layar sempit.
      if (child.tagName === "table")
        return {
          type: "element",
          tagName: "div",
          // tabindex: wadah yang bisa digeser wajib terjangkau keyboard (axe scrollable-region-focusable).
          properties: { className: ["table-wrap"], tabIndex: 0 },
          children: [child],
        };
      return child;
    }) as typeof node.children;
  };
  return (tree: Root) => walk(tree);
}
