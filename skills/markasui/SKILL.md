---
name: markasui
description: Build UI with MarkasUI components (Blade, React, Vue on Tailwind v4). Use when the user mentions MarkasUI, or asks for UI in a project that has markas.css or markas.json.
---

# MarkasUI

MarkasUI ships each component in three versions (Blade + Alpine.js, React, Vue) with identical Tailwind classes. Components are copied into the project, never installed as a package. All color comes from **tokens** defined in `markas.css`.

## 1. Detect the framework

Check the project root, first match wins:

- `artisan` and `resources/views/` exist → **blade**
- `package.json` depends on `react` (or `next`) → **react**
- `package.json` depends on `vue` (or `nuxt`) → **vue**

`markas.json`, when present, is authoritative: use its `framework` and `componentsDir`.

Done when you can name one framework and the components folder.

## 2. Make sure the base is installed

`markas.css` must be imported by the main stylesheet, with Tailwind CSS v4 active. When it is missing, run `npx markasui@latest init` (or MCP `get_setup`) and follow its printed steps.

Done when the main CSS imports `markas.css` and `markas.json` exists.

## 3. Fetch components, never write them from memory

Use the first available source:

1. MCP tools `search_components` / `get_component` (server `markasui`).
2. CLI: `npx markasui@latest add <name...>`.
3. Registry JSON: `https://markasui.pages.dev/r/<name>.json`, field `frameworks.<framework>.code`, saved to `frameworks.<framework>.target`.

List available names with `list_components`, `npx markasui@latest list`, or `/r/index.json`. Install any `deps` the component reports (Blade overlays need Alpine.js; Livewire 3 already ships it).

Done when every component the page uses exists as a file in the components folder, byte-identical to the registry copy.

## 4. Compose the page

- Blade: `<x-markas.button>`. React: `import { Button } from "@/components/markas/Button"`. Vue: `import Button from "@/components/markas/Button.vue"`.
- Style your own layout with tokens only: `bg-canvas`, `bg-surface`, `text-ink`, `text-muted`, `border-line`, `bg-primary`, `text-on-primary`. Full list: [tokens.md](tokens.md).
- One `variant="primary"` button per area; secondary actions use `secondary` or `ghost`; destructive actions use `danger`.
- Metadata labels use the mono label style: `font-mono text-[11px] uppercase tracking-[0.2em] text-faint`.
- Pass validation messages into the `error` prop of Input, Textarea, and Select. Every field gets a visible `label`.
- Customize by props first (`variant`, `size`); extra classes are appended last and there is no `tailwind-merge`.
- Each component's `ai.rules` in the registry are binding.

## 5. Finish

Check every item before reporting done:

- [ ] Component files sit in the folder from step 1, unmodified.
- [ ] `markas.css` is imported once by the main stylesheet.
- [ ] Every color class in your new code is a token; dark mode (`.dark` on `<html>`) still renders correctly.
- [ ] No new npm/composer dependency beyond what a component's `deps` listed.
- [ ] Interactive parts work by keyboard: Tab reaches them, Escape closes overlays.
