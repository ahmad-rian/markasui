import { CardStack } from "../../components/card-stack/CardStack";

const card = "grid h-full justify-items-center gap-3 p-6 text-center";
const avatar =
  "inline-flex size-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-on-primary";
const name = "text-base font-semibold text-ink";
const role = "text-sm text-muted";
const tags = "flex flex-wrap justify-center gap-1.5";
const tag = "rounded-full bg-subtle px-2.5 py-0.5 text-xs text-ink";

const people = [
  {
    name: "Rina Kusuma",
    initials: "RK",
    role: "Product designer in Jakarta",
    skills: ["Figma", "Design systems", "Research"],
  },
  {
    name: "Liam Carter",
    initials: "LC",
    role: "Frontend engineer in Toronto",
    skills: ["React", "Accessibility", "Testing"],
  },
  {
    name: "Ayu Lestari",
    initials: "AL",
    role: "Data analyst in Bandung",
    skills: ["SQL", "Python", "Dashboards"],
  },
];

export default function CardStackProfilesExample() {
  return (
    <CardStack
      label="Suggested teammates"
      prevLabel="Previous person"
      nextLabel="Next person"
      className="mx-auto max-w-xs"
    >
      {people.map((person) => (
        <div key={person.name} className={card}>
          <span aria-hidden="true" className={avatar}>
            {person.initials}
          </span>
          <div>
            <p className={name}>{person.name}</p>
            <p className={role}>{person.role}</p>
          </div>
          <ul className={tags}>
            {person.skills.map((skill) => (
              <li key={skill} className={tag}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </CardStack>
  );
}
