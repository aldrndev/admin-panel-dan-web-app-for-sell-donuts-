import { combineReducers } from 'redux';
import categoriesReducers from './categories';
import itemsReducers from './items';
import ingredientsReducers from './ingredients';
import loginReducers from './login';
import registerReducers from './register';

const rootReducers = combineReducers({
  categories: categoriesReducers,
  items: itemsReducers,
  ingredients: ingredientsReducers,
  login: loginReducers,
  register: registerReducers,
});

export default rootReducers;
