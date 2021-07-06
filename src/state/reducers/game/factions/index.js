import set from 'lodash/fp/set'
import get from 'lodash/fp/get'
import mapValues from 'lodash/fp/mapValues'

import * as component from '@lib/shipComponents'
import applyOrders from '@components/Ship/orders/applyOrders'

const defaultState = {
  UNS: {
    color: '#2ff',
    shipNamePrefix: 'UNS ',
    shipNameList: 'Japanese',
    ships: {
      Kai: {
        displayName: 'UNS Kai',
        location: ['SolSystem', 'objects', 'Sol', 'objects', 'Venus'],
        displacement: 1000e3,
        components: [
          component.structure(1000e3),
          component.inertialDisconnect(),
          component.bridge(1000e3),
          component.fuelTank(2414e3, 2414e3),
          component.engine(10000e3 * 10e3, 50000, 0.1e-9),
          component.armor(1000e3, 3),
          component.engineering(1000e3, 1e3, 10e3, 10e3),
          component.opticalSensors(1),
          component.surveyEquipment(500e3),
          component.crewQuarters(10, 0.001, 10 * 10e3, 10*10e3),
        ],
        orders: [],
      },
      Yoshito: {
        displayName: 'UNS Yoshito',
        location: ['SolSystem', [1e12, 0]],
        displacement: 1000e3,
        components: [
          component.structure(1000e3),
          component.inertialDisconnect(),
          component.bridge(1000e3),
          component.fuelTank(2414e3, 2414e3),
          component.engine(1000e3 * 10e3, 50000, 0.1e-9),
          component.armor(1000e3, 3),
          component.engineering(1000e3, 1e3, 10e3, 10e3),
          component.opticalSensors(1),
          component.surveyEquipment(500e3),
          component.crewQuarters(10, 0.001, 10 * 10e3, 10*10e3),
        ],
        orders: [],
      }
    },
    messages: [],
  }
}

function progressAllOrders(factions, duration, state) {
  return mapValues(faction => {
    return {...faction, ships: mapValues(ship => {
      return applyOrders(ship, state, duration).updatedShip
    }, faction.ships)}
  }, factions)
}

export default function factions(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_ORDER':
      action.order.id = action.rng()
      return set(action.path, [...get(action.path, state), {...action.order}], state)
    case 'REMOVE_ORDER':
      const index = action.path.pop()
      const newOrders = [...get(action.path, state)]
      newOrders.splice(index, 1)
      return set(action.path, newOrders, state)
    case 'UPDATE_ORDER':
      return set(action.path, action.order, state)
    case 'REORDER_ORDERS':
      return set(action.path, action.newOrders, state)
    case 'PASS_TIME':
      return progressAllOrders(state, action.duration, action.state)
    default:
      return state
  }
}
