import { ImageTrail } from "../../components/image-trail/ImageTrail";

const area =
  "grid h-72 content-center justify-items-center rounded-xl border border-line bg-surface p-6 text-center";
const people = [
  {
    initials: "RP",
    avatar:
      "grid size-14 place-items-center rounded-full bg-primary text-base font-semibold text-on-primary",
  },
  {
    initials: "DS",
    avatar:
      "grid size-14 place-items-center rounded-full bg-primary-soft text-base font-semibold text-primary",
  },
  {
    initials: "SW",
    avatar:
      "grid size-14 place-items-center rounded-full border border-line bg-subtle text-base font-semibold text-ink",
  },
  {
    initials: "BA",
    avatar:
      "grid size-14 place-items-center rounded-full bg-ink text-base font-semibold text-canvas",
  },
];
const title = "text-xl font-semibold text-ink";
const names = "mt-2 text-sm text-muted";

export default function ImageTrailTeamExample() {
  return (
    <ImageTrail
      variant="stack"
      threshold={56}
      max={6}
      className={area}
      items={people.map((person) => (
        <span key={person.initials} className={person.avatar}>
          {person.initials}
        </span>
      ))}
    >
      <h3 className={title}>Meet the people behind Markas</h3>
      <p className={names}>Rania, Dimas, Sekar, and Bayu</p>
    </ImageTrail>
  );
}
