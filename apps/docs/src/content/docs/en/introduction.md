---
title: Introduction
description: What MarkasUI is and how to use it in a Blade, React, or Vue project.
seoTitle: "Introduction to MarkasUI, the Tailwind component library"
seoDescription: "MarkasUI is a free, open source Tailwind CSS v4 component library for Laravel Blade, React, and Vue, with Svelte, Astro, and Angular versions."
---

MarkasUI is a free, open source UI component library from CV Jenderal Solusi Digital. Every component ships for Blade (Laravel), React, and Vue, with Svelte, Astro, and Angular versions rolling out, and looks exactly the same in each because they share the same Tailwind CSS classes.

## Principles

- **First-class Blade.** The Blade version is not a side port. Interactivity uses Alpine.js, so it works in Livewire as is.
- **No extra dependencies.** Core components only need React, Vue, or Alpine.js. No `clsx`, `tailwind-merge`, or icon pack.
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

## Language

Built-in component text, like the close button label of Modal, is in English by default. Every built-in label is a prop, so you can translate it, for example `close-label="Tutup"` in Blade or `closeLabel="Tutup"` in React and Vue.

## License

MIT. Free for personal and commercial projects.
