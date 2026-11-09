import {
  availableFrameworks,
  FRAMEWORKS,
  type Framework,
  type RegistryItem,
} from "@markasui/registry/schema";
import { FRAMEWORK_LABELS } from "./frameworks";
import { localePath, type Locale } from "./i18n";
import { categoryLabel, localized } from "./registry";

export const FRAMEWORK_FENCE: Record<Framework, string> = {
  blade: "blade",
  react: "tsx",
  vue: "vue",
  svelte: "svelte",
  astro: "astro",
  angular: "ts",
};

/** Bagian usage.md per framework ("## Blade" sampai "## Angular") plus catatan ("## Notes" / "## Catatan"). */
export function splitUsage(usage: string): Record<Framework | "notes", string> {
  const sections: Record<string, string> = {};
  for (const block of usage.split(/^## /m).filter(Boolean)) {
    const newline = block.indexOf("\n");
    sections[block.slice(0, newline).trim().toLowerCase()] = block
      .slice(newline + 1)
      .trim();
  }
  return {
    ...(Object.fromEntries(
      FRAMEWORKS.map((framework) => [framework, sections[framework] ?? ""]),
    ) as Record<Framework, string>),
    notes: sections.notes ?? sections.catatan ?? "",
  };
}

const PROMPT = {
  en: {
    intro: (title: string, framework: string) =>
      `Add the ${title} component from MarkasUI to my ${framework} project.`,
    rules: "Rules:",
    save: (target: string) => `Save the file at ${target}.`,
    css: (url: string) =>
      `Make sure markas.css is imported. If not, follow ${url}.`,
    keep: "Do not change the core Tailwind classes or the color token names.",
    deps: (deps: string) => `Install the dependency: ${deps}.`,
    code: "Component code:",
    usage: "Usage:",
  },
  id: {
    intro: (title: string, framework: string) =>
      `Tambahkan komponen ${title} dari MarkasUI ke project ${framework} saya.`,
    rules: "Aturan:",
    save: (target: string) => `Simpan file di ${target}.`,
    css: (url: string) =>
      `Pastikan markas.css sudah di-import. Kalau belum, ikuti ${url}.`,
    keep: "Jangan ubah class Tailwind inti dan nama token warna.",
    deps: (deps: string) => `Pastikan dependensi terpasang: ${deps}.`,
    code: "Kode komponen:",
    usage: "Contoh pemakaian:",
  },
} satisfies Record<Locale, unknown>;

/** Template Copy prompt dari PRD bagian 9, dalam bahasa halaman. */
export function buildPrompt(
  item: RegistryItem,
  framework: Framework,
  siteUrl: string,
  locale: Locale,
): string {
  const strings = PROMPT[locale];
  const text = localized(item, locale);
  const file = item.frameworks[framework];
  if (!file) throw new Error(`${item.name} belum tersedia untuk ${framework}`);
  const rules = [
    strings.save(file.target),
    strings.css(
      new URL(localePath(locale, "/docs/installation"), siteUrl).toString(),
    ),
    strings.keep,
    ...(file.deps.length ? [strings.deps(file.deps.join(", "))] : []),
    ...text.ai.rules,
  ];
  return `${strings.intro(item.title, FRAMEWORK_LABELS[framework])}

${strings.rules}
${rules.map((rule) => `- ${rule}`).join("\n")}

${strings.code}
\`\`\`${FRAMEWORK_FENCE[framework]}
${file.code.trim()}
\`\`\`

${strings.usage}
${splitUsage(text.usage)[framework]}
`;
}

const MARKDOWN = {
  en: {
    category: "Category",
    status: "Status",
    whenToUse: "When to use",
    code: "Code",
    saveAt: (target: string) => `Save at \`${target}\`.`,
    deps: (deps: string) => `Dependencies: ${deps}.`,
    noDeps: "No extra dependencies.",
    props: "Props",
    table: "| Name | Type | Default | Description |",
    accessibility: "Accessibility",
    notes: "Notes",
  },
  id: {
    category: "Kategori",
    status: "Status",
    whenToUse: "Kapan dipakai",
    code: "Kode",
    saveAt: (target: string) => `Simpan di \`${target}\`.`,
    deps: (deps: string) => `Dependensi: ${deps}.`,
    noDeps: "Tanpa dependensi tambahan.",
    props: "Props",
    table: "| Nama | Tipe | Default | Keterangan |",
    accessibility: "Aksesibilitas",
    notes: "Catatan",
  },
} satisfies Record<Locale, unknown>;

/** Versi Markdown halaman komponen (/components/[name].md dan llms-full.txt). */
export function componentMarkdown(
  item: RegistryItem,
  siteUrl: string,
  locale: Locale,
): string {
  const strings = MARKDOWN[locale];
  const text = localized(item, locale);
  const usage = splitUsage(text.usage);
  const frameworks = availableFrameworks(item)
    .map((framework) => {
      const file = item.frameworks[framework]!;
      const deps = file.deps.length
        ? strings.deps(file.deps.join(", "))
        : strings.noDeps;
      return `### ${FRAMEWORK_LABELS[framework]}

${strings.saveAt(file.target)} ${deps}

\`\`\`${FRAMEWORK_FENCE[framework]}
${file.code.trim()}
\`\`\`

${usage[framework]}`;
    })
    .join("\n\n");

  const props = text.props.map(
    (prop) =>
      `| \`${prop.name}\` | \`${prop.type.replaceAll("|", "\\|")}\` | ${prop.default} | ${prop.description} |`,
  );

  return `# ${item.title}

${text.description}

- ${strings.category}: ${categoryLabel(item.category, locale)}
- ${strings.status}: ${item.status}
- Registry: ${new URL(`/r/${item.name}.json`, siteUrl)}
- CLI: \`npx markasui@latest add ${item.name}\`

## ${strings.whenToUse}

${text.ai.whenToUse}

${text.ai.rules.map((rule) => `- ${rule}`).join("\n")}

## ${strings.code}

${frameworks}

## ${strings.props}

${strings.table}
| --- | --- | --- | --- |
${props.join("\n")}

## ${strings.accessibility}

${text.a11y.map((note) => `- ${note}`).join("\n")}
${usage.notes ? `\n## ${strings.notes}\n\n${usage.notes}\n` : ""}`;
}
