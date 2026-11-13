import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Toaster, toast } from "../../components/toast/toast.component";

@Component({
  selector: "markas-example",
  imports: [Button, Toaster],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <button
        markas-button
        variant="secondary"
        (click)="toast({ title: 'Link copied' })"
      >
        Default
      </button>
      <button
        markas-button
        variant="secondary"
        (click)="toast({ title: 'Invitation sent', variant: 'success' })"
      >
        Success
      </button>
      <button
        markas-button
        variant="secondary"
        (click)="toast({ title: 'Upload failed', variant: 'danger' })"
      >
        Danger
      </button>
    </div>
    <markas-toaster />
  `,
})
export default class ToastVariantsExample {
  protected readonly toast = toast;
}
