import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import map from 'lodash/fp/map'

import * as orderTypes from './index'
import applyOrders from './applyOrders'

const possibleOrders = (ship, state) => {
  const {updatedShip, updatedState} = applyOrders(ship, state)
  return map(type => type.create(updatedShip, updatedState), orderTypes).filter(Boolean)
}

export default function AddOrder({ship, path}) {
  const [selectedNew, setSelectedNew] = useState(0)
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const newOrders = possibleOrders(ship, state)

  return (<div className="list-group-item text-info">
    <select className="custom-select custom-select-sm new" onChange={e => setSelectedNew(e.target.value)}>
      {newOrders.map((order, i) => <option key={order.type} value={i}>{orderTypes[order.type].label}</option>)}
    </select>
    {' '}
    <button className="btn btn-sm btn-outline-info" onClick={e => dispatch({type: 'ADD_ORDER', path, order: newOrders[selectedNew]})}>+</button>
  </div>)
}
