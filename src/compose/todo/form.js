import { ref } from 'vue';

export default (init = {}) => {
  const todoBody = ref({
    name: init?.name ?? null,
    description: init?.description ?? null,
    due: init?.due ?? null,
    category: init?.category ?? null,
  });

  const setTodoBody = (value) => (todoBody.value = value);

  return { todoBody, setTodoBody };
};
