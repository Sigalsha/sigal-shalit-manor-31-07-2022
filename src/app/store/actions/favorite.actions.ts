import { Action } from '@ngrx/store';
import { Location } from '../../models/location.model';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const FAVORITES_LOADING = 'FAVORITES_LOADING';
export const GET_FAVORITES = 'GET_FAVORITES';
export const IS_FAVORITE_LOCATION = 'IS_FAVORITE_LOCATION';
export const CLEAR_ALL_FAVORITES = 'CLEAR_ALL_FAVORITES';

export class AddToFavorite implements Action {
  readonly type = ADD_TO_FAVORITES;

  constructor(public payload: Location) {}
}

export class RemoveFromFavorites implements Action {
  readonly type = REMOVE_FROM_FAVORITES;

  constructor(public payload: number) {}
}

export class SetFavoritesLoading implements Action {
  readonly type = FAVORITES_LOADING;

  constructor(public payload: boolean) {}
}

export class GetFavorites implements Action {
  readonly type = GET_FAVORITES;

  constructor(public payload: Location[]) {}
}

export class IsFavoriteLocation implements Action {
  readonly type = IS_FAVORITE_LOCATION;

  constructor(public payload: Location) {}
}

export class ClearAllFavorites implements Action {
  readonly type = CLEAR_ALL_FAVORITES;

  constructor() {}
}

export type Actions =
  | AddToFavorite
  | RemoveFromFavorites
  | SetFavoritesLoading
  | GetFavorites
  | IsFavoriteLocation
  | ClearAllFavorites;
