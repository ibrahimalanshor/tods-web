<template>
  <div class="relative" v-click-outside="handleClickOutside">
    <div v-on:click="handleToggleClick">
      <slot name="toggle"></slot>
    </div>
    <div v-if="props.visible">
      <slot>
        <div
          class="bg-white absolute py-2 border top-10 rounded"
          :class="[getContentSizeClass, getContentPositionClass]"
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  items: Array,
  size: String,
  position: String,
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['item-click', 'update:visible']);

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

const handleClickOutside = () => emit('update:visible', false);
const handleToggleClick = () => emit('update:visible', !props.visible);
const handleItemClick = (item) => emit('item-click', item);
</script>
