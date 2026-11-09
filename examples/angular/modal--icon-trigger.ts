import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Modal } from "../../components/modal/modal.component";

@Component({
  selector: "markas-example",
  imports: [Button, Modal],
  template: `
    <div class="flex justify-center">
      <markas-modal title="Share project">
        <button
          markas-button
          trigger
          variant="secondary"
          aria-label="Share"
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
            <path
              d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13"
            />
          </svg>
        </button>

        Anyone with the link can view this project. Only members can edit it.

        <ng-container footer>
          <button
            markas-button
            variant="secondary"
            type="submit"
            value="cancel"
          >
            Cancel
          </button>
          <button markas-button type="submit" value="copy">Copy link</button>
        </ng-container>
      </markas-modal>
    </div>
  `,
})
export default class ModalIconTriggerExample {}
