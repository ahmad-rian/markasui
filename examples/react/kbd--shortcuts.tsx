import { Kbd } from "../../components/kbd/Kbd";

export default function KbdShortcutsExample() {
  return (
    <dl className="divide-y divide-line rounded-xl border border-line bg-surface text-sm text-ink">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <dt>Search</dt>
        <dd>
          <Kbd keys={["Ctrl", "K"]} />
        </dd>
      </div>
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <dt>New document</dt>
        <dd>
          <Kbd keys={["Ctrl", "Alt", "N"]} />
        </dd>
      </div>
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <dt>Go to next page</dt>
        <dd>
          <Kbd keys={["G", "N"]} separator="then" />
        </dd>
      </div>
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <dt>Show shortcuts</dt>
        <dd>
          <Kbd>?</Kbd>
        </dd>
      </div>
    </dl>
  );
}
