import { Component } from "@angular/core";
import { AvatarGroup } from "../../components/avatar-group/avatar-group.component";

@Component({
  selector: "markas-example",
  imports: [AvatarGroup],
  template: `
    <div class="flex flex-col gap-5 pt-8">
      <div
        markas-avatar-group
        [items]="team"
        size="sm"
        [max]="3"
        groupLabel="Small"
      ></div>
      <div
        markas-avatar-group
        [items]="team"
        [max]="3"
        groupLabel="Medium"
      ></div>
      <div
        markas-avatar-group
        [items]="team"
        size="lg"
        [max]="3"
        groupLabel="Large"
      ></div>
    </div>
  `,
})
export default class AvatarGroupSizesExample {
  protected readonly team = [
    { name: "Dewi Lestari" },
    { name: "Budi Santoso" },
    { name: "Siti Aminah" },
    { name: "John Carter" },
    { name: "Maya Putri" },
  ];
}
