import { LocationState } from '../store/reducers/location.reducer';

export const DefaultLocation: LocationState = {
  currentLocation: {
    id: 215854,
    name: 'Tel Aviv',
    currentWeather: '',
    temperature: 0,
    isFavorite: false,
  },
  dailyForecasts: [],
  locationLoading: true,
  dailyForecastsLoading: true,
};
