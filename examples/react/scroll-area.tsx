import { ScrollArea } from "../../components/scroll-area/ScrollArea";

const releases = Array.from({ length: 12 }, (_, i) => `v2.${12 - i}.0`);

export default function ScrollAreaFixture() {
  return (
    <ScrollArea
      label="Releases"
      className="max-h-56 border border-line bg-surface"
    >
      <div className="p-4">
        <p className="mb-2 text-sm font-medium text-ink">Releases</p>
        {releases.map((release) => (
          <p
            key={release}
            className="border-t border-line py-2 text-sm text-muted"
          >
            {release}
          </p>
        ))}
      </div>
    </ScrollArea>
  );
}
