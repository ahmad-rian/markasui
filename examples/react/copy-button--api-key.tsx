import { CopyButton } from "../../components/copy-button/CopyButton";

export default function CopyButtonApiKeyExample() {
  return (
    <div className="grid grid-cols-1 gap-2">
      <p className="text-sm font-medium text-ink">Secret key</p>
      <div className="flex gap-2">
        <input
          aria-label="Secret key"
          readOnly
          value="sk_live_51Hx9aT2eZvKYlo2C"
          className="h-10 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 font-mono text-sm text-ink"
        />
        <CopyButton text="sk_live_51Hx9aT2eZvKYlo2C" variant="secondary">
          Copy key
        </CopyButton>
      </div>
      <p className="text-sm text-muted">
        Keep this key private. It grants full access to your account.
      </p>
    </div>
  );
}
