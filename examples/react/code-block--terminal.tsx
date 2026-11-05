import { CodeBlock } from "../../components/code-block/CodeBlock";

const code = [
  "pnpm add markasui",
  "pnpm markasui init",
  "pnpm markasui add carousel",
].join("\n");

export default function CodeBlockTerminalExample() {
  return <CodeBlock code={code} title="Terminal" />;
}
