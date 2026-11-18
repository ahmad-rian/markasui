---
title: MCP
description: Install the MarkasUI MCP server in Claude Code, Codex, JenderalCode, Cursor, VS Code, Gemini CLI, Antigravity, and other AI coding agents.
seoTitle: "MarkasUI MCP server for Claude Code, Codex, Cursor and more"
seoDescription: "Add @markasui/mcp to Claude Code, Codex, JenderalCode, Cursor, VS Code, Gemini CLI or Antigravity so your agent fetches MarkasUI code for your framework."
---

The `@markasui/mcp` package is a local MCP server that runs over stdio. AI agents use it to search components, fetch the code for the right framework, and read the setup steps. Data comes from the `/r/` registry and is cached in memory while the process runs.

Every harness starts it the same way: `npx -y @markasui/mcp`. You need Node.js 20 or newer. Only the place where you write that command changes, and this page lists it for each tool.

## Quick install

Agents with an `mcp add` command:

```bash
# Claude Code
claude mcp add markasui -- npx -y @markasui/mcp

# OpenAI Codex (CLI, IDE extension, and app share the config)
codex mcp add markasui -- npx -y @markasui/mcp

# Gemini CLI (flags for npx go after --)
gemini mcp add markasui npx -- -y @markasui/mcp

# OpenCode
opencode mcp add markasui -- npx -y @markasui/mcp

# Amp
amp mcp add markasui -- npx -y @markasui/mcp
```

Most other tools read a JSON file with an `mcpServers` object. The entry is the same everywhere, only the file path differs:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

## Claude Code

```bash
claude mcp add markasui -- npx -y @markasui/mcp
```

This saves the server for you in the current project. Add `--scope user` to use it in every project, or `--scope project` to write it to `.mcp.json` at the project root so your team gets it from git. You can also write `.mcp.json` by hand:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

Verify: run `claude mcp get markasui`, or type `/mcp` in a session and look for `markasui` as connected.

## OpenAI Codex

```bash
codex mcp add markasui -- npx -y @markasui/mcp
```

The command writes to `~/.codex/config.toml`. To edit it yourself, add this table (or `.codex/config.toml` to scope it to one project):

```toml
[mcp_servers.markasui]
command = "npx"
args = ["-y", "@markasui/mcp"]
```

The Codex CLI, the IDE extension, and the ChatGPT desktop app read the same file, so one setup covers all three.

Verify: run `codex mcp list`, or type `/mcp` in the Codex TUI.

## JenderalCode

[JenderalCode](https://code.jenderalcorp.com/) reads the same project `.mcp.json` as Claude Code. Commit this file at the project root:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

A project's `.mcp.json` runs only after you trust that exact file: open the MCP section in Settings and choose **Trust and run**. Editing the file revokes that trust, so JenderalCode asks again.

To use MarkasUI in every project, add the server in the MCP settings instead. It is saved to `~/.config/jenderalcode/mcp.json` with the same format. JenderalCode also picks up the [Agent Skill](/docs/skills) from `.claude/skills` and `~/.claude/skills`.

Verify: the server shows as running in the MCP settings, together with its tools.

## Claude Desktop

Open **Settings**, then **Developer**, then **Edit Config**. This opens `claude_desktop_config.json`:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

Quit Claude Desktop fully and start it again. Verify: open the connectors menu in the chat input and look for `markasui`. Logs are in `~/Library/Logs/Claude` (macOS) or `%APPDATA%\Claude\logs` (Windows).

## Cursor

[Add MarkasUI to Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=markasui&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtYXJrYXN1aS9tY3AiXX0=) with one click, or add it to `.cursor/mcp.json` in the project (`~/.cursor/mcp.json` for every project):

```json
{
  "mcpServers": {
    "markasui": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

Verify: the server appears in Cursor's MCP settings. If it fails, open the Output panel and pick **MCP Logs**.

## VS Code and GitHub Copilot

Add `.mcp.json` at the workspace root to share the server with your team:

```json
{
  "mcpServers": {
    "markasui": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@markasui/mcp"],
      "tools": ["*"]
    }
  }
}
```

For every workspace, put the same entry in `~/.copilot/mcp-config.json`, which Copilot CLI reads too.

You can also [install it in VS Code](https://vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522markasui%2522%252C%2522type%2522%253A%2522stdio%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522-y%2522%252C%2522%2540markasui%252Fmcp%2522%255D%257D) with one click, or from a terminal. Both add it to your VS Code user profile:

```bash
code --add-mcp '{"name":"markasui","type":"stdio","command":"npx","args":["-y","@markasui/mcp"]}'
```

Older setups use `.vscode/mcp.json` with a `servers` key instead of `mcpServers`. VS Code still reads it, but new Copilot configurations should use the files above.

Verify: run **MCP: List Servers** from the Command Palette.

## Gemini CLI

```bash
gemini mcp add markasui npx -- -y @markasui/mcp
```

This writes to `.gemini/settings.json` in the project. Add `--scope user` to write to `~/.gemini/settings.json` instead. The entry in either file:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

Verify: run `gemini mcp list`, or type `/mcp` in a session.

## Google Antigravity

In the agent panel, open the **…** menu, choose **MCP Servers**, then **Manage MCP Servers**, then **View raw config**. Paste the entry into `mcp_config.json`:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

The global file is `~/.gemini/config/mcp_config.json`. For one project, use `.agents/mcp_config.json` in the workspace.

Verify: type `/mcp` in the prompt panel to see the server status.

## Devin Desktop (Windsurf)

Windsurf is now Devin Desktop, and it shares its MCP config with Devin CLI:

```bash
devin mcp add markasui -- npx -y @markasui/mcp
```

Or edit the file by hand: `.devin/mcp_config.json` in the project, or `~/.config/devin/mcp_config.json` (`%APPDATA%\devin\mcp_config.json` on Windows) for every project. Use the `mcpServers` entry from [Quick install](#quick-install).

Verify: run `devin mcp list`, or open **Customize** in the Agents window and click **MCPs**.

## Zed

Add to your Zed `settings.json`:

```json
{
  "context_servers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"],
      "env": {}
    }
  }
}
```

Verify: in **Settings**, **AI**, **MCP Servers**, a green dot next to `markasui` means the server is active.

## JetBrains AI Assistant and Junie

AI Assistant: open **Settings**, **Tools**, **AI Assistant**, **Model Context Protocol (MCP)**, click **Add**, and paste the `mcpServers` JSON from [Quick install](#quick-install). Click **Apply** and check the **Status** column.

Junie: put the same JSON in `.junie/mcp/mcp.json` at the project root, or in `~/.junie/mcp/mcp.json` for every project. Servers added from **Tools**, **Junie**, **MCP Settings** go to the global file. Verify with `/mcp` in Junie CLI.

## Cline

Click the **MCP Servers** icon in the Cline toolbar, open the **Configure** tab, and click **Configure MCP Servers**. This opens `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"],
      "disabled": false
    }
  }
}
```

Verify: the server's tools show up in the MCP Servers panel.

## Roo Code

Add to `.roo/mcp.json` at the project root, or open the global `mcp_settings.json` with **Edit Global MCP** at the bottom of Roo Code's settings:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

The project file wins when both define `markasui`. Verify: the server is listed as active in the MCP servers list.

## Kiro

Add to `.kiro/settings/mcp.json` in the workspace, or `~/.kiro/settings/mcp.json` for every workspace. The command palette has **Kiro: Open workspace MCP config (JSON)** for this.

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"],
      "disabled": false
    }
  }
}
```

Kiro applies the change when you save the file.

## OpenCode

```bash
opencode mcp add markasui -- npx -y @markasui/mcp
```

Or add it to `opencode.jsonc` in the project (`~/.config/opencode/opencode.json` for every project). OpenCode uses its own format, with the command as one array:

```json
{
  "mcp": {
    "servers": {
      "markasui": {
        "type": "local",
        "command": ["npx", "-y", "@markasui/mcp"]
      }
    }
  }
}
```

Verify: `opencode mcp list` shows `markasui` as connected.

## Continue

Create `.continue/mcpServers/markasui.yaml` in the workspace:

```yaml
name: MarkasUI
version: 0.0.1
schema: v1
mcpServers:
  - name: markasui
    type: stdio
    command: npx
    args: ["-y", "@markasui/mcp"]
```

Continue also accepts a JSON file in that folder in the `mcpServers` format from [Quick install](#quick-install). MCP tools work in agent mode only.

## Warp

Open **Settings**, **Agents**, **MCP servers** (or search **Open MCP Servers** in the Command Palette), click **+ Add**, and paste the `mcpServers` JSON from [Quick install](#quick-install).

Verify: `markasui` is listed as running, and you can see its tools.

## Amp

```bash
amp mcp add markasui -- npx -y @markasui/mcp
```

Or add it under `amp.mcpServers` in `~/.config/amp/settings.json` (`.amp/settings.json` for one workspace):

```json
{
  "amp.mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

Verify: run `amp mcp doctor`.

## Goose

Run `goose configure`, choose **Add Extension**, then **Command-line Extension**. Name it `markasui` and enter `npx -y @markasui/mcp` as the command. The result in `~/.config/goose/config.yaml`:

```yaml
extensions:
  markasui:
    name: markasui
    type: stdio
    cmd: npx
    args: ["-y", "@markasui/mcp"]
    enabled: true
    timeout: 300
```

## GitHub Copilot cloud agent

The agent that works on issues and pull requests on GitHub reads its servers from the repository settings. Open **Settings**, then **Copilot**, then **MCP servers**, paste this, and click **Save MCP configuration**:

```json
{
  "mcpServers": {
    "markasui": {
      "type": "local",
      "command": "npx",
      "args": ["-y", "@markasui/mcp"],
      "tools": [
        "list_components",
        "search_components",
        "get_component",
        "get_theme",
        "get_setup"
      ]
    }
  }
}
```

Copilot runs these tools without asking, and all five only read the registry. If the session logs show a firewall warning, add `markas.jenderalcorp.com` to the agent's firewall allowlist.

Verify: assign an issue to Copilot, open **View session**, and expand the **Start MCP Servers** step. The tools are listed at the bottom.

## Tools

| Tool                | Input               | Output                                                      |
| ------------------- | ------------------- | ----------------------------------------------------------- |
| `list_components`   | `category?`         | Name, title, category, and description of every component   |
| `search_components` | `query`             | Components matching name, description, and tags             |
| `get_component`     | `name`, `framework` | Code, props, dependencies, AI rules, usage, and target path |
| `get_theme`         | none                | `markas.css` and the token list                             |
| `get_setup`         | `framework`         | Tailwind and `markas.css` setup steps                       |

`framework` is one of `blade`, `react`, `vue`, `svelte`, `astro`, or `angular`.

## Another registry

Set the `MARKASUI_REGISTRY` environment variable in the MCP config to use a mirror or a local folder. The value is the folder that holds `index.json`: an `https://` URL or a local path. The default is `https://markas.jenderalcorp.com/r`.

```bash
claude mcp add markasui --env MARKASUI_REGISTRY=https://mirror.example.com/r -- npx -y @markasui/mcp
```

In JSON configs, add an `env` object next to `args`:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"],
      "env": { "MARKASUI_REGISTRY": "https://mirror.example.com/r" }
    }
  }
}
```

In Codex, add `env = { MARKASUI_REGISTRY = "https://mirror.example.com/r" }` to the `[mcp_servers.markasui]` table. OpenCode calls the object `environment`, and Goose calls it `envs`.

## Windows

Most harnesses start `npx` on Windows without changes. If the server never connects, or the log says `spawn npx ENOENT`, start it through `cmd /c`:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@markasui/mcp"]
    }
  }
}
```

With an `mcp add` command, put `cmd /c` before `npx`:

```bash
claude mcp add markasui -- cmd /c npx -y @markasui/mcp
```

## Troubleshooting

- **Node version.** Run `node --version` and install Node.js 20 or newer if it is older. Desktop apps on macOS may not see a Node installed through nvm or fnm. Use the full path from `which npx` as the `command`.
- **Old version from the npx cache.** `npx` reuses the copy it downloaded before. Use `@markasui/mcp@latest` in `args` to get the newest release, or delete the `_npx` folder inside the folder that `npm config get cache` prints.
- **Corporate proxy.** `npx` downloads through npm, so set `npm config set https-proxy http://proxy.example.com:8080`. The server then fetches the registry with Node's `fetch`: on Node 22.21 or 24 and newer, add `HTTPS_PROXY` and `NODE_USE_ENV_PROXY=1` to the server's `env`. If your proxy uses its own certificate, add `NODE_EXTRA_CA_CERTS` with the path to that certificate. When the registry is blocked entirely, point `MARKASUI_REGISTRY` at a mirror or a local copy.
- **Registry errors.** `Cannot reach the registry` means the URL is unreachable from the machine running the agent. `Not found in the registry` means `MARKASUI_REGISTRY` does not point at the folder that contains `index.json`.
- **Test it in a terminal.** Run `npx -y @markasui/mcp`. A working server prints nothing and waits for input, because the MCP client talks to it over stdin. Press `Ctrl+C` to stop it. An error printed here is the same one your harness hits.

## Example prompt

> Build a Laravel login page with MarkasUI: an email input, a password input, and a sign in button.

The agent calls `get_setup`, then `get_component` for `input` and `button`, and saves the files in the right folder.
