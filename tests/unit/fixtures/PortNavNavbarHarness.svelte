<script lang="ts">
  import Navbar, {
    type NavbarLink,
  } from "../../../components/navbar/Navbar.svelte";

  let {
    links,
    id,
    menuLabel,
    onkeydown,
  }: {
    links: NavbarLink[];
    id?: string;
    menuLabel?: string;
    onkeydown?: (event: KeyboardEvent) => void;
  } = $props();
</script>

<Navbar
  {links}
  {id}
  {menuLabel}
  {onkeydown}
  variant="floating"
  sticky
  class="mx-auto"
  data-testid="navbar"
>
  {#snippet brand()}<a href="/">Acme</a>{/snippet}
  {#snippet actions()}<button type="button">Sign in</button>{/snippet}
</Navbar>
