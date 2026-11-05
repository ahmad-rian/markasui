import { Button } from "../../components/button/Button";
import { Toaster, toast } from "../../components/toast/Toast";

export default function ToastDescriptionExample() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="secondary"
          onClick={() => toast({ title: "Settings updated" })}
        >
          Title only
        </Button>
        <Button
          onClick={() =>
            toast({
              title: "Payment failed",
              description:
                "Your card was declined. Try another payment method.",
              variant: "danger",
            })
          }
        >
          With description
        </Button>
      </div>
      <Toaster />
    </>
  );
}
