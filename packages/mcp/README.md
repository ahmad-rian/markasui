# @markasui/mcp

A local MCP server (stdio) for [MarkasUI](https://markas.jenderalcorp.com), the Tailwind CSS v4 component library for Laravel Blade, React, Vue, Svelte, Astro, and Angular. AI coding agents use it to search components, fetch the code for your project's framework, and read the setup steps.

## Install

Claude Code:

```bash
claude mcp add markasui -- npx -y @markasui/mcp
```

Cursor (`.cursor/mcp.json`) or VS Code (`.vscode/mcp.json`):

```json
{
  "mcpServers": {
    "markasui": { "command": "npx", "args": ["-y", "@markasui/mcp"] }
  }
}
```

## Tools

| Tool                | Input               | Output                                                    |
| ------------------- | ------------------- | --------------------------------------------------------- |
| `list_components`   | `category?`         | Name, title, category, description                        |
| `search_components` | `query`             | Matching components                                       |
| `get_component`     | `name`, `framework` | Code, target path, dependencies, props, AI rules, example |
| `get_theme`         |                     | `markas.css` contents and tokens                          |
| `get_setup`         | `framework`         | Tailwind and `markas.css` setup steps                     |

`framework` is one of `blade`, `react`, `vue`, `svelte`, `astro`, or `angular`.

Data comes from `https://markas.jenderalcorp.com/r/` and is cached while the process runs. Point it at a mirror or a local folder with `MARKASUI_REGISTRY`.

- Docs: https://markas.jenderalcorp.com/docs/mcp
- Source and issues: https://github.com/ahmad-rian/markasui

MIT license. Made by CV Jenderal Solusi Digital, Purwokerto.
