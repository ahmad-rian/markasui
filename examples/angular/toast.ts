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
        (click)="
          toast({
            title: 'Changes saved',
            description: 'Your profile has been updated',
            variant: 'success',
            duration: 0,
          })
        "
      >
        Show toast
      </button>
      <button
        markas-button
        variant="secondary"
        (click)="toast({ title: 'Draft saved automatically' })"
      >
        Temporary toast
      </button>
    </div>
    <markas-toaster />
  `,
})
export default class ToastExample {
  protected readonly toast = toast;
}
