<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLSelectAttributes } from "svelte/elements";

  const wrapper = "grid gap-1.5";
  const labelClass = "text-sm font-medium text-ink";
  const control = "relative";
  const field =
    "h-10 w-full cursor-pointer appearance-none rounded-md border border-line bg-surface pr-9 pl-3 text-sm text-ink transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
  const icon =
    "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted";
  const hintClass = "text-sm text-muted";
  const errorClass = "text-sm text-danger";

  type Props = Omit<HTMLSelectAttributes, "value"> & {
    label?: string;
    hint?: string;
    error?: string;
    value?: string;
    children?: Snippet;
  };

  let {
    label,
    hint,
    error,
    id,
    value = $bindable(),
    class: className,
    children,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const selectId = $derived(id ?? generatedId);
  const describedBy = $derived(
    error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined,
  );
</script>

<div class={wrapper}>
  {#if label}
    <label for={selectId} class={labelClass}>{label}</label>
  {/if}
  <div class={control}>
    <select
      id={selectId}
      bind:value
      aria-invalid={error ? "true" : undefined}
      aria-describedby={describedBy}
      class={[field, className]}
      {...rest}
    >
      {@render children?.()}
    </select>
    <svg
      class={icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </div>
  {#if error}
    <p id={`${selectId}-error`} class={errorClass}>{error}</p>
  {:else if hint}
    <p id={`${selectId}-hint`} class={hintClass}>{hint}</p>
  {/if}
</div>
