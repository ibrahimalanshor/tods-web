import { defineStore } from 'pinia';

export default defineStore('toast', {
  state: () => ({
    isVisible: false,
    text: '',
  }),
  actions: {
    show: function (msg) {
      this.isVisible = true;
      this.text = msg;
    },
    hide: function () {
      this.isVisible = false;
      this.text = '';
    },
  },
});
