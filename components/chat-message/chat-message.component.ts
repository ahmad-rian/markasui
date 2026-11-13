import { NgTemplateOutlet } from "@angular/common";
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  numberAttribute,
  output,
  signal,
} from "@angular/core";

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

export type ChatMessageFeedback = "like" | "dislike" | null;

/** Host stays out of layout; class moves to the article. */
@Component({
  selector: "markas-chat-message",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { class: "contents" },
  template: `
    <ng-template #icon let-d let-iconClass="iconClass">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        [class]="iconClass"
      >
        <path [attr.d]="d" />
      </svg>
    </ng-template>
    <article
      [attr.data-from]="from()"
      [attr.aria-label]="assistant() ? assistantLabel() : userLabel()"
      [class]="rootClasses()"
    >
      @if (assistant()) {
        <span aria-hidden="true" [class]="avatarClass">
          @if (avatar()) {
            <img [src]="avatar()" alt="" [class]="avatarImage" />
          } @else {
            <ng-container
              [ngTemplateOutlet]="icon"
              [ngTemplateOutletContext]="{
                $implicit: PATHS.spark,
                iconClass: avatarIcon,
              }"
            />
          }
        </span>
      }
      <div [class]="bodies[from()]">
        @if (assistant()) {
          <p [class]="header">
            {{ assistantLabel() }}
            @if (time()) {
              <time [class]="timeClass">{{ time() }}</time>
            }
          </p>
        }
        <div [class]="contentClass()">
          @if (typing()) {
            <span role="status" [class]="dots"
              ><span [class]="srOnly">{{ typingLabel() }}</span>
              @for (c of dot; track c) {
                <span aria-hidden="true" [class]="c"></span>
              }
            </span>
          } @else if (stream()) {
            <span [class]="srOnly">{{ text() }}</span
            ><span aria-hidden="true">{{ visibleText() }}</span>
            @if (streaming()) {
              <span aria-hidden="true" [class]="caret"></span>
            }
          } @else {
            <ng-container>{{ text() }}</ng-container>
          }
        </div>
        <div [class]="footer">
          @if (actions() && !typing() && !streaming()) {
            <div
              role="group"
              [attr.aria-label]="actionsLabel()"
              [class]="actionsClass"
            >
              <button
                type="button"
                [attr.aria-label]="copyLabel()"
                [attr.data-state]="copied() ? 'copied' : 'idle'"
                [class]="action"
                (click)="copy()"
              >
                <ng-container
                  [ngTemplateOutlet]="icon"
                  [ngTemplateOutletContext]="{
                    $implicit: PATHS.copy,
                    iconClass: copyIcon,
                  }"
                />
                <ng-container
                  [ngTemplateOutlet]="icon"
                  [ngTemplateOutletContext]="{
                    $implicit: PATHS.check,
                    iconClass: checkIcon,
                  }"
                />
              </button>
              @if (assistant()) {
                <button
                  type="button"
                  [attr.aria-label]="likeLabel()"
                  [attr.aria-pressed]="rating() === 'like'"
                  [class]="action"
                  (click)="rate('like')"
                >
                  <ng-container
                    [ngTemplateOutlet]="icon"
                    [ngTemplateOutletContext]="{
                      $implicit: PATHS.like,
                      iconClass: pressIcon,
                    }"
                  />
                </button>
                <button
                  type="button"
                  [attr.aria-label]="dislikeLabel()"
                  [attr.aria-pressed]="rating() === 'dislike'"
                  [class]="action"
                  (click)="rate('dislike')"
                >
                  <ng-container
                    [ngTemplateOutlet]="icon"
                    [ngTemplateOutletContext]="{
                      $implicit: PATHS.dislike,
                      iconClass: pressIcon,
                    }"
                  />
                </button>
                <button
                  type="button"
                  [attr.aria-label]="regenerateLabel()"
                  [class]="action"
                  (click)="regenerate.emit()"
                >
                  <ng-container
                    [ngTemplateOutlet]="icon"
                    [ngTemplateOutletContext]="{
                      $implicit: PATHS.regenerate,
                      iconClass: actionIcon,
                    }"
                  />
                </button>
              }
              <span role="status" [class]="srOnly">{{
                copied() ? copiedLabel() : ""
              }}</span>
            </div>
          }
          @if (!assistant() && time()) {
            <time [class]="timeClass">{{ time() }}</time>
          }
        </div>
      </div>
    </article>
  `,
})
export class ChatMessage {
  readonly from = input<"user" | "assistant">("assistant");
  readonly text = input("");
  /** Assistant messages: plain text or a soft bubble. */
  readonly variant = input<"plain" | "bubble">("plain");
  readonly time = input<string>();
  /** Image URL for the assistant avatar. Defaults to a spark icon. */
  readonly avatar = input<string>();
  /** Shows three dots instead of the text. */
  readonly typing = input(false, { transform: booleanAttribute });
  /** Reveals the text token by token with a caret. Off with reduced motion. */
  readonly stream = input(false, { transform: booleanAttribute });
  /** Pause between streamed tokens, in ms. */
  readonly streamSpeed = input(40, { transform: numberAttribute });
  /** Shows copy, and for the assistant like, dislike, and regenerate. */
  readonly actions = input(true, { transform: booleanAttribute });
  readonly userLabel = input("You");
  readonly assistantLabel = input("Assistant");
  readonly typingLabel = input("Typing");
  readonly actionsLabel = input("Message actions");
  readonly copyLabel = input("Copy");
  readonly copiedLabel = input("Copied");
  readonly likeLabel = input("Good response");
  readonly dislikeLabel = input("Bad response");
  readonly regenerateLabel = input("Regenerate");
  readonly userClass = input("", { alias: "class" });
  readonly feedback = output<ChatMessageFeedback>();
  readonly regenerate = output<void>();

  protected readonly PATHS = PATHS;
  protected readonly avatarClass = avatarClass;
  protected readonly avatarImage = avatarImage;
  protected readonly avatarIcon = avatarIcon;
  protected readonly bodies = bodies;
  protected readonly header = header;
  protected readonly timeClass = timeClass;
  protected readonly footer = footer;
  protected readonly actionsClass = actionsClass;
  protected readonly action = action;
  protected readonly actionIcon = actionIcon;
  protected readonly pressIcon = pressIcon;
  protected readonly copyIcon = copyIcon;
  protected readonly checkIcon = checkIcon;
  protected readonly dots = dots;
  protected readonly dot = dot;
  protected readonly caret = caret;
  protected readonly srOnly = srOnly;
  protected readonly copied = signal(false);
  protected readonly rating = signal<ChatMessageFeedback>(null);
  private readonly shown = signal(Infinity);
  protected readonly assistant = computed(() => this.from() === "assistant");
  /** Words and the spaces between them, so streaming reveals one token at a time. */
  private readonly tokens = computed(() =>
    this.text().split(/(\s+)/).filter(Boolean),
  );
  protected readonly streaming = computed(
    () => this.stream() && this.shown() < this.tokens().length,
  );
  protected readonly visibleText = computed(() =>
    this.tokens().slice(0, this.shown()).join(""),
  );
  protected readonly rootClasses = computed(() =>
    [roots[this.from()], this.userClass()].filter(Boolean).join(" "),
  );
  protected readonly contentClass = computed(
    () => contents[this.assistant() ? this.variant() : "user"],
  );
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    afterNextRender(() => {
      if (this.stream() && !reducedMotion()) this.shown.set(0);
    });
    effect((onCleanup) => {
      if (!this.streaming()) return;
      // Read shown here so the effect re-runs after every token (React: deps [streaming, shown]).
      const current = this.shown();
      const next = setTimeout(
        () => this.shown.set(current + 1),
        this.streamSpeed(),
      );
      onCleanup(() => clearTimeout(next));
    });
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected async copy() {
    try {
      await navigator.clipboard.writeText(this.text());
    } catch {
      // Clipboard blocked or unavailable: no check mark.
      return;
    }
    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), COPIED_MS);
  }

  protected rate(value: "like" | "dislike") {
    const next = this.rating() === value ? null : value;
    this.rating.set(next);
    this.feedback.emit(next);
  }
}
