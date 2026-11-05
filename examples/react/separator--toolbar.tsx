import { Button } from "../../components/button/Button";
import { Separator } from "../../components/separator/Separator";

export default function SeparatorToolbarExample() {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface p-1">
      <Button variant="ghost" size="sm">
        Bold
      </Button>
      <Button variant="ghost" size="sm">
        Italic
      </Button>
      <Separator orientation="vertical" className="mx-1 my-1" />
      <Button variant="ghost" size="sm">
        Link
      </Button>
      <Button variant="ghost" size="sm">
        Image
      </Button>
      <Separator orientation="vertical" className="mx-1 my-1" />
      <Button variant="ghost" size="sm">
        Undo
      </Button>
    </div>
  );
}
