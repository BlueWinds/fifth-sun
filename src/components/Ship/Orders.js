import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {ReactSortable} from 'react-sortablejs'
import { CSSTransition } from 'react-transition-group';
import set from 'lodash/fp/set'

import applyOrders from './orders/applyOrders'
import AddOrder from './orders/AddOrder'
import * as orderTypes from './orders'

const OrdersDiv = styled.div`
  width: 100%;

  select.new {
    width: auto;
  }

  .drag {
    cursor: move;
    float: left;
    top: calc(50% - 1em);
    position: absolute;
    height: 1em;
    z-index: 1;
  }

  .remove-order {
    position: absolute;
    right: -1px;
    top: -1px;
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-color: transparent;
    border-right-color: transparent;
  }

  & > div > div > h6 > .collapsable-icon.children {
    margin-left: 1em;
  }

  .alert-wrapper {
    overflow: hidden;
  }

  .alert-wrapper-enter {
    height: 0;
  }
  .alert-wrapper-enter-active {
    height: 3em;
    transition: height 500ms;
  }
  .alert-wrapper-enter-done {
    height: 3em;
  }

  .alert-wrapper-exit {
    height: 3em;
  }
  .alert-wrapper-exit-active {
    height: 0;
    transition: height 500ms;
  }
`

export default function Orders({ship, orders, path}) {
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const [errorMessage, setErrorMessage] = useState([false, ''])

  const reorder = newOrders => {
    const result = applyOrders({...ship, orders: newOrders}, state)
    if (typeof result === 'string') {
      setErrorMessage([true, result])
      return
    }

    dispatch({type: 'REORDER_ORDERS', path, newOrders})
  }

  const update = index => order => {
    const result = applyOrders({...ship, orders: set(index, order, orders)}, state)
    if (!result.updatedShip) {
      setErrorMessage([true, result])
      return
    }

    dispatch({type: 'UPDATE_ORDER', path: [...path, index], order})
  }

  const {durations = [], updatedState} = applyOrders(ship, state)

  return <OrdersDiv className="list-group">
    <CSSTransition
        in={errorMessage[0]}
        timeout={4000}
        classNames="alert-wrapper"
        unmountOnExit
        onEntered={() => setErrorMessage([false, errorMessage[1]])}
    >
      <div className="alert-wrapper">
        <div className="alert alert-warning">{errorMessage[1]}</div>
      </div>
    </CSSTransition>
    <ReactSortable
      list={orders}
      setList={reorder}
      group="orders"
      fallbackOnBody={true}
      swapThreshold={0.5}
      animation={150}
      handle="span.drag"
    >
      {orders.map((order, index) => {
        const Order = orderTypes[order.type].default
        return <Order order={order} path={[...path, index]} key={order.id} ship={ship} duration={durations[index]} update={update(index)} />
      })}
    </ReactSortable>
    {updatedState && <AddOrder ship={ship} path={path} />}
  </OrdersDiv>
}
