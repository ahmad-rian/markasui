<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  const root =
    "flex items-center gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50";
  const control = "relative inline-flex shrink-0";
  const track =
    "peer h-6 w-10 shrink-0 cursor-pointer appearance-none rounded-full bg-faint transition-colors duration-150 ease-out checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed motion-reduce:transition-none";
  const thumb =
    "pointer-events-none absolute top-0.5 left-0.5 size-5 rounded-full bg-surface transition-transform duration-150 ease-out peer-checked:translate-x-4 motion-reduce:transition-none";
  const labelClass = "text-sm font-medium text-ink";

  type Props = Omit<HTMLInputAttributes, "type" | "role"> & {
    label?: string;
    checked?: boolean;
  };

  let {
    label,
    id,
    checked = $bindable(false),
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const switchId = $derived(id ?? generatedId);
</script>

<div class={root}>
  <span class={control}>
    <input
      id={switchId}
      bind:checked
      class={[track, className]}
      {...rest}
      type="checkbox"
      role="switch"
    />
    <span class={thumb} aria-hidden="true"></span>
  </span>
  {#if label}
    <label for={switchId} class={labelClass}>{label}</label>
  {/if}
</div>
