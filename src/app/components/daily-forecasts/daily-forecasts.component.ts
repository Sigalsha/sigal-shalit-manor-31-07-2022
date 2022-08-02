import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyForecast } from '../../models/dailyForecast.model';
import { DAILY_FORECASTS } from 'src/app/mock-data/dailyForecasts';

@Component({
  selector: 'app-daily-forecasts',
  templateUrl: './daily-forecasts.component.html',
  styleUrls: ['./daily-forecasts.component.scss'],
})
export class DailyForecastsComponent implements OnInit {
  @Input() dailyForecasts!: DailyForecast[];
  constructor() {}

  ngOnInit(): void {
    console.log(this.dailyForecasts);
  }
}
