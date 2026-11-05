import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";

export default function ModalIconTriggerExample() {
  return (
    <div className="flex justify-center">
      <Modal
        title="Share project"
        trigger={
          <Button
            variant="secondary"
            aria-label="Share"
            className="size-10 px-0"
          >
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
              <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13" />
            </svg>
          </Button>
        }
        footer={
          <>
            <Button variant="secondary" type="submit" value="cancel">
              Cancel
            </Button>
            <Button type="submit" value="copy">
              Copy link
            </Button>
          </>
        }
      >
        Anyone with the link can view this project. Only members can edit it.
      </Modal>
    </div>
  );
}
