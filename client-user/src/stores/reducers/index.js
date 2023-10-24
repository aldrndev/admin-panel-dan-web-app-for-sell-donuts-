import { combineReducers } from 'redux';
import itemReducers from './items';

const rootReducers = combineReducers({
  items: itemReducers,
});

export default rootReducers;
