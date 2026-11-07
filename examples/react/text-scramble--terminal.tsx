import { TextScramble } from "../../components/text-scramble/TextScramble";

export default function TextScrambleTerminalExample() {
  return (
    <div className="rounded-xl border border-line bg-surface p-5 font-mono text-sm">
      <p className="text-muted">$ markas auth --token</p>
      <p className="mt-2 text-ink">
        Handshake{" "}
        <TextScramble
          text="0110 1011 0010"
          trigger="mount"
          charset="binary"
          duration={1200}
        />
      </p>
      <p className="mt-1 flex items-center gap-2 font-semibold text-ink">
        <span aria-hidden="true" className="size-2 rounded-full bg-success" />
        <TextScramble
          text="Access granted"
          trigger="mount"
          charset="symbols"
          duration={900}
          delay={600}
        />
      </p>
    </div>
  );
}
