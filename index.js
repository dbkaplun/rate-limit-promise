'use strict'

module.exports = function rateLimit (count, ms) {
  let bucket = count
  let queue = []

  return function request () {
    return new Promise(resolve => {
      if (bucket > 0) {
        bucket--
        resolve()
        let timer = setTimeout(() => {
          bucket++
          if (queue.length) request().then(queue.pop())
        }, ms)
        if (typeof timer.unref === 'function') timer.unref()
      }
      else queue.push(resolve)
    })
  }
}
