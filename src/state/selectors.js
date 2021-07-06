import {useSelector} from 'react-redux'
import pickBy from 'lodash/fp/pickBy'
import mapValues from 'lodash/fp/mapValues'
import isArray from 'lodash/fp/isArray'
import get from 'lodash/fp/get'
import last from 'lodash/fp/last'
import isEqual from 'lodash/fp/isEqual'
import {distance, getFullCartesian} from '@lib/orbits'

const beginsWith = (pattern, subject) => isEqual(pattern, subject.slice(0, pattern.length))

export const useShips = (path, includeChildren = []) => {
  const includedPath = ship => {
    if (typeof last(ship.location) !== 'string') { return false; }
    if (isEqual(ship.location, path)) { return true; }
    return includeChildren.some(child => beginsWith(child, ship.location))
  }

  const factions = useSelector(state => mapValues(faction => ({
    color: faction.color,
    ships: pickBy(includedPath, faction.ships),
  }), state.game.factions))

  return pickBy(faction => Object.keys(faction.ships).length, factions)
}

export const useInflightShips = (system) => {
  const inFlight = ship => ship.location[0] === system && isArray(ship.location[1])

  const factions = useSelector(state => mapValues(faction => ({
    color: faction.color,
    ships: pickBy(inFlight, faction.ships),
  }), state.game.factions))

  return pickBy(faction => Object.keys(faction.ships).length, factions)
}

export const useNearbyShips = (system, position, maxDistance) => {
  const nearby = ship => (
    ship.location[0] === system
    && isArray(ship.location[1])
    && distance(position, ship.location[1]) < maxDistance
  )

  const factions = useSelector(state => mapValues(faction => ({
    color: faction.color,
    ships: pickBy(nearby, faction.ships),
  }), state.game.factions))

  return pickBy(faction => Object.keys(faction.ships).length, factions)
}

export const useObject = path => {
  return useSelector(state => isArray(path[1]) ? state.game.systems[path[0]] : get(path, state.game.systems))
}

export const useNearbyObjects = (system, position, maxDistance) => {
  const state = useSelector(state => state)

  const nearby = (path) => distance(position, getFullCartesian(path, state)) <= maxDistance

  let paths = []

  function checkObjects(object, path) {
    Object.entries(object.objects).forEach(([key, object]) => {
      const workingPath = [...path, 'objects', key]
      if (nearby(workingPath)) { paths.push(workingPath) }
      checkObjects(object, workingPath)
    })
  }

  checkObjects(state.game.systems[system], [system])

  return paths
}

export const useShip = path => {
  return useSelector(state => get(path, state.game.factions))
}
