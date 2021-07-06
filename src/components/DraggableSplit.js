import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {DraggableCore} from 'react-draggable'
import useDimensions from 'react-cool-dimensions'

const Panes = styled.div`
  height: calc(100% - 60px);
  position: relative;

  & > div {
    width: 100%;
    height: 100%;
  }
`

const LeftBorder = styled.div`
  background: transparent;
  height: 100%;
  position: absolute;
  top: 0;
  cursor: ew-resize;

  div {
    height: 100%;
    width: 1px;
    background: #666;
  }
`

export default function DraggableSplit({children, name}) {
  const dispatch = useDispatch()
  const [dragging, setDrag] = useState(false)
  const width = useSelector(state => state.view.split[name])
  const {ref, width: totalWidth} = useDimensions({});

  if (!children[0] || !children[1]) { return <Panes ref={ref}>{children[0] || children[1]}</Panes> }

  const onDragResize = (e, {deltaX}) => dispatch({type: 'RESIZE_SPLIT', deltaX, name})

  return <Panes ref={ref}>
    <div style={{width: width, position: 'absolute'}}>
      {children[0]}
    </div>
    <DraggableCore onDrag={onDragResize} onStart={() => setDrag(true)} onStop={() => setDrag(false)}>
      <LeftBorder style={{
        left: dragging ? width - 101 : width - 11,
        width: dragging ? 201 : 21,
        paddingLeft: dragging ? 100 : 10,
      }}>
        <div />
      </LeftBorder>
    </DraggableCore>
    <div style={{width: totalWidth - width - 1, position: 'absolute', right: 0}}>
      {children[1]}
    </div>
  </Panes>
}
