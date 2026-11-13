<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLLabelAttributes } from "svelte/elements";

  const base = "text-sm font-medium text-ink";
  const marker = "ms-0.5 text-danger";
  const srOnly = "sr-only";
  const optionalClass = "font-normal text-muted";

  type Props = HTMLLabelAttributes & {
    required?: boolean;
    optional?: boolean;
    requiredLabel?: string;
    optionalLabel?: string;
    children?: Snippet;
  };

  let {
    required = false,
    optional = false,
    requiredLabel = "required",
    optionalLabel = "Optional",
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<label class={[base, className]} {...rest}
  >{@render children?.()}{#if required}<span aria-hidden="true" class={marker}
      >*</span
    >{" "}<span class={srOnly}>{requiredLabel}</span
    >{:else if optional}{" "}<span class={optionalClass}>{optionalLabel}</span
    >{/if}</label
>
