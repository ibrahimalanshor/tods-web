import { defineStore } from 'pinia';

export default defineStore('toast', {
  state: () => ({
    isVisible: false,
    text: '',
    color: 'danger',
  }),
  actions: {
    show: function (msg, color = 'danger') {
      this.isVisible = true;
      this.text = msg;
      this.color = color;
    },
    hide: function () {
      this.isVisible = false;
      this.text = '';
    },
  },
});
