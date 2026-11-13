<script lang="ts">
  import GradientBorder from "../../components/gradient-border/GradientBorder.svelte";
</script>

<div class="p-6">
  <GradientBorder radius="lg" speed="slow" glow>
    <label class="grid gap-1 p-3">
      <span class="text-sm font-medium text-ink"> Ask the assistant </span>
      <input
        type="text"
        placeholder="Summarize last week's tickets"
        class="h-9 rounded-md bg-surface text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      />
    </label>
  </GradientBorder>
</div>
