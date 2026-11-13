<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Navbar from "../../components/navbar/Navbar.svelte";

  const logo = [
    { fill: "fill-ink/15", points: "354,578 1256,138 1171,430 268,868" },
    { fill: "fill-ink/55", points: "553,443 1455,3 1370,295 467,733" },
    { fill: "fill-success/35", points: "421,762 1325,318 1240,611 336,1050" },
    { fill: "fill-ink/30", points: "265,1073 1169,629 1084,922 180,1362" },
    { fill: "fill-ink/80", points: "93,965 997,521 912,814 8,1253" },
    { fill: "fill-success", points: "347,1135 1251,691 1166,984 262,1424" },
  ];

  const links = [
    { label: "Docs", href: "/docs" },
    {
      label: "Components",
      children: [
        {
          label: "Forms",
          href: "/components/forms",
          description: "Input, select, checkbox, and more",
          icon: "M3 7h18v10H3zM7 12h.01M11 12h6",
        },
        {
          label: "Overlays",
          href: "/components/overlays",
          description: "Modal, drawer, popover, toast",
          icon: "M8 8h12v12H8zM4 16V4h12",
        },
        {
          label: "Effects",
          href: "/components/effects",
          description: "Aurora, beams, and grid patterns",
          icon: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
        },
      ],
    },
    { label: "Templates", href: "/templates", active: true },
    { label: "Pricing", href: "/pricing" },
  ];

  const stage =
    "relative isolate overflow-hidden rounded-2xl border border-line bg-canvas bg-[radial-gradient(45%_70%_at_12%_0%,color-mix(in_oklab,var(--color-success)_30%,transparent),transparent),radial-gradient(40%_60%_at_90%_20%,color-mix(in_oklab,var(--color-ink)_12%,transparent),transparent)] px-3 pt-4 pb-14";
  const grid =
    "absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-size-[32px_32px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]";
  const pill =
    "mx-auto max-w-3xl rounded-[1.75rem]! border-line/70! bg-surface/60! backdrop-blur-xl [&>div:first-child]:pr-2 [&>div:first-child]:pl-5 [&>div>nav>span]:rounded-full [&>div>nav_li>:first-child]:rounded-full";
  const brandClass = "flex items-center gap-2 rounded-full";
  const logoClass = "size-6";
  const cta = "rounded-full! pr-2.5!";
  const arrow = "size-4";
  const hero = "mx-auto grid max-w-md gap-3 pt-14 text-center";
  const title = "text-3xl font-semibold tracking-tight text-balance text-ink";
  const lead = "text-sm text-muted text-pretty";
</script>

<div class={stage}>
  <div aria-hidden="true" class={grid}></div>
  <Navbar {links} variant="floating" class={pill}>
    {#snippet brand()}
      <a href="/" class={brandClass}>
        <svg class={logoClass} viewBox="0 0 1464 1430" aria-hidden="true">
          {#each logo as shape (shape.points)}
            <polygon class={shape.fill} points={shape.points} />
          {/each}
        </svg>
        <span>MarkasUI</span>
      </a>
    {/snippet}
    {#snippet actions()}
      <Button size="sm" class={cta}>
        Get started
        <svg
          class={arrow}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </Button>
    {/snippet}
  </Navbar>
  <div class={hero}>
    <h2 class={title}>Copy, paste, and ship it today</h2>
    <p class={lead}>
      A glass pill that floats over the page. The highlight slides to whatever
      you point at.
    </p>
  </div>
</div>
