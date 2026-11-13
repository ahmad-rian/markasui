<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Tooltip from "../../components/tooltip/Tooltip.svelte";
</script>

<div class="flex justify-center py-10">
  <div
    class="flex items-center gap-1 rounded-lg border border-line bg-surface p-1"
  >
    <Tooltip content="Bold (Ctrl+B)">
      <Button variant="ghost" size="sm" aria-label="Bold" class="size-8 px-0">
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
          <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" />
        </svg>
      </Button>
    </Tooltip>
    <Tooltip content="Italic (Ctrl+I)">
      <Button variant="ghost" size="sm" aria-label="Italic" class="size-8 px-0">
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
          <path d="M19 4h-9M14 20H5M15 4 9 20" />
        </svg>
      </Button>
    </Tooltip>
    <Tooltip content="Insert link (Ctrl+K)">
      <Button
        variant="ghost"
        size="sm"
        aria-label="Insert link"
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
          <path
            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          />
        </svg>
      </Button>
    </Tooltip>
  </div>
</div>
