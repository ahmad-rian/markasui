import { Component } from "@angular/core";
import { NotFound } from "../../components/not-found/not-found.component";

@Component({
  selector: "markas-example",
  imports: [NotFound],
  template: `
    <markas-not-found
      variant="glitch"
      code="500"
      title="Something went wrong"
      description="Our server hit an unexpected error. Please try again in a moment."
    />
  `,
})
export default class NotFoundGlitchExample {}
