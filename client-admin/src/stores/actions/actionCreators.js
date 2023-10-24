import {
  FETCH_CATEGORIES,
  ADD_CATEGORIES,
  DELETE_CATEGORIES,
  FETCH_ITEMS,
  ADD_ITEMS,
  EDIT_ITEMS,
  DELETE_ITEMS,
  EDIT_ITEMS_SUCCESS,
  EDIT_ITEMS_ERROR,
  REGISTER_ADMIN,
  FETCH_CATEGORIES_ERROR,
  FETCH_ITEMS_ERROR,
  FETCH_INGREDIENTS_ERROR,
  FETCH_INGREDIENTS,
  LOGIN_ERROR,
  LOGIN,
  REGISTER_ADMIN_ERROR,
  RESET,
  ADD_CATEGORIES_ERROR,
  DELETE_CATEGORIES_ERROR,
  ADD_ITEMS_ERROR,
  ADD_ITEMS_SUCCESS,
  DELETE_ITEMS_ERROR,
  DELETE_ITEMS_SUCCESS,
} from './actionType';

// const BASE_URL = 'https://isproject.my.id/admin';
const BASE_URL = 'http://localhost:3000/admin';

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch({
        type: FETCH_CATEGORIES,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_CATEGORIES_ERROR,
        payload: error.message,
      });
    }
  };
};

export const fetchItems = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/items`, {
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch({
        type: FETCH_ITEMS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ITEMS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const fetchIngredients = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}/ingredients`, {
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch({
        type: FETCH_INGREDIENTS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_INGREDIENTS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const login = (payload) => {
  return async (dispatch) => {
    dispatch({ type: RESET });

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('email', data.user.email);

      dispatch({
        type: LOGIN,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.message,
      });
    }
  };
};

export const registerAdmin = (payload) => {
  return async (dispatch) => {
    dispatch({ type: RESET });
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch({
        type: REGISTER_ADMIN,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_ADMIN_ERROR,
        payload: error.message,
      });
    }
  };
};

export const addCategory = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: RESET,
    });

    try {
      const response = await fetch(`${BASE_URL}/categories/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch({
        type: ADD_CATEGORIES,
        payload: data,
      });

      dispatch(fetchCategories());
    } catch (error) {
      dispatch({
        type: ADD_CATEGORIES_ERROR,
        payload: error.message,
      });
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/categories/${id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch({
        type: DELETE_CATEGORIES,
        payload: data,
      });

      dispatch(fetchCategories());
    } catch (error) {
      dispatch({
        type: DELETE_CATEGORIES_ERROR,
        payload: error.message,
      });
    }
  };
};

export const addItem = (payload) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/items/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch({
        type: ADD_ITEMS_SUCCESS,
        payload: data,
      });

      dispatch(fetchItems());
    } catch (error) {
      dispatch({
        type: ADD_ITEMS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const editItem = (id, payload) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/items/${id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch({
        type: EDIT_ITEMS_SUCCESS,
        payload: data,
      });

      dispatch(fetchItems());
    } catch (error) {
      dispatch({
        type: EDIT_ITEMS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const deleteItem = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_ITEMS,
      });

      const response = await fetch(`${BASE_URL}/items/${id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch({
        type: DELETE_ITEMS_SUCCESS,
        payload: { id },
      });

      dispatch(fetchItems());
    } catch (error) {
      dispatch({
        type: DELETE_ITEMS_ERROR,
        payload: error.message,
      });
    }
  };
};
