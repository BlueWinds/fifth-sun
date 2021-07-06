import { combineReducers } from 'redux'

// alea is used because it has a small amount of internal state (seedradom's default is big)
import {alea} from 'seedrandom'

import view from './view'
import game from './game'

const load = key => JSON.parse(localStorage[key])
const save = (key, state) => localStorage[key] = JSON.stringify(state)

const combined = combineReducers({
  view,
  game,
});

const debounceMs = 1000
let last = 0, lastType = ''

export default function rootReducer(state = {}, action) {
  // Some actions, like zoom and drag, occur frequently, so we only log them up to once a second.
  const log = process.env.NODE_ENV === 'development' && (Date.now() - last > debounceMs || lastType !== action.type)

  if (log) {
    const {type, ...payload} = action
    console.groupCollapsed(type)
    console.log('State', state)
    console.log('Payload', payload)
    console.time(type)
  }

  // LOAD and SAVE are special actions in that they replace (or save) state wholesale,
  // rather than updating a specific piece of it.
  // Thus, they live outside of the usual combineReducers structure.
  if (action.type === 'LOAD') { return load(action.key); }

  // This "middleware" function takes the state and adds a callable function to every action.
  // Before each call to the reducer, we initialize the function with its previous internal state, and after
  // the reducer we persist the updated internal state. This means that the state is always a simple object,
  // for easy persistence and restoration.
  const {rng, ...restOfState} = state

  // The irony of seeding an rng with another random number amuses me.
  action.rng = rng ? alea('', {state: rng}) : alea(Math.random(), {state: true})

  // If the reducer throws the rng part of state isn't updated, so we can deterministically reproduce
  // the throw by emitting the same action again.
  const newState = {
    ...combined(restOfState, action),
    rng: action.rng.state(),
  }

  save('fifthSun', newState)
  if (action.type === 'SAVE') { save(action.key, newState) }

  if (log) {
    console.timeEnd(action.type)
    console.log('Result', newState)
    console.groupEnd()
    last = Date.now()
    lastType = action.type
  }

  return newState
}
