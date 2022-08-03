import { ref } from 'vue';

export default (init = false) => {
  const categoryModalVisible = ref(init);

  const showCategoryModal = () => (categoryModalVisible.value = true);
  const hideCategoryModal = () => (categoryModalVisible.value = false);

  return { categoryModalVisible, showCategoryModal, hideCategoryModal };
};
