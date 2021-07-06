import set from 'lodash/fp/set'

const defaultState = {
  'Natural Bodies': {
    show: true,
    sort: ['distance', 1],
    collapsed: [false, true, false, true, false, false, true],
  },
  Ships: {
    show: true,
    sort: ['mass', -1],
    collapsed: [false, false, false, false, false],
  },
  Stars: {
    show: true,
    sort: ['mass', -1],
    collapsed: [false, false, false],
  },
  Nearby: {
    show: true,
    sort: ['distance', 1],
    collapsed: [false, false, false]
  }
}

export default function tables(state = defaultState, action) {
  switch (action.type) {
    case 'SHOW_TABLE':
      return {
        ...state,
        [action.table]: {
          ...state[action.table],
          show: action.show,
        }
      }
    case 'COLLAPSE_TABLE_COLUMN':
      return {
        ...state,
        [action.table]: {
          ...state[action.table],
          collapsed: set(action.index, action.collapse, state[action.table].collapsed)
        }
      }
    case 'SORT_TABLE':
      return {
        ...state,
        [action.table]: {
          ...state[action.table],
          sort: [action.sortKey, action.direction],
        }
      }
    default:
      return state
  }
}
