import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuth } from '@/store';
import authApi from './auth.js';

export default () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  instance.interceptors.request.use(async (config) => {
    const router = useRouter();
    const auth = useAuth();

    if (auth.isLogin) {
      if (Date.now() > auth.decoded.exp * 1000) {
        try {
          const res = await authApi.refreshToken(auth.token.refreshToken);

          auth.refreshToken(res.data);
          config.headers['Authorization'] = res.data;
        } catch (err) {
          auth.logout();

          router.push({ name: 'Login' });
        }
      } else {
        config.headers['Authorization'] = auth.token.accessToken;
      }
    }

    return config;
  });

  return instance;
};
