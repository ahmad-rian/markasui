import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  createRegistry,
  FRAMEWORKS,
  setupGuide,
  type IndexItem,
  type Registry,
} from "markasui";
import { z } from "zod";

const VERSION = "0.1.0";
const MAX_SEARCH_RESULTS = 10;

type ToolResult = {
  content: { type: "text"; text: string }[];
  isError?: boolean;
};

const json = (data: unknown): ToolResult => ({
  content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
});

/** Error dikembalikan sebagai isi tool (isError) agar agent bisa membaca dan memperbaiki inputnya. */
async function safely(run: () => Promise<ToolResult>): Promise<ToolResult> {
  try {
    return await run();
  } catch (error) {
    return {
      content: [{ type: "text", text: (error as Error).message }],
      isError: true,
    };
  }
}

const summary = ({ name, title, category, description }: IndexItem) => ({
  name,
  title,
  category,
  description,
});

/** Skor sederhana: nama paling berat, lalu judul dan tag, lalu deskripsi. */
export function searchIndex(index: IndexItem[], query: string): IndexItem[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return index
    .map((item) => {
      const score = terms.reduce((total, term) => {
        if (item.name === term) return total + 10;
        if (item.name.includes(term)) return total + 6;
        if (
          item.title.toLowerCase().includes(term) ||
          item.tags.some((tag) => tag.includes(term))
        )
          return total + 4;
        if (item.description.toLowerCase().includes(term)) return total + 1;
        return total;
      }, 0);
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
    .slice(0, MAX_SEARCH_RESULTS)
    .map(({ item }) => item);
}

export function createServer(registry: Registry = createRegistry()) {
  const server = new McpServer({ name: "markasui", version: VERSION });
  const framework = z
    .enum(FRAMEWORKS)
    .describe("blade (Laravel + Alpine.js), react, or vue");

  server.registerTool(
    "list_components",
    {
      title: "List components",
      description:
        "List every MarkasUI component (name, title, category, description). Optionally filter by category.",
      inputSchema: {
        category: z
          .enum(["form", "feedback", "overlay", "navigation", "data"])
          .optional(),
      },
    },
    ({ category }) =>
      safely(async () => {
        const index = await registry.index();
        return json(
          index
            .filter((item) => !category || item.category === category)
            .map(summary),
        );
      }),
  );

  server.registerTool(
    "search_components",
    {
      title: "Search components",
      description:
        "Search MarkasUI components by name, description, and tags. Example queries: 'dialog', 'login form', 'table'.",
      inputSchema: { query: z.string().min(1) },
    },
    ({ query }) =>
      safely(async () =>
        json(searchIndex(await registry.index(), query).map(summary)),
      ),
  );

  server.registerTool(
    "get_component",
    {
      title: "Get component",
      description:
        "Full code of one component for a framework, with target path, dependencies, props, AI rules, and usage examples. Save the code as is at targetPath.",
      inputSchema: {
        name: z.string().min(1).describe("component name, for example button"),
        framework,
      },
    },
    ({ name, framework: fw }) =>
      safely(async () => {
        const item = await registry.component(name);
        const file = item.frameworks[fw];
        return json({
          name: item.name,
          title: item.title,
          framework: fw,
          targetPath: file.target,
          dependencies: file.deps,
          code: file.code,
          props: item.props,
          accessibility: item.a11y,
          whenToUse: item.ai.whenToUse,
          rules: item.ai.rules,
          usage: item.usage,
        });
      }),
  );

  server.registerTool(
    "get_theme",
    {
      title: "Get theme",
      description:
        "The contents of markas.css (light and dark color tokens) and the token list. Components only use these tokens.",
      inputSchema: {},
    },
    () => safely(async () => json(await registry.theme())),
  );

  server.registerTool(
    "get_setup",
    {
      title: "Setup steps",
      description:
        "Tailwind CSS v4 and markas.css setup steps for one framework. Call this before adding components to a new project.",
      inputSchema: { framework },
    },
    ({ framework: fw }) =>
      safely(async () => ({
        content: [
          {
            type: "text",
            text: `${setupGuide(fw)}\n\nShortcut: run "npx markasui@latest init" in the project root.`,
          },
        ],
      })),
  );

  return server;
}
