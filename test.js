import rateLimit from '.'
import test from 'ava'

const mockCount = 5
const mockMs = 1000
const mockRequests = 15

const epsilonMs = 20
const expectedCycles = Math.max(0, Math.ceil(mockRequests/mockCount) - 1)
test(`last returned Promise of rateLimit(${mockCount}, ${mockMs}) x ${mockRequests} returns after ~${mockMs*expectedCycles}ms`, t => {
  const request = rateLimit(mockCount, mockMs)
  const startTime = Date.now()
  const promises = []
  for (let i = 0; i < mockRequests; i++) promises.push(request())
  return Promise.all(promises).then(() => {
    const durationMs = Date.now() - startTime
    t.ok(durationMs >= expectedCycles*(mockMs - epsilonMs))
    t.ok(durationMs <  expectedCycles*(mockMs + epsilonMs))
  })
})
