import { ref } from 'vue';

export default (init = {}) => {
  const todoBody = ref({
    name: init?.name ?? null,
    description: init?.description ?? null,
    due: init?.due ?? null,
    categoryId: init?.categoryId ?? null,
  });

  const setTodoBody = (value) => (todoBody.value = value);
  const resetTodoBody = () => {
    todoBody.value.name = null;
    todoBody.value.description = null;
    todoBody.value.due = null;
    todoBody.value.categoryId = null;
  };

  return { todoBody, setTodoBody, resetTodoBody };
};
