<script lang="ts">
  import { untrack } from "svelte";
  import type { HTMLFieldsetAttributes } from "svelte/elements";

  const root = "m-0 min-w-0 border-0 p-0";
  const legend = "mb-1.5 p-0 text-sm font-medium text-ink";
  const group = "flex gap-2";
  const box =
    "h-12 w-10 rounded-md border border-line bg-surface text-center text-lg font-medium text-ink transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none";

  const NON_DIGIT = /\D/g;

  /** Split the value into exactly `length` characters; empty positions hold "". */
  const toChars = (value: string, length: number) =>
    Array.from({ length }, (_, index) => value[index] ?? "");

  const formatDigitLabel = (template: string, index: number, length: number) =>
    template
      .replace("{index}", String(index + 1))
      .replace("{length}", String(length));

  type Props = Omit<HTMLFieldsetAttributes, "name"> & {
    length?: number;
    label?: string;
    name?: string;
    value?: string;
    /** aria-label of each box. {index} and {length} are replaced with numbers. */
    digitLabel?: string;
    oncomplete?: (value: string) => void;
  };

  let {
    length = 6,
    label,
    name,
    value = $bindable(""),
    digitLabel = "Digit {index} of {length}",
    oncomplete,
    class: className,
    ...rest
  }: Props = $props();

  let groupEl = $state<HTMLDivElement>();
  let chars = $state(untrack(() => toChars(value, length)));
  const joined = $derived(chars.join(""));

  // An outside value wins, unless it equals the boxes (keeps empty positions in place).
  $effect.pre(() => {
    const next = value;
    const size = length;
    untrack(() => {
      if (next !== joined || chars.length !== size) chars = toChars(next, size);
    });
  });

  function focusBox(index: number) {
    const target = groupEl?.children[index];
    if (target instanceof HTMLInputElement) target.focus();
  }

  function update(next: string[]) {
    const previous = joined;
    chars = next;
    const nextValue = next.join("");
    if (nextValue === previous) return;
    value = nextValue;
    if (next.every(Boolean)) oncomplete?.(nextValue);
  }

  /** Fill boxes from `start` with consecutive digits, then focus the box after them. */
  function fill(start: number, digits: string) {
    update(
      chars.map((char, index) =>
        index >= start && index < start + digits.length
          ? (digits[index - start] ?? char)
          : char,
      ),
    );
    focusBox(Math.min(start + digits.length, length - 1));
  }

  const setChar = (index: number, char: string) =>
    update(chars.map((current, i) => (i === index ? char : current)));

  function handleInput(
    index: number,
    event: Event & { currentTarget: HTMLInputElement },
  ) {
    const target = event.currentTarget;
    const digits = target.value.replace(NON_DIGIT, "");
    if (digits === "") setChar(index, "");
    else fill(index, digits);
    // Svelte skips the DOM write when the state did not change, so sync it by hand.
    target.value = chars[index] ?? "";
  }

  function handleKeydown(index: number, event: KeyboardEvent) {
    const moves: Record<string, number | undefined> = {
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      Home: 0,
      End: length - 1,
    };
    const move = moves[event.key];
    if (move !== undefined) {
      event.preventDefault();
      return focusBox(move);
    }
    if (event.key === "Delete") {
      event.preventDefault();
      return setChar(index, "");
    }
    if (event.key !== "Backspace") return;
    event.preventDefault();
    if (chars[index] || index === 0) return setChar(index, "");
    setChar(index - 1, "");
    focusBox(index - 1);
  }

  function handlePaste(index: number, event: ClipboardEvent) {
    event.preventDefault();
    const digits = (event.clipboardData?.getData("text") ?? "")
      .replace(NON_DIGIT, "")
      .slice(0, length);
    if (digits === "") return;
    fill(digits.length >= length ? 0 : index, digits);
  }
</script>

<fieldset class={[root, className]} {...rest}>
  {#if label}
    <legend class={legend}>{label}</legend>
  {/if}
  <div bind:this={groupEl} class={group}>
    {#each chars as char, index (index)}
      <input
        type="text"
        inputmode="numeric"
        autocomplete={index === 0 ? "one-time-code" : "off"}
        aria-label={formatDigitLabel(digitLabel, index, length)}
        value={char}
        class={box}
        oninput={(event) => handleInput(index, event)}
        onkeydown={(event) => handleKeydown(index, event)}
        onpaste={(event) => handlePaste(index, event)}
        onfocus={(event) => event.currentTarget.select()}
      />
    {/each}
  </div>
  {#if name}
    <input type="hidden" {name} value={joined} />
  {/if}
</fieldset>
