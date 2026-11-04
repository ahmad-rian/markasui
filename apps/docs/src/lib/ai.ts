import type { Framework, RegistryItem } from "@markasui/registry/schema";
import { FRAMEWORK_LABELS } from "./frameworks";

export const FRAMEWORK_FENCE: Record<Framework, string> = {
  blade: "blade",
  react: "tsx",
  vue: "vue",
};

/** Bagian usage.md per framework ("## Blade", "## React", "## Vue") plus catatan umum. */
export function splitUsage(usage: string): Record<Framework | "notes", string> {
  const sections: Record<string, string> = {};
  for (const block of usage.split(/^## /m).filter(Boolean)) {
    const newline = block.indexOf("\n");
    const heading = block.slice(0, newline).trim().toLowerCase();
    sections[heading] = block.slice(newline + 1).trim();
  }
  return {
    blade: sections.blade ?? "",
    react: sections.react ?? "",
    vue: sections.vue ?? "",
    notes: sections.catatan ?? "",
  };
}

/** Template Copy Prompt dari PRD bagian 9. */
export function buildPrompt(
  item: RegistryItem,
  framework: Framework,
  siteUrl: string,
): string {
  const file = item.frameworks[framework];
  const usage = splitUsage(item.usage);
  const rules = item.ai.rules.map((rule) => `- ${rule}`).join("\n");
  const deps = file.deps.length
    ? `\n- Pastikan dependensi terpasang: ${file.deps.join(", ")}.`
    : "";

  return `Tambahkan komponen ${item.title} dari MarkasUI ke project ${FRAMEWORK_LABELS[framework]} saya.

Aturan:
- Simpan file di ${file.target}.
- Pastikan markas.css sudah di-import. Kalau belum, ikuti ${new URL("/docs/installation", siteUrl)}.
- Jangan ubah class Tailwind inti dan nama token warna.${deps}
${rules}

Kode komponen:
\`\`\`${FRAMEWORK_FENCE[framework]}
${file.code.trim()}
\`\`\`

Contoh pemakaian:
${usage[framework]}
`;
}

/** Versi Markdown halaman komponen (/components/[name].md dan llms-full.txt). */
export function componentMarkdown(item: RegistryItem, siteUrl: string): string {
  const usage = splitUsage(item.usage);
  const frameworks = (["blade", "react", "vue"] as const)
    .map((framework) => {
      const file = item.frameworks[framework];
      const deps = file.deps.length
        ? `Dependensi: ${file.deps.join(", ")}.`
        : "Tanpa dependensi tambahan.";
      return `### ${FRAMEWORK_LABELS[framework]}

Simpan di \`${file.target}\`. ${deps}

\`\`\`${FRAMEWORK_FENCE[framework]}
${file.code.trim()}
\`\`\`

${usage[framework]}`;
    })
    .join("\n\n");

  const props = item.props.map(
    (prop) =>
      `| \`${prop.name}\` | \`${prop.type.replaceAll("|", "\\|")}\` | ${prop.default} | ${prop.description} |`,
  );

  return `# ${item.title}

${item.description}

- Kategori: ${item.category}
- Status: ${item.status}
- Registry: ${new URL(`/r/${item.name}.json`, siteUrl)}
- CLI: \`npx markasui@latest add ${item.name}\`

## Kapan dipakai

${item.ai.whenToUse}

${item.ai.rules.map((rule) => `- ${rule}`).join("\n")}

## Kode

${frameworks}

## Props

| Nama | Tipe | Default | Keterangan |
| --- | --- | --- | --- |
${props.join("\n")}

## Aksesibilitas

${item.a11y.map((note) => `- ${note}`).join("\n")}
${usage.notes ? `\n## Catatan\n\n${usage.notes}\n` : ""}`;
}
