import { ref, reactive } from 'vue';
import { useLoading, useError } from '@/store';
import { todo as todoApi } from '@/api';

export default () => {
  const todos = ref({});
  const filter = reactive({
    sort: null,
    order: null,
    done: null,
    due: null,
    late: null,
    categoryId: null,
    limit: null,
  });

  const loading = useLoading();
  const error = useError();

  const getTodos = async () => {
    loading.start('get-todo');
    error.reset('get-todo');

    try {
      const res = await todoApi.get(filter);

      todos.value = res.data;
    } catch (err) {
      error.handle('view-category', err);
    } finally {
      loading.stop('get-todo');
    }
  };

  return { todos, filter, getTodos };
};
