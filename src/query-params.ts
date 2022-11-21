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

  get rawValue(): string {
    return this.#value;
  }

  get modifiers(): string[] {
    return this.#modifiers.map(modifier => encodeURIComponent(modifier));
  }

  get queryParamKey(): string {
    return QueryParameter.queryParamKey(this.#name, this.#modifiers);
  }

  toString(): string {
    return `${QueryParameter.queryParamKey(this.name, this.modifiers)}=${this.value}`;
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
        && (value ? queryParameter.value.toLocaleLowerCase() === value.toLocaleLowerCase() : true),
    );
  }

  has(key: string, value?: string, modifiers?: QueryParameterModifiers): boolean {
    return QueryParameterChecker.find(this.flexUrl, key, value, modifiers) !== -1;
  }
}

export class QueryParameterManipulator {
  constructor(private flexUrl: FlexibleUrl, private readonly name: string, private readonly value?: string, private readonly modifiers: QueryParameterModifiers = [], private readonly indexes: number[] = []) {
    if (indexes.length === 0) {
      this.indexes = getAllIndexes(flexUrl.params, parameter =>
        parameter.queryParamKey === QueryParameter.queryParamKey(name, modifiers)
          && (value ? parameter.value === value : true),
      );
    }
  }

  /**
   * Create instance of QueryParamaterManipulator from known parameters indexes.
   */
  static fromIndexes(flexUrl: FlexibleUrl, name: string, indexes: number[], modifiers: QueryParameterModifiers = []): QueryParameterManipulator {
    return new QueryParameterManipulator(flexUrl, name, undefined, modifiers, indexes);
  }

  /**
   * Get underlying Flex URL instance.
   */
  get url(): FlexibleUrl {
    return this.flexUrl;
  }

  /**
   * Get if manipulator contains existing parameters.
   */
  get exists(): boolean {
    return this.indexes.length > 0
      && this.indexes.every((v, i) => Boolean(this.flexUrl.params?.[i]));
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
   * Replace value to query parameter.
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#replace
   */
  replace(replacement: string | ((oldValue: string) => string)): this {
    if (!this.indexes?.length) {
      throw new Error('Query parameter must be provided to replace to the right parameter.');
    }

    setValueFromIndexes(this.flexUrl.params, this.indexes, old =>
      old.setValue(typeof replacement === 'function' ? replacement(old.rawValue) : replacement),
    );

    return this;
  }

  /**
   * Append value to query parameter.
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#append
   */
  append(appendValue: string): this {
    return this.replace(oldValue => `${oldValue}${appendValue}`);
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
