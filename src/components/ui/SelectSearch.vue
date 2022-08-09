<template>
  <v-select
    class="v-select"
    :components="{ Deselect, OpenIndicator }"
    :options="props.options"
    :class="[statusClass]"
    :loading="props.loading"
    :filterable="props.filterable"
    v-model="selected"
    v-on:open="handleOpen"
    v-on:search="handleSearch"
  />
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import vSelect from 'vue-select';
import {
  Close as Deselect,
  ChevronDown as OpenIndicator,
} from '@/components/icon';

const props = defineProps({
  modelValue: null,
  options: Array,
  status: String,
  loading: {
    type: Boolean,
    default: false,
  },
  filterable: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['update:modelValue', 'open', 'search']);

const selected = ref(props.modelValue);

const statusClass = computed(() => {
  const statuses = {
    normal: '',
    error: 'error',
  };

  return statuses[props.status ?? 'normal'];
});

const handleOpen = () => emit('open');
const handleSearch = (val) => emit('search', val);

watch(selected, () => {
  emit('update:modelValue', selected.value);
});
</script>

<style>
.v-select .vs__dropdown-toggle {
  @apply bg-white border border-gray-200 px-3 py-2 rounded hover:border-gray-300;
}
.v-select.vs--open {
  @apply outline-none ring-2 ring-primary-200 rounded;
}
.v-select.error .vs__dropdown-toggle {
  @apply bg-white border border-danger-500 px-3 py-2 rounded hover:border-danger-400 focus:outline-none focus:ring-2 focus:ring-danger-200;
}
.v-select.error.vs--open {
  @apply outline-none ring-2 ring-danger-200 rounded;
}
.v-select .vs__search::placeholder {
  @apply text-gray-400;
}
.v-select .vs__selected-options,
.v-select .vs__selected,
.v-select .vs__search,
.v-select .vs__search:focus,
.v-select .vs__actions,
.v-select .vs__dropdown-menu,
.v-select .vs__search::placeholder {
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
