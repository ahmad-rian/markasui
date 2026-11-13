<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Textarea from "../../components/textarea/Textarea.svelte";
</script>

<div class="grid gap-3 rounded-lg border border-line bg-surface p-4">
  <Textarea
    name="comment"
    aria-label="Comment"
    rows={3}
    placeholder="Leave a comment"
  />
  <div class="flex items-center justify-between gap-4">
    <p class="text-sm text-muted">Markdown is supported.</p>
    <div class="flex gap-2">
      <Button variant="ghost" size="sm">Cancel</Button>
      <Button size="sm">Comment</Button>
    </div>
  </div>
</div>
