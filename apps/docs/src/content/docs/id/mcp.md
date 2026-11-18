---
title: MCP
description: Pasang MCP server MarkasUI di Claude Code, Codex, JenderalCode, Cursor, VS Code, Gemini CLI, Antigravity, dan agent coding AI lainnya.
seoTitle: "MCP server MarkasUI untuk Claude Code, Codex, Cursor, dan lainnya"
seoDescription: "Pasang @markasui/mcp di Claude Code, Codex, JenderalCode, Cursor, VS Code, Gemini CLI, atau Antigravity agar agent mengambil kode MarkasUI sesuai framework."
---

Paket `@markasui/mcp` adalah MCP server lokal yang berjalan lewat stdio. Agent AI memakainya untuk mencari komponen, mengambil kode untuk framework yang tepat, dan membaca langkah instalasi. Data diambil dari registry `/r/` dan di-cache di memori selama proses berjalan.

Semua harness menjalankannya dengan cara yang sama: `npx -y @markasui/mcp`. Anda butuh Node.js 20 atau lebih baru. Yang berbeda hanya tempat perintah itu ditulis, dan halaman ini mencantumkannya untuk setiap tool.

## Pasang cepat

Agent yang punya perintah `mcp add`:

```bash
# Claude Code
claude mcp add markasui -- npx -y @markasui/mcp

# OpenAI Codex (CLI, ekstensi IDE, dan aplikasi memakai konfigurasi yang sama)
codex mcp add markasui -- npx -y @markasui/mcp

# Gemini CLI (flag untuk npx ditulis setelah --)
gemini mcp add markasui npx -- -y @markasui/mcp

# OpenCode
opencode mcp add markasui -- npx -y @markasui/mcp

# Amp
amp mcp add markasui -- npx -y @markasui/mcp
```

Sebagian besar tool lain membaca file JSON berisi objek `mcpServers`. Isinya sama di mana pun, hanya path file-nya yang berbeda:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

## Claude Code

```bash
claude mcp add markasui -- npx -y @markasui/mcp
```

Perintah ini menyimpan server untuk Anda sendiri di project saat ini. Tambahkan `--scope user` supaya tersedia di semua project, atau `--scope project` supaya ditulis ke `.mcp.json` di root project dan tim Anda mendapatkannya lewat git. File `.mcp.json` juga bisa ditulis manual:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

Cek: jalankan `claude mcp get markasui`, atau ketik `/mcp` di sesi dan pastikan `markasui` berstatus terhubung.

## OpenAI Codex

```bash
codex mcp add markasui -- npx -y @markasui/mcp
```

Perintah ini menulis ke `~/.codex/config.toml`. Untuk mengeditnya sendiri, tambahkan tabel berikut (atau di `.codex/config.toml` supaya hanya berlaku untuk satu project):

```toml
[mcp_servers.markasui]
command = "npx"
args = ["-y", "@markasui/mcp"]
```

Codex CLI, ekstensi IDE, dan aplikasi desktop ChatGPT membaca file yang sama, jadi satu kali pasang sudah berlaku untuk ketiganya.

Cek: jalankan `codex mcp list`, atau ketik `/mcp` di TUI Codex.

## JenderalCode

[JenderalCode](https://code.jenderalcorp.com/) membaca `.mcp.json` project yang sama dengan Claude Code. Commit file ini di root project:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

`.mcp.json` sebuah project baru dijalankan setelah Anda memercayai file itu persis: buka bagian MCP di Settings lalu pilih **Trust and run**. Mengedit file tersebut mencabut kepercayaan itu, jadi JenderalCode akan bertanya lagi.

Supaya MarkasUI tersedia di semua project, tambahkan server lewat pengaturan MCP. Server disimpan ke `~/.config/jenderalcode/mcp.json` dengan format yang sama. JenderalCode juga membaca [Agent Skill](/id/docs/skills) dari `.claude/skills` dan `~/.claude/skills`.

Cek: server tampil berjalan di pengaturan MCP beserta daftar tool-nya.

## Claude Desktop

Buka **Settings**, lalu **Developer**, lalu **Edit Config**. Ini membuka `claude_desktop_config.json`:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

Tutup Claude Desktop sepenuhnya lalu buka lagi. Cek: buka menu konektor di kolom chat dan cari `markasui`. Log ada di `~/Library/Logs/Claude` (macOS) atau `%APPDATA%\Claude\logs` (Windows).

## Cursor

[Tambahkan MarkasUI ke Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=markasui&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBtYXJrYXN1aS9tY3AiXX0=) dengan sekali klik, atau tambahkan ke `.cursor/mcp.json` di project (`~/.cursor/mcp.json` untuk semua project):

```json
{
  "mcpServers": {
    "markasui": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

Cek: server muncul di pengaturan MCP Cursor. Kalau gagal, buka panel Output lalu pilih **MCP Logs**.

## VS Code dan GitHub Copilot

Tambahkan `.mcp.json` di root workspace supaya server bisa dipakai bersama tim:

```json
{
  "mcpServers": {
    "markasui": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@markasui/mcp"],
      "tools": ["*"]
    }
  }
}
```

Untuk semua workspace, tulis isi yang sama di `~/.copilot/mcp-config.json`, yang juga dibaca Copilot CLI.

Anda juga bisa [memasangnya di VS Code](https://vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522markasui%2522%252C%2522type%2522%253A%2522stdio%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522-y%2522%252C%2522%2540markasui%252Fmcp%2522%255D%257D) dengan sekali klik, atau dari terminal. Keduanya menambahkan server ke profil pengguna VS Code:

```bash
code --add-mcp '{"name":"markasui","type":"stdio","command":"npx","args":["-y","@markasui/mcp"]}'
```

Setup lama memakai `.vscode/mcp.json` dengan kunci `servers`, bukan `mcpServers`. VS Code masih membacanya, tetapi konfigurasi Copilot baru sebaiknya memakai file di atas.

Cek: jalankan **MCP: List Servers** dari Command Palette.

## Gemini CLI

```bash
gemini mcp add markasui npx -- -y @markasui/mcp
```

Perintah ini menulis ke `.gemini/settings.json` di project. Tambahkan `--scope user` untuk menulis ke `~/.gemini/settings.json`. Isinya di kedua file:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

Cek: jalankan `gemini mcp list`, atau ketik `/mcp` di sesi.

## Google Antigravity

Di panel agent, buka menu **…**, pilih **MCP Servers**, lalu **Manage MCP Servers**, lalu **View raw config**. Tempel isi berikut ke `mcp_config.json`:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

File global ada di `~/.gemini/config/mcp_config.json`. Untuk satu project, pakai `.agents/mcp_config.json` di workspace.

Cek: ketik `/mcp` di panel prompt untuk melihat status server.

## Devin Desktop (Windsurf)

Windsurf sekarang bernama Devin Desktop, dan konfigurasi MCP-nya sama dengan Devin CLI:

```bash
devin mcp add markasui -- npx -y @markasui/mcp
```

Atau edit file-nya manual: `.devin/mcp_config.json` di project, atau `~/.config/devin/mcp_config.json` (`%APPDATA%\devin\mcp_config.json` di Windows) untuk semua project. Pakai isi `mcpServers` dari [Pasang cepat](#pasang-cepat).

Cek: jalankan `devin mcp list`, atau buka **Customize** di jendela Agents lalu klik **MCPs**.

## Zed

Tambahkan ke `settings.json` Zed:

```json
{
  "context_servers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"],
      "env": {}
    }
  }
}
```

Cek: di **Settings**, **AI**, **MCP Servers**, titik hijau di samping `markasui` berarti server aktif.

## JetBrains AI Assistant dan Junie

AI Assistant: buka **Settings**, **Tools**, **AI Assistant**, **Model Context Protocol (MCP)**, klik **Add**, lalu tempel JSON `mcpServers` dari [Pasang cepat](#pasang-cepat). Klik **Apply** lalu lihat kolom **Status**.

Junie: tulis JSON yang sama di `.junie/mcp/mcp.json` di root project, atau di `~/.junie/mcp/mcp.json` untuk semua project. Server yang ditambahkan dari **Tools**, **Junie**, **MCP Settings** disimpan ke file global. Cek dengan `/mcp` di Junie CLI.

## Cline

Klik ikon **MCP Servers** di toolbar Cline, buka tab **Configure**, lalu klik **Configure MCP Servers**. Ini membuka `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"],
      "disabled": false
    }
  }
}
```

Cek: tool server muncul di panel MCP Servers.

## Roo Code

Tambahkan ke `.roo/mcp.json` di root project, atau buka `mcp_settings.json` global lewat **Edit Global MCP** di bagian bawah pengaturan Roo Code:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

File project yang dipakai kalau keduanya mendefinisikan `markasui`. Cek: server tampil aktif di daftar MCP servers.

## Kiro

Tambahkan ke `.kiro/settings/mcp.json` di workspace, atau `~/.kiro/settings/mcp.json` untuk semua workspace. Command palette punya **Kiro: Open workspace MCP config (JSON)** untuk ini.

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"],
      "disabled": false
    }
  }
}
```

Kiro langsung menerapkan perubahan saat file disimpan.

## OpenCode

```bash
opencode mcp add markasui -- npx -y @markasui/mcp
```

Atau tambahkan ke `opencode.jsonc` di project (`~/.config/opencode/opencode.json` untuk semua project). OpenCode punya format sendiri, dengan perintah ditulis sebagai satu array:

```json
{
  "mcp": {
    "servers": {
      "markasui": {
        "type": "local",
        "command": ["npx", "-y", "@markasui/mcp"]
      }
    }
  }
}
```

Cek: `opencode mcp list` menampilkan `markasui` berstatus terhubung.

## Continue

Buat `.continue/mcpServers/markasui.yaml` di workspace:

```yaml
name: MarkasUI
version: 0.0.1
schema: v1
mcpServers:
  - name: markasui
    type: stdio
    command: npx
    args: ["-y", "@markasui/mcp"]
```

Continue juga menerima file JSON di folder itu dengan format `mcpServers` dari [Pasang cepat](#pasang-cepat). Tool MCP hanya bisa dipakai di mode agent.

## Warp

Buka **Settings**, **Agents**, **MCP servers** (atau cari **Open MCP Servers** di Command Palette), klik **+ Add**, lalu tempel JSON `mcpServers` dari [Pasang cepat](#pasang-cepat).

Cek: `markasui` tampil sedang berjalan dan tool-nya terlihat.

## Amp

```bash
amp mcp add markasui -- npx -y @markasui/mcp
```

Atau tambahkan di bawah `amp.mcpServers` di `~/.config/amp/settings.json` (`.amp/settings.json` untuk satu workspace):

```json
{
  "amp.mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"]
    }
  }
}
```

Cek: jalankan `amp mcp doctor`.

## Goose

Jalankan `goose configure`, pilih **Add Extension**, lalu **Command-line Extension**. Beri nama `markasui` dan isi perintah `npx -y @markasui/mcp`. Hasilnya di `~/.config/goose/config.yaml`:

```yaml
extensions:
  markasui:
    name: markasui
    type: stdio
    cmd: npx
    args: ["-y", "@markasui/mcp"]
    enabled: true
    timeout: 300
```

## GitHub Copilot cloud agent

Agent yang mengerjakan issue dan pull request di GitHub membaca server dari pengaturan repository. Buka **Settings**, lalu **Copilot**, lalu **MCP servers**, tempel isi berikut, lalu klik **Save MCP configuration**:

```json
{
  "mcpServers": {
    "markasui": {
      "type": "local",
      "command": "npx",
      "args": ["-y", "@markasui/mcp"],
      "tools": [
        "list_components",
        "search_components",
        "get_component",
        "get_theme",
        "get_setup"
      ]
    }
  }
}
```

Copilot menjalankan tool ini tanpa bertanya, dan kelimanya hanya membaca registry. Kalau log sesi menampilkan peringatan firewall, tambahkan `markas.jenderalcorp.com` ke allowlist firewall agent.

Cek: assign sebuah issue ke Copilot, buka **View session**, lalu buka langkah **Start MCP Servers**. Daftar tool ada di bagian bawah.

## Tool yang tersedia

| Tool                | Input               | Output                                                            |
| ------------------- | ------------------- | ----------------------------------------------------------------- |
| `list_components`   | `category?`         | Nama, judul, kategori, deskripsi semua komponen                   |
| `search_components` | `query`             | Komponen yang cocok berdasarkan nama, deskripsi, dan tag          |
| `get_component`     | `name`, `framework` | Kode, props, dependensi, aturan AI, contoh pemakaian, target path |
| `get_theme`         | tidak ada           | Isi `markas.css` dan daftar token                                 |
| `get_setup`         | `framework`         | Langkah instalasi Tailwind dan `markas.css`                       |

`framework` berisi salah satu dari `blade`, `react`, `vue`, `svelte`, `astro`, atau `angular`.

## Registry lain

Set variabel `MARKASUI_REGISTRY` di konfigurasi MCP untuk memakai mirror atau folder lokal. Nilainya adalah folder yang berisi `index.json`: URL `https://` atau path lokal. Bawaannya `https://markas.jenderalcorp.com/r`.

```bash
claude mcp add markasui --env MARKASUI_REGISTRY=https://mirror.example.com/r -- npx -y @markasui/mcp
```

Di konfigurasi JSON, tambahkan objek `env` di samping `args`:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "npx",
      "args": ["-y", "@markasui/mcp"],
      "env": { "MARKASUI_REGISTRY": "https://mirror.example.com/r" }
    }
  }
}
```

Di Codex, tambahkan `env = { MARKASUI_REGISTRY = "https://mirror.example.com/r" }` ke tabel `[mcp_servers.markasui]`. OpenCode menamai objek ini `environment`, sedangkan Goose menamainya `envs`.

## Windows

Sebagian besar harness bisa menjalankan `npx` di Windows tanpa perubahan. Kalau server tidak pernah terhubung, atau log menampilkan `spawn npx ENOENT`, jalankan lewat `cmd /c`:

```json
{
  "mcpServers": {
    "markasui": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@markasui/mcp"]
    }
  }
}
```

Untuk perintah `mcp add`, tulis `cmd /c` sebelum `npx`:

```bash
claude mcp add markasui -- cmd /c npx -y @markasui/mcp
```

## Pemecahan masalah

- **Versi Node.** Jalankan `node --version` dan pasang Node.js 20 atau lebih baru kalau versinya lebih lama. Aplikasi desktop di macOS kadang tidak melihat Node yang dipasang lewat nvm atau fnm. Pakai path lengkap dari `which npx` sebagai `command`.
- **Versi lama dari cache npx.** `npx` memakai ulang salinan yang sudah diunduh sebelumnya. Pakai `@markasui/mcp@latest` di `args` untuk mendapat rilis terbaru, atau hapus folder `_npx` di dalam folder yang dicetak `npm config get cache`.
- **Proxy kantor.** `npx` mengunduh lewat npm, jadi set `npm config set https-proxy http://proxy.example.com:8080`. Setelah itu server mengambil registry dengan `fetch` bawaan Node: di Node 22.21 atau 24 ke atas, tambahkan `HTTPS_PROXY` dan `NODE_USE_ENV_PROXY=1` ke `env` server. Kalau proxy memakai sertifikat sendiri, tambahkan `NODE_EXTRA_CA_CERTS` berisi path sertifikat tersebut. Kalau registry diblokir sama sekali, arahkan `MARKASUI_REGISTRY` ke mirror atau salinan lokal.
- **Error registry.** `Cannot reach the registry` berarti URL tidak bisa dijangkau dari mesin tempat agent berjalan. `Not found in the registry` berarti `MARKASUI_REGISTRY` tidak menunjuk ke folder yang berisi `index.json`.
- **Uji di terminal.** Jalankan `npx -y @markasui/mcp`. Server yang berfungsi tidak mencetak apa pun dan menunggu input, karena klien MCP berkomunikasi lewat stdin. Tekan `Ctrl+C` untuk berhenti. Error yang muncul di sini sama dengan yang dialami harness Anda.

## Contoh prompt

> Buat halaman login Laravel memakai komponen MarkasUI: input email, input kata sandi, dan tombol masuk.

Agent akan memanggil `get_setup`, lalu `get_component` untuk `input` dan `button`, dan menyimpan file di folder yang benar.
