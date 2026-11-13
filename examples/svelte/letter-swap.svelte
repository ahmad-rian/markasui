<script lang="ts">
  import LetterSwap from "../../components/letter-swap/LetterSwap.svelte";
</script>

<header
  class="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-3"
>
  <span class="text-sm font-semibold text-ink">Markas</span>
  <nav
    aria-label="Main"
    class="flex items-center gap-5 text-sm font-medium text-muted"
  >
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a
      href="#"
      class="rounded-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <LetterSwap text="Products" />
    </a>
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a
      href="#"
      class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <LetterSwap text="Pricing" />
    </a>
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a
      href="#"
      class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <LetterSwap text="Docs" />
    </a>
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a
      href="#"
      class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <LetterSwap text="Blog" />
    </a>
  </nav>
</header>
