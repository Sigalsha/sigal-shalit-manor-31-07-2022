import * as locActions from '../actions/location.actions';
import { Location } from '../../models/location.model';
import { DailyForecast } from '../../models/dailyForecast.model';

export interface LocationState {
  currentLocation: Location;
  dailyForecasts: DailyForecast[];
}

const initialState: LocationState = {
  currentLocation: {
    id: 0,
    name: '',
    currentWeather: '',
    temperature: 0,
  },
  dailyForecasts: [],
};

export function locationReducer(
  state: LocationState = initialState,
  action: locActions.Actions
): LocationState {
  switch (action.type) {
    case locActions.SET_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    case locActions.SET_FIVE_DAYS_FORECAST:
      return {
        ...state,
        dailyForecasts: action.payload,
      };
    case locActions.SET_LOCATION_IS_FAVORITE:
      return {
        ...state,
        currentLocation: action.payload,
      };
    default:
      return state;
  }
}
