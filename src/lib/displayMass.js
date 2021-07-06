import n from './displayNumber'

export default function displayMass(weight) {
  const ms = weight / 1.98847e30
  if (ms > 0.01) {
    return <span title="Solar masses (1.99e30 kg)">{n(ms)} M<sub>☉</sub></span>
  }

  const me = weight / 5.97237e24
  if (me > 0.1) {
    return <span title="Earth masses (5.97e24 kg)">{n(me)} M<sub>⊕</sub></span>
  }


  const ml = weight / 7.342e22
  if (ml > 0.01) {
    return <span title="Lunar masses (7.34e22 kg)">{n(ml)} M<sub>L</sub></span>
  }

  const tt = weight / 1e15
  if (tt > 1) {
    return `${n(tt)}Tt`;
  }

  const gt = weight / 1e12
  if (gt > 1) {
    return `${n(gt)}Gt`;
  }

  const mt = weight / 1e9
  if (mt > 1) {
    return `${n(mt)}Mt`;
  }

  const kt = weight / 1e6
  if (kt > 1) {
    return `${n(kt)}kt`;
  }

  const t = weight / 1e3
  if (t > 1) {
    return `${n(t)}t`;
  }

  if (weight > 1) {
    return `${n(weight)}kg`;
  }

  return `${n((weight * 1000))}g`;
}
