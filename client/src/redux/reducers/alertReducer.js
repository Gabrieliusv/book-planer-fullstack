import { SET_ALERT, REMOVE_ALERT, SET_LOGIN_ALERT } from '../actions/types';

const initialState = {
  alerts: [],
  loginAlert: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, payload]
      };
    case SET_LOGIN_ALERT:
      return {
        ...state,
        loginAlert: payload
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: [],
        loginAlert: false
      };
    default:
      return state;
  }
}
