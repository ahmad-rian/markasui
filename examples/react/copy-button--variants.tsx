import { CopyButton } from "../../components/copy-button/CopyButton";

export default function CopyButtonVariantsExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <CopyButton text="INV-2048">Copy</CopyButton>
      <CopyButton text="INV-2048" variant="secondary">
        Copy ID
      </CopyButton>
      <CopyButton text="INV-2048" variant="ghost">
        Copy
      </CopyButton>
      <CopyButton text="INV-2048" variant="secondary" copyLabel="Copy ID" />
    </div>
  );
}
