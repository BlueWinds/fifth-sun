import n from './displayNumber'

export default function displayVelocity(velocity) {
  const c = velocity / 299792458
  if (c > 0.01) {
    return <span title="Speed of light (300,000 km/s)">{n(c * 100)}% c</span>
  }

  const kms = velocity / 1e3
  if (kms >= 1) {
    return <span>{n(kms)} km/s</span>
  }

  if (velocity >= 1) {
    return `${n(velocity)} m/s`;
  }

  return `${n(velocity * 100)} cm/s`;
}
