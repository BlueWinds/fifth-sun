const defaultState = {
  type: false,
  path: [],
}

export default function selected(state = defaultState, action) {
  switch (action.type) {
    case 'SELECT_OBJECT':
      return {
        ...state,
        type: 'object',
        path: action.path,
      }
    case 'SELECT_SHIP':
      return {
        ...state,
        type: 'ship',
        path: action.path,
      }
    case 'SELECT_SYSTEM':
      return {
        ...state,
        type: 'system',
        path: action.path,
      }
    case 'CLOSE_SELECT':
      return {
        ...state,
        type: false,
        path: [],
      }
    default:
      return state
  }
}
