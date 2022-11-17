import { FlexibleUrl } from "./flex-url.js";
import { QueryParameterManipulator, QueryParamModifiers } from "./query-params.js";

export type FilterParamConditional = 'and' | 'or' | undefined

export class FilterParameterChecker {
  private flexUrl: FlexibleUrl

  constructor(flexUrl: FlexibleUrl) {
    this.flexUrl = flexUrl
  }

  has(filterKey: string, value?: string, modifiers: QueryParamModifiers = []) {
    return this.flexUrl.queryParams.has('filter', value, [filterKey, ...modifiers])
  }
}

export class FilterParameterManipulator {
  private manipulator: QueryParameterManipulator
  private filterKey: string
  private conditional: FilterParamConditional
  
  constructor(manipulator: QueryParameterManipulator, filterKey: string) {
    this.manipulator = manipulator
    this.filterKey = filterKey
  }

  static fromUrl(flexUrl: FlexibleUrl, filterKey: string) {
    return new FilterParameterManipulator(flexUrl.queryParam('filter'), filterKey)
  }

  get or() {
    this.conditional = 'or'

    return this
  }
  
  get and() {
    this.conditional = 'and'

    return this
  }

  add(value: string, modifiers: QueryParamModifiers = []) {
    return new FilterParameterManipulator(this.manipulator.add(value, [this.filterKey, ...modifiers]), this.filterKey)
  }

  set(value: string, modifiers: QueryParamModifiers = []) {
    return new FilterParameterManipulator(this.manipulator.set(value, [this.filterKey, ...modifiers]), this.filterKey)
  }

  append(value: string) {
    return new FilterParameterManipulator(this.manipulator.append(value), this.filterKey)
  }

  remove(value: string, modifiers: QueryParamModifiers = []) {
    return this.manipulator.remove(value, [this.filterKey, ...modifiers])
  }
}