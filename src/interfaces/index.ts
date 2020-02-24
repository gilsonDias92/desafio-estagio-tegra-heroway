export interface IStateFlights {
  isFetching: boolean;
  hasErrors: boolean;
  isEmpty: boolean;
  flights: [];
}

export interface IStateAirports {
  isFetching: boolean;
  hasErrors: boolean;
  airports: any;
}

export interface IFlight {
  airportFrom: string;
  airportTo: string;
  date: string;
}