<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    required?: boolean;
    optional?: boolean;
    requiredLabel?: string;
    optionalLabel?: string;
  }>(),
  {
    required: false,
    optional: false,
    requiredLabel: "required",
    optionalLabel: "Optional",
  },
);

const base = "text-sm font-medium text-ink";
const marker = "ms-0.5 text-danger";
const srOnly = "sr-only";
const optionalClass = "font-normal text-muted";
</script>

<template>
  <label :class="base"
    ><slot /><template v-if="props.required"
      ><span aria-hidden="true" :class="marker">*</span>{{ " "
      }}<span :class="srOnly">{{ props.requiredLabel }}</span></template
    ><template v-else-if="props.optional"
      >{{ " "
      }}<span :class="optionalClass">{{ props.optionalLabel }}</span></template
    ></label
  >
</template>
