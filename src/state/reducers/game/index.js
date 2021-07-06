import { combineReducers } from 'redux'
import reduce from 'lodash/fp/reduce'

import time from './time'
import systems from './systems'
import factions from './factions'
import applyOrders from '@components/Ship/orders/applyOrders'

function ordersComplete(state, duration) {
  return reduce((result, faction) => {
    return reduce((result, ship) => {
      const {done, durations} = applyOrders(ship, state, result.duration);
      return {
        done: result.done || done,
        duration: Math.min(result.duration, ...durations),
      }
    }, result, faction.ships);
  }, {duration, done: false}, state.game.factions);
}

const gameInternal = combineReducers({
  name: (state = 'New Game', action) => (action.type === 'RENAME_GAME' ? action.name : state),
  player: (state = 'UNS', action) => state,
  time,
  systems,
  factions,
});

const game = (state, action) => {
  let newState = gameInternal(state, action)
  while (newState.time.ticking) {
    const {duration, done} = ordersComplete({game: newState}, newState.time.ticking);

    if (isNaN(duration)) { throw new Error('NaN tick duration'); }
    if (duration === 0) { throw new Error("duration of 0, some order isn't properly completing") }

    newState = gameInternal(newState, {type: 'PASS_TIME', state: {game: newState}, duration, done, rng: action.rng})
  }
  return newState
}

export default game
