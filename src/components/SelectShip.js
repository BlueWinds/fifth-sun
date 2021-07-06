import {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import isEqual from 'lodash/fp/isEqual'

import {useShip} from '@state/selectors'
import Collapsable from '@components/Collapsable'

const Container = styled.span`
  position: relative;
  display: inline-block;
  vertical-align: middle;

  & > div {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    padding-right: 1em;
    width: max-content;
    border: 1px solid;
    padding-top: 0.5em;
    background: black;
  }

  .list-group-item {
    border: none;
    padding: 0;
    margin-left: 1em;
  }

  .card-body {
    padding: 0;
    margin-left: 1em;
  }

  .star-system {
    cursor: default;
  }

  .selectable {
    cursor: pointer;
  }

  .here {
    color: red;
  }
`

export default function SelectObject({currentTarget, onSelect}) {
  const currentShip = useShip(currentTarget)
  const [expanded, setExpanded] = useState(false)
  const {systems, factions} = useSelector(state => state.game)

  const expandedRef = useRef();
  useEffect(() => expanded && expandedRef.current.focus())

  const items = {}
  Object.entries(factions).forEach(([factionKey, {ships}]) => Object.entries(ships).forEach(([shipKey, ship]) => {
    let currentElement = items
    ship.location.forEach(pathElement => {
      if (pathElement !== 'objects' && !isArray(pathElement)) {
        currentElement[pathElement] = {}
        currentElement = currentElement[pathElement]
      }
    })

    const key = `${factionKey}-${shipKey}`
    currentElement[key] = (<ShipEntry
      key={key}
      path={[factionKey, shipKey]}
      ship={ship}
      currentTarget={currentTarget}
      onSelect={onSelect}
    />)
  }))

  return <Container>
    <button className="btn-sm btn mr-2 btn-outline-info" onClick={() => setExpanded(!expanded)}>{currentShip.displayName}</button>
    {expanded && <div className="list-group border-info" tabIndex={0} onBlur={() => setExpanded(false)} ref={expandedRef}>
      {systems.entries().map(([system, ships]) => (
        <>
          {ships}
        </>
      ))
    </div>}
  </Container>
}
