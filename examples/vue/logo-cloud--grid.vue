<script setup lang="ts">
import LogoCloud from "../../components/logo-cloud/LogoCloud.vue";

const logos = [
  {
    name: "Nusantara Labs",
    path: "M12 2 21 7v10l-9 5-9-5V7Z",
    href: "#",
  },
  {
    name: "Kopi Kita",
    path: "M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Z",
    href: "#",
  },
  {
    name: "Sagara",
    path: "M2 13c3-4 6-4 10 0s7 4 10 0v7H2Z",
    href: "#",
  },
  {
    name: "Rimba",
    path: "M12 3 22 21H2Z",
    href: "#",
  },
  {
    name: "Laju",
    path: "M13 2 4 14h7l-1 8 9-12h-7Z",
    href: "#",
  },
  {
    name: "Teduh",
    path: "M12 2 22 12 12 22 2 12Z",
    href: "#",
  },
];
</script>

<template>
  <LogoCloud
    variant="grid"
    title="Powering products you use every day"
    :logos="logos"
  />
</template>
