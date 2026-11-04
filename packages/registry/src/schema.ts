import { z } from "zod";

export const FRAMEWORKS = ["blade", "react", "vue"] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export const CATEGORIES = [
  "form",
  "feedback",
  "overlay",
  "navigation",
  "data",
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

export const metaSchema = z.strictObject({
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
});

export type ComponentMeta = z.infer<typeof metaSchema>;

export type RegistryFile = ComponentMeta["frameworks"][Framework] & {
  /** Path tujuan default di project user. */
  target: string;
  code: string;
};

export type RegistryItem = Omit<ComponentMeta, "frameworks"> & {
  frameworks: Record<Framework, RegistryFile>;
  usage: string;
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
