import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { LocationService } from 'src/app/services/location.service';
import { AutocompleteResult } from '../../models/autocompleteResult.model';
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
  filteredOptions!: AutocompleteResult[];
  subscription!: Subscription;
  searchChangeSub!: Subscription;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    /*     this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    ); */
    this.subscription = this.locationService
      .getAutoCompleteSearchLocations('Tel')
      .subscribe((locationsRes) => {
        console.log(locationsRes);
        this.filteredOptions = locationsRes;
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  handleSearchChange(query: string) {
    if (query !== '') {
      this.searchChangeSub = this.locationService
        .getAutoCompleteSearchLocations(query)
        .subscribe((locationsRes) => (this.filteredOptions = locationsRes));
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.searchChangeSub?.unsubscribe();
  }
}
