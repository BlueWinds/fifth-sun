import cloneDeep from 'lodash/fp/cloneDeep'

import choice from './choice'

// Survey in million km^2 increments
export const surveyChunk = 1000000e6

const gasses = [
  'Tritium',
  'Tritium',
  'Tritium',
  'Umbrium',
]

const all = [
  'Tritium',
  'Umbrium',
  'Umbrium',
  'Iron',
  'Iron',
  'Iron',
  'Vanadium',
  'Chromium',
  'Rubidium',
  'Neodymium',
  'Lanthanum',
]

const depositSizes = {
  Tritium: 1e9,
  Iron: 1e9,
  Vanadium: 1000e3,
  Chromium: 800e3,
  Rubidium: 600e3,
  Neodymium: 200e3,
  Lanthanum: 100e3,
  Umbrium: 1e3,
}

const chooseMineral = (object, rng) => {
  if (object.params.atmosphereDepth > 1e6) {
    return choice(gasses, rng)
  }

  return choice(all, rng)
}

const addDeposit = (object, resources, rng) => {
  const mineral = chooseMineral(object, rng)
  const amount = depositSizes[mineral] / (0.01 + rng() + rng())
  const concentration = Math.pow(rng(), 0.66)

  const p = resources.minerals[mineral] || {amount: 0, concentration: 0}

  resources.minerals[mineral] = {
    amount: p.amount + amount,
    concentration: (p.concentration * p.amount + concentration * amount) / (p.amount + amount),
  }
}

export default function survey(object, surveyPoints, rng) {
  const surfaceArea = object.params.radius * object.params.radius * 4 * Math.PI
  const percent = Math.min(1 - object.resources.surveyed, surveyPoints / surfaceArea)

  const resources = cloneDeep(object.resources);

  let remainingPoints = percent * surfaceArea
  while (remainingPoints > 0) {
    const portionOfChunk = Math.min(1, remainingPoints / surveyChunk)
    if (rng() < 0.03 * portionOfChunk) {
      addDeposit(object, resources, rng)
    }
    remainingPoints -= surveyChunk
  }

  return {
    ...object,
    resources: {
      ...resources,
      surveyed: object.resources.surveyed + percent,
    }
  }
}
