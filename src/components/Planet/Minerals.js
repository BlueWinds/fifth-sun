import sumBy from 'lodash/fp/sumBy'

import displayNumber from '@lib/displayNumber'
import displayMass from '@lib/displayMass'

const description = resources => {
  const total = sumBy('amount', Object.values(resources.minerals))
  if (!total) {
    return 'None'
  }

  const averageConcentration = sumBy(({concentration, amount}) => (concentration * amount), Object.values(resources.minerals)) / total

  return `${displayMass(total)} at ${displayNumber(averageConcentration)}`
}

export default function Minerals({object}) {
  if (!object.resources) { return null }

  return <span>{description(object.resources)}</span>
}
