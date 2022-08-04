import * as favActions from '../actions/favorite.actions';
import { Location } from '../../models/location.model';

export interface FavoritesState {
  favorites: Location[];
}

const initialState: FavoritesState = {
  favorites: [],
};

export function favoriteReducer(
  state: FavoritesState = initialState,
  action: favActions.Actions
): FavoritesState {
  switch (action.type) {
    case favActions.ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case favActions.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== action.payload
        ),
      };
    case favActions.CLEAR_ALL_FAVORITES:
      return {
        ...state,
        favorites: [],
      };
    default:
      return state;
  }
}
