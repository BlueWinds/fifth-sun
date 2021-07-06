import {useDispatch} from 'react-redux'
import sumBy from 'lodash/fp/sumBy'

import ConfigurableTable from '@components/ConfigurableTable'
import displayTime from '@lib/displayTime'
import displayDistance from '@lib/displayDistance'
import displayMass from '@lib/displayMass'
import displayAcceleration from '@lib/displayAcceleration'
import {getCartesian, distance, surfaceGravity} from '@lib/orbits'
import Minerals from '@components/Planet/Minerals'

const sort = (a, b, sortKey) => {
  const ap = a.object.params
  const bp = b.object.params
  const ar = a.object.resources
  const br = b.object.resources

  switch (sortKey) {
    case 'name':
      return a.object.displayName.localeCompare(b.object.displayName)
    case 'orbitalPeriod':
      return ap.orbitalPeriod - bp.orbitalPeriod
    case 'distance':
      return distance(getCartesian(ap)) - distance(getCartesian(bp))
    case 'gravity':
      return surfaceGravity(ap) - surfaceGravity(bp)
    case 'mass':
      return ap.mass - bp.mass
    case 'surveyed':
      return ar.surveyed - br.surveyed
    case 'minerals':
      return sumBy('amount', Object.values(ar.minerals)) - sumBy('amount', Object.values(br.minerals))
    default:
      return 0
  }
}

export default function OrbitalParams({path, object}) {
  const dispatch = useDispatch()

  const cols = [
    {key: 'name', children: 'Name'},
    {key: 'distance', children: 'Distance', title: 'Current distance from parent'},
    {key: 'orbitalPeriod', children: 'Period', title: 'Orbital period'},
    {key: 'mass', children: 'Mass', title: ''},
    {key: 'gravity', children: 'Gravity', title: 'Surface Gravity'},
    {key: 'surveyed', children: 'Surveyed', title: 'Percentage of surface surveyed'},
    {key: 'minerals', children: 'Minerals', title: 'Sum of all amounts, weighted average concentration'},
  ]

  const makeRow = ([key, object]) => {
    const row = [
      (<button className="btn btn-sm" onClick={() => dispatch({type: 'SELECT_OBJECT', path: [...path, 'objects', key]})}>
        {object.displayName}
      </button>),
      displayDistance(distance(getCartesian(object.params))),
      displayTime(object.params.orbitalPeriod),
      displayMass(object.params.mass),
      displayAcceleration(surfaceGravity(object.params)),
      `${Math.round(object.resources.surveyed * 100)}%`,
      <Minerals object={object} />,
    ]
    row.object = object
    return row
  }

  const rows = Object.entries(object.objects).map(makeRow)

  return <ConfigurableTable table="Natural Bodies" cols={cols} rows={rows} sort={sort} label="Natural Bodies" />
}
