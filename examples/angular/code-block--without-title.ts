import { Component } from "@angular/core";
import { CodeBlock } from "../../components/code-block/code-block.component";

@Component({
  selector: "markas-example",
  imports: [CodeBlock],
  template: `<div markas-code-block [code]="code"></div>`,
})
export default class CodeBlockWithoutTitleExample {
  protected readonly code = [
    "{",
    '  "name": "acme-dashboard",',
    '  "private": true,',
    '  "scripts": {',
    '    "dev": "vite",',
    '    "build": "vite build"',
    "  }",
    "}",
  ].join("\n");
}
