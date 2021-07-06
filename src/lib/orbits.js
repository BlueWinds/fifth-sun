import newtonRaphson from './newtonRaphson'
import get from 'lodash/fp/get'
import mapValues from 'lodash/fp/mapValues'
import sortBy from 'lodash/fp/sortBy'
import memoize from 'memoizee'

const G = 6.67430e-11
const square = x => x * x
const cube = x => x * x * x

export const semiMinor = params => params.semiMajor * Math.sqrt(1 - square(params.eccentricity))
export const apoapsis = params => params.semiMajor * (1 + params.eccentricity)
export const periapsis = params => params.semiMajor * (1 - params.eccentricity)

export const distance = (p1, p2 = [0, 0]) => Math.sqrt(square(p1[0] - p2[0]) + square(p1[1] - p2[1]))

export const getCartesian = (params) => {
  const {semiMajor, eccentricity, argPeriapsis, eccentricAnomaly} = params
  if (!semiMajor) { return [0, 0] }

  const cosw = Math.cos(argPeriapsis)
  const sinw = Math.sin(argPeriapsis)

  const xper = semiMajor * (Math.cos(eccentricAnomaly) - eccentricity)
  const yper = semiMinor(params) * Math.sin(eccentricAnomaly)

  return [
    cosw * xper - sinw * yper,
    sinw * xper + cosw * yper,
  ]
}

export const meanAnomaly = ({eccentricAnomaly, eccentricity}) => eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly)

export const eccentricAnomaly = memoize((M, {eccentricity}) => {
  const initial = M + eccentricity * Math.cos(M)
  const F = E => (E - eccentricity * Math.sin(E) - M)
  const dF = E => (1 - eccentricity * Math.cos(E))

  return newtonRaphson(initial, F, dF, 100)
}, { max: 100 })

export const propagateOrbit = (params, duration) => {
  if (!params.orbitalPeriod) { return params; }
  const M = meanAnomaly(params);
  let newM = M + 2 * Math.PI * duration / params.orbitalPeriod
  while (newM >= Math.PI * 2) { newM -= Math.PI * 2 }

  return {
    ...params,
    eccentricAnomaly: eccentricAnomaly(newM, params)
  }
}

export const progressAllOrbits = memoize((duration, systems) => {
  return mapValues(system => progressAllSuborbits(duration, system), systems)
}, { max: 100 })

const progressAllSuborbits = (duration, object) => {
  return {
    ...object,
    params: object.params && propagateOrbit(object.params, duration),
      objects: mapValues(o => progressAllSuborbits(duration, o), object.objects),
  }
}

export const getFullCartesian = memoize((path, state) => {
  if (path[1] instanceof Array) { return path[1] }
  const location = [0, 0];

  let currentPath = path
  while (currentPath.length > 3) {
    const [x, y] = getCartesian(get(currentPath, state.game.systems).params)
    location[0] += x
    location[1] += y
    currentPath = currentPath.slice(0, -2)
  }

  return location
}, { max: 100 })

export const surfaceGravity = params => G * params.mass / square(params.radius)

export const getPrimaryStar = (system, state) => {
  const star = sortBy([1, 'params', 'mass'], Object.entries(state.game.systems[system].objects))[0][0]
  return [system, 'objects', star]
}

export const maxOrbitalSpeed = (path, systems) => {
  let currentPath = path
  let maxSpeed = 0

  while (currentPath.length > 3) {
    const {eccentricity, semiMajor, orbitalPeriod} = get(currentPath, systems).params
    const mu = cube(semiMajor) / square(orbitalPeriod / 2 / Math.PI)
    maxSpeed += Math.sqrt((1 + eccentricity) * mu / ((1 - eccentricity) * semiMajor))
    currentPath = currentPath.slice(0, -2)
  }

  return maxSpeed
}

export const betweenPoints = (a, b, ratio) => {
  return [
    a[0] + (b[0] - a[0]) * ratio,
    a[1] + (b[1] - a[1]) * ratio,
  ]
}
