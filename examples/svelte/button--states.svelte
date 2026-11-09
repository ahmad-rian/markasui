<script lang="ts">
  import Button from "../../components/button/Button.svelte";
</script>

<div class="flex flex-wrap items-center justify-center gap-3">
  <Button>Default</Button>
  <Button disabled>Disabled</Button>
  <Button disabled aria-busy="true">
    <svg
      class="size-4 animate-spin motion-reduce:animate-none"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.2-8.56" />
    </svg>
    Saving
  </Button>
</div>
