import { combineEpics, Epic, ofType } from 'redux-observable';
import { map, mergeMap, catchError, concatMap } from 'rxjs/operators';
import { PLACE_DETAILS_REQUEST, SEARCH_LOCATIONS_REQUEST } from '../reducers/home';
import { placeDetailsFailure, placeDetailsSuccess, RootActions, searchLocationsFailure, searchLocationsSuccess, updateSearchHistory } from '../actions';
import { ajax } from 'rxjs/ajax';
import { PlaceDetailsApiResponse, SearchResultsApiResponse } from '../../src/models';
import Config from 'react-native-config';
import { Observable, of } from 'rxjs';

const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/place';

const searchLocationsRequestEpic: Epic<RootActions, RootActions> = (action$): Observable<RootActions> =>
  action$.pipe(
    ofType(SEARCH_LOCATIONS_REQUEST),
    mergeMap((action) =>
      ajax.getJSON<SearchResultsApiResponse>(`${GOOGLE_API_URL}/autocomplete/json?input=${encodeURI(action.payload)}&key=${Config.GOOGLE_API_KEY}`)
        .pipe(
          map((response) => searchLocationsSuccess(response.predictions)),
          catchError((error: Error) => of(searchLocationsFailure(error)))
        )
    )
  );

const placeDetailsRequestEpic: Epic<RootActions, RootActions> = (action$): Observable<RootActions> =>
  action$.pipe(
    ofType(PLACE_DETAILS_REQUEST),
    mergeMap((action) =>
      ajax.getJSON<PlaceDetailsApiResponse>(`${GOOGLE_API_URL}/details/json?place_id=${action.payload}&key=${Config.GOOGLE_API_KEY}`)
        .pipe(
          concatMap((response) => of(placeDetailsSuccess(response.result), updateSearchHistory(response.result))),
          catchError((error: Error) => of(placeDetailsFailure(error)))
        )
    )
  );

const rootEpic: Epic<RootActions, RootActions> = combineEpics(
  searchLocationsRequestEpic,
  placeDetailsRequestEpic,
);

export default rootEpic;

