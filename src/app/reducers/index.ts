import * as fromFavorite from './favorite.reducer';
import * as fromLocation from './location.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  favorite: fromFavorite.FavoritesState;
  currentLocation: fromLocation.LocationState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  favorite: fromFavorite.favoriteReducer,
  currentLocation: fromLocation.locationReducer,
  // routerReducer: fromRouter.routerReducer,
};
