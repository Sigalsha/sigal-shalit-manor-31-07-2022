import { Action } from '@ngrx/store';
import { Location } from '../../models/location.model';
import { DailyForecast } from '../../models/dailyForecast.model';

export const SET_LOCATION = 'SET_LOCATION';
export const LOCATION_LOADING = 'LOCATION_LOADING';
export const SET_FIVE_DAYS_FORECAST = 'SET_FIVE_DAYS_FORECAST';
export const DAILY_FORECASTS_LOADING = 'DAILY_FORECASTS_LOADING';

export class SetLocation implements Action {
  readonly type = SET_LOCATION;

  constructor(public payload: Location) {}
}

export class SetLocationLoading implements Action {
  readonly type = LOCATION_LOADING;

  constructor(public payload: boolean) {}
}

export class SetFiveDaysForecast implements Action {
  readonly type = SET_FIVE_DAYS_FORECAST;

  constructor(public payload: DailyForecast[]) {}
}

export class SetDailyForecastsLoading implements Action {
  readonly type = DAILY_FORECASTS_LOADING;

  constructor(public payload: boolean) {}
}

export type Actions =
  | SetLocation
  | SetLocationLoading
  | SetFiveDaysForecast
  | SetDailyForecastsLoading;
