const roundToTonne = displacement => Math.ceil(displacement / 1e3) * 1e3

export const structure = displacement => ({
  type: 'Structure',
  displacement: roundToTonne(displacement / 10)
})

export const inertialDisconnect = () => ({
  type: 'Inertial Disconnect',
  displacement: 10e3,
})

export const bridge = displacement => ({
  type: 'Bridge',
  displacement: Math.max(30e3, roundToTonne(displacement / 1e3)),
  crew: Math.ceil(displacement / 2000e3),
})

export const fuelTank = (capacity, fuel) => ({
  type: 'Fuel Tank',
  displacement: roundToTonne(Math.pow(capacity, 2/3)),
  capacity,
  fuel,
})

export const engine = (thrust, power, efficiency) => ({
  type: 'Engine',
  displacement: roundToTonne(thrust / power),
  thrust,
  efficiency,
  crew: thrust / power / 100e3,
})

export const armor = (displacement, layers) => ({
  type: 'Armor',
  displacement: roundToTonne(Math.pow(displacement, 2/3) * layers),
  layers,
  cells: Array(Math.round(Math.pow(displacement, 2/3) / 1e3)).fill(layers),
})

export const engineering = (displacement, repairPoints, capacity, supplies) => ({
  type: 'Engineering',
  displacement: roundToTonne(repairPoints + supplies),
  repairPoints,
  capacity,
  supplies,
  crew: Math.round(repairPoints / 1e3),
})

export const opticalSensors = (resolution) => ({
  type: 'Optical Sensors',
  displacement: roundToTonne(resolution * 1e3),
  resolution,
  crew: Math.round(resolution),
})

export const surveyEquipment = (surveyPoints) => ({
  type: 'Geological Survey Teams',
  displacement: roundToTonne(surveyPoints),
  surveyPoints,
  crew: Math.round(surveyPoints / 100e3),
})

export const crewQuarters = (crew, efficiency, capacity, supplies) => ({
  type: 'Crew Quarters',
  displacement: roundToTonne(crew * 2e3 + Math.pow(capacity, 2/3)),
  efficiency,
  capacity,
  supplies,
})
