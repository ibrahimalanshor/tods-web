<template>
  <div v-on:click="handleToggleClick" v-if="props.toggle">
    <slot name="toggle" />
  </div>
  <teleport to="body" v-if="props.visible">
    <div
      class="bg-black bg-opacity-50 fixed inset-0 z-20 px-4 overflow-x-auto"
      v-if="props.visible"
    >
      <div
        class="bg-white max-w-[500px] mx-auto my-10 rounded shadow-lg"
        v-click-outside="handleClickOutside"
      >
        <div
          class="p-4 border-b flex items-center justify-between"
          :class="props.headerClass"
          v-if="props.header"
        >
          <slot name="title">
            <h2 class="text-lg font-bold" v-if="props.title">
              {{ props.title }}
            </h2>
          </slot>
          <div v-on:click="handleCloseClick">
            <slot name="close">
              <button>
                <icon>
                  <close-icon />
                </icon>
              </button>
            </slot>
          </div>
        </div>
        <div class="p-4" :class="props.contentClass">
          <slot>
            <p class="leading-loose text-gray-700">{{ props.content }}</p>
          </slot>
        </div>
        <div
          class="p-4 space-x-2 flex justify-end border-t"
          v-if="props.footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import UiButton from './Button.vue';
import { Close as CloseIcon } from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';

const props = defineProps({
  title: {
    type: String,
    default: 'Modal Title',
  },
  content: {
    type: String,
    default: 'Modal Text',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  toggle: {
    type: Boolean,
    default: true,
  },
  header: {
    type: Boolean,
    default: true,
  },
  headerClass: String,
  contentClass: String,
  footer: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['update:visible']);

const handleToggleClick = () => emit('update:visible', true);
const handleClickOutside = () => emit('update:visible', false);
const handleCloseClick = () => emit('update:visible', false);
</script>
