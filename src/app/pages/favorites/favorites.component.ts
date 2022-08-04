import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable, combineLatestWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/reducers/app.reducer';
import { FavoritesState } from '../../store/reducers/favorite.reducer';
import * as LocationActions from '../../store/actions/location.actions';
import * as FavoriteActions from '../../store/actions/favorite.actions';
import { WeatherService } from 'src/app/services/weather.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Location } from '../../models/location.model';
import { DailyForecast } from '../../models/dailyForecast.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites$!: Observable<FavoritesState>;
  favoritesFromLocalStr$!: Observable<[] | Location[]>;
  fetchedFavorites!: any[];
  fetchedFavoritesSub!: Subscription;
  subscription!: Subscription;
  favLocationSubscription!: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private weatherService: WeatherService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.favorites$ = this.store.select('favorites');
    this.favoritesFromLocalStr$ =
      this.localStorageService.getFavoritesLocations();
    this.fetchedFavoritesSub = this.favorites$
      .pipe(
        combineLatestWith(this.favoritesFromLocalStr$),
        map(([favorites, favoritesFromLS]: any) =>
          favorites.length > 0
            ? favorites
            : favoritesFromLS.length > 0
            ? favoritesFromLS
            : []
        )
      )
      .subscribe((res) => (this.fetchedFavorites = res));
  }

  handleFavoriteClick(id: number, name: string): void {
    this.favLocationSubscription = this.weatherService
      .getAllWeatherData(id, name)
      .subscribe(
        (allWeatherData: {
          location: Location;
          forecasts: DailyForecast[];
        }) => {
          this.store.dispatch(
            new LocationActions.SetLocation(allWeatherData.location)
          );

          this.store.dispatch(
            new LocationActions.SetFiveDaysForecast(allWeatherData.forecasts)
          );
          this.router.navigate(['/']);
        }
      );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.favLocationSubscription?.unsubscribe();
    this.fetchedFavoritesSub?.unsubscribe();
  }
}
