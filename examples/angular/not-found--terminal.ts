import { Component } from "@angular/core";
import { NotFound } from "../../components/not-found/not-found.component";

@Component({
  selector: "markas-example",
  imports: [NotFound],
  template: `
    <markas-not-found
      variant="terminal"
      path="/docs/setup"
      description="The command could not find that page. Check the address or head back home."
    />
  `,
})
export default class NotFoundTerminalExample {}
