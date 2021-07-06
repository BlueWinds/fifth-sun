import n from './displayNumber'

export default function displayAcceleration(acc) {
  const kg = acc / 9.80665e3
  if (kg > 1) {
    return <span title="Thousand standard gravities (9.8k m/s^2)">{n(kg)} g</span>
  }

  const g = acc / 9.80665
  if (g > 0.01) {
    return <span title="Standard gravity (9.8 m/s^2)">{n(g)} g</span>
  }

  const cms2 = acc * 100
  if (cms2 > 0.01) {
    return <span>{n(cms2)} cm/s<sup>2</sup></span>
  }

  return <span>{"<"}0.1 mm/s<sup>2</sup></span>
}
