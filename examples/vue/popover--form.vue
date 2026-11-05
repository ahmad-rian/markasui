<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Input from "../../components/input/Input.vue";
import Popover from "../../components/popover/Popover.vue";
</script>

<template>
  <div class="flex justify-center">
    <Popover label="Dimensions" align="center">
      <form class="grid gap-3">
        <p class="font-medium text-ink">Image size</p>
        <div class="grid grid-cols-2 gap-3">
          <Input
            name="width"
            label="Width"
            placeholder="1200"
            inputmode="numeric"
          />
          <Input
            name="height"
            label="Height"
            placeholder="630"
            inputmode="numeric"
          />
        </div>
        <Button type="submit" size="sm">Apply</Button>
      </form>
    </Popover>
  </div>
</template>
