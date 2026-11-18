/**
 * Versi Markdown dan prompt AI untuk halaman detail template (/templates/<slug>) dan page (/pages/<slug>).
 * Kode template besar, jadi Markdown dan prompt menautkan file source alih-alih menyalinnya.
 */
import type { Framework, RegistryItem } from "@markasui/registry/schema";
import { FRAMEWORK_LABELS } from "./frameworks";
import { LOCALES, localePath, type Locale } from "./i18n";
import { getComponents, localized } from "./registry";
import { frameworkList } from "./seo";
import { SITE } from "./site";
import {
  TEMPLATE_FRAMEWORKS,
  type TemplateFramework,
} from "./template-frameworks";
import {
  getTemplatesByKind,
  templateDetailPath,
  type Template,
  type TemplateKind,
} from "./templates";

const BRANCH = "main";
const RAW_REPO = SITE.repo.replace(
  "https://github.com/",
  "https://raw.githubusercontent.com/",
);

const STRINGS = {
  en: {
    kind: {
      dashboard: "Dashboard template",
      page: "Welcome page",
    } satisfies Record<TemplateKind, string>,
    noun: { dashboard: "dashboard template", page: "welcome page" },
    type: "Type",
    frameworks: "Frameworks",
    page: "Page",
    source: "Source",
    components: "Components used",
    getCode: "Get the code",
    getCodeText:
      "Add every component with the CLI, then copy the page file for your framework from GitHub. The live demo shows the finished page.",
    table: "| Framework | Source file | Live demo |",
    intro: (title: string, noun: string, framework: string) =>
      `Build the ${title} ${noun} from MarkasUI in my ${framework} project.`,
    rules: "Rules:",
    install: (command: string) =>
      `Install the components it uses first: \`${command}\`.`,
    css: (url: string) =>
      `Make sure markas.css is imported. If not, follow ${url}.`,
    reference: (url: string) =>
      `Recreate the page from this source file and keep its sections, layout, and interactions: ${url}`,
    demo: (url: string) => `Compare the result with the live demo: ${url}`,
    keep: "Use the MarkasUI components as they are. Do not change the core Tailwind classes or the color token names.",
  },
  id: {
    kind: {
      dashboard: "Template dashboard",
      page: "Welcome page",
    } satisfies Record<TemplateKind, string>,
    noun: { dashboard: "template dashboard", page: "welcome page" },
    type: "Jenis",
    frameworks: "Framework",
    page: "Halaman",
    source: "Source",
    components: "Komponen yang dipakai",
    getCode: "Cara mendapatkan kodenya",
    getCodeText:
      "Tambahkan semua komponennya lewat CLI, lalu salin file halaman untuk framework kamu dari GitHub. Demo langsung menampilkan halaman jadinya.",
    table: "| Framework | File source | Demo langsung |",
    intro: (title: string, noun: string, framework: string) =>
      `Buatkan ${noun} ${title} dari MarkasUI di project ${framework} saya.`,
    rules: "Aturan:",
    install: (command: string) =>
      `Pasang dulu komponen yang dipakainya: \`${command}\`.`,
    css: (url: string) =>
      `Pastikan markas.css sudah di-import. Kalau belum, ikuti ${url}.`,
    reference: (url: string) =>
      `Susun ulang halaman dari file source ini dan pertahankan section, tata letak, serta interaksinya: ${url}`,
    demo: (url: string) => `Bandingkan hasilnya dengan demo langsung: ${url}`,
    keep: "Pakai komponen MarkasUI apa adanya. Jangan ubah class Tailwind inti dan nama token warna.",
  },
} satisfies Record<Locale, unknown>;

/** Path file source relatif ke root repo, mis. templates/alur/react/Alur.tsx. */
const repoPath = (template: Template, framework: TemplateFramework) =>
  `templates/${template.name}/${template.sources[framework]?.path ?? ""}`;

const addCommand = (template: Template) =>
  `npx markasui@latest add ${template.components.join(" ")}`;

const demoUrl = (
  template: Template,
  framework: TemplateFramework,
  siteUrl: string,
) =>
  new URL(`/demo/templates/${template.name}/${framework}`, siteUrl).toString();

/** Versi Markdown halaman detail template (/templates/<slug>.md, /pages/<slug>.md, llms-full.txt). */
export function templateMarkdown(
  template: Template,
  registry: ReadonlyMap<string, RegistryItem>,
  siteUrl: string,
  locale: Locale,
): string {
  const strings = STRINGS[locale];
  const url = (path: string) =>
    new URL(localePath(locale, path), siteUrl).toString();
  const frameworks = template.frameworks;
  const components = template.components.map((name) => {
    const item = registry.get(name);
    if (!item) return `- ${name}`;
    return `- [${item.title}](${url(`/components/${name}`)}): ${localized(item, locale).description}`;
  });
  const rows = frameworks.map((fw) => {
    const path = repoPath(template, fw);
    return `| ${FRAMEWORK_LABELS[fw]} | [\`${path}\`](${SITE.repo}/blob/${BRANCH}/${path}) | ${demoUrl(template, fw, siteUrl)} |`;
  });

  return `# ${template.title}

${template.description[locale]}

- ${strings.type}: ${strings.kind[template.kind]}
- ${strings.frameworks}: ${frameworkList(frameworks, locale)}
- ${strings.page}: ${url(templateDetailPath(template))}
- ${strings.source}: ${SITE.repo}/tree/${BRANCH}/templates/${template.name}
- CLI: \`${addCommand(template)}\`

## ${strings.components}

${components.join("\n")}

## ${strings.getCode}

${strings.getCodeText}

\`\`\`bash
${addCommand(template)}
\`\`\`

${strings.table}
| --- | --- | --- |
${rows.join("\n")}
`;
}

/** Prompt untuk agen AI agar menyusun ulang template di framework tertentu. */
export function templatePrompt(
  template: Template,
  framework: TemplateFramework,
  siteUrl: string,
  locale: Locale,
): string {
  const strings = STRINGS[locale];
  const rules = [
    strings.install(addCommand(template)),
    strings.css(
      new URL(localePath(locale, "/docs/installation"), siteUrl).toString(),
    ),
    strings.reference(`${RAW_REPO}/${BRANCH}/${repoPath(template, framework)}`),
    strings.demo(demoUrl(template, framework, siteUrl)),
    strings.keep,
  ];
  return `${strings.intro(template.title, strings.noun[template.kind], FRAMEWORK_LABELS[framework])}

${template.description[locale]}

${strings.rules}
${rules.map((rule) => `- ${rule}`).join("\n")}
`;
}

/** Prompt per framework untuk CopyPage; framework tanpa versi template diberi pesan "belum tersedia". */
export function templatePrompts(
  template: Template,
  siteUrl: string,
  locale: Locale,
  unavailable: (framework: string) => string,
): Record<Framework, string> {
  return Object.fromEntries(
    TEMPLATE_FRAMEWORKS.map((fw) => [
      fw,
      template.frameworks.includes(fw)
        ? templatePrompt(template, fw, siteUrl, locale)
        : unavailable(FRAMEWORK_LABELS[fw]),
    ]),
  ) as Record<Framework, string>;
}

/** Registry komponen per nama, untuk judul dan deskripsi komponen yang dipakai template. */
export async function componentRegistry(): Promise<
  ReadonlyMap<string, RegistryItem>
> {
  return new Map((await getComponents()).map((item) => [item.name, item]));
}

/** getStaticPaths untuk /templates/<slug>.md dan /pages/<slug>.md di setiap bahasa. */
export async function templateMarkdownPaths(kind: TemplateKind) {
  const registry = await componentRegistry();
  return LOCALES.flatMap((locale) =>
    getTemplatesByKind(kind).map((template) => ({
      params: {
        lang: locale === "en" ? undefined : locale,
        slug: template.name,
      },
      props: { template, registry },
    })),
  );
}
