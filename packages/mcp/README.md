# @markasui/mcp

MCP server lokal (stdio) untuk [MarkasUI](https://markasui.pages.dev). Agent AI memakainya untuk mencari komponen, mengambil kode Blade, React, atau Vue, dan membaca langkah setup.

## Pasang

Claude Code:

```bash
claude mcp add markasui -- npx -y @markasui/mcp
```

Cursor (`.cursor/mcp.json`) atau VS Code (`.vscode/mcp.json`):

```json
{
  "mcpServers": {
    "markasui": { "command": "npx", "args": ["-y", "@markasui/mcp"] }
  }
}
```

## Tool

| Tool                | Input               | Output                                                  |
| ------------------- | ------------------- | ------------------------------------------------------- |
| `list_components`   | `category?`         | Nama, judul, kategori, deskripsi                        |
| `search_components` | `query`             | Komponen yang cocok                                     |
| `get_component`     | `name`, `framework` | Kode, target path, dependensi, props, aturan AI, contoh |
| `get_theme`         |                     | Isi `markas.css` dan token                              |
| `get_setup`         | `framework`         | Langkah instalasi Tailwind dan `markas.css`             |

Data diambil dari `https://markasui.pages.dev/r/` dan di-cache selama proses berjalan. Arahkan ke mirror atau folder lokal dengan `MARKASUI_REGISTRY`.

Lisensi MIT.
