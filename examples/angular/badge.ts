import { Component } from "@angular/core";
import { Badge } from "../../components/badge/badge.component";

@Component({
  selector: "markas-example",
  imports: [Badge],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <span markas-badge>Draft</span>
      <span markas-badge variant="primary">New</span>
      <span markas-badge variant="success">Active</span>
      <span markas-badge variant="warning">Pending</span>
      <span markas-badge variant="danger">Failed</span>
    </div>
  `,
})
export default class BadgeExample {}
