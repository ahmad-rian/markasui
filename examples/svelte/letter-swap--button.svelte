<script lang="ts">
  import LetterSwap from "../../components/letter-swap/LetterSwap.svelte";
</script>

<div class="flex flex-wrap items-center gap-3">
  <button
    type="button"
    class="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
  >
    <LetterSwap text="Start free trial" mode="pingpong" />
  </button>
  <button
    type="button"
    class="inline-flex h-10 items-center rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
  >
    <LetterSwap text="Book a demo" direction="down" />
  </button>
</div>
