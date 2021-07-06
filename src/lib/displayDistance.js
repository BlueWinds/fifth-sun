import n from './displayNumber'

export default function displayDistance(distance) {
  const ly = distance / 9460.73e12
  if (ly > 0.01) {
    return <span title="Light Years (9.5e12 km, 63200 AU)">{n(ly)}ly</span>
  }

  const au = distance / 149.5978707e9
  if (au > 0.01) {
    return <span title="Astronomical Unit (149e6 km)">{n(au)}au</span>
  }

  const kkm = distance / 1e6
  if (kkm > 1) {
    return `${n(kkm)}k km`;
  }

  const km = distance / 1e3
  if (kkm > 1) {
    return `${n(km)}km`;
  }

  if (distance > 1) {
    return `${n(distance)}m`;
  }

  return `${n(distance * 100)}cm`;
}
