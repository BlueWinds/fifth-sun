import {useDispatch} from 'react-redux'

import displayTime from '@lib/displayTime'
import Collapsable from '@components/Collapsable'

export default function Order({children, id, label, path, duration}) {
  const dispatch = useDispatch()

  return <div id={id} className="list-group-item">
    <span className="drag">✣</span>
    <Collapsable label={<>{label} <span className="float-right mr-4">{displayTime(duration)}</span></>}>
      {children && <div className="card-body">{children}</div>}
    </Collapsable>
    <button className="remove-order btn btn-sm btn-outline-danger" onClick={() => dispatch({type: 'REMOVE_ORDER', path})}>-</button>
  </div>
}
