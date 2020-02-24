import { IStateFlights } from "../../interfaces";

export const HTTP_SEND_FLIGHT_INFO_PENDING = "@flights/HTTP_SEND_FLIGHT_INFO_PENDING";
export const HTTP_SEND_FLIGHT_INFO_SUCCESS = "@flights/HTTP_SEND_FLIGHT_INFO_SUCCESS";
export const HTTP_SEND_FLIGHT_INFO_FAIL = "@flights/HTTP_SEND_FLIGHT_INFO_FAIL";

const INITIAL_STATE: IStateFlights = {
  isFetching: false,
  hasErrors: false,
  isEmpty: true,
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
        isEmpty: action.payload.isEmpty, 
        flights: action.payload.flights
      };
    case HTTP_SEND_FLIGHT_INFO_FAIL:
      return {
        isFetching: false,
        hasErrors: true,
        isEmpty: true,
        flights: INITIAL_STATE.flights
      };
    default:
      return state;
  }
}