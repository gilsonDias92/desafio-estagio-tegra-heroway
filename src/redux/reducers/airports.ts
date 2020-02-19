const GET_AIRPORTS_PENDING = "@airports/HTTP_GET_AIRPORTS_PENDING";
const GET_AIRPORTS_SUCCESS = "@airports/HTTP_GET_AIRPORTS_SUCCESS";
const GET_AIRPORTS_FAIL = "@airports/HTTP_GET_AIRPORTS_FAIL";

const INITIAL_STATE: IState = {
  isFetching: false,
  hasErrors: false,
  airports: []
};

interface IState {
  isFetching: boolean;
  hasErrors: boolean;
  airports: any;
}

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
        posts: []
      };
    }

    default:
      return state;
  }
}

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