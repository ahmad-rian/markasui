import { PromptInput } from "../../components/prompt-input/PromptInput";

const card = "grid gap-3 rounded-xl border border-line bg-surface p-4";
const head = "flex items-center gap-3";
const avatar =
  "grid size-9 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-ink";
const name = "text-sm font-semibold text-ink";
const meta = "text-xs text-muted";
const quote = "rounded-lg bg-subtle px-3 py-2 text-sm text-ink";

export default function PromptInputCompactExample() {
  return (
    <div className={card}>
      <div className={head}>
        <span aria-hidden="true" className={avatar}>
          RS
        </span>
        <div>
          <p className={name}>Rina Santoso</p>
          <p className={meta}>Asked about order #INV-2041</p>
        </div>
      </div>
      <p className={quote}>Can I pay the balance by bank transfer?</p>
      <PromptInput
        attachments={false}
        maxHeight={120}
        placeholderLabel="Reply to Rina"
        inputLabel="Reply"
      />
    </div>
  );
}
