---
title: Agent Skill
description: Ajari agent AI cara memakai MarkasUI lewat SKILL.md di Claude Code, Codex, JenderalCode, Cursor, VS Code, Gemini CLI, dan Antigravity.
seoTitle: "Agent Skill MarkasUI untuk Claude Code, Codex, Cursor, dan lainnya"
seoDescription: "Pasang SKILL.md MarkasUI di Claude Code, Codex, JenderalCode, Cursor, Gemini CLI, atau Antigravity supaya agent mengenali framework dan mengikuti aturan."
---

Agent Skill adalah file `SKILL.md` yang mengajari agent cara memakai MarkasUI: kapan dipakai, cara mendeteksi framework, cara mengambil komponen, aturan desain, dan checklist sebelum selesai. Formatnya dipakai bersama oleh Claude Code, Codex, dan sebagian besar agent coding lain, jadi satu folder bisa dipakai di mana saja. Yang berbeda hanya folder tempat agent mencarinya.

## Claude Code

Salin folder `skills/markasui` dari repository ke project Anda:

```bash
npx degit ahmad-rian/markasui/skills/markasui .claude/skills/markasui
```

Untuk semua project, simpan di `~/.claude/skills/markasui`. Claude memakai skill ini sendiri kalau tugasnya cocok, atau Anda bisa menjalankannya dengan `/markasui`.

## Agent lain

Codex, Gemini CLI, Antigravity, Cursor, VS Code, dan JenderalCode semuanya membaca `.agents/skills`, jadi satu salinan di sana sudah cukup untuk semuanya:

```bash
npx degit ahmad-rian/markasui/skills/markasui .agents/skills/markasui
```

| Agent              | Folder project                                       | Folder global                               | Cara menjalankan              |
| ------------------ | ---------------------------------------------------- | ------------------------------------------- | ----------------------------- |
| JenderalCode       | `.agents/skills` atau `.claude/skills`               | `~/.agents/skills` atau `~/.claude/skills`  | `/markasui`                   |
| OpenAI Codex       | `.agents/skills`                                     | `~/.agents/skills`                          | `$markasui`, atau `/skills`   |
| Gemini CLI         | `.agents/skills` atau `.gemini/skills`               | `~/.agents/skills` atau `~/.gemini/skills`  | `/skills list` untuk mengecek |
| Google Antigravity | `.agents/skills`                                     | `~/.gemini/config/skills`                   | `/markasui`                   |
| Cursor             | `.agents/skills`, `.cursor/skills`, `.claude/skills` | `~/.agents/skills` atau `~/.cursor/skills`  | `/markasui`                   |
| VS Code (Copilot)  | `.github/skills`, `.agents/skills`, `.claude/skills` | `~/.copilot/skills` atau `~/.agents/skills` | `/markasui`                   |

JenderalCode juga membaca skill yang sudah Anda simpan di `~/.claude`, jadi skill yang terpasang untuk Claude Code langsung bisa dipakai tanpa salinan kedua. Setiap agent di tabel juga memilih skill ini sendiri kalau tugasnya cocok dengan deskripsinya.

## Isi skill

1. **Kapan dipakai:** user menyebut MarkasUI, atau meminta UI di project yang sudah memakai `markas.css`.
2. **Deteksi framework:** `artisan` dan `resources/views` berarti Blade, `react` di `package.json` berarti React, `vue` berarti Vue.
3. **Mengambil komponen:** lewat MCP kalau tersedia, kalau tidak lewat `npx markasui add`, kalau tidak lewat `/r/{name}.json`.
4. **Aturan desain:** hanya token warna, satu tombol primary per area.
5. **Checklist:** file di path yang benar, `markas.css` ter-import, dark mode berfungsi, tidak ada dependensi baru.

Skill bekerja paling baik bersama [MCP server](/id/docs/mcp).
