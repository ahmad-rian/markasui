<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const root = "inline";
  const caret = "ml-0.5 inline-block h-[1.1em] w-0.5 bg-current align-[-0.2em]";

  const WORD_SEPARATOR = "\n";

  const reducedMotion = () =>
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Calls `callback(true/false)` whenever the element enters or leaves the screen. Returns a stop function. */
  function onVisibility(
    element: Element,
    callback: (visible: boolean) => void,
  ) {
    if (typeof IntersectionObserver === "undefined") {
      callback(true);
      return () => {};
    }
    const observer = new IntersectionObserver((entries) =>
      callback(entries.some((entry) => entry.isIntersecting)),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }

  /** The caret blinks every 500 ms with the Web Animations API. */
  function blink(element: HTMLElement | undefined) {
    return element?.animate?.([{ opacity: 1 }, { opacity: 0 }], {
      duration: 1000,
      iterations: Infinity,
      easing: "steps(2, jump-none)",
    });
  }

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    words: string[];
    typeSpeed?: number;
    deleteSpeed?: number;
    pause?: number;
    loop?: boolean;
    cursor?: boolean;
  };

  let {
    words,
    typeSpeed = 70,
    deleteSpeed = 40,
    pause = 1800,
    loop = true,
    cursor = true,
    class: className,
    ...rest
  }: Props = $props();

  let element = $state<HTMLSpanElement>();
  let caretElement = $state<HTMLSpanElement>();
  // The typed text; until the animation starts, the first word.
  let typed = $state<string>();
  const key = $derived(words.join(WORD_SEPARATOR));

  $effect(() => {
    // Read every prop up front so the effect reruns when one changes.
    const options = { typeSpeed, deleteSpeed, pause, loop, cursor };
    const list = key.split(WORD_SEPARATOR).map((word) => Array.from(word));
    const caretNode = caretElement;
    typed = undefined;
    if (!element || !key || reducedMotion()) return;

    let index = 0;
    let count = list[0]?.length ?? 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const animation = options.cursor ? blink(caretNode) : undefined;

    // Type one letter, pause on the full word, delete it, then move to the next word.
    const step = () => {
      const chars = list[index] ?? [];
      let delay = deleting ? options.deleteSpeed : options.typeSpeed;
      if (!deleting && count >= chars.length) {
        if (!options.loop && index === list.length - 1) return;
        deleting = true;
        delay = options.pause;
      } else if (deleting && count === 0) {
        deleting = false;
        index = (index + 1) % list.length;
      } else {
        count += deleting ? -1 : 1;
        typed = chars.slice(0, count).join("");
      }
      timer = setTimeout(step, delay);
    };

    const stop = onVisibility(element, (visible) => {
      clearTimeout(timer);
      if (visible) step();
    });
    return () => {
      stop();
      clearTimeout(timer);
      animation?.cancel();
    };
  });
</script>

<span bind:this={element} {...rest} class={[root, className]}
  ><span class="sr-only">{words.join(", ")}</span><span aria-hidden="true"
    >{typed ?? words[0] ?? ""}</span
  >{#if cursor}<span bind:this={caretElement} aria-hidden="true" class={caret}
    ></span>{/if}</span
>
