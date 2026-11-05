import { z } from "zod";

export const FRAMEWORKS = ["blade", "react", "vue"] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export const CATEGORIES = [
  "form",
  "feedback",
  "overlay",
  "navigation",
  "data",
  "animation",
  "background",
  "button",
] as const;

/** Dependensi runtime yang boleh dipakai komponen inti (PRD bagian 10). */
export const ALLOWED_DEPS: Record<Framework, readonly string[]> = {
  blade: ["alpinejs"],
  react: [],
  vue: [],
};

const frameworkFile = (framework: Framework) =>
  z.object({
    file: z.string().min(1),
    deps: z
      .array(z.string())
      .refine(
        (deps) => deps.every((dep) => ALLOWED_DEPS[framework].includes(dep)),
        {
          message: `${framework} hanya boleh memakai dependensi: ${ALLOWED_DEPS[framework].join(", ") || "tidak ada"}`,
        },
      ),
  });

/** Bahasa situs dan registry. Inggris adalah bahasa utama; terjemahan lain wajib lengkap. */
export const LOCALES = ["en", "id"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

const translationSchema = z.strictObject({
  description: z.string().min(1).max(160),
  /** Keterangan prop per nama prop. */
  props: z.record(z.string(), z.string().min(1)),
  a11y: z.array(z.string().min(1)).min(1),
  ai: z.strictObject({
    whenToUse: z.string().min(1),
    rules: z.array(z.string().min(1)),
  }),
});

export const metaSchema = z
  .strictObject({
    name: z.string().regex(/^[a-z][a-z0-9-]*$/, "nama harus kebab-case"),
    title: z.string().min(1),
    description: z.string().min(1).max(160),
    category: z.enum(CATEGORIES),
    tags: z.array(z.string().min(1)).min(1),
    status: z.enum(["stable", "beta", "deprecated"]),
    frameworks: z.strictObject({
      blade: frameworkFile("blade"),
      react: frameworkFile("react"),
      vue: frameworkFile("vue"),
    }),
    props: z.array(
      z.strictObject({
        name: z.string().min(1),
        type: z.string().min(1),
        default: z.string(),
        description: z.string().min(1),
      }),
    ),
    a11y: z.array(z.string().min(1)).min(1),
    ai: z.strictObject({
      whenToUse: z.string().min(1),
      rules: z.array(z.string().min(1)),
    }),
    addedAt: z.iso.date(),
    updatedAt: z.iso.date().optional(),
    i18n: z.strictObject({ id: translationSchema }),
  })
  .superRefine((meta, ctx) => {
    const id = meta.i18n.id;
    const propNames = meta.props.map((prop) => prop.name);
    const missing = propNames.filter((name) => !(name in id.props));
    const extra = Object.keys(id.props).filter(
      (name) => !propNames.includes(name),
    );
    if (missing.length || extra.length) {
      ctx.addIssue({
        code: "custom",
        path: ["i18n", "id", "props"],
        message: `terjemahan props harus sama dengan props (kurang: ${missing.join(", ") || "-"}, lebih: ${extra.join(", ") || "-"})`,
      });
    }
    if (id.a11y.length !== meta.a11y.length) {
      ctx.addIssue({
        code: "custom",
        path: ["i18n", "id", "a11y"],
        message: "jumlah catatan a11y harus sama dengan versi Inggris",
      });
    }
    if (id.ai.rules.length !== meta.ai.rules.length) {
      ctx.addIssue({
        code: "custom",
        path: ["i18n", "id", "ai", "rules"],
        message: "jumlah aturan AI harus sama dengan versi Inggris",
      });
    }
  });

export type ComponentMeta = z.infer<typeof metaSchema>;

export type RegistryFile = ComponentMeta["frameworks"][Framework] & {
  /** Path tujuan default di project user. */
  target: string;
  code: string;
};

export type ComponentTranslation = ComponentMeta["i18n"]["id"] & {
  usage: string;
};

export type RegistryItem = Omit<ComponentMeta, "frameworks" | "i18n"> & {
  frameworks: Record<Framework, RegistryFile>;
  /** usage.md dalam bahasa Inggris. */
  usage: string;
  /** Terjemahan Indonesia, termasuk usage.id.md. */
  i18n: { id: ComponentTranslation };
};

export type RegistryIndexItem = Pick<
  ComponentMeta,
  | "name"
  | "title"
  | "description"
  | "category"
  | "tags"
  | "status"
  | "addedAt"
  | "updatedAt"
>;

export type ThemeToken = { name: string; light: string; dark: string };
export type RegistryTheme = { css: string; tokens: ThemeToken[] };
