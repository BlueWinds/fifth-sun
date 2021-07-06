import {useState} from 'react'
import styled from 'styled-components'
import isArray from 'lodash/fp/isArray'

const Label = styled.h6`
  position: relative;

  span.drag {
    cursor: move;
  }

  .collapsable-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin: 0 0.3rem 0 0;
  }

  .collapsable-icon.rotate {
    transform: rotate(-90deg);
  }

  .collapsable-icon.children {
    cursor: pointer;
  }
`

export default function Collapsable({children, label, startCollapsed = true}) {
  const [collapsed, setCollapsed] = useState(startCollapsed)

  const hasChildren = Boolean(isArray(children) ? children.length : children)

  return <>
    <Label>
      <span className={`text-info collapsable-icon ${collapsed ? 'rotate' : ''} ${hasChildren ? 'children' : ''}`} onClick={() => setCollapsed(!collapsed)}>{hasChildren && "▼"}</span>
      {label}
    </Label>

    {!collapsed && hasChildren && children}
  </>
}
