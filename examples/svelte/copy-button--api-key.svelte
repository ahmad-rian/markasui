<script lang="ts">
  import CopyButton from "../../components/copy-button/CopyButton.svelte";
</script>

<div class="grid gap-2">
  <p class="text-sm font-medium text-ink">Secret key</p>
  <div class="flex gap-2">
    <input
      aria-label="Secret key"
      readonly
      value="sk_live_51Hx9aT2eZvKYlo2C"
      class="h-10 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 font-mono text-sm text-ink"
    />
    <CopyButton text="sk_live_51Hx9aT2eZvKYlo2C" variant="secondary">
      Copy key
    </CopyButton>
  </div>
  <p class="text-sm text-muted">
    Keep this key private. It grants full access to your account.
  </p>
</div>
