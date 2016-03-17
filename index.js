'use strict'

module.exports = function rateLimit (count, ms) {
  let bucket = count
  let queue = []

  return function request () {
    return new Promise(resolve => {
      if (bucket > 0) {
        bucket--
        resolve()
        setTimeout(() => {
          bucket++
          if (queue.length) request().then(queue.pop())
        }, ms)
      }
      else queue.push(resolve)
    })
  }
}
