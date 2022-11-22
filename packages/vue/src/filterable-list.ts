import {type ComponentPublicInstance, defineComponent, h, watch, reactive, Fragment, type ComputedOptions, type MethodOptions} from 'vue';
import {flexUrl} from 'flex-url';

export type FilterableListProps = {
  /**
   * Use component or HTML tag as parent component
   *
   * @default 'template'
   */
  as?: ComponentPublicInstance | string;

  /**
   * Use OR for filters
   *
   * @default false
   */
  usingOr?: boolean;
};

export const FilterableList = defineComponent<FilterableListProps>({
  name: 'FilterableList',

  emits: ['update'] as unknown as undefined,

  props: ['as', 'usingOr'] as unknown as undefined,

  setup(props, {slots, emit}) {
    const url = reactive(flexUrl(window.location));

    function filter(key: string) {
      // eslint-disable-next-line unicorn/no-array-callback-reference
      return props.usingOr ? url.filter(key).or : url.filter(key);
    }

    watch(url, current => {
      emit('update', current.toString());
    }, {deep: true});

    return () => {
      const defaultSlot = slots.default?.({
        filter,
        filters: url.filters,
        queryParam: url.queryParam,
        queryParams: url.queryParams,
      });

      if (!props.as) {
        return defaultSlot;
      }

      return h(props.as, defaultSlot);
    };
  },
});
