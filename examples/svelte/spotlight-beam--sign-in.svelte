<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Input from "../../components/input/Input.svelte";
  import SpotlightBeam from "../../components/spotlight-beam/SpotlightBeam.svelte";
</script>

<SpotlightBeam
  variant="top-right"
  intensity="soft"
  class="rounded-xl border border-line bg-canvas px-6 py-10"
>
  <form
    class="mx-auto grid max-w-80 gap-4 rounded-xl border border-line bg-surface p-6"
  >
    <div class="grid gap-1">
      <h3 class="text-lg font-semibold text-ink">Welcome back</h3>
      <p class="text-sm text-muted">Sign in to your team workspace.</p>
    </div>
    <Input label="Email" type="email" placeholder="you@company.com" />
    <Input label="Password" type="password" />
    <Button type="submit">Sign in</Button>
  </form>
</SpotlightBeam>
