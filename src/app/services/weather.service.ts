import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrNotificationService } from './toastr-notification.service';
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

  constructor(
    private http: HttpClient,
    private toastrService: ToastrNotificationService
  ) {}

  getCurrentWeather(id: number): Observable<CurrentWeatherResponse[]> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }),
    };
    const options = {
      httpHeaders,
      params: new HttpParams().set('apikey', this._apiKey),
    };
    return this.http
      .get<CurrentWeatherResponse[]>(`${this._apiUrl}${id}`, options)
      .pipe(
        map((res) => res),
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            try {
              this.toastrService.error(err.error.message, err.error.title);
            } catch (e) {
              this.toastrService.error('An error occurred', '');
            }
          }
          return of(err);
        })
      );
  }

  getFiveDaysForecast(id: number): Observable<FiveDaysForecastResponse> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }),
    };
    const options = {
      httpHeaders,
      params: new HttpParams().set('apikey', this._apiKey).set('metric', true),
    };
    return this.http
      .get<FiveDaysForecastResponse>(`${this._apiUrlDays}${id}`, options)
      .pipe(
        map((res) => res),
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            try {
              this.toastrService.error(err.error.message, err.error.title);
            } catch (e) {
              this.toastrService.error('An error occurred', '');
            }
          }
          return of(err);
        })
      );
  }

  getAllWeatherData(id: number, locationName?: string) {
    return forkJoin([
      this.getCurrentWeather(id),
      this.getFiveDaysForecast(id),
    ]).pipe(
      map((allWeatherData) => {
        return this.combineAllFetchedData(allWeatherData, id, locationName);
      })
    );
  }

  fetchLocationResult(
    locationData: CurrentWeatherResponse[],
    id: number,
    locationName?: string
  ): Location {
    return {
      id: id,
      name: locationName ? locationName : 'Tel Aviv',
      currentWeather: locationData[0].WeatherText,
      temperature: Math.ceil(locationData[0].Temperature.Metric.Value),
    };
  }

  fetchDailyForecast(
    dailyForecastData: FiveDaysForecastResponse,
    id: number,
    locationName?: string
  ): DailyForecast[] {
    return dailyForecastData.DailyForecasts.map((dailyForecast) => {
      const fetchedDailyForecast: DailyForecast = {
        locationID: id,
        locationName: locationName ? locationName : 'Tel Aviv',
        day: new Date(dailyForecast.Date),
        temperature: Math.ceil(dailyForecast.Temperature.Maximum.Value),
      };
      return fetchedDailyForecast;
    });
  }

  combineAllFetchedData(
    allWeatherData: [CurrentWeatherResponse[], FiveDaysForecastResponse],
    id: number,
    locationName?: string
  ) {
    return {
      location: this.fetchLocationResult(allWeatherData[0], id, locationName),
      forecasts: this.fetchDailyForecast(allWeatherData[1], id, locationName),
    };
  }
}
