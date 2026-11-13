import { Component } from "@angular/core";
import { Separator } from "../../components/separator/separator.component";

@Component({
  selector: "markas-example",
  imports: [Separator],
  template: `
    <div class="rounded-xl border border-line bg-surface p-4 text-sm text-ink">
      <div class="space-y-1">
        <p class="font-medium">Profile</p>
        <p class="text-muted">Your name and photo are visible to your team.</p>
      </div>
      <div markas-separator [decorative]="false" class="my-4"></div>
      <div class="space-y-1">
        <p class="font-medium">Notifications</p>
        <p class="text-muted">Email me when someone mentions me.</p>
      </div>
      <div
        markas-separator
        [decorative]="false"
        label="Danger zone"
        class="my-4"
      ></div>
      <div class="space-y-1">
        <p class="font-medium">Delete account</p>
        <p class="text-muted">This removes all your projects for good.</p>
      </div>
    </div>
  `,
})
export default class SeparatorSectionsExample {}
