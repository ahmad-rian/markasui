import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Modal } from "../../components/modal/modal.component";

@Component({
  selector: "markas-example",
  imports: [Button, Modal],
  template: `
    <div class="flex justify-center">
      <markas-modal title="What's new in version 2.4">
        <button markas-button trigger variant="secondary">
          View release notes
        </button>

        <ul class="grid list-disc gap-2 pl-5">
          <li>Dark mode now follows your system setting.</li>
          <li>Export reports to CSV from any table.</li>
          <li>Search results load twice as fast.</li>
        </ul>

        <ng-container footer>
          <button markas-button type="submit" value="close">Got it</button>
        </ng-container>
      </markas-modal>
    </div>
  `,
})
export default class ModalAcknowledgeExample {}
