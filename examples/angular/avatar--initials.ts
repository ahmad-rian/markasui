import { Component } from "@angular/core";
import { Avatar } from "../../components/avatar/avatar.component";

@Component({
  selector: "markas-example",
  imports: [Avatar],
  template: `
    <ul class="flex flex-wrap items-start justify-center gap-6">
      @for (name of names; track name) {
        <li class="grid justify-items-center gap-2">
          <markas-avatar [name]="name" size="lg" alt="" />
          <span class="text-xs text-muted">{{ name }}</span>
        </li>
      }
    </ul>
  `,
})
export default class AvatarInitialsExample {
  protected readonly names = [
    "Budi Santoso",
    "Ahmad Rian Putra",
    "rina",
    "Maria José García",
  ];
}
