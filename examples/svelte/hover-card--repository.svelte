<script lang="ts">
  import HoverCard from "../../components/hover-card/HoverCard.svelte";
</script>

<div class="grid gap-2 rounded-lg border border-line bg-surface p-4">
  <p class="text-sm text-muted">Built on top of</p>
  <div>
    <HoverCard>
      <a
        href="https://github.com/markasui/markasui"
        class="rounded-sm text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >markasui/markasui</a
      >
      {#snippet content()}
        <div class="grid gap-3">
          <div class="grid gap-1">
            <p class="font-medium text-ink">markasui/markasui</p>
            <p class="text-muted">
              Copy and paste UI components with identical markup in three
              frameworks.
            </p>
          </div>
          <div class="flex items-center gap-4 text-xs text-muted">
            <span class="inline-flex items-center gap-1">
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
                <path
                  d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"
                />
              </svg>
              1.2k stars
            </span>
            <span>MIT license</span>
            <span>Updated today</span>
          </div>
        </div>
      {/snippet}
    </HoverCard>
  </div>
</div>
