import { Component } from "@angular/core";
import { AlertDialog } from "../../components/alert-dialog/alert-dialog.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [AlertDialog, Button],
  template: `
    <markas-alert-dialog title="Publish this post?">
      <button markas-button trigger>Publish post</button>
      Your post will be visible to everyone who follows your blog.
    </markas-alert-dialog>
  `,
})
export default class AlertDialogExample {}
