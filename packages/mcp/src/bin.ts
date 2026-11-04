#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createRegistry } from "markasui";
import { createServer } from "./server.ts";

// Registry bisa diarahkan ke mirror atau folder lokal lewat MARKASUI_REGISTRY.
const server = createServer(createRegistry(process.env.MARKASUI_REGISTRY));

server.connect(new StdioServerTransport()).catch((error: unknown) => {
  // stdout dipakai protokol MCP, jadi log ke stderr.
  console.error(`markasui-mcp: ${(error as Error).message}`);
  process.exit(1);
});
