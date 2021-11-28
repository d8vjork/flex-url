import * as querystring from "./qss"

export type SortDirection = 'asc' | 'desc';

const regex = /(?:https?:\/\/)?(?:[^?\/\s]+[?\/])(.*)/;

export function createFlexUrl(url: string | Record<string, unknown>): FlexUrl {
  const strigifiedUrl = typeof url === "string" ? url : url.toString();
  const matchedFragments = regex.exec(strigifiedUrl);
  
  if (matchedFragments === null) {
    return new FlexUrl(strigifiedUrl);
  }

  let matchedPathFragments: Array<string> = []

  if (matchedFragments[1]) {
    matchedPathFragments = matchedFragments[1].split('?')
  }

  if (matchedPathFragments.length > 1 && matchedPathFragments[1]) {
    return new FlexUrl(
      matchedFragments[0].replace(`?${matchedPathFragments[1]}`, ''),
      querystring.decode(matchedPathFragments[1], false, false)
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

  removeQuery(key: ((params: string) => boolean) | string, value = ''): this {
    if (typeof key === "function") {
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

    if (value && typeof this.params[key] === "object") {
      (this.params[key] as Array<string>).splice(
        (this.params[key] as Array<string>).indexOf(value),
        1
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
    }
    
    return this.setQuery(filterQueryKey, filterValuesArr.join(','));
  }

  orFilterBy(key: string, value: string): this {
    return this.filterBy(key, value, false);
  }

  hasFilter(key: string, value = '') {
    return this.hasQuery(`filter[${key}]`, value);
  }

  getFilters() {
    let filterAttrs: Array<string> = []
    let cursor: string | undefined 
    const paramsKeysArr = Object.keys(this.params)

    while (cursor = paramsKeysArr.pop()) {
      let paramFragments = cursor.split('[')[1];

      if (paramFragments) {
        filterAttrs.push(paramFragments.split(']')[0])
      }
    }

    return filterAttrs;
  }

  clearFilters(except: Array<string> = []): this {
    return this.removeQuery(function (param) {
      const filterParamFragments = param.split('[');
      let condition = filterParamFragments[0] === 'filter';

      if (condition && except.length > 0) {
        condition &&= except.indexOf(filterParamFragments[1].split(']')[0]) === -1;
      }

      return condition;
    });
  }

  getSorts<B extends boolean>(asObject: B): B extends true ? Record<string, SortDirection> : Array<string>;
  getSorts(asObject: boolean) {
    let sortQueryParam: Array<string> | string = this.getQuery('sort') as string;

    if (! sortQueryParam) {
      return asObject ? {} : [];
    }

    sortQueryParam = sortQueryParam.split(',');

    if (asObject) {
      let cursor: string | undefined;
      let sortQueryParamObj: Record<string, SortDirection> = {};

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

  sortBy(value: string, direction: SortDirection | null = null): this {
    let currentSortsArr = this.getSortsAsArray();
    let sortValue = (direction === 'desc' ? '-' : '') + value;
    const currentSortIndex = currentSortsArr.indexOf(sortValue);

    if (direction === null && currentSortIndex !== -1) {
      currentSortsArr.splice(currentSortIndex, 1);

      sortValue = sortValue.charAt(1) === '-' ? value : `-${value}`;
    }

    return this.setQuery('sort', currentSortsArr.concat([sortValue]).join(','));
  }

  sortByDesc(value: string): this {
    return this.sortBy(value, 'desc')
  }
  
  sortByAsc(value: string): this {
    return this.sortBy(value, 'asc')
  }

  clearSorts(): this {
    this.removeQuery('sort');

    return this;
  }

  toString(): string {
    return this.host + this.getQuery();
  }
}
