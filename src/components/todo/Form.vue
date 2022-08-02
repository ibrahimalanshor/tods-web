<template>
  <form>
    <ui-form-item
      label="Name"
      type="text"
      id="name"
      placeholder="Name"
      v-model="body.name"
    />
    <ui-form-item label="Description" v-if="item.description">
      <ui-textarea
        id="description"
        placeholder="Description"
        v-model="body.description"
      />
    </ui-form-item>
    <ui-form-item label="Due Date" v-if="item.due">
      <ui-date-picker v-model="body.due" placeholder="Due Date" />
    </ui-form-item>
    <ui-form-item label="Category" v-if="item.category">
      <ui-select-search
        label="name"
        :options="categoryOptions"
        v-model="body.category"
        placeholder="Category"
      />
    </ui-form-item>

    <div class="flex items-center space-x-2">
      <ui-button
        size="sm"
        v-on:click="handleDescriptionItemClick"
        v-if="!item.description"
      >
        <template #icon>
          <icon>
            <description-icon />
          </icon>
        </template>
        Description
      </ui-button>
      <ui-button
        size="sm"
        v-on:click="handleCategoryItemClick"
        v-if="!item.category"
      >
        <template #icon>
          <icon>
            <category-icon />
          </icon>
        </template>
        Category
      </ui-button>
      <ui-button size="sm" v-on:click="handleDueItemClick" v-if="!item.due">
        <template #icon>
          <icon>
            <calendar-icon />
          </icon>
        </template>
        Due Date
      </ui-button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import {
  CalendarClearOutline as CalendarIcon,
  BookmarkOutline as CategoryIcon,
  NewspaperOutline as DescriptionIcon,
} from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
import {
  UiButton,
  UiFormItem,
  UiSelectSearch,
  UiDatePicker,
  UiTextarea,
} from '@/components/ui';

const props = defineProps({
  modelValue: Object,
});
const emit = defineEmits(['update:modelValue']);

const body = reactive({
  name: props.modelValue?.name ?? null,
  description: props.modelValue?.description ?? null,
  due: props.modelValue?.due ?? null,
  category: props.modelValue?.category ?? null,
});
const item = reactive({
  due: !!props.modelValue?.due ?? false,
  description: !!props.modelValue?.description ?? false,
  category: !!props.modelValue?.category ?? true,
});
const categoryOptions = [
  {
    name: 'Work',
    id: 1,
  },
  {
    name: 'School',
    id: 2,
  },
];

const handleDueItemClick = () => (item.due = true);
const handleCategoryItemClick = () => (item.category = true);
const handleDescriptionItemClick = () => (item.description = true);
</script>
