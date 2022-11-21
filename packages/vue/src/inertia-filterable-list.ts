import {defineComponent, h, reactive, watch} from 'vue';
import {FilterableList, type FilterableListProps} from './filterable-list.js';

export type InertiaFilterableListProps = {
  /**
   * If provided, Inertia will reload only this page prop
   */
  dataProp?: string;
} & FilterableListProps;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InertiaFilterableList = defineComponent<InertiaFilterableListProps>({
  name: 'InertiaFilterableList',

  emits: ['update'],

  props: ['as', 'usingOr', 'dataProp'] as unknown as undefined,

  setup(props, {slots, emit}) {
    return () => {
      h(FilterableList, {
        ...props,
        onUpdate(value: string) {
          emit('update', value);
        },
      }, {
        default: (data: unknown) => slots.default?.(data),
      });
    };
  },
});
