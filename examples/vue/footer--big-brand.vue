<script setup lang="ts">
import Footer from "../../components/footer/Footer.vue";

const columns = [
  {
    title: "Product",
    links: [
      {
        label: "Invoicing",
        href: "/invoicing",
      },
      {
        label: "Payroll",
        href: "/payroll",
      },
      {
        label: "Expenses",
        href: "/expenses",
      },
      {
        label: "Integrations",
        href: "/integrations",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Careers",
        href: "/careers",
      },
      {
        label: "Press",
        href: "/press",
      },
      {
        label: "Contact",
        href: "/contact",
      },
    ],
  },
];

const socials = [
  {
    label: "X",
    href: "https://x.com/rapi",
    icon: "M4 4l11.7 16H20L8.3 4H4zM4 20l6.8-6.8M13.2 10.8 20 4",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/rapi",
    icon: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01",
  },
  {
    label: "GitHub",
    href: "https://github.com/rapi",
    icon: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4M9 18c-4.51 2-5-2-7-2",
  },
];
</script>

<template>
  <Footer
    variant="big-brand"
    wordmark="Rapi"
    copyright="© 2026 PT Rapi Teknologi Indonesia"
    description="Built in Bandung for businesses across the archipelago."
    :columns="columns"
    :socials="socials"
  >
    <template #brand
      ><svg
        class="size-6 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M6 20V4h7a5 5 0 0 1 0 10H6m7 0 5 6" /></svg
      >Rapi</template
    >
  </Footer>
</template>
