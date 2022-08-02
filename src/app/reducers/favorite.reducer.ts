import { Location } from '../models/location.model';
import * as favActions from '../actions/favorite.actions';

export interface FavoritesState {
  favorites: Location[];
  loading: boolean;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: true,
};

export function favoriteReducer(
  state: FavoritesState = initialState,
  action: favActions.Actions
): FavoritesState {
  switch (action.type) {
    case favActions.ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [action.payload, ...state.favorites],
        loading: false,
      };
    case favActions.REMOVE_FROM_FAVORITES:
      const { id } = action.payload;

      return {
        ...state,
        favorites: state.favorites.filter((favorite) => favorite.id !== id),
        loading: false,
      };

    default:
      return state;
  }
}
