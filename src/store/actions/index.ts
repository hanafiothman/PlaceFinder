import { PlaceDetails, Prediction } from '../../models';
import { CLEAR_SEARCH_HISTORY, UPDATE_SEARCH_HISTORY } from '../reducers/searchHistory';
import {
  CLEAR_SEARCH_RESULTS,
  PLACE_DETAILS_FAILURE,
  PLACE_DETAILS_REQUEST,
  PLACE_DETAILS_SUCCESS,
  SEARCH_LOCATIONS_FAILURE,
  SEARCH_LOCATIONS_REQUEST,
  SEARCH_LOCATIONS_SUCCESS,
} from '../reducers/home';

interface SearchLocationsRequestAction {
  type: typeof SEARCH_LOCATIONS_REQUEST;
  payload: string;
}

interface SearchLocationsSuccessAction {
  type: typeof SEARCH_LOCATIONS_SUCCESS;
  payload: Prediction[];
}

interface SearchLocationsFailureAction {
  type: typeof SEARCH_LOCATIONS_FAILURE;
  payload: Error;
}

interface ClearSearchResultsAction {
  type: typeof CLEAR_SEARCH_RESULTS;
}

interface UpdateSearchHistoryAction {
  type: typeof UPDATE_SEARCH_HISTORY;
  payload: PlaceDetails;
}

interface ClearSearchHistoryAction {
  type: typeof CLEAR_SEARCH_HISTORY;
}

interface PlaceDetailsRequestAction {
  type: typeof PLACE_DETAILS_REQUEST;
  payload: string;
}

interface PlaceDetailsSuccessAction {
  type: typeof PLACE_DETAILS_SUCCESS;
  payload: PlaceDetails;
}

interface PlaceDetailsFailureAction {
  type: typeof PLACE_DETAILS_FAILURE;
  payload: Error;
}

export type RootActions = SearchLocationsRequestAction
  | SearchLocationsSuccessAction
  | SearchLocationsFailureAction
  | ClearSearchResultsAction
  | UpdateSearchHistoryAction
  | ClearSearchHistoryAction
  | PlaceDetailsRequestAction
  | PlaceDetailsSuccessAction
  | PlaceDetailsFailureAction;

export const searchLocationsRequest = (payload: string): SearchLocationsRequestAction => ({
  type: SEARCH_LOCATIONS_REQUEST,
  payload,
});

export const searchLocationsSuccess = (payload: Prediction[]): SearchLocationsSuccessAction => ({
  type: SEARCH_LOCATIONS_SUCCESS,
  payload,
});

export const searchLocationsFailure = (payload: Error): SearchLocationsFailureAction => ({
  type: SEARCH_LOCATIONS_FAILURE,
  payload,
});

export const clearSearchResults = (): ClearSearchResultsAction => ({
  type: CLEAR_SEARCH_RESULTS,
});

export const updateSearchHistory = (payload: PlaceDetails): UpdateSearchHistoryAction => ({
  type: UPDATE_SEARCH_HISTORY,
  payload,
});

export const clearSearchHistory = (): ClearSearchHistoryAction => ({
  type: CLEAR_SEARCH_HISTORY,
});

export const placeDetailsRequest = (payload: string): PlaceDetailsRequestAction => ({
  type: PLACE_DETAILS_REQUEST,
  payload,
});

export const placeDetailsSuccess = (payload: PlaceDetails): PlaceDetailsSuccessAction => ({
  type: PLACE_DETAILS_SUCCESS,
  payload,
});

export const placeDetailsFailure = (payload: Error): PlaceDetailsFailureAction => ({
  type: PLACE_DETAILS_FAILURE,
  payload,
});

