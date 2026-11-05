import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CardStack } from "../../components/card-stack/CardStack";
import { CurrencyInput } from "../../components/currency-input/CurrencyInput";
import { ExpandableCard } from "../../components/expandable-card/ExpandableCard";

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

describe("React CardStack", () => {
  const renderStack = (props: Partial<Parameters<typeof CardStack>[0]> = {}) =>
    render(
      <CardStack label="Testimonials" {...props}>
        <p>One</p>
        <p>Two</p>
        <p>Three</p>
      </CardStack>,
    );
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
    expect(screen.getByText("1 of 3", { selector: "p" })).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  it("next and previous move the top card and loop around", () => {
    renderStack();
    const next = screen.getByRole("button", { name: "Next card" });
    const previous = screen.getByRole("button", { name: "Previous card" });

    fireEvent.click(next);
    expect(depths()).toEqual(["2", "0", "1"]);
    expect(cards()[1]).not.toHaveAttribute("inert");
    expect(screen.getByText("2 of 3", { selector: "p" })).toBeInTheDocument();

    fireEvent.click(previous);
    fireEvent.click(previous);
    expect(depths()).toEqual(["1", "2", "0"]);
  });

  it("caps the depth so cards past the third stay hidden", () => {
    render(
      <CardStack>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
      </CardStack>,
    );
    expect(depths()).toEqual(["0", "1", "2", "3", "3"]);
    expect(screen.getByRole("region", { name: "Card stack" })).toBeVisible();
  });

  it("arrow keys anywhere in the region step through the cards", () => {
    renderStack();
    const region = screen.getByRole("region");
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(depths()[1]).toBe("0");
    fireEvent.keyDown(region, { key: "ArrowLeft" });
    expect(depths()[0]).toBe("0");
    fireEvent.keyDown(region, { key: "ArrowDown" });
    expect(depths()[0]).toBe("0");
  });

  it("a long horizontal drag throws the card, a tiny one does not", () => {
    renderStack();
    const stack = cards()[0]!.parentElement!;
    fireEvent.pointerDown(stack, { button: 0, clientX: 100, pointerId: 1 });
    fireEvent.pointerMove(stack, { clientX: 102, pointerId: 1 });
    fireEvent.pointerUp(stack, { clientX: 102, pointerId: 1 });
    expect(depths()[0]).toBe("0");

    fireEvent.pointerDown(stack, { button: 0, clientX: 100, pointerId: 1 });
    fireEvent.pointerMove(stack, { clientX: 20, pointerId: 1 });
    expect(cards()[0]!.style.transform).toContain("translateX(-80px)");
    fireEvent.pointerUp(stack, { clientX: 20, pointerId: 1 });
    expect(depths()[1]).toBe("0");
    expect(cards()[0]!.style.transform).toBe("");
  });

  it("animates the throw with motion and marks the leaving card", () => {
    stubReducedMotion(false);
    const { animate, animations } = stubAnimate();
    renderStack();
    fireEvent.click(screen.getByRole("button", { name: "Next card" }));
    expect(animate).toHaveBeenCalledTimes(1);
    expect(cards()[0]).toHaveAttribute("data-leaving");
    animations[0]!.onfinish?.();
    expect(cards()[0]).not.toHaveAttribute("data-leaving");
  });

  it("skips the animation with reduced motion", () => {
    stubReducedMotion(true);
    const { animate } = stubAnimate();
    renderStack();
    fireEvent.click(screen.getByRole("button", { name: "Next card" }));
    expect(animate).not.toHaveBeenCalled();
    expect(cards()[0]).not.toHaveAttribute("data-leaving");
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

  it("disables the buttons with a single card", () => {
    render(
      <CardStack>
        <p>Only</p>
      </CardStack>,
    );
    expect(screen.getByRole("button", { name: "Next card" })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Previous card" }),
    ).toBeDisabled();
  });

  it("puts the user class last on the region", () => {
    renderStack({ className: "max-w-xs" });
    expect(screen.getByRole("region").className).toMatch(/ max-w-xs$/);
  });
});

describe("React ExpandableCard", () => {
  const renderCard = (
    props: Partial<Parameters<typeof ExpandableCard>[0]> = {},
  ) =>
    render(
      <ExpandableCard
        title="Desk lamp"
        description="Warm dimmable light"
        media={<span>Picture</span>}
        footer={<button type="button">Add to cart</button>}
        {...props}
      >
        <p>Ships in 2 days</p>
      </ExpandableCard>,
    );
  const dialog = () => document.querySelector("dialog")!;

  it("renders a card button wired to a closed dialog", () => {
    renderCard({ id: "lamp" });
    const card = screen.getByRole("button", { name: /Desk lamp/ });
    expect(card).toHaveAttribute("id", "lamp");
    expect(card).toHaveAttribute("aria-haspopup", "dialog");
    expect(card).toHaveAttribute("aria-controls", "lamp-dialog");
    expect(card).toHaveAttribute("data-state", "closed");
    expect(dialog()).not.toHaveAttribute("open");
    expect(dialog()).toHaveAttribute("aria-labelledby", "lamp-title");
  });

  it("opens the detail view with the extra content", () => {
    renderCard();
    fireEvent.click(screen.getByRole("button", { name: /Desk lamp/ }));
    expect(dialog()).toHaveAttribute("open");
    expect(dialog()).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("button", { name: /Desk lamp/ })).toHaveAttribute(
      "data-state",
      "open",
    );
    expect(
      within(dialog()).getByRole("heading", { name: "Desk lamp" }),
    ).toBeInTheDocument();
    expect(within(dialog()).getByText("Ships in 2 days")).toBeInTheDocument();
    expect(within(dialog()).getByText("Picture")).toBeInTheDocument();
  });

  it("the close button closes it and returns focus to the card", () => {
    renderCard();
    const card = screen.getByRole("button", { name: /Desk lamp/ });
    fireEvent.click(card);
    fireEvent.click(within(dialog()).getByRole("button", { name: "Close" }));
    expect(dialog()).not.toHaveAttribute("open");
    expect(card).toHaveAttribute("data-state", "closed");
    expect(card).toHaveFocus();
  });

  it("Escape and a backdrop click close it", () => {
    renderCard();
    const card = screen.getByRole("button", { name: /Desk lamp/ });
    fireEvent.click(card);
    fireEvent.keyDown(dialog(), { key: "Escape" });
    expect(dialog()).not.toHaveAttribute("open");

    fireEvent.click(card);
    fireEvent.click(within(dialog()).getByText("Ships in 2 days"));
    expect(dialog()).toHaveAttribute("open");
    fireEvent.click(dialog());
    expect(dialog()).not.toHaveAttribute("open");
  });

  it("grows from the card with motion and closes after the shrink", () => {
    stubReducedMotion(false);
    const { animate, animations } = stubAnimate();
    renderCard();
    fireEvent.click(screen.getByRole("button", { name: /Desk lamp/ }));
    expect(animate).toHaveBeenCalledTimes(3);
    fireEvent.click(within(dialog()).getByRole("button", { name: "Close" }));
    expect(dialog()).toHaveAttribute("open");
    animations.at(-1)!.onfinish?.();
    expect(dialog()).not.toHaveAttribute("open");
  });

  it("does not open when the user click handler prevents it", () => {
    renderCard({ onClick: (event) => event.preventDefault() });
    fireEvent.click(screen.getByRole("button", { name: /Desk lamp/ }));
    expect(dialog()).not.toHaveAttribute("open");
  });

  it("closeLabel overrides the default and the class goes last on the card", () => {
    renderCard({ closeLabel: "Tutup", className: "h-full" });
    expect(
      screen.getByRole("button", { name: "Tutup", hidden: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Desk lamp/ }).className).toMatch(
      / h-full$/,
    );
  });
});

describe("React CurrencyInput", () => {
  const field = () => screen.getByRole("textbox");
  const hidden = () =>
    document.querySelector<HTMLInputElement>("input[type=hidden]")!;

  it("formats the starting amount as Rupiah and links the description", () => {
    render(
      <CurrencyInput
        label="Amount"
        hint="Minimum Rp10.000"
        name="amount"
        id="amount"
        defaultValue={12500000}
      />,
    );
    expect(screen.getByLabelText("Amount")).toHaveValue("12.500.000");
    expect(screen.getByText("Rp")).toHaveAttribute("id", "amount-currency");
    expect(field()).toHaveAttribute(
      "aria-describedby",
      "amount-currency amount-hint",
    );
    expect(field()).toHaveAttribute("inputmode", "numeric");
    expect(field()).not.toHaveAttribute("name");
    expect(hidden()).toHaveAttribute("name", "amount");
    expect(hidden()).toHaveValue("12500000");
  });

  it("adds thousand separators while typing and reports the number", () => {
    const onValueChange = vi.fn();
    render(<CurrencyInput name="amount" onValueChange={onValueChange} />);
    fireEvent.change(field(), { target: { value: "1250000" } });
    expect(field()).toHaveValue("1.250.000");
    expect(hidden()).toHaveValue("1250000");
    expect(onValueChange).toHaveBeenLastCalledWith(1250000);

    fireEvent.change(field(), { target: { value: "abc" } });
    expect(field()).toHaveValue("");
    expect(hidden()).toHaveValue("");
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("keeps the caret next to the typed digit", () => {
    render(<CurrencyInput defaultValue={1500000} />);
    const input = field() as HTMLInputElement;
    // "1.500.000" with a 9 typed after the 1.
    input.value = "19.500.000";
    input.setSelectionRange(2, 2);
    fireEvent.change(input);
    expect(input).toHaveValue("19.500.000");
    input.value = "195.500.000";
    input.setSelectionRange(3, 3);
    fireEvent.change(input);
    expect(input).toHaveValue("195.500.000");
    expect(input.selectionStart).toBe(3);
  });

  it("Backspace right after a separator jumps over it", () => {
    render(<CurrencyInput defaultValue={1500000} />);
    const input = field() as HTMLInputElement;
    input.setSelectionRange(2, 2);
    fireEvent.keyDown(input, { key: "Backspace" });
    expect(input.selectionStart).toBe(1);
    input.setSelectionRange(1, 1);
    fireEvent.keyDown(input, { key: "Delete" });
    expect(input.selectionStart).toBe(2);
  });

  it("uses US dollar format with decimals", () => {
    render(
      <CurrencyInput currency="USD" name="budget" defaultValue={1250.5} />,
    );
    expect(field()).toHaveValue("1,250.50");
    expect(screen.getByText("$")).toBeInTheDocument();
    expect(field()).toHaveAttribute("inputmode", "decimal");
    fireEvent.change(field(), { target: { value: "2500.759" } });
    expect(field()).toHaveValue("2,500.75");
    expect(hidden()).toHaveValue("2500.75");
  });

  it("clamps to min and max on blur", () => {
    render(<CurrencyInput name="amount" min={10000} max={50000} />);
    fireEvent.change(field(), { target: { value: "5" } });
    fireEvent.blur(field());
    expect(field()).toHaveValue("10.000");
    expect(hidden()).toHaveValue("10000");
    fireEvent.change(field(), { target: { value: "90000" } });
    fireEvent.blur(field());
    expect(field()).toHaveValue("50.000");
  });

  it("preset chips show short amounts and set the value", () => {
    stubReducedMotion(true);
    render(
      <CurrencyInput
        name="amount"
        presets={[50000, 1500000]}
        presetsLabel="Nominal cepat"
      />,
    );
    const group = screen.getByRole("group", { name: "Nominal cepat" });
    const chip = within(group).getByRole("button", { name: "1,5jt" });
    expect(chip).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(chip);
    expect(field()).toHaveValue("1.500.000");
    expect(hidden()).toHaveValue("1500000");
    expect(chip).toHaveAttribute("aria-pressed", "true");
    expect(within(group).getByRole("button", { name: "50rb" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("counts up to the preset with motion", () => {
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
    render(<CurrencyInput currency="USD" presets={[1000]} />);
    fireEvent.click(screen.getByRole("button", { name: "$1K" }));
    act(() => tick(0));
    expect(field()).toHaveValue("0");
    act(() => tick(200));
    expect(field()).toHaveValue("875");
    act(() => tick(400));
    expect(field()).toHaveValue("1,000");
  });

  it("shows the error, disables chips with the field, and puts the class last", () => {
    render(
      <CurrencyInput
        error="Too much"
        hint="Hidden"
        disabled
        presets={[50000]}
        className="text-right"
      />,
    );
    expect(field()).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Too much")).toBeInTheDocument();
    expect(screen.queryByText("Hidden")).toBeNull();
    expect(screen.getByRole("button", { name: "50rb" })).toBeDisabled();
    expect(field().className).toMatch(/ text-right$/);
  });
});
