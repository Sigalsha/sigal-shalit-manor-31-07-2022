import { Location } from '../../models/location.model';
import * as favActions from '../actions/favorite.actions';

export interface FavoritesState {
  favorites: Location[];
  loading: boolean;
  isFavorite: boolean;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: true,
  isFavorite: false,
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
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== action.payload
        ),
        loading: false,
      };
    case favActions.IS_FAVORITE_LOCATION:
      return {
        ...state,
        isFavorite: state.favorites.includes(action.payload),
      };
    default:
      return state;
  }
}
