import { reactive } from 'vue';

export default () => {
  const alert = reactive({
    visible: false,
    message: '',
    color: 'danger',
  });

  const showAlert = (message, color = 'danger') => {
    alert.message = message;
    alert.color = color;
    alert.visible = true;
  };

  const hideAlert = () => {
    alert.visible = false;
  };

  return { alert, showAlert, hideAlert };
};
