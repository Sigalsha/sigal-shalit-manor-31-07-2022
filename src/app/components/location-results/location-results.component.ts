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
@Component({
  selector: 'app-location-results',
  templateUrl: './location-results.component.html',
  styleUrls: ['./location-results.component.scss'],
})
export class LocationResultsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
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
    this.subscription = this.weatherService
      .getAllWeatherData(215854)
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

          console.log(this.locationResult, this.dailyForecasts);
        }
      );
  }

  fetchLocationResult(locationData: CurrentWeatherResponse[]): Location {
    return {
      id: 215854,
      name: 'Tel Aviv',
      currentWeather: locationData[0].WeatherText,
      temperature: Math.ceil(locationData[0].Temperature.Metric.Value),
      isFavorite: false,
    };
  }

  fetchDailyForecast(
    dailyForecastData: FiveDaysForecastResponse
  ): DailyForecast[] {
    return dailyForecastData.DailyForecasts.map((dailyForecast) => {
      const fetchedDailyForecast: DailyForecast = {
        locationID: 215854,
        locationName: 'Tel Aviv',
        day: new Date(dailyForecast.Date),
        temperature: Math.ceil(dailyForecast.Temperature.Maximum.Value),
      };
      return fetchedDailyForecast;
    });
  }

  combineAllFetchedData(
    allWeatherData: [CurrentWeatherResponse[], FiveDaysForecastResponse]
  ) {
    return {
      location: this.fetchLocationResult(allWeatherData[0]),
      forecasts: this.fetchDailyForecast(allWeatherData[1]),
    };
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
