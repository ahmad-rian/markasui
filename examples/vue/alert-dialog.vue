<script setup lang="ts">
import AlertDialog from "../../components/alert-dialog/AlertDialog.vue";
import Button from "../../components/button/Button.vue";
</script>

<template>
  <AlertDialog title="Publish this post?">
    <template #trigger>
      <Button>Publish post</Button>
    </template>

    Your post will be visible to everyone who follows your blog.
  </AlertDialog>
</template>
