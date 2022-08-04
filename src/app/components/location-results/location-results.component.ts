import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/reducers/app.reducer';
import * as LocationActions from '../../store/actions/location.actions';
import * as FavoriteActions from '../../store/actions/favorite.actions';
import { WeatherService } from 'src/app/services/weather.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { DefaultLocation } from '../../mocks/locationMock';
import { Location } from '../../models/location.model';
import { DailyForecast } from '../../models/dailyForecast.model';
@Component({
  selector: 'app-location-results',
  templateUrl: './location-results.component.html',
  styleUrls: ['./location-results.component.scss'],
})
export class LocationResultsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  locDataSub!: Subscription;
  dailyForecastSub!: Subscription;
  addFavSub!: Subscription;
  removeFavSub!: Subscription;
  locationResult!: Location;
  dailyForecasts!: DailyForecast[];
  isFavoriteLocation!: boolean;

  constructor(
    private weatherService: WeatherService,
    private store: Store<fromApp.AppState>,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.subscribeToLocationData();
    this.subscribeToDailyForecastData();
    if (this.locationResult.id === 0) {
      this.subscription = this.weatherService
        .getAllWeatherData(DefaultLocation.currentLocation.id)
        .subscribe(
          (allWeatherData: {
            location: Location;
            forecasts: DailyForecast[];
          }) => {
            this.locationResult = allWeatherData.location;
            this.dailyForecasts = allWeatherData.forecasts;
            this.store.dispatch(
              new LocationActions.SetLocation(allWeatherData.location)
            );
            this.store.dispatch(
              new LocationActions.SetFiveDaysForecast(allWeatherData.forecasts)
            );
          }
        );
    }
  }

  subscribeToLocationData(): void {
    this.locDataSub = this.store
      .select('currentLocation')
      .subscribe(
        (locationData) => (this.locationResult = locationData.currentLocation)
      );
  }

  subscribeToDailyForecastData(): void {
    this.dailyForecastSub = this.store
      .select('currentLocation')
      .subscribe(
        (dailyForecastData) =>
          (this.dailyForecasts = dailyForecastData.dailyForecasts)
      );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.locDataSub?.unsubscribe();
    this.dailyForecastSub?.unsubscribe();
    this.addFavSub?.unsubscribe();
  }
}
