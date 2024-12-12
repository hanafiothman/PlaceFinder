import { Reducer } from 'redux';
import { PlaceDetails } from '../../src/models';
import { RootActions } from '../actions';

export const UPDATE_SEARCH_HISTORY = 'UPDATE_SEARCH_HISTORY';
export const CLEAR_SEARCH_HISTORY = 'CLEAR_SEARCH_HISTORY';

const searchHistoryReducer: Reducer<PlaceDetails[], RootActions> = (
  state = [],
  action
) => {
  switch (action.type) {
    case UPDATE_SEARCH_HISTORY:
      return [...state, action.payload];
    case CLEAR_SEARCH_HISTORY:
      return [];
    default:
      return state;
  }
};

export default searchHistoryReducer;
