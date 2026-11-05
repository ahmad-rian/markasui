import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Combobox } from "../../components/combobox/Combobox";
import { InputOTP } from "../../components/input-otp/InputOTP";
import { Label } from "../../components/label/Label";

// jsdom belum punya Popover API. Polyfill kecil: tampilkan elemen dan kirim event beforetoggle dan toggle seperti browser.
const shownPopovers = new WeakSet<HTMLElement>();
function setPopover(element: HTMLElement, open: boolean) {
  if (shownPopovers.has(element) === open) return;
  if (open) shownPopovers.add(element);
  else shownPopovers.delete(element);
  element.style.display = open ? "block" : "";
  const states = {
    newState: open ? "open" : "closed",
    oldState: open ? "closed" : "open",
  };
  element.dispatchEvent(Object.assign(new Event("beforetoggle"), states));
  element.dispatchEvent(Object.assign(new Event("toggle"), states));
}

beforeAll(() => {
  const native: Partial<HTMLElement> = HTMLElement.prototype;
  if (typeof native.showPopover === "function") return;
  HTMLElement.prototype.showPopover = function showPopover() {
    setPopover(this, true);
  };
  HTMLElement.prototype.hidePopover = function hidePopover() {
    setPopover(this, false);
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});

const rect = (top: number, left: number, width: number, height: number) =>
  ({
    top,
    left,
    width,
    height,
    bottom: top + height,
    right: left + width,
    x: left,
    y: top,
    toJSON: () => ({}),
  }) as DOMRect;

describe("React Label", () => {
  it("merender label native dengan class dasar, for, dan class user di akhir", () => {
    render(
      <Label htmlFor="email" className="mb-2">
        Email
      </Label>,
    );
    const label = screen.getByText("Email");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("for", "email");
    expect(label.className).toBe("text-sm font-medium text-ink mb-2");
    expect(label.querySelector("span")).toBeNull();
  });

  it("required menampilkan bintang aria-hidden dan teks sr-only", () => {
    render(
      <>
        <Label htmlFor="name" required>
          Full name
        </Label>
        <input id="name" />
      </>,
    );
    const star = screen.getByText("*");
    expect(star).toHaveAttribute("aria-hidden", "true");
    expect(star).toHaveClass("text-danger");
    expect(screen.getByText("required")).toHaveClass("sr-only");
    expect(screen.getByRole("textbox")).toHaveAccessibleName(
      "Full name required",
    );
  });

  it("optional menampilkan teks redup, label bawaan bisa diganti", () => {
    render(
      <>
        <Label optional optionalLabel="Opsional">
          Perusahaan
        </Label>
        <Label required requiredLabel="wajib">
          Nama
        </Label>
      </>,
    );
    expect(screen.getByText("Opsional")).toHaveClass("font-normal text-muted");
    expect(screen.getByText("wajib")).toHaveClass("sr-only");
    expect(screen.queryByText("Optional")).toBeNull();
  });

  it("required menang kalau required dan optional sama-sama aktif", () => {
    render(
      <Label required optional>
        Email
      </Label>,
    );
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.queryByText("Optional")).toBeNull();
  });
});

describe("React InputOTP", () => {
  const boxes = () => screen.getAllByRole("textbox");
  const box = (index: number) =>
    screen.getByRole("textbox", { name: `Digit ${index} of 6` });
  const hidden = (container: HTMLElement) =>
    container.querySelector<HTMLInputElement>('input[type="hidden"]')!;
  const type = (index: number, value: string) =>
    fireEvent.input(box(index), { target: { value } });

  it("merender fieldset, legend, kotak, dan atribut kode sekali pakai", () => {
    const { container } = render(
      <InputOTP label="Verification code" name="code" className="mt-4" />,
    );
    const group = screen.getByRole("group", { name: "Verification code" });
    expect(group.tagName).toBe("FIELDSET");
    expect(group.className.endsWith("mt-4")).toBe(true);
    expect(boxes()).toHaveLength(6);
    expect(box(1)).toHaveAttribute("autocomplete", "one-time-code");
    expect(box(2)).toHaveAttribute("autocomplete", "off");
    expect(box(1)).toHaveAttribute("inputmode", "numeric");
    expect(hidden(container)).toHaveAttribute("name", "code");
    expect(hidden(container)).toHaveValue("");
  });

  it("length dan digitLabel bisa diganti, tanpa name tidak ada input tersembunyi", () => {
    const { container } = render(
      <InputOTP length={4} digitLabel="Digit {index} dari {length}" />,
    );
    expect(boxes()).toHaveLength(4);
    expect(
      screen.getByRole("textbox", { name: "Digit 4 dari 4" }),
    ).toBeInTheDocument();
    expect(container.querySelector("legend")).toBeNull();
    expect(container.querySelector('input[type="hidden"]')).toBeNull();
  });

  it("mengetik digit maju ke kotak berikutnya dan memanggil onComplete saat penuh", () => {
    const onValueChange = vi.fn();
    const onComplete = vi.fn();
    const { container } = render(
      <InputOTP
        name="code"
        onValueChange={onValueChange}
        onComplete={onComplete}
      />,
    );
    type(1, "1");
    expect(box(2)).toHaveFocus();
    expect(onValueChange).toHaveBeenLastCalledWith("1");
    type(2, "a");
    expect(box(2)).toHaveValue("");
    expect(onValueChange).toHaveBeenCalledTimes(1);
    ["2", "3", "4", "5"].forEach((digit, i) => type(i + 2, digit));
    expect(onComplete).not.toHaveBeenCalled();
    type(6, "6");
    expect(onComplete).toHaveBeenCalledWith("123456");
    expect(hidden(container)).toHaveValue("123456");
    expect(box(6)).toHaveFocus();
  });

  it("Backspace di kotak kosong menghapus kotak sebelumnya, Delete dan panah", () => {
    render(<InputOTP defaultValue="123" />);
    act(() => box(4).focus());
    fireEvent.keyDown(box(4), { key: "Backspace" });
    expect(box(3)).toHaveValue("");
    expect(box(3)).toHaveFocus();
    fireEvent.keyDown(box(3), { key: "ArrowLeft" });
    expect(box(2)).toHaveFocus();
    fireEvent.keyDown(box(2), { key: "Backspace" });
    expect(box(2)).toHaveValue("");
    expect(box(2)).toHaveFocus();
    fireEvent.keyDown(box(2), { key: "ArrowRight" });
    expect(box(3)).toHaveFocus();
    fireEvent.keyDown(box(3), { key: "End" });
    expect(box(6)).toHaveFocus();
    fireEvent.keyDown(box(6), { key: "Home" });
    expect(box(1)).toHaveFocus();
    fireEvent.keyDown(box(1), { key: "Delete" });
    expect(box(1)).toHaveValue("");
    fireEvent.keyDown(box(1), { key: "Backspace" });
    expect(box(1)).toHaveFocus();
    fireEvent.keyDown(box(1), { key: "a" });
    expect(box(1)).toHaveFocus();
  });

  it("menempel kode mengisi semua kotak dari awal, sisa pendek mulai dari kotak aktif", () => {
    const onComplete = vi.fn();
    render(<InputOTP onComplete={onComplete} />);
    const paste = (index: number, text: string) =>
      fireEvent.paste(box(index), {
        clipboardData: { getData: () => text },
      });
    paste(3, "12-34-56");
    expect(boxes().map((el) => (el as HTMLInputElement).value)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
    ]);
    expect(onComplete).toHaveBeenCalledWith("123456");
    expect(box(6)).toHaveFocus();
    paste(5, "9");
    expect(box(5)).toHaveValue("9");
    expect(box(6)).toHaveFocus();
    paste(1, "abc");
    expect(box(1)).toHaveValue("1");
  });

  it("autofill banyak digit ke satu kotak dibagi ke kotak berikutnya", () => {
    render(<InputOTP length={4} />);
    fireEvent.input(screen.getByRole("textbox", { name: "Digit 1 of 4" }), {
      target: { value: "9876" },
    });
    expect(
      screen
        .getAllByRole("textbox")
        .map((el) => (el as HTMLInputElement).value),
    ).toEqual(["9", "8", "7", "6"]);
  });

  it("mode terkontrol mengikuti value dari luar dan memilih isi saat fokus", () => {
    function Controlled() {
      const [code, setCode] = useState("12");
      return (
        <>
          <InputOTP value={code} onValueChange={setCode} />
          <button type="button" onClick={() => setCode("654321")}>
            Reset
          </button>
        </>
      );
    }
    render(<Controlled />);
    expect(box(2)).toHaveValue("2");
    type(3, "3");
    expect(box(3)).toHaveValue("3");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(box(1)).toHaveValue("6");
    const select = vi.spyOn(box(2) as HTMLInputElement, "select");
    act(() => box(2).focus());
    expect(select).toHaveBeenCalled();
  });

  it("disabled pada fieldset menonaktifkan semua kotak", () => {
    render(<InputOTP disabled />);
    expect(screen.getByRole("group")).toBeDisabled();
    expect(box(1)).toBeDisabled();
  });
});

describe("React Combobox", () => {
  const options = [
    { value: "au", label: "Australia" },
    { value: "id", label: "Indonesia" },
    { value: "jp", label: "Japan" },
    { value: "my", label: "Malaysia" },
  ];
  const input = () => screen.getByRole("combobox");
  const listbox = () => screen.getByRole("listbox", { hidden: true });
  const option = (name: string) =>
    screen.getByRole("option", { name, hidden: true });
  const optionNames = () =>
    screen
      .queryAllByRole("option", { hidden: true })
      .map((el) => el.textContent);
  const press = (key: string) => fireEvent.keyDown(input(), { key });
  const hidden = (container: HTMLElement) =>
    container.querySelector<HTMLInputElement>('input[type="hidden"]')!;

  it("memasang atribut ARIA combobox, label, dan class user di akhir", () => {
    const { container } = render(
      <Combobox
        id="country"
        label="Country"
        name="country"
        options={options}
        placeholder="Search"
        className="max-w-xs"
      />,
    );
    expect(input()).toHaveAccessibleName("Country");
    expect(input()).toHaveAttribute("id", "country");
    expect(input()).toHaveAttribute("aria-autocomplete", "list");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).toHaveAttribute("aria-controls", "country-listbox");
    expect(input()).toHaveAttribute("autocomplete", "off");
    expect(input()).toHaveAttribute("placeholder", "Search");
    expect(input()).not.toHaveAttribute("name");
    expect(input()).not.toHaveAttribute("aria-activedescendant");
    expect(input().className.endsWith("max-w-xs")).toBe(true);
    expect(listbox()).toHaveAttribute("id", "country-listbox");
    expect(listbox()).toHaveAttribute("aria-labelledby", "country-label");
    expect(container.querySelector("[popover]")).toHaveAttribute(
      "popover",
      "manual",
    );
    expect(hidden(container)).toHaveAttribute("name", "country");
    expect(hidden(container)).toHaveValue("");
  });

  it("defaultValue mengisi teks input dan input tersembunyi, opsi terpilih ditandai", () => {
    const { container } = render(
      <Combobox name="country" defaultValue="jp" options={options} />,
    );
    expect(input()).toHaveValue("Japan");
    expect(hidden(container)).toHaveValue("jp");
    expect(option("Japan")).toHaveAttribute("data-state", "checked");
    expect(option("Japan").querySelector("svg")).not.toBeNull();
    expect(option("Indonesia")).toHaveAttribute("data-state", "unchecked");
  });

  it("panah bawah membuka dan menyorot opsi pertama, panah berputar, Enter memilih", () => {
    const onValueChange = vi.fn();
    render(<Combobox id="c" options={options} onValueChange={onValueChange} />);
    press("ArrowDown");
    expect(input()).toHaveAttribute("aria-expanded", "true");
    expect(input()).toHaveAttribute("data-state", "open");
    expect(input()).toHaveAttribute("aria-activedescendant", "c-option-0");
    expect(option("Australia")).toHaveAttribute("aria-selected", "true");
    press("ArrowUp");
    expect(input()).toHaveAttribute("aria-activedescendant", "c-option-3");
    press("ArrowDown");
    press("ArrowDown");
    expect(input()).toHaveAttribute("aria-activedescendant", "c-option-1");
    press("Enter");
    expect(onValueChange).toHaveBeenCalledWith("id");
    expect(input()).toHaveValue("Indonesia");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).not.toHaveAttribute("aria-activedescendant");
  });

  it("panah atas saat tertutup membuka dan menyorot opsi terakhir", () => {
    render(<Combobox id="c" options={options} />);
    press("ArrowUp");
    expect(input()).toHaveAttribute("aria-activedescendant", "c-option-3");
    press("Enter");
    expect(input()).toHaveValue("Malaysia");
    press("Enter");
    expect(input()).toHaveValue("Malaysia");
  });

  it("mengetik memfilter opsi, mengosongkan value, dan menampilkan emptyLabel", () => {
    const onValueChange = vi.fn();
    const onChange = vi.fn();
    render(
      <Combobox
        options={options}
        defaultValue="au"
        emptyLabel="Tidak ada hasil"
        onValueChange={onValueChange}
        onChange={onChange}
      />,
    );
    fireEvent.change(input(), { target: { value: "ia" } });
    expect(onChange).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledWith("");
    expect(input()).toHaveAttribute("aria-expanded", "true");
    expect(optionNames()).toEqual(["Australia", "Indonesia", "Malaysia"]);
    expect(screen.queryByText("Tidak ada hasil")).toBeNull();
    fireEvent.change(input(), { target: { value: "zz" } });
    expect(optionNames()).toEqual([]);
    expect(screen.getByText("Tidak ada hasil")).toBeInTheDocument();
    press("ArrowDown");
    expect(input()).not.toHaveAttribute("aria-activedescendant");
  });

  it("emptyLabel default No results", () => {
    render(<Combobox options={options} />);
    fireEvent.change(input(), { target: { value: "xyz" } });
    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("Escape pertama menutup, Escape kedua mengosongkan", () => {
    const onValueChange = vi.fn();
    const onKeyDown = vi.fn();
    render(
      <Combobox
        options={options}
        defaultValue="jp"
        onValueChange={onValueChange}
        onKeyDown={onKeyDown}
      />,
    );
    press("ArrowDown");
    press("Escape");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).toHaveValue("Japan");
    expect(onValueChange).not.toHaveBeenCalled();
    press("Escape");
    expect(input()).toHaveValue("");
    expect(onValueChange).toHaveBeenCalledWith("");
    expect(onKeyDown).toHaveBeenCalledTimes(3);
  });

  it("klik membuka, klik opsi memilih, blur menutup", () => {
    const onBlur = vi.fn();
    const onClick = vi.fn();
    const { container } = render(
      <Combobox
        name="country"
        options={options}
        onBlur={onBlur}
        onClick={onClick}
      />,
    );
    fireEvent.click(input());
    expect(onClick).toHaveBeenCalled();
    expect(input()).toHaveAttribute("aria-expanded", "true");
    const mouseDown = fireEvent.mouseDown(option("Japan"));
    expect(mouseDown).toBe(false);
    fireEvent.click(option("Japan"));
    expect(input()).toHaveValue("Japan");
    expect(hidden(container)).toHaveValue("jp");
    fireEvent.click(input());
    expect(optionNames()).toHaveLength(4);
    fireEvent.blur(input());
    expect(onBlur).toHaveBeenCalled();
    expect(input()).toHaveAttribute("aria-expanded", "false");
  });

  it("nilai terkontrol dari luar menyamakan teks input", () => {
    function Controlled() {
      const [country, setCountry] = useState("au");
      return (
        <>
          <Combobox
            options={options}
            value={country}
            onValueChange={setCountry}
          />
          <button type="button" onClick={() => setCountry("my")}>
            Pick
          </button>
        </>
      );
    }
    render(<Controlled />);
    expect(input()).toHaveValue("Australia");
    fireEvent.click(screen.getByRole("button", { name: "Pick" }));
    expect(input()).toHaveValue("Malaysia");
    fireEvent.change(input(), { target: { value: "Mal" } });
    expect(input()).toHaveValue("Mal");
  });

  it("hint dan error terhubung lewat aria-describedby", () => {
    const { rerender } = render(
      <Combobox id="c" options={options} hint="Pick one" />,
    );
    expect(input()).toHaveAttribute("aria-describedby", "c-hint");
    expect(input()).toHaveAccessibleDescription("Pick one");
    rerender(
      <Combobox id="c" options={options} hint="Pick one" error="Required" />,
    );
    expect(input()).toHaveAttribute("aria-describedby", "c-error");
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByText("Pick one")).toBeNull();
  });

  it("daftar ditempatkan di bawah input selebar input, pindah ke atas kalau tidak muat", () => {
    const { container } = render(<Combobox options={options} />);
    const panel = container.querySelector<HTMLElement>("[popover]")!;
    vi.spyOn(input(), "getBoundingClientRect").mockReturnValue(
      rect(100, 20, 300, 40),
    );
    vi.spyOn(panel, "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 300, 200),
    );
    press("ArrowDown");
    expect(panel.style.top).toBe("144px");
    expect(panel.style.left).toBe("20px");
    expect(panel.style.width).toBe("300px");

    vi.spyOn(input(), "getBoundingClientRect").mockReturnValue(
      rect(700, 20, 300, 40),
    );
    fireEvent.scroll(window);
    expect(panel.style.top).toBe(`${700 - 4 - 200}px`);
  });
});
