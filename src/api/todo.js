import http from './http.js';

export default {
  baseURL: '/todos',
  get: async function (query) {
    const res = await http().get(this.baseURL, {
      params: query,
    });

    return res.data;
  },
  create: async function (body) {
    const res = await http().post(this.baseURL, body);

    return res.data;
  },
  view: async function (id) {
    const res = await http().get(`${this.baseURL}/${id}`);

    return res.data;
  },
  update: async function (id, body) {
    const res = await http().patch(`${this.baseURL}/${id}`, body);

    return res.data;
  },
  updateDone: async function (id, done) {
    const res = await http().patch(`${this.baseURL}/${id}/status`, {
      status: done,
    });

    return res.data;
  },
  delete: async function (id) {
    const res = await http().delete(`${this.baseURL}/${id}`);

    return res.data;
  },
};
