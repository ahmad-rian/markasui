---
title: Agent Skill
description: Ajari agent AI cara memakai MarkasUI lewat SKILL.md.
---

Agent Skill adalah file `SKILL.md` yang mengajari agent (Claude Code dan agent lain yang mendukung skill) cara memakai MarkasUI: kapan dipakai, cara mendeteksi framework, cara mengambil komponen, aturan desain, dan checklist sebelum selesai.

## Pasang manual

Salin folder `skills/markasui` dari repository ke project Anda:

```bash
npx degit ahmad-rian/markasui/skills/markasui .claude/skills/markasui
```

Untuk semua project, simpan di `~/.claude/skills/markasui`.

## Isi skill

1. **Kapan dipakai:** user menyebut MarkasUI, atau meminta UI di project yang sudah memakai `markas.css`.
2. **Deteksi framework:** `artisan` dan `resources/views` berarti Blade, `react` di `package.json` berarti React, `vue` berarti Vue.
3. **Mengambil komponen:** lewat MCP kalau tersedia, kalau tidak lewat `npx markasui add`, kalau tidak lewat `/r/{name}.json`.
4. **Aturan desain:** hanya token warna, satu tombol primary per area.
5. **Checklist:** file di path yang benar, `markas.css` ter-import, dark mode berfungsi, tidak ada dependensi baru.

Skill bekerja paling baik bersama [MCP server](/id/docs/mcp).
