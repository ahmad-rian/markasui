import { CodeBlock } from "../../components/code-block/CodeBlock";

const code = [
  "export function formatPrice(amount: number) {",
  '  return new Intl.NumberFormat("en-US", {',
  '    style: "currency",',
  '    currency: "USD",',
  "  }).format(amount);",
  "}",
].join("\n");

export default function CodeBlockFixture() {
  return <CodeBlock code={code} title="format-price.ts" />;
}
