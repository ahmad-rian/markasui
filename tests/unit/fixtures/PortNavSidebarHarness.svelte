<script lang="ts">
  import Sidebar, {
    type SidebarSection,
  } from "../../../components/sidebar/Sidebar.svelte";

  let { navLabel }: { navLabel?: string } = $props();

  const sections: SidebarSection[] = [
    {
      items: [
        { label: "Home", href: "/", icon: "M3 3h18", active: true },
        { label: "Inbox", href: "/inbox", icon: "M3 3h18", badge: 3 },
        { label: "Danger", href: "javascript:alert(1)" },
        { label: "Locked", href: "/locked", disabled: true },
      ],
    },
    {
      title: "Workspace",
      items: [
        {
          label: "Projects",
          icon: "M3 3h18",
          children: [{ label: "Mobile app", href: "/projects/mobile" }],
        },
      ],
    },
  ];

  let collapsed = $state(false);
</script>

<Sidebar bind:collapsed {sections} {navLabel} class="h-96" data-testid="shell">
  {#snippet header()}<span>Brand</span>{/snippet}
  {#snippet footer()}<span>Profile</span>{/snippet}
  <main>Page</main>
</Sidebar>
<output>{collapsed ? "rail" : "full"}</output>
