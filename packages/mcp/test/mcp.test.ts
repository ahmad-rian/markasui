// @vitest-environment node
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { loadComponent, parseTheme, toIndexItem } from "@markasui/registry";
import type { RegistryItem } from "@markasui/registry/schema";
import { createRegistry } from "markasui";
import { beforeAll, describe, expect, it } from "vitest";
import { createServer, searchIndex } from "../src/server.ts";

const root = resolve(import.meta.dirname, "../../..");
let client: Client;

/** Disajikan hanya dengan Blade, React, Vue, seperti komponen yang belum di-porting. */
const LEGACY = "tabs";

function withoutNewFrameworks(item: RegistryItem): RegistryItem {
  const { blade, react, vue } = item.frameworks;
  return { ...item, frameworks: { blade, react, vue } };
}

beforeAll(async () => {
  const dir = await mkdtemp(join(tmpdir(), "markas-mcp-"));
  const items = (
    await Promise.all(
      ["button", "input", "modal", "tabs"].map((n) =>
        loadComponent(join(root, "components", n)),
      ),
    )
  ).map((item) => (item.name === LEGACY ? withoutNewFrameworks(item) : item));
  await writeFile(
    join(dir, "index.json"),
    JSON.stringify(items.map(toIndexItem)),
  );
  await writeFile(
    join(dir, "theme.json"),
    JSON.stringify(
      parseTheme(
        await readFile(join(root, "packages/theme/markas.css"), "utf8"),
      ),
    ),
  );
  for (const item of items)
    await writeFile(join(dir, `${item.name}.json`), JSON.stringify(item));

  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();
  await createServer(createRegistry(dir)).connect(serverTransport);
  client = new Client({ name: "test", version: "0.0.0" });
  await client.connect(clientTransport);
});

const call = async (name: string, args: Record<string, unknown> = {}) => {
  const result = (await client.callTool({ name, arguments: args })) as {
    content: { text: string }[];
    isError?: boolean;
  };
  return { text: result.content[0]!.text, isError: Boolean(result.isError) };
};

describe("MCP server", () => {
  it("menyediakan lima tool dari PRD", async () => {
    const { tools } = await client.listTools();
    expect(tools.map((tool) => tool.name).sort()).toEqual([
      "get_component",
      "get_setup",
      "get_theme",
      "list_components",
      "search_components",
    ]);
  });

  it("list_components dengan filter kategori", async () => {
    const all = JSON.parse((await call("list_components")).text);
    expect(all).toHaveLength(4);
    const overlay = JSON.parse(
      (await call("list_components", { category: "overlay" })).text,
    );
    expect(overlay.map((c: { name: string }) => c.name)).toEqual(["modal"]);
  });

  it("search_components mencari lewat tag dan deskripsi", async () => {
    const results = JSON.parse(
      (await call("search_components", { query: "dialog" })).text,
    );
    expect(results[0].name).toBe("modal");
  });

  it("get_component mengembalikan kode framework yang diminta", async () => {
    const data = JSON.parse(
      (await call("get_component", { name: "modal", framework: "blade" })).text,
    );
    expect(data.targetPath).toBe(
      "resources/views/components/markas/modal.blade.php",
    );
    expect(data.dependencies).toEqual(["alpinejs"]);
    expect(data.code).toContain("<dialog");
    expect(data.rules.length).toBeGreaterThan(0);
  });

  it("get_component untuk Svelte, Astro, dan Angular", async () => {
    const data = JSON.parse(
      (await call("get_component", { name: "modal", framework: "angular" }))
        .text,
    );
    expect(data.targetPath).toBe("src/app/markas/modal.component.ts");
    expect(data.dependencies).toEqual([]);
    expect(data.code).toContain('selector: "markas-modal"');
    const svelte = JSON.parse(
      (await call("get_component", { name: "modal", framework: "svelte" }))
        .text,
    );
    expect(svelte.targetPath).toBe("src/lib/components/markas/Modal.svelte");
  });

  it("get_component menjelaskan framework yang belum tersedia", async () => {
    const result = await call("get_component", {
      name: LEGACY,
      framework: "astro",
    });
    expect(result.isError).toBe(true);
    expect(result.text).toContain("not available for astro yet");
    expect(result.text).toContain("blade, react, vue");
  });

  it("get_component memberi error yang bisa dibaca agent", async () => {
    const missing = await call("get_component", {
      name: "carousel",
      framework: "react",
    });
    expect(missing.isError).toBe(true);
    expect(missing.text).toContain("Not found");
  });

  it("get_theme dan get_setup", async () => {
    expect(JSON.parse((await call("get_theme")).text).tokens).toHaveLength(15);
    expect((await call("get_setup", { framework: "blade" })).text).toContain(
      "Alpine",
    );
    expect((await call("get_setup", { framework: "angular" })).text).toContain(
      "standalone",
    );
  });

  it("searchIndex mengurutkan nama di atas deskripsi dan mengabaikan query kosong", () => {
    const index = [
      {
        name: "tabs",
        title: "Tabs",
        description: "panel",
        category: "navigation",
        tags: ["tabs"],
        status: "stable",
        addedAt: "",
      },
      {
        name: "card",
        title: "Card",
        description: "berisi tabs",
        category: "data",
        tags: [],
        status: "stable",
        addedAt: "",
      },
    ];
    expect(searchIndex(index, "tabs").map((item) => item.name)).toEqual([
      "tabs",
      "card",
    ]);
    expect(searchIndex(index, "   ")).toEqual([]);
  });
});
