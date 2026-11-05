# MarkasUI

English · [Bahasa Indonesia](README.id.md)

Lightweight UI components for **Blade, React, and Vue**. One design built on Tailwind CSS v4, no runtime dependencies beyond the framework itself, and ready for AI agents.

**Docs:** https://markasui.pages.dev

## Why MarkasUI

- **First-class Blade.** Interactivity uses Alpine.js, so it works in Livewire as is.
- **Identical in every framework.** Guarded by automated visual parity tests (max 0.5% pixel difference).
- **Lightweight.** No `clsx`, `tailwind-merge`, or icon pack. Each React or Vue component ships under 3 KB of gzipped JS.
- **Native elements first.** `<dialog>`, the Popover API, `<details>`.
- **Ready for AI.** Registry JSON, Copy prompt, `llms.txt`, an Agent Skill, and an MCP server.
- **Translatable.** English by default; every built-in label is a prop.

## Get started

```bash
npx markasui@latest init
npx markasui@latest add button modal
```

Or copy the code from a component page in the docs. Full guide: [Installation](https://markasui.pages.dev/docs/installation).

### For AI agents

```bash
claude mcp add markasui -- npx -y @markasui/mcp
```

The Agent Skill lives in [`skills/markasui`](skills/markasui/SKILL.md).

## Repository layout

```
apps/docs/          docs site (Astro), English at / and Indonesian at /id
components/<name>/  single source per component: Blade, React, Vue, meta.json, usage.md, usage.id.md
examples/           identical examples per framework, used by the playground, tests, and docs previews
templates/<slug>/   full-page templates (Blade, React, Vue) built from the components
packages/theme/     markas.css (color tokens)
packages/registry/  registry JSON build with Zod validation
packages/cli/       the "markasui" npm package
packages/mcp/       the "@markasui/mcp" npm package
skills/markasui/    Agent Skill
playground/         Vite test pages for the three frameworks
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE). Made by CV Jenderal Solusi Digital, Purwokerto.
