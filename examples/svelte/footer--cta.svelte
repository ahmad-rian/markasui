<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Footer from "../../components/footer/Footer.svelte";

  const columns = [
    {
      links: [
        {
          label: "Docs",
          href: "/docs",
        },
        {
          label: "Components",
          href: "/components",
        },
        {
          label: "Templates",
          href: "/templates",
        },
        {
          label: "Changelog",
          href: "/changelog",
        },
      ],
    },
  ];

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/markasui",
      icon: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4M9 18c-4.51 2-5-2-7-2",
    },
    {
      label: "X",
      href: "https://x.com/markasui",
      icon: "M4 4l11.7 16H20L8.3 4H4zM4 20l6.8-6.8M13.2 10.8 20 4",
    },
  ];

  const legal = [
    {
      label: "Privacy",
      href: "/privacy",
    },
    {
      label: "Terms",
      href: "/terms",
    },
  ];
</script>

<Footer
  variant="cta"
  heading="Ship your next interface this week"
  description="Accessible components and full page templates for Blade, React, and Vue. Free and open source."
  copyright="© 2026 MarkasUI"
  {columns}
  {socials}
  {legal}
  >{#snippet brand()}<svg
      class="size-7 shrink-0"
      viewBox="0 0 1464 1430"
      aria-hidden="true"
    >
      <polygon class="fill-ink/15" points="354,578 1256,138 1171,430 268,868" />
      <polygon class="fill-ink/50" points="553,443 1455,3 1370,295 467,733" />
      <polygon
        class="fill-success/30"
        points="421,762 1325,318 1240,611 336,1050"
      />
      <polygon
        class="fill-ink/25"
        points="265,1073 1169,629 1084,922 180,1362"
      />
      <polygon class="fill-ink/75" points="93,965 997,521 912,814 8,1253" />
      <polygon
        class="fill-success"
        points="347,1135 1251,691 1166,984 262,1424"
      /></svg
    >MarkasUI{/snippet}{#snippet actions()}<Button>Browse components</Button
    ><Button variant="secondary">Read the docs</Button>{/snippet}</Footer
>
