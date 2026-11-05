import type { ComponentType } from "react";

const templates = import.meta.glob<{ default: ComponentType }>(
  "../../../../../templates/*/react/*.tsx",
  { eager: true },
);

/** Template versi React sebagai island halaman demo. */
export default function TemplateReact({ name }: { name: string }) {
  const entry = Object.entries(templates).find(([path]) =>
    path.includes(`/templates/${name}/react/`),
  );
  const Template = entry?.[1].default;
  return Template ? <Template /> : null;
}
