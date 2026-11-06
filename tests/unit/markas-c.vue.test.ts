import { fireEvent, render, screen, within } from "@testing-library/vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import ChatMessage from "../../components/chat-message/ChatMessage.vue";
import DynamicIsland from "../../components/dynamic-island/DynamicIsland.vue";
import PromptInput from "../../components/prompt-input/PromptInput.vue";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

const stubReducedMotion = (reduce: boolean) =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: reduce })),
  );

describe("Vue PromptInput", () => {
  const field = () => screen.getByRole("textbox", { name: "Message" });
  const sendButton = () => screen.getByRole("button", { name: "Send" });
  const fileInput = (container: Element) =>
    container.querySelector<HTMLInputElement>("input[type=file]")!;
  const pick = async (container: Element, files: File[]) => {
    const input = fileInput(container);
    Object.defineProperty(input, "files", { value: files, configurable: true });
    await fireEvent.change(input);
  };

  it("renders a labelled field, attach button, and a disabled send button", () => {
    render(PromptInput);
    expect(field()).toHaveAttribute("placeholder", "Ask anything");
    expect(field()).toHaveAttribute("rows", "1");
    expect(field()).toHaveStyle({ maxHeight: "200px" });
    expect(screen.getByRole("button", { name: "Attach files" })).toBeVisible();
    expect(sendButton()).toBeDisabled();
    expect(sendButton()).toHaveAttribute("type", "submit");
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("Enter sends text and files through send, then clears", async () => {
    const { container, emitted } = render(PromptInput);
    const file = new File(["x"], "invoice.pdf");
    await pick(container, [file]);
    await fireEvent.update(field(), "  ");
    expect(sendButton()).toBeDisabled();
    await fireEvent.update(field(), "Draft an invoice");
    expect(sendButton()).toBeEnabled();

    await fireEvent.keyDown(field(), { key: "Enter" });
    expect(emitted("send")).toEqual([
      [{ text: "Draft an invoice", files: [file] }],
    ]);
    expect(field()).toHaveValue("");
    expect(screen.queryByText("invoice.pdf")).not.toBeInTheDocument();
    expect(emitted("update:modelValue")!.at(-1)).toEqual([""]);
  });

  it("Shift+Enter and composing Enter do not send", async () => {
    const { emitted } = render(PromptInput, { props: { modelValue: "Hi" } });
    await fireEvent.keyDown(field(), { key: "Enter", shiftKey: true });
    await fireEvent.keyDown(field(), { key: "Enter", isComposing: true });
    expect(emitted("send")).toBeUndefined();
    await fireEvent.click(sendButton());
    expect(emitted("send")).toHaveLength(1);
  });

  it("attached files show as chips that can be removed", async () => {
    const { container } = render(PromptInput, { props: { accept: "image/*" } });
    const input = fileInput(container);
    expect(input).toHaveAttribute("accept", "image/*");
    const click = vi.spyOn(input, "click");
    await fireEvent.click(screen.getByRole("button", { name: "Attach files" }));
    expect(click).toHaveBeenCalled();

    await pick(container, [new File(["a"], "a.png"), new File(["b"], "b.png")]);
    expect(screen.getByText("a.png")).toBeInTheDocument();
    await fireEvent.click(screen.getByRole("button", { name: "Remove a.png" }));
    expect(screen.queryByText("a.png")).not.toBeInTheDocument();
    expect(screen.getByText("b.png")).toBeInTheDocument();
    expect(field()).toHaveFocus();
  });

  it("loading turns the send button into a stop button", async () => {
    const { emitted } = render(PromptInput, {
      props: { loading: true, modelValue: "Hi" },
    });
    const stop = screen.getByRole("button", { name: "Stop" });
    expect(stop).toBeEnabled();
    expect(stop).toHaveAttribute("type", "button");
    expect(stop).toHaveAttribute("data-state", "stop");
    await fireEvent.click(stop);
    expect(emitted("stop")).toHaveLength(1);
    await fireEvent.keyDown(field(), { key: "Enter" });
    expect(emitted("send")).toBeUndefined();
  });

  it("maxLength shows a counter that flags the limit", async () => {
    render(PromptInput, { props: { maxLength: 5 } });
    expect(field()).toHaveAttribute("maxlength", "5");
    expect(screen.getByText("0/5")).toHaveAttribute("data-state", "ok");
    await fireEvent.update(field(), "Hello");
    expect(screen.getByText("5/5")).toHaveAttribute("data-state", "limit");
  });

  it("renders the model picker with v-model:model and the actions slot", async () => {
    const { emitted } = render(PromptInput, {
      props: {
        models: ["Pro", { value: "mini", label: "Mini" }],
        model: "mini",
        attachments: false,
      },
      slots: { actions: '<button type="button">Search</button>' },
    });
    const picker = screen.getByRole("combobox", { name: "Model" });
    expect(picker).toHaveValue("mini");
    await fireEvent.update(picker, "Pro");
    expect(emitted("update:model")).toEqual([["Pro"]]);
    expect(screen.getByRole("button", { name: "Search" })).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Attach files" }),
    ).not.toBeInTheDocument();
  });

  it("label props override the defaults and the user class comes last", async () => {
    const { container } = render(PromptInput, {
      props: {
        placeholderLabel: "Tanya apa saja",
        inputLabel: "Pesan",
        sendLabel: "Kirim",
        attachLabel: "Lampirkan",
        removeLabel: "Hapus {name}",
        models: ["A"],
        modelLabel: "Pilih model",
      },
      attrs: { class: "custom" },
    });
    expect(screen.getByRole("textbox", { name: "Pesan" })).toHaveAttribute(
      "placeholder",
      "Tanya apa saja",
    );
    expect(screen.getByRole("button", { name: "Kirim" })).toBeDisabled();
    expect(screen.getByRole("combobox", { name: "Pilih model" })).toBeVisible();
    await pick(container, [new File(["a"], "a.txt")]);
    expect(screen.getByRole("button", { name: "Hapus a.txt" })).toBeVisible();
    expect(container.querySelector("form")!.className).toMatch(/ custom$/);
  });

  it("stopLabel can be translated", () => {
    render(PromptInput, { props: { loading: true, stopLabel: "Hentikan" } });
    expect(screen.getByRole("button", { name: "Hentikan" })).toBeEnabled();
  });
});

describe("Vue ChatMessage", () => {
  it("renders a user bubble with a time and only a copy action", () => {
    render(ChatMessage, {
      props: { from: "user", text: "Hello", time: "10:24" },
    });
    const article = screen.getByRole("article", { name: "You" });
    expect(article).toHaveAttribute("data-from", "user");
    expect(within(article).getByText("10:24").tagName).toBe("TIME");
    const group = screen.getByRole("group", { name: "Message actions" });
    expect(within(group).getAllByRole("button")).toHaveLength(1);
  });

  it("renders an assistant message with name and emits regenerate", async () => {
    const { emitted } = render(ChatMessage, {
      props: { text: "Hi there", time: "10:25", assistantLabel: "Markas AI" },
    });
    const article = screen.getByRole("article", { name: "Markas AI" });
    expect(within(article).getByText("Hi there")).toBeInTheDocument();
    await fireEvent.click(screen.getByRole("button", { name: "Regenerate" }));
    expect(emitted("regenerate")).toHaveLength(1);
  });

  it("like and dislike are exclusive toggles that emit feedback", async () => {
    const { emitted } = render(ChatMessage, { props: { text: "Hi" } });
    const like = screen.getByRole("button", { name: "Good response" });
    const dislike = screen.getByRole("button", { name: "Bad response" });
    expect(like).toHaveAttribute("aria-pressed", "false");
    await fireEvent.click(like);
    expect(like).toHaveAttribute("aria-pressed", "true");
    await fireEvent.click(dislike);
    expect(like).toHaveAttribute("aria-pressed", "false");
    expect(dislike).toHaveAttribute("aria-pressed", "true");
    await fireEvent.click(dislike);
    expect(emitted("feedback")).toEqual([["like"], ["dislike"], [null]]);
  });

  it("copy writes the text and shows the check for a while", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(ChatMessage, { props: { text: "Rp 12.500.000" } });
    const copy = screen.getByRole("button", { name: "Copy" });
    await fireEvent.click(copy);
    await nextTick();
    expect(writeText).toHaveBeenCalledWith("Rp 12.500.000");
    expect(copy).toHaveAttribute("data-state", "copied");
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
    vi.advanceTimersByTime(2000);
    await nextTick();
    expect(copy).toHaveAttribute("data-state", "idle");
  });

  it("stays idle when the clipboard fails", async () => {
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("no")) },
    });
    render(ChatMessage, { props: { text: "Hi" } });
    const copy = screen.getByRole("button", { name: "Copy" });
    await fireEvent.click(copy);
    await nextTick();
    expect(copy).toHaveAttribute("data-state", "idle");
  });

  it("typing shows announced dots and hides the actions", () => {
    render(ChatMessage, { props: { typing: true, text: "ignored" } });
    expect(screen.getByRole("status")).toHaveTextContent("Typing");
    expect(screen.queryByText("ignored")).not.toBeInTheDocument();
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });

  it("stream reveals tokens one at a time with a caret", async () => {
    vi.useFakeTimers();
    stubReducedMotion(false);
    render(ChatMessage, {
      props: { stream: true, streamSpeed: 10, text: "One two three" },
    });
    await nextTick();
    const full = screen.getByText("One two three");
    const visible = full.nextElementSibling as HTMLElement;
    const tick = async (count: number) => {
      for (let i = 0; i < count; i++) {
        vi.advanceTimersByTime(10);
        await nextTick();
      }
    };
    expect(full).toHaveClass("sr-only");
    expect(visible.textContent).toBe("");
    expect(visible.nextElementSibling).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
    await tick(1);
    expect(visible.textContent).toBe("One");
    await tick(3);
    expect(visible.textContent).toBe("One two ");
    await tick(5);
    expect(visible.textContent).toBe("One two three");
    expect(visible.nextElementSibling).toBeNull();
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("stream shows the full text at once with reduced motion", () => {
    stubReducedMotion(true);
    render(ChatMessage, { props: { stream: true, text: "All at once" } });
    expect(screen.getAllByText("All at once")).toHaveLength(2);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("supports the bubble variant, avatar image, and no actions", () => {
    const { container } = render(ChatMessage, {
      props: {
        variant: "bubble",
        avatar: "/bot.png",
        actions: false,
        text: "Hi",
      },
    });
    expect(container.querySelector("img")).toHaveAttribute("src", "/bot.png");
    expect(screen.getByText("Hi").className).toContain("bg-subtle");
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });

  it("label props override the defaults and the user class comes last", () => {
    render(ChatMessage, {
      props: {
        text: "Hai",
        actionsLabel: "Aksi pesan",
        copyLabel: "Salin",
        likeLabel: "Bagus",
        dislikeLabel: "Buruk",
        regenerateLabel: "Buat ulang",
        assistantLabel: "Asisten",
      },
      attrs: { class: "custom" },
    });
    const article = screen.getByRole("article", { name: "Asisten" });
    expect(article.className).toMatch(/ custom$/);
    const group = within(article).getByRole("group", { name: "Aksi pesan" });
    for (const name of ["Salin", "Bagus", "Buruk", "Buat ulang"])
      expect(within(group).getByRole("button", { name })).toBeInTheDocument();
  });

  it("userLabel and typingLabel can be translated", () => {
    render(ChatMessage, {
      props: { from: "user", text: "Halo", userLabel: "Anda" },
    });
    render(ChatMessage, {
      props: { typing: true, typingLabel: "Sedang mengetik" },
    });
    expect(screen.getByRole("article", { name: "Anda" })).toBeInTheDocument();
    expect(screen.getByText("Sedang mengetik").parentElement).toHaveAttribute(
      "role",
      "status",
    );
  });
});

describe("Vue DynamicIsland", () => {
  const panels = (container: Element) =>
    Array.from(container.querySelectorAll("[role=region] > div"));

  it("renders a labelled region with one active panel per state", () => {
    const { container } = render(DynamicIsland, {
      props: { state: "compact" },
      slots: {
        leading: "<span>L</span>",
        trailing: "<span>T</span>",
        expanded: '<button type="button">End</button>',
      },
    });
    const region = screen.getByRole("region", { name: "Live activity" });
    expect(region).toHaveAttribute("data-state", "compact");
    expect(region.className).toContain("dark");
    expect(panels(container).map((p) => p.getAttribute("data-state"))).toEqual([
      "inactive",
      "active",
      "inactive",
    ]);
    expect(panels(container)[1]).not.toHaveAttribute("inert");
    expect(panels(container)[2]).toHaveAttribute("inert");
    expect(screen.getByText("L")).toBeInTheDocument();
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("follows the state prop and announces it politely", async () => {
    const announcements = { expanded: "Timer, 12 minutes left" };
    const { container, rerender } = render(DynamicIsland, {
      props: { state: "idle", announcements },
    });
    const live = container.querySelector("[aria-live=polite]")!;
    expect(live).toHaveTextContent("");
    await rerender({ state: "expanded", announcements });
    expect(screen.getByRole("region")).toHaveAttribute(
      "data-state",
      "expanded",
    );
    expect(panels(container)[2]).toHaveAttribute("data-state", "active");
    expect(live).toHaveTextContent("Timer, 12 minutes left");
  });

  it("defaults to idle, takes islandLabel, and puts the user class last", () => {
    render(DynamicIsland, {
      props: { islandLabel: "Aktivitas" },
      attrs: { class: "custom" },
    });
    const region = screen.getByRole("region", { name: "Aktivitas" });
    expect(region).toHaveAttribute("data-state", "idle");
    expect(region.className).toMatch(/ custom$/);
  });
});
