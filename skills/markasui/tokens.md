# MarkasUI tokens

Each token is a Tailwind color: use it with any color utility (`bg-`, `text-`, `border-`, `ring-`, `outline-`, opacity like `bg-danger/10`). Values switch automatically under `.dark`.

| Token            | Use for                                         |
| ---------------- | ----------------------------------------------- |
| `canvas`         | Page background                                 |
| `surface`        | Cards, inputs, panels                           |
| `subtle`         | Hover backgrounds, code background, active item |
| `line`           | Borders and dividers                            |
| `ink`            | Primary text                                    |
| `muted`          | Secondary text                                  |
| `faint`          | Mono labels, placeholders                       |
| `primary`        | Primary buttons, links, focus outline           |
| `primary-strong` | Hover on primary                                |
| `on-primary`     | Text on `primary` and `danger` fills            |
| `primary-soft`   | Badge and highlight background                  |
| `primary-line`   | Badge border                                    |
| `success`        | Success status                                  |
| `warning`        | Warning status                                  |
| `danger`         | Errors, destructive actions                     |

Rebrand by overriding `--markas-*` variables after importing `markas.css`, for example `--markas-primary: #1d4ed8;` in `:root` and a lighter value in `.dark`. Keep text/background pairs at WCAG AA (4.5:1).
