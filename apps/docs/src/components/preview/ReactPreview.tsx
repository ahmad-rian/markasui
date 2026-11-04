import type { ComponentType } from "react";

const examples = import.meta.glob<{ default: ComponentType }>(
  "../../../../../examples/react/*.tsx",
  { eager: true },
);

export default function ReactPreview({ name }: { name: string }) {
  const Example =
    examples[`../../../../../examples/react/${name}.tsx`]?.default;
  if (!Example)
    return (
      <p className="text-sm text-danger">
        Contoh React untuk {name} belum ada.
      </p>
    );
  return <Example />;
}
