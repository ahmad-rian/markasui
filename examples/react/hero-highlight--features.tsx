import { HeroHighlight } from "../../components/hero-highlight/HeroHighlight";

const features = [
  ["Instant search", "Find any doc, task, or message as you type."],
  ["Shared inbox", "Assign, snooze, and reply together."],
  ["Audit log", "See who changed what, and when."],
  ["Single sign-on", "SAML and SCIM on every paid plan."],
];

export default function HeroHighlightFeaturesExample() {
  return (
    <HeroHighlight
      variant="grid"
      color="success"
      spacing={32}
      className="rounded-xl border border-line bg-canvas p-6"
    >
      <div className="grid gap-5">
        <h3 className="text-xl font-semibold text-ink">
          Everything your team <mark>needs on day one</mark>
        </h3>
        <dl className="grid grid-cols-2 gap-4">
          {features.map(([title, text]) => (
            <div
              key={title}
              className="grid gap-1 rounded-lg border border-line bg-surface p-3"
            >
              <dt className="text-sm font-medium text-ink">{title}</dt>
              <dd className="text-sm text-muted">{text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </HeroHighlight>
  );
}
