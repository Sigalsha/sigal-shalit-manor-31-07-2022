import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/reducers/app.reducer';
import { Location } from '../../models/location.model';
import { DailyForecast } from '../../models/dailyForecast.model';
import { WeatherService } from 'src/app/services/weather.service';
import * as LocationActions from '../../store/actions/location.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites!: Location[];
  subscription!: Subscription;
  favLocationSubscription!: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('favorites')
      .subscribe((favLocations) => (this.favorites = favLocations.favorites));
  }

  handleFavoriteClick(id: number): void {
    debugger;
    this.favLocationSubscription = this.weatherService
      .getAllWeatherData(id)
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
        }
      );
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.favLocationSubscription?.unsubscribe();
  }
}
