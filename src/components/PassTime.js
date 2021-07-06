import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'

const TimeBox = styled.div`
  select {
    width: 125px;
    margin-right: 10px;
  }
`

export default function PassTime() {
  const dispatch = useDispatch()
  const tickDuration = useSelector(state => state.game.time.tickDuration)

  const onChange = e => dispatch({type: 'SET_TICK_DURATION', duration: parseInt(e.target.value, 10)})
  const onClick = () => dispatch({type: 'START_TICKING'})

  return <TimeBox>
    <select value={tickDuration} onChange={onChange} className="custom-select custom-select-sm">
      <option value="1">One Second</option>
      <option value="10">Ten Seconds</option>
      <option value="60">One Minute</option>
      <option value="600">Ten Minutes</option>
      <option value="3600">One Hour</option>
      <option value="21600">Six Hours</option>
      <option value="86400">One Day</option>
      <option value="604800">One Week</option>
    </select>
    <button type="button" className="btn-sm btn-outline-primary btn" onClick={onClick}>Pass Time</button>
  </TimeBox>
}
