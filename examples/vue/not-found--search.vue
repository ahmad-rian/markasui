<script setup lang="ts">
import NotFound from "../../components/not-found/NotFound.vue";

const links = [
  { label: "Documentation", href: "/docs" },
  { label: "Components", href: "/components" },
  { label: "Pricing", href: "/pricing" },
  { label: "Changelog", href: "/changelog" },
];
</script>

<template>
  <NotFound
    variant="search"
    description="Try searching for the page, or pick one of the popular pages below."
    :links="links"
  />
</template>
