import {type FlexibleUrl} from './flex-url.js';
import {getAllIndexes, setValueFromIndexes} from './util.js';

export type QueryParameterModifiers = string[];

export class QueryParameter {
  #name: string;
  #value: string;
  #modifiers: QueryParameterModifiers;

  constructor(name: string, value: string, modifiers: QueryParameterModifiers = []) {
    this.#name = name;
    this.#value = value;
    this.#modifiers = modifiers;
  }

  static queryParamKey(name: string, modifiers: QueryParameterModifiers = []): string {
    return `${name}${modifiers.map(modifier => `[${modifier}]`).join('')}`;
  }

  setValue(newValue: string): this {
    this.#value = newValue;

    return this;
  }

  setModifiers(newModifiers: QueryParameterModifiers): this {
    this.#modifiers = newModifiers;

    return this;
  }

  get name(): string {
    return encodeURIComponent(this.#name);
  }

  get value(): string {
    return encodeURIComponent(this.#value);
  }

  get modifiers(): string[] {
    return this.#modifiers.map(modifier => encodeURIComponent(modifier));
  }

  get queryParamKey(): string {
    return QueryParameter.queryParamKey(this.name, this.modifiers);
  }

  toString(): string {
    return `${this.queryParamKey}=${this.value}`;
  }

  static fromString(fragment: string): undefined | QueryParameter {
    const [queryParameterKey, value] = decodeURIComponent(fragment).split('=');

    let key = queryParameterKey;
    let modifiers: QueryParameterModifiers = [];

    if (queryParameterKey.includes('[')) {
      const queryParameterKeyFragments = queryParameterKey.split(/\[|\|/);

      key = queryParameterKeyFragments.shift()!;

      modifiers = queryParameterKeyFragments.map(subFragment => subFragment.replace(']', ''));
    }

    if (!key) {
      return undefined;
    }

    return new QueryParameter(key, value, modifiers);
  }
}

export class QueryParameterChecker {
  constructor(private readonly flexUrl: FlexibleUrl) {
    this.flexUrl = flexUrl;
  }

  static find(flexUrl: FlexibleUrl, key: string, value?: string, modifiers?: QueryParameterModifiers): number {
    return flexUrl.params.findIndex(queryParameter =>
      queryParameter.queryParamKey === QueryParameter.queryParamKey(key, modifiers)
        && (value ? queryParameter.value === value : true),
    );
  }

  has(key: string, value?: string, modifiers?: QueryParameterModifiers): boolean {
    return QueryParameterChecker.find(this.flexUrl, key, value, modifiers) !== -1;
  }
}

export class QueryParameterManipulator {
  constructor(private flexUrl: FlexibleUrl, private readonly name: string, private readonly value?: string, modifiers: QueryParameterModifiers = [], private readonly indexes: number[] = []) {
    this.flexUrl = flexUrl;
    this.name = name;
    this.value = value;

    this.indexes = indexes.length > 0
      ? indexes
      : getAllIndexes(flexUrl.params, parameter =>
        parameter.queryParamKey === QueryParameter.queryParamKey(name, modifiers)
          && (value ? parameter.value === value : true),
      );
  }

  static fromIndexes(flexUrl: FlexibleUrl, name: string, indexes: number[]): QueryParameterManipulator {
    return new QueryParameterManipulator(flexUrl, name, undefined, [], indexes);
  }

  /**
   * Add query parameter with value and/or modifiers.
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#set
   */
  set(value: string, modifiers: QueryParameterModifiers = []): this {
    setValueFromIndexes(this.flexUrl.params, this.indexes, new QueryParameter(this.name, value, modifiers));

    return this;
  }

  /**
   * Add query parameter with value and/or modifiers.
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#add
   */
  add(value: string, modifiers: QueryParameterModifiers = []): QueryParameterManipulator {
    const existing = QueryParameterChecker.find(this.flexUrl, this.name, value, modifiers);

    if (existing !== -1) {
      return QueryParameterManipulator.fromIndexes(this.flexUrl, this.name, [existing]);
    }

    this.flexUrl.params.push(new QueryParameter(this.name, value, modifiers));

    return new QueryParameterManipulator(this.flexUrl, this.name, value, modifiers);
  }

  /**
   * Append value to query parameter.
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#append
   */
  append(appendValue: string): this {
    if (!this.value && !this.indexes?.length) {
      throw new Error('Query parameter value must be provided to append to the right parameter.');
    }

    setValueFromIndexes(this.flexUrl.params, this.indexes, old => old.setValue(`${old.value}${appendValue}`));

    return this;
  }

  /**
   * Conditionally add or remove query parameter with value and/or modifiers.
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#toggle
   */
  toggle(value: string, modifiers: QueryParameterModifiers = []): QueryParameterManipulator {
    const existing = QueryParameterChecker.find(this.flexUrl, this.name, value, modifiers);

    if (existing !== -1) {
      this.remove(value, modifiers, existing);

      return this;
    }

    return this.add(value, modifiers);
  }

  /**
   * Remove query parameter with value and/or modifiers.
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#remove
   */
  remove(value: string, modifiers: QueryParameterModifiers = [], index?: number): FlexibleUrl {
    const existing = index ?? QueryParameterChecker.find(this.flexUrl, this.name, value, modifiers);

    if (existing !== -1) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.flexUrl.params[existing];

      this.flexUrl.params = this.flexUrl.params.filter(Boolean);
    }

    return this.flexUrl;
  }

  /**
   * Set query parameter modifiers.
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#withModifiers
   */
  withModifiers(modifiers: QueryParameterModifiers): this {
    setValueFromIndexes(this.flexUrl.params, this.indexes, parameter => parameter.setModifiers(modifiers));

    return this;
  }
}
