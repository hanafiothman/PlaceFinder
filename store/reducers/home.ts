import { Reducer } from 'redux';
import { PlaceDetails, Prediction } from '../../src/models';

export const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const UPDATE_SELECTED_LOCATION = 'UPDATE_SELECTED_LOCATION';

interface UpdateSearchResultsAction {
  type: typeof UPDATE_SEARCH_RESULTS;
  payload: Prediction[];
}

interface ClearSearchResultsAction {
  type: typeof CLEAR_SEARCH_RESULTS;
}

interface UpdateSelectedLocationAction {
  type: typeof UPDATE_SELECTED_LOCATION;
  payload: PlaceDetails;
}

type HomeState = {
  searchResults: Prediction[],
  selectedLocation: PlaceDetails;
};

type HomeAction = UpdateSearchResultsAction | ClearSearchResultsAction | UpdateSelectedLocationAction;

const INITIAL_STATE: HomeState = {
  searchResults: [],
  // @ts-ignore
  selectedLocation: {},
};

const homeReducer: Reducer<HomeState, HomeAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case UPDATE_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [],
      };
    case UPDATE_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
