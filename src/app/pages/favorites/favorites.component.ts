import { Component, OnInit } from '@angular/core';
import { Location } from '../../../types/Location';
import { FAVORITES_LOCATIONS } from '../../mock-data/favoritesLocations';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: Location[] = FAVORITES_LOCATIONS;
  constructor() {}

  ngOnInit(): void {}
}
