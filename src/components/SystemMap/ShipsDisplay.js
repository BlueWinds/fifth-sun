import {Fragment} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import isEqual from 'lodash/fp/isEqual'
import flatten from 'lodash/fp/flatten'

import {useInflightShips} from '@state/selectors'
import applyOrders from '@components/Ship/orders/applyOrders'
import {distance, getFullCartesian} from '@lib/orbits'

const ShipsDisplay = ({system}) => {
  const dispatch = useDispatch()
  const ships = useInflightShips(system)
  const {zoom, selected, state, tickDuration} = useSelector(state => ({
    zoom: state.view.systemMap.zoom,
    selected: state.view.selected.path,
    state,
    tickDuration: state.game.time.tickDuration,
  }));

  const displayShip = (faction, [key, ship], updatedShip, updatedState) => {
    const onClick = () => dispatch({type: 'SELECT_SHIP', path: [faction, 'ships', key]})
    const transform = `translate(${ship.location[1][0] / 1e9} ${ship.location[1][1] / 1e9})`
    const updatedPosition = getFullCartesian(updatedShip.location, updatedState)
    const lineX = ship.location[1][0] - updatedPosition[0]
    const lineY = ship.location[1][1] - updatedPosition[1]
    const showArrow = distance([lineX, lineY]) / zoom / 1e9 > 8
    const id = `${faction}-${key}`

    return (<g key={id} cursor="pointer" selected={false} onClick={onClick} transform={transform}>
      <circle r={`${zoom * 2}px`} fill={ships[faction].color} />
      <text x={zoom * 5} y={-zoom * 5} fontSize={`${zoom * 15}px`} fill={ships[faction].color} fontWeight={isEqual(selected, [faction, 'ships', key]) ? 700 : 'normal'}>
        {ship.displayName}
      </text>
      {showArrow && (<>
        <marker id={`${id}-marker`} markerWidth="6" markerHeight="12" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L6,3 L0,6 M0,3 L6,3" stroke={ships[faction].color} />
        </marker>
        <line x1="0" y1="0" x2={-lineX / 1e9} y2={-lineY / 1e9} className="trajectory" stroke={ships[faction].color} markerEnd={`url(#${id}-marker)`} />
      </>)}
    </g>)
  }

  return (<>{flatten(Object.entries(ships).map(([faction, {ships: factionShips}]) => {
    return Object.entries(factionShips).map(ship => {
      const { updatedShip, updatedState } =  applyOrders(ship[1], state, tickDuration)
      return displayShip(faction, ship, updatedShip, updatedState)
    }
  )}))}</>)
}

export default ShipsDisplay
