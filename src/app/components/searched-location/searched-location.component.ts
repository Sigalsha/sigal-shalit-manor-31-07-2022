import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable, combineLatestWith, forkJoin } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faFullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';
import * as fromApp from '../../store/reducers/app.reducer';
import * as FavoriteActions from '../../store/actions/favorite.actions';
import * as LocationActions from '../../store/actions/location.actions';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToastrNotificationService } from '../../services/toastr-notification.service';
import { Location } from '../../models/location.model';
import { FavoritesState } from '../../store/reducers/favorite.reducer';
import { LocationState } from '../../store/reducers/location.reducer';

@Component({
  selector: 'app-searched-location',
  templateUrl: './searched-location.component.html',
  styleUrls: ['./searched-location.component.scss'],
})
export class SearchedLocationComponent implements OnInit, OnDestroy {
  @Input() locationResult!: Location;
  addFavSub!: Subscription;
  removeFavSub!: Subscription;
  favorites$!: Observable<FavoritesState>;
  favoritesFromLocalStr$!: Observable<[] | Location[]>;
  currentLocation$!: Observable<LocationState>;
  isFavoriteLocationSub!: Subscription;
  isFavoriteLocation!: boolean;
  faLocationDot = faLocationDot;
  faFullHeart = faFullHeart;
  faEmptyHeart = faEmptyHeart;

  constructor(
    private store: Store<fromApp.AppState>,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrNotificationService
  ) {}

  ngOnInit(): void {
    this.favorites$ = this.store.select('favorites');
    this.currentLocation$ = this.store.select('currentLocation');
    this.favoritesFromLocalStr$ =
      this.localStorageService.getFavoritesLocations();
    this.checkIsFavoriteLocation();
  }

  addToFavorites(favorite: Location): void {
    this.store.dispatch(new FavoriteActions.AddToFavorite(favorite));
    this.addFavSub = this.store
      .select('favorites')
      .subscribe((updatedFavorites) =>
        this.localStorageService.setFavoritesLocations(
          updatedFavorites.favorites
        )
      );
    this.isFavoriteLocation = true;
    this.toastrService.success('city was added to favorites!', 'Great!');
  }

  removeFromFavorites(id: number): void {
    this.store.dispatch(new FavoriteActions.RemoveFromFavorites(id));
    this.removeFavSub = this.store
      .select('favorites')
      .subscribe((updatedFavorites) =>
        this.localStorageService.setFavoritesLocations(
          updatedFavorites.favorites
        )
      );
    this.isFavoriteLocation = false;
    this.toastrService.success('city was removed from favorites!', 'Great!');
  }

  checkIsFavoriteLocation(): void {
    this.isFavoriteLocationSub = this.favorites$
      .pipe(
        combineLatestWith(this.favoritesFromLocalStr$, this.currentLocation$),
        map(
          ([favorites, favoritesFromLS, location]: any) =>
            favorites.favorites.filter(
              (fav: any) =>
                fav?.id > 0 && fav?.id === location.currentLocation.id
            ).length > 0 ||
            favoritesFromLS.filter(
              (fav: any) =>
                fav?.id > 0 && fav?.id === location.currentLocation.id
            ).length > 0
        )
      )
      .subscribe((res) => (this.isFavoriteLocation = res));
  }

  ngOnDestroy() {
    this.addFavSub?.unsubscribe();
    this.removeFavSub?.unsubscribe();
    this.isFavoriteLocationSub?.unsubscribe();
  }
}
