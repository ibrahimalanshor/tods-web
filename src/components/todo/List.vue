<template>
  <div class="rounded border">
    <div class="border-b px-4 py-3 flex items-center justify-between space">
      <ui-checkbox label="Take Money at ATM" v-on:check="handleTodoCheck">
        <template #label="{ checked, label }">
          <span :class="checked ? 'line-through text-gray-500' : ''">{{
            label
          }}</span>
        </template>
      </ui-checkbox>
      <ui-dropdown position="right" space="small" :items="todoActionItems">
        <template #toggle>
          <button>
            <icon size="20">
              <action-icon />
            </icon>
          </button>
        </template>
      </ui-dropdown>
    </div>
    <div class="border-b px-4 py-3 flex items-center justify-between space">
      <ui-checkbox label="Buy Masker Pack" v-on:check="handleTodoCheck">
        <template #label="{ checked, label }">
          <span :class="checked ? 'line-through text-gray-500' : ''">{{
            label
          }}</span>
        </template>
      </ui-checkbox>
      <ui-dropdown position="right" space="small" :items="todoActionItems">
        <template #toggle>
          <button>
            <icon size="20">
              <action-icon />
            </icon>
          </button>
        </template>
      </ui-dropdown>
    </div>
    <div class="px-4 py-3 flex items-center justify-between space">
      <ui-checkbox label="Write Blog" v-on:check="handleTodoCheck">
        <template #label="{ checked, label }">
          <span :class="checked ? 'line-through text-gray-500' : ''">{{
            label
          }}</span>
        </template>
      </ui-checkbox>
      <ui-dropdown position="right" space="small" :items="todoActionItems">
        <template #toggle>
          <button>
            <icon size="20">
              <action-icon />
            </icon>
          </button>
        </template>
      </ui-dropdown>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@vicons/utils';
import { EllipsisHorizontalOutline as ActionIcon } from '@vicons/ionicons5';
import { UiCheckbox, UiDropdown } from '@/components/ui';

const todoActionItems = [
  {
    key: 'edit',
    text: 'Edit',
  },
  {
    key: 'delete',
    text: 'Delete',
  },
];
const handleTodoCheck = console.log;
</script>
