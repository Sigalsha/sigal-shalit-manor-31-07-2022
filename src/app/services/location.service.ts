import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LocationAutocompleteResponse } from '../models/api/locationAutocompleteResponse.model';
import { AutocompleteResult } from '../models/autocompleteResult.model';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private _apiUrl = environment.autocompleteApi;
  private _apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getAutoCompleteSearchLocations(
    query: string
  ): Observable<AutocompleteResult[]> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }),
    };

    const options = {
      httpHeaders,
      params: new HttpParams().set('apikey', this._apiKey).set('q', query),
    };
    return this.http
      .get<LocationAutocompleteResponse[]>(this._apiUrl, options)
      .pipe(
        map(
          (autoCompleteRes) => {
            return this.fetchAutoCompleteData(autoCompleteRes);
          },
          catchError((err) => {
            console.log(err);
            return err;
          })
        )
      );
  }

  fetchAutoCompleteData(
    responses: LocationAutocompleteResponse[]
  ): AutocompleteResult[] {
    const fetchedData = responses.map((res) => {
      return {
        id: +res.Key,
        name: res.LocalizedName,
      };
    });
    return fetchedData;
  }
}
