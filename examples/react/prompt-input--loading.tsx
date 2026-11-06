import { useState } from "react";
import { PromptInput } from "../../components/prompt-input/PromptInput";

export default function PromptInputLoadingExample() {
  const [loading, setLoading] = useState(true);
  return (
    <PromptInput
      defaultValue="Summarize the March invoices by client"
      loading={loading}
      onStop={() => setLoading(false)}
      onSend={() => setLoading(true)}
    />
  );
}
