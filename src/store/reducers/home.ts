import { Reducer } from 'redux';
import { PlaceDetails, Prediction } from '../../models';
import { RootActions } from '../actions';

export const SEARCH_LOCATIONS_REQUEST = 'SEARCH_LOCATIONS_REQUEST';
export const SEARCH_LOCATIONS_SUCCESS = 'SEARCH_LOCATIONS_SUCCESS';
export const SEARCH_LOCATIONS_FAILURE = 'SEARCH_LOCATIONS_FAILURE';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const PLACE_DETAILS_REQUEST = 'PLACE_DETAILS_REQUEST';
export const PLACE_DETAILS_SUCCESS = 'PLACE_DETAILS_SUCCESS';
export const PLACE_DETAILS_FAILURE = 'PLACE_DETAILS_FAILURE';

type HomeState = {
  searchResults: Prediction[],
  selectedLocation: PlaceDetails;
};

const INITIAL_STATE: HomeState = {
  searchResults: [],
  // @ts-ignore
  selectedLocation: {},
};

const homeReducer: Reducer<HomeState, RootActions> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case SEARCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [],
      };
    case PLACE_DETAILS_SUCCESS:
      return {
        ...state,
        selectedLocation: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
