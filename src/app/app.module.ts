import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as fromApp from './store/reducers/app.reducer';
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
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      timeOut: 2500,
    }),
    FontAwesomeModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forRoot(fromApp.appReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [MatAutocompleteModule, MatFormFieldModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
