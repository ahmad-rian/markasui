import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Modal } from "../../components/modal/modal.component";

@Component({
  selector: "markas-example",
  imports: [Button, Modal],
  template: `
    <div class="flex justify-center">
      <markas-modal title="Delete 3 files?">
        <button markas-button trigger variant="danger">
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
              d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
            />
          </svg>
          Delete selected
        </button>

        These files will be removed from the shared folder for everyone. You
        cannot undo this action.

        <ng-container footer>
          <button
            markas-button
            variant="secondary"
            type="submit"
            value="cancel"
          >
            Keep files
          </button>
          <button markas-button variant="danger" type="submit" value="delete">
            Delete files
          </button>
        </ng-container>
      </markas-modal>
    </div>
  `,
})
export default class ModalConfirmDeleteExample {}
