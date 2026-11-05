import { createElement, useEffect, useState, type ComponentType } from "react";
import type { Built } from "../../lib/playgrounds";
import { exportName } from "../../lib/playgrounds";

type Module = Record<string, unknown>;
const modules = import.meta.glob<Module>("../../../../../components/*/*.tsx", {
  eager: true,
});

function resolve(
  name: string,
): ComponentType<Record<string, unknown>> | undefined {
  const entry = Object.entries(modules).find(([path]) =>
    path.includes(`/components/${name}/`),
  );
  return entry?.[1][exportName(name)] as
    ComponentType<Record<string, unknown>> | undefined;
}

/** Preview React yang menerima props baru dari panel pengaturan lewat event markas:playground. */
export default function PlaygroundReact({
  name,
  initial,
}: {
  name: string;
  initial: Built;
}) {
  const [built, setBuilt] = useState(initial);
  useEffect(() => {
    const listener = (event: Event) => {
      const detail = (event as CustomEvent<{ name: string; built: Built }>)
        .detail;
      if (detail.name === name) setBuilt(detail.built);
    };
    document.addEventListener("markas:playground", listener);
    return () => document.removeEventListener("markas:playground", listener);
  }, [name]);

  const Component = resolve(name);
  if (!Component) return null;
  const { class: className, ...rest } = built.props;
  const props = Object.fromEntries(
    Object.entries({ ...rest, className }).filter(
      ([, value]) => value !== null && value !== undefined,
    ),
  );
  return createElement(Component, props, built.children);
}
