# Flex Url

[![Test](https://github.com/d8vjork/flex-url/actions/workflows/tests.yml/badge.svg)](https://github.com/d8vjork/flex-url/actions/workflows/tests.yml) [![Codacy Badge](https://app.codacy.com/project/badge/Coverage/1686013d21874d88bf8dd5ca506fc10a)](https://www.codacy.com/gh/open-southeners/flex-url/dashboard?utm_source=github.com&utm_medium=referral&utm_content=open-southeners/flex-url&utm_campaign=Badge_Coverage) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/1686013d21874d88bf8dd5ca506fc10a)](https://www.codacy.com/gh/open-southeners/flex-url/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=open-southeners/flex-url&amp;utm_campaign=Badge_Grade) [![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo) [![NPM Downloads](https://img.shields.io/npm/dm/flex-url)](https://www.npmjs.com/package/flex-url) [![NPM Version](https://img.shields.io/npm/v/flex-url)](https://www.npmjs.com/package/flex-url) [![bundlephobia minified size](https://badgen.net/bundlephobia/min/flex-url)](https://bundlephobia.com/package/flex-url) [![bundlephobia dependencies](https://badgen.net/bundlephobia/dependency-count/flex-url)](https://bundlephobia.com/package/flex-url) [![bundlephobia tree-shaking](https://badgen.net/bundlephobia/tree-shaking/flex-url)](https://bundlephobia.com/package/flex-url) [![Edit on VSCode online](https://img.shields.io/badge/vscode-edit%20online-blue?logo=visualstudiocode)](https://vscode.dev/github/open-southeners/flex-url)

Flex Url is a utility with almost zero dependencies that aims simplicity at the time of parsing and modifying a URL on a browser or node based app.

## Documentation

[Check the official documentation here](https://docs.opensoutheners.com/flex-url).

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
