import { Component } from "@angular/core";
import { Avatar } from "../../components/avatar/avatar.component";

@Component({
  selector: "markas-example",
  imports: [Avatar],
  template: `
    <ul class="divide-y divide-line rounded-xl border border-line bg-surface">
      @for (person of people; track person.email) {
        <li class="flex items-center gap-3 px-4 py-3">
          <markas-avatar [name]="person.name" size="sm" alt="" />
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-ink">{{ person.name }}</p>
            <p class="text-xs text-muted">{{ person.email }}</p>
          </div>
          <span class="text-xs text-muted">{{ person.role }}</span>
        </li>
      }
    </ul>
  `,
})
export default class AvatarListExample {
  protected readonly people = [
    { name: "Sarah Miller", email: "sarah@markasui.com", role: "Owner" },
    { name: "Budi Santoso", email: "budi@markasui.com", role: "Editor" },
    { name: "Siti Aminah", email: "siti@markasui.com", role: "Viewer" },
  ];
}
