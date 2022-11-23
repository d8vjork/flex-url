# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.6.0] - 2022-11-23

### Changed

- `filters.get(key)` now only gets an array or object without having the same keyed object as `filters.all()` (we know what the key is)

## [1.5.0] - 2022-11-23

### Changed

- `filters.all()` & `filters.get(key)` methods now returns an keyed by filter key (`filter[name]` changed to `name`) and possibly returning an array of objects including modifiers (`{'filter[name][modifier1][modifier2]': ['value1', 'value2'] ...}` to `name: {modifiers: ['modifier1', 'modifier2'], value: ['value1', 'value2']}`)

### Fixed

- `filters.all()` & `filters.get(key)` returning AND filters being impossible as an object with same keys

## [1.4.0] - 2022-11-23

### Added

- `remove` making all arguments optional, so it removes all query parameters with same key

## [1.3.0] - 2022-11-23

### Added

- `sort` to modify sort parameter values
- `sorts` method to check sort parameter values (sorted as ascendant or descendant)

## [1.2.0] - 2022-11-22

### Added

- `queryParams.get` method to get parameters as object based on provided key and/or modifier(s)
- `queryParams.all` method to get all parameters as object
- `filters.get` method to get filter parameters as object based on provided filter key and/or modifier(s)
- `filters.all` method to get all filter parameters as object

## [1.1.0] - 2022-11-21

### Added

- `strict` parameter to `has` and `find` methods on `queryParams`
- `includes` method on `queryParams`

### Changed

- Internal API on `QueryParameter` class
- Some minor internal changes on `QueryParameterChecker` and `FilterParameterChecker`

### Fixed

- Reactivity compatibility with Vue. **Please use `reactive` function**

## [1.0.5] - 2022-11-21

### Added

- `replace` method to query & filters parameters
- `toggle` method to filters parameters
- `append` method to filters parameters
- Functional `or` & `and` methods in filters parameters

### Changed

- `append` using encoded value instead of `QueryParameter.rawValue` (added raw options)
- `append` triggering error when no value when indexes were only needed

## [1.0.4] - 2022-11-20

### Added

- Filters toggle method

### Changed

- Add return types everywhere

## [1.0.3] - 2022-11-20

### Changed

- Package exports now class and function

## [1.0.2] - 2022-11-20

### Fixed

- Added Location type to `flexUrl` function (typo)

## [1.0.1] - 2022-11-20

### Fixed

- Safer URL parsing reusing URL

## [1.0.0] - 2022-11-18

### Added

- Support to ESM

### Changed

- **Full refactor! All methods has been replaced to a more clear API**

### Removed

- Deprecate NodeJS v12 in favour of ESM (and required by Mocha 10 - package development)

## [0.8.0] - 2022-11-15

### Fixed

- Prevent adding more AND filters when name and value are same as one of the presents

### Added

- Replacing filters with values method `replaceFilter(key, oldValue, newValue)` (useful when using multiple AND filters with same name)
- Replace all filters with specified value method `replaceAllFilters(key, value)`

## [0.7.4] - 2022-11-03

### Fixed

- Removing filters with AND returns error

## [0.7.3] - 2022-11-03

### Fixed

- Removing filters that aren't present on the URL was adding them instead

## [0.7.2] - 2022-10-31

### Fixed

- Improve `filterBy` with AND adds new query param

## [0.7.1] - 2022-06-10

### Fixed

- Parsing an already encoded URL

## [0.7.0] - 2021-12-10

### Added

- ESLint + Prettier as part of the development
- `hasSort` method to check if the attribute is sorted

### Fixed

- `sortBy`, `sortByDesc`, `sortByAsc` method now toggles properly removing sorts by same attribute (doesn't create duplicates)

## [0.6.0] - 2021-11-30

### Added

- `removeFilter` method that removes a filter by key or value (on OR filters will remove only the value)

## [0.5.0] - 2021-11-30

### Added

- `getFiltersAsObject` method that returns filters (attributes with its filtered values)

### Fixed

- Regression: Query params parser in browser not getting strings from params

## [0.4.3] - 2021-11-29

### Fixed

- Query params parser in browser not getting strings from params

## [0.4.2] - 2021-11-26

### Changed

- `filterBy` with same key should replace filter value unless sent as OR

## [0.4.1] - 2021-11-26

### Fixed

- Fixed `createFlexUrl` failing to parse with some URLs

## [0.4.0] - 2021-11-26

### Changed

- Add `and` parameter to method `filterBy()` for filter with _OR_ operand (`filter[myattribute]=one,two`)

### Added

- Add `orFilterBy()` same as the one in `filterBy` (alias)

## [0.3.0] - 2021-11-26

### Added

- Method `getFilters()` for get an array of attributes filtered

## [0.2.0] - 2021-11-26

### Changed

- Add function type as first parameter (key) to method `removeQuery()` for removing multiple parameters conditionally

### Added

- Module exports 2 more types: `SortDirection` and `UrlProtocol`
- Method `clearSorts()` for remove all sorts
- Method `clearFilters(except = [])` for remove all or some filter query parameters

## [0.1.1] - 2021-11-25

### Added

- Missing types from NPM publication

## [0.1.0] - 2021-11-25

### Added

- First release!
