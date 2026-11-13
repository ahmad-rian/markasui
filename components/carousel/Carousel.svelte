<script lang="ts" module>
  /** Fill the {index} and {total} placeholders in a label. */
  export const formatLabel = (template: string, index: number, total: number) =>
    template
      .replaceAll("{index}", String(index))
      .replaceAll("{total}", String(total));
</script>

<script lang="ts" generics="T">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root = "w-full";
  const viewport =
    "relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth rounded-xl [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden";
  const slideClass = "min-w-0 shrink-0 snap-start";
  const perViews = {
    1: "basis-full",
    2: "basis-[calc((100%-1rem)/2)]",
    3: "basis-[calc((100%-2rem)/3)]",
  };
  const controls = "mt-3 flex items-center gap-2";
  const dots = "flex items-center";
  const dot =
    "group inline-flex h-6 min-w-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const dotMark =
    "h-2 w-2 rounded-full bg-faint transition-all duration-150 ease-out group-data-[state=active]:w-4 group-data-[state=active]:bg-primary motion-reduce:transition-none";
  const buttons = "ml-auto flex items-center gap-2";
  const navButton =
    "inline-flex size-8 items-center justify-center rounded-md border border-line bg-surface text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
  const icon = "size-4";

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    /** One slide per item, rendered by the slide snippet. */
    items: T[];
    slide: Snippet<[T, number]>;
    label?: string;
    perView?: keyof typeof perViews;
    showDots?: boolean;
    previousLabel?: string;
    nextLabel?: string;
    slideLabel?: string;
    dotLabel?: string;
  };

  let {
    items,
    slide,
    label = "Carousel",
    perView = 1,
    showDots = false,
    previousLabel = "Previous slide",
    nextLabel = "Next slide",
    slideLabel = "{index} of {total}",
    dotLabel = "Go to slide {index}",
    id,
    class: className,
    onkeydown,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const carouselId = $derived(id ?? generatedId);
  const viewportId = $derived(`${carouselId}-viewport`);
  const total = $derived(items.length);
  let viewportEl = $state<HTMLDivElement>();
  let index = $state(0);
  let atStart = $state(true);
  // svelte-ignore state_referenced_locally
  let atEnd = $state(items.length <= 1);

  /** Read the nearest slide and whether the viewport is at its left or right edge. */
  function sync() {
    const el = viewportEl;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    const left = el.scrollLeft;
    index = slides.reduce(
      (best, item, i) =>
        Math.abs(item.offsetLeft - left) <
        Math.abs((slides[best]?.offsetLeft ?? 0) - left)
          ? i
          : best,
      0,
    );
    atStart = left <= 1;
    atEnd = left + el.clientWidth >= el.scrollWidth - 1;
  }

  $effect(() => {
    void total;
    sync();
  });

  function goTo(target: number) {
    const el = viewportEl;
    const slideEl = el?.children[target] as HTMLElement | undefined;
    if (el && slideEl) el.scrollTo({ left: slideEl.offsetLeft });
  }

  const step = (direction: 1 | -1) =>
    goTo(Math.min(Math.max(index + direction, 0), total - 1));

  function handleKeydown(
    event: KeyboardEvent & { currentTarget: HTMLDivElement },
  ) {
    onkeydown?.(event);
    const directions: Record<string, 1 | -1 | undefined> = {
      ArrowRight: 1,
      ArrowLeft: -1,
    };
    const direction = directions[event.key];
    if (direction === undefined || event.defaultPrevented) return;
    event.preventDefault();
    step(direction);
  }
</script>

<div
  id={carouselId}
  role="region"
  aria-roledescription="carousel"
  aria-label={label}
  class={[root, className]}
  onkeydown={handleKeydown}
  {...rest}
>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    bind:this={viewportEl}
    id={viewportId}
    tabindex="0"
    class={viewport}
    onscroll={sync}
  >
    {#each items as item, i (i)}
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={formatLabel(slideLabel, i + 1, total)}
        class={[slideClass, perViews[perView]]}
      >
        {@render slide(item, i)}
      </div>
    {/each}
  </div>
  <div class={controls}>
    {#if showDots}
      <div class={dots}>
        {#each items as _, i (i)}
          <button
            type="button"
            aria-label={formatLabel(dotLabel, i + 1, total)}
            aria-controls={viewportId}
            aria-current={i === index ? "true" : undefined}
            data-state={i === index ? "active" : "inactive"}
            class={dot}
            onclick={() => goTo(i)}
          >
            <span aria-hidden="true" class={dotMark}></span>
          </button>
        {/each}
      </div>
    {/if}
    <div class={buttons}>
      <button
        type="button"
        aria-label={previousLabel}
        aria-controls={viewportId}
        disabled={atStart}
        class={navButton}
        onclick={() => step(-1)}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class={icon}
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        aria-controls={viewportId}
        disabled={atEnd}
        class={navButton}
        onclick={() => step(1)}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class={icon}
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  </div>
</div>
