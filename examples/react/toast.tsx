import { Button } from "../../components/button/Button";
import { Toaster, toast } from "../../components/toast/Toast";

export default function ToastFixture() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={() =>
            toast({
              title: "Changes saved",
              description: "Your profile has been updated",
              variant: "success",
              duration: 0,
            })
          }
        >
          Show toast
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast({ title: "Draft saved automatically" })}
        >
          Temporary toast
        </Button>
      </div>
      <Toaster />
    </>
  );
}
