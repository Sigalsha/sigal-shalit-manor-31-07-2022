import { Action } from '@ngrx/store';
import { Location } from '../../models/location.model';
import { DailyForecast } from '../../models/dailyForecast.model';

export const SET_LOCATION = 'SET_LOCATION';
export const SET_FIVE_DAYS_FORECAST = 'SET_FIVE_DAYS_FORECAST';
export const SET_LOCATION_IS_FAVORITE = 'SET_LOCATION_IS_FAVORITE';

export class SetLocation implements Action {
  readonly type = SET_LOCATION;

  constructor(public payload: Location) {}
}

export class SetFiveDaysForecast implements Action {
  readonly type = SET_FIVE_DAYS_FORECAST;

  constructor(public payload: DailyForecast[]) {}
}

export class SetLocationIsFavorite implements Action {
  readonly type = SET_LOCATION_IS_FAVORITE;

  constructor(public payload: Location) {}
}

export type Actions = SetLocation | SetFiveDaysForecast | SetLocationIsFavorite;
