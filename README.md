# FlexUrl

[![Test](https://github.com/d8vjork/flex-url/actions/workflows/tests.yml/badge.svg)](https://github.com/d8vjork/flex-url/actions/workflows/tests.yml) [![Codacy Badge](https://app.codacy.com/project/badge/Coverage/1686013d21874d88bf8dd5ca506fc10a)](https://www.codacy.com/gh/open-southeners/flex-url/dashboard?utm_source=github.com&utm_medium=referral&utm_content=open-southeners/flex-url&utm_campaign=Badge_Coverage) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/1686013d21874d88bf8dd5ca506fc10a)](https://www.codacy.com/gh/open-southeners/flex-url/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=open-southeners/flex-url&amp;utm_campaign=Badge_Grade) [![NPM Downloads](https://img.shields.io/npm/dm/flex-url)](https://www.npmjs.com/package/flex-url) [![NPM Size](https://img.shields.io/bundlephobia/min/flex-url)](https://www.npmjs.com/package/flex-url) [![NPM Version](https://img.shields.io/npm/v/flex-url)](https://www.npmjs.com/package/flex-url) [![Take a peek on VSCode online](https://img.shields.io/badge/vscode-Take%20a%20peek-blue?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACJklEQVQoFYVSS2hTURCdue8l7cv3NT8bYrMqCtYitRZEKKIrwW6kGy0obtzpoqCIC/GBoEUptKDQLgRBKIo7FUW6EHFTN1XxW900IAZFbEiwecn9jPNSGkWwDgz3ztxzzswwF+E/Nujdj8Ri0dPRTGHUyeSnmwT3arF4BTfiDU7MF22CC4LoeDxXENFcEYjgtQG6+U/i0JUn3dRUM4g0wmgrni1AdFOR6wQUXLV3XHu5hSg8LBU8fD++rQxAOODN56Uv5/i+t9URGaUIpTLgBDEBRbBv+u0zvu3h8Kk2NCFWSnVEaxIQhwIQ669y1dls70DWdqJjBCACqq2MniHC7Qi4j/vvJzsiofGzG4QVsD4LglNuyn1MHZHzynCtQI3NXip8uN1b2trJiSlCkYFIhgVZ1K9+stA6unT54PMAOHynGhxtE33vwGp8K2m5Ulaq6QPPAcpJgUz2VPxkTwd4gQrngvwfLr7XwscUwaRs1F3540tdKvVVcksKxC5lzFy+89VYi8gtMY6d39htxpzRRscR4Y0gdQIFaq3hBoDp5yELYOBW5uKLnX6jEbND4XarNhl9xADuN026W7k+WgpeUpcWD5PGqyx8oDUwmZO1atWPd6W57bXVt7YJnofsPMFvc7yFzRaEpwjwEBglXNeFRCq3DjBr9PXwrzN2bjErQzQLWo8wMZRI5yTvdxk3+nJtDW8hEdbW2USya3fCTT8wWj9aLqc//gJwC/Y8vXqalgAAAABJRU5ErkJggg==)](https://vscode.dev/github/open-southeners/flex-url)

FlexUrl is a utility with almost zero dependencies that aims simplicity at the time of parsing and modifying a URL on a browser or node based app.

**Note: For now this package focuses on the query params side.**

## Usage

```sh
npm i -D flex-url
# or
yarn add -D flex-url
```

### NodeJS

```js
const { createFlexUrl } = require('flex-url');

let url = 'http://api.mywebsite.com/';

url = createFlexUrl(url).sortByDesc('bar').sortBy('foo').toString();

console.log(url)
```

### Browser

```js
import { createFlexUrl } from 'flex-url';

var url = 'http://api.mywebsite.com/';

url = createFlexUrl(url).sortByDesc('bar').sortBy('foo').toString();

console.log(url)
```

## API

### Constructor

The constructor accepts a host and params (optional):

```js
import { FlexUrl } from 'flex-url';

new FlexURL('my.website.com')
// my.website.com

new FlexURL('my.website.com', { test: 'foo' })
// my.website.com?test=foo
```

### getQuery

Gets the whole query part of the URL or just the value of one param, accepts an optional key as unique parameter:

```js
import { createFlexUrl } from 'flex-url';

createFlexUrl('http://api.mywebsite.com?foo=bar').getQuery()
// returns: '?foo=bar'

createFlexUrl('http://api.mywebsite.com?foo=bar').getQuery('foo')
// returns: 'bar'
```

### hasQuery

Checks that the query param exists by key and value (optional):

```js
import { createFlexUrl } from 'flex-url';

createFlexUrl('http://api.mywebsite.com?foo=bar').hasQuery('foo')
// returns true

createFlexUrl('http://api.mywebsite.com?foo=bar').hasQuery('foo', 'bar')
// returns true

createFlexUrl('http://api.mywebsite.com?foo=bar').hasQuery('foo', 'test')
// returns false
```

### query

Modify or add a query's key/value:

```js
import { createFlexUrl } from 'flex-url';

createFlexUrl('http://api.mywebsite.com').query('foo').toString()
// returns 'http://api.mywebsite.com?foo='

createFlexUrl('http://api.mywebsite.com').query('foo', 'bar').toString()
// returns 'http://api.mywebsite.com?foo=bar'

createFlexUrl('http://api.mywebsite.com?foo=bar').query('foo', 'test', 'add')
// returns 'http://api.mywebsite.com?foo=bar&foo=test'
```

### addQuery

Same as `query(key, value, 'add')`, adds a value even if its repeated on the query params:

```js
import { createFlexUrl } from 'flex-url';

createFlexUrl('http://api.mywebsite.com?foo=bar').addQuery('foo').toString()
// returns 'http://api.mywebsite.com?foo=bar&foo='

createFlexUrl('http://api.mywebsite.com?foo=bar').addQuery('foo', 'test').toString()
// returns 'http://api.mywebsite.com?foo=bar&foo=test'
```

### setQuery

Same as `query(key, value, 'set')` or `query(key, value)`

```js
import { createFlexUrl } from 'flex-url';

createFlexUrl('http://api.mywebsite.com').setQuery('foo').toString()
// returns 'http://api.mywebsite.com?foo='

createFlexUrl('http://api.mywebsite.com?foo=').setQuery('foo', 'bar').toString()
// returns 'http://api.mywebsite.com?foo=bar'
```

### removeQuery

Removes a query parameter by key and value (optional, if provided it will only delete the parameter with this value):

```js
import { createFlexUrl } from 'flex-url';

createFlexUrl('http://api.mywebsite.com?foo=test&foo=bar').removeQuery('foo').toString()
// returns 'http://api.mywebsite.com'

createFlexUrl('http://api.mywebsite.com?foo=test&foo=bar').removeQuery('foo', 'test').toString()
// returns 'http://api.mywebsite.com?foo=bar'
```

### filterBy

Sets a filter by attribute and value, this is useful for JSON:API like endpoints:

```js
import { createFlexUrl } from 'flex-url';

createFlexUrl('http://api.mywebsite.com').filterBy('foo', 'bar').toString()
// returns 'http://api.mywebsite.com/?filter%5Bfoo%5D=bar'
```

### hasFilter

Checks if the URL has applied a filter with key and value (optional):

```js
import { createFlexUrl } from 'flex-url';

createFlexUrl('http://api.mywebsite.com/?filter%5Bfoo%5D=bar').hasFilter('foo')
// returns true

createFlexUrl('http://api.mywebsite.com/?filter%5Bfoo%5D=bar').hasFilter('foo', 'bar')
// returns true

createFlexUrl('http://api.mywebsite.com/?filter%5Bfoo%5D=bar').hasFilter('foo', 'test')
// returns false
```

### clearFilters

Remove filters with the exception of the ones sent as first parameter as array of attribute names (optional):

```js
import { createFlexUrl } from 'flex-url';

createFlexUrl('http://api.mywebsite.com/?filter%5Bfoo%5D=bar&filter%5Btest%5D=bar').clearFilters().toString()
// returns 'http://api.mywebsite.com/

createFlexUrl('http://api.mywebsite.com/?filter%5Bfoo%5D=bar&filter%5Btest%5D=bar').clearFilters(['foo']).toString()
// returns 'http://api.mywebsite.com/?filter%5Bfoo%5D=bar'
```

### toString

Formats the URL back to string.

## Benchmarks

And here some benchmarks to show up why this library is not only the easiest to use alternative (even for native ones):

```sh
createFlexUrl           x 3,040,944 ops/sec ±1.47% (89 runs sampled)
url-parse               x 562,052 ops/sec ±3.57% (87 runs sampled)
URL (browser native)    x 407,001 ops/sec ±2.09% (86 runs sampled)
```

**Also note that this is the result of just doing parsing on the query search part of the URL.**

## License

This package is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
