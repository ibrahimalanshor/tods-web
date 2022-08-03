<template>
  <div class="border-b px-4 py-3 flex items-center justify-between">
    <ui-link
      :label="props.category.name"
      :href="{ name: 'Todo Category', params: { id: 1 } }"
    />
    <ui-dropdown position="right" space="small" :items="categoryActionItems">
      <template #toggle>
        <button>
          <icon size="20">
            <action-icon />
          </icon>
        </button>
      </template>
    </ui-dropdown>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@vicons/utils';
import { EllipsisHorizontalOutline as ActionIcon } from '@vicons/ionicons5';
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

const categoryActionItems = [
  {
    key: 'edit',
    text: 'Edit',
    onClick: handleEditCategory,
  },
  {
    key: 'delete',
    text: 'Delete',
    onClick: handleDeleteCategory,
  },
];
</script>
