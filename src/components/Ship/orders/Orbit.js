import get from 'lodash/fp/get'
import set from 'lodash/fp/set'

import SelectObject from '@components/SelectObject'
import Order from './Order'
import {getMaxSpeed, isLanded} from '@lib/shipCalculations'
import {progressAllOrbits, getFullCartesian, getPrimaryStar, maxOrbitalSpeed, betweenPoints} from '@lib/orbits'
import travelTime from '@lib/travelTime'
import displayVelocity from '@lib/displayVelocity'

export default function Orbit({order, path, update, duration}) {
  const label = <>
    Enter orbit of <SelectObject currentTarget={order.target} onSelect={target => update({...order, target})} />
  </>

  return <Order id={order.id} label={label} path={path} duration={duration}></Order>
}

export const label = 'Orbit'

export function create(ship, state) {
  return {
    type: 'Orbit',
    takeoff: isLanded(ship) * 3600,
    speed: getMaxSpeed(ship),
    target: getPrimaryStar(ship.location[0], state),
  }
}

export function apply(ship, state, duration) {
  const order = ship.orders[0]
  if (order.takeoff > duration) {
    return {
      ship: set('orders.0', {...order, takeoff: order.takeoff - duration}, ship),
      duration,
    }
  }

  try {
    const stateAfterTakeoff = {...state, game: {systems: progressAllOrbits(order.takeoff, state.game.systems)}}
    const startLocation = [ship.location[0], getFullCartesian(ship.location, stateAfterTakeoff)]
    const flightTime = travelTime(ship, startLocation, order.target, stateAfterTakeoff)

    if (order.takeoff + flightTime <= duration) {
      return {
        duration: flightTime + order.takeoff,
        ship: {
          ...ship,
          orders: ship.orders.slice(1),
          location: order.target,
        },
      }
    }

    // Not enough time to reach the destination, apply partial travel
    const stateOnArrival = {...state, game: {systems: progressAllOrbits(flightTime, stateAfterTakeoff.game.systems)}}

    return {
      ship: {
        ...ship,
        orders: [{...order, takeoff: 0}, ...ship.orders.slice(1)],
        location: [ship.location[0], betweenPoints(startLocation[1], getFullCartesian(order.target, stateOnArrival), duration / flightTime)]
      },
      duration,
    }
  } catch (e) {
    const orbitSpeed = maxOrbitalSpeed(order.target, state.game.systems)
    const shipSpeed = getMaxSpeed(ship)
    return <>
      {ship.displayName} ({displayVelocity(shipSpeed)}) isn't fast enough to catch {get(order.target, state.game.systems).displayName} ({displayVelocity(orbitSpeed)})
    </>
  }
}
