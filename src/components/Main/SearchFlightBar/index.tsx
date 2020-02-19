import React, { useEffect, useState } from "react";
import * as ReactRedux from "react-redux";

import SelectAirportFromInput from "./SelectAirportFromInput";
import SelectAirportToInput from "./SelectAirportToInput";
import { getAirportsAction } from "../../../redux/reducers/airports";
import { IAppState } from "../../../redux/configureStore";
import DateInput from "./DateInput";
import ButtonSendInfo from "./ButtonSendInfo";

export default function SearchFlightBar() {

  const [airportFrom, setAirportFrom] = useState();
  const [airportTo, setAirportTo] = useState();
  const [date, setDate] = useState();

  const dispatch = ReactRedux.useDispatch();
  const airportsState = ReactRedux.useSelector((state: IAppState) => {
    return state.airports;
  });

  const airportsList = airportsState.airports;
  useEffect(() => {
    const getAirports = getAirportsAction();
    dispatch(getAirports);
  }, [dispatch]);

  return (
    <div className="search-flight-bar-container">
      <h3>Encontre as melhores condições para viajar!</h3>
      <form className="form-seach-flight-bar">
        <SelectAirportFromInput airportsList={airportsList} />
        <SelectAirportToInput airportsList={airportsList} />
        <DateInput />

        
        <ButtonSendInfo />
      </form>
    </div>
  );
}
