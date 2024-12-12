import { PlaceDetails, Prediction } from '../../src/models';
import { CLEAR_SEARCH_HISTORY, UPDATE_SEARCH_HISTORY } from '../reducers/searchHistory';
import { CLEAR_SEARCH_RESULTS, UPDATE_SEARCH_RESULTS, UPDATE_SELECTED_LOCATION } from '../reducers/home';

export const updateSearchResults = (payload: Prediction[]) => ({ type: UPDATE_SEARCH_RESULTS, payload });
export const clearSearchResults = () => ({ type: CLEAR_SEARCH_RESULTS });
export const updateSelectedLocation = (payload: PlaceDetails) => ({ type: UPDATE_SELECTED_LOCATION, payload });

export const updateSearchHistory = (payload: PlaceDetails) => ({ type: UPDATE_SEARCH_HISTORY, payload });
export const clearSearchHistory = () => ({ type: CLEAR_SEARCH_HISTORY });

