import { TextScramble } from "../../components/text-scramble/TextScramble";

export default function TextScrambleLinksExample() {
  return (
    <nav
      aria-label="Studio"
      className="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-3 font-mono text-sm text-ink"
    >
      <span className="font-semibold">Studio Senja</span>
      <div className="flex gap-5">
        <a
          href="#"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <TextScramble text="Work" charset="symbols" duration={500} />
        </a>
        <a
          href="#"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <TextScramble text="About" charset="symbols" duration={500} />
        </a>
        <a
          href="#"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <TextScramble text="Contact" charset="symbols" duration={500} />
        </a>
      </div>
    </nav>
  );
}
