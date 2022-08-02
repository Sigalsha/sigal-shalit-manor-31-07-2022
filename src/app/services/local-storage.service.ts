import { Injectable } from '@angular/core';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _localStorage!: Storage;

  constructor() {}

  setFavoritesLocations(data: Location) {
    const jsonData = JSON.stringify(data);
    this._localStorage.setItem('favLocations', jsonData);
  }

  getFavoritesLocations() {
    // TODO
    // const data = JSON.parse(this._localStorage.getItem('favLocations'));
  }

  clearFavoritesLocations() {
    this._localStorage.removeItem('favLocations');
  }
}
