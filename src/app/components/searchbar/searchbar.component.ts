import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
} from 'rxjs/operators';
import * as fromApp from '../../store/reducers/app.reducer';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';
import * as LocationActions from '../../store/actions/location.actions';
import { Location } from '../../models/location.model';
import { DailyForecast } from '../../models/dailyForecast.model';
export interface City {
  name: string;
}
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit, OnDestroy {
  searchControl: FormControl = new FormControl('Tel');
  faMagnifyingGlass = faMagnifyingGlass;
  filteredOptions!: Observable<City[]>;
  subscription!: Subscription;

  constructor(
    private locationService: LocationService,
    private store: Store<fromApp.AppState>,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this._searchLocationsByQuery();
  }

  private _searchLocationsByQuery(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      filter((val) => this._filter(val)),
      switchMap((searchQuery) => {
        let query = searchQuery !== '' ? searchQuery : this.searchControl.value;
        return this.locationService.getAutoCompleteSearchLocations(query);
      })
    );
  }

  private _filter(query: string): boolean {
    debugger;
    return query !== '' && /^[a-zA-Z]{1,}$/.test(query);
  }

  // filter((val) => !/^[a-zA-Z]{1,}$/.test(val)),

  displayFn(city: City): string {
    return city && city.name ? city.name : 'Tel';
  }

  handleAutocompleteSearch(searchValue: FormControl['value']) {
    if (searchValue && searchValue.id && searchValue.name) {
      this.subscription = this.weatherService
        .getAllWeatherData(searchValue.id, searchValue.name)
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
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
