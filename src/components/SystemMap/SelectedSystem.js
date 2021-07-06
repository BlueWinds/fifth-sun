import {useDispatch} from 'react-redux'

import Stars from './Stars'
import {useInflightShips, useObject} from '@state/selectors'
import Ships from './Ships'

export default function SelectedSystem({path}) {
  const dispatch = useDispatch()
  const system = useObject(path)
  const ships = useInflightShips(path[0])

  const center = () => dispatch({type: 'RECENTER', center: [0, 0]})

  return <>
    <h2>
      {system.displayName}{' '}
      <button className="btn btn-outline-info btn-sm" onClick={center} title={`Center on ${system.displayName}`}>༓</button>{' '}
    </h2>
    <Ships ships={ships} label="Non-Inertial Ships" />
    <Stars system={system} path={path} />
  </>
}
