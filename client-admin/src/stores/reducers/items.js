import {
  FETCH_ITEMS,
  FETCH_ITEMS_ERROR,
  ADD_ITEMS,
  ADD_ITEMS_SUCCESS,
  ADD_ITEMS_ERROR,
  EDIT_ITEMS,
  EDIT_ITEMS_SUCCESS,
  EDIT_ITEMS_ERROR,
  DELETE_ITEMS,
  DELETE_ITEMS_SUCCESS,
  DELETE_ITEMS_ERROR,
} from '../actions/actionType';

const initialState = {
  items: [],
  error: null,
  isLoading: false,
  message: null,
};

const itemsReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };

    case FETCH_ITEMS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case ADD_ITEMS:
      return {
        ...state,
        isLoading: true,
        message: action.payload.message,
      };

    case ADD_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case ADD_ITEMS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case EDIT_ITEMS:
      return {
        ...state,
        isLoading: true,
      };

    case EDIT_ITEMS_SUCCESS:
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.item.id ? action.payload.item : item
      );
      return {
        ...state,
        items: updatedItems,
        isLoading: false,
      };

    case EDIT_ITEMS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case DELETE_ITEMS:
      return {
        ...state,
        isLoading: true,
      };

    case DELETE_ITEMS_SUCCESS:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        isLoading: false,
      };

    case DELETE_ITEMS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default itemsReducers;
