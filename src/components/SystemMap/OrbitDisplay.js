import {Fragment} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import isEqual from 'lodash/fp/isEqual'
import map from 'lodash/fp/map'

import {useObject, useShips} from '@state/selectors'
import {getCartesian, semiMinor} from '@lib/orbits'

const G = styled.g`
  text {
    fill: ${props => props.selected ? '#ccc' : '#999'};
    font-weight: ${props => props.selected ? '700' : 'normal'};
  }
`

const OrbitDisplay = ({path, transform}) => {
  const dispatch = useDispatch();
  const {zoom, selected} = useSelector(state => ({
    zoom: state.view.systemMap.zoom,
    selected: state.view.selected.path,
  }));

  const {displayName, params = {}, objects} = useObject(path)
  const {radius, color = '#666', atmosphereColor = '#bbb', atmosphereDepth = 1e3} = params

  let hiddenChildren = []
  const orbits = Object.entries(objects).map(([key, object]) => {
    const childPath = [...path, 'objects', key]

    if (path && object.params.semiMajor / 1e6 < zoom * 12e9 / 1e6) {
      hiddenChildren.push(childPath)
      return null
    }

    // Eliptical orbits are exact, because SVG can draw elliptical curves
    const position = getCartesian(object.params)
    const transform = `translate(${position[0] / 1e9} ${position[1] / 1e9})`

    return <Fragment key={key}>
      <OrbitPath id={`${childPath.join('-')}-orbit`} params={object.params} selected={isEqual(childPath, selected)} />
      <OrbitDisplay path={childPath} transform={transform} />
    </Fragment>
  })
  const ships = useShips(path, hiddenChildren)
  const shipText = map(faction => (<tspan key={faction.color} fill={faction.color}> ({Object.keys(faction.ships).length})</tspan>), ships)

  const atmosphere = `${path.join('-')}-atmosphere`
  const fullRadius = radius + atmosphereDepth
  const onClick = () => dispatch({type: 'SELECT_OBJECT', path})

  return (<svg transform={transform} id={path.join('-')}>
    {orbits}
    {radius && (<>
      <defs>
        <radialGradient id={atmosphere}>
          <stop offset={(radius / fullRadius * 100) + '%'} stopColor={atmosphereColor} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <G cursor="pointer" selected={isEqual(selected, path)} onClick={onClick}>
        <circle r="0.2%" fill={color} />
        <circle r={fullRadius / 1e9} fill={`url(#${atmosphere})`} />
        <text x={zoom * 5 + fullRadius / 2e9} y={-zoom * 5 - fullRadius / 2e9} fontSize={`${zoom * 15}px`}>
          {displayName + (hiddenChildren.length ? ` (${hiddenChildren.length})` : '')}
          {shipText}
        </text>
      </G>
    </>)}
  </svg>)
}

const OrbitPath = ({id, params, selected}) => {
  // We use a path rather than an ellipse because it allows us to define the starting point as the planet's
  // current location. With ellipses, rounding errors come into play, making the planet jump off its orbit
  // when extremely zoomed in.
  const point1 = getCartesian(params)
  const point2 = getCartesian({...params, eccentricAnomaly: params.eccentricAnomaly + Math.PI})

  const semiMaj = params.semiMajor / 1e9
  const semiMin = semiMinor(params) / 1e9
  const rotation = params.argPeriapsis / Math.PI * 180

  return <path id={id} d={[
    'M', point1[0] / 1e9, point1[1] / 1e9, // Start from the planet's current location
    'A', semiMaj, semiMin, rotation, 0, 1, point2[0] / 1e9, point2[1] / 1e9, // Half-ellipse to the opposite point
    'A', semiMaj, semiMin, rotation, 0, 1, point1[0] / 1e9, point1[1] / 1e9, // Half-ellpise back to the starting point
  ].join(' ')} className={selected ? "orbit selected" : "orbit"} />
}

export default OrbitDisplay
