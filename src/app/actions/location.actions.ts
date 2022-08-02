import { Action } from '@ngrx/store';
import { Location } from '../models/location.model';
import { DailyForecast } from '../models/dailyForecast.model';

export const GET_LOCATION = 'GET_LOCATION';
export const LOCATION_LOADING = 'LOCATION_LOADING';
export const GET_FIVE_DAYS_FORECAST = 'GET_FIVE_DAYS_FORECAST';
export const DAILY_FORECASTS_LOADING = 'DAILY_FORECASTS_LOADING';

export class GetLocation implements Action {
  readonly type = GET_LOCATION;

  constructor(public payload: Location) {}
}

export class SetLocationLoading implements Action {
  readonly type = LOCATION_LOADING;

  constructor(public payload: boolean) {}
}

export class GetFiveDaysForecast implements Action {
  readonly type = GET_FIVE_DAYS_FORECAST;

  constructor(public payload: DailyForecast[]) {}
}

export class SetDailyForecastsLoading implements Action {
  readonly type = DAILY_FORECASTS_LOADING;

  constructor(public payload: boolean) {}
}

export type Actions =
  | GetLocation
  | SetLocationLoading
  | GetFiveDaysForecast
  | SetDailyForecastsLoading;
