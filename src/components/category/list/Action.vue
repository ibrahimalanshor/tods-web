<template>
  <div class="flex items-center space-x-2">
    <ui-dropdown>
      <template #toggle>
        <ui-button>Filter</ui-button>
      </template>

      <div
        class="bg-white absolute py-2 border rounded z-10 w-[300px] top-14 right-0"
      >
        <ui-collapse class="cursor-pointer px-4 py-2" label="Sort By">
          <ui-select :options="sortOptions" v-model="sort" />
        </ui-collapse>
        <ui-collapse class="cursor-pointer px-4 py-2" label="Order By">
          <ui-select :options="orderOptions" v-model="order" />
        </ui-collapse>
        <div class="px-4 py-2 flex justify-end">
          <ui-button size="sm" color="danger">Reset Filter</ui-button>
        </div>
      </div>
    </ui-dropdown>
    <category-create />
  </div>
</template>

<script setup>
import { UiDropdown, UiButton, UiCollapse, UiSelect } from '@/components/ui';
import { CategoryCreate } from '@/components/category';
import { ref } from 'vue';
import { sort as helperSortOptions, order as orderOptions } from '@/helpers';

const sortOptions = [
  ...helperSortOptions,
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'createdAt',
    label: 'Created',
  },
];
const sort = ref('');
const order = ref('');
</script>
