import { todo as todoApi } from '@/api';
import { useLoading, useError } from '@/store';
import { handleError } from '@/helpers';

export default () => {
  const loading = useLoading();
  const error = useError();

  const deleteTodo = async (id) => {
    loading.start('delete-todo');
    error.reset('delete-todo');

    try {
      await todoApi.delete(id);
    } catch (err) {
      error.handle('delete-todo', err);
    } finally {
      loading.stop('delete-todo');
    }
  };

  return { deleteTodo };
};
