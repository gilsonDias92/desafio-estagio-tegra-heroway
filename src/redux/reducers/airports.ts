import { IStateAirports } from "../../interfaces";

export const GET_AIRPORTS_PENDING = "@airports/HTTP_GET_AIRPORTS_PENDING";
export const GET_AIRPORTS_SUCCESS = "@airports/HTTP_GET_AIRPORTS_SUCCESS";
export const GET_AIRPORTS_FAIL = "@airports/HTTP_GET_AIRPORTS_FAIL";

const INITIAL_STATE: IStateAirports = {
  isFetching: false,
  hasErrors: false,
  airports: []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_AIRPORTS_PENDING: {
      return {
        ...state,
        isFetching: true
      };
    }

    case GET_AIRPORTS_SUCCESS: {
      return {
        isFetching: false,
        hasErrors: false,
        airports: action.payload.airports
      };
    }

    case GET_AIRPORTS_FAIL: {
      return {
        isFetching: false,
        hasErrors: true,
        airports: []
      };
    }

    default:
      return state;
  }
}