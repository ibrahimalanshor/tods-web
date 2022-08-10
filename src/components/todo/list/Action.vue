<template>
  <div class="flex items-center space-x-2">
    <ui-dropdown>
      <template #toggle>
        <ui-button>Filter</ui-button>
      </template>

      <div
        class="bg-white absolute py-2 border rounded z-10 w-[300px] top-14 right-0"
      >
        <ui-collapse
          class="cursor-pointer px-4 py-2"
          label="Category"
          v-if="filterItems.category"
        >
          <category-select v-model="filter.categoryId" />
        </ui-collapse>
        <ui-collapse
          class="cursor-pointer px-4 py-2"
          label="Status"
          v-if="filterItems.status"
        >
          <ui-select :options="statusOptions" v-model="filter.status" />
        </ui-collapse>
        <ui-collapse
          class="cursor-pointer px-4 py-2"
          label="Due"
          v-if="filterItems.due"
        >
          <ui-date-picker placeholder="Due" v-model="filter.due" />
        </ui-collapse>
        <ui-collapse class="cursor-pointer px-4 py-2" label="Sort By">
          <ui-select :options="sortOptions" v-model="filter.sort" />
        </ui-collapse>
        <ui-collapse class="cursor-pointer px-4 py-2" label="Order By">
          <ui-select :options="orderOptions" v-model="filter.order" />
        </ui-collapse>
        <div class="px-4 py-2 flex justify-end">
          <ui-button size="sm" color="danger" v-on:click="handleResetFilter"
            >Reset Filter</ui-button
          >
        </div>
      </div>
    </ui-dropdown>
    <todo-create v-if="props.createButton" />
  </div>
</template>

<script setup>
import {
  UiDropdown,
  UiButton,
  UiCollapse,
  UiSelect,
  UiDatePicker,
} from '@/components/ui';
import { TodoCreate } from '@/components/todo';
import { CategorySelect } from '@/components/category/form';
import { reactive, watch } from 'vue';
import { sort as helperSortOptions, order as orderOptions } from '@/helpers';

const props = defineProps({
  filter: Object,
  filterItems: Object,
  createButton: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['filter']);

const statusOptions = [
  {
    value: null,
    label: 'All',
  },
  {
    value: true,
    label: 'Done',
  },
  {
    value: false,
    label: 'Not Finished',
  },
  {
    value: 'late',
    label: 'Late',
  },
];
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

const filterItems = reactive({
  status: props.filterItems?.status ?? true,
  due: props.filterItems?.due ?? true,
  category: props.filterItems?.category ?? true,
});

const filter = reactive({
  sort: props.filter?.sort,
  order: props.filter?.order,
  status: props.filter?.status,
  due: props.filter?.due,
  categoryId: props.filter?.categoryId,
});

const handleResetFilter = () => {
  filter.sort = null;
  filter.order = null;
  filter.status = null;
  filter.due = null;
  filter.categoryId = null;
};

watch(
  filter,
  () => {
    emit('filter', {
      ...filter,
      categoryId: filter.categoryId?.id,
    });
  },
  { deep: true }
);
</script>
