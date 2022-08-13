import { defineStore } from 'pinia';
import { HandledError } from '@/utils';

export default defineStore('error', {
  state: () => ({
    errors: {},
  }),
  getters: {
    get: (state) => (name) => state.errors[name],
  },
  actions: {
    add: function (name, errors) {
      this.errors[name] = errors;
    },
    reset: function (name) {
      this.errors[name] = {};
    },
    handle: function (name, err) {
      this.reset(name);

      if (err?.response) {
        const { status, data } = err.response;
        const handledStatus = [422, 401, 409, 404, 403];

        if (handledStatus.includes(status)) {
          this.add(name, {
            status,
            message: data.message,
            errors: data.errors,
          });

          throw new HandledError('', status, data.errors);
        }
      }

      throw err;
    },
  },
});
