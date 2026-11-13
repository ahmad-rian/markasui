<script lang="ts">
  import HeroHighlight from "../../components/hero-highlight/HeroHighlight.svelte";

  const features = [
    ["Instant search", "Find any doc, task, or message as you type."],
    ["Shared inbox", "Assign, snooze, and reply together."],
    ["Audit log", "See who changed what, and when."],
    ["Single sign-on", "SAML and SCIM on every paid plan."],
  ];
</script>

<HeroHighlight
  variant="grid"
  color="success"
  spacing={32}
  class="rounded-xl border border-line bg-canvas p-6"
>
  <div class="grid gap-5">
    <h3 class="text-xl font-semibold text-ink">
      Everything your team <mark>needs on day one</mark>
    </h3>
    <dl class="grid grid-cols-2 gap-4">
      {#each features as [title, text] (title)}
        <div class="grid gap-1 rounded-lg border border-line bg-surface p-3">
          <dt class="text-sm font-medium text-ink">{title}</dt>
          <dd class="text-sm text-muted">{text}</dd>
        </div>
      {/each}
    </dl>
  </div>
</HeroHighlight>
