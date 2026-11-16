# MarkasUI

English · [Bahasa Indonesia](README.id.md)

[![CI](https://github.com/ahmad-rian/markasui/actions/workflows/ci.yml/badge.svg)](https://github.com/ahmad-rian/markasui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/markasui?label=markasui)](https://www.npmjs.com/package/markasui)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Free, open source **Tailwind CSS v4 UI components for Laravel Blade, React, Vue, Svelte, Astro, and Angular**. Every component has the same classes, variants, and look in all six frameworks. The CLI copies the source into your project, so you own the code and nothing extra ships at runtime.

**Docs and live previews:** https://markasui.pages.dev

## Frameworks

| Framework     | Built with                                        | Guide                                                               |
| ------------- | ------------------------------------------------- | ------------------------------------------------------------------- |
| Laravel Blade | Anonymous Blade components + Alpine.js (Livewire) | [Blade components](https://markasui.pages.dev/frameworks/blade)     |
| React         | React 19, Server Component friendly               | [React components](https://markasui.pages.dev/frameworks/react)     |
| Vue           | Vue 3 `<script setup>`, Vite and Nuxt             | [Vue components](https://markasui.pages.dev/frameworks/vue)         |
| Svelte        | Svelte 5 runes, SvelteKit and Vite                | [Svelte components](https://markasui.pages.dev/frameworks/svelte)   |
| Astro         | Server rendered, small vanilla scripts            | [Astro components](https://markasui.pages.dev/frameworks/astro)     |
| Angular       | Standalone components with signals                | [Angular components](https://markasui.pages.dev/frameworks/angular) |

## Why MarkasUI

- **Identical in every framework.** Automated visual parity tests compare each framework against React.
- **First-class Blade.** Interactivity uses Alpine.js, so components work inside Livewire as is.
- **Lightweight.** No `clsx`, `tailwind-merge`, or icon pack. Each React or Vue component ships under 3 KB of gzipped JS.
- **Native elements first.** `<dialog>`, the Popover API, `<details>`.
- **Accessible.** Tested against WCAG 2.2 AA with axe and keyboard checks in CI.
- **One theme file.** Light and dark colors come from the tokens in `markas.css`.
- **Ready for AI agents.** Registry JSON, Copy prompt, `llms.txt`, an Agent Skill, and an MCP server.

## Quick start

```bash
npx markasui@latest init
npx markasui@latest add button modal
```

`init` detects Laravel, Next.js, Vite, Nuxt, SvelteKit, Astro, or Angular, saves `markas.css`, and writes `markas.json`. `add` writes each component into your components folder. Prefer to copy by hand? Every component page has the source. Full guide: [Installation](https://markasui.pages.dev/docs/installation).

Browse the [components](https://markasui.pages.dev/components), [dashboard templates](https://markasui.pages.dev/templates), and [landing pages](https://markasui.pages.dev/pages).

### For AI agents

```bash
claude mcp add markasui -- npx -y @markasui/mcp
```

The MCP server works in Claude Code, Cursor, and VS Code ([setup](https://markasui.pages.dev/docs/mcp)). The Agent Skill lives in [`skills/markasui`](skills/markasui/SKILL.md), and the whole library is summarized in [llms.txt](https://markasui.pages.dev/llms.txt).

## Packages

| Package                            | Description                                   |
| ---------------------------------- | --------------------------------------------- |
| [`markasui`](packages/cli)         | CLI: `init`, `add`, and `list`                |
| [`@markasui/mcp`](packages/mcp)    | MCP server for AI coding agents               |
| [`packages/theme`](packages/theme) | `markas.css` color tokens for Tailwind CSS v4 |

## Repository layout

```
apps/docs/          docs site (Astro), English at / and Indonesian at /id
components/<name>/  single source per component: Blade, React, Vue, Svelte, Astro, Angular, meta.json, usage.md
examples/           identical examples per framework, used by the playground, tests, and docs previews
templates/<slug>/   full-page templates built from the components
packages/theme/     markas.css (color tokens)
packages/registry/  registry JSON build with Zod validation
packages/cli/       the "markasui" npm package
packages/mcp/       the "@markasui/mcp" npm package
skills/markasui/    Agent Skill
playground/         Vite test pages for every framework
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Bug reports and ideas go to [GitHub issues](https://github.com/ahmad-rian/markasui/issues).

## License

[MIT](LICENSE). Made by CV Jenderal Solusi Digital, Purwokerto.
