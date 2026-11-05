import { Label } from "../../components/label/Label";

const card =
  "flex items-start gap-3 rounded-lg border border-line bg-surface p-4 has-checked:border-primary has-checked:bg-primary-soft";
const box = "mt-0.5 size-4 shrink-0 accent-primary";
const text = "grid gap-0.5";
const description = "font-normal text-muted";

export default function LabelCardExample() {
  return (
    <div className="grid gap-3">
      <Label className={card}>
        <input type="checkbox" name="backups" defaultChecked className={box} />
        <span className={text}>
          <span>Daily backups</span>
          <span className={description}>
            Keep 30 days of snapshots for every project.
          </span>
        </span>
      </Label>
      <Label className={card}>
        <input type="checkbox" name="audit_log" className={box} />
        <span className={text}>
          <span>Audit log</span>
          <span className={description}>
            Record every sign-in and permission change.
          </span>
        </span>
      </Label>
    </div>
  );
}
