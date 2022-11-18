import {type FlexibleUrl} from './flex-url.js';
import {type QueryParameterManipulator, type QueryParameterModifiers} from './query-params.js';

export type FilterParameterConditional = 'and' | 'or' | undefined;

export class FilterParameterChecker {
  constructor(private readonly flexUrl: FlexibleUrl) {
    this.flexUrl = flexUrl;
  }

  has(filterKey: string, value?: string, modifiers: QueryParameterModifiers = []) {
    return this.flexUrl.queryParams.has('filter', value, [filterKey, ...modifiers]);
  }
}

export class FilterParameterManipulator {
  private conditional: FilterParameterConditional;

  constructor(private readonly manipulator: QueryParameterManipulator, private readonly filterKey: string) {
    this.manipulator = manipulator;
    this.filterKey = filterKey;
  }

  static fromUrl(flexUrl: FlexibleUrl, filterKey: string) {
    return new FilterParameterManipulator(flexUrl.queryParam('filter'), filterKey);
  }

  get or() {
    this.conditional = 'or';

    return this;
  }

  get and() {
    this.conditional = 'and';

    return this;
  }

  add(value: string, modifiers: QueryParameterModifiers = []) {
    return new FilterParameterManipulator(this.manipulator.add(value, [this.filterKey, ...modifiers]), this.filterKey);
  }

  set(value: string, modifiers: QueryParameterModifiers = []) {
    return new FilterParameterManipulator(this.manipulator.set(value, [this.filterKey, ...modifiers]), this.filterKey);
  }

  append(value: string) {
    return new FilterParameterManipulator(this.manipulator.append(value), this.filterKey);
  }

  remove(value: string, modifiers: QueryParameterModifiers = []) {
    return this.manipulator.remove(value, [this.filterKey, ...modifiers]);
  }
}
