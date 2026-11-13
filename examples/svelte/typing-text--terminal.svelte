<script lang="ts">
  import TypingText from "../../components/typing-text/TypingText.svelte";
</script>

<div class="overflow-hidden rounded-xl border border-line bg-surface">
  <div class="flex items-center gap-1.5 border-b border-line px-4 py-3">
    <span class="size-2.5 rounded-full bg-danger"></span>
    <span class="size-2.5 rounded-full bg-warning"></span>
    <span class="size-2.5 rounded-full bg-success"></span>
  </div>
  <p class="p-4 font-mono text-sm text-ink">
    <span class="text-muted">{"$ "}</span><TypingText
      words={["pnpm dlx markasui add marquee"]}
      loop={false}
      typeSpeed={50}
    />
  </p>
</div>
