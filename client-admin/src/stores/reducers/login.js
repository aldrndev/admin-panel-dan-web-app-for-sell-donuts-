import { LOGIN, LOGIN_ERROR, LOGOUT, RESET } from '../actions/actionType';

const initialState = {
  access_token: null,
  error: null,
  message: null,
};

const loginReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        access_token: action.payload.access_token,
        message: action.payload.message,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET:
      return initialState;

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default loginReducers;
