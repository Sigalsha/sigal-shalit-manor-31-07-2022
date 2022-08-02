import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import * as fromApp from '../../store/reducers/app.reducer';
import * as FavoriteActions from '../../store/actions/favorite.actions';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faFullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-searched-location',
  templateUrl: './searched-location.component.html',
  styleUrls: ['./searched-location.component.scss'],
})
export class SearchedLocationComponent implements OnInit {
  faLocationDot = faLocationDot;
  faFullHeart = faFullHeart;
  faEmptyHeart = faEmptyHeart;
  @Input() locationResult!: Location;
  subscription!: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.isFavoriteLocation(this.locationResult);
  }

  addToFavorites(favorite: Location): void {
    this.store.dispatch(
      new FavoriteActions.AddToFavorite({ ...favorite, isFavorite: true })
    );
  }

  removeFromFavorites(id: number): void {
    this.store.dispatch(new FavoriteActions.RemoveFromFavorites(id));
  }

  isFavoriteLocation(locationResult: Location): void {
    this.store.dispatch(new FavoriteActions.IsFavoriteLocation(locationResult));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
