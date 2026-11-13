<script lang="ts" module>
  export type ChatMessageFeedback = "like" | "dislike" | null;
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const roots = {
    user: "group/message flex flex-col items-end gap-1",
    assistant: "group/message flex items-start gap-3",
  };
  const avatarClass =
    "grid size-8 shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-surface text-ink";
  const avatarImage = "size-full object-cover";
  const avatarIcon = "size-4";
  const bodies = {
    user: "flex w-full flex-col items-end gap-1",
    assistant: "grid min-w-0 flex-1 justify-items-start gap-1",
  };
  const header = "flex items-baseline gap-2 text-sm font-medium text-ink";
  const contents = {
    user: "max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm leading-6 break-words whitespace-pre-line text-on-primary",
    plain: "text-sm leading-6 break-words whitespace-pre-line text-ink",
    bubble:
      "rounded-2xl rounded-tl-md bg-subtle px-4 py-2.5 text-sm leading-6 break-words whitespace-pre-line text-ink",
  };
  const timeClass = "text-xs font-normal text-muted";
  const footer = "flex min-h-7 items-center gap-1";
  const actionsClass =
    "flex items-center gap-0.5 opacity-0 transition-opacity duration-150 ease-out group-focus-within/message:opacity-100 group-hover/message:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100";
  const action =
    "group/action grid size-7 place-items-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:text-ink motion-reduce:transition-none";
  const actionIcon = "col-start-1 row-start-1 size-4";
  const pressIcon = "size-4 group-aria-pressed/action:fill-current/20";
  const copyIcon =
    "col-start-1 row-start-1 size-4 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]/action:scale-50 group-data-[state=copied]/action:opacity-0 motion-reduce:transition-none";
  const checkIcon =
    "col-start-1 row-start-1 size-4 scale-50 opacity-0 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]/action:scale-100 group-data-[state=copied]/action:opacity-100 motion-reduce:transition-none";
  const dots = "inline-flex h-6 items-center gap-1";
  const dot = [
    "size-1.5 animate-pulse rounded-full bg-muted motion-reduce:animate-none",
    "size-1.5 animate-pulse rounded-full bg-muted [animation-delay:150ms] motion-reduce:animate-none",
    "size-1.5 animate-pulse rounded-full bg-muted [animation-delay:300ms] motion-reduce:animate-none",
  ];
  const caret =
    "ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse rounded-xs bg-current motion-reduce:animate-none";
  const srOnly = "sr-only";

  const PATHS = {
    spark:
      "M12 3c.4 4.6 2.4 6.6 7 7-4.6.4-6.6 2.4-7 7-.4-4.6-2.4-6.6-7-7 4.6-.4 6.6-2.4 7-7zM19 16c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5z",
    copy: "M9 9h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1",
    check: "m4 12 5 5L20 6",
    like: "M7 10v11M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 8a2 2 0 0 1-1.9 1.4H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.8a2 2 0 0 0 1.8-1.1L12 2a3.1 3.1 0 0 1 3 3.9z",
    dislike:
      "M17 14V3M9 18.1 10 14H4.2a2 2 0 0 1-1.9-2.6l2.3-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.8a2 2 0 0 0-1.8 1.1L12 22a3.1 3.1 0 0 1-3-3.9z",
    regenerate:
      "M3 12a9 9 0 0 1 15.7-6L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.7 6L3 16M8 16H3v5",
  };

  /** How long the check mark stays after copying. */
  const COPIED_MS = 2000;

  const reducedMotion = () =>
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  type Props = HTMLAttributes<HTMLElement> & {
    from?: "user" | "assistant";
    text?: string;
    /** Assistant messages: plain text or a soft bubble. */
    variant?: "plain" | "bubble";
    time?: string;
    /** Image URL for the assistant avatar. Defaults to a spark icon. */
    avatar?: string;
    /** Shows three dots instead of the text. */
    typing?: boolean;
    /** Reveals the text token by token with a caret. Off with reduced motion. */
    stream?: boolean;
    /** Pause between streamed tokens, in ms. */
    streamSpeed?: number;
    /** Shows copy, and for the assistant like, dislike, and regenerate. */
    actions?: boolean;
    onFeedback?: (value: ChatMessageFeedback) => void;
    onRegenerate?: () => void;
    userLabel?: string;
    assistantLabel?: string;
    typingLabel?: string;
    actionsLabel?: string;
    copyLabel?: string;
    copiedLabel?: string;
    likeLabel?: string;
    dislikeLabel?: string;
    regenerateLabel?: string;
  };

  let {
    from = "assistant",
    text = "",
    variant = "plain",
    time,
    avatar,
    typing = false,
    stream = false,
    streamSpeed = 40,
    actions = true,
    onFeedback,
    onRegenerate,
    userLabel = "You",
    assistantLabel = "Assistant",
    typingLabel = "Typing",
    actionsLabel = "Message actions",
    copyLabel = "Copy",
    copiedLabel = "Copied",
    likeLabel = "Good response",
    dislikeLabel = "Bad response",
    regenerateLabel = "Regenerate",
    class: className,
    ...rest
  }: Props = $props();

  const assistant = $derived(from === "assistant");
  /** Words and the spaces between them, so streaming reveals one token at a time. */
  const tokens = $derived(text.split(/(\s+)/).filter(Boolean));
  let shown = $state(Infinity);
  let copied = $state(false);
  let feedback = $state<ChatMessageFeedback>(null);
  const streaming = $derived(stream && shown < tokens.length);
  let timer: ReturnType<typeof setTimeout> | undefined;

  $effect.pre(() => {
    if (stream && !reducedMotion()) shown = 0;
  });
  $effect(() => {
    if (!streaming) return;
    // Read shown here so the effect re-runs after every token (React: deps [streaming, shown]).
    const current = shown;
    const next = setTimeout(() => (shown = current + 1), streamSpeed);
    return () => clearTimeout(next);
  });
  onDestroy(() => clearTimeout(timer));

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard blocked or unavailable: no check mark.
      return;
    }
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), COPIED_MS);
  }

  function rate(value: "like" | "dislike") {
    feedback = feedback === value ? null : value;
    onFeedback?.(feedback);
  }
</script>

{#snippet icon(d: string, iconClass: string)}
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    class={iconClass}
  >
    <path {d} />
  </svg>
{/snippet}

<article
  data-from={from}
  aria-label={assistant ? assistantLabel : userLabel}
  class={[roots[from], className]}
  {...rest}
>
  {#if assistant}
    <span aria-hidden="true" class={avatarClass}>
      {#if avatar}
        <img src={avatar} alt="" class={avatarImage} />
      {:else}
        {@render icon(PATHS.spark, avatarIcon)}
      {/if}
    </span>
  {/if}
  <div class={bodies[from]}>
    {#if assistant}
      <p class={header}>
        {assistantLabel}{#if time}<time class={timeClass}>{time}</time>{/if}
      </p>
    {/if}
    <div class={contents[assistant ? variant : "user"]}>
      {#if typing}<span role="status" class={dots}
          ><span class={srOnly}>{typingLabel}</span>{#each dot as c (c)}<span
              aria-hidden="true"
              class={c}
            ></span>{/each}</span
        >{:else if stream}<span class={srOnly}>{text}</span><span
          aria-hidden="true">{tokens.slice(0, shown).join("")}</span
        >{#if streaming}<span aria-hidden="true" class={caret}
          ></span>{/if}{:else}{text}{/if}
    </div>
    <div class={footer}>
      {#if actions && !typing && !streaming}
        <div role="group" aria-label={actionsLabel} class={actionsClass}>
          <button
            type="button"
            aria-label={copyLabel}
            data-state={copied ? "copied" : "idle"}
            class={action}
            onclick={copy}
          >
            {@render icon(PATHS.copy, copyIcon)}
            {@render icon(PATHS.check, checkIcon)}
          </button>
          {#if assistant}
            <button
              type="button"
              aria-label={likeLabel}
              aria-pressed={feedback === "like"}
              class={action}
              onclick={() => rate("like")}
            >
              {@render icon(PATHS.like, pressIcon)}
            </button>
            <button
              type="button"
              aria-label={dislikeLabel}
              aria-pressed={feedback === "dislike"}
              class={action}
              onclick={() => rate("dislike")}
            >
              {@render icon(PATHS.dislike, pressIcon)}
            </button>
            <button
              type="button"
              aria-label={regenerateLabel}
              class={action}
              onclick={onRegenerate}
            >
              {@render icon(PATHS.regenerate, actionIcon)}
            </button>
          {/if}
          <span role="status" class={srOnly}>{copied ? copiedLabel : ""}</span>
        </div>
      {/if}
      {#if !assistant && time}<time class={timeClass}>{time}</time>{/if}
    </div>
  </div>
</article>
