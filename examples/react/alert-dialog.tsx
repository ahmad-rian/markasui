import { AlertDialog } from "../../components/alert-dialog/AlertDialog";
import { Button } from "../../components/button/Button";

export default function AlertDialogFixture() {
  return (
    <AlertDialog
      title="Publish this post?"
      trigger={<Button>Publish post</Button>}
    >
      Your post will be visible to everyone who follows your blog.
    </AlertDialog>
  );
}
