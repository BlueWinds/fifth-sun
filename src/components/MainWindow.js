import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'

import SystemMap from './SystemMap'
import Header from './Header'
import SelectedObject from './SystemMap/SelectedObject'
import SelectedShip from './SystemMap/SelectedShip'
import SelectedSystem from './SystemMap/SelectedSystem'
import DraggableSplit from './DraggableSplit'

const Main = styled.div`
  width: 100%;
  height: 100%;
`

const Pane = styled.div`
  background: black;
  position: relative;
  height: 100%;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;

  button {
    vertical-align: top;
  }
`

const Close = styled.button`
  position: absolute;
  top: -1px;
  right: -1px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
`

export default function MainWindow() {
  const dispatch = useDispatch()
  const {page, selected: {type, path, width}} = useSelector(state => ({
    selected: state.view.selected,
    page: state.view.page,
  }))

  const left = <>
    {page === 'systemMap' && <SystemMap />}
  </>

  const right = type && <Pane style={{width}}>
    <Close className="btn btn-outline-danger btn-sm" onClick={() => dispatch({type: 'CLOSE_SELECT'})}>X</Close>
    {type === 'object' && <SelectedObject path={path} />}
    {type === 'ship' && <SelectedShip path={path} />}
    {type === 'system' && <SelectedSystem path={path} />}
  </Pane>

  return <Main>
    <Header />
    <DraggableSplit name="selected">
      {left}
      {right}
    </DraggableSplit>
  </Main>
}
