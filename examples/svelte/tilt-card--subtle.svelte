<script lang="ts">
  import TiltCard from "../../components/tilt-card/TiltCard.svelte";

  const stage = "grid place-items-center py-6";
  const card = "w-72 border border-line bg-surface p-6";
  const head = "flex items-center justify-between";
  const plan = "text-base font-semibold text-ink";
  const badge =
    "rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-ink";
  const price = "mt-3 text-3xl font-semibold text-ink";
  const per = "text-sm font-normal text-muted";
  const list = "mt-4 grid gap-2 text-sm text-ink";
  const item = "flex items-center gap-2";
  const check = "size-4 text-success";
  const link =
    "mt-6 inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-on-primary transition-colors duration-150 ease-out hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  const features = ["Unlimited projects", "Custom domains", "Priority support"];
</script>

<div class={stage}>
  <TiltCard maxAngle={4} glare={false} class={card}>
    <div class={head}>
      <p class={plan}>Pro</p>
      <span class={badge}>Popular</span>
    </div>
    <p class={price}>$12 <span class={per}>per month</span></p>
    <ul class={list}>
      {#each features as feature (feature)}<li class={item}>
          <svg
            class={check}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12 5 5 9-10" /></svg
          >{feature}
        </li>{/each}
    </ul>
    <a href="#pricing" class={link}>Choose Pro</a>
  </TiltCard>
</div>
