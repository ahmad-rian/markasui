import { fireEvent, render, screen } from "@testing-library/vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { h, nextTick, ref } from "vue";
import TextHighlighter from "../../components/text-highlighter/TextHighlighter.vue";

type Handle = {
  animate: (direction?: string) => void;
  reset: () => void;
};

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

const slots = { default: () => "Key phrase" };
const highlight = () => screen.getByText("Key phrase");

afterEach(() => vi.unstubAllGlobals());

describe("Vue TextHighlighter", () => {
  it("renders plain text in a span with variant, color, timing, and the user class last", () => {
    stubObserver();
    render(TextHighlighter, {
      props: { variant: "marker", color: "success", duration: 300, delay: 120 },
      attrs: { class: "mt-2", "data-testid": "th" },
      slots,
    });
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
    render(TextHighlighter, {
      props: { as: "strong", direction: "btt" },
      slots,
    });
    expect(highlight().tagName).toBe("STRONG");
    expect(highlight()).toHaveAttribute("data-direction", "btt");
  });

  it("view highlights once when the text scrolls into view", async () => {
    const observers = stubObserver();
    render(TextHighlighter, { props: { threshold: 0.8 }, slots });
    expect(observers[0]!.options).toEqual({ threshold: 0.8 });
    observers[0]!.fire(false);
    await nextTick();
    expect(highlight()).toHaveAttribute("data-state", "inactive");
    observers[0]!.fire(true);
    await nextTick();
    expect(highlight()).toHaveAttribute("data-state", "active");
    expect(observers[0]!.disconnect).toHaveBeenCalled();
  });

  it("view with once false clears again when the text leaves", async () => {
    const observers = stubObserver();
    render(TextHighlighter, { props: { once: false }, slots });
    observers[0]!.fire(true);
    await nextTick();
    expect(highlight()).toHaveAttribute("data-state", "active");
    observers[0]!.fire(false);
    await nextTick();
    expect(highlight()).toHaveAttribute("data-state", "inactive");
    expect(observers[0]!.disconnect).not.toHaveBeenCalled();
  });

  it("auto highlights on mount", async () => {
    render(TextHighlighter, { props: { trigger: "auto" }, slots });
    await nextTick();
    expect(highlight()).toHaveAttribute("data-state", "active");
  });

  it("hover follows hover and keyboard focus of the closest link", async () => {
    render({
      render: () =>
        h("a", { href: "#" }, [
          h(TextHighlighter, { trigger: "hover" }, slots),
        ]),
    });
    const link = screen.getByRole("link", { name: "Key phrase" });
    await fireEvent.pointerEnter(link);
    expect(highlight()).toHaveAttribute("data-state", "active");
    await fireEvent.pointerLeave(link);
    expect(highlight()).toHaveAttribute("data-state", "inactive");
    await fireEvent.focusIn(link);
    expect(highlight()).toHaveAttribute("data-state", "active");
    await fireEvent.focusOut(link);
    expect(highlight()).toHaveAttribute("data-state", "inactive");
  });

  it("manual follows active", async () => {
    const { rerender } = render(TextHighlighter, {
      props: { trigger: "manual" },
      slots,
    });
    expect(highlight()).toHaveAttribute("data-state", "inactive");
    await rerender({ trigger: "manual", active: true });
    expect(highlight()).toHaveAttribute("data-state", "active");
  });

  it("exposes animate(direction) and reset() through a template ref", async () => {
    const handle = ref<Handle | null>(null);
    render({
      setup: () => () =>
        h(TextHighlighter, { ref: handle, trigger: "manual" }, slots),
    });
    handle.value!.animate("rtl");
    await nextTick();
    expect(highlight()).toHaveAttribute("data-state", "active");
    expect(highlight()).toHaveAttribute("data-direction", "rtl");
    handle.value!.reset();
    await nextTick();
    expect(highlight()).toHaveAttribute("data-state", "inactive");
    handle.value!.animate();
    await nextTick();
    expect(highlight()).toHaveAttribute("data-direction", "rtl");
  });

  it("marks the trigger so CSS shows view and auto highlights at once with reduced motion", () => {
    stubObserver();
    render(TextHighlighter, { props: { trigger: "auto" }, slots });
    expect(highlight()).toHaveAttribute("data-trigger", "auto");
    expect(highlight().className).toContain(
      "motion-reduce:data-[trigger=auto]:[background-size:100%_100%]",
    );
    expect(highlight().className).toContain("motion-reduce:transition-none");
  });
});
