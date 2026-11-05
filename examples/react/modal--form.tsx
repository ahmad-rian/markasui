import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Modal } from "../../components/modal/Modal";

export default function ModalFormExample() {
  return (
    <div className="flex justify-center">
      <Modal
        title="Invite a team member"
        trigger={
          <Button>
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
              <path d="M15 19a6 6 0 0 0-12 0M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6" />
            </svg>
            Invite member
          </Button>
        }
        footer={
          <>
            <Button variant="secondary" type="submit" value="cancel">
              Cancel
            </Button>
            <Button type="submit" value="invite">
              Send invite
            </Button>
          </>
        }
      >
        <div className="grid gap-4">
          <Input name="invite-name" label="Name" placeholder="Sari Wijaya" />
          <Input
            name="invite-email"
            type="email"
            label="Email"
            placeholder="sari@company.com"
            hint="We will send a link to join the workspace."
          />
        </div>
      </Modal>
    </div>
  );
}
