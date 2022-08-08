import { reactive, ref } from 'vue';
import { auth as authApi } from '@/api';
import { handleError } from '@/helpers';
import { useError, useLoading, useAuth } from '@/store';

export default () => {
  const body = reactive({
    name: null,
    email: null,
    password: null,
  });

  const auth = useAuth();
  const error = useError();
  const loading = useLoading();

  const register = async () => {
    loading.start('register');
    error.reset('register');

    try {
      const res = await authApi.register(body);

      auth.login(res.data.accessToken, res.data.refreshToken);
    } catch (err) {
      handleError('register', err);
    } finally {
      loading.stop('register');
    }
  };

  return { body, register };
};
