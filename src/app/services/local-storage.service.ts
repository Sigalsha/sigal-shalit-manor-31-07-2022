import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setFavoritesLocations(data: Location[]): void {
    localStorage.setItem('favorites', JSON.stringify(data));
  }

  getFavoritesLocations(): Observable<Location[] | []> {
    if (localStorage.getItem('favorites') !== null) {
      return of(JSON.parse(localStorage.getItem('favorites') || '{}'));
    }
    return of([]);
  }

  clearFavoritesLocations(): void {
    localStorage.removeItem('favorites');
  }
}
