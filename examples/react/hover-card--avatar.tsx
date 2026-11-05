import { Avatar } from "../../components/avatar/Avatar";
import { HoverCard } from "../../components/hover-card/HoverCard";

export default function HoverCardAvatarExample() {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <HoverCard
        content={
          <div className="grid gap-1">
            <p className="font-medium text-ink">Dewi Lestari</p>
            <p className="text-muted">
              Product designer. Leads the design system team.
            </p>
          </div>
        }
      >
        <a
          href="https://github.com/dewilestari"

          className="inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Avatar name="Dewi Lestari" />
        </a>
      </HoverCard>
      <HoverCard
        content={
          <div className="grid gap-1">
            <p className="font-medium text-ink">Budi Santoso</p>
            <p className="text-muted">
              Backend engineer. Maintains the registry and CLI.
            </p>
          </div>
        }
      >
        <a
          href="https://github.com/budisantoso"

          className="inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Avatar name="Budi Santoso" />
        </a>
      </HoverCard>
    </div>
  );
}
