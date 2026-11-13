<script lang="ts">
  import UnderlineLink from "../../components/underline-link/UnderlineLink.svelte";
</script>

<ul class="grid gap-3 text-base font-medium text-ink">
  <li>
    <UnderlineLink href="#">Grow from the center</UnderlineLink>
  </li>
  <li>
    <UnderlineLink href="#" variant="slide"
      >Slide in from the left</UnderlineLink
    >
  </li>
  <li>
    <UnderlineLink href="#" variant="comes-in-goes-out"
      >Comes in, goes out</UnderlineLink
    >
  </li>
  <li>
    <UnderlineLink href="#" variant="goes-out-comes-in"
      >Goes out, comes in</UnderlineLink
    >
  </li>
  <li>
    <UnderlineLink href="#" variant="scribble">Drawn by hand</UnderlineLink>
  </li>
</ul>
