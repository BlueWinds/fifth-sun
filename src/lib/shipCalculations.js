import sumBy from 'lodash/fp/sumBy'

const components = (type, ship) => ship.components.filter(c => c.type === type)

export const getFuel = ship => {
  const tanks = components('Fuel Tank', ship)
  return [sumBy('fuel', tanks), sumBy('capacity', tanks)]
}

export const getMaxSpeed = ship => {
  const engines = components('Engine', ship)
  return sumBy('thrust', engines) / ship.displacement
}

export const getFuelConsumption = ship => {
  const engines = components('Engine', ship)
  return sumBy(e => (e.thrust * e.efficiency), engines)
}

export const getSupplies = ship => {
  const quarters = components('Crew Quarters', ship)
  return [sumBy('supplies', quarters), sumBy('capacity', quarters), sumBy('efficiency', quarters) / quarters.length]
}

export const getRepairPoints = ship => {
  const engineering = components('Engineering', ship)
  return [sumBy('supplies', engineering), sumBy('capacity', engineering), sumBy('repairPoints', engineering)]
}

export const getArmor = ship => {
  const armor = components('Armor', ship)
  return armor[0]
}

export const isLanded = ship => ship.location[1] === 'objects'
