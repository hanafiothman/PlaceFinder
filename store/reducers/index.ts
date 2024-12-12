import { combineReducers } from 'redux';
import homeReducer from './home';
import searchHistoryReducer from './searchHistory';

const rootReducer = combineReducers({
  home: homeReducer,
  searchHistory: searchHistoryReducer,
});

export default rootReducer;
