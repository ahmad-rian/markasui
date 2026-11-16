// @vitest-environment jsdom
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "../..");

/** Render several Blade pages in one PHP process. Returns the HTML per page name. */
function renderPages(
  pages: Record<string, string>,
  from?: string,
): Record<string, string> {
  const dir = mkdtempSync(join(tmpdir(), "markas-livewire-"));
  const source = from ?? dir;
  if (!from) {
    for (const [name, html] of Object.entries(pages))
      writeFileSync(join(dir, `${name}.blade.php`), html);
  }
  execFileSync(
    "php",
    [join(root, "scripts/render-blade.php"), source, join(dir, "out")],
    { stdio: "pipe" },
  );
  const out: Record<string, string> = {};
  for (const file of readdirSync(join(dir, "out")))
    out[file.replace(/\.html$/, "")] = readFileSync(
      join(dir, "out", file),
      "utf8",
    );
  return out;
}

const parse = (html: string) =>
  new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");

const modelOf = (el: Element | null) =>
  el?.getAttribute("wire:model.live") ?? null;

const modelable: Record<string, string> = {
  slider: '<x-markas.slider label="Volume" wire:model.live="value" />',
  combobox: `<x-markas.combobox wire:model.live="value" :options="[['value' => 'id', 'label' => 'Indonesia']]" />`,
  "currency-input": '<x-markas.currency-input wire:model.live="value" />',
  "input-otp": '<x-markas.input-otp wire:model.live="value" />',
  "toggle-group": `<x-markas.toggle-group wire:model.live="value" :items="[['value' => 'a', 'label' => 'A']]" />`,
  toggle: '<x-markas.toggle wire:model.live="value">B</x-markas.toggle>',
  modal:
    '<x-markas.modal title="T" wire:model.live="value">Body</x-markas.modal>',
  drawer:
    '<x-markas.drawer title="T" wire:model.live="value">Body</x-markas.drawer>',
  "alert-dialog":
    '<x-markas.alert-dialog title="T" wire:model.live="value">Body</x-markas.alert-dialog>',
};

const fixtures: Record<string, string> = {
  ab: '<x-markas.input wire:model="a" /><x-markas.input wire:model="b" />',
  ba: '<x-markas.input wire:model="b" /><x-markas.input wire:model="a" />',
  explicit: '<x-markas.modal id="edit-user" title="Edit">Body</x-markas.modal>',
  native: `
<x-markas.input wire:model.live="name" />
<x-markas.textarea wire:model.live="bio" />
<x-markas.select wire:model.live="city"><option>a</option></x-markas.select>
<x-markas.checkbox wire:model.live="agree" />
<x-markas.switch wire:model.live="notify" />`,
  radio: `<x-markas.radio-group name="plan" wire:model.live="plan" :options="[['value' => 'a', 'label' => 'A'], ['value' => 'b', 'label' => 'B']]" />`,
  dropzone:
    '<x-markas.file-dropzone name="files[]" multiple wire:model="files" />',
  ignored: `
<x-markas.modal title="T">Body</x-markas.modal>
<x-markas.collapsible title="More">Body</x-markas.collapsible>
<x-markas.accordion :items="['a' => 'A']"><x-slot:a>Body</x-slot:a></x-markas.accordion>
<x-markas.popover label="Share">Body</x-markas.popover>
<x-markas.tooltip content="Hint"><button>?</button></x-markas.tooltip>`,
  ...Object.fromEntries(
    Object.entries(modelable).map(([name, html]) => [
      `modelable-${name}`,
      html,
    ]),
  ),
};

// PHP renders are slow on a busy machine, so every fixture renders in one process.
const PHP_TIMEOUT_MS = 180_000;

describe("Blade + Livewire", { timeout: PHP_TIMEOUT_MS }, () => {
  let pages: Record<string, string> = {};
  beforeAll(() => {
    pages = renderPages(fixtures);
  }, PHP_TIMEOUT_MS);

  it("generated ids are the same on every render and unique within a page", () => {
    const examples = join(root, "examples/blade");
    const first = renderPages({}, examples);
    const second = renderPages({}, examples);

    expect(Object.keys(first).length).toBeGreaterThan(100);
    for (const [name, html] of Object.entries(first)) {
      expect(second[name], name).toBe(html);
      const ids = [...parse(html).querySelectorAll("[id]")].map((el) => el.id);
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      expect(duplicates, name).toEqual([]);
    }
  });

  it("ids follow wire:model, not the order of components", () => {
    const { ab = "", ba = "" } = pages;
    const idFor = (html: string, model: string) =>
      parse(html).querySelector(`[wire\\:model="${model}"]`)?.id;

    expect(idFor(ab, "a")).toBe(idFor(ba, "a"));
    expect(idFor(ab, "b")).toBe(idFor(ba, "b"));
    expect(idFor(ab, "a")).not.toBe(idFor(ab, "b"));
  });

  it("an explicit id wins over the generated one", () => {
    const page = pages.explicit ?? "";
    expect(parse(page).querySelector("dialog")?.id).toBe("edit-user");
  });

  it("wire:model lands on the native control of native form components", () => {
    const page = pages.native ?? "";
    const doc = parse(page);
    expect(modelOf(doc.querySelector("input[type=text]"))).toBe("name");
    expect(modelOf(doc.querySelector("textarea"))).toBe("bio");
    expect(modelOf(doc.querySelector("select"))).toBe("city");
    expect(modelOf(doc.querySelector("input[type=checkbox]:not([role])"))).toBe(
      "agree",
    );
    expect(modelOf(doc.querySelector("input[role=switch]"))).toBe("notify");
  });

  it("radio-group copies wire:model to every radio and keeps it off the fieldset", () => {
    const page = pages.radio ?? "";
    const doc = parse(page);
    const radios = [...doc.querySelectorAll("input[type=radio]")];
    expect(radios).toHaveLength(2);
    expect(radios.map(modelOf)).toEqual(["plan", "plan"]);
    expect(modelOf(doc.querySelector("fieldset"))).toBeNull();
  });

  it.each(Object.keys(modelable))(
    "%s puts wire:model on its x-modelable root, nowhere else",
    (name) => {
      const doc = parse(pages[`modelable-${name}`] ?? "");
      const bound = [...doc.querySelectorAll("*")].filter(
        (el) => modelOf(el) !== null,
      );
      expect(bound).toHaveLength(1);
      expect(bound[0]?.hasAttribute("x-modelable")).toBe(true);
    },
  );

  it("file-dropzone puts wire:model on a hidden file input only", () => {
    const page = pages.dropzone ?? "";
    const doc = parse(page);
    const bound = [...doc.querySelectorAll("[wire\\:model]")];
    expect(bound).toHaveLength(1);
    expect(bound[0]?.getAttribute("type")).toBe("file");
    expect(bound[0]?.hasAttribute("hidden")).toBe(true);
    expect(bound[0]?.hasAttribute("multiple")).toBe(true);
    expect(
      doc.querySelector("input[name='files[]']")?.hasAttribute("wire:model"),
    ).toBe(false);
  });

  it("elements whose state the browser or Alpine owns are skipped by Livewire's morph", () => {
    const page = pages.ignored ?? "";
    const doc = parse(page);
    for (const selector of ["dialog", "details", "[popover]"]) {
      const elements = [...doc.querySelectorAll(selector)];
      expect(elements.length, selector).toBeGreaterThan(0);
      for (const el of elements)
        expect(el.hasAttribute("wire:ignore.self"), selector).toBe(true);
    }
  });
});
