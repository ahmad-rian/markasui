import { ScrollArea } from "../../components/scroll-area/ScrollArea";

const albums = [
  "Morning light",
  "City nights",
  "Slow mornings",
  "Coastline",
  "Weekend drive",
  "Rain sounds",
];

export default function ScrollAreaHorizontalExample() {
  return (
    <ScrollArea label="Recently played" orientation="horizontal">
      <div className="flex gap-3 pb-3">
        {albums.map((album) => (
          <div key={album} className="w-32 shrink-0">
            <div className="h-32 rounded-lg bg-subtle" />
            <p className="mt-2 truncate text-sm font-medium text-ink">
              {album}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
