import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";

export default function ModalAcknowledgeExample() {
  return (
    <div className="flex justify-center">
      <Modal
        title="What's new in version 2.4"
        trigger={<Button variant="secondary">View release notes</Button>}
        footer={
          <Button type="submit" value="close">
            Got it
          </Button>
        }
      >
        <ul className="grid list-disc gap-2 pl-5">
          <li>Dark mode now follows your system setting.</li>
          <li>Export reports to CSV from any table.</li>
          <li>Search results load twice as fast.</li>
        </ul>
      </Modal>
    </div>
  );
}
