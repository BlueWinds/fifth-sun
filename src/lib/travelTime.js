import {getMaxSpeed} from './shipCalculations'
import {progressAllOrbits, getFullCartesian, distance, maxOrbitalSpeed} from './orbits'

export default function travelTime(ship, startLocation, target, state) {
  const maxSpeed = getMaxSpeed(ship)

  if (maxOrbitalSpeed(target, state.game.systems) > maxSpeed) {
    throw new Error('not fast enough')
  }

  let prevFlightTime = 0
  const delta = distance(startLocation[1], getFullCartesian(target, state))
  let flightTime = delta / maxSpeed
  let updatedState = state
  let count = 0

  while (Math.abs(prevFlightTime - flightTime) > 1) {
    updatedState = {...state, game: {systems: progressAllOrbits(flightTime, state.game.systems)}}
    const delta = distance(startLocation[1], getFullCartesian(target, updatedState))

    prevFlightTime = flightTime
    flightTime = delta / maxSpeed
    count++
    if (count > 100) { throw new Error('not converging') }
  }

  return Math.round(flightTime)
}
