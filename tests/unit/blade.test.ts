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

describe("Blade", () => {
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

  it("escape teks dari props", () => {
    const html = renderBlade(
      '<x-markas.modal title="<script>alert(1)</script>">Isi</x-markas.modal>',
    );
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;");
  });
});
