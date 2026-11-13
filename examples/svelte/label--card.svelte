<script lang="ts">
  import Label from "../../components/label/Label.svelte";

  const card =
    "flex items-start gap-3 rounded-lg border border-line bg-surface p-4 has-checked:border-primary has-checked:bg-primary-soft";
  const box = "mt-0.5 size-4 shrink-0 accent-primary";
  const text = "grid gap-0.5";
  const description = "font-normal text-muted";
</script>

<div class="grid gap-3">
  <Label class={card}>
    <input type="checkbox" name="backups" checked class={box} />
    <span class={text}>
      <span>Daily backups</span>
      <span class={description}>
        Keep 30 days of snapshots for every project.
      </span>
    </span>
  </Label>
  <Label class={card}>
    <input type="checkbox" name="audit_log" class={box} />
    <span class={text}>
      <span>Audit log</span>
      <span class={description}>
        Record every sign-in and permission change.
      </span>
    </span>
  </Label>
</div>
