import { Component } from "@angular/core";
import { CodeBlock } from "../../components/code-block/code-block.component";

@Component({
  selector: "markas-example",
  imports: [CodeBlock],
  template: `<div markas-code-block [code]="code" title="Terminal"></div>`,
})
export default class CodeBlockTerminalExample {
  protected readonly code = [
    "pnpm add markasui",
    "pnpm markasui init",
    "pnpm markasui add carousel",
  ].join("\n");
}
