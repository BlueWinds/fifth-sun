import {useDispatch, useSelector} from 'react-redux'
import useDimensions from 'react-cool-dimensions'
import styled from 'styled-components'
import {DraggableCore} from 'react-draggable'

import OrbitDisplay from './OrbitDisplay'
import ShipsDisplay from './ShipsDisplay'

const Map = styled.div`
  flex-grow: 1;
  height: 100%;

  svg {
    overflow: visible;
  }

  &:before {
    content: "+";
    color: #fff;
    opacity: 0.3;
    position: absolute;
    font-size: 30px;
    top: 50%;
    left: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
  }
`

const StyledSvg = styled.svg`
  .orbit {
    fill: none;
    stroke: #333;
    stroke-width: 0.2%;
  }
  .orbit.selected {
    stroke: #335;
  }
  .trajectory {
    stroke-width: 0.1%;
  }
`

export default function SystemMap() {
  const {ref, width, height} = useDimensions({});

  const view = useSelector(state => state.view.systemMap);

  const viewSize = [width * view.zoom, height * view.zoom]
  const viewCorner = [(view.center[0] - width / 2) * view.zoom, (view.center[1] - height / 2) * view.zoom]
  const dispatch = useDispatch();

  const onDrag = (e, {deltaX, deltaY}) => dispatch({type: 'MAP_DRAG', deltaX, deltaY})
  const onWheel = e => dispatch({type: 'MAP_ZOOM', delta: e.deltaY > 0 || e.deltaX > 0})

  return (<Map ref={ref}>
    <DraggableCore onDrag={onDrag}>
      <StyledSvg
        width={width}
        height={height}
        viewBox={[...viewCorner, ...viewSize].join(' ')}
        onWheel={onWheel}
      >
        <OrbitDisplay path={[view.system]} />
        <ShipsDisplay system={view.system} />
      </StyledSvg>
    </DraggableCore>
  </Map>)
}
