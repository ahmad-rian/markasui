"use client";

import { useState, type SyntheticEvent } from "react";
import { Avatar } from "../../../components/avatar/Avatar";
import { Badge } from "../../../components/badge/Badge";
import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { Drawer } from "../../../components/drawer/Drawer";
import { DropdownMenu } from "../../../components/dropdown-menu/DropdownMenu";
import { Input } from "../../../components/input/Input";
import { Tabs } from "../../../components/tabs/Tabs";
import { Toaster, toast } from "../../../components/toast/Toast";
import { Tooltip } from "../../../components/tooltip/Tooltip";

const icons = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  calendar:
    "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2",
  chart: "M3 3v18h18M8 17v-5M13 17V8M18 17v-3",
  folder:
    "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z",
  sliders:
    "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M22 6l-10 7L2 6",
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92",
  chat: "M7.9 20A9 9 0 1 0 4 16.1L2 22z",
  clock: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20",
  back: "M19 12H5M12 19l-7-7 7-7",
  prev: "m15 18-6-6 6-6",
  next: "m9 18 6-6-6-6",
  dots: "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
  pencil: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z",
  menu: "M4 6h16M4 12h16M4 18h16",
  plus: "M12 5v14M5 12h14",
};
type IconName = keyof typeof icons;

const topNav = [
  { id: "deals", label: "Deals" },
  { id: "customers", label: "Customers" },
  { id: "finance", label: "Finance" },
  { id: "growth", label: "Growth" },
  { id: "projects", label: "Projects" },
];

const railNav: { id: string; label: string; icon: IconName }[] = [
  { id: "overview", label: "Overview", icon: "home" },
  { id: "contacts", label: "Contacts", icon: "users" },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "reports", label: "Reports", icon: "chart" },
  { id: "documents", label: "Documents", icon: "folder" },
  { id: "settings", label: "Settings", icon: "sliders" },
];

const stats = [
  {
    label: "Deals value this month",
    value: "Rp 482.500.000",
    badge: "+12.4%",
    variant: "success",
  },
  {
    label: "New customers this week",
    value: "38",
    badge: "+6",
    variant: "success",
  },
  { label: "New tasks", value: "14", badge: "5 due today", variant: "warning" },
] as const;

const deals = [
  {
    id: "d1",
    date: "2026-10-28",
    title: "Cloud migration package",
    value: 185000000,
    stage: "Negotiation",
    team: ["Budi Santoso", "Sari Wulandari", "Agus Pratama"],
    highlight: true,
  },
  {
    id: "d2",
    date: "2026-10-21",
    title: "Annual support renewal",
    value: 96400000,
    stage: "Won",
    team: ["Dewi Lestari", "Budi Santoso"],
    highlight: false,
  },
  {
    id: "d3",
    date: "2026-10-14",
    title: "Data warehouse audit",
    value: 42750000,
    stage: "Proposal",
    team: ["Agus Pratama", "Fajar Nugroho", "Sari Wulandari"],
    highlight: false,
  },
  {
    id: "d4",
    date: "2026-10-02",
    title: "POS terminal rollout",
    value: 128900000,
    stage: "Won",
    team: ["Fajar Nugroho", "Dewi Lestari"],
    highlight: false,
  },
  {
    id: "d5",
    date: "2026-09-23",
    title: "Security awareness training",
    value: 18500000,
    stage: "Lost",
    team: ["Sari Wulandari"],
    highlight: false,
  },
  {
    id: "d6",
    date: "2026-09-11",
    title: "Fleet tracking pilot",
    value: 64200000,
    stage: "Won",
    team: ["Budi Santoso", "Agus Pratama", "Dewi Lestari"],
    highlight: false,
  },
];
type Deal = (typeof deals)[number];

const sortOptions = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "Highest value", value: "high" },
  { label: "Lowest value", value: "low" },
];
const sorters: Record<string, (a: Deal, b: Deal) => number> = {
  newest: (a, b) => b.date.localeCompare(a.date),
  oldest: (a, b) => a.date.localeCompare(b.date),
  high: (a, b) => b.value - a.value,
  low: (a, b) => a.value - b.value,
};

const dealMenu = [
  { label: "View details", value: "view" },
  { label: "Duplicate deal", value: "duplicate" },
  { separator: true as const },
  { label: "Archive", value: "archive", danger: true },
];
const dealMenuToasts: Record<string, string> = {
  view: "Opening deal details",
  duplicate: "Deal duplicated",
  archive: "Deal archived",
};

const profileActions: { id: string; label: string; icon: IconName }[] = [
  { id: "email", label: "Send email", icon: "mail" },
  { id: "call", label: "Call customer", icon: "phone" },
  { id: "chat", label: "Start chat", icon: "chat" },
  { id: "schedule", label: "Schedule meeting", icon: "clock" },
];

const initialInfo = {
  firstName: "Rina",
  lastName: "Kusuma",
  email: "rina.kusuma@nusalog.co.id",
  phone: "+62 812 3456 7890",
  source: "Referral",
  lastContacted: "Nov 3, 2026",
};
type CustomerInfo = typeof initialInfo;
type EditableField = Exclude<keyof CustomerInfo, "lastContacted">;

const infoRows: { key: keyof CustomerInfo; label: string }[] = [
  { key: "firstName", label: "First name" },
  { key: "lastName", label: "Last name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "source", label: "Source" },
  { key: "lastContacted", label: "Last contacted" },
];
const formFields: { key: EditableField; label: string; type: string }[] = [
  { key: "firstName", label: "First name", type: "text" },
  { key: "lastName", label: "Last name", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "source", label: "Source", type: "text" },
];

type Task = { time: string; title: string; kind: string };
const tasks: Record<string, Task[]> = {
  "2026-10-28": [{ time: "10:00", title: "Kickoff meeting", kind: "Meeting" }],
  "2026-11-03": [
    { time: "09:30", title: "Discovery call recap", kind: "Call" },
  ],
  "2026-11-05": [
    { time: "10:00", title: "Send revised proposal", kind: "Email" },
    { time: "14:30", title: "Pricing review with finance", kind: "Meeting" },
  ],
  "2026-11-09": [
    { time: "11:00", title: "Contract draft review", kind: "Meeting" },
  ],
  "2026-11-12": [
    { time: "15:00", title: "Quarterly business review", kind: "Meeting" },
  ],
  "2026-11-18": [
    { time: "09:00", title: "Onsite demo in Surabaya", kind: "Visit" },
  ],
  "2026-11-26": [{ time: "13:00", title: "Renewal sign-off", kind: "Call" }],
  "2026-12-02": [
    { time: "10:00", title: "Implementation planning", kind: "Meeting" },
  ],
};
const TODAY = "2026-11-05";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const funnel = [
  {
    value: "weighted",
    label: "Weighted",
    total: "Rp 592.900.000",
    caption: "Weighted pipeline value",
    steps: [
      {
        label: "Qualification",
        value: "Rp 312.400.000",
        deals: 12,
        width: 100,
      },
      { label: "Proposal sent", value: "Rp 186.000.000", deals: 7, width: 60 },
      { label: "Negotiation", value: "Rp 94.500.000", deals: 4, width: 30 },
    ],
  },
  {
    value: "total",
    label: "Total",
    total: "Rp 1.069.800.000",
    caption: "Total pipeline value",
    steps: [
      {
        label: "Qualification",
        value: "Rp 624.800.000",
        deals: 12,
        width: 100,
      },
      { label: "Proposal sent", value: "Rp 310.000.000", deals: 7, width: 50 },
      { label: "Negotiation", value: "Rp 135.000.000", deals: 4, width: 22 },
    ],
  },
];
const barTones = ["bg-primary", "bg-primary/70", "bg-primary/40"];

const iconButton =
  "relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const pillBase =
  "inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const pillActive = "bg-primary text-on-primary";
const pillIdle = "text-muted hover:bg-surface hover:text-ink";
const railBase =
  "inline-flex size-10 items-center justify-center rounded-xl transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const railActive = "bg-primary text-on-primary";
const railIdle = "text-muted hover:bg-subtle hover:text-ink";
const menuItemBase =
  "flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const menuItemActive = "bg-primary text-on-primary";
const menuItemIdle = "text-ink hover:bg-subtle";
const dealBase =
  "relative flex min-h-48 flex-col gap-3 rounded-2xl border p-4 transition-shadow duration-150";
const dealHighlight = "border-ink bg-ink text-canvas";
const dealNormal = "border-line bg-surface text-ink hover:border-primary-line";
const dealSelected = "ring-2 ring-primary ring-offset-2 ring-offset-surface";
const dealMenuClass =
  "relative z-10 -mt-1 -mr-1 [&>button]:size-8 [&>button]:rounded-full [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-0 [&>button]:text-current [&>button]:hover:bg-current/10 [&>button>svg:last-child]:hidden";
const dayBase =
  "relative inline-flex size-10 items-center justify-center rounded-full text-sm tabular-nums transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const daySelected = "bg-primary font-semibold text-on-primary";
const dayToday =
  "font-semibold text-ink ring-1 ring-primary-line hover:bg-subtle";
const dayIdle = "text-ink hover:bg-subtle";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const rupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
const pad = (value: number) => String(value).padStart(2, "0");
const isoDate = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${monthNames[(month ?? 1) - 1]?.slice(0, 3)} ${day}, ${year}`;
}

function longDate(iso: string) {
  const [year = 0, month = 1, day = 1] = iso.split("-").map(Number);
  const weekday = weekdayNames[new Date(year, month - 1, day).getDay()];
  return `${weekday}, ${monthNames[month - 1]} ${day}`;
}

/** Sel kalender bulan, minggu dimulai Senin. null untuk sel kosong sebelum tanggal 1. */
function monthCells(year: number, month: number) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  return [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: days }, (_, index) => index + 1),
  ];
}

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[name]} />
    </svg>
  );
}

export default function CrmCustomer() {
  const [activeTop, setActiveTop] = useState("customers");
  const [activeRail, setActiveRail] = useState("contacts");
  const [sort, setSort] = useState("newest");
  const [selectedDeal, setSelectedDeal] = useState("d1");
  const [info, setInfo] = useState(initialInfo);
  const [draft, setDraft] = useState(initialInfo);
  const [view, setView] = useState({ year: 2026, month: 10 });
  const [selectedDate, setSelectedDate] = useState(TODAY);

  const sortedDeals = [...deals].sort(sorters[sort]);
  const sortLabel = sortOptions.find((option) => option.value === sort)?.label;
  const cells = monthCells(view.year, view.month);
  const selectedTasks = tasks[selectedDate] ?? [];
  const customerName = `${info.firstName} ${info.lastName}`;

  const shiftMonth = (step: number) =>
    setView(({ year, month }) => {
      const next = new Date(year, month + step, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });

  const handleDrawerClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    const dialog = event.currentTarget;
    if (dialog.returnValue === "save") {
      setInfo(draft);
      toast({
        title: "Customer details saved",
        description: `${draft.firstName} ${draft.lastName}`,
        variant: "success",
      });
    }
    dialog.returnValue = "";
  };

  const navItems = (
    <form method="dialog" className="grid gap-6">
      <div className="grid gap-1">
        <p className="px-3 text-xs font-medium text-muted">Pages</p>
        {topNav.map((item) => (
          <button
            key={item.id}
            type="submit"
            aria-current={activeTop === item.id ? "page" : undefined}
            className={cx(
              menuItemBase,
              activeTop === item.id ? menuItemActive : menuItemIdle,
            )}
            onClick={() => setActiveTop(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="grid gap-1">
        <p className="px-3 text-xs font-medium text-muted">Workspace</p>
        {railNav.map((item) => (
          <button
            key={item.id}
            type="submit"
            aria-current={activeRail === item.id ? "page" : undefined}
            className={cx(
              menuItemBase,
              activeRail === item.id ? menuItemActive : menuItemIdle,
            )}
            onClick={() => setActiveRail(item.id)}
          >
            <Icon name={item.icon} />
            {item.label}
          </button>
        ))}
      </div>
    </form>
  );

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 lg:px-6">
        <Drawer
          title="Menu"
          side="left"
          trigger={
            <button
              type="button"
              aria-label="Open menu"
              className={cx(iconButton, "lg:hidden")}
            >
              <Icon name="menu" />
            </button>
          }
        >
          {navItems}
        </Drawer>
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-on-primary"
            aria-hidden="true"
          >
            L
          </span>
          <div className="min-w-0 leading-tight">
            <p className="flex items-center gap-1.5 text-base font-semibold tracking-tight">
              Lumen
              <span
                className="size-1.5 rounded-full bg-success"
                aria-hidden="true"
              />
            </p>
            <p className="truncate text-xs text-muted">Sales workspace</p>
          </div>
        </div>
        <nav
          aria-label="Main"
          className="mx-auto hidden items-center gap-1 rounded-full border border-line bg-canvas p-1 lg:flex"
        >
          {topNav.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={activeTop === item.id ? "page" : undefined}
              className={cx(
                pillBase,
                activeTop === item.id ? pillActive : pillIdle,
              )}
              onClick={() => setActiveTop(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Tooltip content="Messages" side="bottom">
            <button
              type="button"
              aria-label="Messages"
              className={iconButton}
              onClick={() =>
                toast({
                  title: "No new messages",
                  description: "Inbox is up to date",
                })
              }
            >
              <Icon name="message" />
            </button>
          </Tooltip>
          <Tooltip content="Notifications" side="bottom">
            <button
              type="button"
              aria-label="Notifications, 3 unread"
              className={iconButton}
              onClick={() =>
                toast({
                  title: "3 unread notifications",
                  description: "Rina Kusuma replied to your proposal",
                })
              }
            >
              <Icon name="bell" />
              <span
                className="absolute top-2 right-2.5 size-2 rounded-full bg-danger ring-2 ring-surface"
                aria-hidden="true"
              />
            </button>
          </Tooltip>
          <Avatar name="Andi Wijaya" size="md" className="ml-1" />
        </div>
      </header>

      <div className="flex">
        <div className="hidden w-18 shrink-0 border-r border-line bg-surface lg:block">
          <nav
            aria-label="Workspace"
            className="sticky top-16 flex h-[calc(100dvh-4rem)] flex-col items-center gap-2 py-4"
          >
            {railNav.map((item) => (
              <Tooltip
                key={item.id}
                content={item.label}
                className={item.id === "settings" ? "mt-auto" : undefined}
              >
                <button
                  type="button"
                  aria-label={item.label}
                  aria-current={activeRail === item.id ? "page" : undefined}
                  className={cx(
                    railBase,
                    activeRail === item.id ? railActive : railIdle,
                  )}
                  onClick={() => setActiveRail(item.id)}
                >
                  <Icon name={item.icon} />
                </button>
              </Tooltip>
            ))}
          </nav>
        </div>

        <main className="min-w-0 flex-1 p-4 lg:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="flex items-center gap-3">
              <Tooltip content="Back to customers">
                <button
                  type="button"
                  aria-label="Back to customers"
                  className={iconButton}
                  onClick={() => toast({ title: "Back to customer list" })}
                >
                  <Icon name="back" />
                </button>
              </Tooltip>
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Customer information
                </h1>
                <p className="text-sm text-muted">Customers / {customerName}</p>
              </div>
            </div>
            <dl className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-line bg-surface px-4 py-3"
                >
                  <dt className="text-xs text-muted">{stat.label}</dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-lg font-semibold tracking-tight tabular-nums">
                      {stat.value}
                    </span>
                    <Badge variant={stat.variant}>{stat.badge}</Badge>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="flex min-w-0 flex-col gap-6">
              <Card aria-labelledby="crm-history-title">
                <div className="grid gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2
                        id="crm-history-title"
                        className="text-base font-semibold"
                      >
                        Interaction history
                      </h2>
                      <p className="text-sm text-muted">
                        6 deals with {info.firstName} this quarter
                      </p>
                    </div>
                    <DropdownMenu
                      items={sortOptions}
                      onSelect={setSort}
                      trigger={
                        <>
                          <span className="text-muted">Sort:</span>
                          <span>{sortLabel}</span>
                        </>
                      }
                    />
                  </div>
                  <ul
                    role="list"
                    className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                  >
                    {sortedDeals.map((deal) => {
                      const selected = selectedDeal === deal.id;
                      return (
                        <li
                          key={deal.id}
                          data-deal={deal.id}
                          className={cx(
                            dealBase,
                            deal.highlight ? dealHighlight : dealNormal,
                            selected && dealSelected,
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <time
                              dateTime={deal.date}
                              className={cx(
                                "text-xs font-medium",
                                deal.highlight
                                  ? "text-canvas/75"
                                  : "text-muted",
                              )}
                            >
                              {formatDate(deal.date)}
                            </time>
                            <DropdownMenu
                              className={dealMenuClass}
                              items={dealMenu}
                              onSelect={(value) =>
                                toast({
                                  title: dealMenuToasts[value] ?? value,
                                  description: deal.title,
                                })
                              }
                              trigger={
                                <>
                                  <Icon name="dots" className="size-5" />
                                  <span className="sr-only">
                                    Actions for {deal.title}
                                  </span>
                                </>
                              }
                            />
                          </div>
                          <h3 className="text-sm leading-snug font-semibold">
                            <button
                              type="button"
                              aria-pressed={selected}
                              className="text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary"
                              onClick={() => setSelectedDeal(deal.id)}
                            >
                              {deal.title}
                            </button>
                          </h3>
                          <p className="mt-auto text-xl font-semibold tracking-tight tabular-nums">
                            {rupiah(deal.value)}
                          </p>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex -space-x-1">
                              {deal.team.map((member) => (
                                <Avatar
                                  key={member}
                                  name={member}
                                  size="sm"
                                  className={cx(
                                    "ring-2",
                                    deal.highlight
                                      ? "ring-ink"
                                      : "ring-surface",
                                  )}
                                />
                              ))}
                            </div>
                            <span
                              className={cx(
                                "text-xs font-medium",
                                deal.highlight
                                  ? "text-canvas/75"
                                  : "text-muted",
                              )}
                            >
                              {deal.stage}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Card>

              <Card
                aria-labelledby="crm-tasks-title"
                className="flex-1 content-start"
              >
                <div className="grid gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2
                        id="crm-tasks-title"
                        className="text-base font-semibold"
                      >
                        Tasks schedule
                      </h2>
                      <p className="text-sm text-muted">
                        Follow-ups planned with {info.firstName}
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        toast({
                          title: "Task added",
                          description: longDate(selectedDate),
                          variant: "success",
                        })
                      }
                    >
                      <Icon name="plus" className="size-4" />
                      New task
                    </Button>
                  </div>
                  <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_280px]">
                    <div className="grid content-start gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className="text-sm font-semibold"
                          aria-live="polite"
                        >
                          {monthNames[view.month]} {view.year}
                        </h3>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            aria-label="Previous month"
                            className={cx(iconButton, "size-8")}
                            onClick={() => shiftMonth(-1)}
                          >
                            <Icon name="prev" className="size-4" />
                          </button>
                          <button
                            type="button"
                            aria-label="Next month"
                            className={cx(iconButton, "size-8")}
                            onClick={() => shiftMonth(1)}
                          >
                            <Icon name="next" className="size-4" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-y-1 text-center">
                        {weekdays.map((weekday) => (
                          <span
                            key={weekday}
                            aria-hidden="true"
                            className="py-1 text-xs font-medium text-muted"
                          >
                            {weekday}
                          </span>
                        ))}
                        {cells.map((day, index) => {
                          if (day === null)
                            return <span key={`empty-${index}`} />;
                          const iso = isoDate(view.year, view.month, day);
                          const count = tasks[iso]?.length ?? 0;
                          const selected = iso === selectedDate;
                          return (
                            <span key={iso} className="flex justify-center">
                              <button
                                type="button"
                                aria-pressed={selected}
                                aria-label={`${monthNames[view.month]} ${day}, ${count} ${count === 1 ? "task" : "tasks"}`}
                                className={cx(
                                  dayBase,
                                  selected
                                    ? daySelected
                                    : iso === TODAY
                                      ? dayToday
                                      : dayIdle,
                                )}
                                onClick={() => setSelectedDate(iso)}
                              >
                                <span>{day}</span>
                                {count > 0 && (
                                  <span
                                    aria-hidden="true"
                                    className={cx(
                                      "absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full",
                                      selected ? "bg-on-primary" : "bg-success",
                                    )}
                                  />
                                )}
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div className="grid content-start gap-3 border-line md:border-l md:pl-6">
                      <h3 className="text-sm font-semibold">
                        {longDate(selectedDate)}
                      </h3>
                      {selectedTasks.length > 0 ? (
                        <ul role="list" className="grid gap-2">
                          {selectedTasks.map((task) => (
                            <li
                              key={task.time + task.title}
                              className="flex gap-3 rounded-xl border border-line p-3"
                            >
                              <span className="w-12 shrink-0 text-xs font-medium text-muted tabular-nums">
                                {task.time}
                              </span>
                              <span className="grid gap-0.5">
                                <span className="text-sm font-medium">
                                  {task.title}
                                </span>
                                <span className="text-xs text-muted">
                                  {task.kind}
                                </span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="rounded-xl border border-dashed border-line p-4 text-sm text-muted">
                          No tasks on this day.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex min-w-0 flex-col gap-6">
              <Card aria-labelledby="crm-profile-name">
                <div className="grid justify-items-center gap-4 text-center">
                  <Avatar
                    name="Rina Kusuma"
                    size="lg"
                    className="size-16! text-xl!"
                  />
                  <div className="grid gap-1">
                    <h2 id="crm-profile-name" className="text-lg font-semibold">
                      {customerName}
                    </h2>
                    <p className="text-sm text-muted">Head of Procurement</p>
                    <p className="flex items-center justify-center gap-2 text-sm font-medium">
                      PT Nusantara Logistik
                      <Badge variant="success">Key account</Badge>
                    </p>
                  </div>
                  <div className="flex justify-center gap-3">
                    {profileActions.map((action) => (
                      <Tooltip key={action.id} content={action.label}>
                        <button
                          type="button"
                          aria-label={action.label}
                          className={iconButton}
                          onClick={() =>
                            toast({
                              title: action.label,
                              description: `${customerName}, PT Nusantara Logistik`,
                            })
                          }
                        >
                          <Icon name={action.icon} />
                        </button>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </Card>

              <Card aria-labelledby="crm-details-title">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <h2
                      id="crm-details-title"
                      className="text-base font-semibold"
                    >
                      Detailed information
                    </h2>
                    <Drawer
                      title="Edit customer details"
                      onClose={handleDrawerClose}
                      trigger={
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setDraft(info)}
                        >
                          <Icon name="pencil" className="size-4" />
                          Edit
                        </Button>
                      }
                      footer={
                        <>
                          <Button
                            variant="secondary"
                            type="submit"
                            value="cancel"
                          >
                            Cancel
                          </Button>
                          <Button type="submit" value="save">
                            Save changes
                          </Button>
                        </>
                      }
                    >
                      <div className="grid gap-4">
                        {formFields.map((field) => (
                          <Input
                            key={field.key}
                            label={field.label}
                            type={field.type}
                            name={field.key}
                            value={draft[field.key]}
                            onChange={(event) =>
                              setDraft({
                                ...draft,
                                [field.key]: event.target.value,
                              })
                            }
                          />
                        ))}
                      </div>
                    </Drawer>
                  </div>
                  <dl className="divide-y divide-line">
                    {infoRows.map((row) => (
                      <div
                        key={row.key}
                        className="flex items-center justify-between gap-4 py-3"
                      >
                        <dt className="shrink-0 text-muted">{row.label}</dt>
                        <dd
                          data-field={row.key}
                          className="min-w-0 truncate text-right font-medium"
                        >
                          {info[row.key]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Card>

              <Card aria-labelledby="crm-funnel-title">
                <div className="grid gap-4">
                  <div>
                    <h2
                      id="crm-funnel-title"
                      className="text-base font-semibold"
                    >
                      Stage funnel
                    </h2>
                    <p className="text-sm text-muted">Open pipeline by stage</p>
                  </div>
                  <Tabs
                    defaultValue="weighted"
                    items={funnel.map((mode) => ({
                      value: mode.value,
                      label: mode.label,
                      content: (
                        <div className="grid gap-4">
                          <div>
                            <p className="text-2xl font-semibold tracking-tight tabular-nums">
                              {mode.total}
                            </p>
                            <p className="text-xs text-muted">{mode.caption}</p>
                          </div>
                          <ol
                            className="grid gap-3"
                            aria-label={`${mode.caption} by stage`}
                          >
                            {mode.steps.map((step, index) => (
                              <li key={step.label} className="grid gap-1.5">
                                <div className="flex items-baseline justify-between gap-3">
                                  <span className="font-medium">
                                    {step.label}
                                    <span className="ml-2 text-xs font-normal text-muted">
                                      {step.deals} deals
                                    </span>
                                  </span>
                                  <span className="font-semibold tabular-nums">
                                    {step.value}
                                  </span>
                                </div>
                                <div className="h-6 rounded-md bg-subtle">
                                  <div
                                    className={cx(
                                      "mx-auto h-6 rounded-md",
                                      barTones[index],
                                    )}
                                    style={{ width: `${step.width}%` }}
                                  />
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      ),
                    }))}
                  />
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
