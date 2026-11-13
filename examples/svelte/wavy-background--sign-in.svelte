<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Input from "../../components/input/Input.svelte";
  import WavyBackground from "../../components/wavy-background/WavyBackground.svelte";
</script>

<WavyBackground
  variant="layered"
  color="success"
  waves={3}
  class="rounded-xl border border-line bg-canvas px-6 pt-8 pb-16"
>
  <form
    class="mx-auto grid max-w-80 gap-4 rounded-xl border border-line bg-surface p-6"
  >
    <div class="grid gap-1">
      <h3 class="text-lg font-semibold text-ink">Welcome back</h3>
      <p class="text-sm text-muted">Sign in to continue to your workspace.</p>
    </div>
    <Input label="Email" type="email" placeholder="you@company.com" />
    <Input label="Password" type="password" />
    <Button type="submit">Sign in</Button>
  </form>
</WavyBackground>
