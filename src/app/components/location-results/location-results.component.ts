import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../reducers';
import { WeatherService } from 'src/app/services/weather.service';
import { Location } from '../../models/location.model';
import { DailyForecast } from '../../models/dailyForecast.model';
import { FiveDaysForecastResponse } from '../../models/api/fiveDaysForecastResponse.model';
import { CurrentWeatherResponse } from '../../models/api/currentWeatherResponse.model';

@Component({
  selector: 'app-location-results',
  templateUrl: './location-results.component.html',
  styleUrls: ['./location-results.component.scss'],
})
export class LocationResultsComponent implements OnInit {
  subscription!: Subscription;
  currentWeatherTitle!: string;
  locationResult!: Location;
  dailyForecasts!: DailyForecast[];

  constructor(
    private weatherService: WeatherService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.weatherService.getCurrentWeather(215854),
      this.weatherService.getFiveDaysForecast(215854),
    ])
      .pipe(
        map((allWeatherData) => {
          return this.combineAllFetchedData(allWeatherData);
        })
      )
      .subscribe((allWeatherData) => {
        this.locationResult = allWeatherData.location;
        this.dailyForecasts = allWeatherData.forecast;
      });
  }

  fetchLocationResult(locationData: CurrentWeatherResponse[]): Location {
    return {
      id: 215854,
      name: 'Tel Aviv',
      currentWeather: locationData[0].WeatherText,
      temperature: locationData[0].Temperature.Metric.Value,
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
      forecast: this.fetchDailyForecast(allWeatherData[1]),
    };
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

/**
 * 
 *     this.subscription = this.weatherService
      .getCurrentWeather(215854)
      .pipe(
        map((locationRes) => {
          return {
            id: 215854,
            name: 'Tel Aviv',
            currentWeather: locationRes[0].WeatherText,
            temperature: locationRes[0].Temperature.Metric.Value,
            isFavorite: false,
          };
        })
      )
      .subscribe((location) => {
        console.log(location);
        this.locationResult = location;
      });
 * 
 */
/**
 * 
 *   console.log(location);
        this.locationResult = location;
 */
