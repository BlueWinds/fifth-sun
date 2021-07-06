import displayMass from './displayMass'

export default function displayRate(rate) {
  return <>{displayMass(rate)}/s</>
}
