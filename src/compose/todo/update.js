import { todo as todoApi } from '@/api';
import { useLoading, useError } from '@/store';
import { handleError } from '@/helpers';

export default () => {
  const loading = useLoading();
  const error = useError();

  const updateTodo = async (id, body) => {
    loading.start('update-todo');
    error.reset('update-todo');

    try {
      await todoApi.update(id, {
        ...body,
        categoryId: body.categoryId?.id,
      });
    } catch (err) {
      handleError('update-todo', err);
    } finally {
      loading.stop('update-todo');
    }
  };

  return { updateTodo };
};
