import { Component } from "@angular/core";
import { Switch } from "../../components/switch/switch.component";

@Component({
  selector: "markas-example",
  imports: [Switch],
  template: `
    <div class="divide-y divide-line rounded-lg border border-line bg-surface">
      <div [class]="row">
        <div [class]="text">
          <p [class]="title">Push notifications</p>
          <p [class]="description">Alerts on your phone for new messages.</p>
        </div>
        <markas-switch name="push" aria-label="Push notifications" checked />
      </div>
      <div [class]="row">
        <div [class]="text">
          <p [class]="title">Weekly digest</p>
          <p [class]="description">A summary of activity every Monday.</p>
        </div>
        <markas-switch name="digest" aria-label="Weekly digest" checked />
      </div>
      <div [class]="row">
        <div [class]="text">
          <p [class]="title">Product news</p>
          <p [class]="description">Occasional emails about new features.</p>
        </div>
        <markas-switch name="news" aria-label="Product news" />
      </div>
    </div>
  `,
})
export default class SwitchSettingsExample {
  protected readonly row = "flex items-start justify-between gap-4 p-4";
  protected readonly text = "grid gap-0.5";
  protected readonly title = "text-sm font-medium text-ink";
  protected readonly description = "text-sm text-muted";
}
