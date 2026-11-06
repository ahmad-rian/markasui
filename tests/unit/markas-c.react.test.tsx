import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ChatMessage } from "../../components/chat-message/ChatMessage";
import { DynamicIsland } from "../../components/dynamic-island/DynamicIsland";
import { PromptInput } from "../../components/prompt-input/PromptInput";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

const stubReducedMotion = (reduce: boolean) =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: reduce })),
  );

describe("React PromptInput", () => {
  const field = () => screen.getByRole("textbox", { name: "Message" });
  const sendButton = () => screen.getByRole("button", { name: "Send" });

  it("renders a labelled field, attach button, and a disabled send button", () => {
    render(<PromptInput />);
    expect(field()).toHaveAttribute("placeholder", "Ask anything");
    expect(field()).toHaveAttribute("rows", "1");
    expect(field()).toHaveStyle({ maxHeight: "200px" });
    expect(
      screen.getByRole("button", { name: "Attach files" }),
    ).toBeInTheDocument();
    expect(sendButton()).toBeDisabled();
    expect(sendButton()).toHaveAttribute("type", "submit");
    expect(sendButton()).toHaveAttribute("data-state", "send");
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("enables send with text and Enter sends text and files, then clears", () => {
    const onSend = vi.fn();
    const { container } = render(<PromptInput onSend={onSend} />);
    const file = new File(["x"], "invoice.pdf", { type: "application/pdf" });
    fireEvent.change(container.querySelector("input[type=file]")!, {
      target: { files: [file] },
    });
    fireEvent.change(field(), { target: { value: "  " } });
    expect(sendButton()).toBeDisabled();
    fireEvent.change(field(), { target: { value: "Draft an invoice" } });
    expect(sendButton()).toBeEnabled();

    fireEvent.keyDown(field(), { key: "Enter" });
    expect(onSend).toHaveBeenCalledWith({
      text: "Draft an invoice",
      files: [file],
    });
    expect(field()).toHaveValue("");
    expect(screen.queryByText("invoice.pdf")).not.toBeInTheDocument();
  });

  it("Shift+Enter and composing Enter do not send", () => {
    const onSend = vi.fn();
    render(<PromptInput defaultValue="Hi" onSend={onSend} />);
    fireEvent.keyDown(field(), { key: "Enter", shiftKey: true });
    fireEvent.keyDown(field(), { key: "Enter", isComposing: true });
    expect(onSend).not.toHaveBeenCalled();
    fireEvent.click(sendButton());
    expect(onSend).toHaveBeenCalledTimes(1);
  });

  it("attached files show as chips that can be removed", () => {
    const { container } = render(<PromptInput accept="image/*" />);
    const input =
      container.querySelector<HTMLInputElement>("input[type=file]")!;
    expect(input).toHaveAttribute("accept", "image/*");
    expect(input).toHaveAttribute("hidden");
    const click = vi.spyOn(input, "click");
    fireEvent.click(screen.getByRole("button", { name: "Attach files" }));
    expect(click).toHaveBeenCalled();

    fireEvent.change(input, {
      target: { files: [new File(["a"], "a.png"), new File(["b"], "b.png")] },
    });
    expect(screen.getByText("a.png")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Remove a.png" }));
    expect(screen.queryByText("a.png")).not.toBeInTheDocument();
    expect(screen.getByText("b.png")).toBeInTheDocument();
    expect(field()).toHaveFocus();
  });

  it("loading turns the send button into a stop button", () => {
    const onStop = vi.fn();
    const onSend = vi.fn();
    render(
      <PromptInput loading defaultValue="Hi" onStop={onStop} onSend={onSend} />,
    );
    const stop = screen.getByRole("button", { name: "Stop" });
    expect(stop).toBeEnabled();
    expect(stop).toHaveAttribute("type", "button");
    expect(stop).toHaveAttribute("data-state", "stop");
    fireEvent.click(stop);
    expect(onStop).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(field(), { key: "Enter" });
    expect(onSend).not.toHaveBeenCalled();
  });

  it("maxLength shows a counter that flags the limit", () => {
    const { container } = render(<PromptInput maxLength={5} />);
    expect(field()).toHaveAttribute("maxlength", "5");
    expect(screen.getByText("0/5")).toHaveAttribute("data-state", "ok");
    fireEvent.change(field(), { target: { value: "Hello" } });
    expect(screen.getByText("5/5")).toHaveAttribute("data-state", "limit");
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("is controlled through value and onValueChange", () => {
    const onValueChange = vi.fn();
    render(<PromptInput value="Fixed" onValueChange={onValueChange} />);
    fireEvent.change(field(), { target: { value: "Fixed!" } });
    expect(onValueChange).toHaveBeenCalledWith("Fixed!");
    expect(field()).toHaveValue("Fixed");
  });

  it("renders the model picker and the actions slot", () => {
    const onModelChange = vi.fn();
    render(
      <PromptInput
        models={["Pro", { value: "mini", label: "Mini" }]}
        model="mini"
        onModelChange={onModelChange}
        attachments={false}
        actions={<button type="button">Search</button>}
      />,
    );
    const picker = screen.getByRole("combobox", { name: "Model" });
    expect(picker).toHaveValue("mini");
    fireEvent.change(picker, { target: { value: "Pro" } });
    expect(onModelChange).toHaveBeenCalledWith("Pro");
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Attach files" }),
    ).not.toBeInTheDocument();
  });

  it("label props override the defaults and the user class comes last", () => {
    const { container } = render(
      <PromptInput
        loading
        className="custom"
        placeholderLabel="Tanya apa saja"
        inputLabel="Pesan"
        stopLabel="Hentikan"
        attachLabel="Lampirkan"
        models={["A"]}
        modelLabel="Pilih model"
      />,
    );
    expect(screen.getByRole("textbox", { name: "Pesan" })).toHaveAttribute(
      "placeholder",
      "Tanya apa saja",
    );
    expect(screen.getByRole("button", { name: "Hentikan" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Lampirkan" })).toBeVisible();
    expect(
      screen.getByRole("combobox", { name: "Pilih model" }),
    ).toBeInTheDocument();
    expect(container.querySelector("form")!.className).toMatch(/ custom$/);
  });

  it("sendLabel and removeLabel can be translated", () => {
    const { container } = render(
      <PromptInput sendLabel="Kirim" removeLabel="Hapus {name}" />,
    );
    expect(screen.getByRole("button", { name: "Kirim" })).toBeDisabled();
    fireEvent.change(container.querySelector("input[type=file]")!, {
      target: { files: [new File(["a"], "a.txt")] },
    });
    expect(
      screen.getByRole("button", { name: "Hapus a.txt" }),
    ).toBeInTheDocument();
  });
});

describe("React ChatMessage", () => {
  it("renders a user bubble with a time and only a copy action", () => {
    render(<ChatMessage from="user" text="Hello" time="10:24" />);
    const article = screen.getByRole("article", { name: "You" });
    expect(article).toHaveAttribute("data-from", "user");
    expect(within(article).getByText("10:24").tagName).toBe("TIME");
    const group = screen.getByRole("group", { name: "Message actions" });
    expect(within(group).getAllByRole("button")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });

  it("renders an assistant message with avatar, name, and all actions", () => {
    const onRegenerate = vi.fn();
    render(
      <ChatMessage
        text="Hi there"
        time="10:25"
        assistantLabel="Markas AI"
        onRegenerate={onRegenerate}
      />,
    );
    const article = screen.getByRole("article", { name: "Markas AI" });
    expect(within(article).getByText("Markas AI")).toBeInTheDocument();
    expect(within(article).getByText("Hi there")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Regenerate" }));
    expect(onRegenerate).toHaveBeenCalledTimes(1);
  });

  it("like and dislike are exclusive toggles that report feedback", () => {
    const onFeedback = vi.fn();
    render(<ChatMessage text="Hi" onFeedback={onFeedback} />);
    const like = screen.getByRole("button", { name: "Good response" });
    const dislike = screen.getByRole("button", { name: "Bad response" });
    expect(like).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(like);
    expect(like).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(dislike);
    expect(like).toHaveAttribute("aria-pressed", "false");
    expect(dislike).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(dislike);
    expect(dislike).toHaveAttribute("aria-pressed", "false");
    expect(onFeedback.mock.calls).toEqual([["like"], ["dislike"], [null]]);
  });

  it("copy writes the text and shows the check for a while", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<ChatMessage text="Rp 12.500.000" />);
    const copy = screen.getByRole("button", { name: "Copy" });
    await act(async () => {
      fireEvent.click(copy);
    });
    expect(writeText).toHaveBeenCalledWith("Rp 12.500.000");
    expect(copy).toHaveAttribute("data-state", "copied");
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
    act(() => vi.advanceTimersByTime(2000));
    expect(copy).toHaveAttribute("data-state", "idle");
  });

  it("stays idle when the clipboard fails", async () => {
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("no")) },
    });
    render(<ChatMessage text="Hi" />);
    const copy = screen.getByRole("button", { name: "Copy" });
    await act(async () => {
      fireEvent.click(copy);
    });
    expect(copy).toHaveAttribute("data-state", "idle");
  });

  it("typing shows announced dots and hides the actions", () => {
    render(<ChatMessage typing text="ignored" />);
    expect(screen.getByRole("status")).toHaveTextContent("Typing");
    expect(screen.queryByText("ignored")).not.toBeInTheDocument();
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });

  it("stream reveals tokens one at a time with a caret", () => {
    vi.useFakeTimers();
    stubReducedMotion(false);
    render(<ChatMessage stream streamSpeed={10} text="One two three" />);
    const full = screen.getByText("One two three");
    const visible = full.nextElementSibling as HTMLElement;
    const tick = (count: number) => {
      for (let i = 0; i < count; i++) act(() => vi.advanceTimersByTime(10));
    };
    expect(full).toHaveClass("sr-only");
    expect(visible).toHaveAttribute("aria-hidden", "true");
    expect(visible.textContent).toBe("");
    expect(visible.nextElementSibling).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
    tick(1);
    expect(visible.textContent).toBe("One");
    tick(3);
    expect(visible.textContent).toBe("One two ");
    tick(5);
    expect(visible.textContent).toBe("One two three");
    expect(visible.nextElementSibling).toBeNull();
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("stream shows the full text at once with reduced motion", () => {
    stubReducedMotion(true);
    render(<ChatMessage stream text="All at once" />);
    expect(screen.getAllByText("All at once")).toHaveLength(2);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("supports the bubble variant, avatar image, and no actions", () => {
    const { container } = render(
      <ChatMessage
        variant="bubble"
        avatar="/bot.png"
        actions={false}
        text="Hi"
      />,
    );
    expect(container.querySelector("img")).toHaveAttribute("src", "/bot.png");
    expect(screen.getByText("Hi").className).toContain("bg-subtle");
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });

  it("label props override the defaults and the user class comes last", () => {
    render(
      <>
        <ChatMessage
          text="Hai"
          className="custom"
          actionsLabel="Aksi pesan"
          copyLabel="Salin"
          likeLabel="Bagus"
          dislikeLabel="Buruk"
          regenerateLabel="Buat ulang"
          assistantLabel="Asisten"
        />
        <ChatMessage from="user" text="Halo" userLabel="Anda" />
        <ChatMessage typing typingLabel="Sedang mengetik" />
      </>,
    );
    const article = screen.getByRole("article", { name: "Asisten" });
    expect(article.className).toMatch(/ custom$/);
    const group = within(article).getByRole("group", { name: "Aksi pesan" });
    for (const name of ["Salin", "Bagus", "Buruk", "Buat ulang"])
      expect(within(group).getByRole("button", { name })).toBeInTheDocument();
    expect(screen.getByRole("article", { name: "Anda" })).toBeInTheDocument();
    expect(screen.getByText("Sedang mengetik").parentElement).toHaveAttribute(
      "role",
      "status",
    );
  });
});

describe("React DynamicIsland", () => {
  const panels = (container: HTMLElement) =>
    Array.from(container.querySelectorAll("[role=region] > div"));

  it("renders a labelled region with one active panel per state", () => {
    const { container } = render(
      <DynamicIsland
        state="compact"
        leading={<span>L</span>}
        trailing={<span>T</span>}
        expanded={<button type="button">End</button>}
      />,
    );
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

  it("follows the state prop and announces it politely", () => {
    const announcements = { expanded: "Timer, 12 minutes left" };
    const { container, rerender } = render(
      <DynamicIsland state="idle" announcements={announcements} />,
    );
    const live = container.querySelector("[aria-live=polite]")!;
    expect(live).toHaveTextContent("");
    rerender(<DynamicIsland state="expanded" announcements={announcements} />);
    expect(screen.getByRole("region")).toHaveAttribute(
      "data-state",
      "expanded",
    );
    expect(panels(container)[2]).toHaveAttribute("data-state", "active");
    expect(live).toHaveTextContent("Timer, 12 minutes left");
  });

  it("defaults to idle, takes islandLabel, and puts the user class last", () => {
    render(<DynamicIsland islandLabel="Aktivitas" className="custom" />);
    const region = screen.getByRole("region", { name: "Aktivitas" });
    expect(region).toHaveAttribute("data-state", "idle");
    expect(region.className).toMatch(/ custom$/);
  });
});
