<template>
  <router-link
    :to="props.href"
    class="text-info-500 cursor-pointer hover:text-info-600 hover:underline dark:text-info-400"
  >
    <slot>
      {{ props.label }}
    </slot>
  </router-link>
</template>

<script setup>
const props = defineProps({
  href: null,
  label: String,
});
</script>
