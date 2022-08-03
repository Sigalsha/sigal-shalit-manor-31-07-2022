import { Injectable } from '@angular/core';
import { Location } from '../models/location.model';
import { FavoritesState } from '../store/reducers/favorite.reducer';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setFavoritesLocations(data: Location[]): void {
    localStorage.setItem('favorites', JSON.stringify(data));
  }

  getFavoritesLocations(): Location[] | [] {
    if (localStorage.getItem('favorites') !== null) {
      return JSON.parse(localStorage.getItem('favorites') || '{}');
    }
    return [];
  }

  clearFavoritesLocations(): void {
    localStorage.removeItem('favorites');
  }
}
