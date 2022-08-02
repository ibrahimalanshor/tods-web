import { ref } from 'vue';

export default (init = false) => {
  const todoModalVisible = ref(init);

  const showTodoModal = () => (todoModalVisible.value = true);
  const hideTodoModal = () => (todoModalVisible.value = false);

  return { todoModalVisible, showTodoModal, hideTodoModal };
};
