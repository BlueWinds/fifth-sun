const defaultState = {
  seconds: 0,
  ticking: 0,
  tickDuration: 86400,
}

export default function time(state = defaultState, action) {
  switch (action.type) {
    case 'START_TICKING':
      return {
        ...state,
        ticking: state.tickDuration,
      }
    case 'PASS_TIME':
      return {
        ...state,
        seconds: state.seconds + action.duration,
        ticking: (action.done || action.duration === 0) ? 0 : state.ticking - action.duration,
      }
    case 'SET_TICK_DURATION':
      return {
        ...state,
        tickDuration: action.duration,
      }
    default:
      return state
  }
}
