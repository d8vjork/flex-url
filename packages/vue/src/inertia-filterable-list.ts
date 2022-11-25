import {defineComponent, h} from 'vue';
import {Inertia} from '@inertiajs/inertia';
import {FilterableList, type FilterableListProps} from './filterable-list.js';

export type InertiaFilterableListProps = {
  /**
   * If provided, Inertia will reload only this page prop
   */
  dataProp: string;
} & FilterableListProps;

export const InertiaFilterableList = defineComponent<InertiaFilterableListProps>({
  name: 'InertiaFilterableList',

  props: ['dataProp', 'as', 'usingOr'] as unknown as undefined,

  setup(props, {slots}) {
    const onUpdate = (url: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      Inertia.visit(url, {
        only: [props.dataProp],
        preserveScroll: true,
        preserveState: true,
      });
    };

    return () => h(FilterableList, {
      ...props,
      onUpdate(url: string) {
        onUpdate(url);
      },
    }, {
      default: (data: unknown) => slots.default?.(data),
    });
  },
});
