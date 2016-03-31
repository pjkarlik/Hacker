// ACTION TYPES.
const SET_NAVIGATION_STATE = 'Hacker/hacker/SET_NAVIGATION_STATE';

// ACTIONS.
export function setNavigationState(state) {
  return {
    type: SET_NAVIGATION_STATE,
    payload: {
      state
    }
  };
}
// REDUCER
export default function reducer(state = {
  navigationIsOpen: false
}, action) {
  switch (action.type) {
  case SET_NAVIGATION_STATE: {
    return {
      ...state,
      ...action.payload.state
    };
  }
  default:
    return state;
  }
}
