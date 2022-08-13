<template>
  <div>
    <h2 class="font-bold text-2xl mb-4">
      {{ props.title || 'Something Error' }}
    </h2>
    <p class="leading-loose">
      {{ props.text || 'Your requested content cannot be displayed' }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  text: String,
});
</script>
