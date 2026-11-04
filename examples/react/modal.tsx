import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";

export default function ModalFixture() {
  return (
    <Modal
      title="Delete project?"
      trigger={<Button variant="danger">Delete project</Button>}
      footer={
        <>
          <Button variant="secondary" type="submit" value="cancel">
            Cancel
          </Button>
          <Button variant="danger" type="submit" value="delete">
            Delete
          </Button>
        </>
      }
    >
      The project and all of its data will be deleted permanently.
    </Modal>
  );
}
