<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const base = "animate-pulse bg-subtle motion-reduce:animate-none";
  const shapes = {
    rect: "rounded-md",
    circle: "rounded-full",
  };

  type Props = HTMLAttributes<HTMLDivElement> & {
    shape?: keyof typeof shapes;
  };

  let { shape = "rect", class: className, ...rest }: Props = $props();
</script>

<div
  aria-hidden="true"
  class={[base, shapes[shape], className]}
  {...rest}
></div>
