<script lang="ts">
  import Footer, {
    type FooterVariant,
  } from "../../../components/footer/Footer.svelte";

  let {
    variant = "columns",
    withNewsletter = false,
  }: { variant?: FooterVariant; withNewsletter?: boolean } = $props();
  const columns = [
    { title: "Product", links: [{ label: "Docs", href: "/docs" }] },
    { links: [{ label: "Evil", href: " javascript:alert(1)" }] },
  ];
  const socials = [
    { label: "GitHub", href: "https://github.com", icon: "M0 0" },
  ];
</script>

{#snippet brand()}<strong>Markas</strong>{/snippet}
{#snippet actions()}<a href="/status">Status</a>{/snippet}
{#snippet newsletter()}<form aria-label="Custom form"></form>{/snippet}

<Footer
  {variant}
  {columns}
  {socials}
  {brand}
  {actions}
  newsletter={withNewsletter ? newsletter : undefined}
  description="Short line"
  heading="Ship it"
  copyright="© 2026"
  wordmark="Markas"
/>
