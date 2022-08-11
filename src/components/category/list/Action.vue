<template>
  <div class="flex items-center space-x-2">
    <ui-dropdown>
      <template #toggle>
        <ui-button>Filter</ui-button>
      </template>

      <div
        class="bg-white absolute py-2 border rounded z-10 w-[300px] top-14 right-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <ui-collapse class="cursor-pointer px-4 py-2" label="Sort By">
          <ui-select :options="sortOptions" v-model="filter.sort" />
        </ui-collapse>
        <ui-collapse class="cursor-pointer px-4 py-2" label="Order By">
          <ui-select :options="orderOptions" v-model="filter.order" />
        </ui-collapse>
        <div class="px-4 py-2 flex justify-end">
          <ui-button size="sm" color="danger" v-on:click="handeResetFilter"
            >Reset Filter</ui-button
          >
        </div>
      </div>
    </ui-dropdown>
    <category-create />
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { UiDropdown, UiButton, UiCollapse, UiSelect } from '@/components/ui';
import { CategoryCreate } from '@/components/category';
import { sort as helperSortOptions, order as orderOptions } from '@/helpers';

const props = defineProps({
  filter: Object,
});
const emit = defineEmits(['filter']);

const filter = reactive({
  sort: props.filter?.sort,
  order: props.filter?.order,
});

const sortOptions = [
  ...helperSortOptions,
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'id',
    label: 'Created',
  },
];

const handeResetFilter = () => {
  filter.sort = null;
  filter.order = null;
};

watch(
  filter,
  () => {
    emit('filter', filter);
  },
  { deep: true }
);
</script>
