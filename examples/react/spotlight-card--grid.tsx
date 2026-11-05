import { SpotlightCard } from "../../components/spotlight-card/SpotlightCard";

const features = [
  { title: "Same classes", text: "Blade, React, and Vue share one markup." },
  { title: "Dark mode", text: "Tokens switch with a single class." },
  { title: "Accessible", text: "Checked with axe and the keyboard." },
  { title: "Zero runtime", text: "Copy the file, keep the code." },
];

export default function SpotlightCardGridExample() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {features.map((feature) => (
        <SpotlightCard key={feature.title}>
          <div className="p-4">
            <h3 className="text-sm font-semibold text-ink">{feature.title}</h3>
            <p className="mt-1 text-xs text-muted">{feature.text}</p>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );
}
