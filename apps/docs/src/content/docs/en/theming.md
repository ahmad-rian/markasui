---
title: Theming
description: The MarkasUI color tokens and how to change the brand color.
seoTitle: "Theming Tailwind components with CSS color tokens"
seoDescription: "Every MarkasUI color comes from CSS variables in markas.css. Change the brand color, adjust dark mode, and keep components free of hex values."
---

Every component color comes from the `--markas-*` CSS variables in `markas.css`. Components never use hex values or default Tailwind colors like `bg-green-700`, so changing the theme only means changing the variables.

## Changing the brand color

Override the variables after importing `markas.css`:

```css
@import "./markas.css";

:root {
  --markas-primary: #1d4ed8;
  --markas-primary-strong: #1e40af;
  --markas-primary-soft: #e0e7ff;
  --markas-primary-line: #a5b4fc;
}

.dark {
  --markas-primary: #818cf8;
  --markas-primary-strong: #a5b4fc;
  --markas-primary-soft: #1e1b4b;
  --markas-primary-line: #3730a3;
}
```

Keep every text and background pair at WCAG AA contrast (4.5:1).

## Tokens

| Token            | Tailwind class        | Used for                            |
| ---------------- | --------------------- | ----------------------------------- |
| `canvas`         | `bg-canvas`           | Page background                     |
| `surface`        | `bg-surface`          | Cards, preview boxes, inputs        |
| `subtle`         | `bg-subtle`           | Hover, code background, active item |
| `line`           | `border-line`         | Borders and dividers                |
| `ink`            | `text-ink`            | Primary text                        |
| `muted`          | `text-muted`          | Secondary text                      |
| `faint`          | `text-faint`          | Placeholders and meta               |
| `primary`        | `bg-primary`          | Primary buttons, links, focus       |
| `primary-strong` | `bg-primary-strong`   | Primary hover                       |
| `on-primary`     | `text-on-primary`     | Text on primary                     |
| `primary-soft`   | `bg-primary-soft`     | Badge and highlight background      |
| `primary-line`   | `border-primary-line` | Badge border                        |
| `success`        | `bg-success`          | Success state                       |
| `warning`        | `bg-warning`          | Warnings                            |
| `danger`         | `bg-danger`           | Errors and destructive actions      |

The light and dark value of every token is also in the registry: [`/r/theme.json`](/r/theme.json).

## Shadow

Floating elements (Dropdown Menu, Tooltip, Toast, Modal, Drawer) use a single `shadow-overlay` token. Change it with `--shadow-overlay` in `@theme` if needed.

## Radius and font

Components use Tailwind's default radii (`rounded-md` 6px, `rounded-lg` 8px, `rounded-xl` 12px) and load no fonts. Text uses your project's font.
