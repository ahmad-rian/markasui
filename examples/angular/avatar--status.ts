import { Component } from "@angular/core";
import { Avatar } from "../../components/avatar/avatar.component";

@Component({
  selector: "markas-example",
  imports: [Avatar],
  template: `
    <div class="flex items-center gap-6">
      @for (person of people; track person.name) {
        <span class="relative inline-flex">
          <markas-avatar [name]="person.name" size="lg" />
          <span [class]="dot + ' ' + person.color">
            <span class="sr-only">{{ person.status }}</span>
          </span>
        </span>
      }
    </div>
  `,
})
export default class AvatarStatusExample {
  protected readonly dot =
    "absolute right-0 bottom-0 size-3 rounded-full ring-2 ring-canvas";
  protected readonly people = [
    { name: "Budi Santoso", status: "Online", color: "bg-success" },
    { name: "Siti Aminah", status: "Away", color: "bg-warning" },
    { name: "John Carter", status: "Offline", color: "bg-faint" },
  ];
}
