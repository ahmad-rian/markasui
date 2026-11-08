<script setup lang="ts">
import Avatar from "../../components/avatar/Avatar.vue";
import Button from "../../components/button/Button.vue";
import DropdownMenu from "../../components/dropdown-menu/DropdownMenu.vue";
import Navbar from "../../components/navbar/Navbar.vue";

const links = [
  { label: "Overview", href: "/overview", active: true },
  { label: "Projects", href: "/projects" },
  { label: "Reports", href: "/reports" },
];

const account = [
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Billing", href: "/billing" },
  { separator: true as const },
  { label: "Sign out", value: "sign-out", danger: true },
];
</script>

<template>
  <Navbar :links="links">
    <template #brand>
      <svg
        class="size-6 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m12 3-9 5 9 5 9-5-9-5z" />
        <path d="m3 13 9 5 9-5" />
      </svg>
      <span>Acme</span>
    </template>
    <template #actions>
      <Button
        variant="ghost"
        aria-label="Notifications, 3 unread"
        class="relative size-9 px-0"
      >
        <svg
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        <span
          class="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"
        />
      </Button>
      <DropdownMenu
        label="Account"
        :items="account"
        class="[&>button]:h-9 [&>button]:gap-1 [&>button]:border-0 [&>button]:px-1"
      >
        <template #trigger>
          <Avatar name="Siti Aminah" size="sm" />
        </template>
      </DropdownMenu>
    </template>
  </Navbar>
</template>
