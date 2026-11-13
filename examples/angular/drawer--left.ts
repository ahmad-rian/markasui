import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Drawer } from "../../components/drawer/drawer.component";

@Component({
  selector: "markas-example",
  imports: [Button, Drawer],
  template: `
    <div class="flex justify-center">
      <markas-drawer side="left" title="Menu">
        <button
          markas-button
          trigger
          variant="secondary"
          aria-label="Open menu"
          class="size-10 px-0"
        >
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <nav aria-label="Main">
          <ul class="grid gap-1">
            <li><a [class]="link" href="#dashboard">Dashboard</a></li>
            <li><a [class]="link" href="#projects">Projects</a></li>
            <li><a [class]="link" href="#team">Team</a></li>
            <li><a [class]="link" href="#settings">Settings</a></li>
          </ul>
        </nav>
      </markas-drawer>
    </div>
  `,
})
export default class DrawerLeftExample {
  protected readonly link =
    "block rounded-md px-3 py-2 font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle motion-reduce:transition-none";
}
