import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CurrentWeatherResponse } from '../models/api/currentWeatherResponse.model';
import { FiveDaysForecastResponse } from '../models/api/fiveDaysForecastResponse.model';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private _apiUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
  private _apiKey = 'PrYdYR0XAGaPO3cj88PVwuP5mJPApHGc';
  private _apiUrlDays =
    'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';

  constructor(private http: HttpClient) {}

  getCurrentWeather(id: number): Observable<CurrentWeatherResponse[]> {
    const params = new HttpParams().set('apikey', this._apiKey);
    return this.http.get<CurrentWeatherResponse[]>(`${this._apiUrl}${id}`, {
      params,
    });
  }

  getFiveDaysForecast(id: number): Observable<FiveDaysForecastResponse> {
    const params = new HttpParams()
      .set('apikey', this._apiKey)
      .set('metric', true);
    return this.http
      .get<FiveDaysForecastResponse>(`${this._apiUrlDays}${id}`, {
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

  /*   getAllWeatherData(id: number): Observable<any[]> {
    let currentWeather = this.getCurrentWeather(id);
    let fiveDaysForecast = this.getFiveDaysForecast(id);
    return forkJoin([currentWeather, fiveDaysForecast]);
  } */
}
