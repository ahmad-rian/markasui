#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { add, CliError, init, list, type CommonOptions } from "./commands.ts";
import { terminalIo } from "./io.ts";
import { RegistryError } from "./registry.ts";

const HELP = `markasui: add MarkasUI components to your project

Usage:
  npx markasui init                 detect the framework, create markas.json, copy markas.css
  npx markasui add <name...>        write components to the components folder
  npx markasui list                 list every component

Options:
  --cwd <path>                      project folder (default: current folder)
  --framework <name>                blade, react, vue, svelte, astro, or angular
                                    (skips framework detection)
  --overwrite                       replace changed files without asking
  -y, --yes                         answer yes to every prompt
  --registry <url|folder>           another registry (default https://markasui.pages.dev/r)
  -h, --help                        show help
  -v, --version                     show version`;

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
        `Unknown command: "${command}". See npx markasui --help`,
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
