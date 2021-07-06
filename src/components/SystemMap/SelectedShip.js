import {useDispatch, useSelector} from 'react-redux'
import sumBy from 'lodash/fp/sumBy'
import sum from 'lodash/fp/sum'

import {getFullCartesian} from '@lib/orbits'
import {useObject, useShip} from '@state/selectors'
import displayRate from '@lib/displayRate'
import displayMass from '@lib/displayMass'
import displayTime from '@lib/displayTime'
import displayVelocity from '@lib/displayVelocity'
import {getArmor, getMaxSpeed, getFuel, getFuelConsumption, getSupplies, getRepairPoints} from '@lib/shipCalculations'
import Armor from '@components/Ship/Armor'
import Orders from '@components/Ship/Orders'
import Nearby from './Nearby'

const SelectShip = ({path}) => {
  const dispatch = useDispatch()
  const ship = useShip(path)
  const parent = useObject(ship.location)

  const {position, zoom} = useSelector(state => ({position: getFullCartesian(ship.location, state), zoom: state.view.systemMap.zoom}))

  const center = () => dispatch({type: 'RECENTER', center: [position[0] / 1e9 / zoom, position[1] / 1e9 / zoom]})

  const onClickOrbiting = () => dispatch(parent.type === 'StarSystem' ?
    {type: 'SELECT_SYSTEM', path: [ship.location[0]]}
  : {type: 'SELECT_OBJECT', path: ship.location})
  const orbiting = (<button className="btn btn-outline-info btn-sm" onClick={onClickOrbiting} title="Select parent">
    {parent.displayName}
  </button>)

  const fuel = getFuel(ship)
  const supplies = getSupplies(ship)
  const crew = sumBy('crew', ship.components)
  const repairSupplies = getRepairPoints(ship)
  const armor = getArmor(ship)

  return <>
    <h2>
      {ship.displayName} ({path[0]}){' '}
      <button className="btn btn-outline-info btn-sm" onClick={center} title={`Center on ${ship.displayName}`}>༓</button>{' '}
      {orbiting}
    </h2>
    <table className="table table-striped">
      <tbody>
        <tr>
          <th title="Dry-mass of the ship before inertial disconnect">Mass</th><td>{displayMass(ship.displacement)}</td>
        </tr>
        <tr>
          <th>Max Speed</th><td>{displayVelocity(getMaxSpeed(ship))}</td>
          <th>Fuel</th><td>{`${Math.round(fuel[0] / fuel[1] * 100)}% (${displayMass(fuel[0])})`}</td>
          <th title="Remaining travel time at max velocity">Flight Time</th><td>{displayTime(fuel[0] / getFuelConsumption(ship))}</td>
        </tr>
        <tr>
          <th>Crew</th><td>{crew}</td>
          <th>Supplies</th><td>{`${Math.round(supplies[0] / supplies[1] * 100)}% (${displayMass(supplies[0])})`}</td>
          <th title="Remaining time of life support">Life Support</th><td>{displayTime(supplies[0] / supplies[2] / crew)}</td>
        </tr>
        <tr>
          <th>Repair</th><td>{displayRate(repairSupplies[2])}</td>
          <th>Supplies</th><td>{`${Math.round(repairSupplies[0] / repairSupplies[1] * 100)}% (${displayMass(repairSupplies[0])})`}</td>
          <th title="Estimated remaining time until maintence suppries are used up">Maintenence</th><td>TODO</td>
        </tr>
        <tr>
          <td><strong>Armor</strong> ({Math.round(sum(armor.cells) / armor.layers / armor.cells.length * 100)}%)</td>
          <td colSpan="5"><Armor ship={ship} /></td>
        </tr>
        <tr>
          <td colSpan="6"><Orders orders={ship.orders} path={[...path, 'orders']} ship={ship} /></td>
        </tr>
      </tbody>
    </table>
    <Nearby system={ship.location[0]} position={position} exclude={[path, ship.location]} />
  </>
}

export default SelectShip
