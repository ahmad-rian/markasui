import { Component } from "@angular/core";
import { NotFound } from "../../components/not-found/not-found.component";

@Component({
  selector: "markas-example",
  imports: [NotFound],
  template: `
    <markas-not-found
      variant="split"
      title="This page wandered off"
      description="We could not find what you were looking for. It may have been renamed or removed."
    />
  `,
})
export default class NotFoundSplitExample {}
