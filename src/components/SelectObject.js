import {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import isEqual from 'lodash/fp/isEqual'

import {useObject} from '@state/selectors'
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

const Entry = ({path, object, onSelect, currentTarget}) => {
  const className = isEqual(currentTarget.slice(0, path.length), path) ? 'text-info' : ''

  const label = object.type === 'StarSystem' ?
    <span className={`star-system ${className}`}>{object.displayName}</span>
  :
    <span className={`selectable ${className}`} onClick={() => onSelect(path) }>{object.displayName}</span>

  return <div className="list-group-item">
    <Collapsable label={label} startCollapsed={!isEqual(currentTarget.slice(0, path.length), path)}>
      {Object.entries(object.objects).map(([name, child]) => <Entry key={name} path={[...path, 'objects', name]} object={child} onSelect={onSelect} currentTarget={currentTarget}/>)}
    </Collapsable>
  </div>
}

export default function SelectObject({currentTarget, onSelect}) {
  const currentObject = useObject(currentTarget)
  const [expanded, setExpanded] = useState(false)
  const systems = useSelector(state => state.game.systems)

  const expandedRef = useRef();
  useEffect(() => expanded && expandedRef.current.focus())

  return <Container>
    <button className="btn-sm btn mr-2 btn-outline-info" onClick={() => setExpanded(!expanded)}>{currentObject.displayName}</button>
    {expanded && <div className="list-group border-info" tabIndex={0} onBlur={() => setExpanded(false)} ref={expandedRef}>
      {Object.entries(systems).map(([name, system]) => <Entry key={name} path={[name]} object={system} currentTarget={currentTarget} onSelect={onSelect} />)}
    </div>}
  </Container>
}
