import { fireEvent, render, screen } from "@testing-library/vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import Alert from "../../components/alert/Alert.vue";
import Badge from "../../components/badge/Badge.vue";
import Progress from "../../components/progress/Progress.vue";
import Skeleton from "../../components/skeleton/Skeleton.vue";
import Toaster, {
  dismissToast,
  toast,
  type ToastOptions,
} from "../../components/toast/Toast.vue";

describe("Vue Alert", () => {
  it("default role alert, varian info, dengan judul dan isi", () => {
    render(Alert, {
      props: { title: "Update" },
      slots: { default: "New version available." },
    });
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-primary-soft", "border-primary-line");
    expect(alert).toHaveTextContent("UpdateNew version available.");
    expect(alert.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("menerima role status, varian, dan class user di akhir", () => {
    render(Alert, {
      props: { variant: "warning" },
      attrs: { role: "status", class: "mt-4" },
      slots: { default: "Quota almost full" },
    });
    const alert = screen.getByRole("status");
    expect(alert).toHaveClass("bg-warning/10", "border-warning/30");
    expect(alert.className.endsWith("mt-4")).toBe(true);
    expect(alert.querySelector("svg")).toHaveClass("text-warning");
    expect(alert.querySelector("p")).toBeNull();
  });
});

describe("Vue Badge", () => {
  it("dot default tampil dan bisa dimatikan", () => {
    const withDot = render(Badge, {
      props: { variant: "success" },
      slots: { default: "Paid" },
    });
    expect(
      withDot.container.querySelectorAll('[aria-hidden="true"]'),
    ).toHaveLength(1);
    withDot.unmount();
    const noDot = render(Badge, {
      props: { variant: "success", dot: false },
      slots: { default: "Paid" },
    });
    expect(
      noDot.container.querySelectorAll('[aria-hidden="true"]'),
    ).toHaveLength(0);
  });

  it("default neutral dengan titik aria-hidden", () => {
    render(Badge, { slots: { default: "Draft" } });
    const badge = screen.getByText("Draft");
    expect(badge).toHaveClass("rounded-full", "bg-subtle", "text-ink");
    expect(badge.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("menerapkan varian dan class user di akhir", () => {
    render(Badge, {
      props: { variant: "primary" },
      attrs: { class: "ml-2" },
      slots: { default: "New" },
    });
    const badge = screen.getByText("New");
    expect(badge).toHaveClass("bg-primary-soft", "text-primary");
    expect(badge.firstElementChild).toHaveClass("bg-primary");
    expect(badge.className.endsWith("ml-2")).toBe(true);
  });
});

describe("Vue Progress", () => {
  it("menghubungkan label, persentase, dan class user ke progress", () => {
    render(Progress, {
      props: { label: "Upload", value: 3, max: 4 },
      attrs: { class: "h-3" },
    });
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("value", "3");
    expect(bar).toHaveAttribute("max", "4");
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(bar.className.endsWith("h-3")).toBe(true);
  });

  it("tak tentu bila value kosong dan default max 100", () => {
    render(Progress, { props: { label: "Preparing", id: "ready" } });
    const bar = screen.getByRole("progressbar", { name: "Preparing" });
    expect(bar).not.toHaveAttribute("value");
    expect(bar).toHaveAttribute("max", "100");
    expect(bar).toHaveAttribute("id", "ready");
    expect(screen.queryByText(/%$/)).toBeNull();
  });

  it("membatasi persentase dan tanpa label tidak ada header", () => {
    render(Progress, { props: { label: "Over", value: -5 } });
    expect(screen.getByText("0%")).toBeInTheDocument();
    render(Progress, {
      props: { value: 10 },
      attrs: { "aria-label": "Plain" },
    });
    expect(screen.getByRole("progressbar", { name: "Plain" })).toBeVisible();
    expect(screen.queryByText("10%")).toBeNull();
  });
});

describe("Vue Skeleton", () => {
  it("aria-hidden, bentuk rect default, dan class ukuran dari user", () => {
    const { container } = render(Skeleton, { attrs: { class: "h-4 w-1/2" } });
    const skeleton = container.firstElementChild;
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveClass("animate-pulse", "rounded-md");
    expect(skeleton?.className.endsWith("w-1/2")).toBe(true);
  });

  it("shape circle memakai rounded-full", () => {
    const { container } = render(Skeleton, { props: { shape: "circle" } });
    expect(container.firstElementChild).toHaveClass("rounded-full");
    expect(container.firstElementChild).not.toHaveClass("rounded-md");
  });
});

describe("Vue Toast", () => {
  const ids: number[] = [];
  const show = async (options: ToastOptions) => {
    ids.push(toast(options));
    await nextTick();
  };
  const advance = async (ms: number) => {
    vi.advanceTimersByTime(ms);
    await nextTick();
  };

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    ids.splice(0).forEach(dismissToast);
    vi.useRealTimers();
  });

  it("region live kosong dan menerima class user", () => {
    render(Toaster, { attrs: { class: "bottom-8" } });
    const region = screen.getByRole("status", { name: "Notifications" });
    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region.querySelector("[data-state]")).toBeNull();
    expect(region.className.endsWith("bottom-8")).toBe(true);
  });

  it("regionLabel dan closeLabel menimpa label default", async () => {
    render(Toaster, {
      props: { regionLabel: "Notifikasi", closeLabel: "Tutup" },
    });
    await show({ title: "Saved", duration: 0 });
    const region = screen.getByRole("status", { name: "Notifikasi" });
    expect(region).toHaveTextContent("Saved");
    expect(screen.getByRole("button", { name: "Tutup" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull();
  });

  it("menampilkan judul, deskripsi, varian, lalu tombol Close menghapus", async () => {
    render(Toaster);
    await show({
      title: "Failed",
      description: "Try again.",
      variant: "danger",
      duration: 0,
    });
    const region = screen.getByRole("status", { name: "Notifications" });
    expect(region).toHaveTextContent("FailedTry again.");
    const card = region.querySelector("[data-state=open]");
    expect(card).toHaveClass("border-danger/40");
    expect(card?.querySelector("svg")).toHaveClass("text-danger");

    await fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(region.querySelector("[data-state]")).toBeNull();
  });

  it("varian default tanpa ikon dan hilang setelah 5000ms", async () => {
    render(Toaster);
    await show({ title: "Draft" });
    const card = screen.getByText("Draft").closest("[data-state]")!;
    expect(card).toHaveClass("border-line");
    expect(card.querySelectorAll("svg")).toHaveLength(1);

    await advance(4999);
    expect(screen.getByText("Draft")).toBeInTheDocument();
    await advance(1);
    expect(screen.queryByText("Draft")).toBeNull();
  });

  it("duration 0 tidak pernah hilang sendiri", async () => {
    render(Toaster);
    await show({ title: "Sticky", duration: 0 });
    await advance(60_000);
    expect(screen.getByText("Sticky")).toBeInTheDocument();
  });

  it("timer berhenti saat hover atau fokus dan lanjut dengan sisa waktu", async () => {
    render(Toaster);
    await show({ title: "Temporary", duration: 1000 });
    const card = screen.getByText("Temporary").closest("[data-state]")!;
    const close = screen.getByRole("button", { name: "Close" });

    await advance(400);
    await fireEvent.mouseEnter(card);
    await advance(5000);
    expect(screen.getByText("Temporary")).toBeInTheDocument();
    await fireEvent.mouseLeave(card);

    await fireEvent.focusIn(close);
    await advance(5000);
    expect(screen.getByText("Temporary")).toBeInTheDocument();
    await fireEvent.focusOut(close);

    await advance(599);
    expect(screen.getByText("Temporary")).toBeInTheDocument();
    await advance(1);
    expect(screen.queryByText("Temporary")).toBeNull();
  });

  it("di server toast() tidak mengantre apa pun dan mengembalikan 0", async () => {
    render(Toaster);
    vi.stubGlobal("window", undefined);
    const id = toast({ title: "Server" });
    vi.unstubAllGlobals();

    expect(id).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
    await show({ title: "Client", duration: 0 });
    const region = screen.getByRole("status", { name: "Notifications" });
    expect(region.querySelectorAll("[data-state]")).toHaveLength(1);
    expect(region).toHaveTextContent("Client");
  });

  it("mouseleave tidak melanjutkan timer selama fokus masih di dalam toast", async () => {
    render(Toaster);
    await show({ title: "Focus", duration: 1000 });
    const card = screen.getByText("Focus").closest("[data-state]")!;

    await fireEvent.mouseEnter(card);
    screen.getByRole("button", { name: "Close" }).focus();
    await fireEvent.mouseLeave(card);
    await advance(5000);
    expect(screen.getByText("Focus")).toBeInTheDocument();
  });
});
