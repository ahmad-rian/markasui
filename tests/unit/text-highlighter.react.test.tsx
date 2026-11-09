import { act, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  TextHighlighter,
  type TextHighlighterHandle,
} from "../../components/text-highlighter/TextHighlighter";

/** IntersectionObserver palsu: tes menentukan kapan teks masuk layar. */
function stubObserver() {
  const instances: {
    fire: (hit: boolean) => void;
    disconnect: () => void;
    options?: IntersectionObserverInit;
  }[] = [];
  class Observer {
    disconnect = vi.fn();
    constructor(
      private callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit,
    ) {
      instances.push({
        fire: (hit) =>
          this.callback(
            [{ isIntersecting: hit } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
          ),
        disconnect: this.disconnect,
        options,
      });
    }
    observe() {}
  }
  vi.stubGlobal("IntersectionObserver", Observer);
  return instances;
}

const highlight = () => screen.getByText("Key phrase");

afterEach(() => vi.unstubAllGlobals());

describe("React TextHighlighter", () => {
  it("renders plain text in a span with variant, color, timing, and the user class last", () => {
    stubObserver();
    render(
      <TextHighlighter
        variant="marker"
        color="success"
        duration={300}
        delay={120}
        className="mt-2"
        data-testid="th"
      >
        Key phrase
      </TextHighlighter>,
    );
    const el = highlight();
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveAttribute("data-testid", "th");
    expect(el).toHaveAttribute("data-state", "inactive");
    expect(el).toHaveAttribute("data-direction", "ltr");
    expect(el.className).toContain(
      "[background-image:linear-gradient(transparent_40%",
    );
    expect(el.className).toContain("var(--color-success)");
    expect(el.className.endsWith("mt-2")).toBe(true);
    expect(el.style.transitionDuration).toBe("300ms");
    expect(el.style.transitionDelay).toBe("120ms");
  });

  it("renders the element from as and keeps the direction", () => {
    stubObserver();
    render(
      <TextHighlighter as="strong" direction="btt">
        Key phrase
      </TextHighlighter>,
    );
    expect(highlight().tagName).toBe("STRONG");
    expect(highlight()).toHaveAttribute("data-direction", "btt");
  });

  it("view highlights once when the text scrolls into view", () => {
    const observers = stubObserver();
    render(<TextHighlighter threshold={0.8}>Key phrase</TextHighlighter>);
    expect(observers[0]!.options).toEqual({ threshold: 0.8 });
    act(() => observers[0]!.fire(false));
    expect(highlight()).toHaveAttribute("data-state", "inactive");
    act(() => observers[0]!.fire(true));
    expect(highlight()).toHaveAttribute("data-state", "active");
    expect(observers[0]!.disconnect).toHaveBeenCalled();
  });

  it("view with once false clears again when the text leaves", () => {
    const observers = stubObserver();
    render(<TextHighlighter once={false}>Key phrase</TextHighlighter>);
    act(() => observers[0]!.fire(true));
    expect(highlight()).toHaveAttribute("data-state", "active");
    act(() => observers[0]!.fire(false));
    expect(highlight()).toHaveAttribute("data-state", "inactive");
    expect(observers[0]!.disconnect).not.toHaveBeenCalled();
  });

  it("auto highlights on the frame after mount", () => {
    vi.useFakeTimers({
      toFake: ["requestAnimationFrame", "cancelAnimationFrame"],
    });
    render(<TextHighlighter trigger="auto">Key phrase</TextHighlighter>);
    expect(highlight()).toHaveAttribute("data-state", "inactive");
    act(() => vi.advanceTimersToNextFrame());
    expect(highlight()).toHaveAttribute("data-state", "active");
    vi.useRealTimers();
  });

  it("hover follows hover and keyboard focus of the closest link", () => {
    render(
      <a href="#">
        <TextHighlighter trigger="hover">Key phrase</TextHighlighter>
      </a>,
    );
    const link = screen.getByRole("link", { name: "Key phrase" });
    fireEvent.pointerEnter(link);
    expect(highlight()).toHaveAttribute("data-state", "active");
    fireEvent.pointerLeave(link);
    expect(highlight()).toHaveAttribute("data-state", "inactive");
    fireEvent.focusIn(link);
    expect(highlight()).toHaveAttribute("data-state", "active");
    fireEvent.focusOut(link);
    expect(highlight()).toHaveAttribute("data-state", "inactive");
  });

  it("manual follows active", () => {
    const { rerender } = render(
      <TextHighlighter trigger="manual">Key phrase</TextHighlighter>,
    );
    expect(highlight()).toHaveAttribute("data-state", "inactive");
    rerender(
      <TextHighlighter trigger="manual" active>
        Key phrase
      </TextHighlighter>,
    );
    expect(highlight()).toHaveAttribute("data-state", "active");
  });

  it("exposes animate(direction) and reset() through ref", () => {
    const ref = createRef<TextHighlighterHandle>();
    render(
      <TextHighlighter ref={ref} trigger="manual">
        Key phrase
      </TextHighlighter>,
    );
    act(() => ref.current!.animate("rtl"));
    expect(highlight()).toHaveAttribute("data-state", "active");
    expect(highlight()).toHaveAttribute("data-direction", "rtl");
    act(() => ref.current!.reset());
    expect(highlight()).toHaveAttribute("data-state", "inactive");
    act(() => ref.current!.animate());
    expect(highlight()).toHaveAttribute("data-direction", "rtl");
  });

  it("marks the trigger so CSS shows view and auto highlights at once with reduced motion", () => {
    stubObserver();
    render(<TextHighlighter>Key phrase</TextHighlighter>);
    expect(highlight()).toHaveAttribute("data-trigger", "view");
    expect(highlight().className).toContain(
      "motion-reduce:data-[trigger=view]:[background-size:100%_100%]",
    );
    expect(highlight().className).toContain("motion-reduce:transition-none");
  });
});
