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
        (click)="toast({ title: 'Settings updated' })"
      >
        Title only
      </button>
      <button
        markas-button
        (click)="
          toast({
            title: 'Payment failed',
            description: 'Your card was declined. Try another payment method.',
            variant: 'danger',
          })
        "
      >
        With description
      </button>
    </div>
    <markas-toaster />
  `,
})
export default class ToastDescriptionExample {
  protected readonly toast = toast;
}
