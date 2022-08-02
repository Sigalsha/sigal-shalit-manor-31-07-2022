import * as fromFavorite from './favorite.reducer';
import * as fromLocation from './location.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  favorites: fromFavorite.FavoritesState;
  currentLocation: fromLocation.LocationState;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  favorites: fromFavorite.favoriteReducer,
  currentLocation: fromLocation.locationReducer,
};
