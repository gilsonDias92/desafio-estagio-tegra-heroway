const HTTP_SEND_FLIGHT_INFO_PENDING = "@flights/HTTP_SEND_FLIGHT_INFO_PENDING";
const HTTP_SEND_FLIGHT_INFO_SUCCESS = "@flights/HTTP_SEND_FLIGHT_INFO_SUCCESS";
const HTTP_SEND_FLIGHT_INFO_FAIL = "@flights/HTTP_SEND_FLIGHT_INFO_FAIL";

export interface IFlight {
  airportFrom: string;
  airportTo: string;
  date: string;
}

interface IState {
  isFetching: boolean;
  hasErrors: boolean;
  flights: IFlight[];
}

const INITIAL_STATE: IState = {
  isFetching: false,
  hasErrors: false,
  flights: []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HTTP_SEND_FLIGHT_INFO_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case HTTP_SEND_FLIGHT_INFO_SUCCESS:
      return {
        isFetching: false,
        hasErrors: false,
        payload: action.payload.flights
      };
    case HTTP_SEND_FLIGHT_INFO_FAIL:
      return {
        isFetching: false,
        hasErrors: true,
        flights: INITIAL_STATE.flights
      };
    default:
      return state;
  }
}

export function sendFlightInfoAction(flight: IFlight) {
  return async function(dispatch) {
    const body = {
      from: flight.airportFrom,
      to: flight.airportTo,
      date: flight.date.toString()
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
      const flightsList = await response.json();
      console.log(flightsList, ".....estou dentro do try");

      const sendFlightsInfoSuccessAction = {
        type: HTTP_SEND_FLIGHT_INFO_SUCCESS,
        payload: flightsList
      };
      dispatch(sendFlightsInfoSuccessAction);

    } catch (error) {
      const sendFlightsInfoFailAction = {
        type: HTTP_SEND_FLIGHT_INFO_FAIL,
        payload: null
      };
      dispatch(sendFlightsInfoFailAction);
    }
  };
}
