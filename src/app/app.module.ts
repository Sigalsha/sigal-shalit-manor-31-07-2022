import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
/* import {
  StoreRouterConnectingModule,
} from '@ngrx/router-store'; */
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HeaderComponent } from './layouts/header/header.component';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { DailyForecastsComponent } from './components/daily-forecasts/daily-forecasts.component';
import { CardComponent } from './components/shared/card/card.component';
import { TitleComponent } from './components/shared/title/title.component';
import { SearchedLocationComponent } from './components/searched-location/searched-location.component';
import { LocationResultsComponent } from './components/location-results/location-results.component';
import { environment } from '../environments/environment';
import * as fromApp from './store/reducers/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    MainComponent,
    HomeComponent,
    FavoritesComponent,
    SearchbarComponent,
    DailyForecastsComponent,
    CardComponent,
    TitleComponent,
    SearchedLocationComponent,
    LocationResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.appReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [MatAutocompleteModule, MatFormFieldModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
