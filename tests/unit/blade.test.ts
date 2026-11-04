// @vitest-environment node
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../..");

function renderBlade(source: string): string {
  const dir = mkdtempSync(join(tmpdir(), "markas-blade-"));
  writeFileSync(join(dir, "page.blade.php"), source);
  execFileSync(
    "php",
    [join(root, "scripts/render-blade.php"), dir, join(dir, "out")],
    { stdio: "pipe" },
  );
  return readFileSync(join(dir, "out/page.html"), "utf8");
}

const panelText = (html: string, id: string) =>
  html.match(new RegExp(`id="${id}"[^>]*>([^<]*)</div>`))?.[1]?.trim();

// Setiap tes menjalankan proses PHP; beri waktu lebih saat mesin sibuk.
const PHP_TIMEOUT_MS = 20_000;

describe("Blade", { timeout: PHP_TIMEOUT_MS }, () => {
  it("tabs memakai slot sesuai key walau key sama dengan variabel internal", () => {
    const html = renderBlade(`
<x-markas.tabs id="t" :items="['panel' => 'Panel', 'active' => 'Aktif', 'label' => 'Label']">
    <x-slot:panel>Isi panel</x-slot:panel>
    <x-slot:active>Isi aktif</x-slot:active>
</x-markas.tabs>`);
    expect(panelText(html, "t-panel-panel")).toBe("Isi panel");
    expect(panelText(html, "t-panel-active")).toBe("Isi aktif");
    expect(panelText(html, "t-panel-label")).toBe("");
  });

  it("button menggabung class user di akhir dan default type button", () => {
    const html = renderBlade(
      '<x-markas.button variant="ghost" class="w-full">Ok</x-markas.button>',
    );
    expect(html).toMatch(/class="[^"]*hover:bg-subtle[^"]*w-full"/);
    expect(html).toContain('type="button"');
  });

  it("input mengaktifkan aria-invalid dan aria-describedby saat ada error", () => {
    const html = renderBlade(
      '<x-markas.input id="e" label="Email" error="Wajib diisi" />',
    );
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('aria-describedby="e-error"');
    expect(html).toContain('<label for="e"');
  });

  it("href berskema berbahaya menjadi # di dropdown-menu, breadcrumb, navbar, dan pagination", () => {
    const unsafe = ["javascript:alert(1)", " JaVaScRiPt:x", "data:text/html,x"];
    const safe = ["/a", "https://x.id", "mailto:a@b.c", "#top"];
    const hrefs = [...unsafe, ...safe];
    const expected = [...unsafe.map(() => "#"), ...safe];
    const items = `[${hrefs
      .map((href, index) => `['label' => 'Item ${index}', 'href' => '${href}']`)
      .join(", ")}]`;
    const pagination = hrefs
      .map(
        (href) =>
          `<section data-case><x-markas.pagination :page="1" :total="2" href="${href}?p={page}" /></section>`,
      )
      .join("\n");
    const html = renderBlade(`
<section data-case><x-markas.dropdown-menu :items="${items}" /></section>
<section data-case><x-markas.breadcrumb :items="[...${items}, ['label' => 'Akhir']]" /></section>
<section data-case><x-markas.navbar :links="${items}" /></section>
${pagination}`);
    const sections = html.split("<section data-case>").slice(1);
    const hrefsOf = (section = "") =>
      [...section.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)].map((m) => m[1]);
    const [dropdown, breadcrumb, navbar, ...pages] = sections;

    expect(hrefsOf(dropdown)).toEqual(expected);
    expect(hrefsOf(breadcrumb)).toEqual(expected);
    expect(hrefsOf(navbar)).toEqual([...expected, ...expected]);
    expect(pages.map((page) => hrefsOf(page)[2])).toEqual(
      hrefs.map((href, index) => (index < unsafe.length ? "#" : `${href}?p=2`)),
    );
  });

  it("escape teks dari props", () => {
    const html = renderBlade(
      '<x-markas.modal title="<script>alert(1)</script>">Isi</x-markas.modal>',
    );
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;");
  });
});
