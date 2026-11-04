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
      props: { title: "Pembaruan" },
      slots: { default: "Versi baru tersedia." },
    });
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-primary-soft", "border-primary-line");
    expect(alert).toHaveTextContent("PembaruanVersi baru tersedia.");
    expect(alert.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("menerima role status, varian, dan class user di akhir", () => {
    render(Alert, {
      props: { variant: "warning" },
      attrs: { role: "status", class: "mt-4" },
      slots: { default: "Kuota hampir habis" },
    });
    const alert = screen.getByRole("status");
    expect(alert).toHaveClass("bg-warning/10", "border-warning/30");
    expect(alert.className.endsWith("mt-4")).toBe(true);
    expect(alert.querySelector("svg")).toHaveClass("text-warning");
    expect(alert.querySelector("p")).toBeNull();
  });
});

describe("Vue Badge", () => {
  it("default neutral dengan titik aria-hidden", () => {
    render(Badge, { slots: { default: "Draf" } });
    const badge = screen.getByText("Draf");
    expect(badge).toHaveClass("rounded-full", "bg-subtle", "text-ink");
    expect(badge.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("menerapkan varian dan class user di akhir", () => {
    render(Badge, {
      props: { variant: "primary" },
      attrs: { class: "ml-2" },
      slots: { default: "Baru" },
    });
    const badge = screen.getByText("Baru");
    expect(badge).toHaveClass("bg-primary-soft", "text-primary");
    expect(badge.firstElementChild).toHaveClass("bg-primary");
    expect(badge.className.endsWith("ml-2")).toBe(true);
  });
});

describe("Vue Progress", () => {
  it("menghubungkan label, persentase, dan class user ke progress", () => {
    render(Progress, {
      props: { label: "Unggah", value: 3, max: 4 },
      attrs: { class: "h-3" },
    });
    const bar = screen.getByRole("progressbar", { name: "Unggah" });
    expect(bar).toHaveAttribute("value", "3");
    expect(bar).toHaveAttribute("max", "4");
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(bar.className.endsWith("h-3")).toBe(true);
  });

  it("tak tentu bila value kosong dan default max 100", () => {
    render(Progress, { props: { label: "Menyiapkan", id: "siap" } });
    const bar = screen.getByRole("progressbar", { name: "Menyiapkan" });
    expect(bar).not.toHaveAttribute("value");
    expect(bar).toHaveAttribute("max", "100");
    expect(bar).toHaveAttribute("id", "siap");
    expect(screen.queryByText(/%$/)).toBeNull();
  });

  it("membatasi persentase dan tanpa label tidak ada header", () => {
    render(Progress, { props: { label: "Lebih", value: -5 } });
    expect(screen.getByText("0%")).toBeInTheDocument();
    render(Progress, {
      props: { value: 10 },
      attrs: { "aria-label": "Polos" },
    });
    expect(screen.getByRole("progressbar", { name: "Polos" })).toBeVisible();
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
    const region = screen.getByRole("status", { name: "Notifikasi" });
    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region.querySelector("[data-state]")).toBeNull();
    expect(region.className.endsWith("bottom-8")).toBe(true);
  });

  it("menampilkan judul, deskripsi, varian, lalu tombol Tutup menghapus", async () => {
    render(Toaster);
    await show({
      title: "Gagal",
      description: "Coba lagi.",
      variant: "danger",
      duration: 0,
    });
    const region = screen.getByRole("status", { name: "Notifikasi" });
    expect(region).toHaveTextContent("GagalCoba lagi.");
    const card = region.querySelector("[data-state=open]");
    expect(card).toHaveClass("border-danger/40");
    expect(card?.querySelector("svg")).toHaveClass("text-danger");

    await fireEvent.click(screen.getByRole("button", { name: "Tutup" }));
    expect(region.querySelector("[data-state]")).toBeNull();
  });

  it("varian default tanpa ikon dan hilang setelah 5000ms", async () => {
    render(Toaster);
    await show({ title: "Draf" });
    const card = screen.getByText("Draf").closest("[data-state]")!;
    expect(card).toHaveClass("border-line");
    expect(card.querySelectorAll("svg")).toHaveLength(1);

    await advance(4999);
    expect(screen.getByText("Draf")).toBeInTheDocument();
    await advance(1);
    expect(screen.queryByText("Draf")).toBeNull();
  });

  it("duration 0 tidak pernah hilang sendiri", async () => {
    render(Toaster);
    await show({ title: "Tetap", duration: 0 });
    await advance(60_000);
    expect(screen.getByText("Tetap")).toBeInTheDocument();
  });

  it("timer berhenti saat hover atau fokus dan lanjut dengan sisa waktu", async () => {
    render(Toaster);
    await show({ title: "Sementara", duration: 1000 });
    const card = screen.getByText("Sementara").closest("[data-state]")!;
    const close = screen.getByRole("button", { name: "Tutup" });

    await advance(400);
    await fireEvent.mouseEnter(card);
    await advance(5000);
    expect(screen.getByText("Sementara")).toBeInTheDocument();
    await fireEvent.mouseLeave(card);

    await fireEvent.focusIn(close);
    await advance(5000);
    expect(screen.getByText("Sementara")).toBeInTheDocument();
    await fireEvent.focusOut(close);

    await advance(599);
    expect(screen.getByText("Sementara")).toBeInTheDocument();
    await advance(1);
    expect(screen.queryByText("Sementara")).toBeNull();
  });

  it("di server toast() tidak mengantre apa pun dan mengembalikan 0", async () => {
    render(Toaster);
    vi.stubGlobal("window", undefined);
    const id = toast({ title: "Server" });
    vi.unstubAllGlobals();

    expect(id).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
    await show({ title: "Klien", duration: 0 });
    const region = screen.getByRole("status", { name: "Notifikasi" });
    expect(region.querySelectorAll("[data-state]")).toHaveLength(1);
    expect(region).toHaveTextContent("Klien");
  });

  it("mouseleave tidak melanjutkan timer selama fokus masih di dalam toast", async () => {
    render(Toaster);
    await show({ title: "Fokus", duration: 1000 });
    const card = screen.getByText("Fokus").closest("[data-state]")!;

    await fireEvent.mouseEnter(card);
    screen.getByRole("button", { name: "Tutup" }).focus();
    await fireEvent.mouseLeave(card);
    await advance(5000);
    expect(screen.getByText("Fokus")).toBeInTheDocument();
  });
});
