import { FETCH_ITEMS } from './actionType';

// const BASE_URL = 'https://isproject.my.id';
const BASE_URL = 'http://localhost:3000';

export const fetchItems = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/user/items`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch({
        type: FETCH_ITEMS,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
