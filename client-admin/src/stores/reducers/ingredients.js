import {
  FETCH_INGREDIENTS,
  FETCH_INGREDIENTS_ERROR,
} from '../actions/actionType';

const initialState = {
  ingredients: [],
  error: null,
};

const ingredientsReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };

    case FETCH_INGREDIENTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ingredientsReducers;
