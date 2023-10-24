import {
  ADD_CATEGORIES,
  ADD_CATEGORIES_ERROR,
  DELETE_CATEGORIES,
  DELETE_CATEGORIES_ERROR,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
  RESET,
} from '../actions/actionType';

const initialState = {
  categories: [],
  error: null,
  message: null,
};

const categoriesReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
        message: null,
      };

    case ADD_CATEGORIES:
      return {
        ...state,
        message: action.payload.message,
        error: null,
      };

    case ADD_CATEGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
        message: null,
      };

    case DELETE_CATEGORIES:
      return {
        ...state,
        message: action.payload.message,
        error: null,
      };

    case DELETE_CATEGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default categoriesReducers;
