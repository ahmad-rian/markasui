---
title: Introduction
description: What MarkasUI is and how to use it in a Blade, React, Vue, Svelte, Astro, or Angular project.
seoTitle: "Introduction to MarkasUI, the Tailwind component library"
seoDescription: "MarkasUI is a free, open source Tailwind CSS v4 component library for Laravel Blade, React, Vue, Svelte, Astro, and Angular."
---

MarkasUI is a free, open source UI component library from CV Jenderal Solusi Digital. Every component and template ships for six frameworks: Blade (Laravel), React, Vue, Svelte, Astro, and Angular. Each version looks exactly the same because they share the same Tailwind CSS classes.

## Principles

- **First-class Blade.** The Blade version is not a side port. Interactivity uses Alpine.js, so it works in Livewire as is.
- **No extra dependencies.** Core components depend only on their own framework: React, Vue, Svelte 5, or Angular. Astro components render on the server with a small vanilla script, and Blade uses Alpine.js. No `clsx`, `tailwind-merge`, or icon pack.
- **Native elements first.** Modal uses `<dialog>`, Accordion uses `<details>`, Dropdown Menu and Tooltip use the Popover API.
- **You own the code.** Components are copied into your project, not installed as a package. Change them as you like.
- **Ready for AI.** The registry JSON, Copy prompt, `llms.txt`, Agent Skill, and MCP server help agents like Claude Code and Cursor use the components correctly.

## How to use it

1. Install Tailwind CSS v4 and `markas.css`. Follow [Installation](/docs/installation).
2. Pick your framework in the sidebar. The choice applies across the whole site.
3. Open a component page and copy the code, or run the CLI:

```bash
npx markasui@latest add button
```

## Where files go

| Framework | Default folder                       | Usage                |
| --------- | ------------------------------------ | -------------------- |
| Blade     | `resources/views/components/markas/` | `<x-markas.button>`  |
| React     | `src/components/markas/`             | `import { Button }`  |
| Vue       | `src/components/markas/`             | `import Button from` |
| Svelte    | `src/lib/components/markas/`         | `import Button from` |
| Astro     | `src/components/markas/`             | `import Button from` |
| Angular   | `src/app/markas/`                    | `import { Button }`  |

## Language

Built-in component text, like the close button label of Modal, is in English by default. Every built-in label is a prop, so you can translate it, for example `close-label="Tutup"` in Blade or `closeLabel="Tutup"` in the other frameworks.

## License

MIT. Free for personal and commercial projects.
