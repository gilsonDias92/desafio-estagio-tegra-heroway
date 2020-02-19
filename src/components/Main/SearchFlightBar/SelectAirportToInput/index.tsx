import React from "react";

interface IProps {
  airportsList: any;
}

const SelectAirportToInput = (props: IProps) => {
  return (
    <>
      <div className="airport-select-row">
        <label htmlFor="airports-list-to" className="airport-select-label">
          Destino:
        </label>
        <div className="select-airport-container">
          <i className="fas fa-plane-arrival"></i>
          <select
            id="airports-list-to"
            name="airports-list-to"
            className="select-airports-list"
          >
            <option value="">Selecione o aeroporto de origem</option>
            {props.airportsList.map(airport => {
              return (
                <option key={airport.aeroporto} value={airport.aeroporto}>
                  {airport.nome}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default SelectAirportToInput;
