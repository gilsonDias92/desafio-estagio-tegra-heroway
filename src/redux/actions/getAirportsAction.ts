import {
  GET_AIRPORTS_PENDING,
  GET_AIRPORTS_SUCCESS,
  GET_AIRPORTS_FAIL
} from "../reducers/airports";

export function getAirportsAction() {
  return async function(dispatch: any) {
    const getAirportsPendingAction = {
      type: GET_AIRPORTS_PENDING,
      payload: null
    };
    dispatch(getAirportsPendingAction);

    try {
      const url = "https://api-voadora.dev.tegra.com.br/flight/companies";
      const response = await fetch(url);
      const airports = await response.json();

      const getAirportsSuccessAction = {
        type: GET_AIRPORTS_SUCCESS,
        payload: {
          airports
        }
      };
      dispatch(getAirportsSuccessAction);
    } catch (error) {
      const getAirportsFailAction = {
        type: GET_AIRPORTS_FAIL,
        payload: null
      };
      dispatch(getAirportsFailAction);
    }
  };
}
