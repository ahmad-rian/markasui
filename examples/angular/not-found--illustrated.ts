import { Component } from "@angular/core";
import { NotFound } from "../../components/not-found/not-found.component";

@Component({
  selector: "markas-example",
  imports: [NotFound],
  template: `
    <markas-not-found
      variant="illustrated"
      title="Lost your way?"
      description="The page you followed does not exist. Let us point you back on track."
    />
  `,
})
export default class NotFoundIllustratedExample {}
