import { Component } from "@angular/core";
import { CodeBlock } from "../../components/code-block/code-block.component";

@Component({
  selector: "markas-example",
  imports: [CodeBlock],
  template: `<div
    markas-code-block
    [code]="code"
    title="create-invoice.sh"
    showLineNumbers
  ></div>`,
})
export default class CodeBlockLongLinesExample {
  protected readonly code = [
    'curl -X POST https://api.example.com/v1/invoices -H "Authorization: Bearer $API_TOKEN" -d \'{"customer":"cus_1024","amount":25000}\'',
  ].join("\n");
}
