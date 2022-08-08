import axios from 'axios';
import http from './http.js';

export default {
  baseURL: '/auth',
  login: async function (body) {
    const res = await http().post(`${this.baseURL}/login`, body);

    return res.data;
  },
  register: async function (body) {
    const res = await http().post(`${this.baseURL}/register`, body);

    return res.data;
  },
  refreshToken: async function (token) {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}${this.baseURL}/refresh_token`,
      { token }
    );

    return res.data;
  },
};
