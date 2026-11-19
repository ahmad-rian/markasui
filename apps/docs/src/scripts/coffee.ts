/**
 * Floating "Buy me a coffee" card (components/CoffeeLauncher.astro). The card is a native popover, so Escape, light
 * dismiss and returning focus to the pill come from the browser. This script adds the one-time entrance (after a
 * short delay or a bit of scrolling), keeps aria-expanded in sync, moves focus into the card and handles "hide for
 * 7 days". With ClientRouter every page brings a fresh launcher (collapsed); once it has appeared, later pages show
 * it straight away without the entrance.
 */
import { onPageLoad } from "./lifecycle";

const HIDE_KEY = "markas-coffee-hidden-until";
const HIDE_MS = 7 * 24 * 60 * 60 * 1000;
const ENTRANCE_DELAY_MS = 2000;
const SCROLL_THRESHOLD_PX = 240;

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
}

onPageLoad(() => {
  stopWaiting();
  const element = launcher();
  if (!element) return;
  if (isDismissed()) {
    element.hidden = true;
    return;
  }
  setup(element);
  if (entered) return reveal(true);
  entranceTimer = setTimeout(reveal, ENTRANCE_DELAY_MS);
  addEventListener("scroll", onScroll, { passive: true });
});
