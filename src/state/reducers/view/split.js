const defaultState = {
  selected: 1200,
}

export default function split(state = defaultState, action) {
  switch (action.type) {
    case 'RESIZE_SPLIT':
      return {
        ...state,
        [action.name]: Math.max(100, state[action.name] + action.deltaX),
      }
    default:
      return state
  }
}
