---
title: CLI
description: Add MarkasUI components to your project with npx markasui.
seoTitle: "markasui CLI: add Tailwind components from the terminal"
seoDescription: "Use npx markasui to detect your framework, set up markas.css, and add Tailwind components to Laravel, React, Vue, Svelte, Astro, or Angular projects."
---

The `markasui` CLI fetches components from the registry and writes them into your project. No install needed, run it with `npx`. Laravel projects can use it too, since they already use Node through Vite.

## init

```bash
npx markasui@latest init
```

- Detects the framework: `artisan` means Blade, `react` in `package.json` means React, `vue` means Vue.
- Creates `markas.json` with the framework and target folders.
- Copies `markas.css` into your CSS folder.

Example `markas.json`:

```json
{
  "framework": "blade",
  "componentsDir": "resources/views/components/markas",
  "cssPath": "resources/css/markas.css"
}
```

## add

```bash
npx markasui@latest add button modal
```

Writes component files to `componentsDir`. The CLI never overwrites an existing file without asking. Use `--overwrite` to replace files without a prompt. When a component needs a dependency (Alpine.js for Blade, for example), the CLI prints the install command.

## list

```bash
npx markasui@latest list
```

Shows every component by category.

## Options

| Option                            | Description                                     |
| --------------------------------- | ----------------------------------------------- |
| `--cwd <path>`                    | Project folder. Defaults to the current folder. |
| `--framework <blade\|react\|vue>` | Skip detection.                                 |
| `--overwrite`                     | Replace changed files without asking.           |
| `-y`, `--yes`                     | Answer yes to every prompt.                     |
| `--registry <url>`                | Another registry, such as a local mirror.       |

## Another registry

The CLI reads components from `https://markas.jenderalcorp.com/r`. Point it at a mirror or a local folder with `--registry` or the `MARKASUI_REGISTRY` environment variable.
