import {
  REGISTER_ADMIN,
  REGISTER_ADMIN_ERROR,
  RESET,
} from '../actions/actionType';

const initialState = {
  error: null,
  message: null,
};

const registerReducers = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ADMIN:
      return {
        ...state,
        message: action.payload.message,
      };
    case REGISTER_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default registerReducers;
