import { ref } from 'vue';

export default (init = {}) => {
  const profileBody = ref({
    name: init?.name ?? null,
    password: init?.password ?? null,
    password_confirmation: init?.password_confirmation ?? null,
  });

  const setProfileBody = (value) => (profileBody.value = value);
  const resetProfileBody = () => {
    profileBody.value.name = null;
    profileBody.value.password = null;
    profileBody.value.password_confirmation = null;
  };

  return { profileBody, setProfileBody, resetProfileBody };
};
