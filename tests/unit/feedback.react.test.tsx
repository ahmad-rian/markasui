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
    render(<Alert title="Update">New version available.</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-primary-soft", "border-primary-line");
    expect(alert).toHaveTextContent("UpdateNew version available.");
    expect(alert.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("menerima role status, varian, dan class user di akhir", () => {
    render(
      <Alert variant="danger" role="status" className="mt-4">
        Failed
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
  it("dot default tampil dan bisa dimatikan", () => {
    const { container, rerender } = render(
      <Badge variant="success">Paid</Badge>,
    );
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
    rerender(
      <Badge variant="success" dot={false}>
        Paid
      </Badge>,
    );
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
    expect(screen.getByText("Paid")).toBeInTheDocument();
  });

  it("default neutral dengan titik aria-hidden", () => {
    render(<Badge>Draft</Badge>);
    const badge = screen.getByText("Draft");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass("rounded-full", "bg-subtle", "text-ink");
    expect(badge.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("menerapkan varian dan class user di akhir", () => {
    render(
      <Badge variant="warning" className="ml-2" title="Status">
        Pending
      </Badge>,
    );
    const badge = screen.getByText("Pending");
    expect(badge).toHaveClass("bg-warning/10");
    expect(badge).toHaveAttribute("title", "Status");
    expect(badge.firstElementChild).toHaveClass("bg-warning");
    expect(badge.className.endsWith("ml-2")).toBe(true);
  });
});

describe("React Progress", () => {
  it("menghubungkan label, menampilkan persentase, dan default max 100", () => {
    render(<Progress label="Upload" value={3} max={4} className="h-3" />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("value", "3");
    expect(bar).toHaveAttribute("max", "4");
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(bar.className.endsWith("h-3")).toBe(true);
  });

  it("tak tentu bila value kosong, tanpa persentase", () => {
    render(<Progress label="Preparing" id="ready" />);
    const bar = screen.getByRole("progressbar", { name: "Preparing" });
    expect(bar).not.toHaveAttribute("value");
    expect(bar).toHaveAttribute("max", "100");
    expect(bar).toHaveAttribute("id", "ready");
    expect(screen.queryByText(/%$/)).toBeNull();
  });

  it("membatasi persentase 0 sampai 100 dan tanpa label tidak ada header", () => {
    const { rerender } = render(<Progress label="Over" value={150} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
    rerender(<Progress aria-label="Plain" value={10} />);
    expect(screen.getByRole("progressbar", { name: "Plain" })).toBeVisible();
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
    const region = screen.getByRole("status", { name: "Notifications" });
    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region).toBeEmptyDOMElement();
    expect(region.className.endsWith("bottom-8")).toBe(true);
  });

  it("regionLabel dan closeLabel menimpa label default", () => {
    render(<Toaster regionLabel="Notifikasi" closeLabel="Tutup" />);
    show({ title: "Saved", duration: 0 });
    const region = screen.getByRole("status", { name: "Notifikasi" });
    expect(region).toHaveTextContent("Saved");
    expect(screen.getByRole("button", { name: "Tutup" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull();
  });

  it("menampilkan judul, deskripsi, varian, lalu tombol Close menghapus", () => {
    render(<Toaster />);
    show({
      title: "Saved",
      description: "Data has been updated.",
      variant: "success",
      duration: 0,
    });
    const region = screen.getByRole("status", { name: "Notifications" });
    expect(region).toHaveTextContent("SavedData has been updated.");
    const card = region.firstElementChild;
    expect(card).toHaveAttribute("data-state", "open");
    expect(card).toHaveClass("border-success/40");
    expect(card?.querySelector("svg")).toHaveClass("text-success");

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(region).toBeEmptyDOMElement();
  });

  it("varian default tanpa ikon dan hilang setelah 5000ms", () => {
    render(<Toaster />);
    show({ title: "Draft" });
    const region = screen.getByRole("status", { name: "Notifications" });
    expect(region.firstElementChild).toHaveClass("border-line");
    expect(region.querySelectorAll("svg")).toHaveLength(1);

    act(() => vi.advanceTimersByTime(4999));
    expect(screen.getByText("Draft")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByText("Draft")).toBeNull();
  });

  it("duration 0 tidak pernah hilang sendiri", () => {
    render(<Toaster />);
    show({ title: "Sticky", duration: 0 });
    act(() => vi.advanceTimersByTime(60_000));
    expect(screen.getByText("Sticky")).toBeInTheDocument();
  });

  it("timer berhenti saat hover atau fokus dan lanjut dengan sisa waktu", () => {
    render(<Toaster />);
    show({ title: "Temporary", duration: 1000 });
    const card = screen.getByText("Temporary").closest("[data-state]")!;

    act(() => vi.advanceTimersByTime(400));
    fireEvent.mouseEnter(card);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText("Temporary")).toBeInTheDocument();
    fireEvent.mouseLeave(card);

    fireEvent.focus(screen.getByRole("button", { name: "Close" }));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText("Temporary")).toBeInTheDocument();
    fireEvent.blur(screen.getByRole("button", { name: "Close" }));

    act(() => vi.advanceTimersByTime(599));
    expect(screen.getByText("Temporary")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByText("Temporary")).toBeNull();
  });

  it("di server toast() tidak mengantre apa pun dan mengembalikan 0", () => {
    render(<Toaster />);
    vi.stubGlobal("window", undefined);
    const id = toast({ title: "Server" });
    vi.unstubAllGlobals();

    expect(id).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
    show({ title: "Client", duration: 0 });
    const region = screen.getByRole("status", { name: "Notifications" });
    expect(region.children).toHaveLength(1);
    expect(region).toHaveTextContent("Client");
  });

  it("mouseleave tidak melanjutkan timer selama fokus masih di dalam toast", () => {
    render(<Toaster />);
    show({ title: "Focus", duration: 1000 });
    const card = screen.getByText("Focus").closest("[data-state]")!;
    const close = screen.getByRole("button", { name: "Close" });

    fireEvent.mouseEnter(card);
    close.focus();
    fireEvent.mouseLeave(card);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText("Focus")).toBeInTheDocument();
  });
});
