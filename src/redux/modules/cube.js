// ACTION TYPES.
const SET_CUBE_STATE = 'Hacker/cube/SET_CUBE_STATE';
const SET_CUBE_ROTATION = 'Hacker/cube/SET_CUBE_ROTATION';
// ACTIONS.
export function setCubeState(state) {
  return {
    type: SET_CUBE_STATE,
    payload: {
      state
    }
  };
}
export function setCubeRotation(state) {
  return {
    type: SET_CUBE_ROTATION,
    payload: {
      state
    }
  };
}
// REDUCER
export default function reducer(state = {
  cubeFront: false,
  cubeBack: false,
  cubeLeft: false,
  cubeRight: false,
  cubeTop: false,
  cubeBottom: false,
  rotationActive: true,
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
  case SET_CUBE_ROTATION: {
    return {
      ...state,
      ...action.payload.state
    };
  }
  default:
    return state;
  }
}
