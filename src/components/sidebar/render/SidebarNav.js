import { ref, h, resolveComponent } from 'vue';
import { Icon as IconUtil } from '@vicons/utils';
import { ChevronDown as ChevronDownIcon } from '@/components/icon';

export default {
  props: {
    navs: Array,
    active: {
      type: Array,
      default: [],
    },
    show: {
      type: Array,
      default: [],
    },
  },
  emits: ['item-click'],
  setup(props, { emit }) {
    const active = ref(props.active);
    const show = ref(props.show);

    const handleItemClick = (item) => {
      if (item.children?.length) {
        if (!show.value.includes(item.key)) {
          show.value.push(item.key);
          active.value.push(item.key);
        } else {
          show.value = show.value.filter((value) => value !== item.key);
          active.value = active.value.filter((value) => value !== item.key);
        }
      }

      emit('item-click', item);
    };
    const handleChildClick = (item, e) => {
      emit('item-click', item);
    };

    const renderArrow = (item) => {
      return h(
        ChevronDownIcon,
        {
          class: [
            'item-arrow',
            item.showChildren || show.value.includes(item.key)
              ? ' rotate-180'
              : '',
          ],
        },
        {}
      );
    };

    const renderIcon = (icon) => {
      return h(
        IconUtil,
        {},
        {
          default: () => h(icon, {}, {}),
        }
      );
    };

    const renderLabel = (item) => {
      const activeClass = 'bg-primary-500 text-white font-medium';
      const labelClass =
        'px-4 flex items-center justify-between hover:bg-primary-500 hover:text-white hover:font-medium py-2 rounded cursor-pointer';

      return h(
        'div',
        {
          class: [
            labelClass,
            item.active || active.value.includes(item.key) ? activeClass : '',
          ],
          onClick: () => handleItemClick(item),
        },
        {
          default: () => [
            h(
              'div',
              { class: 'flex items-center space-x-4' },
              {
                default: () => [
                  renderIcon(item.icon),
                  h('span', {}, { default: () => item.label }),
                ],
              }
            ),
            ...(item.children?.length ? [renderArrow(item)] : []),
          ],
        }
      );
    };

    const renderChild = (child, options) => {
      const tag = child.to ? resolveComponent('router-link') : 'div';
      const activeClass =
        'bg-primary-100 text-primary-500 font-medium dark:bg-gray-600 dark:text-gray-100';
      const labelClass =
        'px-4 mb-2 flex items-center space-x-4 hover:bg-primary-100 hover:text-primary-500 hover:font-medium py-2 rounded cursor-pointer dark:hover:bg-gray-600 dark:hover:text-gray-100';

      return h(
        tag,
        {
          class: [
            labelClass,
            child.active || active.value.includes(child.key) ? activeClass : '',
            options.last ? 'mb-0' : '',
          ],
          ...(child.to ? { to: { name: child.to } } : {}),
          onClick: (e) => handleChildClick(child, e),
        },
        {
          default: () => [
            renderIcon(child.icon),
            h('span', {}, { default: () => child.label }),
          ],
        }
      );
    };

    const renderChildren = (children, options) => {
      return h(
        'div',
        {
          class: [
            'bg-primary-50 dark:bg-gray-700',
            'py-1',
            options.show ? '' : 'hidden',
          ],
        },
        {
          default: () =>
            children.map((child, index) =>
              renderChild(child, { last: index === children.length - 1 })
            ),
        }
      );
    };

    const renderItem = (item) => {
      const tag = item.to ? resolveComponent('router-link') : 'div';

      return h(
        tag,
        { class: 'mb-2', ...(item.to ? { to: { name: item.to } } : {}) },
        {
          default: () => [
            renderLabel(item),
            ...[
              item.children?.length
                ? renderChildren(item.children, {
                    show: item.showChildren || show.value.includes(item.key),
                  })
                : [],
            ],
          ],
        }
      );
    };

    const renderTitle = (title) => {
      return h(
        'div',
        {
          class:
            'px-4 font-bold text-sm text-gray-600 uppercase mb-4 dark:text-gray-400',
        },
        {
          default: () => title,
        }
      );
    };

    const renderNav = (nav) => {
      return h(
        'div',
        { class: 'mt-6 mb-4 px-4' },
        {
          default: () => [
            renderTitle(nav.title),
            ...nav.items.map((item) => renderItem(item)),
          ],
        }
      );
    };

    return () =>
      h(
        'div',
        {},
        {
          default: () => props.navs.map((nav) => renderNav(nav)),
        }
      );
  },
};
