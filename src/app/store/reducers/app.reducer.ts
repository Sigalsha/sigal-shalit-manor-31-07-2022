import { ActionReducerMap } from '@ngrx/store';
import * as fromFavorite from './favorite.reducer';
import * as fromLocation from './location.reducer';

export interface AppState {
  favorites: fromFavorite.FavoritesState;
  currentLocation: fromLocation.LocationState;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  favorites: fromFavorite.favoriteReducer,
  currentLocation: fromLocation.locationReducer,
};
