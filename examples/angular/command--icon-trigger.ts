import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Command } from "../../components/command/command.component";

@Component({
  selector: "markas-example",
  imports: [Button, Command],
  template: `
    <div [class]="bar">
      <span [class]="brand"
        ><svg
          class="size-6 shrink-0"
          viewBox="0 0 1464 1430"
          aria-hidden="true"
        >
          @for (shape of mark; track shape.points) {
            <polygon
              [attr.points]="shape.points"
              [attr.class]="shape.className"
            />
          }</svg
        >MarkasUI</span
      >
      <markas-command placeholderLabel="Run a command..." [items]="items">
        <button
          markas-button
          trigger
          variant="ghost"
          size="sm"
          aria-label="Open commands"
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
            <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
          </svg>
        </button>
      </markas-command>
    </div>
  `,
})
export default class CommandIconTriggerExample {
  protected readonly bar =
    "flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-2";
  protected readonly brand =
    "flex items-center gap-2 text-sm font-semibold text-ink";
  protected readonly mark = [
    { points: "354,578 1256,138 1171,430 268,868", className: "fill-ink/15" },
    { points: "553,443 1455,3 1370,295 467,733", className: "fill-ink/55" },
    {
      points: "421,762 1325,318 1240,611 336,1050",
      className: "fill-success/35",
    },
    {
      points: "265,1073 1169,629 1084,922 180,1362",
      className: "fill-ink/25",
    },
    { points: "93,965 997,521 912,814 8,1253", className: "fill-ink/75" },
    {
      points: "347,1135 1251,691 1166,984 262,1424",
      className: "fill-success",
    },
  ];
  protected readonly items = [
    {
      group: "Workspace",
      label: "Create project",
      value: "create-project",
      shortcut: "Ctrl+N",
    },
    {
      group: "Workspace",
      label: "Invite member",
      value: "invite",
      shortcut: "Ctrl+I",
    },
    { group: "Account", label: "Switch theme", value: "theme" },
    { group: "Account", label: "Sign out", value: "sign-out" },
  ];
}
