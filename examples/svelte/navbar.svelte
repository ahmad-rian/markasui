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
    { label: "Docs", href: "/docs", active: true },
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
          label: "Navigation",
          href: "/components/navigation",
          description: "Navbar, sidebar, tabs, menus",
          icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm4-13-2 6-6 2 2-6z",
        },
        {
          label: "Data display",
          href: "/components/data",
          description: "Table, card, badge, avatar",
          icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
        },
        {
          label: "Feedback",
          href: "/components/feedback",
          description: "Alert, progress, skeleton",
          icon: "M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
        },
        {
          label: "Effects",
          href: "/components/effects",
          description: "Aurora, beams, and grid patterns",
          icon: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
        },
      ],
    },
    {
      label: "Resources",
      children: [
        {
          label: "Templates",
          href: "/templates",
          description: "Full pages built from components",
          icon: "M3 4h18v6H3zM3 14h8v6H3zm12 0h6v6h-6z",
        },
        {
          label: "Changelog",
          href: "/changelog",
          description: "What shipped this week",
          icon: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
        },
        {
          label: "Community",
          href: "/community",
          description: "Ask and share on GitHub",
          icon: "M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm11 10v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8",
        },
      ],
    },
    { label: "Pricing", href: "/pricing" },
  ];

  const brandClass = "flex items-center gap-2 rounded-md";
  const logoClass = "size-6";
  const github =
    "inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink";
  const icon = "size-5";
</script>

<Navbar {links}>
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
    <a href="https://github.com" aria-label="GitHub" class={github}>
      <svg
        class={icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path
          d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.3-2.5-1-3.5.3-1.2.3-2.4 0-3.5 0 0-1 0-3 1.5a13.4 13.4 0 0 0-8 0C6 2 5 2 5 2c-.3 1.2-.3 2.4 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.4.5-.7 1-.9 1.7-.2.6-.2 1.2-.1 1.8v4M9 18c-4.5 2-5-2-7-2"
        />
      </svg>
    </a>
    <Button size="sm">Get started</Button>
  {/snippet}
</Navbar>
