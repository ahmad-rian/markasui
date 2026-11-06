import { PromptInput } from "../../components/prompt-input/PromptInput";

const panel = "grid gap-4";
const title = "text-center text-lg font-semibold text-ink";

export default function PromptInputExample() {
  return (
    <div className={panel}>
      <p className={title}>What should we build today?</p>
      <PromptInput
        models={["Markas Pro", "Markas Mini"]}
        model="Markas Pro"
        maxLength={500}
        accept="image/*,.pdf"
      />
    </div>
  );
}
