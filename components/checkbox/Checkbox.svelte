<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  const root =
    "flex items-start gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50";
  const control = "relative mt-0.5 flex size-4 shrink-0";
  const box =
    "peer size-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-faint bg-surface transition-colors duration-150 ease-out checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed aria-invalid:border-danger motion-reduce:transition-none";
  const icon =
    "pointer-events-none absolute inset-0 size-4 text-on-primary opacity-0 peer-checked:opacity-100";
  const text = "grid gap-0.5";
  const labelClass = "text-sm font-medium text-ink";
  const descriptionClass = "text-sm text-muted";

  type Props = Omit<HTMLInputAttributes, "type"> & {
    label?: string;
    description?: string;
    checked?: boolean;
  };

  let {
    label,
    description,
    id,
    checked = $bindable(false),
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const checkboxId = $derived(id ?? generatedId);
</script>

<div class={root}>
  <span class={control}>
    <input
      id={checkboxId}
      bind:checked
      aria-describedby={description ? `${checkboxId}-description` : undefined}
      class={[box, className]}
      {...rest}
      type="checkbox"
    />
    <svg
      class={icon}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m4 8.5 2.5 2.5L12 5.5" />
    </svg>
  </span>
  {#if label || description}
    <div class={text}>
      {#if label}
        <label for={checkboxId} class={labelClass}>{label}</label>
      {/if}
      {#if description}
        <p id={`${checkboxId}-description`} class={descriptionClass}>
          {description}
        </p>
      {/if}
    </div>
  {/if}
</div>
