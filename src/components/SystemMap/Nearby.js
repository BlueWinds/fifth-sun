import {useDispatch, useSelector} from 'react-redux'
import flatten from 'lodash/fp/flatten'
import get from 'lodash/fp/get'
import isEqual from 'lodash/fp/isEqual'

import ConfigurableTable from '@components/ConfigurableTable'
import {useNearbyObjects, useNearbyShips} from '@state/selectors'
import displayDistance from '@lib/displayDistance'
import {distance, getFullCartesian} from '@lib/orbits'

const sort = position => (a, b, sortKey) => {

  switch (sortKey) {
    case 'name':
      return a.displayName.localeCompare(b.displayName)
    case 'faction':
      return a[1].localeCompare(b[1])
    case 'distance':
      return a[2] - b[2]
    default:
      return 0
  }
}

export default function Nearby({system, position, exclude}) {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const maxDistance = state.view.systemMap.zoom * 2e10
  const ships = useNearbyShips(system, position, maxDistance)
  const objects = useNearbyObjects(system, position, maxDistance)

  const cols = [
    {key: 'name', children: 'Name'},
    {key: 'faction', children: 'Faction', title: ''},
    {key: 'distance', children: 'Distance', title: ''},
  ]

  const makeShipRow = (faction, [key, ship]) => {
    const dist = distance(position, ship.location[1])
    const path = [faction, 'ships', key]
    const row = [
      (<button className="btn btn-sm" onClick={() => dispatch({type: 'SELECT_SHIP', path})}>
        {ship.displayName}
      </button>),
      faction,
      displayDistance(dist)
    ]
    row.displayName = ship.displayName
    row.distance = dist
    row.path = path
    return row
  }

  const makeObjectRow = (path) => {
    const dist = distance(position, getFullCartesian(path, state))
    const object = get(path, state.game.systems)
    const row = [
      (<button className="btn btn-sm" onClick={() => dispatch({type: 'SELECT_OBJECT', path})}>
        {object.displayName}
      </button>),
      '',
      displayDistance(dist)
    ]
    row.displayName = object.displayName
    row.distance = dist
    row.path = path
    return row
  }

  const shipRows = flatten(Object.entries(ships).map(([faction, {ships}]) => {
    return Object.entries(ships).map(ship => makeShipRow(faction, ship))
  }))
  const objectRows = objects.map(makeObjectRow)
  const rows = [...shipRows, ...objectRows].filter(row => !exclude.find(isEqual(row.path)))

  return <ConfigurableTable table="Nearby" cols={cols} rows={rows} sort={sort(position)} label="Nearby" />
}
