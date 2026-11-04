import { Button } from "../../components/button/Button";
import { Toaster, toast } from "../../components/toast/Toast";

export default function ToastFixture() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={() =>
            toast({
              title: "Perubahan disimpan",
              description: "Profil Anda sudah diperbarui.",
              variant: "success",
              duration: 0,
            })
          }
        >
          Tampilkan toast
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast({ title: "Draf tersimpan otomatis" })}
        >
          Toast sementara
        </Button>
      </div>
      <Toaster />
    </>
  );
}
