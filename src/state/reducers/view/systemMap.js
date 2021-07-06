const defaultState = {
  system: 'SolSystem',
  center: [0, 0], // pixels offset from central object
  zoom: 1, // million meters per pixel
}

export default function systemMap(state = defaultState, action) {
  switch (action.type) {
    case 'MAP_ZOOM':
      const {center, zoom} = state
      if (!action.delta && zoom < 0.001) { return state; }
      if (action.delta && zoom > 60) { return state; }

      return {
        ...state,
        zoom: action.delta ? (zoom * 1.1) : (zoom / 1.1),
        center: action.delta ? [center[0] / 1.1, center[1] / 1.1] : [center[0] * 1.1, center[1] * 1.1],
      }
    case 'MAP_DRAG':
      return {
        ...state,
        center: [state.center[0] - action.deltaX, state.center[1] - action.deltaY],
      }
    case 'RECENTER':
      return {
        ...state,
        center: action.center,
      }
    default:
      return state
  }
}
