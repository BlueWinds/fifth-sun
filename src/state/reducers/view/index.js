import { combineReducers } from 'redux'

import systemMap from './systemMap'
import selected from './selected'
import split from './split'
import tables from './tables'

const view = combineReducers({
  page: (state = 'systemMap', action) => state,
  selected,
  split,
  systemMap,
  tables,
});

export default view
