import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/reducers/app.reducer';
import { WeatherService } from 'src/app/services/weather.service';
import { Location } from '../../models/location.model';
import { DailyForecast } from '../../models/dailyForecast.model';
import { FiveDaysForecastResponse } from '../../models/api/fiveDaysForecastResponse.model';
import { CurrentWeatherResponse } from '../../models/api/currentWeatherResponse.model';
import * as LocationActions from '../../store/actions/location.actions';
import { DefaultLocation } from '../../mocks/locationMock';
@Component({
  selector: 'app-location-results',
  templateUrl: './location-results.component.html',
  styleUrls: ['./location-results.component.scss'],
})
export class LocationResultsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  locDataSub!: Subscription;
  dailyForecastSub!: Subscription;
  currentWeatherTitle!: string;
  locationResult!: Location;
  dailyForecasts!: DailyForecast[];

  constructor(
    private weatherService: WeatherService,
    private store: Store<fromApp.AppState>
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
    console.log('results change');

    this.locDataSub = this.store
      .select('currentLocation')
      .subscribe(
        (locationData) => (this.locationResult = locationData.currentLocation)
      );
  }

  subscribeToDailyForecastData(): void {
    console.log('results change 2');

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
  }
}
