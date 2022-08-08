import http from './http.js';

export default {
  baseURL: '/categories',
  get: async function ({ query } = {}) {
    const res = await http().get(this.baseURL, {
      params: query,
    });

    return res.data;
  },
};
