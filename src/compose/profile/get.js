import { ref } from 'vue';
import { profile as profileApi } from '@/api';
import { useAuth, useLoading, useError } from '@/store';

export default () => {
  const auth = useAuth();
  const loading = useLoading();
  const error = useError();

  const profile = ref();

  const getProfile = async () => {
    loading.start('get-profile');
    error.reset('get-profile');

    try {
      const res = await profileApi.get();

      profile.value = res.data;
    } catch (err) {
      error.handle('get-profile', err);
    } finally {
      loading.stop('get-profile');
    }
  };

  return { profile, getProfile };
};
