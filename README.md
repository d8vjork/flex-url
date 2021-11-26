# FlexUrl

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

The constructor accepts a host, params (optional) and protocol (optional, defaulted to _http://_, _http://_ or _https://_ for now), like so:

```js
import { FlexUrl } from 'flex-url';

new FlexURL('my.website.com', {}, 'https://')
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

## License

This package is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).