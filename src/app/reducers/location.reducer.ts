import { Location } from '../models/location.model';
import * as locActions from '../actions/location.actions';
import { DailyForecast } from '../models/dailyForecast.model';

export interface LocationState {
  currentLocation: Location;
  dailyForecasts: DailyForecast[];
  locationLoading: boolean;
  dailyForecastsLoading: boolean;
}

const initialState: LocationState = {
  currentLocation: {
    id: 0,
    name: '',
    currentWeather: '',
    temperature: 0,
    isFavorite: false,
  },
  dailyForecasts: [],
  locationLoading: true,
  dailyForecastsLoading: true,
};

export function locationReducer(
  state: LocationState = initialState,
  action: locActions.Actions
): LocationState {
  switch (action.type) {
    case locActions.GET_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
        locationLoading: false,
      };
    case locActions.GET_FIVE_DAYS_FORECAST:
      return {
        ...state,
        dailyForecasts: action.payload,
        dailyForecastsLoading: false,
      };
    case locActions.LOCATION_LOADING:
      return {
        ...state,
        locationLoading: true,
      };
    case locActions.DAILY_FORECASTS_LOADING:
      return {
        ...state,
        dailyForecastsLoading: true,
      };
    default:
      return state;
  }
}
