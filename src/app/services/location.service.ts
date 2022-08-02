import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FAVORITES_LOCATIONS } from '../mock-data/favoritesLocations';
import { DAILY_FORECASTS } from '../mock-data/dailyForecasts';
import { LOCATION_RESULT } from '../mock-data/location-result';
import { Location } from '../models/location.model';
import { LocationAutocompleteResponse } from '../models/api/locationAutocompleteResponse.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private _apiUrl =
    'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';

  private _apiKey = 'PrYdYR0XAGaPO3cj88PVwuP5mJPApHGc';

  constructor(private http: HttpClient) {}

  getLocation(query: string): Observable<LocationAutocompleteResponse[]> {
    const params = new HttpParams().set('apikey', this._apiKey).set('q', query);
    return this.http
      .get<LocationAutocompleteResponse[]>(this._apiUrl, {
        params,
      })
      .pipe(
        map(
          (res) => res,
          catchError((err) => {
            console.log(err);
            return err;
          })
        )
      );
  }

  getSearchedLocations(): void {}

  getCurrentLocationWeather(): void {}
}

/*
 .pipe(
      map((searchedLocations) => {
        return searchedLocations.map((location) => {
          return {
            id: location.Key,
            name: location.LocalizedName,
          };
        });
      })
    );
    */
