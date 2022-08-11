import { ref } from 'vue';
import { profile as profileApi } from '@/api';
import { useLoading, useError } from '@/store';

export default () => {
  const loading = useLoading();
  const error = useError();

  const profile = ref();

  const updateProfile = async (body) => {
    loading.start('update-profile');
    error.reset('update-profile');

    try {
      const res = await profileApi.update(body);

      profile.value = res.data;
    } catch (err) {
      error.handle('update-profile', err);
    } finally {
      loading.stop('update-profile');
    }
  };

  return { profile, updateProfile };
};
