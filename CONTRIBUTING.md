# Contributing to MarkasUI

Thanks for helping. This guide covers repository setup and the component standards.

## Setup

You need Node 26 (see `.nvmrc`), pnpm 12, PHP 8.4+, and Composer.

```bash
pnpm install
composer install
pnpm exec playwright install chromium
```

## Everyday commands

| Command                                             | What it does                                                    |
| --------------------------------------------------- | --------------------------------------------------------------- |
| `pnpm playground`                                   | Blade, React, and Vue test pages at http://localhost:5173       |
| `pnpm dev`                                          | Docs site at http://localhost:4321                              |
| `pnpm lint`                                         | ESLint, Prettier, Laravel Pint                                  |
| `pnpm typecheck`                                    | vue-tsc and astro check                                         |
| `pnpm test`                                         | Vitest (React, Vue, Blade rendering, registry, CLI, MCP)        |
| `pnpm test:e2e`                                     | Visual parity, axe-core, and keyboard tests for every component |
| `pnpm build`, then `pnpm test:docs` and `pnpm size` | Docs site, site tests, and size budgets                         |

## Adding a component

1. Create `components/<name>/` with `<name>.blade.php`, `<Name>.tsx`, `<Name>.vue`, `meta.json`, `usage.md`, and `usage.id.md`. See `components/modal/` for a complete example.
2. Write **identical** Tailwind classes in all three versions and keep them in constants, not inline in templates.
3. Use only the color tokens from `markas.css` (`bg-primary`, `text-muted`, `border-line`). The registry build fails on hex values or Tailwind palette colors.
4. Make every built-in text a prop named `<purpose>Label` with an English default, the same in all three versions.
5. Write `meta.json` in English and add the complete Indonesian translation in `i18n.id`. The build fails when a translation is missing.
6. Add identical examples in `examples/blade`, `examples/react`, and `examples/vue`. The component then joins the visual parity and axe-core tests automatically.
7. Add unit tests in `tests/unit/` and keyboard tests in `tests/e2e/` for interactive components.

Full rules: [`CLAUDE.md`](CLAUDE.md) and [`docs/PRD.md`](docs/PRD.md) sections 6 and 11.

## Definition of done

- [ ] Blade, React, Vue, `meta.json`, `usage.md`, and `usage.id.md` are complete
- [ ] Only color tokens from `markas.css`
- [ ] Passes visual parity, axe-core, and keyboard tests
- [ ] Within the size budget (`pnpm size`)
- [ ] Correct in light and dark mode
- [ ] Docs pages, `.md` versions, and registry entries generate in both languages

## Commits

Use `<type>: <description>` with `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, or `ci`. No em dashes in UI text or docs.
