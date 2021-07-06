import {useDispatch} from 'react-redux'
import flatten from 'lodash/fp/flatten'
import sumBy from 'lodash/fp/sumBy'

import ConfigurableTable from '@components/ConfigurableTable'
import displayMass from '@lib/displayMass'
import {getFuel} from '@lib/shipCalculations'

const sort = (a, b, sortKey) => {

  switch (sortKey) {
    case 'name':
      return a.ship.displayName.localeCompare(b.ship.displayName)
    case 'faction':
      return a.ship.faction.localeCompare(b.ship.faction)
    case 'displacement':
      return a.ship.displacement - b.ship.displacement
    case 'crew':
      return sumBy('crew', a.ship.components) - sumBy('crew', b.ship.components)
    case 'fuel':
      const aFuel = getFuel(a.ship)
      const bFuel = getFuel(b.ship)
      return aFuel[0] / aFuel[1] - bFuel[0] / bFuel[1]
    default:
      return 0
  }
}

export default function Ships({ships, label}) {
  const dispatch = useDispatch()

  const cols = [
    {key: 'name', children: 'Name'},
    {key: 'faction', children: 'Faction', title: ''},
    {key: 'displacement', children: 'Mass', title: 'Dry-mass of the ship before inertial disconnect'},
    {key: 'crew', children: 'Crew', title: ''},
    {key: 'fuel', children: 'Fuel'},
  ]

  const makeRow = (faction, [key, ship]) => {
    const fuel = getFuel(ship)

    const row = [
      (<button className="btn btn-sm" onClick={() => dispatch({type: 'SELECT_SHIP', path: [faction, 'ships', key]})}>
        {ship.displayName}
      </button>),
      faction,
      displayMass(ship.displacement),
      sumBy('crew', ship.components),
      `${Math.round(fuel[0] / fuel[1] * 100)}% (${displayMass(fuel[0])})`,
    ]
    row.faction = faction
    row.ship = ship
    return row
  }

  const rows = flatten(Object.entries(ships).map(([faction, {ships}]) => {
    return Object.entries(ships).map(ship => makeRow(faction, ship))
  }))

  return <ConfigurableTable table="Ships" cols={cols} rows={rows} sort={sort} label={label} />
}
