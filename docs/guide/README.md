::: tip
More usage in details at [Using the library](usage.md)
:::

# Introduction

Install with the following command:

```sh
yarn add flex-url
# or
npm i flex-url
```

## Getting started

### Browser

And for a basic usage of this library you can do the following example:

```js
import { createFlexUrl } from 'flex-url';

var url = 'http://api.mywebsite.com/';

url = createFlexUrl(url).sortByDesc('bar').sortBy('foo').toString();

console.log(url)
```

### NodeJS

```js
const { createFlexUrl } = require('flex-url');

let url = 'http://api.mywebsite.com/';

url = createFlexUrl(url).sortByDesc('bar').sortBy('foo').toString();

console.log(url)
```
