<script setup lang="ts">
import UnderlineLink from "../../components/underline-link/UnderlineLink.vue";
</script>

<template>
  <footer
    class="grid grid-cols-2 gap-6 rounded-xl border border-line bg-surface p-6 text-sm"
  >
    <div>
      <p class="font-medium text-ink">Product</p>
      <ul class="mt-3 grid gap-2 text-muted">
        <li>
          <UnderlineLink href="#" variant="slide">Components</UnderlineLink>
        </li>
        <li>
          <UnderlineLink href="#" variant="slide">Templates</UnderlineLink>
        </li>
        <li>
          <UnderlineLink href="#" variant="slide">Changelog</UnderlineLink>
        </li>
      </ul>
    </div>
    <div>
      <p class="font-medium text-ink">Community</p>
      <ul class="mt-3 grid gap-2 text-muted">
        <li><UnderlineLink href="#" variant="slide">GitHub</UnderlineLink></li>
        <li><UnderlineLink href="#" variant="slide">Discord</UnderlineLink></li>
        <li>
          <UnderlineLink href="#" variant="slide">Showcase</UnderlineLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
