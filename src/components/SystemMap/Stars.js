import {useDispatch} from 'react-redux'

import ConfigurableTable from '@components/ConfigurableTable'
import displayMass from '@lib/displayMass'
import displayStarClass from '@lib/displayStarClass'

const sort = (a, b, sortKey) => {
  const ap = a.object.params
  const bp = b.object.params

  switch (sortKey) {
    case 'name':
      return a.object.displayName.localeCompare(b.object.displayName)
    case 'mass':
      return ap.mass - bp.mass
    default:
      return 0
  }
}

export default function OrbitalParams({path, system}) {
  const dispatch = useDispatch()

  const cols = [
    {key: 'name', children: 'Name'},
    {key: 'class', children: 'Class'},
    {key: 'mass', children: 'Mass', title: ''},
  ]

  const makeRow = ([key, object]) => {
    const row = [
      (<button className="btn btn-sm" onClick={() => dispatch({type: 'SELECT_OBJECT', path: [...path, 'objects', key]})}>
        {object.displayName}
      </button>),
      displayStarClass(object.params.mass),
      displayMass(object.params.mass),
    ]
    row.object = object
    return row
  }

  const rows = Object.entries(system.objects).map(makeRow)

  return <ConfigurableTable table="Stars" cols={cols} rows={rows} sort={sort} label="Stars" />
}

