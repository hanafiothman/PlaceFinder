import { Reducer } from 'redux';
import { PlaceDetails } from '../../src/models';

export const UPDATE_SEARCH_HISTORY = 'UPDATE_SEARCH_HISTORY';
export const CLEAR_SEARCH_HISTORY = 'CLEAR_SEARCH_HISTORY';

interface UpdateSearchHistoryAction {
  type: typeof UPDATE_SEARCH_HISTORY;
  payload: PlaceDetails;
}

interface ClearSearchHistoryAction {
  type: typeof CLEAR_SEARCH_HISTORY;
}

type SearchHistoryAction = UpdateSearchHistoryAction | ClearSearchHistoryAction;

const searchHistoryReducer: Reducer<PlaceDetails[], SearchHistoryAction> = (
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
