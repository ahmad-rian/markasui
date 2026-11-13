<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Input from "../../components/input/Input.svelte";
  import Separator from "../../components/separator/Separator.svelte";
</script>

<div class="space-y-4 rounded-xl border border-line bg-surface p-4">
  <Button variant="secondary" class="w-full">Continue with GitHub</Button>
  <Separator label="or" />
  <Input type="email" label="Email" placeholder="you@example.com" />
</div>
