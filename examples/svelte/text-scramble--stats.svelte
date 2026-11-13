<script lang="ts">
  import TextScramble from "../../components/text-scramble/TextScramble.svelte";

  const stats = [
    { label: "Revenue", value: "Rp 12,4 M", delay: 0 },
    { label: "Uptime", value: "99.98%", delay: 150 },
    { label: "Active teams", value: "1,284", delay: 300 },
  ];
</script>

<div class="grid grid-cols-3 gap-3">
  {#each stats as stat (stat.label)}
    <div class="rounded-xl border border-line bg-surface p-4">
      <p class="text-xs text-muted">{stat.label}</p>
      <p class="mt-1 text-xl font-semibold text-ink">
        <TextScramble
          text={stat.value}
          trigger="view"
          charset="digits"
          delay={stat.delay}
        />
      </p>
    </div>
  {/each}
</div>
