/**
 * Panel pengaturan props di halaman komponen. Setiap kontrol berupa select atau boolean dengan nilai
 * terbatas, karena preview Blade dirender di server: semua kombinasi di-pre-render saat build.
 * File ini tanpa dependensi agar bisa dibaca script build (node) maupun Astro.
 */
export type Framework = "blade" | "react" | "vue";
export type Scalar = string | number | boolean | null;

export type Control =
  | {
      name: string;
      type: "select";
      options: readonly string[];
      default: string;
    }
  | { name: string; type: "boolean"; default: boolean };

export type Values = Record<string, string | boolean>;
export type Built = { props: Record<string, Scalar>; children?: string };

export type Playground = {
  controls: Control[];
  build: (values: Values) => Built;
};

/** Batas kombinasi agar jumlah preview Blade yang di-pre-render tetap kecil. */
export const MAX_COMBINATIONS = 32;

const on = (value: string | boolean | undefined) => value === true;

export const PLAYGROUNDS: Record<string, Playground> = {
  button: {
    controls: [
      {
        name: "variant",
        type: "select",
        options: ["primary", "secondary", "ghost", "danger"],
        default: "primary",
      },
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg"],
        default: "md",
      },
      { name: "disabled", type: "boolean", default: false },
    ],
    build: (v) => ({
      props: {
        variant: v.variant as string,
        size: v.size as string,
        disabled: on(v.disabled),
      },
      children: "Button",
    }),
  },
  badge: {
    controls: [
      {
        name: "variant",
        type: "select",
        options: ["neutral", "primary", "success", "warning", "danger"],
        default: "neutral",
      },
    ],
    build: (v) => ({
      props: { variant: v.variant as string },
      children: "Badge",
    }),
  },
  alert: {
    controls: [
      {
        name: "variant",
        type: "select",
        options: ["info", "success", "warning", "danger"],
        default: "info",
      },
    ],
    build: (v) => ({
      props: { variant: v.variant as string, title: "Heads up" },
      children: "You can add components to your app with the CLI.",
    }),
  },
  input: {
    controls: [
      { name: "error", type: "boolean", default: false },
      { name: "disabled", type: "boolean", default: false },
    ],
    build: (v) => ({
      props: {
        label: "Email",
        type: "email",
        placeholder: "you@example.com",
        hint: "We never share your email.",
        error: on(v.error) ? "Enter a valid email address" : null,
        disabled: on(v.disabled),
      },
    }),
  },
  textarea: {
    controls: [
      { name: "error", type: "boolean", default: false },
      { name: "disabled", type: "boolean", default: false },
    ],
    build: (v) => ({
      props: {
        label: "Message",
        placeholder: "Type your message here",
        error: on(v.error) ? "Message is required" : null,
        disabled: on(v.disabled),
      },
    }),
  },
  checkbox: {
    controls: [
      { name: "description", type: "boolean", default: true },
      { name: "disabled", type: "boolean", default: false },
    ],
    build: (v) => ({
      props: {
        label: "Accept terms and conditions",
        description: on(v.description)
          ? "You agree to our terms of service."
          : null,
        disabled: on(v.disabled),
      },
    }),
  },
  switch: {
    controls: [{ name: "disabled", type: "boolean", default: false }],
    build: (v) => ({
      props: { label: "Airplane mode", disabled: on(v.disabled) },
    }),
  },
  progress: {
    controls: [
      {
        name: "value",
        type: "select",
        options: ["25", "60", "100", "indeterminate"],
        default: "60",
      },
    ],
    build: (v) => ({
      props: {
        label: "Uploading",
        value: v.value === "indeterminate" ? null : Number(v.value),
      },
    }),
  },
  skeleton: {
    controls: [
      {
        name: "shape",
        type: "select",
        options: ["rect", "circle"],
        default: "rect",
      },
    ],
    build: (v) => ({
      props: {
        shape: v.shape as string,
        class: v.shape === "circle" ? "size-12" : "h-4 w-48",
      },
    }),
  },
  avatar: {
    controls: [
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg"],
        default: "md",
      },
      { name: "image", type: "boolean", default: true },
    ],
    build: (v) => ({
      props: {
        name: "Rani Wulandari",
        size: v.size as string,
        src: on(v.image) ? "/demo/avatar.svg" : null,
      },
    }),
  },
  pagination: {
    controls: [
      { name: "page", type: "select", options: ["1", "5", "10"], default: "5" },
    ],
    build: (v) => ({
      props: { page: Number(v.page), total: 10, href: "?page={page}" },
    }),
  },
};

/** Semua kombinasi nilai kontrol, urutan tetap (dipakai sebagai kunci pre-render). */
export function combinations(controls: Control[]): Values[] {
  return controls.reduce<Values[]>(
    (all, control) =>
      all.flatMap((values) =>
        (control.type === "boolean" ? [false, true] : control.options).map(
          (option) => ({ ...values, [control.name]: option }),
        ),
      ),
    [{}],
  );
}

export const comboKey = (controls: Control[], values: Values) =>
  controls.map((c) => `${c.name}=${String(values[c.name])}`).join("|");

export const defaults = (controls: Control[]): Values =>
  Object.fromEntries(controls.map((c) => [c.name, c.default]));

const kebab = (name: string) =>
  name.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
const pascal = (name: string) =>
  name.replace(/(^|-)([a-z])/g, (_, __, char: string) => char.toUpperCase());

function attribute(
  framework: Framework,
  name: string,
  value: Scalar,
): string | null {
  if (value === null || value === false) return null;
  if (framework === "react") {
    const prop = name === "class" ? "className" : name;
    if (value === true) return prop;
    return typeof value === "number"
      ? `${prop}={${value}}`
      : `${prop}="${value}"`;
  }
  const attr = kebab(name);
  if (value === true) return attr;
  return typeof value === "number"
    ? `:${attr}="${value}"`
    : `${attr}="${value}"`;
}

/** Kode pemakaian untuk satu kombinasi; juga dipakai sebagai template Blade yang dirender. */
export function usageCode(
  name: string,
  framework: Framework,
  built: Built,
  options: { imports?: boolean } = {},
): string {
  const tag = framework === "blade" ? `x-markas.${name}` : pascal(name);
  const attrs = Object.entries(built.props)
    .map(([key, value]) => attribute(framework, key, value))
    .filter((attr): attr is string => attr !== null);
  const open =
    attrs.length > 3
      ? `<${tag}\n  ${attrs.join("\n  ")}\n`
      : `<${tag}${attrs.length ? ` ${attrs.join(" ")}` : ""}`;
  const element = built.children
    ? `${open}>${built.children}</${tag}>`
    : `${open}${attrs.length > 3 ? "" : " "}/>`;
  if (!options.imports || framework === "blade") return element;
  const imported =
    framework === "react"
      ? `import { ${pascal(name)} } from "@/components/markas/${pascal(name)}";`
      : `import ${pascal(name)} from "@/components/markas/${pascal(name)}.vue";`;
  return `${imported}\n\n${element}`;
}

export const exportName = pascal;
