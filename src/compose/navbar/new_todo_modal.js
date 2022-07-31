import { ref } from 'vue';

export default () => {
  const newTodoModalVisible = ref(false);

  const showNewTodoModal = () => (newTodoModalVisible.value = true);
  const hideNewTodoModal = () => (newTodoModalVisible.value = false);

  return { newTodoModalVisible, showNewTodoModal, hideNewTodoModal };
};
