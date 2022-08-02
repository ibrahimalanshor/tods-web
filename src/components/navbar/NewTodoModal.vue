<template>
  <ui-modal title="New Todo" v-model:visible="todoModalVisible">
    <template #toggle>
      <ui-button title="New Todo" size="sm" color="primary" />
    </template>

    <todo-form />

    <template #footer>
      <ui-button color="primary">Save</ui-button>
      <ui-button v-on:click="hideTodoModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import {
  CalendarClearOutline as CalendarIcon,
  BookmarkOutline as CategoryIcon,
} from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
import { UiButton, UiModal } from '@/components/ui';
import { TodoForm } from '@/components/todo';
import { useTodoModal } from '@/compose/todo';

const { todoModalVisible, showTodoModal, hideTodoModal } = useTodoModal();
</script>
