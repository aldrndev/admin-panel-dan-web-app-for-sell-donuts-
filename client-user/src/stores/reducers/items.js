import { FETCH_ITEMS } from '../actions/actionType';

const initialState = {
  items: [],
};

const itemReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};

export default itemReducers;
