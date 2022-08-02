import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { LocationService } from 'src/app/services/location.service';
export interface City {
  name: string;
}
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  searchControl: FormControl = new FormControl('');
  searchText = '';
  faMagnifyingGlass = faMagnifyingGlass;
  options: string[] = ['London', 'Tel Aviv', 'Berlin'];
  filteredOptions!: Observable<string[]>;
  subscription!: Subscription;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.subscription = this.locationService
      .getLocation('Tel')
      .subscribe((locationRes) => {
        console.log(locationRes);
        /*     if (locationRes && locationRes.length > 1) {
          this.filteredOptions = locationRes.map(
            (location: { Key: number; LocalizedName: string }) => {
              return {
                id: location.Key,
                name: location.LocalizedName,
              };
            }
          );
        } */
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
