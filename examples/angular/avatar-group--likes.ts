import { Component } from "@angular/core";
import { AvatarGroup } from "../../components/avatar-group/avatar-group.component";

@Component({
  selector: "markas-example",
  imports: [AvatarGroup],
  template: `
    <div class="flex items-center gap-2 pt-8">
      <div
        markas-avatar-group
        [items]="people"
        size="sm"
        [max]="3"
        groupLabel="Liked by"
      ></div>
      <p class="text-sm text-muted">
        <span class="font-medium text-ink">Maya Putri</span> and 5 others liked
        this
      </p>
    </div>
  `,
})
export default class AvatarGroupLikesExample {
  protected readonly people = [
    { name: "Maya Putri" },
    { name: "Rizal Hakim" },
    { name: "Ana Lim" },
    { name: "John Carter" },
    { name: "Siti Aminah" },
    { name: "Budi Santoso" },
  ];
}
