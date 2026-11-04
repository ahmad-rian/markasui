---
title: Agent Skill
description: Teach AI agents to use MarkasUI with SKILL.md.
---

An Agent Skill is a `SKILL.md` file that teaches an agent (Claude Code and other agents that support skills) how to use MarkasUI: when to use it, how to detect the framework, how to fetch components, the design rules, and a checklist before finishing.

## Manual install

Copy the `skills/markasui` folder from the repository into your project:

```bash
npx degit ahmad-rian/markasui/skills/markasui .claude/skills/markasui
```

For every project, save it in `~/.claude/skills/markasui`.

## What the skill covers

1. **When it applies:** the user mentions MarkasUI, or asks for UI in a project that already uses `markas.css`.
2. **Framework detection:** `artisan` and `resources/views` mean Blade, `react` in `package.json` means React, `vue` means Vue.
3. **Fetching components:** through MCP when available, otherwise `npx markasui add`, otherwise `/r/{name}.json`.
4. **Design rules:** tokens only, one primary button per area.
5. **Checklist:** files in the right folder, `markas.css` imported, dark mode works, no new dependencies.

The skill works best together with the [MCP server](/docs/mcp).
