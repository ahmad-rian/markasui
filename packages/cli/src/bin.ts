#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { add, CliError, init, list, type CommonOptions } from "./commands.ts";
import { terminalIo } from "./io.ts";
import { RegistryError } from "./registry.ts";

const HELP = `markasui: tambahkan komponen MarkasUI ke project Anda

Pemakaian:
  npx markasui init                 deteksi framework, buat markas.json, salin markas.css
  npx markasui add <nama...>        tulis komponen ke folder komponen
  npx markasui list                 tampilkan semua komponen

Opsi:
  --cwd <path>                      folder project (default: folder saat ini)
  --framework <blade|react|vue>     lewati deteksi otomatis
  --overwrite                       timpa file yang berbeda tanpa bertanya
  -y, --yes                         jawab ya untuk semua konfirmasi
  --registry <url|folder>           registry lain (default https://markasui.pages.dev/r)
  -h, --help                        bantuan
  -v, --version                     versi`;

function version(): string {
  const pkg = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url), "utf8"),
  ) as { version: string };
  return pkg.version;
}

async function main(argv: string[]) {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      cwd: { type: "string" },
      framework: { type: "string" },
      registry: { type: "string" },
      overwrite: { type: "boolean" },
      yes: { type: "boolean", short: "y" },
      help: { type: "boolean", short: "h" },
      version: { type: "boolean", short: "v" },
    },
  });

  if (values.version) return terminalIo.log(version());
  const [command, ...rest] = positionals;
  if (values.help || !command) return terminalIo.log(HELP);

  const options: CommonOptions = {
    cwd: resolve(values.cwd ?? process.cwd()),
    framework: values.framework,
    registry: values.registry,
    overwrite: values.overwrite,
    yes: values.yes,
  };

  switch (command) {
    case "init":
      return void (await init(options, terminalIo));
    case "add":
      return add(rest, options, terminalIo);
    case "list":
      return list(options, terminalIo);
    default:
      throw new CliError(
        `Perintah tidak dikenal: "${command}". Lihat npx markasui --help`,
      );
  }
}

main(process.argv.slice(2)).catch((error: unknown) => {
  const known =
    error instanceof CliError ||
    error instanceof RegistryError ||
    (error as Error).name === "TypeError";
  console.error(`markasui: ${known ? (error as Error).message : error}`);
  process.exit(1);
});
