import { Component } from "@angular/core";
import { NotFound } from "../../components/not-found/not-found.component";

@Component({
  selector: "markas-example",
  imports: [NotFound],
  template: ` <markas-not-found /> `,
})
export default class NotFoundExample {}
