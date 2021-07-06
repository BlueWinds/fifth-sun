import {createStore} from 'redux'

import rootReducer from './reducers'

const initialState = localStorage.fifthSun ? JSON.parse(localStorage.fifthSun) : {}

export default function state() {
  return createStore(rootReducer, initialState)
}
