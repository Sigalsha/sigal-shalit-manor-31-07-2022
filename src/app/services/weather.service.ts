import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CurrentWeatherResponse } from '../models/api/currentWeatherResponse.model';
import { FiveDaysForecastResponse } from '../models/api/fiveDaysForecastResponse.model';
import { DailyForecast } from '../models/dailyForecast.model';
import { Location } from '../models/location.model';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private _apiUrl = environment.currentWeatherApi;
  private _apiKey = environment.apiKey;
  private _apiUrlDays = environment.dailyForecastsApi;

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

  getAllWeatherData(id: number) {
    return forkJoin([
      this.getCurrentWeather(id),
      this.getFiveDaysForecast(id),
    ]).pipe(
      map((allWeatherData) => {
        return this.combineAllFetchedData(allWeatherData, id);
      })
    );
  }

  fetchLocationResult(
    locationData: CurrentWeatherResponse[],
    id: number
  ): Location {
    return {
      id: id,
      name: 'Tel Aviv',
      currentWeather: locationData[0].WeatherText,
      temperature: Math.ceil(locationData[0].Temperature.Metric.Value),
      isFavorite: false,
    };
  }

  fetchDailyForecast(
    dailyForecastData: FiveDaysForecastResponse,
    id: number
  ): DailyForecast[] {
    return dailyForecastData.DailyForecasts.map((dailyForecast) => {
      const fetchedDailyForecast: DailyForecast = {
        locationID: id,
        locationName: 'Tel Aviv',
        day: new Date(dailyForecast.Date),
        temperature: Math.ceil(dailyForecast.Temperature.Maximum.Value),
      };
      return fetchedDailyForecast;
    });
  }

  combineAllFetchedData(
    allWeatherData: [CurrentWeatherResponse[], FiveDaysForecastResponse],
    id: number
  ) {
    return {
      location: this.fetchLocationResult(allWeatherData[0], id),
      forecasts: this.fetchDailyForecast(allWeatherData[1], id),
    };
  }
}
