<template>
  <div class="relative" v-click-outside="handleClickOutside">
    <div v-on:click="handleToggleClick">
      <slot name="toggle"></slot>
    </div>
    <slot v-if="visible">
      <div
        class="bg-white absolute py-2 border rounded z-10"
        :class="[
          getContentSizeClass,
          getContentPositionClass,
          getContentTopClass,
        ]"
      >
        <div
          v-for="(item, key) in props.items"
          :key="key"
          class="cursor-pointer hover:bg-gray-100 px-4 py-2"
          :class="[item.class, item.divider ? 'border-b' : '']"
          v-on:click="handleItemClick(item)"
        >
          {{ item.text }}
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  items: Array,
  size: String,
  position: String,
  space: String,
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['item-click', 'update:visible']);

const router = useRouter();
const visible = ref(props.visible);

const getContentSizeClass = computed(() => {
  const sizes = {
    normal: 'w-[200px]',
  };

  return sizes[props.size ?? 'normal'];
});
const getContentPositionClass = computed(() => {
  const positions = {
    left: 'left-0',
    right: 'right-0',
  };

  return positions[props.position ?? 'left'];
});
const getContentTopClass = computed(() => {
  const spaces = {
    medium: 'top-10',
    normal: 'top-5',
    none: 'top-0',
  };

  return spaces[props.space ?? 'normal'];
});

const handleClickOutside = () => (visible.value = false);
const handleToggleClick = () => (visible.value = !visible.value);
const handleItemClick = (item) => {
  if (item.onClick) {
    item.onClick(item);
  }

  emit('item-click', item);

  if (item.to) {
    router.push({ name: item.to });
  }
};

watch(visible, () => {
  emit('update:visible', visible.value);
});
</script>
