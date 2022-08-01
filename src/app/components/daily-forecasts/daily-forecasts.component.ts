import { Component, OnInit } from '@angular/core';
import { DailyForecast } from '../../../types/DailyForecast';
import { DAILY_FORECASTS } from 'src/app/mock-data/dailyForecasts';

@Component({
  selector: 'app-daily-forecasts',
  templateUrl: './daily-forecasts.component.html',
  styleUrls: ['./daily-forecasts.component.scss'],
})
export class DailyForecastsComponent implements OnInit {
  dailyForecasts: DailyForecast[] = DAILY_FORECASTS;
  constructor() {}

  ngOnInit(): void {}
}
