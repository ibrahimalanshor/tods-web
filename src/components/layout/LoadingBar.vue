<template>
  <ui-progress
    class="fixed top-0 left-0 z-40 h-[2px]"
    :style="{ width: `${loadingProgress}%` }"
    v-if="loadingVisible"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { UiProgress } from '@/components/ui';

const router = useRouter();
const loadingProgress = ref(0);
const loadingVisible = ref(true);

let loadingInterval = null;

const startLoading = () => {
  loadingProgress.value = 0;
  loadingVisible.value = true;

  loadingInterval = setInterval(() => {
    if (loadingProgress.value >= 100) {
      clearInterval(loadingInterval);
      loadingVisible.value = false;
    } else {
      loadingProgress.value += 1;
    }
  }, 100);
};

const finishLoading = () => {
  loadingProgress.value = 100;

  clearInterval(loadingInterval);

  setTimeout(() => {
    loadingVisible.value = false;
  }, 150);
};

router.beforeEach(() => {
  startLoading();
});

router.afterEach(() => {
  finishLoading();
});
</script>
