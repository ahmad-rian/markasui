import { Separator } from "../../components/separator/Separator";

export default function SeparatorSectionsExample() {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 text-sm text-ink">
      <div className="space-y-1">
        <p className="font-medium">Profile</p>
        <p className="text-muted">
          Your name and photo are visible to your team.
        </p>
      </div>
      <Separator decorative={false} className="my-4" />
      <div className="space-y-1">
        <p className="font-medium">Notifications</p>
        <p className="text-muted">Email me when someone mentions me.</p>
      </div>
      <Separator decorative={false} label="Danger zone" className="my-4" />
      <div className="space-y-1">
        <p className="font-medium">Delete account</p>
        <p className="text-muted">This removes all your projects for good.</p>
      </div>
    </div>
  );
}
