import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  accepts,
  FileDropzone,
  formatSize,
} from "../../components/file-dropzone/FileDropzone";
import { ImageCompare } from "../../components/image-compare/ImageCompare";
import { TiltCard } from "../../components/tilt-card/TiltCard";

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

describe("file helpers", () => {
  it("formats sizes in B, KB, MB, and GB", () => {
    expect(formatSize(512)).toBe("512 B");
    expect(formatSize(1536)).toBe("2 KB");
    expect(formatSize(2457600)).toBe("2.3 MB");
    expect(formatSize(5242880)).toBe("5 MB");
    expect(formatSize(3 * 1024 ** 3)).toBe("3 GB");
  });

  it("matches accept rules by extension, wildcard, and exact type", () => {
    expect(accepts({ name: "a.PDF", type: "" }, ".pdf")).toBe(true);
    expect(accepts({ name: "a.png", type: "image/png" }, "image/*")).toBe(true);
    expect(accepts({ name: "a.zip", type: "application/zip" }, "image/*")).toBe(
      false,
    );
    expect(
      accepts({ name: "a.zip", type: "application/zip" }, "application/zip"),
    ).toBe(true);
    expect(accepts({ name: "a.bin" })).toBe(true);
  });
});

describe("React FileDropzone", () => {
  const input = () =>
    document.querySelector<HTMLInputElement>("input[type=file]")!;
  const zone = () => document.querySelector("label")!;
  const pick = (...files: File[]) =>
    fireEvent.change(input(), { target: { files } });

  it("wraps a native file input in a labelled drop area", () => {
    render(
      <FileDropzone
        name="docs"
        accept=".pdf"
        multiple
        required
        hint="PDF up to 5 MB"
      />,
    );
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

  it("lists starting files with kind icons, sizes, progress, and errors", () => {
    render(
      <FileDropzone
        files={[
          { name: "guide.pdf", size: 2457600, type: "application/pdf" },
          { name: "hero.jpg", size: 1153434, type: "image/jpeg", progress: 64 },
          { name: "done.zip", size: 2048, progress: 100 },
          {
            name: "clip.mov",
            size: 9e7,
            type: "video/quicktime",
            error: "Too big",
          },
        ]}
        progress={{ "done.zip": 100 }}
      />,
    );
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

  it("adds valid picks and reports them, with errors for type, size, and count", () => {
    const onFilesChange = vi.fn();
    render(
      <FileDropzone
        accept="image/*"
        multiple
        maxSize={1024 * 1024}
        maxFiles={2}
        onFilesChange={onFilesChange}
      />,
    );
    const ok = fileOf("a.png", 2000, "image/png");
    const ok2 = fileOf("b.jpg", 4000, "image/jpeg");
    pick(ok, fileOf("doc.pdf", 10, "application/pdf"));
    pick(fileOf("big.png", 5 * 1024 * 1024, "image/png"), ok2);
    pick(fileOf("c.png", 10, "image/png"));

    expect(onFilesChange).toHaveBeenLastCalledWith([ok, ok2]);
    const alerts = screen.getAllByRole("alert").map((a) => a.textContent);
    expect(alerts).toEqual([
      "File type not allowed",
      "Larger than 1 MB",
      "Only 2 files allowed",
    ]);
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("replaces the file when multiple is off", () => {
    render(<FileDropzone files={[{ name: "old.txt", size: 10 }]} />);
    pick(fileOf("new.txt", 10, "text/plain"));
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("new.txt")).toBeInTheDocument();
  });

  it("highlights while dragging over and adds dropped files", () => {
    const onFilesChange = vi.fn();
    render(<FileDropzone multiple onFilesChange={onFilesChange} />);
    expect(zone()).toHaveAttribute("data-state", "idle");
    fireEvent.dragEnter(zone());
    expect(zone()).toHaveAttribute("data-state", "over");
    fireEvent.dragLeave(zone());
    expect(zone()).toHaveAttribute("data-state", "idle");

    const dropped = fileOf("drop.png", 10, "image/png");
    fireEvent.dragOver(zone());
    fireEvent.drop(zone(), { dataTransfer: { files: [dropped] } });
    expect(zone()).toHaveAttribute("data-state", "idle");
    expect(onFilesChange).toHaveBeenCalledWith([dropped]);
  });

  it("ignores drops and drag highlight when disabled", () => {
    render(<FileDropzone disabled />);
    expect(input()).toBeDisabled();
    fireEvent.dragEnter(zone());
    expect(zone()).toHaveAttribute("data-state", "idle");
    fireEvent.drop(zone(), {
      dataTransfer: { files: [fileOf("a.png", 1, "image/png")] },
    });
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("removes a file with its named button", () => {
    const onFilesChange = vi.fn();
    render(
      <FileDropzone
        multiple
        onFilesChange={onFilesChange}
        files={[{ name: "keep.pdf", size: 1 }]}
      />,
    );
    const picked = fileOf("photo.png", 10, "image/png");
    pick(picked);
    fireEvent.click(screen.getByRole("button", { name: "Remove photo.png" }));
    expect(onFilesChange).toHaveBeenLastCalledWith([]);
    expect(screen.queryByText("photo.png")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Remove keep.pdf" }));
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("puts the posted files back on the native input", () => {
    const files = stubTransfer([]);
    render(<FileDropzone multiple accept=".png" />);
    const setter = vi.fn();
    Object.defineProperty(input(), "files", { set: setter, get: () => [] });
    const good = fileOf("a.png", 1, "image/png");
    fireEvent.drop(zone(), {
      dataTransfer: { files: [good, fileOf("b.gif", 1, "image/gif")] },
    });
    expect(files).toEqual([good]);
    expect(setter).toHaveBeenCalledWith(files);
  });

  it("accepts translated labels and keeps user class last on the root", () => {
    const { container } = render(
      <FileDropzone
        accept=".pdf"
        maxSize={10}
        multiple
        maxFiles={1}
        className="max-w-sm"
        data-testid="drop"
        dropLabel="Letakkan file di sini atau"
        browseLabel="pilih"
        removeLabel="Hapus {name}"
        typeLabel="Jenis file tidak diizinkan"
        tooLargeLabel="Lebih dari {size}"
        tooManyLabel="Maksimal {max} file"
      />,
    );
    expect((container.firstElementChild as HTMLElement).className).toMatch(
      / max-w-sm$/,
    );
    expect(screen.getByTestId("drop")).toBe(container.firstElementChild);
    expect(
      screen.getByLabelText("Letakkan file di sini atau pilih"),
    ).toBeInTheDocument();
    pick(
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

describe("React ImageCompare", () => {
  const renderCompare = (
    props: Partial<Parameters<typeof ImageCompare>[0]> = {},
  ) =>
    render(
      <ImageCompare
        aria-label="Kitchen"
        before={<img alt="Kitchen before" src="data:," />}
        after={<img alt="Kitchen after" src="data:," />}
        {...props}
      />,
    );

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

  it("moves with arrows, Page keys, Home, and End, and reports it", () => {
    const onPositionChange = vi.fn();
    renderCompare({ defaultPosition: 40, step: 10, onPositionChange });
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    fireEvent.keyDown(slider, { key: "ArrowUp" });
    expect(slider).toHaveAttribute("aria-valuenow", "60");
    fireEvent.keyDown(slider, { key: "ArrowDown" });
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(slider).toHaveAttribute("aria-valuenow", "40");
    fireEvent.keyDown(slider, { key: "PageUp" });
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    fireEvent.keyDown(slider, { key: "PageDown" });
    expect(slider).toHaveAttribute("aria-valuenow", "40");
    fireEvent.keyDown(slider, { key: "End" });
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "100");
    fireEvent.keyDown(slider, { key: "Home" });
    expect(slider).toHaveAttribute("aria-valuenow", "0");
    fireEvent.keyDown(slider, { key: "Tab" });
    expect(onPositionChange).toHaveBeenLastCalledWith(0);
  });

  it("flips Up and Down when vertical", () => {
    renderCompare({ orientation: "vertical" });
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-orientation", "vertical");
    fireEvent.keyDown(slider, { key: "ArrowDown" });
    expect(slider).toHaveAttribute("aria-valuenow", "55");
    fireEvent.keyDown(slider, { key: "ArrowUp" });
    fireEvent.keyDown(slider, { key: "ArrowUp" });
    expect(slider).toHaveAttribute("aria-valuenow", "45");
  });

  it("jumps to a pressed spot, follows a drag, and focuses the handle", () => {
    renderCompare();
    const group = screen.getByRole("group");
    const slider = screen.getByRole("slider");
    stubRect(group);
    fireEvent.pointerDown(group, { button: 2, clientX: 20 });
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    fireEvent.pointerMove(group, { clientX: 20 });
    expect(slider).toHaveAttribute("aria-valuenow", "50");

    fireEvent.pointerDown(group, { button: 0, clientX: 50, pointerId: 1 });
    expect(slider).toHaveAttribute("aria-valuenow", "25");
    expect(slider).toHaveFocus();
    fireEvent.pointerMove(group, { clientX: 150, pointerId: 1 });
    expect(group).toHaveAttribute("data-dragging");
    expect(slider).toHaveAttribute("aria-valuenow", "75");
    fireEvent.pointerMove(group, { clientX: 400, pointerId: 1 });
    expect(slider).toHaveAttribute("aria-valuenow", "100");
    fireEvent.pointerUp(group, { pointerId: 1 });
    expect(group).not.toHaveAttribute("data-dragging");
  });

  it("reads the vertical position from clientY", () => {
    renderCompare({ orientation: "vertical" });
    const group = screen.getByRole("group");
    stubRect(group);
    fireEvent.pointerDown(group, { button: 0, clientY: 80 });
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "80");
  });

  it("accepts translated labels and keeps user class last", () => {
    renderCompare({
      beforeLabel: "Sebelum",
      afterLabel: "Sesudah",
      sliderLabel: "Posisi perbandingan",
      className: "aspect-video",
    });
    expect(screen.getByText("Sebelum")).toBeInTheDocument();
    expect(screen.getByText("Sesudah")).toBeInTheDocument();
    expect(
      screen.getByRole("slider", { name: "Posisi perbandingan" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("group").className).toMatch(/ aspect-video$/);
  });
});

describe("React TiltCard", () => {
  const renderCard = (props: Partial<Parameters<typeof TiltCard>[0]> = {}) =>
    render(
      <TiltCard data-testid="card" {...props}>
        <span data-depth="10">Chip</span>
        <span data-depth="nope">Flat</span>
      </TiltCard>,
    );

  it("tilts toward the pointer against the flat box, then resets once it leaves", () => {
    stubReducedMotion(false);
    const onPointerEnter = vi.fn();
    renderCard({ maxAngle: 10, onPointerEnter });
    const card = screen.getByTestId("card");
    stubRect(card, 200, 100);

    fireEvent.pointerEnter(card, { clientX: 100, clientY: 50 });
    expect(onPointerEnter).toHaveBeenCalledOnce();
    expect(card).toHaveAttribute("data-state", "active");
    expect(card.style.getPropertyValue("--tilt-x")).toBe("0deg");

    fireEvent.pointerMove(document, { clientX: 200, clientY: 0 });
    expect(card.style.getPropertyValue("--tilt-x")).toBe("10deg");
    expect(card.style.getPropertyValue("--tilt-y")).toBe("10deg");
    expect(card.style.getPropertyValue("--glare-x")).toBe("100%");
    expect(card.style.getPropertyValue("--glare-y")).toBe("0%");
    expect(screen.getByText("Chip").style.translate).toBe("10px -10px");
    expect(screen.getByText("Flat").style.translate).toBe("0px 0px");

    // The tilted edge moving away fires pointerleave; the flat box still holds the pointer.
    fireEvent.pointerLeave(card, { clientX: 199, clientY: 1 });
    fireEvent.pointerEnter(card, { clientX: 199, clientY: 1 });
    expect(card).toHaveAttribute("data-state", "active");

    fireEvent.pointerMove(document, { clientX: 260, clientY: 40 });
    expect(card).not.toHaveAttribute("data-state");
    expect(card.style.getPropertyValue("--tilt-x")).toBe("");
    expect(screen.getByText("Chip").style.translate).toBe("");
    fireEvent.pointerMove(document, { clientX: 100, clientY: 50 });
    expect(card).not.toHaveAttribute("data-state");
  });

  it("stops following the pointer on unmount", () => {
    stubReducedMotion(false);
    const remove = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderCard();
    stubRect(screen.getByTestId("card"));
    fireEvent.pointerEnter(screen.getByTestId("card"), {
      clientX: 5,
      clientY: 5,
    });
    unmount();
    expect(remove).toHaveBeenCalledWith("pointermove", expect.any(Function));
  });

  it("stays flat with reduced motion", () => {
    stubReducedMotion(true);
    renderCard();
    const card = screen.getByTestId("card");
    fireEvent.pointerEnter(card, { clientX: 10, clientY: 10 });
    fireEvent.pointerMove(document, { clientX: 10, clientY: 10 });
    expect(card).not.toHaveAttribute("data-state");
    expect(card.style.getPropertyValue("--tilt-x")).toBe("");
  });

  it("renders an aria-hidden glare unless turned off, and keeps user class last", () => {
    const { container, rerender } = renderCard({ className: "w-80" });
    const card = screen.getByTestId("card");
    expect(card.className).toMatch(/ w-80$/);
    expect(container.querySelector("[aria-hidden=true]")).toBeInTheDocument();
    rerender(
      <TiltCard data-testid="card" glare={false}>
        Plain
      </TiltCard>,
    );
    expect(container.querySelector("[aria-hidden=true]")).toBeNull();
  });
});
