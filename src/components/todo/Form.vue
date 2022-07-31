<template>
  <form>
    <ui-form-item label="Name" type="text" id="name" placeholder="Name" />
    <ui-form-item label="Due Date" v-if="item.due">
      <ui-date-picker />
    </ui-form-item>
    <ui-form-item label="Category" v-if="item.category">
      <ui-select-search />
    </ui-form-item>

    <div class="flex items-center space-x-2">
      <ui-button size="sm" v-on:click="handleDueItemClick" v-if="!item.due">
        <template #icon>
          <icon>
            <calendar-icon />
          </icon>
        </template>
        Due Date
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
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import {
  CalendarClearOutline as CalendarIcon,
  BookmarkOutline as CategoryIcon,
} from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
import {
  UiButton,
  UiFormItem,
  UiSelectSearch,
  UiDatePicker,
} from '@/components/ui';

const item = reactive({
  due: false,
  category: false,
});

const handleDueItemClick = () => (item.due = true);
const handleCategoryItemClick = () => (item.category = true);
</script>
