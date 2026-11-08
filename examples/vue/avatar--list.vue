<script setup lang="ts">
import Avatar from "../../components/avatar/Avatar.vue";
</script>

<template>
  <ul class="divide-y divide-line rounded-xl border border-line bg-surface">
    <li class="flex items-center gap-3 px-4 py-3">
      <Avatar name="Sarah Miller" size="sm" alt="" />
      <div class="min-w-0 flex-1">
        <p class="text-sm font-medium text-ink">Sarah Miller</p>
        <p class="text-xs text-muted">sarah@markasui.com</p>
      </div>
      <span class="text-xs text-muted">Owner</span>
    </li>
    <li class="flex items-center gap-3 px-4 py-3">
      <Avatar name="Budi Santoso" size="sm" alt="" />
      <div class="min-w-0 flex-1">
        <p class="text-sm font-medium text-ink">Budi Santoso</p>
        <p class="text-xs text-muted">budi@markasui.com</p>
      </div>
      <span class="text-xs text-muted">Editor</span>
    </li>
    <li class="flex items-center gap-3 px-4 py-3">
      <Avatar name="Siti Aminah" size="sm" alt="" />
      <div class="min-w-0 flex-1">
        <p class="text-sm font-medium text-ink">Siti Aminah</p>
        <p class="text-xs text-muted">siti@markasui.com</p>
      </div>
      <span class="text-xs text-muted">Viewer</span>
    </li>
  </ul>
</template>
