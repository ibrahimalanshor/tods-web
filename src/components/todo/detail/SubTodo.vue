<template>
  <ui-collapse :visible="!!props.subTodos?.length ?? false">
    <template #label>
      <h3 class="font-bold text-lg cursor-pointer">Sub Todo</h3>
    </template>
    <sub-todo-item
      v-for="(subTodo, key) in props.subTodos ?? []"
      :key="key"
      :todo="subTodo"
      v-on:check-todo="handleCheckTodo"
      v-on:delete-todo="handleDeleteTodo"
    />
    <form v-on:submit.prevent="handleFormSubmit">
      <ui-form-item
        size="sm"
        placeholder="Add Sub Todo, Press Enter"
        v-model="form.name"
        :status="props.formErrors?.name ? 'error' : ''"
        :feedback="props.formErrors?.name.msg"
      />
    </form>
  </ui-collapse>
</template>

<script setup>
import { reactive } from 'vue';
import { UiFormItem, UiCollapse } from '@/components/ui';
import { SubTodoItem } from '@/components/todo/sub-todo';

const props = defineProps({
  subTodos: Array,
  formErrors: null,
});
const emit = defineEmits(['submit-sub-todo']);

const form = reactive({
  name: null,
});

const handleFormSubmit = () => {
  emit('submit-sub-todo', form);
};

const handleCheckTodo = (val) => console.log('check todo : ', val);
const handleDeleteTodo = (val) => console.log('delete todo : ', val);
</script>
