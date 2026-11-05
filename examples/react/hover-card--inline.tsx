import { HoverCard } from "../../components/hover-card/HoverCard";

export default function HoverCardInlineExample() {
  return (
    <div className="text-sm leading-6 text-muted">
      This release was maintained by{" "}
      <HoverCard
        content={
          <div className="grid gap-1">
            <p className="font-medium text-ink">Rina Wijaya</p>
            <p className="text-muted">
              Design engineer in Bandung. Works on forms and accessibility.
            </p>
          </div>
        }
      >
        <a
          href="https://github.com/rinawijaya"
          className="rounded-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Rina Wijaya
        </a>
      </HoverCard>{" "}
      with help from 40 contributors.
    </div>
  );
}
