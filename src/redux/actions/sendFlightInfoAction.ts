import {
  HTTP_SEND_FLIGHT_INFO_PENDING,
  HTTP_SEND_FLIGHT_INFO_SUCCESS,
  HTTP_SEND_FLIGHT_INFO_FAIL
} from "../reducers/flights";

export function sendFlightInfoAction(airportFrom, airportTo, date) {
  return async function(dispatch) {
    const body = {
      from: airportFrom,
      to: airportTo,
      date: date ? date.toString() : date
    };

    const sendFlightsInfoPendingAction = {
      type: HTTP_SEND_FLIGHT_INFO_PENDING,
      payload: null
    };
    dispatch(sendFlightsInfoPendingAction);
    try {
      const url = "https://api-voadora.dev.tegra.com.br/flight";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const flights = await response.json();

      const isEmpty = flights.length === 0 ? true : false;
      console.log(isEmpty);

      const sendFlightsInfoSuccessAction = {
        type: HTTP_SEND_FLIGHT_INFO_SUCCESS,
        payload: {
          flights,
          isEmpty: isEmpty
        }
      };
      dispatch(sendFlightsInfoSuccessAction);
    } catch (error) {
      const sendFlightsInfoFailAction = {
        type: HTTP_SEND_FLIGHT_INFO_FAIL,
        payload: null
      };

      dispatch(sendFlightsInfoFailAction);
      console.log(error, "Error...");
    }
  };
}