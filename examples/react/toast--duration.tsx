import { Button } from "../../components/button/Button";
import { Toaster, toast } from "../../components/toast/Toast";

export default function ToastDurationExample() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="secondary"
          onClick={() => toast({ title: "Message archived", duration: 3000 })}
        >
          Short (3s)
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: "Report is ready",
              description: "Download it from the exports page.",
            })
          }
        >
          Default (5s)
        </Button>
        <Button
          onClick={() =>
            toast({
              title: "New version available",
              description: "Reload the page to update.",
              duration: 0,
            })
          }
        >
          Stay open
        </Button>
      </div>
      <Toaster />
    </>
  );
}
