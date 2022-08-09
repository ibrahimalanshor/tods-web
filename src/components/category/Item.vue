<template>
  <div class="border-b px-4 py-3 flex items-center justify-between">
    <ui-link
      :label="props.category.name"
      :href="{ name: 'Todo Category', params: { id: 1 } }"
    />
    <div class="flex items-center space-x-2">
      <button class="text-primary-500" v-on:click="handleEditCategory">
        <icon size="20">
          <edit-icon />
        </icon>
      </button>
      <button class="text-danger-500" v-on:click="handleDeleteCategory">
        <icon size="20">
          <delete-icon />
        </icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@vicons/utils';
import {
  EllipsisHorizontalOutline as ActionIcon,
  CreateOutline as EditIcon,
  TrashOutline as DeleteIcon,
} from '@vicons/ionicons5';
import { UiDropdown, UiLink } from '@/components/ui';

const props = defineProps({
  category: Object,
});
const emit = defineEmits([
  'check-category',
  'show-category',
  'edit-category',
  'delete-category',
]);

const handleEditCategory = () => emit('edit-category', props.category);
const handleDeleteCategory = () => emit('delete-category', props.category);
</script>
