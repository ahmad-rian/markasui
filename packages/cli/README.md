# markasui

The CLI for [MarkasUI](https://markasui.pages.dev): free Tailwind CSS v4 UI components for **Laravel Blade, React, Vue, Svelte, Astro, and Angular**. It copies component source into your project, so you own the code and add nothing to your runtime.

```bash
npx markasui@latest init          # detect the framework, create markas.json, copy markas.css
npx markasui@latest add button    # write components to your components folder
npx markasui@latest list          # list every component
```

`init` detects Laravel, Next.js, Vite, Nuxt, SvelteKit, Astro, and Angular projects and picks the matching folder:

| Framework | Components folder                   |
| --------- | ----------------------------------- |
| Blade     | `resources/views/components/markas` |
| React     | `src/components/markas`             |
| Vue       | `src/components/markas`             |
| Svelte    | `src/lib/components/markas`         |
| Astro     | `src/components/markas`             |
| Angular   | `src/app/markas`                    |

Options: `--cwd`, `--framework blade|react|vue|svelte|astro|angular`, `--overwrite`, `--yes`, `--registry <url|folder>`. The registry can also be set with the `MARKASUI_REGISTRY` environment variable.

The CLI never overwrites a file you changed without asking. Requires Node 20 or newer.

- Docs: https://markasui.pages.dev/docs/cli
- Components: https://markasui.pages.dev/components
- Source and issues: https://github.com/ahmad-rian/markasui

MIT license. Made by CV Jenderal Solusi Digital, Purwokerto.
