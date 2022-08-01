import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FAVORITES_LOCATIONS } from '../mock-data/favoritesLocations';
import { DAILY_FORECASTS } from '../mock-data/dailyForecasts';
import { LOCATION_RESULT } from '../mock-data/location-result';
import { Location } from '../../types/Location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private _apiUrl = 'http://localhost:5000/locationRes';

  constructor(private http: HttpClient) {}

  getLocation(): Observable<Location> {
    return this.http.get<Location>(this._apiUrl);
  }

  getSearchedLocations(): void {}

  getCurrentLocationWeather(): void {}
}
