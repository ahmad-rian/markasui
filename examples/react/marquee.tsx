import { Marquee } from "../../components/marquee/Marquee";

const stack = ["Laravel", "React", "Vue", "Alpine.js", "Tailwind CSS", "Vite"];

export default function MarqueeExample() {
  return (
    <Marquee>
      {stack.map((name) => (
        <span
          key={name}
          className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium whitespace-nowrap text-ink"
        >
          {name}
        </span>
      ))}
    </Marquee>
  );
}
