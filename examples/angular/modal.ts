import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Modal } from "../../components/modal/modal.component";

@Component({
  selector: "markas-example",
  imports: [Button, Modal],
  template: `
    <markas-modal title="Delete project?">
      <button markas-button trigger variant="danger">Delete project</button>

      The project and all of its data will be deleted permanently.

      <ng-container footer>
        <button markas-button variant="secondary" type="submit" value="cancel">
          Cancel
        </button>
        <button markas-button variant="danger" type="submit" value="delete">
          Delete
        </button>
      </ng-container>
    </markas-modal>
  `,
})
export default class ModalExample {}
