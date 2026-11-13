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
        (click)="toast({ title: 'Message archived', duration: 3000 })"
      >
        Short (3s)
      </button>
      <button
        markas-button
        variant="secondary"
        (click)="
          toast({
            title: 'Report is ready',
            description: 'Download it from the exports page.',
          })
        "
      >
        Default (5s)
      </button>
      <button
        markas-button
        (click)="
          toast({
            title: 'New version available',
            description: 'Reload the page to update.',
            duration: 0,
          })
        "
      >
        Stay open
      </button>
    </div>
    <markas-toaster />
  `,
})
export default class ToastDurationExample {
  protected readonly toast = toast;
}
