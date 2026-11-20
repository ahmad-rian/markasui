/**
 * Floating "Buy me a coffee" card (components/CoffeeLauncher.astro). The popover is native, so Escape, light
 * dismiss and returning focus to the launcher come from the browser. This script adds the one-time entrance (after
 * a short delay or a bit of scrolling), keeps aria-expanded in sync, moves focus into the popover, handles "hide for
 * 7 days" and the small x that shrinks the card to a round button for the rest of the visit, and starts the Lottie
 * cup (scripts/coffee-lottie.ts) once the launcher shows. With ClientRouter every page brings a fresh launcher
 * (closed); once it has appeared, later pages show it straight away without the entrance.
 */
import { playCoffeeCup } from "./coffee-lottie";
import { onPageLoad } from "./lifecycle";

const HIDE_KEY = "markas-coffee-hidden-until";
const HIDE_MS = 7 * 24 * 60 * 60 * 1000;
const ENTRANCE_DELAY_MS = 2000;
const SCROLL_THRESHOLD_PX = 240;
/** sessionStorage: the reader minimized the card, so it stays a round button until the tab closes. */
const COMPACT_KEY = "markas-coffee-compact";

let entered = false;
let entranceTimer: ReturnType<typeof setTimeout> | undefined;

const launcher = () => document.querySelector<HTMLElement>("[data-coffee]");

function isDismissed(): boolean {
  try {
    return Number(localStorage.getItem(HIDE_KEY)) > Date.now();
  } catch {
    return false;
  }
}

function dismiss() {
  try {
    localStorage.setItem(HIDE_KEY, String(Date.now() + HIDE_MS));
  } catch {
    // Storage blocked: the launcher stays hidden on this page only.
  }
}

function isCompact(): boolean {
  try {
    return sessionStorage.getItem(COMPACT_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberCompact() {
  try {
    sessionStorage.setItem(COMPACT_KEY, "1");
  } catch {
    // Storage blocked: the card is minimized on this page only.
  }
}

function stopWaiting() {
  clearTimeout(entranceTimer);
  removeEventListener("scroll", onScroll);
}

function reveal(instant = false) {
  stopWaiting();
  const element = launcher();
  if (!element || element.dataset.state !== "idle") return;
  if (instant) element.dataset.instant = "";
  element.dataset.state = "shown";
  entered = true;
  playCoffeeCup(element.querySelector<HTMLElement>("[data-coffee-art]")!);
}

function onScroll() {
  if (scrollY > SCROLL_THRESHOLD_PX) reveal();
}

function setup(element: HTMLElement) {
  if (element.dataset.ready) return;
  element.dataset.ready = "";
  const card = element.querySelector<HTMLElement>("[data-coffee-card]")!;
  const toggle = element.querySelector<HTMLElement>("[data-coffee-toggle]")!;

  card.addEventListener("toggle", (event) => {
    const open = (event as ToggleEvent).newState === "open";
    toggle.setAttribute("aria-expanded", String(open));
    if (open) card.focus();
  });
  element
    .querySelector<HTMLElement>("[data-coffee-hide]")!
    .addEventListener("click", () => {
      dismiss();
      card.hidePopover();
      element.hidden = true;
    });
  element
    .querySelector<HTMLElement>("[data-coffee-minimize]")!
    .addEventListener("click", () => {
      rememberCompact();
      element.dataset.compact = "";
      toggle.focus();
    });
}

onPageLoad(() => {
  stopWaiting();
  const element = launcher();
  if (!element) return;
  if (isDismissed()) {
    element.hidden = true;
    return;
  }
  if (isCompact()) element.dataset.compact = "";
  setup(element);
  if (entered) return reveal(true);
  entranceTimer = setTimeout(reveal, ENTRANCE_DELAY_MS);
  addEventListener("scroll", onScroll, { passive: true });
});
