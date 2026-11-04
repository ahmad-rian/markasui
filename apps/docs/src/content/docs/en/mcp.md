---
title: MCP
description: Install the MarkasUI MCP server in Claude Code, Cursor, and VS Code.
---

The `@markasui/mcp` package is a local MCP server that runs over stdio. AI agents use it to search components, fetch the code for the right framework, and read the setup steps. Data comes from the `/r/` registry and is cached in memory while the process runs.

## Claude Code

```bash
claude mcp add markasui -- npx -y @markasui/mcp
```

## Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "markasui": { "command": "npx", "args": ["-y", "@markasui/mcp"] }
  }
}
```

## VS Code

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "markasui": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

## Tools

| Tool                | Input               | Output                                                      |
| ------------------- | ------------------- | ----------------------------------------------------------- |
| `list_components`   | `category?`         | Name, title, category, and description of every component   |
| `search_components` | `query`             | Components matching name, description, and tags             |
| `get_component`     | `name`, `framework` | Code, props, dependencies, AI rules, usage, and target path |
| `get_theme`         | none                | `markas.css` and the token list                             |
| `get_setup`         | `framework`         | Tailwind and `markas.css` setup steps                       |

## Another registry

Set the `MARKASUI_REGISTRY` environment variable in the MCP config to use a mirror or a local folder.

## Example prompt

> Build a Laravel login page with MarkasUI: an email input, a password input, and a sign in button.

The agent calls `get_setup`, then `get_component` for `input` and `button`, and saves the files in the right folder.
