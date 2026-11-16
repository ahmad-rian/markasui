---
title: Agent Skill
description: Teach AI agents to use MarkasUI with SKILL.md in Claude Code, Codex, JenderalCode, Cursor, VS Code, Gemini CLI, and Antigravity.
seoTitle: "MarkasUI Agent Skill for Claude Code, Codex, Cursor and more"
seoDescription: "Install the MarkasUI SKILL.md in Claude Code, Codex, JenderalCode, Cursor, Gemini CLI or Antigravity so agents detect your framework and follow the rules."
---

An Agent Skill is a `SKILL.md` file that teaches an agent how to use MarkasUI: when to use it, how to detect the framework, how to fetch components, the design rules, and a checklist before finishing. The format is shared by Claude Code, Codex, and most other coding agents, so one folder works everywhere. Only the folder the agent looks in changes.

## Claude Code

Copy the `skills/markasui` folder from the repository into your project:

```bash
npx degit ahmad-rian/markasui/skills/markasui .claude/skills/markasui
```

For every project, save it in `~/.claude/skills/markasui`. Claude uses the skill on its own when a task fits, or you can run it with `/markasui`.

## Other agents

Codex, Gemini CLI, Antigravity, Cursor, VS Code, and JenderalCode all read `.agents/skills`, so one copy there covers them:

```bash
npx degit ahmad-rian/markasui/skills/markasui .agents/skills/markasui
```

| Agent              | Project folder                                       | Global folder                             | Run it                    |
| ------------------ | ---------------------------------------------------- | ----------------------------------------- | ------------------------- |
| JenderalCode       | `.agents/skills` or `.claude/skills`                 | `~/.agents/skills` or `~/.claude/skills`  | `/markasui`               |
| OpenAI Codex       | `.agents/skills`                                     | `~/.agents/skills`                        | `$markasui`, or `/skills` |
| Gemini CLI         | `.agents/skills` or `.gemini/skills`                 | `~/.agents/skills` or `~/.gemini/skills`  | `/skills list` to check   |
| Google Antigravity | `.agents/skills`                                     | `~/.gemini/config/skills`                 | `/markasui`               |
| Cursor             | `.agents/skills`, `.cursor/skills`, `.claude/skills` | `~/.agents/skills` or `~/.cursor/skills`  | `/markasui`               |
| VS Code (Copilot)  | `.github/skills`, `.agents/skills`, `.claude/skills` | `~/.copilot/skills` or `~/.agents/skills` | `/markasui`               |

JenderalCode also reads the skills you already keep in `~/.claude`, so a Claude Code install works there without a second copy. Every agent in the table also picks the skill on its own when the task matches its description.

## What the skill covers

1. **When it applies:** the user mentions MarkasUI, or asks for UI in a project that already uses `markas.css`.
2. **Framework detection:** `artisan` and `resources/views` mean Blade, `react` in `package.json` means React, `vue` means Vue.
3. **Fetching components:** through MCP when available, otherwise `npx markasui add`, otherwise `/r/{name}.json`.
4. **Design rules:** tokens only, one primary button per area.
5. **Checklist:** files in the right folder, `markas.css` imported, dark mode works, no new dependencies.

The skill works best together with the [MCP server](/docs/mcp).
