import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";

export default function ModalConfirmDeleteExample() {
  return (
    <div className="flex justify-center">
      <Modal
        title="Delete 3 files?"
        trigger={
          <Button variant="danger">
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
            </svg>
            Delete selected
          </Button>
        }
        footer={
          <>
            <Button variant="secondary" type="submit" value="cancel">
              Keep files
            </Button>
            <Button variant="danger" type="submit" value="delete">
              Delete files
            </Button>
          </>
        }
      >
        These files will be removed from the shared folder for everyone. You
        cannot undo this action.
      </Modal>
    </div>
  );
}
