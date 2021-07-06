import {useSelector} from 'react-redux'
import styled from 'styled-components'

import PassTime from './PassTime'
import GameDate from './GameDate'

const HeaderBar = styled.div`
  height: 60px;
  border-bottom: 1px solid #666;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  background: black;
  z-index: 1;

  & > div {
    margin-left: 10px;
    margin-right: 10px;
  }
`

export default function Header() {
  const time = useSelector(state => state.game.time.seconds)

  const newGame = () => {
    delete localStorage.fifthSun;
    window.location.reload()
  }

  return <HeaderBar>
    <PassTime />
    <div>
      <GameDate time={time} />
    </div>
    <button className="btn-sm btn-outline-primary btn" style={{right: 15, position: 'absolute'}} onClick={newGame}>New Game</button>
  </HeaderBar>
}
