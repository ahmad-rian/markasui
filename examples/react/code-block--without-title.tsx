import { CodeBlock } from "../../components/code-block/CodeBlock";

const code = [
  "{",
  '  "name": "acme-dashboard",',
  '  "private": true,',
  '  "scripts": {',
  '    "dev": "vite",',
  '    "build": "vite build"',
  "  }",
  "}",
].join("\n");

export default function CodeBlockWithoutTitleExample() {
  return <CodeBlock code={code} />;
}
