# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
