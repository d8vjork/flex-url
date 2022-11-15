import * as querystring from './qss';

export type SortDirection = 'asc' | 'desc';

const regex = /(?:https?:\/\/)?(?:[^?/\s]+[?/])(.*)/;

export function createFlexUrl(url: string | Record<string, unknown>): FlexUrl {
  const strigifiedUrl = typeof url === 'string' ? url : url.toString();
  const matchedFragments = regex.exec(strigifiedUrl);

  if (matchedFragments === null) {
    return new FlexUrl(strigifiedUrl);
  }

  if (matchedFragments[1]) {
    const pathArr = matchedFragments[1].split('?');
    const urlWithPathAndQuerySearch = pathArr.length > 1;

    return new FlexUrl(
      matchedFragments[0].replace(`?${urlWithPathAndQuerySearch ? pathArr[1] : matchedFragments[1]}`, ''),
      urlWithPathAndQuerySearch ? querystring.decode(pathArr[1]) : {},
    );
  }

  return new FlexUrl(matchedFragments[0]);
}

export class FlexUrl {
  host: string;

  params: Partial<Record<string, string | Array<string>>>;

  constructor(host: string, params: Partial<Record<string, string>> = {}) {
    this.host = host;
    this.params = params;
  }

  getQuery(key = ''): string | Array<string> | null {
    if (!key) {
      return querystring.encode(this.params, Object.keys(this.params).length > 0 ? '?' : '');
    }

    return this.params[key] || null;
  }

  hasQuery(key: string, value = ''): boolean {
    const hasKey = key in this.params;

    if (value && hasKey) {
      return typeof this.params[key] === 'string'
        ? this.params[key] === value
        : (this.params[key] as Array<string>).indexOf(value) !== -1;
    }

    return hasKey;
  }

  setQuery(key: string, value = ''): this {
    this.params[key] = value;

    return this;
  }

  addQuery(key: string, value = ''): this {
    this.params[key] = this.hasQuery(key)
      ? (typeof this.params[key] === 'string' ? [this.params[key]] : this.params[key] as Array<string>).concat([value]) as Array<string>
      : value;

    return this;
  }

  // eslint-disable-next-line no-unused-vars
  removeQuery(key: ((params: string) => boolean) | string, value = ''): this {
    if (typeof key === 'function') {
      let cursor: string | undefined;
      const paramsKeysArr = Object.keys(this.params);

      while (cursor = paramsKeysArr.pop()) {
        key(cursor) === true ? delete this.params[cursor] : true;
      }

      return this;
    }

    if (!this.params[key]) {
      return this;
    }

    if (value && typeof this.params[key] === 'object') {
      (this.params[key] as Array<string>).splice(
        (this.params[key] as Array<string>).indexOf(value),
        1,
      );
    } else {
      delete this.params[key];
    }

    return this;
  }

  query(key: string, value = '', operation: 'add' | 'set' = 'set'): this {
    if (operation === 'set') {
      return this.setQuery(key, value);
    }

    return this.addQuery(key, value);
  }

  filterBy(key: string, value: string, and = true): this {
    const filterQueryKey = `filter[${key}]`;
    const previousFilterValue = this.getQuery(filterQueryKey);
    let filterValuesArr = value.split(',');

    if (!and && previousFilterValue) {
      filterValuesArr = (typeof previousFilterValue === 'string'
        ? previousFilterValue.split(',')
        : previousFilterValue).concat(filterValuesArr);

      return this.setQuery(filterQueryKey, filterValuesArr.join(','))
    }

    return this.addQuery(filterQueryKey, filterValuesArr.join(','));
  }

  orFilterBy(key: string, value: string): this {
    return this.filterBy(key, value, false);
  }

  hasFilter(key: string, value = '') {
    return this.hasQuery(`filter[${key}]`, value);
  }

  getFilters(asObject = false): Record<string, string | Array<string>> | Array<string> {
    if (asObject) {
      return this.getFiltersAsObject();
    }

    const filterAttrs: Array<string> = [];
    let cursor: string | undefined;
    const paramsKeysArr = Object.keys(this.params);

    while (cursor = paramsKeysArr.pop()) {
      const paramFragments = cursor.split('filter[')[1];

      if (paramFragments) {
        filterAttrs.push(paramFragments.split(']')[0]);
      }
    }

    return filterAttrs;
  }

  getFiltersAsObject(): Record<string, string | Array<string>> {
    const filterAttrs: Record<string, string | Array<string>> = {};
    let cursor: string | undefined;
    const paramsKeysArr = Object.keys(this.params);

    while (cursor = paramsKeysArr.pop()) {
      if (!cursor.includes('filter[')) {
        continue;
      }

      const paramFragments = cursor.split('filter[')[1];
      let paramValue = this.params[cursor];

      if (!paramFragments || paramFragments.length === 0) {
        continue;
      }

      if (typeof paramValue === 'string') {
        const paramValueAsArr = paramValue.split(',');

        paramValue = paramValueAsArr.length > 1 ? paramValueAsArr : paramValue;
      }

      filterAttrs[paramFragments.split(']')[0]] = paramValue as string | Array<string>;
    }

    return filterAttrs;
  }

  replaceFilter(key: string, oldValue: string, newValue?: string): this {
    const keyAsQueryParam = `filter[${key}]`;
    let filterValues = this.params[keyAsQueryParam] || '';

    if (typeof filterValues === 'object' && newValue) {
      const oldValueIndex = filterValues.findIndex((value) => value === oldValue);
      
      if (oldValueIndex !== -1) {
        filterValues[oldValueIndex] = newValue;
      } else {
        filterValues.push(newValue);
      }
    }

    if (typeof filterValues === 'string' && newValue) {
      filterValues = newValue;
    }

    if (typeof filterValues === 'string' && !newValue) {
      filterValues = oldValue;
    }

    this.params[keyAsQueryParam] = filterValues;

    return this
  }

  removeFilter(key: string, value = ''): this {
    const keyAsQueryParam = `filter[${key}]`;
    const filterValue = this.params[keyAsQueryParam] || '';
    const filterValueAsArr = typeof filterValue === 'string' ? filterValue.split(',') : filterValue;

    if (!(keyAsQueryParam in this.params)) {
      return this;
    }

    if (value && filterValueAsArr.length > 0 && value !== filterValue) {
      const valueIndexInFilter = filterValueAsArr.indexOf(value);

      valueIndexInFilter === -1 ? null : filterValueAsArr.splice(filterValueAsArr.indexOf(value), 1);

      return this.setQuery(keyAsQueryParam, filterValueAsArr.join(','));
    }

    return this.removeQuery(keyAsQueryParam);
  }

  clearFilters(except: Array<string> = []): this {
    return this.removeQuery((param) => {
      const filterParamFragments = param.split('[');
      let condition = filterParamFragments[0] === 'filter';

      if (condition && except.length > 0) {
        condition &&= except.indexOf(filterParamFragments[1].split(']')[0]) === -1;
      }

      return condition;
    });
  }

  // eslint-disable-next-line no-unused-vars
  getSorts<B extends boolean>(asObject: B): B extends true ? Record<string, SortDirection> : Array<string>;
  // eslint-disable-next-line no-dupe-class-members
  getSorts(asObject: boolean) {
    let sortQueryParam: Array<string> | string = this.getQuery('sort') as string;

    if (!sortQueryParam) {
      return asObject ? {} : [];
    }

    sortQueryParam = sortQueryParam.split(',');

    if (asObject) {
      let cursor: string | undefined;
      const sortQueryParamObj: Record<string, SortDirection> = {};

      while (cursor = sortQueryParam.pop()) {
        const isDesc = cursor.indexOf('-') === 0;
        const rawKey = isDesc ? cursor.replace('-', '') : cursor;

        sortQueryParamObj[rawKey] = isDesc ? 'desc' : 'asc';
      }

      return sortQueryParamObj;
    }

    return sortQueryParam;
  }

  getSortsAsArray() {
    return this.getSorts(false);
  }

  getSortsAsObject() {
    return this.getSorts(true);
  }

  hasSort(value: string) {
    return this.getQuery('sort')?.indexOf(value) !== -1;
  }

  sortBy(value: string, direction: SortDirection | null = null): this {
    const sanitizedValue = value.charAt(1) === '-' ? value.slice(1) : value;
    const currentSortsArr = this.getSortsAsArray();
    let sortValue = (direction === 'desc' ? '-' : '') + sanitizedValue;

    if (direction === null && currentSortsArr.indexOf(sanitizedValue) !== -1) {
      sortValue = sortValue.charAt(1) === '-' ? sanitizedValue : `-${sanitizedValue}`;
    }

    return this.setQuery(
      'sort',
      currentSortsArr
        .filter((sort) => [sanitizedValue, `-${sanitizedValue}`].indexOf(sort) === -1)
        .concat([sortValue])
        .join(','),
    );
  }

  sortByDesc(value: string): this {
    return this.sortBy(value, 'desc');
  }

  sortByAsc(value: string): this {
    return this.sortBy(value, 'asc');
  }

  clearSorts(): this {
    this.removeQuery('sort');

    return this;
  }

  toString(): string {
    return this.host + this.getQuery();
  }
}
