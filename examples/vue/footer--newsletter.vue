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
  {
    title: "Resources",
    links: [
      {
        label: "Docs",
        href: "/docs",
      },
      {
        label: "API reference",
        href: "/api-reference",
      },
      {
        label: "Changelog",
        href: "/changelog",
      },
      {
        label: "Status",
        href: "/status",
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
    label: "LinkedIn",
    href: "https://linkedin.com/rapi",
    icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z",
  },
];

const legal = [
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Terms",
    href: "/terms",
  },
  {
    label: "Cookies",
    href: "/cookies",
  },
];
</script>

<template>
  <Footer
    variant="newsletter"
    newsletter-description="Tax deadlines, payroll tips, and product updates. One email a month."
    copyright="© 2026 PT Rapi Teknologi Indonesia"
    description="Invoicing, payroll, and tax reports for Indonesian small businesses, in one tidy dashboard."
    :columns="columns"
    :socials="socials"
    :legal="legal"
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
