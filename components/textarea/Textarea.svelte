<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  const wrapper = "grid gap-1.5";
  const labelClass = "text-sm font-medium text-ink";
  const field =
    "block w-full resize-y rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
  const hintClass = "text-sm text-muted";
  const errorClass = "text-sm text-danger";

  type Props = HTMLTextareaAttributes & {
    label?: string;
    hint?: string;
    error?: string;
  };

  let {
    label,
    hint,
    error,
    id,
    rows = 4,
    value = $bindable(),
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const textareaId = $derived(id ?? generatedId);
  const describedBy = $derived(
    error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined,
  );
</script>

<div class={wrapper}>
  {#if label}
    <label for={textareaId} class={labelClass}>{label}</label>
  {/if}
  <textarea
    id={textareaId}
    {rows}
    bind:value
    aria-invalid={error ? "true" : undefined}
    aria-describedby={describedBy}
    class={[field, className]}
    {...rest}></textarea>
  {#if error}
    <p id={`${textareaId}-error`} class={errorClass}>{error}</p>
  {:else if hint}
    <p id={`${textareaId}-hint`} class={hintClass}>{hint}</p>
  {/if}
</div>
