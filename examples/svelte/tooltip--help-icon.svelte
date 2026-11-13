<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Tooltip from "../../components/tooltip/Tooltip.svelte";
</script>

<div class="flex items-center justify-center gap-1 py-10">
  <span class="text-sm font-medium text-ink">Tax ID</span>
  <Tooltip
    content="Your 15 digit tax number. It appears on every invoice we send you."
  >
    <Button
      variant="ghost"
      size="sm"
      aria-label="About tax ID"
      class="size-8 px-0"
    >
      <svg
        class="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    </Button>
  </Tooltip>
</div>
