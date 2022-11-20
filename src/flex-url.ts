import {FilterParameterManipulator, FilterParameterChecker} from './filter-params.js';
import {QueryParameter, QueryParameterChecker, QueryParameterManipulator} from './query-params.js';

export class FlexibleUrl {
  params: QueryParameter[] = [];
  private readonly baseUrl: string;
  private readonly hashFragment: string;

  constructor(url?: string | URL | Location) {
    let parsedUrl = typeof url === 'string' ? new URL(url) : url;

    if (!parsedUrl && typeof window !== 'undefined') {
      parsedUrl = window.location;
    }

    if (!parsedUrl) {
      throw new Error('Need to provide a valid URL');
    }

    this.hashFragment = parsedUrl.hash;

    this.baseUrl = parsedUrl.origin;

    const parametersFromUrl = parsedUrl.search.replace('?', '').split('&');

    for (let i = 0; i < parametersFromUrl.length; i++) {
      const queryParameter = QueryParameter.fromString(parametersFromUrl[i]);

      if (queryParameter) {
        this.params.push(queryParameter);
      }
    }
  }

  /**
   * Manipulate URL query parameters
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams
   */
  queryParam(name: string, value?: string) {
    return new QueryParameterManipulator(this, name, value);
  }

  /**
   * Check URL query parameters
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#check
   */
  get queryParams() {
    return new QueryParameterChecker(this);
  }

  /**
   * Manipulate URL query filter parameters
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#filters
   */
  filter(filterKey: string) {
    return FilterParameterManipulator.fromUrl(this, filterKey);
  }

  /**
   * Check URL query filter parameters
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/queryParams#filters
   */
  get filters() {
    return new FilterParameterChecker(this);
  }

  /**
   * Clear all params from URL
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/flexUrl#clear
   */
  clear() {
    this.params = [];

    return this;
  }

  /**
   * Parse Flex URL back to string
   *
   * @see Docs https://flex-url.opensoutheners.com/docs/toString
   */
  toString() {
    return [
      this.baseUrl,
      this.params.map(parameter => parameter.toString()).join('&'),
    ]
      .filter(Boolean)
      .join('?') + this.hashFragment;
  }
}

export function flexUrl(url?: string | URL | Location) {
  return new FlexibleUrl(url);
}
