import { Button } from "../../components/button/Button";
import { ExpandableCard } from "../../components/expandable-card/ExpandableCard";

const grid = "grid grid-cols-3 gap-3";
const portrait = "flex h-full items-center justify-center bg-primary-soft";
const avatar =
  "inline-flex size-14 items-center justify-center rounded-full bg-primary text-base font-semibold text-on-primary";
const contact = "text-muted";

const team = [
  {
    name: "Nadia Rahma",
    initials: "NR",
    role: "Engineering lead",
    bio: "Leads the platform team and loves a well-written postmortem.",
    email: "nadia@example.com",
  },
  {
    name: "Owen Park",
    initials: "OP",
    role: "Product designer",
    bio: "Sketches every flow on paper before opening a design tool.",
    email: "owen@example.com",
  },
  {
    name: "Putu Arya",
    initials: "PA",
    role: "Customer success",
    bio: "Turns tricky support tickets into product improvements.",
    email: "putu@example.com",
  },
];

export default function ExpandableCardTeamExample() {
  return (
    <div className={grid}>
      {team.map((person) => (
        <ExpandableCard
          key={person.name}
          title={person.name}
          description={person.role}
          media={
            <span className={portrait}>
              <span aria-hidden="true" className={avatar}>
                {person.initials}
              </span>
            </span>
          }
          footer={<Button>Send message</Button>}
        >
          <p>{person.bio}</p>
          <p className={contact}>{person.email}</p>
        </ExpandableCard>
      ))}
    </div>
  );
}
