import {type FlexibleUrl} from './flex-url.js';
import {QueryParameter, QueryParameterManipulator, type QueryParameterModifiers} from './query-params.js';
import { getAllIndexes } from './util.js';

export type FilterParameterConditional = 'and' | 'or' | undefined;

export class FilterParameterChecker {
  constructor(private readonly flexUrl: FlexibleUrl) {}

  static find(flexUrl: FlexibleUrl, filterKey: string, values: string[], modifiers: QueryParameterModifiers = [], strict = true): number[] {
    const filterValues = values.join(',').toLocaleLowerCase().split(',');

    return getAllIndexes(flexUrl.params, parameter => {
      if (!parameter.rawValue.includes(',')) {
        return false;
      }

      if (parameter.queryParamKey === QueryParameter.queryParamKey('filter', [filterKey, ...modifiers])) {
        const parameterValues = parameter.rawValue.toLocaleLowerCase().split(',');

        return strict
          ? parameterValues.every(parameterValue => filterValues.includes(parameterValue))
          : parameterValues.some(value => filterValues.includes(value));
      }

      return false;
    });
  }

  /**
   * Check if filter parameter exists in URL containing value(s).
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/filters#includes
   */
  includes(filterKey: string, values: string | string[], modifiers: QueryParameterModifiers = []): boolean {
    return this.has(filterKey, values, modifiers, false);
  }

  /**
   * Check if filter parameter exists in URL with value(s).
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/filters#has
   */
  has(filterKey: string, values?: string | string[], modifiers: QueryParameterModifiers = [], strict = true): boolean {
    const isCheckingOr = Array.isArray(values);

    if (!isCheckingOr) {
      return this.flexUrl.queryParams.has('filter', values, [filterKey, ...modifiers]);
    }

    return FilterParameterChecker.find(this.flexUrl, filterKey, values, modifiers, strict).length > 0;
  }
}

export class FilterParameterManipulator {
  private conditional: FilterParameterConditional = 'and';

  constructor(private readonly manipulator: QueryParameterManipulator, private readonly filterKey: string) {}

  static fromUrl(flexUrl: FlexibleUrl, filterKey: string): FilterParameterManipulator {
    return new FilterParameterManipulator(flexUrl.queryParam('filter'), filterKey);
  }

  get or(): this {
    this.conditional = 'or';

    return this;
  }

  get and(): this {
    this.conditional = 'and';

    return this;
  }

  add(value: string, modifiers: QueryParameterModifiers = []): FilterParameterManipulator {
    if (this.conditional === 'or' && this.manipulator.url.filters.has(this.filterKey) && !this.manipulator.url.filters.includes(this.filterKey, [value], modifiers)) {
      return this.append(`,${value}`);
    }

    return new FilterParameterManipulator(this.manipulator.add(value, [this.filterKey, ...modifiers]), this.filterKey);
  }

  set(value: string, modifiers: QueryParameterModifiers = []): FilterParameterManipulator {
    return new FilterParameterManipulator(this.manipulator.set(value, [this.filterKey, ...modifiers]), this.filterKey);
  }

  replace(value: string | ((oldValue: string) => string)): FilterParameterManipulator {
    return new FilterParameterManipulator(this.manipulator.replace(value), this.filterKey);
  }

  append(value: string): FilterParameterManipulator {
    return new FilterParameterManipulator(this.manipulator.append(value), this.filterKey);
  }

  remove(value: string, modifiers: QueryParameterModifiers = []): FlexibleUrl {
    return this.manipulator.remove(value, [this.filterKey, ...modifiers]);
  }

  toggle(value: string, modifiers: QueryParameterModifiers = []): FilterParameterManipulator {
    if (this.conditional === 'or') {
      const foundIndexes = FilterParameterChecker.find(this.manipulator.url, this.filterKey, [value], modifiers);

      if (foundIndexes.length > 0) {
        return this.set(this.manipulator.url.params[foundIndexes[0]].value.split(',').filter(filterValue => filterValue !== value).join(','));
      }

      if (this.manipulator.url.filters.has(this.filterKey)) {
        const instanceFromIndexes = this.manipulator.exists
          ? this
          : new FilterParameterManipulator(
            QueryParameterManipulator.fromIndexes(this.manipulator.url, 'filter', foundIndexes, [this.filterKey, ...modifiers]),
            this.filterKey,
          );

        return this.manipulator.url.filters.includes(this.filterKey, [value])
          ? instanceFromIndexes.replace(oldValue => oldValue.split(',').filter(v => v.toLocaleLowerCase() !== value.toLocaleLowerCase()).join(','))
          : instanceFromIndexes.append(`,${value}`);
      }

      return this.add(value);
    }

    return new FilterParameterManipulator(this.manipulator.toggle(value, [this.filterKey, ...modifiers]), this.filterKey);
  }
}
