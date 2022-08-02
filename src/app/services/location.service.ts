import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FAVORITES_LOCATIONS } from '../mock-data/favoritesLocations';
import { DAILY_FORECASTS } from '../mock-data/dailyForecasts';
import { LOCATION_RESULT } from '../mock-data/location-result';
import { Location } from '../models/location.model';
import { LocationAutocompleteResponse } from '../models/api/locationAutocompleteResponse.model';
import { AutocompleteResult } from '../models/autocompleteResult.model';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private _apiUrl = environment.autocompleteApi;

  private _apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getAutoCompleteSearchLocations(
    query: string
  ): Observable<AutocompleteResult[]> {
    const params = new HttpParams().set('apikey', this._apiKey).set('q', query);
    return this.http
      .get<LocationAutocompleteResponse[]>(this._apiUrl, {
        params,
      })
      .pipe(
        map((autoCompleteRes) => {
          return this.fetchAutoCompleteData(autoCompleteRes);
        })
      );
  }

  fetchAutoCompleteData(
    responses: LocationAutocompleteResponse[]
  ): AutocompleteResult[] {
    const fetchedData = responses.map((res) => {
      return {
        id: +res.Key,
        name: res.LocalizedName,
      };
    });
    return fetchedData;
  }
}
