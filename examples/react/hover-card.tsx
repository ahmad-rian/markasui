import { Avatar } from "../../components/avatar/Avatar";
import { HoverCard } from "../../components/hover-card/HoverCard";

export default function HoverCardFixture() {
  return (
    <div className="flex justify-center py-6">
      <HoverCard
        content={
          <div className="flex gap-3">
            <Avatar name="Markas UI" />
            <div className="grid gap-1">
              <p className="font-medium text-ink">Markas UI</p>
              <p className="text-muted">
                UI components for Blade, React, and Vue.
              </p>
              <p className="text-xs text-muted">Joined March 2026</p>
            </div>
          </div>
        }
      >
        <a
          href="https://github.com/markasui"
          className="rounded-sm text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          @markasui
        </a>
      </HoverCard>
    </div>
  );
}
