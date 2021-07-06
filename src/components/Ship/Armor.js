import styled from 'styled-components'

import {getArmor} from '@lib/shipCalculations'

const ArmorDiv = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  white-space: nowrap;
  height: 3em;

  span {
    display: inline-block;
    border: 1px solid black;
    background: #ccc;
    width: 1em;
  }
`

export default function Armor({ship}) {
  const {layers, cells} = getArmor(ship)
  return <ArmorDiv>
    {cells.map((cell, i) => (<span key={i} style={{height: cell / layers * 100 + '%'}}></span>))}
  </ArmorDiv>
}
