<script lang="ts">
  import AlertDialog from "../../components/alert-dialog/AlertDialog.svelte";
  import Button from "../../components/button/Button.svelte";
</script>

<div class="flex justify-center">
  <AlertDialog title="Sign out of all devices?" actionLabel="Sign out">
    {#snippet trigger()}
      <Button variant="ghost">
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
            d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"
          />
        </svg>
        Sign out everywhere
      </Button>
    {/snippet}
    You will need to sign in again on your phone, tablet, and other browsers.
  </AlertDialog>
</div>
