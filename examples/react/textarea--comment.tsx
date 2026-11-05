import { Button } from "../../components/button/Button";
import { Textarea } from "../../components/textarea/Textarea";

export default function TextareaCommentExample() {
  return (
    <div className="grid gap-3 rounded-lg border border-line bg-surface p-4">
      <Textarea
        name="comment"
        aria-label="Comment"
        rows={3}
        placeholder="Leave a comment"
      />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted">Markdown is supported.</p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">Comment</Button>
        </div>
      </div>
    </div>
  );
}
