import { Provider } from 'react-redux';
import styled from 'styled-components';
import './bootstrap.scss';

import configureStore from './state';
import MainWindow from './components/MainWindow';

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
`

function App() {
  const store = configureStore()
  window.store = store
  return (<Provider store={store}>
    <Root>
      <header></header>
      <MainWindow />
    </Root>
  </Provider>);
}

export default App;
