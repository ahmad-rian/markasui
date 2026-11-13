<script lang="ts">
  import Progress from "../../components/progress/Progress.svelte";
</script>

<div class="grid gap-5">
  <Progress label="Onboarding tasks" value={3} max={5} />
  <Progress label="Lessons watched" value={7} max={12} />
</div>
