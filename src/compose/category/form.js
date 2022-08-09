import { ref } from 'vue';

export default (init = {}) => {
  const categoryBody = ref({
    name: init?.name ?? null,
  });

  const setCategoryBody = (value) => (categoryBody.value = value);
  const resetCategoryBody = () => {
    categoryBody.value.name = null;
  };

  return { categoryBody, setCategoryBody, resetCategoryBody };
};
