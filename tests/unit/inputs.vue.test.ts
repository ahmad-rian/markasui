import { fireEvent, render, screen } from "@testing-library/vue";
import { h, nextTick, ref } from "vue";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import Combobox from "../../components/combobox/Combobox.vue";
import InputOTP from "../../components/input-otp/InputOTP.vue";
import Label from "../../components/label/Label.vue";

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

describe("Vue Label", () => {
  it("merender label native dengan class dasar, for, dan class user di akhir", () => {
    render(Label, {
      attrs: { for: "email", class: "mb-2" },
      slots: { default: "Email" },
    });
    const label = screen.getByText("Email");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("for", "email");
    expect(label.className).toBe("text-sm font-medium text-ink mb-2");
    expect(label.querySelector("span")).toBeNull();
  });

  it("required menampilkan bintang aria-hidden dan teks sr-only", () => {
    render({
      components: { Label },
      template:
        '<Label for="name" required>Full name</Label><input id="name" />',
    });
    const star = screen.getByText("*");
    expect(star).toHaveAttribute("aria-hidden", "true");
    expect(star).toHaveClass("text-danger");
    expect(screen.getByText("required")).toHaveClass("sr-only");
    expect(screen.getByRole("textbox")).toHaveAccessibleName(
      "Full name required",
    );
  });

  it("optional menampilkan teks redup, label bawaan bisa diganti", () => {
    render({
      components: { Label },
      template:
        '<Label optional optional-label="Opsional">Perusahaan</Label><Label required required-label="wajib">Nama</Label>',
    });
    expect(screen.getByText("Opsional")).toHaveClass("font-normal text-muted");
    expect(screen.getByText("wajib")).toHaveClass("sr-only");
    expect(screen.queryByText("Optional")).toBeNull();
  });

  it("required menang kalau required dan optional sama-sama aktif", () => {
    render(Label, {
      props: { required: true, optional: true },
      slots: { default: "Email" },
    });
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.queryByText("Optional")).toBeNull();
  });
});

describe("Vue InputOTP", () => {
  const boxes = () => screen.getAllByRole("textbox");
  const box = (index: number) =>
    screen.getByRole("textbox", { name: `Digit ${index} of 6` });
  const hidden = (container: Element) =>
    container.querySelector<HTMLInputElement>('input[type="hidden"]')!;
  const type = async (index: number, value: string) => {
    const target = box(index) as HTMLInputElement;
    target.value = value;
    await fireEvent.input(target);
  };

  it("merender fieldset, legend, kotak, dan atribut kode sekali pakai", () => {
    const { container } = render(InputOTP, {
      props: { label: "Verification code", name: "code" },
      attrs: { class: "mt-4" },
    });
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
    const { container } = render(InputOTP, {
      props: { length: 4, digitLabel: "Digit {index} dari {length}" },
    });
    expect(boxes()).toHaveLength(4);
    expect(
      screen.getByRole("textbox", { name: "Digit 4 dari 4" }),
    ).toBeInTheDocument();
    expect(container.querySelector("legend")).toBeNull();
    expect(container.querySelector('input[type="hidden"]')).toBeNull();
  });

  it("mengetik digit maju ke kotak berikutnya, v-model dan complete", async () => {
    const { container, emitted } = render(InputOTP, {
      props: { name: "code" },
    });
    await type(1, "1");
    expect(box(2)).toHaveFocus();
    expect(emitted()["update:modelValue"]).toEqual([["1"]]);
    await type(2, "a");
    expect(box(2)).toHaveValue("");
    expect(emitted()["update:modelValue"]).toHaveLength(1);
    for (const [i, digit] of ["2", "3", "4", "5"].entries())
      await type(i + 2, digit);
    expect(emitted().complete).toBeUndefined();
    await type(6, "6");
    expect(emitted().complete).toEqual([["123456"]]);
    expect(hidden(container)).toHaveValue("123456");
    expect(box(6)).toHaveFocus();
  });

  it("Backspace di kotak kosong menghapus kotak sebelumnya, Delete dan panah", async () => {
    render(InputOTP, { props: { modelValue: "123" } });
    box(4).focus();
    const press = (index: number, key: string) =>
      fireEvent.keyDown(box(index), { key });
    await press(4, "Backspace");
    expect(box(3)).toHaveValue("");
    expect(box(3)).toHaveFocus();
    await press(3, "ArrowLeft");
    expect(box(2)).toHaveFocus();
    await press(2, "Backspace");
    expect(box(2)).toHaveValue("");
    expect(box(2)).toHaveFocus();
    await press(2, "ArrowRight");
    expect(box(3)).toHaveFocus();
    await press(3, "End");
    expect(box(6)).toHaveFocus();
    await press(6, "Home");
    expect(box(1)).toHaveFocus();
    await press(1, "Delete");
    expect(box(1)).toHaveValue("");
    await press(1, "Backspace");
    expect(box(1)).toHaveFocus();
    await press(1, "a");
    expect(box(1)).toHaveFocus();
  });

  it("menempel kode mengisi semua kotak dari awal, sisa pendek mulai dari kotak aktif", async () => {
    const { emitted } = render(InputOTP);
    const paste = (index: number, text: string) =>
      fireEvent.paste(box(index), {
        clipboardData: { getData: () => text },
      });
    await paste(3, "12-34-56");
    expect(boxes().map((el) => (el as HTMLInputElement).value)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
    ]);
    expect(emitted().complete).toEqual([["123456"]]);
    expect(box(6)).toHaveFocus();
    await paste(5, "9");
    expect(box(5)).toHaveValue("9");
    expect(box(6)).toHaveFocus();
    await paste(1, "abc");
    expect(box(1)).toHaveValue("1");
  });

  it("autofill banyak digit ke satu kotak dibagi ke kotak berikutnya", async () => {
    render(InputOTP, { props: { length: 4 } });
    const first = screen.getByRole("textbox", {
      name: "Digit 1 of 4",
    }) as HTMLInputElement;
    first.value = "9876";
    await fireEvent.input(first);
    expect(
      screen
        .getAllByRole("textbox")
        .map((el) => (el as HTMLInputElement).value),
    ).toEqual(["9", "8", "7", "6"]);
  });

  it("v-model dari luar memperbarui kotak dan isi dipilih saat fokus", async () => {
    const code = ref("12");
    render({
      setup: () => () =>
        h(InputOTP, {
          modelValue: code.value,
          "onUpdate:modelValue": (value: string) => (code.value = value),
        }),
    });
    expect(box(2)).toHaveValue("2");
    await type(3, "3");
    expect(code.value).toBe("123");
    code.value = "654321";
    await nextTick();
    expect(box(1)).toHaveValue("6");
    const select = vi.spyOn(box(2) as HTMLInputElement, "select");
    await fireEvent.focus(box(2));
    expect(select).toHaveBeenCalled();
  });

  it("disabled pada fieldset menonaktifkan semua kotak", () => {
    render(InputOTP, { attrs: { disabled: true } });
    expect(screen.getByRole("group")).toBeDisabled();
    expect(box(1)).toBeDisabled();
  });
});

describe("Vue Combobox", () => {
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
      .map((el) => el.textContent?.trim());
  const press = (key: string) => fireEvent.keyDown(input(), { key });
  const hidden = (container: Element) =>
    container.querySelector<HTMLInputElement>('input[type="hidden"]')!;
  const typeText = async (value: string) => {
    (input() as HTMLInputElement).value = value;
    await fireEvent.input(input());
  };

  it("memasang atribut ARIA combobox, label, dan class user di akhir", () => {
    const { container } = render(Combobox, {
      props: { id: "country", label: "Country", name: "country", options },
      attrs: { placeholder: "Search", class: "max-w-xs" },
    });
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

  it("v-model awal mengisi teks input dan input tersembunyi, opsi terpilih ditandai", () => {
    const { container } = render(Combobox, {
      props: { name: "country", modelValue: "jp", options },
    });
    expect(input()).toHaveValue("Japan");
    expect(hidden(container)).toHaveValue("jp");
    expect(option("Japan")).toHaveAttribute("data-state", "checked");
    expect(option("Japan").querySelector("svg")).not.toBeNull();
    expect(option("Indonesia")).toHaveAttribute("data-state", "unchecked");
  });

  it("panah bawah membuka dan menyorot opsi pertama, panah berputar, Enter memilih", async () => {
    const { emitted } = render(Combobox, { props: { id: "c", options } });
    await press("ArrowDown");
    expect(input()).toHaveAttribute("aria-expanded", "true");
    expect(input()).toHaveAttribute("data-state", "open");
    expect(input()).toHaveAttribute("aria-activedescendant", "c-option-0");
    expect(option("Australia")).toHaveAttribute("aria-selected", "true");
    await press("ArrowUp");
    expect(input()).toHaveAttribute("aria-activedescendant", "c-option-3");
    await press("ArrowDown");
    await press("ArrowDown");
    expect(input()).toHaveAttribute("aria-activedescendant", "c-option-1");
    await press("Enter");
    expect(emitted()["update:modelValue"]).toEqual([["id"]]);
    expect(input()).toHaveValue("Indonesia");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).not.toHaveAttribute("aria-activedescendant");
  });

  it("panah atas saat tertutup membuka dan menyorot opsi terakhir", async () => {
    render(Combobox, { props: { id: "c", options } });
    await press("ArrowUp");
    expect(input()).toHaveAttribute("aria-activedescendant", "c-option-3");
    await press("Enter");
    expect(input()).toHaveValue("Malaysia");
    await press("Enter");
    expect(input()).toHaveValue("Malaysia");
  });

  it("mengetik memfilter opsi, mengosongkan value, dan menampilkan emptyLabel", async () => {
    const { emitted } = render(Combobox, {
      props: { options, modelValue: "au", emptyLabel: "Tidak ada hasil" },
    });
    await typeText("ia");
    expect(emitted()["update:modelValue"]).toEqual([[""]]);
    expect(input()).toHaveAttribute("aria-expanded", "true");
    expect(optionNames()).toEqual(["Australia", "Indonesia", "Malaysia"]);
    expect(screen.queryByText("Tidak ada hasil")).toBeNull();
    await typeText("zz");
    expect(optionNames()).toEqual([]);
    expect(screen.getByText("Tidak ada hasil")).toBeInTheDocument();
    await press("ArrowDown");
    expect(input()).not.toHaveAttribute("aria-activedescendant");
  });

  it("emptyLabel default No results", async () => {
    render(Combobox, { props: { options } });
    await typeText("xyz");
    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("Escape pertama menutup, Escape kedua mengosongkan", async () => {
    const { emitted } = render(Combobox, {
      props: { options, modelValue: "jp" },
    });
    await press("ArrowDown");
    await press("Escape");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).toHaveValue("Japan");
    expect(emitted()["update:modelValue"]).toBeUndefined();
    await press("Escape");
    expect(input()).toHaveValue("");
    expect(emitted()["update:modelValue"]).toEqual([[""]]);
  });

  it("klik membuka, klik opsi memilih, blur menutup", async () => {
    const { container } = render(Combobox, {
      props: { name: "country", options },
    });
    await fireEvent.click(input());
    expect(input()).toHaveAttribute("aria-expanded", "true");
    const mouseDown = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    option("Japan").dispatchEvent(mouseDown);
    expect(mouseDown.defaultPrevented).toBe(true);
    await fireEvent.click(option("Japan"));
    expect(input()).toHaveValue("Japan");
    expect(hidden(container)).toHaveValue("jp");
    await fireEvent.click(input());
    expect(optionNames()).toHaveLength(4);
    await fireEvent.blur(input());
    expect(input()).toHaveAttribute("aria-expanded", "false");
  });

  it("v-model dari luar menyamakan teks input", async () => {
    const country = ref("au");
    render({
      setup: () => () =>
        h(Combobox, {
          options,
          modelValue: country.value,
          "onUpdate:modelValue": (value: string) => (country.value = value),
        }),
    });
    expect(input()).toHaveValue("Australia");
    country.value = "my";
    await nextTick();
    expect(input()).toHaveValue("Malaysia");
    await typeText("Mal");
    expect(country.value).toBe("");
    expect(input()).toHaveValue("Mal");
  });

  it("hint dan error terhubung lewat aria-describedby", async () => {
    const { rerender } = render(Combobox, {
      props: { id: "c", options, hint: "Pick one" },
    });
    expect(input()).toHaveAttribute("aria-describedby", "c-hint");
    expect(input()).toHaveAccessibleDescription("Pick one");
    await rerender({ id: "c", options, hint: "Pick one", error: "Required" });
    expect(input()).toHaveAttribute("aria-describedby", "c-error");
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByText("Pick one")).toBeNull();
  });

  it("daftar ditempatkan di bawah input selebar input, pindah ke atas kalau tidak muat", async () => {
    const { container, unmount } = render(Combobox, { props: { options } });
    const panel = container.querySelector<HTMLElement>("[popover]")!;
    vi.spyOn(input(), "getBoundingClientRect").mockReturnValue(
      rect(100, 20, 300, 40),
    );
    vi.spyOn(panel, "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 300, 200),
    );
    await press("ArrowDown");
    expect(panel.style.top).toBe("144px");
    expect(panel.style.left).toBe("20px");
    expect(panel.style.width).toBe("300px");

    vi.spyOn(input(), "getBoundingClientRect").mockReturnValue(
      rect(700, 20, 300, 40),
    );
    await fireEvent.scroll(window);
    expect(panel.style.top).toBe(`${700 - 4 - 200}px`);
    unmount();
  });
});
