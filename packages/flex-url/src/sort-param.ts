import {type FlexibleUrl} from './flex-url.js';
import {type QueryParameterManipulator} from './query-params.js';

export type SortDirection = 'asc' | 'desc';
export type SortParameterValuesAsObject = Record<string, SortDirection>;

export class SortParameterChecker {
  constructor(private readonly flexUrl: FlexibleUrl) {}

  has(value: string, direction: SortDirection = 'asc'): boolean {
    return this.flexUrl.queryParams.has('sort', direction === 'asc' ? value : `-${value}`);
  }

  byAsc(value: string): boolean {
    return this.has(value);
  }

  byDesc(value: string): boolean {
    return this.has(value, 'desc');
  }

  all(): Record<string, SortDirection> {
    const allSortValuesObject: SortParameterValuesAsObject = {};
    const sortValues = this.flexUrl.queryParams.get('sort')?.value ?? [];

    for (let i = 0; i < sortValues.length; i++) {
      let sortValue = sortValues[i];
      let sortedAs: SortDirection = 'asc';

      if (sortValue.startsWith('-')) {
        sortValue = sortValue.slice(1);
        sortedAs = 'desc';
      }

      allSortValuesObject[sortValue] = sortedAs;
    }

    return allSortValuesObject;
  }
}

export class SortParameterManipulator {
  private direction: SortDirection = 'asc';

  constructor(private readonly sortParameter: QueryParameterManipulator) {}

  static fromUrl(flexUrl: FlexibleUrl): SortParameterManipulator {
    return new SortParameterManipulator(flexUrl.queryParam('sort'));
  }

  get asc(): this {
    this.direction = 'asc';

    return this;
  }

  get desc(): this {
    this.direction = 'desc';

    return this;
  }

  toggle(value: string, direction?: SortDirection) {
    const sortDirection = direction ?? this.direction;
    let sortValue = value;
    let possiblyPreviousValue = `-${value}`;

    if (sortDirection === 'desc') {
      sortValue = `-${sortValue}`;
      possiblyPreviousValue = value;
    }

    if (!this.sortParameter.exists) {
      return new SortParameterManipulator(this.sortParameter.add(sortValue));
    }

    return new SortParameterManipulator(this.sortParameter.replace(oldValue => {
      const parameterValues = oldValue.split(',');
      const foundPreviousValue = parameterValues.indexOf(possiblyPreviousValue);

      if (foundPreviousValue !== -1) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete parameterValues[foundPreviousValue];
      }

      parameterValues.push(sortValue);

      return parameterValues.join(',');
    }));
  }
}
