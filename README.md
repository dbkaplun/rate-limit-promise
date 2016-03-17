# rate-limit-promise
Return a promise that is resolved as more requests can be made

## Installation

```sh
$ npm install rate-limit-promise
```

## Usage

```js
const rateLimit = require('rate-limit-promise')

let request = rateLimit(1, 1000) // 1 request per 1000ms = 1 second
Promise.all([request(), request(), request()]).then(() => {
  console.log("2 seconds have passed")
})
```
