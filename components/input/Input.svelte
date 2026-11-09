<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  const wrapper = "grid gap-1.5";
  const labelClass = "text-sm font-medium text-ink";
  const field =
    "h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
  const hintClass = "text-sm text-muted";
  const errorClass = "text-sm text-danger";

  type Props = HTMLInputAttributes & {
    label?: string;
    hint?: string;
    error?: string;
  };

  let {
    label,
    hint,
    error,
    id,
    type = "text",
    value = $bindable(),
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const inputId = $derived(id ?? generatedId);
  const describedBy = $derived(
    error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined,
  );
</script>

<div class={wrapper}>
  {#if label}
    <label for={inputId} class={labelClass}>{label}</label>
  {/if}
  <input
    id={inputId}
    {type}
    bind:value
    aria-invalid={error ? "true" : undefined}
    aria-describedby={describedBy}
    class={[field, className]}
    {...rest}
  />
  {#if error}
    <p id={`${inputId}-error`} class={errorClass}>{error}</p>
  {:else if hint}
    <p id={`${inputId}-hint`} class={hintClass}>{hint}</p>
  {/if}
</div>
