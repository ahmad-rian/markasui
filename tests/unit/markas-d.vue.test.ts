import { fireEvent, render, screen, within } from "@testing-library/vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import FileDropzone from "../../components/file-dropzone/FileDropzone.vue";
import ImageCompare from "../../components/image-compare/ImageCompare.vue";
import TiltCard from "../../components/tilt-card/TiltCard.vue";

afterEach(() => vi.unstubAllGlobals());

/** jsdom has no DataTransfer; this one records what the component puts back on the input. */
const stubTransfer = (posted: File[] | null = null) => {
  const added: File[] = [];
  vi.stubGlobal(
    "DataTransfer",
    class {
      items = { add: (file: File) => added.push(file) };
      files = posted && added;
    },
  );
  return added;
};
beforeEach(() => {
  stubTransfer();
});

const stubReducedMotion = (reduce: boolean) =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: reduce })),
  );

/** Give an element a fixed box so pointer math is predictable. */
const stubRect = (element: Element, width = 200, height = 100) =>
  vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
    left: 0,
    top: 0,
    width,
    height,
    right: width,
    bottom: height,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });

const fileOf = (name: string, size: number, type: string) => {
  const file = new File(["x"], name, { type });
  Object.defineProperty(file, "size", { value: size });
  return file;
};

describe("Vue FileDropzone", () => {
  const input = () =>
    document.querySelector<HTMLInputElement>("input[type=file]")!;
  const zone = () => document.querySelector("label")!;
  const pick = (...files: File[]) => {
    Object.defineProperty(input(), "files", {
      value: files,
      configurable: true,
      writable: true,
    });
    return fireEvent.change(input());
  };

  it("wraps a native file input in a labelled drop area", () => {
    render(FileDropzone, {
      props: {
        name: "docs",
        accept: ".pdf",
        multiple: true,
        required: true,
        hint: "PDF up to 5 MB",
      },
    });
    const field = screen.getByLabelText(/Drop files here or browse/);
    expect(field).toBe(input());
    expect(field).toHaveAttribute("name", "docs");
    expect(field).toHaveAttribute("accept", ".pdf");
    expect(field).toHaveAttribute("multiple");
    expect(field).toBeRequired();
    expect(field).toHaveClass("sr-only");
    expect(field.id).not.toBe("");
    expect(screen.getByText("PDF up to 5 MB")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("lists starting files with sizes, progress, and errors", () => {
    render(FileDropzone, {
      props: {
        files: [
          { name: "guide.pdf", size: 2457600, type: "application/pdf" },
          { name: "hero.jpg", size: 1153434, type: "image/jpeg", progress: 10 },
          { name: "song.mp3", size: 2048, type: "audio/mpeg", progress: 30 },
          {
            name: "clip.mov",
            size: 9e7,
            type: "video/quicktime",
            error: "Too big",
          },
        ],
        progress: { "hero.jpg": 64, "song.mp3": 100 },
      },
    });
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(4);
    expect(items[0]).toHaveTextContent("guide.pdf2.3 MB");
    expect(within(items[0]!).queryByRole("progressbar")).toBeNull();
    expect(items[1]).toHaveTextContent("hero.jpg1.1 MB");
    const bar = within(items[1]!).getByRole("progressbar", {
      name: "hero.jpg",
    });
    expect(bar).toHaveAttribute("aria-valuenow", "64");
    expect(bar.firstElementChild!.className).toContain("bg-primary");
    expect(bar.firstElementChild).toHaveStyle({ width: "64%" });
    expect(
      within(items[2]!).getByRole("progressbar").firstElementChild!.className,
    ).toContain("bg-success");
    expect(items[3]).toHaveAttribute("data-state", "error");
    expect(within(items[3]!).getByRole("alert")).toHaveTextContent("Too big");
  });

  it("adds valid picks and emits them, with errors for type, size, and count", async () => {
    const { emitted } = render(FileDropzone, {
      props: {
        accept: "image/*",
        multiple: true,
        maxSize: 1024 * 1024,
        maxFiles: 2,
      },
    });
    const ok = fileOf("a.png", 2000, "image/png");
    const ok2 = fileOf("b.jpg", 4000, "image/jpeg");
    await pick(ok, fileOf("doc.pdf", 10, "application/pdf"));
    await pick(fileOf("big.png", 5 * 1024 * 1024, "image/png"), ok2);
    await pick(fileOf("c.png", 10, "image/png"));

    expect(emitted<File[][]>().change!.at(-1)).toEqual([[ok, ok2]]);
    expect(screen.getAllByRole("alert").map((a) => a.textContent)).toEqual([
      "File type not allowed",
      "Larger than 1 MB",
      "Only 2 files allowed",
    ]);
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("replaces the file when multiple is off", async () => {
    render(FileDropzone, { props: { files: [{ name: "old.txt", size: 10 }] } });
    await pick(fileOf("new.txt", 10, "text/plain"));
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("new.txt")).toBeInTheDocument();
  });

  it("highlights while dragging over and adds dropped files", async () => {
    const { emitted } = render(FileDropzone, { props: { multiple: true } });
    expect(zone()).toHaveAttribute("data-state", "idle");
    await fireEvent.dragEnter(zone());
    expect(zone()).toHaveAttribute("data-state", "over");
    await fireEvent.dragLeave(zone());
    expect(zone()).toHaveAttribute("data-state", "idle");

    const dropped = fileOf("drop.png", 10, "image/png");
    await fireEvent.dragOver(zone());
    await fireEvent.drop(zone(), { dataTransfer: { files: [dropped] } });
    expect(zone()).toHaveAttribute("data-state", "idle");
    expect(emitted<File[][]>().change).toEqual([[[dropped]]]);
  });

  it("ignores drops and drag highlight when disabled", async () => {
    render(FileDropzone, { props: { disabled: true } });
    expect(input()).toBeDisabled();
    await fireEvent.dragEnter(zone());
    expect(zone()).toHaveAttribute("data-state", "idle");
    await fireEvent.drop(zone(), {
      dataTransfer: { files: [fileOf("a.png", 1, "image/png")] },
    });
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("removes a file with its named button", async () => {
    const { emitted } = render(FileDropzone, {
      props: { multiple: true, files: [{ name: "keep.pdf", size: 1 }] },
    });
    await pick(fileOf("photo.png", 10, "image/png"));
    await fireEvent.click(
      screen.getByRole("button", { name: "Remove photo.png" }),
    );
    expect(emitted<File[][]>().change!.at(-1)).toEqual([[]]);
    expect(screen.queryByText("photo.png")).not.toBeInTheDocument();
    await fireEvent.click(
      screen.getByRole("button", { name: "Remove keep.pdf" }),
    );
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("puts the posted files back on the native input", async () => {
    const files = stubTransfer([]);
    render(FileDropzone, { props: { multiple: true, accept: ".png" } });
    const setter = vi.fn();
    Object.defineProperty(input(), "files", { set: setter, get: () => [] });
    const good = fileOf("a.png", 1, "image/png");
    await fireEvent.drop(zone(), {
      dataTransfer: { files: [good, fileOf("b.gif", 1, "image/gif")] },
    });
    expect(files).toEqual([good]);
    expect(setter).toHaveBeenCalledWith(files);
  });

  it("accepts translated labels and keeps user class last on the root", async () => {
    const { container } = render(FileDropzone, {
      props: {
        accept: ".pdf",
        maxSize: 10,
        multiple: true,
        maxFiles: 1,
        dropLabel: "Letakkan file di sini atau",
        browseLabel: "pilih",
        removeLabel: "Hapus {name}",
        typeLabel: "Jenis file tidak diizinkan",
        tooLargeLabel: "Lebih dari {size}",
        tooManyLabel: "Maksimal {max} file",
      },
      attrs: { class: "max-w-sm", "data-testid": "drop" },
    });
    const rootEl = container.firstElementChild as HTMLElement;
    expect(rootEl.className).toMatch(/ max-w-sm$/);
    expect(screen.getByTestId("drop")).toBe(rootEl);
    expect(
      screen.getByLabelText("Letakkan file di sini atau pilih"),
    ).toBeInTheDocument();
    await pick(
      fileOf("a.png", 1, "image/png"),
      fileOf("b.pdf", 99, "application/pdf"),
      fileOf("c.pdf", 1, "application/pdf"),
      fileOf("d.pdf", 1, "application/pdf"),
    );
    expect(screen.getAllByRole("alert").map((a) => a.textContent)).toEqual([
      "Jenis file tidak diizinkan",
      "Lebih dari 10 B",
      "Maksimal 1 file",
    ]);
    expect(
      screen.getByRole("button", { name: "Hapus c.pdf" }),
    ).toBeInTheDocument();
  });
});

describe("Vue ImageCompare", () => {
  const renderCompare = (
    props: Record<string, unknown> = {},
    attrs: Record<string, unknown> = {},
  ) =>
    render(ImageCompare, {
      props,
      attrs: { "aria-label": "Kitchen", ...attrs },
      slots: {
        before: '<img alt="Kitchen before" src="data:," />',
        after: '<img alt="Kitchen after" src="data:," />',
      },
    });

  it("renders both sides, labels, and a slider at the start position", () => {
    renderCompare();
    const group = screen.getByRole("group", { name: "Kitchen" });
    expect(group).toHaveAttribute("data-orientation", "horizontal");
    expect(group.style.getPropertyValue("--position")).toBe("50%");
    expect(screen.getByAltText("Kitchen before")).toBeInTheDocument();
    expect(screen.getByAltText("Kitchen after")).toBeInTheDocument();
    expect(screen.getByText("Before")).toBeInTheDocument();
    expect(screen.getByText("After")).toBeInTheDocument();
    const slider = screen.getByRole("slider", { name: "Comparison position" });
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    expect(slider).toHaveAttribute("aria-valuetext", "50%");
    expect(slider).toHaveAttribute("aria-orientation", "horizontal");
    expect(slider).toHaveAttribute("tabindex", "0");
  });

  it("moves with arrows, Page keys, Home, and End, and updates v-model", async () => {
    const { emitted } = renderCompare({ position: 40, step: 10 });
    const slider = screen.getByRole("slider");
    await fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    await fireEvent.keyDown(slider, { key: "ArrowUp" });
    expect(slider).toHaveAttribute("aria-valuenow", "60");
    await fireEvent.keyDown(slider, { key: "ArrowDown" });
    await fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(slider).toHaveAttribute("aria-valuenow", "40");
    await fireEvent.keyDown(slider, { key: "PageUp" });
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    await fireEvent.keyDown(slider, { key: "PageDown" });
    expect(slider).toHaveAttribute("aria-valuenow", "40");
    await fireEvent.keyDown(slider, { key: "End" });
    await fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "100");
    await fireEvent.keyDown(slider, { key: "Home" });
    expect(slider).toHaveAttribute("aria-valuenow", "0");
    await fireEvent.keyDown(slider, { key: "Tab" });
    expect(emitted<number[]>()["update:position"]!.at(-1)).toEqual([0]);
  });

  it("flips Up and Down when vertical", async () => {
    renderCompare({ orientation: "vertical" });
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-orientation", "vertical");
    await fireEvent.keyDown(slider, { key: "ArrowDown" });
    expect(slider).toHaveAttribute("aria-valuenow", "55");
    await fireEvent.keyDown(slider, { key: "ArrowUp" });
    await fireEvent.keyDown(slider, { key: "ArrowUp" });
    expect(slider).toHaveAttribute("aria-valuenow", "45");
  });

  it("jumps to a pressed spot, follows a drag, and focuses the handle", async () => {
    renderCompare();
    const group = screen.getByRole("group");
    const slider = screen.getByRole("slider");
    stubRect(group);
    await fireEvent.pointerDown(group, { button: 2, clientX: 20 });
    await fireEvent.pointerMove(group, { clientX: 20 });
    expect(slider).toHaveAttribute("aria-valuenow", "50");

    await fireEvent.pointerDown(group, { button: 0, clientX: 50 });
    expect(slider).toHaveAttribute("aria-valuenow", "25");
    expect(slider).toHaveFocus();
    await fireEvent.pointerMove(group, { clientX: 150 });
    expect(group).toHaveAttribute("data-dragging");
    expect(slider).toHaveAttribute("aria-valuenow", "75");
    await fireEvent.pointerMove(group, { clientX: -40 });
    expect(slider).toHaveAttribute("aria-valuenow", "0");
    await fireEvent.pointerUp(group);
    expect(group).not.toHaveAttribute("data-dragging");
  });

  it("reads the vertical position from clientY", async () => {
    renderCompare({ orientation: "vertical" });
    const group = screen.getByRole("group");
    stubRect(group);
    await fireEvent.pointerDown(group, { button: 0, clientY: 80 });
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "80");
  });

  it("accepts translated labels and keeps user class last", () => {
    renderCompare(
      {
        beforeLabel: "Sebelum",
        afterLabel: "Sesudah",
        sliderLabel: "Posisi perbandingan",
      },
      { class: "aspect-video" },
    );
    expect(screen.getByText("Sebelum")).toBeInTheDocument();
    expect(screen.getByText("Sesudah")).toBeInTheDocument();
    expect(
      screen.getByRole("slider", { name: "Posisi perbandingan" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("group").className).toMatch(/ aspect-video$/);
  });
});

describe("Vue TiltCard", () => {
  const renderCard = (
    props: Record<string, unknown> = {},
    attrs: Record<string, unknown> = {},
  ) =>
    render(TiltCard, {
      props,
      attrs: { "data-testid": "card", ...attrs },
      slots: {
        default:
          '<span data-depth="10">Chip</span><span data-depth="nope">Flat</span>',
      },
    });

  it("tilts toward the pointer against the flat box, then resets once it leaves", async () => {
    stubReducedMotion(false);
    renderCard({ maxAngle: 10 });
    const card = screen.getByTestId("card");
    stubRect(card, 200, 100);

    await fireEvent.pointerEnter(card, { clientX: 100, clientY: 50 });
    expect(card).toHaveAttribute("data-state", "active");
    expect(card.style.getPropertyValue("--tilt-x")).toBe("0deg");

    await fireEvent.pointerMove(document, { clientX: 200, clientY: 0 });
    expect(card.style.getPropertyValue("--tilt-x")).toBe("10deg");
    expect(card.style.getPropertyValue("--tilt-y")).toBe("10deg");
    expect(card.style.getPropertyValue("--glare-x")).toBe("100%");
    expect(card.style.getPropertyValue("--glare-y")).toBe("0%");
    expect(screen.getByText("Chip").style.translate).toBe("10px -10px");
    expect(screen.getByText("Flat").style.translate).toBe("0px 0px");

    // The tilted edge moving away fires pointerleave; the flat box still holds the pointer.
    await fireEvent.pointerLeave(card, { clientX: 199, clientY: 1 });
    await fireEvent.pointerEnter(card, { clientX: 199, clientY: 1 });
    expect(card).toHaveAttribute("data-state", "active");

    await fireEvent.pointerMove(document, { clientX: 260, clientY: 40 });
    expect(card).not.toHaveAttribute("data-state");
    expect(card.style.getPropertyValue("--tilt-x")).toBe("");
    expect(screen.getByText("Chip").style.translate).toBe("");
  });

  it("stops following the pointer on unmount", async () => {
    stubReducedMotion(false);
    const remove = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderCard();
    stubRect(screen.getByTestId("card"));
    await fireEvent.pointerEnter(screen.getByTestId("card"), {
      clientX: 5,
      clientY: 5,
    });
    unmount();
    expect(remove).toHaveBeenCalledWith("pointermove", expect.any(Function));
  });

  it("stays flat with reduced motion", async () => {
    stubReducedMotion(true);
    renderCard();
    const card = screen.getByTestId("card");
    await fireEvent.pointerEnter(card, { clientX: 10, clientY: 10 });
    await fireEvent.pointerMove(document, { clientX: 10, clientY: 10 });
    expect(card).not.toHaveAttribute("data-state");
    expect(card.style.getPropertyValue("--tilt-x")).toBe("");
  });

  it("renders an aria-hidden glare unless turned off, and keeps user class last", async () => {
    const { container, rerender } = renderCard({}, { class: "w-80" });
    expect(screen.getByTestId("card").className).toMatch(/ w-80$/);
    expect(container.querySelector("[aria-hidden=true]")).toBeInTheDocument();
    await rerender({ glare: false });
    expect(container.querySelector("[aria-hidden=true]")).toBeNull();
  });
});
