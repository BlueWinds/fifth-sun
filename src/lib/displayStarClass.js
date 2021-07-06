export default function displayMass(weight) {
  const ms = weight / 1.98847e30
  if (ms > 16) {
    return 'O'
  }
  if (ms > 2.1) {
    return 'B'
  }
  if (ms > 1.4) {
    return 'A'
  }
  if (ms > 1.04) {
    return 'F'
  }
  if (ms > 0.8) {
    return 'G'
  }
  if (ms > 0.45) {
    return 'K'
  }
  if (ms > 0.08) {
    return 'M'
  }
  return 'L'
}
