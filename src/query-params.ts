import { FlexibleUrl } from './flex-url.js'
import { getAllIndexes, setValueFromIndexes } from "./util.js"

export type QueryParamModifiers = Array<string>

export class QueryParameter {
  #name: string
  #value: string
  #modifiers: QueryParamModifiers

  constructor(name: string, value: string, modifiers: QueryParamModifiers = []) {
    this.#name = name
    this.#value = value
    this.#modifiers = modifiers
  }

  static queryParamKey(name: string, modifiers: QueryParamModifiers = []) {
    return `${name}${modifiers.map((modifier) => `[${modifier}]`).join('')}`
  }

  setValue(newValue: string) {
    this.#value = newValue

    return this
  }

  setModifiers(newModifiers: QueryParamModifiers) {
    this.#modifiers = newModifiers

    return this
  }

  get name() {
    return encodeURIComponent(this.#name)
  }
  
  get value() {
    return encodeURIComponent(this.#value)
  }
  
  get modifiers() {
    return this.#modifiers.map(encodeURIComponent)
  }

  get queryParamKey() {
    return QueryParameter.queryParamKey(this.name, this.modifiers)
  }

  toString() {
    return `${this.queryParamKey}=${this.value}`
  }

  static fromString(fragment: string) {
    const [queryParamKey, value] = decodeURIComponent(fragment).split('=')

    let key = queryParamKey
    let modifiers: QueryParamModifiers = []

    if (queryParamKey.includes('[')) {
      const queryParamKeyFragments = queryParamKey.split(/\[|\|/)
      
      key = queryParamKeyFragments.shift() as string
      
      modifiers = queryParamKeyFragments.map((subFragment) => subFragment.replace(']', ''))
    }
    
    if (!key) {
      return null
    }

    return new QueryParameter(key, value, modifiers)
  }
}

export class QueryParameterChecker {
  private flexUrl: FlexibleUrl

  constructor(flexUrl: FlexibleUrl) {
    this.flexUrl = flexUrl
  }

  static find(flexUrl: FlexibleUrl, key: string, value?: string, modifiers?: QueryParamModifiers) {
    return flexUrl.params.findIndex((queryParam) =>
      queryParam.queryParamKey === QueryParameter.queryParamKey(key, modifiers)
        && (value ? queryParam.value === value : true)
    )
  }

  has(key: string, value?: string, modifiers?: QueryParamModifiers) {
    return QueryParameterChecker.find(this.flexUrl, key, value, modifiers) !== -1
  }
}

export class QueryParameterManipulator {
  private flexUrl: FlexibleUrl
  private name: string
  private value: string | undefined
  private indexes: Array<number>

  constructor(flexUrl: FlexibleUrl, name: string, value?: string, modifiers: QueryParamModifiers = [], indexes?: Array<number>) {
    this.flexUrl = flexUrl
    this.name = name
    this.value = value

    this.indexes = indexes || getAllIndexes(flexUrl.params, (param) => 
      param.queryParamKey === QueryParameter.queryParamKey(name, modifiers)
        && (value ? param.value === value : true)
    )
  }

  static fromIndexes(flexUrl: FlexibleUrl, name: string, indexes: Array<number>) {
    return new QueryParameterManipulator(flexUrl, name, undefined, [], indexes)
  }

  /**
   * Add query parameter with value and/or modifiers.
   * 
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#set
   */
  set(value: string, modifiers: QueryParamModifiers = []) {
    setValueFromIndexes(this.flexUrl.params, this.indexes, new QueryParameter(this.name, value, modifiers))

    return this
  }

  /**
   * Add query parameter with value and/or modifiers.
   * 
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#add
   */
  add(value: string, modifiers: QueryParamModifiers = []) {
    const existing = QueryParameterChecker.find(this.flexUrl, this.name, value, modifiers)

    if (existing !== -1) {
      return QueryParameterManipulator.fromIndexes(this.flexUrl, this.name, [existing])
    }

    this.flexUrl.params.push(new QueryParameter(this.name, value, modifiers))

    return new QueryParameterManipulator(this.flexUrl, this.name, value, modifiers)
  }
  
  /**
   * Append value to query parameter.
   * 
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#append
   */
  append(appendValue: string) {
    if (!this.value && this.indexes.length === 0) {
      throw Error('Query parameter value must be provided to append to the right parameter.')
    }

    setValueFromIndexes(this.flexUrl.params, this.indexes, (old) => old.setValue(`${old.value}${appendValue}`))

    return this
  }

  /**
   * Conditionally add or remove query parameter with value and/or modifiers.
   * 
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#toggle
   */
  toggle(value: string, modifiers: QueryParamModifiers = []) {
    const existing = QueryParameterChecker.find(this.flexUrl, this.name, value, modifiers)

    if (existing !== -1) {
      this.remove(value, modifiers, existing)

      return this
    }

    return this.add(value, modifiers)
  }

  /**
   * Remove query parameter with value and/or modifiers.
   * 
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#remove
   */
  remove(value: string, modifiers: QueryParamModifiers = [], index?: number) {
    const existing = index || QueryParameterChecker.find(this.flexUrl, this.name, value, modifiers)

    if (existing !== -1) {
      delete this.flexUrl.params[existing]

      this.flexUrl.params = this.flexUrl.params.filter(Boolean)
    }

    return this.flexUrl
  }

  /**
   * Set query parameter modifiers.
   * 
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#withModifiers
   */
  withModifiers(modifiers: QueryParamModifiers) {
    setValueFromIndexes(this.flexUrl.params, this.indexes, (param) => param.setModifiers(modifiers))

    return this
  }
}