import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Input } from "../../components/input/input.component";
import { Modal } from "../../components/modal/modal.component";

@Component({
  selector: "markas-example",
  imports: [Button, Input, Modal],
  template: `
    <div class="flex justify-center">
      <markas-modal title="Invite a team member">
        <button markas-button trigger>
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
            <path
              d="M15 19a6 6 0 0 0-12 0M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6"
            />
          </svg>
          Invite member
        </button>

        <div class="grid gap-4">
          <markas-input
            name="invite-name"
            label="Name"
            placeholder="Sari Wijaya"
          />
          <markas-input
            name="invite-email"
            type="email"
            label="Email"
            placeholder="sari@company.com"
            hint="We will send a link to join the workspace."
          />
        </div>

        <ng-container footer>
          <button
            markas-button
            variant="secondary"
            type="submit"
            value="cancel"
          >
            Cancel
          </button>
          <button markas-button type="submit" value="invite">
            Send invite
          </button>
        </ng-container>
      </markas-modal>
    </div>
  `,
})
export default class ModalFormExample {}
