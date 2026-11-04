import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Alert } from "../../components/alert/Alert";
import { Badge } from "../../components/badge/Badge";
import { Progress } from "../../components/progress/Progress";
import { Skeleton } from "../../components/skeleton/Skeleton";
import {
  dismissToast,
  toast,
  Toaster,
  type ToastOptions,
} from "../../components/toast/Toast";

describe("React Alert", () => {
  it("default role alert, varian info, dengan judul dan isi", () => {
    render(<Alert title="Pembaruan">Versi baru tersedia.</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-primary-soft", "border-primary-line");
    expect(alert).toHaveTextContent("PembaruanVersi baru tersedia.");
    expect(alert.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("menerima role status, varian, dan class user di akhir", () => {
    render(
      <Alert variant="danger" role="status" className="mt-4">
        Gagal
      </Alert>,
    );
    const alert = screen.getByRole("status");
    expect(alert).toHaveClass("bg-danger/10", "border-danger/30");
    expect(alert.className.endsWith("mt-4")).toBe(true);
    expect(alert.querySelector("svg")).toHaveClass("text-danger");
    expect(alert.querySelector("p")).toBeNull();
  });
});

describe("React Badge", () => {
  it("default neutral dengan titik aria-hidden", () => {
    render(<Badge>Draf</Badge>);
    const badge = screen.getByText("Draf");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass("rounded-full", "bg-subtle", "text-ink");
    expect(badge.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("menerapkan varian dan class user di akhir", () => {
    render(
      <Badge variant="warning" className="ml-2" title="Status">
        Tertunda
      </Badge>,
    );
    const badge = screen.getByText("Tertunda");
    expect(badge).toHaveClass("bg-warning/10");
    expect(badge).toHaveAttribute("title", "Status");
    expect(badge.firstElementChild).toHaveClass("bg-warning");
    expect(badge.className.endsWith("ml-2")).toBe(true);
  });
});

describe("React Progress", () => {
  it("menghubungkan label, menampilkan persentase, dan default max 100", () => {
    render(<Progress label="Unggah" value={3} max={4} className="h-3" />);
    const bar = screen.getByRole("progressbar", { name: "Unggah" });
    expect(bar).toHaveAttribute("value", "3");
    expect(bar).toHaveAttribute("max", "4");
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(bar.className.endsWith("h-3")).toBe(true);
  });

  it("tak tentu bila value kosong, tanpa persentase", () => {
    render(<Progress label="Menyiapkan" id="siap" />);
    const bar = screen.getByRole("progressbar", { name: "Menyiapkan" });
    expect(bar).not.toHaveAttribute("value");
    expect(bar).toHaveAttribute("max", "100");
    expect(bar).toHaveAttribute("id", "siap");
    expect(screen.queryByText(/%$/)).toBeNull();
  });

  it("membatasi persentase 0 sampai 100 dan tanpa label tidak ada header", () => {
    const { rerender } = render(<Progress label="Lebih" value={150} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
    rerender(<Progress aria-label="Polos" value={10} />);
    expect(screen.getByRole("progressbar", { name: "Polos" })).toBeVisible();
    expect(screen.queryByText("10%")).toBeNull();
  });
});

describe("React Skeleton", () => {
  it("aria-hidden, bentuk rect default, dan class ukuran dari user", () => {
    const { container } = render(<Skeleton className="h-4 w-1/2" />);
    const skeleton = container.firstElementChild;
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveClass("animate-pulse", "rounded-md");
    expect(skeleton?.className.endsWith("w-1/2")).toBe(true);
  });

  it("shape circle memakai rounded-full", () => {
    const { container } = render(<Skeleton shape="circle" />);
    expect(container.firstElementChild).toHaveClass("rounded-full");
    expect(container.firstElementChild).not.toHaveClass("rounded-md");
  });
});

describe("React Toast", () => {
  const ids: number[] = [];
  const show = (options: ToastOptions) =>
    act(() => {
      ids.push(toast(options));
    });

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    act(() => ids.splice(0).forEach(dismissToast));
    vi.useRealTimers();
  });

  it("region live kosong dan menerima class user", () => {
    render(<Toaster className="bottom-8" />);
    const region = screen.getByRole("status", { name: "Notifikasi" });
    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region).toBeEmptyDOMElement();
    expect(region.className.endsWith("bottom-8")).toBe(true);
  });

  it("menampilkan judul, deskripsi, varian, lalu tombol Tutup menghapus", () => {
    render(<Toaster />);
    show({
      title: "Tersimpan",
      description: "Data sudah diperbarui.",
      variant: "success",
      duration: 0,
    });
    const region = screen.getByRole("status", { name: "Notifikasi" });
    expect(region).toHaveTextContent("TersimpanData sudah diperbarui.");
    const card = region.firstElementChild;
    expect(card).toHaveAttribute("data-state", "open");
    expect(card).toHaveClass("border-success/40");
    expect(card?.querySelector("svg")).toHaveClass("text-success");

    fireEvent.click(screen.getByRole("button", { name: "Tutup" }));
    expect(region).toBeEmptyDOMElement();
  });

  it("varian default tanpa ikon dan hilang setelah 5000ms", () => {
    render(<Toaster />);
    show({ title: "Draf" });
    const region = screen.getByRole("status", { name: "Notifikasi" });
    expect(region.firstElementChild).toHaveClass("border-line");
    expect(region.querySelectorAll("svg")).toHaveLength(1);

    act(() => vi.advanceTimersByTime(4999));
    expect(screen.getByText("Draf")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByText("Draf")).toBeNull();
  });

  it("duration 0 tidak pernah hilang sendiri", () => {
    render(<Toaster />);
    show({ title: "Tetap", duration: 0 });
    act(() => vi.advanceTimersByTime(60_000));
    expect(screen.getByText("Tetap")).toBeInTheDocument();
  });

  it("timer berhenti saat hover atau fokus dan lanjut dengan sisa waktu", () => {
    render(<Toaster />);
    show({ title: "Sementara", duration: 1000 });
    const card = screen.getByText("Sementara").closest("[data-state]")!;

    act(() => vi.advanceTimersByTime(400));
    fireEvent.mouseEnter(card);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText("Sementara")).toBeInTheDocument();
    fireEvent.mouseLeave(card);

    fireEvent.focus(screen.getByRole("button", { name: "Tutup" }));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText("Sementara")).toBeInTheDocument();
    fireEvent.blur(screen.getByRole("button", { name: "Tutup" }));

    act(() => vi.advanceTimersByTime(599));
    expect(screen.getByText("Sementara")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByText("Sementara")).toBeNull();
  });

  it("di server toast() tidak mengantre apa pun dan mengembalikan 0", () => {
    render(<Toaster />);
    vi.stubGlobal("window", undefined);
    const id = toast({ title: "Server" });
    vi.unstubAllGlobals();

    expect(id).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
    show({ title: "Klien", duration: 0 });
    const region = screen.getByRole("status", { name: "Notifikasi" });
    expect(region.children).toHaveLength(1);
    expect(region).toHaveTextContent("Klien");
  });

  it("mouseleave tidak melanjutkan timer selama fokus masih di dalam toast", () => {
    render(<Toaster />);
    show({ title: "Fokus", duration: 1000 });
    const card = screen.getByText("Fokus").closest("[data-state]")!;
    const close = screen.getByRole("button", { name: "Tutup" });

    fireEvent.mouseEnter(card);
    close.focus();
    fireEvent.mouseLeave(card);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText("Fokus")).toBeInTheDocument();
  });
});
