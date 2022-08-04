import { Action } from '@ngrx/store';
import { Location } from '../../models/location.model';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const GET_FAVORITES = 'GET_FAVORITES';
export const CLEAR_ALL_FAVORITES = 'CLEAR_ALL_FAVORITES';

export class AddToFavorite implements Action {
  readonly type = ADD_TO_FAVORITES;

  constructor(public payload: Location) {}
}

export class RemoveFromFavorites implements Action {
  readonly type = REMOVE_FROM_FAVORITES;

  constructor(public payload: number) {}
}
export class GetFavorites implements Action {
  readonly type = GET_FAVORITES;

  constructor(public payload: Location[]) {}
}
export class ClearAllFavorites implements Action {
  readonly type = CLEAR_ALL_FAVORITES;

  constructor() {}
}

export type Actions =
  | AddToFavorite
  | RemoveFromFavorites
  | GetFavorites
  | ClearAllFavorites;
