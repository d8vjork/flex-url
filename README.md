# FlexUrl

[![Test](https://github.com/d8vjork/flex-url/actions/workflows/tests.yml/badge.svg)](https://github.com/d8vjork/flex-url/actions/workflows/tests.yml) [![Codacy Badge](https://app.codacy.com/project/badge/Coverage/1686013d21874d88bf8dd5ca506fc10a)](https://www.codacy.com/gh/open-southeners/flex-url/dashboard?utm_source=github.com&utm_medium=referral&utm_content=open-southeners/flex-url&utm_campaign=Badge_Coverage) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/1686013d21874d88bf8dd5ca506fc10a)](https://www.codacy.com/gh/open-southeners/flex-url/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=open-southeners/flex-url&amp;utm_campaign=Badge_Grade) [![NPM Downloads](https://img.shields.io/npm/dm/flex-url)](https://www.npmjs.com/package/flex-url) [![NPM Size](https://img.shields.io/bundlephobia/min/flex-url)](https://www.npmjs.com/package/flex-url) [![NPM Version](https://img.shields.io/npm/v/flex-url)](https://www.npmjs.com/package/flex-url) [![Take a peek on VSCode online](https://img.shields.io/badge/vscode-Take%20a%20peek-blue?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACJklEQVQoFYVSS2hTURCdue8l7cv3NT8bYrMqCtYitRZEKKIrwW6kGy0obtzpoqCIC/GBoEUptKDQLgRBKIo7FUW6EHFTN1XxW900IAZFbEiwecn9jPNSGkWwDgz3ztxzzswwF+E/Nujdj8Ri0dPRTGHUyeSnmwT3arF4BTfiDU7MF22CC4LoeDxXENFcEYjgtQG6+U/i0JUn3dRUM4g0wmgrni1AdFOR6wQUXLV3XHu5hSg8LBU8fD++rQxAOODN56Uv5/i+t9URGaUIpTLgBDEBRbBv+u0zvu3h8Kk2NCFWSnVEaxIQhwIQ669y1dls70DWdqJjBCACqq2MniHC7Qi4j/vvJzsiofGzG4QVsD4LglNuyn1MHZHzynCtQI3NXip8uN1b2trJiSlCkYFIhgVZ1K9+stA6unT54PMAOHynGhxtE33vwGp8K2m5Ulaq6QPPAcpJgUz2VPxkTwd4gQrngvwfLr7XwscUwaRs1F3540tdKvVVcksKxC5lzFy+89VYi8gtMY6d39htxpzRRscR4Y0gdQIFaq3hBoDp5yELYOBW5uKLnX6jEbND4XarNhl9xADuN026W7k+WgpeUpcWD5PGqyx8oDUwmZO1atWPd6W57bXVt7YJnofsPMFvc7yFzRaEpwjwEBglXNeFRCq3DjBr9PXwrzN2bjErQzQLWo8wMZRI5yTvdxk3+nJtDW8hEdbW2USya3fCTT8wWj9aLqc//gJwC/Y8vXqalgAAAABJRU5ErkJggg==)](https://vscode.dev/github/open-southeners/flex-url)

FlexUrl is a utility with almost zero dependencies that aims simplicity at the time of parsing and modifying a URL on a browser or node based app.

**Note: For now this package focuses on the query params side.**

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
