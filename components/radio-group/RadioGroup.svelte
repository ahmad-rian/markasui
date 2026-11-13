<script lang="ts">
  import type { HTMLFieldsetAttributes } from "svelte/elements";

  const root = "min-w-0";
  const legendClass = "mb-3 text-sm font-medium text-ink";
  const orientations = {
    vertical: "grid gap-3",
    horizontal: "flex flex-wrap gap-x-6 gap-y-3",
  };
  const item =
    "flex items-start gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50";
  const control = "relative mt-0.5 flex size-4 shrink-0";
  const radio =
    "peer size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-faint bg-surface transition-colors duration-150 ease-out checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed motion-reduce:transition-none";
  const dot =
    "pointer-events-none absolute inset-1 rounded-full bg-on-primary opacity-0 peer-checked:opacity-100";
  const text = "grid gap-0.5";
  const labelClass = "text-sm font-medium text-ink";
  const descriptionClass = "text-sm text-muted";

  type RadioOption = {
    value: string;
    label: string;
    description?: string;
  };

  type Props = HTMLFieldsetAttributes & {
    name: string;
    options: RadioOption[];
    label?: string;
    /** Selected option, bindable with bind:value. */
    value?: string;
    orientation?: keyof typeof orientations;
  };

  let {
    name,
    options,
    label,
    value = $bindable(),
    orientation = "vertical",
    id,
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const groupId = $derived(id ?? generatedId);
</script>

<fieldset id={groupId} class={[root, className]} {...rest}>
  {#if label}
    <legend class={legendClass}>{label}</legend>
  {/if}
  <div class={orientations[orientation]}>
    {#each options as option (option.value)}
      {@const optionId = `${groupId}-${option.value}`}
      <div class={item}>
        <span class={control}>
          <input
            type="radio"
            id={optionId}
            {name}
            value={option.value}
            bind:group={value}
            aria-describedby={option.description
              ? `${optionId}-description`
              : undefined}
            class={radio}
          />
          <span class={dot} aria-hidden="true"></span>
        </span>
        <div class={text}>
          <label for={optionId} class={labelClass}>{option.label}</label>
          {#if option.description}
            <p id={`${optionId}-description`} class={descriptionClass}>
              {option.description}
            </p>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</fieldset>
