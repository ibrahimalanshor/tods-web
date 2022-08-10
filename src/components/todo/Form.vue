<template>
  <form v-on:submit.prevent="handleFormSubmit">
    <ui-form-item
      label="Name"
      type="text"
      id="name"
      placeholder="Name"
      v-model="body.name"
      :status="errors?.name ? 'error' : ''"
      :feedback="errors?.name?.msg"
    />
    <ui-form-item
      label="Description"
      v-if="item.description"
      :status="errors?.description ? 'error' : ''"
      :feedback="errors?.description?.msg"
    >
      <ui-textarea
        id="description"
        placeholder="Description"
        v-model="body.description"
      />
    </ui-form-item>
    <ui-form-item
      label="Due Date"
      v-if="item.due"
      :status="errors?.due ? 'error' : ''"
      :feedback="errors?.due?.msg"
    >
      <ui-date-picker
        v-model="body.due"
        placeholder="Due Date"
        :status="errors?.due ? 'error' : ''"
      />
    </ui-form-item>
    <ui-form-item
      label="Category"
      v-if="item.category"
      :status="errors?.categoryId ? 'error' : ''"
      :feedback="errors?.categoryId?.msg"
    >
      <category-select
        v-model="body.categoryId"
        :status="errors?.categoryId ? 'error' : ''"
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
import { reactive, watch } from 'vue';
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
import { CategorySelect } from '@/components/category/form';

const props = defineProps({
  modelValue: Object,
  errors: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(['update:modelValue', 'submit']);

const body = reactive({
  name: props.modelValue?.name ?? null,
  description: props.modelValue?.description ?? null,
  due: props.modelValue?.due ?? null,
  categoryId: props.modelValue?.categoryId ?? null,
});
const item = reactive({
  due: !!props.modelValue?.due ?? false,
  description: !!props.modelValue?.description ?? false,
  category: !!props.modelValue?.categoryId ?? true,
});

const handleDueItemClick = () => (item.due = true);
const handleCategoryItemClick = () => (item.category = true);
const handleDescriptionItemClick = () => (item.description = true);
const handleFormSubmit = () => emit('submit', body);

watch(
  body,
  () => {
    emit('update:modelValue', body);
  },
  { deep: true }
);
</script>
