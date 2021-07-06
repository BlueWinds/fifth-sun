import {useDispatch, useSelector} from 'react-redux'

import OrbitalParams from './OrbitalParams'
import {getFullCartesian} from '@lib/orbits'
import Ships from './Ships'
import {useObject, useShips} from '@state/selectors'
import Nearby from './Nearby'

export default function SelectedObject({path}) {
  const parentPath = path.slice(0, -2)

  const dispatch = useDispatch()
  const object = useObject(path)
  const parent = useObject(parentPath)
  const ships = useShips(path)

  const {position, zoom} = useSelector(state => ({position: getFullCartesian(path, state), zoom: state.view.systemMap.zoom}))

  const center = () => dispatch({type: 'RECENTER', center: [position[0] / 1e9 / zoom, position[1] / 1e9 / zoom]})

  const onClickOrbiting = () => dispatch(parent.type === 'StarSystem' ?
    {type: 'SELECT_SYSTEM', path: parentPath}
  : {type: 'SELECT_OBJECT', path: parentPath})
  const orbiting = (<button className="btn btn-outline-info btn-sm" onClick={onClickOrbiting} title="Select parent">
    {parent.displayName}
  </button>)

  return <>
    <h2>
      {object.displayName}{' '}
      <button className="btn btn-outline-info btn-sm" onClick={center} title={`Center on ${object.displayName}`}>༓</button>{' '}
      {orbiting}
    </h2>
    <OrbitalParams object={object} path={path} />
    <Ships ships={ships} label="Orbiting Ships" />
    <Nearby system={path[0]} position={position} exclude={[path]} />
  </>
}
