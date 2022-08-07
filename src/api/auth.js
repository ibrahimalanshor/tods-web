import http from './http.js';

export default {
  baseURL: '/auth',
  login: async function (body) {
    const res = await http().post(`${this.baseURL}/login`, body);

    return res.data;
  },
};
