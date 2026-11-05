import { fireEvent, render, screen, within } from "@testing-library/vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import CardStack from "../../components/card-stack/CardStack.vue";
import CurrencyInput from "../../components/currency-input/CurrencyInput.vue";
import ExpandableCard from "../../components/expandable-card/ExpandableCard.vue";

afterEach(() => {
  vi.unstubAllGlobals();
  // jsdom has no Web Animations API; tests that stub it remove it again.
  delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
  delete (HTMLElement.prototype as Partial<HTMLElement>).getAnimations;
});

const stubReducedMotion = (reduce: boolean) =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: reduce })),
  );

/** A fake Web Animations API that records calls and lets a test finish an animation. */
const stubAnimate = () => {
  const animations: { onfinish: null | (() => void) }[] = [];
  const animate = vi.fn(() => {
    const animation = {
      onfinish: null as null | (() => void),
      finish: vi.fn(),
    };
    animations.push(animation);
    return animation;
  });
  HTMLElement.prototype.animate = animate as unknown as HTMLElement["animate"];
  HTMLElement.prototype.getAnimations =
    (() => []) as unknown as HTMLElement["getAnimations"];
  return { animate, animations };
};

describe("Vue CardStack", () => {
  const renderStack = (
    props: Record<string, unknown> = {},
    attrs: Record<string, unknown> = {},
  ) =>
    render(CardStack, {
      props: { label: "Testimonials", ...props },
      attrs,
      slots: { default: "<p>One</p><p>Two</p><p>Three</p>" },
    });
  const cards = () =>
    within(screen.getByRole("region")).getAllByRole("group", { hidden: true });
  const depths = () => cards().map((card) => card.getAttribute("data-depth"));

  it("renders a labelled region with stacked, numbered cards", () => {
    renderStack();
    const region = screen.getByRole("region", { name: "Testimonials" });
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    expect(cards().map((card) => card.getAttribute("aria-label"))).toEqual([
      "1 of 3",
      "2 of 3",
      "3 of 3",
    ]);
    expect(depths()).toEqual(["0", "1", "2"]);
    expect(cards()[0]).not.toHaveAttribute("inert");
    expect(cards()[1]).toHaveAttribute("inert");
  });

  it("next and previous move the top card and loop around", async () => {
    renderStack();
    await fireEvent.click(screen.getByRole("button", { name: "Next card" }));
    expect(depths()).toEqual(["2", "0", "1"]);
    expect(screen.getByText("2 of 3", { selector: "p" })).toHaveAttribute(
      "aria-live",
      "polite",
    );
    const previous = screen.getByRole("button", { name: "Previous card" });
    await fireEvent.click(previous);
    await fireEvent.click(previous);
    expect(depths()).toEqual(["1", "2", "0"]);
  });

  it("arrow keys anywhere in the region step through the cards", async () => {
    renderStack();
    const region = screen.getByRole("region");
    await fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(depths()[1]).toBe("0");
    await fireEvent.keyDown(region, { key: "ArrowLeft" });
    expect(depths()[0]).toBe("0");
  });

  it("a long horizontal drag throws the card, a tiny one does not", async () => {
    renderStack();
    const stack = cards()[0]!.parentElement!;
    await fireEvent.pointerDown(stack, { button: 0, clientX: 100 });
    await fireEvent.pointerMove(stack, { clientX: 102 });
    await fireEvent.pointerUp(stack, { clientX: 102 });
    expect(depths()[0]).toBe("0");

    await fireEvent.pointerDown(stack, { button: 0, clientX: 100 });
    await fireEvent.pointerMove(stack, { clientX: 180 });
    expect(cards()[0]!.style.transform).toContain("translateX(80px)");
    await fireEvent.pointerUp(stack, { clientX: 180 });
    expect(depths()[1]).toBe("0");
  });

  it("animates the throw with motion and skips it with reduced motion", async () => {
    stubReducedMotion(false);
    const { animate, animations } = stubAnimate();
    renderStack();
    await fireEvent.click(screen.getByRole("button", { name: "Next card" }));
    expect(animate).toHaveBeenCalledTimes(1);
    expect(cards()[0]).toHaveAttribute("data-leaving");
    animations[0]!.onfinish?.();
    expect(cards()[0]).not.toHaveAttribute("data-leaving");

    stubReducedMotion(true);
    await fireEvent.click(
      screen.getByRole("button", { name: "Previous card" }),
    );
    expect(animate).toHaveBeenCalledTimes(2);
  });

  it("label props override the English defaults", () => {
    renderStack({
      prevLabel: "Kartu sebelumnya",
      nextLabel: "Kartu berikutnya",
      cardLabel: "{index} dari {total}",
    });
    expect(
      screen.getByRole("button", { name: "Kartu sebelumnya" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Kartu berikutnya" }),
    ).toBeInTheDocument();
    expect(cards()[0]).toHaveAttribute("aria-label", "1 dari 3");
  });

  it("puts the user class last on the region", () => {
    renderStack({}, { class: "max-w-xs" });
    expect(screen.getByRole("region").className).toMatch(/ max-w-xs$/);
  });
});

describe("Vue ExpandableCard", () => {
  const renderCard = (
    props: Record<string, unknown> = {},
    attrs: Record<string, unknown> = {},
  ) =>
    render(ExpandableCard, {
      props: {
        title: "Desk lamp",
        description: "Warm dimmable light",
        ...props,
      },
      attrs,
      slots: {
        media: "<span>Picture</span>",
        default: "<p>Ships in 2 days</p>",
        footer: '<button type="button">Add to cart</button>',
      },
    });
  const dialog = () => document.querySelector("dialog")!;

  it("renders a card button wired to a closed dialog", () => {
    renderCard({ id: "lamp" });
    const card = screen.getByRole("button", { name: /Desk lamp/ });
    expect(card).toHaveAttribute("id", "lamp");
    expect(card).toHaveAttribute("aria-haspopup", "dialog");
    expect(card).toHaveAttribute("aria-controls", "lamp-dialog");
    expect(dialog()).not.toHaveAttribute("open");
    expect(dialog()).toHaveAttribute("aria-labelledby", "lamp-title");
  });

  it("opens the detail view, then the close button closes it and restores focus", async () => {
    renderCard();
    const card = screen.getByRole("button", { name: /Desk lamp/ });
    await fireEvent.click(card);
    expect(dialog()).toHaveAttribute("open");
    expect(card).toHaveAttribute("data-state", "open");
    expect(
      within(dialog()).getByRole("heading", { name: "Desk lamp" }),
    ).toBeInTheDocument();
    expect(within(dialog()).getByText("Ships in 2 days")).toBeInTheDocument();
    expect(within(dialog()).getByText("Add to cart")).toBeInTheDocument();

    await fireEvent.click(
      within(dialog()).getByRole("button", { name: "Close" }),
    );
    expect(dialog()).not.toHaveAttribute("open");
    expect(card).toHaveAttribute("data-state", "closed");
    expect(card).toHaveFocus();
  });

  it("Escape and a backdrop click close it", async () => {
    renderCard();
    const card = screen.getByRole("button", { name: /Desk lamp/ });
    await fireEvent.click(card);
    await fireEvent.keyDown(dialog(), { key: "Escape" });
    expect(dialog()).not.toHaveAttribute("open");

    await fireEvent.click(card);
    await fireEvent.click(within(dialog()).getByText("Ships in 2 days"));
    expect(dialog()).toHaveAttribute("open");
    await fireEvent.click(dialog());
    expect(dialog()).not.toHaveAttribute("open");
  });

  it("grows from the card with motion and closes after the shrink", async () => {
    stubReducedMotion(false);
    const { animate, animations } = stubAnimate();
    renderCard();
    await fireEvent.click(screen.getByRole("button", { name: /Desk lamp/ }));
    expect(animate).toHaveBeenCalledTimes(3);
    await fireEvent.click(
      within(dialog()).getByRole("button", { name: "Close" }),
    );
    expect(dialog()).toHaveAttribute("open");
    animations.at(-1)!.onfinish?.();
    expect(dialog()).not.toHaveAttribute("open");
  });

  it("closeLabel overrides the default and the class goes last on the card", () => {
    renderCard({ closeLabel: "Tutup" }, { class: "h-full" });
    expect(
      screen.getByRole("button", { name: "Tutup", hidden: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Desk lamp/ }).className).toMatch(
      / h-full$/,
    );
  });
});

describe("Vue CurrencyInput", () => {
  const field = () => screen.getByRole("textbox");
  const hidden = () =>
    document.querySelector<HTMLInputElement>("input[type=hidden]")!;

  it("formats the starting amount as Rupiah and links the description", () => {
    render(CurrencyInput, {
      props: {
        label: "Amount",
        hint: "Minimum Rp10.000",
        name: "amount",
        id: "amount",
        modelValue: 12500000,
      },
    });
    expect(screen.getByLabelText("Amount")).toHaveValue("12.500.000");
    expect(screen.getByText("Rp")).toHaveAttribute("id", "amount-currency");
    expect(field()).toHaveAttribute(
      "aria-describedby",
      "amount-currency amount-hint",
    );
    expect(field()).toHaveAttribute("inputmode", "numeric");
    expect(field()).not.toHaveAttribute("name");
    expect(hidden()).toHaveValue("12500000");
  });

  it("adds separators while typing and updates v-model", async () => {
    const amount = ref<number | null>(null);
    render(
      defineComponent({
        setup: () => () =>
          h(CurrencyInput, {
            name: "amount",
            modelValue: amount.value,
            "onUpdate:modelValue": (next: number | null) => {
              amount.value = next;
            },
          }),
      }),
    );
    await fireEvent.update(field(), "1250000");
    expect(field()).toHaveValue("1.250.000");
    expect(amount.value).toBe(1250000);
    expect(hidden()).toHaveValue("1250000");

    amount.value = 30000;
    await nextTick();
    expect(field()).toHaveValue("30.000");
  });

  it("Backspace right after a separator jumps over it", async () => {
    render(CurrencyInput, { props: { modelValue: 1500000 } });
    const input = field() as HTMLInputElement;
    input.setSelectionRange(2, 2);
    await fireEvent.keyDown(input, { key: "Backspace" });
    expect(input.selectionStart).toBe(1);
  });

  it("uses US dollar format with decimals", async () => {
    render(CurrencyInput, {
      props: { currency: "USD", name: "budget", modelValue: 1250.5 },
    });
    expect(field()).toHaveValue("1,250.50");
    expect(field()).toHaveAttribute("inputmode", "decimal");
    await fireEvent.update(field(), "2500.759");
    expect(field()).toHaveValue("2,500.75");
  });

  it("clamps to min and max on blur", async () => {
    render(CurrencyInput, { props: { min: 10000, max: 50000 } });
    await fireEvent.update(field(), "5");
    await fireEvent.blur(field());
    expect(field()).toHaveValue("10.000");
    await fireEvent.update(field(), "90000");
    await fireEvent.blur(field());
    expect(field()).toHaveValue("50.000");
  });

  it("preset chips show short amounts and set the value", async () => {
    stubReducedMotion(true);
    render(CurrencyInput, {
      props: { presets: [50000, 1500000], presetsLabel: "Nominal cepat" },
    });
    const group = screen.getByRole("group", { name: "Nominal cepat" });
    const chip = within(group).getByRole("button", { name: "1,5jt" });
    expect(chip).toHaveAttribute("aria-pressed", "false");
    await fireEvent.click(chip);
    expect(field()).toHaveValue("1.500.000");
    expect(chip).toHaveAttribute("aria-pressed", "true");
  });

  it("counts up to the preset with motion", async () => {
    stubReducedMotion(false);
    let tick: FrameRequestCallback = () => {};
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn((callback: FrameRequestCallback) => {
        tick = callback;
        return 1;
      }),
    );
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
    render(CurrencyInput, { props: { currency: "USD", presets: [1000] } });
    await fireEvent.click(screen.getByRole("button", { name: "$1K" }));
    tick(0);
    tick(200);
    await nextTick();
    expect(field()).toHaveValue("875");
    tick(400);
    await nextTick();
    expect(field()).toHaveValue("1,000");
  });

  it("shows the error, disables chips with the field, and puts the class last", () => {
    render(CurrencyInput, {
      props: {
        error: "Too much",
        hint: "Hidden",
        disabled: true,
        presets: [50000],
      },
      attrs: { class: "text-right" },
    });
    expect(field()).toHaveAttribute("aria-invalid", "true");
    expect(field()).toBeDisabled();
    expect(screen.queryByText("Hidden")).toBeNull();
    expect(screen.getByRole("button", { name: "50rb" })).toBeDisabled();
    expect(field().className).toMatch(/ text-right$/);
  });
});
