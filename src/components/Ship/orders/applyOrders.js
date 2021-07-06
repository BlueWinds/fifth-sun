import set from 'lodash/fp/set'
import memoize from 'memoizee'

import {progressAllOrbits} from '@lib/orbits'
import * as orders from './index'

const noLimit = 1e24

export default memoize(function applyOrders(ship, state, duration = noLimit) {
  let updatedShip = {...ship, orders: [...ship.orders]}
  let updatedState = state
  let remainingDuration = duration
  let done = false
  const durations = []
  while (updatedShip.orders.length && remainingDuration) {
    const result = orders[ship.orders[0].type].apply(updatedShip, updatedState, remainingDuration)
    if (!result.ship) { return result }

    updatedShip = result.ship
    updatedState = set(['game', 'systems'], progressAllOrbits(result.duration, updatedState.game.systems), updatedState)
    updatedState = set(['game', 'time'], updatedState.game.time + result.duration, updatedState)
    durations.push(result.duration)
    if (updatedShip.orders.length === 0) {
      done = true
      break
    }
    remainingDuration -= result.duration
  }

  return {updatedShip, updatedState, durations, done}
}, { max: 1000, length: 3 })
