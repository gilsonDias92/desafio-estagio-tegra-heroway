import React from "react";

interface IProps {
  airportsList: any;
}

function getAirportfrom(event) {
  console.log(event);
  
  const airportFrom = event.selected.value;
}

const SelectAirportFromInput = (props: IProps) => {
  return (
    <>
      <div className="airport-from-row">
        <label htmlFor="airports-list-from" className="airport-from-label">
          Origem:
        </label>
        <div className="select-airport-container">
          <i className="fas fa-plane-departure search-bar-icon"></i>
          <select
            id="airports-list-from"
            name="airports-list-from"
            className="select-airports-list"
          >
            <option className="single-option" value="">Selecione o aeroporto de origem</option>
            {props.airportsList.map(airport => {
              return (
                <option className="single-option" key={airport.aeroporto} value={airport.aeroporto}>
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

export default SelectAirportFromInput;
