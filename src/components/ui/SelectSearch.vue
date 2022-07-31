<template>
  <v-select
    :components="{ Deselect, OpenIndicator }"
    :options="props.options"
    v-model="selected"
    class="v-select"
  />
</template>

<script setup>
import { ref, watch } from 'vue';
import vSelect from 'vue-select';
import {
  Close as Deselect,
  ChevronDown as OpenIndicator,
} from '@/components/icon';

const props = defineProps({
  modelValue: Object,
  options: Array,
});
const emit = defineEmits(['update:modelValue']);

const selected = ref(props.modelValue);

watch(selected, () => {
  emit('update:modelValue', selected.value);
});
</script>

<style>
.v-select .vs__search::placeholder,
.v-select .vs__dropdown-toggle {
  @apply bg-white border border-gray-200 px-3 py-2 rounded hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-200;
}

.v-select .vs__selected-options,
.v-select .vs__selected,
.v-select .vs__search,
.v-select .vs__search:focus,
.v-select .vs__actions,
.v-select .vs__dropdown-menu {
  @apply p-0 m-0;
}

.v-select .vs__dropdown-menu {
  @apply border border-gray-200 shadow-none border-t;
}
.v-select .vs__dropdown-option {
  @apply px-3 py-2;
}
.v-select .vs__dropdown-option--highlight {
  @apply bg-primary-500;
}
.v-select .vs__dropdown-option--highlight {
  @apply bg-primary-500;
}
.v-select .vs__no-options {
  @apply px-3 py-2;
}
.v-select .vs__clear {
  @apply flex items-center mr-1;
}
.v-select.vs--loading .vs__open-indicator {
  @apply hidden;
}
.v-select .vs__spinner {
  @apply ml-2 w-5 h-5 border-4 border-gray-200 border-l-primary-400;
}
</style>
