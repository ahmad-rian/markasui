import { Button } from "../../components/button/Button";
import { Toaster, toast } from "../../components/toast/Toast";

export default function ToastVariantsExample() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="secondary"
          onClick={() => toast({ title: "Link copied" })}
        >
          Default
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({ title: "Invitation sent", variant: "success" })
          }
        >
          Success
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast({ title: "Upload failed", variant: "danger" })}
        >
          Danger
        </Button>
      </div>
      <Toaster />
    </>
  );
}
