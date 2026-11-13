<script lang="ts" module>
  export type AvatarGroupItem = { name: string; src?: string | null };
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const root = "group/avatars isolate flex items-center";
  const item =
    "group/avatar relative shrink-0 transition-[margin] duration-200 ease-out hover:z-10 motion-reduce:transition-none";
  const face =
    "flex items-center justify-center overflow-hidden rounded-full font-medium ring-2 ring-[var(--avatar-ring,var(--color-canvas))] transition-[translate,scale] duration-200 ease-out select-none group-hover/avatar:-translate-y-1 group-hover/avatar:scale-110 motion-reduce:transition-none";
  const image = "object-cover";
  const fallback = "bg-primary-soft text-primary";
  const more = "bg-subtle text-ink";
  const tooltip =
    "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 rounded-md bg-ink px-2 py-1 text-xs font-medium whitespace-nowrap text-canvas opacity-0 shadow-overlay transition duration-150 ease-out group-hover/avatar:translate-y-0 group-hover/avatar:opacity-100 motion-reduce:transition-none";
  const sizes = {
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-12 text-base",
  };
  const overlaps = {
    sm: "not-first:-ml-1.5 group-hover/avatars:not-first:ml-0.5",
    md: "not-first:-ml-2 group-hover/avatars:not-first:ml-1",
    lg: "not-first:-ml-2.5 group-hover/avatars:not-first:ml-1.5",
  };

  /** First letter of the first and last word, same as the Blade, React, and Vue versions. */
  function getInitials(name: string): string {
    const words = name.trim().split(/\s+/).filter(Boolean);
    const picked =
      words.length > 1 ? [words[0], words[words.length - 1]] : words;
    return picked
      .map((word) => Array.from(word ?? "")[0] ?? "")
      .join("")
      .toUpperCase();
  }

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    items: AvatarGroupItem[];
    max?: number;
    size?: keyof typeof sizes;
    /** Accessible name of the group. */
    groupLabel?: string;
    /** Hidden text on the +N chip. {count} is replaced with the number of hidden people. */
    moreLabel?: string;
  };

  let {
    items,
    max = 4,
    size = "md",
    groupLabel = "Members",
    moreLabel = "{count} more",
    class: className,
    ...rest
  }: Props = $props();

  const shown = $derived(items.slice(0, max));
  const hidden = $derived(items.slice(max));
</script>

<div role="group" aria-label={groupLabel} {...rest} class={[root, className]}>
  {#each shown as person, index (index)}
    <span class={[item, overlaps[size]]}
      >{#if person.src}<img
          src={person.src}
          alt={person.name}
          class={[face, image, sizes[size]]}
        />{:else}<span
          role="img"
          aria-label={person.name}
          class={[face, fallback, sizes[size]]}>{getInitials(person.name)}</span
        >{/if}<span aria-hidden="true" class={tooltip}>{person.name}</span
      ></span
    >
  {/each}
  {#if hidden.length > 0}
    <span class={[item, overlaps[size]]}
      ><span class={[face, more, sizes[size]]}
        ><span aria-hidden="true">+{hidden.length}</span><span class="sr-only"
          >{moreLabel.replace("{count}", String(hidden.length))}</span
        ></span
      ><span aria-hidden="true" class={tooltip}
        >{hidden.map((person) => person.name).join(", ")}</span
      ></span
    >
  {/if}
</div>
