import { Component } from "@angular/core";
import { CodeBlock } from "../../components/code-block/code-block.component";

@Component({
  selector: "markas-example",
  imports: [CodeBlock],
  template: `<div
    markas-code-block
    [code]="code"
    title="format-price.ts"
  ></div>`,
})
export default class CodeBlockExample {
  protected readonly code = [
    "export function formatPrice(amount: number) {",
    '  return new Intl.NumberFormat("en-US", {',
    '    style: "currency",',
    '    currency: "USD",',
    "  }).format(amount);",
    "}",
  ].join("\n");
}
