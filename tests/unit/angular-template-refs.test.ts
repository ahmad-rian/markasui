import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Di Angular, template ref `#nama` menimpa properti komponen dengan nama yang sama di dalam template.
 * Bug ini sudah muncul di beberapa port: `[class]="panel"` lalu memakai elemen, bukan string class,
 * sehingga semua class hilang. Tes ini menolak ref yang namanya sama dengan properti kelas.
 */
const componentsDir = resolve(import.meta.dirname, "../../components");

const angularFiles = readdirSync(componentsDir).flatMap((name) =>
  readdirSync(join(componentsDir, name))
    .filter((file) => file.endsWith(".component.ts"))
    .map((file) => join(componentsDir, name, file)),
);

const templateOf = (source: string) =>
  source.match(/template:\s*`([\s\S]*?)`\s*,?\s*\n\s*(?:\w+:|\})/)?.[1] ?? "";

const refsIn = (template: string) =>
  new Set(
    [...template.matchAll(/<[^>]*?\s#([A-Za-z_]\w*)/g)].map(
      (match) => match[1]!,
    ),
  );

/** Query ke ref itu sendiri (viewChild("nama")) memang harus memakai nama yang sama, jadi bukan bentrok. */
const QUERY = /^\s*(?:viewChild|viewChildren|contentChild|contentChildren)\b/;

/** Hanya isi kelas komponen: kunci objek di konstanta modul (mis. `list:` di peta tata letak) bukan properti. */
const classBodyOf = (source: string) =>
  source.slice(source.search(/export class \w+/));

const membersIn = (source: string) =>
  new Set(
    [
      ...classBodyOf(source).matchAll(
        /^\s+(?:protected|public|private)?\s*(?:readonly\s+)?([A-Za-z_]\w*)\s*(?:=|:|\()([\s\S]{0,80})/gm,
      ),
    ]
      .filter((match) => !QUERY.test(match[2]!))
      .map((match) => match[1]!),
  );

describe("template ref Angular", () => {
  it("menemukan komponen Angular untuk diperiksa", () => {
    expect(angularFiles.length).toBeGreaterThan(0);
  });

  it("menangkap ref yang menimpa konstanta class, tapi tidak query viewChild", () => {
    const source = [
      "@Component({",
      '  template: `<div #panel [class]="panel"></div><dialog #dialog></dialog>`,',
      "})",
      "export class Sample {",
      "  protected readonly panel = panel;",
      '  private readonly dialog = viewChild("dialog");',
      "}",
    ].join("\n");
    const members = membersIn(source);
    const clashes = [...refsIn(templateOf(source))].filter((ref) =>
      members.has(ref),
    );
    expect(clashes).toEqual(["panel"]);
  });

  for (const file of angularFiles) {
    it(`${file.slice(componentsDir.length + 1)}: ref tidak menimpa properti komponen`, () => {
      const source = readFileSync(file, "utf8");
      const members = membersIn(source);
      const clashes = [...refsIn(templateOf(source))].filter((ref) =>
        members.has(ref),
      );
      expect(clashes).toEqual([]);
    });
  }
});
