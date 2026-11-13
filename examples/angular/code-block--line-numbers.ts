import { Component } from "@angular/core";
import { CodeBlock } from "../../components/code-block/code-block.component";

@Component({
  selector: "markas-example",
  imports: [CodeBlock],
  template: `<div
    markas-code-block
    [code]="code"
    title="Counter.tsx"
    showLineNumbers
  ></div>`,
})
export default class CodeBlockLineNumbersExample {
  protected readonly code = [
    'import { useState } from "react";',
    "",
    "export function Counter() {",
    "  const [count, setCount] = useState(0);",
    "  const add = () => setCount(count + 1);",
    "",
    "  return (",
    "    <button onClick={add}>",
    "      Clicked {count} times",
    "    </button>",
    "  );",
    "}",
  ].join("\n");
}
