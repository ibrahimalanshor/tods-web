import { ref } from 'vue';
import { todo as todoApi } from '@/api';
import { useLoading, useError } from '@/store';
import { handleError } from '@/helpers';

export default () => {
  const loading = useLoading();
  const error = useError();
  const todo = ref({});

  const viewTodo = async (id) => {
    loading.start('view-todo');
    error.reset('view-todo');

    try {
      const res = await todoApi.view(id);

      todo.value = res.data;
    } catch (err) {
      handleError('view-todo', err);
    } finally {
      loading.stop('view-todo');
    }
  };

  return { todo, viewTodo };
};
