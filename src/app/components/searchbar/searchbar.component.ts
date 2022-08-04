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
  catchError,
} from 'rxjs/operators';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import * as fromApp from '../../store/reducers/app.reducer';
import * as LocationActions from '../../store/actions/location.actions';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';
import { ToastrNotificationService } from 'src/app/services/toastr-notification.service';
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
  searchControl: FormControl = new FormControl('');
  faMagnifyingGlass = faMagnifyingGlass;
  filteredOptions!: Observable<City[]>;
  subscription!: Subscription;

  constructor(
    private locationService: LocationService,
    private store: Store<fromApp.AppState>,
    private weatherService: WeatherService,
    private toastrService: ToastrNotificationService
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
      }),
      catchError((err) => {
        this.toastrService.error(err.error.message, err.error.title);
        return [];
      })
    );
  }

  private _filter(query: string): boolean {
    return query !== '' && /^[a-zA-Z]{1,}$/.test(query);
  }

  displayFn(city: City): string {
    return city && city.name ? city.name : '';
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
      this.searchControl.setValue('');
    } else {
      this.toastrService.warning(
        'you should fill a city with English letters only',
        'Attention!'
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
