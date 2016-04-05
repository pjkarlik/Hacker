// ACTION TYPES.
const SET_CUBE_STATE = 'Hacker/cube/SET_CUBE_STATE';
// ACTIONS.
export function setCubeState(state) {
  return {
    type: SET_CUBE_STATE,
    payload: {
      state
    }
  };
}
// REDUCER
export default function reducer(state = {
  rotationActive: true,
  direction: 'up',
  rotationX: 0,
  rotationY: 0
}, action) {
  switch (action.type) {
  case SET_CUBE_STATE: {
    return {
      ...state,
      ...action.payload.state
    };
  }
  default:
    return state;
  }
}
