---
layout: ../../layouts/DocsMarkdown.astro
title: MCP
description: Pasang MCP server MarkasUI di Claude Code, Cursor, dan VS Code.
---

Paket `@markasui/mcp` adalah MCP server lokal yang berjalan lewat stdio. Agent AI memakainya untuk mencari komponen, mengambil kode untuk framework yang tepat, dan membaca langkah instalasi. Data diambil dari registry `/r/` dan di-cache di memori selama proses berjalan.

## Claude Code

```bash
claude mcp add markasui -- npx -y @markasui/mcp
```

## Cursor

Tambahkan ke `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "markasui": { "command": "npx", "args": ["-y", "@markasui/mcp"] }
  }
}
```

## VS Code

Tambahkan ke `.vscode/mcp.json`:

```json
{
  "servers": {
    "markasui": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

## Tool yang tersedia

| Tool                | Input               | Output                                                            |
| ------------------- | ------------------- | ----------------------------------------------------------------- |
| `list_components`   | `category?`         | Nama, judul, kategori, deskripsi semua komponen                   |
| `search_components` | `query`             | Komponen yang cocok berdasarkan nama, deskripsi, dan tag          |
| `get_component`     | `name`, `framework` | Kode, props, dependensi, aturan AI, contoh pemakaian, target path |
| `get_theme`         | tidak ada           | Isi `markas.css` dan daftar token                                 |
| `get_setup`         | `framework`         | Langkah instalasi Tailwind dan `markas.css`                       |

## Contoh prompt

> Buat halaman login Laravel memakai komponen MarkasUI: input email, input kata sandi, dan tombol masuk.

Agent akan memanggil `get_setup`, lalu `get_component` untuk `input` dan `button`, dan menyimpan file di folder yang benar.
